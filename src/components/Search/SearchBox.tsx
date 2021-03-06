import React, { useState, useEffect } from "react";
import { Input, AutoComplete } from "antd";
import { useQuery } from "@apollo/react-hooks";
import debounce from "lodash.debounce";

import { searchListingsQuery } from "../../queries/searchListingsQuery";
import { SearchListingsResponse } from "../../types/SearchListingsResponse";
import "./SearchBox.tsx.scss";

const getSearchResultOptions = (
  searchListingResponse: SearchListingsResponse
) =>
  searchListingResponse.searchListings.map((item) => ({
    value: item.suburb,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>{item.suburb}</span>
        <span>{item.listings.length} listings</span>
      </div>
    ),
  }));

export interface SearchBoxProps {
  setSuburb: (suburb: string) => void;
}

export const SearchBox = (props: SearchBoxProps) => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [options, setOptions] = useState<any>([]);

  const response = useQuery<SearchListingsResponse>(searchListingsQuery, {
    variables: {
      keyword,
    },
    skip: !keyword || keyword.length < 3,
  });

  useEffect(() => {
    setOptions(response?.data ? getSearchResultOptions(response.data) : []);
  }, [response]);

  const debouncedSearch = debounce((keyword) => setKeyword(keyword), 50);

  const handleSearch = (keyword: string) => {
    debouncedSearch(keyword);
  };

  const handleSelectOption = (suburb: string) => {
    props.setSuburb(suburb);
  };

  return (
    <AutoComplete
      className="search-box"
      dropdownMatchSelectWidth={252}
      options={options}
      onSelect={handleSelectOption}
      onSearch={handleSearch}
      data-testid="search"
    >
      <Input.Search
        size="large"
        placeholder="Type a suburb to start"
        enterButton
        data-testid="searchBox"
      />
    </AutoComplete>
  );
};
