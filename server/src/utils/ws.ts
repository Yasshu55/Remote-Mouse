import Express from 'express'
import robot from "robotjs"

let previousPoint = [-1, -1];

export const GlobalWebSocket = (app : any) =>{
    app.ws('/real-time', function(ws : any, req : Express.Request) {
        console.log("WebSocket connection established");
        ws.on('message', function(msg : any) {
            const data = JSON.parse(msg)
            console.log(data)
            const type = data.type

            if(type === "move"){
                const{pointerCoordinates,isFirstTouched} = data
                const [xCoordinate, yCoordinate] = pointerCoordinates;
                const {x : currentCursorOfX, y: currentCursorOfY} = robot.getMousePos()

                if(xCoordinate !== -1 && yCoordinate !== -1){
                    if(isFirstTouched === 1){
                        previousPoint = [xCoordinate,yCoordinate]
                    } else {
                        const diffX = xCoordinate - previousPoint[0];
                        const diffY = yCoordinate - previousPoint[1];

                        const desktopCursorToBeAtX = currentCursorOfX + diffX * 3;
                        const desktopCursorToBeAtY = currentCursorOfY + diffY * 3;
                        robot.moveMouse(desktopCursorToBeAtX,desktopCursorToBeAtY)

                        console.log(`Moving cursor : current ${currentCursorOfX},${currentCursorOfY} to -> ${desktopCursorToBeAtX},${desktopCursorToBeAtY}`);
                        
                        previousPoint = [xCoordinate,yCoordinate]

                    }
                }
            } else if(type === "typing"){
                const {enteredCharacter} = data
                console.log("To be typed : ", enteredCharacter);
                robot.typeString(enteredCharacter)
            } else if(type === "specialType"){
                const {specialCharInput} = data
                console.log("To be executed : ", specialCharInput);
                robot.keyTap(specialCharInput)
            }
        });

        ws.on("error", (err : any) => {
            console.log("Error :", err);
        });

        ws.on("close", () =>{
            console.log("WebSocket connection closed");
        })
    })
}