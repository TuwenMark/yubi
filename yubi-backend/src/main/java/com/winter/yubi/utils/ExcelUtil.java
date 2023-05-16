package com.winter.yubi.utils;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.support.ExcelTypeEnum;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


/**
 * @program: yubi-backend
 * @description: 处理Excel文件工具类
 * @author: Mr.Ye
 * @create: 2023-05-16 22:14
 **/
@Slf4j
public class ExcelUtil {
	public static String excelToCsv(MultipartFile multipartFile) {
		// File file = null;
		// try {
		// 	file = ResourceUtils.getFile("classpath:日流量表.xlsx");
		// } catch (IOException e) {
		// 	throw new RuntimeException(e);
		// }
		List<Map<Integer, String>> list = null;
		try {
			list = EasyExcel.read(multipartFile.getInputStream())
					.excelType(ExcelTypeEnum.XLSX)
					.sheet()
					.headRowNumber(0)
					.doReadSync();
		} catch (IOException e) {
			log.error("表格处理错误", e);
		}
		// 转换为CSV
		StringBuilder sb = new StringBuilder();
		// 获取表头
		LinkedHashMap<Integer, String> headerMap = (LinkedHashMap) list.get(0);
		List<String> headerList = headerMap.values().stream().filter(StringUtils::isNotEmpty).collect(Collectors.toList());
		String headerStr = StringUtils.join(headerList, ",");
		sb.append(headerStr).append("\n");

		// 获取数据
		for (int i = 1; i < list.size(); i++) {
			LinkedHashMap<Integer, String> dataMap = (LinkedHashMap) list.get(i);
			List<String> dataList = dataMap.values().stream().filter(StringUtils::isNotEmpty).collect(Collectors.toList());
			String dataStr = StringUtils.join(dataList, ",");
			sb.append(dataStr).append("\n");
		}
		return sb.toString();
	}
}
