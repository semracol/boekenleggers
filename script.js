const cartCount = document.getElementById('cartCount');
const buttons = document.querySelectorAll('.card-button');

let counter = 0;

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    counter += 1;
    cartCount.textContent = String(counter);
    button.textContent = 'Toegevoegd';
    button.disabled = true;
    button.style.opacity = '0.8';
    setTimeout(() => {
      button.textContent = 'In winkelmand';
      button.disabled = false;
      button.style.opacity = '1';
    }, 1100);
  });
});
