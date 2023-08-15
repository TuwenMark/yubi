import { genChartByAiAsyncMqUsingPOST } from '@/services/yubi/chartController';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Row, Select, Space, Upload } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';

const AddChart: React.FC = () => {
  const [form, setForm] = useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
    labelAlign: 'left',
  };
  const onFinish = async (values: any) => {
    const params = {
      ...values,
      file: undefined,
    };
    try {
      // const res = await genChartByAiAsyncUsingPOST(params, {}, values.file.file.originFileObj);
      const res = await genChartByAiAsyncMqUsingPOST(params, {}, values.file.file.originFileObj);
      if (!res.data) {
        message.error('智能分析失败，请稍后重试！');
      } else {
        message.success('智能分析成功，请稍后在我的图表查看生成结果！');
        form.resetFields();
      }
    } catch (e: any) {
      message.error('分析失败', e.message);
    }
  };

  return (
    <div className="add-chart-async">
      <Row gutter={24}>
        <Col span={24}>
          <Form
            form={form}
            name="addChart"
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
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button htmlType="reset">重置</Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default AddChart;
