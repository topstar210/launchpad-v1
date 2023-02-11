import React, { useState } from "react";
import DotLoader from "react-spinners/DotLoader";

const LoaderComponent = (props) => {
  let { status } = props;
  let [color] = useState("#ffffff");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <DotLoader
      color={color}
      loading={status}
      cssOverride={override}
      size={30}
    />
  );
};

export default LoaderComponent;
