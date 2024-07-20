import { Router } from "express";
import robot from 'robotjs'

const router = Router()

router.post('/click', (req,res) =>{

    robot.mouseClick();
    res.json({success: true})
})

router.post('/left-click', (req,res) =>{
    console.log("Left click func entered");
    robot.mouseClick("left");
    res.json({success: true})
})

router.post('/right-click', (req,res) =>{
    console.log("Right click func entered");
    robot.mouseClick("right");
    res.json({success: true})
})

export default router