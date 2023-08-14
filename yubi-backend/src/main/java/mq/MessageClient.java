package mq;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @description: 发送消息客户端
 * @author: Mr.Ye
 * @since: 2023/8/6 15:19
 */
@Component
public class MessageClient {
	@Resource
	private RabbitTemplate rabbitTemplate;

	public void sendMessage(String exchange, String routingKey, String message) {
		rabbitTemplate.convertAndSend(exchange, routingKey, message);
	}
}