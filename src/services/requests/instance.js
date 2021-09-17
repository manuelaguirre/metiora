import axios from "axios";
import { addAction } from "../storage/storage"

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

export const getTotalEntries = async (category, filter = {}) => {
  return (await instance.get(
    baseURL + `/${category}?limit=1` +
    getFilterString(filter),
  )).data.total;
};

export const getQuotes = async (characterId, page, filter = {}) => {
  return (await instance.get(
    baseURL +
    `/quote?sort=dialog:asc&limit=20&offset=${page *
    20}&character=${characterId}` +
    getFilterString(filter),
  )).data.docs
    .map((entry) => {
      //transform object to adapt to the table interface
      const { _id, ...attributes } = entry;
      delete attributes.character;
      return {
        _id,
        attributes,
      };
    });
};

export const editQuote = async (quoteId, edit) => {
  try {
    (await instance.put(
      baseURL +
      `/quote/${quoteId}`,
      edit,
    ));
  } catch (error) {
    addAction({
      url: error.config.url,
      method: error.config.method,
    })
  }
};

export const duplicateQuote = async (body) => {
  try {
    (await instance.post(
      baseURL +
      `/quote/`,
      body,
    ));
  } catch (error) {
    addAction({
      url: error.config.url,
      method: error.config.method,
    })
  }
};

export const deleteQuote = async (quoteId) => {
  try {
    (await instance.delete(
      baseURL +
      `/quote/${quoteId}`,
    ));
  } catch (error) {
    addAction({
      url: error.config.url,
      method: error.config.method,
    })
  }
};
