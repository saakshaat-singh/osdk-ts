import { Fuzzy } from "./Fuzzy";

/**
 * Returns objects where the specified field contains all of the whitespace separated words in any
 * order in the provided value. This query supports fuzzy matching.
 *
 */
export type AllTermsQuery = { field: string; value: string; fuzzy?: Fuzzy; };
