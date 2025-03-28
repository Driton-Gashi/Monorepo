import { memo } from 'react';
import Image from 'next/image';

interface BearAvatarProps {
  currentImage: string;
  size?: number;
}

const BearAvatar = memo(function BearAvatar({ currentImage, size = 130 }: BearAvatarProps) {
  return (
    <div className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <Image 
        src={currentImage} 
        className="transition-all duration-200 ease-in-out"
        width={size}
        height={size}
        style={{ 
          objectFit: 'contain',
          transform: 'translate3d(0,0,0)' // Force GPU acceleration
        }}
        tabIndex={-1}
        alt="Animated bear avatar"
        priority
      />
    </div>
  );
});

export default BearAvatar;