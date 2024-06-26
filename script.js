document.addEventListener('DOMContentLoaded', () => {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!window.SpeechRecognition) {
    console.error('SpeechRecognition is not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let p = document.createElement('p');
  const words = document.querySelector('.words');
  if (!words) {
    console.error('The element with class "words" is not found.');
    return;
  }
  words.appendChild(p);

  recognition.addEventListener('result', e => {
    console.log('Speech recognition result received:', e);
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
  });

  recognition.addEventListener('end', () => {
    console.log('Speech recognition ended, restarting...');
    recognition.start();
  });

  recognition.start();
  console.log('Speech recognition started.');
});
