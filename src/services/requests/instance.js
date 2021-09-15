import axios from "axios"

const baseURL = "https://the-one-api.dev/v2"

export const instance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'Authorization': 'Bearer F8eHCcHH69mt74EZ7Te0'}
});

export const getCharacters = async (page) => {
    return (await instance.get(baseURL + `/character?limit=20&offset=${page * 20}]}`)).data.docs
    .map((entry) => {
      const {_id, ...attributes} = entry
      return {
        _id,
        attributes
      }
    })
}

export const getTotalCharacters = async()=>{
  return (await instance.get(baseURL + `/character?limit=1`)).data.total
}

export const getQuotes = async (characterId, page) => {
  return (await instance.get(baseURL + `/character/${characterId}/quote?limit=20&offset=${page * 20}]}`)).data.docs
  .map((entry) => {
    //transform object to adapt to the table interface
    const {_id, ...attributes} = entry
    return {
      _id,
      attributes
    }
  })
}
