console.clear();


(function() {
  
  const soundSrc = [
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/crash.mp3',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/big-rack-tom.mp3',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/tom.wav',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/ride.wav',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/openhat.wav',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/snare.mp3',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/kick.mp3',
    'https://raw.githubusercontent.com/PiotrBerebecki/drum-kit-vanilla-javascript/master/assets/sound/floor-tom.mp3'
  ];
  
  // Create audio objects
  const audioObjects = [];
  soundSrc.forEach((src) => {
    audioObjects.push(new Audio(src));
  });
   
  // Find buttons in DOM
  const buttonElements = Array.from(document.getElementsByClassName('button'));
  
  // Event listener for clicks
  buttonElements.forEach((button) => {
    button.addEventListener('click', playSound, false);
    button.addEventListener('transitionend', removeTransition);
  });
  
  // Event listener for keyboard
  window.addEventListener('keydown', playSound);
  
  function playSound(e) {
    // Will hold sound index based on 
    // keyboard key pressed or click event
    let index;
    
    let keyCode = e.keyCode;
    
    // Handle keyboard events
    if (keyCode) {
      // Check if number keys 1-8 were pressed
      if (keyCode > 48 && keyCode < 57) {
        index = keyCode - 49;
      // Exit function if other keys pressed
      } else { return; }
    // Handle click events
    } else {
      index = parseInt(e.currentTarget.dataset.key, 10) - 1;
    }
    
    const audio = audioObjects[index];
    
    // Play the sound
    audio.currentTime = 0;
    audio.play();    
    
    // Animate
    buttonElements[index].classList.add('playing');
  }
  
  function removeTransition(e) {
    if (e.propertyName !== 'transform') { return; }
    e.target.classList.remove('playing');
  }

}());