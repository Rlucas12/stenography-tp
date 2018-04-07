class Stego {

  constructor(image) {
    this.text_in_image("Can you decode myself ?");
  }

  text_in_image(text) {
    var array = this.encode_image(this.text_to_binary(text), image);
    this.redo_image_from_pixelArray(this.binArray_to_RGBArray(array));
  }

  text_to_binary(text) {
    var output = "";
    var input = text;
    for (var i = 0; i < input.length; i++) {
      var bin = input[i].charCodeAt(0).toString(2);
      while (bin.length < 8) {
        bin = '0' + bin;
      }
      output += bin;
    }
    return output;
  }

  binary_to_text(text) {
    var output = '';
    
    text.match(/.{8}/g).map(function(bin) {
      output += String.fromCharCode(parseInt(bin, 2));
    });
    return output;
  }

  image_to_binary(image) {
    var binArray = [];
    
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.drawImage(image, 0, 0)

    var data = context.getImageData(0,0,image.width,image.height).data
        
    for (let i = 0; i < data.length; i++) {
      var bin = data[i];
      binArray.push(bin.toString(2))
    }
    return binArray;
  }

  binary_to_image(text) {}

  pixel_value_from_binary(binArray) {
    var array = [];
    for (var bin in binArray) {
      array.push(String.fromCharCode(parseInt(bin, 2)));
    }
    return array;
  }

  encode_image(text, image) {
    var binArrayImage = this.image_to_binary(image);
    for (let i = 0; i < text.length; i++) {
      var charToAdd = text.charAt(i);
      binArrayImage[i] = binArrayImage[i].slice(0, -1) + charToAdd;
    }
    return binArrayImage;
  }

  decode_image(image) {
    
  }

  binArray_to_RGBArray(binArray) {
    var pixelArray = [[]];
    for (let i = 0; i < binArray.length; i++) {
      pixelArray.push(parseInt(binArray[i],2).toString(10))
    }
    return pixelArray;
  }

  redo_image_from_pixelArray(pixelArray) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var imgData = ctx.createImageData(48, 48);

    var concatArray = pixelArray.reduce((acc, val) => acc.concat(val), []);
    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i+0] = concatArray[i+0];
        imgData.data[i+1] = concatArray[i+1];
        imgData.data[i+2] = concatArray[i+2];
        imgData.data[i+3] = 255;
    }
    ctx.putImageData(imgData, 10, 10);
  }

}

var image = new Image();
image.crossOrigin = "Anonymous";
image.src = "https://yt3.ggpht.com/-sMZCSoz7e-0/AAAAAAAAAAI/AAAAAAAAAAA/4xEvyFgYV68/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
image.onload = function() {
  const stego = new Stego(image);
}
