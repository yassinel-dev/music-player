import styles from "./PlaylistPage.module.css";
import PlaylistList from "../../components/PlaylistList/PlaylistList.tsx";
import MiniMusicPlayer from "../../components/MiniMusicPlayer/MiniMusicPlayer.tsx";

function PlaylistPage() {
  return (
    <div className={styles["playlists"]}>
      <h1>Playlists</h1>
      <PlaylistList />
      <MiniMusicPlayer />
    </div>
  );
}

export default PlaylistPage;
