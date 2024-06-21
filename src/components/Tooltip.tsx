import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <TooltipProvider>
      <TooltipComponent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            <p>{text}</p>
          </TooltipContent>
        </TooltipPortal>
      </TooltipComponent>
    </TooltipProvider>
  );
}
