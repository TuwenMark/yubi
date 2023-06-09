import {listMyChartByPageUsingPOST} from '@/services/yubi/chartController';
import {Avatar, Card, List, message, Skeleton,} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactECharts from "echarts-for-react";
import {useModel} from "@umijs/max";
import Search from "antd/es/input/Search";

const MyChart: React.FC = () => {
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const [loading, setLoading] = useState<boolean>(false);
  const initialParams = {
    pageSize: 5,
    current: 1,
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initialParams});
  const [chartList, setChartList] = useState<API.Chart[]>([])
  const [total, setTotal] = useState<number>(0)

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res?.data?.records) {
        res?.data?.records.forEach(data => {
          const chartOption = JSON.parse(data.genChart??'');
          chartOption.title = undefined;
          data.genChart = JSON.stringify(chartOption)
        })
        console.log(res.data.records[0])
        setChartList(res.data.records);
        setTotal(res.data.total ?? 0)
      } else {
        message.error("获取图表失败，无图表信息");
      }
    } catch (e) {
      message.error("获取图表失败：" + e);
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData();
  }, [searchParams])

  return (
      <Skeleton loading={loading} active={true}>
        <Search placeholder="请输入图表名称" loading={loading} onSearch={(value) => {
          // 带上初始搜索条件，这样才会到第一页
          setSearchParams({
            ...initialParams,
            name: value
          })
        }} />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 2,
            xxl: 2,
          }}
          pagination={{
            onChange: (page, pageSize) => {
              setSearchParams({
                ...searchParams,
                current: page,
                pageSize: pageSize
              })
            },
            pageSize: 4,
            current: searchParams.current,
            total: total
          }}
          dataSource={chartList}
          renderItem={(item) => (
            <Card>
              <List.Item
                key={item.id}
              >
                <List.Item.Meta
                  avatar={<Avatar src={currentUser?.userAvatar} />}
                  title={<div>{item.name}</div>}
                  description={<div><div className="margin-15">图表类型：{item.chartType}</div><div>分析结论：{item.genResult}</div></div>}
                />
                <div>
                  <ReactECharts option={JSON.parse(item.genChart ?? '')}/>
                </div>
              </List.Item>
            </Card>
          )}
        />
      </Skeleton>
  );
};
export default MyChart;
