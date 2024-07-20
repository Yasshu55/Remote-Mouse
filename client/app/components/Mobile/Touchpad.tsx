'use client'

import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useWebSocket } from "../context/WebSocketProvider"
import { TOUCHPAD_CLICK_URL,TOUCHPAD_LEFT_CLICK_URL,TOUCHPAD_RIGHT_CLICK_URL } from "@/utils/constants";
import Keyboard from "./Keyboard";

export default function Touchpad() {
    const {socket} = useWebSocket(); // get the socket which is created using contextApi

    //useStates
    const[mouseButtonClicked,setMouseButtonClicked] = useState(0);// initially set to 0 and -1 for left click and 1 for right click
    const[isClicked,setIsClicked] = useState(false)
    const[padSize,setPadSize] = useState<[number, number]>([0,0])
    const [pointerCoordinates, setPointerCoordinates] = useState([-1, -1]);

    // useRefs
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasCenterCoord = useRef<[number, number]>([0,0])
    const isFirstTouched = useRef<number | null>(null);
  

    useEffect(() =>{
      if(isClicked){
        console.log("Click event sending!");
        axios.post(TOUCHPAD_CLICK_URL,{clicked: true})
        setIsClicked(false)
      }
    },[isClicked])

    useEffect(() =>{
      if(mouseButtonClicked === -1){
        console.log("Left-Click event sending!");
        axios.post(TOUCHPAD_LEFT_CLICK_URL,{left_clicked: true})
        setMouseButtonClicked(0)
      } else if(mouseButtonClicked === 1) {
        console.log("Right-Click event sending!");
        axios.post(TOUCHPAD_RIGHT_CLICK_URL,{right_clicked: true})
        setMouseButtonClicked(0)
      }
    },[mouseButtonClicked])

    useEffect(() =>{
      if(canvasRef.current){
        //get the boundary rectangle of canvas
        const rectangle = canvasRef.current.getBoundingClientRect()

        // Get the width and height of the canvas element
        const widthOfCanvas = canvasRef.current.offsetWidth
        const heightOfCanvas = canvasRef.current.offsetHeight

        //calcaluate the center of canvas 
        canvasCenterCoord.current = [
          rectangle.right - widthOfCanvas / 2,
          rectangle.bottom - heightOfCanvas / 2,
        ]

        // Update the state with the width and height of the canvas
        setPadSize([widthOfCanvas,heightOfCanvas])
      }
    },[canvasRef.current])

    useEffect(() =>{
        if(pointerCoordinates[0] !== -1 && pointerCoordinates[1] !== -1){
          console.log("Touch event sending!");
          socket.send(JSON.stringify({
            pointerCoordinates,
            padSize,
            isFirstTouched : isFirstTouched.current,
            type : "move"
          }))
          isFirstTouched.current = 0;
        }
    },[pointerCoordinates])

    const touchMoveHandler = (e : any) =>{
      try {
        const clientX1 = e.changedTouches[0].clientX
        const clientY1 = e.changedTouches[0].clientY
        setPointerCoordinates([clientX1, clientY1]);
      } catch (error) {
        console.log(error);
      }
    }
    

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
    <h2 className="text-3xl font-bold mb-6">Touchpad</h2>
    <div className="w-full max-w-md">
    <canvas
    ref={canvasRef}
    onTouchMove={touchMoveHandler}
    onTouchStart={() => (isFirstTouched.current = 1)}
    onClick={() => setIsClicked(true)}
    className="bg-black w-full h-96 rounded-lg shadow-lg"
    ></canvas>
      <div className="flex w-full mt-4">
        <button
          onClick={() => setMouseButtonClicked(-1)}
          className="w-1/2 bg-blue-600 hover:bg-blue-700 rounded-l-lg mr-1 h-12 text-white transition-colors duration-300"
        >
          Left Click
        </button>
        <button
          onClick={() => setMouseButtonClicked(1)}
          className="w-1/2 bg-blue-600 hover:bg-blue-700 rounded-r-lg h-12 text-white transition-colors duration-300"
        >
          Right Click
        </button>
      </div>
    </div>
  </div>
  )
}
