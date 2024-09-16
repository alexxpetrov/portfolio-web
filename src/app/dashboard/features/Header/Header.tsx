"use client";
import React, { useEffect } from "react";
import { Layout, Typography, Menu } from "antd";

import Login from "../Auth/Login/Login";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { actions } from "@/app/store/user/actions";

const { Header } = Layout;
const { Title } = Typography;

const headerItems = [
  { key: "/", label: <Link href="/">Home</Link> },
  { key: "/dashboard", label: <Link href="/dashboard">Dashboard</Link> },
  { key: "/chat", label: <Link href="/chat">Chat</Link> },
  { key: "/search", label: <Link href="/search">Search</Link> },
];

const AppHeader = () => {
  const pathname = usePathname();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.init());
  }, [dispatch]);

  return (
    <Header
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 50px",
      }}
    >
      {/* Logo */}
      <div className="logo" style={{ display: "flex", alignItems: "center" }}>
        <Title level={3} style={{ color: "#fff", margin: 0 }}>
          MyApp
        </Title>
      </div>

      {/* Navigation Menu */}

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{ flex: 1, justifyContent: "center", borderBottom: "none" }}
        selectedKeys={[pathname]}
        items={headerItems}
      />

      {/* Right-side Button (e.g., Sign In/Sign Up) */}
      <Login />
    </Header>
  );
};

export default AppHeader;
