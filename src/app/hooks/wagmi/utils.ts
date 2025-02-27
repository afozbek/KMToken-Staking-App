"use client";
import { JsonRpcSigner } from "ethers";
import { BrowserProvider } from "ethers";
import { useMemo } from "react";
import { Account, Chain, Client } from "viem";
import {
  useConnectorClient,
  Transport,
  Config,
  useConnect,
  useDisconnect,
} from "wagmi";
import { metaMask, walletConnect } from "wagmi/connectors";
import { useToast } from "../useToast";
import { baseSepolia } from "viem/op-stack";
import { getAccount } from "wagmi/actions";
import { config } from "@/wagmi/config";
import { useMediaQuery } from "../useMediaQuery";
import { getProjectId } from "./actions";

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

export function useClientConnect() {
  const { connect } = useConnect();
  const { error } = useToast();
  const isMobile = useMediaQuery("(max-width: 546px)");

  const connectAccount = async () => {
    try {
      const connector = isMobile
        ? walletConnect({ projectId: await getProjectId() })
        : metaMask();
      await connect({ connector, chainId: baseSepolia.id });
    } catch (err) {
      console.log(err);
      error(
        isMobile
          ? "Please install a Web3 wallet to connect"
          : "Please install Metamask to connect your wallet"
      );
    }
  };
  return { connectAccount };
}

export function useClientDisconnect() {
  const { disconnect } = useDisconnect();

  const disconnectAccount = async () => {
    try {
      // gets the current connector
      const { connector } = getAccount(config);

      await disconnect({ connector });
    } catch (err) {
      console.log({ err });
    }
  };

  return { disconnectAccount };
}
