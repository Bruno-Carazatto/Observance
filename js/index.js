/* =========================================================
   INTERAÇÕES DA PÁGINA
   - Menu mobile (abre/fecha)
   - Header ganha fundo ao rolar
   - Formulário com validação simples e mensagem de retorno
========================================================= */

// Utilitário para selecionar
const $ = (s, ctx = document) => ctx.querySelector(s);

// ----- Menu mobile
const btnMenu = $('.menu-toggle');
const nav = $('.nav');

btnMenu.addEventListener('click', () => {
  const aberto = nav.classList.toggle('open');
  btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
});

// Fechar o menu ao clicar em um link (mobile)
nav.addEventListener('click', (e) => {
  if(e.target.tagName.toLowerCase() === 'a' && nav.classList.contains('open')){
    nav.classList.remove('open');
    btnMenu.setAttribute('aria-expanded','false');
  }
});

// ----- Header com fundo ao rolar
const header = $('.site-header');
const onScroll = () => {
  if(window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll);

// ----- Ano no rodapé
$('#ano-atual').textContent = new Date().getFullYear();

// ----- Formulário de contato
const form = $('#form-contato');
const feedback = $('.form-feedback');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validação simples (campos obrigatórios)
  const nome = $('#nome');
  const email = $('#email');
  const mensagem = $('#mensagem');

  clearError('nome'); clearError('email'); clearError('mensagem');

  let ok = true;
  if(!nome.value.trim()){ setError('nome','Informe seu nome.'); ok = false; }
  if(!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)){ setError('email','E-mail inválido.'); ok = false; }
  if(!mensagem.value.trim()){ setError('mensagem','Escreva sua mensagem.'); ok = false; }

  if(!ok){
    feedback.textContent = 'Revise os campos destacados.';
    return;
  }

  /* ------------------------------------------------------
     ENVIO DO FORMULÁRIO
     - Aqui deixamos preparado para um endpoint futuro.
     - Quando tiver back-end, basta criar, por exemplo:
         POST /api/contato.php  (JSON)
     - Para uso imediato, abaixo simulamos sucesso.
  ------------------------------------------------------ */

  try{
    // Exemplo de payload (pronto para integrar ao backend)
    const payload = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      mensagem: mensagem.value.trim()
    };

    // >>> Quando existir um endpoint, descomente:
    // const resp = await fetch('/api/contato.php', {
    //   method:'POST',
    //   headers:{ 'Content-Type':'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // const data = await resp.json();
    // if(!resp.ok || !data.ok) throw new Error(data?.message || 'Erro no envio');

    // Simulação de sucesso (remova quando integrar)
    await new Promise(r => setTimeout(r, 600));

    form.reset();
    feedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    feedback.style.color = '#b7f0c0';
  }catch(err){
    feedback.textContent = 'Não foi possível enviar agora. Tente novamente mais tarde.';
    feedback.style.color = '#ffd2d2';
    console.error(err);
  }
});

// Helpers de erro de formulário
function setError(field, msg){
  const span = document.querySelector(`.erro[data-for="${field}"]`);
  if(span) span.textContent = msg;
}
function clearError(field){
  const span = document.querySelector(`.erro[data-for="${field}"]`);
  if(span) span.textContent = '';
}
