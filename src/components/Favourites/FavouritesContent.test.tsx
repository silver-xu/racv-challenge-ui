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
        address: "mockAddress",
        suburb: "mockSuburb",
        subtitle: "mockSubtitle",
        image: "mockImage",
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

    expect(getByTestId("favourites")).toContainHTML("mockAddress");
    expect(getByTestId("favourites")).toContainHTML("mockSubtitle");
    expect(getByTestId("favourites")).toContainHTML("mockImage");
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

    expect(getByTestId("favourites")).not.toContainHTML("mockAddress");
    expect(getByTestId("favourites")).not.toContainHTML("mockSubtitle");
    expect(getByTestId("favourites")).not.toContainHTML("mockImage");
    expect(getByTestId("favourites")).toContainHTML(
      "No listing has been marked as favourite"
    );
  });
});
