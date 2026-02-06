import { cn } from "@src/util";
import { ReactNode } from "react";

interface PhoneMockupProps {
  children?: ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto h-[600px] w-[300px] rounded-[2.5rem] border-[14px] border-slate-900 bg-slate-900 shadow-xl dark:border-slate-800 dark:bg-slate-800",
        className,
      )}>
      {/* Side Buttons */}
      <div className="absolute top-[72px] -left-[17px] h-[32px] w-[3px] rounded-l-lg bg-slate-800 dark:bg-slate-700"></div>
      <div className="absolute top-[124px] -left-[17px] h-[46px] w-[3px] rounded-l-lg bg-slate-800 dark:bg-slate-700"></div>
      <div className="absolute top-[178px] -left-[17px] h-[46px] w-[3px] rounded-l-lg bg-slate-800 dark:bg-slate-700"></div>
      <div className="absolute top-[142px] -right-[17px] h-[64px] w-[3px] rounded-r-lg bg-slate-800 dark:bg-slate-700"></div>

      {/* Screen Content */}
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-slate-50 dark:bg-gray-800">{children}</div>
    </div>
  );
}
