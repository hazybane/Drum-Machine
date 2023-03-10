import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import "/Drum Machine/Styles/btns.scss"

const AllButtons = () => {
    return (
    <section className={'btns'}>
        <PlayStopButton/>
    </section>
    )
}

export {AllButtons};

function PlayStopButton() {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleButtonClick = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <button onClick={handleButtonClick}>
            <FontAwesomeIcon icon={isPlaying ? faStop : faPlay} />
        </button>
    );
}

export {PlayStopButton};