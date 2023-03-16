import React from "react";
import '/Drum Machine/Styles/Drumfull.scss'
import {Header} from "./header.jsx";
import {Steps} from "./stepsequence.jsx";
import {MainPart} from "./main-part.jsx";
import '/Drum Machine/Sounds/kick.wav'
import '/Drum Machine/Sounds/snare.wav'
import '/Drum Machine/Sounds/open-hat.wav'
import '/Drum Machine/Sounds/hi-hat.wav'


const Drumfull = () => {
    return (
        <div className={'drumfull'}>
            <Header/>
            <Steps/>
            <MainPart/>
        </div>
    )
}

export {Drumfull}