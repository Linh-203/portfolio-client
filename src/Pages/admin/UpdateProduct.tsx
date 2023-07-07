import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Image, Input, Select, Upload, UploadFile } from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';
import { getAllCate } from '../../api/category';
const UpdateProductPage = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [cate, setCate] = useState([]);
  const getCate = async () => {
    const res = await getAllCate();
    setCate(res.data);
  };

  useEffect(() => {
    getCate();
  }, []);
  const { id } = useParams();

  const [product, setProduct] = useState();
  useEffect(() => {
    const currentProduct = props.products.find((product) => product._id == id);
    setProduct(currentProduct);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [product]);
  console.log(product);

  const [form] = Form.useForm();
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const setFields = () => {
    form.setFieldsValue({
      id: product?._id,
      name: product?.name,
      year: product?.year,
      desc: product?.desc,
      demo_link: product?.demo_link,
      source_code_link: product?.source_code_link,
      categoryId: product?.categoryId._id,
    });
  };

  const onFinish = (values: any) => {
    console.log(values.image === undefined);
    const prdUpdate = {
      id: values.id,
      name: values.name,
      year: values.year,
      demo_link: values.demo_link,
      source_code_link: values.source_code_link,
      desc: values.desc,
      image:
        values.image === undefined
          ? product?.image
          : values.image?.file.thumbUrl,
      categoryId: values.categoryId,
    };

    props.onUpdate(id, prdUpdate);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Year"
          name="year"
          rules={[{ required: true, message: 'Please input your year!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Product Image" name="image">
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="Current Image" name="currentImage">
          <Image src={product?.image} />
        </Form.Item>
        <Form.Item
          label="Desc"
          name="desc"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Demo link"
          name="demo_link"
          rules={[
            {
              required: true,
              message: 'Please input your demo_link!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Source code link"
          name="source_code_link"
          rules={[
            {
              required: true,
              message: 'Please input your source_code_link!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="CategoryId"
          name="categoryId"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Select placeholder="please choose category">
            {cate?.map((cateOb) => (
              <Select.Option key={cateOb._id} value={cateOb._id}>
                {cateOb.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
