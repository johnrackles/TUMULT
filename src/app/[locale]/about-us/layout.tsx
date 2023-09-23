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
      <div className="p-4 md:p-0">
        <div className="container max-w-3xl bg-muted p-4 text-muted-foreground md:mx-auto md:my-8 md:p-8">
          {children}
        </div>
      </div>
    </MDXProvider>
  );
}
