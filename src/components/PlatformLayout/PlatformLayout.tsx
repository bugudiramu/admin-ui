import React, { ReactNode, useState } from "react";
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
import "./PlatformLayout.styles.css";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
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
  children: ReactNode;
};

const PlatformLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const locations = location.pathname.split("/");
  const breadcrumbs = locations.slice(1, locations.length).map((val) => {
    return {
      title: (
        <a
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            navigate(`/${val}`);
          }}
          href=""
        >
          {val}
        </a>
      ),
    };
  });

  return (
    <Layout className="platform-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        {collapsed ? (
          <Menu
            items={[getItem("Admin", "9", <QuestionCircleOutlined />)]}
            theme="dark"
            mode="inline"
            disabled={true}
          />
        ) : (
          <div className="admin-hero">Admin</div>
        )}
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            if (+key === 1) return navigate("/");
            const pathName = items[+key - 1]?.label?.toString()?.toLowerCase();
            return navigate(`/${pathName}`);
          }}
        />
      </Sider>
      <Layout className="platform-site-layout">
        <Header
          className="platform-site-layout-header"
          style={{ background: colorBgContainer }}
        >
          <div className="platform-site-layout-header-div">
            Hello,
            <span>Ramu</span>
          </div>
        </Header>
        <Content className="platform-layout-content">
          <Breadcrumb className="breadcrumb" items={breadcrumbs} />
          <div
            className="platform-layout-children"
            style={{
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer className="platform-layout-footer">Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default PlatformLayout;
