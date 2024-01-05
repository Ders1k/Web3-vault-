import { configureChains } from 'wagmi';
import { goerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

export const { chains, publicClient } = configureChains(
  [goerli],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://wiser-young-hill.ethereum-goerli.quiknode.pro/369debc5f80ce16718fcd416d5e4f8286766c716/'
      })
    })
  ]
);
