package com.winter.yubi.manager;

import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.exception.ThrowUtils;
import com.yupi.yucongming.dev.client.YuCongMingClient;
import com.yupi.yucongming.dev.model.DevChatRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class AiManager {
	@Resource
	private YuCongMingClient yuCongMingClient;

	public String doChat(String message) {
		DevChatRequest chartAiRequest = new DevChatRequest();
		chartAiRequest.setModelId(1659171950288818178L);
		chartAiRequest.setMessage(message);
		yuCongMingClient.doChat(chartAiRequest);
		String content = yuCongMingClient.doChat(chartAiRequest).getData().getContent();
		ThrowUtils.throwIf(StringUtils.isBlank(content), ErrorCode.SYSTEM_ERROR, "调用AI失败");
		return content;
	}
}
