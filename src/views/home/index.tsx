import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "../../components/ConnectButton";
import { TokenIcon } from "../../components/TokenIcon";
import { useConnectionConfig } from "../../contexts/connection";
import { useMarkets } from "../../contexts/market";
import { useUserBalance, useUserTotalBalance } from "../../hooks";
import { WRAPPED_SOL_MINT } from "../../utils/ids";
import { formatUSD } from "../../utils/utils";

export const HomeView = () => {
  const { marketEmitter, midPriceInUSD } = useMarkets();
  const { tokenMap } = useConnectionConfig();
  const SRM_ADDRESS = 'SRMuApVNdxXokk5GT7XD5cUUgXMBCoAz2LHeuAoKWRt';
  const SRM = useUserBalance(SRM_ADDRESS);
  const SOL = useUserBalance(WRAPPED_SOL_MINT);
  const { balanceInUSD: totalBalanceInUSD, hasBalance } = useUserTotalBalance();

  useEffect(() => {
    const refreshTotal = () => {};

    const dispose = marketEmitter.onMarket(() => {
      refreshTotal();
    });

    refreshTotal();

    return () => {
      dispose();
    };
  }, [marketEmitter, midPriceInUSD, tokenMap]);

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col span={24}>
        <h2 className="text-3xl font-bold">Your balances: <span className="text-pink-600">{formatUSD.format(hasBalance ? totalBalanceInUSD : SOL.balance * 27.61)}</span></h2>
        <h2 className="text-2xl">SOL: {SOL.balance} ({formatUSD.format(hasBalance ? SOL.balanceInUSD : SOL.balance * 27.61)})</h2>
        <h2 style={{ display: 'inline-flex', alignItems: 'center' }}>
          <TokenIcon mintAddress={SRM_ADDRESS} /> SRM: {SRM?.balance} ({formatUSD.format(SRM?.balanceInUSD)})
        </h2>
      </Col>

      <Col span={12}>
        <ConnectButton size="large" type="dashed" />
      </Col>
      <Col span={12}>
        <Link to="/faucet">
          <Button size="large" type="dashed">Airdrop</Button>
        </Link>
      </Col>
      <Col span={24}>
        <div className="builton" />
      </Col>
    </Row>
  );
};
