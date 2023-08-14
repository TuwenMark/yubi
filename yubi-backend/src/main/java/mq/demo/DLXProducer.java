package mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import java.util.Scanner;

/**
 * @description: 死信队列生产者
 * @author: Mr.Ye
 * @since: 2023/8/6 9:59
 */
public class DLXProducer {
	private static final String WORK_EXCHANGE_NAME = "normal_exchange";
	private static final String DLX_EXCHANGE_NAME = "dlx_exchange";
	private static final String DLX_QUEUE_BOSS = "dlx_boss_queue";
	private static final String DLX_QUEUE_OUT = "dlx_out_queue";
	private static final String LI_ROUTING = "xiaoli";
	private static final String WANG_ROUTING = "xiaowang";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try {
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			// 创建正常交换机
			channel.exchangeDeclare(WORK_EXCHANGE_NAME, "direct");
			// 创建死信交换机
			channel.exchangeDeclare(DLX_EXCHANGE_NAME, "direct");
			// 创建死信队列
			channel.queueDeclare(DLX_QUEUE_BOSS, true, false, false, null);
			channel.queueDeclare(DLX_QUEUE_OUT, true, false, false, null);
			// 死信队列绑定交换机：小李发给boss，小王发给外包
			channel.queueBind(DLX_QUEUE_BOSS, DLX_EXCHANGE_NAME, LI_ROUTING);
			channel.queueBind(DLX_QUEUE_OUT, DLX_EXCHANGE_NAME, WANG_ROUTING);
			// Boss和外包消费消息
			DeliverCallback deliverCallback1 = (consumerTag, delivery) -> {
				String message = new String(delivery.getBody(), "UTF-8");
				System.out.println(" [Boss] Received '" +
						delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
			};

			DeliverCallback deliverCallback2 = (consumerTag, delivery) -> {
				String message = new String(delivery.getBody(), "UTF-8");
				System.out.println(" [外包] Received '" +
						delivery.getEnvelope().getRoutingKey() + "':'" + message + "'");
			};

			channel.basicConsume(DLX_QUEUE_BOSS, true, deliverCallback1, consumerTag -> { });
			channel.basicConsume(DLX_QUEUE_OUT, true, deliverCallback2, consumerTag -> { });
			Scanner scanner = new Scanner(System.in);
			while (scanner.hasNext()) {
				String[] messages = scanner.nextLine().split(" ");
				if (messages.length != 2) {
					continue;
				}
				String routingKey = messages[0];
				String message = messages[1];
				channel.basicPublish(WORK_EXCHANGE_NAME, routingKey, null, message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + routingKey + "':'" + message + "'");
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}