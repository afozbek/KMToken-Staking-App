"use client";
import { JsonRpcSigner } from "ethers";
import { BrowserProvider } from "ethers";
import { useMemo } from "react";
import { Account, Chain, Client } from "viem";
import { useConnectorClient, Transport, Config } from "wagmi";

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId });
  return useMemo(
    () => (client ? _clientToSigner(client) : undefined),
    [client]
  );
}

/* Signer */
export function _clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}
