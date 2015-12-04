var container;
var camera, scene, renderer;
var group;
var targetRotation = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 75, 500);
    scene.add(camera);
    var light = new THREE.PointLight(0xffffff, 1.2, -50);
    light.add(new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 8), new THREE.MeshBasicMaterial({
        color: 0xff0040
    })));
    light.position.set(0, 0, 55);
    scene.add(light);
    group = new THREE.Group();
    scene.add(group);

    function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
            color: color
        }));
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.scale.set(s, s, s);
        group.add(mesh);
    }
    var len = 100;
    var t1 = new THREE.Shape();
    t1.moveTo(-len, 0);
    t1.lineTo(0, 0);
    t1.lineTo(-len / 2, len);
    t1.lineTo(-len, 0);
    var t2 = new THREE.Shape();
    t2.moveTo(0, 0);
    t2.lineTo(len, 0);
    t2.lineTo(len / 2, len);
    t2.lineTo(0, 0);
    var t3 = new THREE.Shape();
    t3.moveTo(-len / 2, len);
    t3.lineTo(len / 2, len);
    t3.lineTo(0, len * 2);
    t3.lineTo(-len / 2, len);
    var circleRadius = 125;
    var c = new THREE.Shape();
    c.moveTo(0, circleRadius);
    c.quadraticCurveTo(circleRadius, circleRadius, circleRadius, 0);
    c.quadraticCurveTo(circleRadius, -circleRadius, 0, -circleRadius);
    c.quadraticCurveTo(-circleRadius, -circleRadius, -circleRadius, 0);
    c.quadraticCurveTo(-circleRadius, circleRadius, 0, circleRadius);
    var extrudeSettings = {
        amount: 10,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 4,
        bevelSize: 1,
        bevelThickness: 10
    };
    var e = {
        amount: 1,
        bevelEnabled: false,
        bevelSegments: 1,
        steps: 1,
        bevelSize: 1,
        bevelThickness: 1
    };
    addShape(t1, extrudeSettings, 0xFFDB00, 0, 0, 0, 0, 0, 0, 1);
    addShape(t2, extrudeSettings, 0xFFDB00, 0, 0, 0, 0, 0, 0, 1);
    addShape(t3, extrudeSettings, 0xFFDB00, 0, 0, 0, 0, 0, 0, 1);
    addShape(c, e, 0X245614, 0, -25, 0, Math.PI / 2, 0, 0, 4);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    container.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
    renderer.render(scene, camera);
    targetRotation += 0.01;
}