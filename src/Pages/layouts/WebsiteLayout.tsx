import React from 'react';
import { Layout, Menu, Breadcrumb, theme } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { Footer } from 'antd/es/layout/layout';
import { Link, Outlet } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const ClientLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        className="header"
        style={{ padding: 0, background: colorBgContainer }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/'}>
              Home Page
            </Link>
          </Menu.Item>
          {/* --------------------------PRODUCTS------------------------- */}
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/products'}>
              Product Page
            </Link>
          </Menu.Item>
          {/* -----------------------USER-------------------------------- */}
          <Menu.Item key="3" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/register'}>
              Register
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link className="link-no-underline" to={'/login'}>
              Login
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
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
        <img src="https://picsum.photos/1400/400" alt="" />
      </Footer>
    </Layout>
  );
};

export default ClientLayout;
