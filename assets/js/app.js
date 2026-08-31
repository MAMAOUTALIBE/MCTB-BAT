const page = document.body.dataset.page || window.location.pathname.split('/').pop() || 'index.html';
const nav = [['index.html','Accueil'],['a-propos.html',"L'entreprise"],['metiers.html','Nos métiers'],['realisations.html','Projets & actualités']];
const activeNavPage = ['engagements.html'].includes(page)
  ? 'a-propos.html'
  : ['realisations.html','actualites.html','projet.html'].includes(page)
    ? 'realisations.html'
    : page;
const wordmark=`<img class="brand-logo" src="assets/images/mctb-bat-logo-transparent.png" alt="MCTB BAT — Entreprise générale du bâtiment">`;
const header = `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html" aria-label="MCTB BAT, accueil">${wordmark}</a><button class="nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button><nav class="nav-links" aria-label="Navigation principale">${nav.map(([u,n])=>`<a class="${activeNavPage===u?'active':''}" href="${u}">${n}</a>`).join('')}</nav><a class="header-phone" href="tel:0169420223"><i class="fa-solid fa-phone"></i> 01 69 42 02 23</a></div></header>`;
const footer = `<footer class="site-footer"><div class="container footer-top"><div class="footer-brand-block"><a class="brand" href="index.html">${wordmark}</a><p><span class="footer-tagline-desktop">Entreprise générale de bâtiment. Notre savoir-faire au service de votre exigence.</span><span class="footer-tagline-mobile">Construire avec exigence.</span></p><a class="btn primary footer-quote" href="contact.html">Demander un devis <i class="fa-solid fa-arrow-right"></i></a></div><div class="footer-contact-card"><h3>Coordonnées</h3><a class="footer-contact-row" href="tel:0169420223"><i class="fa-solid fa-phone"></i><span>01 69 42 02 23</span></a><a class="footer-contact-row" href="mailto:contact@mctb-bat.fr"><i class="fa-solid fa-envelope"></i><span>contact@mctb-bat.fr</span></a><address class="footer-contact-row"><i class="fa-solid fa-location-dot"></i><span>10 Bis Rue Jean-Jacques Rousseau<br>91350 Grigny</span></address></div><nav class="footer-nav-desktop" aria-label="Navigation du pied de page"><h3>Navigation</h3><ul><li><a href="a-propos.html">À propos</a></li><li><a href="metiers.html">Nos métiers</a></li><li><a href="realisations.html">Nos réalisations</a></li><li><a href="engagements.html">Nos engagements</a></li><li><a href="mentions-legales.html">Mentions légales</a></li></ul></nav><nav class="footer-nav-mobile" aria-label="Liens essentiels"><a href="metiers.html"><i class="fa-solid fa-briefcase"></i><span>Nos métiers</span></a><a href="realisations.html"><i class="fa-regular fa-building"></i><span>Nos réalisations</span></a><a href="mentions-legales.html"><i class="fa-solid fa-shield-halved"></i><span>Mentions légales</span></a></nav></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} MCTB BAT · Tous droits réservés</span><a class="footer-legal-desktop" href="mentions-legales.html">Mentions légales</a></div></footer>`;
document.querySelector('[data-header]').innerHTML=header;document.querySelector('[data-footer]').innerHTML=footer;

const assistant = `
  <aside class="mctb-ai" aria-label="Assistant MCTB-IA">
    <section class="mctb-ai-panel" id="mctb-ai-panel" role="dialog" aria-labelledby="mctb-ai-title" aria-hidden="true">
      <header class="mctb-ai-head">
        <span class="mctb-ai-avatar" aria-hidden="true"><i class="fa-solid fa-robot"></i></span>
        <span><strong id="mctb-ai-title">MCTB-IA</strong><small>Assistant en ligne</small></span>
        <button class="mctb-ai-close" type="button" aria-label="Fermer MCTB-IA"><i class="fa-solid fa-xmark"></i></button>
      </header>
      <div class="mctb-ai-messages" role="log" aria-live="polite" aria-relevant="additions">
        <p class="mctb-ai-message is-bot">Bonjour, je suis MCTB-IA. Comment puis-je vous aider&nbsp;?</p>
      </div>
      <div class="mctb-ai-suggestions" aria-label="Questions rapides">
        <button type="button" data-ai-question="metiers">Vos métiers</button>
        <button type="button" data-ai-question="devis">Demander un devis</button>
        <button type="button" data-ai-question="contact">Vous contacter</button>
      </div>
      <form class="mctb-ai-form">
        <label class="mctb-ai-sr-only" for="mctb-ai-input">Votre question</label>
        <input id="mctb-ai-input" name="question" autocomplete="off" placeholder="Posez votre question…" required>
        <button type="submit" aria-label="Envoyer la question"><i class="fa-solid fa-arrow-up"></i></button>
      </form>
    </section>
    <button class="mctb-ai-launcher" type="button" aria-controls="mctb-ai-panel" aria-expanded="false">
      <span class="mctb-ai-launcher-icon" aria-hidden="true"><i class="fa-solid fa-robot"></i></span>
      <span>MCTB-IA</span>
    </button>
  </aside>`;
document.body.insertAdjacentHTML('beforeend',assistant);

const aiLauncher=document.querySelector('.mctb-ai-launcher');
const aiPanel=document.querySelector('.mctb-ai-panel');
const aiClose=document.querySelector('.mctb-ai-close');
const aiForm=document.querySelector('.mctb-ai-form');
const aiInput=document.querySelector('#mctb-ai-input');
const aiMessages=document.querySelector('.mctb-ai-messages');
const aiAnswers={
  metiers:'MCTB BAT intervient en construction, réhabilitation et aménagement de bâtiments partout en France.',
  devis:'Pour demander un devis, ouvrez la page Contact et décrivez votre projet. Notre équipe vous recontactera rapidement.',
  contact:'Vous pouvez joindre MCTB BAT au 01 69 42 02 23 ou écrire à contact@mctb-bat.fr.',
  projets:'Découvrez nos chantiers et références dans la rubrique Projets & actualités.'
};
const setAssistantOpen=open=>{
  aiPanel.classList.toggle('is-open',open);
  aiPanel.setAttribute('aria-hidden',String(!open));
  aiLauncher.setAttribute('aria-expanded',String(open));
  if(open) aiInput.focus(); else aiLauncher.focus();
};
const addAssistantMessage=(text,kind)=>{
  const message=document.createElement('p');
  message.className=`mctb-ai-message is-${kind}`;
  message.textContent=text;
  aiMessages.appendChild(message);
  aiMessages.scrollTop=aiMessages.scrollHeight;
};
const answerAssistant=question=>{
  const normalized=question.toLocaleLowerCase('fr');
  if(/métier|metier|service|construction|rénov|renov|aménagement|amenagement/.test(normalized)) return aiAnswers.metiers;
  if(/devis|prix|tarif|coût|cout|budget/.test(normalized)) return aiAnswers.devis;
  if(/contact|téléphone|telephone|mail|email|adresse/.test(normalized)) return aiAnswers.contact;
  if(/projet|réalisation|realisation|chantier|actualité|actualite/.test(normalized)) return aiAnswers.projets;
  return 'Je peux vous renseigner sur nos métiers, nos réalisations, une demande de devis ou les moyens de contacter MCTB BAT.';
};
const askAssistant=(question,key='')=>{
  addAssistantMessage(question,'user');
  addAssistantMessage(key&&aiAnswers[key]?aiAnswers[key]:answerAssistant(question),'bot');
};
aiLauncher.addEventListener('click',()=>setAssistantOpen(!aiPanel.classList.contains('is-open')));
aiClose.addEventListener('click',()=>setAssistantOpen(false));
document.querySelectorAll('[data-ai-question]').forEach(button=>button.addEventListener('click',()=>askAssistant(button.textContent.trim(),button.dataset.aiQuestion)));
aiForm.addEventListener('submit',event=>{
  event.preventDefault();
  const question=aiInput.value.trim();
  if(!question) return;
  askAssistant(question);
  aiForm.reset();
  aiInput.focus();
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&aiPanel.classList.contains('is-open')) setAssistantOpen(false);
});

const toggle=document.querySelector('.nav-toggle'), links=document.querySelector('.nav-links');toggle?.addEventListener('click',()=>{links.classList.toggle('open');toggle.setAttribute('aria-expanded',links.classList.contains('open'))});
const observer=new IntersectionObserver(items=>items.forEach(x=>x.isIntersecting&&x.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const m=document.querySelector('.form-message');m.textContent='Merci, votre demande a bien été prise en compte. Nous vous recontacterons rapidement.';e.target.reset()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;document.querySelectorAll('.project-card').forEach(c=>c.style.display=(f==='all'||c.dataset.cat===f)?'block':'none')}));
const heroSlides=[...document.querySelectorAll('.home-hero .hero-media')];
const heroVideo=document.querySelector('.home-hero .hero-video');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(heroVideo&&reduceMotion){
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}
if(heroSlides.length>1&&!reduceMotion){
  let activeSlide=0;
  setInterval(()=>{
    heroSlides[activeSlide].classList.remove('is-active');
    activeSlide=(activeSlide+1)%heroSlides.length;
    heroSlides[activeSlide].classList.add('is-active');
  },6500);
}
