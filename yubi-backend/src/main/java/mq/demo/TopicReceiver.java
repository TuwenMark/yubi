package mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

/**
 * @description: 主题模式
 * @author: Mr.Ye
 * @since: 2023/8/6 10:52
 */
public class TopicReceiver {
	private static final String EXCHANGE_NAME = "topic_exchange";
	private static final String QUEUE_NAME1 = "fronted_queue";
	private static final String QUEUE_NAME2 = "backend_queue";
	private static final String QUEUE_NAME3 = "test_queue";

	private static final String ROUTING_KEY1 = "#.fronted.#";
	private static final String ROUTING_KEY2 = "#.backend.#";
	private static final String ROUTING_KEY3 = "#.test.#";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		channel.exchangeDeclare(EXCHANGE_NAME, "topic");
		
		channel.queueDeclare(QUEUE_NAME1, true, false, false, null);
		channel.queueBind(QUEUE_NAME1, EXCHANGE_NAME, ROUTING_KEY1);

		channel.queueDeclare(QUEUE_NAME2, true, false, false, null);
		channel.queueBind(QUEUE_NAME2, EXCHANGE_NAME, ROUTING_KEY2);

		channel.queueDeclare(QUEUE_NAME3, true, false, false, null);
		channel.queueBind(QUEUE_NAME3, EXCHANGE_NAME, ROUTING_KEY3);

		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

		DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [fronted] Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
		};

		DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [backend] Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
		};

		DeliverCallback deliverCallback3 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [test] Received '" +
					delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
		};


		channel.basicConsume(QUEUE_NAME1, true, deliverCallback1, consumerTag -> { });
		channel.basicConsume(QUEUE_NAME2, true, deliverCallback2, consumerTag -> { });
		channel.basicConsume(QUEUE_NAME3, true, deliverCallback3, consumerTag -> { });
	}
}