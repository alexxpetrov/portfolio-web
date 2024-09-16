"use client";

import React, { ReactNode } from "react";
import { Layout } from "antd";
import AppHeader from "./dashboard/features/Header/Header";
import { Provider } from "react-redux";
import { store } from "./store/store.index";
const { Content, Footer } = Layout;

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Layout>
        {/* Header */}
        <AppHeader />
        {/* Main Content */}
        <Content
          style={{ marginTop: 64, padding: "50px", textAlign: "center" }}
        >
          {children}
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: "center" }}>
          MyApp ©2024 Created by You
        </Footer>
      </Layout>
    </Provider>
  );
};

export default AppLayout;
