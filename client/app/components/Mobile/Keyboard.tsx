'use client'
import React, { useEffect, useState } from 'react'
import { useWebSocket } from '../context/WebSocketProvider'

export default function Keyboard() {
  const {socket} = useWebSocket()

  const [enteredCharacter,setEnteredCharacter] = useState<string>("")

  useEffect(() =>{
    if(enteredCharacter){
      console.log("enteredCharacter : ",enteredCharacter);
      socket.send(JSON.stringify({
        type: "typing",
        enteredCharacter
      }))
    }
    setEnteredCharacter("")
  },[enteredCharacter])


  const inputHandler = (e : any) =>{
    e.preventDefault()
    try {
      const currentValue = e.target.value;
      const currentInputChar = currentValue[currentValue.length - 1];
      setEnteredCharacter(currentInputChar)
    } catch (error) {
      console.log(error);
    }
  }
const keyHandler = (e: any) =>{
  e.preventDefault()
  try {
    const key = e.key;
    console.log("Key entered : ",key);
    
    if(key === 'Backspace'){
      e.preventDefault()
      socket.send(JSON.stringify({
        type: "specialType",
        specialCharInput : 'backspace'
      }))
    }
    else if(key === 'Enter'){
      e.preventDefault()
      socket.send(JSON.stringify({
        type: "specialType",
        specialCharInput : 'enter'
      }))
    }

  } catch (error) {
    console.log(error);
  }
}

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4">
        <h1>Remote keyboard</h1>
        <br />
        <input placeholder='Enter here....' className="h-12 border-2 border-[#000000] " type="text" onInput={inputHandler} onKeyDown={keyHandler} value={enteredCharacter}/>
    </div>
  )
}
