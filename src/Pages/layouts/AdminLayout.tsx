import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/'}>
              WebsiteLayout
            </Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin'}>
              Dashboard
            </Link>
          </Menu.Item>
          {/* --------------------------PRODUCTS------------------------- */}
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin/products'}>
              Product Management
            </Link>
          </Menu.Item>
          {/* -----------------------------CATEGORY---------------------- */}
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin/category'}>
              Category Management
            </Link>
          </Menu.Item>
          {/* -----------------------USER-------------------------------- */}
          {/* <Menu.Item key="4" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin/register'}>
              Register
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin/login'}>
              Login
            </Link>
          </Menu.Item> */}
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/admin/logout'}>
              Logout
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            height: '100vh',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
