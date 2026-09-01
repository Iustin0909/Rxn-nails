const navToggle = document.querySelector('.nav-toggle');
const navigation = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Închide navigația' : 'Deschide navigația');
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}));

function validateForm(form) {
  const fields = [...form.querySelectorAll('[required]')];
  let valid = true;
  fields.forEach((field) => {
    const fieldValid = field.checkValidity();
    field.classList.toggle('invalid', !fieldValid);
    if (!fieldValid) valid = false;
  });
  return valid;
}

document.querySelectorAll('input, select, textarea').forEach((field) => {
  field.addEventListener('input', () => field.classList.remove('invalid'));
  field.addEventListener('change', () => field.classList.remove('invalid'));
});

const bookingForm = document.querySelector('#booking-form');
const bookingFields = bookingForm.querySelector('.form-fields');
const bookingSuccess = document.querySelector('#booking-success');
const dateField = bookingForm.elements.date;
dateField.min = new Date().toISOString().split('T')[0];

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm(bookingForm)) {
    bookingForm.querySelector('.invalid').focus();
    return;
  }
  bookingFields.hidden = true;
  bookingSuccess.hidden = false;
  bookingSuccess.focus();
});

document.querySelector('.reset-form').addEventListener('click', () => {
  bookingForm.reset();
  bookingFields.hidden = false;
  bookingSuccess.hidden = true;
  dateField.min = new Date().toISOString().split('T')[0];
  bookingForm.elements.name.focus();
});

const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!validateForm(contactForm)) {
    contactForm.querySelector('.invalid').focus();
    return;
  }
  const confirmation = contactForm.querySelector('.contact-success');
  confirmation.hidden = false;
  confirmation.focus();
  contactForm.querySelector('.contact-fields').hidden = true;
});

document.querySelector('#year').textContent = new Date().getFullYear();
