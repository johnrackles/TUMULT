"use client";
import { H1, H2, List, P } from "@/components/Typography";
import { cn } from "@/lib/utils";
import { MDXProvider } from "@mdx-js/react";
import { type HTMLAttributes } from "react";

const components = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <H1 className={cn(props.className, "mb-6 text-primary")} {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <H2 className={cn(props.className, "mb-6 text-primary")} {...props} />
  ),
  p: P,
  ul: List,
  a: (props: HTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn(props.className, "text-primary")} {...props} />
  ),
};

export default function MDXLayout({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider components={components}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
      {/* @ts-ignore */}
      <div>
        <div className="container md:mx-auto">{children}</div>
      </div>
    </MDXProvider>
  );
}
