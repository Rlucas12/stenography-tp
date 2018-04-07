class Stego {

  constructor(image) {
    this.text_in_image("Can you decode myself ?");
  }

  text_in_image(text) {
    var array = this.encode_image(this.text_to_binary(text), image);
    this.decode_image(array);
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
          
      for (var x = 1; x < image.width; x++) {
        for (var y = 1; y < image.height; y++) {
          var canvasColor = context.getImageData(x, y, 1, 1).data; // rgba e [0,255]
          var r = canvasColor[0];
          var g = canvasColor[1];
          var b = canvasColor[2];  
  
          binArray.push(this.pixel_binary_value(r,g,b));
        }
      }

      return binArray;
  }

  binary_to_image(text) {}

  pixel_binary_value(r,g,b) {
    var output = [];
    
    output.push(r.toString(2));
    output.push(g.toString(2));
    output.push(b.toString(2));

    return output;
  }

  pixel_value_from_binary(binArray) {
    var array = [];
    for (var bin in binArray) {
      array.push(String.fromCharCode(parseInt(bin, 2)));
    }
    return array;
  }

  encode_image(text, image) {
    var binArrayImage = this.image_to_binary(image);
    var binHidden = text;
    var length = binHidden.length;
    for (var i = 0; i < length; i++) {
      var charToAdd = binHidden.charAt(i);
      binArrayImage[i][binArrayImage[i].length-1] = binArrayImage[i][binArrayImage[i].length-1].slice(0, -1) + charToAdd;
    }
    console.log(binArrayImage)
    return binArrayImage;
  }

  decode_image(binArray) {
    var toDecode = "";
    binArray.forEach(function(bin) {
      toDecode += bin[bin.length-1].slice(-1);
    }, this);

    var output = this.binary_to_text(toDecode);
    console.log(output);
  }

}

var image = new Image();
image.crossOrigin = "Anonymous";
image.src = "https://yt3.ggpht.com/-sMZCSoz7e-0/AAAAAAAAAAI/AAAAAAAAAAA/4xEvyFgYV68/s48-c-k-no-mo-rj-c0xffffff/photo.jpg";
image.onload = function() {
  const stego = new Stego(image);
}
