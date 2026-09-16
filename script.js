const typewriter = document.querySelector('#typewriter');
const phrases = ['PLC & embedded systems', 'MATLAB / Python development', 'smart manufacturing'];
let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typePhrase() {
  const phrase = phrases[phraseIndex];
  const currentText = deleting ? phrase.slice(0, characterIndex--) : phrase.slice(0, characterIndex++);
  typewriter.textContent = currentText;

  let delay = deleting ? 42 : 75;

  if (!deleting && characterIndex > phrase.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex < 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    characterIndex = 0;
    delay = 350;
  }

  window.setTimeout(typePhrase, delay);
}

if (typewriter) {
  typePhrase();
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', (event) => {
    const isOpen = nav.classList.toggle('open');
    event.currentTarget.setAttribute('aria-expanded', String(isOpen));
  });
}

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) {
      nav.classList.remove('open');
    }
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', () => {
    const message = contactForm.querySelector('.form-message');

    if (message) {
      message.textContent = 'TRANSMISSION QUEUED / I will be in touch soon.';
    }
  });
}
