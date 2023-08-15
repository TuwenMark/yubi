package com.winter.yubi.mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

/**
 * @description: 路由模式消费者
 * @author: Mr.Ye
 * @since: 2023/8/6 10:00
 */
public class RoutingReceiver {
	private static final String EXCHANGE_NAME = "direct_logs";
	private static final String QUEUE_NAME1 = "info_queue";
	private static final String QUEUE_NAME2 = "error_queue";

	private static final String ROUTING_KEY1 = "info";
	private static final String ROUTING_KEY2 = "error";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();

		channel.exchangeDeclare(EXCHANGE_NAME, "direct");
		channel.queueDeclare(QUEUE_NAME1, true, false, false, null);
		channel.queueBind(QUEUE_NAME1, EXCHANGE_NAME, ROUTING_KEY1);
		channel.queueDeclare(QUEUE_NAME2, true, false, false, null);
		channel.queueBind(QUEUE_NAME2, EXCHANGE_NAME, ROUTING_KEY2);

		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

		DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Info Log Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
		};

		DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Error Log Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
		};

		channel.basicConsume(QUEUE_NAME1, true, deliverCallback1, consumerTag -> { });
		channel.basicConsume(QUEUE_NAME2, true, deliverCallback2, consumerTag -> { });
	}
}