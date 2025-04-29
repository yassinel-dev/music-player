import styles from "./MusicPlayerPage.module.css";
import data from "../../data/playlists.json";
import getFormattedTimeString from "../../utils/getFormattedTimeString";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaForwardStep, FaBackwardStep, FaAngleLeft } from "react-icons/fa6";
import { useMusicContext } from "../../contexts/MusicContext";
import { useNavigate } from "react-router-dom";

function MusicPlayerPage() {
  const {
    trackIndex,
    playlistIndex,
    audio,
    isPlaying,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    trackProgress,
    handleProgressChange,
  } = useMusicContext();

  const playlistName = data.playlists[playlistIndex].name;
  const artist = data.playlists[playlistIndex]["artist:"];
  const { name, duration } = data.playlists[playlistIndex].tracks[trackIndex];

  const navigate = useNavigate();

  return (
    <div
      className={`${styles["music-player"]} ${
        isPlaying && styles["music-player--playing"]
      }`}
    >
      <button
        className={styles["back-btn"]}
        onClick={() => navigate(-1)}
        title="go back to playlist Details page"
      >
        <FaAngleLeft />
      </button>
      <h1>{playlistName}</h1>
      <div className={styles["vinyl-container"]}>
        <div className={styles["vinyl"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 -960 960 960"
          >
            <path d="M400-120q-66 0-113-47t-47-113 47-113 113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47" />
          </svg>
        </div>
      </div>

      <div className={styles["song-info"]}>
        <h2 className={styles["song-name"]}>{name}</h2>
        <p className={styles["artist-name"]}>{artist}</p>
      </div>

      <div className={styles["progress-container"]}>
        <span className={styles["current-time"]}>
          {getFormattedTimeString(audio.currentTime)}
        </span>
        <div
          className={styles["progress-bar-container"]}
          onClick={(e) => handleProgressChange(e)}
        >
          <div
            className={styles["progress"]}
            style={{ width: trackProgress * 100 + "%" }}
          ></div>
        </div>
        <span className={styles["duration"]}>
          {getFormattedTimeString(duration)}
        </span>
      </div>

      <div className={styles["audio-controls-container"]}>
        <button onClick={playPreviousTrack} title="play previous track">
          <FaBackwardStep />
        </button>
        <button
          className={styles["play-btn"]}
          onClick={togglePlayPause}
          title="play track"
        >
          {isPlaying ? (
            <FaPause className={styles.icon} />
          ) : (
            <FaPlay className={styles.icon} />
          )}
        </button>
        <button onClick={playNextTrack} title="play next track">
          <FaForwardStep />
        </button>
      </div>
    </div>
  );
}

export default MusicPlayerPage;
