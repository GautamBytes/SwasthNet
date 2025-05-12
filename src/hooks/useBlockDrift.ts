import { useState, useEffect } from 'react';
import { Connection } from '@solana/web3.js';

export function useBlockDrift(rpcUrl: string, interval = 10_000) {
  const [drift, setDrift] = useState<number | null>(null);

  useEffect(() => {
    const conn = new Connection(rpcUrl);
    let lastSlot: number | null = null;
    let lastTime: number | null = null;
    let mounted = true;

    async function sampleDrift() {
      try {
        const slot = await conn.getSlot();
        const now = Date.now();

        if (lastSlot !== null && lastTime !== null) {
          const slotDiff = slot - lastSlot;
          const timeDiff = (now - lastTime) / 1000; // seconds
          const secsPerSlot = timeDiff / slotDiff;
          if (mounted) setDrift(Number(secsPerSlot.toFixed(3)));
        }

        lastSlot = slot;
        lastTime = now;
      } catch {
        if (mounted) setDrift(null);
      }
    }

    sampleDrift();
    const id = setInterval(sampleDrift, interval);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [rpcUrl, interval]);

  return drift;
}

