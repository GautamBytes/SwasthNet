import React from 'react';

interface StatusBannerProps {
  /**
   * rpcUrl and latencyThresholds are left here
   * so you can revert back to live logic later.
   */
  rpcUrl?: string;
  latencyThresholds?: { green: number; yellow: number };
}

/**
 * Demo-mode banner: always green, always “Network healthy.”
 * Remove this override and paste back your live logic
 * once you’re done recording your PoC video.
 */
export const StatusBanner: React.FC<StatusBannerProps> = () => {
  const bgColor = 'bg-green-500';

  return (
    <div className={`${bgColor} text-white p-2 text-center`}>
      Network healthy
    </div>
  );
};

