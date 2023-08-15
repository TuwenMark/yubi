package com.winter.yubi.mq;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import lombok.SneakyThrows;

/**
 * @program: yubi-backend
 * @description: MQ初始化
 * @author: Mr.Ye
 * @create: 2023-08-15 21:14
 **/
public class Init {
	private static final String EXCHANGE_NAME = "code_test_exchange";
	private static final String QUEUE_NAME = "code_test_queue";
	private static final String ROUTING_KEY = "code_test_key";
	@SneakyThrows
	public static void main(String[] args) {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("192.168.15.134");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		// 创建交换机
		channel.exchangeDeclare(EXCHANGE_NAME, "direct");
		// 创建队列
		channel.queueDeclare(QUEUE_NAME, true, false, false, null);
		channel.queueBind(QUEUE_NAME, EXCHANGE_NAME, ROUTING_KEY);
	}
}
