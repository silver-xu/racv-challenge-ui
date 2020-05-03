import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { SearchContent } from "./SearchContent";
import { wait } from "../../utils/wait";
import { searchListingsQuery } from "../../queries/searchListingsQuery";
import { getListingsQuery } from "../../queries/getListingsQuery";

describe("SearchBox tests", () => {
  afterEach(cleanup);

  const mockListing = {
    id: 1,
    address: "foo",
    suburb: "barSuburb",
    subtitle: "foobar",
    image: "foo image",
  };

  const mockListingSearchResult = {
    suburb: "barSuburb",
    listings: [mockListing],
  };

  it("should render suggestions if GraphQL server is returning valid response", async () => {
    const mocks = [
      {
        request: {
          query: searchListingsQuery,
          variables: {
            keyword: "bar",
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

    fireEvent.change(getByTestId("searchBox"), { target: { value: "bar" } });
    await wait(0);

    expect(getAllByText(/barSuburb/).length).toBeGreaterThan(0);
  });
});
