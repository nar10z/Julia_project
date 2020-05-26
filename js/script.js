function _await(value, then, direct) {
  if (direct) {
    return then ? then(value) : value;
  }

  if (!value || !value.then) {
    value = Promise.resolve(value);
  }

  return then ? value.then(then) : value;
}

var gen = new Generator(examples, 2, 8);

function _async(f) {
  return function () {
    for (var args = [], i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    try {
      return Promise.resolve(f.apply(this, args));
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

$(document).ready(_async(function () {
  var $create_form = $('#create_form');
  var $count_word = $('#count_word');
  var $min_length = $('#min_length');
  var $result = $('#result');
  $create_form.on('submit', function (e) {
    e.preventDefault();
    var count = $count_word.val();
    var min_length = $min_length.val();
    count = Number(count);

    if (isNaN(count)) {
      count = 1;
    }

    min_length = Number(min_length);

    if (isNaN(min_length)) {
      min_length = 4;
    }

    gen.minLength = min_length;
    var res = [];

    for (var i = 0; i < count; i++) {
      res.push(gen.genName());
    }

    var html = '<ul>';
    res.forEach(function (el) {
      html += "<li>".concat(el, "</li>");
    });
    html += '</ul>';
    $result.html(html);
  });
  return _await();
}));