import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Editor from './pages/Editor'


function App() {

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
