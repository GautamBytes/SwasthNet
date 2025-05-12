import { useState, useEffect } from 'react';

export function useNetworkHealth(
  rpcUrl: string,
  interval: number = 10_000
) {
  const [latency, setLatency] = useState<number | null>(null);
  const [healthStatus, setHealthStatus] = useState<'ok' | 'error'>('ok');

  useEffect(() => {
    let mounted = true;

    async function fetchHealth() {
      const start = performance.now();
      try {
        const res = await fetch(`${rpcUrl}/health`);
        const text = await res.text();
        const duration = performance.now() - start;
        if (!mounted) return;

        if (text.trim() === 'ok') {
          setLatency(duration);
          setHealthStatus('ok');
        } else {
          setHealthStatus('error');
        }
      } catch {
        if (mounted) setHealthStatus('error');
      }
    }

    fetchHealth(); // initial
    const id = setInterval(fetchHealth, interval);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [rpcUrl, interval]);

  return { latency, healthStatus };
}

