import {create} from 'zustand'

export const useMemesState = create((set)=> ({
    memes : [],
    setMemes : (memes : []) => set(()=> ({memes : memes}))
}))