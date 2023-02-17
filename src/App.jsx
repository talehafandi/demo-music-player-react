import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import './App.sass'
import Player from './components/Player'
import Library from './components/Library'
import { getMusics } from './data/data'

function App() {
  const songs = getMusics()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentSong, setCurrentSong] = useState(songs[currentIndex])
  const [isPlaying, setIsPlaying] = useState(false)

  const libRef = useRef(null)

  const libraryToggle = () => {
    libRef.current.classList.toggle('library--active')
  }

  const pickSong = (index) => {
    setCurrentIndex(index)
    setCurrentSong(songs[index])
    setIsPlaying(true)
    console.log("index", index)
  }

  return (
    <div className="App">
      <header>
        <img src={reactLogo} className="App-logo" alt="logo" />
        <button className='btn-library' onClick={libraryToggle} >
          Libary
        </button>

      </header>
      <Player 
            songs={songs}
            currentSong={currentSong} 
            setCurrentSong={setCurrentSong}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
      />
      <Library 
            songs={songs} 
            libRef={libRef} 
            libraryToggle={libraryToggle}
            pickSong={pickSong}
      />
      
    </div>
  )
}

export default App
