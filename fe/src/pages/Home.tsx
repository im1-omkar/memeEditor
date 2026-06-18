import { useMemesState } from "../store/memeStates"

interface Meme {
  id: number,
  name: string,
  slug: string,
  url: string,
  category: string[]
}

const Home = () => {

  const memes = useMemesState((state:any)=> state.memes)

  return (
    <div className="h-screen w-screen">
      <div>Header and about</div>

      <div className="grid grid-cols-3 gap-8 p-4">
        {memes?.map((meme: Meme) => (
          <div className="flex flex-col border rounded-lg overflow-hidden">
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">{meme.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home