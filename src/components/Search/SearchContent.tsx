import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";

import { SearchBox } from "./SearchBox";
import { GetListingsResponse } from "../../types/GetListingsResponse";
import { getListingsQuery } from "../../queries/getListingsQuery";
import { ListingCard } from "../Listing/ListingCard";
import { Empty } from "antd";

interface SearchContentProps {
  defaultSuburb?: string;
}

export const SearchContent = ({ defaultSuburb }: SearchContentProps) => {
  const [suburb, setSuburb] = useState<string | undefined>(defaultSuburb);

  const response = useQuery<GetListingsResponse>(getListingsQuery, {
    variables: {
      suburb,
    },
    skip: !suburb,
  });

  return (
    <div className="site-layout-content layout-components">
      <SearchBox setSuburb={setSuburb} />
      <div className="results" data-testid="results">
        {response?.data ? (
          <>
            <h2>
              {response.data.getListings.length} Property listings in {suburb}
            </h2>
            {response.data.getListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </>
        ) : (
          <Empty
            description={
              suburb
                ? "No listing in the current suburb"
                : "Please type a suburb in search box"
            }
          />
        )}
      </div>
    </div>
  );
};
