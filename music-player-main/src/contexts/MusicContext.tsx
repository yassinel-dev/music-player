import { createContext, useContext, useState, useEffect, useRef } from "react";
import data from "../data/playlists.json";

type MusicContextType = {
  trackIndex: number;
  setTrackIndex: (index: number) => void;
  playlistIndex: number;
  setPlaylistIndex: (index: number) => void;
  audio: HTMLAudioElement;
  isPlaying: boolean;
  playTrack: (a: number, b: number) => void;
  togglePlayPause: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  trackProgress: number;
  handleProgressChange: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const MusicContext = createContext<MusicContextType | null>(null);
export const useMusicContext = () => {
  const context = useContext(MusicContext);
  if (context === null) {
    throw new Error("useMusicContext must be used within a MusicProvider");
  }
  return context;
};

const audio = new Audio();

export const MusicProvider = ({ children }: React.PropsWithChildren) => {
  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!audio.paused);

  const playTrack = (newPlaylistIndex: number, newTrackIndex: number) => {
    setPlaylistIndex(newPlaylistIndex);
    setTrackIndex(newTrackIndex);
  };

  const togglePlayPause = () => {
    if (!audio.paused) audio.pause();
    else audio.play();
    setIsPlaying(!isPlaying);
  };

  const playNextTrack = () => {
    const totalTracksNum = data.playlists[playlistIndex].tracks.length;
    setTrackIndex((trackIndex + 1) % totalTracksNum);
  };

  const playPreviousTrack = () => {
    const totalTracksNum = data.playlists[playlistIndex].tracks.length;
    setTrackIndex(trackIndex === 0 ? totalTracksNum - 1 : trackIndex - 1);
  };

  audio.addEventListener("timeupdate", () => {
    setTrackProgress(audio.currentTime / audio.duration);

    const trackHasEnded = audio.currentTime === audio.duration;
    if (trackHasEnded) playNextTrack();
  });

  const handleProgressChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const newSongProgress = e.nativeEvent.offsetX / e.currentTarget.offsetWidth;
    audio.currentTime = audio.duration * newSongProgress;
  };

  // I'm using a useRef because it is the same as useState, but it doesn't cause a re-render when the value changes. this allows us to use the playlistIndex value in the useEffect without adding it to the dependency array.
  const currentPlaylistIndex = useRef(playlistIndex);

  const isMounted = useRef(false);
  useEffect(() => {
    audio.src =
      data.playlists[currentPlaylistIndex.current].tracks[trackIndex].url;
    audio.load();

    // this is here to skip running this audio.play() on first render cuz calling audio.play() without user input caused errors.
    const isFirstRender = !isMounted.current;
    if (isFirstRender) {
      isMounted.current = true;
    } else {
      audio.play();
      setIsPlaying(!audio.paused);
    }
  }, [trackIndex]);

  return (
    <MusicContext.Provider
      value={{
        trackIndex,
        setTrackIndex,
        playlistIndex,
        setPlaylistIndex,
        audio,
        isPlaying,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        trackProgress,
        handleProgressChange,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
