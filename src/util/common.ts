export const getMediaUrl = (path: string) => {
  return `https://gsswctw4xbljkmax.public.blob.vercel-storage.com${path}`;
};

export const getVideoMimeType = (url: string) => {
  if (url.toLowerCase().endsWith(".mov")) {
    return "video/quicktime";
  }
  return "video/mp4";
};
