import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { SearchContent } from "./SearchContent";
import { wait } from "../../utils/wait";
import { searchListingsQuery } from "../../queries/searchListingsQuery";

describe("SearchBox tests", () => {
  afterEach(cleanup);

  const mockListing = {
    id: 1,
    address: "mockAddress",
    suburb: "mockSuburb",
    subtitle: "mockSubtitle",
    image: "mockImage",
  };

  const mockListingSearchResult = {
    suburb: "mockSuburb",
    listings: [mockListing],
  };

  it("should render suggestions if GraphQL server is returning valid response", async () => {
    const mocks = [
      {
        request: {
          query: searchListingsQuery,
          variables: {
            keyword: "mock",
          },
        },
        result: {
          data: {
            searchListings: [mockListingSearchResult],
          },
        },
      },
    ];

    const { getByTestId, getAllByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchContent />
      </MockedProvider>
    );

    fireEvent.change(getByTestId("searchBox"), { target: { value: "mock" } });

    // debouncing causes this
    await wait(100);

    expect(getAllByText(/mockSuburb/).length).toBeGreaterThan(0);
  });
});
