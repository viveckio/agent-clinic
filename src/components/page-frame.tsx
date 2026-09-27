import type { ReactNode } from "react";

export function PageFrame({ children }: Readonly<{ children: ReactNode }>) {
  return <div className="page-shell">{children}</div>;
}
