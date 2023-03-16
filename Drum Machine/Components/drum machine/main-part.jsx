import React, { useState} from 'react';
import {Soundsnames} from "./sounds.jsx";
import {DrumPad} from "./drum-pad.jsx";
import '/Drum Machine/Styles/main-part.scss'
import '/Drum Machine/Sounds/kick.wav'
import '/Drum Machine/Sounds/snare.wav'
import '/Drum Machine/Sounds/open-hat.wav'
import '/Drum Machine/Sounds/hi-hat.wav'



const audioSamples = [
    { url: "/Drum Machine/Sounds/kick.wav"},
    { url: "/Drum Machine/Sounds/snare.wav"},
    { url: "/Drum Machine/Sounds/open-hat.wav"},
    { url: "/Drum Machine/Sounds/hi-hat.wav"},
]


const MainPart = () => {
    const [resetKey, setResetKey] = useState(0);

    const handleResetClick = () => {
        setResetKey(resetKey + 1);
    };
    return (
        <div className={'main-part'}>
        <Soundsnames/>
        <DrumPad key={resetKey} samples = {audioSamples}/>
            <button className={"reset"} onClick={handleResetClick}>Clear</button>
        </div>
    )
}

export {MainPart}