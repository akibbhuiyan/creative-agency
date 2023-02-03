import React from "react";
import { useRouteError } from "react-router-dom";

const errorpage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>error.sta</p>
    </div>
  );
};

export default errorpage;
