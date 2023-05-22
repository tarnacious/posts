;(function(){
function h(a) {
  return function() {
    return this[a]
  }
}
function p(a) {
  return function() {
    return a
  }
}
var r, aa = this;
function s(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function ba(a) {
  return"string" == typeof a
}
function ca(a) {
  return a[da] || (a[da] = ++ea)
}
var da = "closure_uid_" + (1E9 * Math.random() >>> 0), ea = 0;
var ga = Array.prototype, ha = ga.indexOf ? function(a, b, c) {
  return ga.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(ba(a)) {
    return ba(b) && 1 == b.length ? a.indexOf(b, c) : -1
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
function ia(a, b) {
  null != a && this.append.apply(this, arguments)
}
ia.prototype.Ba = "";
ia.prototype.append = function(a, b, c) {
  this.Ba += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.Ba += arguments[d]
    }
  }
  return this
};
ia.prototype.toString = h("Ba");
function t(a) {
  return null != a && !1 !== a
}
function ja(a) {
  return t(a) ? !1 : !0
}
function u(a, b) {
  return a[s(null == b ? null : b)] ? !0 : a._ ? !0 : w ? !1 : null
}
function ka(a) {
  return null == a ? null : a.constructor
}
function x(a, b) {
  var c = ka(b), c = t(t(c) ? c.wa : c) ? c.va : s(b);
  return Error(["No protocol method ", a, " defined for type ", c, ": ", b].join(""))
}
function la(a) {
  var b = a.va;
  return t(b) ? b : "" + y(a)
}
function ma(a) {
  return Array.prototype.slice.call(arguments)
}
var na = {}, pa = {};
function qa(a) {
  if(a ? a.H : a) {
    return a.H(a)
  }
  var b;
  b = qa[s(null == a ? null : a)];
  if(!b && (b = qa._, !b)) {
    throw x("ICounted.-count", a);
  }
  return b.call(null, a)
}
var ra = {};
function sa(a, b) {
  if(a ? a.G : a) {
    return a.G(a, b)
  }
  var c;
  c = sa[s(null == a ? null : a)];
  if(!c && (c = sa._, !c)) {
    throw x("ICollection.-conj", a);
  }
  return c.call(null, a, b)
}
var ta = {}, z = function() {
  function a(a, b, c) {
    if(a ? a.Y : a) {
      return a.Y(a, b, c)
    }
    var g;
    g = z[s(null == a ? null : a)];
    if(!g && (g = z._, !g)) {
      throw x("IIndexed.-nth", a);
    }
    return g.call(null, a, b, c)
  }
  function b(a, b) {
    if(a ? a.J : a) {
      return a.J(a, b)
    }
    var c;
    c = z[s(null == a ? null : a)];
    if(!c && (c = z._, !c)) {
      throw x("IIndexed.-nth", a);
    }
    return c.call(null, a, b)
  }
  var c = null, c = function(d, c, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, d, c);
      case 3:
        return a.call(this, d, c, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}(), ua = {};
function A(a) {
  if(a ? a.Q : a) {
    return a.Q(a)
  }
  var b;
  b = A[s(null == a ? null : a)];
  if(!b && (b = A._, !b)) {
    throw x("ISeq.-first", a);
  }
  return b.call(null, a)
}
function B(a) {
  if(a ? a.S : a) {
    return a.S(a)
  }
  var b;
  b = B[s(null == a ? null : a)];
  if(!b && (b = B._, !b)) {
    throw x("ISeq.-rest", a);
  }
  return b.call(null, a)
}
var va = {}, wa = function() {
  function a(a, b, c) {
    if(a ? a.N : a) {
      return a.N(a, b, c)
    }
    var g;
    g = wa[s(null == a ? null : a)];
    if(!g && (g = wa._, !g)) {
      throw x("ILookup.-lookup", a);
    }
    return g.call(null, a, b, c)
  }
  function b(a, b) {
    if(a ? a.M : a) {
      return a.M(a, b)
    }
    var c;
    c = wa[s(null == a ? null : a)];
    if(!c && (c = wa._, !c)) {
      throw x("ILookup.-lookup", a);
    }
    return c.call(null, a, b)
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}();
function xa(a, b, c) {
  if(a ? a.Ca : a) {
    return a.Ca(a, b, c)
  }
  var d;
  d = xa[s(null == a ? null : a)];
  if(!d && (d = xa._, !d)) {
    throw x("IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c)
}
var ya = {}, za = {};
function Aa(a) {
  if(a ? a.zb : a) {
    return a.zb()
  }
  var b;
  b = Aa[s(null == a ? null : a)];
  if(!b && (b = Aa._, !b)) {
    throw x("IMapEntry.-key", a);
  }
  return b.call(null, a)
}
function Ba(a) {
  if(a ? a.Ab : a) {
    return a.Ab()
  }
  var b;
  b = Ba[s(null == a ? null : a)];
  if(!b && (b = Ba._, !b)) {
    throw x("IMapEntry.-val", a);
  }
  return b.call(null, a)
}
var Ca = {};
function Da(a, b, c) {
  if(a ? a.pb : a) {
    return a.pb(a, b, c)
  }
  var d;
  d = Da[s(null == a ? null : a)];
  if(!d && (d = Da._, !d)) {
    throw x("IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c)
}
function Ea(a) {
  if(a ? a.$a : a) {
    return a.$a(a)
  }
  var b;
  b = Ea[s(null == a ? null : a)];
  if(!b && (b = Ea._, !b)) {
    throw x("IDeref.-deref", a);
  }
  return b.call(null, a)
}
var Fa = {};
function Ga(a) {
  if(a ? a.v : a) {
    return a.v(a)
  }
  var b;
  b = Ga[s(null == a ? null : a)];
  if(!b && (b = Ga._, !b)) {
    throw x("IMeta.-meta", a);
  }
  return b.call(null, a)
}
function Ha(a, b) {
  if(a ? a.w : a) {
    return a.w(a, b)
  }
  var c;
  c = Ha[s(null == a ? null : a)];
  if(!c && (c = Ha._, !c)) {
    throw x("IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b)
}
var Ia = {}, Ja = function() {
  function a(a, b, c) {
    if(a ? a.P : a) {
      return a.P(a, b, c)
    }
    var g;
    g = Ja[s(null == a ? null : a)];
    if(!g && (g = Ja._, !g)) {
      throw x("IReduce.-reduce", a);
    }
    return g.call(null, a, b, c)
  }
  function b(a, b) {
    if(a ? a.O : a) {
      return a.O(a, b)
    }
    var c;
    c = Ja[s(null == a ? null : a)];
    if(!c && (c = Ja._, !c)) {
      throw x("IReduce.-reduce", a);
    }
    return c.call(null, a, b)
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}();
function Ka(a, b) {
  if(a ? a.u : a) {
    return a.u(a, b)
  }
  var c;
  c = Ka[s(null == a ? null : a)];
  if(!c && (c = Ka._, !c)) {
    throw x("IEquiv.-equiv", a);
  }
  return c.call(null, a, b)
}
function Ma(a) {
  if(a ? a.B : a) {
    return a.B(a)
  }
  var b;
  b = Ma[s(null == a ? null : a)];
  if(!b && (b = Ma._, !b)) {
    throw x("IHash.-hash", a);
  }
  return b.call(null, a)
}
var Na = {};
function Oa(a) {
  if(a ? a.F : a) {
    return a.F(a)
  }
  var b;
  b = Oa[s(null == a ? null : a)];
  if(!b && (b = Oa._, !b)) {
    throw x("ISeqable.-seq", a);
  }
  return b.call(null, a)
}
var Pa = {}, Qa = {};
function Ra(a) {
  if(a ? a.ob : a) {
    return a.ob(a)
  }
  var b;
  b = Ra[s(null == a ? null : a)];
  if(!b && (b = Ra._, !b)) {
    throw x("IReversible.-rseq", a);
  }
  return b.call(null, a)
}
function C(a, b) {
  if(a ? a.Db : a) {
    return a.Db(0, b)
  }
  var c;
  c = C[s(null == a ? null : a)];
  if(!c && (c = C._, !c)) {
    throw x("IWriter.-write", a);
  }
  return c.call(null, a, b)
}
function Sa(a) {
  if(a ? a.Tb : a) {
    return null
  }
  var b;
  b = Sa[s(null == a ? null : a)];
  if(!b && (b = Sa._, !b)) {
    throw x("IWriter.-flush", a);
  }
  return b.call(null, a)
}
var Ta = {};
function Ua(a, b, c) {
  if(a ? a.t : a) {
    return a.t(a, b, c)
  }
  var d;
  d = Ua[s(null == a ? null : a)];
  if(!d && (d = Ua._, !d)) {
    throw x("IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c)
}
function Va(a, b, c) {
  if(a ? a.Cb : a) {
    return a.Cb(0, b, c)
  }
  var d;
  d = Va[s(null == a ? null : a)];
  if(!d && (d = Va._, !d)) {
    throw x("IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c)
}
function Wa(a) {
  if(a ? a.Ma : a) {
    return a.Ma(a)
  }
  var b;
  b = Wa[s(null == a ? null : a)];
  if(!b && (b = Wa._, !b)) {
    throw x("IEditableCollection.-as-transient", a);
  }
  return b.call(null, a)
}
function Xa(a, b) {
  if(a ? a.Na : a) {
    return a.Na(a, b)
  }
  var c;
  c = Xa[s(null == a ? null : a)];
  if(!c && (c = Xa._, !c)) {
    throw x("ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b)
}
function Ya(a) {
  if(a ? a.Oa : a) {
    return a.Oa(a)
  }
  var b;
  b = Ya[s(null == a ? null : a)];
  if(!b && (b = Ya._, !b)) {
    throw x("ITransientCollection.-persistent!", a);
  }
  return b.call(null, a)
}
function Za(a, b, c) {
  if(a ? a.Ea : a) {
    return a.Ea(a, b, c)
  }
  var d;
  d = Za[s(null == a ? null : a)];
  if(!d && (d = Za._, !d)) {
    throw x("ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c)
}
function $a(a, b, c) {
  if(a ? a.Bb : a) {
    return a.Bb(0, b, c)
  }
  var d;
  d = $a[s(null == a ? null : a)];
  if(!d && (d = $a._, !d)) {
    throw x("ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c)
}
function ab(a) {
  if(a ? a.vb : a) {
    return a.vb()
  }
  var b;
  b = ab[s(null == a ? null : a)];
  if(!b && (b = ab._, !b)) {
    throw x("IChunk.-drop-first", a);
  }
  return b.call(null, a)
}
function bb(a) {
  if(a ? a.Ya : a) {
    return a.Ya(a)
  }
  var b;
  b = bb[s(null == a ? null : a)];
  if(!b && (b = bb._, !b)) {
    throw x("IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a)
}
function cb(a) {
  if(a ? a.Za : a) {
    return a.Za(a)
  }
  var b;
  b = cb[s(null == a ? null : a)];
  if(!b && (b = cb._, !b)) {
    throw x("IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a)
}
function db(a) {
  if(a ? a.Xa : a) {
    return a.Xa(a)
  }
  var b;
  b = db[s(null == a ? null : a)];
  if(!b && (b = db._, !b)) {
    throw x("IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a)
}
function eb(a) {
  this.dc = a;
  this.o = 0;
  this.e = 1073741824
}
eb.prototype.Db = function(a, b) {
  return this.dc.append(b)
};
eb.prototype.Tb = p(null);
function fb(a) {
  var b = new ia, c = new eb(b);
  a.t(null, c, gb([hb, !0, ib, !0, jb, !1, kb, !1]));
  Sa(c);
  return"" + y(b)
}
function D(a, b, c, d, e) {
  this.ra = a;
  this.name = b;
  this.ta = c;
  this.na = d;
  this.Aa = e;
  this.e = 2154168321;
  this.o = 4096
}
r = D.prototype;
r.t = function(a, b) {
  return C(b, this.ta)
};
r.B = function() {
  var a = this.na;
  return null != a ? a : this.na = a = lb.a ? lb.a(F.b ? F.b(this.ra) : F.call(null, this.ra), F.b ? F.b(this.name) : F.call(null, this.name)) : lb.call(null, F.b ? F.b(this.ra) : F.call(null, this.ra), F.b ? F.b(this.name) : F.call(null, this.name))
};
r.w = function(a, b) {
  return new D(this.ra, this.name, this.ta, this.na, b)
};
r.v = h("Aa");
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return wa.d(c, this, null);
      case 3:
        return wa.d(c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return wa.d(a, this, null)
};
r.a = function(a, b) {
  return wa.d(a, this, b)
};
r.u = function(a, b) {
  return b instanceof D ? this.ta === b.ta : !1
};
r.toString = h("ta");
function G(a) {
  if(null == a) {
    return null
  }
  if(a && (a.e & 8388608 || a.qc)) {
    return a.F(null)
  }
  if(a instanceof Array || "string" === typeof a) {
    return 0 === a.length ? null : new mb(a, 0)
  }
  if(u(Na, a)) {
    return Oa(a)
  }
  if(w) {
    throw Error([y(a), y("is not ISeqable")].join(""));
  }
  return null
}
function I(a) {
  if(null == a) {
    return null
  }
  if(a && (a.e & 64 || a.Da)) {
    return a.Q(null)
  }
  a = G(a);
  return null == a ? null : A(a)
}
function J(a) {
  return null != a ? a && (a.e & 64 || a.Da) ? a.S(null) : (a = G(a)) ? B(a) : K : K
}
function L(a) {
  return null == a ? null : a && (a.e & 128 || a.oc) ? a.fa(null) : G(J(a))
}
var nb = function() {
  function a(a, b) {
    return a === b || Ka(a, b)
  }
  var b = null, c = function() {
    function a(b, d, k) {
      var l = null;
      2 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, l)
    }
    function c(a, d, e) {
      for(;;) {
        if(b.a(a, d)) {
          if(L(e)) {
            a = d, d = I(e), e = L(e)
          }else {
            return b.a(d, I(e))
          }
        }else {
          return!1
        }
      }
    }
    a.n = 2;
    a.j = function(a) {
      var b = I(a);
      a = L(a);
      var d = I(a);
      a = J(a);
      return c(b, d, a)
    };
    a.g = c;
    return a
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a.call(this, b, e);
      default:
        return c.g(b, e, M(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 2;
  b.j = c.j;
  b.b = p(!0);
  b.a = a;
  b.g = c.g;
  return b
}();
Ma["null"] = p(0);
pa["null"] = !0;
qa["null"] = p(0);
Ka["null"] = function(a, b) {
  return null == b
};
Ha["null"] = p(null);
Fa["null"] = !0;
Ga["null"] = p(null);
ya["null"] = !0;
Date.prototype.u = function(a, b) {
  return b instanceof Date && this.toString() === b.toString()
};
Ka.number = function(a, b) {
  return a === b
};
Fa["function"] = !0;
Ga["function"] = p(null);
na["function"] = !0;
Ma._ = function(a) {
  return ca(a)
};
var ob = function() {
  function a(a, b, c, d) {
    for(var l = qa(a);;) {
      if(d < l) {
        c = b.a ? b.a(c, z.a(a, d)) : b.call(null, c, z.a(a, d)), d += 1
      }else {
        return c
      }
    }
  }
  function b(a, b, c) {
    for(var d = qa(a), l = 0;;) {
      if(l < d) {
        c = b.a ? b.a(c, z.a(a, l)) : b.call(null, c, z.a(a, l)), l += 1
      }else {
        return c
      }
    }
  }
  function c(a, b) {
    var c = qa(a);
    if(0 === c) {
      return b.h ? b.h() : b.call(null)
    }
    for(var d = z.a(a, 0), l = 1;;) {
      if(l < c) {
        d = b.a ? b.a(d, z.a(a, l)) : b.call(null, d, z.a(a, l)), l += 1
      }else {
        return d
      }
    }
  }
  var d = null, d = function(d, f, g, k) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, k)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.d = b;
  d.k = a;
  return d
}(), pb = function() {
  function a(a, b, c, d) {
    for(var l = a.length;;) {
      if(d < l) {
        c = b.a ? b.a(c, a[d]) : b.call(null, c, a[d]), d += 1
      }else {
        return c
      }
    }
  }
  function b(a, b, c) {
    for(var d = a.length, l = 0;;) {
      if(l < d) {
        c = b.a ? b.a(c, a[l]) : b.call(null, c, a[l]), l += 1
      }else {
        return c
      }
    }
  }
  function c(a, b) {
    var c = a.length;
    if(0 === a.length) {
      return b.h ? b.h() : b.call(null)
    }
    for(var d = a[0], l = 1;;) {
      if(l < c) {
        d = b.a ? b.a(d, a[l]) : b.call(null, d, a[l]), l += 1
      }else {
        return d
      }
    }
  }
  var d = null, d = function(d, f, g, k) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, k)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.d = b;
  d.k = a;
  return d
}();
function qb(a) {
  return a ? a.e & 2 || a.Mb ? !0 : a.e ? !1 : u(pa, a) : u(pa, a)
}
function rb(a) {
  return a ? a.e & 16 || a.yb ? !0 : a.e ? !1 : u(ta, a) : u(ta, a)
}
function mb(a, b) {
  this.c = a;
  this.i = b;
  this.o = 0;
  this.e = 166199550
}
r = mb.prototype;
r.B = function() {
  return sb.b ? sb.b(this) : sb.call(null, this)
};
r.fa = function() {
  return this.i + 1 < this.c.length ? new mb(this.c, this.i + 1) : null
};
r.G = function(a, b) {
  return N.a ? N.a(b, this) : N.call(null, b, this)
};
r.ob = function() {
  var a = qa(this);
  return 0 < a ? new tb(this, a - 1, null) : null
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return pb.k(this.c, b, this.c[this.i], this.i + 1)
};
r.P = function(a, b, c) {
  return pb.k(this.c, b, c, this.i)
};
r.F = function() {
  return this
};
r.H = function() {
  return this.c.length - this.i
};
r.Q = function() {
  return this.c[this.i]
};
r.S = function() {
  return this.i + 1 < this.c.length ? new mb(this.c, this.i + 1) : K
};
r.u = function(a, b) {
  return O.a ? O.a(this, b) : O.call(null, this, b)
};
r.J = function(a, b) {
  var c = b + this.i;
  return c < this.c.length ? this.c[c] : null
};
r.Y = function(a, b, c) {
  a = b + this.i;
  return a < this.c.length ? this.c[a] : c
};
var ub = function() {
  function a(a, b) {
    return b < a.length ? new mb(a, b) : null
  }
  function b(a) {
    return c.a(a, 0)
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.b = b;
  c.a = a;
  return c
}(), M = function() {
  function a(a, b) {
    return ub.a(a, b)
  }
  function b(a) {
    return ub.a(a, 0)
  }
  var c = null, c = function(c, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 2:
        return a.call(this, c, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.b = b;
  c.a = a;
  return c
}();
function tb(a, b, c) {
  this.Wa = a;
  this.i = b;
  this.m = c;
  this.o = 0;
  this.e = 32374862
}
r = tb.prototype;
r.B = function() {
  return sb.b ? sb.b(this) : sb.call(null, this)
};
r.G = function(a, b) {
  return N.a ? N.a(b, this) : N.call(null, b, this)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a ? P.a(b, this) : P.call(null, b, this)
};
r.P = function(a, b, c) {
  return P.d ? P.d(b, c, this) : P.call(null, b, c, this)
};
r.F = function() {
  return this
};
r.H = function() {
  return this.i + 1
};
r.Q = function() {
  return z.a(this.Wa, this.i)
};
r.S = function() {
  return 0 < this.i ? new tb(this.Wa, this.i - 1, null) : null
};
r.u = function(a, b) {
  return O.a ? O.a(this, b) : O.call(null, this, b)
};
r.w = function(a, b) {
  return new tb(this.Wa, this.i, b)
};
r.v = h("m");
Ka._ = function(a, b) {
  return a === b
};
var vb = function() {
  function a(a, b) {
    return null != a ? sa(a, b) : sa(K, b)
  }
  var b = null, c = function() {
    function a(b, d, k) {
      var l = null;
      2 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 2), 0));
      return c.call(this, b, d, l)
    }
    function c(a, d, e) {
      for(;;) {
        if(t(e)) {
          a = b.a(a, d), d = I(e), e = L(e)
        }else {
          return b.a(a, d)
        }
      }
    }
    a.n = 2;
    a.j = function(a) {
      var b = I(a);
      a = L(a);
      var d = I(a);
      a = J(a);
      return c(b, d, a)
    };
    a.g = c;
    return a
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(this, b, e);
      default:
        return c.g(b, e, M(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 2;
  b.j = c.j;
  b.a = a;
  b.g = c.g;
  return b
}();
function R(a) {
  if(null != a) {
    if(a && (a.e & 2 || a.Mb)) {
      a = a.H(null)
    }else {
      if(a instanceof Array) {
        a = a.length
      }else {
        if("string" === typeof a) {
          a = a.length
        }else {
          if(u(pa, a)) {
            a = qa(a)
          }else {
            if(w) {
              a: {
                a = G(a);
                for(var b = 0;;) {
                  if(qb(a)) {
                    a = b + qa(a);
                    break a
                  }
                  a = L(a);
                  b += 1
                }
                a = void 0
              }
            }else {
              a = null
            }
          }
        }
      }
    }
  }else {
    a = 0
  }
  return a
}
var wb = function() {
  function a(a, b, c) {
    for(;;) {
      if(null == a) {
        return c
      }
      if(0 === b) {
        return G(a) ? I(a) : c
      }
      if(rb(a)) {
        return z.d(a, b, c)
      }
      if(G(a)) {
        a = L(a), b -= 1
      }else {
        return w ? c : null
      }
    }
  }
  function b(a, b) {
    for(;;) {
      if(null == a) {
        throw Error("Index out of bounds");
      }
      if(0 === b) {
        if(G(a)) {
          return I(a)
        }
        throw Error("Index out of bounds");
      }
      if(rb(a)) {
        return z.a(a, b)
      }
      if(G(a)) {
        var c = L(a), g = b - 1;
        a = c;
        b = g
      }else {
        if(w) {
          throw Error("Index out of bounds");
        }
        return null
      }
    }
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}(), S = function() {
  function a(a, b, c) {
    if(null != a) {
      if(a && (a.e & 16 || a.yb)) {
        return a.Y(null, b, c)
      }
      if(a instanceof Array || "string" === typeof a) {
        return b < a.length ? a[b] : c
      }
      if(u(ta, a)) {
        return z.a(a, b)
      }
      if(w) {
        if(a ? a.e & 64 || a.Da || (a.e ? 0 : u(ua, a)) : u(ua, a)) {
          return wb.d(a, b, c)
        }
        throw Error([y("nth not supported on this type "), y(la(ka(a)))].join(""));
      }
      return null
    }
    return c
  }
  function b(a, b) {
    if(null == a) {
      return null
    }
    if(a && (a.e & 16 || a.yb)) {
      return a.J(null, b)
    }
    if(a instanceof Array || "string" === typeof a) {
      return b < a.length ? a[b] : null
    }
    if(u(ta, a)) {
      return z.a(a, b)
    }
    if(w) {
      if(a ? a.e & 64 || a.Da || (a.e ? 0 : u(ua, a)) : u(ua, a)) {
        return wb.a(a, b)
      }
      throw Error([y("nth not supported on this type "), y(la(ka(a)))].join(""));
    }
    return null
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}(), xb = function() {
  function a(a, b, c) {
    return null != a ? a && (a.e & 256 || a.Pb) ? a.N(null, b, c) : a instanceof Array ? b < a.length ? a[b] : c : "string" === typeof a ? b < a.length ? a[b] : c : u(va, a) ? wa.d(a, b, c) : w ? c : null : c
  }
  function b(a, b) {
    return null == a ? null : a && (a.e & 256 || a.Pb) ? a.M(null, b) : a instanceof Array ? b < a.length ? a[b] : null : "string" === typeof a ? b < a.length ? a[b] : null : u(va, a) ? wa.a(a, b) : null
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}(), zb = function() {
  function a(a, b, c) {
    return null != a ? xa(a, b, c) : yb.a ? yb.a([b], [c]) : yb.call(null, [b], [c])
  }
  var b = null, c = function() {
    function a(b, d, k, l) {
      var n = null;
      3 < arguments.length && (n = M(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, b, d, k, n)
    }
    function c(a, d, e, l) {
      for(;;) {
        if(a = b.d(a, d, e), t(l)) {
          d = I(l), e = I(L(l)), l = L(L(l))
        }else {
          return a
        }
      }
    }
    a.n = 3;
    a.j = function(a) {
      var b = I(a);
      a = L(a);
      var d = I(a);
      a = L(a);
      var l = I(a);
      a = J(a);
      return c(b, d, l, a)
    };
    a.g = c;
    return a
  }(), b = function(b, e, f, g) {
    switch(arguments.length) {
      case 3:
        return a.call(this, b, e, f);
      default:
        return c.g(b, e, f, M(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 3;
  b.j = c.j;
  b.d = a;
  b.g = c.g;
  return b
}();
function Ab(a) {
  var b = "function" == s(a);
  return b ? b : a ? t(t(null) ? null : a.hc) ? !0 : a.Eb ? !1 : u(na, a) : u(na, a)
}
function Bb(a) {
  return(a ? a.e & 131072 || a.Rb || (a.e ? 0 : u(Fa, a)) : u(Fa, a)) ? Ga(a) : null
}
var Cb = {}, Db = 0;
function F(a) {
  if(a && (a.e & 4194304 || a.lc)) {
    a = a.B(null)
  }else {
    if("number" === typeof a) {
      a = Math.floor(a) % 2147483647
    }else {
      if(!0 === a) {
        a = 1
      }else {
        if(!1 === a) {
          a = 0
        }else {
          if("string" === typeof a) {
            255 < Db && (Cb = {}, Db = 0);
            var b = Cb[a];
            if("number" !== typeof b) {
              for(var c = b = 0;c < a.length;++c) {
                b = 31 * b + a.charCodeAt(c), b %= 4294967296
              }
              Cb[a] = b;
              Db += 1
            }
            a = b
          }else {
            a = w ? Ma(a) : null
          }
        }
      }
    }
  }
  return a
}
function Eb(a) {
  return a ? a.e & 16777216 || a.rc ? !0 : a.e ? !1 : u(Pa, a) : u(Pa, a)
}
function Fb(a) {
  return null == a ? !1 : a ? a.e & 1024 || a.mc ? !0 : a.e ? !1 : u(ya, a) : u(ya, a)
}
function Gb(a) {
  return a ? a.e & 16384 || a.sc ? !0 : a.e ? !1 : u(Ca, a) : u(Ca, a)
}
function Hb(a) {
  return a ? a.o & 512 || a.ic ? !0 : !1 : !1
}
function Ib(a, b, c, d, e) {
  for(;0 !== e;) {
    c[d] = a[b], d += 1, e -= 1, b += 1
  }
}
var Jb = {};
function Kb(a) {
  return null == a ? !1 : a ? a.e & 64 || a.Da ? !0 : a.e ? !1 : u(ua, a) : u(ua, a)
}
function Lb(a) {
  return t(a) ? !0 : !1
}
function Mb(a, b) {
  if(a === b) {
    return 0
  }
  if(null == a) {
    return-1
  }
  if(null == b) {
    return 1
  }
  if(ka(a) === ka(b)) {
    return a && (a.o & 2048 || a.wb) ? a.xb(null, b) : a > b ? 1 : a < b ? -1 : 0
  }
  if(w) {
    throw Error("compare on non-nil objects of different types");
  }
  return null
}
var Nb = function() {
  function a(a, b, c, g) {
    for(;;) {
      var k = Mb(S.a(a, g), S.a(b, g));
      if(0 === k && g + 1 < c) {
        g += 1
      }else {
        return k
      }
    }
  }
  function b(a, b) {
    var f = R(a), g = R(b);
    return f < g ? -1 : f > g ? 1 : w ? c.k(a, b, f, 0) : null
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 4:
        return a.call(this, c, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.k = a;
  return c
}(), P = function() {
  function a(a, b, c) {
    for(c = G(c);;) {
      if(c) {
        b = a.a ? a.a(b, I(c)) : a.call(null, b, I(c)), c = L(c)
      }else {
        return b
      }
    }
  }
  function b(a, b) {
    var c = G(b);
    return c ? Ob.d ? Ob.d(a, I(c), L(c)) : Ob.call(null, a, I(c), L(c)) : a.h ? a.h() : a.call(null)
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}(), Ob = function() {
  function a(a, b, c) {
    return c && (c.e & 524288 || c.Sb) ? c.P(null, a, b) : c instanceof Array ? pb.d(c, a, b) : "string" === typeof c ? pb.d(c, a, b) : u(Ia, c) ? Ja.d(c, a, b) : w ? P.d(a, b, c) : null
  }
  function b(a, b) {
    return b && (b.e & 524288 || b.Sb) ? b.O(null, a) : b instanceof Array ? pb.a(b, a) : "string" === typeof b ? pb.a(b, a) : u(Ia, b) ? Ja.a(b, a) : w ? P.a(a, b) : null
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}();
function Pb(a) {
  return 0 <= a ? Math.floor.b ? Math.floor.b(a) : Math.floor.call(null, a) : Math.ceil.b ? Math.ceil.b(a) : Math.ceil.call(null, a)
}
var Qb = function() {
  function a(a) {
    return a * c.h()
  }
  function b() {
    return Math.random.h ? Math.random.h() : Math.random.call(null)
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.h = b;
  c.b = a;
  return c
}();
function Rb(a) {
  return Pb(Qb.b(a))
}
function Sb(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
}
var y = function() {
  function a(a) {
    return null == a ? "" : a.toString()
  }
  var b = null, c = function() {
    function a(b, d) {
      var k = null;
      1 < arguments.length && (k = M(Array.prototype.slice.call(arguments, 1), 0));
      return c.call(this, b, k)
    }
    function c(a, d) {
      for(var e = new ia(b.b(a)), l = d;;) {
        if(t(l)) {
          e = e.append(b.b(I(l))), l = L(l)
        }else {
          return e.toString()
        }
      }
    }
    a.n = 1;
    a.j = function(a) {
      var b = I(a);
      a = J(a);
      return c(b, a)
    };
    a.g = c;
    return a
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return a.call(this, b);
      default:
        return c.g(b, M(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 1;
  b.j = c.j;
  b.h = p("");
  b.b = a;
  b.g = c.g;
  return b
}();
function O(a, b) {
  return Lb(Eb(b) ? function() {
    for(var c = G(a), d = G(b);;) {
      if(null == c) {
        return null == d
      }
      if(null == d) {
        return!1
      }
      if(nb.a(I(c), I(d))) {
        c = L(c), d = L(d)
      }else {
        return w ? !1 : null
      }
    }
  }() : null)
}
function lb(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
}
function sb(a) {
  if(G(a)) {
    var b = F(I(a));
    for(a = L(a);;) {
      if(null == a) {
        return b
      }
      b = lb(b, F(I(a)));
      a = L(a)
    }
  }else {
    return 0
  }
}
function Tb(a) {
  var b = 0;
  for(a = G(a);;) {
    if(a) {
      var c = I(a), b = (b + (F(Ub.b ? Ub.b(c) : Ub.call(null, c)) ^ F(Vb.b ? Vb.b(c) : Vb.call(null, c)))) % 4503599627370496;
      a = L(a)
    }else {
      return b
    }
  }
}
function Wb(a, b, c, d, e) {
  this.m = a;
  this.Ha = b;
  this.ja = c;
  this.count = d;
  this.l = e;
  this.o = 0;
  this.e = 65937646
}
r = Wb.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.fa = function() {
  return 1 === this.count ? null : this.ja
};
r.G = function(a, b) {
  return new Wb(this.m, b, this, this.count + 1, null)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  return this
};
r.H = h("count");
r.Q = h("Ha");
r.S = function() {
  return 1 === this.count ? K : this.ja
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new Wb(b, this.Ha, this.ja, this.count, this.l)
};
r.v = h("m");
function Xb(a) {
  this.m = a;
  this.o = 0;
  this.e = 65937614
}
r = Xb.prototype;
r.B = p(0);
r.fa = p(null);
r.G = function(a, b) {
  return new Wb(this.m, b, null, 1, null)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = p(null);
r.H = p(0);
r.Q = p(null);
r.S = function() {
  return K
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new Xb(b)
};
r.v = h("m");
var K = new Xb(null);
function Yb(a) {
  return(a ? a.e & 134217728 || a.pc || (a.e ? 0 : u(Qa, a)) : u(Qa, a)) ? Ra(a) : Ob.d(vb, K, a)
}
var Zb = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d)
  }
  function b(a) {
    var b;
    if(a instanceof mb) {
      b = a.c
    }else {
      a: {
        for(b = [];;) {
          if(null != a) {
            b.push(a.Q(null)), a = a.fa(null)
          }else {
            break a
          }
        }
        b = void 0
      }
    }
    a = b.length;
    for(var e = K;;) {
      if(0 < a) {
        var f = a - 1, e = e.G(null, b[a - 1]);
        a = f
      }else {
        return e
      }
    }
  }
  a.n = 0;
  a.j = function(a) {
    a = G(a);
    return b(a)
  };
  a.g = b;
  return a
}();
function ac(a, b, c, d) {
  this.m = a;
  this.Ha = b;
  this.ja = c;
  this.l = d;
  this.o = 0;
  this.e = 65929452
}
r = ac.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.fa = function() {
  return null == this.ja ? null : G(this.ja)
};
r.G = function(a, b) {
  return new ac(null, b, this, this.l)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  return this
};
r.Q = h("Ha");
r.S = function() {
  return null == this.ja ? K : this.ja
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new ac(b, this.Ha, this.ja, this.l)
};
r.v = h("m");
function N(a, b) {
  var c = null == b;
  return(c ? c : b && (b.e & 64 || b.Da)) ? new ac(null, a, b, null) : new ac(null, a, G(b), null)
}
function T(a, b, c, d) {
  this.ra = a;
  this.name = b;
  this.la = c;
  this.na = d;
  this.e = 2153775105;
  this.o = 4096
}
r = T.prototype;
r.t = function(a, b) {
  return C(b, [y(":"), y(this.la)].join(""))
};
r.B = function() {
  null == this.na && (this.na = lb(F(this.ra), F(this.name)) + 2654435769);
  return this.na
};
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return xb.a(c, this);
      case 3:
        return xb.d(c, this, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return xb.a(a, this)
};
r.a = function(a, b) {
  return xb.d(a, this, b)
};
r.u = function(a, b) {
  return b instanceof T ? this.la === b.la : !1
};
r.toString = function() {
  return[y(":"), y(this.la)].join("")
};
function bc(a, b) {
  return a === b ? !0 : a instanceof T && b instanceof T ? a.la === b.la : !1
}
function U(a, b, c, d) {
  this.m = a;
  this.za = b;
  this.r = c;
  this.l = d;
  this.o = 0;
  this.e = 32374988
}
r = U.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.fa = function() {
  Oa(this);
  return null == this.r ? null : L(this.r)
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
function cc(a) {
  null != a.za && (a.r = a.za.h ? a.za.h() : a.za.call(null), a.za = null);
  return a.r
}
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  cc(this);
  if(null == this.r) {
    return null
  }
  for(var a = this.r;;) {
    if(a instanceof U) {
      a = cc(a)
    }else {
      return this.r = a, G(this.r)
    }
  }
};
r.Q = function() {
  Oa(this);
  return null == this.r ? null : I(this.r)
};
r.S = function() {
  Oa(this);
  return null != this.r ? J(this.r) : K
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new U(b, this.za, this.r, this.l)
};
r.v = h("m");
function dc(a, b) {
  this.L = a;
  this.end = b;
  this.o = 0;
  this.e = 2
}
dc.prototype.H = h("end");
dc.prototype.add = function(a) {
  this.L[this.end] = a;
  return this.end += 1
};
dc.prototype.R = function() {
  var a = new ec(this.L, 0, this.end);
  this.L = null;
  return a
};
function ec(a, b, c) {
  this.c = a;
  this.s = b;
  this.end = c;
  this.o = 0;
  this.e = 524306
}
r = ec.prototype;
r.O = function(a, b) {
  return pb.k(this.c, b, this.c[this.s], this.s + 1)
};
r.P = function(a, b, c) {
  return pb.k(this.c, b, c, this.s)
};
r.vb = function() {
  if(this.s === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new ec(this.c, this.s + 1, this.end)
};
r.J = function(a, b) {
  return this.c[this.s + b]
};
r.Y = function(a, b, c) {
  return 0 <= b && b < this.end - this.s ? this.c[this.s + b] : c
};
r.H = function() {
  return this.end - this.s
};
var fc = function() {
  function a(a, b, c) {
    return new ec(a, b, c)
  }
  function b(a, b) {
    return new ec(a, b, a.length)
  }
  function c(a) {
    return new ec(a, 0, a.length)
  }
  var d = null, d = function(d, f, g) {
    switch(arguments.length) {
      case 1:
        return c.call(this, d);
      case 2:
        return b.call(this, d, f);
      case 3:
        return a.call(this, d, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.b = c;
  d.a = b;
  d.d = a;
  return d
}();
function gc(a, b, c, d) {
  this.R = a;
  this.ca = b;
  this.m = c;
  this.l = d;
  this.e = 31850732;
  this.o = 1536
}
r = gc.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.fa = function() {
  if(1 < qa(this.R)) {
    return new gc(ab(this.R), this.ca, this.m, null)
  }
  var a = Oa(this.ca);
  return null == a ? null : a
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
r.F = function() {
  return this
};
r.Q = function() {
  return z.a(this.R, 0)
};
r.S = function() {
  return 1 < qa(this.R) ? new gc(ab(this.R), this.ca, this.m, null) : null == this.ca ? K : this.ca
};
r.Xa = function() {
  return null == this.ca ? null : this.ca
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new gc(this.R, this.ca, b, this.l)
};
r.v = h("m");
r.Ya = h("R");
r.Za = function() {
  return null == this.ca ? K : this.ca
};
function hc(a, b) {
  return 0 === qa(a) ? b : new gc(a, b, null, null)
}
function ic(a) {
  for(var b = [];;) {
    if(G(a)) {
      b.push(I(a)), a = L(a)
    }else {
      return b
    }
  }
}
function jc(a, b) {
  if(qb(a)) {
    return R(a)
  }
  for(var c = a, d = b, e = 0;;) {
    if(0 < d && G(c)) {
      c = L(c), d -= 1, e += 1
    }else {
      return e
    }
  }
}
var lc = function kc(b) {
  return null == b ? null : null == L(b) ? G(I(b)) : w ? N(I(b), kc(L(b))) : null
}, mc = function() {
  function a(a, b) {
    return new U(null, function() {
      var c = G(a);
      return c ? Hb(c) ? hc(bb(c), d.a(cb(c), b)) : N(I(c), d.a(J(c), b)) : b
    }, null, null)
  }
  function b(a) {
    return new U(null, function() {
      return a
    }, null, null)
  }
  function c() {
    return new U(null, p(null), null, null)
  }
  var d = null, e = function() {
    function a(c, d, e) {
      var f = null;
      2 < arguments.length && (f = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, f)
    }
    function b(a, c, e) {
      return function q(a, b) {
        return new U(null, function() {
          var c = G(a);
          return c ? Hb(c) ? hc(bb(c), q(cb(c), b)) : N(I(c), q(J(c), b)) : t(b) ? q(I(b), L(b)) : null
        }, null, null)
      }(d.a(a, c), e)
    }
    a.n = 2;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = J(a);
      return b(c, d, a)
    };
    a.g = b;
    return a
  }(), d = function(d, g, k) {
    switch(arguments.length) {
      case 0:
        return c.call(this);
      case 1:
        return b.call(this, d);
      case 2:
        return a.call(this, d, g);
      default:
        return e.g(d, g, M(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.n = 2;
  d.j = e.j;
  d.h = c;
  d.b = b;
  d.a = a;
  d.g = e.g;
  return d
}(), nc = function() {
  function a(a, b, c, d) {
    return N(a, N(b, N(c, d)))
  }
  function b(a, b, c) {
    return N(a, N(b, c))
  }
  var c = null, d = function() {
    function a(c, d, e, n, m) {
      var q = null;
      4 < arguments.length && (q = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, n, q)
    }
    function b(a, c, d, e, f) {
      return N(a, N(c, N(d, N(e, lc(f)))))
    }
    a.n = 4;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = L(a);
      var e = I(a);
      a = L(a);
      var m = I(a);
      a = J(a);
      return b(c, d, e, m, a)
    };
    a.g = b;
    return a
  }(), c = function(c, f, g, k, l) {
    switch(arguments.length) {
      case 1:
        return G(c);
      case 2:
        return N(c, f);
      case 3:
        return b.call(this, c, f, g);
      case 4:
        return a.call(this, c, f, g, k);
      default:
        return d.g(c, f, g, k, M(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.n = 4;
  c.j = d.j;
  c.b = function(a) {
    return G(a)
  };
  c.a = function(a, b) {
    return N(a, b)
  };
  c.d = b;
  c.k = a;
  c.g = d.g;
  return c
}();
function oc(a, b, c) {
  var d = G(c);
  if(0 === b) {
    return a.h ? a.h() : a.call(null)
  }
  c = A(d);
  var e = B(d);
  if(1 === b) {
    return a.b ? a.b(c) : a.b ? a.b(c) : a.call(null, c)
  }
  var d = A(e), f = B(e);
  if(2 === b) {
    return a.a ? a.a(c, d) : a.a ? a.a(c, d) : a.call(null, c, d)
  }
  var e = A(f), g = B(f);
  if(3 === b) {
    return a.d ? a.d(c, d, e) : a.d ? a.d(c, d, e) : a.call(null, c, d, e)
  }
  var f = A(g), k = B(g);
  if(4 === b) {
    return a.k ? a.k(c, d, e, f) : a.k ? a.k(c, d, e, f) : a.call(null, c, d, e, f)
  }
  g = A(k);
  k = B(k);
  if(5 === b) {
    return a.I ? a.I(c, d, e, f, g) : a.I ? a.I(c, d, e, f, g) : a.call(null, c, d, e, f, g)
  }
  a = A(k);
  var l = B(k);
  if(6 === b) {
    return a.ea ? a.ea(c, d, e, f, g, a) : a.ea ? a.ea(c, d, e, f, g, a) : a.call(null, c, d, e, f, g, a)
  }
  var k = A(l), n = B(l);
  if(7 === b) {
    return a.ua ? a.ua(c, d, e, f, g, a, k) : a.ua ? a.ua(c, d, e, f, g, a, k) : a.call(null, c, d, e, f, g, a, k)
  }
  var l = A(n), m = B(n);
  if(8 === b) {
    return a.mb ? a.mb(c, d, e, f, g, a, k, l) : a.mb ? a.mb(c, d, e, f, g, a, k, l) : a.call(null, c, d, e, f, g, a, k, l)
  }
  var n = A(m), q = B(m);
  if(9 === b) {
    return a.nb ? a.nb(c, d, e, f, g, a, k, l, n) : a.nb ? a.nb(c, d, e, f, g, a, k, l, n) : a.call(null, c, d, e, f, g, a, k, l, n)
  }
  var m = A(q), v = B(q);
  if(10 === b) {
    return a.ab ? a.ab(c, d, e, f, g, a, k, l, n, m) : a.ab ? a.ab(c, d, e, f, g, a, k, l, n, m) : a.call(null, c, d, e, f, g, a, k, l, n, m)
  }
  var q = A(v), E = B(v);
  if(11 === b) {
    return a.bb ? a.bb(c, d, e, f, g, a, k, l, n, m, q) : a.bb ? a.bb(c, d, e, f, g, a, k, l, n, m, q) : a.call(null, c, d, e, f, g, a, k, l, n, m, q)
  }
  var v = A(E), H = B(E);
  if(12 === b) {
    return a.cb ? a.cb(c, d, e, f, g, a, k, l, n, m, q, v) : a.cb ? a.cb(c, d, e, f, g, a, k, l, n, m, q, v) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v)
  }
  var E = A(H), Q = B(H);
  if(13 === b) {
    return a.eb ? a.eb(c, d, e, f, g, a, k, l, n, m, q, v, E) : a.eb ? a.eb(c, d, e, f, g, a, k, l, n, m, q, v, E) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E)
  }
  var H = A(Q), X = B(Q);
  if(14 === b) {
    return a.fb ? a.fb(c, d, e, f, g, a, k, l, n, m, q, v, E, H) : a.fb ? a.fb(c, d, e, f, g, a, k, l, n, m, q, v, E, H) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H)
  }
  var Q = A(X), fa = B(X);
  if(15 === b) {
    return a.gb ? a.gb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q) : a.gb ? a.gb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q)
  }
  var X = A(fa), oa = B(fa);
  if(16 === b) {
    return a.hb ? a.hb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X) : a.hb ? a.hb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X)
  }
  var fa = A(oa), La = B(oa);
  if(17 === b) {
    return a.ib ? a.ib(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa) : a.ib ? a.ib(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa)
  }
  var oa = A(La), $b = B(La);
  if(18 === b) {
    return a.jb ? a.jb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa) : a.jb ? a.jb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa)
  }
  La = A($b);
  $b = B($b);
  if(19 === b) {
    return a.kb ? a.kb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La) : a.kb ? a.kb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La)
  }
  var bd = A($b);
  B($b);
  if(20 === b) {
    return a.lb ? a.lb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La, bd) : a.lb ? a.lb(c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La, bd) : a.call(null, c, d, e, f, g, a, k, l, n, m, q, v, E, H, Q, X, fa, oa, La, bd)
  }
  throw Error("Only up to 20 arguments supported on functions");
}
var pc = function() {
  function a(a, b, c, d, e) {
    b = nc.k(b, c, d, e);
    c = a.n;
    return a.j ? (d = jc(b, c + 1), d <= c ? oc(a, d, b) : a.j(b)) : a.apply(a, ic(b))
  }
  function b(a, b, c, d) {
    b = nc.d(b, c, d);
    c = a.n;
    return a.j ? (d = jc(b, c + 1), d <= c ? oc(a, d, b) : a.j(b)) : a.apply(a, ic(b))
  }
  function c(a, b, c) {
    b = nc.a(b, c);
    c = a.n;
    if(a.j) {
      var d = jc(b, c + 1);
      return d <= c ? oc(a, d, b) : a.j(b)
    }
    return a.apply(a, ic(b))
  }
  function d(a, b) {
    var c = a.n;
    if(a.j) {
      var d = jc(b, c + 1);
      return d <= c ? oc(a, d, b) : a.j(b)
    }
    return a.apply(a, ic(b))
  }
  var e = null, f = function() {
    function a(c, d, e, f, g, E) {
      var H = null;
      5 < arguments.length && (H = M(Array.prototype.slice.call(arguments, 5), 0));
      return b.call(this, c, d, e, f, g, H)
    }
    function b(a, c, d, e, f, g) {
      c = N(c, N(d, N(e, N(f, lc(g)))));
      d = a.n;
      return a.j ? (e = jc(c, d + 1), e <= d ? oc(a, e, c) : a.j(c)) : a.apply(a, ic(c))
    }
    a.n = 5;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = L(a);
      var e = I(a);
      a = L(a);
      var f = I(a);
      a = L(a);
      var g = I(a);
      a = J(a);
      return b(c, d, e, f, g, a)
    };
    a.g = b;
    return a
  }(), e = function(e, k, l, n, m, q) {
    switch(arguments.length) {
      case 2:
        return d.call(this, e, k);
      case 3:
        return c.call(this, e, k, l);
      case 4:
        return b.call(this, e, k, l, n);
      case 5:
        return a.call(this, e, k, l, n, m);
      default:
        return f.g(e, k, l, n, m, M(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  e.n = 5;
  e.j = f.j;
  e.a = d;
  e.d = c;
  e.k = b;
  e.I = a;
  e.g = f.g;
  return e
}(), qc = function() {
  function a(a, b) {
    return!nb.a(a, b)
  }
  var b = null, c = function() {
    function a(c, d, k) {
      var l = null;
      2 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, l)
    }
    function b(a, c, d) {
      return ja(pc.k(nb, a, c, d))
    }
    a.n = 2;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = J(a);
      return b(c, d, a)
    };
    a.g = b;
    return a
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return a.call(this, b, e);
      default:
        return c.g(b, e, M(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 2;
  b.j = c.j;
  b.b = p(!1);
  b.a = a;
  b.g = c.g;
  return b
}();
function rc(a, b) {
  for(;;) {
    if(null == G(b)) {
      return!0
    }
    if(t(a.b ? a.b(I(b)) : a.call(null, I(b)))) {
      var c = a, d = L(b);
      a = c;
      b = d
    }else {
      return w ? !1 : null
    }
  }
}
function sc(a) {
  return a
}
var tc = function() {
  function a(a, b, c, d) {
    return function() {
      function e(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return m.call(this, b)
      }
      function m(e) {
        return pc.I(a, b, c, d, e)
      }
      e.n = 0;
      e.j = function(a) {
        a = G(a);
        return m(a)
      };
      e.g = m;
      return e
    }()
  }
  function b(a, b, c) {
    return function() {
      function d(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return e.call(this, b)
      }
      function e(d) {
        return pc.k(a, b, c, d)
      }
      d.n = 0;
      d.j = function(a) {
        a = G(a);
        return e(a)
      };
      d.g = e;
      return d
    }()
  }
  function c(a, b) {
    return function() {
      function c(a) {
        var b = null;
        0 < arguments.length && (b = M(Array.prototype.slice.call(arguments, 0), 0));
        return d.call(this, b)
      }
      function d(c) {
        return pc.d(a, b, c)
      }
      c.n = 0;
      c.j = function(a) {
        a = G(a);
        return d(a)
      };
      c.g = d;
      return c
    }()
  }
  var d = null, e = function() {
    function a(c, d, e, f, q) {
      var v = null;
      4 < arguments.length && (v = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, v)
    }
    function b(a, c, d, e, f) {
      return function() {
        function b(a) {
          var c = null;
          0 < arguments.length && (c = M(Array.prototype.slice.call(arguments, 0), 0));
          return g.call(this, c)
        }
        function g(b) {
          return pc.I(a, c, d, e, mc.a(f, b))
        }
        b.n = 0;
        b.j = function(a) {
          a = G(a);
          return g(a)
        };
        b.g = g;
        return b
      }()
    }
    a.n = 4;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = L(a);
      var e = I(a);
      a = L(a);
      var f = I(a);
      a = J(a);
      return b(c, d, e, f, a)
    };
    a.g = b;
    return a
  }(), d = function(d, g, k, l, n) {
    switch(arguments.length) {
      case 1:
        return d;
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, k);
      case 4:
        return a.call(this, d, g, k, l);
      default:
        return e.g(d, g, k, l, M(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.n = 4;
  d.j = e.j;
  d.b = function(a) {
    return a
  };
  d.a = c;
  d.d = b;
  d.k = a;
  d.g = e.g;
  return d
}();
function uc(a, b) {
  var c = function e(b, c) {
    return new U(null, function() {
      var k = G(c);
      if(k) {
        if(Hb(k)) {
          for(var l = bb(k), n = R(l), m = new dc(Array(n), 0), q = 0;;) {
            if(q < n) {
              var v = a.a ? a.a(b + q, z.a(l, q)) : a.call(null, b + q, z.a(l, q));
              m.add(v);
              q += 1
            }else {
              break
            }
          }
          return hc(m.R(), e(b + n, cb(k)))
        }
        return N(a.a ? a.a(b, I(k)) : a.call(null, b, I(k)), e(b + 1, J(k)))
      }
      return null
    }, null, null)
  };
  return c.a ? c.a(0, b) : c.call(null, 0, b)
}
var vc = function() {
  function a(a, b, c, e) {
    return new U(null, function() {
      var n = G(b), m = G(c), q = G(e);
      return n && m && q ? N(a.d ? a.d(I(n), I(m), I(q)) : a.call(null, I(n), I(m), I(q)), d.k(a, J(n), J(m), J(q))) : null
    }, null, null)
  }
  function b(a, b, c) {
    return new U(null, function() {
      var e = G(b), n = G(c);
      return e && n ? N(a.a ? a.a(I(e), I(n)) : a.call(null, I(e), I(n)), d.d(a, J(e), J(n))) : null
    }, null, null)
  }
  function c(a, b) {
    return new U(null, function() {
      var c = G(b);
      if(c) {
        if(Hb(c)) {
          for(var e = bb(c), n = R(e), m = new dc(Array(n), 0), q = 0;;) {
            if(q < n) {
              var v = a.b ? a.b(z.a(e, q)) : a.call(null, z.a(e, q));
              m.add(v);
              q += 1
            }else {
              break
            }
          }
          return hc(m.R(), d.a(a, cb(c)))
        }
        return N(a.b ? a.b(I(c)) : a.call(null, I(c)), d.a(a, J(c)))
      }
      return null
    }, null, null)
  }
  var d = null, e = function() {
    function a(c, d, e, f, q) {
      var v = null;
      4 < arguments.length && (v = M(Array.prototype.slice.call(arguments, 4), 0));
      return b.call(this, c, d, e, f, v)
    }
    function b(a, c, e, f, g) {
      return d.a(function(b) {
        return pc.a(a, b)
      }, function E(a) {
        return new U(null, function() {
          var b = d.a(G, a);
          return rc(sc, b) ? N(d.a(I, b), E(d.a(J, b))) : null
        }, null, null)
      }(vb.g(g, f, M([e, c], 0))))
    }
    a.n = 4;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = L(a);
      var e = I(a);
      a = L(a);
      var f = I(a);
      a = J(a);
      return b(c, d, e, f, a)
    };
    a.g = b;
    return a
  }(), d = function(d, g, k, l, n) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, g);
      case 3:
        return b.call(this, d, g, k);
      case 4:
        return a.call(this, d, g, k, l);
      default:
        return e.g(d, g, k, l, M(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.n = 4;
  d.j = e.j;
  d.a = c;
  d.d = b;
  d.k = a;
  d.g = e.g;
  return d
}();
function wc(a) {
  return function c(a, e) {
    return new U(null, function() {
      var f = G(a);
      return f ? N(I(f), c(J(f), e)) : G(e) ? c(I(e), J(e)) : null
    }, null, null)
  }(null, a)
}
var xc = function() {
  function a(a, b) {
    return wc(vc.a(a, b))
  }
  var b = null, c = function() {
    function a(c, d, k) {
      var l = null;
      2 < arguments.length && (l = M(Array.prototype.slice.call(arguments, 2), 0));
      return b.call(this, c, d, l)
    }
    function b(a, c, d) {
      return wc(pc.k(vc, a, c, d))
    }
    a.n = 2;
    a.j = function(a) {
      var c = I(a);
      a = L(a);
      var d = I(a);
      a = J(a);
      return b(c, d, a)
    };
    a.g = b;
    return a
  }(), b = function(b, e, f) {
    switch(arguments.length) {
      case 2:
        return a.call(this, b, e);
      default:
        return c.g(b, e, M(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 2;
  b.j = c.j;
  b.a = a;
  b.g = c.g;
  return b
}(), zc = function yc(b, c) {
  return new U(null, function() {
    var d = G(c);
    if(d) {
      if(Hb(d)) {
        for(var e = bb(d), f = R(e), g = new dc(Array(f), 0), k = 0;;) {
          if(k < f) {
            if(t(b.b ? b.b(z.a(e, k)) : b.call(null, z.a(e, k)))) {
              var l = z.a(e, k);
              g.add(l)
            }
            k += 1
          }else {
            break
          }
        }
        return hc(g.R(), yc(b, cb(d)))
      }
      e = I(d);
      d = J(d);
      return t(b.b ? b.b(e) : b.call(null, e)) ? N(e, yc(b, d)) : yc(b, d)
    }
    return null
  }, null, null)
};
function Ac(a) {
  return function c(a) {
    return new U(null, function() {
      return N(a, t(Eb.b ? Eb.b(a) : Eb.call(null, a)) ? xc.a(c, G.b ? G.b(a) : G.call(null, a)) : null)
    }, null, null)
  }(a)
}
function Bc(a) {
  return zc(function(a) {
    return!Eb(a)
  }, J(Ac(a)))
}
function Cc(a, b) {
  this.p = a;
  this.c = b
}
function Dc(a) {
  a = a.f;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
}
function Ec(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = new Cc(a, Array(32));
    d.c[0] = c;
    c = d;
    b -= 5
  }
}
var Gc = function Fc(b, c, d, e) {
  var f = new Cc(d.p, d.c.slice()), g = b.f - 1 >>> c & 31;
  5 === c ? f.c[g] = e : (d = d.c[g], b = null != d ? Fc(b, c - 5, d, e) : Ec(null, c - 5, e), f.c[g] = b);
  return f
};
function Hc(a, b) {
  throw Error([y("No item "), y(a), y(" in vector of length "), y(b)].join(""));
}
function Ic(a, b) {
  if(0 <= b && b < a.f) {
    if(b >= Dc(a)) {
      return a.q
    }
    for(var c = a.root, d = a.shift;;) {
      if(0 < d) {
        var e = d - 5, c = c.c[b >>> d & 31], d = e
      }else {
        return c.c
      }
    }
  }else {
    return Hc(b, a.f)
  }
}
var Kc = function Jc(b, c, d, e, f) {
  var g = new Cc(d.p, d.c.slice());
  if(0 === c) {
    g.c[e & 31] = f
  }else {
    var k = e >>> c & 31;
    b = Jc(b, c - 5, d.c[k], e, f);
    g.c[k] = b
  }
  return g
};
function Lc(a, b, c, d, e, f) {
  this.m = a;
  this.f = b;
  this.shift = c;
  this.root = d;
  this.q = e;
  this.l = f;
  this.o = 4;
  this.e = 167668511
}
r = Lc.prototype;
r.Ma = function() {
  return new Mc(this.f, this.shift, Nc.b ? Nc.b(this.root) : Nc.call(null, this.root), Oc.b ? Oc.b(this.q) : Oc.call(null, this.q))
};
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.M = function(a, b) {
  return z.d(this, b, null)
};
r.N = function(a, b, c) {
  return z.d(this, b, c)
};
r.Ca = function(a, b, c) {
  if(0 <= b && b < this.f) {
    return Dc(this) <= b ? (a = this.q.slice(), a[b & 31] = c, new Lc(this.m, this.f, this.shift, this.root, a, null)) : new Lc(this.m, this.f, this.shift, Kc(this, this.shift, this.root, b, c), this.q, null)
  }
  if(b === this.f) {
    return sa(this, c)
  }
  if(w) {
    throw Error([y("Index "), y(b), y(" out of bounds  [0,"), y(this.f), y("]")].join(""));
  }
  return null
};
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.J(null, c);
      case 3:
        return this.Y(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return this.J(null, a)
};
r.a = function(a, b) {
  return this.Y(null, a, b)
};
r.G = function(a, b) {
  if(32 > this.f - Dc(this)) {
    var c = this.q.slice();
    c.push(b);
    return new Lc(this.m, this.f + 1, this.shift, this.root, c, null)
  }
  var d = this.f >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  if(d) {
    d = new Cc(null, Array(32));
    d.c[0] = this.root;
    var e = Ec(null, this.shift, new Cc(null, this.q));
    d.c[1] = e
  }else {
    d = Gc(this, this.shift, this.root, new Cc(null, this.q))
  }
  return new Lc(this.m, this.f + 1, c, d, [b], null)
};
r.ob = function() {
  return 0 < this.f ? new tb(this, this.f - 1, null) : null
};
r.zb = function() {
  return z.a(this, 0)
};
r.Ab = function() {
  return z.a(this, 1)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return ob.a(this, b)
};
r.P = function(a, b, c) {
  return ob.d(this, b, c)
};
r.F = function() {
  return 0 === this.f ? null : 32 > this.f ? M.b(this.q) : w ? V.d ? V.d(this, 0, 0) : V.call(null, this, 0, 0) : null
};
r.H = h("f");
r.pb = function(a, b, c) {
  return xa(this, b, c)
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new Lc(b, this.f, this.shift, this.root, this.q, this.l)
};
r.v = h("m");
r.J = function(a, b) {
  return Ic(this, b)[b & 31]
};
r.Y = function(a, b, c) {
  return 0 <= b && b < this.f ? z.a(this, b) : c
};
var Pc = new Cc(null, Array(32)), Qc = new Lc(null, 0, 5, Pc, [], 0);
function W(a, b) {
  var c = a.length, d = b ? a : a.slice();
  if(32 > c) {
    return new Lc(null, c, 5, Pc, d, null)
  }
  for(var e = d.slice(0, 32), f = 32, g = Wa(new Lc(null, 32, 5, Pc, e, null));;) {
    if(f < c) {
      e = f + 1, g = Xa(g, d[f]), f = e
    }else {
      return Ya(g)
    }
  }
}
function Rc(a, b, c, d, e, f) {
  this.D = a;
  this.X = b;
  this.i = c;
  this.s = d;
  this.m = e;
  this.l = f;
  this.e = 32243948;
  this.o = 1536
}
r = Rc.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.fa = function() {
  if(this.s + 1 < this.X.length) {
    var a = V.k ? V.k(this.D, this.X, this.i, this.s + 1) : V.call(null, this.D, this.X, this.i, this.s + 1);
    return null == a ? null : a
  }
  return db(this)
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return ob.a(Sc.d ? Sc.d(this.D, this.i + this.s, R(this.D)) : Sc.call(null, this.D, this.i + this.s, R(this.D)), b)
};
r.P = function(a, b, c) {
  return ob.d(Sc.d ? Sc.d(this.D, this.i + this.s, R(this.D)) : Sc.call(null, this.D, this.i + this.s, R(this.D)), b, c)
};
r.F = function() {
  return this
};
r.Q = function() {
  return this.X[this.s]
};
r.S = function() {
  if(this.s + 1 < this.X.length) {
    var a = V.k ? V.k(this.D, this.X, this.i, this.s + 1) : V.call(null, this.D, this.X, this.i, this.s + 1);
    return null == a ? K : a
  }
  return cb(this)
};
r.Xa = function() {
  var a = this.X.length, a = this.i + a < qa(this.D) ? V.d ? V.d(this.D, this.i + a, 0) : V.call(null, this.D, this.i + a, 0) : null;
  return null == a ? null : a
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return V.I ? V.I(this.D, this.X, this.i, this.s, b) : V.call(null, this.D, this.X, this.i, this.s, b)
};
r.Ya = function() {
  return fc.a(this.X, this.s)
};
r.Za = function() {
  var a = this.X.length, a = this.i + a < qa(this.D) ? V.d ? V.d(this.D, this.i + a, 0) : V.call(null, this.D, this.i + a, 0) : null;
  return null == a ? K : a
};
var V = function() {
  function a(a, b, c, d, l) {
    return new Rc(a, b, c, d, l, null)
  }
  function b(a, b, c, d) {
    return new Rc(a, b, c, d, null, null)
  }
  function c(a, b, c) {
    return new Rc(a, Ic(a, b), b, c, null, null)
  }
  var d = null, d = function(d, f, g, k, l) {
    switch(arguments.length) {
      case 3:
        return c.call(this, d, f, g);
      case 4:
        return b.call(this, d, f, g, k);
      case 5:
        return a.call(this, d, f, g, k, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.d = c;
  d.k = b;
  d.I = a;
  return d
}();
function Tc(a, b, c, d, e) {
  this.m = a;
  this.da = b;
  this.start = c;
  this.end = d;
  this.l = e;
  this.o = 0;
  this.e = 32400159
}
r = Tc.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.M = function(a, b) {
  return z.d(this, b, null)
};
r.N = function(a, b, c) {
  return z.d(this, b, c)
};
r.Ca = function(a, b, c) {
  var d = this, e = d.start + b;
  return Uc.I ? Uc.I(d.m, zb.d(d.da, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b
  }(), null) : Uc.call(null, d.m, zb.d(d.da, e, c), d.start, function() {
    var a = d.end, b = e + 1;
    return a > b ? a : b
  }(), null)
};
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.J(null, c);
      case 3:
        return this.Y(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return this.J(null, a)
};
r.a = function(a, b) {
  return this.Y(null, a, b)
};
r.G = function(a, b) {
  return Uc.I ? Uc.I(this.m, Da(this.da, this.end, b), this.start, this.end + 1, null) : Uc.call(null, this.m, Da(this.da, this.end, b), this.start, this.end + 1, null)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return ob.a(this, b)
};
r.P = function(a, b, c) {
  return ob.d(this, b, c)
};
r.F = function() {
  var a = this;
  return function c(d) {
    return d === a.end ? null : N(z.a(a.da, d), new U(null, function() {
      return c(d + 1)
    }, null, null))
  }(a.start)
};
r.H = function() {
  return this.end - this.start
};
r.pb = function(a, b, c) {
  return xa(this, b, c)
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return Uc.I ? Uc.I(b, this.da, this.start, this.end, this.l) : Uc.call(null, b, this.da, this.start, this.end, this.l)
};
r.v = h("m");
r.J = function(a, b) {
  return 0 > b || this.end <= this.start + b ? Hc(b, this.end - this.start) : z.a(this.da, this.start + b)
};
r.Y = function(a, b, c) {
  return 0 > b || this.end <= this.start + b ? c : z.d(this.da, this.start + b, c)
};
function Uc(a, b, c, d, e) {
  for(;;) {
    if(b instanceof Tc) {
      c = b.start + c, d = b.start + d, b = b.da
    }else {
      var f = R(b);
      if(0 > c || 0 > d || c > f || d > f) {
        throw Error("Index out of bounds");
      }
      return new Tc(a, b, c, d, e)
    }
  }
}
var Sc = function() {
  function a(a, b, c) {
    return Uc(null, a, b, c, null)
  }
  function b(a, b) {
    return c.d(a, b, R(a))
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, c, e);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.a = b;
  c.d = a;
  return c
}();
function Nc(a) {
  return new Cc({}, a.c.slice())
}
function Oc(a) {
  var b = Array(32);
  Ib(a, 0, b, 0, a.length);
  return b
}
var Wc = function Vc(b, c, d, e) {
  d = b.root.p === d.p ? d : new Cc(b.root.p, d.c.slice());
  var f = b.f - 1 >>> c & 31;
  if(5 === c) {
    b = e
  }else {
    var g = d.c[f];
    b = null != g ? Vc(b, c - 5, g, e) : Ec(b.root.p, c - 5, e)
  }
  d.c[f] = b;
  return d
};
function Mc(a, b, c, d) {
  this.f = a;
  this.shift = b;
  this.root = c;
  this.q = d;
  this.e = 275;
  this.o = 88
}
r = Mc.prototype;
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.N(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return this.M(null, a)
};
r.a = function(a, b) {
  return this.N(null, a, b)
};
r.M = function(a, b) {
  return z.d(this, b, null)
};
r.N = function(a, b, c) {
  return z.d(this, b, c)
};
r.J = function(a, b) {
  if(this.root.p) {
    return Ic(this, b)[b & 31]
  }
  throw Error("nth after persistent!");
};
r.Y = function(a, b, c) {
  return 0 <= b && b < this.f ? z.a(this, b) : c
};
r.H = function() {
  if(this.root.p) {
    return this.f
  }
  throw Error("count after persistent!");
};
r.Bb = function(a, b, c) {
  var d = this;
  if(d.root.p) {
    if(0 <= b && b < d.f) {
      return Dc(this) <= b ? d.q[b & 31] = c : (a = function f(a, k) {
        var l = d.root.p === k.p ? k : new Cc(d.root.p, k.c.slice());
        if(0 === a) {
          l.c[b & 31] = c
        }else {
          var n = b >>> a & 31, m = f(a - 5, l.c[n]);
          l.c[n] = m
        }
        return l
      }.call(null, d.shift, d.root), d.root = a), this
    }
    if(b === d.f) {
      return Xa(this, c)
    }
    if(w) {
      throw Error([y("Index "), y(b), y(" out of bounds for TransientVector of length"), y(d.f)].join(""));
    }
    return null
  }
  throw Error("assoc! after persistent!");
};
r.Ea = function(a, b, c) {
  return $a(this, b, c)
};
r.Na = function(a, b) {
  if(this.root.p) {
    if(32 > this.f - Dc(this)) {
      this.q[this.f & 31] = b
    }else {
      var c = new Cc(this.root.p, this.q), d = Array(32);
      d[0] = b;
      this.q = d;
      if(this.f >>> 5 > 1 << this.shift) {
        var d = Array(32), e = this.shift + 5;
        d[0] = this.root;
        d[1] = Ec(this.root.p, this.shift, c);
        this.root = new Cc(this.root.p, d);
        this.shift = e
      }else {
        this.root = Wc(this, this.shift, this.root, c)
      }
    }
    this.f += 1;
    return this
  }
  throw Error("conj! after persistent!");
};
r.Oa = function() {
  if(this.root.p) {
    this.root.p = null;
    var a = this.f - Dc(this), b = Array(a);
    Ib(this.q, 0, b, 0, a);
    return new Lc(null, this.f, this.shift, this.root, b, null)
  }
  throw Error("persistent! called twice");
};
function Xc() {
  this.o = 0;
  this.e = 2097152
}
Xc.prototype.u = p(!1);
var Yc = new Xc;
function Zc(a, b) {
  return Lb(Fb(b) ? R(a) === R(b) ? rc(sc, vc.a(function(a) {
    return nb.a(xb.d(b, I(a), Yc), I(L(a)))
  }, a)) : null : null)
}
function $c(a, b) {
  var c = a.c;
  if(b instanceof T) {
    a: {
      for(var d = c.length, e = b.la, f = 0;;) {
        if(d <= f) {
          c = -1;
          break a
        }
        var g = c[f];
        if(g instanceof T && e === g.la) {
          c = f;
          break a
        }
        if(w) {
          f += 2
        }else {
          c = null;
          break a
        }
      }
      c = void 0
    }
  }else {
    if(ba(b) || "number" === typeof b) {
      a: {
        d = c.length;
        for(e = 0;;) {
          if(d <= e) {
            c = -1;
            break a
          }
          if(b === c[e]) {
            c = e;
            break a
          }
          if(w) {
            e += 2
          }else {
            c = null;
            break a
          }
        }
        c = void 0
      }
    }else {
      if(b instanceof D) {
        a: {
          d = c.length;
          e = b.ta;
          for(f = 0;;) {
            if(d <= f) {
              c = -1;
              break a
            }
            g = c[f];
            if(g instanceof D && e === g.ta) {
              c = f;
              break a
            }
            if(w) {
              f += 2
            }else {
              c = null;
              break a
            }
          }
          c = void 0
        }
      }else {
        if(null == b) {
          a: {
            d = c.length;
            for(e = 0;;) {
              if(d <= e) {
                c = -1;
                break a
              }
              if(null == c[e]) {
                c = e;
                break a
              }
              if(w) {
                e += 2
              }else {
                c = null;
                break a
              }
            }
            c = void 0
          }
        }else {
          if(w) {
            a: {
              d = c.length;
              for(e = 0;;) {
                if(d <= e) {
                  c = -1;
                  break a
                }
                if(nb.a(b, c[e])) {
                  c = e;
                  break a
                }
                if(w) {
                  e += 2
                }else {
                  c = null;
                  break a
                }
              }
              c = void 0
            }
          }else {
            c = null
          }
        }
      }
    }
  }
  return c
}
function ad(a, b, c) {
  this.c = a;
  this.i = b;
  this.Aa = c;
  this.o = 0;
  this.e = 32374990
}
r = ad.prototype;
r.B = function() {
  return sb(this)
};
r.fa = function() {
  return this.i < this.c.length - 2 ? new ad(this.c, this.i + 2, this.Aa) : null
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  return this
};
r.H = function() {
  return(this.c.length - this.i) / 2
};
r.Q = function() {
  return W([this.c[this.i], this.c[this.i + 1]], !0)
};
r.S = function() {
  return this.i < this.c.length - 2 ? new ad(this.c, this.i + 2, this.Aa) : K
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new ad(this.c, this.i, b)
};
r.v = h("Aa");
function cd(a, b, c, d) {
  this.m = a;
  this.f = b;
  this.c = c;
  this.l = d;
  this.o = 4;
  this.e = 16123663
}
r = cd.prototype;
r.Ma = function() {
  return new dd({}, this.c.length, this.c.slice())
};
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = Tb(this)
};
r.M = function(a, b) {
  return wa.d(this, b, null)
};
r.N = function(a, b, c) {
  a = $c(this, b);
  return-1 === a ? c : this.c[a + 1]
};
r.Ca = function(a, b, c) {
  a = $c(this, b);
  if(-1 === a) {
    if(this.f < ed) {
      a = this.c;
      for(var d = a.length, e = Array(d + 2), f = 0;;) {
        if(f < d) {
          e[f] = a[f], f += 1
        }else {
          break
        }
      }
      e[d] = b;
      e[d + 1] = c;
      return new cd(this.m, this.f + 1, e, null)
    }
    a = Ha;
    d = xa;
    e = fd;
    null != e ? e && (e.o & 4 || e.kc) ? (e = Ob.d(Xa, Wa(e), this), e = Ya(e)) : e = Ob.d(sa, e, this) : e = Ob.d(vb, K, this);
    return a(d(e, b, c), this.m)
  }
  return c === this.c[a + 1] ? this : w ? (b = this.c.slice(), b[a + 1] = c, new cd(this.m, this.f, b, null)) : null
};
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.N(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return this.M(null, a)
};
r.a = function(a, b) {
  return this.N(null, a, b)
};
r.G = function(a, b) {
  return Gb(b) ? xa(this, z.a(b, 0), z.a(b, 1)) : Ob.d(sa, this, b)
};
r.toString = function() {
  return fb(this)
};
r.F = function() {
  return 0 <= this.c.length - 2 ? new ad(this.c, 0, null) : null
};
r.H = h("f");
r.u = function(a, b) {
  return Zc(this, b)
};
r.w = function(a, b) {
  return new cd(b, this.f, this.c, this.l)
};
r.v = h("m");
var ed = 8;
function gb(a) {
  return new cd(null, a.length / 2, a, null)
}
function dd(a, b, c) {
  this.xa = a;
  this.ha = b;
  this.c = c;
  this.o = 56;
  this.e = 258
}
r = dd.prototype;
r.Ea = function(a, b, c) {
  if(t(this.xa)) {
    a = $c(this, b);
    if(-1 === a) {
      if(this.ha + 2 <= 2 * ed) {
        return this.ha += 2, this.c.push(b), this.c.push(c), this
      }
      a = gd.a ? gd.a(this.ha, this.c) : gd.call(null, this.ha, this.c);
      return Za(a, b, c)
    }
    c !== this.c[a + 1] && (this.c[a + 1] = c);
    return this
  }
  throw Error("assoc! after persistent!");
};
r.Na = function(a, b) {
  if(t(this.xa)) {
    if(b ? b.e & 2048 || b.Qb || (b.e ? 0 : u(za, b)) : u(za, b)) {
      return Za(this, Ub.b ? Ub.b(b) : Ub.call(null, b), Vb.b ? Vb.b(b) : Vb.call(null, b))
    }
    for(var c = G(b), d = this;;) {
      var e = I(c);
      if(t(e)) {
        c = L(c), d = Za(d, Ub.b ? Ub.b(e) : Ub.call(null, e), Vb.b ? Vb.b(e) : Vb.call(null, e))
      }else {
        return d
      }
    }
  }else {
    throw Error("conj! after persistent!");
  }
};
r.Oa = function() {
  if(t(this.xa)) {
    return this.xa = !1, new cd(null, Pb((this.ha - this.ha % 2) / 2), this.c, null)
  }
  throw Error("persistent! called twice");
};
r.M = function(a, b) {
  return wa.d(this, b, null)
};
r.N = function(a, b, c) {
  if(t(this.xa)) {
    return a = $c(this, b), -1 === a ? c : this.c[a + 1]
  }
  throw Error("lookup after persistent!");
};
r.H = function() {
  if(t(this.xa)) {
    return Pb((this.ha - this.ha % 2) / 2)
  }
  throw Error("count after persistent!");
};
function gd(a, b) {
  for(var c = Wa(fd), d = 0;;) {
    if(d < a) {
      c = Za(c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
}
function hd() {
  this.C = !1
}
function id(a, b) {
  return a === b ? !0 : bc(a, b) ? !0 : w ? nb.a(a, b) : null
}
var jd = function() {
  function a(a, b, c, g, k) {
    a = a.slice();
    a[b] = c;
    a[g] = k;
    return a
  }
  function b(a, b, c) {
    a = a.slice();
    a[b] = c;
    return a
  }
  var c = null, c = function(c, e, f, g, k) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 5:
        return a.call(this, c, e, f, g, k)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.d = b;
  c.I = a;
  return c
}(), kd = function() {
  function a(a, b, c, g, k, l) {
    a = a.ya(b);
    a.c[c] = g;
    a.c[k] = l;
    return a
  }
  function b(a, b, c, g) {
    a = a.ya(b);
    a.c[c] = g;
    return a
  }
  var c = null, c = function(c, e, f, g, k, l) {
    switch(arguments.length) {
      case 4:
        return b.call(this, c, e, f, g);
      case 6:
        return a.call(this, c, e, f, g, k, l)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.k = b;
  c.ea = a;
  return c
}();
function ld(a, b, c) {
  this.p = a;
  this.A = b;
  this.c = c
}
r = ld.prototype;
r.$ = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), k = Sb(this.A & g - 1);
  if(0 === (this.A & g)) {
    var l = Sb(this.A);
    if(2 * l < this.c.length) {
      a = this.ya(a);
      b = a.c;
      f.C = !0;
      a: {
        for(c = 2 * (l - k), f = 2 * k + (c - 1), l = 2 * (k + 1) + (c - 1);;) {
          if(0 === c) {
            break a
          }
          b[l] = b[f];
          l -= 1;
          c -= 1;
          f -= 1
        }
      }
      b[2 * k] = d;
      b[2 * k + 1] = e;
      a.A |= g;
      return a
    }
    if(16 <= l) {
      k = Array(32);
      k[c >>> b & 31] = md.$(a, b + 5, c, d, e, f);
      for(e = d = 0;;) {
        if(32 > d) {
          0 !== (this.A >>> d & 1) && (k[d] = null != this.c[e] ? md.$(a, b + 5, F(this.c[e]), this.c[e], this.c[e + 1], f) : this.c[e + 1], e += 2), d += 1
        }else {
          break
        }
      }
      return new nd(a, l + 1, k)
    }
    return w ? (b = Array(2 * (l + 4)), Ib(this.c, 0, b, 0, 2 * k), b[2 * k] = d, b[2 * k + 1] = e, Ib(this.c, 2 * k, b, 2 * (k + 1), 2 * (l - k)), f.C = !0, a = this.ya(a), a.c = b, a.A |= g, a) : null
  }
  l = this.c[2 * k];
  g = this.c[2 * k + 1];
  return null == l ? (l = g.$(a, b + 5, c, d, e, f), l === g ? this : kd.k(this, a, 2 * k + 1, l)) : id(d, l) ? e === g ? this : kd.k(this, a, 2 * k + 1, e) : w ? (f.C = !0, kd.ea(this, a, 2 * k, null, 2 * k + 1, od.ua ? od.ua(a, b + 5, l, g, c, d, e) : od.call(null, a, b + 5, l, g, c, d, e))) : null
};
r.Ja = function() {
  return pd.b ? pd.b(this.c) : pd.call(null, this.c)
};
r.ya = function(a) {
  if(a === this.p) {
    return this
  }
  var b = Sb(this.A), c = Array(0 > b ? 4 : 2 * (b + 1));
  Ib(this.c, 0, c, 0, 2 * b);
  return new ld(a, this.A, c)
};
r.Z = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = Sb(this.A & f - 1);
  if(0 === (this.A & f)) {
    var k = Sb(this.A);
    if(16 <= k) {
      g = Array(32);
      g[b >>> a & 31] = md.Z(a + 5, b, c, d, e);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.A >>> c & 1) && (g[c] = null != this.c[d] ? md.Z(a + 5, F(this.c[d]), this.c[d], this.c[d + 1], e) : this.c[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new nd(null, k + 1, g)
    }
    a = Array(2 * (k + 1));
    Ib(this.c, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    Ib(this.c, 2 * g, a, 2 * (g + 1), 2 * (k - g));
    e.C = !0;
    return new ld(null, this.A | f, a)
  }
  k = this.c[2 * g];
  f = this.c[2 * g + 1];
  return null == k ? (k = f.Z(a + 5, b, c, d, e), k === f ? this : new ld(null, this.A, jd.d(this.c, 2 * g + 1, k))) : id(c, k) ? d === f ? this : new ld(null, this.A, jd.d(this.c, 2 * g + 1, d)) : w ? (e.C = !0, new ld(null, this.A, jd.I(this.c, 2 * g, null, 2 * g + 1, od.ea ? od.ea(a + 5, k, f, b, c, d) : od.call(null, a + 5, k, f, b, c, d)))) : null
};
r.pa = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.A & e)) {
    return d
  }
  var f = Sb(this.A & e - 1), e = this.c[2 * f], f = this.c[2 * f + 1];
  return null == e ? f.pa(a + 5, b, c, d) : id(c, e) ? f : w ? d : null
};
var md = new ld(null, 0, []);
function nd(a, b, c) {
  this.p = a;
  this.f = b;
  this.c = c
}
r = nd.prototype;
r.$ = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, k = this.c[g];
  if(null == k) {
    return a = kd.k(this, a, g, md.$(a, b + 5, c, d, e, f)), a.f += 1, a
  }
  b = k.$(a, b + 5, c, d, e, f);
  return b === k ? this : kd.k(this, a, g, b)
};
r.Ja = function() {
  return qd.b ? qd.b(this.c) : qd.call(null, this.c)
};
r.ya = function(a) {
  return a === this.p ? this : new nd(a, this.f, this.c.slice())
};
r.Z = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.c[f];
  if(null == g) {
    return new nd(null, this.f + 1, jd.d(this.c, f, md.Z(a + 5, b, c, d, e)))
  }
  a = g.Z(a + 5, b, c, d, e);
  return a === g ? this : new nd(null, this.f, jd.d(this.c, f, a))
};
r.pa = function(a, b, c, d) {
  var e = this.c[b >>> a & 31];
  return null != e ? e.pa(a + 5, b, c, d) : d
};
function rd(a, b, c) {
  b *= 2;
  for(var d = 0;;) {
    if(d < b) {
      if(id(c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
}
function sd(a, b, c, d) {
  this.p = a;
  this.ka = b;
  this.f = c;
  this.c = d
}
r = sd.prototype;
r.$ = function(a, b, c, d, e, f) {
  if(c === this.ka) {
    b = rd(this.c, this.f, d);
    if(-1 === b) {
      if(this.c.length > 2 * this.f) {
        return a = kd.ea(this, a, 2 * this.f, d, 2 * this.f + 1, e), f.C = !0, a.f += 1, a
      }
      c = this.c.length;
      b = Array(c + 2);
      Ib(this.c, 0, b, 0, c);
      b[c] = d;
      b[c + 1] = e;
      f.C = !0;
      f = this.f + 1;
      a === this.p ? (this.c = b, this.f = f, a = this) : a = new sd(this.p, this.ka, f, b);
      return a
    }
    return this.c[b + 1] === e ? this : kd.k(this, a, b + 1, e)
  }
  return(new ld(a, 1 << (this.ka >>> b & 31), [null, this, null, null])).$(a, b, c, d, e, f)
};
r.Ja = function() {
  return pd.b ? pd.b(this.c) : pd.call(null, this.c)
};
r.ya = function(a) {
  if(a === this.p) {
    return this
  }
  var b = Array(2 * (this.f + 1));
  Ib(this.c, 0, b, 0, 2 * this.f);
  return new sd(a, this.ka, this.f, b)
};
r.Z = function(a, b, c, d, e) {
  return b === this.ka ? (a = rd(this.c, this.f, c), -1 === a ? (a = 2 * this.f, b = Array(a + 2), Ib(this.c, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.C = !0, new sd(null, this.ka, this.f + 1, b)) : nb.a(this.c[a], d) ? this : new sd(null, this.ka, this.f, jd.d(this.c, a + 1, d))) : (new ld(null, 1 << (this.ka >>> a & 31), [null, this])).Z(a, b, c, d, e)
};
r.pa = function(a, b, c, d) {
  a = rd(this.c, this.f, c);
  return 0 > a ? d : id(c, this.c[a]) ? this.c[a + 1] : w ? d : null
};
var od = function() {
  function a(a, b, c, g, k, l, n) {
    var m = F(c);
    if(m === k) {
      return new sd(null, m, 2, [c, g, l, n])
    }
    var q = new hd;
    return md.$(a, b, m, c, g, q).$(a, b, k, l, n, q)
  }
  function b(a, b, c, g, k, l) {
    var n = F(b);
    if(n === g) {
      return new sd(null, n, 2, [b, c, k, l])
    }
    var m = new hd;
    return md.Z(a, n, b, c, m).Z(a, g, k, l, m)
  }
  var c = null, c = function(c, e, f, g, k, l, n) {
    switch(arguments.length) {
      case 6:
        return b.call(this, c, e, f, g, k, l);
      case 7:
        return a.call(this, c, e, f, g, k, l, n)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.ea = b;
  c.ua = a;
  return c
}();
function td(a, b, c, d, e) {
  this.m = a;
  this.aa = b;
  this.i = c;
  this.r = d;
  this.l = e;
  this.o = 0;
  this.e = 32374860
}
r = td.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  return this
};
r.Q = function() {
  return null == this.r ? W([this.aa[this.i], this.aa[this.i + 1]], !0) : I(this.r)
};
r.S = function() {
  return null == this.r ? pd.d ? pd.d(this.aa, this.i + 2, null) : pd.call(null, this.aa, this.i + 2, null) : pd.d ? pd.d(this.aa, this.i, L(this.r)) : pd.call(null, this.aa, this.i, L(this.r))
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new td(b, this.aa, this.i, this.r, this.l)
};
r.v = h("m");
var pd = function() {
  function a(a, b, c) {
    if(null == c) {
      for(c = a.length;;) {
        if(b < c) {
          if(null != a[b]) {
            return new td(null, a, b, null, null)
          }
          var g = a[b + 1];
          if(t(g) && (g = g.Ja(), t(g))) {
            return new td(null, a, b + 2, g, null)
          }
          b += 2
        }else {
          return null
        }
      }
    }else {
      return new td(null, a, b, c, null)
    }
  }
  function b(a) {
    return c.d(a, 0, null)
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.b = b;
  c.d = a;
  return c
}();
function ud(a, b, c, d, e) {
  this.m = a;
  this.aa = b;
  this.i = c;
  this.r = d;
  this.l = e;
  this.o = 0;
  this.e = 32374860
}
r = ud.prototype;
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = sb(this)
};
r.G = function(a, b) {
  return N(b, this)
};
r.toString = function() {
  return fb(this)
};
r.O = function(a, b) {
  return P.a(b, this)
};
r.P = function(a, b, c) {
  return P.d(b, c, this)
};
r.F = function() {
  return this
};
r.Q = function() {
  return I(this.r)
};
r.S = function() {
  return qd.k ? qd.k(null, this.aa, this.i, L(this.r)) : qd.call(null, null, this.aa, this.i, L(this.r))
};
r.u = function(a, b) {
  return O(this, b)
};
r.w = function(a, b) {
  return new ud(b, this.aa, this.i, this.r, this.l)
};
r.v = h("m");
var qd = function() {
  function a(a, b, c, g) {
    if(null == g) {
      for(g = b.length;;) {
        if(c < g) {
          var k = b[c];
          if(t(k) && (k = k.Ja(), t(k))) {
            return new ud(a, b, c + 1, k, null)
          }
          c += 1
        }else {
          return null
        }
      }
    }else {
      return new ud(a, b, c, g, null)
    }
  }
  function b(a) {
    return c.k(null, a, 0, null)
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 4:
        return a.call(this, c, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.b = b;
  c.k = a;
  return c
}();
function vd(a, b, c, d, e, f) {
  this.m = a;
  this.f = b;
  this.root = c;
  this.U = d;
  this.W = e;
  this.l = f;
  this.o = 4;
  this.e = 16123663
}
r = vd.prototype;
r.Ma = function() {
  return new wd({}, this.root, this.f, this.U, this.W)
};
r.B = function() {
  var a = this.l;
  return null != a ? a : this.l = a = Tb(this)
};
r.M = function(a, b) {
  return wa.d(this, b, null)
};
r.N = function(a, b, c) {
  return null == b ? this.U ? this.W : c : null == this.root ? c : w ? this.root.pa(0, F(b), b, c) : null
};
r.Ca = function(a, b, c) {
  if(null == b) {
    return this.U && c === this.W ? this : new vd(this.m, this.U ? this.f : this.f + 1, this.root, !0, c, null)
  }
  a = new hd;
  b = (null == this.root ? md : this.root).Z(0, F(b), b, c, a);
  return b === this.root ? this : new vd(this.m, a.C ? this.f + 1 : this.f, b, this.U, this.W, null)
};
r.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.M(null, c);
      case 3:
        return this.N(null, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
r.apply = function(a, b) {
  return this.call.apply(this, [this].concat(b.slice()))
};
r.b = function(a) {
  return this.M(null, a)
};
r.a = function(a, b) {
  return this.N(null, a, b)
};
r.G = function(a, b) {
  return Gb(b) ? xa(this, z.a(b, 0), z.a(b, 1)) : Ob.d(sa, this, b)
};
r.toString = function() {
  return fb(this)
};
r.F = function() {
  if(0 < this.f) {
    var a = null != this.root ? this.root.Ja() : null;
    return this.U ? N(W([null, this.W], !0), a) : a
  }
  return null
};
r.H = h("f");
r.u = function(a, b) {
  return Zc(this, b)
};
r.w = function(a, b) {
  return new vd(b, this.f, this.root, this.U, this.W, this.l)
};
r.v = h("m");
var fd = new vd(null, 0, null, !1, null, 0);
function yb(a, b) {
  for(var c = a.length, d = 0, e = Wa(fd);;) {
    if(d < c) {
      var f = d + 1, e = e.Ea(null, a[d], b[d]), d = f
    }else {
      return Ya(e)
    }
  }
}
function wd(a, b, c, d, e) {
  this.p = a;
  this.root = b;
  this.count = c;
  this.U = d;
  this.W = e;
  this.o = 56;
  this.e = 258
}
r = wd.prototype;
r.Ea = function(a, b, c) {
  return xd(this, b, c)
};
r.Na = function(a, b) {
  var c;
  a: {
    if(this.p) {
      if(b ? b.e & 2048 || b.Qb || (b.e ? 0 : u(za, b)) : u(za, b)) {
        c = xd(this, Ub.b ? Ub.b(b) : Ub.call(null, b), Vb.b ? Vb.b(b) : Vb.call(null, b));
        break a
      }
      c = G(b);
      for(var d = this;;) {
        var e = I(c);
        if(t(e)) {
          c = L(c), d = xd(d, Ub.b ? Ub.b(e) : Ub.call(null, e), Vb.b ? Vb.b(e) : Vb.call(null, e))
        }else {
          c = d;
          break a
        }
      }
    }else {
      throw Error("conj! after persistent");
    }
    c = void 0
  }
  return c
};
r.Oa = function() {
  var a;
  if(this.p) {
    this.p = null, a = new vd(null, this.count, this.root, this.U, this.W, null)
  }else {
    throw Error("persistent! called twice");
  }
  return a
};
r.M = function(a, b) {
  return null == b ? this.U ? this.W : null : null == this.root ? null : this.root.pa(0, F(b), b)
};
r.N = function(a, b, c) {
  return null == b ? this.U ? this.W : c : null == this.root ? c : this.root.pa(0, F(b), b, c)
};
r.H = function() {
  if(this.p) {
    return this.count
  }
  throw Error("count after persistent!");
};
function xd(a, b, c) {
  if(a.p) {
    if(null == b) {
      a.W !== c && (a.W = c), a.U || (a.count += 1, a.U = !0)
    }else {
      var d = new hd;
      b = (null == a.root ? md : a.root).$(a.p, 0, F(b), b, c, d);
      b !== a.root && (a.root = b);
      d.C && (a.count += 1)
    }
    return a
  }
  throw Error("assoc! after persistent!");
}
var yd = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d)
  }
  function b(a) {
    for(var b = G(a), e = Wa(fd);;) {
      if(b) {
        a = L(L(b));
        var f = I(b), b = I(L(b)), e = Za(e, f, b), b = a
      }else {
        return Ya(e)
      }
    }
  }
  a.n = 0;
  a.j = function(a) {
    a = G(a);
    return b(a)
  };
  a.g = b;
  return a
}();
function Ub(a) {
  return Aa(a)
}
function Vb(a) {
  return Ba(a)
}
function Y(a, b, c, d, e, f, g) {
  C(a, c);
  G(g) && (b.d ? b.d(I(g), a, f) : b.call(null, I(g), a, f));
  c = G(L(g));
  g = null;
  for(var k = 0, l = 0;;) {
    if(l < k) {
      var n = g.J(null, l);
      C(a, d);
      b.d ? b.d(n, a, f) : b.call(null, n, a, f);
      l += 1
    }else {
      if(c = G(c)) {
        g = c, Hb(g) ? (c = bb(g), l = cb(g), g = c, k = R(c), c = l) : (c = I(g), C(a, d), b.d ? b.d(c, a, f) : b.call(null, c, a, f), c = L(g), g = null, k = 0), l = 0
      }else {
        break
      }
    }
  }
  return C(a, e)
}
var zd = function() {
  function a(a, d) {
    var e = null;
    1 < arguments.length && (e = M(Array.prototype.slice.call(arguments, 1), 0));
    return b.call(this, a, e)
  }
  function b(a, b) {
    for(var e = G(b), f = null, g = 0, k = 0;;) {
      if(k < g) {
        var l = f.J(null, k);
        C(a, l);
        k += 1
      }else {
        if(e = G(e)) {
          f = e, Hb(f) ? (e = bb(f), g = cb(f), f = e, l = R(e), e = g, g = l) : (l = I(f), C(a, l), e = L(f), f = null, g = 0), k = 0
        }else {
          return null
        }
      }
    }
  }
  a.n = 1;
  a.j = function(a) {
    var d = I(a);
    a = J(a);
    return b(d, a)
  };
  a.g = b;
  return a
}(), Ad = {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"};
function Bd(a) {
  return[y('"'), y(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return Ad[a]
  })), y('"')].join("")
}
var Z = function Cd(b, c, d) {
  if(null == b) {
    return C(c, "nil")
  }
  if(void 0 === b) {
    return C(c, "#\x3cundefined\x3e")
  }
  if(w) {
    t(function() {
      var c = xb.a(d, jb);
      return t(c) ? (c = b ? b.e & 131072 || b.Rb ? !0 : b.e ? !1 : u(Fa, b) : u(Fa, b)) ? Bb(b) : c : c
    }()) && (C(c, "^"), Cd(Bb(b), c, d), C(c, " "));
    if(null == b) {
      return C(c, "nil")
    }
    if(b.wa) {
      return b.Fa(b, c, d)
    }
    if(b && (b.e & 2147483648 || b.K)) {
      return b.t(null, c, d)
    }
    if(ka(b) === Boolean || "number" === typeof b) {
      return C(c, "" + y(b))
    }
    if(b instanceof Array) {
      return Y(c, Cd, "#\x3cArray [", ", ", "]\x3e", d, b)
    }
    if(ba(b)) {
      return t(ib.b(d)) ? C(c, Bd(b)) : C(c, b)
    }
    if(Ab(b)) {
      return zd.g(c, M(["#\x3c", "" + y(b), "\x3e"], 0))
    }
    if(b instanceof Date) {
      var e = function(b, c) {
        for(var d = "" + y(b);;) {
          if(R(d) < c) {
            d = [y("0"), y(d)].join("")
          }else {
            return d
          }
        }
      };
      return zd.g(c, M(['#inst "', "" + y(b.getUTCFullYear()), "-", e(b.getUTCMonth() + 1, 2), "-", e(b.getUTCDate(), 2), "T", e(b.getUTCHours(), 2), ":", e(b.getUTCMinutes(), 2), ":", e(b.getUTCSeconds(), 2), ".", e(b.getUTCMilliseconds(), 3), "-", '00:00"'], 0))
    }
    return t(b instanceof RegExp) ? zd.g(c, M(['#"', b.source, '"'], 0)) : (b ? b.e & 2147483648 || b.K || (b.e ? 0 : u(Ta, b)) : u(Ta, b)) ? Ua(b, c, d) : w ? zd.g(c, M(["#\x3c", "" + y(b), "\x3e"], 0)) : null
  }
  return null
}, Dd = function() {
  function a(a) {
    var d = null;
    0 < arguments.length && (d = M(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, d)
  }
  function b(a) {
    var b = gb([hb, !0, ib, !0, jb, !1, kb, !1]);
    if(null == a || ja(G(a))) {
      b = ""
    }else {
      var e = y, f = new ia, g = new eb(f);
      a: {
        Z(I(a), g, b);
        a = G(L(a));
        for(var k = null, l = 0, n = 0;;) {
          if(n < l) {
            var m = k.J(null, n);
            C(g, " ");
            Z(m, g, b);
            n += 1
          }else {
            if(a = G(a)) {
              k = a, Hb(k) ? (a = bb(k), l = cb(k), k = a, m = R(a), a = l, l = m) : (m = I(k), C(g, " "), Z(m, g, b), a = L(k), k = null, l = 0), n = 0
            }else {
              break a
            }
          }
        }
      }
      Sa(g);
      b = "" + e(f)
    }
    return b
  }
  a.n = 0;
  a.j = function(a) {
    a = G(a);
    return b(a)
  };
  a.g = b;
  return a
}();
mb.prototype.K = !0;
mb.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
Tc.prototype.K = !0;
Tc.prototype.t = function(a, b, c) {
  return Y(b, Z, "[", " ", "]", c, this)
};
gc.prototype.K = !0;
gc.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
cd.prototype.K = !0;
cd.prototype.t = function(a, b, c) {
  return Y(b, function(a) {
    return Y(b, Z, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
U.prototype.K = !0;
U.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
tb.prototype.K = !0;
tb.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
td.prototype.K = !0;
td.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
Rc.prototype.K = !0;
Rc.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
vd.prototype.K = !0;
vd.prototype.t = function(a, b, c) {
  return Y(b, function(a) {
    return Y(b, Z, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
Lc.prototype.K = !0;
Lc.prototype.t = function(a, b, c) {
  return Y(b, Z, "[", " ", "]", c, this)
};
Wb.prototype.K = !0;
Wb.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
ad.prototype.K = !0;
ad.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
Xb.prototype.K = !0;
Xb.prototype.t = function(a, b) {
  return C(b, "()")
};
ac.prototype.K = !0;
ac.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
ud.prototype.K = !0;
ud.prototype.t = function(a, b, c) {
  return Y(b, Z, "(", " ", ")", c, this)
};
Lc.prototype.wb = !0;
Lc.prototype.xb = function(a, b) {
  return Nb.a(this, b)
};
Tc.prototype.wb = !0;
Tc.prototype.xb = function(a, b) {
  return Nb.a(this, b)
};
function Ed(a, b, c, d) {
  this.state = a;
  this.m = b;
  this.fc = c;
  this.gc = d;
  this.e = 2153938944;
  this.o = 2
}
r = Ed.prototype;
r.B = function() {
  return ca(this)
};
r.Cb = function(a, b, c) {
  a = G(this.gc);
  for(var d = null, e = 0, f = 0;;) {
    if(f < e) {
      var g = d.J(null, f), k = S.d(g, 0, null), g = S.d(g, 1, null);
      g.k ? g.k(k, this, b, c) : g.call(null, k, this, b, c);
      f += 1
    }else {
      if(a = G(a)) {
        Hb(a) ? (d = bb(a), a = cb(a), k = d, e = R(d), d = k) : (d = I(a), k = S.d(d, 0, null), g = S.d(d, 1, null), g.k ? g.k(k, this, b, c) : g.call(null, k, this, b, c), a = L(a), d = null, e = 0), f = 0
      }else {
        return null
      }
    }
  }
};
r.t = function(a, b, c) {
  C(b, "#\x3cAtom: ");
  Z(this.state, b, c);
  return C(b, "\x3e")
};
r.v = h("m");
r.$a = h("state");
r.u = function(a, b) {
  return this === b
};
var Gd = function() {
  function a(a) {
    return new Ed(a, null, null, null)
  }
  var b = null, c = function() {
    function a(c, d) {
      var k = null;
      1 < arguments.length && (k = M(Array.prototype.slice.call(arguments, 1), 0));
      return b.call(this, c, k)
    }
    function b(a, c) {
      var d = Kb(c) ? pc.a(yd, c) : c, e = xb.a(d, Fd), d = xb.a(d, jb);
      return new Ed(a, d, e, null)
    }
    a.n = 1;
    a.j = function(a) {
      var c = I(a);
      a = J(a);
      return b(c, a)
    };
    a.g = b;
    return a
  }(), b = function(b, e) {
    switch(arguments.length) {
      case 1:
        return a.call(this, b);
      default:
        return c.g(b, M(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.n = 1;
  b.j = c.j;
  b.b = a;
  b.g = c.g;
  return b
}(), Hd = {};
function Id(a) {
  if(a ? a.Ob : a) {
    return a.Ob(a)
  }
  var b;
  b = Id[s(null == a ? null : a)];
  if(!b && (b = Id._, !b)) {
    throw x("IEncodeJS.-clj-\x3ejs", a);
  }
  return b.call(null, a)
}
function Jd(a) {
  return(a ? t(t(null) ? null : a.Nb) || (a.Eb ? 0 : u(Hd, a)) : u(Hd, a)) ? Id(a) : "string" === typeof a || "number" === typeof a || a instanceof T || a instanceof D ? Kd.b ? Kd.b(a) : Kd.call(null, a) : Dd.g(M([a], 0))
}
var Kd = function Ld(b) {
  if(null == b) {
    return null
  }
  if(b ? t(t(null) ? null : b.Nb) || (b.Eb ? 0 : u(Hd, b)) : u(Hd, b)) {
    return Id(b)
  }
  if(b instanceof T) {
    var c;
    if(b && (b.o & 4096 || b.nc)) {
      c = b.name
    }else {
      if("string" === typeof b) {
        c = b
      }else {
        throw Error([y("Doesn't support name: "), y(b)].join(""));
      }
    }
    return c
  }
  if(b instanceof D) {
    return"" + y(b)
  }
  if(Fb(b)) {
    c = {};
    b = G(b);
    for(var d = null, e = 0, f = 0;;) {
      if(f < e) {
        var g = d.J(null, f), k = S.d(g, 0, null), g = S.d(g, 1, null);
        c[Jd(k)] = Ld(g);
        f += 1
      }else {
        if(b = G(b)) {
          Hb(b) ? (e = bb(b), b = cb(b), d = e, e = R(e)) : (e = I(b), d = S.d(e, 0, null), e = S.d(e, 1, null), c[Jd(d)] = Ld(e), b = L(b), d = null, e = 0), f = 0
        }else {
          break
        }
      }
    }
    return c
  }
  return(null == b ? 0 : b ? b.e & 8 || b.jc || (b.e ? 0 : u(ra, b)) : u(ra, b)) ? pc.a(ma, vc.a(Ld, b)) : w ? b : null
}, Qb = function() {
  function a(a) {
    return(Math.random.h ? Math.random.h() : Math.random.call(null)) * a
  }
  function b() {
    return c.b(1)
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.h = b;
  c.b = a;
  return c
}(), Rb = function(a) {
  return Math.floor.b ? Math.floor.b((Math.random.h ? Math.random.h() : Math.random.call(null)) * a) : Math.floor.call(null, (Math.random.h ? Math.random.h() : Math.random.call(null)) * a)
};
var kb = new T(null, "dup", "dup"), Md = new T(null, "default", "default"), $ = new T(null, "recur", "recur"), Nd = new T(null, "finally-block", "finally-block"), Od = new T(null, "catch-block", "catch-block"), Pd = new T(null, "y", "y"), Qd = new T(null, "x", "x"), hb = new T(null, "flush-on-newline", "flush-on-newline"), Rd = new T(null, "catch-exception", "catch-exception"), Sd = new T(null, "continue-block", "continue-block"), Td = new T(null, "prev", "prev"), Ud = new T(null, "type", "type"),
w = new T(null, "else", "else"), ib = new T(null, "readably", "readably"), Fd = new T(null, "validator", "validator"), jb = new T(null, "meta", "meta"), Vd = new T(null, "letter", "letter"), Wd = new T(null, "priority", "priority");
var Xd, Yd, Zd, $d;
function ae() {
  return aa.navigator ? aa.navigator.userAgent : null
}
$d = Zd = Yd = Xd = !1;
var be;
if(be = ae()) {
  var ce = aa.navigator;
  Xd = 0 == be.indexOf("Opera");
  Yd = !Xd && -1 != be.indexOf("MSIE");
  Zd = !Xd && -1 != be.indexOf("WebKit");
  $d = !Xd && !Zd && "Gecko" == ce.product
}
var de = Xd, ee = Yd, fe = $d, ge = Zd, he = aa.navigator, ie = -1 != (he && he.platform || "").indexOf("Mac");
function je() {
  var a = aa.document;
  return a ? a.documentMode : void 0
}
var ke;
a: {
  var le = "", me;
  if(de && aa.opera) {
    var ne = aa.opera.version, le = "function" == typeof ne ? ne() : ne
  }else {
    if(fe ? me = /rv\:([^\);]+)(\)|;)/ : ee ? me = /MSIE\s+([^\);]+)(\)|;)/ : ge && (me = /WebKit\/(\S+)/), me) {
      var oe = me.exec(ae()), le = oe ? oe[1] : ""
    }
  }
  if(ee) {
    var pe = je();
    if(pe > parseFloat(le)) {
      ke = String(pe);
      break a
    }
  }
  ke = le
}
var qe = {};
function re(a) {
  var b;
  if(!(b = qe[a])) {
    b = 0;
    for(var c = String(ke).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), d = String(a).replace(/^[\s\xa0]+|[\s\xa0]+$/g, "").split("."), e = Math.max(c.length, d.length), f = 0;0 == b && f < e;f++) {
      var g = c[f] || "", k = d[f] || "", l = RegExp("(\\d*)(\\D*)", "g"), n = RegExp("(\\d*)(\\D*)", "g");
      do {
        var m = l.exec(g) || ["", "", ""], q = n.exec(k) || ["", "", ""];
        if(0 == m[0].length && 0 == q[0].length) {
          break
        }
        b = ((0 == m[1].length ? 0 : parseInt(m[1], 10)) < (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? -1 : (0 == m[1].length ? 0 : parseInt(m[1], 10)) > (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? 1 : 0) || ((0 == m[2].length) < (0 == q[2].length) ? -1 : (0 == m[2].length) > (0 == q[2].length) ? 1 : 0) || (m[2] < q[2] ? -1 : m[2] > q[2] ? 1 : 0)
      }while(0 == b)
    }
    b = qe[a] = 0 <= b
  }
  return b
}
var se = aa.document, te = se && ee ? je() || ("CSS1Compat" == se.compatMode ? parseInt(ke, 10) : 5) : void 0;
!fe && !ee || ee && ee && 9 <= te || fe && re("1.9.1");
ee && re("9");
function ue(a) {
  return ba(a) ? document.getElementById(a) : a
}
;function ve(a, b, c) {
  return uc(function(a, e) {
    return gb([Vd, e, Qd, b + 80 * a + 50, Pd, c + 0 + 25])
  }, a)
}
var we = mc.g(ve("qwertyuiop", 0, 0), ve("asdfghjkl", 40, 80), M([ve("zxcvbnm", 120, 160)], 0));
function xe(a, b) {
  var c = I(a);
  return nb.a(c, b) ? a : N(b, a)
}
function ye(a, b) {
  var c = Qd.b(a), d = Pd.b(a), e = Qd.b(b), f = Pd.b(b);
  return c > e && d > f && c < e + 80 && d < f + 80
}
function ze(a) {
  return vc.a(function(a) {
    return Vd.b(a)
  }, zc(tc.a(ye, a), we))
}
;function Ae(a) {
  return t(a) ? [y("\x3cul\x3e"), y(pc.a(y, function() {
    return function c(a) {
      return new U(null, function() {
        for(;;) {
          var e = G(a);
          if(e) {
            if(Hb(e)) {
              var f = bb(e), g = R(f), k = new dc(Array(g), 0);
              a: {
                for(var l = 0;;) {
                  if(l < g) {
                    var n = z.a(f, l), n = [y("\x3cli\x3e"), y(n), y("\x3c/li\x3e")].join("");
                    k.add(n);
                    l += 1
                  }else {
                    f = !0;
                    break a
                  }
                }
                f = void 0
              }
              return f ? hc(k.R(), c(cb(e))) : hc(k.R(), null)
            }
            k = I(e);
            return N([y("\x3cli\x3e"), y(k), y("\x3c/li\x3e")].join(""), c(J(e)))
          }
          return null
        }
      }, null, null)
    }(a)
  }())), y("\x3c/ul\x3e")].join("") : "" + y("No results")
}
function Be() {
  return document.getElementById("swipe-canvas").getContext("2d")
}
function Ce(a, b, c, d) {
  var e = Be();
  e.save();
  e.beginPath();
  e.moveTo(a, b);
  e.lineTo(c, d);
  e.lineWidth = 10;
  e.lineCap = "round";
  e.stroke();
  e.restore();
  return e
}
function De() {
  for(var a = I(we), b = J(we);;) {
    if(t(a)) {
      var c = Qd.b(a), d = Pd.b(a), e = Be();
      e.save();
      e.fillStyle = "#DDDDDD";
      e.beginPath();
      e.moveTo(c + 15, d);
      e.lineTo(c + 60, d);
      e.quadraticCurveTo(c + 75, d, c + 75, d + 15);
      e.lineTo(c + 75, d + 60);
      e.quadraticCurveTo(c + 75, d + 75, c + 60, d + 75);
      e.lineTo(c + 15, d + 75);
      e.quadraticCurveTo(c, d + 75, c, d + 60);
      e.lineTo(c, d + 15);
      e.quadraticCurveTo(c, d, c + 15, d);
      e.closePath();
      e.fill();
      e.font = "italic 40pt Lucidatypewriter, monospace";
      e.fillStyle = "#000000";
      e.fillText(Vd.b(a).toUpperCase(), c + 18, d + 55);
      e.restore();
      a = I(b);
      b = J(b)
    }else {
      return null
    }
  }
}
function Ee() {
  var a = Be();
  a.save();
  a.fillStyle = "white";
  a.fillRect(0, 0, 900, 300);
  a.restore();
  return a
}
;var Fe = !ee || ee && 9 <= te, Ge = ee && !re("9");
!ge || re("528");
fe && re("1.9b") || ee && re("8") || de && re("9.5") || ge && re("528");
fe && !re("8") || ee && re("9");
function He(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
He.prototype.tb = !1;
He.prototype.defaultPrevented = !1;
He.prototype.cc = !0;
He.prototype.preventDefault = function() {
  this.defaultPrevented = !0;
  this.cc = !1
};
function Ie(a) {
  Ie[" "](a);
  return a
}
Ie[" "] = function() {
};
function Je(a, b) {
  a && this.Ta(a, b)
}
(function() {
  function a() {
  }
  a.prototype = He.prototype;
  Je.ec = He.prototype;
  Je.prototype = new a;
  Je.prototype.constructor = Je
})();
r = Je.prototype;
r.target = null;
r.relatedTarget = null;
r.offsetX = 0;
r.offsetY = 0;
r.clientX = 0;
r.clientY = 0;
r.screenX = 0;
r.screenY = 0;
r.button = 0;
r.keyCode = 0;
r.charCode = 0;
r.ctrlKey = !1;
r.altKey = !1;
r.shiftKey = !1;
r.metaKey = !1;
r.bc = !1;
r.Fb = null;
r.Ta = function(a, b) {
  var c = this.type = a.type;
  He.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(fe) {
      var e;
      a: {
        try {
          Ie(d.nodeName);
          e = !0;
          break a
        }catch(f) {
        }
        e = !1
      }
      e || (d = null)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = ge || void 0 !== a.offsetX ? a.offsetX : a.layerX;
  this.offsetY = ge || void 0 !== a.offsetY ? a.offsetY : a.layerY;
  this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX;
  this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.bc = ie ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.Fb = a;
  a.defaultPrevented && this.preventDefault();
  delete this.tb
};
r.preventDefault = function() {
  Je.ec.preventDefault.call(this);
  var a = this.Fb;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = !1, Ge) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
var Ke = 0;
function Le() {
}
r = Le.prototype;
r.key = 0;
r.sa = !1;
r.La = !1;
r.Ta = function(a, b, c, d, e, f) {
  if("function" == s(a)) {
    this.Gb = !0
  }else {
    if(a && a.handleEvent && "function" == s(a.handleEvent)) {
      this.Gb = !1
    }else {
      throw Error("Invalid listener argument");
    }
  }
  this.qa = a;
  this.Ib = b;
  this.src = c;
  this.type = d;
  this.capture = !!e;
  this.Ia = f;
  this.La = !1;
  this.key = ++Ke;
  this.sa = !1
};
r.handleEvent = function(a) {
  return this.Gb ? this.qa.call(this.Ia || this.src, a) : this.qa.handleEvent.call(this.qa, a)
};
var Me = {}, Ne = {}, Oe = {}, Pe = {};
function Qe(a, b, c, d, e) {
  if("array" == s(b)) {
    for(var f = 0;f < b.length;f++) {
      Qe(a, b[f], c, d, e)
    }
    return null
  }
  a: {
    if(!b) {
      throw Error("Invalid event type");
    }
    d = !!d;
    var g = Ne;
    b in g || (g[b] = {ga:0, ia:0});
    g = g[b];
    d in g || (g[d] = {ga:0, ia:0}, g.ga++);
    var g = g[d], f = ca(a), k;
    g.ia++;
    if(g[f]) {
      k = g[f];
      for(var l = 0;l < k.length;l++) {
        if(g = k[l], g.qa == c && g.Ia == e) {
          if(g.sa) {
            break
          }
          k[l].La = !1;
          a = k[l];
          break a
        }
      }
    }else {
      k = g[f] = [], g.ga++
    }
    l = Re();
    g = new Le;
    g.Ta(c, l, a, b, d, e);
    g.La = !1;
    l.src = a;
    l.qa = g;
    k.push(g);
    Oe[f] || (Oe[f] = []);
    Oe[f].push(g);
    a.addEventListener ? a != aa && a.Vb || a.addEventListener(b, l, d) : a.attachEvent(b in Pe ? Pe[b] : Pe[b] = "on" + b, l);
    a = g
  }
  b = a.key;
  Me[b] = a;
  return b
}
function Re() {
  var a = Se, b = Fe ? function(c) {
    return a.call(b.src, b.qa, c)
  } : function(c) {
    c = a.call(b.src, b.qa, c);
    if(!c) {
      return c
    }
  };
  return b
}
function Te(a) {
  var b = Me[a];
  if(b && !b.sa) {
    var c = b.src, d = b.type, e = b.Ib, f = b.capture;
    c.removeEventListener ? c != aa && c.Vb || c.removeEventListener(d, e, f) : c.detachEvent && c.detachEvent(d in Pe ? Pe[d] : Pe[d] = "on" + d, e);
    c = ca(c);
    if(Oe[c]) {
      var e = Oe[c], g = ha(e, b);
      0 <= g && ga.splice.call(e, g, 1);
      0 == e.length && delete Oe[c]
    }
    b.sa = !0;
    if(b = Ne[d][f][c]) {
      b.Hb = !0, Ue(d, f, c, b)
    }
    delete Me[a]
  }
}
function Ue(a, b, c, d) {
  if(!d.Ua && d.Hb) {
    for(var e = 0, f = 0;e < d.length;e++) {
      d[e].sa ? d[e].Ib.src = null : (e != f && (d[f] = d[e]), f++)
    }
    d.length = f;
    d.Hb = !1;
    0 == f && (delete Ne[a][b][c], Ne[a][b].ga--, 0 == Ne[a][b].ga && (delete Ne[a][b], Ne[a].ga--), 0 == Ne[a].ga && delete Ne[a])
  }
}
function Ve(a, b, c, d, e) {
  var f = 1;
  b = ca(b);
  if(a[b]) {
    var g = --a.ia, k = a[b];
    k.Ua ? k.Ua++ : k.Ua = 1;
    try {
      for(var l = k.length, n = 0;n < l;n++) {
        var m = k[n];
        m && !m.sa && (f &= !1 !== We(m, e))
      }
    }finally {
      a.ia = Math.max(g, a.ia), k.Ua--, Ue(c, d, b, k)
    }
  }
  return Boolean(f)
}
function We(a, b) {
  a.La && Te(a.key);
  return a.handleEvent(b)
}
function Se(a, b) {
  if(a.sa) {
    return!0
  }
  var c = a.type, d = Ne;
  if(!(c in d)) {
    return!0
  }
  var d = d[c], e, f;
  if(!Fe) {
    var g;
    if(!(g = b)) {
      a: {
        g = ["window", "event"];
        for(var k = aa;e = g.shift();) {
          if(null != k[e]) {
            k = k[e]
          }else {
            g = null;
            break a
          }
        }
        g = k
      }
    }
    e = g;
    g = !0 in d;
    k = !1 in d;
    if(g) {
      if(0 > e.keyCode || void 0 != e.returnValue) {
        return!0
      }
      a: {
        var l = !1;
        if(0 == e.keyCode) {
          try {
            e.keyCode = -1;
            break a
          }catch(n) {
            l = !0
          }
        }
        if(l || void 0 == e.returnValue) {
          e.returnValue = !0
        }
      }
    }
    l = new Je;
    l.Ta(e, this);
    e = !0;
    try {
      if(g) {
        for(var m = [], q = l.currentTarget;q;q = q.parentNode) {
          m.push(q)
        }
        f = d[!0];
        f.ia = f.ga;
        for(var v = m.length - 1;!l.tb && 0 <= v && f.ia;v--) {
          l.currentTarget = m[v], e &= Ve(f, m[v], c, !0, l)
        }
        if(k) {
          for(f = d[!1], f.ia = f.ga, v = 0;!l.tb && v < m.length && f.ia;v++) {
            l.currentTarget = m[v], e &= Ve(f, m[v], c, !1, l)
          }
        }
      }else {
        e = We(a, l)
      }
    }finally {
      m && (m.length = 0)
    }
    return e
  }
  c = new Je(b, this);
  return e = We(a, c)
}
;var Xe, Ye, Ze;
function $e(a, b) {
  if(a ? a.rb : a) {
    return a.rb(0, b)
  }
  var c;
  c = $e[s(null == a ? null : a)];
  if(!c && (c = $e._, !c)) {
    throw x("ReadPort.take!", a);
  }
  return c.call(null, a, b)
}
function af(a, b, c) {
  if(a ? a.Qa : a) {
    return a.Qa(0, b, c)
  }
  var d;
  d = af[s(null == a ? null : a)];
  if(!d && (d = af._, !d)) {
    throw x("WritePort.put!", a);
  }
  return d.call(null, a, b, c)
}
function bf(a) {
  if(a ? a.Pa : a) {
    return a.Pa()
  }
  var b;
  b = bf[s(null == a ? null : a)];
  if(!b && (b = bf._, !b)) {
    throw x("Channel.close!", a);
  }
  return b.call(null, a)
}
function cf(a) {
  if(a ? a.ba : a) {
    return a.ba(a)
  }
  var b;
  b = cf[s(null == a ? null : a)];
  if(!b && (b = cf._, !b)) {
    throw x("Handler.active?", a);
  }
  return b.call(null, a)
}
function df(a) {
  if(a ? a.T : a) {
    return a.T(a)
  }
  var b;
  b = df[s(null == a ? null : a)];
  if(!b && (b = df._, !b)) {
    throw x("Handler.commit", a);
  }
  return b.call(null, a)
}
function ef(a) {
  if(a ? a.qb : a) {
    return a.qb()
  }
  var b;
  b = ef[s(null == a ? null : a)];
  if(!b && (b = ef._, !b)) {
    throw x("Buffer.full?", a);
  }
  return b.call(null, a)
}
;var ff, hf = function gf(b) {
  "undefined" === typeof ff && (ff = function(b, d, e) {
    this.Ga = b;
    this.sb = d;
    this.$b = e;
    this.o = 0;
    this.e = 393216
  }, ff.wa = !0, ff.va = "cljs.core.async.impl.ioc-helpers/t57267", ff.Fa = function(b, d) {
    return C(d, "cljs.core.async.impl.ioc-helpers/t57267")
  }, ff.prototype.ba = p(!0), ff.prototype.T = h("Ga"), ff.prototype.v = h("$b"), ff.prototype.w = function(b, d) {
    return new ff(this.Ga, this.sb, d)
  });
  return new ff(b, gf, null)
};
function jf(a) {
  try {
    return a[0].call(null, a)
  }catch(b) {
    if(b instanceof Object) {
      throw a[6].Pa(), b;
    }
    if(w) {
      throw b;
    }
    return null
  }
}
function kf(a, b, c) {
  c = c.rb(0, hf(function(c) {
    a[2] = c;
    a[1] = b;
    return jf(a)
  }));
  return t(c) ? (a[2] = Ea(c), a[1] = b, $) : null
}
function lf(a, b, c, d) {
  c = c.Qa(0, d, hf(function() {
    a[2] = null;
    a[1] = b;
    return jf(a)
  }));
  return t(c) ? (a[2] = Ea(c), a[1] = b, $) : null
}
var nf = function() {
  function a(a, d, e, f) {
    var g = null;
    3 < arguments.length && (g = M(Array.prototype.slice.call(arguments, 3), 0));
    return b.call(this, a, d, e, g)
  }
  function b(a, b, e, f) {
    f = Kb(f) ? pc.a(yd, f) : f;
    a[1] = b;
    b = mf(function(b) {
      a[2] = b;
      return jf(a)
    }, e, f);
    return t(b) ? (a[2] = Ea(b), $) : null
  }
  a.n = 3;
  a.j = function(a) {
    var d = I(a);
    a = L(a);
    var e = I(a);
    a = L(a);
    var f = I(a);
    a = J(a);
    return b(d, e, f, a)
  };
  a.g = b;
  return a
}();
function of(a, b) {
  var c = a[6];
  null != b && c.Qa(0, b, hf(p(null)));
  c.Pa();
  return c
}
function pf(a) {
  for(;;) {
    var b = a[4], c = Od.b(b), d = Rd.b(b), e = a[5];
    if(t(function() {
      var a = e;
      return t(a) ? ja(b) : a
    }())) {
      throw e;
    }
    if(t(function() {
      var a = e;
      return t(a) ? (a = c, t(a) ? e instanceof d : a) : a
    }())) {
      a[1] = c;
      a[2] = e;
      a[5] = null;
      a[4] = zb.g(b, Od, null, M([Rd, null], 0));
      break
    }
    if(t(function() {
      var a = e;
      return t(a) ? ja(c) && ja(Nd.b(b)) : a
    }())) {
      a[4] = Td.b(b)
    }else {
      if(t(function() {
        var a = e;
        return t(a) ? (a = ja(c)) ? Nd.b(b) : a : a
      }())) {
        a[1] = Nd.b(b);
        a[4] = zb.d(b, Nd, null);
        break
      }
      if(t(function() {
        var a = ja(e);
        return a ? Nd.b(b) : a
      }())) {
        a[1] = Nd.b(b);
        a[4] = zb.d(b, Nd, null);
        break
      }
      if(ja(e) && ja(Nd.b(b))) {
        a[1] = Sd.b(b);
        a[4] = Td.b(b);
        break
      }
      if(w) {
        throw Error([y("Assert failed: "), y("No matching clause"), y("\n"), y(Dd.g(M([!1], 0)))].join(""));
      }
      break
    }
  }
}
;function qf(a, b, c, d, e) {
  for(var f = 0;;) {
    if(f < e) {
      c[d + f] = a[b + f], f += 1
    }else {
      break
    }
  }
}
function rf(a, b, c, d) {
  this.head = a;
  this.q = b;
  this.length = c;
  this.c = d
}
rf.prototype.pop = function() {
  if(0 === this.length) {
    return null
  }
  var a = this.c[this.q];
  this.c[this.q] = null;
  this.q = (this.q + 1) % this.c.length;
  this.length -= 1;
  return a
};
rf.prototype.unshift = function(a) {
  this.c[this.head] = a;
  this.head = (this.head + 1) % this.c.length;
  this.length += 1;
  return null
};
function sf(a, b) {
  if(a.length + 1 === a.c.length) {
    var c = Array(2 * a.c.length);
    a.q < a.head ? (qf(a.c, a.q, c, 0, a.length), a.q = 0, a.head = a.length, a.c = c) : a.q > a.head ? (qf(a.c, a.q, c, 0, a.c.length - a.q), qf(a.c, 0, c, a.c.length - a.q, a.head), a.q = 0, a.head = a.length, a.c = c) : a.q === a.head && (a.q = 0, a.head = 0, a.c = c)
  }
  a.unshift(b)
}
function tf(a, b) {
  for(var c = a.length, d = 0;;) {
    if(d < c) {
      var e = a.pop();
      (b.b ? b.b(e) : b.call(null, e)) && a.unshift(e);
      d += 1
    }else {
      break
    }
  }
}
function uf(a) {
  if(!(0 < a)) {
    throw Error([y("Assert failed: "), y("Can't create a ring buffer of size 0"), y("\n"), y(Dd.g(M([Zb(new D(null, "\x3e", "\x3e", -1640531465, null), new D(null, "n", "n", -1640531417, null), 0)], 0)))].join(""));
  }
  return new rf(0, 0, 0, Array(a))
}
function vf(a, b) {
  this.L = a;
  this.ac = b;
  this.o = 0;
  this.e = 2
}
vf.prototype.H = function() {
  return this.L.length
};
vf.prototype.qb = function() {
  return this.L.length === this.ac
};
vf.prototype.Ub = function() {
  return this.L.pop()
};
function wf(a, b) {
  if(!ja(ef(a))) {
    throw Error([y("Assert failed: "), y("Can't add to a full buffer"), y("\n"), y(Dd.g(M([Zb(new D(null, "not", "not", -1640422260, null), Zb(new D("impl", "full?", "impl/full?", -1337857039, null), new D(null, "this", "this", -1636972457, null)))], 0)))].join(""));
  }
  a.L.unshift(b)
}
;var xf = null, yf = uf(32), zf = !1, Af = !1;
function Bf() {
  zf = !0;
  Af = !1;
  for(var a = 0;;) {
    var b = yf.pop();
    if(null != b && (b.h ? b.h() : b.call(null), 1024 > a)) {
      a += 1;
      continue
    }
    break
  }
  zf = !1;
  return 0 < yf.length ? Cf.h ? Cf.h() : Cf.call(null) : null
}
"undefined" !== typeof MessageChannel && (xf = new MessageChannel, xf.port1.onmessage = function() {
  return Bf()
});
function Cf() {
  var a = Af;
  if(t(a ? zf : a)) {
    return null
  }
  Af = !0;
  return"undefined" !== typeof MessageChannel ? xf.port2.postMessage(0) : "undefined" !== typeof setImmediate ? setImmediate(Bf) : w ? setTimeout(Bf, 0) : null
}
function Df(a) {
  sf(yf, a);
  Cf()
}
;var Ef, Gf = function Ff(b) {
  "undefined" === typeof Ef && (Ef = function(b, d, e) {
    this.C = b;
    this.Lb = d;
    this.Zb = e;
    this.o = 0;
    this.e = 425984
  }, Ef.wa = !0, Ef.va = "cljs.core.async.impl.channels/t57256", Ef.Fa = function(b, d) {
    return C(d, "cljs.core.async.impl.channels/t57256")
  }, Ef.prototype.$a = h("C"), Ef.prototype.v = h("Zb"), Ef.prototype.w = function(b, d) {
    return new Ef(this.C, this.Lb, d)
  });
  return new Ef(b, Ff, null)
};
function Hf(a, b) {
  this.Ia = a;
  this.C = b
}
function If(a) {
  return cf(a.Ia)
}
function Jf(a, b, c, d, e, f) {
  this.Ka = a;
  this.Sa = b;
  this.Va = c;
  this.Ra = d;
  this.L = e;
  this.closed = f
}
Jf.prototype.Pa = function() {
  if(!this.closed) {
    for(this.closed = !0;;) {
      var a = this.Ka.pop();
      if(null != a) {
        if(a.ba(null)) {
          var b = a.T(null);
          Df(function(a) {
            return function() {
              return a.b ? a.b(null) : a.call(null, null)
            }
          }(b, a))
        }
      }else {
        break
      }
    }
  }
  return null
};
Jf.prototype.rb = function(a, b) {
  if(b.ba(null)) {
    if(null != this.L && 0 < R(this.L)) {
      return b.T(null), Gf(this.L.Ub())
    }
    for(;;) {
      var c = this.Va.pop();
      if(null != c) {
        var d = c.Ia, c = c.C;
        if(d.ba(null)) {
          return d = d.T(null), b.T(null), Df(d), Gf(c)
        }
      }else {
        if(this.closed) {
          return b.T(null), Gf(null)
        }
        64 < this.Sa ? (this.Sa = 0, tf(this.Ka, cf)) : this.Sa += 1;
        if(!(1024 > this.Ka.length)) {
          throw Error([y("Assert failed: "), y([y("No more than "), y(1024), y(" pending takes are allowed on a single channel.")].join("")), y("\n"), y(Dd.g(M([Zb(new D(null, "\x3c", "\x3c", -1640531467, null), Zb(new D(null, ".-length", ".-length", 1395928862, null), new D(null, "takes", "takes", -1530407291, null)), new D("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", -1989946393, null))], 0)))].join(""));
        }
        sf(this.Ka, b);
        return null
      }
    }
  }else {
    return null
  }
};
Jf.prototype.Qa = function(a, b, c) {
  if(null == b) {
    throw Error([y("Assert failed: "), y("Can't put nil in on a channel"), y("\n"), y(Dd.g(M([Zb(new D(null, "not", "not", -1640422260, null), Zb(new D(null, "nil?", "nil?", -1637150201, null), new D(null, "val", "val", -1640415014, null)))], 0)))].join(""));
  }
  if(this.closed || !c.ba(null)) {
    return Gf(null)
  }
  for(;;) {
    if(a = this.Ka.pop(), null != a) {
      if(a.ba(null)) {
        var d = a.T(null);
        c = c.T(null);
        Df(function(a) {
          return function() {
            return a.b ? a.b(b) : a.call(null, b)
          }
        }(d, c, a));
        return Gf(null)
      }
    }else {
      if(null == this.L || this.L.qb()) {
        64 < this.Ra ? (this.Ra = 0, tf(this.Va, If)) : this.Ra += 1;
        if(!(1024 > this.Va.length)) {
          throw Error([y("Assert failed: "), y([y("No more than "), y(1024), y(" pending puts are allowed on a single channel."), y(" Consider using a windowed buffer.")].join("")), y("\n"), y(Dd.g(M([Zb(new D(null, "\x3c", "\x3c", -1640531467, null), Zb(new D(null, ".-length", ".-length", 1395928862, null), new D(null, "puts", "puts", -1637078787, null)), new D("impl", "MAX-QUEUE-SIZE", "impl/MAX-QUEUE-SIZE", -1989946393, null))], 0)))].join(""));
        }
        sf(this.Va, new Hf(c, b));
        return null
      }
      c = c.T(null);
      wf(this.L, b);
      return Gf(null)
    }
  }
};
function Kf(a) {
  return new Jf(uf(32), 0, uf(32), 0, a, null)
}
;var Lf = function() {
  function a(a) {
    for(;;) {
      if(0.5 > Math.random() && 15 > a) {
        a += 1
      }else {
        return a
      }
    }
  }
  function b() {
    return c.b(0)
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.h = b;
  c.b = a;
  return c
}();
function Mf(a, b, c) {
  this.key = a;
  this.C = b;
  this.forward = c;
  this.o = 0;
  this.e = 2155872256
}
Mf.prototype.t = function(a, b, c) {
  return Y(b, Z, "[", " ", "]", c, this)
};
Mf.prototype.F = function() {
  return sa(sa(K, this.C), this.key)
};
var Nf = function() {
  function a(a, b, c) {
    c = Array(c + 1);
    for(var g = 0;;) {
      if(g < c.length) {
        c[g] = null, g += 1
      }else {
        break
      }
    }
    return new Mf(a, b, c)
  }
  function b(a) {
    return c.d(null, null, a)
  }
  var c = null, c = function(c, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, c);
      case 3:
        return a.call(this, c, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.b = b;
  c.d = a;
  return c
}(), Of = function() {
  function a(a, b, c, g) {
    for(;;) {
      if(0 > c) {
        return a
      }
      a: {
        for(;;) {
          var k = a.forward[c];
          if(t(k)) {
            if(k.key < b) {
              a = k
            }else {
              break a
            }
          }else {
            break a
          }
        }
        a = void 0
      }
      null != g && (g[c] = a);
      c -= 1
    }
  }
  function b(a, b, f) {
    return c.k(a, b, f, null)
  }
  var c = null, c = function(c, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, c, e, f);
      case 4:
        return a.call(this, c, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.d = b;
  c.k = a;
  return c
}();
function Pf(a, b) {
  this.ma = a;
  this.V = b;
  this.o = 0;
  this.e = 2155872256
}
Pf.prototype.t = function(a, b, c) {
  return Y(b, function(a) {
    return Y(b, Z, "", " ", "", c, a)
  }, "{", ", ", "}", c, this)
};
Pf.prototype.F = function() {
  var a = function c(a) {
    return new U(null, function() {
      return null == a ? null : N(W([a.key, a.C], !0), c(a.forward[0]))
    }, null, null)
  };
  return a.b ? a.b(this.ma.forward[0]) : a.call(null, this.ma.forward[0])
};
Pf.prototype.put = function(a, b) {
  var c = Array(15), d = Of.k(this.ma, a, this.V, c).forward[0];
  if(null != d && d.key === a) {
    return d.C = b
  }
  d = Lf.h();
  if(d > this.V) {
    for(var e = this.V + 1;;) {
      if(e <= d + 1) {
        c[e] = this.ma, e += 1
      }else {
        break
      }
    }
    this.V = d
  }
  for(d = Nf.d(a, b, Array(d));;) {
    return 0 <= this.V ? (c = c[0].forward, d.forward[0] = c[0], c[0] = d) : null
  }
};
Pf.prototype.remove = function(a) {
  var b = Array(15), c = Of.k(this.ma, a, this.V, b).forward[0];
  if(null != c && c.key === a) {
    for(a = 0;;) {
      if(a <= this.V) {
        var d = b[a].forward;
        d[a] === c && (d[a] = c.forward[a]);
        a += 1
      }else {
        break
      }
    }
    for(;;) {
      if(0 < this.V && null == this.ma.forward[this.V]) {
        this.V -= 1
      }else {
        return null
      }
    }
  }else {
    return null
  }
};
function Qf(a) {
  for(var b = Rf, c = b.ma, d = b.V;;) {
    if(0 > d) {
      return c === b.ma ? null : c
    }
    var e;
    a: {
      for(e = c;;) {
        e = e.forward[d];
        if(null == e) {
          e = null;
          break a
        }
        if(e.key >= a) {
          break a
        }
      }
      e = void 0
    }
    null != e ? (d -= 1, c = e) : d -= 1
  }
}
var Rf = new Pf(Nf.b(0), 0);
function Sf() {
  var a = (new Date).valueOf() + 1E3, b = Qf(a), b = t(t(b) ? b.key < a + 10 : b) ? b.C : null;
  if(t(b)) {
    return b
  }
  var c = Kf(null);
  Rf.put(a, c);
  setTimeout(function() {
    Rf.remove(a);
    return bf(c)
  }, 1E3);
  return c
}
;var Uf = function Tf(b) {
  "undefined" === typeof Xe && (Xe = function(b, d, e) {
    this.Ga = b;
    this.sb = d;
    this.Wb = e;
    this.o = 0;
    this.e = 393216
  }, Xe.wa = !0, Xe.va = "cljs.core.async/t54705", Xe.Fa = function(b, d) {
    return C(d, "cljs.core.async/t54705")
  }, Xe.prototype.ba = p(!0), Xe.prototype.T = h("Ga"), Xe.prototype.v = h("Wb"), Xe.prototype.w = function(b, d) {
    return new Xe(this.Ga, this.sb, d)
  });
  return new Xe(b, Tf, null)
}, Vf = function() {
  function a(a) {
    a = nb.a(a, 0) ? null : a;
    return Kf("number" === typeof a ? new vf(uf(a), a) : a)
  }
  function b() {
    return c.b(null)
  }
  var c = null, c = function(c) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a.call(this, c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  c.h = b;
  c.b = a;
  return c
}();
function Wf() {
  return null
}
var Xf = function() {
  function a(a, b, c, d) {
    a = af(a, b, Uf(c));
    t(t(a) ? qc.a(c, Wf) : a) && (t(d) ? c.h ? c.h() : c.call(null) : Df(c));
    return null
  }
  function b(a, b, c) {
    return d.k(a, b, c, !0)
  }
  function c(a, b) {
    return d.d(a, b, Wf)
  }
  var d = null, d = function(d, f, g, k) {
    switch(arguments.length) {
      case 2:
        return c.call(this, d, f);
      case 3:
        return b.call(this, d, f, g);
      case 4:
        return a.call(this, d, f, g, k)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  d.a = c;
  d.d = b;
  d.k = a;
  return d
}();
function Yf(a) {
  for(var b = Array(a), c = 0;;) {
    if(c < a) {
      b[c] = 0, c += 1
    }else {
      break
    }
  }
  for(c = 1;;) {
    if(nb.a(c, a)) {
      return b
    }
    var d = Rb(c);
    b[c] = b[d];
    b[d] = c;
    c += 1
  }
}
var $f = function Zf() {
  var b = Gd.b(!0);
  "undefined" === typeof Ye && (Ye = function(b, d, e) {
    this.oa = b;
    this.Jb = d;
    this.Xb = e;
    this.o = 0;
    this.e = 393216
  }, Ye.wa = !0, Ye.va = "cljs.core.async/t54718", Ye.Fa = function(b, d) {
    return C(d, "cljs.core.async/t54718")
  }, Ye.prototype.ba = function() {
    return Ea(this.oa)
  }, Ye.prototype.T = function() {
    var b = this.oa, d = b.fc;
    if(t(d) && !t(d.b ? d.b(null) : d.call(null, null))) {
      throw Error([y("Assert failed: "), y("Validator rejected reference state"), y("\n"), y(Dd.g(M([Zb(new D(null, "validate", "validate", 1233162959, null), new D(null, "new-value", "new-value", 972165309, null))], 0)))].join(""));
    }
    d = b.state;
    b.state = null;
    Va(b, d, null);
    return!0
  }, Ye.prototype.v = h("Xb"), Ye.prototype.w = function(b, d) {
    return new Ye(this.oa, this.Jb, d)
  });
  return new Ye(b, Zf, null)
}, bg = function ag(b, c) {
  "undefined" === typeof Ze && (Ze = function(b, c, f, g) {
    this.ub = b;
    this.oa = c;
    this.Kb = f;
    this.Yb = g;
    this.o = 0;
    this.e = 393216
  }, Ze.wa = !0, Ze.va = "cljs.core.async/t54724", Ze.Fa = function(b, c) {
    return C(c, "cljs.core.async/t54724")
  }, Ze.prototype.ba = function() {
    return cf(this.oa)
  }, Ze.prototype.T = function() {
    df(this.oa);
    return this.ub
  }, Ze.prototype.v = h("Yb"), Ze.prototype.w = function(b, c) {
    return new Ze(this.ub, this.oa, this.Kb, c)
  });
  return new Ze(c, b, ag, null)
};
function mf(a, b, c) {
  var d = $f(), e = R(b), f = Yf(e), g = Wd.b(c), k = function() {
    for(var c = 0;;) {
      if(c < e) {
        var k = t(g) ? c : f[c], m = S.a(b, k), q = Gb(m) ? m.b ? m.b(0) : m.call(null, 0) : null, v = t(q) ? function() {
          var b = m.b ? m.b(1) : m.call(null, 1);
          return af(q, b, bg(d, function(b, c, d, e, g) {
            return function() {
              return a.b ? a.b(W([null, g], !0)) : a.call(null, W([null, g], !0))
            }
          }(c, b, k, m, q, d, e, f, g)))
        }() : $e(m, bg(d, function(b, c, d) {
          return function(b) {
            return a.b ? a.b(W([b, d], !0)) : a.call(null, W([b, d], !0))
          }
        }(c, k, m, q, d, e, f, g)));
        if(t(v)) {
          return Gf(W([Ea(v), function() {
            var a = q;
            return t(a) ? a : m
          }()], !0))
        }
        c += 1
      }else {
        return null
      }
    }
  }();
  return t(k) ? k : xb.d(c, Md, Jb) !== Jb && (k = function() {
    var a = cf(d);
    return t(a) ? df(d) : a
  }(), t(k)) ? Gf(W([Md.b(c), Md], !0)) : null
}
;function cg(a, b, c) {
  var d = a.width / a.offsetWidth, e = a.height / a.offsetHeight;
  return Qe(a, b, function(a) {
    return Xf.a(c, gb([Ud, b, Qd, d * a.offsetX, Pd, e * a.offsetY]))
  })
}
function dg() {
  var a = Vf.h(), b = ue("swipe-canvas"), b = W([cg(b, "mousedown", a), cg(b, "mousemove", a), cg(b, "mouseup", a), cg(b, "mouseout", a)], !0);
  return W([b, a], !0)
}
function eg(a) {
  var b = Vf.h(), c = Vf.h(), d = Vf.b(1);
  Df(function() {
    var e = function() {
      return function(a) {
        return function() {
          function b(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var b = a(c);
                    if(!bc(b, $)) {
                      return b
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return c[5] = d, pf(c), $
                  }
                  if(w) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!bc(d, $)) {
                return d
              }
            }
          }
          function c() {
            var a = Array(13);
            a[0] = d;
            a[1] = 1;
            return a
          }
          var d = null, d = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return b.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          d.h = c;
          d.b = b;
          return d
        }()
      }(function(d) {
        var e = d[1];
        if(1 === e) {
          return d[2] = null, d[1] = 2, $
        }
        if(2 === e) {
          return d[1] = 4, $
        }
        if(3 === e) {
          return e = d[2], of(d, e)
        }
        if(4 === e) {
          return kf(d, 7, a)
        }
        if(5 === e) {
          return d[2] = null, d[1] = 6, $
        }
        if(6 === e) {
          return e = d[2], d[2] = e, d[1] = 3, $
        }
        if(7 === e) {
          var f = d[7], e = d[2], f = Ud.b(e), f = nb.a("mousedown", f);
          d[7] = e;
          d[1] = f ? 8 : 9;
          return $
        }
        if(8 === e) {
          return f = d[7], e = Xf.a(c, f), d[8] = e, kf(d, 11, a)
        }
        if(9 === e) {
          return d[2] = null, d[1] = 10, $
        }
        if(10 === e) {
          return d[9] = d[2], d[2] = null, d[1] = 2, $
        }
        if(11 === e) {
          var f = d[7], e = d[2], f = N(f, K), n;
          d[10] = e;
          d[11] = f;
          d[2] = null;
          d[1] = 12;
          return $
        }
        return 12 === e ? (e = d[10], f = Xf.a(c, e), e = Ud.b(e), e = nb.a(e, "mousemove"), d[12] = f, d[1] = e ? 14 : 15, $) : 13 === e ? (e = d[2], d[2] = e, d[1] = 10, $) : 14 === e ? kf(d, 17, a) : 15 === e ? (n = d[11], e = Yb(n), e = Xf.a(b, e), d[2] = e, d[1] = 16, $) : 16 === e ? (e = d[2], d[2] = e, d[1] = 13, $) : 17 === e ? (e = d[10], n = d[11], f = d[2], e = N(e, n), d[10] = f, d[11] = e, d[2] = null, d[1] = 12, $) : null
      })
    }(), f = function() {
      var a = e.h ? e.h() : e.call(null);
      a[6] = d;
      return a
    }();
    return jf(f)
  });
  return W([c, b], !0)
}
;function fg(a) {
  var b = Vf.h(), c = Vf.b(1);
  Df(function() {
    var d = function() {
      return function(a) {
        return function() {
          function b(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var b = a(c);
                    if(!bc(b, $)) {
                      return b
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return c[5] = d, pf(c), $
                  }
                  if(w) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!bc(d, $)) {
                return d
              }
            }
          }
          function c() {
            var a = Array(9);
            a[0] = d;
            a[1] = 1;
            return a
          }
          var d = null, d = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return b.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          d.h = c;
          d.b = b;
          return d
        }()
      }(function(c) {
        var d = c[1];
        return 9 === d ? (d = c, d[2] = c[2], d[1] = 7, $) : 8 === d ? (d = c[2], c[7] = d, c[2] = null, c[1] = 3, $) : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, $) : 6 === d ? lf(c, 9, b, "ready") : 5 === d ? (d = c[7], d = ue("swipe-loading").innerHTML = d, c[8] = d, kf(c, 8, a)) : 4 === d ? (d = c[2], of(c, d)) : 3 === d ? (d = c[7], d = qc.a(d, "ready"), c[1] = d ? 5 : 6, $) : 2 === d ? (d = c[2], c[7] = d, c[2] = null, c[1] = 3, $) : 1 === d ? kf(c, 2, a) : null
      })
    }(), e = function() {
      var a = d.h ? d.h() : d.call(null);
      a[6] = c;
      return a
    }();
    return jf(e)
  });
  return b
}
function gg() {
  var a = Vf.h(), b = dg(), c = S.d(b, 0, null), b = S.d(b, 1, null), b = eg(b), d = S.d(b, 0, null), e = S.d(b, 1, null), f = Vf.b(1);
  Df(function() {
    var b = function() {
      return function(a) {
        return function() {
          function b(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var b = a(c);
                    if(!bc(b, $)) {
                      return b
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return c[5] = d, pf(c), $
                  }
                  if(w) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!bc(d, $)) {
                return d
              }
            }
          }
          function c() {
            var a = Array(11);
            a[0] = d;
            a[1] = 1;
            return a
          }
          var d = null, d = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return b.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          d.h = c;
          d.b = b;
          return d
        }()
      }(function(b) {
        var f = b[1];
        if(1 === f) {
          var g;
          b[7] = null;
          b[2] = null;
          b[1] = 2;
          return $
        }
        if(2 === f) {
          return f = [d, e], f = W.a ? W.a(f, !0) : W.call(null, f, !0), nf(b, 4, f)
        }
        if(3 === f) {
          return f = b[2], of(b, f)
        }
        if(4 === f) {
          var k = b[2], f = S.d(k, 0, null), k = S.d(k, 1, null), k = nb.a(k, d);
          b[8] = f;
          b[1] = k ? 5 : 6;
          return $
        }
        if(5 === f) {
          return g = b[7], b[1] = t(g) ? 8 : 9, $
        }
        if(6 === f) {
          return f = b[8], f = vc.a(ze, f), f = Yb(Ob.d(xe, Qc, f)), f = Bc(f), f = Kd(f), lf(b, 11, a, f)
        }
        if(7 === f) {
          return f = b[2], b[2] = f, b[1] = 3, $
        }
        if(8 === f) {
          g = b[7];
          var f = b[8], k = Qd.b(f), f = Pd.b(f), v = Qd.b(g);
          g = Pd.b(g);
          f = Ce(k, f, v, g);
          b[2] = f;
          b[1] = 10;
          return $
        }
        if(9 === f) {
          return f = b[8], k = Qd.b(f), g = Pd.b(f), v = Qd.b(f), f = Pd.b(f), f = Ce(k, g, v, f), b[2] = f, b[1] = 10, $
        }
        if(10 === f) {
          return f = b[8], k = b[2], b[7] = f, b[9] = k, b[2] = null, b[1] = 2, $
        }
        if(11 === f) {
          f = b[2];
          a: {
            k = G(c);
            g = null;
            for(var E = 0, H = 0;;) {
              if(H < E) {
                v = g.J(null, H), Te(v), H += 1
              }else {
                if(k = G(k)) {
                  g = k, Hb(g) ? (k = bb(g), E = cb(g), g = k, v = R(k), k = E, E = v) : (v = I(g), Te(v), k = L(g), g = null, E = 0), H = 0
                }else {
                  k = null;
                  break a
                }
              }
            }
            k = void 0
          }
          b[10] = f;
          b[2] = k;
          b[1] = 7;
          return $
        }
        return null
      })
    }(), k = function() {
      var a = b.h ? b.h() : b.call(null);
      a[6] = f;
      return a
    }();
    return jf(k)
  });
  return a
}
;var hg = function(a) {
  var b = new Worker(a), c = Vf.h(), d = Vf.h();
  b.addEventListener("message", function(a) {
    var b = Vf.b(1);
    Df(function() {
      var d = function() {
        return function(a) {
          return function() {
            function b(c) {
              for(;;) {
                var d = function() {
                  try {
                    for(;;) {
                      var b = a(c);
                      if(!bc(b, $)) {
                        return b
                      }
                    }
                  }catch(d) {
                    if(d instanceof Object) {
                      return c[5] = d, pf(c), $
                    }
                    if(w) {
                      throw d;
                    }
                    return null
                  }
                }();
                if(!bc(d, $)) {
                  return d
                }
              }
            }
            function c() {
              var a = Array(7);
              a[0] = d;
              a[1] = 1;
              return a
            }
            var d = null, d = function(a) {
              switch(arguments.length) {
                case 0:
                  return c.call(this);
                case 1:
                  return b.call(this, a)
              }
              throw Error("Invalid arity: " + arguments.length);
            };
            d.h = c;
            d.b = b;
            return d
          }()
        }(function(b) {
          var d = b[1];
          return 2 === d ? of(b, b[2]) : 1 === d ? (d = a.data, lf(b, 2, c, d)) : null
        })
      }(), e = function() {
        var a = d.h ? d.h() : d.call(null);
        a[6] = b;
        return a
      }();
      return jf(e)
    });
    return b
  });
  var e = Vf.b(1);
  Df(function() {
    var a = function() {
      return function(a) {
        return function() {
          function b(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var b = a(c);
                    if(!bc(b, $)) {
                      return b
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return c[5] = d, pf(c), $
                  }
                  if(w) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!bc(d, $)) {
                return d
              }
            }
          }
          function c() {
            var a = Array(8);
            a[0] = d;
            a[1] = 1;
            return a
          }
          var d = null, d = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return b.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          d.h = c;
          d.b = b;
          return d
        }()
      }(function(a) {
        var c = a[1];
        return 7 === c ? (c = b.postMessage(a[2]), a[7] = c, a[2] = null, a[1] = 2, $) : 6 === c ? (c = a[2], a[2] = c, a[1] = 3, $) : 5 === c ? (a[2] = null, a[1] = 6, $) : 4 === c ? kf(a, 7, d) : 3 === c ? (c = a[2], of(a, c)) : 2 === c ? (a[1] = 4, $) : 1 === c ? (a[2] = null, a[1] = 2, $) : null
      })
    }(), c = function() {
      var b = a.h ? a.h() : a.call(null);
      b[6] = e;
      return b
    }();
    return jf(c)
  });
  return W([d, c], !0)
}("swipe-worker.js"), ig = S.d(hg, 0, null), jg = S.d(hg, 1, null);
(function(a, b) {
  var c = Vf.b(1);
  Df(function() {
    var d = function() {
      return function(a) {
        return function() {
          function b(c) {
            for(;;) {
              var d = function() {
                try {
                  for(;;) {
                    var b = a(c);
                    if(!bc(b, $)) {
                      return b
                    }
                  }
                }catch(d) {
                  if(d instanceof Object) {
                    return c[5] = d, pf(c), $
                  }
                  if(w) {
                    throw d;
                  }
                  return null
                }
              }();
              if(!bc(d, $)) {
                return d
              }
            }
          }
          function c() {
            var a = Array(16);
            a[0] = d;
            a[1] = 1;
            return a
          }
          var d = null, d = function(a) {
            switch(arguments.length) {
              case 0:
                return c.call(this);
              case 1:
                return b.call(this, a)
            }
            throw Error("Invalid arity: " + arguments.length);
          };
          d.h = c;
          d.b = b;
          return d
        }()
      }(function(c) {
        var d = c[1];
        if(1 === d) {
          var d = Ee(), e = De(), l = fg(b);
          c[7] = d;
          c[8] = e;
          return kf(c, 2, l)
        }
        return 2 === d ? (d = c[2], e = (e = ue("swipe-loading")) && e.parentNode ? e.parentNode.removeChild(e) : null, c[9] = e, c[10] = d, c[2] = null, c[1] = 3, $) : 3 === d ? (c[1] = 5, $) : 4 === d ? (d = c[2], of(c, d)) : 5 === d ? (d = Ee(), e = De(), l = gg(), c[11] = d, c[12] = e, kf(c, 8, l)) : 6 === d ? (c[2] = null, c[1] = 7, $) : 7 === d ? (d = c[2], c[2] = d, c[1] = 4, $) : 8 === d ? (d = c[2], lf(c, 9, a, d)) : 9 === d ? (c[13] = c[2], kf(c, 10, b)) : 10 === d ? (d = G(c[2]), d = ue("swipe-results").innerHTML =
        Ae(d), e = Sf(), c[14] = d, kf(c, 11, e)) : 11 === d ? (c[15] = c[2], c[2] = null, c[1] = 3, $) : null
      })
    }(), e = function() {
      var a = d.h ? d.h() : d.call(null);
      a[6] = c;
      return a
    }();
    return jf(e)
  });
  return c
})(ig, jg);

})();
