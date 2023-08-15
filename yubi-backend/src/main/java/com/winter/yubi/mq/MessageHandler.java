package com.winter.yubi.mq;

import com.rabbitmq.client.Channel;
import com.winter.yubi.manager.AiManager;
import com.winter.yubi.model.entity.Chart;
import com.winter.yubi.service.ChartService;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @description: 处理消息
 * @author: Mr.Ye
 * @since: 2023/8/6 15:45
 */
@Component
@Slf4j
public class MessageHandler {

	@Resource
	private ChartService chartService;

	@Resource
	private AiManager aiManager;

	@SneakyThrows
	@RabbitListener(queues = {"code_test_queue"}, ackMode = "MANUAL")
	public void receiveMessage(Long chartId, Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) {
		log.info("Receive chartId: {}", chartId);
		// 处理消息，异步调用鱼聪明
		// 将图表状态改为running
		Chart updateChart = new Chart();
		updateChart.setId(chartId);
		updateChart.setStatus(1);
		boolean result = chartService.updateById(updateChart);
		if (!result) {
			handleError(chartId, "更改图表生成状态失败！");
			channel.basicNack(deliveryTag,false,true);
			return;
		}
		// 调用AI模型
		String[] aiResponse  = aiManager.doChat(generateUserInput(chartId)).split("【【【【【");
		if (aiResponse.length != 2) {
			handleError(chartId, "调用AI返回结果格式有误!");
			channel.basicNack(deliveryTag,false,true);
			return;
		}
		// 取出结果返回并保存数据库
		String genChart = aiResponse[0].trim();
		String genResult = aiResponse[1].trim();
		updateChart.setGenChart(genChart);
		updateChart.setGenResult(genResult);
		updateChart.setStatus(2);
		result = chartService.updateById(updateChart);
		if (!result) {
			handleError(chartId, "保存AI生成的图表信息失败！");
			channel.basicNack(deliveryTag,false,true);
			return;
		}
		channel.basicAck(deliveryTag, false);
	}

	/**
	 * 处理AI生成图表过程的错误
	 *
	 * @param chartId 图表ID
	 * @param execMessage AI执行信息
	 */
	private void handleError(Long chartId, String execMessage) {
		Chart updateChart = new Chart();
		updateChart.setId(chartId);
		updateChart.setStatus(-1);
		updateChart.setExecMessage(execMessage);
		boolean result = chartService.updateById(updateChart);
		if (!result) {
			log.error("更新图表失败状态失败！");
		}
	}

	private String generateUserInput(Long chartId) {
		Chart chart = chartService.getById(chartId);
		// 用户文本输入
		StringBuilder userInput = new StringBuilder();
		//userInput.append("请你扮演一个数据分析师，接下来我会给你我的分析目标和原始数据，请告诉我分析结论。").append("\n");
		userInput.append("目标：").append(chart.getGoal()).append("，并以" + chart.getChartType() + "的形式展示").append("\n");
		// Excel文件转CSV数据
		userInput.append("数据：").append("\n").append(chart.getChartData());
		return userInput.toString();
	}
}