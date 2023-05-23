function on_message(callback) {
    self.onmessage = function (e) {
        A(callback, [[0, e.data], 0]);
    }
}

function post_message(message) {
    postMessage(message);
}

// This object will hold all exports.
var Haste = {};

/* Thunk
   Creates a thunk representing the given closure.
   Since we want automatic memoization of as many expressions as possible, we
   use a JS object as a sort of tagged pointer, where the member x denotes the
   object actually pointed to. If a "pointer" points to a thunk, it has a
   member 't' which is set to true; if it points to a value, be it a function,
   a value of an algebraic type of a primitive value, it has no member 't'.
*/

function T(f) {
    this.f = new F(f);
}

function F(f) {
    this.f = f;
}

/* Apply
   Applies the function f to the arguments args. If the application is under-
   saturated, a closure is returned, awaiting further arguments. If it is over-
   saturated, the function is fully applied, and the result (assumed to be a
   function) is then applied to the remaining arguments.
*/
function A(f, args) {
    if(f instanceof T) {
        f = E(f);
    }
    // Closure does some funny stuff with functions that occasionally
    // results in non-functions getting applied, so we have to deal with
    // it.
    if(!(f instanceof Function)) {
        return f;
    }

    if(f.arity === undefined) {
        f.arity = f.length;
    }
    if(args.length === f.arity) {
        switch(f.arity) {
            case 0:  return f();
            case 1:  return f(args[0]);
            default: return f.apply(null, args);
        }
    } else if(args.length > f.arity) {
        switch(f.arity) {
            case 0:  return f();
            case 1:  return A(f(args.shift()), args);
            default: return A(f.apply(null, args.splice(0, f.arity)), args);
        }
    } else {
        var g = function() {
            return A(f, args.concat(Array.prototype.slice.call(arguments)));
        };
        g.arity = f.arity - args.length;
        return g;
    }
}

/* Eval
   Evaluate the given thunk t into head normal form.
   If the "thunk" we get isn't actually a thunk, just return it.
*/
function E(t) {
    if(t instanceof T) {
        if(t.f instanceof F) {
            return t.f = t.f.f();
        } else {
            return t.f;
        }
    } else {
        return t;
    }
}

// Export Haste, A and E. Haste because we need to preserve exports, A and E
// because they're handy for Haste.Foreign.
if(!window) {
    var window = {};
}
window['Haste'] = Haste;
window['A'] = A;
window['E'] = E;


/* Throw an error.
   We need to be able to use throw as an exception so we wrap it in a function.
*/
function die(err) {
    throw err;
}

function quot(a, b) {
    return (a-a%b)/b;
}

function quotRemI(a, b) {
    return [0, (a-a%b)/b, a%b];
}

// 32 bit integer multiplication, with correct overflow behavior
// note that |0 or >>>0 needs to be applied to the result, for int and word
// respectively.
function imul(a, b) {
  // ignore high a * high a as the result will always be truncated
  var lows = (a & 0xffff) * (b & 0xffff); // low a * low b
  var aB = (a & 0xffff) * (b & 0xffff0000); // low a * high b
  var bA = (a & 0xffff0000) * (b & 0xffff); // low b * high a
  return lows + aB + bA; // sum will not exceed 52 bits, so it's safe
}

function addC(a, b) {
    var x = a+b;
    return [0, x & 0xffffffff, x > 0x7fffffff];
}

function subC(a, b) {
    var x = a-b;
    return [0, x & 0xffffffff, x < -2147483648];
}

function sinh (arg) {
    return (Math.exp(arg) - Math.exp(-arg)) / 2;
}

function tanh (arg) {
    return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
}

function cosh (arg) {
    return (Math.exp(arg) + Math.exp(-arg)) / 2;
}

// Scratch space for byte arrays.
var rts_scratchBuf = new ArrayBuffer(8);
var rts_scratchW32 = new Uint32Array(rts_scratchBuf);
var rts_scratchFloat = new Float32Array(rts_scratchBuf);
var rts_scratchDouble = new Float64Array(rts_scratchBuf);

function decodeFloat(x) {
    rts_scratchFloat[0] = x;
    var sign = x < 0 ? -1 : 1;
    var exp = ((rts_scratchW32[0] >> 23) & 0xff) - 150;
    var man = rts_scratchW32[0] & 0x7fffff;
    if(exp === 0) {
        ++exp;
    } else {
        man |= (1 << 23);
    }
    return [0, sign*man, exp];
}

function decodeDouble(x) {
    rts_scratchDouble[0] = x;
    var sign = x < 0 ? -1 : 1;
    var manHigh = rts_scratchW32[1] & 0xfffff;
    var manLow = rts_scratchW32[0];
    var exp = ((rts_scratchW32[1] >> 20) & 0x7ff) - 1075;
    if(exp === 0) {
        ++exp;
    } else {
        manHigh |= (1 << 20);
    }
    return [0, sign, manHigh, manLow, exp];
}

function err(str) {
    die(toJSStr(str));
}

/* unpackCString#
   NOTE: update constructor tags if the code generator starts munging them.
*/
function unCStr(str) {return unAppCStr(str, [0]);}

function unFoldrCStr(str, f, z) {
    var acc = z;
    for(var i = str.length-1; i >= 0; --i) {
        acc = A(f, [[0, str.charCodeAt(i)], acc]);
    }
    return acc;
}

function unAppCStr(str, chrs) {
    var i = arguments[2] ? arguments[2] : 0;
    if(i >= str.length) {
        return E(chrs);
    } else {
        return [1,[0,str.charCodeAt(i)],new T(function() {
            return unAppCStr(str,chrs,i+1);
        })];
    }
}

function charCodeAt(str, i) {return str.charCodeAt(i);}

function fromJSStr(str) {
    return unCStr(E(str));
}

function toJSStr(hsstr) {
    var s = '';
    for(var str = E(hsstr); str[0] == 1; str = E(str[2])) {
        s += String.fromCharCode(E(str[1])[1]);
    }
    return s;
}

// newMutVar
function nMV(val) {
    return ({x: val});
}

// readMutVar
function rMV(mv) {
    return mv.x;
}

// writeMutVar
function wMV(mv, val) {
    mv.x = val;
}

// atomicModifyMutVar
function mMV(mv, f) {
    var x = A(f, [mv.x]);
    mv.x = x[1];
    return x[2];
}

function localeEncoding() {
    var le = newByteArr(5);
    le['b']['i8'] = 'U'.charCodeAt(0);
    le['b']['i8'] = 'T'.charCodeAt(0);
    le['b']['i8'] = 'F'.charCodeAt(0);
    le['b']['i8'] = '-'.charCodeAt(0);
    le['b']['i8'] = '8'.charCodeAt(0);
    return le;
}

var isDoubleNaN = isNaN;
var isFloatNaN = isNaN;

function isDoubleInfinite(d) {
    return (d === Infinity);
}
var isFloatInfinite = isDoubleInfinite;

function isDoubleNegativeZero(x) {
    return (x===0 && (1/x)===-Infinity);
}
var isFloatNegativeZero = isDoubleNegativeZero;

function strEq(a, b) {
    return a == b;
}

function strOrd(a, b) {
    if(a < b) {
        return [0];
    } else if(a == b) {
        return [1];
    }
    return [2];
}

function jsCatch(act, handler) {
    try {
        return A(act,[0]);
    } catch(e) {
        return A(handler,[e, 0]);
    }
}

var coercionToken = undefined;

/* Haste represents constructors internally using 1 for the first constructor,
   2 for the second, etc.
   However, dataToTag should use 0, 1, 2, etc. Also, booleans might be unboxed.
 */
function dataToTag(x) {
    if(x instanceof Array) {
        return x[0];
    } else {
        return x;
    }
}

function __word_encodeDouble(d, e) {
    return d * Math.pow(2,e);
}

var __word_encodeFloat = __word_encodeDouble;
var jsRound = Math.round; // Stupid GHC doesn't like periods in FFI IDs...
var realWorld = undefined;
if(typeof _ == 'undefined') {
    var _ = undefined;
}

function popCnt(i) {
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
}

function jsAlert(val) {
    if(typeof alert != 'undefined') {
        alert(val);
    } else {
        print(val);
    }
}

function jsLog(val) {
    console.log(val);
}

function jsPrompt(str) {
    var val;
    if(typeof prompt != 'undefined') {
        val = prompt(str);
    } else {
        print(str);
        val = readline();
    }
    return val == undefined ? '' : val.toString();
}

function jsEval(str) {
    var x = eval(str);
    return x == undefined ? '' : x.toString();
}

function isNull(obj) {
    return obj === null;
}

function jsRead(str) {
    return Number(str);
}

function jsShowI(val) {return val.toString();}
function jsShow(val) {
    var ret = val.toString();
    return val == Math.round(val) ? ret + '.0' : ret;
}

function jsGetMouseCoords(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) 	{
	posx = e.pageX;
	posy = e.pageY;
    }
    else if (e.clientX || e.clientY) 	{
	posx = e.clientX + document.body.scrollLeft
	    + document.documentElement.scrollLeft;
	posy = e.clientY + document.body.scrollTop
	    + document.documentElement.scrollTop;
    }
    return [posx - e.target.offsetLeft, posy - e.target.offsetTop];
}

function jsSetCB(elem, evt, cb) {
    // Count return press in single line text box as a change event.
    if(evt == 'change' && elem.type.toLowerCase() == 'text') {
        setCB(elem, 'keyup', function(k) {
            if(k == '\n'.charCodeAt(0)) {
                A(cb,[[0,k.keyCode],0]);
            }
        });
    }

    var fun;
    switch(evt) {
    case 'click':
    case 'dblclick':
    case 'mouseup':
    case 'mousedown':
        fun = function(x) {
            var mpos = jsGetMouseCoords(x);
            var mx = [0,mpos[0]];
            var my = [0,mpos[1]];
            A(cb,[[0,x.button],[0,mx,my],0]);
        };
        break;
    case 'mousemove':
    case 'mouseover':
        fun = function(x) {
            var mpos = jsGetMouseCoords(x);
            var mx = [0,mpos[0]];
            var my = [0,mpos[1]];
            A(cb,[[0,mx,my],0]);
        };
        break;
    case 'keypress':
    case 'keyup':
    case 'keydown':
        fun = function(x) {A(cb,[[0,x.keyCode],0]);};
        break;        
    default:
        fun = function() {A(cb,[0]);};
        break;
    }
    return setCB(elem, evt, fun);
}

function setCB(elem, evt, cb) {
    if(elem.addEventListener) {
        elem.addEventListener(evt, cb, false);
        return true;
    } else if(elem.attachEvent) {
        elem.attachEvent('on'+evt, cb);
        return true;
    }
    return false;
}

function jsSetTimeout(msecs, cb) {
    window.setTimeout(function() {A(cb,[0]);}, msecs);
}

function jsGet(elem, prop) {
    return elem[prop].toString();
}

function jsSet(elem, prop, val) {
    elem[prop] = val;
}

function jsGetAttr(elem, prop) {
    if(elem.hasAttribute(prop)) {
        return elem.getAttribute(prop).toString();
    } else {
        return "";
    }
}

function jsSetAttr(elem, prop, val) {
    elem.setAttribute(prop, val);
}

function jsGetStyle(elem, prop) {
    return elem.style[prop].toString();
}

function jsSetStyle(elem, prop, val) {
    elem.style[prop] = val;
}

function jsKillChild(child, parent) {
    parent.removeChild(child);
}

function jsClearChildren(elem) {
    while(elem.hasChildNodes()){
        elem.removeChild(elem.lastChild);
    }
}

function jsFind(elem) {
    var e = document.getElementById(elem)
    if(e) {
        return [1,[0,e]];
    }
    return [0];
}

function jsCreateElem(tag) {
    return document.createElement(tag);
}

function jsCreateTextNode(str) {
    return document.createTextNode(str);
}

function jsGetChildBefore(elem) {
    elem = elem.previousSibling;
    while(elem) {
        if(typeof elem.tagName != 'undefined') {
            return [1,[0,elem]];
        }
        elem = elem.previousSibling;
    }
    return [0];
}

function jsGetLastChild(elem) {
    var len = elem.childNodes.length;
    for(var i = len-1; i >= 0; --i) {
        if(typeof elem.childNodes[i].tagName != 'undefined') {
            return [1,[0,elem.childNodes[i]]];
        }
    }
    return [0];
}

function jsGetChildren(elem) {
    var children = [0];
    var len = elem.childNodes.length;
    for(var i = len-1; i >= 0; --i) {
        if(typeof elem.childNodes[i].tagName != 'undefined') {
            children = [1, [0,elem.childNodes[i]], children];
        }
    }
    return children;
}

function jsSetChildren(elem, children) {
    children = E(children);
    jsClearChildren(elem, 0);
    while(children[0] === 1) {
        elem.appendChild(E(E(children[1])[1]));
        children = E(children[2]);
    }
}

function jsAppendChild(child, container) {
    container.appendChild(child);
}

function jsAddChildBefore(child, container, after) {
    container.insertBefore(child, after);
}

var jsRand = Math.random;

// Concatenate a Haskell list of JS strings
function jsCat(strs, sep) {
    var arr = [];
    strs = E(strs);
    while(strs[0]) {
        strs = E(strs);
        arr.push(E(strs[1])[1]);
        strs = E(strs[2]);
    }
    return arr.join(sep);
}

// JSON stringify a string
function jsStringify(str) {
    return JSON.stringify(str);
}

// Parse a JSON message into a Haste.JSON.JSON value.
// As this pokes around inside Haskell values, it'll need to be updated if:
// * Haste.JSON.JSON changes;
// * E() starts to choke on non-thunks;
// * data constructor code generation changes; or
// * Just and Nothing change tags.
function jsParseJSON(str) {
    try {
        var js = JSON.parse(str);
        var hs = toHS(js);
    } catch(_) {
        return [0];
    }
    return [1,hs];
}

function toHS(obj) {
    switch(typeof obj) {
    case 'number':
        return [0, [0, jsRead(obj)]];
    case 'string':
        return [1, [0, obj]];
        break;
    case 'boolean':
        return [2, obj]; // Booleans are special wrt constructor tags!
        break;
    case 'object':
        if(obj instanceof Array) {
            return [3, arr2lst(obj, 0)];
        } else {
            // Object type but not array - it's a dictionary.
            // The RFC doesn't say anything about the ordering of keys, but
            // considering that lots of people rely on keys being "in order" as
            // defined by "the same way someone put them in at the other end,"
            // it's probably a good idea to put some cycles into meeting their
            // misguided expectations.
            var ks = [];
            for(var k in obj) {
                ks.unshift(k);
            }
            var xs = [0];
            for(var i = 0; i < ks.length; i++) {
                xs = [1, [0, [0,ks[i]], toHS(obj[ks[i]])], xs];
            }
            return [4, xs];
        }
    }
}

function arr2lst(arr, elem) {
    if(elem >= arr.length) {
        return [0];
    }
    return [1, toHS(arr[elem]), new T(function() {return arr2lst(arr,elem+1);})]
}

function lst2arr(xs) {
    var arr = [];
    for(; xs[0]; xs = E(xs[2])) {
        arr.push(E(xs[1]));
    }
    return arr;
}

function ajaxReq(method, url, async, postdata, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, async);
    xhr.setRequestHeader('Cache-control', 'no-cache');
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                A(cb,[[1,[0,xhr.responseText]],0]);
            } else {
                A(cb,[[0],0]); // Nothing
            }
        }
    }
    xhr.send(postdata);
}

// Create a little endian ArrayBuffer representation of something.
function toABHost(v, n, x) {
    var a = new ArrayBuffer(n);
    new window[v](a)[0] = x;
    return a;
}

function toABSwap(v, n, x) {
    var a = new ArrayBuffer(n);
    new window[v](a)[0] = x;
    var bs = new Uint8Array(a);
    for(var i = 0, j = n-1; i < j; ++i, --j) {
        var tmp = bs[i];
        bs[i] = bs[j];
        bs[j] = tmp;
    }
    return a;
}

window['toABle'] = toABHost;
window['toABbe'] = toABSwap;

// Swap byte order if host is not little endian.
var buffer = new ArrayBuffer(2);
new DataView(buffer).setInt16(0, 256, true);
if(new Int16Array(buffer)[0] !== 256) {
    window['toABle'] = toABSwap;
    window['toABbe'] = toABHost;
}

// MVar implementation.
// Since Haste isn't concurrent, takeMVar and putMVar don't block on empty
// and full MVars respectively, but terminate the program since they would
// otherwise be blocking forever.

function newMVar() {
    return ({empty: true});
}

function tryTakeMVar(mv) {
    if(mv.empty) {
        return [0, 0, undefined];
    } else {
        var val = mv.x;
        mv.empty = true;
        mv.x = null;
        return [0, 1, val];
    }
}

function takeMVar(mv) {
    if(mv.empty) {
        // TODO: real BlockedOnDeadMVar exception, perhaps?
        err("Attempted to take empty MVar!");
    }
    var val = mv.x;
    mv.empty = true;
    mv.x = null;
    return val;
}

function putMVar(mv, val) {
    if(!mv.empty) {
        // TODO: real BlockedOnDeadMVar exception, perhaps?
        err("Attempted to put full MVar!");
    }
    mv.empty = false;
    mv.x = val;
}

function tryPutMVar(mv, val) {
    if(!mv.empty) {
        return 0;
    } else {
        mv.empty = false;
        mv.x = val;
        return 1;
    }
}

function sameMVar(a, b) {
    return (a == b);
}

function isEmptyMVar(mv) {
    return mv.empty ? 1 : 0;
}

// Implementation of stable names.
// Unlike native GHC, the garbage collector isn't going to move data around
// in a way that we can detect, so each object could serve as its own stable
// name if it weren't for the fact we can't turn a JS reference into an
// integer.
// So instead, each object has a unique integer attached to it, which serves
// as its stable name.

var __next_stable_name = 1;

function makeStableName(x) {
    if(!x.stableName) {
        x.stableName = __next_stable_name;
        __next_stable_name += 1;
    }
    return x.stableName;
}

function eqStableName(x, y) {
    return (x == y) ? 1 : 0;
}

var Integer = function(bits, sign) {
  this.bits_ = [];
  this.sign_ = sign;

  var top = true;
  for (var i = bits.length - 1; i >= 0; i--) {
    var val = bits[i] | 0;
    if (!top || val != sign) {
      this.bits_[i] = val;
      top = false;
    }
  }
};

Integer.IntCache_ = {};

var I_fromInt = function(value) {
  if (-128 <= value && value < 128) {
    var cachedObj = Integer.IntCache_[value];
    if (cachedObj) {
      return cachedObj;
    }
  }

  var obj = new Integer([value | 0], value < 0 ? -1 : 0);
  if (-128 <= value && value < 128) {
    Integer.IntCache_[value] = obj;
  }
  return obj;
};

var I_fromNumber = function(value) {
  if (isNaN(value) || !isFinite(value)) {
    return Integer.ZERO;
  } else if (value < 0) {
    return I_negate(I_fromNumber(-value));
  } else {
    var bits = [];
    var pow = 1;
    for (var i = 0; value >= pow; i++) {
      bits[i] = (value / pow) | 0;
      pow *= Integer.TWO_PWR_32_DBL_;
    }
    return new Integer(bits, 0);
  }
};

var I_fromBits = function(bits) {
  var high = bits[bits.length - 1];
  return new Integer(bits, high & (1 << 31) ? -1 : 0);
};

var I_fromString = function(str, opt_radix) {
  if (str.length == 0) {
    throw Error('number format error: empty string');
  }

  var radix = opt_radix || 10;
  if (radix < 2 || 36 < radix) {
    throw Error('radix out of range: ' + radix);
  }

  if (str.charAt(0) == '-') {
    return I_negate(I_fromString(str.substring(1), radix));
  } else if (str.indexOf('-') >= 0) {
    throw Error('number format error: interior "-" character');
  }

  var radixToPower = I_fromNumber(Math.pow(radix, 8));

  var result = Integer.ZERO;
  for (var i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i);
    var value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = I_fromNumber(Math.pow(radix, size));
      result = I_add(I_mul(result, power), I_fromNumber(value));
    } else {
      result = I_mul(result, radixToPower);
      result = I_add(result, I_fromNumber(value));
    }
  }
  return result;
};


Integer.TWO_PWR_32_DBL_ = (1 << 16) * (1 << 16);
Integer.ZERO = I_fromInt(0);
Integer.ONE = I_fromInt(1);
Integer.TWO_PWR_24_ = I_fromInt(1 << 24);

var I_toInt = function(self) {
  return self.bits_.length > 0 ? self.bits_[0] : self.sign_;
};

var I_toWord = function(self) {
  return I_toInt(self) >>> 0;
};

var I_toNumber = function(self) {
  if (isNegative(self)) {
    return -I_toNumber(I_negate(self));
  } else {
    var val = 0;
    var pow = 1;
    for (var i = 0; i < self.bits_.length; i++) {
      val += I_getBitsUnsigned(self, i) * pow;
      pow *= Integer.TWO_PWR_32_DBL_;
    }
    return val;
  }
};

var I_getBits = function(self, index) {
  if (index < 0) {
    return 0;
  } else if (index < self.bits_.length) {
    return self.bits_[index];
  } else {
    return self.sign_;
  }
};

var I_getBitsUnsigned = function(self, index) {
  var val = I_getBits(self, index);
  return val >= 0 ? val : Integer.TWO_PWR_32_DBL_ + val;
};

var getSign = function(self) {
  return self.sign_;
};

var isZero = function(self) {
  if (self.sign_ != 0) {
    return false;
  }
  for (var i = 0; i < self.bits_.length; i++) {
    if (self.bits_[i] != 0) {
      return false;
    }
  }
  return true;
};

var isNegative = function(self) {
  return self.sign_ == -1;
};

var isOdd = function(self) {
  return (self.bits_.length == 0) && (self.sign_ == -1) ||
         (self.bits_.length > 0) && ((self.bits_[0] & 1) != 0);
};

var I_equals = function(self, other) {
  if (self.sign_ != other.sign_) {
    return false;
  }
  var len = Math.max(self.bits_.length, other.bits_.length);
  for (var i = 0; i < len; i++) {
    if (I_getBits(self, i) != I_getBits(other, i)) {
      return false;
    }
  }
  return true;
};

var I_notEquals = function(self, other) {
  return !I_equals(self, other);
};

var I_greaterThan = function(self, other) {
  return I_compare(self, other) > 0;
};

var I_greaterThanOrEqual = function(self, other) {
  return I_compare(self, other) >= 0;
};

var I_lessThan = function(self, other) {
  return I_compare(self, other) < 0;
};

var I_lessThanOrEqual = function(self, other) {
  return I_compare(self, other) <= 0;
};

var I_compare = function(self, other) {
  var diff = I_sub(self, other);
  if (isNegative(diff)) {
    return -1;
  } else if (isZero(diff)) {
    return 0;
  } else {
    return +1;
  }
};

var I_compareInt = function(self, other) {
  return I_compare(self, I_fromInt(other));
}

var shorten = function(self, numBits) {
  var arr_index = (numBits - 1) >> 5;
  var bit_index = (numBits - 1) % 32;
  var bits = [];
  for (var i = 0; i < arr_index; i++) {
    bits[i] = I_getBits(self, i);
  }
  var sigBits = bit_index == 31 ? 0xFFFFFFFF : (1 << (bit_index + 1)) - 1;
  var val = I_getBits(self, arr_index) & sigBits;
  if (val & (1 << bit_index)) {
    val |= 0xFFFFFFFF - sigBits;
    bits[arr_index] = val;
    return new Integer(bits, -1);
  } else {
    bits[arr_index] = val;
    return new Integer(bits, 0);
  }
};

var I_negate = function(self) {
  return I_add(not(self), Integer.ONE);
};

var I_add = function(self, other) {
  var len = Math.max(self.bits_.length, other.bits_.length);
  var arr = [];
  var carry = 0;

  for (var i = 0; i <= len; i++) {
    var a1 = I_getBits(self, i) >>> 16;
    var a0 = I_getBits(self, i) & 0xFFFF;

    var b1 = I_getBits(other, i) >>> 16;
    var b0 = I_getBits(other, i) & 0xFFFF;

    var c0 = carry + a0 + b0;
    var c1 = (c0 >>> 16) + a1 + b1;
    carry = c1 >>> 16;
    c0 &= 0xFFFF;
    c1 &= 0xFFFF;
    arr[i] = (c1 << 16) | c0;
  }
  return I_fromBits(arr);
};

var I_sub = function(self, other) {
  return I_add(self, I_negate(other));
};

var I_mul = function(self, other) {
  if (isZero(self)) {
    return Integer.ZERO;
  } else if (isZero(other)) {
    return Integer.ZERO;
  }

  if (isNegative(self)) {
    if (isNegative(other)) {
      return I_mul(I_negate(self), I_negate(other));
    } else {
      return I_negate(I_mul(I_negate(self), other));
    }
  } else if (isNegative(other)) {
    return I_negate(I_mul(self, I_negate(other)));
  }

  if (I_lessThan(self, Integer.TWO_PWR_24_) &&
      I_lessThan(other, Integer.TWO_PWR_24_)) {
    return I_fromNumber(I_toNumber(self) * I_toNumber(other));
  }

  var len = self.bits_.length + other.bits_.length;
  var arr = [];
  for (var i = 0; i < 2 * len; i++) {
    arr[i] = 0;
  }
  for (var i = 0; i < self.bits_.length; i++) {
    for (var j = 0; j < other.bits_.length; j++) {
      var a1 = I_getBits(self, i) >>> 16;
      var a0 = I_getBits(self, i) & 0xFFFF;

      var b1 = I_getBits(other, j) >>> 16;
      var b0 = I_getBits(other, j) & 0xFFFF;

      arr[2 * i + 2 * j] += a0 * b0;
      Integer.carry16_(arr, 2 * i + 2 * j);
      arr[2 * i + 2 * j + 1] += a1 * b0;
      Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 1] += a0 * b1;
      Integer.carry16_(arr, 2 * i + 2 * j + 1);
      arr[2 * i + 2 * j + 2] += a1 * b1;
      Integer.carry16_(arr, 2 * i + 2 * j + 2);
    }
  }

  for (var i = 0; i < len; i++) {
    arr[i] = (arr[2 * i + 1] << 16) | arr[2 * i];
  }
  for (var i = len; i < 2 * len; i++) {
    arr[i] = 0;
  }
  return new Integer(arr, 0);
};

Integer.carry16_ = function(bits, index) {
  while ((bits[index] & 0xFFFF) != bits[index]) {
    bits[index + 1] += bits[index] >>> 16;
    bits[index] &= 0xFFFF;
  }
};

var I_mod = function(self, other) {
  return I_rem(I_add(other, I_rem(self, other)), other);
}

var I_div = function(self, other) {
  if(I_greaterThan(self, Integer.ZERO) != I_greaterThan(other, Integer.ZERO)) {
    if(I_rem(self, other) != Integer.ZERO) {
      return I_sub(I_quot(self, other), Integer.ONE);
    }
  }
  return I_quot(self, other);
}

var I_quotRem = function(self, other) {
  return [0, I_quot(self, other), I_rem(self, other)];
}

var I_divMod = function(self, other) {
  return [0, I_div(self, other), I_mod(self, other)];
}

var I_quot = function(self, other) {
  if (isZero(other)) {
    throw Error('division by zero');
  } else if (isZero(self)) {
    return Integer.ZERO;
  }

  if (isNegative(self)) {
    if (isNegative(other)) {
      return I_quot(I_negate(self), I_negate(other));
    } else {
      return I_negate(I_quot(I_negate(self), other));
    }
  } else if (isNegative(other)) {
    return I_negate(I_quot(self, I_negate(other)));
  }

  var res = Integer.ZERO;
  var rem = self;
  while (I_greaterThanOrEqual(rem, other)) {
    var approx = Math.max(1, Math.floor(I_toNumber(rem) / I_toNumber(other)));
    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);
    var approxRes = I_fromNumber(approx);
    var approxRem = I_mul(approxRes, other);
    while (isNegative(approxRem) || I_greaterThan(approxRem, rem)) {
      approx -= delta;
      approxRes = I_fromNumber(approx);
      approxRem = I_mul(approxRes, other);
    }

    if (isZero(approxRes)) {
      approxRes = Integer.ONE;
    }

    res = I_add(res, approxRes);
    rem = I_sub(rem, approxRem);
  }
  return res;
};

var I_rem = function(self, other) {
  return I_sub(self, I_mul(I_quot(self, other), other));
};

var not = function(self) {
  var len = self.bits_.length;
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = ~self.bits_[i];
  }
  return new Integer(arr, ~self.sign_);
};

var I_and = function(self, other) {
  var len = Math.max(self.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = I_getBits(self, i) & I_getBits(other, i);
  }
  return new Integer(arr, self.sign_ & other.sign_);
};

var I_or = function(self, other) {
  var len = Math.max(self.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = I_getBits(self, i) | I_getBits(other, i);
  }
  return new Integer(arr, self.sign_ | other.sign_);
};

var I_xor = function(self, other) {
  var len = Math.max(self.bits_.length, other.bits_.length);
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr[i] = I_getBits(self, i) ^ I_getBits(other, i);
  }
  return new Integer(arr, self.sign_ ^ other.sign_);
};

var I_shiftLeft = function(self, numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = self.bits_.length + arr_delta + (bit_delta > 0 ? 1 : 0);
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = (I_getBits(self, i - arr_delta) << bit_delta) |
               (I_getBits(self, i - arr_delta - 1) >>> (32 - bit_delta));
    } else {
      arr[i] = I_getBits(self, i - arr_delta);
    }
  }
  return new Integer(arr, self.sign_);
};

var I_shiftRight = function(self, numBits) {
  var arr_delta = numBits >> 5;
  var bit_delta = numBits % 32;
  var len = self.bits_.length - arr_delta;
  var arr = [];
  for (var i = 0; i < len; i++) {
    if (bit_delta > 0) {
      arr[i] = (I_getBits(self, i + arr_delta) >>> bit_delta) |
               (I_getBits(self, i + arr_delta + 1) << (32 - bit_delta));
    } else {
      arr[i] = I_getBits(self, i + arr_delta);
    }
  }
  return new Integer(arr, self.sign_);
};

var I_signum = function(self) {
  var cmp = I_compare(self, Integer.ZERO);
  if(cmp > 0) {
    return Integer.ONE
  }
  if(cmp < 0) {
    return I_sub(Integer.ZERO, Integer.ONE);
  }
  return Integer.ZERO;
};

var I_abs = function(self) {
  if(I_compare(self, Integer.ZERO) < 0) {
    return I_sub(Integer.ZERO, self);
  }
  return self;
};

var I_decodeDouble = function(x) {
  var dec = decodeDouble(x);
  var mantissa = I_fromBits([dec[3], dec[2]]);
  if(dec[1] < 0) {
    mantissa = I_negate(mantissa);
  }
  return [0, dec[4], mantissa];
}

var I_toString = function(self) {
  var radix = 10;

  if (isZero(self)) {
    return '0';
  } else if (isNegative(self)) {
    return '-' + I_toString(I_negate(self));
  }

  var radixToPower = I_fromNumber(Math.pow(radix, 6));

  var rem = self;
  var result = '';
  while (true) {
    var remDiv = I_div(rem, radixToPower);
    var intval = I_toInt(I_sub(rem, I_mul(remDiv, radixToPower)));
    var digits = intval.toString();

    rem = remDiv;
    if (isZero(rem)) {
      return digits + result;
    } else {
      while (digits.length < 6) {
        digits = '0' + digits;
      }
      result = '' + digits + result;
    }
  }
};

var I_fromRat = function(a, b) {
    return I_toNumber(a) / I_toNumber(b);
}

function I_fromInt64(x) {
    return I_fromBits([x.getLowBits(), x.getHighBits()]);
}

function I_toInt64(x) {
    return Long.fromBits(I_getBits(x, 0), I_getBits(x, 1));
}

function I_fromWord64(x) {
    return x;
}

function I_toWord64(x) {
    return I_rem(I_add(__w64_max, x), __w64_max);
}

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var Long = function(low, high) {
  this.low_ = low | 0;
  this.high_ = high | 0;
};

Long.IntCache_ = {};

Long.fromInt = function(value) {
  if (-128 <= value && value < 128) {
    var cachedObj = Long.IntCache_[value];
    if (cachedObj) {
      return cachedObj;
    }
  }

  var obj = new Long(value | 0, value < 0 ? -1 : 0);
  if (-128 <= value && value < 128) {
    Long.IntCache_[value] = obj;
  }
  return obj;
};

Long.fromNumber = function(value) {
  if (isNaN(value) || !isFinite(value)) {
    return Long.ZERO;
  } else if (value <= -Long.TWO_PWR_63_DBL_) {
    return Long.MIN_VALUE;
  } else if (value + 1 >= Long.TWO_PWR_63_DBL_) {
    return Long.MAX_VALUE;
  } else if (value < 0) {
    return Long.fromNumber(-value).negate();
  } else {
    return new Long(
        (value % Long.TWO_PWR_32_DBL_) | 0,
        (value / Long.TWO_PWR_32_DBL_) | 0);
  }
};

Long.fromBits = function(lowBits, highBits) {
  return new Long(lowBits, highBits);
};

Long.TWO_PWR_16_DBL_ = 1 << 16;
Long.TWO_PWR_24_DBL_ = 1 << 24;
Long.TWO_PWR_32_DBL_ =
    Long.TWO_PWR_16_DBL_ * Long.TWO_PWR_16_DBL_;
Long.TWO_PWR_31_DBL_ =
    Long.TWO_PWR_32_DBL_ / 2;
Long.TWO_PWR_48_DBL_ =
    Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_16_DBL_;
Long.TWO_PWR_64_DBL_ =
    Long.TWO_PWR_32_DBL_ * Long.TWO_PWR_32_DBL_;
Long.TWO_PWR_63_DBL_ =
    Long.TWO_PWR_64_DBL_ / 2;
Long.ZERO = Long.fromInt(0);
Long.ONE = Long.fromInt(1);
Long.NEG_ONE = Long.fromInt(-1);
Long.MAX_VALUE =
    Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);
Long.MIN_VALUE = Long.fromBits(0, 0x80000000 | 0);
Long.TWO_PWR_24_ = Long.fromInt(1 << 24);

Long.prototype.toInt = function() {
  return this.low_;
};

Long.prototype.toNumber = function() {
  return this.high_ * Long.TWO_PWR_32_DBL_ +
         this.getLowBitsUnsigned();
};

Long.prototype.getHighBits = function() {
  return this.high_;
};

Long.prototype.getLowBits = function() {
  return this.low_;
};

Long.prototype.getLowBitsUnsigned = function() {
  return (this.low_ >= 0) ?
      this.low_ : Long.TWO_PWR_32_DBL_ + this.low_;
};

Long.prototype.isZero = function() {
  return this.high_ == 0 && this.low_ == 0;
};

Long.prototype.isNegative = function() {
  return this.high_ < 0;
};

Long.prototype.isOdd = function() {
  return (this.low_ & 1) == 1;
};

Long.prototype.equals = function(other) {
  return (this.high_ == other.high_) && (this.low_ == other.low_);
};

Long.prototype.notEquals = function(other) {
  return (this.high_ != other.high_) || (this.low_ != other.low_);
};

Long.prototype.lessThan = function(other) {
  return this.compare(other) < 0;
};

Long.prototype.lessThanOrEqual = function(other) {
  return this.compare(other) <= 0;
};

Long.prototype.greaterThan = function(other) {
  return this.compare(other) > 0;
};

Long.prototype.greaterThanOrEqual = function(other) {
  return this.compare(other) >= 0;
};

Long.prototype.compare = function(other) {
  if (this.equals(other)) {
    return 0;
  }

  var thisNeg = this.isNegative();
  var otherNeg = other.isNegative();
  if (thisNeg && !otherNeg) {
    return -1;
  }
  if (!thisNeg && otherNeg) {
    return 1;
  }

  if (this.subtract(other).isNegative()) {
    return -1;
  } else {
    return 1;
  }
};

Long.prototype.negate = function() {
  if (this.equals(Long.MIN_VALUE)) {
    return Long.MIN_VALUE;
  } else {
    return this.not().add(Long.ONE);
  }
};

Long.prototype.add = function(other) {
  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xFFFF;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xFFFF;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xFFFF;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xFFFF;

  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 + b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 + b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 + b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 + b48;
  c48 &= 0xFFFF;
  return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
};

Long.prototype.subtract = function(other) {
  return this.add(other.negate());
};

Long.prototype.multiply = function(other) {
  if (this.isZero()) {
    return Long.ZERO;
  } else if (other.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    return other.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  } else if (other.equals(Long.MIN_VALUE)) {
    return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().multiply(other.negate());
    } else {
      return this.negate().multiply(other).negate();
    }
  } else if (other.isNegative()) {
    return this.multiply(other.negate()).negate();
  }

  if (this.lessThan(Long.TWO_PWR_24_) &&
      other.lessThan(Long.TWO_PWR_24_)) {
    return Long.fromNumber(this.toNumber() * other.toNumber());
  }

  var a48 = this.high_ >>> 16;
  var a32 = this.high_ & 0xFFFF;
  var a16 = this.low_ >>> 16;
  var a00 = this.low_ & 0xFFFF;

  var b48 = other.high_ >>> 16;
  var b32 = other.high_ & 0xFFFF;
  var b16 = other.low_ >>> 16;
  var b00 = other.low_ & 0xFFFF;

  var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xFFFF;
  return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
};

Long.prototype.div = function(other) {
  if (other.isZero()) {
    throw Error('division by zero');
  } else if (this.isZero()) {
    return Long.ZERO;
  }

  if (this.equals(Long.MIN_VALUE)) {
    if (other.equals(Long.ONE) ||
        other.equals(Long.NEG_ONE)) {
      return Long.MIN_VALUE;
    } else if (other.equals(Long.MIN_VALUE)) {
      return Long.ONE;
    } else {
      var halfThis = this.shiftRight(1);
      var approx = halfThis.div(other).shiftLeft(1);
      if (approx.equals(Long.ZERO)) {
        return other.isNegative() ? Long.ONE : Long.NEG_ONE;
      } else {
        var rem = this.subtract(other.multiply(approx));
        var result = approx.add(rem.div(other));
        return result;
      }
    }
  } else if (other.equals(Long.MIN_VALUE)) {
    return Long.ZERO;
  }

  if (this.isNegative()) {
    if (other.isNegative()) {
      return this.negate().div(other.negate());
    } else {
      return this.negate().div(other).negate();
    }
  } else if (other.isNegative()) {
    return this.div(other.negate()).negate();
  }

  var res = Long.ZERO;
  var rem = this;
  while (rem.greaterThanOrEqual(other)) {
    var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

    var log2 = Math.ceil(Math.log(approx) / Math.LN2);
    var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

    var approxRes = Long.fromNumber(approx);
    var approxRem = approxRes.multiply(other);
    while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
      approx -= delta;
      approxRes = Long.fromNumber(approx);
      approxRem = approxRes.multiply(other);
    }

    if (approxRes.isZero()) {
      approxRes = Long.ONE;
    }

    res = res.add(approxRes);
    rem = rem.subtract(approxRem);
  }
  return res;
};

Long.prototype.modulo = function(other) {
  return this.subtract(this.div(other).multiply(other));
};

Long.prototype.not = function() {
  return Long.fromBits(~this.low_, ~this.high_);
};

Long.prototype.and = function(other) {
  return Long.fromBits(this.low_ & other.low_,
                                 this.high_ & other.high_);
};

Long.prototype.or = function(other) {
  return Long.fromBits(this.low_ | other.low_,
                                 this.high_ | other.high_);
};

Long.prototype.xor = function(other) {
  return Long.fromBits(this.low_ ^ other.low_,
                                 this.high_ ^ other.high_);
};

Long.prototype.shiftLeft = function(numBits) {
  numBits &= 63;
  if (numBits == 0) {
    return this;
  } else {
    var low = this.low_;
    if (numBits < 32) {
      var high = this.high_;
      return Long.fromBits(
          low << numBits,
          (high << numBits) | (low >>> (32 - numBits)));
    } else {
      return Long.fromBits(0, low << (numBits - 32));
    }
  }
};

Long.prototype.shiftRight = function(numBits) {
  numBits &= 63;
  if (numBits == 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(
          (low >>> numBits) | (high << (32 - numBits)),
          high >> numBits);
    } else {
      return Long.fromBits(
          high >> (numBits - 32),
          high >= 0 ? 0 : -1);
    }
  }
};

Long.prototype.shiftRightUnsigned = function(numBits) {
  numBits &= 63;
  if (numBits == 0) {
    return this;
  } else {
    var high = this.high_;
    if (numBits < 32) {
      var low = this.low_;
      return Long.fromBits(
          (low >>> numBits) | (high << (32 - numBits)),
          high >>> numBits);
    } else if (numBits == 32) {
      return Long.fromBits(high, 0);
    } else {
      return Long.fromBits(high >>> (numBits - 32), 0);
    }
  }
};



// Int64
function hs_eqInt64(x, y) {return x.equals(y);}
function hs_neInt64(x, y) {return !x.equals(y);}
function hs_ltInt64(x, y) {return x.compare(y) < 0;}
function hs_leInt64(x, y) {return x.compare(y) <= 0;}
function hs_gtInt64(x, y) {return x.compare(y) > 0;}
function hs_geInt64(x, y) {return x.compare(y) >= 0;}
function hs_quotInt64(x, y) {return x.div(y);}
function hs_remInt64(x, y) {return x.modulo(y);}
function hs_plusInt64(x, y) {return x.add(y);}
function hs_minusInt64(x, y) {return x.subtract(y);}
function hs_timesInt64(x, y) {return x.multiply(y);}
function hs_negateInt64(x) {return x.negate();}
function hs_uncheckedIShiftL64(x, bits) {x.shiftLeft(bits);}
function hs_uncheckedIShiftRA64(x, bits) {x.shiftRight(bits);}
function hs_uncheckedIShiftRL64(x, bits) {x.shiftRightUnsigned(bits);}
function hs_intToInt64(x) {return new Long(x, 0);}
function hs_int64ToInt(x) {return x.toInt();}



// Word64
function hs_wordToWord64(x) {
    return I_fromInt(x);
}
function hs_word64ToWord(x) {
    return I_toInt(x);
}
function hs_mkWord64(low, high) {
    return I_fromBits([low, high]);
}

var hs_and64 = I_and;
var hs_or64 = I_or;
var hs_xor64 = I_xor;
var __i64_all_ones = I_fromBits([0xffffffff, 0xffffffff]);
function hs_not64(x) {
    return I_xor(x, __i64_all_ones);
}
var hs_eqWord64 = I_equals;
var hs_neWord64 = I_notEquals;
var hs_ltWord64 = I_lessThan;
var hs_leWord64 = I_lessThanOrEqual;
var hs_gtWord64 = I_greaterThan;
var hs_geWord64 = I_greaterThanOrEqual;
var hs_quotWord64 = I_quot;
var hs_remWord64 = I_rem;
var __w64_max = I_fromBits([0,0,1]);
function hs_uncheckedShiftL64(x, bits) {
    return I_rem(I_shiftLeft(x, bits), __w64_max);
}
var hs_uncheckedShiftRL64 = I_shiftRight;
function hs_int64ToWord64(x) {
    var tmp = I_add(__w64_max, I_fromBits([x.getLowBits(), x.getHighBits()]));
    return I_rem(tmp, __w64_max);
}
function hs_word64ToInt64(x) {
    return Long.fromBits(I_getBits(x, 0), I_getBits(x, 1));
}

// Joseph Myers' MD5 implementation; used under the BSD license.

function md5cycle(x, k) {
var a = x[0], b = x[1], c = x[2], d = x[3];

a = ff(a, b, c, d, k[0], 7, -680876936);
d = ff(d, a, b, c, k[1], 12, -389564586);
c = ff(c, d, a, b, k[2], 17,  606105819);
b = ff(b, c, d, a, k[3], 22, -1044525330);
a = ff(a, b, c, d, k[4], 7, -176418897);
d = ff(d, a, b, c, k[5], 12,  1200080426);
c = ff(c, d, a, b, k[6], 17, -1473231341);
b = ff(b, c, d, a, k[7], 22, -45705983);
a = ff(a, b, c, d, k[8], 7,  1770035416);
d = ff(d, a, b, c, k[9], 12, -1958414417);
c = ff(c, d, a, b, k[10], 17, -42063);
b = ff(b, c, d, a, k[11], 22, -1990404162);
a = ff(a, b, c, d, k[12], 7,  1804603682);
d = ff(d, a, b, c, k[13], 12, -40341101);
c = ff(c, d, a, b, k[14], 17, -1502002290);
b = ff(b, c, d, a, k[15], 22,  1236535329);

a = gg(a, b, c, d, k[1], 5, -165796510);
d = gg(d, a, b, c, k[6], 9, -1069501632);
c = gg(c, d, a, b, k[11], 14,  643717713);
b = gg(b, c, d, a, k[0], 20, -373897302);
a = gg(a, b, c, d, k[5], 5, -701558691);
d = gg(d, a, b, c, k[10], 9,  38016083);
c = gg(c, d, a, b, k[15], 14, -660478335);
b = gg(b, c, d, a, k[4], 20, -405537848);
a = gg(a, b, c, d, k[9], 5,  568446438);
d = gg(d, a, b, c, k[14], 9, -1019803690);
c = gg(c, d, a, b, k[3], 14, -187363961);
b = gg(b, c, d, a, k[8], 20,  1163531501);
a = gg(a, b, c, d, k[13], 5, -1444681467);
d = gg(d, a, b, c, k[2], 9, -51403784);
c = gg(c, d, a, b, k[7], 14,  1735328473);
b = gg(b, c, d, a, k[12], 20, -1926607734);

a = hh(a, b, c, d, k[5], 4, -378558);
d = hh(d, a, b, c, k[8], 11, -2022574463);
c = hh(c, d, a, b, k[11], 16,  1839030562);
b = hh(b, c, d, a, k[14], 23, -35309556);
a = hh(a, b, c, d, k[1], 4, -1530992060);
d = hh(d, a, b, c, k[4], 11,  1272893353);
c = hh(c, d, a, b, k[7], 16, -155497632);
b = hh(b, c, d, a, k[10], 23, -1094730640);
a = hh(a, b, c, d, k[13], 4,  681279174);
d = hh(d, a, b, c, k[0], 11, -358537222);
c = hh(c, d, a, b, k[3], 16, -722521979);
b = hh(b, c, d, a, k[6], 23,  76029189);
a = hh(a, b, c, d, k[9], 4, -640364487);
d = hh(d, a, b, c, k[12], 11, -421815835);
c = hh(c, d, a, b, k[15], 16,  530742520);
b = hh(b, c, d, a, k[2], 23, -995338651);

a = ii(a, b, c, d, k[0], 6, -198630844);
d = ii(d, a, b, c, k[7], 10,  1126891415);
c = ii(c, d, a, b, k[14], 15, -1416354905);
b = ii(b, c, d, a, k[5], 21, -57434055);
a = ii(a, b, c, d, k[12], 6,  1700485571);
d = ii(d, a, b, c, k[3], 10, -1894986606);
c = ii(c, d, a, b, k[10], 15, -1051523);
b = ii(b, c, d, a, k[1], 21, -2054922799);
a = ii(a, b, c, d, k[8], 6,  1873313359);
d = ii(d, a, b, c, k[15], 10, -30611744);
c = ii(c, d, a, b, k[6], 15, -1560198380);
b = ii(b, c, d, a, k[13], 21,  1309151649);
a = ii(a, b, c, d, k[4], 6, -145523070);
d = ii(d, a, b, c, k[11], 10, -1120210379);
c = ii(c, d, a, b, k[2], 15,  718787259);
b = ii(b, c, d, a, k[9], 21, -343485551);

x[0] = add32(a, x[0]);
x[1] = add32(b, x[1]);
x[2] = add32(c, x[2]);
x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
a = add32(add32(a, q), add32(x, t));
return add32((a << s) | (a >>> (32 - s)), b);
}

function ff(a, b, c, d, x, s, t) {
return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
return cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function md51(s) {
var n = s.length,
state = [1732584193, -271733879, -1732584194, 271733878], i;
for (i=64; i<=s.length; i+=64) {
md5cycle(state, md5blk(s.substring(i-64, i)));
}
s = s.substring(i-64);
var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
for (i=0; i<s.length; i++)
tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
tail[i>>2] |= 0x80 << ((i%4) << 3);
if (i > 55) {
md5cycle(state, tail);
for (i=0; i<16; i++) tail[i] = 0;
}
tail[14] = n*8;
md5cycle(state, tail);
return state;
}

function md5blk(s) {
var md5blks = [], i;
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n)
{
var s='', j=0;
for(; j<4; j++)
s += hex_chr[(n >> (j * 8 + 4)) & 0x0F]
+ hex_chr[(n >> (j * 8)) & 0x0F];
return s;
}

function hex(x) {
for (var i=0; i<x.length; i++)
x[i] = rhex(x[i]);
return x.join('');
}

function md5(s) {
return hex(md51(s));
}

function add32(a, b) {
return (a + b) & 0xFFFFFFFF;
}

// Functions for dealing with arrays.

function newArr(n, x) {
    var arr = [];
    for(; n >= 0; --n) {
        arr.push(x);
    }
    return arr;
}

// Create all views at once; perhaps it's wasteful, but it's better than having
// to check for the right view at each read or write.
function newByteArr(n) {
    // Pad the thing to multiples of 8.
    var padding = 8 - n % 8;
    if(padding < 8) {
        n += padding;
    }
    var arr = {};
    var buffer = new ArrayBuffer(n);
    var views = {};
    views['i8']  = new Int8Array(buffer);
    views['i16'] = new Int16Array(buffer);
    views['i32'] = new Int32Array(buffer);
    views['w8']  = new Uint8Array(buffer);
    views['w16'] = new Uint16Array(buffer);
    views['w32'] = new Uint32Array(buffer);
    views['f32'] = new Float32Array(buffer);
    views['f64'] = new Float64Array(buffer);
    arr['b'] = buffer;
    arr['v'] = views;
    // ByteArray and Addr are the same thing, so keep an offset if we get
    // casted.
    arr['off'] = 0;
    return arr;
}

// An attempt at emulating pointers enough for ByteString and Text to be
// usable without patching the hell out of them.
// The general idea is that Addr# is a byte array with an associated offset.

function plusAddr(addr, off) {
    var newaddr = {};
    newaddr['off'] = addr['off'] + off;
    newaddr['b']   = addr['b'];
    newaddr['v']   = addr['v'];
    return newaddr;
}

function writeOffAddr(type, elemsize, addr, off, x) {
    addr['v'][type][addr.off/elemsize + off] = x;
}

function readOffAddr(type, elemsize, addr, off) {
    return addr['v'][type][addr.off/elemsize + off];
}

// Two addresses are equal if they point to the same buffer and have the same
// offset. For other comparisons, just use the offsets - nobody in their right
// mind would check if one pointer is less than another, completely unrelated,
// pointer and then act on that information anyway.
function addrEq(a, b) {
    if(a == b) {
        return true;
    }
    return a && b && a['b'] == b['b'] && a['off'] == b['off'];
}

function addrLT(a, b) {
    if(a) {
        return b && a['off'] < b['off'];
    } else {
        return (b != 0); 
    }
}

function addrGT(a, b) {
    if(b) {
        return a && a['off'] > b['off'];
    } else {
        return (a != 0);
    }
}

function withChar(f, charCode) {
    return f(String.fromCharCode(charCode)).charCodeAt(0);
}

function u_towlower(charCode) {
    return withChar(function(c) {return c.toLowerCase()}, charCode);
}

function u_towupper(charCode) {
    return withChar(function(c) {return c.toUpperCase()}, charCode);
}

var u_towtitle = u_towupper;

function u_iswupper(charCode) {
    var c = String.fromCharCode(charCode);
    return c == c.toUpperCase() && c != c.toLowerCase();
}

function u_iswlower(charCode) {
    var c = String.fromCharCode(charCode);
    return  c == c.toLowerCase() && c != c.toUpperCase();
}

function u_iswdigit(charCode) {
    return charCode >= 48 && charCode <= 57;
}

function u_iswcntrl(charCode) {
    return charCode <= 0x1f || charCode == 0x7f;
}

function u_iswspace(charCode) {
    var c = String.fromCharCode(charCode);
    return c.replace(/\s/g,'') != c;
}

function u_iswalpha(charCode) {
    var c = String.fromCharCode(charCode);
    return c.replace(__hs_alphare, '') != c;
}

function u_iswalnum(charCode) {
    return u_iswdigit(charCode) || u_iswalpha(charCode);
}

function u_iswprint(charCode) {
    return !u_iswcntrl(charCode);
}

function u_gencat(c) {
    throw 'u_gencat is only supported with --full-unicode.';
}

// Regex that matches any alphabetic character in any language. Horrible thing.
var __hs_alphare = /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/g;

// 2D Canvas drawing primitives.
function jsHasCtx2D(elem) {return !!elem.getContext;}
function jsGetCtx2D(elem) {return elem.getContext('2d');}
function jsBeginPath(ctx) {ctx.beginPath();}
function jsMoveTo(ctx, x, y) {ctx.moveTo(x, y);}
function jsLineTo(ctx, x, y) {ctx.lineTo(x, y);}
function jsStroke(ctx) {ctx.stroke();}
function jsFill(ctx) {ctx.fill();}
function jsRotate(ctx, radians) {ctx.rotate(radians);}
function jsTranslate(ctx, x, y) {ctx.translate(x, y);}
function jsScale(ctx, x, y) {ctx.scale(x, y);}
function jsPushState(ctx) {ctx.save();}
function jsPopState(ctx) {ctx.restore();}
function jsResetCanvas(el) {el.width = el.width;}
function jsDrawImage(ctx, img, x, y) {ctx.drawImage(img, x, y);}
function jsDrawImageClipped(ctx, img, x, y, cx, cy, cw, ch) {
    ctx.drawImage(img, cx, cy, cw, ch, x, y, cw, ch);
}
function jsDrawText(ctx, str, x, y) {ctx.fillText(str, x, y);}
function jsClip(ctx) {ctx.clip();}
function jsArc(ctx, x, y, radius, fromAngle, toAngle) {
    ctx.arc(x, y, radius, fromAngle, toAngle);
}
function jsCanvasToDataURL(el) {return el.toDataURL('image/png');}

// Simulate handles.
// When implementing new handles, remember that passed strings may be thunks,
// and so need to be evaluated before use.

function jsNewHandle(init, read, write, flush, close, seek, tell) {
    var h = {
        read: read || function() {},
        write: write || function() {},
        seek: seek || function() {},
        tell: tell || function() {},
        close: close || function() {},
        flush: flush || function() {}
    };
    init.call(h);
    return h;
}

function jsReadHandle(h, len) {return h.read(len);}
function jsWriteHandle(h, str) {return h.write(str);}
function jsFlushHandle(h) {return h.flush();}
function jsCloseHandle(h) {return h.close();}

function jsMkConWriter(op) {
    return function(str) {
        str = E(str);
        var lines = (this.buf + str).split('\n');
        for(var i = 0; i < lines.length-1; ++i) {
            op.call(console, lines[i]);
        }
        this.buf = lines[lines.length-1];
    }
}

function jsMkStdout() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(_) {return '';},
        jsMkConWriter(console.log),
        function() {console.log(this.buf); this.buf = '';}
    );
}

function jsMkStderr() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(_) {return '';},
        jsMkConWriter(console.warn),
        function() {console.warn(this.buf); this.buf = '';}
    );
}

function jsMkStdin() {
    return jsNewHandle(
        function() {this.buf = '';},
        function(len) {
            while(this.buf.length < len) {
                this.buf += prompt('[stdin]') + '\n';
            }
            var ret = this.buf.substr(0, len);
            this.buf = this.buf.substr(len);
            return ret;
        }
    );
}

var _0=function(_1,_2,_3){while(1){var _4=(function(_5,_6,_7){var _8=E(_7);if(!_8[0]){return [0,_5,_6];}else{var _9=_8[2],_a=E(_8[1]);if(!_a[0]){var _b=_5,_c=_6;_3=_9;_1=_b;_2=_c;return null;}else{var _d=E(_a[1]),_e=_d[1];if(!E(_d[2])){var _b=_5;_2=new T(function(){var _f=E(_6)[1];switch(E(_e)){case 0:return [0,_f+5|0];case 1:return [0,_f+3|0];case 2:return [0,_f+3|0];case 3:return [0,_f+1000|0];case 4:return [0,_f+9|0];default:return [0,_f+1|0];}});_3=_9;_1=_b;return null;}else{_1=new T(function(){var _g=E(_5)[1];switch(E(_e)){case 0:return [0,_g+5|0];case 1:return [0,_g+3|0];case 2:return [0,_g+3|0];case 3:return [0,_g+1000|0];case 4:return [0,_g+9|0];default:return [0,_g+1|0];}});var _c=_6;_3=_9;_2=_c;return null;}}}})(_1,_2,_3);if(_4!=null){return _4;}}},_h=unCStr("Prelude.(!!): negative index\n"),_i=new T(function(){return err(_h);}),_j=unCStr("Prelude.(!!): index too large\n"),_k=new T(function(){return err(_j);}),_l=function(_m,_n){while(1){var _o=E(_m);if(!_o[0]){return E(_k);}else{var _p=E(_n);if(!_p){return E(_o[1]);}else{_m=_o[2];_n=_p-1|0;continue;}}}},_q=function(_r,_s){if(_r<=_s){var _t=function(_u){return [1,[0,_u],new T(function(){return _u!=_s?_t(_u+1|0):[0];})];};return _t(_r);}else{return [0];}},_v=new T(function(){return _q(0,7);}),_w=function(_x,_y){var _z=function(_A){var _B=E(_A);if(!_B[0]){return [0];}else{var _C=_B[1],_D=new T(function(){return _z(_B[2]);}),_E=new T(function(){var _F=E(_C)[1];return _F>=0?_l(_y,_F):E(_i);});return (function(_G){while(1){var _H=(function(_I){var _J=E(_I);if(!_J[0]){return E(_D);}else{var _K=_J[2],_L=E(_J[1]),_M=_L[1];if(_M>=0){var _N=_l(_E,_M);if(!_N[0]){_G=_K;return null;}else{var _O=E(_N[1])[2];if(!E(_x)){if(!E(_O)){return [1,[0,_C,_L],new T(function(){var _P=function(_Q){while(1){var _R=(function(_S){var _T=E(_S);if(!_T[0]){return E(_D);}else{var _U=_T[2],_V=E(_T[1]),_W=_V[1];if(_W>=0){var _X=_l(_E,_W);if(!_X[0]){_Q=_U;return null;}else{if(!E(E(_X[1])[2])){return [1,[0,_C,_V],new T(function(){return _P(_U);})];}else{_Q=_U;return null;}}}else{return E(_i);}}})(_Q);if(_R!=null){return _R;}}};return _P(_K);})];}else{var _Y=function(_Z){while(1){var _10=(function(_11){var _12=E(_11);if(!_12[0]){return E(_D);}else{var _13=_12[2],_14=E(_12[1]),_15=_14[1];if(_15>=0){var _16=_l(_E,_15);if(!_16[0]){_Z=_13;return null;}else{if(!E(E(_16[1])[2])){return [1,[0,_C,_14],new T(function(){return _Y(_13);})];}else{_Z=_13;return null;}}}else{return E(_i);}}})(_Z);if(_10!=null){return _10;}}};return _Y(_K);}}else{if(!E(_O)){var _17=function(_18){while(1){var _19=(function(_1a){var _1b=E(_1a);if(!_1b[0]){return E(_D);}else{var _1c=_1b[2],_1d=E(_1b[1]),_1e=_1d[1];if(_1e>=0){var _1f=_l(_E,_1e);if(!_1f[0]){_18=_1c;return null;}else{if(!E(E(_1f[1])[2])){_18=_1c;return null;}else{return [1,[0,_C,_1d],new T(function(){return _17(_1c);})];}}}else{return E(_i);}}})(_18);if(_19!=null){return _19;}}};return _17(_K);}else{return [1,[0,_C,_L],new T(function(){var _1g=function(_1h){while(1){var _1i=(function(_1j){var _1k=E(_1j);if(!_1k[0]){return E(_D);}else{var _1l=_1k[2],_1m=E(_1k[1]),_1n=_1m[1];if(_1n>=0){var _1o=_l(_E,_1n);if(!_1o[0]){_1h=_1l;return null;}else{if(!E(E(_1o[1])[2])){_1h=_1l;return null;}else{return [1,[0,_C,_1m],new T(function(){return _1g(_1l);})];}}}else{return E(_i);}}})(_1h);if(_1i!=null){return _1i;}}};return _1g(_K);})];}}}}else{return E(_i);}}})(_G);if(_H!=null){return _H;}}})(_v);}};return _z(_v);},_1p=function(_1q,_1r,_1s){return _1s>=0?_1r>=0?_l(_l(_1q,_1r),_1s):E(_i):E(_i);},_1t=[0],_1u=function(_1v,_1w,_1x,_1y,_1z,_1A,_1B){var _1C=(imul(_1v,_1z)|0)+_1w|0;if(_1C>=0){var _1D=(imul(_1v,_1B)|0)+_1A|0;if(_1D>=0){if(_1C<=7){if(_1D<=7){var _1E=_1p(_1x,_1C,_1D);if(!_1E[0]){return [1,[0,[0,_1C],[0,_1D]],new T(function(){return _1u(_1v+1|0,_1w,_1x,_1y,_1z,_1A,_1B);})];}else{var _1F=E(_1E[1])[2];return E(_1y)==0?E(_1F)==0?[0]:[1,[0,[0,_1C],[0,_1D]],_1t]:E(_1F)==0?[1,[0,[0,_1C],[0,_1D]],_1t]:[0];}}else{return [0];}}else{return [0];}}else{return [0];}}else{return [0];}},_1G=function(_1H,_1I,_1J,_1K,_1L,_1M,_1N){var _1O=(imul(_1H,_1M)|0)+_1I|0;if(_1O>=0){var _1P=E(_1N)[1],_1Q=E(_1J)[1],_1R=(imul(_1H,_1P)|0)+_1Q|0;if(_1R>=0){if(_1O<=7){if(_1R<=7){var _1S=_1p(_1K,_1O,_1R);if(!_1S[0]){return [1,[0,[0,_1O],[0,_1R]],new T(function(){return _1u(_1H+1|0,_1I,_1K,_1L,_1M,_1Q,_1P);})];}else{var _1T=E(_1S[1])[2];return E(_1L)==0?E(_1T)==0?[0]:[1,[0,[0,_1O],[0,_1R]],_1t]:E(_1T)==0?[1,[0,[0,_1O],[0,_1R]],_1t]:[0];}}else{return [0];}}else{return [0];}}else{return [0];}}else{return [0];}},_1U=unCStr("Control.Exception.Base"),_1V=unCStr("base"),_1W=unCStr("PatternMatchFail"),_1X=new T(function(){var _1Y=hs_wordToWord64(18445595),_1Z=hs_wordToWord64(52003073);return [0,_1Y,_1Z,[0,_1Y,_1Z,_1V,_1U,_1W],_1t];}),_20=function(_21){return E(_1X);},_22=function(_23){return E(E(_23)[1]);},_24=unCStr("Maybe.fromJust: Nothing"),_25=new T(function(){return err(_24);}),_26=function(_27,_28,_29){var _2a=new T(function(){var _2b=A(_27,[_29]),_2c=A(_28,[new T(function(){var _2d=E(_2a);return _2d[0]==0?E(_25):E(_2d[1]);})]),_2e=hs_eqWord64(_2b[1],_2c[1]);if(!E(_2e)){return [0];}else{var _2f=hs_eqWord64(_2b[2],_2c[2]);return E(_2f)==0?[0]:[1,_29];}});return E(_2a);},_2g=function(_2h){var _2i=E(_2h);return _26(_22(_2i[1]),_20,_2i[2]);},_2j=function(_2k){return E(E(_2k)[1]);},_2l=function(_2m,_2n){var _2o=E(_2m);return _2o[0]==0?E(_2n):[1,_2o[1],new T(function(){return _2l(_2o[2],_2n);})];},_2p=function(_2q,_2r){return _2l(E(_2q)[1],_2r);},_2s=[0,44],_2t=[0,93],_2u=[0,91],_2v=function(_2w,_2x,_2y){var _2z=E(_2x);return _2z[0]==0?unAppCStr("[]",_2y):[1,_2u,new T(function(){return A(_2w,[_2z[1],new T(function(){var _2A=function(_2B){var _2C=E(_2B);return _2C[0]==0?E([1,_2t,_2y]):[1,_2s,new T(function(){return A(_2w,[_2C[1],new T(function(){return _2A(_2C[2]);})]);})];};return _2A(_2z[2]);})]);})];},_2D=function(_2E,_2F){return _2v(_2p,_2E,_2F);},_2G=function(_2H,_2I,_2J){return _2l(E(_2I)[1],_2J);},_2K=[0,_2G,_2j,_2D],_2L=[0,_20,_2K,_2M,_2g],_2M=function(_2N){return [0,_2L,_2N];},_2O=unCStr("Non-exhaustive patterns in"),_2P=function(_2Q,_2R){return die(new T(function(){return A(_2R,[_2Q]);}));},_2S=function(_2T,_2U){var _2V=E(_2U);if(!_2V[0]){return [0,_1t,_1t];}else{var _2W=_2V[1];if(!A(_2T,[_2W])){return [0,_1t,_2V];}else{var _2X=new T(function(){var _2Y=_2S(_2T,_2V[2]);return [0,_2Y[1],_2Y[2]];});return [0,[1,_2W,new T(function(){return E(E(_2X)[1]);})],new T(function(){return E(E(_2X)[2]);})];}}},_2Z=[0,32],_30=[0,10],_31=[1,_30,_1t],_32=function(_33){return E(E(_33)[1])==124?false:true;},_34=function(_35,_36){var _37=_2S(_32,unCStr(_35)),_38=_37[1],_39=function(_3a,_3b){return _2l(_3a,new T(function(){return unAppCStr(": ",new T(function(){return _2l(_36,new T(function(){return _2l(_3b,_31);}));}));}));},_3c=E(_37[2]);return _3c[0]==0?_39(_38,_1t):E(E(_3c[1])[1])==124?_39(_38,[1,_2Z,_3c[2]]):_39(_38,_1t);},_3d=function(_3e){return _2P([0,new T(function(){return _34(_3e,_2O);})],_2M);},_3f=new T(function(){return _3d("Moves.hs:40:1-87|function pawnFirstRowEmpty");}),_3g=function(_3h,_3i,_3j,_3k,_3l){var _3m=new T(function(){if(E(_3k)==5){var _3n=function(_3o){if(_3o>=0){var _3p=E(_3j),_3q=_3p[1];if(_3q>=0){if(_3o<=7){if(_3q<=7){if(!_1p(_3h,_3o,_3q)[0]){var _3r=function(_3s){return _3s>=0?_3s<=7?_1p(_3h,_3s,_3q)[0]==0?[1,[0,new T(function(){return E(_3l)==0?[0,(_3i+1|0)+1|0]:[0,(_3i+(-1)|0)+(-1)|0];}),_3p],_1t]:[0]:[0]:[0];};return E(_3l)==0?_3r((_3i+1|0)+1|0):_3r((_3i+(-1)|0)+(-1)|0);}else{return [0];}}else{return [0];}}else{return [0];}}else{return [0];}}else{return [0];}};return E(_3l)==0?_3n(_3i+1|0):_3n(_3i+(-1)|0);}else{return E(_3f);}});return E(_3l)==0?E(_3i)==7?E(_3m):[0]:E(_3i)==6?E(_3m):[0];},_3t=0,_3u=5,_3v=1,_3w=[0,1],_3x=[0,-1],_3y=[0,_3x,_3w],_3z=[1,_3y,_1t],_3A=[0,_3w,_3x],_3B=[1,_3A,_3z],_3C=[0,_3x,_3x],_3D=[1,_3C,_3B],_3E=[0,_3w,_3w],_3F=[1,_3E,_3D],_3G=[0,0],_3H=[0,_3x,_3G],_3I=[1,_3H,_1t],_3J=[0,_3w,_3G],_3K=[1,_3J,_3I],_3L=[0,_3G,_3x],_3M=[1,_3L,_3K],_3N=[0,_3G,_3w],_3O=[1,_3N,_3M],_3P=new T(function(){return _2l(_3O,_3F);}),_3Q=[0,2],_3R=[0,_3x,_3Q],_3S=[0,_3Q,_3x],_3T=[0,-2],_3U=[0,_3T,_3w],_3V=[0,_3w,_3T],_3W=[0,_3x,_3T],_3X=[0,_3T,_3x],_3Y=[1,_3X,_1t],_3Z=[1,_3W,_3Y],_40=[1,_3V,_3Z],_41=[1,_3U,_40],_42=[1,_3S,_41],_43=[1,_3R,_42],_44=function(_45,_46,_47,_48){var _49=E(_47);switch(_49){case 1:var _4a=E(_46),_4b=_4a[2],_4c=E(_4a[1])[1],_4d=_4c+1|0;if(_4d>=0){var _4e=E(_4b)[1],_4f=_4e+2|0;if(_4f>=0){if(_4d<=7){if(_4f<=7){var _4g=_1p(_45,_4d,_4f);if(!_4g[0]){return [1,[0,[0,_4d],[0,_4f]],new T(function(){var _4h=function(_4i){while(1){var _4j=(function(_4k){var _4l=E(_4k);if(!_4l[0]){return [0];}else{var _4m=_4l[2],_4n=E(_4l[1]),_4o=_4c+E(_4n[1])[1]|0;if(_4o>=0){var _4p=_4e+E(_4n[2])[1]|0;if(_4p>=0){if(_4o<=7){if(_4p<=7){var _4q=_1p(_45,_4o,_4p);if(!_4q[0]){return [1,[0,[0,_4o],[0,_4p]],new T(function(){return _4h(_4m);})];}else{var _4r=E(_4q[1])[2];if(!E(_48)){if(!E(_4r)){_4i=_4m;return null;}else{return [1,[0,[0,_4o],[0,_4p]],new T(function(){return _4h(_4m);})];}}else{if(!E(_4r)){return [1,[0,[0,_4o],[0,_4p]],new T(function(){return _4h(_4m);})];}else{_4i=_4m;return null;}}}}else{_4i=_4m;return null;}}else{_4i=_4m;return null;}}else{_4i=_4m;return null;}}else{_4i=_4m;return null;}}})(_4i);if(_4j!=null){return _4j;}}};return (function(_4s,_4t,_4u){var _4v=_4c+_4s|0;if(_4v>=0){var _4w=_4e+_4t|0;if(_4w>=0){if(_4v<=7){if(_4w<=7){var _4x=_1p(_45,_4v,_4w);if(!_4x[0]){return [1,[0,[0,_4v],[0,_4w]],new T(function(){return _4h(_4u);})];}else{var _4y=E(_4x[1])[2];return E(_48)==0?E(_4y)==0?_4h(_4u):[1,[0,[0,_4v],[0,_4w]],new T(function(){return _4h(_4u);})]:E(_4y)==0?[1,[0,[0,_4v],[0,_4w]],new T(function(){return _4h(_4u);})]:_4h(_4u);}}else{return _4h(_4u);}}else{return _4h(_4u);}}else{return _4h(_4u);}}else{return _4h(_4u);}})(2,1,_43);})];}else{var _4z=E(_4g[1])[2];if(!E(_48)){if(!E(_4z)){var _4A=function(_4B){while(1){var _4C=(function(_4D){var _4E=E(_4D);if(!_4E[0]){return [0];}else{var _4F=_4E[2],_4G=E(_4E[1]),_4H=_4c+E(_4G[1])[1]|0;if(_4H>=0){var _4I=_4e+E(_4G[2])[1]|0;if(_4I>=0){if(_4H<=7){if(_4I<=7){var _4J=_1p(_45,_4H,_4I);if(!_4J[0]){return [1,[0,[0,_4H],[0,_4I]],new T(function(){return _4A(_4F);})];}else{if(!E(E(_4J[1])[2])){_4B=_4F;return null;}else{return [1,[0,[0,_4H],[0,_4I]],new T(function(){return _4A(_4F);})];}}}else{_4B=_4F;return null;}}else{_4B=_4F;return null;}}else{_4B=_4F;return null;}}else{_4B=_4F;return null;}}})(_4B);if(_4C!=null){return _4C;}}};return (function(_4K,_4L,_4M){var _4N=_4c+_4K|0;if(_4N>=0){var _4O=_4e+_4L|0;if(_4O>=0){if(_4N<=7){if(_4O<=7){var _4P=_1p(_45,_4N,_4O);return _4P[0]==0?[1,[0,[0,_4N],[0,_4O]],new T(function(){return _4A(_4M);})]:E(E(_4P[1])[2])==0?_4A(_4M):[1,[0,[0,_4N],[0,_4O]],new T(function(){return _4A(_4M);})];}else{return _4A(_4M);}}else{return _4A(_4M);}}else{return _4A(_4M);}}else{return _4A(_4M);}})(2,1,_43);}else{return [1,[0,[0,_4d],[0,_4f]],new T(function(){var _4Q=function(_4R){while(1){var _4S=(function(_4T){var _4U=E(_4T);if(!_4U[0]){return [0];}else{var _4V=_4U[2],_4W=E(_4U[1]),_4X=_4c+E(_4W[1])[1]|0;if(_4X>=0){var _4Y=_4e+E(_4W[2])[1]|0;if(_4Y>=0){if(_4X<=7){if(_4Y<=7){var _4Z=_1p(_45,_4X,_4Y);if(!_4Z[0]){return [1,[0,[0,_4X],[0,_4Y]],new T(function(){return _4Q(_4V);})];}else{if(!E(E(_4Z[1])[2])){_4R=_4V;return null;}else{return [1,[0,[0,_4X],[0,_4Y]],new T(function(){return _4Q(_4V);})];}}}else{_4R=_4V;return null;}}else{_4R=_4V;return null;}}else{_4R=_4V;return null;}}else{_4R=_4V;return null;}}})(_4R);if(_4S!=null){return _4S;}}};return (function(_50,_51,_52){var _53=_4c+_50|0;if(_53>=0){var _54=_4e+_51|0;if(_54>=0){if(_53<=7){if(_54<=7){var _55=_1p(_45,_53,_54);return _55[0]==0?[1,[0,[0,_53],[0,_54]],new T(function(){return _4Q(_52);})]:E(E(_55[1])[2])==0?_4Q(_52):[1,[0,[0,_53],[0,_54]],new T(function(){return _4Q(_52);})];}else{return _4Q(_52);}}else{return _4Q(_52);}}else{return _4Q(_52);}}else{return _4Q(_52);}})(2,1,_43);})];}}else{if(!E(_4z)){return [1,[0,[0,_4d],[0,_4f]],new T(function(){var _56=function(_57){while(1){var _58=(function(_59){var _5a=E(_59);if(!_5a[0]){return [0];}else{var _5b=_5a[2],_5c=E(_5a[1]),_5d=_4c+E(_5c[1])[1]|0;if(_5d>=0){var _5e=_4e+E(_5c[2])[1]|0;if(_5e>=0){if(_5d<=7){if(_5e<=7){var _5f=_1p(_45,_5d,_5e);if(!_5f[0]){return [1,[0,[0,_5d],[0,_5e]],new T(function(){return _56(_5b);})];}else{if(!E(E(_5f[1])[2])){return [1,[0,[0,_5d],[0,_5e]],new T(function(){return _56(_5b);})];}else{_57=_5b;return null;}}}else{_57=_5b;return null;}}else{_57=_5b;return null;}}else{_57=_5b;return null;}}else{_57=_5b;return null;}}})(_57);if(_58!=null){return _58;}}};return (function(_5g,_5h,_5i){var _5j=_4c+_5g|0;if(_5j>=0){var _5k=_4e+_5h|0;if(_5k>=0){if(_5j<=7){if(_5k<=7){var _5l=_1p(_45,_5j,_5k);return _5l[0]==0?[1,[0,[0,_5j],[0,_5k]],new T(function(){return _56(_5i);})]:E(E(_5l[1])[2])==0?[1,[0,[0,_5j],[0,_5k]],new T(function(){return _56(_5i);})]:_56(_5i);}else{return _56(_5i);}}else{return _56(_5i);}}else{return _56(_5i);}}else{return _56(_5i);}})(2,1,_43);})];}else{var _5m=function(_5n){while(1){var _5o=(function(_5p){var _5q=E(_5p);if(!_5q[0]){return [0];}else{var _5r=_5q[2],_5s=E(_5q[1]),_5t=_4c+E(_5s[1])[1]|0;if(_5t>=0){var _5u=_4e+E(_5s[2])[1]|0;if(_5u>=0){if(_5t<=7){if(_5u<=7){var _5v=_1p(_45,_5t,_5u);if(!_5v[0]){return [1,[0,[0,_5t],[0,_5u]],new T(function(){return _5m(_5r);})];}else{if(!E(E(_5v[1])[2])){return [1,[0,[0,_5t],[0,_5u]],new T(function(){return _5m(_5r);})];}else{_5n=_5r;return null;}}}else{_5n=_5r;return null;}}else{_5n=_5r;return null;}}else{_5n=_5r;return null;}}else{_5n=_5r;return null;}}})(_5n);if(_5o!=null){return _5o;}}};return (function(_5w,_5x,_5y){var _5z=_4c+_5w|0;if(_5z>=0){var _5A=_4e+_5x|0;if(_5A>=0){if(_5z<=7){if(_5A<=7){var _5B=_1p(_45,_5z,_5A);return _5B[0]==0?[1,[0,[0,_5z],[0,_5A]],new T(function(){return _5m(_5y);})]:E(E(_5B[1])[2])==0?[1,[0,[0,_5z],[0,_5A]],new T(function(){return _5m(_5y);})]:_5m(_5y);}else{return _5m(_5y);}}else{return _5m(_5y);}}else{return _5m(_5y);}}else{return _5m(_5y);}})(2,1,_43);}}}}else{var _5C=function(_5D){while(1){var _5E=(function(_5F){var _5G=E(_5F);if(!_5G[0]){return [0];}else{var _5H=_5G[2],_5I=E(_5G[1]),_5J=_4c+E(_5I[1])[1]|0;if(_5J>=0){var _5K=_4e+E(_5I[2])[1]|0;if(_5K>=0){if(_5J<=7){if(_5K<=7){var _5L=_1p(_45,_5J,_5K);if(!_5L[0]){return [1,[0,[0,_5J],[0,_5K]],new T(function(){return _5C(_5H);})];}else{var _5M=E(_5L[1])[2];if(!E(_48)){if(!E(_5M)){_5D=_5H;return null;}else{return [1,[0,[0,_5J],[0,_5K]],new T(function(){return _5C(_5H);})];}}else{if(!E(_5M)){return [1,[0,[0,_5J],[0,_5K]],new T(function(){return _5C(_5H);})];}else{_5D=_5H;return null;}}}}else{_5D=_5H;return null;}}else{_5D=_5H;return null;}}else{_5D=_5H;return null;}}else{_5D=_5H;return null;}}})(_5D);if(_5E!=null){return _5E;}}};return (function(_5N,_5O,_5P){var _5Q=_4c+_5N|0;if(_5Q>=0){var _5R=_4e+_5O|0;if(_5R>=0){if(_5Q<=7){if(_5R<=7){var _5S=_1p(_45,_5Q,_5R);if(!_5S[0]){return [1,[0,[0,_5Q],[0,_5R]],new T(function(){return _5C(_5P);})];}else{var _5T=E(_5S[1])[2];return E(_48)==0?E(_5T)==0?_5C(_5P):[1,[0,[0,_5Q],[0,_5R]],new T(function(){return _5C(_5P);})]:E(_5T)==0?[1,[0,[0,_5Q],[0,_5R]],new T(function(){return _5C(_5P);})]:_5C(_5P);}}else{return _5C(_5P);}}else{return _5C(_5P);}}else{return _5C(_5P);}}else{return _5C(_5P);}})(2,1,_43);}}else{var _5U=function(_5V){while(1){var _5W=(function(_5X){var _5Y=E(_5X);if(!_5Y[0]){return [0];}else{var _5Z=_5Y[2],_60=E(_5Y[1]),_61=_4c+E(_60[1])[1]|0;if(_61>=0){var _62=_4e+E(_60[2])[1]|0;if(_62>=0){if(_61<=7){if(_62<=7){var _63=_1p(_45,_61,_62);if(!_63[0]){return [1,[0,[0,_61],[0,_62]],new T(function(){return _5U(_5Z);})];}else{var _64=E(_63[1])[2];if(!E(_48)){if(!E(_64)){_5V=_5Z;return null;}else{return [1,[0,[0,_61],[0,_62]],new T(function(){return _5U(_5Z);})];}}else{if(!E(_64)){return [1,[0,[0,_61],[0,_62]],new T(function(){return _5U(_5Z);})];}else{_5V=_5Z;return null;}}}}else{_5V=_5Z;return null;}}else{_5V=_5Z;return null;}}else{_5V=_5Z;return null;}}else{_5V=_5Z;return null;}}})(_5V);if(_5W!=null){return _5W;}}};return (function(_65,_66,_67){var _68=_4c+_65|0;if(_68>=0){var _69=_4e+_66|0;if(_69>=0){if(_68<=7){if(_69<=7){var _6a=_1p(_45,_68,_69);if(!_6a[0]){return [1,[0,[0,_68],[0,_69]],new T(function(){return _5U(_67);})];}else{var _6b=E(_6a[1])[2];return E(_48)==0?E(_6b)==0?_5U(_67):[1,[0,[0,_68],[0,_69]],new T(function(){return _5U(_67);})]:E(_6b)==0?[1,[0,[0,_68],[0,_69]],new T(function(){return _5U(_67);})]:_5U(_67);}}else{return _5U(_67);}}else{return _5U(_67);}}else{return _5U(_67);}}else{return _5U(_67);}})(2,1,_43);}}else{var _6c=function(_6d){while(1){var _6e=(function(_6f){var _6g=E(_6f);if(!_6g[0]){return [0];}else{var _6h=_6g[2],_6i=E(_6g[1]),_6j=_4c+E(_6i[1])[1]|0;if(_6j>=0){var _6k=_4e+E(_6i[2])[1]|0;if(_6k>=0){if(_6j<=7){if(_6k<=7){var _6l=_1p(_45,_6j,_6k);if(!_6l[0]){return [1,[0,[0,_6j],[0,_6k]],new T(function(){return _6c(_6h);})];}else{var _6m=E(_6l[1])[2];if(!E(_48)){if(!E(_6m)){_6d=_6h;return null;}else{return [1,[0,[0,_6j],[0,_6k]],new T(function(){return _6c(_6h);})];}}else{if(!E(_6m)){return [1,[0,[0,_6j],[0,_6k]],new T(function(){return _6c(_6h);})];}else{_6d=_6h;return null;}}}}else{_6d=_6h;return null;}}else{_6d=_6h;return null;}}else{_6d=_6h;return null;}}else{_6d=_6h;return null;}}})(_6d);if(_6e!=null){return _6e;}}};return (function(_6n,_6o,_6p){var _6q=_4c+_6n|0;if(_6q>=0){var _6r=_4e+_6o|0;if(_6r>=0){if(_6q<=7){if(_6r<=7){var _6s=_1p(_45,_6q,_6r);if(!_6s[0]){return [1,[0,[0,_6q],[0,_6r]],new T(function(){return _6c(_6p);})];}else{var _6t=E(_6s[1])[2];return E(_48)==0?E(_6t)==0?_6c(_6p):[1,[0,[0,_6q],[0,_6r]],new T(function(){return _6c(_6p);})]:E(_6t)==0?[1,[0,[0,_6q],[0,_6r]],new T(function(){return _6c(_6p);})]:_6c(_6p);}}else{return _6c(_6p);}}else{return _6c(_6p);}}else{return _6c(_6p);}}else{return _6c(_6p);}})(2,1,_43);}}else{var _6u=function(_6v){while(1){var _6w=(function(_6x){var _6y=E(_6x);if(!_6y[0]){return [0];}else{var _6z=_6y[2],_6A=E(_6y[1]),_6B=_4c+E(_6A[1])[1]|0;if(_6B>=0){var _6C=E(_4b)[1]+E(_6A[2])[1]|0;if(_6C>=0){if(_6B<=7){if(_6C<=7){var _6D=_1p(_45,_6B,_6C);if(!_6D[0]){return [1,[0,[0,_6B],[0,_6C]],new T(function(){return _6u(_6z);})];}else{var _6E=E(_6D[1])[2];if(!E(_48)){if(!E(_6E)){_6v=_6z;return null;}else{return [1,[0,[0,_6B],[0,_6C]],new T(function(){return _6u(_6z);})];}}else{if(!E(_6E)){return [1,[0,[0,_6B],[0,_6C]],new T(function(){return _6u(_6z);})];}else{_6v=_6z;return null;}}}}else{_6v=_6z;return null;}}else{_6v=_6z;return null;}}else{_6v=_6z;return null;}}else{_6v=_6z;return null;}}})(_6v);if(_6w!=null){return _6w;}}};return (function(_6F,_6G,_6H){var _6I=_4c+_6F|0;if(_6I>=0){var _6J=E(_4b)[1]+_6G|0;if(_6J>=0){if(_6I<=7){if(_6J<=7){var _6K=_1p(_45,_6I,_6J);if(!_6K[0]){return [1,[0,[0,_6I],[0,_6J]],new T(function(){return _6u(_6H);})];}else{var _6L=E(_6K[1])[2];return E(_48)==0?E(_6L)==0?_6u(_6H):[1,[0,[0,_6I],[0,_6J]],new T(function(){return _6u(_6H);})]:E(_6L)==0?[1,[0,[0,_6I],[0,_6J]],new T(function(){return _6u(_6H);})]:_6u(_6H);}}else{return _6u(_6H);}}else{return _6u(_6H);}}else{return _6u(_6H);}}else{return _6u(_6H);}})(2,1,_43);}break;case 3:var _6M=E(_3P);if(!_6M[0]){return [0];}else{var _6N=_6M[2],_6O=E(_46),_6P=_6O[2],_6Q=E(_6M[1]),_6R=E(_6O[1])[1],_6S=_6R+E(_6Q[1])[1]|0;if(_6S>=0){var _6T=E(_6P)[1],_6U=_6T+E(_6Q[2])[1]|0;if(_6U>=0){if(_6S<=7){if(_6U<=7){var _6V=_1p(_45,_6S,_6U);if(!_6V[0]){return [1,[0,[0,_6S],[0,_6U]],new T(function(){var _6W=function(_6X){while(1){var _6Y=(function(_6Z){var _70=E(_6Z);if(!_70[0]){return [0];}else{var _71=_70[2],_72=E(_70[1]),_73=_6R+E(_72[1])[1]|0;if(_73>=0){var _74=_6T+E(_72[2])[1]|0;if(_74>=0){if(_73<=7){if(_74<=7){var _75=_1p(_45,_73,_74);if(!_75[0]){return [1,[0,[0,_73],[0,_74]],new T(function(){return _6W(_71);})];}else{var _76=E(_75[1])[2];if(!E(_48)){if(!E(_76)){_6X=_71;return null;}else{return [1,[0,[0,_73],[0,_74]],new T(function(){return _6W(_71);})];}}else{if(!E(_76)){return [1,[0,[0,_73],[0,_74]],new T(function(){return _6W(_71);})];}else{_6X=_71;return null;}}}}else{_6X=_71;return null;}}else{_6X=_71;return null;}}else{_6X=_71;return null;}}else{_6X=_71;return null;}}})(_6X);if(_6Y!=null){return _6Y;}}};return _6W(_6N);})];}else{var _77=E(_6V[1])[2];if(!E(_48)){if(!E(_77)){var _78=function(_79){while(1){var _7a=(function(_7b){var _7c=E(_7b);if(!_7c[0]){return [0];}else{var _7d=_7c[2],_7e=E(_7c[1]),_7f=_6R+E(_7e[1])[1]|0;if(_7f>=0){var _7g=_6T+E(_7e[2])[1]|0;if(_7g>=0){if(_7f<=7){if(_7g<=7){var _7h=_1p(_45,_7f,_7g);if(!_7h[0]){return [1,[0,[0,_7f],[0,_7g]],new T(function(){return _78(_7d);})];}else{if(!E(E(_7h[1])[2])){_79=_7d;return null;}else{return [1,[0,[0,_7f],[0,_7g]],new T(function(){return _78(_7d);})];}}}else{_79=_7d;return null;}}else{_79=_7d;return null;}}else{_79=_7d;return null;}}else{_79=_7d;return null;}}})(_79);if(_7a!=null){return _7a;}}};return _78(_6N);}else{return [1,[0,[0,_6S],[0,_6U]],new T(function(){var _7i=function(_7j){while(1){var _7k=(function(_7l){var _7m=E(_7l);if(!_7m[0]){return [0];}else{var _7n=_7m[2],_7o=E(_7m[1]),_7p=_6R+E(_7o[1])[1]|0;if(_7p>=0){var _7q=_6T+E(_7o[2])[1]|0;if(_7q>=0){if(_7p<=7){if(_7q<=7){var _7r=_1p(_45,_7p,_7q);if(!_7r[0]){return [1,[0,[0,_7p],[0,_7q]],new T(function(){return _7i(_7n);})];}else{if(!E(E(_7r[1])[2])){_7j=_7n;return null;}else{return [1,[0,[0,_7p],[0,_7q]],new T(function(){return _7i(_7n);})];}}}else{_7j=_7n;return null;}}else{_7j=_7n;return null;}}else{_7j=_7n;return null;}}else{_7j=_7n;return null;}}})(_7j);if(_7k!=null){return _7k;}}};return _7i(_6N);})];}}else{if(!E(_77)){return [1,[0,[0,_6S],[0,_6U]],new T(function(){var _7s=function(_7t){while(1){var _7u=(function(_7v){var _7w=E(_7v);if(!_7w[0]){return [0];}else{var _7x=_7w[2],_7y=E(_7w[1]),_7z=_6R+E(_7y[1])[1]|0;if(_7z>=0){var _7A=_6T+E(_7y[2])[1]|0;if(_7A>=0){if(_7z<=7){if(_7A<=7){var _7B=_1p(_45,_7z,_7A);if(!_7B[0]){return [1,[0,[0,_7z],[0,_7A]],new T(function(){return _7s(_7x);})];}else{if(!E(E(_7B[1])[2])){return [1,[0,[0,_7z],[0,_7A]],new T(function(){return _7s(_7x);})];}else{_7t=_7x;return null;}}}else{_7t=_7x;return null;}}else{_7t=_7x;return null;}}else{_7t=_7x;return null;}}else{_7t=_7x;return null;}}})(_7t);if(_7u!=null){return _7u;}}};return _7s(_6N);})];}else{var _7C=function(_7D){while(1){var _7E=(function(_7F){var _7G=E(_7F);if(!_7G[0]){return [0];}else{var _7H=_7G[2],_7I=E(_7G[1]),_7J=_6R+E(_7I[1])[1]|0;if(_7J>=0){var _7K=_6T+E(_7I[2])[1]|0;if(_7K>=0){if(_7J<=7){if(_7K<=7){var _7L=_1p(_45,_7J,_7K);if(!_7L[0]){return [1,[0,[0,_7J],[0,_7K]],new T(function(){return _7C(_7H);})];}else{if(!E(E(_7L[1])[2])){return [1,[0,[0,_7J],[0,_7K]],new T(function(){return _7C(_7H);})];}else{_7D=_7H;return null;}}}else{_7D=_7H;return null;}}else{_7D=_7H;return null;}}else{_7D=_7H;return null;}}else{_7D=_7H;return null;}}})(_7D);if(_7E!=null){return _7E;}}};return _7C(_6N);}}}}else{var _7M=function(_7N){while(1){var _7O=(function(_7P){var _7Q=E(_7P);if(!_7Q[0]){return [0];}else{var _7R=_7Q[2],_7S=E(_7Q[1]),_7T=_6R+E(_7S[1])[1]|0;if(_7T>=0){var _7U=_6T+E(_7S[2])[1]|0;if(_7U>=0){if(_7T<=7){if(_7U<=7){var _7V=_1p(_45,_7T,_7U);if(!_7V[0]){return [1,[0,[0,_7T],[0,_7U]],new T(function(){return _7M(_7R);})];}else{var _7W=E(_7V[1])[2];if(!E(_48)){if(!E(_7W)){_7N=_7R;return null;}else{return [1,[0,[0,_7T],[0,_7U]],new T(function(){return _7M(_7R);})];}}else{if(!E(_7W)){return [1,[0,[0,_7T],[0,_7U]],new T(function(){return _7M(_7R);})];}else{_7N=_7R;return null;}}}}else{_7N=_7R;return null;}}else{_7N=_7R;return null;}}else{_7N=_7R;return null;}}else{_7N=_7R;return null;}}})(_7N);if(_7O!=null){return _7O;}}};return _7M(_6N);}}else{var _7X=function(_7Y){while(1){var _7Z=(function(_80){var _81=E(_80);if(!_81[0]){return [0];}else{var _82=_81[2],_83=E(_81[1]),_84=_6R+E(_83[1])[1]|0;if(_84>=0){var _85=_6T+E(_83[2])[1]|0;if(_85>=0){if(_84<=7){if(_85<=7){var _86=_1p(_45,_84,_85);if(!_86[0]){return [1,[0,[0,_84],[0,_85]],new T(function(){return _7X(_82);})];}else{var _87=E(_86[1])[2];if(!E(_48)){if(!E(_87)){_7Y=_82;return null;}else{return [1,[0,[0,_84],[0,_85]],new T(function(){return _7X(_82);})];}}else{if(!E(_87)){return [1,[0,[0,_84],[0,_85]],new T(function(){return _7X(_82);})];}else{_7Y=_82;return null;}}}}else{_7Y=_82;return null;}}else{_7Y=_82;return null;}}else{_7Y=_82;return null;}}else{_7Y=_82;return null;}}})(_7Y);if(_7Z!=null){return _7Z;}}};return _7X(_6N);}}else{var _88=function(_89){while(1){var _8a=(function(_8b){var _8c=E(_8b);if(!_8c[0]){return [0];}else{var _8d=_8c[2],_8e=E(_8c[1]),_8f=_6R+E(_8e[1])[1]|0;if(_8f>=0){var _8g=_6T+E(_8e[2])[1]|0;if(_8g>=0){if(_8f<=7){if(_8g<=7){var _8h=_1p(_45,_8f,_8g);if(!_8h[0]){return [1,[0,[0,_8f],[0,_8g]],new T(function(){return _88(_8d);})];}else{var _8i=E(_8h[1])[2];if(!E(_48)){if(!E(_8i)){_89=_8d;return null;}else{return [1,[0,[0,_8f],[0,_8g]],new T(function(){return _88(_8d);})];}}else{if(!E(_8i)){return [1,[0,[0,_8f],[0,_8g]],new T(function(){return _88(_8d);})];}else{_89=_8d;return null;}}}}else{_89=_8d;return null;}}else{_89=_8d;return null;}}else{_89=_8d;return null;}}else{_89=_8d;return null;}}})(_89);if(_8a!=null){return _8a;}}};return _88(_6N);}}else{var _8j=function(_8k){while(1){var _8l=(function(_8m){var _8n=E(_8m);if(!_8n[0]){return [0];}else{var _8o=_8n[2],_8p=E(_8n[1]),_8q=_6R+E(_8p[1])[1]|0;if(_8q>=0){var _8r=E(_6P)[1]+E(_8p[2])[1]|0;if(_8r>=0){if(_8q<=7){if(_8r<=7){var _8s=_1p(_45,_8q,_8r);if(!_8s[0]){return [1,[0,[0,_8q],[0,_8r]],new T(function(){return _8j(_8o);})];}else{var _8t=E(_8s[1])[2];if(!E(_48)){if(!E(_8t)){_8k=_8o;return null;}else{return [1,[0,[0,_8q],[0,_8r]],new T(function(){return _8j(_8o);})];}}else{if(!E(_8t)){return [1,[0,[0,_8q],[0,_8r]],new T(function(){return _8j(_8o);})];}else{_8k=_8o;return null;}}}}else{_8k=_8o;return null;}}else{_8k=_8o;return null;}}else{_8k=_8o;return null;}}else{_8k=_8o;return null;}}})(_8k);if(_8l!=null){return _8l;}}};return _8j(_6N);}}break;case 5:var _8u=E(_46),_8v=_8u[2],_8w=E(_8u[1])[1],_8x=function(_8y){var _8z=new T(function(){var _8A=function(_8B){var _8C=new T(function(){var _8D=function(_8E){if(_8E>=0){var _8F=E(_8v),_8G=_8F[1]+(-1)|0;if(_8G>=0){if(_8E<=7){if(_8G<=7){var _8H=_1p(_45,_8E,_8G);if(!_8H[0]){return _3g(_45,_8w,_8F,_3u,_48);}else{var _8I=E(_8H[1])[2];return E(_48)==0?E(_8I)==0?_3g(_45,_8w,_8F,_3u,_3t):[1,[0,[0,_8E],[0,_8G]],new T(function(){return _3g(_45,_8w,_8F,_3u,_3t);})]:E(_8I)==0?[1,[0,[0,_8E],[0,_8G]],new T(function(){return _3g(_45,_8w,_8F,_3u,_3v);})]:_3g(_45,_8w,_8F,_3u,_3v);}}else{return _3g(_45,_8w,_8F,_3u,_48);}}else{return _3g(_45,_8w,_8F,_3u,_48);}}else{return _3g(_45,_8w,_8F,_3u,_48);}}else{return _3g(_45,_8w,_8v,_3u,_48);}};return E(_48)==0?_8D(_8w+1|0):_8D(_8w+(-1)|0);});if(_8B>=0){var _8J=E(_8v)[1]+1|0;if(_8J>=0){if(_8B<=7){if(_8J<=7){var _8K=_1p(_45,_8B,_8J);if(!_8K[0]){return E(_8C);}else{var _8L=E(_8K[1])[2];return E(_48)==0?E(_8L)==0?E(_8C):[1,[0,[0,_8B],[0,_8J]],_8C]:E(_8L)==0?[1,[0,[0,_8B],[0,_8J]],_8C]:E(_8C);}}else{return E(_8C);}}else{return E(_8C);}}else{return E(_8C);}}else{return E(_8C);}};return E(_48)==0?_8A(_8w+1|0):_8A(_8w+(-1)|0);});if(_8y>=0){var _8M=E(_8v),_8N=_8M[1];return _8N>=0?_8y<=7?_8N<=7?_1p(_45,_8y,_8N)[0]==0?[1,[0,[0,_8y],_8M],_8z]:E(_8z):E(_8z):E(_8z):E(_8z);}else{return E(_8z);}};return E(_48)==0?_8x(_8w+1|0):_8x(_8w+(-1)|0);default:var _8O=function(_8P,_8Q,_8R){var _8S=E(_46),_8T=_8S[2],_8U=E(_8S[1])[1];return _2l(_1G(1,_8U,_8T,_45,_48,_8P,_8Q),new T(function(){var _8V=function(_8W){var _8X=E(_8W);if(!_8X[0]){return [0];}else{var _8Y=E(_8X[1]);return _2l(_1G(1,_8U,_8T,_45,_48,E(_8Y[1])[1],_8Y[2]),new T(function(){return _8V(_8X[2]);}));}};return _8V(_8R);}));};switch(E(_49)){case 0:return _8O(0,_3w,_3M);case 2:return _8O(1,_3w,_3D);default:var _8Z=E(_3P);if(!_8Z[0]){return [0];}else{var _90=E(_46),_91=_90[2],_92=E(_90[1])[1],_93=E(_8Z[1]);return _2l(_1G(1,_92,_91,_45,_48,E(_93[1])[1],_93[2]),new T(function(){var _94=function(_95){var _96=E(_95);if(!_96[0]){return [0];}else{var _97=E(_96[1]);return _2l(_1G(1,_92,_91,_45,_48,E(_97[1])[1],_97[2]),new T(function(){return _94(_96[2]);}));}};return _94(_8Z[2]);}));}}}},_98=function(_99,_9a){var _9b=E(_9a)[1];return _9b>=0?_l(_99,_9b):E(_i);},_9c=function(_9d,_9e,_9f){var _9g=E(_9d);if(!_9g[0]){return [0];}else{var _9h=_9g[1],_9i=_9g[2],_9j=E(_9f);return _9j==0?[1,new T(function(){return A(_9e,[_9h]);}),_9i]:[1,_9h,new T(function(){return _9c(_9i,_9e,_9j-1|0);})];}},_9k=function(_9l,_9m,_9n,_9o){var _9p=function(_9q){var _9r=E(_9q);if(!_9r[0]){return [0];}else{var _9s=_9r[2],_9t=E(E(_9m)[1]);return _9t==0?[1,_9n,_9s]:[1,_9r[1],new T(function(){return _9c(_9s,function(_9u){return E(_9n);},_9t-1|0);})];}},_9v=E(_9o);if(!_9v[0]){return [0];}else{var _9w=_9v[1],_9x=_9v[2],_9y=E(E(_9l)[1]);return _9y==0?[1,new T(function(){return _9p(_9w);}),_9x]:[1,_9w,new T(function(){return _9c(_9x,_9p,_9y-1|0);})];}},_9z=[0],_9A=function(_9B,_9C,_9D,_9E,_9F){return _9k(_9D,_9E,new T(function(){var _9G=E(_9C)[1];return _9G>=0?_l(_98(_9F,_9B),_9G):E(_i);}),_9k(_9B,_9C,_9z,_9F));},_9H=function(_9I,_9J){var _9K=E(_9J);return _9K[0]==0?[0]:[1,new T(function(){return A(_9I,[_9K[1]]);}),new T(function(){return _9H(_9I,_9K[2]);})];},_9L=function(_9M,_9N,_9O){var _9P=_1p(_9M,_9N,_9O);if(!_9P[0]){return [0];}else{var _9Q=E(_9P[1]),_9R=[0,_9O],_9S=[0,_9N];return _9H(function(_9T){var _9U=E(_9T);return _9A(_9S,_9R,_9U[1],_9U[2],_9M);},_44(_9M,[0,_9S,_9R],_9Q[1],_9Q[2]));}},_9V=function(_9W,_9X){var _9Y=E(_9X);return _9L(_9W,E(_9Y[1])[1],E(_9Y[2])[1]);},_9Z=function(_a0,_a1){var _a2=new T(function(){return E(_a0)==0?1:0;}),_a3=function(_a4){var _a5=E(_a4);if(!_a5[0]){return [0];}else{var _a6=new T(function(){return _a3(_a5[2]);}),_a7=function(_a8){var _a9=E(_a8);return _a9[0]==0?E(_a6):[1,[0,_a2,_a9[1]],new T(function(){return _a7(_a9[2]);})];};return _a7(_9V(_a1,_a5[1]));}};return _a3(_w(_a0,_a1));},_aa=[0,0],_ab=function(_ac){var _ad=E(_ac);return _ad[0]==0?[0]:_2l(_ad[1],new T(function(){return _ab(_ad[2]);}));},_ae=function(_af){return E(E(_af)[2]);},_ag=function(_ah,_ai){var _aj=E(_ah);if(!_aj){return [0,_ai,_1t];}else{var _ak=_0(_aa,_aa,_ab(_ae(_ai))),_al=E(_ak[1])[1]-E(_ak[2])[1]|0;return _al<=900?_al>=(-900)?[0,_ai,new T(function(){var _am=E(_ai);return _9H(function(_an){var _ao=_ag(_aj-1|0,_an);return [0,_ao[1],_ao[2]];},_9Z(_am[1],_am[2]));})]:[0,_ai,_1t]:[0,_ai,_1t];}},_ap=function(_aq){var _ar=_0(_aa,_aa,_ab(_aq));return E(_ar[1])[1]-E(_ar[2])[1]|0;},_as=function(_at,_au){while(1){var _av=E(_au);if(!_av[0]){return E(_at);}else{var _aw=_av[2],_ax=E(_av[1])[1];if(_at>_ax){_au=_aw;continue;}else{_at=_ax;_au=_aw;continue;}}}},_ay=function(_az,_aA){while(1){var _aB=E(_aA);if(!_aB[0]){return E(_az);}else{var _aC=_aB[2],_aD=E(_aB[1])[1];if(_az>_aD){_az=_aD;_aA=_aC;continue;}else{_aA=_aC;continue;}}}},_aE=unCStr(": empty list"),_aF=unCStr("Prelude."),_aG=function(_aH){return err(_2l(_aF,new T(function(){return _2l(_aH,_aE);})));},_aI=unCStr("maximum"),_aJ=new T(function(){return _aG(_aI);}),_aK=unCStr("minimum"),_aL=new T(function(){return _aG(_aK);}),_aM=function(_aN){var _aO=E(_aN),_aP=_aO[1],_aQ=E(_aO[2]);if(!_aQ[0]){return _ap(E(_aP)[2]);}else{if(!E(E(_aP)[1])){var _aR=_9H(_aS,_aQ);return _aR[0]==0?E(_aL):_ay(E(_aR[1])[1],_aR[2]);}else{var _aT=_9H(_aS,_aQ);return _aT[0]==0?E(_aJ):_as(E(_aT[1])[1],_aT[2]);}}},_aS=function(_aU){return [0,_aM(_aU)];},_aV=function(_aW){return [0,new T(function(){return _aS(_aW);}),new T(function(){return E(E(_aW)[1]);})];},_aX=function(_aY,_aZ){if(!E(_aY)){var _b0=_0(_aa,_aa,_ab(_aZ));return (E(_b0[1])[1]-E(_b0[2])[1]|0)<(-900);}else{var _b1=_0(_aa,_aa,_ab(_aZ));return (E(_b1[1])[1]-E(_b1[2])[1]|0)>900;}},_b2=new T(function(){return _3d("Minimax.hs:(41,1)-(44,83)|function findBest");}),_b3=function(_b4,_b5,_b6,_b7){var _b8=E(_b7);if(!_b8[0]){return E(_b6);}else{var _b9=E(_b6);if(!_aX(_b4,E(_b9[2])[2])){var _ba=new T(function(){return _b3(_b4,_b5,_b8[1],_b8[2]);}),_bb=new T(function(){return E(E(_ba)[1]);});return !A(_b5,[_b9[1],_bb])?[0,_bb,new T(function(){return E(E(_ba)[2]);})]:E(_b9);}else{return E(_b9);}}},_bc=function(_bd,_be,_bf){var _bg=E(_bf);if(!_bg[0]){return E(_b2);}else{var _bh=_bg[1],_bi=E(_bg[2]);if(!_bi[0]){return E(_bh);}else{var _bj=E(_bh);if(!_aX(_bd,E(_bj[2])[2])){var _bk=new T(function(){return _b3(_bd,_be,_bi[1],_bi[2]);}),_bl=new T(function(){return E(E(_bk)[1]);});return !A(_be,[_bj[1],_bl])?[0,_bl,new T(function(){return E(E(_bk)[2]);})]:E(_bj);}else{return E(_bj);}}}},_bm=function(_bn,_bo){return E(_bn)[1]>E(_bo)[1];},_bp=function(_bq,_br){return E(_bq)[1]<E(_br)[1];},_bs=function(_bt){var _bu=_ag(3,_bt),_bv=_bu[1],_bw=E(_bu[2]);if(!_bw[0]){return E(_bv);}else{var _bx=E(_bv)[1];return E(_bc(_bx,new T(function(){return E(_bx)==0?E(_bp):E(_bm);}),_9H(_aV,_bw))[2]);}},_by=[0,66],_bz=[0,80],_bA=[0,81],_bB=[0,75],_bC=[0,78],_bD=[0,82],_bE=[0,87],_bF=[0,32],_bG=[1,_bF,_1t],_bH=[1,_bE,_bG],_bI=[1,_by,_bG],_bJ=unCStr("-- "),_bK=function(_bL){var _bM=E(_bL);if(!_bM[0]){return E(_bJ);}else{var _bN=E(_bM[1]),_bO=_bN[2];switch(E(_bN[1])){case 0:return [1,_bD,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];case 1:return [1,_bC,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];case 2:return [1,_by,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];case 3:return [1,_bB,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];case 4:return [1,_bA,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];default:return [1,_bz,new T(function(){return E(_bO)==0?E(_bI):E(_bH);})];}}},_bP=function(_bQ){var _bR=E(_bQ);return _bR[0]==0?[0]:_2l(_bK(_bR[1]),new T(function(){return _bP(_bR[2]);}));},_bS=function(_bT){return _bP(_bT);},_bU=[0,10],_bV=function(_bW){var _bX=E(_bW);return _bX[0]==0?[0]:_2l(_bX[1],[1,_bU,new T(function(){return _bV(_bX[2]);})]);},_bY=function(_bZ,_){while(1){var _c0=E(_bZ),_c1=post_message(toJSStr(_bV(_9H(_bS,_c0[2]))));_bZ=_bs(_c0);continue;}},_c2=[1,_9z,_1t],_c3=[1,_9z,_c2],_c4=[1,_9z,_c3],_c5=[1,_9z,_c4],_c6=[1,_9z,_c5],_c7=[1,_9z,_c6],_c8=[1,_9z,_c7],_c9=[1,_9z,_c8],_ca=[0,_3u,_3v],_cb=[1,_ca],_cc=[1,_cb,_1t],_cd=[1,_ca],_ce=[1,_cd,_cc],_cf=[1,_ca],_cg=[1,_cf,_ce],_ch=[1,_ca],_ci=[1,_ch,_cg],_cj=[1,_ca],_ck=[1,_cj,_ci],_cl=[1,_ca],_cm=[1,_cl,_ck],_cn=[1,_ca],_co=[1,_cn,_cm],_cp=[1,_ca],_cq=[1,_cp,_co],_cr=0,_cs=[0,_cr,_3v],_ct=[1,_cs],_cu=[1,_cs],_cv=[1,_cu,_1t],_cw=1,_cx=[0,_cw,_3v],_cy=[1,_cx],_cz=[1,_cy,_cv],_cA=2,_cB=[0,_cA,_3v],_cC=[1,_cB],_cD=[1,_cC,_cz],_cE=3,_cF=[0,_cE,_3v],_cG=[1,_cF],_cH=[1,_cG,_cD],_cI=4,_cJ=[0,_cI,_3v],_cK=[1,_cJ],_cL=[1,_cK,_cH],_cM=[1,_cB],_cN=[1,_cM,_cL],_cO=[1,_cx],_cP=[1,_cO,_cN],_cQ=[1,_ct,_cP],_cR=[1,_cQ,_1t],_cS=[1,_cq,_cR],_cT=[1,_c9,_cS],_cU=[1,_9z,_c2],_cV=[1,_9z,_cU],_cW=[1,_9z,_cV],_cX=[1,_9z,_cW],_cY=[1,_9z,_cX],_cZ=[1,_9z,_cY],_d0=[1,_9z,_cZ],_d1=[1,_d0,_cT],_d2=[1,_9z,_c2],_d3=[1,_9z,_d2],_d4=[1,_9z,_d3],_d5=[1,_9z,_d4],_d6=[1,_9z,_d5],_d7=[1,_9z,_d6],_d8=[1,_9z,_d7],_d9=[1,_d8,_d1],_da=[1,_9z,_c2],_db=[1,_9z,_da],_dc=[1,_9z,_db],_dd=[1,_9z,_dc],_de=[1,_9z,_dd],_df=[1,_9z,_de],_dg=[1,_9z,_df],_dh=[1,_dg,_d9],_di=[0,_3u,_3t],_dj=[1,_di],_dk=[1,_dj,_1t],_dl=[1,_di],_dm=[1,_dl,_dk],_dn=[1,_di],_do=[1,_dn,_dm],_dp=[1,_di],_dq=[1,_dp,_do],_dr=[1,_di],_ds=[1,_dr,_dq],_dt=[1,_di],_du=[1,_dt,_ds],_dv=[1,_di],_dw=[1,_dv,_du],_dx=[1,_di],_dy=[1,_dx,_dw],_dz=[1,_dy,_dh],_dA=[0,_cr,_3t],_dB=[1,_dA],_dC=[0,_cw,_3t],_dD=[1,_dC],_dE=[0,_cA,_3t],_dF=[1,_dE],_dG=[0,_cI,_3t],_dH=[1,_dG],_dI=[0,_cE,_3t],_dJ=[1,_dI],_dK=[1,_dE],_dL=[1,_dC],_dM=[1,_dA],_dN=[1,_dM,_1t],_dO=[1,_dL,_dN],_dP=[1,_dK,_dO],_dQ=[1,_dJ,_dP],_dR=[1,_dH,_dQ],_dS=[1,_dF,_dR],_dT=[1,_dD,_dS],_dU=[1,_dB,_dT],_dV=[1,_dU,_dz],_dW=[0,_3v,_dV],_dX=function(_){return _bY(_dW,_);},_dY=function(_){return _dX(_);};
var hasteMain = function() {A(_dY, [0]);};hasteMain();
