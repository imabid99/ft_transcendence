import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
// import * as CANNON from 'cannon-es'
import * as Matter from 'matter-js';
/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

//ENGINE

const { Engine, Render, World, Bodies } = Matter;
const matterEngine = Engine.create();

// WALLS
const wallG = new THREE.BoxGeometry(1, 1, 1)
const wallM = new THREE.MeshStandardMaterial({ color: '#F0FFFF' })

const wall1 = new THREE.Mesh(wallG, wallM)
wall1.position.set(10, 1, 0)
wall1.scale.set(7, 2, 20)
scene.add(wall1)

const wall2 = new THREE.Mesh(wallG, wallM)
wall2.position.set(-10, 1, 0)
wall2.scale.set(7, 2, 20)
scene.add(wall2)

// BOX
const boxG =  new THREE.BoxGeometry(1, 1, 1)
const boxM = new THREE.MeshStandardMaterial({ color: '#FF0000' })

const box = new THREE.Mesh(boxG, boxM)
box.scale.set(4, 1, 0.3)
box.position.set(0, 0.5, 9)
// gui.add(box.position, 'x').min(-8).max(8).step(0.1)
scene.add(box)

const box2 = new THREE.Mesh(boxG, boxM)
box2.scale.set(4, 1, 0.3)
box2.position.set(0, 0.5, -9)
// gui.add(box2.position, 'x').min(-8).max(8).step(0.1)
scene.add(box2)

const boxSpeed = 0.5; 

// Box body 

const boxBody = Bodies.rectangle(box.position.x, box.position.y, box.scale.x, box.scale.y, { isStatic: false });
boxBody.friction = 0.2; // Adjust friction as needed
boxBody.restitution = 0.6; // Adjust restitution (bounciness) as needed
// Add the Matter.js body to the Matter.js world
World.add(matterEngine.world, [boxBody]);

const box2Body = Bodies.rectangle(box2.position.x, box2.position.y, box2.scale.x, box2.scale.y, { isStatic: false });
box2Body.friction = 0.2; // Adjust friction as needed
box2Body.restitution = 0.6; // Adjust restitution (bounciness) as needed
// Add the Matter.js body to the Matter.js world
World.add(matterEngine.world, [box2Body]);



// Define the key states
const keys = {
  left: false,
  right: false,
};

const keys2 = {
  left2: false,
  right2: false,
};

// Add event listeners for keydown and keyup events
document.addEventListener('keydown', (event) => {
  handleKeyDown(event.key);
});

document.addEventListener('keyup', (event) => {
  handleKeyUp(event.key);
});

// box 2
document.addEventListener('keydown', (event) => {
  handleKeyDown2(event.key);
});

document.addEventListener('keyup', (event) => {
  handleKeyUp2(event.key);
});


// Function to handle keydown events
function handleKeyDown(key) {
  if (key === 'a') keys.left = true;
  if (key === 'd') keys.right = true;
}

function handleKeyDown2(key) {
  if (key === 'ArrowLeft') keys2.left2 = true;
  if (key === 'ArrowRight') keys2.right2 = true;
}

// Function to handle keyup events
function handleKeyUp(key) {
  if (key === 'a') keys.left = false;
  if (key === 'd') keys.right = false;
}

function handleKeyUp2(key) {
  if (key === 'ArrowLeft') keys2.left2 = false;
  if (key === 'ArrowRight') keys2.right2 = false;
}

const leftLimit = -4.5;
const rightLimit = 4.5;




function updatebox() {
  if (keys.left) {
    if (box.position.x > leftLimit) {
      box.translateX(-boxSpeed);
      Matter.Body.setPosition(boxBody, { x: box.position.x });
    }
  }
  if (keys.right) {
    if (box.position.x < rightLimit) {
      box.translateX(boxSpeed);
      Matter.Body.setPosition(boxBody, { x: box.position.x });
    }
  }
}

function updatebox2() {
  if (keys2.left2) {
    if (box2.position.x > leftLimit) {
      box2.translateX(-boxSpeed);
      Matter.Body.setPosition(box2Body, { x: box2.position.x });
    }
  }
  if (keys2.right2) {
    if (box2.position.x < rightLimit) {
      box2.translateX(boxSpeed);
      Matter.Body.setPosition(box2Body, { x: box2.position.x });
    }
  }
}



// render loop
function animate() {
  requestAnimationFrame(animate);

  // Update box based on key states
  updatebox2();
  updatebox();
  
  //   renderer.render(scene, box);
}


// Call the animate function to start the render loop
animate();

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#FFFFFF', metalness: 0.3,
    roughness: 0.4, })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.scale.set(10, 10, 10)
scene.add(floor)

const floor2 = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#4682B4', metalness: 0.3,
    roughness: 0.4, })
)
floor2.rotation.x = - Math.PI * 0.5
floor2.position.y = 0.01
scene.add(floor2)

//BALL

const ball = new THREE.Mesh(
    new THREE.SphereGeometry( 0.4, 32, 16 ),
    new THREE.MeshToonMaterial()
)
ball.position.set(0, 0.4, 0)
scene.add(ball)




// Ball Physics

// Create the Matter.js body for the ball
const ballBody = Bodies.circle(0, 0.4, 0.4, {
  friction: 0.005,
  restitution: 1.2,
});

// Add the Matter.js body to the Matter.js world
World.add(matterEngine.world, [ballBody]);

// Function to update the position of the Three.js ball based on the Matter.js body
function updateBallPosition() {
  ball.position.copy(ballBody.position);

  // Convert Matter.js angle to Euler angles
  const euler = new THREE.Euler(0, 0, ballBody.angle);

  ball.rotation.copy(euler);
}



function animateball() {
  requestAnimationFrame(animate);

  // Update box based on key states
  updatebox2();
  updatebox();

  // Update ball position based on Matter.js body
  updateBallPosition();

  // Check for collisions with walls
  const ballPosX = ball.position.x;
  if (ballPosX < -8 || ballPosX > 8) {
    // Reverse the ball's velocity (bounce)
    Matter.Body.setVelocity(ballBody, { x: -ballBody.velocity.x, y: ballBody.velocity.y });
  }

  // Step the Matter.js engine
  Engine.update(matterEngine, 1000 / 60);

  // Render the scene
  renderer.render(scene, camera);
}






/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.8)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.5)
moonLight.position.set(4, 5, - 2)
// gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 7
camera.position.z = 15
// gui.add(camera.position, 'x')
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()