package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import java.util.HashMap;
import java.util.Map;

/**
 * @description: 死信队列消费者
 * @author: Mr.Ye
 * @since: 2023/8/6 10:00
 */
public class DLXReceiver {
	private static final String WORK_EXCHANGE_NAME = "normal_exchange";
	private static final String QUEUE_NAME_LI = "li_queue";
	private static final String QUEUE_NAME_WANG = "wang_queue";
	private static final String DLX_EXCHANGE_NAME = "dlx_exchange";
	private static final String LI_ROUTING = "xiaoli";
	private static final String WANG_ROUTING = "xiaowang";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		channel.exchangeDeclare(WORK_EXCHANGE_NAME, "direct");
		// 声明正常队列并设置死信交换机、死信路由、过期时间
		Map<String, Object> liArgs = new HashMap<>();
		liArgs.put("x-expires", 3000);
		liArgs.put("x-dead-letter-exchange", DLX_EXCHANGE_NAME);
		liArgs.put("x-dead-letter-routing-key", LI_ROUTING);
		channel.queueDeclare(QUEUE_NAME_LI, true, false, false, liArgs);
		channel.queueBind(QUEUE_NAME_LI, WORK_EXCHANGE_NAME, LI_ROUTING);

		Map<String, Object> wangArgs = new HashMap<>();
		wangArgs.put("x-expires", 3000);
		wangArgs.put("x-dead-letter-exchange", DLX_EXCHANGE_NAME);
		wangArgs.put("x-dead-letter-routing-key", WANG_ROUTING);
		channel.queueDeclare(QUEUE_NAME_WANG, true, false, false, wangArgs);
		channel.queueBind(QUEUE_NAME_WANG, WORK_EXCHANGE_NAME, WANG_ROUTING);

		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

		DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [xiaoli] Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
			// 模拟消息处理失败
			channel.basicNack(delivery.getEnvelope().getDeliveryTag(), false, false);
		};

		DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [xiaowang] Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
			channel.basicNack(delivery.getEnvelope().getDeliveryTag(), false, false);
		};

		channel.basicConsume(QUEUE_NAME_LI, false, deliverCallback1, consumerTag -> { });
		channel.basicConsume(QUEUE_NAME_WANG, false, deliverCallback2, consumerTag -> { });
	}
}