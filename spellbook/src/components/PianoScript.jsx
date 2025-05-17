import { useEffect } from 'react';
import * as Tone from 'tone';

export default function PianoScript() {
  useEffect(() => {
    const synth = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    }).toDestination();

    const secretSequence = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4']; // Your target melody
    const inputSequence = [];
    const maxLength = secretSequence.length;

    const pictureUrl = '/images/unlocked.png'; // Ensure this is correct path
    const imageContainerId = 'sequence-image-container';

    const handleKeyClick = (note) => {
      synth.triggerAttackRelease(note, '8n');

      inputSequence.push(note);
      if (inputSequence.length > maxLength) {
        inputSequence.shift();
      }

      if (arraysEqual(inputSequence, secretSequence)) {
        console.log('Sequence matched!');
        showImageAndMessage();
      }
    };

    function arraysEqual(a, b) {
      return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    function showImageAndMessage() {
      const imageContainer = document.getElementById(imageContainerId);

      // If the image and message are already shown, don't show them again
      if (imageContainer.querySelector('img')) return;

      // Create the image element
      const img = document.createElement('img');
      img.src = pictureUrl;
      img.alt = 'Unlocked Sequence Image';
      img.style.display = 'block';
      img.style.margin = '2rem auto';
      img.style.maxWidth = '300px';

      // Create the message element
      const message = document.createElement('p');
      message.textContent = 'Congratulations! You unlocked the secret sequence! (To replace with actual pic)';
      message.style.textAlign = 'center';
      message.style.fontSize = '1.2rem';
      message.style.fontWeight = 'bold';
      message.style.color = '#4CAF50';
      message.style.margin = '2em'
      // Green color for success

      // Append both image and message to the container
      imageContainer.appendChild(message);
      imageContainer.appendChild(img);
    }

    document.querySelectorAll('.key').forEach((el) => {
      el.addEventListener('click', () => {
        const note = el.getAttribute('data-note');
        handleKeyClick(note);
      });
    });

    return () => {
      document.querySelectorAll('.key').forEach((el) => {
        el.replaceWith(el.cloneNode(true));
      });
    };
  }, []);

  return null;
}

