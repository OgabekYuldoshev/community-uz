import React from "react";
import { SidebarTrigger } from "./ui/sidebar";

export function AppTopbar() {
  return (
    <div className="h-16 border-b flex-shrink-0 flex items-center justify-between group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 transition-all px-4 gap-2">
      <SidebarTrigger />
    </div>
  );
}
