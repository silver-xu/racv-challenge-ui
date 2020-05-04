import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { getListingsQuery } from "../../queries/getListingsQuery";
import { SearchContent } from "./SearchContent";
import { wait } from "../../utils/wait";

describe("SearchContent tests", () => {
  afterEach(cleanup);

  const mockListing = {
    id: 1,
    address: "mockAddress",
    suburb: "mockSuburb",
    subtitle: "mockSubtitle",
    image: "mockImage",
  };

  it("should render listing details if GraphQL server is returning valid response", async () => {
    const mocks = [
      {
        request: {
          query: getListingsQuery,
          variables: {
            suburb: "mockSuburb",
          },
        },
        result: {
          data: {
            getListings: [mockListing],
          },
        },
      },
    ];

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SearchContent defaultSuburb="mockSuburb" />
      </MockedProvider>
    );

    await wait(0);

    expect(getByTestId("results")).toContainHTML("mockAddress");
    expect(getByTestId("results")).toContainHTML("mockSubtitle");
    expect(getByTestId("results")).toContainHTML("mockImage");
    expect(getByTestId("results")).not.toContainHTML("empty");
  });

  it("should render empty if GraphQL server is returning empty response", async () => {
    const emptyMocks = [
      {
        request: {
          query: getListingsQuery,
          variables: {
            suburb: "mockSuburb",
          },
        },
        result: {
          data: {
            getListings: [],
          },
        },
      },
    ];

    const { getByTestId } = render(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <SearchContent defaultSuburb="mockSuburb" />
      </MockedProvider>
    );

    await wait(0);

    expect(getByTestId("results")).not.toContainHTML("mockAddress");
    expect(getByTestId("results")).not.toContainHTML("mockSubtitle");
    expect(getByTestId("results")).not.toContainHTML("mockImage");
    expect(getByTestId("results")).toContainHTML("empty");
  });
});
