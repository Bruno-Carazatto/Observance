/* =========================================================
   CONTATO – interações:
   - Menu mobile
   - Header com fundo ao rolar
   - Validação do formulário
   - Botão "voltar ao topo"
========================================================= */

const $ = (s, ctx=document) => ctx.querySelector(s);

// Menu mobile
const btnMenu = $('.menu-toggle');
const nav = $('.nav');
btnMenu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btnMenu.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.addEventListener('click', (e) => {
  if(e.target.tagName.toLowerCase() === 'a' && nav.classList.contains('open')){
    nav.classList.remove('open');
    btnMenu.setAttribute('aria-expanded','false');
  }
});

// Header com fundo ao rolar
const header = $('.site-header');
const onScroll = () => {
  if(window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
onScroll();
window.addEventListener('scroll', onScroll);

// Ano no rodapé
$('#ano-atual').textContent = new Date().getFullYear();

// Formulário
const form = $('#form-contato');
const feedback = $('.form-feedback');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

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

  try{
    const payload = {
      nome: nome.value.trim(),
      email: email.value.trim(),
      mensagem: mensagem.value.trim()
    };

    // Integração futura com backend:
    // const resp = await fetch('/api/contato.php', {
    //   method:'POST',
    //   headers:{ 'Content-Type':'application/json' },
    //   body: JSON.stringify(payload)
    // });
    // const data = await resp.json();
    // if(!resp.ok || !data.ok) throw new Error(data?.message || 'Erro no envio');

    // Simulação de sucesso
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

function setError(field, msg){
  const span = document.querySelector(`.erro[data-for="${field}"]`);
  if(span) span.textContent = msg;
}
function clearError(field){
  const span = document.querySelector(`.erro[data-for="${field}"]`);
  if(span) span.textContent = '';
}

// Botão voltar ao topo
const topBtn = $('#top-btn');
const toggleTopBtn = () => {
  if(window.scrollY > 300) topBtn.classList.add('show');
  else topBtn.classList.remove('show');
};
toggleTopBtn();
window.addEventListener('scroll', toggleTopBtn);
topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
