/* eslint-disable */
//prettier-ignore
module.exports = {
  name: "@yarnpkg/plugin-workspace-tools",
  factory: function (require) {
    var plugin = (() => {
      var wr = Object.create, ge = Object.defineProperty,
        Sr = Object.defineProperties, vr = Object.getOwnPropertyDescriptor,
        Hr = Object.getOwnPropertyDescriptors, $r = Object.getOwnPropertyNames,
        Je = Object.getOwnPropertySymbols, kr = Object.getPrototypeOf,
        et = Object.prototype.hasOwnProperty,
        Tr = Object.prototype.propertyIsEnumerable;
      var tt = (e, t, r) => t in e ? ge(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
      }) : e[t] = r, I = (e, t) => {
        for (var r in t || (t = {})) et.call(t, r) && tt(e, r, t[r]);
        if (Je) for (var r of Je(t)) Tr.call(t, r) && tt(e, r, t[r]);
        return e
      }, F = (e, t) => Sr(e, Hr(t)), Lr = e => ge(e, "__esModule", {value: !0});
      var K = (e, t) => () => (t || e((t = {exports: {}}).exports, t), t.exports),
        Or = (e, t) => {
          for (var r in t) ge(e, r, {get: t[r], enumerable: !0})
        }, Nr = (e, t, r) => {
          if (t && typeof t == "object" || typeof t == "function") for (let n of $r(t)) !et.call(e, n) && n !== "default" && ge(e, n, {
            get: () => t[n],
            enumerable: !(r = vr(t, n)) || r.enumerable
          });
          return e
        },
        Q = e => Nr(Lr(ge(e != null ? wr(kr(e)) : {}, "default", e && e.__esModule && "default" in e ? {
          get: () => e.default,
          enumerable: !0
        } : {value: e, enumerable: !0})), e);
      var He = K(ee => {
        "use strict";
        ee.isInteger = e => typeof e == "number" ? Number.isInteger(e) : typeof e == "string" && e.trim() !== "" ? Number.isInteger(Number(e)) : !1;
        ee.find = (e, t) => e.nodes.find(r => r.type === t);
        ee.exceedsLimit = (e, t, r = 1, n) => n === !1 || !ee.isInteger(e) || !ee.isInteger(t) ? !1 : (Number(t) - Number(e)) / Number(r) >= n;
        ee.escapeNode = (e, t = 0, r) => {
          let n = e.nodes[t];
          !n || (r && n.type === r || n.type === "open" || n.type === "close") && n.escaped !== !0 && (n.value = "\\" + n.value, n.escaped = !0)
        };
        ee.encloseBrace = e => e.type !== "brace" ? !1 : e.commas >> 0 + e.ranges >> 0 == 0 ? (e.invalid = !0, !0) : !1;
        ee.isInvalidBrace = e => e.type !== "brace" ? !1 : e.invalid === !0 || e.dollar ? !0 : e.commas >> 0 + e.ranges >> 0 == 0 || e.open !== !0 || e.close !== !0 ? (e.invalid = !0, !0) : !1;
        ee.isOpenOrClose = e => e.type === "open" || e.type === "close" ? !0 : e.open === !0 || e.close === !0;
        ee.reduce = e => e.reduce((t, r) => (r.type === "text" && t.push(r.value), r.type === "range" && (r.type = "text"), t), []);
        ee.flatten = (...e) => {
          let t = [], r = n => {
            for (let s = 0; s < n.length; s++) {
              let a = n[s];
              Array.isArray(a) ? r(a, t) : a !== void 0 && t.push(a)
            }
            return t
          };
          return r(e), t
        }
      });
      var $e = K((is, st) => {
        "use strict";
        var at = He();
        st.exports = (e, t = {}) => {
          let r = (n, s = {}) => {
            let a = t.escapeInvalid && at.isInvalidBrace(s),
              i = n.invalid === !0 && t.escapeInvalid === !0, o = "";
            if (n.value) return (a || i) && at.isOpenOrClose(n) ? "\\" + n.value : n.value;
            if (n.value) return n.value;
            if (n.nodes) for (let h of n.nodes) o += r(h);
            return o
          };
          return r(e)
        }
      });
      var ot = K((os, it) => {
        "use strict";
        it.exports = function (e) {
          return typeof e == "number" ? e - e == 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1
        }
      });
      var mt = K((us, ut) => {
        "use strict";
        var ct = ot(), pe = (e, t, r) => {
          if (ct(e) === !1) throw new TypeError("toRegexRange: expected the first argument to be a number");
          if (t === void 0 || e === t) return String(e);
          if (ct(t) === !1) throw new TypeError("toRegexRange: expected the second argument to be a number.");
          let n = I({relaxZeros: !0}, r);
          typeof n.strictZeros == "boolean" && (n.relaxZeros = n.strictZeros === !1);
          let s = String(n.relaxZeros), a = String(n.shorthand),
            i = String(n.capture), o = String(n.wrap),
            h = e + ":" + t + "=" + s + a + i + o;
          if (pe.cache.hasOwnProperty(h)) return pe.cache[h].result;
          let m = Math.min(e, t), f = Math.max(e, t);
          if (Math.abs(m - f) === 1) {
            let y = e + "|" + t;
            return n.capture ? `(${y})` : n.wrap === !1 ? y : `(?:${y})`
          }
          let R = pt(e) || pt(t), p = {min: e, max: t, a: m, b: f}, v = [],
            _ = [];
          if (R && (p.isPadded = R, p.maxLen = String(p.max).length), m < 0) {
            let y = f < 0 ? Math.abs(f) : 1;
            _ = lt(y, Math.abs(m), p, n), m = p.a = 0
          }
          return f >= 0 && (v = lt(m, f, p, n)), p.negatives = _, p.positives = v, p.result = Ir(_, v, n), n.capture === !0 ? p.result = `(${p.result})` : n.wrap !== !1 && v.length + _.length > 1 && (p.result = `(?:${p.result})`), pe.cache[h] = p, p.result
        };

        function Ir(e, t, r) {
          let n = Pe(e, t, "-", !1, r) || [], s = Pe(t, e, "", !1, r) || [],
            a = Pe(e, t, "-?", !0, r) || [];
          return n.concat(a).concat(s).join("|")
        }

        function Mr(e, t) {
          let r = 1, n = 1, s = ft(e, r), a = new Set([t]);
          for (; e <= s && s <= t;) a.add(s), r += 1, s = ft(e, r);
          for (s = ht(t + 1, n) - 1; e < s && s <= t;) a.add(s), n += 1, s = ht(t + 1, n) - 1;
          return a = [...a], a.sort(Br), a
        }

        function Gr(e, t, r) {
          if (e === t) return {pattern: e, count: [], digits: 0};
          let n = Pr(e, t), s = n.length, a = "", i = 0;
          for (let o = 0; o < s; o++) {
            let [h, m] = n[o];
            h === m ? a += h : h !== "0" || m !== "9" ? a += Dr(h, m, r) : i++
          }
          return i && (a += r.shorthand === !0 ? "\\d" : "[0-9]"), {
            pattern: a,
            count: [i],
            digits: s
          }
        }

        function lt(e, t, r, n) {
          let s = Mr(e, t), a = [], i = e, o;
          for (let h = 0; h < s.length; h++) {
            let m = s[h], f = Gr(String(i), String(m), n), R = "";
            if (!r.isPadded && o && o.pattern === f.pattern) {
              o.count.length > 1 && o.count.pop(), o.count.push(f.count[0]), o.string = o.pattern + dt(o.count), i = m + 1;
              continue
            }
            r.isPadded && (R = Ur(m, r, n)), f.string = R + f.pattern + dt(f.count), a.push(f), i = m + 1, o = f
          }
          return a
        }

        function Pe(e, t, r, n, s) {
          let a = [];
          for (let i of e) {
            let {string: o} = i;
            !n && !gt(t, "string", o) && a.push(r + o), n && gt(t, "string", o) && a.push(r + o)
          }
          return a
        }

        function Pr(e, t) {
          let r = [];
          for (let n = 0; n < e.length; n++) r.push([e[n], t[n]]);
          return r
        }

        function Br(e, t) {
          return e > t ? 1 : t > e ? -1 : 0
        }

        function gt(e, t, r) {
          return e.some(n => n[t] === r)
        }

        function ft(e, t) {
          return Number(String(e).slice(0, -t) + "9".repeat(t))
        }

        function ht(e, t) {
          return e - e % Math.pow(10, t)
        }

        function dt(e) {
          let [t = 0, r = ""] = e;
          return r || t > 1 ? `{${t + (r ? "," + r : "")}}` : ""
        }

        function Dr(e, t, r) {
          return `[${e}${t - e == 1 ? "" : "-"}${t}]`
        }

        function pt(e) {
          return /^-?(0+)\d/.test(e)
        }

        function Ur(e, t, r) {
          if (!t.isPadded) return e;
          let n = Math.abs(t.maxLen - String(e).length),
            s = r.relaxZeros !== !1;
          switch (n) {
            case 0:
              return "";
            case 1:
              return s ? "0?" : "0";
            case 2:
              return s ? "0{0,2}" : "00";
            default:
              return s ? `0{0,${n}}` : `0{${n}}`
          }
        }

        pe.cache = {};
        pe.clearCache = () => pe.cache = {};
        ut.exports = pe
      });
      var Ue = K((cs, At) => {
        "use strict";
        var qr = require("util"), Rt = mt(),
          yt = e => e !== null && typeof e == "object" && !Array.isArray(e),
          Kr = e => t => e === !0 ? Number(t) : String(t),
          De = e => typeof e == "number" || typeof e == "string" && e !== "",
          Ae = e => Number.isInteger(+e), Ge = e => {
            let t = `${e}`, r = -1;
            if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
            for (; t[++r] === "0";) ;
            return r > 0
          },
          Wr = (e, t, r) => typeof e == "string" || typeof t == "string" ? !0 : r.stringify === !0,
          jr = (e, t, r) => {
            if (t > 0) {
              let n = e[0] === "-" ? "-" : "";
              n && (e = e.slice(1)), e = n + e.padStart(n ? t - 1 : t, "0")
            }
            return r === !1 ? String(e) : e
          }, _t = (e, t) => {
            let r = e[0] === "-" ? "-" : "";
            for (r && (e = e.slice(1), t--); e.length < t;) e = "0" + e;
            return r ? "-" + e : e
          }, Fr = (e, t) => {
            e.negatives.sort((i, o) => i < o ? -1 : i > o ? 1 : 0), e.positives.sort((i, o) => i < o ? -1 : i > o ? 1 : 0);
            let r = t.capture ? "" : "?:", n = "", s = "", a;
            return e.positives.length && (n = e.positives.join("|")), e.negatives.length && (s = `-(${r}${e.negatives.join("|")})`), n && s ? a = `${n}|${s}` : a = n || s, t.wrap ? `(${r}${a})` : a
          }, bt = (e, t, r, n) => {
            if (r) return Rt(e, t, I({wrap: !1}, n));
            let s = String.fromCharCode(e);
            if (e === t) return s;
            let a = String.fromCharCode(t);
            return `[${s}-${a}]`
          }, Et = (e, t, r) => {
            if (Array.isArray(e)) {
              let n = r.wrap === !0, s = r.capture ? "" : "?:";
              return n ? `(${s}${e.join("|")})` : e.join("|")
            }
            return Rt(e, t, r)
          },
          xt = (...e) => new RangeError("Invalid range arguments: " + qr.inspect(...e)),
          Ct = (e, t, r) => {
            if (r.strictRanges === !0) throw xt([e, t]);
            return []
          }, Qr = (e, t) => {
            if (t.strictRanges === !0) throw new TypeError(`Expected step "${e}" to be a number`);
            return []
          }, Xr = (e, t, r = 1, n = {}) => {
            let s = Number(e), a = Number(t);
            if (!Number.isInteger(s) || !Number.isInteger(a)) {
              if (n.strictRanges === !0) throw xt([e, t]);
              return []
            }
            s === 0 && (s = 0), a === 0 && (a = 0);
            let i = s > a, o = String(e), h = String(t), m = String(r);
            r = Math.max(Math.abs(r), 1);
            let f = Ge(o) || Ge(h) || Ge(m),
              R = f ? Math.max(o.length, h.length, m.length) : 0,
              p = f === !1 && Wr(e, t, n) === !1, v = n.transform || Kr(p);
            if (n.toRegex && r === 1) return bt(_t(e, R), _t(t, R), !0, n);
            let _ = {negatives: [], positives: []},
              y = H => _[H < 0 ? "negatives" : "positives"].push(Math.abs(H)),
              b = [], E = 0;
            for (; i ? s >= a : s <= a;) n.toRegex === !0 && r > 1 ? y(s) : b.push(jr(v(s, E), R, p)), s = i ? s - r : s + r, E++;
            return n.toRegex === !0 ? r > 1 ? Fr(_, n) : Et(b, null, I({wrap: !1}, n)) : b
          }, Zr = (e, t, r = 1, n = {}) => {
            if (!Ae(e) && e.length > 1 || !Ae(t) && t.length > 1) return Ct(e, t, n);
            let s = n.transform || (p => String.fromCharCode(p)),
              a = `${e}`.charCodeAt(0), i = `${t}`.charCodeAt(0), o = a > i,
              h = Math.min(a, i), m = Math.max(a, i);
            if (n.toRegex && r === 1) return bt(h, m, !1, n);
            let f = [], R = 0;
            for (; o ? a >= i : a <= i;) f.push(s(a, R)), a = o ? a - r : a + r, R++;
            return n.toRegex === !0 ? Et(f, null, {wrap: !1, options: n}) : f
          }, ke = (e, t, r, n = {}) => {
            if (t == null && De(e)) return [e];
            if (!De(e) || !De(t)) return Ct(e, t, n);
            if (typeof r == "function") return ke(e, t, 1, {transform: r});
            if (yt(r)) return ke(e, t, 0, r);
            let s = I({}, n);
            return s.capture === !0 && (s.wrap = !0), r = r || s.step || 1, Ae(r) ? Ae(e) && Ae(t) ? Xr(e, t, r, s) : Zr(e, t, Math.max(Math.abs(r), 1), s) : r != null && !yt(r) ? Qr(r, s) : ke(e, t, 1, r)
          };
        At.exports = ke
      });
      var vt = K((ls, wt) => {
        "use strict";
        var Yr = Ue(), St = He(), zr = (e, t = {}) => {
          let r = (n, s = {}) => {
            let a = St.isInvalidBrace(s),
              i = n.invalid === !0 && t.escapeInvalid === !0,
              o = a === !0 || i === !0, h = t.escapeInvalid === !0 ? "\\" : "",
              m = "";
            if (n.isOpen === !0 || n.isClose === !0) return h + n.value;
            if (n.type === "open") return o ? h + n.value : "(";
            if (n.type === "close") return o ? h + n.value : ")";
            if (n.type === "comma") return n.prev.type === "comma" ? "" : o ? n.value : "|";
            if (n.value) return n.value;
            if (n.nodes && n.ranges > 0) {
              let f = St.reduce(n.nodes),
                R = Yr(...f, F(I({}, t), {wrap: !1, toRegex: !0}));
              if (R.length !== 0) return f.length > 1 && R.length > 1 ? `(${R})` : R
            }
            if (n.nodes) for (let f of n.nodes) m += r(f, n);
            return m
          };
          return r(e)
        };
        wt.exports = zr
      });
      var kt = K((ps, Ht) => {
        "use strict";
        var Vr = Ue(), $t = $e(), he = He(), fe = (e = "", t = "", r = !1) => {
          let n = [];
          if (e = [].concat(e), t = [].concat(t), !t.length) return e;
          if (!e.length) return r ? he.flatten(t).map(s => `{${s}}`) : t;
          for (let s of e) if (Array.isArray(s)) for (let a of s) n.push(fe(a, t, r)); else for (let a of t) r === !0 && typeof a == "string" && (a = `{${a}}`), n.push(Array.isArray(a) ? fe(s, a, r) : s + a);
          return he.flatten(n)
        }, Jr = (e, t = {}) => {
          let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit,
            n = (s, a = {}) => {
              s.queue = [];
              let i = a, o = a.queue;
              for (; i.type !== "brace" && i.type !== "root" && i.parent;) i = i.parent, o = i.queue;
              if (s.invalid || s.dollar) {
                o.push(fe(o.pop(), $t(s, t)));
                return
              }
              if (s.type === "brace" && s.invalid !== !0 && s.nodes.length === 2) {
                o.push(fe(o.pop(), ["{}"]));
                return
              }
              if (s.nodes && s.ranges > 0) {
                let R = he.reduce(s.nodes);
                if (he.exceedsLimit(...R, t.step, r)) throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
                let p = Vr(...R, t);
                p.length === 0 && (p = $t(s, t)), o.push(fe(o.pop(), p)), s.nodes = [];
                return
              }
              let h = he.encloseBrace(s), m = s.queue, f = s;
              for (; f.type !== "brace" && f.type !== "root" && f.parent;) f = f.parent, m = f.queue;
              for (let R = 0; R < s.nodes.length; R++) {
                let p = s.nodes[R];
                if (p.type === "comma" && s.type === "brace") {
                  R === 1 && m.push(""), m.push("");
                  continue
                }
                if (p.type === "close") {
                  o.push(fe(o.pop(), m, h));
                  continue
                }
                if (p.value && p.type !== "open") {
                  m.push(fe(m.pop(), p.value));
                  continue
                }
                p.nodes && n(p, s)
              }
              return m
            };
          return he.flatten(n(e))
        };
        Ht.exports = Jr
      });
      var Lt = K((fs, Tt) => {
        "use strict";
        Tt.exports = {
          MAX_LENGTH: 1024 * 64,
          CHAR_0: "0",
          CHAR_9: "9",
          CHAR_UPPERCASE_A: "A",
          CHAR_LOWERCASE_A: "a",
          CHAR_UPPERCASE_Z: "Z",
          CHAR_LOWERCASE_Z: "z",
          CHAR_LEFT_PARENTHESES: "(",
          CHAR_RIGHT_PARENTHESES: ")",
          CHAR_ASTERISK: "*",
          CHAR_AMPERSAND: "&",
          CHAR_AT: "@",
          CHAR_BACKSLASH: "\\",
          CHAR_BACKTICK: "`",
          CHAR_CARRIAGE_RETURN: "\r",
          CHAR_CIRCUMFLEX_ACCENT: "^",
          CHAR_COLON: ":",
          CHAR_COMMA: ",",
          CHAR_DOLLAR: "$",
          CHAR_DOT: ".",
          CHAR_DOUBLE_QUOTE: '"',
          CHAR_EQUAL: "=",
          CHAR_EXCLAMATION_MARK: "!",
          CHAR_FORM_FEED: "\f",
          CHAR_FORWARD_SLASH: "/",
          CHAR_HASH: "#",
          CHAR_HYPHEN_MINUS: "-",
          CHAR_LEFT_ANGLE_BRACKET: "<",
          CHAR_LEFT_CURLY_BRACE: "{",
          CHAR_LEFT_SQUARE_BRACKET: "[",
          CHAR_LINE_FEED: `
`,
          CHAR_NO_BREAK_SPACE: "\xA0",
          CHAR_PERCENT: "%",
          CHAR_PLUS: "+",
          CHAR_QUESTION_MARK: "?",
          CHAR_RIGHT_ANGLE_BRACKET: ">",
          CHAR_RIGHT_CURLY_BRACE: "}",
          CHAR_RIGHT_SQUARE_BRACKET: "]",
          CHAR_SEMICOLON: ";",
          CHAR_SINGLE_QUOTE: "'",
          CHAR_SPACE: " ",
          CHAR_TAB: "	",
          CHAR_UNDERSCORE: "_",
          CHAR_VERTICAL_LINE: "|",
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
        }
      });
      var Mt = K((hs, Ot) => {
        "use strict";
        var en = $e(), {
          MAX_LENGTH: Nt,
          CHAR_BACKSLASH: qe,
          CHAR_BACKTICK: tn,
          CHAR_COMMA: rn,
          CHAR_DOT: nn,
          CHAR_LEFT_PARENTHESES: sn,
          CHAR_RIGHT_PARENTHESES: an,
          CHAR_LEFT_CURLY_BRACE: on,
          CHAR_RIGHT_CURLY_BRACE: un,
          CHAR_LEFT_SQUARE_BRACKET: It,
          CHAR_RIGHT_SQUARE_BRACKET: Bt,
          CHAR_DOUBLE_QUOTE: cn,
          CHAR_SINGLE_QUOTE: ln,
          CHAR_NO_BREAK_SPACE: pn,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: fn
        } = Lt(), hn = (e, t = {}) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          let r = t || {},
            n = typeof r.maxLength == "number" ? Math.min(Nt, r.maxLength) : Nt;
          if (e.length > n) throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${n})`);
          let s = {type: "root", input: e, nodes: []}, a = [s], i = s, o = s,
            h = 0, m = e.length, f = 0, R = 0, p, v = {}, _ = () => e[f++],
            y = b => {
              if (b.type === "text" && o.type === "dot" && (o.type = "text"), o && o.type === "text" && b.type === "text") {
                o.value += b.value;
                return
              }
              return i.nodes.push(b), b.parent = i, b.prev = o, o = b, b
            };
          for (y({type: "bos"}); f < m;) if (i = a[a.length - 1], p = _(), !(p === fn || p === pn)) {
            if (p === qe) {
              y({type: "text", value: (t.keepEscaping ? p : "") + _()});
              continue
            }
            if (p === Bt) {
              y({type: "text", value: "\\" + p});
              continue
            }
            if (p === It) {
              h++;
              let b = !0, E;
              for (; f < m && (E = _());) {
                if (p += E, E === It) {
                  h++;
                  continue
                }
                if (E === qe) {
                  p += _();
                  continue
                }
                if (E === Bt && (h--, h === 0)) break
              }
              y({type: "text", value: p});
              continue
            }
            if (p === sn) {
              i = y({type: "paren", nodes: []}), a.push(i), y({
                type: "text",
                value: p
              });
              continue
            }
            if (p === an) {
              if (i.type !== "paren") {
                y({type: "text", value: p});
                continue
              }
              i = a.pop(), y({type: "text", value: p}), i = a[a.length - 1];
              continue
            }
            if (p === cn || p === ln || p === tn) {
              let b = p, E;
              for (t.keepQuotes !== !0 && (p = ""); f < m && (E = _());) {
                if (E === qe) {
                  p += E + _();
                  continue
                }
                if (E === b) {
                  t.keepQuotes === !0 && (p += E);
                  break
                }
                p += E
              }
              y({type: "text", value: p});
              continue
            }
            if (p === on) {
              R++;
              let b = o.value && o.value.slice(-1) === "$" || i.dollar === !0;
              i = y({
                type: "brace",
                open: !0,
                close: !1,
                dollar: b,
                depth: R,
                commas: 0,
                ranges: 0,
                nodes: []
              }), a.push(i), y({type: "open", value: p});
              continue
            }
            if (p === un) {
              if (i.type !== "brace") {
                y({type: "text", value: p});
                continue
              }
              let b = "close";
              i = a.pop(), i.close = !0, y({
                type: b,
                value: p
              }), R--, i = a[a.length - 1];
              continue
            }
            if (p === rn && R > 0) {
              if (i.ranges > 0) {
                i.ranges = 0;
                let b = i.nodes.shift();
                i.nodes = [b, {type: "text", value: en(i)}]
              }
              y({type: "comma", value: p}), i.commas++;
              continue
            }
            if (p === nn && R > 0 && i.commas === 0) {
              let b = i.nodes;
              if (R === 0 || b.length === 0) {
                y({type: "text", value: p});
                continue
              }
              if (o.type === "dot") {
                if (i.range = [], o.value += p, o.type = "range", i.nodes.length !== 3 && i.nodes.length !== 5) {
                  i.invalid = !0, i.ranges = 0, o.type = "text";
                  continue
                }
                i.ranges++, i.args = [];
                continue
              }
              if (o.type === "range") {
                b.pop();
                let E = b[b.length - 1];
                E.value += o.value + p, o = E, i.ranges--;
                continue
              }
              y({type: "dot", value: p});
              continue
            }
            y({type: "text", value: p})
          }
          do if (i = a.pop(), i.type !== "root") {
            i.nodes.forEach(H => {
              H.nodes || (H.type === "open" && (H.isOpen = !0), H.type === "close" && (H.isClose = !0), H.nodes || (H.type = "text"), H.invalid = !0)
            });
            let b = a[a.length - 1], E = b.nodes.indexOf(i);
            b.nodes.splice(E, 1, ...i.nodes)
          } while (a.length > 0);
          return y({type: "eos"}), s
        };
        Ot.exports = hn
      });
      var Gt = K((ds, Pt) => {
        "use strict";
        var Dt = $e(), dn = vt(), gn = kt(), mn = Mt(), z = (e, t = {}) => {
          let r = [];
          if (Array.isArray(e)) for (let n of e) {
            let s = z.create(n, t);
            Array.isArray(s) ? r.push(...s) : r.push(s)
          } else r = [].concat(z.create(e, t));
          return t && t.expand === !0 && t.nodupes === !0 && (r = [...new Set(r)]), r
        };
        z.parse = (e, t = {}) => mn(e, t);
        z.stringify = (e, t = {}) => typeof e == "string" ? Dt(z.parse(e, t), t) : Dt(e, t);
        z.compile = (e, t = {}) => (typeof e == "string" && (e = z.parse(e, t)), dn(e, t));
        z.expand = (e, t = {}) => {
          typeof e == "string" && (e = z.parse(e, t));
          let r = gn(e, t);
          return t.noempty === !0 && (r = r.filter(Boolean)), t.nodupes === !0 && (r = [...new Set(r)]), r
        };
        z.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? z.compile(e, t) : z.expand(e, t);
        Pt.exports = z
      });
      var Re = K((gs, Ut) => {
        "use strict";
        var An = require("path"), se = "\\\\/", qt = `[^${se}]`, ue = "\\.",
          Rn = "\\+", yn = "\\?", Te = "\\/", _n = "(?=.)", Kt = "[^/]",
          Ke = `(?:${Te}|$)`, Wt = `(?:^|${Te})`, We = `${ue}{1,2}${Ke}`,
          bn = `(?!${ue})`, En = `(?!${Wt}${We})`, xn = `(?!${ue}{0,1}${Ke})`,
          Cn = `(?!${We})`, wn = `[^.${Te}]`, Sn = `${Kt}*?`, jt = {
            DOT_LITERAL: ue,
            PLUS_LITERAL: Rn,
            QMARK_LITERAL: yn,
            SLASH_LITERAL: Te,
            ONE_CHAR: _n,
            QMARK: Kt,
            END_ANCHOR: Ke,
            DOTS_SLASH: We,
            NO_DOT: bn,
            NO_DOTS: En,
            NO_DOT_SLASH: xn,
            NO_DOTS_SLASH: Cn,
            QMARK_NO_DOT: wn,
            STAR: Sn,
            START_ANCHOR: Wt
          }, vn = F(I({}, jt), {
            SLASH_LITERAL: `[${se}]`,
            QMARK: qt,
            STAR: `${qt}*?`,
            DOTS_SLASH: `${ue}{1,2}(?:[${se}]|$)`,
            NO_DOT: `(?!${ue})`,
            NO_DOTS: `(?!(?:^|[${se}])${ue}{1,2}(?:[${se}]|$))`,
            NO_DOT_SLASH: `(?!${ue}{0,1}(?:[${se}]|$))`,
            NO_DOTS_SLASH: `(?!${ue}{1,2}(?:[${se}]|$))`,
            QMARK_NO_DOT: `[^.${se}]`,
            START_ANCHOR: `(?:^|[${se}])`,
            END_ANCHOR: `(?:[${se}]|$)`
          }), Hn = {
            alnum: "a-zA-Z0-9",
            alpha: "a-zA-Z",
            ascii: "\\x00-\\x7F",
            blank: " \\t",
            cntrl: "\\x00-\\x1F\\x7F",
            digit: "0-9",
            graph: "\\x21-\\x7E",
            lower: "a-z",
            print: "\\x20-\\x7E ",
            punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
            space: " \\t\\r\\n\\v\\f",
            upper: "A-Z",
            word: "A-Za-z0-9_",
            xdigit: "A-Fa-f0-9"
          };
        Ut.exports = {
          MAX_LENGTH: 1024 * 64,
          POSIX_REGEX_SOURCE: Hn,
          REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
          REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
          REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
          REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
          REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
          REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
          REPLACEMENTS: {"***": "*", "**/**": "**", "**/**/**": "**"},
          CHAR_0: 48,
          CHAR_9: 57,
          CHAR_UPPERCASE_A: 65,
          CHAR_LOWERCASE_A: 97,
          CHAR_UPPERCASE_Z: 90,
          CHAR_LOWERCASE_Z: 122,
          CHAR_LEFT_PARENTHESES: 40,
          CHAR_RIGHT_PARENTHESES: 41,
          CHAR_ASTERISK: 42,
          CHAR_AMPERSAND: 38,
          CHAR_AT: 64,
          CHAR_BACKWARD_SLASH: 92,
          CHAR_CARRIAGE_RETURN: 13,
          CHAR_CIRCUMFLEX_ACCENT: 94,
          CHAR_COLON: 58,
          CHAR_COMMA: 44,
          CHAR_DOT: 46,
          CHAR_DOUBLE_QUOTE: 34,
          CHAR_EQUAL: 61,
          CHAR_EXCLAMATION_MARK: 33,
          CHAR_FORM_FEED: 12,
          CHAR_FORWARD_SLASH: 47,
          CHAR_GRAVE_ACCENT: 96,
          CHAR_HASH: 35,
          CHAR_HYPHEN_MINUS: 45,
          CHAR_LEFT_ANGLE_BRACKET: 60,
          CHAR_LEFT_CURLY_BRACE: 123,
          CHAR_LEFT_SQUARE_BRACKET: 91,
          CHAR_LINE_FEED: 10,
          CHAR_NO_BREAK_SPACE: 160,
          CHAR_PERCENT: 37,
          CHAR_PLUS: 43,
          CHAR_QUESTION_MARK: 63,
          CHAR_RIGHT_ANGLE_BRACKET: 62,
          CHAR_RIGHT_CURLY_BRACE: 125,
          CHAR_RIGHT_SQUARE_BRACKET: 93,
          CHAR_SEMICOLON: 59,
          CHAR_SINGLE_QUOTE: 39,
          CHAR_SPACE: 32,
          CHAR_TAB: 9,
          CHAR_UNDERSCORE: 95,
          CHAR_VERTICAL_LINE: 124,
          CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
          SEP: An.sep,
          extglobChars(e) {
            return {
              "!": {
                type: "negate",
                open: "(?:(?!(?:",
                close: `))${e.STAR})`
              },
              "?": {type: "qmark", open: "(?:", close: ")?"},
              "+": {type: "plus", open: "(?:", close: ")+"},
              "*": {type: "star", open: "(?:", close: ")*"},
              "@": {type: "at", open: "(?:", close: ")"}
            }
          },
          globChars(e) {
            return e === !0 ? vn : jt
          }
        }
      });
      var ye = K(X => {
        "use strict";
        var $n = require("path"), kn = process.platform === "win32", {
          REGEX_BACKSLASH: Tn,
          REGEX_REMOVE_BACKSLASH: Ln,
          REGEX_SPECIAL_CHARS: On,
          REGEX_SPECIAL_CHARS_GLOBAL: Nn
        } = Re();
        X.isObject = e => e !== null && typeof e == "object" && !Array.isArray(e);
        X.hasRegexChars = e => On.test(e);
        X.isRegexChar = e => e.length === 1 && X.hasRegexChars(e);
        X.escapeRegex = e => e.replace(Nn, "\\$1");
        X.toPosixSlashes = e => e.replace(Tn, "/");
        X.removeBackslashes = e => e.replace(Ln, t => t === "\\" ? "" : t);
        X.supportsLookbehinds = () => {
          let e = process.version.slice(1).split(".").map(Number);
          return e.length === 3 && e[0] >= 9 || e[0] === 8 && e[1] >= 10
        };
        X.isWindows = e => e && typeof e.windows == "boolean" ? e.windows : kn === !0 || $n.sep === "\\";
        X.escapeLast = (e, t, r) => {
          let n = e.lastIndexOf(t, r);
          return n === -1 ? e : e[n - 1] === "\\" ? X.escapeLast(e, t, n - 1) : `${e.slice(0, n)}\\${e.slice(n)}`
        };
        X.removePrefix = (e, t = {}) => {
          let r = e;
          return r.startsWith("./") && (r = r.slice(2), t.prefix = "./"), r
        };
        X.wrapOutput = (e, t = {}, r = {}) => {
          let n = r.contains ? "" : "^", s = r.contains ? "" : "$",
            a = `${n}(?:${e})${s}`;
          return t.negated === !0 && (a = `(?:^(?!${a}).*$)`), a
        }
      });
      var er = K((As, Ft) => {
        "use strict";
        var Qt = ye(), {
          CHAR_ASTERISK: je,
          CHAR_AT: In,
          CHAR_BACKWARD_SLASH: _e,
          CHAR_COMMA: Bn,
          CHAR_DOT: Fe,
          CHAR_EXCLAMATION_MARK: Xt,
          CHAR_FORWARD_SLASH: Zt,
          CHAR_LEFT_CURLY_BRACE: Qe,
          CHAR_LEFT_PARENTHESES: Xe,
          CHAR_LEFT_SQUARE_BRACKET: Mn,
          CHAR_PLUS: Pn,
          CHAR_QUESTION_MARK: Yt,
          CHAR_RIGHT_CURLY_BRACE: Dn,
          CHAR_RIGHT_PARENTHESES: zt,
          CHAR_RIGHT_SQUARE_BRACKET: Gn
        } = Re(), Vt = e => e === Zt || e === _e, Jt = e => {
          e.isPrefix !== !0 && (e.depth = e.isGlobstar ? Infinity : 1)
        }, Un = (e, t) => {
          let r = t || {}, n = e.length - 1,
            s = r.parts === !0 || r.scanToEnd === !0, a = [], i = [], o = [],
            h = e, m = -1, f = 0, R = 0, p = !1, v = !1, _ = !1, y = !1, b = !1,
            E = !1, H = !1, L = !1, k = !1, J = 0, ie, g,
            w = {value: "", depth: 0, isGlob: !1}, D = () => m >= n,
            W = () => h.charCodeAt(m + 1),
            l = () => (ie = g, h.charCodeAt(++m));
          for (; m < n;) {
            g = l();
            let c;
            if (g === _e) {
              H = w.backslashes = !0, g = l(), g === Qe && (E = !0);
              continue
            }
            if (E === !0 || g === Qe) {
              for (J++; D() !== !0 && (g = l());) {
                if (g === _e) {
                  H = w.backslashes = !0, l();
                  continue
                }
                if (g === Qe) {
                  J++;
                  continue
                }
                if (E !== !0 && g === Fe && (g = l()) === Fe) {
                  if (p = w.isBrace = !0, _ = w.isGlob = !0, k = !0, s === !0) continue;
                  break
                }
                if (E !== !0 && g === Bn) {
                  if (p = w.isBrace = !0, _ = w.isGlob = !0, k = !0, s === !0) continue;
                  break
                }
                if (g === Dn && (J--, J === 0)) {
                  E = !1, p = w.isBrace = !0, k = !0;
                  break
                }
              }
              if (s === !0) continue;
              break
            }
            if (g === Zt) {
              if (a.push(m), i.push(w), w = {
                value: "",
                depth: 0,
                isGlob: !1
              }, k === !0) continue;
              if (ie === Fe && m === f + 1) {
                f += 2;
                continue
              }
              R = m + 1;
              continue
            }
            if (r.noext !== !0 && (g === Pn || g === In || g === je || g === Yt || g === Xt) === !0 && W() === Xe) {
              if (_ = w.isGlob = !0, y = w.isExtglob = !0, k = !0, s === !0) {
                for (; D() !== !0 && (g = l());) {
                  if (g === _e) {
                    H = w.backslashes = !0, g = l();
                    continue
                  }
                  if (g === zt) {
                    _ = w.isGlob = !0, k = !0;
                    break
                  }
                }
                continue
              }
              break
            }
            if (g === je) {
              if (ie === je && (b = w.isGlobstar = !0), _ = w.isGlob = !0, k = !0, s === !0) continue;
              break
            }
            if (g === Yt) {
              if (_ = w.isGlob = !0, k = !0, s === !0) continue;
              break
            }
            if (g === Mn) {
              for (; D() !== !0 && (c = l());) {
                if (c === _e) {
                  H = w.backslashes = !0, l();
                  continue
                }
                if (c === Gn) {
                  v = w.isBracket = !0, _ = w.isGlob = !0, k = !0;
                  break
                }
              }
              if (s === !0) continue;
              break
            }
            if (r.nonegate !== !0 && g === Xt && m === f) {
              L = w.negated = !0, f++;
              continue
            }
            if (r.noparen !== !0 && g === Xe) {
              if (_ = w.isGlob = !0, s === !0) {
                for (; D() !== !0 && (g = l());) {
                  if (g === Xe) {
                    H = w.backslashes = !0, g = l();
                    continue
                  }
                  if (g === zt) {
                    k = !0;
                    break
                  }
                }
                continue
              }
              break
            }
            if (_ === !0) {
              if (k = !0, s === !0) continue;
              break
            }
          }
          r.noext === !0 && (y = !1, _ = !1);
          let x = h, T = "", U = "";
          f > 0 && (T = h.slice(0, f), h = h.slice(f), R -= f), x && _ === !0 && R > 0 ? (x = h.slice(0, R), U = h.slice(R)) : _ === !0 ? (x = "", U = h) : x = h, x && x !== "" && x !== "/" && x !== h && Vt(x.charCodeAt(x.length - 1)) && (x = x.slice(0, -1)), r.unescape === !0 && (U && (U = Qt.removeBackslashes(U)), x && H === !0 && (x = Qt.removeBackslashes(x)));
          let u = {
            prefix: T,
            input: e,
            start: f,
            base: x,
            glob: U,
            isBrace: p,
            isBracket: v,
            isGlob: _,
            isExtglob: y,
            isGlobstar: b,
            negated: L
          };
          if (r.tokens === !0 && (u.maxDepth = 0, Vt(g) || i.push(w), u.tokens = i), r.parts === !0 || r.tokens === !0) {
            let c;
            for (let $ = 0; $ < a.length; $++) {
              let B = c ? c + 1 : f, Y = a[$], re = e.slice(B, Y);
              r.tokens && ($ === 0 && f !== 0 ? (i[$].isPrefix = !0, i[$].value = T) : i[$].value = re, Jt(i[$]), u.maxDepth += i[$].depth), ($ !== 0 || re !== "") && o.push(re), c = Y
            }
            if (c && c + 1 < e.length) {
              let $ = e.slice(c + 1);
              o.push($), r.tokens && (i[i.length - 1].value = $, Jt(i[i.length - 1]), u.maxDepth += i[i.length - 1].depth)
            }
            u.slashes = a, u.parts = o
          }
          return u
        };
        Ft.exports = Un
      });
      var sr = K((Rs, tr) => {
        "use strict";
        var Le = Re(), V = ye(), {
            MAX_LENGTH: Oe,
            POSIX_REGEX_SOURCE: qn,
            REGEX_NON_SPECIAL_CHARS: Kn,
            REGEX_SPECIAL_CHARS_BACKREF: Wn,
            REPLACEMENTS: rr
          } = Le, jn = (e, t) => {
            if (typeof t.expandRange == "function") return t.expandRange(...e, t);
            e.sort();
            let r = `[${e.join("-")}]`;
            try {
              new RegExp(r)
            } catch (n) {
              return e.map(s => V.escapeRegex(s)).join("..")
            }
            return r
          },
          de = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
          nr = (e, t) => {
            if (typeof e != "string") throw new TypeError("Expected a string");
            e = rr[e] || e;
            let r = I({}, t),
              n = typeof r.maxLength == "number" ? Math.min(Oe, r.maxLength) : Oe,
              s = e.length;
            if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`);
            let a = {type: "bos", value: "", output: r.prepend || ""}, i = [a],
              o = r.capture ? "" : "?:", h = V.isWindows(t),
              m = Le.globChars(h), f = Le.extglobChars(m), {
                DOT_LITERAL: R,
                PLUS_LITERAL: p,
                SLASH_LITERAL: v,
                ONE_CHAR: _,
                DOTS_SLASH: y,
                NO_DOT: b,
                NO_DOT_SLASH: E,
                NO_DOTS_SLASH: H,
                QMARK: L,
                QMARK_NO_DOT: k,
                STAR: J,
                START_ANCHOR: ie
              } = m, g = A => `(${o}(?:(?!${ie}${A.dot ? y : R}).)*?)`,
              w = r.dot ? "" : b, D = r.dot ? L : k,
              W = r.bash === !0 ? g(r) : J;
            r.capture && (W = `(${W})`), typeof r.noext == "boolean" && (r.noextglob = r.noext);
            let l = {
              input: e,
              index: -1,
              start: 0,
              dot: r.dot === !0,
              consumed: "",
              output: "",
              prefix: "",
              backtrack: !1,
              negated: !1,
              brackets: 0,
              braces: 0,
              parens: 0,
              quotes: 0,
              globstar: !1,
              tokens: i
            };
            e = V.removePrefix(e, l), s = e.length;
            let x = [], T = [], U = [], u = a, c, $ = () => l.index === s - 1,
              B = l.peek = (A = 1) => e[l.index + A],
              Y = l.advance = () => e[++l.index],
              re = () => e.slice(l.index + 1), oe = (A = "", O = 0) => {
                l.consumed += A, l.index += O
              }, xe = A => {
                l.output += A.output != null ? A.output : A.value, oe(A.value)
              }, xr = () => {
                let A = 1;
                for (; B() === "!" && (B(2) !== "(" || B(3) === "?");) Y(), l.start++, A++;
                return A % 2 == 0 ? !1 : (l.negated = !0, l.start++, !0)
              }, Ce = A => {
                l[A]++, U.push(A)
              }, ce = A => {
                l[A]--, U.pop()
              }, C = A => {
                if (u.type === "globstar") {
                  let O = l.braces > 0 && (A.type === "comma" || A.type === "brace"),
                    d = A.extglob === !0 || x.length && (A.type === "pipe" || A.type === "paren");
                  A.type !== "slash" && A.type !== "paren" && !O && !d && (l.output = l.output.slice(0, -u.output.length), u.type = "star", u.value = "*", u.output = W, l.output += u.output)
                }
                if (x.length && A.type !== "paren" && !f[A.value] && (x[x.length - 1].inner += A.value), (A.value || A.output) && xe(A), u && u.type === "text" && A.type === "text") {
                  u.value += A.value, u.output = (u.output || "") + A.value;
                  return
                }
                A.prev = u, i.push(A), u = A
              }, we = (A, O) => {
                let d = F(I({}, f[O]), {conditions: 1, inner: ""});
                d.prev = u, d.parens = l.parens, d.output = l.output;
                let S = (r.capture ? "(" : "") + d.open;
                Ce("parens"), C({
                  type: A,
                  value: O,
                  output: l.output ? "" : _
                }), C({
                  type: "paren",
                  extglob: !0,
                  value: Y(),
                  output: S
                }), x.push(d)
              }, Cr = A => {
                let O = A.close + (r.capture ? ")" : "");
                if (A.type === "negate") {
                  let d = W;
                  A.inner && A.inner.length > 1 && A.inner.includes("/") && (d = g(r)), (d !== W || $() || /^\)+$/.test(re())) && (O = A.close = `)$))${d}`), A.prev.type === "bos" && (l.negatedExtglob = !0)
                }
                C({type: "paren", extglob: !0, value: c, output: O}), ce("parens")
              };
            if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
              let A = !1,
                O = e.replace(Wn, (d, S, M, j, q, Me) => j === "\\" ? (A = !0, d) : j === "?" ? S ? S + j + (q ? L.repeat(q.length) : "") : Me === 0 ? D + (q ? L.repeat(q.length) : "") : L.repeat(M.length) : j === "." ? R.repeat(M.length) : j === "*" ? S ? S + j + (q ? W : "") : W : S ? d : `\\${d}`);
              return A === !0 && (r.unescape === !0 ? O = O.replace(/\\/g, "") : O = O.replace(/\\+/g, d => d.length % 2 == 0 ? "\\\\" : d ? "\\" : "")), O === e && r.contains === !0 ? (l.output = e, l) : (l.output = V.wrapOutput(O, l, t), l)
            }
            for (; !$();) {
              if (c = Y(), c === "\0") continue;
              if (c === "\\") {
                let d = B();
                if (d === "/" && r.bash !== !0 || d === "." || d === ";") continue;
                if (!d) {
                  c += "\\", C({type: "text", value: c});
                  continue
                }
                let S = /^\\+/.exec(re()), M = 0;
                if (S && S[0].length > 2 && (M = S[0].length, l.index += M, M % 2 != 0 && (c += "\\")), r.unescape === !0 ? c = Y() || "" : c += Y() || "", l.brackets === 0) {
                  C({type: "text", value: c});
                  continue
                }
              }
              if (l.brackets > 0 && (c !== "]" || u.value === "[" || u.value === "[^")) {
                if (r.posix !== !1 && c === ":") {
                  let d = u.value.slice(1);
                  if (d.includes("[") && (u.posix = !0, d.includes(":"))) {
                    let S = u.value.lastIndexOf("["), M = u.value.slice(0, S),
                      j = u.value.slice(S + 2), q = qn[j];
                    if (q) {
                      u.value = M + q, l.backtrack = !0, Y(), !a.output && i.indexOf(u) === 1 && (a.output = _);
                      continue
                    }
                  }
                }
                (c === "[" && B() !== ":" || c === "-" && B() === "]") && (c = `\\${c}`), c === "]" && (u.value === "[" || u.value === "[^") && (c = `\\${c}`), r.posix === !0 && c === "!" && u.value === "[" && (c = "^"), u.value += c, xe({value: c});
                continue
              }
              if (l.quotes === 1 && c !== '"') {
                c = V.escapeRegex(c), u.value += c, xe({value: c});
                continue
              }
              if (c === '"') {
                l.quotes = l.quotes === 1 ? 0 : 1, r.keepQuotes === !0 && C({
                  type: "text",
                  value: c
                });
                continue
              }
              if (c === "(") {
                Ce("parens"), C({type: "paren", value: c});
                continue
              }
              if (c === ")") {
                if (l.parens === 0 && r.strictBrackets === !0) throw new SyntaxError(de("opening", "("));
                let d = x[x.length - 1];
                if (d && l.parens === d.parens + 1) {
                  Cr(x.pop());
                  continue
                }
                C({
                  type: "paren",
                  value: c,
                  output: l.parens ? ")" : "\\)"
                }), ce("parens");
                continue
              }
              if (c === "[") {
                if (r.nobracket === !0 || !re().includes("]")) {
                  if (r.nobracket !== !0 && r.strictBrackets === !0) throw new SyntaxError(de("closing", "]"));
                  c = `\\${c}`
                } else Ce("brackets");
                C({type: "bracket", value: c});
                continue
              }
              if (c === "]") {
                if (r.nobracket === !0 || u && u.type === "bracket" && u.value.length === 1) {
                  C({type: "text", value: c, output: `\\${c}`});
                  continue
                }
                if (l.brackets === 0) {
                  if (r.strictBrackets === !0) throw new SyntaxError(de("opening", "["));
                  C({type: "text", value: c, output: `\\${c}`});
                  continue
                }
                ce("brackets");
                let d = u.value.slice(1);
                if (u.posix !== !0 && d[0] === "^" && !d.includes("/") && (c = `/${c}`), u.value += c, xe({value: c}), r.literalBrackets === !1 || V.hasRegexChars(d)) continue;
                let S = V.escapeRegex(u.value);
                if (l.output = l.output.slice(0, -u.value.length), r.literalBrackets === !0) {
                  l.output += S, u.value = S;
                  continue
                }
                u.value = `(${o}${S}|${u.value})`, l.output += u.value;
                continue
              }
              if (c === "{" && r.nobrace !== !0) {
                Ce("braces");
                let d = {
                  type: "brace",
                  value: c,
                  output: "(",
                  outputIndex: l.output.length,
                  tokensIndex: l.tokens.length
                };
                T.push(d), C(d);
                continue
              }
              if (c === "}") {
                let d = T[T.length - 1];
                if (r.nobrace === !0 || !d) {
                  C({type: "text", value: c, output: c});
                  continue
                }
                let S = ")";
                if (d.dots === !0) {
                  let M = i.slice(), j = [];
                  for (let q = M.length - 1; q >= 0 && (i.pop(), M[q].type !== "brace"); q--) M[q].type !== "dots" && j.unshift(M[q].value);
                  S = jn(j, r), l.backtrack = !0
                }
                if (d.comma !== !0 && d.dots !== !0) {
                  let M = l.output.slice(0, d.outputIndex),
                    j = l.tokens.slice(d.tokensIndex);
                  d.value = d.output = "\\{", c = S = "\\}", l.output = M;
                  for (let q of j) l.output += q.output || q.value
                }
                C({type: "brace", value: c, output: S}), ce("braces"), T.pop();
                continue
              }
              if (c === "|") {
                x.length > 0 && x[x.length - 1].conditions++, C({
                  type: "text",
                  value: c
                });
                continue
              }
              if (c === ",") {
                let d = c, S = T[T.length - 1];
                S && U[U.length - 1] === "braces" && (S.comma = !0, d = "|"), C({
                  type: "comma",
                  value: c,
                  output: d
                });
                continue
              }
              if (c === "/") {
                if (u.type === "dot" && l.index === l.start + 1) {
                  l.start = l.index + 1, l.consumed = "", l.output = "", i.pop(), u = a;
                  continue
                }
                C({type: "slash", value: c, output: v});
                continue
              }
              if (c === ".") {
                if (l.braces > 0 && u.type === "dot") {
                  u.value === "." && (u.output = R);
                  let d = T[T.length - 1];
                  u.type = "dots", u.output += c, u.value += c, d.dots = !0;
                  continue
                }
                if (l.braces + l.parens === 0 && u.type !== "bos" && u.type !== "slash") {
                  C({type: "text", value: c, output: R});
                  continue
                }
                C({type: "dot", value: c, output: R});
                continue
              }
              if (c === "?") {
                if (!(u && u.value === "(") && r.noextglob !== !0 && B() === "(" && B(2) !== "?") {
                  we("qmark", c);
                  continue
                }
                if (u && u.type === "paren") {
                  let S = B(), M = c;
                  if (S === "<" && !V.supportsLookbehinds()) throw new Error("Node.js v10 or higher is required for regex lookbehinds");
                  (u.value === "(" && !/[!=<:]/.test(S) || S === "<" && !/<([!=]|\w+>)/.test(re())) && (M = `\\${c}`), C({
                    type: "text",
                    value: c,
                    output: M
                  });
                  continue
                }
                if (r.dot !== !0 && (u.type === "slash" || u.type === "bos")) {
                  C({type: "qmark", value: c, output: k});
                  continue
                }
                C({type: "qmark", value: c, output: L});
                continue
              }
              if (c === "!") {
                if (r.noextglob !== !0 && B() === "(" && (B(2) !== "?" || !/[!=<:]/.test(B(3)))) {
                  we("negate", c);
                  continue
                }
                if (r.nonegate !== !0 && l.index === 0) {
                  xr();
                  continue
                }
              }
              if (c === "+") {
                if (r.noextglob !== !0 && B() === "(" && B(2) !== "?") {
                  we("plus", c);
                  continue
                }
                if (u && u.value === "(" || r.regex === !1) {
                  C({type: "plus", value: c, output: p});
                  continue
                }
                if (u && (u.type === "bracket" || u.type === "paren" || u.type === "brace") || l.parens > 0) {
                  C({type: "plus", value: c});
                  continue
                }
                C({type: "plus", value: p});
                continue
              }
              if (c === "@") {
                if (r.noextglob !== !0 && B() === "(" && B(2) !== "?") {
                  C({type: "at", extglob: !0, value: c, output: ""});
                  continue
                }
                C({type: "text", value: c});
                continue
              }
              if (c !== "*") {
                (c === "$" || c === "^") && (c = `\\${c}`);
                let d = Kn.exec(re());
                d && (c += d[0], l.index += d[0].length), C({
                  type: "text",
                  value: c
                });
                continue
              }
              if (u && (u.type === "globstar" || u.star === !0)) {
                u.type = "star", u.star = !0, u.value += c, u.output = W, l.backtrack = !0, l.globstar = !0, oe(c);
                continue
              }
              let A = re();
              if (r.noextglob !== !0 && /^\([^?]/.test(A)) {
                we("star", c);
                continue
              }
              if (u.type === "star") {
                if (r.noglobstar === !0) {
                  oe(c);
                  continue
                }
                let d = u.prev, S = d.prev,
                  M = d.type === "slash" || d.type === "bos",
                  j = S && (S.type === "star" || S.type === "globstar");
                if (r.bash === !0 && (!M || A[0] && A[0] !== "/")) {
                  C({type: "star", value: c, output: ""});
                  continue
                }
                let q = l.braces > 0 && (d.type === "comma" || d.type === "brace"),
                  Me = x.length && (d.type === "pipe" || d.type === "paren");
                if (!M && d.type !== "paren" && !q && !Me) {
                  C({type: "star", value: c, output: ""});
                  continue
                }
                for (; A.slice(0, 3) === "/**";) {
                  let Se = e[l.index + 4];
                  if (Se && Se !== "/") break;
                  A = A.slice(3), oe("/**", 3)
                }
                if (d.type === "bos" && $()) {
                  u.type = "globstar", u.value += c, u.output = g(r), l.output = u.output, l.globstar = !0, oe(c);
                  continue
                }
                if (d.type === "slash" && d.prev.type !== "bos" && !j && $()) {
                  l.output = l.output.slice(0, -(d.output + u.output).length), d.output = `(?:${d.output}`, u.type = "globstar", u.output = g(r) + (r.strictSlashes ? ")" : "|$)"), u.value += c, l.globstar = !0, l.output += d.output + u.output, oe(c);
                  continue
                }
                if (d.type === "slash" && d.prev.type !== "bos" && A[0] === "/") {
                  let Se = A[1] !== void 0 ? "|$" : "";
                  l.output = l.output.slice(0, -(d.output + u.output).length), d.output = `(?:${d.output}`, u.type = "globstar", u.output = `${g(r)}${v}|${v}${Se})`, u.value += c, l.output += d.output + u.output, l.globstar = !0, oe(c + Y()), C({
                    type: "slash",
                    value: "/",
                    output: ""
                  });
                  continue
                }
                if (d.type === "bos" && A[0] === "/") {
                  u.type = "globstar", u.value += c, u.output = `(?:^|${v}|${g(r)}${v})`, l.output = u.output, l.globstar = !0, oe(c + Y()), C({
                    type: "slash",
                    value: "/",
                    output: ""
                  });
                  continue
                }
                l.output = l.output.slice(0, -u.output.length), u.type = "globstar", u.output = g(r), u.value += c, l.output += u.output, l.globstar = !0, oe(c);
                continue
              }
              let O = {type: "star", value: c, output: W};
              if (r.bash === !0) {
                O.output = ".*?", (u.type === "bos" || u.type === "slash") && (O.output = w + O.output), C(O);
                continue
              }
              if (u && (u.type === "bracket" || u.type === "paren") && r.regex === !0) {
                O.output = c, C(O);
                continue
              }
              (l.index === l.start || u.type === "slash" || u.type === "dot") && (u.type === "dot" ? (l.output += E, u.output += E) : r.dot === !0 ? (l.output += H, u.output += H) : (l.output += w, u.output += w), B() !== "*" && (l.output += _, u.output += _)), C(O)
            }
            for (; l.brackets > 0;) {
              if (r.strictBrackets === !0) throw new SyntaxError(de("closing", "]"));
              l.output = V.escapeLast(l.output, "["), ce("brackets")
            }
            for (; l.parens > 0;) {
              if (r.strictBrackets === !0) throw new SyntaxError(de("closing", ")"));
              l.output = V.escapeLast(l.output, "("), ce("parens")
            }
            for (; l.braces > 0;) {
              if (r.strictBrackets === !0) throw new SyntaxError(de("closing", "}"));
              l.output = V.escapeLast(l.output, "{"), ce("braces")
            }
            if (r.strictSlashes !== !0 && (u.type === "star" || u.type === "bracket") && C({
              type: "maybe_slash",
              value: "",
              output: `${v}?`
            }), l.backtrack === !0) {
              l.output = "";
              for (let A of l.tokens) l.output += A.output != null ? A.output : A.value, A.suffix && (l.output += A.suffix)
            }
            return l
          };
        nr.fastpaths = (e, t) => {
          let r = I({}, t),
            n = typeof r.maxLength == "number" ? Math.min(Oe, r.maxLength) : Oe,
            s = e.length;
          if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`);
          e = rr[e] || e;
          let a = V.isWindows(t), {
              DOT_LITERAL: i,
              SLASH_LITERAL: o,
              ONE_CHAR: h,
              DOTS_SLASH: m,
              NO_DOT: f,
              NO_DOTS: R,
              NO_DOTS_SLASH: p,
              STAR: v,
              START_ANCHOR: _
            } = Le.globChars(a), y = r.dot ? R : f, b = r.dot ? p : f,
            E = r.capture ? "" : "?:", H = {negated: !1, prefix: ""},
            L = r.bash === !0 ? ".*?" : v;
          r.capture && (L = `(${L})`);
          let k = w => w.noglobstar === !0 ? L : `(${E}(?:(?!${_}${w.dot ? m : i}).)*?)`,
            J = w => {
              switch (w) {
                case"*":
                  return `${y}${h}${L}`;
                case".*":
                  return `${i}${h}${L}`;
                case"*.*":
                  return `${y}${L}${i}${h}${L}`;
                case"*/*":
                  return `${y}${L}${o}${h}${b}${L}`;
                case"**":
                  return y + k(r);
                case"**/*":
                  return `(?:${y}${k(r)}${o})?${b}${h}${L}`;
                case"**/*.*":
                  return `(?:${y}${k(r)}${o})?${b}${L}${i}${h}${L}`;
                case"**/.*":
                  return `(?:${y}${k(r)}${o})?${i}${h}${L}`;
                default: {
                  let D = /^(.*?)\.(\w+)$/.exec(w);
                  if (!D) return;
                  let W = J(D[1]);
                  return W ? W + i + D[2] : void 0
                }
              }
            }, ie = V.removePrefix(e, H), g = J(ie);
          return g && r.strictSlashes !== !0 && (g += `${o}?`), g
        };
        tr.exports = nr
      });
      var ir = K((ys, ar) => {
        "use strict";
        var Fn = require("path"), Qn = er(), Ze = sr(), Ye = ye(), Xn = Re(),
          Zn = e => e && typeof e == "object" && !Array.isArray(e),
          P = (e, t, r = !1) => {
            if (Array.isArray(e)) {
              let f = e.map(p => P(p, t, r));
              return p => {
                for (let v of f) {
                  let _ = v(p);
                  if (_) return _
                }
                return !1
              }
            }
            let n = Zn(e) && e.tokens && e.input;
            if (e === "" || typeof e != "string" && !n) throw new TypeError("Expected pattern to be a non-empty string");
            let s = t || {}, a = Ye.isWindows(t),
              i = n ? P.compileRe(e, t) : P.makeRe(e, t, !1, !0), o = i.state;
            delete i.state;
            let h = () => !1;
            if (s.ignore) {
              let f = F(I({}, t), {
                ignore: null,
                onMatch: null,
                onResult: null
              });
              h = P(s.ignore, f, r)
            }
            let m = (f, R = !1) => {
              let {isMatch: p, match: v, output: _} = P.test(f, i, t, {
                glob: e,
                posix: a
              }), y = {
                glob: e,
                state: o,
                regex: i,
                posix: a,
                input: f,
                output: _,
                match: v,
                isMatch: p
              };
              return typeof s.onResult == "function" && s.onResult(y), p === !1 ? (y.isMatch = !1, R ? y : !1) : h(f) ? (typeof s.onIgnore == "function" && s.onIgnore(y), y.isMatch = !1, R ? y : !1) : (typeof s.onMatch == "function" && s.onMatch(y), R ? y : !0)
            };
            return r && (m.state = o), m
          };
        P.test = (e, t, r, {glob: n, posix: s} = {}) => {
          if (typeof e != "string") throw new TypeError("Expected input to be a string");
          if (e === "") return {isMatch: !1, output: ""};
          let a = r || {}, i = a.format || (s ? Ye.toPosixSlashes : null),
            o = e === n, h = o && i ? i(e) : e;
          return o === !1 && (h = i ? i(e) : e, o = h === n), (o === !1 || a.capture === !0) && (a.matchBase === !0 || a.basename === !0 ? o = P.matchBase(e, t, r, s) : o = t.exec(h)), {
            isMatch: Boolean(o),
            match: o,
            output: h
          }
        };
        P.matchBase = (e, t, r, n = Ye.isWindows(r)) => (t instanceof RegExp ? t : P.makeRe(t, r)).test(Fn.basename(e));
        P.isMatch = (e, t, r) => P(t, r)(e);
        P.parse = (e, t) => Array.isArray(e) ? e.map(r => P.parse(r, t)) : Ze(e, F(I({}, t), {fastpaths: !1}));
        P.scan = (e, t) => Qn(e, t);
        P.compileRe = (e, t, r = !1, n = !1) => {
          if (r === !0) return e.output;
          let s = t || {}, a = s.contains ? "" : "^", i = s.contains ? "" : "$",
            o = `${a}(?:${e.output})${i}`;
          e && e.negated === !0 && (o = `^(?!${o}).*$`);
          let h = P.toRegex(o, t);
          return n === !0 && (h.state = e), h
        };
        P.makeRe = (e, t, r = !1, n = !1) => {
          if (!e || typeof e != "string") throw new TypeError("Expected a non-empty string");
          let s = t || {}, a = {negated: !1, fastpaths: !0}, i = "", o;
          return e.startsWith("./") && (e = e.slice(2), i = a.prefix = "./"), s.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (o = Ze.fastpaths(e, t)), o === void 0 ? (a = Ze(e, t), a.prefix = i + (a.prefix || "")) : a.output = o, P.compileRe(a, t, r, n)
        };
        P.toRegex = (e, t) => {
          try {
            let r = t || {};
            return new RegExp(e, r.flags || (r.nocase ? "i" : ""))
          } catch (r) {
            if (t && t.debug === !0) throw r;
            return /$^/
          }
        };
        P.constants = Xn;
        ar.exports = P
      });
      var ur = K((_s, or) => {
        "use strict";
        or.exports = ir()
      });
      var hr = K((bs, cr) => {
        "use strict";
        var lr = require("util"), pr = Gt(), ae = ur(), ze = ye(),
          fr = e => typeof e == "string" && (e === "" || e === "./"),
          N = (e, t, r) => {
            t = [].concat(t), e = [].concat(e);
            let n = new Set, s = new Set, a = new Set, i = 0, o = f => {
              a.add(f.output), r && r.onResult && r.onResult(f)
            };
            for (let f = 0; f < t.length; f++) {
              let R = ae(String(t[f]), F(I({}, r), {onResult: o}), !0),
                p = R.state.negated || R.state.negatedExtglob;
              p && i++;
              for (let v of e) {
                let _ = R(v, !0);
                !(p ? !_.isMatch : _.isMatch) || (p ? n.add(_.output) : (n.delete(_.output), s.add(_.output)))
              }
            }
            let m = (i === t.length ? [...a] : [...s]).filter(f => !n.has(f));
            if (r && m.length === 0) {
              if (r.failglob === !0) throw new Error(`No matches found for "${t.join(", ")}"`);
              if (r.nonull === !0 || r.nullglob === !0) return r.unescape ? t.map(f => f.replace(/\\/g, "")) : t
            }
            return m
          };
        N.match = N;
        N.matcher = (e, t) => ae(e, t);
        N.isMatch = (e, t, r) => ae(t, r)(e);
        N.any = N.isMatch;
        N.not = (e, t, r = {}) => {
          t = [].concat(t).map(String);
          let n = new Set, s = [], a = o => {
            r.onResult && r.onResult(o), s.push(o.output)
          }, i = N(e, t, F(I({}, r), {onResult: a}));
          for (let o of s) i.includes(o) || n.add(o);
          return [...n]
        };
        N.contains = (e, t, r) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          if (Array.isArray(t)) return t.some(n => N.contains(e, n, r));
          if (typeof t == "string") {
            if (fr(e) || fr(t)) return !1;
            if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t)) return !0
          }
          return N.isMatch(e, t, F(I({}, r), {contains: !0}))
        };
        N.matchKeys = (e, t, r) => {
          if (!ze.isObject(e)) throw new TypeError("Expected the first argument to be an object");
          let n = N(Object.keys(e), t, r), s = {};
          for (let a of n) s[a] = e[a];
          return s
        };
        N.some = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = ae(String(s), r);
            if (n.some(i => a(i))) return !0
          }
          return !1
        };
        N.every = (e, t, r) => {
          let n = [].concat(e);
          for (let s of [].concat(t)) {
            let a = ae(String(s), r);
            if (!n.every(i => a(i))) return !1
          }
          return !0
        };
        N.all = (e, t, r) => {
          if (typeof e != "string") throw new TypeError(`Expected a string: "${lr.inspect(e)}"`);
          return [].concat(t).every(n => ae(n, r)(e))
        };
        N.capture = (e, t, r) => {
          let n = ze.isWindows(r),
            a = ae.makeRe(String(e), F(I({}, r), {capture: !0})).exec(n ? ze.toPosixSlashes(t) : t);
          if (a) return a.slice(1).map(i => i === void 0 ? "" : i)
        };
        N.makeRe = (...e) => ae.makeRe(...e);
        N.scan = (...e) => ae.scan(...e);
        N.parse = (e, t) => {
          let r = [];
          for (let n of [].concat(e || [])) for (let s of pr(String(n), t)) r.push(ae.parse(s, t));
          return r
        };
        N.braces = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return t && t.nobrace === !0 || !/\{.*\}/.test(e) ? [e] : pr(e, t)
        };
        N.braceExpand = (e, t) => {
          if (typeof e != "string") throw new TypeError("Expected a string");
          return N.braces(e, F(I({}, t), {expand: !0}))
        };
        cr.exports = N
      });
      var gr = K((Es, dr) => {
        "use strict";
        dr.exports = (e, ...t) => new Promise(r => {
          r(e(...t))
        })
      });
      var Ar = K((xs, Ve) => {
        "use strict";
        var Yn = gr(), mr = e => {
          if (e < 1) throw new TypeError("Expected `concurrency` to be a number from 1 and up");
          let t = [], r = 0, n = () => {
            r--, t.length > 0 && t.shift()()
          }, s = (o, h, ...m) => {
            r++;
            let f = Yn(o, ...m);
            h(f), f.then(n, n)
          }, a = (o, h, ...m) => {
            r < e ? s(o, h, ...m) : t.push(s.bind(null, o, h, ...m))
          }, i = (o, ...h) => new Promise(m => a(o, m, ...h));
          return Object.defineProperties(i, {
            activeCount: {get: () => r},
            pendingCount: {get: () => t.length}
          }), i
        };
        Ve.exports = mr;
        Ve.exports.default = mr
      });
      var Vn = {};
      Or(Vn, {default: () => es});
      var ve = Q(require("@yarnpkg/cli")), ne = Q(require("@yarnpkg/core")),
        rt = Q(require("@yarnpkg/core")), le = Q(require("clipanion")),
        me = class extends ve.BaseCommand {
          constructor() {
            super(...arguments);
            this.json = le.Option.Boolean("--json", !1, {description: "Format the output as an NDJSON stream"});
            this.production = le.Option.Boolean("--production", !1, {description: "Only install regular dependencies by omitting dev dependencies"});
            this.all = le.Option.Boolean("-A,--all", !1, {description: "Install the entire project"});
            this.workspaces = le.Option.Rest()
          }

          async execute() {
            let t = await ne.Configuration.find(this.context.cwd, this.context.plugins), {
                project: r,
                workspace: n
              } = await ne.Project.find(t, this.context.cwd),
              s = await ne.Cache.find(t);
            await r.restoreInstallState({restoreResolutions: !1});
            let a;
            if (this.all) a = new Set(r.workspaces); else if (this.workspaces.length === 0) {
              if (!n) throw new ve.WorkspaceRequiredError(r.cwd, this.context.cwd);
              a = new Set([n])
            } else a = new Set(this.workspaces.map(o => r.getWorkspaceByIdent(rt.structUtils.parseIdent(o))));
            for (let o of a) for (let h of this.production ? ["dependencies"] : ne.Manifest.hardDependencies) for (let m of o.manifest.getForScope(h).values()) {
              let f = r.tryWorkspaceByDescriptor(m);
              f !== null && a.add(f)
            }
            for (let o of r.workspaces) a.has(o) ? this.production && o.manifest.devDependencies.clear() : (o.manifest.installConfig = o.manifest.installConfig || {}, o.manifest.installConfig.selfReferences = !1, o.manifest.dependencies.clear(), o.manifest.devDependencies.clear(), o.manifest.peerDependencies.clear(), o.manifest.scripts.clear());
            return (await ne.StreamReport.start({
              configuration: t,
              json: this.json,
              stdout: this.context.stdout,
              includeLogs: !0
            }, async o => {
              await r.install({cache: s, report: o, persistProject: !1})
            })).exitCode()
          }
        };
      me.paths = [["workspaces", "focus"]], me.usage = le.Command.Usage({
        category: "Workspace-related commands",
        description: "install a single workspace and its dependencies",
        details: "\n      This command will run an install as if the specified workspaces (and all other workspaces they depend on) were the only ones in the project. If no workspaces are explicitly listed, the active one will be assumed.\n\n      Note that this command is only very moderately useful when using zero-installs, since the cache will contain all the packages anyway - meaning that the only difference between a full install and a focused install would just be a few extra lines in the `.pnp.cjs` file, at the cost of introducing an extra complexity.\n\n      If the `-A,--all` flag is set, the entire project will be installed. Combine with `--production` to replicate the old `yarn install --production`.\n    "
      });
      var nt = me;
      var Ne = Q(require("@yarnpkg/cli")), Ie = Q(require("@yarnpkg/core")),
        be = Q(require("@yarnpkg/core")), Z = Q(require("@yarnpkg/core")),
        Rr = Q(require("@yarnpkg/plugin-git")), G = Q(require("clipanion")),
        Be = Q(hr()), yr = Q(require("os")), _r = Q(Ar()),
        te = Q(require("typanion")), Ee = class extends Ne.BaseCommand {
          constructor() {
            super(...arguments);
            this.recursive = G.Option.Boolean("-R,--recursive", !1, {description: "Find packages via dependencies/devDependencies instead of using the workspaces field"});
            this.from = G.Option.Array("--from", [], {description: "An array of glob pattern idents from which to base any recursion"});
            this.all = G.Option.Boolean("-A,--all", !1, {description: "Run the command on all workspaces of a project"});
            this.verbose = G.Option.Boolean("-v,--verbose", !1, {description: "Prefix each output line with the name of the originating workspace"});
            this.parallel = G.Option.Boolean("-p,--parallel", !1, {description: "Run the commands in parallel"});
            this.interlaced = G.Option.Boolean("-i,--interlaced", !1, {description: "Print the output of commands in real-time instead of buffering it"});
            this.jobs = G.Option.String("-j,--jobs", {
              description: "The maximum number of parallel tasks that the execution will be limited to; or `unlimited`",
              validator: te.isOneOf([te.isEnum(["unlimited"]), te.applyCascade(te.isNumber(), [te.isInteger(), te.isAtLeast(1)])])
            });
            this.topological = G.Option.Boolean("-t,--topological", !1, {description: "Run the command after all workspaces it depends on (regular) have finished"});
            this.topologicalDev = G.Option.Boolean("--topological-dev", !1, {description: "Run the command after all workspaces it depends on (regular + dev) have finished"});
            this.include = G.Option.Array("--include", [], {description: "An array of glob pattern idents; only matching workspaces will be traversed"});
            this.exclude = G.Option.Array("--exclude", [], {description: "An array of glob pattern idents; matching workspaces won't be traversed"});
            this.publicOnly = G.Option.Boolean("--no-private", {description: "Avoid running the command on private workspaces"});
            this.since = G.Option.String("--since", {
              description: "Only include workspaces that have been changed since the specified ref.",
              tolerateBoolean: !0
            });
            this.commandName = G.Option.String();
            this.args = G.Option.Proxy()
          }

          async execute() {
            let t = await Ie.Configuration.find(this.context.cwd, this.context.plugins), {
              project: r,
              workspace: n
            } = await Ie.Project.find(t, this.context.cwd);
            if (!this.all && !n) throw new Ne.WorkspaceRequiredError(r.cwd, this.context.cwd);
            let s = this.cli.process([this.commandName, ...this.args]),
              a = s.path.length === 1 && s.path[0] === "run" && typeof s.scriptName != "undefined" ? s.scriptName : null;
            if (s.path.length === 0) throw new G.UsageError("Invalid subcommand name for iteration - use the 'run' keyword if you wish to execute a script");
            let i = this.all ? r.topLevelWorkspace : n,
              o = this.since ? Array.from(await Rr.gitUtils.fetchChangedWorkspaces({
                ref: this.since,
                project: r
              })) : [i, ...this.from.length > 0 ? i.getRecursiveWorkspaceChildren() : []],
              h = g => Be.default.isMatch(Z.structUtils.stringifyIdent(g.locator), this.from),
              m = this.from.length > 0 ? o.filter(h) : o,
              f = new Set([...m, ...m.map(g => [...this.recursive ? this.since ? g.getRecursiveWorkspaceDependents() : g.getRecursiveWorkspaceDependencies() : g.getRecursiveWorkspaceChildren()]).flat()]),
              R = [], p = !1;
            if (a == null ? void 0 : a.includes(":")) {
              for (let g of r.workspaces) if (g.manifest.scripts.has(a) && (p = !p, p === !1)) break
            }
            for (let g of f) a && !g.manifest.scripts.has(a) && !p || a === process.env.npm_lifecycle_event && g.cwd === n.cwd || this.include.length > 0 && !Be.default.isMatch(Z.structUtils.stringifyIdent(g.locator), this.include) || this.exclude.length > 0 && Be.default.isMatch(Z.structUtils.stringifyIdent(g.locator), this.exclude) || this.publicOnly && g.manifest.private === !0 || R.push(g);
            let v = this.parallel ? this.jobs === "unlimited" ? Infinity : this.jobs || Math.max(1, (0, yr.cpus)().length / 2) : 1,
              _ = v === 1 ? !1 : this.parallel, y = _ ? this.interlaced : !0,
              b = (0, _r.default)(v), E = new Map, H = new Set, L = 0, k = null,
              J = !1, ie = await be.StreamReport.start({
                configuration: t,
                stdout: this.context.stdout
              }, async g => {
                let w = async (D, {commandIndex: W}) => {
                  if (J) return -1;
                  !_ && this.verbose && W > 1 && g.reportSeparator();
                  let l = zn(D, {
                    configuration: t,
                    verbose: this.verbose,
                    commandIndex: W
                  }), [x, T] = br(g, {
                    prefix: l,
                    interlaced: y
                  }), [U, u] = br(g, {prefix: l, interlaced: y});
                  try {
                    this.verbose && g.reportInfo(null, `${l} Process started`);
                    let c = Date.now(),
                      $ = await this.cli.run([this.commandName, ...this.args], {
                        cwd: D.cwd,
                        stdout: x,
                        stderr: U
                      }) || 0;
                    x.end(), U.end(), await T, await u;
                    let B = Date.now();
                    if (this.verbose) {
                      let Y = t.get("enableTimers") ? `, completed in ${Z.formatUtils.pretty(t, B - c, Z.formatUtils.Type.DURATION)}` : "";
                      g.reportInfo(null, `${l} Process exited (exit code ${$})${Y}`)
                    }
                    return $ === 130 && (J = !0, k = $), $
                  } catch (c) {
                    throw x.end(), U.end(), await T, await u, c
                  }
                };
                for (let D of R) E.set(D.anchoredLocator.locatorHash, D);
                for (; E.size > 0 && !g.hasErrors();) {
                  let D = [];
                  for (let [x, T] of E) {
                    if (H.has(T.anchoredDescriptor.descriptorHash)) continue;
                    let U = !0;
                    if (this.topological || this.topologicalDev) {
                      let u = this.topologicalDev ? new Map([...T.manifest.dependencies, ...T.manifest.devDependencies]) : T.manifest.dependencies;
                      for (let c of u.values()) {
                        let $ = r.tryWorkspaceByDescriptor(c);
                        if (U = $ === null || !E.has($.anchoredLocator.locatorHash), !U) break
                      }
                    }
                    if (!!U && (H.add(T.anchoredDescriptor.descriptorHash), D.push(b(async () => {
                      let u = await w(T, {commandIndex: ++L});
                      return E.delete(x), H.delete(T.anchoredDescriptor.descriptorHash), u
                    })), !_)) break
                  }
                  if (D.length === 0) {
                    let x = Array.from(E.values()).map(T => Z.structUtils.prettyLocator(t, T.anchoredLocator)).join(", ");
                    g.reportError(be.MessageName.CYCLIC_DEPENDENCIES, `Dependency cycle detected (${x})`);
                    return
                  }
                  let l = (await Promise.all(D)).find(x => x !== 0);
                  k === null && (k = typeof l != "undefined" ? 1 : k), (this.topological || this.topologicalDev) && typeof l != "undefined" && g.reportError(be.MessageName.UNNAMED, "The command failed for workspaces that are depended upon by other workspaces; can't satisfy the dependency graph")
                }
              });
            return k !== null ? k : ie.exitCode()
          }
        };
      Ee.paths = [["workspaces", "foreach"]], Ee.usage = G.Command.Usage({
        category: "Workspace-related commands",
        description: "run a command on all workspaces",
        details: "\n      This command will run a given sub-command on current and all its descendant workspaces. Various flags can alter the exact behavior of the command:\n\n      - If `-p,--parallel` is set, the commands will be ran in parallel; they'll by default be limited to a number of parallel tasks roughly equal to half your core number, but that can be overridden via `-j,--jobs`, or disabled by setting `-j unlimited`.\n\n      - If `-p,--parallel` and `-i,--interlaced` are both set, Yarn will print the lines from the output as it receives them. If `-i,--interlaced` wasn't set, it would instead buffer the output from each process and print the resulting buffers only after their source processes have exited.\n\n      - If `-t,--topological` is set, Yarn will only run the command after all workspaces that it depends on through the `dependencies` field have successfully finished executing. If `--topological-dev` is set, both the `dependencies` and `devDependencies` fields will be considered when figuring out the wait points.\n\n      - If `-A,--all` is set, Yarn will run the command on all the workspaces of a project. By default yarn runs the command only on current and all its descendant workspaces.\n\n      - If `-R,--recursive` is set, Yarn will find workspaces to run the command on by recursively evaluating `dependencies` and `devDependencies` fields, instead of looking at the `workspaces` fields.\n\n      - If `--from` is set, Yarn will use the packages matching the 'from' glob as the starting point for any recursive search.\n\n      - If `--since` is set, Yarn will only run the command on workspaces that have been modified since the specified ref. By default Yarn will use the refs specified by the `changesetBaseRefs` configuration option.\n\n      - The command may apply to only some workspaces through the use of `--include` which acts as a whitelist. The `--exclude` flag will do the opposite and will be a list of packages that mustn't execute the script. Both flags accept glob patterns (if valid Idents and supported by [micromatch](https://github.com/micromatch/micromatch)). Make sure to escape the patterns, to prevent your own shell from trying to expand them.\n\n      Adding the `-v,--verbose` flag will cause Yarn to print more information; in particular the name of the workspace that generated the output will be printed at the front of each line.\n\n      If the command is `run` and the script being run does not exist the child workspace will be skipped without error.\n    ",
        examples: [["Publish current and all descendant packages", "yarn workspaces foreach npm publish --tolerate-republish"], ["Run build script on current and all descendant packages", "yarn workspaces foreach run build"], ["Run build script on current and all descendant packages in parallel, building package dependencies first", "yarn workspaces foreach -pt run build"], ["Run build script on several packages and all their dependencies, building dependencies first", "yarn workspaces foreach -ptR --from '{workspace-a,workspace-b}' run build"]]
      });
      var Er = Ee;

      function br(e, {prefix: t, interlaced: r}) {
        let n = e.createStreamReporter(t), s = new Z.miscUtils.DefaultStream;
        s.pipe(n, {end: !1}), s.on("finish", () => {
          n.end()
        });
        let a = new Promise(o => {
          n.on("finish", () => {
            o(s.active)
          })
        });
        if (r) return [s, a];
        let i = new Z.miscUtils.BufferStream;
        return i.pipe(s, {end: !1}), i.on("finish", () => {
          s.end()
        }), [i, a]
      }

      function zn(e, {configuration: t, commandIndex: r, verbose: n}) {
        if (!n) return null;
        let s = Z.structUtils.convertToIdent(e.locator),
          i = `[${Z.structUtils.stringifyIdent(s)}]:`,
          o = ["#2E86AB", "#A23B72", "#F18F01", "#C73E1D", "#CCE2A3"],
          h = o[r % o.length];
        return Z.formatUtils.pretty(t, i, h)
      }

      var Jn = {commands: [nt, Er]}, es = Jn;
      return Vn;
    })();
    /*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
    /*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    /*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
    return plugin;
  }
};
