import { useEffect, useState } from 'react'
import { type Daum } from '../Types/Gifs.t'
import { searchGiphyApi } from '../services/Giphy.api'

export default function useGiphy ({ search = 'Ramdon' }: { search: string | undefined }) {
  const [gifs, setGifs] = useState<Daum[] | null>(null)

  useEffect(() => {
    if (search !== undefined) {
      searchGiphyApi({ search }).then((e) => {
        setGifs(e.data)
      })
    }
  }, [search])

  return { gifs }
}
