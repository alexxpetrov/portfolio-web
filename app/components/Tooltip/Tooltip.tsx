import { Tooltip as AntdTooltip } from "antd";
import { ReactNode } from "react";
import { FiHelpCircle } from "react-icons/fi";

export const Tooltip = ({ title }: { title: ReactNode }) => {
  return (
    <AntdTooltip title={title} placement={"bottom"} trigger="hover">
      <div className="flex items-center justify-center cursor-pointer text-teal-300">
        <FiHelpCircle className="w-6 h-6" />
      </div>
    </AntdTooltip>
  );
};
