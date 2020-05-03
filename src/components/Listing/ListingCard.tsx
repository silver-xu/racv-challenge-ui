import React, { useContext } from "react";
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";

import { Listing } from "../../types/Listing";
import { Fav } from "../Favourites/Fav";
import "./ListingCard.tsx.scss";
import { FavouriteContext } from "../../contexts/FavouriteContext";

interface ListingProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingProps) => {
  const { add, remove, favourites } = useContext(FavouriteContext);

  const handleFavChange = (checked: boolean) => {
    if (checked) {
      add(listing);
    } else {
      remove(listing);
    }
  };

  const favored = !!favourites.find((favourite) => favourite.id === listing.id);

  return (
    <Card
      data-testid={listing.id}
      hoverable
      className="listing-card"
      cover={<img alt="property" src={listing.image} />}
    >
      <Meta title={listing.subtitle} description={listing.address}></Meta>
      <Fav onChange={handleFavChange} checked={favored} data-testid="fav" />
    </Card>
  );
};
