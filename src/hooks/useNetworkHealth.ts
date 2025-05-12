// src/hooks/useNetworkHealth.ts
import { useState, useEffect } from 'react';
import { Connection } from '@solana/web3.js';

/**
 * Polls Solana RPC getHealth() every [interval] ms and measures latency.
 * Returns { latency, healthStatus } where healthStatus is 'ok' or 'error'.
 */
export function useNetworkHealth(
  rpcUrl: string,
  interval: number = 10_000
) {
  const [latency, setLatency] = useState<number | null>(null);
  const [healthStatus, setHealthStatus] = useState<'ok' | 'error'>('ok');

  useEffect(() => {
    const connection = new Connection(rpcUrl);     // :contentReference[oaicite:6]{index=6}
    let mounted = true;

    async function fetchHealth() {
      const start = performance.now();
      try {
        await connection.getHealth();               // :contentReference[oaicite:7]{index=7}
        const duration = performance.now() - start;
        if (mounted) {
          setLatency(duration);
          setHealthStatus('ok');
        }
      } catch {
        if (mounted) setHealthStatus('error');
      }
    }

    fetchHealth();                                  // initial call
    const id = setInterval(fetchHealth, interval);  // polling

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [rpcUrl, interval]);

  return { latency, healthStatus };
}
