import { listMyChartByPageUsingPOST } from '@/services/yubi/chartController';
import { useModel } from '@umijs/max';
import { Avatar, Card, Col, List, message, Row, Select } from 'antd';
import Search from 'antd/es/input/Search';
import ReactECharts from 'echarts-for-react';
import React, { useEffect, useState } from 'react';

const MyChart: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const initialParams = {
    pageSize: 5,
    current: 1,
    sortField: 'createTime',
    sortOrder: 'desc',
  };
  const [searchParams, setSearchParams] = useState<API.ChartQueryRequest>({
    ...initialParams,
  });
  const [chartList, setChartList] = useState<API.Chart[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await listMyChartByPageUsingPOST(searchParams);
      if (res?.data?.records) {
        res?.data?.records.forEach((data) => {
          if (data.status === 2) {
            const chartOption = JSON.parse(data.genChart ?? '');
            chartOption.title = undefined;
            data.genChart = JSON.stringify(chartOption);
          }
        });
        setChartList(res.data.records);
        setTotal(res.data.total ?? 0);
      } else {
        message.error('获取图表失败，无图表信息');
      }
    } catch (e) {
      message.error('获取图表失败：' + e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [searchParams]);

  const OPTIONS = ['全部', '折线图', '柱状图', '饼图', '雷达图', '堆叠图'];

  return (
    <div>
      <Row gutter={400} className={'margin-30-bottom'}>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} offset={2}>
          <Select
            // placeholder="请选择图表类型"
            defaultValue={'全部'}
            onChange={(value) => {
              setSelectedItem(value);
              // setSearchParams({
              //   ...initialParams,
              //   chartTypes: selectedItems,
              // });
              // alert(selectedItems);
            }}
            style={{ width: '100%' }}
            options={OPTIONS.filter((o) => !selectedItem.includes(o)).map((item) => ({
              value: item,
              label: item,
            }))}
          />
        </Col>
        <Col xs={24} sm={24} md={8} lg={8} xl={8} offset={3}>
          <Search
            placeholder="请输入图表名称"
            loading={loading}
            onSearch={(value) => {
              // 带上初始搜索条件，这样才会到第一页
              setSearchParams({
                ...initialParams,
                name: value,
                chartType: selectedItem.includes('全部') ? '' : selectedItem,
              });
            }}
          />
        </Col>
      </Row>
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
              pageSize: pageSize,
            });
          },
          pageSize: 4,
          current: searchParams.current,
          total: total,
        }}
        dataSource={chartList}
        renderItem={(item) => (
          <Row gutter={16}>
            <Col span={22}>
              <Card className={'margin-30-bottom'}>
                <List.Item key={item.id}>
                  {item.status === 0 && <h2>Waiting...</h2>}
                  {item.status === 1 && <h2>Running...</h2>}
                  {item.status === -1 && <h2>Failed...</h2>}
                  {item.status === 2 && (
                    <>
                      <List.Item.Meta
                        avatar={<Avatar src={currentUser?.userAvatar} />}
                        title={<div>{item.name}</div>}
                        description={
                          <div>
                            <div className="margin-15">图表类型：{item.chartType}</div>
                            <div>分析结论：{item.genResult}</div>
                          </div>
                        }
                      />
                      <div>
                        <ReactECharts option={JSON.parse(item.genChart ?? '')} />
                      </div>
                    </>
                  )}
                </List.Item>
              </Card>
            </Col>
          </Row>
        )}
      />
    </div>
  );
};
export default MyChart;
