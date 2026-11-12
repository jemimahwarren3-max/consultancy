export const SITE_URL = "https://www.hakisystems.co.zw";

/** Builds a canonical <link> head entry for a given path (e.g. "/" or "/services"). */
export function canonical(path: string) {
  return { rel: "canonical", href: `${SITE_URL}${path}` };
}
