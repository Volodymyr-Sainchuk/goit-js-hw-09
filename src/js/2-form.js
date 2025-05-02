const STORAGE_KEY = 'feedback-msg';

const login = document.querySelector('.feedback-form');
const textAreaJs = document.querySelector('textarea');

populateTextarea();

const btnForCs = login.lastElementChild;
btnForCs.classList.add('btn-login');

const loginCs = Array.from(login.children);
loginCs.forEach(element => {
  element.classList.add('login-items-form');
});

const inputCs = Array.from(login.firstElementChild.children);
inputCs.forEach(element => {
  element.classList.add('input');
});

textAreaJs.classList.add('style-textarea');

login.addEventListener('submit', handleFormSubmit);
login.addEventListener('input', handleFormInput);

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const errors = [];
  if (!data.email?.trim()) {
    errors.push('Поле "Email" обов’язкове для заповнення.');
  }
  if (!data.message?.trim()) {
    errors.push('Поле "Повідомлення" не може бути порожнім.');
  }

  if (errors.length > 0) {
    alert(`⚠️ Виникли помилки:\n\n• ${errors.join('\n• ')}`);
    return;
  }

  console.log('✅ Успішно надіслано:', data);
  alert('✅ Дякуємо! Ваше повідомлення було успішно надіслане.');

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

function handleFormInput() {
  const formData = new FormData(login);
  const data = Object.fromEntries(formData.entries());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return;

  try {
    const data = JSON.parse(savedData);
    const formElements = login.elements;

    for (const key in data) {
      if (formElements[key]) {
        formElements[key].value = data[key];
      }
    }

    const restoredFormData = new FormData();
    for (const key in data) {
      restoredFormData.set(key, data[key]);
    }
  } catch (error) {
    alert('⚠️ Помилка при відновленні даних форми. Спробуйте ще раз.');
  }
}
