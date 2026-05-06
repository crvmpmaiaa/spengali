import type { Metadata } from "next";
import { VaultContent } from "@/components/vault/vault-content";

export const metadata: Metadata = {
  title: "Spencer Lynch",
  robots: { index: false, follow: false },
};

export default function TheVaultPage() {
  return <VaultContent />;
}
