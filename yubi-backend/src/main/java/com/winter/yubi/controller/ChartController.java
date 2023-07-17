package com.winter.yubi.controller;

import cn.hutool.core.io.FileUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.gson.Gson;
import com.winter.yubi.annotation.AuthCheck;
import com.winter.yubi.common.BaseResponse;
import com.winter.yubi.common.DeleteRequest;
import com.winter.yubi.common.ErrorCode;
import com.winter.yubi.common.ResultUtils;
import com.winter.yubi.constant.UserConstant;
import com.winter.yubi.exception.BusinessException;
import com.winter.yubi.exception.ThrowUtils;
import com.winter.yubi.manager.AiManager;
import com.winter.yubi.manager.RedissonManager;
import com.winter.yubi.model.dto.chart.*;
import com.winter.yubi.model.entity.Chart;
import com.winter.yubi.model.entity.User;
import com.winter.yubi.model.vo.GenChartVO;
import com.winter.yubi.service.ChartService;
import com.winter.yubi.service.UserService;
import com.winter.yubi.utils.ExcelUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import static com.winter.yubi.constant.FileConstant.ALLOWED_FILE_TYPES;
import static com.winter.yubi.constant.FileConstant.XLSX_FILE_SIZE;
import static com.winter.yubi.constant.RedisConstant.METHOD_Gen_CHART;
import static com.winter.yubi.constant.UserConstant.RATE_LIMIT_PREFIX;

/**
 * 帖子接口
 *
 * @author <a href="https://github.com/liyupi">程序员鱼皮</a>
 * @from <a href="https://yupi.icu">编程导航知识星球</a>
 */
@RestController
@RequestMapping("/chart")
@Slf4j
public class ChartController {

    @Resource
    private ChartService chartService;

    @Resource
    private UserService userService;

    @Resource
    private AiManager aiManager;

    @Resource
    private RedissonManager redissonManager;

    private final static Gson GSON = new Gson();

    // region 增删改查

    /**
     * 创建
     *
     * @param chartAddRequest
     * @param request
     * @return
     */
    @PostMapping("/add")
    public BaseResponse<Long> addChart(@RequestBody ChartAddRequest chartAddRequest, HttpServletRequest request) {
        if (chartAddRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Chart chart = new Chart();
        BeanUtils.copyProperties(chartAddRequest, chart);
        chartService.validChart(chart, true);
        User loginUser = userService.getLoginUser(request);
        chart.setUserId(loginUser.getId());
        boolean result = chartService.save(chart);
        ThrowUtils.throwIf(!result, ErrorCode.OPERATION_ERROR);
        long newChartId = chart.getId();
        return ResultUtils.success(newChartId);
    }

    /**
     * 删除
     *
     * @param deleteRequest
     * @param request
     * @return
     */
    @PostMapping("/delete")
    public BaseResponse<Boolean> deleteChart(@RequestBody DeleteRequest deleteRequest, HttpServletRequest request) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User user = userService.getLoginUser(request);
        long id = deleteRequest.getId();
        // 判断是否存在
        Chart oldChart = chartService.getById(id);
        ThrowUtils.throwIf(oldChart == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可删除
        if (!oldChart.getUserId().equals(user.getId()) && !userService.isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean b = chartService.removeById(id);
        return ResultUtils.success(b);
    }

    /**
     * 更新（仅管理员）
     *
     * @param chartUpdateRequest
     * @return
     */
    @PostMapping("/update")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> updateChart(@RequestBody ChartUpdateRequest chartUpdateRequest) {
        if (chartUpdateRequest == null || chartUpdateRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Chart chart = new Chart();
        BeanUtils.copyProperties(chartUpdateRequest, chart);
        // 参数校验
        chartService.validChart(chart, false);
        long id = chartUpdateRequest.getId();
        // 判断是否存在
        Chart oldChart = chartService.getById(id);
        ThrowUtils.throwIf(oldChart == null, ErrorCode.NOT_FOUND_ERROR);
        boolean result = chartService.updateById(chart);
        return ResultUtils.success(result);
    }

    /**
     * 根据 id 获取封装类
     *
     * @param id
     * @return
     */
    @GetMapping("/get")
    public BaseResponse<Chart> getChartById(long id, HttpServletRequest request) {
        if (id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Chart chart = chartService.getById(id);
        if (chart == null) {
            throw new BusinessException(ErrorCode.NOT_FOUND_ERROR);
        }
        // TODO 返回封装类
        return ResultUtils.success(chart);
    }

    /**
     * 分页获取列表（封装类）
     *
     * @param chartQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/list/page")
    public BaseResponse<Page<Chart>> listChartByPage(@RequestBody ChartQueryRequest chartQueryRequest,
            HttpServletRequest request) {
        long current = chartQueryRequest.getCurrent();
        long size = chartQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Chart> chartPage = chartService.page(new Page<>(current, size),
                chartService.getQueryWrapper(chartQueryRequest));
        // TODO 返回封装类
        return ResultUtils.success(chartPage);
    }

    /**
     * 分页获取当前用户创建的资源列表
     *
     * @param chartQueryRequest
     * @param request
     * @return
     */
    @PostMapping("/my/list/page")
    public BaseResponse<Page<Chart>> listMyChartByPage(@RequestBody ChartQueryRequest chartQueryRequest,
            HttpServletRequest request) {
        if (chartQueryRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        User loginUser = userService.getLoginUser(request);
        chartQueryRequest.setUserId(loginUser.getId());
        long current = chartQueryRequest.getCurrent();
        long size = chartQueryRequest.getPageSize();
        // 限制爬虫
        ThrowUtils.throwIf(size > 20, ErrorCode.PARAMS_ERROR);
        Page<Chart> chartPage = chartService.page(new Page<>(current, size),
                chartService.getQueryWrapper(chartQueryRequest));
        // TODO 返回封装类
        return ResultUtils.success(chartPage);
    }

    /**
     * 编辑（用户）
     *
     * @param chartEditRequest
     * @param request
     * @return
     */
    @PostMapping("/edit")
    public BaseResponse<Boolean> editChart(@RequestBody ChartEditRequest chartEditRequest, HttpServletRequest request) {
        if (chartEditRequest == null || chartEditRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Chart chart = new Chart();
        BeanUtils.copyProperties(chartEditRequest, chart);
        // 参数校验
        chartService.validChart(chart, false);
        User loginUser = userService.getLoginUser(request);
        long id = chartEditRequest.getId();
        // 判断是否存在
        Chart oldChart = chartService.getById(id);
        ThrowUtils.throwIf(oldChart == null, ErrorCode.NOT_FOUND_ERROR);
        // 仅本人或管理员可编辑
        if (!oldChart.getUserId().equals(loginUser.getId()) && !userService.isAdmin(loginUser)) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR);
        }
        boolean result = chartService.updateById(chart);
        return ResultUtils.success(result);
    }

    @PostMapping("/gen")
    public BaseResponse<GenChartVO> genChartByAi(@RequestPart("file") MultipartFile multipartFile, GenChartByAiRequest genChartByAiRequest, HttpServletRequest request){
        // 用户登录校验
        User loginUser = userService.getLoginUser(request);
        if (loginUser == null || loginUser.getId() < 0) {
            throw new BusinessException(ErrorCode.NO_AUTH_ERROR, "用户未登录！");
        }
        // 限流，每个用户Id限制每秒1个请求
        redissonManager.doRateLimit(RATE_LIMIT_PREFIX + loginUser.getId());

        String goal = genChartByAiRequest.getGoal();
        String name = genChartByAiRequest.getName();
        String chartType = genChartByAiRequest.getChartType();

        // 校验输入参数
        ThrowUtils.throwIf(StringUtils.isAnyBlank(goal, name, chartType), new BusinessException(ErrorCode.PARAMS_ERROR,"请求参数错误！"));
        ThrowUtils.throwIf(name.length() > 100, new BusinessException(ErrorCode.PARAMS_ERROR, "表格名称过长！"));

        // 校验文件后缀和大小
        ThrowUtils.throwIf(!ALLOWED_FILE_TYPES.contains(FileUtil.getSuffix(multipartFile.getOriginalFilename())), new BusinessException(ErrorCode.PARAMS_ERROR, "不支持的文件类型"));
        ThrowUtils.throwIf(multipartFile.getSize() > XLSX_FILE_SIZE, new BusinessException(ErrorCode.PARAMS_ERROR, "表格过大"));

        // 限流
        redissonManager.doRateLimiter(METHOD_Gen_CHART + loginUser.getId());

        // 用户文本输入
        StringBuilder userInput = new StringBuilder();
        //userInput.append("请你扮演一个数据分析师，接下来我会给你我的分析目标和原始数据，请告诉我分析结论。").append("\n");
        userInput.append("目标：").append(goal).append("，并以" + chartType + "的形式展示").append("\n");
        // Excel文件转CSV数据
        String data = ExcelUtil.excelToCsv(multipartFile);
        userInput.append("数据：").append("\n").append(data);
        System.out.println(userInput.toString());
        // 调用鱼聪明模型
        String[] aiResponse  = aiManager.doChat(userInput.toString()).split("【【【【【");
        System.out.println(aiResponse);
        ThrowUtils.throwIf(aiResponse.length != 2, ErrorCode.SYSTEM_ERROR, "调用AI返回结果格式有误!数据如下：\n" + aiResponse);
        // 取出结果返回并保存数据库
        String genChart = aiResponse[0].trim();
        String genResult = aiResponse[1].trim();
        Chart chart = new Chart();
        chart.setGoal(goal);
        chart.setName(name);
        chart.setChartData(data);
        chart.setChartType(chartType);
        chart.setGenChart(genChart);
        chart.setGenResult(genResult);
        chart.setUserId(loginUser.getId());
        boolean saveResult = chartService.save(chart);
        ThrowUtils.throwIf(!saveResult, ErrorCode.SYSTEM_ERROR, "保存图表数据失败！");
        GenChartVO genChartVO = new GenChartVO();
        genChartVO.setGenChart(genChart);
        genChartVO.setGenResult(genResult);
        return ResultUtils.success(genChartVO);
    }

}
