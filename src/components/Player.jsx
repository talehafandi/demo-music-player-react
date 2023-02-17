import React, { useState, useRef, useEffect } from 'react'
import '../styles/player.sass'
import nextIcon from '../assets/next-c.svg'
import prevIcon from '../assets/prev-c.svg'
import playIcon from '../assets/play-c.svg'
import pauseIcon from '../assets/pause-c.svg'
import volIcon from '../assets/vol-c.svg'
import replayIcon from '../assets/replay-c.svg'

import '../theme/variables.sass'

const directions = {
    next: 'next',
    prev: 'prev'
}

const durationParser = (duration) => {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

const Player = (props) => {
    const { 
        songs, 
        currentSong, 
        setCurrentSong, 
        currentIndex, 
        setCurrentIndex, 
        isPlaying, 
        setIsPlaying } = props;

    const imgRef = useRef(null);
    const volumeRef = useRef(null);
    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [volume, setVolume] = useState(50)
    const [songState, setSongState] = useState(false); // false means song is not playing currently
    const [currentTime, setCurrentTime] = useState(0); 
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        // console.log("currentIndex", currentIndex);
        // progressRef.current.style.setProperty('transform', `translateX(${progress}%)`);

    }, [currentIndex])

    const onProgressChange = (e) => {
        // const { duration, currentTime } = audioRef.current;
        // const progressPercent = (currentTime / duration) * 100;
        setProgress(e.target.value);
        console.log("test")
    }

    const trackToggle = () => {
        setIsPlaying(prevState => !prevState);
        let imgClassList = imgRef.current.classList;
        if (isPlaying){
            imgClassList.remove('animate-spin-slow');
            // console.log(window.getComputedStyle(imgRef.current, null).getPropertyValue('transform'))
            audioRef.current.pause();
            // setIsPlaying(false);
        }else {
            imgClassList.add('animate-spin-slow');
            audioRef.current.play();
            // setIsPlaying(true);
        }
    }

    const onSongChange = (direction) => {
        if (direction === 'next' && currentIndex < songs.length - 1){
            setCurrentSong(songs[currentIndex + 1]);
            setCurrentIndex(prevState => prevState + 1);
        }else if (direction === 'prev' && currentIndex > 0){
            setCurrentSong(songs[currentIndex - 1]);
            setCurrentIndex(prevState => prevState - 1);
        }
    }

    const volumeBarToggle = () => {
        volumeRef.current.classList.toggle('volume-bar-active');
    }

    const onVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = volume / 100;
        console.log("volume", durationParser(audioRef.current.currentTime), audioRef.current.duration)
    }

    const onReplay = () => {
        audioRef.current.currentTime = 0;
        // audioRef.current.play();
    }

    useEffect(() => {
        if(isPlaying) audioRef.current.play();
    }, [currentSong])

    useEffect(() => {
        if(isPlaying){
            setInterval(() => {
                const { duration, currentTime } = audioRef.current;
                const progressPercent = (currentTime / duration) * 100;
                setProgress(progressPercent);
                // console.log("hrmmm")
            }, 1000);
        }
        // console.log("hrmmm")
    }, [isPlaying])

    const onTimeUpdate = () => {
        const { duration, currentTime } = audioRef.current;
        setCurrentTime(currentTime);
        // const progressPercent = (currentTime / duration) * 100;
        // setProgress(progressPercent);
        // console.log("hrmmm")
    }

  return (
    <div className='player'> 
        <div className="player-container">
            <div className='cover'>
                <img src={currentSong.cover} ref={imgRef} alt={currentSong.name} />
            </div>
            <div className='song-info'>
                <h3 className='track'>{currentSong.name}</h3>
                <h4 className='artist'>{currentSong.artist}</h4>
                <audio src={currentSong.audio} ref={audioRef} onTimeUpdate={onTimeUpdate} controls></audio>
            </div>
            <div className="song-progress">
                <span className="progress-time">{durationParser(currentTime)}</span>
                <div className="progress" >
                    <input type="range" value={progress} onChange={onProgressChange} className='progress-bar-input' min='0' max='100' />
                    <div className="progress-bar" ref={progressRef}></div>
                </div>
                <span className="progress-time">{
                    audioRef.current?.duration 
                        ? durationParser(audioRef.current?.duration)
                        : '0:00'
                }</span>
            </div>
            <div className='player-controls'>
                <div className='control-buttons'>
                    <button className='btn-replay'>
                        <img src={replayIcon} alt="replay" onClick={onReplay} />
                    </button>
                    <button className='btn-prev'>
                        <img src={prevIcon} alt="prev" onClick={() => onSongChange(directions.prev)} />
                    </button>
                    <button className='btn-play'>
                        <img src={!isPlaying ? playIcon : pauseIcon} onClick={trackToggle} alt="play" />
                    </button>
                    <button className='btn-next'>
                        <img src={nextIcon} alt="next" onClick={() => onSongChange(directions.next)} />
                    </button>
                    <div className="track-volume">
                    <button className='btn-volume'>
                        <img src={volIcon} alt="next" onClick={volumeBarToggle} />
                    </button>
                    <input type="range" min='0' max='100' ref={volumeRef} onChange={onVolumeChange} />
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Player