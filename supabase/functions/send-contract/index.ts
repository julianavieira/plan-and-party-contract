import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const OWNER_EMAIL = "trevofilmesrj@gmail.com";
const FROM = "Trevo Filmes <onboarding@resend.dev>";

const Body = z.object({
  recipientEmail: z.string().email().max(255).optional(),
  recipientName: z.string().min(1).max(255),
  contractText: z.string().max(100000).optional(),
  pdfBase64: z.string().min(1),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  planName: z.string().min(1).max(255),
  total: z.number(),
  notifyOwner: z.boolean().optional(),
});

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const fmtDate = (d: string) => {
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};
const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(n);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Método não permitido" }, 405);

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) return json({ error: "RESEND_API_KEY não configurada" }, 500);

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return json({ error: "Corpo da requisição inválido" }, 400);
  }
  const parsed = Body.safeParse(raw);
  if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
  const d = parsed.data;

  const date = fmtDate(d.eventDate);
  const total = fmtBRL(d.total);
  const name = esc(d.recipientName);
  const plan = esc(d.planName);

  let to: string, subject: string, html: string;
  if (d.notifyOwner) {
    to = OWNER_EMAIL;
    subject = `Novo contrato gerado - ${d.recipientName}`;
    html = `<h2>Novo contrato gerado</h2>
<p><strong>Cliente:</strong> ${name}</p>
<p><strong>E-mail:</strong> ${esc(d.recipientEmail ?? "-")}</p>
<p><strong>Plano:</strong> ${plan}</p>
<p><strong>Data do evento:</strong> ${date}</p>
<p><strong>Total:</strong> ${total}</p>
<p>O contrato está anexado em PDF.</p>`;
  } else {
    if (!d.recipientEmail) return json({ error: { recipientEmail: ["Obrigatório"] } }, 400);
    to = d.recipientEmail;
    subject = "Seu contrato - Trevo Filmes";
    html = `<p>Olá, ${name}!</p>
<p>Segue em anexo o seu contrato com a Trevo Filmes.</p>
<p><strong>Plano:</strong> ${plan}<br/>
<strong>Data do evento:</strong> ${date}<br/>
<strong>Valor total:</strong> ${total}</p>
<p>Em breve entraremos em contato pelo WhatsApp para confirmar os detalhes.</p>
<p>Com carinho,<br/>Trevo Filmes</p>`;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [to],
      subject,
      html,
      attachments: [{ filename: "contrato.pdf", content: d.pdfBase64 }],
    }),
  });

  if (!res.ok) {
    const details = await res.text();
    console.error(`Resend falhou [${res.status}]: ${details}`);
    return json({ error: "Falha ao enviar e-mail pelo Resend", status: res.status, details }, 502);
  }
  return json({ success: true, id: (await res.json()).id });
});
