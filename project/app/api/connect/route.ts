import { NextResponse } from "next/server";

// Helper to generate a random hex string of length 40 (20 bytes)
function randomHexAddress() {
  const chars = '0123456789abcdef';
  let addr = '0x';
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * 16)];
  }
  return addr;
}

export async function GET() {
  // Generate a random address each time
  const address = randomHexAddress();
  return NextResponse.json({
    address,
    tx: Math.random().toString(16).slice(2), // random tx hash for demo
  });
}
