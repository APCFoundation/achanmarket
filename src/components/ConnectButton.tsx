"use client";
import { useAppKit } from "@reown/appkit/react";
import { useSignMessage } from "wagmi";
export const ConnectButton = ({
  isClient,
  isConnected,
  address,
}: {
  isClient?: boolean;
  isConnected?: boolean;
  address?: `0x${string}` | undefined;
}) => {
  const { open } = useAppKit();
  const messageWalletRequired = ["Make sure you have a wallet to use."];

  const { signMessage } = useSignMessage();
  const handleConnect = async () => {
    await open({ view: "Connect" });
    signMessage({ message: "hello" });
  };
  return (
    <div>
      {isClient && (!isConnected || !address) ? (
        <>
          <div className="text-center mt-32 text-black font-bold flex bg-lime-400  w-fit px-3 py-2 rounded-2xl mx-auto hover:bg-lime-600 cursor-pointer">
            <button onClick={handleConnect}>Connect Your Wallet</button>
          </div>
          <p className="text-red-500 text-[12px] text-center mt-2 italic">
            *{messageWalletRequired[0]}
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
