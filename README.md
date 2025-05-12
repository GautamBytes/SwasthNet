# SwasthNet 

## Overview
SwasthNet is a React and TypeScript component library for embedding real-time Solana network health metrics directly into your dApp. It provides RPC latency indicators, live TPS (transactions per second) charts, and block-time drift visualizations. By surfacing network status in-app, developers can improve user experience during high-load conditions or network outages.

## Features
- **Status Banner**  
  Displays a green/yellow/red indicator based on RPC latency thresholds and official outage incidents.

- **TPS Chart**  
  Live line chart of transactions per second, updating every 10 seconds.

- **Block-Time Drift Chart**  
  Visualizes seconds-per-slot drift over time, with optional demo seeding for smooth animations.

- **Theming & Customization**  
  Fully driven by CSS variables for colors, fonts, and spacing; supports dark/light modes.

- **Responsive Layout**  
  Hero section, chart cards, and footer adapt gracefully from mobile to desktop using CSS grid and flexbox.

## Architecture
1. **Frontend**  
   - React + TypeScript components  
   - Chart.js for charting  

2. **Data Hooks**  
   - `useNetworkHealth`: polls RPC `getHealth()` and status API every 10 seconds  
   - `useTPS`: computes average TPS from recent performance samples  
   - `useBlockDrift`: measures slot progression vs. wall-clock time  

3. **Build & Distribution**  
   - Vite library mode to produce ESM/UMD bundles  
   - TypeScript declaration files for type safety  

## Getting Started

### Prerequisites
- Node.js version 18 or higher  
- npm or yarn  

### Installation
```bash
git clone <your-repo-url>
cd solana-healthwidget
npm install
````

### Development

```bash
npm run dev
```

Starts the development server at [http://localhost:5173](http://localhost:5173).

### Production Build

```bash
npm run build
```

Bundles the library and demo app for production.

## Usage

### Importing Components

```tsx
import React from 'react'
import { StatusBanner, TPSChart, BlockDriftChart } from 'solana-healthwidget'

const RPC_URL = 'https://api.devnet.solana.com'

export default function App() {
  return (
    <div>
      <StatusBanner rpcUrl={RPC_URL} />
      <TPSChart rpcUrl={RPC_URL} />
      <BlockDriftChart rpcUrl={RPC_URL} />
    </div>
  )
}
```

## Props & Customization

* `rpcUrl: string` (required) — Solana RPC endpoint (Devnet, Mainnet via proxy, etc.)
* `latencyThresholds?: { green: number; yellow: number }` — Override default latency breakpoints
* **CSS Variables** — Customize colors and styles via your app’s global CSS:

  ```css
  :root {
    --accent-primary: #7e3af2;
    --accent-secondary: #4299e1;
    /* ... */
  }
  ```

## Roadmap

* **v1.0 (Post-Grant)**

  * Private RPC provider support
  * Caching and fallback logic
  * Exposed `onNetworkDegraded` event hooks

* **v1.1**

  * Alerts and notifications (toasts, modals)
  * Built-in light/dark theme toggle

* **v2.0**

  * Mobile SDK and React Native support
  * Internationalization for banner text

## License

This project is licensed under the MIT License.
```

