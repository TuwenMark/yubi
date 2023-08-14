package mq;

import com.rabbitmq.client.Channel;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

/**
 * @description: 处理消息
 * @author: Mr.Ye
 * @since: 2023/8/6 15:45
 */
@Component
@Slf4j
public class MessageHandler {
	@SneakyThrows
	@RabbitListener(queues = {"code_test_queue"}, ackMode = "MANUAL")
	public void receiveMessage(String message, Channel channel, @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag) {
		log.info("Receive message: {}", message);
		channel.basicAck(deliveryTag, false);
	}
}