import React, { ReactNode } from "react";
import { Listing } from "../types/Listing";

interface FavouriteContextProps {
  add: (listing: Listing) => void;
  remove: (listing: Listing) => void;
  favourites: Listing[];
  children?: ReactNode;
}

export const FavouriteContext = React.createContext<FavouriteContextProps>({
  add: (_: Listing) => {},
  remove: (_: Listing) => {},
  favourites: [],
});
