import React, { useEffect, useState } from 'react';
import { Space, Table, Image, Button, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
// import { IProduct } from '../../types/products';

// interface IPrors {
//   products: IProduct[];
//   deletePro: (id: number) => void;
// }

const CategoryManagementPage = (prors) => {
  const history = useNavigate();
  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState<string>('');
  // const navigate = useNavigate();
  useEffect(() => {
    setData(
      prors.category.map((cate) => {
        return { ...cate, key: cate.id };
      })
    );
  }, [prors]);

  console.log(prors.category.message);
  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
    const filterSearch = prors.category.filter((item) => {
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
  const deleteCate = (id) => {
    const confirm = window.confirm('Ban co chac khong !');
    if (id === '6434cfc908cf7e049e51739d') {
      alert('danh muc mac dinh khong the xoa');
    } else {
      if (confirm) {
        prors.onRemoveCate(id);
      }
    }
  };
  // console.log(prors.products);
  // console.log(data.name);

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
      title: 'Cate Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => deleteCate(record._id)}>
            Delete
          </Button>
          <Button type="primary">
            <Link
              className="link-no-underline"
              to={'/admin/category/' + record._id + '/update'}
            >
              Update
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
        placeholder="Search Category by Name"
        value={searchValue}
        onChange={handleSearch}
        style={{ margin: '20px 0' }}
      />
      <Button type="primary">
        <Link className="link-no-underline" to={'/admin/category/add'}>
          Add Category
        </Link>
      </Button>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
export default CategoryManagementPage;
