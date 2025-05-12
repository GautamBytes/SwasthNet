import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { useBlockDrift } from '../hooks/useBlockDrift';

// Register only once at module load
Chart.register(
  LineController,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip
);

interface BlockDriftChartProps {
  rpcUrl: string;
}

/**
 * BlockDriftChart animates a chart of seconds-per-slot.
 * For demo mode, if drift is null or 0, we seed a random value
 * between 0.4 and 0.6 so you always get a moving line.
 */
export const BlockDriftChart: React.FC<BlockDriftChartProps> = ({ rpcUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drift = useBlockDrift(rpcUrl);

  useEffect(() => {
    if (!canvasRef.current) return;
    const chart = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Sec/Slot',
            data: [],
            tension: 0.3,
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
          },
        ],
      },
      options: {
        animation: false,
        scales: {
          x: { type: 'time', time: { tooltipFormat: 'HH:mm:ss' } },
          y: { beginAtZero: false },
        },
        plugins: {
          title: { display: true, text: 'Block-Time Drift (Sec/Slot)' },
          tooltip: { enabled: true },
        },
      },
    });

    const id = setInterval(() => {
      // Use real drift if available; else seed demo data
      const value =
        drift !== null && drift > 0
          ? drift
          : Number((0.4 + Math.random() * 0.2).toFixed(3));
      chart.data.datasets[0].data.push({ x: Date.now(), y: value });
      if (chart.data.datasets[0].data.length > 30) {
        chart.data.datasets[0].data.shift();
      }
      chart.update('none');
    }, 10_000);

    return () => {
      clearInterval(id);
      chart.destroy();
    };
  }, [drift]);

  return (
    <div className="bg-gray-800 p-4 rounded">
      {drift === null ? (
        <p className="text-center">Loading block-time drift…</p>
      ) : (
        <canvas ref={canvasRef} height={200} />
      )}
    </div>
  );
};


