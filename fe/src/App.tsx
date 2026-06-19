import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Editor from './components/Editor1'
import { useEffect } from 'react'
import { useMemesState } from './store/memeStates'
import Header from './components/Header'

// interface Meme {
//   id : number ,
//   name : string,
//   slug : string,
//   url : string,
//   category : string[]
// }


function App() {

  const setMemes = useMemesState((state )=> state.setMemes)

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
    <div>
      
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
