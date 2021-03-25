import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'three/examples/jsm/libs/dat.gui.module'

const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1,1,1,2,2,2)
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const cube: THREE.Mesh = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 2

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder("Cube")
const cubeRotationFolder = cubeFolder.addFolder('Rotation');
const cubePositionFolder = cubeFolder.addFolder('Position');
const cubeScaleFolder = cubeFolder.addFolder('Scale');
cubeFolder.add(cube, 'visible', true);
cubeRotationFolder.add(cube.rotation, "x", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "y", 0, Math.PI * 2, 0.01)
cubeRotationFolder.add(cube.rotation, "z", 0, Math.PI * 2, 0.01)
cubePositionFolder.add(cube.position, "x", -10, 10, 0.01)
cubePositionFolder.add(cube.position, "y",-10, 10, 0.01)
cubePositionFolder.add(cube.position, "z",-10, 10, 0.01)
cubeScaleFolder.add(cube.scale, "x", 0, 5, 0.01)
cubeScaleFolder.add(cube.scale, "y",0, 5, 0.01)
cubeScaleFolder.add(cube.scale, "z",0, 5, 0.01)

cubeFolder.open()
cubeRotationFolder.open()
cubePositionFolder.open()
cubeScaleFolder.open()
const cameraFolder = gui.addFolder("Camera")
cameraFolder.add(camera.position, "z", 0, 10, 0.01)
cameraFolder.open()

var animate = function () {
    requestAnimationFrame(animate)

    // cube.rotateX(.1);
    cube.rotation.x += .02;
    controls.update()

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}
animate();
