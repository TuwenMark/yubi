package com.winter.yubi.controller;

import cn.hutool.json.JSONUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * 队列测试接口
 *
 * @author Mr.Ye
 */
@RestController
@RequestMapping("/queue")
@Slf4j
@Profile("dev")
public class QueueController {

    @Resource
    private ThreadPoolExecutor threadPoolExecutor;

    @GetMapping("/add")
    public void add(String name) {
        CompletableFuture.runAsync(() -> {
            System.out.println(name + "开始执行" + "，执行人：" + Thread.currentThread().getName());
            try {
                Thread.sleep(600000);
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }, threadPoolExecutor);
    }

    @GetMapping("/get")
    public String get() {
        // 队列信息
        Map<String, Object> queueMap = new HashMap<>();
        // 队列的长度
        int queueSize = threadPoolExecutor.getQueue().size();
        queueMap.put("队列长度", queueSize);
        // 线程池大小
        int poolSize = threadPoolExecutor.getPoolSize();
        queueMap.put("线程池大小", poolSize);
        // 线程池活跃线程数
        int activeCount = threadPoolExecutor.getActiveCount();
        queueMap.put("活跃线程数", activeCount);
        // 任务总数
        long taskCount = threadPoolExecutor.getTaskCount();
        queueMap.put("任务总数", taskCount);
        // 已完成任务数
        long completedTaskCount = threadPoolExecutor.getCompletedTaskCount();
        queueMap.put("已完成任务数", completedTaskCount);
        return JSONUtil.toJsonStr(queueMap);
    }

}
