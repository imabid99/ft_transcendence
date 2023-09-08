import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import * as CANNON from 'cannon';
// import * as Matter from 'matter-js';
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

const matcaptexture = textureLoader.load('/textures/matcaps/8.png')


//CANNON WORLD

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

// CANNON Materials

// const simamaterial = new CANNON.Material('sima')
// const plasticmaterial = new CANNON.Material('plastic')
const defaultMaterial = new CANNON.Material('defaultMaterial')

const defaultcontactmaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7
  }
)
world.addContactMaterial(defaultcontactmaterial)
world.defaultContactMaterial = defaultcontactmaterial

//ball physics

const ballradius = 0.35
const ballshape = new CANNON.Sphere(ballradius)
const ballBody = new CANNON.Body({
  mass: 3,
  position: new CANNON.Vec3(0, 0, 0),
  shape: ballshape
})
world.addBody(ballBody)

window.addEventListener('keydown', (event) => {
  if (event.key === ' ') { // Space key
    const bounceForce = new CANNON.Vec3(10, 0, 1); // Adjust the force as needed
    ballBody.applyImpulse(bounceForce, ballBody.position);
  }
});

// floor physics
const floorshape = new CANNON.Plane()
const floorbody = new CANNON.Body()
floorbody.mass = 0
floorbody.addShape(floorshape)
floorbody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
world.addBody(floorbody)

// paddles physics
const paddlewidth = 4
const paddleheight = 1
const paddledepth = 0.3

const paddle1x = 0
const paddle1y = 0.5
const paddle1z = 9

const paddleshape = new CANNON.Box(new CANNON.Vec3(paddlewidth/2, paddleheight/2, paddledepth/2))
const paddle1body = new CANNON.Body({
  mass: 0,
  shape: paddleshape,
  position: new CANNON.Vec3(paddle1x, paddle1y, paddle1z)
})
const paddle2body = new CANNON.Body({
  mass: 0,
  shape: paddleshape,
  position: new CANNON.Vec3(paddle1x, paddle1y, -paddle1z)
})
world.addBody(paddle1body, paddle2body) 

// WALLS physics
const wallwidth = 7
const wallheight = 2
const walldepth = 20

const wallx = 10
const wally = 1
const wallz = 0

const wallshape = new CANNON.Box(new CANNON.Vec3(wallwidth/2, wallheight/2, walldepth/2))
const wall1body = new CANNON.Body({
  mass: 0,
  shape: wallshape,
  position: new CANNON.Vec3(wallx, wally, wallz)
})
const wall2body = new CANNON.Body({
  mass: 0,
  shape: wallshape,
  position: new CANNON.Vec3(-wallx, wally, wallz)
})
world.addBody(wall1body, wall2body) 



// WALLS
const wallG = new THREE.BoxGeometry(wallwidth, wallheight, walldepth)
const wallM = new THREE.MeshStandardMaterial({ color: '#F0FFFF' })

const wall1 = new THREE.Mesh(wallG, wallM)
wall1.position.set(wallx, wally, wallz)
scene.add(wall1)
wall1.castShadow = true

const wall2 = new THREE.Mesh(wallG, wallM)
wall2.position.set(-wallx, wally, wallz)
scene.add(wall2)
wall2.castShadow = true

// BOX
const boxG =  new THREE.BoxGeometry(paddlewidth, paddleheight, paddledepth)
const boxM = new THREE.MeshStandardMaterial({ color: '#FF0000' })

const box = new THREE.Mesh(boxG, boxM)
box.position.set(paddle1x, paddle1y, paddle1z)
box.castShadow = true
scene.add(box)

const box2 = new THREE.Mesh(boxG, boxM)
box2.position.set(paddle1x, paddle1y, -paddle1z)
box2.castShadow = true
scene.add(box2)

const boxSpeed = 0.5; 


// Define the key states
const keys = {
  left: false,
  right: false,
};

const keys2 = {
  left2: false,
  right2: false,
};

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
      paddle1body.position.copy(box.position)
    }
  }
  if (keys.right) {
    if (box.position.x < rightLimit) {
      box.translateX(boxSpeed);
      paddle1body.position.copy(box.position)
    }
  }
}

function updatebox2() {
  if (keys2.left2) {
    if (box2.position.x > leftLimit) {
      box2.translateX(-boxSpeed);
      paddle2body.position.copy(box2.position)
    }
  }
  if (keys2.right2) {
    if (box2.position.x < rightLimit) {
      box2.translateX(boxSpeed);
      paddle2body.position.copy(box2.position)
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
floor.receiveShadow = true

const floor2 = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#4682B4' })
)
floor2.rotation.x = - Math.PI * 0.5
floor2.position.y = 0.01
scene.add(floor2)
floor2.receiveShadow = true

//BALL

const ballMaterial = new THREE.MeshStandardMaterial({ color: '#FFFFFF' })
// const ballMaterial = new THREE.MeshMatcapMaterial({ color: '#F0FFFF' })
// ballMaterial.matcap = matcaptexture


const ball = new THREE.Mesh(
    new THREE.SphereGeometry( ballradius, 32, 16 ),
    ballMaterial
)
ballMaterial.roughness = 0.5
ballMaterial.metalness = 0.1
ball.position.set(0, 0.4, 0)
scene.add(ball)
ball.castShadow = true





/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.6)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const Mylight = new THREE.DirectionalLight('#ffffff', 0.6)
Mylight.position.set(4, 5, - 2)
// gui.add(Mylight, 'intensity').min(0).max(1).step(0.001)
gui.add(Mylight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(Mylight.position, 'y').min(- 5).max(10).step(0.001)
gui.add(Mylight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(Mylight)
Mylight.castShadow = true

Mylight.shadow.mapSize.width = 1024 * 3;
Mylight.shadow.mapSize.height = 1024 * 3;
Mylight.shadow.camera.left = -25;
Mylight.shadow.camera.right = 25;
Mylight.shadow.camera.top = 25;
Mylight.shadow.camera.bottom = -25;
Mylight.shadow.camera.near = -50;
Mylight.shadow.camera.far = 60;

const Directionallightcamerahelper = new THREE.CameraHelper(Mylight.shadow.camera)
// scene.add(Directionallightcamerahelper)


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
camera.position.y = 10
camera.position.z = 20
// gui.add(camera.position, 'x')
scene.add(camera)
camera.lookAt(0, 0, 0)

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

renderer.shadowMap.enabled = true

/**
 * Animate
 */
const clock = new THREE.Clock()
let oldElapsedTime = 0
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltatime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    //update physics world
    world.step(1/60, deltatime,3)

    ball.position.copy(ballBody.position)
    // console.log(ballBody.position)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()