import { useState, useEffect } from 'react';

interface BearImages {
  watchBearImages: string[];
  hideBearImages: string[];
  peakBearImages: string[];
}

// Helper function to generate image paths
const generateImagePaths = (prefix: string, count: number): string[] => {
  return Array.from({ length: count }, (_, i) =>{
    
    return  `/assets/img/${prefix}_${i}.png`
  });
};

export function useBearImages(): BearImages {
  const [watchBearImages, setWatchBearImages] = useState<string[]>([]);
  const [hideBearImages, setHideBearImages] = useState<string[]>([]);
  const [peakBearImages, setPeakBearImages] = useState<string[]>([]);

  useEffect(() => {
    // Replace these counts with your actual number of images for each type
    const WATCH_IMAGES_COUNT = 21;
    const HIDE_IMAGES_COUNT = 6;
    const PEAK_IMAGES_COUNT = 4;

    setWatchBearImages(generateImagePaths('watch_bear', WATCH_IMAGES_COUNT));
    setHideBearImages(generateImagePaths('hide_bear', HIDE_IMAGES_COUNT));
    setPeakBearImages(generateImagePaths('peak_bear', PEAK_IMAGES_COUNT));
  }, []);

  return {
    watchBearImages,
    hideBearImages,
    peakBearImages  
  };
}