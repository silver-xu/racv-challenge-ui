import React from "react";
import { Breadcrumb as AntdBreadcrumb } from "antd";
import { Link, useHistory } from "react-router-dom";

const { Item } = AntdBreadcrumb;

export const Breadcrumb = () => {
  const { location } = useHistory();
  const subItem =
    location.pathname === "/favourites" ? (
      <Link to="/favourites">Favourites</Link>
    ) : (
      <Link to="/">Search</Link>
    );

  return (
    <AntdBreadcrumb className="layout-components" data-testid="breadcrumb">
      <Item>
        <Link to="/">Home</Link>
      </Item>
      <Item>{subItem}</Item>
    </AntdBreadcrumb>
  );
};
