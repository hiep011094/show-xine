import React from "react";
import { Helmet } from "react-helmet";

const Application = ({ title, description, keywords, children }) => {
  return (
    <>
      <Helmet>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <title>{title}</title>
      </Helmet>
      {children}
    </>
  );
};

export default Application;
