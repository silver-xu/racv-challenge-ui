import React from "react";
import { Layout as AntdLayout, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";

const { Header } = AntdLayout;

export const Nav = () => {
  const { location } = useHistory();
  const defaultSelectedKey =
    location.pathname === "/favourites" ? "favouritesMenu" : "searchMenu";

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[defaultSelectedKey]}>
        <Menu.Item key="searchMenu" data-testid="searchMenu">
          <Link to="/">Search</Link>
        </Menu.Item>
        <Menu.Item key="favouritesMenu" data-testid="favouritesMenu">
          <Link to="/favourites">Favourites</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
