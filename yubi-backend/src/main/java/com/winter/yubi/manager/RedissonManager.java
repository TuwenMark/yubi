package com.winter.yubi.manager;

import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.exception.BusinessException;
import com.winter.yubi.exception.ThrowUtils;
import org.redisson.api.RRateLimiter;
import org.redisson.api.RateIntervalUnit;
import org.redisson.api.RateType;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

/**
 * @program: yubi-backend
 * @description: Redisson操作管理类
 * @author: Mr.Ye
 * @create: 2023-06-11 22:36
 **/
@Component
public class RedissonManager {
	@Resource
	private RedissonClient redissonClient;

	public void doRateLimit(String key) {
		RRateLimiter rateLimiter = redissonClient.getRateLimiter(key);
		rateLimiter.trySetRate(RateType.OVERALL, 1, 1, RateIntervalUnit.SECONDS);
		ThrowUtils.throwIf(!rateLimiter.tryAcquire(1), new BusinessException(ErrorCode.TOO_MANY_REQUESTS_ERROR));
	}
}
