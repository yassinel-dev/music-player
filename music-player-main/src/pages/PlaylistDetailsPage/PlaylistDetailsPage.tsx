import styles from "./PlaylistDetailsPage.module.css";
import data from "../../data/playlists.json";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import MiniMusicPlayer from "../../components/MiniMusicPlayer/MiniMusicPlayer.tsx";
import TrackList from "../../components/TrackList/TrackList";

function PlaylistDetailsPage() {
  const id = Number(useParams().id);
  const playlist = data.playlists[id];

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.playlist}>
        <div className={styles["playlist-info"]}>
          <button
            className={styles["back-btn"]}
            onClick={() => navigate(-1)}
            title="go back to playlist page"
          >
            <FaAngleLeft />
          </button>
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
          <h1 className={styles["playlist-title"]}>{playlist.name}</h1>
          <div className={styles["playlist-description"]}>
            <p>{playlist["artist:"]}</p>
            <span>•</span>
            <p>{playlist.tracks.length} Tracks</p>
            <span>•</span>
            <p>{playlist.year}</p>
          </div>
        </div>
        <div className={styles["playlist-tracks"]}>
          <h2>Tracks</h2>
          <TrackList />
        </div>
      </div>

      <MiniMusicPlayer />
    </>
  );
}

export default PlaylistDetailsPage;
