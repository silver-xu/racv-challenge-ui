import { getFavourites, removeFavourite, addFavourite } from "./storage";
import { config } from "../configs";

describe("storage tests", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockListing1 = {
    id: 1,
    address: "foo1",
    suburb: "bar1",
    subtitle: "foobar1",
    image: "foo image1",
  };

  const mockListing2 = {
    id: 2,
    address: "foo2",
    suburb: "bar2",
    subtitle: "foobar2",
    image: "foo image2",
  };

  const setItem = (Storage.prototype.setItem = jest.fn());

  it("getFavourites() should return lists stored in local storage", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockListing1]));
    const favourites = getFavourites();
    expect(favourites).toEqual([mockListing1]);
  });

  it("getFavourites() should return [] stored in local storage does not have value", () => {
    Storage.prototype.getItem = jest.fn(() => "");
    const favourites = getFavourites();
    expect(favourites).toEqual([]);
  });

  it("removeFavourite() should trigger a call to localStorage.setItem with the remaining listings", () => {
    Storage.prototype.getItem = jest.fn(() =>
      JSON.stringify([mockListing1, mockListing2])
    );

    removeFavourite(mockListing2);
    expect(setItem).toHaveBeenLastCalledWith(
      config.localStorageKey,
      JSON.stringify([mockListing1])
    );
  });

  it("removeFavourite() should not trigger a call to localStorage.setItem if the listing does not exist", () => {
    Storage.prototype.getItem = jest.fn(() => "");

    removeFavourite(mockListing2);
    expect(setItem).not.toHaveBeenCalledTimes(1);
  });

  it("addFavourite() should trigger a call to localStorage.setItem with all listings", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockListing1]));

    addFavourite(mockListing2);
    expect(setItem).toHaveBeenLastCalledWith(
      config.localStorageKey,
      JSON.stringify([mockListing1, mockListing2])
    );
  });
});
