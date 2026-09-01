"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";

type TrackedLinkProps = {
  href: string;
  location: string;
  className?: string;
  children: ReactNode;
};

export function TrackedLink({ href, location, className, children }: TrackedLinkProps) {
  return <Link href={href} className={className} onClick={() => track("diagnosis_cta_clicked", { location })}>{children}</Link>;
}
