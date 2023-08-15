package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.util.Scanner;

/**
 * @description: Topic模式——路由键可以使用通配符进行模糊匹配
 * @author: Mr.Ye
 * @since: 2023/8/6 10:51
 */
public class TopicProducer {
	private static final String EXCHANGE_NAME = "topic_exchange";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try (Connection connection = factory.newConnection();
			 Channel channel = connection.createChannel()) {
			channel.exchangeDeclare(EXCHANGE_NAME, "topic");

			Scanner scanner = new Scanner(System.in);
			while (scanner.hasNext()) {
				String[] messages = scanner.nextLine().split(" ");
				if (messages.length != 2) {
					continue;
				}
				String routingKey = messages[0];
				String message = messages[1];
				channel.basicPublish(EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + routingKey + "':'" + message + "'");
			}
		}
	}
}