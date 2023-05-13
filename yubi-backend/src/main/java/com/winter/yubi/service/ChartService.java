package com.winter.yubi.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.winter.yubi.model.dto.chart.ChartQueryRequest;
import com.winter.yubi.model.entity.Chart;

/**
* @author m1869
* @description 针对表【chart(图表信息表)】的数据库操作Service
* @createDate 2023-04-30 17:13:17
*/
public interface ChartService extends IService<Chart> {

	/**
	 * 校验
	 *
	 * @param chart
	 * @param add
	 */
	void validChart(Chart chart, boolean add);

	/**
	 * 获取查询条件
	 *
	 * @param chartQueryRequest
	 * @return
	 */
	QueryWrapper<Chart> getQueryWrapper(ChartQueryRequest chartQueryRequest);

}
