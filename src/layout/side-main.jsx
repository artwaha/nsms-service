import React from "react";
import { Outlet } from "react-router-dom";

const SideMain = () => {
  return (
    <div className="flex-1 p-2 border border-dotted border-purple-600">
      <Outlet />
    </div>
  );
};

export default SideMain;
