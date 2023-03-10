import React, { useState, useEffect, useRef } from 'react';
import * as Tone from "tone";

import "/Drum Machine/Styles/drumpad.scss";

const note = ["C2", "D2", "E2", "F2",];

const DrumPad = ({ samples, numSteps = 16 }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const stepsRef = useRef([[]]);
    const tracksRef = useRef([]);
    const iconsRef = useRef([]);
    const seqRef = useRef(null);
    const arraytracks = [...Array(samples.length).keys()];
    const arrayIds = [...Array(numSteps).keys()];
    const trackIds = arraytracks;
    const stepIds = arrayIds;

    const handlePlayClick = async () => {
        if (Tone.Transport.state === "started") {
            Tone.Transport.pause();
            setIsPlaying(false);
        } else {
            await Tone.start();
            Tone.Transport.start();
            setIsPlaying(true);
        }
    };

    const handleBpmChange = (e) => {
        Tone.Transport.bpm.value = Number(e.target.value);
    };

    const handleVolumeChange = (e) => {
        Tone.Destination.volume.value = Tone.gainToDb(Number(e.target.value));
    };

    useEffect(() => {
        tracksRef.current = samples.map((sample, i) => ({
            id: i,
            sampler: new Tone.Sampler({
                urls: {
                    [note]: sample.url,
                },
            }).toDestination(),
        }));
        seqRef.current = new Tone.Sequence(
            (time, step) => {
                tracksRef.current.map((trac) => {
                    if (stepsRef.current[trac.id]?.[step]?.checked) {
                        trac.sampler.triggerAttack(note, time);
                    }
                    if (!iconsRef.current[step]) {
                        iconsRef.current[step] = {};
                    }
                    iconsRef.current[step].checked = true;
                });
            },
            [...stepIds],
            "16n"
        );
        seqRef.current.start(0);

        return () => {
            seqRef.current?.dispose();
            tracksRef.current.map((trac) => void trac.sampler.dispose());
        };
    }, [samples, numSteps]);
    return (
        <div className={"container"}>
            <div className={"pad-container"}>
                {trackIds.map((track, trackId) => (
                    <div key={trackId} className={'row'}>
                        {stepIds.map((step, stepId) => {
                            const id = `step ${trackId}, ${stepId}`;

                            return (
                                <label key={`${trackId}-${stepId}`}>
                                    <input
                                        key={id}
                                        id={id}
                                        type="checkbox"
                                        ref={(element) => {
                                            if (!element) return;
                                            if (!stepsRef.current[trackId]) {
                                                stepsRef.current[trackId] = [];
                                            }
                                            stepsRef.current[trackId][stepId] = element;
                                        }}

                                        defaultChecked={false}
                                    />
                                    <div/>
                                </label>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div>
                <button onClick={handlePlayClick} className={'button'}>
                    {isPlaying ? "Pause" : "Play"}
                </button>
                <label>
                    <span>BPM</span>
                    <input
                        type="range"
                        min={30}
                        max={150}
                        step={1}
                        onChange={handleBpmChange}
                        defaultValue={60}
                    />
                </label>
                <label>
                    <span>Volume</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        defaultValue={1}
                    />
                </label>
            </div>
        </div>
    );
}

export {DrumPad}