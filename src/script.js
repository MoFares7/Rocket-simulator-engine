import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
window.addEventListener("load", init, false);

function init() {
    createScene();
    createLights();
    createRocket();
    createLaunch();

}
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Scene
const createScene = () => {

    const bgTexture = textureLoader.load('/textures/background/images1.jpg');
    const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

    scene.background = bgTexture;
    /**
     * Darw Grass
     */
    grassColorTexture.repeat.set(8, 8)
    grassAmbientOcclusionTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping

    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping

    // floor
    const floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshStandardMaterial({
                map: grassColorTexture,
                aoMap: grassAmbientOcclusionTexture,
                normalMap: grassNormalTexture,
                roughnessMap: grassRoughnessTexture
            })
        )
        // plane.receiveShadow = true
    floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
    floor.rotation.x = -Math.PI * 0.5
    floor.position.y = -0.3


    scene.add(floor)

}

const createLights = () => {
    // Group
    const light = new THREE.Group()
    scene.add(light)



    /**
     * Lights
     */
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.3)
    light.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 15
    moonLight.position.set(4, 5, -2)
    light.add(moonLight)


    const doorLight = new THREE.PointLight('#ff7d46', 1, 17)
    doorLight.castShadow = true
    doorLight.shadow.mapSize.width = 1256
    doorLight.shadow.mapSize.height = 1256
    doorLight.shadow.camera.far = 7

    doorLight.position.set(4, 2.2, -0.7)
    light.add(doorLight)


}

const createRocket = () => {
    const rocket1MetrialTexture = textureLoader.load('static/textures/rocket/bodyRocket1/Material.jpg');
    const rocket1ColorTexture = textureLoader.load('/textures/rocket/bodyRocket1/basecolor.jpg');

    const rocket1AmbientTexture = textureLoader.load('/textures/rocket/bodyRocket1/ambientOcclusion.jpg');
    const rocket1EmissiveTexture = textureLoader.load('/textures/rocket/bodyRocket1/emissive.jpg');
    const rocket1HeightTexture = textureLoader.load('/textures/rocket/bodyRocket1/height.png');
    const rocket1NormalTexture = textureLoader.load('/textures/rocket/bodyRocket1/normal.jpg');
    const rocket1opacityTexture = textureLoader.load('/textures/rocket/bodyRocket1/opacity.jpg');
    const rocket1roughnessTexture = textureLoader.load('/textures/rocket/bodyRocket1/roughness.jpg');
    const celingroughnessTexture = textureLoader.load('/textures/rocket/bodyRocket1/Ceiling_Roughness.jpg');
    const celingHeightTexture = textureLoader.load('/textures/rocket/bodyRocket1/Ceiling_Height.png');
    const celingBaseColorTexture = textureLoader.load('/textures/rocket/bodyRocket1/Ceiling_Base_Color.jpg');
    const celingEmissiveTexture = textureLoader.load('/textures/rocket/bodyRocket1/Ceiling_emissive.jpg');
    const celingAmbientTexture = textureLoader.load('/textures/rocket/bodyRocket1/Ceiling_ambientOcclusion.png');
    const celingMaterialTexture = textureLoader.load('static/textures/rocket/bodyRocket1/Ceiling_Material.png');

    // Group
    const rocket = new THREE.Group()
    scene.add(rocket)

    const cylinder1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.2, 0.2, 0.1, 50),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }));

    const cylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.25, 0.25, 0.15, 50),
        new THREE.MeshStandardMaterial({
            map: rocket1ColorTexture,
            normalMap: rocket1NormalTexture,
            metalnessMap: rocket1MetrialTexture,
            metalness: 0.1,
            aoMap: rocket1AmbientTexture,

            roughnessMap: rocket1roughnessTexture,
            roughness: 32,
            opacity: rocket1opacityTexture,
            emissive: rocket1EmissiveTexture,

        }));

    const bodyrocket = new THREE.Group()
    scene.add(bodyrocket);

    const cylinder3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 1.5, 50),
        new THREE.MeshStandardMaterial({
            map: rocket1ColorTexture,
            aoMap: rocket1AmbientTexture,
            normalMap: rocket1NormalTexture,
            metalnessMap: rocket1MetrialTexture,
            metalness: 0.1,
            aoMap: rocket1AmbientTexture,
            roughnessMap: rocket1roughnessTexture,
            roughness: 32,
            opacity: rocket1opacityTexture,
            emissive: rocket1EmissiveTexture,
        }));

    const cylinder4 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.5, 50),
        new THREE.MeshStandardMaterial({
            map: celingBaseColorTexture,
            metalnessMap: celingMaterialTexture,
            metalness: 0.1,
            roughnessMap: celingroughnessTexture,
            roughness: 32,
            emissive: celingEmissiveTexture,

        }));
    const cylinder5 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 1, 50),
        new THREE.MeshStandardMaterial({
            map: rocket1ColorTexture,
            normalMap: rocket1NormalTexture,
            metalnessMap: rocket1MetrialTexture,
            metalness: 0.1,
            aoMap: rocket1AmbientTexture,
            roughnessMap: rocket1roughnessTexture,
            roughness: 32,
            opacity: rocket1opacityTexture,
            emissive: rocket1EmissiveTexture,

        }));

    const cylinder6 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.3, 50),
        new THREE.MeshStandardMaterial({
            map: celingBaseColorTexture,
            metalnessMap: celingMaterialTexture,
            metalness: 0.1,
            displacementMap: celingHeightTexture,
            displacementScale: 0.002,
            roughnessMap: celingroughnessTexture,
            roughness: 32,
            emissive: celingEmissiveTexture,

        }));

    const cylinder7 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.7, 50),
        new THREE.MeshStandardMaterial({
            map: rocket1ColorTexture,
            normalMap: rocket1NormalTexture,
            metalnessMap: rocket1MetrialTexture,
            metalness: 0.1,
            aoMap: rocket1AmbientTexture,
            roughnessMap: rocket1roughnessTexture,
            roughness: 2,
            opacity: rocket1opacityTexture,
            emissive: rocket1EmissiveTexture,

        }));

    const cylinder8 = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.4, 0.4, 0.2, 50),
        new THREE.MeshStandardMaterial({
            map: celingBaseColorTexture,
            metalnessMap: celingMaterialTexture,
            metalness: 0.1,
            displacementMap: celingHeightTexture,
            displacementScale: 0.002,
            roughnessMap: celingroughnessTexture,
            roughness: 32,
            emissive: celingEmissiveTexture,
        }));


    const geoCone = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 12),
        new THREE.MeshStandardMaterial({
            map: rocket1ColorTexture,
            normalMap: rocket1NormalTexture,
            metalnessMap: rocket1MetrialTexture,
            metalness: 0.1,

            roughnessMap: rocket1roughnessTexture,
            roughness: 32,
            opacity: rocket1opacityTexture,
            emissive: rocket1EmissiveTexture,

        }));


    // Add all Rocket in one body
    rocket.add(cylinder1);
    rocket.add(cylinder2);
    rocket.add(cylinder3);
    rocket.add(cylinder4);
    rocket.add(cylinder5);
    rocket.add(cylinder6);
    rocket.add(cylinder7);
    rocket.add(cylinder8);
    rocket.add(geoCone);


    cylinder1.position.y = -0.2;
    cylinder2.position.y = -0.1;
    cylinder3.position.y = 0.7;
    cylinder4.position.y = 1.7;
    //  cylinder4.geometry.attributes.uv2 = cylinder4.geometry.attributes.uv2;
    cylinder5.position.y = 2.45;
    cylinder6.position.y = 3.1;
    cylinder7.position.y = 3.6;
    cylinder8.position.y = 4.06;
    geoCone.position.y = 4.2;

    rocket.position.y = 3;



}

const createLaunch = () => {

    const launchColorTexture = textureLoader.load('/textures/launchpad/launch1/Wall_BaseColor.jpg');
    const launchHeightTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Height.png');
    const launchNormalTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Normal.jpg');
    const launchRoughnessTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Roughness.jpg');
    const launchMetrialTexture = textureLoader.load('/textures/launchpad/launch1/Wall_metrial.jpg');
    // Group
    const lunch = new THREE.Group()
    scene.add(lunch);

    const base = new THREE.Mesh(new THREE.BoxBufferGeometry(3, 3, 5.5),
        new THREE.MeshStandardMaterial({
            map: launchColorTexture,
            normalMap: launchNormalTexture,
            metalnessMap: launchMetrialTexture,
            metalness: 0.1,
            displacementMap: launchHeightTexture,
            displacementScale: 0.002,
            roughnessMap: launchRoughnessTexture,
            roughness: 32
        }));

    const base1 = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 1, 4),
        new THREE.MeshBasicMaterial({ color: 0xD6D6D6 }));

    lunch.add(base);
    lunch.add(base1);

    base.position.y = 1.2;
    base1.position.z = 2.8;
    base1.position.y = 1.5;

}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', init => {
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
camera.position.x = 12
camera.position.y = 4
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        rocket.position.y -= 1;
    }
    if (e.keyCode === 38) {
        rocket.position.y += 1;
    }

}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
document.body.appendChild(renderer.domElement)

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //renderer.setClearColor('#262837')

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}
animate();

const tick = () => {
    const elapsedTime = clock.getElapsedTime()



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()