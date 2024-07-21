import React from 'react'
import Keyboard from '../components/Mobile/Keyboard'
import { WebSocketProvider } from '../components/context/WebSocketProvider'

export default function page() {
  return (
    <div>
        <WebSocketProvider>
          <Keyboard />
        </WebSocketProvider>
    </div>
  )
}
