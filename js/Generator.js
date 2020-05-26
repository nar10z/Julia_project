var Generator = function () {
  function Generator(examples) {
    var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
    this.minLength = minLength;
    this.examples = examples;
    this.order = order;
    this.used = [];
    var arr = examples.map(function (el) {
      return el.toUpperCase();
    });
    this.examples = arr;
    var data = {};
    arr.forEach(function (word) {
      var l = word.length;

      for (var letter = 0; letter < l - order; letter++) {
        var token = word.substr(letter, order);

        if (!(token in data)) {
          data[token] = [];
        }

        data[token].push(word.substr(letter + order, 1));
      }
    });
    this.data = data;
  }

  var _proto = Generator.prototype;

  _proto.genName = function genName() {
    var s = "";

    do {
      var n = this.getRandom(0, this.examples.length);
      var name = this.examples[n];
      var nameLength = name.length;
      s = name.substr(this.getRandom(0, nameLength - this.order - 1), this.order);

      while (s.length < nameLength) {
        var token = s.substr(s.length - this.order, this.order);
        var c = this.getLetter(token);

        if (c !== '?') {
          s += this.getLetter(token);
        } else {
          break;
        }
      }

      if (s.indexOf(' ') > -1) {
        var tokens = s.split(' ');
        s = '';

        for (var i in tokens) {
          var _token = tokens[i];

          if (_token === '') {
            continue;
          }

          if (_token.length === 1) {
            tokens[i] = _token.toUpperCase();
          } else {
            var f = _token.substr(0, 1);

            var l = _token.substr(1).toLowerCase();

            tokens[i] = f + l;
          }

          if (s !== '') {
            s += ' ';
          }

          s += tokens[i];
        }
      } else {
        var _f = s.substr(0, 1);

        var _l = s.substr(1).toLowerCase();

        s = _f + _l;
      }
    } while (s.length < this.minLength);

    this.used.push(s);
    return s;
  };

  _proto.getLetter = function getLetter(token) {
    if (!(token in this.data)) {
      return '?';
    }

    var letters = JSON.parse(JSON.stringify(this.data[token]));
    var n = this.getRandom(0, letters.length);
    return letters[n];
  };

  _proto.getRandom = function getRandom() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var max = arguments.length > 1 ? arguments[1] : undefined;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return Generator;
}();