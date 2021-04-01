// The FBX format is used to provide interoperability between digital content creation applications and game engines such as Blender, Maya, Autodesk, Unity, Unreal and many others. It supports many features such as 3D models, scene hierarchy, materials, lighting, animations, bones and more.

// import * as THREE from '/build/three.module.js'
// import { OrbitControls } from '/jsm/controls/OrbitControls'
// import { FBXLoader } from '/jsm/loaders/FBXLoader'
// import Stats from '/jsm/libs/stats.module'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene: THREE.Scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

let light = new THREE.PointLight();
light.position.set(0.8, 1.4, 1.0)
scene.add(light);

let ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0.8, 1.4, 1.0)

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = true
controls.target.set(0, 1, 0)

const material: THREE.MeshNormalMaterial = new THREE.MeshNormalMaterial()

const fbxLoader: FBXLoader = new FBXLoader();
fbxLoader.load(
    'models/kachujin_g_rosales.fbx',
    (object) => {
        object.traverse(child => {
            if ((<THREE.Mesh>child).isMesh) {
                if ((<THREE.Mesh>child).material) {
                    ((<THREE.Mesh>child).material as THREE.MeshBasicMaterial).transparent = false;
                }
            }
        })
        object.scale.set(.01, .01, .01)
        scene.add(object);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()

    stats.update()
};

function render() {
    renderer.render(scene, camera)
}
animate();