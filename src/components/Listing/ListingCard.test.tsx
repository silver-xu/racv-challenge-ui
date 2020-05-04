import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { FavouriteContext } from "../../contexts/FavouriteContext";
import { ListingCard } from "./ListingCard";

describe("ListingCard tests", () => {
  afterEach(cleanup);

  const mockContextProps = {
    favourites: [],
    add: jest.fn(),
    remove: jest.fn(),
  };

  const mockListing = {
    id: 1,
    address: "mockAddress",
    suburb: "mockSuburb",
    subtitle: "mockSubtitle",
    image: "mockImage",
  };

  it("should render listing details", () => {
    const { getByTestId } = render(
      <FavouriteContext.Provider value={mockContextProps}>
        <ListingCard listing={mockListing} />
      </FavouriteContext.Provider>
    );

    expect(getByTestId("1")).toContainHTML("mockAddress");
    expect(getByTestId("1")).toContainHTML("mockSubtitle");
    expect(getByTestId("1")).toContainHTML("mockImage");
  });

  it("should call add / remove in context upon clicking fav button", () => {
    const { getByTestId } = render(
      <FavouriteContext.Provider value={mockContextProps}>
        <ListingCard listing={mockListing} />
      </FavouriteContext.Provider>
    );

    fireEvent.click(getByTestId("fav"));
    expect(mockContextProps.add).toHaveBeenLastCalledWith(mockListing);
    fireEvent.click(getByTestId("fav"));
    expect(mockContextProps.remove).toHaveBeenLastCalledWith(mockListing);
  });
});
