package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.util.Scanner;

/**
 * @description: 第三种：发布订阅模式——一个生产者对多个队列
 * @author: Mr.Ye
 * @since: 2023/8/3 20:52}
 */
public class FanoutProducer {
	private static final String EXCHANGE_NAME = "fanout_type";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try {
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
			Scanner scanner = new Scanner(System.in);
			while (scanner.hasNext()) {
				String message = scanner.nextLine();
				channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + message + "'");
			}
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}
}