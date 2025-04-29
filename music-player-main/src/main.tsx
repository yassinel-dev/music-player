import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MusicProvider } from "./contexts/MusicContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlaylistDetailsPage from "./pages/PlaylistDetailsPage/PlaylistDetailsPage.tsx";
import MusicPlayerPage from "./pages/MusicPlayerPage/MusicPlayerPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/playlists/:id", element: <PlaylistDetailsPage /> },
  { path: "/MusicPlayer", element: <MusicPlayerPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MusicProvider>
      <RouterProvider router={router} />
    </MusicProvider>
  </StrictMode>
);
