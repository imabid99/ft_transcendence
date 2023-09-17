// const overlay = document.querySelector('.overlay');
// const body = document.querySelector('body');

// window.onload = function () {
//     overlay.style.height = body.offsetHeight + 'px';
// }

// function spotlight(e) {
//     const x = e.x;
//     const y = e.y + Math.round(window.scrollY);
//     overlay.style.backgroundImage = `radial-gradient(
//         circle 8em at ${x}px ${y}px,
//         rgba(0,0,0,0.0),
//         rgba(0,0,0,1.0)
//     )`
// }

// window.addEventListener('mousemove', spotlight);
// window.addEventListener('touchmove', spotlight);




// Get a reference to the .mask element.
const mask = document.querySelector('.mask');

// Add an event to catch mouse movements.
document.addEventListener('pointermove', (pos) => {
  
    // Calculate mouse position in percentages.
    let x = parseInt( pos.clientX / window.innerWidth * 100 );
    let y = parseInt( pos.clientY / window.innerHeight * 100 );
  
    // Update the custom property values on the body.
    mask.style.setProperty('--mouse-x', x + '%');
    mask.style.setProperty('--mouse-y', y + '%'); 
  
});