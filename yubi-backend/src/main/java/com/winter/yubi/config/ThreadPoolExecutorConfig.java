package com.winter.yubi.config;

import org.jetbrains.annotations.NotNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * 线程池配置
 *
 * @author Mr.Ye
 * @date 2023/7/16
 */
@Configuration
public class ThreadPoolExecutorConfig {
	private int threadNumber = 1;
	ThreadFactory threadFactory = new ThreadFactory() {
		@Override
		public Thread newThread(@NotNull Runnable r) {
			Thread thread = new Thread(r);
			thread.setName("线程" + threadNumber);
			threadNumber++;
			return thread;
		}
	};
	@Bean
	public ThreadPoolExecutor threadPoolExecutor() {
		return new ThreadPoolExecutor(2, 4, 600, TimeUnit.SECONDS, new ArrayBlockingQueue<>(2), threadFactory);
	}
}
