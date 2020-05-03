import React from "react";
import { render, cleanup } from "@testing-library/react";

import { FavouriteContext } from "../../contexts/FavouriteContext";
import { FavouritesContent } from "./FavouritesContent";

describe("FavouritesContent tests", () => {
  afterEach(cleanup);

  const mockContextProps = {
    favourites: [
      {
        id: 1,
        address: "foo",
        suburb: "bar",
        subtitle: "foobar",
        image: "foo image",
      },
    ],
    add: jest.fn(),
    remove: jest.fn(),
  };

  it("when there are favourites from context should render favourites list", () => {
    const { getByTestId } = render(
      <FavouriteContext.Provider value={mockContextProps}>
        <FavouritesContent />
      </FavouriteContext.Provider>
    );

    expect(getByTestId("favourites")).toContainHTML("foo");
    expect(getByTestId("favourites")).toContainHTML("foobar");
    expect(getByTestId("favourites")).toContainHTML("foo image");
    expect(getByTestId("favourites")).not.toContainHTML(
      "No listing has been marked as favourite"
    );
  });

  it("when there is no favourite from context should render empty", () => {
    const { getByTestId } = render(
      <FavouriteContext.Provider
        value={{ ...mockContextProps, favourites: [] }}
      >
        <FavouritesContent />
      </FavouriteContext.Provider>
    );

    expect(getByTestId("favourites")).not.toContainHTML("foo");
    expect(getByTestId("favourites")).not.toContainHTML("foobar");
    expect(getByTestId("favourites")).not.toContainHTML("foo image");
    expect(getByTestId("favourites")).toContainHTML(
      "No listing has been marked as favourite"
    );
  });
});
