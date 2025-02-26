import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const SolanaWalletConnect = () => {
  const { wallet, connected } = useWallet();
  const handleClick = () => {};

  return (
    <WalletModalProvider>
      {connected ? <WalletDisconnectButton /> : <WalletMultiButton />}
      {/* Your app's components go here, nested within the context providers. */}
    </WalletModalProvider>
  );
};

export default SolanaWalletConnect;
