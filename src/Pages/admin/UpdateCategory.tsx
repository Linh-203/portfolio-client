import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const UpdateCategoryPage = (props) => {
  const { id } = useParams();
  const [category, setCate] = useState({});

  useEffect(() => {
    const currentCate = props.category.find((cate) => cate._id == id);
    setCate(currentCate);
  }, [props]);
  const onFinish = (values) => {
    const { name } = { ...category, ...values };
    props.onUpdateCate(id, { name });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Cate name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Cate name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategoryPage;
