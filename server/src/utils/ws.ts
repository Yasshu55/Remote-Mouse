

export const GlobalWebSocket = (app : any) =>{
    app.ws('/real-time', function(ws : any, req : Express.Request) {
        console.log("WebSocket connection established");
        ws.on('message', function(msg : any) {
            console.log(msg);
            ws.send(msg);
        });

        ws.on("error", (err : any) => {
            console.log("Error :", err);
        });

        ws.on("close", () =>{
            console.log("WebSocket connection closed");
        })
    })
}