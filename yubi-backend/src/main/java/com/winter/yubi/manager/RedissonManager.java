package com.winter.yubi.manager;

import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.exception.BusinessException;
import org.redisson.api.RRateLimiter;
import org.redisson.api.RateIntervalUnit;
import org.redisson.api.RateType;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * 操作Redisson的工具类
 *
 * @author Mr.Ye
 * @date 2023/7/16
 */
@Service
public class RedissonManager {
	@Resource
	private RedissonClient redissonClient;

	/**
	 * 限流
	 *
	 * @param key 区分不同的限流器，比如用户id，不同的用户分别统计
	 */
	public void doRateLimiter(String key) {
		// 获取限流器并设置限流
		RRateLimiter rateLimiter = redissonClient.getRateLimiter(key);
		rateLimiter.trySetRate(RateType.OVERALL, 1, 1, RateIntervalUnit.SECONDS);
		boolean isSuccess = rateLimiter.tryAcquire(1);
		//ThrowUtils.throwIf(!isSuccess, new BusinessException(ErrorCode.TOO_MANY_REQUESTS));
		if (!isSuccess) {
			throw new BusinessException(ErrorCode.TOO_MANY_REQUESTS);
		}
	}
}
