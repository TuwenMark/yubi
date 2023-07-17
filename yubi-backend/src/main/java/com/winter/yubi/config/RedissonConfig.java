package com.winter.yubi.config;

import lombok.Data;
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @program: yubi-backend
 * @description: Redission客户端配置
 * @author: Mr.Ye
 * @create: 2023-06-11 22:18
 **/
@Configuration
@ConfigurationProperties(prefix="spring.redisson")
@Data
public class RedissonConfig {
	private int database;

	private String host;

	private String port;

	private String password;

	@Bean
	public RedissonClient RedissonConfig() {
		Config config = new Config();
		config.useSingleServer()
				.setAddress("redis://" + host + ":" + port)
				.setDatabase(database)
				.setPassword(password);
		return Redisson.create(config);
	}
}
