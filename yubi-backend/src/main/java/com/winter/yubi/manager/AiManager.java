package com.winter.yubi.manager;

import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.exception.BusinessException;
import com.winter.yubi.exception.ThrowUtils;
import com.yupi.yucongming.dev.client.YuCongMingClient;
import com.yupi.yucongming.dev.common.BaseResponse;
import com.yupi.yucongming.dev.model.DevChatRequest;
import com.yupi.yucongming.dev.model.DevChatResponse;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class AiManager {
	@Resource
	private YuCongMingClient yuCongMingClient;

	public String doChat(String message) {
		DevChatRequest chartAiRequest = new DevChatRequest();
		chartAiRequest.setModelId(1664835510847168514L);
		chartAiRequest.setMessage(message);
		BaseResponse<DevChatResponse> aiResponse = yuCongMingClient.doChat(chartAiRequest);
		if (aiResponse == null) {
			throw new BusinessException(ErrorCode.SYSTEM_ERROR, "AI返回结果为Null");
		}
		String content = aiResponse.getData().getContent();
		ThrowUtils.throwIf(StringUtils.isBlank(content), ErrorCode.SYSTEM_ERROR, "调用AI失败");
		return content;
	}
}
