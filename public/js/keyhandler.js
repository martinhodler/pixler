var KeyHandler = (function KeyHandler() {

  listeners = [];

  register = function(callback) {
    listeners.push(callback);
  };

  keyDown = function(e) {
    var key = getKey(e.keyCode);

    listeners.forEach(function(cb) {
      cb(true, key);
    });
  };

  keyUp = function(e) {
    var key = getKey(e.keyCode);

    listeners.forEach(function(cb) {
      cb(false, key);
    });
  };

  getKey = function(code) {
    if (code >= 49 && code <= 90) {
      return String.fromCharCode(code);
    }

    switch(code) {
      case 8: return 'BACKSPACE';
      case 16: return 'SHIFT';
      case 32: return 'SPACE';
      case 37: return 'ARROW_LEFT';
      case 38: return 'ARROW_UP';
      case 39: return 'ARROW_RIGHT';
      case 40: return 'ARROW_DOWN';
    }
  }

  return {
    register: register,
    keyDown: keyDown,
    keyUp: keyUp
  };

})();

window.addEventListener('keydown', function(e) { KeyHandler.keyDown(e); });
window.addEventListener('keyup', function(e) { KeyHandler.keyUp(e); });
