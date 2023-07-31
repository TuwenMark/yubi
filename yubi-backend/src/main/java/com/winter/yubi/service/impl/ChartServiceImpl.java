package com.winter.yubi.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.constant.CommonConstant;
import com.winter.yubi.exception.BusinessException;
import com.winter.yubi.exception.ThrowUtils;
import com.winter.yubi.mapper.ChartMapper;
import com.winter.yubi.model.dto.chart.ChartQueryRequest;
import com.winter.yubi.model.entity.Chart;
import com.winter.yubi.service.ChartService;
import com.winter.yubi.service.UserService;
import com.winter.yubi.utils.SqlUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author m1869
* @description 针对表【chart(图表信息表)】的数据库操作Service实现
* @createDate 2023-04-30 17:13:17
*/
@Service
public class ChartServiceImpl extends ServiceImpl<ChartMapper, Chart>
    implements ChartService{

	@Resource
	private UserService userService;

	@Override
	public void validChart(Chart chart, boolean add) {
		if (chart == null) {
			throw new BusinessException(ErrorCode.PARAMS_ERROR);
		}
		String goal = chart.getGoal();
		String name = chart.getName();
		String type = chart.getChartType();
		// TODO charData应该需要判断类型和后缀
		String chartData = chart.getChartData();
		// 创建时，参数不能为空
		if (add) {
			ThrowUtils.throwIf(StringUtils.isAnyBlank(goal, name, type, chartData), ErrorCode.PARAMS_ERROR);
		}
		// 有参数则校验
		if (StringUtils.isNotBlank(goal) && goal.length() > 80) {
			throw new BusinessException(ErrorCode.PARAMS_ERROR, "目标过长");
		}
		// TODO 此处的图表类型应该设置成枚举
		if (StringUtils.isNotBlank(type) && type.length() > 8192) {
			throw new BusinessException(ErrorCode.PARAMS_ERROR, "类型过长");
		}
	}

	@Override
	public QueryWrapper<Chart> getQueryWrapper(ChartQueryRequest chartQueryRequest) {
		QueryWrapper<Chart> queryWrapper = new QueryWrapper<>();
		if (chartQueryRequest == null) {
			return queryWrapper;
		}
		Long id = chartQueryRequest.getId();
		String goal = chartQueryRequest.getGoal();
		String name = chartQueryRequest.getName();
		String chartType = chartQueryRequest.getChartType();
		Long userId = chartQueryRequest.getUserId();
		String sortField = chartQueryRequest.getSortField();
		String sortOrder = chartQueryRequest.getSortOrder();
		// 拼接查询条件
		queryWrapper.eq(id != null && id > 0, "id", id);
		queryWrapper.like(StringUtils.isNotBlank(goal), "goal", goal);
		queryWrapper.like(StringUtils.isNotBlank(name), "name", name);
        queryWrapper.eq(StringUtils.isNotBlank(chartType), "chartType", chartType);
		// queryWrapper.eq("isDelete", false);
		queryWrapper.orderBy(SqlUtils.validSortField(sortField), sortOrder.equals(CommonConstant.SORT_ORDER_ASC),
				sortField);
		return queryWrapper;
	}
}




