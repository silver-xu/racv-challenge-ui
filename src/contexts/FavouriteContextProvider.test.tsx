import React, { useContext, useEffect } from "react";
import { render, cleanup } from "@testing-library/react";
import { FavouriteContextProvider } from "./FavouriteContextProvider";
import { FavouriteContext } from "./FavouriteContext";
import * as storage from "./storage";
import { Listing } from "../types/Listing";

jest.mock("./storage");

describe("FavouriteContextProvider tests", () => {
  afterEach(cleanup);

  const mockListing: Listing = {
    id: 1,
    address: "foo",
    suburb: "bar",
    subtitle: "foobar",
    image: "foo image",
  };

  const mockedStorage = storage as jest.Mocked<typeof storage>;
  mockedStorage.addFavourite.mockImplementation(() => {});
  mockedStorage.removeFavourite.mockImplementation(() => {});
  mockedStorage.getFavourites.mockReturnValue([mockListing]);

  it("add() should call storage.addFavourite then refresh favourites", async () => {
    const TestComponent = () => {
      const { add } = useContext(FavouriteContext);

      useEffect(() => {
        add(mockListing);
      }, []);

      return <></>;
    };

    render(
      <FavouriteContextProvider>
        <TestComponent />
      </FavouriteContextProvider>
    );

    expect(mockedStorage.addFavourite).toHaveBeenLastCalledWith(mockListing);
    expect(mockedStorage.getFavourites).toHaveBeenCalled();
  });

  it("remove() should call storage.addFavourite then refresh favourites", async () => {
    const TestComponent = () => {
      const { remove } = useContext(FavouriteContext);

      useEffect(() => {
        remove(mockListing);
      }, []);

      return <></>;
    };

    render(
      <FavouriteContextProvider>
        <TestComponent />
      </FavouriteContextProvider>
    );

    expect(mockedStorage.removeFavourite).toHaveBeenLastCalledWith(mockListing);
    expect(mockedStorage.getFavourites).toHaveBeenCalled();
  });
});
