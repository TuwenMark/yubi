package mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

/**
 * @description: 第三种消费者
 * @author: Mr.Ye
 * @since: 2023/8/3 21:04}
 */
public class FanoutReceiver {
	private static final String EXCHANGE_NAME = "fanout_type";
	private static final String queueName1 = "xiaoming_queue";
	private static final String queueName2 = "xiaowang_queue";

	public static void main(String[] argv) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel1 = connection.createChannel();
		channel1.exchangeDeclare(EXCHANGE_NAME, "fanout");
		channel1.queueDeclare(queueName1, false, false, false, null);
		channel1.queueBind(queueName1, EXCHANGE_NAME, "");

		Channel channel2 = connection.createChannel();
		channel2.queueDeclare(queueName2, false, false, false, null);
		channel2.queueBind(queueName2, EXCHANGE_NAME, "");

		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

		DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] xiaoming Received '" + message + "'");
		};

		DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] xiaowang Received '" + message + "'");
		};
		channel1.basicConsume(queueName1, true, deliverCallback1, consumerTag -> { });
		channel2.basicConsume(queueName2, true, deliverCallback2, consumerTag -> { });
	}
}