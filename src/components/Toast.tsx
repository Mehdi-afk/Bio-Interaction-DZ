"use client";

import { useApp } from "@/src/context/AppContext";

export default function Toast() {
  const { toastMsg } = useApp();

  if (!toastMsg) return null;

  return (
    <div
      className="
        fixed bottom-7 right-7 z-[3000]
        flex items-center gap-2
        bg-[#15623A] text-white
        py-3 px-5 rounded-[10px]
        text-[14px] font-medium
        shadow-[0_4px_16px_rgba(0,0,0,0.2)]
        animate-[slideUp_0.2s_ease]
        max-[600px]:right-4 max-[600px]:left-4 max-[600px]:justify-center max-[600px]:bottom-5
      "
      style={{ animation: "slideUp 0.2s ease" }}
    >
      {toastMsg}
    </div>
  );
}
