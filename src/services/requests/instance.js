import axios from "axios"

const baseURL = "https://the-one-api.dev/v2"

export const instance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'Authorization': 'Bearer F8eHCcHH69mt74EZ7Te0'}
});

export const getCharacters = () => {
    return instance.get(baseURL + "/character")
}
