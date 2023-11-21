import React from "react";
import Seo from "../layout/seo";
import { Link } from "react-router-dom";

const SystemConfig = () => {
  return (
    <div>
      <Seo description="System Config" title="System Config" />
      <h1 className="text-xl text-green-700 mb-2">System Config</h1>
      <h1>
        1.{" "}
        <Link to="roles" className="hover:underline">
          Configure System Roles
        </Link>
      </h1>
      <h1>
        2.{" "}
        <Link to="locations" className="hover:underline">
          Configure Locations
        </Link>
      </h1>
      <h1>
        3.{" "}
        <Link to="stations" className="hover:underline">
          Configure Service Points/Stations
        </Link>
      </h1>
      <h1>
        4.{" "}
        <Link to="packaging-materials" className="hover:underline">
          Packaging Materials
        </Link>
      </h1>
    </div>
  );
};

export default SystemConfig;
