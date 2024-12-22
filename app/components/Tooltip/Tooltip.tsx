import type { ReactNode } from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { FiHelpCircle } from 'react-icons/fi';

export function Tooltip({ title }: { title: ReactNode }) {
  return (
    <AntdTooltip title={title} placement="bottom" trigger="hover">
      <div className="flex cursor-pointer items-center justify-center text-teal-300">
        <FiHelpCircle className="size-6" />
      </div>
    </AntdTooltip>
  );
}
