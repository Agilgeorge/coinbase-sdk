import 'dotenv/config';
import { CdpClient } from "@coinbase/cdp-sdk";
import { createPublicClient, createWalletClient, http, parseEther } from "viem";
import { toAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";

const cdp = new CdpClient();
const account = await cdp.evm.createAccount();
console.log(`Created account: ${account.address}`);

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

const { transactionHash } = await cdp.evm.requestFaucet({
  address: account.address,
  network: "base-sepolia",
  token: "eth",
});
console.log(`Requested funds: https://sepolia.basescan.org/tx/${transactionHash}`);

await publicClient.waitForTransactionReceipt({ hash: transactionHash });
console.log("Funds received!");

// Create wallet client using the generated account
const walletClient = createWalletClient({
  account: toAccount(account),
  chain: baseSepolia,
  transport: http(),
});

const to = "0xc433ADaF57c87De1fCF115890C9ec647F4A6C3A0";
const balance = await publicClient.getBalance({ address: account.address });
console.log(`Wallet balance: ${balance} wei`);

const value = parseEther("0.00001"); // Lower value if needed

if (balance > value) {
  const txHash = await walletClient.sendTransaction({ to, value });
  console.log(`Sent transaction: https://sepolia.basescan.org/tx/${txHash}`);
} else {
  console.log("Not enough balance to send transaction");
}