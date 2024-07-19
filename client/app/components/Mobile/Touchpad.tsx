'use client'

import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useWebSocket } from "../context/WebSocketProvider"
import { TOUCHPAD_CLICK_URL,TOUCHPAD_LEFT_CLICK_URL,TOUCHPAD_RIGHT_CLICK_URL } from "@/utils/constants";

export default function Touchpad() {
    const socket = useWebSocket(); // get the socket which is created using contextApi
    const[mouseButtonClicked,setMouseButtonClicked] = useState(0);// initially set to 0 and -1 for left click and 1 for right click
    const[isClicked,setIsClicked] = useState(false)
    // const[mouseX,setMouseX] = useState(0);// initially set to 0
    // const[mouseY,setMouseY] = useState(0);// initially set to 0

    // useRefs
    const canvasRef = useRef(null)

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
    
  return (
    <div>
      <h1>TouchPad</h1>

      <canvas
      ref={canvasRef}
      // onTouchStart={() => }
      // onTouchMove={() => }
      onClick={() => setIsClicked(true)}
      >
      </canvas>

      <button onClick={() => setMouseButtonClicked(-1)}>Left Click</button>
      <button onClick={() => setMouseButtonClicked(1)}>Right Click</button>
    </div>
  )
}
