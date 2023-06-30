import React, { useEffect, useState } from 'react';
import { Space, Table, Image, Button, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
// import { IProduct } from '../../types/products';

// interface IPrors {
//   products: IProduct[];
//   deletePro: (id: number) => void;
// }

const ProductManagementPage = (prors) => {
  const history = useNavigate();
  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState<string>('');
  useEffect(() => {
    setData(
      prors.products.map((pro) => {
        return { ...pro, key: pro._id };
      })
    );
  }, [prors]);
  console.log(prors.products.message);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    const filterSearch = prors.products.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setData(filterSearch);
  };
  const onHandleLogout = () => {
    const confirm = window.confirm('Ban có chắc muốn đăng xuất không !');
    if (confirm) {
      localStorage.removeItem('token');
      history('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    }
  };
  const deletePro = (id) => {
    const confirm = window.confirm('Ban suy nghĩ kỹ chưa !');
    if (confirm) {
      prors.onRemove(id);
    }
  };

  interface DataType {
    key: string;
    id: number;
    name: string;
    image: string;
    price: number;
    desc: string;
    categoryId: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <Image width={200} src={image} />,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Desc',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: 'Category ',
      dataIndex: 'categoryId',
      key: 'categoryId',
      render: (_, record) => (
        <a className="link-no-underline" href="">
          {record.categoryId?.name}
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="link-no-underline"
            type="primary"
            danger
            onClick={() => deletePro(record._id)}
          >
            Delete
          </Button>
          <Button type="primary">
            <Link
              className="link-no-underline"
              to={'/admin/products/' + record._id + '/update'}
            >
              Update
            </Link>
          </Button>
          <Button type="primary">
            <Link className="link-no-underline" to={'/products/' + record._id}>
              Detail
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={onHandleLogout} type="primary" danger>
        Logout
      </Button>
      <Input.Search
        allowClear
        enterButton="Search"
        size="large"
        placeholder="Search Product by Name"
        value={searchValue}
        onChange={handleSearch}
        style={{ margin: '20px 0' }}
      />
      <Button type="primary">
        <Link className="link-no-underline" to={'/admin/products/add'}>
          Add Product
        </Link>
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default ProductManagementPage;
