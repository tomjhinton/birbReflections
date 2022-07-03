import './style.scss'
import * as THREE from 'three'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { Reflector } from 'three/examples/jsm/objects/Reflector.js';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'




import fragmentShaderFloor from './shaders/fragment-floor.glsl'
import vertexShaderFloor from './shaders/vertexFloor.glsl'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene()
 // scene.background = new THREE.Color( 0xffffff )



const floorGeometry = new THREE.PlaneGeometry( 20, 20, 20)

const floorMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShaderFloor,
  fragmentShader: fragmentShaderFloor,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    },
    uRotation: {
      value: 0



    },
    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    }
  }
})

const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
const wallMesh = new THREE.Mesh(floorGeometry, floorMaterial)

floorMesh.rotateX( - Math.PI / 2 )

	floorMesh.position.y = - 0.6;
wallMesh.position.z =  -10.;
wallMesh.position.y = 9.4;
//
// wallMesh.position.z = -1.1

scene.add(floorMesh, wallMesh)




const sphereGeometry = new THREE.SphereGeometry( .5, 320, 320, 160 )



const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uFrequency: {
      value: new THREE.Vector2(10, 5)
    },
    uTime: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() },
    uPosition: {
      value: {
        x: 0
      }
    },
    uRotation: {
      value: 0



    },
    uValueA: {
      value: Math.random()
    },
    uValueB: {
      value: Math.random()
    },
    uValueC: {
      value: Math.random()
    },
    uValueD: {
      value: Math.random()
    }
  }
})

const sphereMesh = new THREE.Mesh(sphereGeometry, shaderMaterial)

//scene.add(sphereMesh)

const gtlfLoader = new GLTFLoader()

let sceneGroup, bird, gltfVar, verticalMirror
gtlfLoader.load(
  'narcissus.glb',
  (gltf) => {
    console.log(gltf)
    gltfVar = gltf
    //gltf.scene.scale.set(.1,.1,.1)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y += 1.1
    scene.add(sceneGroup)

    //
    // bird = gltf.scene.children.find((child) => {
    //   return child.name === 'bird'
    // })

    // verticalMirror = new Reflector( bird.geometry, {
    //     clipBias: 0.003,
    //     textureWidth: window.innerWidth * window.devicePixelRatio,
    //     textureHeight: window.innerHeight * window.devicePixelRatio,
    //     color: '0x889999'
    //   } );
    //
    //
    //   verticalMirror.position.y = 0;
    //   // groundMirror.rotateX( - Math.PI / 2 );
    //   verticalMirror.position.z = - 1.2;
    //   scene.add( verticalMirror );


} )




//Reflectors

let circleGeometry = new THREE.CircleGeometry( 6, 20 );

        let groundMirror = new Reflector( circleGeometry, {
					clipBias: 0.003,
					textureWidth: window.innerWidth * window.devicePixelRatio,
					textureHeight: window.innerHeight * window.devicePixelRatio,
					color: 0x777777
				} );
				groundMirror.position.y = - 0.5;
				groundMirror.rotateX( - Math.PI / 2 );
				scene.add( groundMirror );

        //
        // let ceilingMirror = new Reflector( circleGeometry, {
        //   clipBias: 0.003,
        //   textureWidth: window.innerWidth * window.devicePixelRatio,
        //   textureHeight: window.innerHeight * window.devicePixelRatio,
        //   color: 0x777777
        // } );
        // ceilingMirror.position.y =  .55;
        // ceilingMirror.rotateX( - Math.PI / 2 );
        //   ceilingMirror.rotateZ( - Math.PI / 2 );
      //  scene.add( ceilingMirror );


        let backGeom = new THREE.PlaneGeometry( 100, 100 );

            	// let	verticalMirror = new Reflector( circleGeometry, {
        			// 		clipBias: 0.003,
        			// 		textureWidth: window.innerWidth * window.devicePixelRatio,
        			// 		textureHeight: window.innerHeight * window.devicePixelRatio,
        			// 		color: '0x889999'
        			// 	} );
              //
              //
        			// 	verticalMirror.position.y = 0;
        			// 	verticalMirror.position.z = - 1.2;
        			// 	scene.add( verticalMirror );



// 	let	sideMirror = new Reflector( circleGeometry, {
//       clipBias: 0.003,
// textureWidth: window.innerWidth * window.devicePixelRatio,
//   textureHeight: window.innerHeight * window.devicePixelRatio,
//   color: '0x889999'
// } );
//
//
// sideMirror.position.y = 0;
// sideMirror.position.x = - 1;
// sideMirror.rotateY(  Math.PI / 2 );
// sideMirror.rotation.z +=( - Math.PI / 4 );
//scene.add( sideMirror );


// 	let	sideMirror1 = new Reflector( circleGeometry, {
//       clipBias: 0.003,
// textureWidth: window.innerWidth * window.devicePixelRatio,
//   textureHeight: window.innerHeight * window.devicePixelRatio,
//   color: '0x889999'
// } );
//
//
// sideMirror1.position.y = 0;
// sideMirror1.position.x =  1;
//   sideMirror1.rotateY( - Math.PI / 2 );
//scene.add( sideMirror1 );




const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>{



  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2 ))


})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000)
camera.position.x = 1
camera.position.y = -7
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  alpha: true
})
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor( 0x000000, 1)
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const light = new THREE.AmbientLight( 0x404040 )
scene.add( light )
// const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 )
// scene.add( directionalLight )





const clock = new THREE.Clock()

const tick = () =>{

  const elapsedTime = clock.getElapsedTime()


  // Update controls
  controls.update()


  // verticalMirror.rotation.y += .01
  //   floorMesh.rotation.z += .01

// if(verticalMirror){
//   verticalMirror.rotation.y += .01
// }

  shaderMaterial.uniforms.uTime.value = elapsedTime
    floorMaterial.uniforms.uTime.value = elapsedTime

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
