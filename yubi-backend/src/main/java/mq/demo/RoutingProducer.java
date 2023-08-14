package mq.demo;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.util.Scanner;

/**
 * @description: 路由模式生产者——发送消息和绑定交换机多了路由键，发送给指定队列，direct类型交换机
 * @author: Mr.Ye
 * @since: 2023/8/6 9:59
 */
public class RoutingProducer {
	private static final String EXCHANGE_NAME = "direct_logs";

	public static void main(String[] args) throws Exception {
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		try {
			Connection connection = factory.newConnection();
			Channel channel = connection.createChannel();
			channel.exchangeDeclare(EXCHANGE_NAME, "direct");
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
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}