import React, { useState, useEffect } from "react";

import { ReactNode } from "react";
import { FavouriteContext } from "./FavouriteContext";
import { getFavourites, addFavourite, removeFavourite } from "./storage";
import { Listing } from "../types/Listing";

export const FavouriteContextProvider = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const [favourites, setFavourites] = useState<Listing[]>([]);

  useEffect(() => {
    refreshFavourite();
  }, []);

  const refreshFavourite = () => setFavourites(getFavourites());

  const add = (listing: Listing) => {
    addFavourite(listing);
    refreshFavourite();
  };

  const remove = (listing: Listing) => {
    removeFavourite(listing);
    refreshFavourite();
  };

  return (
    <FavouriteContext.Provider
      value={{
        add,
        remove,
        favourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
