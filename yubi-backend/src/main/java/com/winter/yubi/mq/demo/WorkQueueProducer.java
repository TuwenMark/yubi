package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.MessageProperties;

import java.util.Scanner;

/**
 * @description: 第二种：WorkQueues模式——一个生产者对一个队列多个消费者
 * @author: Mr.Ye
 * @since: 2023/8/3 20:30}
 */
public class WorkQueueProducer {
	private static final String TASK_QUEUE_NAME = "task_queue";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try (Connection connection = factory.newConnection();
			 Channel channel = connection.createChannel()) {
			channel.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
			Scanner scanner = new Scanner(System.in);
			while (scanner.hasNext()) {
				String message = scanner.nextLine();
				channel.basicPublish("", TASK_QUEUE_NAME,
						MessageProperties.PERSISTENT_TEXT_PLAIN,
						message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + message + "'");
			}
		}
	}
}