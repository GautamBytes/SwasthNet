import { useState, useEffect } from 'react';
import { Connection } from '@solana/web3.js';

export function useTPS(
  rpcUrl: string,
  sampleCount = 20,
  interval = 10_000
) {
  const [tps, setTps] = useState<number | null>(null);

  useEffect(() => {
    const conn = new Connection(rpcUrl);
    let mounted = true;

    async function fetchTps() {
      try {
        const samples = await conn.getRecentPerformanceSamples(sampleCount);
        const totalTx = samples.reduce((sum, s) => sum + (s.numTransactions || 0), 0);
        const totalSecs = samples.reduce((sum, s) => sum + (s.samplePeriodSecs || 0), 0);
        const avg = totalSecs > 0 ? totalTx / totalSecs : 0;
        if (mounted) setTps(Number(avg.toFixed(2)));
      } catch {
        if (mounted) setTps(0);
      }
    }

    fetchTps();
    const id = setInterval(fetchTps, interval);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [rpcUrl, sampleCount, interval]);

  return tps;
}

