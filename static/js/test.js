const form = document.getElementById('uForm');
const nameEntry = document.getElementById('uName');
const emailEntry = document.getElementById('uEmail');

form.onsubmit = (e) => {
  e.preventDefault();
  console.log(nameEntry.value);
  console.log(emailEntry.value);
  e.currentTarget.submit();
};
