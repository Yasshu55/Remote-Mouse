import React from 'react'
import TouchPadClient from './client'
import { WebSocketProvider } from '../components/context/WebSocketProvider'

export default function TouchPadPage() {
  return (
    <div>
      <WebSocketProvider>
        <TouchPadClient />
      </WebSocketProvider>
    </div>
  )
}
