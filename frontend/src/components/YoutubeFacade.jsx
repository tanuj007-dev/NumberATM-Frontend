import { useState } from "react";

export function YouTubeFacade({ url }) {
  const [loadVideo, setLoadVideo] = useState(false);

  // Extract videoId from full URL (handles various formats)
  const getVideoId = (url) => {
    const regExp =
      /^.*(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&"'>]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) return null; // Don't render if ID is invalid

  return (
    <div
      className="relative w-full overflow-hidden rounded-md cursor-pointer"
      style={{ aspectRatio: "16 / 7" }}
      onClick={() => setLoadVideo(true)}
    >
      {loadVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0 border-0"
          title="YouTube video"
        ></iframe>
      ) : (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt="YouTube thumbnail"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}
