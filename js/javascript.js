! function(a, b) {
  "use strict";

  function d(a) {
      a = a || {};
      for (var b = 1; b < arguments.length; b++) {
          var c = arguments[b];
          if (c)
              for (var d in c) c.hasOwnProperty(d) && ("object" == typeof c[d] ? deepExtend(a[d], c[d]) : a[d] = c[d])
      }
      return a
  }

  function f(f, g) {
      function z() {
          if (h) {
              i = b.createElement("canvas"), i.className = "pg-canvas", i.style.display = "block", f.insertBefore(i, f.firstChild), j = i.getContext("2d"), A();
              for (var c = Math.round(q * r / g.density), d = 0; d < c; d++) {
                  var e = new F;
                  e.setStackPos(d), k.push(e)
              }
              a.addEventListener("resize", function() {
                  C()
              }, !1), b.addEventListener("mousemove", function(a) {
                  m = a.pageX, n = a.pageY
              }, !1), t && !s && a.addEventListener("deviceorientation", function() {
                  x = Math.min(Math.max(-event.beta, -30), 30), u = Math.min(Math.max(-event.gamma, -30), 30)
              }, !0), B(), I("onInit")
          }
      }

      function A() {
          q = f.offsetWidth, r = f.offsetHeight;
          var b = a.devicePixelRatio || 1,
              c = j.webkitBackingStorePixelRatio || j.mozBackingStorePixelRatio || j.msBackingStorePixelRatio || j.oBackingStorePixelRatio || j.backingStorePixelRatio || 1,
              d = b / c;
          i.width = q * d, i.height = r * d, i.style.width = q + "px", i.style.height = r + "px", j.scale(d, d), j.fillStyle = g.dotColor, j.strokeStyle = g.lineColor, j.lineWidth = g.lineWidth
      }

      function B() {
          if (h) {
              o = a.innerWidth, p = a.innerHeight, j.clearRect(0, 0, i.width, i.height);
              for (var b = 0; b < k.length; b++) k[b].updatePosition();
              for (b = 0; b < k.length; b++) k[b].draw();
              y || (l = requestAnimationFrame(B))
          }
      }

      function C() {
          A();
          for (var a = k.length - 1; a >= 0; a--)(k[a].position.x > q || k[a].position.y > r) && k.splice(a, 1);
          var b = Math.round(q * r / g.density);
          if (b > k.length)
              for (; b > k.length;) {
                  var c = new F;
                  k.push(c)
              } else b < k.length && k.splice(b);
          for (a = k.length - 1; a >= 0; a--) k[a].setStackPos(a)
      }

      function D() {
          y = !0
      }

      function E() {
          y = !1, B()
      }

      function F() {
          switch (this.stackPos = null, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
              x: Math.ceil(Math.random() * q),
              y: Math.ceil(Math.random() * r)
          }, this.speed = {}, g.directionX) {
              case "left":
                  this.speed.x = +(-g.maxSpeedX + Math.random() * g.maxSpeedX - g.minSpeedX).toFixed(2);
                  break;
              case "right":
                  this.speed.x = +(Math.random() * g.maxSpeedX + g.minSpeedX).toFixed(2);
                  break;
              default:
                  this.speed.x = +(-g.maxSpeedX / 2 + Math.random() * g.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? g.minSpeedX : -g.minSpeedX
          }
          switch (g.directionY) {
              case "up":
                  this.speed.y = +(-g.maxSpeedY + Math.random() * g.maxSpeedY - g.minSpeedY).toFixed(2);
                  break;
              case "down":
                  this.speed.y = +(Math.random() * g.maxSpeedY + g.minSpeedY).toFixed(2);
                  break;
              default:
                  this.speed.y = +(-g.maxSpeedY / 2 + Math.random() * g.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? g.minSpeedY : -g.minSpeedY
          }
      }

      function G(a, b) {
          return b ? void(g[a] = b) : g[a]
      }

      function H() {
          console.log("destroy"), i.parentNode.removeChild(i), I("onDestroy"), e && e(f).removeData("plugin_" + c)
      }

      function I(a) {
          void 0 !== g[a] && g[a].call(f)
      }
      var i, j, l, o, p, q, r, v, w, h = !!b.createElement("canvas").getContext,
          k = [],
          m = 0,
          n = 0,
          s = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
          t = !!a.DeviceOrientationEvent,
          u = 0,
          x = 0,
          y = !1;
      return g = d({}, a[c].defaults, g), F.prototype.draw = function() {
          j.beginPath(), j.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, g.particleRadius / 2, 0, 2 * Math.PI, !0), j.closePath(), j.fill(), j.beginPath();
          for (var a = k.length - 1; a > this.stackPos; a--) {
              var b = k[a],
                  c = this.position.x - b.position.x,
                  d = this.position.y - b.position.y,
                  e = Math.sqrt(c * c + d * d).toFixed(2);
              e < g.proximity && (j.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), g.curvedLines ? j.quadraticCurveTo(Math.max(b.position.x, b.position.x), Math.min(b.position.y, b.position.y), b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY) : j.lineTo(b.position.x + b.parallaxOffsetX, b.position.y + b.parallaxOffsetY))
          }
          j.stroke(), j.closePath()
      }, F.prototype.updatePosition = function() {
          if (g.parallax) {
              if (t && !s) {
                  var a = o / 60;
                  v = (u + 30) * a;
                  var b = p / 60;
                  w = (x + 30) * b
              } else v = m, w = n;
              this.parallaxTargX = (v - o / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (w - p / 2) / (g.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
          }
          switch (g.directionX) {
              case "left":
                  this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = q - this.parallaxOffsetX);
                  break;
              case "right":
                  this.position.x + this.speed.x + this.parallaxOffsetX > q && (this.position.x = 0 - this.parallaxOffsetX);
                  break;
              default:
                  (this.position.x + this.speed.x + this.parallaxOffsetX > q || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
          }
          switch (g.directionY) {
              case "up":
                  this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = r - this.parallaxOffsetY);
                  break;
              case "down":
                  this.position.y + this.speed.y + this.parallaxOffsetY > r && (this.position.y = 0 - this.parallaxOffsetY);
                  break;
              default:
                  (this.position.y + this.speed.y + this.parallaxOffsetY > r || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
          }
          this.position.x += this.speed.x, this.position.y += this.speed.y
      }, F.prototype.setStackPos = function(a) {
          this.stackPos = a
      }, z(), {
          option: G,
          destroy: H,
          start: E,
          pause: D
      }
  }
  var c = "particleground",
      e = a.jQuery;
  a[c] = function(a, b) {
      return new f(a, b)
  }, a[c].defaults = {
      minSpeedX: .1,
      maxSpeedX: .7,
      minSpeedY: .1,
      maxSpeedY: .7,
      directionX: "center",
      directionY: "center",
      density: 1e4,
      dotColor: "#666666",
      lineColor: "#666666",
      particleRadius: 7,
      lineWidth: 1,
      curvedLines: !1,
      proximity: 100,
      parallax: !0,
      parallaxMultiplier: 5,
      onInit: function() {},
      onDestroy: function() {}
  }, e && (e.fn[c] = function(a) {
      if ("string" == typeof arguments[0]) {
          var g, b = arguments[0],
              d = Array.prototype.slice.call(arguments, 1);
          return this.each(function() {
              e.data(this, "plugin_" + c) && "function" == typeof e.data(this, "plugin_" + c)[b] && (g = e.data(this, "plugin_" + c)[b].apply(this, d))
          }), void 0 !== g ? g : this
      }
      if ("object" == typeof a || !a) return this.each(function() {
          e.data(this, "plugin_" + c) || e.data(this, "plugin_" + c, new f(this, a))
      })
  })
}(window, document),
function() {
  for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
  window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
      var d = (new Date).getTime(),
          e = Math.max(0, 16 - (d - a)),
          f = window.setTimeout(function() {
              b(d + e)
          }, e);
      return a = d + e, f
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
      clearTimeout(a)
  })
}();
