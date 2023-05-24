import { genChartByAiUsingPOST } from '@/services/yubi/chartController';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Upload,
} from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useState } from 'react';

const AddChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chart, setChart] = useState<API.GenChartVO>();
  const [options, setOptions] = useState<string>();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    labelAlign: 'left',
  };
  const onFinish = async (values: any) => {
    // 只有非loading状态才设置，避免重复设置
    if (!loading) {
      setLoading(true);
    }
    if (chart) {
      setChart(undefined);
      setOptions('');
    }
    const params = {
      ...values,
      file: undefined,
    };
    try {
      const res = await genChartByAiUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res.data) {
        message.error('智能分析失败，请稍后重试！');
        throw new Error('返回数据为空');
      } else {
        message.success('智能分析成功！');
        const chartOptions = JSON.parse(res.data.genChart ?? '');
        if (!chartOptions) {
          throw new Error('图表代码解析错误！');
        } else {
          setChart(res.data);
          setOptions(chartOptions);
        }
      }
    } catch (e) {
      message.error('智能分析失败，请稍后重试！');
    }
    setLoading(false);
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <>
      <Row gutter={24}>
        <Col span={12}>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="name"
              label="图表名称"
              tooltip="AI生成的图表名称"
              rules={[{ required: true, message: '未输入图表名称', whitespace: true }]}
            >
              <Input placeholder={'请输入图表名称'} />
            </Form.Item>
            <Form.Item
              name="goal"
              label="需求目标"
              rules={[{ required: true, message: '未输入分析需求' }]}
            >
              <Input.TextArea
                showCount
                maxLength={100}
                placeholder={'请输入分析需求，如：详细分析近期的用户流量'}
              />
            </Form.Item>
            <Form.Item
              name="chartType"
              label="图表类型"
              hasFeedback
              rules={[{ required: true, message: '未选择图表类型' }]}
            >
              <Select
                placeholder="请选择生成的图表类型"
                options={[
                  {
                    value: '折线图',
                    label: '折线图',
                  },
                  {
                    value: '柱状图',
                    label: '柱状图',
                  },
                  {
                    value: '饼图',
                    label: '饼图',
                  },
                  {
                    value: '雷达图',
                    label: '雷达图',
                  },
                  {
                    value: '堆叠图',
                    label: '堆叠图',
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="file" label="文件上传">
              <Upload name="file" action="/upload.do" maxCount={1}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  提交
                </Button>
                <Button htmlType="reset">重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <Card title={'分析结论'}>
            {chart?.genResult ?? (!loading ? <div>请先在左侧进行提交</div> : '')}
            <Spin indicator={antIcon} spinning={loading} />
          </Card>
          <Divider />
          <Card title={'可视化图表'}>
            {options ? (
              <ReactECharts option={options} />
            ) : !loading ? (
              <div>请先在左侧进行提交</div>
            ) : (
              ''
            )}
            <Spin indicator={antIcon} spinning={loading} />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default AddChart;
