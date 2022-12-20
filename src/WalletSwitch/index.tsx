import React from "react";
import Modal from "../components/Modal";
import { NormalButton } from "../components/NFTButton";
import { useActiveWeb3React } from "../hooks";
import { switchNetwork } from "../utils/wallet";
import {ExternalLink} from "../theme";

export default function WalletSwitch() {
  const { chainId } = useActiveWeb3React();
  return (
    <div>
      {chainId != 56 && (
        <Modal isOpen={true} onDismiss={() => {}} maxHeight={90}>
          <p
            style={{
              padding: 20,
            }}
          >
            {" "}
            Reminder:
            <br />
            In order to trade & mint assets, please lock your current wallet and
            connect with a wallet that supports Binance Smart Chain network.
            <div style={{ marginTop: 20, textAlign: 'center', marginLeft: -20 }}>
              <NormalButton
                style={{
                  padding: 0,
                  backgroundColor: "#09afb6",
                  color: "#FFFFFF",
                  letterSpacing: ".1rem",
                }}
                onClick={() => {
                  switchNetwork(56);
                }}
                children="Switch to BSC Mainnet"
              />
              <div style={{marginTop: 10}}>
                <ExternalLink href={`https://chainlist.org/`}>
                  Add Network
                </ExternalLink>
              </div>
            </div>
          </p>
        </Modal>
      )}
    </div>
  );
}
