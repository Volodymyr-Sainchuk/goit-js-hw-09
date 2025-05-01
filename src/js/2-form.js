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
login.addEventListener('input', handleFormFocusout);

function handleFormSubmit(event) {
  event.preventDefault();
  try {
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const filledFields = Object.values(data).filter(
      value => value.trim() !== ''
    );

    if (filledFields.length < 2) {
      throw new Error('Недостатньо заповнених полів');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    form.reset();
  } catch (error) {
    alert('⚠️ Opps... Some error occurs');
  }
}

function handleFormFocusout(event) {
  const form = login;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function populateTextarea() {
  const savedLsData = localStorage.getItem(STORAGE_KEY);
  if (!savedLsData) return;

  try {
    const dataFormLs = JSON.parse(savedLsData);
    const formElements = login.elements;

    for (const key in dataFormLs) {
      if (formElements[key]) {
        formElements[key].value = dataFormLs[key];
      }
    }
  } catch (error) {
    alert('⚠️ Opps... Some error occurs');
  }
}
