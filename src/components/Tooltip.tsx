import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </TooltipComponent>
    </TooltipProvider>
  );
}
