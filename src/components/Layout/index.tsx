import React from "react";
import "./../../App.less";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import { LABELS } from "../../constants";
import { AppBar } from "../AppBar";
import Logo from "../../assets/solana-sol-logo.png"

const { Header, Content } = Layout;

export const AppLayout = React.memo((props: any) => {
  return (
    <div className="App wormhole-bg">
      <Layout title={LABELS.APP_TITLE}>
        <Header className="h-16 flex justify-between items-center">
          <Link to="/">
            <div className="flex justify-start items-center">
              <img src={Logo} alt="logo" className="object-contain w-10 h-10"/>
              <span className="text-white font-bold ml-6 text-2xl app-title">SOLANA DAPP</span>
            </div>
          </Link>
          <AppBar />
        </Header>
        <Content style={{ padding: "0 50px" }}>{props.children}</Content>
      </Layout>
    </div>
  );
});
