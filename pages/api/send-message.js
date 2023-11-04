import { Mailchain } from "@mailchain/sdk";

const mailchain = Mailchain.fromSecretRecoveryPhrase(
  process.env.SECRET_RECOVERY_PHRASE
);

export default async function handler(req, res) {
  try {
    if (req.method != "POST")
      return res.status(405).json({ message: "Please send POST request" });
    const address = req.body.address;
    console.log(address);
    if (!address)
      return res
        .status(400)
        .json({ message: "Please provide a wallet address" });
    // Trigger mail
    const result = await mailchain.sendMail({
      from: `${process.env.MAILCHAIN_ADMIN_USERNAME}@mailchain.com`,
      to: [`${address}@ethereum.mailchain.com`],
      subject: "Thanks for claiming the drop 👋🏻",
      content: {
        text: "Mirac.eth welcomes you to the world of web3. We are happy to see you here 👋🏻 Please join our Discord server to access the community 🔥",
        html: "<p>Mirac.eth welcomes you to the world of web3. We are happy to see you here 👋🏻 Please join our Discord server to access the community 🔥</p>",
      },
    });

    console.log(result);
    res.json({ message: "Mail sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}