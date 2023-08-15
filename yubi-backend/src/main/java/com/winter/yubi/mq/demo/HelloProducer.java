package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.util.Scanner;

/**
 * @description: 第一种：单消费者模式——一个生产者对一个队列一个消费者
 * @author: Mr.Ye
 * @since: 2023/8/2 23:36}
 */
public class HelloProducer {
	private final static String QUEUE_NAME = "hello";

	public static void main(String[] args) {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try {
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			channel.queueDeclare(QUEUE_NAME, false, false, false, null);
			Scanner scanner = new Scanner(System.in);
			while (scanner.hasNext()) {
				String message = scanner.nextLine();
				channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
				System.out.println(" [x] Sent '" + message + "'");
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}