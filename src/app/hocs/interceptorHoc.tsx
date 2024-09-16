"use client";
import React, { ReactNode } from "react";
import { useAxiosInterceptor } from "../dashboard/utils/fetcher";

const InterceptorHoc: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Add your logic or interceptors here
  useAxiosInterceptor();

  return <>{children}</>;
};

export default InterceptorHoc;
