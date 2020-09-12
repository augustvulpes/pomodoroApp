import React, { useEffect, useState } from 'react';
import Sound from 'react-sound';
import ProgressBar from 'progressbar.js';

import Button from '../../components/UI/Button/Button';

import './ProgressCircle.css';

const timeToString = time => {
    let seconds = time % 60;
    const minutes = (time - seconds) / 60;
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}

const ProgressCircle = props => {
    const [bar, setBar] = useState(null);
    const [savedValue, setSavedValue] = useState(0);
    const [shouldPlaySound, setShouldPlaySound] = useState(false);
    
    useEffect(() => {
        setBar(new ProgressBar.Circle(document.getElementById('circle'), {
            strokeWidth: 6,
            easing: 'linear',
            color: '#fcb045',
            trailColor: '#5d5d5d',
            trailWidth: 1,
            text: {
                value: timeToString(props.duration / 1000),
                className: 'circle__text'
            },
            from: {
                color: '#fcb045'
            },
            to: {
                color: '#833ab4'
            },
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                const time = ((props.duration - Math.round(props.duration * circle.value())) / 1000).toFixed(0);
                circle.setText(timeToString(time));
            }
          }));
    }, [props.duration]);

    const onPlayHandler = () => {
        bar.animate(1, {
            duration: props.duration - savedValue * props.duration
        }, () => {
            setSavedValue(bar.value());
            if (bar.value() === 1) {
                setShouldPlaySound(true);
            }
        });
    };

    const onStopHandler = () => {
        bar.stop();
    };

    const onResetHandler = () => {
        setSavedValue(0);
        bar.set(0);
    };

    return (
        <div className="progressCircle">
            <Sound 
                url="http://mattersofgrey.com/audio/Minecraft-levelup.mp3"
                playStatus={shouldPlaySound ? Sound.status.PLAYING : Sound.status.STOPPED}
                onFinishedPlaying={() => setShouldPlaySound(false)}
                volume={50} />
            <div className="circle" id="circle"></div>
            <div className="btn-list">
                <Button onClick={onPlayHandler}>PLAY</Button>
                <Button onClick={onStopHandler}>STOP</Button>
                <Button onClick={onResetHandler} disabled={!savedValue}>RESET</Button>
            </div>
        </div>
    );
}

export default ProgressCircle;