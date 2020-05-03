import { gql } from "apollo-boost";

export const getListingsQuery = gql`
  query listings($suburb: String!) {
    getListings(suburb: $suburb) {
      id
      address
      suburb
      subtitle
      image
    }
  }
`;
