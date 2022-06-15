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
const parameters = {}
parameters.count = 100000
parameters.size = 0.01
parameters.radius = 17
parameters.branches = 3
parameters.spin = 10
parameters.randomness = 2.2
parameters.randomnessPower = 3
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

let geometry = null
let material = null
let points = null
let up = 4;

// Canvas
const canvas = document.querySelector('canvas.webgl')
window.addEventListener("load", init, false);

function init() {
    createScene();
    createLights();
    //  createmo();
    createRocket1();
    //  createRocket2();
    //  CreateRocket3();
    createLaunch();
    generateGalaxy();

}
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

// Scene
const createScene = () => {


    const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
    const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')


    // TEXTURE TO ENVIRONMENT

    let materialArray = [];
    let materialArray1 = [];
    const environmet1Texture = textureLoader.load('/textures/environment/meadow_ft.jpg')
    const environmet2Texture = textureLoader.load('/textures/environment/meadow_bk.jpg')
    const environmet3Texture = textureLoader.load('/textures/environment/meadow_up.jpg')
    const environmet4Texture = textureLoader.load('/textures/environment/meadow_dn.jpg')
    const environmet5Texture = textureLoader.load('/textures/environment/meadow_rt.jpg')
    const environmet6Texture = textureLoader.load('/textures/environment/meadow_lf.jpg')

    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet1Texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet2Texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet4Texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet5Texture }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: environmet6Texture }));

    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));
    materialArray1.push(new THREE.MeshBasicMaterial({ map: environmet3Texture }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;

    let skyboxGeo = new THREE.BoxGeometry(820, 120, 850);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.position.y = 57;



    for (let i = 0; i < 6; i++)
        materialArray1[i].side = THREE.BackSide;
    let outskyboxGeo = new THREE.SphereGeometry(820, 920, 150);
    let skybox1 = new THREE.Mesh(outskyboxGeo, materialArray1);
    skybox1.position.y = 247;


    scene.add(skybox);
    scene.add(skybox1);


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

const createRocket1 = () => {
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

    const launchCylinder1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1, 1, 0.2, 50),
        new THREE.MeshBasicMaterial({ color: 0xff0000 }));

    const launchCylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.25, 1.25, 0.4, 50),
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

    const bodyCylinder1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 5, 50),
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

    const rollCylinder1 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 1, 50),
        new THREE.MeshStandardMaterial({
            map: celingBaseColorTexture,
            metalnessMap: celingMaterialTexture,
            metalness: 0.1,
            roughnessMap: celingroughnessTexture,
            roughness: 32,
            emissive: celingEmissiveTexture,

        }));
    const bodyCylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 4, 50),
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

    const rollCylinder2 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 1, 50),
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

    const bodyCylinder3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 4, 50),
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

    const rollCylinder3 = new THREE.Mesh(new THREE.CylinderBufferGeometry(1.5, 1.5, 1, 50),
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

    const headRocket = new THREE.Mesh(new THREE.SphereGeometry(1.5, 20, 12),
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
    rocket.add(launchCylinder1);
    rocket.add(launchCylinder2);
    rocket.add(bodyCylinder1);
    rocket.add(rollCylinder1);
    rocket.add(bodyCylinder2);
    rocket.add(rollCylinder2);
    rocket.add(bodyCylinder3);
    rocket.add(rollCylinder3);
    rocket.add(headRocket);


    launchCylinder1.position.y = 2.3;
    launchCylinder2.position.y = 2.5;
    bodyCylinder1.position.y = 5;
    rollCylinder1.position.y = 8;
    bodyCylinder2.position.y = 10.5;
    rollCylinder2.position.y = 12.7;
    bodyCylinder3.position.y = 15.25;
    rollCylinder3.position.y = 17.7;
    headRocket.position.y = 18.2;

    rocket.position.y = 0;


    window.addEventListener('keypress', (event) => {
        switch (event.key) {
            case 'w':
                rocket.position.y++;
                break;
            case 's':
                rocket.position.y--;
                break;

        }
    })
}

const createRocket2 = () => {

    const rocket2MetrialTexture = textureLoader.load('static/textures/rocket/bodyRocket2/Material.jpg');
    const rocket2ColorTexture = textureLoader.load('/textures/rocket/bodyRocket2/Plastic_basecolor.jpg');
    const rocket2AmbientTexture = textureLoader.load('/textures/rocket/bodyRocket2/Plastic_ambientOcclusion.jpg');
    const rocket2NormalTexture = textureLoader.load('/textures/rocket/bodyRocket2/Plastic_normal.jpg');
    const rocket2roughnessTexture = textureLoader.load('/textures/rocket/bodyRocket2/Plastic_roughness.jpg');
    const rollMetrialTexture = textureLoader.load('static/textures/rocket/bodyRocket2/Material_roll.jpg');
    const rollColorTexture = textureLoader.load('/textures/rocket/bodyRocket2/Metal_basecolor.jpg');
    const rollAmbientTexture = textureLoader.load('/textures/rocket/bodyRocket2/Metal_ambientOcclusion.jpg');
    const rollNormalTexture = textureLoader.load('/textures/rocket/bodyRocket2/Metal_normal.jpg');
    const rollroughnessTexture = textureLoader.load('/textures/rocket/bodyRocket2/Metal_roughness.jpg');
    const rocket2 = new THREE.Group()
    scene.add(rocket2);


    const baseColumn1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 1.2, 1, 50),
        new THREE.MeshStandardMaterial({
            map: rollColorTexture,
            normalMap: rollNormalTexture,
            metalnessMap: rollMetrialTexture,
            metalness: 1.1,
            aoMap: rollAmbientTexture,
            roughnessMap: rollroughnessTexture,
            roughness: 32,

        }));

    const body1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 5, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,

        }));

    const roll1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 0.5, 50),
        new THREE.MeshStandardMaterial({
            map: rollColorTexture,
            normalMap: rollNormalTexture,
            metalnessMap: rollMetrialTexture,
            metalness: 1.1,
            aoMap: rollAmbientTexture,
            roughnessMap: rollroughnessTexture,
            roughness: 32,

        }));

    const body2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 3, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,

        }));

    const roll2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 0.5, 50),
        new THREE.MeshStandardMaterial({
            map: rollColorTexture,
            normalMap: rollNormalTexture,
            metalnessMap: rollMetrialTexture,
            metalness: 0.1,
            aoMap: rollAmbientTexture,
            roughnessMap: rollroughnessTexture,
            roughness: 32,


        }));

    const body3 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.5, 1.2, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));

    const roll3 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 1.17, 0.5, 50),
        new THREE.MeshStandardMaterial({
            map: rollColorTexture,
            normalMap: rollNormalTexture,
            metalnessMap: rollMetrialTexture,
            metalness: 0.1,
            aoMap: rollAmbientTexture,
            roughnessMap: rollroughnessTexture,
            roughness: 32,
        }));


    const body4 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.9, 0.7, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));
    const header = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.5, 0.6, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));

    const mFinLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2.5, 0.3),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));
    const mFinRight = new THREE.Mesh(
        new THREE.BoxGeometry(1, 2.7, 0.3),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));
    const engineRight = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.6, 2, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));
    const engineLeft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.6, 2, 50),
        new THREE.MeshStandardMaterial({
            map: rocket2ColorTexture,
            normalMap: rocket2NormalTexture,
            metalnessMap: rocket2MetrialTexture,
            metalness: 0.1,
            aoMap: rocket2AmbientTexture,
            roughnessMap: rocket2roughnessTexture,
            roughness: 32,
        }));


    baseColumn1.position.y = 2.5;
    body1.position.y = 5;
    roll1.position.y = 7.76;
    body2.position.y = 9.5;
    roll2.position.y = 11.2;
    body3.position.y = 12;
    roll3.position.y = 12.7;
    body4.position.y = 13.3;
    header.position.y = 13.8;
    mFinLeft.position.set(0, 5, 2);
    mFinLeft.rotateX(90);
    mFinLeft.rotateY(11);
    mFinRight.position.set(0, 5, -2);
    mFinRight.rotateX(180);
    mFinRight.rotateY(11);
    engineLeft.position.set(0, 4.5, 3);
    rocket2.position.y = 4;
    engineRight.position.set(0, 4.5, -3);
    rocket2.position.y = up;

    rocket2.add(baseColumn1);
    rocket2.add(body1);
    rocket2.add(roll1);
    rocket2.add(body2);
    rocket2.add(roll2);
    rocket2.add(body3);
    rocket2.add(roll3);
    rocket2.add(body4);
    rocket2.add(header);
    rocket2.add(mFinLeft);
    rocket2.add(mFinRight);
    rocket2.add(engineLeft);
    rocket2.add(engineRight);
    rocket2.position.y = 0;
    window.addEventListener('keypress', (event) => {
        switch (event.key) {
            case 'w':
                rocket2.position.y++;
                break;
            case 's':
                rocket2.position.y--;
                break;

        }
    })
}

const CreateRocket3 = () => {

    const rocket3MetrialTexture = textureLoader.load('static/textures/rocket/bodyRocket3/Material.jpg');
    const rocket3ColorTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_basecolor.jpg');
    const rocket3AmbientTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_ambientOcclusion.jpg');
    const rocket3MetaliicTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_metallic.jpg');
    const rocket3HeightTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_height.png');
    const rocket3NormalTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_normal.jpg');
    const rocket3roughnessTexture = textureLoader.load('/textures/rocket/bodyRocket3/Metal_roughness.jpg');


    const baseMetrialTexture = textureLoader.load('static/textures/rocket/bodyRocket3/Material_Base.jpg');
    const baseColorTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_basecolor.jpg');
    const baseAmbientTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_ambientOcclusion.jpg');
    const baseMetaliicTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_metallic.jpg');
    const baseHeightTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_height.png');
    const baseNormalTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_normal.jpg');
    const baseroughnessTexture = textureLoader.load('/textures/rocket/bodyRocket3/Base_roughness.jpg');

    const rocket3 = new THREE.Group()
    scene.add(rocket3)

    const baseRocket = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 2, 50),
        new THREE.MeshStandardMaterial({
            map: baseColorTexture,
            normalMap: baseNormalTexture,
            metalnessMap: baseMetrialTexture,
            metalness: 1.1,
            aoMap: baseAmbientTexture,
            roughnessMap: baseroughnessTexture,
            roughness: 2,

        }));

    const baseColumn1 = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1.44, 0.3, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 2,

        }));

    const Column = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 2, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 2,

        }));

    const baseColumn2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.44, 1, 0.3, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 2,

        }));

    const bodyRocket = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.5, 6, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 2,

        }));

    const bodyRocket2 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.3, 1.5, 2, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 2,

        }));

    const bodyRocket3 = new THREE.Mesh(
        new THREE.CylinderGeometry(1.1, 1.3, 1.5, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            // aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 12,

        }));

    const HeaderRocket1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.9, 1.1, 1, 50),
        new THREE.MeshStandardMaterial({
            map: rocket3ColorTexture,
            normalMap: rocket3NormalTexture,
            metalnessMap: rocket3MetrialTexture,
            metalness: 1.1,
            //   aoMap: rocket3AmbientTexture,
            roughnessMap: rocket3roughnessTexture,
            roughness: 12,

        }));

    const HeaderRocket2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.9, 0.6, 50),
        new THREE.MeshStandardMaterial({
            map: baseColorTexture,
            normalMap: baseNormalTexture,
            metalnessMap: baseMetrialTexture,
            metalness: 1.1,
            aoMap: baseAmbientTexture,
            roughnessMap: baseroughnessTexture,
            roughness: 2,
        }));

    const HeaderRocket3 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.6, 0.4, 50),
        new THREE.MeshStandardMaterial({
            map: baseColorTexture,
            normalMap: baseNormalTexture,
            metalnessMap: baseMetrialTexture,
            metalness: 1.1,
            aoMap: baseAmbientTexture,
            roughnessMap: baseroughnessTexture,
            roughness: 2,
        }));

    baseRocket.position.y = 5;
    baseColumn1.position.y = 6.2;
    baseColumn2.position.y = 8.2;
    Column.position.y = 7.2;
    bodyRocket.position.y = 11.34;
    bodyRocket2.position.y = 15.34;
    bodyRocket3.position.y = 17;
    HeaderRocket1.position.y = 18.2;
    HeaderRocket2.position.y = 19;
    HeaderRocket3.position.y = 19.5;
    rocket3.add(baseRocket);
    rocket3.add(baseColumn1);
    rocket3.add(baseColumn2);
    rocket3.add(Column);
    rocket3.add(bodyRocket);
    rocket3.add(bodyRocket2);
    rocket3.add(bodyRocket3);
    rocket3.add(HeaderRocket1);
    rocket3.add(HeaderRocket2);
    rocket3.add(HeaderRocket3);


}

const createLaunch = () => {

    const launchColorTexture = textureLoader.load('/textures/launchpad/launch2/Wall_basecolor.jpg');
    const launchHeightTexture = textureLoader.load('/textures/launchpad/launch2/Wall_height.png');
    const launchNormalTexture = textureLoader.load('/textures/launchpad/launch2/Wall_normal.jpg');
    const launchRoughnessTexture = textureLoader.load('/textures/launchpad/launch2/Wall_roughness.jpg');
    const launchMetrialTexture = textureLoader.load('/textures/launchpad/launch2/Material.jpg');
    // Group
    const lunch = new THREE.Group()
    scene.add(lunch);

    const base = new THREE.Mesh(new THREE.BoxBufferGeometry(10, 5, 10),
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


    lunch.add(base);

    base.position.y = -0.5;

}

const createLaunch1 = () => {

    const launchColorTexture = textureLoader.load('/textures/launchpad/launch1/Wall_BaseColor.jpg');
    const launchHeightTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Height.png');
    const launchNormalTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Normal.jpg');
    const launchRoughnessTexture = textureLoader.load('/textures/launchpad/launch1/Wall_Roughness.jpg');
    const launchMetrialTexture = textureLoader.load('/textures/launchpad/launch1/Wall_metrial.jpg');
    // Group
    const lunch = new THREE.Group()
    scene.add(lunch);

    const base = new THREE.Mesh(new THREE.BoxBufferGeometry(9, 6, 9.5),
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

    base.position.y = 3;
    base1.position.z = 2.8;
    base1.position.y = 1.5;

}

/**
 * Galaxy
 */

const generateGalaxy = () => {
    // Destroy old galaxy
    if (points !== null) {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()

    const positions = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)

    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
        // Position
        const i3 = i * 9

        const radius = Math.random() * parameters.radius

        const spinAngle = radius * parameters.spin
        const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

        const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
        const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius * 200
        const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX * 12
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

        // Color
        const mixedColor = colorInside.clone()
        mixedColor.lerp(colorOutside, radius / parameters.radius)

        colors[i3] = mixedColor.r
        colors[i3 + 1] = mixedColor.g
        colors[i3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 4))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    /**
     * Material
     */
    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    points.position.y = 33;
    scene.add(points)
}




gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)

generateGalaxy();


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera.position.x = 12
camera.position.y = 4
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true



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




const tick = () => {


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


}

tick()