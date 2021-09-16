import axios from "axios";

const baseURL = "https://the-one-api.dev/v2";

export const instance = axios.create({
  baseURL: "",
  timeout: 1000,
  headers: { "Authorization": "Bearer F8eHCcHH69mt74EZ7Te0" },
});

export const getCharacters = async (page, filter = {}) => {
  return (await instance.get(
    baseURL + `/character?limit=20&offset=${page * 20}]}` +
    getFilterString(filter),
  )).data.docs
    .map((entry) => {
      const { _id, ...attributes } = entry;
      return {
        _id,
        attributes,
      };
    });
};

const getFilterString = (filter) => {
  const filterSubStrings = [];
  for (const category in filter) {
    if (Object.hasOwnProperty.call(filter, category)) {
      const options = filter[category];
      filterSubStrings.push(`&${category}=` + options.join(","));
    }
  }
  return filterSubStrings;
};

export const getTotalCharacters = async (filter = {}) => {
  return (await instance.get(baseURL + `/character?limit=1`+
  getFilterString(filter),)).data.total;
};

export const getQuotes = async (characterId, page) => {
  return (await instance.get(
    baseURL +
    `/character/${characterId}/quote?sort=dialog:asc&limit=20&offset=${page *
    20}]}`,
  )).data.docs
    .map((entry) => {
      //transform object to adapt to the table interface
      const { _id, ...attributes } = entry;
      return {
        _id,
        attributes,
      };
    });
};
