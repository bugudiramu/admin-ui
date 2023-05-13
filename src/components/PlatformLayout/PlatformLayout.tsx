import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  SettingOutlined,
  InboxOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuItemType } from "antd/es/menu/hooks/useItems";
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuItemType>[][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as unknown as MenuItem;
}

const items: MenuItem[] | null = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Products", "2", <DesktopOutlined />),
  getItem("Categories", "3", <UnorderedListOutlined />),
  getItem("Orders", "4", <InboxOutlined />),
  getItem("Admins", "5", <FileOutlined />),
  getItem("Settings", "6", <SettingOutlined />),
  getItem("Logout", "7", <LogoutOutlined />),

  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
];
type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const PlatformLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {collapsed ? (
          <Menu
            items={[
              getItem("Ecommerce Admin", "9", <QuestionCircleOutlined />),
            ]}
            theme="dark"
            mode="inline"
            disabled={true}
          />
        ) : (
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              borderRadius: 8,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Ecommerce Admin
          </div>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            console.log({ key });
            if (+key === 1) return navigate("/");
            const pathName = items[+key - 1]?.label?.toString()?.toLowerCase();
            return navigate(`/${pathName}`);
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{
              marginLeft: 32,
              paddingLeft: 8,
            }}
          >
            Hello,{" "}
            <span
              style={{
                fontWeight: 500,
              }}
            >
              Ramu
            </span>
          </div>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default PlatformLayout;
