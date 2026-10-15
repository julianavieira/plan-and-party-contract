import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Stepper } from "@/components/Stepper";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContract } from "@/store/contract";
import { calcPrice } from "@/lib/pricing";
import { generateContractText } from "@/lib/contract-text";
import { generateContractPDF, blobToBase64 } from "@/lib/pdf";
import { Download, Mail, Check, Loader2, Home } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contract = () => {
  const navigate = useNavigate();
  const state = useContract();
  const reset = useContract((s) => s.reset);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!state.plan || !state.paymentMethod) navigate("/");
  }, [state.plan, state.paymentMethod, navigate]);

  const price = useMemo(
    () => state.plan && calcPrice(state.plan, state.extraHours, state.selectedOptionals, state.paymentMethod),
    [state]
  );

  const text = useMemo(
    () => (state.plan && price ? generateContractText(state, price) : ""),
    [state, price]
  );

  const ownerNotified = useRef(false);
  useEffect(() => {
    if (!state.plan || !price || !text || ownerNotified.current) return;
    const key = `owner-notified:${state.nomeContratante}|${state.email}|${state.dataEvento}|${state.plan.id}|${price.total}`;
    if (sessionStorage.getItem(key)) {
      ownerNotified.current = true;
      return;
    }
    ownerNotified.current = true;
    (async () => {
      try {
        const blob = await generateContractPDF(text);
        const pdfBase64 = await blobToBase64(blob);
        const { error } = await supabase.functions.invoke("send-contract", {
          body: {
            recipientEmail: state.email,
            recipientName: state.nomeContratante,
            pdfBase64,
            eventDate: state.dataEvento,
            planName: `${state.plan!.name} — ${state.plan!.subtitle}`,
            total: price.total,
            notifyOwner: true,
          },
        });
        if (error) throw error;
        sessionStorage.setItem(key, "1");
      } catch (e) {
        console.error("Falha ao notificar a Trevo:", e);
      }
    })();
  }, [state, price, text]);

  if (!state.plan || !price) return null;

  const handleDownload = async () => {
    const blob = await generateContractPDF(text);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contrato-trevo-${state.nomeContratante.replace(/\s+/g, "-").toLowerCase()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSend = async () => {
    setSending(true);
    try {
      const blob = await generateContractPDF(text);
      const pdfBase64 = await blobToBase64(blob);

      const { error } = await supabase.functions.invoke("send-contract", {
        body: {
          recipientEmail: state.email,
          recipientName: state.nomeContratante,
          contractText: text,
          pdfBase64,
          eventDate: state.dataEvento,
          planName: `${state.plan!.name} — ${state.plan!.subtitle}`,
          total: price.total,
        },
      });

      if (error) throw error;
      setSent(true);
      toast.success("Contrato enviado para o seu e-mail! 🎉");
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Erro ao enviar e-mail");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <Stepper current={4} />
      <main className="container pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex w-16 h-16 rounded-full bg-gradient-hero items-center justify-center mb-4 shadow-glow">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-brand text-4xl text-secondary">Seu contrato está pronto!</h2>
            <p className="text-muted-foreground mt-2">
              Confira abaixo, faça o download ou envie diretamente para o seu e-mail.
            </p>
          </div>

          <Card className="p-6 md:p-10 shadow-card mb-6">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed max-h-[60vh] overflow-y-auto">
              {text}
            </pre>
          </Card>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleDownload}
              className="border-2"
            >
              <Download className="w-4 h-4 mr-2" /> Baixar PDF
            </Button>
            <Button
              size="lg"
              className="bg-gradient-hero hover:opacity-90 shadow-soft"
              onClick={handleSend}
              disabled={sending || sent}
            >
              {sending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...</>
              ) : sent ? (
                <><Check className="w-4 h-4 mr-2" /> Enviado!</>
              ) : (
                <><Mail className="w-4 h-4 mr-2" /> Enviar por e-mail</>
              )}
            </Button>
          </div>

          {sent && (
            <Card className="mt-6 p-6 bg-accent/40 border-accent text-center">
              <p className="text-secondary mb-4">
                Tudo certo! Em breve a Juliana entrará em contato pelo WhatsApp para confirmar o pagamento
                e demais detalhes da sua festa. ✨
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  reset();
                  navigate("/");
                }}
              >
                <Home className="w-4 h-4 mr-2" /> Voltar ao início
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Contract;
