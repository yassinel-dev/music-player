import styles from "./MiniMusicPlayer.module.css";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import data from "../../data/playlists.json";
import { useMusicContext } from "../../contexts/MusicContext";
import { useNavigate } from "react-router-dom";

function MiniMusicPlayer() {
  const {
    trackIndex,
    playlistIndex,
    isPlaying,
    togglePlayPause,
    trackProgress,
  } = useMusicContext();

  const song = data.playlists[playlistIndex].tracks[trackIndex].name;
  const artist = data.playlists[playlistIndex]["artist:"];

  const navigate = useNavigate();

  const handleNavigationWithDelay = () => {
    setTimeout(() => {
      navigate("/MusicPlayer", { viewTransition: true });
    }, 300);
  };

  return (
    <div
      className={` ${styles["music-player"]} ${
        isPlaying && styles["music-player--playing"]
      }`}
    >
      <div className={styles.vinyl}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 -960 960 960"
        >
          <path d="M400-120q-66 0-113-47t-47-113 47-113 113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47" />
        </svg>
      </div>

      <div className={styles.info} onClick={handleNavigationWithDelay}>
        <p className={styles.title}>{song}</p>
        <p className={styles.artist}>{artist}</p>
        <div className={styles["progress-bar-container"]}>
          <div
            className={styles.progress}
            style={{ width: trackProgress * 100 + "%" }}
          ></div>
        </div>
      </div>

      <button
        className={styles["play-btn"]}
        onClick={togglePlayPause}
        title="play Song"
      >
        {isPlaying ? (
          <FaPause className={styles.icon} />
        ) : (
          <FaPlay className={styles.icon} />
        )}
      </button>
    </div>
  );
}

export default MiniMusicPlayer;
