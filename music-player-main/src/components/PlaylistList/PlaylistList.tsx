import styles from "./PlaylistList.module.css";
import data from "../../data/playlists.json";
import { Link } from "react-router-dom";

function PlaylistList() {
  const playlists = data.playlists;

  const playlistItems = playlists.map((playlist, playlistIndex) => {
    return (
      <Link
        to={`/playlists/${playlistIndex}`}
        key={playlistIndex}
        viewTransition
      >
        <li className={styles.playlist}>
          <div className={styles["playlist-image"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 -960 960 960"
            >
              <path d="M400-120q-66 0-113-47t-47-113 47-113 113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47" />
            </svg>
          </div>
          <h2 className={styles["playlist-title"]}>{playlist.name}</h2>
          <p className={styles["artist-name"]}>{playlist["artist:"]}</p>
          <div className={styles["playlist-info"]}>
            <p>{playlist.tracks.length} Tracks</p>
            <span>•</span>
            <p>{playlist.year}</p>
          </div>
        </li>
      </Link>
    );
  });

  return <ul className={styles["playlists-container"]}> {playlistItems} </ul>;
}

export default PlaylistList;
