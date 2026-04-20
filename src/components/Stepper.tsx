import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const steps = ["Categoria", "Plano", "Detalhes", "Pagamento", "Contrato"];

export const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-2 md:gap-4 py-6 px-4 overflow-x-auto">
    {steps.map((label, i) => {
      const isActive = i === current;
      const isDone = i < current;
      return (
        <div key={label} className="flex items-center gap-2 md:gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-smooth",
                isDone && "bg-primary text-primary-foreground",
                isActive && "bg-primary text-primary-foreground shadow-glow scale-110",
                !isActive && !isDone && "bg-muted text-muted-foreground"
              )}
            >
              {isDone ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span
              className={cn(
                "text-sm hidden md:inline",
                isActive ? "font-semibold text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && <div className="w-6 md:w-12 h-px bg-border" />}
        </div>
      );
    })}
  </div>
);
