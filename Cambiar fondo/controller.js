const ws = new WebSocket('ws://192.168.100.14:8080');

ws.onopen = () => {
  console.log('Conexión WebSocket abierta');

  document.getElementById('rojoButton').addEventListener('click', () => {
    handleButtonClick('rojoButton', 'rojo', 'red');
  });

  document.getElementById('verdeButton').addEventListener('click', () => {
    handleButtonClick('verdeButton', 'verde', 'green');
  });
};

function handleButtonClick(buttonId, message, color) {
  const button = document.getElementById(buttonId);

  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
  } else {
    console.log('La conexión WebSocket no está abierta');
  }

  setButtonColor(button, color);
}

function setButtonColor(button, color) {
  if (!button.classList.contains('clicked')) {
    button.classList.add('clicked');
    button.style.backgroundColor = color;
  } else {
    button.classList.remove('clicked');
    button.style.backgroundColor = '#337ab7'; // Cambia al color original
  }
}
