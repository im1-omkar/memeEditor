import React, { useEffect, useRef, useState } from "react";
import { useMemesState } from "../store/memeStates"

interface Text {
  text : string,
  x : number,
  y : number
}

//set the number of texts :)


const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedMeme = useMemesState((state)=> state.selectedMeme);
  const [numberOfTexts, setNumberOfTexts] = useState(2);
  const imageRef = useRef<HTMLImageElement | null>(null)

  const MAX_WIDTH = 600;
  const MAX_HEIGHT = 400;

  const meme = useMemesState((state) => state.selectedMeme);

  const [memeText, setMemeText] = useState<Text[]>([
    {
      text : "Text 1 ",
      x : 220,
      y : 100
    },
    {
      text: "Text 2",
      x: 220,
      y: 300
    }
  ])

  useEffect(()=>{
    const canvas = canvasRef.current;
    if (!canvas) return;
    if(!selectedMeme) return;

    const meme = new Image()
    meme.src = selectedMeme?.url;

    meme.onload = () => {
      const MAX_WIDTH = 600;
      const MAX_HEIGHT = 400;

      imageRef.current = meme;

      const scale = Math.min(
        MAX_WIDTH / meme.width,
        MAX_HEIGHT / meme.height,
        1 // don't enlarge small images
      );

      const width = meme.width * scale;
      const height = meme.height * scale;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(
        meme,
        0,
        0,
        width,
        height
      );

      ctx.font = "48px Impact"

      memeText.forEach((inputText) => {
        ctx.fillText(inputText.text, inputText.x, inputText.y)
      })
    };

  },)

  useEffect(()=>{
    const canvas = canvasRef.current;

    if(!canvas) return;
    if(!selectedMeme) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    const meme = imageRef.current;
    if(!meme) return;


    const scale = Math.min(
      MAX_WIDTH / meme.width,
      MAX_HEIGHT / meme.height,
      1 // don't enlarge small images
    );

    const width = meme.width * scale;
    const height = meme.height * scale;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(
      meme,
      0,
      0,
      width,
      height
    );

    ctx.font = "48px Impact"

    memeText.forEach((inputText) =>{
      ctx.fillText(inputText.text, inputText.x, inputText.y)
    })

  },[memeText])

  const setTexts = (id: number, inputText: string) => {
    setMemeText(memeTexts =>
      memeTexts.map((text, i) =>
        i === id
          ? {
            text: inputText,
            x: text.x,
            y: text.y
          }
          : text
      )
    );
  };

  return (
    <div className="border flex h-max">
      {meme ?
        (<div className="flex-3 border flex justify-center items-center">
          <canvas ref={canvasRef} className="border"/>
        </div>):
        <div>no image is selected</div>
      }
      <div className="flex-4 border flex flex-col justify-center p-30">
        {
          Array.from({length : numberOfTexts}).map((_,id)=>(
            <div key={id}>
              <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTexts(id, e.target.value) }} className='border' placeholder={"Text" + (id + 1)} />
            </div>
          ))
        }
        
      </div>
    </div>
  )
}



export default Editor;
