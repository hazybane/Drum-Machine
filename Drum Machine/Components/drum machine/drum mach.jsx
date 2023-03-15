import React from "react";
import '/Drum Machine/Styles/Drumfull.scss'
import {Header} from "./header.jsx";
import {Steps} from "./stepsequence.jsx";
import {MainPart} from "./main-part.jsx";



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