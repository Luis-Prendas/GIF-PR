import { type GifsTypes } from '../Types/Gifs.t'

const apiKey = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.giphy.com/v1/gifs/'

export async function searchGiphyApi ({ search }: { search: string }) {
  const response = await fetch(`${BASE_URL}search?api_key=${apiKey}&limit=25&offset=0&rating=g&bundle=messaging_non_clips&q=${search}`)
  const res = await response.json() as GifsTypes
  return res
}
