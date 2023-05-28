import {listMyChartByPageUsingPOST} from '@/services/yubi/chartController';
import {message,} from 'antd';
import React, {useEffect, useState} from 'react';

const MyChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const initialParams = {
    pageSize: 5,
  }
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({...initialParams});
  const [chartList, setChartList] = useState<API.Chart[]>([])
  const [total, setTotal] = useState<number>(0)

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res?.data?.records) {
        setChartList(res.data.records);
        setTotal(res.data.total ?? 0)
      }else {
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
    <div>
      数据列表：
      {JSON.stringify(chartList)}
      <br/>
      总数：{total}
    </div>
  );
};
export default MyChart;
