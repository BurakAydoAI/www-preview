import { getLangFromUrl } from "../i18n/utils.ts";
import { getCollection } from "astro:content";

export async function fetchData(url: URL) {
  const lang = getLangFromUrl(url);
  const datas = await getCollection("data");
  const dataFiltered = datas.filter((d) => d.id === lang);
  const info = dataFiltered[0].data;

  return { info, lang };
}
