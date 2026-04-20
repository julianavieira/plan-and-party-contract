import { Plan, optionals } from "@/data/plans";

// re-export not needed; use from store
export interface PriceBreakdown {
  baseLabel: string;
  base: number;
  extraHours: number;
  extraHoursTotal: number;
  optionals: { name: string; price: number }[];
  optionalsTotal: number;
  subtotal: number;
  discount: number;
  total: number;
  paymentLabel: string;
}

export function calcPrice(
  plan: Plan,
  extraHours: number,
  selectedOptionalIds: string[],
  payment: import("@/store/contract").PaymentMethod | null
): PriceBreakdown {
  // Base price: uses card price as reference; PIX à vista applies 10% discount on subtotal.
  const base = plan.priceCard;
  const baseLabel = "Plano (referência cartão)";
  const extraHoursTotal = extraHours * plan.hourExtra;
  const opts = optionals
    .filter((o) => selectedOptionalIds.includes(o.id))
    .map((o) => ({ name: o.name, price: o.price }));
  const optionalsTotal = opts.reduce((s, o) => s + o.price, 0);
  const subtotal = base + extraHoursTotal + optionalsTotal;

  let discount = 0;
  let paymentLabel = "Selecione a forma de pagamento";

  if (payment === "pix-vista") {
    // 10% à vista: prefer plan.pricePix se existir aplica desconto sobre o plano só
    // Para consistência, aplicamos 10% sobre o subtotal todo.
    discount = subtotal * 0.1;
    paymentLabel = "PIX à vista (10% de desconto)";
  } else if (payment === "pix-2x") {
    paymentLabel = "PIX em 2x (50% reserva da data + 50% no dia do evento)";
  } else if (payment === "cartao-6x") {
    paymentLabel = "Cartão em até 6x sem juros";
  }

  const total = subtotal - discount;

  return {
    baseLabel,
    base,
    extraHours,
    extraHoursTotal,
    optionals: opts,
    optionalsTotal,
    subtotal,
    discount,
    total,
    paymentLabel,
  };
}
