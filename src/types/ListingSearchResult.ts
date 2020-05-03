import { Listing } from "./Listing";

export interface ListingSearchResult {
  suburb: string;
  listings: Listing[];
}
