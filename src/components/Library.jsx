import React from 'react'
import '../styles/library.sass'
import close from '../assets/close.svg'

const Library = (props) => {
    const { songs, libRef, libraryToggle, pickSong } = props;
    // console.log("songs", songs);

    return (
        <div className='library' ref={libRef}>
            <div className="library-header">
                <h2>Library</h2>
                <img src={close} alt="close" onClick={libraryToggle} />
            </div>
            <div className="library-songs">
                {songs.map((song, index) => (
                    <div className="library-song" onClick={() => pickSong(index)}>
                        <img src={song.cover} alt="song" />
                        <div className="library-song-info">
                            <h3>{song.name}</h3>
                            <h4>{song.artist}</h4>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default Library