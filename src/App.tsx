import { FaHeart, FaRandom, FaSearch } from 'react-icons/fa'
import { HiTrendingUp } from 'react-icons/hi'
import Button from './components/Button'
import { useEffect, useState } from 'react'
import { type Daum, type GifsTypes } from './Types/Gifs.t'
import GiphySVG from './svg/GiphySVG'

const apiKey = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.giphy.com/v1/gifs/'

export default function App () {
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [gifs, setGifs] = useState<Daum[] | null>(null)

  useEffect(() => {
    const searchGifs = async () => {
      const result = await fetch(`${BASE_URL}trending?api_key=${apiKey}&limit=25&offset=0&rating=g&bundle=messaging_non_clips`)
      const res = await result.json() as GifsTypes

      setGifs(res.data)
    }

    searchGifs()
  }, [])

  const handleSudmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(`${BASE_URL}search?api_key=${apiKey}&limit=25&offset=0&rating=g&bundle=messaging_non_clips&q=${search}`)
    const res = await response.json() as GifsTypes
    setGifs(res.data)
  }

  return (
    <main className="bg-slate-800 text-slate-200 flex justify-start items-center flex-col">
      <header className="flex flex-col justify-center items-center gap-4 bg-slate-900 p-4 w-full">
        <div className="flex gap-4 items-center justify-center p-2 w-96">
          <span className="uppercase opacity-70">Powered by</span>
          <GiphySVG />
        </div>
        <form className="w-96 flex gap-2 p-2" onSubmit={handleSudmit}>
          <input type="text" placeholder="Search for all GIFs" className="w-full px-4 py-2 rounded-xl text-black" onChange={(event) => { setSearch(event.target.value) }} value={search} />
          <button className="bg-gradient-to-br from-purple-600 to-blue-500 p-4 rounded-full">
            <FaSearch />
          </button>
        </form>
      </header>
      <section className="flex gap-8 pt-12 p-10">
        <Button><FaHeart /> Liked</Button>
        <Button><HiTrendingUp /> Trending Gifs</Button>
        <Button><FaRandom /> Random Gifs</Button>
      </section>
      <section className="bg-slate-900 rounded-xl gap-8 p-8 columns-1 w-[300px] sm:columns-2 sm:w-[500px] md:columns-3 md:w-[700px] lg:columns-4 lg:w-[900px] justify-center [&>div:not(:first-child)]:mt-8">
        {gifs?.map(gif => (
          <div key={gif.id}>
            <img src={gif.images.original.url} className="rounded-xl" />
          </div>
        ))}
      </section>
    </main>
  )
}
