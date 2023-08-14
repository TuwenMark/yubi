package com.winter.yubi.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import lombok.SneakyThrows;
import mq.MessageClient;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

/**
 * @description:
 * @author: Mr.Ye
 * @since: 2023/8/6 16:00
 */
@SpringBootTest
class MessageClientTest {
	private static final String EXCHANGE_NAME = "code_test_exchange";
	private static final String QUEUE_NAME = "code_test_queue";
	private static final String ROUTING_KEY = "code_test_key";

	@Resource
	private MessageClient messageClient;

	@Test
	@SneakyThrows
	void initMQ() {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		// 创建交换机
		channel.exchangeDeclare(EXCHANGE_NAME, "direct");
		// 创建队列
		channel.queueDeclare(QUEUE_NAME, true, false, false, null);
		channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
	}

	@Test
	void sendMessage() {
		String message = "Hello, test";
		messageClient.sendMessage(EXCHANGE_NAME, ROUTING_KEY, message);
	}
}