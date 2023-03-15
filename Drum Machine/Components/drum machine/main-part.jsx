import React, { useState} from 'react';
import {Soundsnames} from "./sounds.jsx";
import {DrumPad} from "./drum-pad.jsx";
import '/Drum Machine/Styles/main-part.scss'
import{audioSamples} from "../../../public/Sounds/samples.jsx";

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