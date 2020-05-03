import { gql } from "apollo-boost";

export const searchListingsQuery = gql`
  query listings($keyword: String!) {
    searchListings(keyword: $keyword) {
      suburb
      listings {
        id
        address
        suburb
        subtitle
        image
      }
    }
  }
`;
