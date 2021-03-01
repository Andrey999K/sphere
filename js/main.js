let scene, camera, renderer, sphereCamera;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 400, 1000);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    let urls = [
        'img/posx.jpg', 'img/negx.jpg',
        'img/posy.jpg', 'img/negy.jpg',
        'img/posz.jpg', 'img/negz.jpg',
    ];
    let loader = new THREE.CubeTextureLoader();
    scene.background = loader.load(urls);

    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter
    });

    sphereCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
    sphereCamera.position.set(0, 100, 0);
    scene.add(sphereCamera);

    let sphereMaterial = new THREE.MeshBasicMaterial({
        envMap: sphereCamera.renderTarget
    });
    let sphereGeo = new THREE.SphereGeometry(350, 50, 50);
    let sphere = new THREE.Mesh(sphereGeo, sphereMaterial);
    sphere.position.set(0, 100, 0);
    scene.add(sphere);

    render();
}

function render() {
    renderer.render(scene, camera);
    sphereCamera.update(renderer, scene);
    requestAnimationFrame(render);
}
init();