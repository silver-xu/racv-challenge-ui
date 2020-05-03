import React, { useContext } from "react";

import { ListingCard } from "../Listing/ListingCard";
import { FavouriteContext } from "../../contexts/FavouriteContext";
import { Empty } from "antd";

export const FavouritesContent = () => {
  const { favourites } = useContext(FavouriteContext);

  return (
    <div
      className="site-layout-content layout-components"
      data-testid="favourites"
    >
      <h2>Your favourite listings</h2>
      {favourites && favourites.length > 0 ? (
        favourites.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <Empty description="No listing has been marked as favourite" />
      )}
    </div>
  );
};
