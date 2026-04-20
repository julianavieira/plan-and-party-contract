import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Stepper } from "@/components/Stepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { plans, Category, categoryInfo, formatBRL } from "@/data/plans";
import { useContract } from "@/store/contract";
import { ArrowLeft, Check, Users } from "lucide-react";

const Plans = () => {
  const { category } = useParams<{ category: Category }>();
  const navigate = useNavigate();
  const setPlan = useContract((s) => s.setPlan);

  const cat = (category ?? "foto-video") as Category;
  const info = categoryInfo[cat];
  const list = plans.filter((p) => p.category === cat);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <Stepper current={1} />
      <main className="container pb-16">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <div className="mb-8 text-center">
          <h2 className="font-brand text-4xl md:text-5xl text-secondary">
            {info.emoji} Planos — {info.label}
          </h2>
          <p className="text-muted-foreground mt-2">Escolha o que melhor combina com a sua festa</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {list.map((p) => (
            <Card
              key={p.id}
              className="p-6 flex flex-col bg-card shadow-card border-2 border-transparent hover:border-primary transition-smooth hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-brand text-3xl text-secondary leading-none">{p.name}</h3>
                  <p className="text-sm text-primary font-semibold mt-1">{p.subtitle}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                  <Users className="w-3 h-3" /> {p.professionals}
                </span>
              </div>

              <ul className="space-y-2 text-sm text-muted-foreground mb-6 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border pt-4 mb-4">
                <div className="text-xs text-muted-foreground">A partir de</div>
                <div className="flex items-baseline gap-2">
                  <span className="font-brand text-3xl text-primary">{formatBRL(p.priceCard)}</span>
                  <span className="text-xs text-muted-foreground">cartão 6x</span>
                </div>
                {p.pricePix && (
                  <div className="text-xs text-secondary font-medium mt-1">
                    {formatBRL(p.pricePix)} no PIX à vista
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  Hora extra: {formatBRL(p.hourExtra)}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-hero hover:opacity-90 shadow-soft"
                onClick={() => {
                  setPlan(p);
                  navigate("/detalhes");
                }}
              >
                Contratar
              </Button>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-10 p-4 rounded-xl bg-accent/50 border border-accent text-sm text-secondary">
          <strong>Observação:</strong> A cobertura para aniversários é de acordo com o plano escolhido.
          Caso a sua festa tenha mais de 4h, selecione na próxima etapa a quantidade de horas extras.
        </div>
      </main>
    </div>
  );
};

export default Plans;
