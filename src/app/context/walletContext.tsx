"use client";
import { createContext, PropsWithChildren, useState } from "react";

interface ContextParams {
  account: string | null;
  setAccount: (account: string) => void;
}

const WalletConnectorContext = createContext<ContextParams>({
  account: null,
  setAccount: () => {},
});

const WalletConnectorProvider: React.FC<PropsWithChildren> = (props) => {
  const [account, setAccount] = useState<null | string>(null);

  return (
    <WalletConnectorContext.Provider value={{ account, setAccount }}>
      {props.children}
    </WalletConnectorContext.Provider>
  );
};

export { WalletConnectorProvider, WalletConnectorContext };
