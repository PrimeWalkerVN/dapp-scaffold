import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";
import { useNativeAccount } from "../../contexts/accounts";
import { useWallet } from "../../contexts/wallet";
import { formatNumber } from "../../utils/utils";
import { Identicon } from "../Identicon";

export const CurrentUserBadge = (props: {}) => {
  const { wallet } = useWallet();
  const { account } = useNativeAccount();

  if (!wallet?.publicKey) {
    return null;
  }

  // should use SOL ◎ ?

  return (
    <div className="wallet-wrapper">
      <span className="font-bold">
        {formatNumber.format((account?.lamports || 0) / LAMPORTS_PER_SOL)} SOL
      </span>
      <div className="wallet-key">
        {/* {shortenAddress(`${wallet.publicKey}`)} */}
        {`${wallet.publicKey}`}
        <Identicon
          address={wallet.publicKey.toBase58()}
          style={{ marginLeft: "0.5rem", display: "flex" }}
        />
      </div>
    </div>
  );
};
