import { NextResponse } from "next/server";
import { CdpClient } from "@coinbase/cdp-sdk";
import { createPublicClient, http } from "viem";
import { baseSepolia } from "viem/chains";

export async function GET() {
  try {
    const cdp = new CdpClient();

    const account = await cdp.evm.createAccount();

    const publicClient = createPublicClient({
      chain: baseSepolia,
      transport: http(),
    });

    const { transactionHash } = await cdp.evm.requestFaucet({
      address: account.address,
      network: "base-sepolia",
      token: "eth",
    });

    await publicClient.waitForTransactionReceipt({ hash: transactionHash });

    return NextResponse.json({
      address: account.address,
      tx: transactionHash,
    });
  } catch (error) {
    console.error("❌ Wallet creation failed:", error);
    return NextResponse.json({ error: "Wallet creation failed" }, { status: 500 });
  }
}
