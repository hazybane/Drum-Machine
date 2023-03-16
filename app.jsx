import React from "react";
import { createRoot } from "react-dom/client";
import {Drumfull} from "./Drum Machine/Components/drum machine/drum mach.jsx";
import '/Drum Machine/Styles/main.scss'
import '/Drum Machine/Sounds/kick.wav'
import '/Drum Machine/Sounds/snare.wav'
import '/Drum Machine/Sounds/open-hat.wav'
import '/Drum Machine/Sounds/hi-hat.wav'

const container = document.getElementById("root");
const root = createRoot(container);


const App = () => {
    return (
        <Drumfull/>
    )
}


root.render(<App />);


