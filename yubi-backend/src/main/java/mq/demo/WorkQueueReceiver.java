package mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

/**
 * @description: 单消费者
 * @author: Mr.Ye
 * @since: 2023/8/3 20:33}
 */
public class WorkQueueReceiver {
	private static final String TASK_QUEUE_NAME = "task_queue";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		final Connection connection = factory.newConnection();
		final Channel channel1 = connection.createChannel();
		final Channel channel2 = connection.createChannel();

		channel1.queueDeclare(TASK_QUEUE_NAME, true, false, false, null);
		System.out.println(" [*] Waiting for messages. To exit press CTRL+C");

		channel1.basicQos(1);
		channel2.basicQos(1);

		DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Channel1 Received '" + message + "'");
			channel1.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
			//try {
			//	Thread.sleep(3000);
			//} catch (InterruptedException e) {
			//	throw new RuntimeException(e);
			//}
		};

		DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Channel2 Received '" + message + "'");
			channel2.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
			//try {
			//	Thread.sleep(3000);
			//} catch (InterruptedException e) {
			//	throw new RuntimeException(e);
			//}
		};
		channel1.basicConsume(TASK_QUEUE_NAME, false, deliverCallback1, consumerTag -> {
		});
		channel2.basicConsume(TASK_QUEUE_NAME, false, deliverCallback2, consumerTag -> {
		});
	}

	private static void doWork(String task) {
		for (char ch : task.toCharArray()) {
			if (ch == '.') {
				try {
					Thread.sleep(1000);
				} catch (InterruptedException _ignored) {
					Thread.currentThread().interrupt();
				}
			}
		}
	}
}