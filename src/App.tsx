// App.tsx
import React from 'react';
import { FaHeartbeat, FaNetworkWired } from 'react-icons/fa';
import { StatusBanner } from './components/StatusBanner';
import { TPSChart } from './components/TPSChart';
import { BlockDriftChart } from './components/BlockDriftChart';
import './App.css';

const RPC_URL = 'https://api.devnet.solana.com';

function App() {
  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero">
        {/* Floating background icons */}
        <div className="hero-icons">
          <FaNetworkWired className="hero-icon" />
          <FaHeartbeat className="hero-icon" />
        </div>

        {/* Inline icons & title */}
        <h1>
          <FaNetworkWired className="inline-icon" />
          SwasthNet
          <FaHeartbeat className="inline-icon" />
        </h1>
        <p>
          Seamlessly integrate live Solana network performance metrics into your dApp,
          providing real-time insights and transparent network health tracking.
        </p>
      </section>

      {/* Status Banner */}
      <StatusBanner rpcUrl={RPC_URL} />

      {/* Charts Grid */}
      <main className="charts-grid">
        <div className="chart-card">
          <h2 className="chart-title">Transactions Per Second</h2>
          <TPSChart rpcUrl={RPC_URL} />
        </div>
        <div className="chart-card">
          <h2 className="chart-title">Block-Time Drift (Sec/Slot)</h2>
          <BlockDriftChart rpcUrl={RPC_URL} />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>Built with ❤️ for the Solana Ecosystem</p>
        <div className="footer-links">
          <a href="https://x.com/GautamM96" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://github.com/GautamBytes" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/gautam-manchandani/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
