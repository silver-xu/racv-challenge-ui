import React from "react";
import { render, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { Breadcrumb } from "./Breadcrumb";

describe("Breadcrumb tests", () => {
  afterEach(cleanup);

  it("should render Favourites if path is /favourites", () => {
    const history = createMemoryHistory();
    history.push("/favourites");

    const { getByTestId } = render(
      <Router history={history}>
        <Breadcrumb />
      </Router>
    );

    expect(getByTestId("breadcrumb")).toContainHTML("Favourites");
    expect(getByTestId("breadcrumb")).not.toContainHTML("Search");
  });

  it("should render Search if path is /", () => {
    const history = createMemoryHistory();
    history.push("/");

    const { getByTestId } = render(
      <Router history={history}>
        <Breadcrumb />
      </Router>
    );

    expect(getByTestId("breadcrumb")).not.toContainHTML("Favourites");
    expect(getByTestId("breadcrumb")).toContainHTML("Search");
  });
});
