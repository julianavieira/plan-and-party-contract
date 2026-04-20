import { ContractData } from "@/store/contract";
import { PriceBreakdown } from "./pricing";
import { formatBRL } from "@/data/plans";

export function generateContractText(data: ContractData, price: PriceBreakdown): string {
  const today = new Date().toLocaleDateString("pt-BR");
  const plan = data.plan!;
  const horas = 4 + data.extraHours; // referência simplificada
  const optionalsList =
    price.optionals.length > 0
      ? price.optionals.map((o) => `   • ${o.name} — ${formatBRL(o.price)}`).join("\n")
      : "   • Nenhum opcional selecionado";

  return `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE FOTOGRAFIA E/OU FILMAGEM

CONTRATADA: Trevo Empreendimentos
CNPJ: 20.770.276/0001-66 (Juliana Vieira Souza)
Endereço: Av. Brás de Pina 1731 / 22, Rio de Janeiro – RJ

CONTRATANTE
Nome: ${data.nomeContratante}
CPF: ${data.cpf}
Telefone: ${data.telefone}
E-mail: ${data.email}
Endereço: ${data.endereco}

INFORMAÇÕES DO EVENTO
Local / Endereço: ${data.localEvento}
Data: ${new Date(data.dataEvento).toLocaleDateString("pt-BR")}
Horário: das ${data.horarioInicio} às ${data.horarioFim}

ANIVERSARIANTE
Nome: ${data.nomeAniversariante}
Idade: ${data.idadeAniversariante}

PLANO CONTRATADO
${plan.name} — ${plan.subtitle}
Itens inclusos:
${plan.features.map((f) => `   • ${f}`).join("\n")}

OBSERVAÇÕES IMPORTANTES
A cobertura para aniversários é conforme o plano escolhido. Caso a festa ultrapasse o tempo de cobertura previsto, será cobrado o valor de hora extra de ${formatBRL(plan.hourExtra)} por hora adicional.

OPCIONAIS CONTRATADOS
${optionalsList}

VALORES
Plano (cartão referência): ${formatBRL(price.base)}
Horas extras: ${data.extraHours}h × ${formatBRL(plan.hourExtra)} = ${formatBRL(price.extraHoursTotal)}
Opcionais: ${formatBRL(price.optionalsTotal)}
Subtotal: ${formatBRL(price.subtotal)}
${price.discount > 0 ? `Desconto à vista: -${formatBRL(price.discount)}\n` : ""}TOTAL: ${formatBRL(price.total)}

FORMA DE PAGAMENTO
${price.paymentLabel}

CLÁUSULAS
1. A CONTRATADA se compromete a prestar os serviços de fotografia e/ou filmagem conforme o plano contratado, na data, horário e local indicados acima.
2. Em caso de cancelamento por parte da CONTRATANTE com menos de 30 dias da data do evento, o valor da reserva (50%) não será reembolsado.
3. As entregas digitais (fotos e vídeos) serão realizadas em até 60 dias após a data do evento, via link enviado por e-mail.
4. A CONTRATADA poderá utilizar imagens do evento em seu portfólio e redes sociais, salvo manifestação em contrário pela CONTRATANTE.
5. Eventuais horas extras realizadas no dia do evento serão cobradas conforme valor descrito acima e quitadas em até 7 dias.

Rio de Janeiro, ${today}.

_____________________________________
CONTRATANTE: ${data.nomeContratante}
CPF: ${data.cpf}

_____________________________________
CONTRATADA: Trevo Empreendimentos
CNPJ: 20.770.276/0001-66
`;
}
