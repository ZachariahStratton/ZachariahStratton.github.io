init();


var canvas = document.getElementById('canvas1');
var context = canvas.getContext('2d');

function init(){
  //Setup "pixelate" button to run pixelateImage function
  var applyPixelate = document.getElementById("apply");
  applyPixelate.onclick = pixelateImage;
}

function pixelateImage() {
  console.log("dsfdsfdfs");
  //Allow input of image
  var filesSelected = document.getElementById("inputFileToLoad").files;

  if (filesSelected.length > 0)
  {
    var fileToLoad = filesSelected[0];

    if (fileToLoad.type.match("image.*"))
    {
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent)
      {
        var img = new Image();
        img.onload = function(){
          context.drawImage(img, 0, 0);
        }
        img.src = fileLoadedEvent.target.result;
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  /*
  //hard coded pixel size, make variable later
  var pixels = 20;
  var newWidth = canvas.width * pixels;
  var newHeight = canvas.height * pixels;

  //draw small version (pixelated)
  context.drawImage(inputImage, 0, 0, newWidth, newHeight);

  context.mozImageSmoothingEnabled = fasle;
  context.imageSmoothingEnabled = false;
  context.drawImage(canvas1, 0, 0, newWidth, newHeight, 0, 0, canvas.width, canvas.height);
  */
}
