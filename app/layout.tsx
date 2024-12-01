"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const inter = Inter({ subsets: ["latin"] });

const { Header, Sider, Content } = Layout;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
          <Layout style={{ height: "100vh" }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: "#ffffff" }}>
              <div className="demo-logo-vertical" style={{ width: "100%", height: "10%", padding: 10 }} />
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: "nav 1",
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "nav 2",
                  },
                  {
                    key: "3",
                    icon: <UploadOutlined />,
                    label: "nav 3",
                  },
                ]}
              />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
              </Header>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
