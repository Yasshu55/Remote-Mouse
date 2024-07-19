'use client'
import { TOUCHPAD_URL } from "@/utils/constants";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface WebSocketContextValue{
    socket : WebSocket | null
}

const WebSocketContext = createContext<WebSocketContextValue | undefined>(undefined)

export const WebSocketProvider = ({children} : {children : ReactNode}) =>{
    try {
        const [socket,setSocket] = useState<WebSocket | null>(null)

        useEffect(() =>{
          console.log("Touch pad url : ", TOUCHPAD_URL);
          
            const socket = new WebSocket(TOUCHPAD_URL);
            socket.onopen = () => {
                console.log("Connection established: ");
            };

            socket.onerror = (error) => {
              console.error("WebSocket error:", error);
            };
    
            socket.onclose = (event) => {
                console.log("WebSocket connection closed:", event.reason);
            };
    
            setSocket(socket);
    
            return () => {
              console.log("Closing WebSocket connection");
              socket.close();
          };
        },[])

        return (
            <WebSocketContext.Provider value={{ socket }}>
                {children}
            </WebSocketContext.Provider>
        );
    } catch (error) {
     console.log("Error in wsProvider : ",error);
    }
}

export const useWebSocket = (): WebSocketContextValue => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};