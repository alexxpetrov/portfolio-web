"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.index";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {/* Header */}
      {/* <AppHeader /> */}
      {/* Main Content */}
      <div className="bg-slate-900 leading-relaxed text-slate-400 selection:bg-teal-300 selection:text-teal-900">
        {children}
      </div>
    </Provider>
  );
};

export default AppLayout;
