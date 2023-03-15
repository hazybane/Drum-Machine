import React, { useState, useEffect, useRef } from 'react';
import * as Tone from "tone";
import "/Drum Machine/Styles/drumpad.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'



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
                <div className={'line'}>
                    {stepIds.map((stepId) => (
                        <label className={'step'} >
                            <input
                                type="radio"
                                name="icon"
                                id={"icon" + "-" + stepId}
                                disabled
                                ref={(elm) => {
                                    if (!elm) return;
                                    iconsRef.current[stepId] = elm;
                                }}
                                className={'step-input'}
                            />
                            <div className={'step-content'} />
                        </label>
                    ))}
                </div>
                {trackIds.map((track, trackId) => (
                    <div key={trackId} className={'rows'}>
                        {stepIds.map((step, stepId) => {
                            const id = `step ${trackId}, ${stepId}`;
                            return (
                                <label key={`${trackId}-${stepId}`} className={'row'}>
                                    <input className={'pad-square'}
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
                                </label>
                            );
                        })}
                    </div>
                ))}
            </div>
            <div className={'buttons-all'}>
                <button onClick={handlePlayClick} className={'play'}>
                    {isPlaying ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
                </button>
                <label className={"bpm-label"}>
                    <span>BPM</span>
                    <input
                        className={'bpm-input'}
                        type="range"
                        min={30}
                        max={150}
                        step={1}
                        onChange={handleBpmChange}
                        defaultValue={60}
                    />
                </label>
                <label className={"volume-label"}>
                    <span>Volume</span>
                    <input className={'volume-input'}
                        type="range"
                        min={0}
                        max={0.5}
                        step={0.01}
                        onChange={handleVolumeChange}
                        defaultValue={0.25}
                    />
                </label>
            </div>
        </div>
    );
}

export {DrumPad}