"use client";

import { FC, ReactNode } from "react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props {
  children?: ReactNode;
  session?: Session | null;
  // any props that come into the component
}

const Provider: FC<Props> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
