import { createConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { chains, publicClient } from './chains';

export const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [
    new InjectedConnector({
      chains,
      options: { name: 'Injected', shimDisconnect: true }
    })
  ]
});
