import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Stepper } from "@/components/Stepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useContract } from "@/store/contract";
import { optionals, formatBRL } from "@/data/plans";
import { calcPrice } from "@/lib/pricing";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

const Details = () => {
  const navigate = useNavigate();
  const state = useContract();
  const { plan, extraHours, selectedOptionals, update, toggleOptional } = state;

  useEffect(() => {
    if (!plan) navigate("/");
  }, [plan, navigate]);

  if (!plan) return null;

  const price = calcPrice(plan, extraHours, selectedOptionals, null);

  const handleNext = () => {
    const required = [
      ["nomeContratante", "Nome do contratante"],
      ["cpf", "CPF"],
      ["telefone", "Telefone"],
      ["email", "E-mail"],
      ["endereco", "Endereço"],
      ["localEvento", "Local do evento"],
      ["dataEvento", "Data do evento"],
      ["horarioInicio", "Horário de início"],
      ["horarioFim", "Horário de fim"],
      ["nomeAniversariante", "Nome do aniversariante"],
      ["idadeAniversariante", "Idade do aniversariante"],
    ] as const;
    for (const [k, label] of required) {
      if (!String((state as any)[k]).trim()) {
        toast.error(`Preencha: ${label}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(state.email)) {
      toast.error("E-mail inválido");
      return;
    }
    navigate("/pagamento");
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <Stepper current={2} />
      <main className="container pb-16">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Contratante */}
            <Card className="p-6 shadow-card">
              <h3 className="font-brand text-2xl text-secondary mb-4">Dados do contratante</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Nome completo</Label>
                  <Input value={state.nomeContratante} onChange={(e) => update({ nomeContratante: e.target.value })} />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input value={state.cpf} onChange={(e) => update({ cpf: e.target.value })} placeholder="000.000.000-00" />
                </div>
                <div>
                  <Label>Telefone</Label>
                  <Input value={state.telefone} onChange={(e) => update({ telefone: e.target.value })} placeholder="(21) 99999-9999" />
                </div>
                <div className="sm:col-span-2">
                  <Label>E-mail</Label>
                  <Input type="email" value={state.email} onChange={(e) => update({ email: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <Label>Endereço</Label>
                  <Input value={state.endereco} onChange={(e) => update({ endereco: e.target.value })} />
                </div>
              </div>
            </Card>

            {/* Evento */}
            <Card className="p-6 shadow-card">
              <h3 className="font-brand text-2xl text-secondary mb-4">Informações do evento</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Local / Endereço do evento</Label>
                  <Input value={state.localEvento} onChange={(e) => update({ localEvento: e.target.value })} />
                </div>
                <div>
                  <Label>Data do evento</Label>
                  <Input type="date" value={state.dataEvento} onChange={(e) => update({ dataEvento: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Início</Label>
                    <Input type="time" value={state.horarioInicio} onChange={(e) => update({ horarioInicio: e.target.value })} />
                  </div>
                  <div>
                    <Label>Fim</Label>
                    <Input type="time" value={state.horarioFim} onChange={(e) => update({ horarioFim: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-accent/40 text-xs text-secondary">
                <strong>OBS:</strong> A cobertura é de acordo com o plano escolhido. Caso sua festa tenha mais
                de 4h, selecione abaixo a quantidade de horas extras.
              </div>
            </Card>

            {/* Aniversariante */}
            <Card className="p-6 shadow-card">
              <h3 className="font-brand text-2xl text-secondary mb-4">Aniversariante</h3>
              <div className="grid sm:grid-cols-[2fr_1fr] gap-4">
                <div>
                  <Label>Nome</Label>
                  <Input value={state.nomeAniversariante} onChange={(e) => update({ nomeAniversariante: e.target.value })} />
                </div>
                <div>
                  <Label>Idade</Label>
                  <Input value={state.idadeAniversariante} onChange={(e) => update({ idadeAniversariante: e.target.value })} />
                </div>
              </div>
            </Card>

            {/* Horas extras + opcionais */}
            <Card className="p-6 shadow-card">
              <h3 className="font-brand text-2xl text-secondary mb-2">Horas extras e opcionais</h3>
              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <p className="font-medium">Horas extras</p>
                  <p className="text-xs text-muted-foreground">{formatBRL(plan.hourExtra)} por hora</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => update({ extraHours: Math.max(0, extraHours - 1) })}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">{extraHours}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => update({ extraHours: extraHours + 1 })}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {optionals.map((o) => (
                  <label
                    key={o.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border hover:border-primary cursor-pointer transition-smooth"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedOptionals.includes(o.id)}
                        onCheckedChange={() => toggleOptional(o.id)}
                      />
                      <span className="text-sm">{o.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{formatBRL(o.price)}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          {/* Resumo */}
          <aside className="lg:sticky lg:top-24 self-start">
            <Card className="p-6 shadow-card bg-gradient-hero text-primary-foreground">
              <p className="text-xs uppercase opacity-80">Resumo</p>
              <h4 className="font-brand text-2xl">{plan.name}</h4>
              <p className="text-sm opacity-90">{plan.subtitle}</p>
              <div className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between"><span>Plano</span><span>{formatBRL(price.base)}</span></div>
                {extraHours > 0 && (
                  <div className="flex justify-between">
                    <span>{extraHours}h extra</span><span>{formatBRL(price.extraHoursTotal)}</span>
                  </div>
                )}
                {price.optionals.map((o) => (
                  <div key={o.name} className="flex justify-between text-xs opacity-90">
                    <span className="truncate pr-2">{o.name}</span><span>{formatBRL(o.price)}</span>
                  </div>
                ))}
                <div className="border-t border-primary-foreground/30 pt-2 mt-2 flex justify-between font-bold">
                  <span>Subtotal</span><span>{formatBRL(price.subtotal)}</span>
                </div>
              </div>
              <Button
                className="w-full mt-6 bg-background text-primary hover:bg-background/90"
                onClick={handleNext}
              >
                Continuar
              </Button>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Details;
