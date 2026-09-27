export const contact = {
  whatsappNumber: '5567933825699',
  email: 'xattax.2022@gmail.com',
  instagram: 'https://www.instagram.com/_xattax/',
  address: 'Rua Pindaíba, 244 · Campo Grande, MS',
}
export function contactUrl(message: string) {
  const number = contact.whatsappNumber.replace(/\D/g, '')
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : `mailto:${contact.email}?subject=${encodeURIComponent('Vamos conversar — XattaX')}&body=${encodeURIComponent(message)}`
}
export const services = [
  { title: 'Imposto de renda', tag: 'PARA VOCÊ', description: 'Apoio para cuidar da sua declaração de imposto de renda.', detail: 'Conte à XattaX o que você precisa: preparar a declaração ou entender como começar. Documentos, escopo e valores são alinhados diretamente com a equipe.', icon: 'file' },
  { title: 'Regularização de CPF', tag: 'PARA VOCÊ', description: 'Um ponto de partida para entender e tratar suas pendências.', detail: 'Converse sobre a situação do seu CPF e consulte o apoio disponível para o seu caso. Não é necessário informar CPF ou enviar documentos neste site.', icon: 'user' },
  { title: 'Regularização e declaração de MEI', tag: 'PARA O SEU NEGÓCIO', description: 'Atenção às necessidades do seu microempreendimento.', detail: 'Conte com o atendimento da XattaX para consultar a regularização e a declaração do seu MEI. Explique sua necessidade para consultar as possibilidades de atendimento.', icon: 'business' },
  { title: 'Consultorias', tag: 'PARA SEU PRÓXIMO PASSO', description: 'Leve suas dúvidas para uma conversa com a XattaX.', detail: 'Apresente o assunto que deseja esclarecer. A equipe poderá confirmar se a demanda está no escopo das consultorias disponíveis.', icon: 'chat' },
]
export const topics = ['Abrir empresa', 'Trocar de contador', 'Imposto de renda', 'Regularização de CPF', 'MEI', 'Apoio imobiliário', 'Outra necessidade']
export const faqs = [
  ['Como começo uma conversa?', 'Escolha o assunto na seção de contato. O botão abre o WhatsApp com uma mensagem que você pode revisar e enviar. Nenhuma mensagem é enviada automaticamente.'],
  ['Quais serviços posso consultar?', 'A XattaX divulga declaração de imposto de renda, regularização de CPF, regularização e declaração de MEI e consultorias. O escritório também se apresenta como apoio imobiliário e contábil. Consulte a equipe sobre o escopo disponível para seu caso.'],
  ['Preciso enviar documentos pelo site?', 'Não. O site não recebe documentos nem solicita CPF, renda ou outros dados sensíveis. Combine diretamente com a equipe quais informações são necessárias e como compartilhá-las.'],
  ['Como consultar valores e prazos?', 'Valores, prazos e condições devem ser confirmados diretamente com a XattaX, conforme a sua necessidade. O contato inicial pelo site não confirma a contratação de um serviço.'],
  ['Onde a XattaX está localizada?', 'O endereço divulgado é Rua Pindaíba, 244, em Campo Grande, MS. Antes de uma visita, confirme com a equipe o horário e as orientações para chegar.'],
]
