import { useState } from 'react'
import { ArrowUpRight, Check, MessageCircle, Send } from 'lucide-react'
import { contact, contactUrl, topics } from './content'

export function Contact() {
  const [topic, setTopic] = useState(topics[0])
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const subject = topic === 'Abrir empresa' ? 'abertura de empresa' : topic === 'Trocar de contador' ? 'troca de contador' : topic.toLowerCase()
  const message = `Olá, XattaX! Gostaria de conversar sobre ${subject}. Podem me orientar sobre o atendimento?`
  async function copy() {
    try { await navigator.clipboard.writeText(message); setCopied(true); setCopyError(false) }
    catch { setCopyError(true) }
  }
  return <section className="contact-section section" id="contato" aria-labelledby="contact-heading"><div className="wrap contact-grid">
    <div className="contact-copy"><p className="eyebrow">FALE COM A XATTAX</p><h2 id="contact-heading">Atendimento para você<br />e sua empresa.</h2><p>Escolha o assunto e converse com nossa equipe sobre os serviços, documentos e condições de atendimento.</p><div className="contact-signature"><MessageCircle size={24} /><span>Contato direto pelo WhatsApp.<br /><strong>Conte como podemos ajudar.</strong></span></div></div>
    <div className="conversation"><fieldset><legend>Sobre o que vamos conversar?</legend><div className="topic-options">{topics.map(t => <label key={t} className={t === topic ? 'selected' : ''}><input type="radio" name="topic" value={t} checked={t === topic} onChange={() => { setTopic(t); setCopied(false); setCopyError(false) }} /><span>{t}</span><Check size={15} aria-hidden="true" /></label>)}</div></fieldset><div className="message-preview"><span className="preview-label"><MessageCircle size={15} /> SUA MENSAGEM</span><p aria-live="polite">{message}</p></div><a className="button light contact-submit" href={contactUrl(message)} target="_blank" rel="noopener noreferrer">Continuar no WhatsApp <ArrowUpRight size={19} /></a><p className="send-note"><Send size={13} /> Você revisa e envia a mensagem no WhatsApp.</p><button className="copy-message" onClick={copy}>{copied ? 'Mensagem copiada ✓' : 'Copiar mensagem'}</button><span role="status" className="copy-status">{copyError ? 'Não foi possível copiar. Selecione e copie o texto acima.' : copied ? 'Nenhuma mensagem foi enviada.' : ''}</span></div>
    <div className="contact-address"><a href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight size={16} /></a><span>{contact.address}</span><a href={contact.instagram} target="_blank" rel="noopener noreferrer">Acompanhe no Instagram <ArrowUpRight size={16} /></a></div>
  </div></section>
}
