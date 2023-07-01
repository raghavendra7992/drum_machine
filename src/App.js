import React, { useState } from 'react';

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

const DrumPad = ({ drum, isPianoMode, volume, onPadClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleKeyPress = (event) => {
    if (event.keyCode === drum.keyCode) {
      const audio = new Audio(drum.url);
      audio.volume = volume / 100;
      audio.play();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 100);
      onPadClick(drum.id);
    }
  };

  const handleButtonPress = () => {
    const audio = new Audio(drum.url);
    audio.volume = volume / 100;
    audio.play();
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 100);
    onPadClick(drum.id);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <button className={`drum-pad ${isPressed ? 'pressed' : ''}`} onClick={handleButtonPress}>
      {isPianoMode ? drum.keyTrigger : drum.id}
      <audio className="clip" id={drum.keyTrigger} src={drum.url} />
    </button>
  );
};

const DrumMachine = () => {
  const [isPianoMode, setIsPianoMode] = useState(false);
  const [volume, setVolume] = useState(50);
  const [displayedKey, setDisplayedKey] = useState('');

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleModeChange = () => {
    setIsPianoMode(!isPianoMode);
    setDisplayedKey('');
  };

  const handlePadClick = (id) => {
    setDisplayedKey(id);
  };

  return (
    <div id="drum-machine">
      <div id="display">{displayedKey}</div>
      <div className="controls">
        <div className="volume-slider">
          <label htmlFor="volume-slider">Volume</label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <div className="mode-toggle">
          <label htmlFor="mode-toggle">Mode</label>
          <input
            type="checkbox"
            id="mode-toggle"
            checked={isPianoMode}
            onChange={handleModeChange}
          />
          <span>{isPianoMode ? 'Piano Mode' : 'Drum Mode'}</span>
        </div>
      </div>
      <div className="drum-pads">
        {drumData.map((drum) => (
          <DrumPad
            key={drum.id}
            drum={drum}
            isPianoMode={isPianoMode}
            volume={volume}
            onPadClick={handlePadClick}
          />
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
