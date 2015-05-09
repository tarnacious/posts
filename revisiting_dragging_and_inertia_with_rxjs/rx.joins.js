// Copyright (c) Microsoft Corporation.  All rights reserved.
// This code is licensed by Microsoft Corporation under the terms
// of the MICROSOFT REACTIVE EXTENSIONS FOR JAVASCRIPT AND .NET LIBRARIES License.
// See http://go.microsoft.com/fwlink/?LinkId=186234.

(function(){var a=this;var b;if(typeof ProvideCustomRxRootObject =="undefined")b=a.Rx; else b=ProvideCustomRxRootObject();var c;var d=b.Observable;var e=function(u,v){return u===v;};var f=[1,3,7,13,31,61,127,251,509,1021,2039,4093,8191,16381,32749,65521,131071,262139,524287,1048573,2097143,4194301,8388593,16777213,33554393,67108859,134217689,268435399,536870909,1073741789,2147483647];var g=3;var h="no such key";var i="duplicate key";var j=function(u,v){return v>0&&u/v<2;};var k=function(u){for(var v=0;v<f.length;v++){var w=f[v];if(!j(w,u))return w;}throw "map is too large";};var l=function(u,v){if(u===c)u=e;this.a=u;this.b=0;var w;if(v===c||v==0)w=c; else if(v<g)w=new Array(v); else w=new Array(k(v));this.c=w;};l.prototype={d:function(){return this.b;},e:function(u,v){var w=this.c;if(w===c)throw h; else if(this.b<g){for(var D=0;D<this.b;D++){var y=w[D];if(this.a(y.f,u)){y.g=v;return;}}throw h;}else{var z=w.length;var A=n(u);var B=1+A%(z-1);var C=A%z;for(var D=0;D<z;D++){var E=w[C];if(E===c)throw h; else{if(this.a(E.f,u)){E.g=v;return;}}C=(C+B)%z;}throw h;}},h:function(u,v){var w=this.c;if(w===c){this.c=w=new Array(1);w[0]={f:u,g:v};}else{var x=this.b;if(x+1<g){for(var E=0;E<x;E++){if(this.a(w[E].f,u))throw i;}if(x<w.length)w[x]={f:u,g:v}; else{var D=new Array(w.length*2);for(var E=0;E<x;E++) D[E]=w[E];D[x]={f:u,g:v};this.c=w=D;}}else if(x<g){var D=new Array(k(x+1));for(var E=0;E<x;E++) o(D,w[E].f,w[E].g);o(D,u,v);this.c=w=D;}else if(j(w.length,x+1)){var D=new Array(k(x+1));for(var E=0;E<w.length;E++){var F=w[E];if(F!==c)o(D,F.f,F.g);}o(D,u,v);this.c=w=D;}else o(w,u,v);}this.b++;},i:function(u){var v=this.c;var w=this.b;var x=this.a;if(v!==c)if(w<g)for(var D=0;D<w;D++){if(x(v[D].f,u))return {Key:v[D].f,Value:v[D].g};} else{var z=v.length;var A=n(u);var B=1+A%(z-1);var C=A%z;for(var D=0;D<v.length;D++){if(v[C]==null)break; else{if(x(v[C].f,u))return {Key:v[C].f,Value:v[C].g};}C=(C+B)%z;}}return c;},j:function(u){var v=this.i(u);if(v===c)throw h;return v.Value;},k:function(u){var v=this.i(u);return v!==c;},l:function(){var u=[];for(var v=0;v<this.c.length;v++){var w=this.c[v];if(w!==c)u.push(w.g);}return u;},m:function(){var u=[];for(var v=0;v<this.c.length;v++){var w=this.c[v];if(w!==c)u.push(w.f);}return u;},n:function(){var u=[];for(var v=0;v<this.c.length;v++){var w=this.c[v];if(w!==c)u.push(new {Key:w.f,Value:w.g});}return u;}};var m=0;var n=function(u){if(u===c)throw h;if(u.getHashCode!==c)return u.getHashCode();var v=17*m++;u.getHashCode=function(){return v;};return v;};var o=function(u,v,w,x){var y=u.length;var z=n(v);var A=1+z%(y-1);var B=z%y;for(var C=0;C<u.length;C++){if(u[B]==null){u[B]={f:v,g:w};return;}else{if(x(u[B].f,v))throw i;}B=(B+A)%y;}throw "map full";};var p=function(u,v){this.o=[];for(var w=0;w<u.length;w++) this.o.push(u[w]);if(v!==undefined)this.o.push(v);};p.prototype={And:function(u){return new p(this.o,u);},Then:function(u){return {o:this.o,p:u};}};d.prototype.And=function(u){return new p([this],u);};d.prototype.Then=function(u){return {o:[this],p:u};};d.Join=function(){var u=arguments;return d.CreateWithDisposable(function(v){var w=new l();var x=new b.List();var y=new b.Observer(function(E){v.OnNext(E);},function(E){var F=w.l();for(var G=0;G<F.length;G++) F[G].Dispose();v.OnError(E);},function(){v.OnCompleted();});try{for(var C=0;C<u.length;C++) (function(E){var F=u[E];var G;G=q(F,w,y,function(H){x.Remove(G);if(x.GetCount()==0)y.OnCompleted();});x.Add(G);})(C);}catch(E){return d.Throw(E).Subscribe(v);}var A=new b.CompositeDisposable();var B=w.l();for(var C=0;C<B.length;C++){var D=B[C];D.Subscribe();A.Add(D);}return A;});};var q=function(u,v,w,x){var y=function(D){w.OnError(D);};var z=[];for(var C=0;C<u.o.length;C++) z.push(r(v,u.o[C],y));var B=new s(z,w,u.p,function(){for(var D=0;D<z.length;D++) z[D].RemoveActivePlan(B);x();});for(var C=0;C<z.length;C++) z[C].addActivePlan(B);return B;};var r=function(u,v,w){var x=u.i(v);if(x===c){var y=new t(v,w);u.h(v,y);return y;}return x.Value;};var s=function(u,v,w,x){this.Match=function(){var y=[];var z=true;var A=false;for(var D=0;D<u.length;D++){if(u[D].queue.length==0){A=true;continue;}var C=u[D].queue[0];z&=C.Kind=="N";if(z)y.push(C.Value);}if(!z)x(); else if(A)return; else{for(var D=0;D<u.length;D++) u[D].queue.shift();var E;try{E=w.apply(null,y);}catch(F){v.OnError(F);return;}v.OnNext(E);}};};var t=function(u,v){this.queue=[];var w=new b.MutableDisposable();var x=false;var y=new b.List();var z=false;this.addActivePlan=function(A){y.Add(A);};this.Subscribe=function(){x=true;w.Replace(u.Materialize().Subscribe(this));};this.OnNext=function(A){if(!z){if(A.Kind=="E"){v(A.Value);return;}this.queue.push(A);var B=y.ToArray();for(var C=0;C<B.length;C++) B[C].Match();}};this.OnError=function(A){};this.OnCompleted=function(){};this.RemoveActivePlan=function(A){y.Remove(A);if(y.GetCount()==0)this.Dispose();};this.Dispose=function(){if(!z){z=true;w.Dispose();}};};})();
