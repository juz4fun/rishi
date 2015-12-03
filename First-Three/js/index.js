function DemoScene() {
    var camera, scene, renderer;
    var geometry, material, mesh;
    var obj = {};
    var self = this;
    var mouseX = 0;
    var mouseY = 0;
    var pointLight
    this.init = function() {
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        geometry = new THREE.CubeGeometry(150, 150, 150);
        material = new THREE.MeshPhongMaterial({
            color: 0x33FFFF,
            wireframe: false
        });
        var mesh;
        for (var i = 0; i < 50; i++) {
            obj['mesh' + i] = new THREE.Mesh(geometry, material);
            scene.add(obj['mesh' + i]);
            mesh = obj['mesh' + i]
            mesh.position.x = ((-window.innerWidth * 2) * Math.random()) + window.innerWidth;
            mesh.position.y = ((-window.innerHeight * 2) * Math.random()) + window.innerHeight;
            mesh.position.z = ((-window.innerHeight * 2) * Math.random()) + window.innerHeight;
            obj['meshZ' + i] = mesh.position.z
        }
        pointLight = new THREE.PointLight(0xFFFFFF, 1, 1000);
        pointLight.position.x = 0;
        pointLight.position.y = 0;
        pointLight.position.z = 500;
        scene.add(pointLight);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        document.addEventListener("mousemove", this.mousemove)
    }
    this.mousemove = function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    }
    this.animate = function() {
        requestAnimationFrame(self.animate);
        for (var i = 0; i < 50; i++) {
            var mesh = obj['mesh' + i];
            var meshZ = obj['meshZ' + i];
            mesh.rotation.x += ((window.innerWidth * .5) - mouseY) * .0001;
            mesh.rotation.y += ((window.innerHeight * .5) - mouseX) * .0002;
            mesh.position.z = meshZ + ((window.innerHeight * .5) - mouseY);
        }
        pointLight.distance = (mouseY * 5) + 500;
        renderer.render(scene, camera);
    }
    this.init();
    this.animate();
}
new DemoScene();
