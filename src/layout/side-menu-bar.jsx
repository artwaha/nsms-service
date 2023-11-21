import React from "react";
import { Link } from "react-router-dom";

const SideMenuBar = () => {
  return (
    <div className="w-1/5 p-2 flex flex-col mr-2 border border-dotted border-pink-600">
      <Link to="system-config" className="text-blue-600">
        System Config
      </Link>
      <Link to="users" className="text-blue-600 mt-2">
        Manage Users
      </Link>
    </div>
  );
};

export default SideMenuBar;
