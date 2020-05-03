import { Listing } from "../types/Listing";
import { config } from "../configs";

export const getFavourites = (): Listing[] => {
  const serializedFavourites = localStorage.getItem(config.localStorageKey);
  if (serializedFavourites) {
    const parsedFavourites = JSON.parse(serializedFavourites) as Listing[];
    return parsedFavourites;
  }

  return [];
};

export const addFavourite = (listing: Listing): void => {
  const favourites = [...getFavourites(), listing];
  localStorage.setItem(config.localStorageKey, JSON.stringify(favourites));
};

export const removeFavourite = (listing: Listing): void => {
  const favourites = getFavourites();

  const idxToRemove = favourites.findIndex(
    (favourite) => favourite.id === listing.id
  );
  if (idxToRemove !== -1) {
    const newFavourites = [
      ...favourites.slice(0, idxToRemove),
      ...favourites.slice(idxToRemove + 1, favourites.length),
    ];

    localStorage.setItem(config.localStorageKey, JSON.stringify(newFavourites));
  }
};
