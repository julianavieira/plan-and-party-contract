import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Stepper } from "@/components/Stepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContract } from "@/store/contract";
import { calcPrice } from "@/lib/pricing";
import { formatBRL } from "@/data/plans";
import { ArrowLeft, CreditCard, Wallet, Banknote, Check } from "lucide-react";
import { useEffect } from "react";
import type { PaymentMethod } from "@/store/contract";

const options: {
  id: PaymentMethod;
  title: string;
  desc: string;
  icon: typeof CreditCard;
  badge?: string;
}[] = [
  {
    id: "pix-vista",
    title: "PIX à vista",
    desc: "10% de desconto sobre o total",
    icon: Banknote,
    badge: "Melhor preço",
  },
  {
    id: "pix-2x",
    title: "PIX em 2x",
    desc: "50% para reservar a data + 50% no dia do evento",
    icon: Wallet,
  },
  {
    id: "cartao-6x",
    title: "Cartão em até 6x",
    desc: "Sem juros — link enviado após contratação",
    icon: CreditCard,
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const { plan, extraHours, selectedOptionals, paymentMethod, update } = useContract();

  useEffect(() => {
    if (!plan) navigate("/");
  }, [plan, navigate]);
  if (!plan) return null;

  const price = calcPrice(plan, extraHours, selectedOptionals, paymentMethod);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <Stepper current={3} />
      <main className="container pb-16">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-brand text-4xl text-secondary text-center mb-2">Forma de pagamento</h2>
          <p className="text-center text-muted-foreground mb-8">Como você prefere pagar?</p>

          <div className="space-y-3">
            {options.map((o) => {
              const Icon = o.icon;
              const active = paymentMethod === o.id;
              return (
                <Card
                  key={o.id}
                  onClick={() => update({ paymentMethod: o.id })}
                  className={`p-5 cursor-pointer flex items-center gap-4 border-2 transition-smooth ${
                    active
                      ? "border-primary shadow-glow bg-accent/30"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{o.title}</h3>
                      {o.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                          {o.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{o.desc}</p>
                  </div>
                  {active && <Check className="w-5 h-5 text-primary" />}
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 p-6 shadow-card">
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatBRL(price.subtotal)}</span></div>
              {price.discount > 0 && (
                <div className="flex justify-between text-primary font-medium">
                  <span>Desconto à vista</span><span>-{formatBRL(price.discount)}</span>
                </div>
              )}
              <div className="border-t border-border pt-3 mt-3 flex justify-between items-baseline">
                <span className="font-semibold">Total</span>
                <span className="font-brand text-3xl text-primary">{formatBRL(price.total)}</span>
              </div>
              {paymentMethod && (
                <p className="text-xs text-muted-foreground mt-2">{price.paymentLabel}</p>
              )}
            </div>
            <Button
              className="w-full mt-6 bg-gradient-hero hover:opacity-90 shadow-soft"
              size="lg"
              disabled={!paymentMethod}
              onClick={() => navigate("/contrato")}
            >
              Gerar contrato
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Payment;
