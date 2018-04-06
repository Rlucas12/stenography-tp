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
      // context.drawImage(image, 0, 0)
          
      for (var w = 1; w < image.width; w++) {
        for (var h = 1; h < image.height; h++) {
          var canvasColor = context.getImageData(0, 0, w, h).data; // rgba e [0,255]
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
      binArrayImage[i][binArrayImage[i].length-1] = charToAdd;
    }
    return binArrayImage;
  }

  decode_image(binArray) {
    var toDecode = "";
    binArray.forEach(function(bin) {
      toDecode += bin[bin.length-1];
    }, this);

    var output = this.binary_to_text(toDecode);
    console.log(output);
  }

}

var image = new Image();
image.src = "./assets/img/glgb.jpg";
image.onload = function() {
  const stego = new Stego(image);
}
