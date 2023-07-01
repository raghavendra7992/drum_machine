import React, { useState } from 'react';
import "./App.css"
const drumData = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    keyCode: 81
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    keyCode: 87
  },
  {
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    keyCode: 69
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    keyCode: 65
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    keyCode: 83
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    keyCode: 68
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    keyCode: 90
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    keyCode: 88
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    keyCode: 67
  }
];
const pianoData = [
  {
    keyCode: 65,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3',
  },
  {
    keyCode: 83,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3',
  },
  {
    keyCode: 68,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3',
  },
  {
    keyCode: 70,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3',
  },
  {
    keyCode: 71,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3',
  },
  {
    keyCode: 72,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3',
  },
  {
    keyCode: 74,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3',
  },
  {
    keyCode: 75,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3',
  },
  {
    keyCode: 76,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3',
  },
];


const DrumPad = ({ drum, isPianoMode, volume, onPadClick, isPowerOn }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyPress = (event) => {
    if (isPowerOn && event.keyCode === drum.keyCode) {
      const audio = new Audio(drum.url);
      audio.volume = volume / 100;
      audio.play();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);
      onPadClick(drum.id);
    }
  };

  const handleButtonPress = () => {
    if (isPowerOn) {
      const audio = new Audio(drum.url);
      audio.volume = volume / 100;
      audio.play();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);
      onPadClick(drum.id);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <button className={`drum-pad ${isPressed ? 'pressed' : ''}`} onClick={handleButtonPress}>
      {isPowerOn && (isPianoMode ? drum.keyTrigger : drum.keyTrigger)}
      <audio className="clip" id={drum.keyTrigger} src={drum.url} />
    </button>
  );
};

const DrumMachine = () => {
  const [isPianoMode, setIsPianoMode] = useState(false);
  const [volume, setVolume] = useState(50);
  const [displayedKey, setDisplayedKey] = useState('');
  const [isPowerOn, setIsPowerOn] = useState(true);

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleModeChange = () => {
    setIsPianoMode(!isPianoMode);
    setDisplayedKey('');
  };

  const handlePadClick = (id) => {
    if (isPowerOn) {
      setDisplayedKey(id);
    }
  };

  const handlePowerButtonClick = () => {
    setIsPowerOn(!isPowerOn);
    setDisplayedKey('');
  };

  return (
    <div id="drum">
            <div className="pads">
            {isPianoMode
  ? pianoData.map((piano) => (
      <DrumPad
        key={piano.id}
        drum={piano}
        isPianoMode={isPianoMode}
        volume={volume}
        onPadClick={handlePadClick}
        isPowerOn={isPowerOn}
      />
    ))
  : drumData.map((drum) => (
      <DrumPad
        key={drum.id}
        drum={drum}
        isPianoMode={isPianoMode}
        volume={volume}
        onPadClick={handlePadClick}
        isPowerOn={isPowerOn}
      />
    ))}

      </div>
      <div className="controls">
        <div className="power">
          <button className='powbut' onClick={handlePowerButtonClick}>{isPowerOn ? 'OFF' : 'ON'}</button>
        </div>
        <div id="display">{isPowerOn ? (isPianoMode ? displayedKey : displayedKey) : ''}</div>

        <div className="volume-slider">
          <input
            type="range"
            id="volume"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            disabled={!isPowerOn}
          />
        </div>
        <div className="mode-toggle">
          <label htmlFor="mode">Bank</label><hr/>
          <input
            type="checkbox"
            id="toggle"
            checked={isPianoMode}
            onChange={handleModeChange}
            disabled={!isPowerOn}
            
          />
          <span id='span'>{isPianoMode ? "DRUM":"PIANO"}</span><hr/>
          <span id='end'>Code by Raghavendra singh</span>
        </div>
      </div>
     

    </div>
  );
};

export default DrumMachine;
