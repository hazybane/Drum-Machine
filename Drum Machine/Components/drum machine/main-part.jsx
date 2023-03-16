import React, { useState} from 'react';
import {Soundsnames} from "./sounds.jsx";
import {DrumPad} from "./drum-pad.jsx";
import '/Drum Machine/Styles/main-part.scss'
import '/Drum Machine/Sounds/kick.wav'
import '/Drum Machine/Sounds/snare.wav'
import '/Drum Machine/Sounds/open-hat.wav'
import '/Drum Machine/Sounds/hi-hat.wav'



const audioSamples = [
    { url: "/dist/assets/kick-127089a6.wav"},
    { url: "/dist/assets/snare-7cc8f4af.wav"},
    { url: "/dist/assets/open-hat-67e25bf7.wav"},
    { url: "/dist/assets/hi-hat-3c0172c1.wav"},
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