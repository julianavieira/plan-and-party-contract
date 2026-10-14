import { ContractData } from "@/store/contract";
import { PriceBreakdown } from "./pricing";
import { formatBRL } from "@/data/plans";
import { formatDateBR } from "./utils";

export function generateContractText(data: ContractData, price: PriceBreakdown): string {
  if (data.plan!.category === "video") {
    return generateVideoContractText(data, price);
  }
  return generatePhotoContractText(data, price);
}

function generatePhotoContractText(data: ContractData, price: PriceBreakdown): string {
  const today = new Date().toLocaleDateString("pt-BR");
  const plan = data.plan!;
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
Data: ${formatDateBR(data.dataEvento)}
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

CLÁUSULA 1ª – DO OBJETO

O presente contrato tem por objeto a prestação de serviços profissionais de fotografia e/ou filmagem do evento acima descrito, a serem realizados pela CONTRATADA na data, local e horário previamente acordados.

Parágrafo único: Alterações de data, horário ou local deverão ser solicitadas previamente e estarão sujeitas à disponibilidade da CONTRATADA.

Em caso de cancelamento por parte da CONTRATANTE com menos de 30 dias da data do evento, o valor da reserva (50%) não será reembolsado.

CLÁUSULA 2ª – DAS FOTOGRAFIAS

a) Todas as fotografias entregues receberão tratamento de luz, cor e contraste através de software profissional;

b) O prazo de entrega de todas as fotos é de 25 dias úteis

c) Não estão incluídas manipulações avançadas de imagem, montagens ou alterações corporais;

d) O material bruto (RAW ou equivalente) não será entregue;

e) A quantidade de fotografias poderá variar conforme a dinâmica do evento e o pacote contratado.

CLÁUSULA 3ª – LINK ONLINE, ARMAZENAMENTO E NOVO UPLOAD

a) O material permanecerá disponível para download por até 90 (noventa) dias após o envio;

b) É responsabilidade do CONTRATANTE realizar o download e backup dos arquivos;

c) Após esse período, a CONTRATADA não se obriga a armazenar os arquivos;

d) Caso o CONTRATANTE solicite novo upload ou reenvio do link, e havendo disponibilidade do material, será cobrada taxa administrativa de R$ 50,00 (cinquenta reais).

CLÁUSULA 4ª – DAS HORAS EXTRAS

A permanência da equipe além do período contratado dependerá da disponibilidade da CONTRATADA.

O valor da hora extra será definido conforme o pacote contratado e deverá ser aprovado pelo CONTRATANTE durante o evento.

CLÁUSULA 5ª – DOS EVENTOS COM MAIS DE UM ANIVERSARIANTE

Quando aplicável, eventos com mais de um aniversariante estarão sujeitos ao acréscimo de 30% (trinta por cento) sobre o valor do pacote contratado.

Excetuam-se os casos previamente acordados entre as partes.

CLÁUSULA 6ª – DOS SERVIÇOS OPCIONAIS

Poderão ser contratados separadamente:

Álbuns fotográficos;
Entrega expressa;
Cobertura adicional;
Outros produtos e serviços disponibilizados pela CONTRATADA.

Os valores serão apresentados em orçamento complementar.

CLÁUSULA 7ª – DO PAGAMENTO

O CONTRATANTE pagará à CONTRATADA o valor total de R$ ${formatBRL(price.total)}, conforme as condições abaixo:

${price.paymentLabel}

Dados para pagamento

PIX CNPJ: 20.770.276/0001-66

PIX CPF: 090.039.727-61
Favorecida: Juliana Vieira Souza


E-mail para envio de comprovantes:

contato@trevofilmes.com.br

CLÁUSULA 8ª – DOS DIREITOS AUTORAIS E USO DE IMAGEM

A CONTRATADA detém os direitos autorais sobre todo o material produzido, conforme a legislação vigente.

O CONTRATANTE:

( ${data.usoImagem === "autoriza" ? "X" : "___"} ) autoriza

( ${data.usoImagem === "nao-autoriza" ? "X" : "___"} ) não autoriza

a utilização das imagens para divulgação institucional da CONTRATADA em portfólio, site, redes sociais e materiais promocionais.

CLÁUSULA 9ª – DAS LIMITAÇÕES TÉCNICAS

A CONTRATADA não se responsabiliza por situações que possam comprometer parcial ou totalmente o resultado do material produzido, incluindo:

iluminação inadequada do local;
condições climáticas;
atrasos na programação do evento;
restrições impostas pelo local;
interferência de terceiros;
situações de caso fortuito ou força maior.

CLÁUSULA 10ª – DO CANCELAMENTO E REAGENDAMENTO

a) Cancelamento com até 15 dias de antecedência: retenção de 30% dos valores pagos;

b) Cancelamento com menos de 15 dias de antecedência: retenção de 50% dos valores pagos;

c) Cancelamento com menos de 7 dias de antecedência: retenção de 100% dos valores pagos;

d) Reagendamentos estarão sujeitos à disponibilidade da CONTRATADA.

CLÁUSULA 11ª – DO FORO

Fica eleito o foro da Comarca do Rio de Janeiro/RJ, com exclusão de qualquer outro, por mais privilegiado que seja.



Rio de Janeiro, ${today}

_____________
CONTRATANTE: 
CPF: 

_____________
CONTRATADA: Trevo Empreendimentos
CNPJ: 20.770.276/0001-66
`;
}

function generateVideoContractText(data: ContractData, price: PriceBreakdown): string {
  const today = new Date().toLocaleDateString("pt-BR");
  const plan = data.plan!;
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
Data: ${formatDateBR(data.dataEvento)}
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

CLÁUSULA 1ª – DO OBJETO

O presente contrato tem por objeto a prestação de serviços profissionais de fotografia e/ou filmagem do evento acima descrito, a serem realizados pela CONTRATADA na data, local e horário previamente acordados.

Parágrafo único: Alterações de data, horário ou local deverão ser solicitadas previamente e estarão sujeitas à disponibilidade da CONTRATADA.

Em caso de cancelamento por parte da CONTRATANTE com menos de 30 dias da data do evento, o valor da reserva (50%) não será reembolsado.

CLÁUSULA 2ª – Filmagem

O prazo de entrega do vídeo é de até 45 (quarenta e cinco) dias úteis. Você receberá um link via internet para assistir e baixar.
Em caso de alteração solicitada, um novo link será enviado com as alterações realizadas em 20 (vinte) dias úteis.
Caso a contratante opte em escolher músicas para os vídeos, o prazo é de 10 (dez) dias corridos depois da data da festa.
Esse contrato dá direito apenas ao material editado, em hipótese alguma o material bruto será entregue; A edição não inclui nenhuma criação de vinhetas ou animações, apenas os vídeos capturados no dia do evento.
O valor referente a direitos autorais da música na versão do teaser (internet/vimeo), se houver, não está incluído neste orçamento.
Lembre-se que crianças são imprevisíveis, não podemos garantir nenhum tipo de imagem pré-determinada ou dirigida.
após a entrega do link, terá um prazo de 30 dias para baixar, depois desse prazo a contratada não se obriga a armazenar os arquivos originais e editados do mesmo. Sugere-se assim, que seja feito o back-up do material em mídias digitais por parte da contratante.
Para aqueles que não podem ou não querem esperar o prazo de entrega padrão, poderá ser solicitado a entrega expressa. Nesse caso, o material será enviado para aprovação em até 12 dias úteis após a festa e o valor é de R$ 600 (seiscentos reais).
Caso o cliente opte na entrega física, deverá ser pago o valor do opcional escolhido e a contratada tem um prazo de 35 dias para postar o matrial via sedex(para o Rio de Janeiro).


CLÁUSULA 3ª – DAS ALTERAÇÕES DE VÍDEO

a) O CONTRATANTE terá direito a até 03 (três) alterações simples sem custo adicional;

b) Considera-se alteração simples:

troca de música;
alteração da ordem de uma cena;
exclusão de uma cena;

c) Cada solicitação corresponde a uma alteração;

d) A partir da 4ª alteração será cobrado o valor de R$ 80,00 (oitenta reais) por alteração adicional;

e) O prazo para solicitar alterações é de até 15 (quinze) dias corridos após o envio do vídeo para aprovação;

f) Na ausência de manifestação dentro do prazo, o material será considerado aprovado e entregue.


5. Eventuais horas extras realizadas no dia do evento serão cobradas conforme valor descrito acima e quitadas em até 7 dias.

CLÁUSULA 4ª – LINK ONLINE, ARMAZENAMENTO E NOVO UPLOAD

a) O material permanecerá disponível para download por até 90 (noventa) dias após o envio;

b) É responsabilidade do CONTRATANTE realizar o download e backup dos arquivos;

c) Após esse período, a CONTRATADA não se obriga a armazenar os arquivos;

d) Caso o CONTRATANTE solicite novo upload ou reenvio do link, e havendo disponibilidade do material, será cobrada taxa administrativa de R$ 50,00 (cinquenta reais).

CLÁUSULA 5ª – DAS HORAS EXTRAS

A permanência da equipe além do período contratado dependerá da disponibilidade da CONTRATADA.

O valor da hora extra será definido conforme o pacote contratado e deverá ser aprovado pelo CONTRATANTE durante o evento.

CLÁUSULA 6ª – DOS EVENTOS COM MAIS DE UM ANIVERSARIANTE

Quando aplicável, eventos com mais de um aniversariante estarão sujeitos ao acréscimo de 30% (trinta por cento) sobre o valor do pacote contratado.

Excetuam-se os casos previamente acordados entre as partes.


CLÁUSULA 7ª – DOS SERVIÇOS OPCIONAIS

Poderão ser contratados separadamente:

Álbuns fotográficos;
Pendrives ;
Entrega expressa;
Cobertura adicional;
Reels ou vídeos extras;
Outros produtos e serviços disponibilizados pela CONTRATADA.

Os valores serão apresentados em orçamento complementar.

CLÁUSULA 8ª – DO PAGAMENTO

O CONTRATANTE pagará à CONTRATADA o valor total de R$ ${formatBRL(price.total)}, conforme as condições abaixo:

${price.paymentLabel}

Dados para pagamento

PIX CNPJ: 20.770.276/0001-66

PIX CPF: 090.039.727-61
Favorecida: Juliana Vieira Souza


E-mail para envio de comprovantes:

contato@trevofilmes.com.br

CLÁUSULA 9ª – DOS DIREITOS AUTORAIS E USO DE IMAGEM

A CONTRATADA detém os direitos autorais sobre todo o material produzido, conforme a legislação vigente.

O CONTRATANTE:

( ${data.usoImagem === "autoriza" ? "X" : "___"} ) autoriza

( ${data.usoImagem === "nao-autoriza" ? "X" : "___"} ) não autoriza

a utilização das imagens para divulgação institucional da CONTRATADA em portfólio, site, redes sociais e materiais promocionais.

CLÁUSULA 10ª – DAS LIMITAÇÕES TÉCNICAS

A CONTRATADA não se responsabiliza por situações que possam comprometer parcial ou totalmente o resultado do material produzido, incluindo:

iluminação inadequada do local;
condições climáticas;
atrasos na programação do evento;
restrições impostas pelo local;
interferência de terceiros;
situações de caso fortuito ou força maior.

CLÁUSULA 11ª – DO CANCELAMENTO E REAGENDAMENTO

a) Cancelamento com até 15 dias de antecedência: retenção de 30% dos valores pagos;

b) Cancelamento com menos de 15 dias de antecedência: retenção de 50% dos valores pagos;

c) Cancelamento com menos de 7 dias de antecedência: retenção de 100% dos valores pagos;

d) Reagendamentos estarão sujeitos à disponibilidade da CONTRATADA.

CLÁUSULA 12ª – DO FORO

Fica eleito o foro da Comarca do Rio de Janeiro/RJ, com exclusão de qualquer outro, por mais privilegiado que seja.



Rio de Janeiro, ${today}

_____________
CONTRATANTE: 
CPF: 

_____________
CONTRATADA: Trevo Empreendimentos
CNPJ: 20.770.276/0001-66
`;
}
