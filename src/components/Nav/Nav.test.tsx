import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { Nav } from "./Nav";

describe("Nav tests", () => {
  afterEach(cleanup);

  it("should render Favourites if path is /favourites", () => {
    const history = createMemoryHistory();
    history.push("/favourites");

    const { getByTestId } = render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    expect(getByTestId("favouritesMenu")).toHaveClass("ant-menu-item-selected");
    expect(getByTestId("searchMenu")).not.toHaveClass("ant-menu-item-selected");
  });

  it("should render Search if path is /", () => {
    const history = createMemoryHistory();
    history.push("/");

    const { getByTestId } = render(
      <Router history={history}>
        <Nav />
      </Router>
    );

    expect(getByTestId("favouritesMenu")).not.toHaveClass(
      "ant-menu-item-selected"
    );
    expect(getByTestId("searchMenu")).toHaveClass("ant-menu-item-selected");
  });
});
