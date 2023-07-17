package com.winter.yubi.manager;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
class RedissonManagerTest {
	@Resource
	private RedissonManager redissonManager;

	String userId = "1";

	@Test
	void testDoRateLimiter() {
		for (int i = 0; i < 5; i++) {
			redissonManager.doRateLimiter(userId);
			System.out.println("请求成功！");
		}
	}
}