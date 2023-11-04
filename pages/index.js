import { ConnectWallet, useAddress, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

const dropAddress = "0x5D4B0948472714A288BC60c3A47e49E57E6A6045";

export default function Home() {
  const address = useAddress();

  const triggerMail = async () => {
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return alert(
          "Unable to send mail! However, the drop has been claimed!"
        );
      }
      alert(
        "Drop claimed successfully! Check your mailchain for further instructions!"
      );
    } catch (err) {
      console.error(err);
      alert(
        "An error occurred while sending the mail, however the drop has been claimed successfully"
      );
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Claim our drop!</h1>

        <p className={styles.description}>
          Claim the drop using the button below and we will send email through Mailchain!
        </p>

        <div className={styles.connect}>
          <Web3Button
            contractAddress={dropAddress}
            action={async (contract) => {
              //await contract.erc721.claim(1);
              await triggerMail();
            }}
          >
            Claim Drop!
          </Web3Button>
        </div>
      </main>
    </div>
  );
}