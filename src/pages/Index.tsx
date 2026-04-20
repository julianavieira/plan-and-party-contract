import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Card } from "@/components/ui/card";
import { categoryInfo, Category } from "@/data/plans";
import { ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const choose = (c: Category) => navigate(`/planos/${c}`);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />

      <main className="container py-10 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
          <Logo className="h-28 w-28 mx-auto mb-4 object-contain" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> Contrato online em poucos cliques
          </div>
          <h1 className="font-brand text-5xl md:text-7xl text-secondary mb-4">
            Vamos eternizar a sua festa?
          </h1>
          <p className="text-lg text-muted-foreground">
            Escolha o tipo de cobertura que combina com o seu evento. Em seguida você seleciona o plano,
            preenche os dados e recebe o contrato no seu e-mail.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {(Object.keys(categoryInfo) as Category[]).map((c) => {
            const info = categoryInfo[c];
            return (
              <Card
                key={c}
                onClick={() => choose(c)}
                className="group cursor-pointer p-8 text-center bg-card hover:bg-gradient-hero hover:text-primary-foreground border-2 border-transparent hover:border-primary transition-smooth shadow-card hover:shadow-glow hover:-translate-y-1"
              >
                <div className="text-6xl mb-4">{info.emoji}</div>
                <h2 className="font-brand text-3xl mb-2">{info.label}</h2>
                <p className="text-sm opacity-80 mb-6">{info.description}</p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold">
                  Ver planos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-smooth" />
                </div>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-12">
          Trevo Empreendimentos · CNPJ 20.770.276/0001-66 · Rio de Janeiro / RJ
        </p>
      </main>
    </div>
  );
};

export default Index;
