import React, { useEffect, useRef, useState } from "react";
import { useMemesState } from "../store/memeStates";   

interface Text {
  text: string;
  x: number;
  y: number;
}

const Editor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectedMeme = useMemesState((state) => state.selectedMeme);
  
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [memeText, setMemeText] = useState<Text[]>([
    { text: "text-1", x: 50, y: 50 },
    { text: "text-2", x: 50, y: 300 },
    { text: "text-3", x: 50, y: 350 }
  ]);

  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const MAX_WIDTH = 600;
  const MAX_HEIGHT = 400;
  const FONT_SIZE = 35;

  useEffect(()=>{
    if(!selectedMeme) return;
    if(!selectedMeme.texts) return;

    async function SetTheState(){
        if (!selectedMeme) return;
        setMemeText(selectedMeme.texts);
    }

    SetTheState()
  },[])

  useEffect(() => {
    
    if (!selectedMeme?.url) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedMeme.url;
    img.onload = () => setLoadedImage(img);

  }, [selectedMeme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loadedImage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = Math.min(MAX_WIDTH / loadedImage.width, MAX_HEIGHT / loadedImage.height, 1);
    const width = loadedImage.width * scale;
    const height = loadedImage.height * scale;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(loadedImage, 0, 0, width, height);

    ctx.font = `${FONT_SIZE}px Impact`;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.textBaseline = "top"; 

    memeText.forEach((t) => {
      ctx.fillText(t.text, t.x, t.y);
      ctx.strokeText(t.text, t.x, t.y);
    });

  }, [loadedImage, memeText]);


  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = `${FONT_SIZE}px Impact`;

    for (let i = memeText.length - 1; i >= 0; i--) {
      const { text, x, y } = memeText[i];
      const textWidth = ctx.measureText(text).width;
      const textHeight = FONT_SIZE; 

      if (mouseX >= x && mouseX <= x + textWidth && mouseY >= y && mouseY <= y + textHeight) {
        setDragIndex(i);
        setDragStart({ x: mouseX, y: mouseY });
        return; 
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (dragIndex === null) return; 

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - dragStart.x;
    const dy = mouseY - dragStart.y;

    setMemeText(prev => {
      const newTexts = [...prev];
      newTexts[dragIndex] = {
        ...newTexts[dragIndex],
        x: newTexts[dragIndex].x + dx,
        y: newTexts[dragIndex].y + dy
      };
      return newTexts;
    });

    setDragStart({ x: mouseX, y: mouseY });
  };

  const stopDragging = () => {
    setDragIndex(null);
  };


  const handleTextChange = (id: number, inputText: string) => {
    setMemeText(prev =>
      prev.map((text, i) => (i === id ? { ...text, text: inputText } : text))
    );
  };

  const addText = () => {
    setMemeText([...memeText, { text: "NEW TEXT", x: 50, y: 150 }]);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-[600px] bg-gray-50 rounded-xl shadow-sm border border-gray-100">
      
      <div className="flex-3 flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-inner overflow-hidden min-h-[400px]">
        {selectedMeme ? (
          <canvas 
            ref={canvasRef} 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
            className={`shadow-lg bg-white ${dragIndex !== null ? 'cursor-grabbing' : 'cursor-grab'}`}
          />
        ) : (
          <p className="text-gray-500 font-medium">Please select a meme to begin.</p>
        )}
      </div>

      <div className="flex-4 w-full md:w-80 flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-2">Edit Text</h2>
        
        <div className="flex flex-col gap-3 overflow-y-auto max-h-[400px] pr-2">
          {memeText.map((t, id) => (
            <div key={id} className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Text Line {id + 1}
              </label>
              <input
                onChange={(e) => handleTextChange(id, e.target.value)}
                value={t.text}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Enter text..."
              />
            </div>
          ))}
        </div>

        <button 
          onClick={addText}
          className="mt-4 w-full py-2 px-4 bg-gray-100 text-gray-700 font-semibold rounded-md hover:bg-gray-200 transition-colors"
        >
          + Add Another Line
        </button>
        
        <p className="text-xs text-center text-gray-400 mt-2">
          Tip: You can drag the text directly on the image!
        </p>
      </div>

    </div>
  );
};

export default Editor;