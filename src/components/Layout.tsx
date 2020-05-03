import React from "react";
import { Switch, Route } from "react-router-dom";
import { Layout as AntdLayout } from "antd";

import { Nav } from "./Nav/Nav";
import { Breadcrumb } from "./Nav/Breadcrumb";
import { SearchContent } from "./Search/SearchContent";
import { FavouriteContextProvider } from "../contexts/FavouriteContextProvider";
import { FavouritesContent } from "./Favourites/FavouritesContent";

const { Content, Footer } = AntdLayout;

export const Layout = () => (
  <AntdLayout className="layout">
    <Nav />
    <Content className="content">
      <Breadcrumb />
      <FavouriteContextProvider>
        <Switch>
          <Route path="/favourites">
            <FavouritesContent />
          </Route>
          <Route path="/">
            <SearchContent />
          </Route>
        </Switch>
      </FavouriteContextProvider>
    </Content>
    <Footer style={{ textAlign: "center" }}>
      RACV Code Challenge ©2020 Created by Silver Xu
    </Footer>
  </AntdLayout>
);
