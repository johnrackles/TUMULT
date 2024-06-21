import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

type Props = {
  children: React.ReactNode | undefined;
  className?: string;
};

export function H1({ children, className }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "font-display scroll-m-20 text-4xl font-extrabold tracking-tight text-primary lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-display scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-primary transition-colors first:mt-0",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: Props) {
  return (
    <h3
      className={cn(
        "font-display scroll-m-20 text-2xl font-semibold tracking-tight text-primary",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function H4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        "font-display scroll-m-20 text-xl font-semibold tracking-tight text-primary",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function P({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("leading-7 [&:not(:last-child)]:mb-6", className)}>{children}</p>;
}

export function Blockquote({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</blockquote>
  );
}

export function List({ children, className }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>{children}</ul>;
}

export function Lead({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
}

export function Large({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}

export function Small({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>;
}

export function Muted({ children, className }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}
