import { useNavigate } from "react-router-dom"
import { useMemesState } from "../store/memeStates"

interface Meme {
  id: number,
  name: string,
  slug: string,
  url: string,
  category: string[]
}

const Home = () => {

  const memes = useMemesState((state)=> state.memes)
  const setSelectedMeme = useMemesState((state)=> state.setSelectedMeme)
  const navigate = useNavigate();

  const handleSelectedMeme = (meme: Meme)=>{
    setSelectedMeme(meme);
    navigate('/editor')
  }

  return (
    <div className="h-screen w-screen">

      <div className="grid grid-cols-3 gap-8 p-4">
        {memes.length != 0? memes.map((meme: Meme) => (
          <div onClick={()=>{handleSelectedMeme(meme)}} className="flex flex-col border rounded-lg overflow-hidden">
            <img
              src={meme.url}
              alt={meme.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-2">{meme.name}</div>
          </div>
        )) : 
        <div>Loading memes ....</div>
        }
      </div>
    </div>
  )
}

export default Home
