'use client'

import { useWebSocket } from "../context/WebSocketProvider"

export default function Touchpad() {
    const socket = useWebSocket()

    function handler(){
      try {
        console.log(socket);
        
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <div>
      Touchpad
      <button onClick={handler}>Click me</button>

    </div>
  )
}
