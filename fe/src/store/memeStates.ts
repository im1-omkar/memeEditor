import {create} from 'zustand'

// export interface Meme {
//     id: number;
//     name: string;
//     slug: string;
//     url: string;
//     category: string[];
// }

interface Text {
    text: string;
    x: number;
    y: number;
}

interface Meme {
    id: number,
    name: string,
    slug: string,
    url: string,
    category: string[],
    texts: Text[]
}
/**
 * add few more categories :)
 * 
 * numberOfTexts : number
 * Text : {
 *    text : string,
 *    x : number,
 *    y : number
 * }
 */

interface MemeStore {
    memes: Meme[];
    selectedMeme : Meme | null;
    setMemes: (memes: Meme[]) => void;
    setSelectedMeme : (meme: Meme)=> void;
}

export const useMemesState = create<MemeStore>((set)=> ({
    memes : [],
    selectedMeme : null,
    setMemes : (memes : Meme[]) => set({memes : memes}),
    setSelectedMeme : (meme : Meme)=> set({selectedMeme : meme})
}))

