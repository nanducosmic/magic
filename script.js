let scene, camera, renderer, pieces = [];
const numPieces = 100; // Number of pieces to break into
const slowMotionFactor = 0.05; // Factor to slow down the motion

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('ch.jpg', (texture) => {
        createPieces(texture);
        animate();
    });

    camera.position.z = 5;

    window.addEventListener('resize', onWindowResize, false);
}

function createPieces(texture) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

    for (let i = 0; i < numPieces; i++) {
        const piece = new THREE.Mesh(geometry, material);
        
        // Randomize position
        piece.position.x = (Math.random() - 0.5) * 5;
        piece.position.y = (Math.random() - 0.5) * 5;
        piece.position.z = Math.random() * 5;

        // Randomize rotation
        piece.rotation.z = Math.random() * Math.PI;

        // Scale pieces
        const scale = Math.random() * 0.2 + 0.1; // Random scale between 0.1 and 0.3
        piece.scale.set(scale, scale, scale);

        pieces.push(piece);
        scene.add(piece);
    }

    setTimeout(breakIntoPieces, 2000); // Break after 2 seconds
}

function breakIntoPieces() {
    pieces.forEach(piece => {
        piece.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.5, // Slower horizontal movement
            (Math.random() - 0.5) * 0.5, // Slower vertical movement
            (Math.random() - 0.5) * 0.5  // Slower depth movement
        );
    });
}

function animate() {
    requestAnimationFrame(animate);

    pieces.forEach(piece => {
        piece.position.add(piece.velocity.clone().multiplyScalar(slowMotionFactor)); // Apply slow motion
        piece.rotation.x += 0.01; // Optional rotation
        piece.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
