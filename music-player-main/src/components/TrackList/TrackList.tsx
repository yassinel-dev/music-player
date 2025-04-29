import styles from "./TrackList.module.css";
import data from "../../data/playlists.json";
import getFormattedTimeString from "../../utils/getFormattedTimeString";
import { useMusicContext } from "../../contexts/MusicContext";
import { useParams, Link } from "react-router-dom";

function TrackList() {
  const { trackIndex, playlistIndex, isPlaying, playTrack } = useMusicContext();

  const id = Number(useParams().id);

  const artist = data.playlists[id]["artist:"];
  const tracks = data.playlists[id].tracks;

  const trackListItems = tracks.map((track, index) => {
    const isCurrentlyPlaying =
      id === playlistIndex && index === trackIndex && isPlaying;

    return (
      <Link
        to="/MusicPlayer"
        viewTransition
        key={index}
        onClick={() => {
          playTrack(id, index);
        }}
      >
        <li
          className={`${styles.track} ${
            isCurrentlyPlaying && styles["track--playing"]
          }`}
        >
          <div className={styles["track-image"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
            >
              <path d="M400-120q-66 0-113-47t-47-113 47-113 113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47" />
            </svg>
          </div>
          <div className={styles["track-info"]}>
            <p className={styles["track-title"]}>{track.name}</p>
            <p className={styles["track-artist"]}>{artist}</p>
          </div>
          <span className={styles["currently-playing"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 10v3" />
              <path d="M6 6v11" />
              <path d="M10 3v18" />
              <path d="M14 8v7" />
              <path d="M18 5v13" />
              <path d="M22 10v3" />
            </svg>
          </span>
          <span className={styles["track-duration"]}>
            {getFormattedTimeString(track.duration)}
          </span>
        </li>
      </Link>
    );
  });

  return <ul>{trackListItems}</ul>;
}

export default TrackList;
