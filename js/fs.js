let camera, scene, renderer, mesh;

init();
animate();

var globalObject;

function init() {
  var linebreak = document.createElement("br");

  var buttonLoadFile = document.getElementById("apply");
  buttonLoadFile.onclick = applyTexture;

  //create scene for 3D model
  //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera = new THREE.PerspectiveCamera(45, 2, 0.1, 100);
  camera.position.z = 1;
  scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  //Load default textures
  var tLoader = new THREE.TextureLoader();
  var texture1 = tLoader.load('img.jpg');
  var material1 = new THREE.MeshPhongMaterial({map: texture1});

  //Create 3D model
  //load gltf file
  var gLoader = new THREE.GLTFLoader();

  gLoader.load('sock.gltf', function ( gltf ) {
    scene.add( gltf.scene );
    globalObject = gltf.scene;
    }
  );

  camera.position.set(0, 0, -.5);
  camera.lookAt(new THREE.Vector3(0,1.8,0));

  renderer = new THREE.WebGLRenderer();
  var rendWidth = window.innerWidth * 0.8;
  var rendHeight = window.innerHeight * 0.8;
  if (rendWidth > rendHeight)
    renderer.setSize(window.innerHeight, rendHeight);
  else
    renderer.setSize(window.innerWidth, rendWidth);


  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  //document.body.appendChild(renderer.domElement);
  document.getElementById("canvasHolder").appendChild(renderer.domElement);

  //add controls to rotate
  controls = new THREE.OrbitControls (camera, renderer.domElement);
  controls.target = new THREE.Vector3(0,.15,0);
  controls.update();

  //grid for measurements
  /*
  var gridXZ = new THREE.GridHelper(100, 10);
  gridXZ.setColors( new THREE.Color('black'), new THREE.Color('black') );
  scene.add(gridXZ);
  */

  function applyTexture()
  {
    console.log("function applyTexture called");
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0)
    {
      var fileToLoad = filesSelected[0];

      if (fileToLoad.type.match("image.*"))
      {
        var fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent)
        {
          var tLoader2 = new THREE.TextureLoader();
          newTexture = tLoader2.load(fileLoadedEvent.target.result);
          newTexture.flipY = false;

          var colorSelector = document.getElementById("color");
          var strColorChoice = colorSelector.options[colorSelector.selectedIndex].text;
          console.log(strColorChoice);

          globalObject.traverse ( ( o ) => {
            if ( o.isMesh){
              o.material.map = newTexture;
            }
            if ( o.isMesh){
              if ( o.material.name == "heelToe" )
                o.material.color.set(strColorChoice.toLowerCase());
            }
          } );
        };
        fileReader.readAsDataURL(fileToLoad);
      }
    }
  }
}


function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

}
