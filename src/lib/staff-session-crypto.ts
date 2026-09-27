import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export function constantTimeStringEqual(left: string, right: string) {
  const leftHash = createHash("sha256").update(left).digest();
  const rightHash = createHash("sha256").update(right).digest();
  return timingSafeEqual(leftHash, rightHash) && left === right;
}

function signature(expiresAt: string, secret: string) {
  return createHmac("sha256", secret).update(`staff:${expiresAt}`).digest("base64url");
}

export function createStaffSessionToken(expiresAt: string, secret: string) {
  return `${expiresAt}.${signature(expiresAt, secret)}`;
}

export function verifyStaffSessionToken(token: string, secret: string, nowSeconds = Math.floor(Date.now() / 1000)) {
  const [expiresAt, submittedSignature, ...extra] = token.split(".");
  if (extra.length || !/^\d+$/.test(expiresAt) || !submittedSignature) return false;
  if (Number(expiresAt) <= nowSeconds) return false;
  return constantTimeStringEqual(submittedSignature, signature(expiresAt, secret));
}
