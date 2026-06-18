import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Editor from './pages/Editor'
import { useEffect } from 'react'
import { useMemesState } from './store/memeStates'

// interface Meme {
//   id : number ,
//   name : string,
//   slug : string,
//   url : string,
//   category : string[]
// }


function App() {

  const setMemes = useMemesState((state:any )=> state.setMemes)

  useEffect(()=>{

    const fetchMemes = async ()=>{
      const res = await fetch("http://localhost:3000/memes")
      const data = await res.json()
      const memes = data.templates;

      //setMemeStates(memes)
      setMemes(memes)
    }

    fetchMemes();

  },)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/editor" element={<Editor/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
