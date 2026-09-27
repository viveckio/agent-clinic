import type { ReactNode } from "react";

export function PageFrame({ children }: Readonly<{ children: ReactNode }>) {
  return <main className="page-shell">{children}</main>;
}
