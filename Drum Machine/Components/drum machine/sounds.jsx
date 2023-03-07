import React from "react";
import '/Drum Machine/Styles/styles-names.scss'
const Soundsnames = () => {
    return(
        <section className={'soundnames-section'}>
            <div className={'soundname-container'}>
            <div className={'soundname'}>Kick</div>
            <div className={'soundname'}>Snare</div>
            <div className={'soundname'}>Open Hat</div>
            <div className={'soundname'}>Closed hat</div>
            </div>
        </section>
    )
}

export {Soundsnames}