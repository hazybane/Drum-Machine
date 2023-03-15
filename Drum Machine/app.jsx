import React from "react";
import { createRoot } from "react-dom/client";
import {Drumfull} from "./Components/drum machine/drum mach.jsx";
import '/Drum Machine/Styles/main.scss'


const container = document.getElementById("root");
const root = createRoot(container);


const App = () => {
    return (
        <Drumfull/>
    )
}


root.render(<App />);


