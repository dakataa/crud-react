var En = Object.defineProperty;
var Cn = (e, t, n) => t in e ? En(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var le = (e, t, n) => Cn(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as u, Fragment as D, jsxs as w } from "react/jsx-runtime";
import et, { convertObjectToURLSearchParams as We, RequestBodyType as vn, convertURLSearchParamsToObject as xn, convertFormDataToObject as _n, Method as Nn } from "@dakataa/requester";
import * as C from "react";
import R, { memo as X, useState as U, useEffect as M, forwardRef as Ce, useRef as $, useImperativeHandle as tt, useReducer as wn } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { createPortal as Pn } from "react-dom";
import Sn from "lottie-web/build/player/esm/lottie.min.js";
import * as gt from "@popperjs/core";
class Ae {
  constructor(t = 0, n, r) {
    le(this, "code");
    le(this, "detail");
    le(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class ve extends Ae {
  constructor(n, r, a) {
    super(0, r, a);
    le(this, "status", 400);
    this.status = n;
  }
}
class Ln extends C.Component {
  constructor(n) {
    super(n);
    le(this, "promiseRejectionHandler", (n) => {
      n.reason instanceof Ae && this.setState({
        ...this.state,
        hasError: !0,
        error: n.reason
      });
    });
    this.state = {
      hasError: !1,
      error: null
    };
  }
  componentDidMount() {
    window.addEventListener("unhandledrejection", this.promiseRejectionHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.promiseRejectionHandler);
  }
  static getDerivedStateFromError(n) {
    return n instanceof Error && (n = new ve(0, n.message)), {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.log("error", n);
  }
  render() {
    return this.state.hasError ? C.cloneElement(
      this.props.fallback,
      {
        error: this.state.error,
        children: this.props.children
      }
    ) : this.props.children;
  }
}
const Rn = X(({ children: e }) => /* @__PURE__ */ u(D, { children: e })), An = X(({ error: e }) => (e ?? (e = new ve(404, "Page not found.")), /* @__PURE__ */ u(Rn, { children: /* @__PURE__ */ u("main", { children: /* @__PURE__ */ w("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ u("h1", { className: "display-1", children: e.status || "Error" }),
  /* @__PURE__ */ u("p", { className: "text-secondary", children: e.detail }),
  /* @__PURE__ */ u("br", {}),
  /* @__PURE__ */ u("div", { children: /* @__PURE__ */ u("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })));
var me = {}, yt;
function kn() {
  if (yt) return me;
  yt = 1, Object.defineProperty(me, "__esModule", { value: !0 }), me.parse = s, me.serialize = i;
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, t = /^[\u0021-\u003A\u003C-\u007E]*$/, n = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, r = /^[\u0020-\u003A\u003D-\u007E]*$/, a = Object.prototype.toString, o = /* @__PURE__ */ (() => {
    const d = function() {
    };
    return d.prototype = /* @__PURE__ */ Object.create(null), d;
  })();
  function s(d, E) {
    const f = new o(), h = d.length;
    if (h < 2)
      return f;
    const g = (E == null ? void 0 : E.decode) || m;
    let p = 0;
    do {
      const y = d.indexOf("=", p);
      if (y === -1)
        break;
      const v = d.indexOf(";", p), _ = v === -1 ? h : v;
      if (y > _) {
        p = d.lastIndexOf(";", y - 1) + 1;
        continue;
      }
      const P = l(d, p, y), k = c(d, y, P), T = d.slice(P, k);
      if (f[T] === void 0) {
        let j = l(d, y + 1, _), N = c(d, _, j);
        const S = g(d.slice(j, N));
        f[T] = S;
      }
      p = _ + 1;
    } while (p < h);
    return f;
  }
  function l(d, E, f) {
    do {
      const h = d.charCodeAt(E);
      if (h !== 32 && h !== 9)
        return E;
    } while (++E < f);
    return f;
  }
  function c(d, E, f) {
    for (; E > f; ) {
      const h = d.charCodeAt(--E);
      if (h !== 32 && h !== 9)
        return E + 1;
    }
    return f;
  }
  function i(d, E, f) {
    const h = (f == null ? void 0 : f.encode) || encodeURIComponent;
    if (!e.test(d))
      throw new TypeError(`argument name is invalid: ${d}`);
    const g = h(E);
    if (!t.test(g))
      throw new TypeError(`argument val is invalid: ${E}`);
    let p = d + "=" + g;
    if (!f)
      return p;
    if (f.maxAge !== void 0) {
      if (!Number.isInteger(f.maxAge))
        throw new TypeError(`option maxAge is invalid: ${f.maxAge}`);
      p += "; Max-Age=" + f.maxAge;
    }
    if (f.domain) {
      if (!n.test(f.domain))
        throw new TypeError(`option domain is invalid: ${f.domain}`);
      p += "; Domain=" + f.domain;
    }
    if (f.path) {
      if (!r.test(f.path))
        throw new TypeError(`option path is invalid: ${f.path}`);
      p += "; Path=" + f.path;
    }
    if (f.expires) {
      if (!b(f.expires) || !Number.isFinite(f.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${f.expires}`);
      p += "; Expires=" + f.expires.toUTCString();
    }
    if (f.httpOnly && (p += "; HttpOnly"), f.secure && (p += "; Secure"), f.partitioned && (p += "; Partitioned"), f.priority)
      switch (typeof f.priority == "string" ? f.priority.toLowerCase() : void 0) {
        case "low":
          p += "; Priority=Low";
          break;
        case "medium":
          p += "; Priority=Medium";
          break;
        case "high":
          p += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${f.priority}`);
      }
    if (f.sameSite)
      switch (typeof f.sameSite == "string" ? f.sameSite.toLowerCase() : f.sameSite) {
        case !0:
        case "strict":
          p += "; SameSite=Strict";
          break;
        case "lax":
          p += "; SameSite=Lax";
          break;
        case "none":
          p += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${f.sameSite}`);
      }
    return p;
  }
  function m(d) {
    if (d.indexOf("%") === -1)
      return d;
    try {
      return decodeURIComponent(d);
    } catch {
      return d;
    }
  }
  function b(d) {
    return a.call(d) === "[object Date]";
  }
  return me;
}
kn();
/**
 * react-router v7.3.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function I(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function K(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Ke({
  pathname: e = "/",
  search: t = "",
  hash: n = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function nt(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substring(n), e = e.substring(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substring(r), e = e.substring(0, r)), e && (t.pathname = e);
  }
  return t;
}
function kt(e, t, n = "/") {
  return On(e, t, n, !1);
}
function On(e, t, n, r) {
  let a = typeof t == "string" ? nt(t) : t, o = Z(a.pathname || "/", n);
  if (o == null)
    return null;
  let s = Ot(e);
  Tn(s);
  let l = null;
  for (let c = 0; l == null && c < s.length; ++c) {
    let i = Kn(o);
    l = Bn(
      s[c],
      i,
      r
    );
  }
  return l;
}
function Ot(e, t = [], n = [], r = "") {
  let a = (o, s, l) => {
    let c = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: s,
      route: o
    };
    c.relativePath.startsWith("/") && (I(
      c.relativePath.startsWith(r),
      `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
    ), c.relativePath = c.relativePath.slice(r.length));
    let i = q([r, c.relativePath]), m = n.concat(c);
    o.children && o.children.length > 0 && (I(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      o.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${i}".`
    ), Ot(o.children, t, m, i)), !(o.path == null && !o.index) && t.push({
      path: i,
      score: Un(i, o.index),
      routesMeta: m
    });
  };
  return e.forEach((o, s) => {
    var l;
    if (o.path === "" || !((l = o.path) != null && l.includes("?")))
      a(o, s);
    else
      for (let c of Tt(o.path))
        a(o, s, c);
  }), t;
}
function Tt(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t, a = n.endsWith("?"), o = n.replace(/\?$/, "");
  if (r.length === 0)
    return a ? [o, ""] : [o];
  let s = Tt(r.join("/")), l = [];
  return l.push(
    ...s.map(
      (c) => c === "" ? o : [o, c].join("/")
    )
  ), a && l.push(...s), l.map(
    (c) => e.startsWith("/") && c === "" ? "/" : c
  );
}
function Tn(e) {
  e.sort(
    (t, n) => t.score !== n.score ? n.score - t.score : Vn(
      t.routesMeta.map((r) => r.childrenIndex),
      n.routesMeta.map((r) => r.childrenIndex)
    )
  );
}
var Dn = /^:[\w-]+$/, $n = 3, Mn = 2, jn = 1, Fn = 10, In = -2, bt = (e) => e === "*";
function Un(e, t) {
  let n = e.split("/"), r = n.length;
  return n.some(bt) && (r += In), t && (r += Mn), n.filter((a) => !bt(a)).reduce(
    (a, o) => a + (Dn.test(o) ? $n : o === "" ? jn : Fn),
    r
  );
}
function Vn(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, a) => r === t[a]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Bn(e, t, n = !1) {
  let { routesMeta: r } = e, a = {}, o = "/", s = [];
  for (let l = 0; l < r.length; ++l) {
    let c = r[l], i = l === r.length - 1, m = o === "/" ? t : t.slice(o.length) || "/", b = ye(
      { path: c.relativePath, caseSensitive: c.caseSensitive, end: i },
      m
    ), d = c.route;
    if (!b && i && n && !r[r.length - 1].route.index && (b = ye(
      {
        path: c.relativePath,
        caseSensitive: c.caseSensitive,
        end: !1
      },
      m
    )), !b)
      return null;
    Object.assign(a, b.params), s.push({
      // TODO: Can this as be avoided?
      params: a,
      pathname: q([o, b.pathname]),
      pathnameBase: Jn(
        q([o, b.pathnameBase])
      ),
      route: d
    }), b.pathnameBase !== "/" && (o = q([o, b.pathnameBase]));
  }
  return s;
}
function Hn(e, t = {}) {
  let n = e;
  n.endsWith("*") && n !== "*" && !n.endsWith("/*") && (K(
    !1,
    `Route path "${n}" will be treated as if it were "${n.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${n.replace(/\*$/, "/*")}".`
  ), n = n.replace(/\*$/, "/*"));
  const r = n.startsWith("/") ? "/" : "", a = (s) => s == null ? "" : typeof s == "string" ? s : String(s), o = n.split(/\/+/).map((s, l, c) => {
    if (l === c.length - 1 && s === "*")
      return a(t["*"]);
    const m = s.match(/^:([\w-]+)(\??)$/);
    if (m) {
      const [, b, d] = m;
      let E = t[b];
      return I(d === "?" || E != null, `Missing ":${b}" param`), a(E);
    }
    return s.replace(/\?$/g, "");
  }).filter((s) => !!s);
  return r + o.join("/");
}
function ye(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Wn(
    e.path,
    e.caseSensitive,
    e.end
  ), a = t.match(n);
  if (!a) return null;
  let o = a[0], s = o.replace(/(.)\/+$/, "$1"), l = a.slice(1);
  return {
    params: r.reduce(
      (i, { paramName: m, isOptional: b }, d) => {
        if (m === "*") {
          let f = l[d] || "";
          s = o.slice(0, o.length - f.length).replace(/(.)\/+$/, "$1");
        }
        const E = l[d];
        return b && !E ? i[m] = void 0 : i[m] = (E || "").replace(/%2F/g, "/"), i;
      },
      {}
    ),
    pathname: o,
    pathnameBase: s,
    pattern: e
  };
}
function Wn(e, t = !1, n = !0) {
  K(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let r = [], a = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (s, l, c) => (r.push({ paramName: l, isOptional: c != null }), c ? "/?([^\\/]+)?" : "/([^\\/]+)")
  );
  return e.endsWith("*") ? (r.push({ paramName: "*" }), a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? a += "\\/*$" : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"), [new RegExp(a, t ? void 0 : "i"), r];
}
function Kn(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return K(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function Z(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function zn(e, t = "/") {
  let {
    pathname: n,
    search: r = "",
    hash: a = ""
  } = typeof e == "string" ? nt(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : Yn(n, t) : t,
    search: Gn(r),
    hash: Qn(a)
  };
}
function Yn(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((a) => {
    a === ".." ? n.length > 1 && n.pop() : a !== "." && n.push(a);
  }), n.length > 1 ? n.join("/") : "/";
}
function Me(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function qn(e) {
  return e.filter(
    (t, n) => n === 0 || t.route.path && t.route.path.length > 0
  );
}
function Dt(e) {
  let t = qn(e);
  return t.map(
    (n, r) => r === t.length - 1 ? n.pathname : n.pathnameBase
  );
}
function $t(e, t, n, r = !1) {
  let a;
  typeof e == "string" ? a = nt(e) : (a = { ...e }, I(
    !a.pathname || !a.pathname.includes("?"),
    Me("?", "pathname", "search", a)
  ), I(
    !a.pathname || !a.pathname.includes("#"),
    Me("#", "pathname", "hash", a)
  ), I(
    !a.search || !a.search.includes("#"),
    Me("#", "search", "hash", a)
  ));
  let o = e === "" || a.pathname === "", s = o ? "/" : a.pathname, l;
  if (s == null)
    l = n;
  else {
    let b = t.length - 1;
    if (!r && s.startsWith("..")) {
      let d = s.split("/");
      for (; d[0] === ".."; )
        d.shift(), b -= 1;
      a.pathname = d.join("/");
    }
    l = b >= 0 ? t[b] : "/";
  }
  let c = zn(a, l), i = s && s !== "/" && s.endsWith("/"), m = (o || s === ".") && n.endsWith("/");
  return !c.pathname.endsWith("/") && (i || m) && (c.pathname += "/"), c;
}
var q = (e) => e.join("/").replace(/\/\/+/g, "/"), Jn = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Gn = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Qn = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function Zn(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var Mt = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  Mt
);
var Xn = [
  "GET",
  ...Mt
];
new Set(Xn);
var ue = C.createContext(null);
ue.displayName = "DataRouter";
var ke = C.createContext(null);
ke.displayName = "DataRouterState";
var jt = C.createContext({
  isTransitioning: !1
});
jt.displayName = "ViewTransition";
var er = C.createContext(
  /* @__PURE__ */ new Map()
);
er.displayName = "Fetchers";
var tr = C.createContext(null);
tr.displayName = "Await";
var J = C.createContext(
  null
);
J.displayName = "Navigation";
var rt = C.createContext(
  null
);
rt.displayName = "Location";
var z = C.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
z.displayName = "Route";
var at = C.createContext(null);
at.displayName = "RouteError";
function nr(e, { relative: t } = {}) {
  I(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: n, navigator: r } = C.useContext(J), { hash: a, pathname: o, search: s } = xe(e, { relative: t }), l = o;
  return n !== "/" && (l = o === "/" ? n : q([n, o])), r.createHref({ pathname: l, search: s, hash: a });
}
function Oe() {
  return C.useContext(rt) != null;
}
function oe() {
  return I(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), C.useContext(rt).location;
}
var Ft = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function It(e) {
  C.useContext(J).static || C.useLayoutEffect(e);
}
function rr() {
  let { isDataRoute: e } = C.useContext(z);
  return e ? yr() : ar();
}
function ar() {
  I(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = C.useContext(ue), { basename: t, navigator: n } = C.useContext(J), { matches: r } = C.useContext(z), { pathname: a } = oe(), o = JSON.stringify(Dt(r)), s = C.useRef(!1);
  return It(() => {
    s.current = !0;
  }), C.useCallback(
    (c, i = {}) => {
      if (K(s.current, Ft), !s.current) return;
      if (typeof c == "number") {
        n.go(c);
        return;
      }
      let m = $t(
        c,
        JSON.parse(o),
        a,
        i.relative === "path"
      );
      e == null && t !== "/" && (m.pathname = m.pathname === "/" ? t : q([t, m.pathname])), (i.replace ? n.replace : n.push)(
        m,
        i.state,
        i
      );
    },
    [
      t,
      n,
      o,
      a,
      e
    ]
  );
}
C.createContext(null);
function or() {
  let { matches: e } = C.useContext(z), t = e[e.length - 1];
  return t ? t.params : {};
}
function xe(e, { relative: t } = {}) {
  let { matches: n } = C.useContext(z), { pathname: r } = oe(), a = JSON.stringify(Dt(n));
  return C.useMemo(
    () => $t(
      e,
      JSON.parse(a),
      r,
      t === "path"
    ),
    [e, a, r, t]
  );
}
function sr(e, t, n, r) {
  I(
    Oe(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: a, static: o } = C.useContext(J), { matches: s } = C.useContext(z), l = s[s.length - 1], c = l ? l.params : {}, i = l ? l.pathname : "/", m = l ? l.pathnameBase : "/", b = l && l.route;
  {
    let y = b && b.path || "";
    Ut(
      i,
      !b || y.endsWith("*") || y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${i}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y === "/" ? "*" : `${y}/*`}">.`
    );
  }
  let d = oe(), E;
  E = d;
  let f = E.pathname || "/", h = f;
  if (m !== "/") {
    let y = m.replace(/^\//, "").split("/");
    h = "/" + f.replace(/^\//, "").split("/").slice(y.length).join("/");
  }
  let g = !o && n && n.matches && n.matches.length > 0 ? n.matches : kt(e, { pathname: h });
  return K(
    b || g != null,
    `No routes matched location "${E.pathname}${E.search}${E.hash}" `
  ), K(
    g == null || g[g.length - 1].route.element !== void 0 || g[g.length - 1].route.Component !== void 0 || g[g.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${E.pathname}${E.search}${E.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), dr(
    g && g.map(
      (y) => Object.assign({}, y, {
        params: Object.assign({}, c, y.params),
        pathname: q([
          m,
          // Re-encode pathnames that were decoded inside matchRoutes
          a.encodeLocation ? a.encodeLocation(y.pathname).pathname : y.pathname
        ]),
        pathnameBase: y.pathnameBase === "/" ? m : q([
          m,
          // Re-encode pathnames that were decoded inside matchRoutes
          a.encodeLocation ? a.encodeLocation(y.pathnameBase).pathname : y.pathnameBase
        ])
      })
    ),
    s,
    n,
    r
  );
}
function ir() {
  let e = gr(), t = Zn(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, r = "rgba(200,200,200, 0.5)", a = { padding: "0.5rem", backgroundColor: r }, o = { padding: "2px 4px", backgroundColor: r }, s = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), s = /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ C.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ C.createElement("code", { style: o }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ C.createElement("code", { style: o }, "errorElement"), " prop on your route.")), /* @__PURE__ */ C.createElement(C.Fragment, null, /* @__PURE__ */ C.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ C.createElement("h3", { style: { fontStyle: "italic" } }, t), n ? /* @__PURE__ */ C.createElement("pre", { style: a }, n) : null, s);
}
var lr = /* @__PURE__ */ C.createElement(ir, null), cr = class extends C.Component {
  constructor(e) {
    super(e), this.state = {
      location: e.location,
      revalidation: e.revalidation,
      error: e.error
    };
  }
  static getDerivedStateFromError(e) {
    return { error: e };
  }
  static getDerivedStateFromProps(e, t) {
    return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
      error: e.error,
      location: e.location,
      revalidation: e.revalidation
    } : {
      error: e.error !== void 0 ? e.error : t.error,
      location: t.location,
      revalidation: e.revalidation || t.revalidation
    };
  }
  componentDidCatch(e, t) {
    console.error(
      "React Router caught the following error during render",
      e,
      t
    );
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ C.createElement(z.Provider, { value: this.props.routeContext }, /* @__PURE__ */ C.createElement(
      at.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function ur({ routeContext: e, match: t, children: n }) {
  let r = C.useContext(ue);
  return r && r.static && r.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (r.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ C.createElement(z.Provider, { value: e }, n);
}
function dr(e, t = [], n = null, r = null) {
  if (e == null) {
    if (!n)
      return null;
    if (n.errors)
      e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else
      return null;
  }
  let a = e, o = n == null ? void 0 : n.errors;
  if (o != null) {
    let c = a.findIndex(
      (i) => i.route.id && (o == null ? void 0 : o[i.route.id]) !== void 0
    );
    I(
      c >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        o
      ).join(",")}`
    ), a = a.slice(
      0,
      Math.min(a.length, c + 1)
    );
  }
  let s = !1, l = -1;
  if (n)
    for (let c = 0; c < a.length; c++) {
      let i = a[c];
      if ((i.route.HydrateFallback || i.route.hydrateFallbackElement) && (l = c), i.route.id) {
        let { loaderData: m, errors: b } = n, d = i.route.loader && !m.hasOwnProperty(i.route.id) && (!b || b[i.route.id] === void 0);
        if (i.route.lazy || d) {
          s = !0, l >= 0 ? a = a.slice(0, l + 1) : a = [a[0]];
          break;
        }
      }
    }
  return a.reduceRight((c, i, m) => {
    let b, d = !1, E = null, f = null;
    n && (b = o && i.route.id ? o[i.route.id] : void 0, E = i.route.errorElement || lr, s && (l < 0 && m === 0 ? (Ut(
      "route-fallback",
      !1,
      "No `HydrateFallback` element provided to render during initial hydration"
    ), d = !0, f = null) : l === m && (d = !0, f = i.route.hydrateFallbackElement || null)));
    let h = t.concat(a.slice(0, m + 1)), g = () => {
      let p;
      return b ? p = E : d ? p = f : i.route.Component ? p = /* @__PURE__ */ C.createElement(i.route.Component, null) : i.route.element ? p = i.route.element : p = c, /* @__PURE__ */ C.createElement(
        ur,
        {
          match: i,
          routeContext: {
            outlet: c,
            matches: h,
            isDataRoute: n != null
          },
          children: p
        }
      );
    };
    return n && (i.route.ErrorBoundary || i.route.errorElement || m === 0) ? /* @__PURE__ */ C.createElement(
      cr,
      {
        location: n.location,
        revalidation: n.revalidation,
        component: E,
        error: b,
        children: g(),
        routeContext: { outlet: null, matches: h, isDataRoute: !0 }
      }
    ) : g();
  }, null);
}
function ot(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function fr(e) {
  let t = C.useContext(ue);
  return I(t, ot(e)), t;
}
function mr(e) {
  let t = C.useContext(ke);
  return I(t, ot(e)), t;
}
function hr(e) {
  let t = C.useContext(z);
  return I(t, ot(e)), t;
}
function st(e) {
  let t = hr(e), n = t.matches[t.matches.length - 1];
  return I(
    n.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), n.route.id;
}
function pr() {
  return st(
    "useRouteId"
    /* UseRouteId */
  );
}
function gr() {
  var r;
  let e = C.useContext(at), t = mr(
    "useRouteError"
    /* UseRouteError */
  ), n = st(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n];
}
function yr() {
  let { router: e } = fr(
    "useNavigate"
    /* UseNavigateStable */
  ), t = st(
    "useNavigate"
    /* UseNavigateStable */
  ), n = C.useRef(!1);
  return It(() => {
    n.current = !0;
  }), C.useCallback(
    async (a, o = {}) => {
      K(n.current, Ft), n.current && (typeof a == "number" ? e.navigate(a) : await e.navigate(a, { fromRouteId: t, ...o }));
    },
    [e, t]
  );
}
var Et = {};
function Ut(e, t, n) {
  !t && !Et[e] && (Et[e] = !0, K(!1, n));
}
C.memo(br);
function br({
  routes: e,
  future: t,
  state: n
}) {
  return sr(e, void 0, n, t);
}
var Ne = "get", we = "application/x-www-form-urlencoded";
function Te(e) {
  return e != null && typeof e.tagName == "string";
}
function Er(e) {
  return Te(e) && e.tagName.toLowerCase() === "button";
}
function Cr(e) {
  return Te(e) && e.tagName.toLowerCase() === "form";
}
function vr(e) {
  return Te(e) && e.tagName.toLowerCase() === "input";
}
function xr(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function _r(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !xr(e);
}
var _e = null;
function Nr() {
  if (_e === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _e = !1;
    } catch {
      _e = !0;
    }
  return _e;
}
var wr = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function je(e) {
  return e != null && !wr.has(e) ? (K(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${we}"`
  ), null) : e;
}
function Pr(e, t) {
  let n, r, a, o, s;
  if (Cr(e)) {
    let l = e.getAttribute("action");
    r = l ? Z(l, t) : null, n = e.getAttribute("method") || Ne, a = je(e.getAttribute("enctype")) || we, o = new FormData(e);
  } else if (Er(e) || vr(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let c = e.getAttribute("formaction") || l.getAttribute("action");
    if (r = c ? Z(c, t) : null, n = e.getAttribute("formmethod") || l.getAttribute("method") || Ne, a = je(e.getAttribute("formenctype")) || je(l.getAttribute("enctype")) || we, o = new FormData(l, e), !Nr()) {
      let { name: i, type: m, value: b } = e;
      if (m === "image") {
        let d = i ? `${i}.` : "";
        o.append(`${d}x`, "0"), o.append(`${d}y`, "0");
      } else i && o.append(i, b);
    }
  } else {
    if (Te(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    n = Ne, r = null, a = we, s = e;
  }
  return o && a === "text/plain" && (s = o, o = void 0), { action: r, method: n.toLowerCase(), encType: a, formData: o, body: s };
}
function it(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
async function Sr(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let n = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = n, n;
  } catch (n) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(n), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function Lr(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function Rr(e, t, n) {
  let r = await Promise.all(
    e.map(async (a) => {
      let o = t.routes[a.route.id];
      if (o) {
        let s = await Sr(o, n);
        return s.links ? s.links() : [];
      }
      return [];
    })
  );
  return Tr(
    r.flat(1).filter(Lr).filter((a) => a.rel === "stylesheet" || a.rel === "preload").map(
      (a) => a.rel === "stylesheet" ? { ...a, rel: "prefetch", as: "style" } : { ...a, rel: "prefetch" }
    )
  );
}
function Ct(e, t, n, r, a, o) {
  let s = (c, i) => n[i] ? c.route.id !== n[i].route.id : !0, l = (c, i) => {
    var m;
    return (
      // param change, /users/123 -> /users/456
      n[i].pathname !== c.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((m = n[i].route.path) == null ? void 0 : m.endsWith("*")) && n[i].params["*"] !== c.params["*"]
    );
  };
  return o === "assets" ? t.filter(
    (c, i) => s(c, i) || l(c, i)
  ) : o === "data" ? t.filter((c, i) => {
    var b;
    let m = r.routes[c.route.id];
    if (!m || !m.hasLoader)
      return !1;
    if (s(c, i) || l(c, i))
      return !0;
    if (c.route.shouldRevalidate) {
      let d = c.route.shouldRevalidate({
        currentUrl: new URL(
          a.pathname + a.search + a.hash,
          window.origin
        ),
        currentParams: ((b = n[0]) == null ? void 0 : b.params) || {},
        nextUrl: new URL(e, window.origin),
        nextParams: c.params,
        defaultShouldRevalidate: !0
      });
      if (typeof d == "boolean")
        return d;
    }
    return !0;
  }) : [];
}
function Ar(e, t, { includeHydrateFallback: n } = {}) {
  return kr(
    e.map((r) => {
      let a = t.routes[r.route.id];
      if (!a) return [];
      let o = [a.module];
      return a.clientActionModule && (o = o.concat(a.clientActionModule)), a.clientLoaderModule && (o = o.concat(a.clientLoaderModule)), n && a.hydrateFallbackModule && (o = o.concat(a.hydrateFallbackModule)), a.imports && (o = o.concat(a.imports)), o;
    }).flat(1)
  );
}
function kr(e) {
  return [...new Set(e)];
}
function Or(e) {
  let t = {}, n = Object.keys(e).sort();
  for (let r of n)
    t[r] = e[r];
  return t;
}
function Tr(e, t) {
  let n = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((r, a) => {
    let o = JSON.stringify(Or(a));
    return n.has(o) || (n.add(o), r.push({ key: o, link: a })), r;
  }, []);
}
function Dr(e, t) {
  let n = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return n.pathname === "/" ? n.pathname = "_root.data" : t && Z(n.pathname, t) === "/" ? n.pathname = `${t.replace(/\/$/, "")}/_root.data` : n.pathname = `${n.pathname.replace(/\/$/, "")}.data`, n;
}
function Vt() {
  let e = C.useContext(ue);
  return it(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function $r() {
  let e = C.useContext(ke);
  return it(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var lt = C.createContext(void 0);
lt.displayName = "FrameworkContext";
function Bt() {
  let e = C.useContext(lt);
  return it(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function Mr(e, t) {
  let n = C.useContext(lt), [r, a] = C.useState(!1), [o, s] = C.useState(!1), { onFocus: l, onBlur: c, onMouseEnter: i, onMouseLeave: m, onTouchStart: b } = t, d = C.useRef(null);
  C.useEffect(() => {
    if (e === "render" && s(!0), e === "viewport") {
      let h = (p) => {
        p.forEach((y) => {
          s(y.isIntersecting);
        });
      }, g = new IntersectionObserver(h, { threshold: 0.5 });
      return d.current && g.observe(d.current), () => {
        g.disconnect();
      };
    }
  }, [e]), C.useEffect(() => {
    if (r) {
      let h = setTimeout(() => {
        s(!0);
      }, 100);
      return () => {
        clearTimeout(h);
      };
    }
  }, [r]);
  let E = () => {
    a(!0);
  }, f = () => {
    a(!1), s(!1);
  };
  return n ? e !== "intent" ? [o, d, {}] : [
    o,
    d,
    {
      onFocus: he(l, E),
      onBlur: he(c, f),
      onMouseEnter: he(i, E),
      onMouseLeave: he(m, f),
      onTouchStart: he(b, E)
    }
  ] : [!1, d, {}];
}
function he(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function jr({
  page: e,
  ...t
}) {
  let { router: n } = Vt(), r = C.useMemo(
    () => kt(n.routes, e, n.basename),
    [n.routes, e, n.basename]
  );
  return r ? /* @__PURE__ */ C.createElement(Ir, { page: e, matches: r, ...t }) : null;
}
function Fr(e) {
  let { manifest: t, routeModules: n } = Bt(), [r, a] = C.useState([]);
  return C.useEffect(() => {
    let o = !1;
    return Rr(e, t, n).then(
      (s) => {
        o || a(s);
      }
    ), () => {
      o = !0;
    };
  }, [e, t, n]), r;
}
function Ir({
  page: e,
  matches: t,
  ...n
}) {
  let r = oe(), { manifest: a, routeModules: o } = Bt(), { basename: s } = Vt(), { loaderData: l, matches: c } = $r(), i = C.useMemo(
    () => Ct(
      e,
      t,
      c,
      a,
      r,
      "data"
    ),
    [e, t, c, a, r]
  ), m = C.useMemo(
    () => Ct(
      e,
      t,
      c,
      a,
      r,
      "assets"
    ),
    [e, t, c, a, r]
  ), b = C.useMemo(() => {
    if (e === r.pathname + r.search + r.hash)
      return [];
    let f = /* @__PURE__ */ new Set(), h = !1;
    if (t.forEach((p) => {
      var v;
      let y = a.routes[p.route.id];
      !y || !y.hasLoader || (!i.some((_) => _.route.id === p.route.id) && p.route.id in l && ((v = o[p.route.id]) != null && v.shouldRevalidate) || y.hasClientLoader ? h = !0 : f.add(p.route.id));
    }), f.size === 0)
      return [];
    let g = Dr(e, s);
    return h && f.size > 0 && g.searchParams.set(
      "_routes",
      t.filter((p) => f.has(p.route.id)).map((p) => p.route.id).join(",")
    ), [g.pathname + g.search];
  }, [
    s,
    l,
    r,
    a,
    i,
    t,
    e,
    o
  ]), d = C.useMemo(
    () => Ar(m, a),
    [m, a]
  ), E = Fr(m);
  return /* @__PURE__ */ C.createElement(C.Fragment, null, b.map((f) => /* @__PURE__ */ C.createElement("link", { key: f, rel: "prefetch", as: "fetch", href: f, ...n })), d.map((f) => /* @__PURE__ */ C.createElement("link", { key: f, rel: "modulepreload", href: f, ...n })), E.map(({ key: f, link: h }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ C.createElement("link", { key: f, ...h })
  )));
}
function Ur(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var Ht = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  Ht && (window.__reactRouterVersion = "7.3.0");
} catch {
}
var Wt = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ct = C.forwardRef(
  function({
    onClick: t,
    discover: n = "render",
    prefetch: r = "none",
    relative: a,
    reloadDocument: o,
    replace: s,
    state: l,
    target: c,
    to: i,
    preventScrollReset: m,
    viewTransition: b,
    ...d
  }, E) {
    let { basename: f } = C.useContext(J), h = typeof i == "string" && Wt.test(i), g, p = !1;
    if (typeof i == "string" && h && (g = i, Ht))
      try {
        let N = new URL(window.location.href), S = i.startsWith("//") ? new URL(N.protocol + i) : new URL(i), A = Z(S.pathname, f);
        S.origin === N.origin && A != null ? i = A + S.search + S.hash : p = !0;
      } catch {
        K(
          !1,
          `<Link to="${i}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let y = nr(i, { relative: a }), [v, _, P] = Mr(
      r,
      d
    ), k = Wr(i, {
      replace: s,
      state: l,
      target: c,
      preventScrollReset: m,
      relative: a,
      viewTransition: b
    });
    function T(N) {
      t && t(N), N.defaultPrevented || k(N);
    }
    let j = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ C.createElement(
        "a",
        {
          ...d,
          ...P,
          href: g || y,
          onClick: p || o ? t : T,
          ref: Ur(E, _),
          target: c,
          "data-discover": !h && n === "render" ? "true" : void 0
        }
      )
    );
    return v && !h ? /* @__PURE__ */ C.createElement(C.Fragment, null, j, /* @__PURE__ */ C.createElement(jr, { page: y })) : j;
  }
);
ct.displayName = "Link";
var Vr = C.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: a = !1,
    style: o,
    to: s,
    viewTransition: l,
    children: c,
    ...i
  }, m) {
    let b = xe(s, { relative: i.relative }), d = oe(), E = C.useContext(ke), { navigator: f, basename: h } = C.useContext(J), g = E != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    Jr(b) && l === !0, p = f.encodeLocation ? f.encodeLocation(b).pathname : b.pathname, y = d.pathname, v = E && E.navigation && E.navigation.location ? E.navigation.location.pathname : null;
    n || (y = y.toLowerCase(), v = v ? v.toLowerCase() : null, p = p.toLowerCase()), v && h && (v = Z(v, h) || v);
    const _ = p !== "/" && p.endsWith("/") ? p.length - 1 : p.length;
    let P = y === p || !a && y.startsWith(p) && y.charAt(_) === "/", k = v != null && (v === p || !a && v.startsWith(p) && v.charAt(p.length) === "/"), T = {
      isActive: P,
      isPending: k,
      isTransitioning: g
    }, j = P ? t : void 0, N;
    typeof r == "function" ? N = r(T) : N = [
      r,
      P ? "active" : null,
      k ? "pending" : null,
      g ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let S = typeof o == "function" ? o(T) : o;
    return /* @__PURE__ */ C.createElement(
      ct,
      {
        ...i,
        "aria-current": j,
        className: N,
        ref: m,
        style: S,
        to: s,
        viewTransition: l
      },
      typeof c == "function" ? c(T) : c
    );
  }
);
Vr.displayName = "NavLink";
var Br = C.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: n,
    reloadDocument: r,
    replace: a,
    state: o,
    method: s = Ne,
    action: l,
    onSubmit: c,
    relative: i,
    preventScrollReset: m,
    viewTransition: b,
    ...d
  }, E) => {
    let f = Yr(), h = qr(l, { relative: i }), g = s.toLowerCase() === "get" ? "get" : "post", p = typeof l == "string" && Wt.test(l), y = (v) => {
      if (c && c(v), v.defaultPrevented) return;
      v.preventDefault();
      let _ = v.nativeEvent.submitter, P = (_ == null ? void 0 : _.getAttribute("formmethod")) || s;
      f(_ || v.currentTarget, {
        fetcherKey: t,
        method: P,
        navigate: n,
        replace: a,
        state: o,
        relative: i,
        preventScrollReset: m,
        viewTransition: b
      });
    };
    return /* @__PURE__ */ C.createElement(
      "form",
      {
        ref: E,
        method: g,
        action: h,
        onSubmit: r ? c : y,
        ...d,
        "data-discover": !p && e === "render" ? "true" : void 0
      }
    );
  }
);
Br.displayName = "Form";
function Hr(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Kt(e) {
  let t = C.useContext(ue);
  return I(t, Hr(e)), t;
}
function Wr(e, {
  target: t,
  replace: n,
  state: r,
  preventScrollReset: a,
  relative: o,
  viewTransition: s
} = {}) {
  let l = rr(), c = oe(), i = xe(e, { relative: o });
  return C.useCallback(
    (m) => {
      if (_r(m, t)) {
        m.preventDefault();
        let b = n !== void 0 ? n : Ke(c) === Ke(i);
        l(e, {
          replace: b,
          state: r,
          preventScrollReset: a,
          relative: o,
          viewTransition: s
        });
      }
    },
    [
      c,
      l,
      i,
      n,
      r,
      t,
      e,
      a,
      o,
      s
    ]
  );
}
var Kr = 0, zr = () => `__${String(++Kr)}__`;
function Yr() {
  let { router: e } = Kt(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = C.useContext(J), n = pr();
  return C.useCallback(
    async (r, a = {}) => {
      let { action: o, method: s, encType: l, formData: c, body: i } = Pr(
        r,
        t
      );
      if (a.navigate === !1) {
        let m = a.fetcherKey || zr();
        await e.fetch(m, n, a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: c,
          body: i,
          formMethod: a.method || s,
          formEncType: a.encType || l,
          flushSync: a.flushSync
        });
      } else
        await e.navigate(a.action || o, {
          preventScrollReset: a.preventScrollReset,
          formData: c,
          body: i,
          formMethod: a.method || s,
          formEncType: a.encType || l,
          replace: a.replace,
          state: a.state,
          fromRouteId: n,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition
        });
    },
    [e, t, n]
  );
}
function qr(e, { relative: t } = {}) {
  let { basename: n } = C.useContext(J), r = C.useContext(z);
  I(r, "useFormAction must be used inside a RouteContext");
  let [a] = r.matches.slice(-1), o = { ...xe(e || ".", { relative: t }) }, s = oe();
  if (e == null) {
    o.search = s.search;
    let l = new URLSearchParams(o.search), c = l.getAll("index");
    if (c.some((m) => m === "")) {
      l.delete("index"), c.filter((b) => b).forEach((b) => l.append("index", b));
      let m = l.toString();
      o.search = m ? `?${m}` : "";
    }
  }
  return (!e || e === ".") && a.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (o.pathname = o.pathname === "/" ? n : q([n, o.pathname])), Ke(o);
}
function Jr(e, t = {}) {
  let n = C.useContext(jt);
  I(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Kt(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), a = xe(e, { relative: t.relative });
  if (!n.isTransitioning)
    return !1;
  let o = Z(n.currentLocation.pathname, r) || n.currentLocation.pathname, s = Z(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return ye(a.pathname, s) != null || ye(a.pathname, o) != null;
}
new TextEncoder();
const Gr = ({ children: e }) => /* @__PURE__ */ u(D, { children: e }), W = X(({ name: e, children: t, data: n, parent: r, render: a }) => (t = R.Children.toArray((a ? a(n, r) : t) || []).map((o) => (R.isValidElement(o) && o.type === Gr && (o = R.cloneElement(o, { children: r })), o)), /* @__PURE__ */ u(D, { children: t }))), B = X(({ name: e, content: t, children: n, data: r }) => {
  const a = R.Children.toArray(t).find((l) => R.isValidElement(l) && l.type === W && l.props.name === e);
  let o = null;
  a && R.isValidElement(a) && (o = R.cloneElement(a, { parent: n, data: r }));
  const s = R.Children.toArray(n).filter((l) => R.isValidElement(l) && l.type !== W);
  return /* @__PURE__ */ u(D, { children: o || (s.length ? s : n) });
}), zt = R.createContext({});
function Yt() {
  return R.useContext(zt);
}
function Qr({ config: e, ...t }) {
  return /* @__PURE__ */ u(zt.Provider, { value: e, children: t.children });
}
window.history.pushState = new Proxy(window.history.pushState, {
  apply: (e, t, n) => {
    e.apply(t, n), window.dispatchEvent(new Event("pushstate"));
  }
});
window.history.replaceState = new Proxy(window.history.replaceState, {
  apply: (e, t, n) => {
    e.apply(t, n), window.dispatchEvent(new Event("replacestate"));
  }
});
const vt = "actions", qt = R.createContext(void 0);
function ee() {
  const e = R.useContext(qt), t = Yt(), { actions: n, location: r, setLocation: a } = e ?? {
    actions: null,
    location: new URL(document.location.href),
    setLocation: () => {
    }
  }, o = (g, p, y) => n == null ? void 0 : n.filter((v) => v.entity === g && v.name === p && (y === void 0 || v.namespace === y)).shift(), s = (g) => n == null ? void 0 : n.find((p) => {
    var y;
    return ((y = p.route) == null ? void 0 : y.path) && h(p.route.path, g);
  }), l = (g) => {
    const p = () => {
      var _;
      const y = s(g);
      if (!y)
        return null;
      const v = h(((_ = y.route) == null ? void 0 : _.path) || "", g);
      return {
        action: y,
        parameters: v == null ? void 0 : v.params
      };
    };
    return new Promise((y) => {
      let v = 0;
      const _ = () => {
        if (v > 10)
          throw new Ae(0, "Cannot load routes");
        if (e)
          return y(p());
        setTimeout(_, 200), v++;
      };
      _();
    });
  }, c = (g) => g.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), i = (g, p = void 0) => Hn(c(g), p), m = (g, p) => g ? i(g.path, { ...g.defaults || {}, ...p }) : "#", b = (g) => {
    const p = o(g.action.entity, g.action.name, g.action.namespace);
    return m(p == null ? void 0 : p.route, g.parameters);
  }, d = (g, p) => {
    const y = m(g, p);
    return E(y);
  }, E = (g) => {
    var p;
    return (p = t.link) != null && p.prefix && (g = "/" + t.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + g), g;
  }, f = (g) => {
    try {
      history.pushState(null, "", g);
    } catch {
      window.location.assign(g);
    }
  }, h = (g, p) => ye(c(g), p);
  return {
    getAction: o,
    getActionByPath: s,
    getOnClickActionByPath: l,
    navigate: f,
    location: r,
    matchPath: h,
    generateRoute: m,
    generateRoutePath: i,
    crudToReactPathPattern: c,
    generateActionLink: b,
    generateLink: d
  };
}
function Zr(e) {
  let t = null;
  try {
    const s = sessionStorage.getItem(vt);
    t = JSON.parse(atob(s || ""));
  } catch {
  }
  const [n, r] = U(t), [a, o] = U(new URL(document.location.href));
  return M(() => {
    if (a && a.toString() !== document.location.toString())
      try {
        history.pushState(null, "", a);
      } catch {
        window.location.assign(a);
      }
  }, [a.toString()]), M(() => {
    const s = () => {
      o(new URL(document.location.href));
    };
    return window.addEventListener("pushstate", s), window.addEventListener("replacestate", s), window.addEventListener("popstate", s), () => {
      window.removeEventListener("pushstate", s), window.removeEventListener("replacestate", s), window.removeEventListener("popstate", s);
    };
  }, []), M(() => {
    t || Ee().get({ url: "/_crud/actions" }).then(({ status: s, data: l }) => {
      s === 200 && (sessionStorage.setItem(vt, btoa(JSON.stringify(l))), r(l));
    }).catch((s) => {
      console.log("error", s);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ u(qt.Provider, { value: {
    actions: n,
    location: a,
    setLocation: o
  }, children: e.children });
}
function Xr(e) {
  return (t) => {
    const n = R.createElement(e, t);
    return /* @__PURE__ */ u(Zr, { children: n });
  };
}
const Jt = R.createContext(null);
function ut() {
  const e = R.useContext(Jt);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const De = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), Gt = Ce(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: a,
  onSubmit: o,
  onReset: s,
  ...l
}, c) => {
  const i = $(null), m = {
    response: null,
    constraints: {},
    errors: {}
  }, b = {
    getFormData: () => new FormData(i.current || void 0),
    setFormData: (h) => {
      var g;
      [...((g = i.current) == null ? void 0 : g.elements) || []].forEach((p) => {
        const y = h.get(p.name);
        switch (p.tagName.toLowerCase()) {
          case "select": {
            p.multiple ? [...p.options].forEach((v) => {
              v.selected = h.getAll(p.name).includes(v.value);
            }) : p.value = y;
            break;
          }
          default:
            switch (p.type) {
              case "checkbox":
                p.checked = !!y;
                break;
              default:
                p.value = y;
                break;
            }
        }
      });
    },
    setErrors: (h) => {
      const [, g] = E;
      g({ action: "errors", payload: h });
    },
    reset: () => {
      var h;
      (h = i.current) == null || h.reset();
    },
    submit: () => {
      var h;
      return (h = i.current) == null ? void 0 : h.requestSubmit();
    }
  };
  tt(c, () => b), M(() => {
    const h = () => {
      s && s();
    }, g = i == null ? void 0 : i.current;
    return g == null || g.addEventListener("reset", h), () => {
      g == null || g.removeEventListener("reset", h);
    };
  }, []);
  const d = (h, g) => {
    const p = b.getFormData();
    for (const y of g)
      if (!y.isValid(p.get(h) || null))
        return { valid: !1, message: y.getMessage() };
    return { valid: !0, message: null };
  }, E = wn((h, g) => {
    const { action: p, payload: y } = g;
    switch (p) {
      case "constraints": {
        const { name: v, constraints: _ } = y;
        return {
          ...h,
          constraints: {
            ...h.constraints || {},
            [v]: _
          }
        };
      }
      case "validate": {
        const { valid: v, message: _ } = d(y, h.constraints[y] || []), P = h.errors || {}, k = y;
        return v ? delete P[k] : P[k] = [...P[k] || [], { message: _ || "Error" }], Object.keys(P).length ? {
          ...h,
          errors: P
        } : h;
      }
      case "response":
        return {
          ...h,
          response: y
        };
      case "errors":
        return {
          ...h,
          errors: y || []
        };
      case "error": {
        const v = { ...h.errors, ...y };
        return {
          ...h,
          errors: v
        };
      }
    }
    return h;
  }, m), f = (h) => {
    h.preventDefault();
    const [g, p] = E;
    let y = {};
    for (const [_, P] of Object.entries(g.constraints)) {
      const { valid: k, message: T } = d(_, P);
      k || (y[_] = [T]);
    }
    if (Object.values(y).length) {
      p({ action: "errors", payload: y });
      return;
    }
    const v = new FormData((i == null ? void 0 : i.current) || void 0);
    if (a && a(v), o) {
      o(v);
      return;
    }
  };
  return /* @__PURE__ */ u(Jt.Provider, { value: [E, c, i], children: /* @__PURE__ */ u("form", { id: e, ref: i, onSubmit: f, ...l, children: t }) });
}), ea = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: a,
  choiceLabelTransform: o,
  ...s
}) => {
  t = t || [];
  const [[l, c], i] = ut(), m = $(null), d = !!((l == null ? void 0 : l.errors[e.full_name]) || []).length, E = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  M(() => {
    c({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const f = (h) => {
    c({ action: "validate", payload: e.full_name }), r && r(h);
  };
  return e != null && e.expanded ? /* @__PURE__ */ u(D, { children: Object.values(e.choices || []).map(
    (h, g) => {
      var P;
      const p = De(e.full_name, g), y = a ? a(h) : h.value, v = o ? o(h) : h.label || y, _ = {
        id: p,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(h) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ w(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ u(
              "input",
              {
                ref: m,
                defaultValue: y,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (P = e == null ? void 0 : e.data) == null ? void 0 : P.includes(y),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: p,
                className: "form-check-input",
                ..._,
                onChange: (k) => {
                  var T, j;
                  return f({
                    value: (e != null && e.multiple ? (T = i == null ? void 0 : i.current) == null ? void 0 : T.getFormData().getAll(e == null ? void 0 : e.full_name) : (j = i == null ? void 0 : i.current) == null ? void 0 : j.getFormData().get(e == null ? void 0 : e.full_name)) || k.target.value,
                    targetValue: k.target.value,
                    checked: k.target.checked
                  });
                }
              },
              E
            ),
            /* @__PURE__ */ u(
              "label",
              {
                htmlFor: _.id,
                className: "form-check-label",
                children: v
              }
            )
          ]
        },
        g
      );
    }
  ) }) : /* @__PURE__ */ u(D, { children: /* @__PURE__ */ w(
    "select",
    {
      ref: m,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": d,
      onChange: (h) => {
        var g, p;
        return f({
          value: (e.multiple ? (g = i == null ? void 0 : i.current) == null ? void 0 : g.getFormData().getAll(e.full_name) : (p = i == null ? void 0 : i.current) == null ? void 0 : p.getFormData().get(e.full_name)) || h.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...d ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ u("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (h, g) => /* @__PURE__ */ u(
            "option",
            {
              value: h.value || h.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(h) : e.choice_attr),
              children: h.label
            },
            g
          )
        )
      ]
    },
    E
  ) });
}, Qt = ({ name: e, className: t }) => {
  const [[n]] = ut(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ u("div", { className: t, children: r.map((a, o) => /* @__PURE__ */ u("span", { children: a.message }, o)) }) : /* @__PURE__ */ u(D, {});
}, ze = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), ta = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((a) => a.toLowerCase()), n && t.unshift(ze(n)), r && t.push(ze(r)), t.join(" ");
}, na = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || ta(e.name), a = ["checkbox", "radio"].includes(e.type || "input");
  return /* @__PURE__ */ w(
    "div",
    {
      className: [...(n == null ? void 0 : n.split(" ")) || [], "mb-3", a && "form-check"].filter((o) => o).join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      children: [
        !a && /* @__PURE__ */ u(
          "label",
          {
            className: "form-label",
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        t,
        a && /* @__PURE__ */ u(
          "label",
          {
            className: "form-check-label",
            htmlFor: e.id || De(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ u(Qt, { name: e.full_name, className: "invalid-feedback" }),
        e.help && /* @__PURE__ */ u(
          "div",
          {
            className: "form-help",
            ...e.help_attr && (e.help_attr instanceof Function ? e.help_attr() : e.help_attr),
            children: e.help
          }
        )
      ]
    }
  );
}, ra = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[a, o]] = ut(), s = $(null), l = (a == null ? void 0 : a.errors[e.full_name]) || [];
  M(() => {
    o({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const c = (d) => {
    o({ action: "validate", payload: e.full_name }), r && r(d);
  }, m = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", b = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ u(D, { children: /* @__PURE__ */ u(
    "input",
    {
      ref: s,
      id: e.id || De(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !l.length,
      onKeyUp: (d) => c({ value: d.target.value }),
      onChange: (d) => c({ value: d.target.value }),
      className: [m, ...l.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    b
  ) });
}, aa = ({
  view: e
}) => /* @__PURE__ */ u(na, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ u(ea, { view: e });
    default:
      return /* @__PURE__ */ u(ra, { view: e });
  }
})() }), xt = ({ children: e }) => /* @__PURE__ */ u(D, { children: e }), ae = X(({ namespace: e, view: t, prefix: n, children: r, props: a, data: o }) => {
  t = t.split(/[._]/).map((E) => ze(E)).join("");
  const { templates: s } = Yt(), l = ["crud", e, n, t].filter((E) => E).join("/") + ".tsx", [c, i] = Object.entries(s ?? {}).filter(([E, f]) => E.endsWith(l)).shift() || [], [m, b] = U(1), d = $(xt);
  return M(() => {
    if (i === void 0)
      return () => {
      };
    i().then((E) => {
      d.current = E.default, b(m + 1);
    });
  }, []), /* @__PURE__ */ u(d.current, { ...a, view: t, controller: e, viewName: t, data: o, parent: r, children: (!i || d.current !== xt) && r });
}), dt = X(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ u(
  ae,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ u(dt, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ u(aa, { view: e }, e.id)
  },
  e.id
)), Zt = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: a = !1 }) => /* @__PURE__ */ u(D, { children: r && r }), $e = Ce(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ u("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ u(Zt, { preload: t, ...n, children: e }) })), oa = R.createContext(null);
function sa() {
  return R.useContext(oa);
}
const Xt = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r, generateRoute: a } = ee();
  e = r(e.entity, e.name, e.namespace) || e;
  const [o, s] = U(), [l, c] = U(t || null);
  $(null);
  const [i, m] = U(n instanceof URLSearchParams ? n : We(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(l || {}).map(([f, h]) => f + "-" + h), (i instanceof URLSearchParams ? i : We(i)).toString()].filter((f) => f).join("."))), $({});
  const [b, d] = U(1), E = () => {
    e && Ee().get({
      url: a(e.route, l ?? null),
      query: i
    }).then(({ status: f, data: h }) => {
      switch (f) {
        case 201:
        case 200: {
          s(h);
          break;
        }
        default: {
          const g = h;
          throw new ve(g.status, g.detail, g.trace);
        }
      }
    });
  };
  return M(() => {
    E();
  }, [JSON.stringify(l), i.toString(), b]), {
    results: o,
    setParameters: c,
    setQueryParameters: (f) => {
      m(new URLSearchParams(f));
    },
    refresh: () => {
      E();
    }
  };
}, Ye = X(({ children: e }) => /* @__PURE__ */ u(D, { children: e })), ia = Ce(({ name: e, data: t, action: n, parameters: r, onSuccess: a, onError: o, onLoad: s, children: l, embedded: c = !1 }, i) => {
  var k, T, j, N, S;
  const [m, b] = U(!1), { navigate: d, generateLink: E, generateRoute: f } = ee(), h = f(n.route, r || {}), g = $(null), p = sa(), [y, v] = U();
  tt(i, () => ({
    getData: () => y,
    getFormRef: () => g.current
  }));
  const _ = (A) => {
    var x, O;
    let F = {
      ...(x = A.errors) != null && x.length ? { [A.full_name]: A.errors } : {}
    };
    for (let [, L] of Object.entries((A == null ? void 0 : A.children) || []))
      L.children && Object.values(L.children).length ? F = { ...F, ..._(L) } : (O = L.errors) != null && O.length && (F[L.full_name] = L.errors);
    return F;
  }, P = (A) => {
    b(!0), Ee().post({ url: h, body: A, bodyType: vn.FormData }).then(({ status: F, data: x }) => {
      var L;
      if (![200, 201, 400].includes(F))
        return Promise.reject(x);
      v(x);
      const O = _(x.form.modify.view);
      if (Object.entries(O).length) {
        (L = g.current) == null || L.setErrors(O);
        return;
      }
      a && a(x), x.redirect && !c && d(E(x.redirect.route, { ...r || {}, ...x.redirect.parameters }));
    }).catch((F) => {
      o && o(F);
    }).finally(() => {
      b(!1);
    });
  };
  return M(() => {
    s && s();
  }, []), t = (p == null ? void 0 : p.results) ?? t, M(() => {
    v(t);
  }, [JSON.stringify(t)]), y && /* @__PURE__ */ w(D, { children: [
    Object.keys((y == null ? void 0 : y.messages) || {}).map((A, F) => /* @__PURE__ */ u("div", { className: ["alert", "alert-" + A].join(" "), children: ((y == null ? void 0 : y.messages[A]) || ["Item was saved successful."]).join(" ") }, "alert-" + A)),
    /* @__PURE__ */ w(Gt, { id: (j = (T = (k = y == null ? void 0 : y.form) == null ? void 0 : k.modify) == null ? void 0 : T.view) == null ? void 0 : j.id, ref: g, action: h, method: "POST", onSubmit: P, children: [
      ((S = (N = y == null ? void 0 : y.form) == null ? void 0 : N.modify) == null ? void 0 : S.view) !== void 0 && /* @__PURE__ */ w(D, { children: [
        /* @__PURE__ */ u(
          dt,
          {
            name: e,
            namespace: n.namespace,
            view: y.form.modify.view
          },
          y.form.modify.view.id
        ),
        /* @__PURE__ */ u(Qt, { name: y.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ u(B, { name: "actions", content: l, data: { formRef: g }, children: /* @__PURE__ */ u($e, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ u(Ye, { children: "Save" }) }) })
    ] })
  ] });
}), en = Ce(({
  children: e,
  open: t = !0,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: a = !0,
  size: o,
  onClose: s,
  className: l
}, c) => {
  const [i, m] = U(t);
  tt(c, () => ({
    toggle: () => m(!i),
    open: () => m(!0),
    close: () => h(),
    isOpen: () => i
  })), M(() => {
    m(t);
  }, [t]);
  const b = (g) => {
    if (a)
      switch (g.key) {
        case "Escape": {
          h();
          break;
        }
      }
  };
  M(() => {
    var y;
    if (!i)
      return;
    const g = () => {
      var v;
      (v = d.current) == null || v.addEventListener("animationend", p);
    }, p = () => {
      var v, _, P;
      (v = d.current) == null || v.classList.remove(n), (_ = d.current) == null || _.removeEventListener("animationstart", g), (P = d.current) == null || P.removeEventListener("animationend", p);
    };
    return setTimeout(() => {
      var v, _;
      (v = d.current) == null || v.classList.add("d-block", "show"), (_ = E == null ? void 0 : E.current) == null || _.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", b), (y = d.current) == null || y.addEventListener("animationstart", g), () => {
      var v, _;
      document.removeEventListener("keydown", b), (v = d.current) == null || v.removeEventListener("animationstart", g), (_ = d.current) == null || _.removeEventListener("animationend", p);
    };
  }, [i]);
  const d = $(null), E = $(null), f = () => {
    m(!1), s && s();
  }, h = () => new Promise((g, p) => {
    var v, _;
    if (!i)
      return g();
    const y = () => {
      var P;
      (P = d == null ? void 0 : d.current) == null || P.classList.remove("show", "d-block"), g(), f();
    };
    if (n) {
      const P = setTimeout(() => {
        y();
      }, n ? 50 : 0);
      (v = d.current) == null || v.addEventListener("animationstart", () => {
        var k, T;
        clearTimeout(P), (k = d.current) == null || k.removeEventListener("animationend", y), (T = d.current) == null || T.addEventListener("animationend", y);
      }), (_ = d.current) == null || _.classList.add(n, "close");
    } else
      y();
  });
  return i && Pn(/* @__PURE__ */ w(D, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        ref: d,
        className: ["modal", o && "modal-" + o, n && n, l].filter((g) => g).join(" "),
        children: /* @__PURE__ */ u("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ w("div", { className: "modal-content", children: [
          /* @__PURE__ */ u(B, { name: "header", content: e, data: null, children: /* @__PURE__ */ w("div", { className: "modal-header", children: [
            /* @__PURE__ */ u("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ u(B, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ u("button", { onClick: h, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ u("div", { className: "modal-body", children: /* @__PURE__ */ u(B, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ u(B, { name: "footer", content: e, data: null, children: /* @__PURE__ */ u("div", { className: "modal-footer", children: /* @__PURE__ */ u(B, { name: "actions", content: e, data: null, children: /* @__PURE__ */ u("button", { onClick: h, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ u(
      "div",
      {
        ref: E,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((g) => g).join(" ")
      }
    )
  ] }), document.body);
}), la = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: a,
  className: o,
  ...s
}) => {
  const l = $(null);
  return M(() => {
    if (!l.current)
      return;
    const c = Sn.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: e,
      path: t,
      container: l.current,
      ...n || {}
    });
    return () => {
      c.destroy();
    };
  }, []), /* @__PURE__ */ u("div", { className: o, ref: l, style: { width: r, height: a } });
}, tn = R.createContext(void 0);
var be = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(be || {});
function nn() {
  const e = R.useContext(tn);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function ca(e) {
  var m;
  const [t, n] = U(), r = $(0), a = $(void 0), [o, s] = U(null);
  M(() => {
    r.current += 1;
  }, [t]);
  const l = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), c = (b) => {
    var f, h;
    let d = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...b || {}
    };
    const E = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(E, d.icon)) {
      const g = E[d.icon], p = Object.keys(l).filter((y) => y.endsWith(g)).pop();
      p && l[p]().then((y) => {
        s(y.default);
      });
    }
    !d.actions && !d.timeoutProgress && (d.actions = {
      cancel: {
        label: "Cancel",
        classList: ["btn-outline-primary"]
      },
      confirm: {
        label: "Confirm"
      }
    }), (f = a.current) != null && f.isOpen() ? (h = a.current) == null || h.close().finally(() => {
      n(d);
    }) : n(d);
  }, i = (b) => {
    var E;
    const d = {
      [b]: !0,
      isConfirmed: b === "confirm",
      isCancelled: b === "cancel",
      isDenied: b === "deny"
    };
    t != null && t.onResult && t.onResult(d), (E = a.current) == null || E.close().then(() => {
      s(null), n(void 0);
    });
  };
  return /* @__PURE__ */ w(tn.Provider, { value: { open: c }, children: [
    e.children,
    t && /* @__PURE__ */ w(en, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: a, children: [
      /* @__PURE__ */ u(W, { name: "header" }),
      /* @__PURE__ */ u(W, { name: "footer" }),
      /* @__PURE__ */ u(W, { name: "content", children: /* @__PURE__ */ w("div", { className: "d-flex flex-column align-items-center", children: [
        o !== null && /* @__PURE__ */ u(la, { className: "modal-alert-icon", animationData: o }),
        /* @__PURE__ */ u("h3", { className: "modal-alert-title", children: t.title }),
        !!((m = t.text) != null && m.length) && /* @__PURE__ */ u("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ u("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((b) => {
          var d, E, f;
          return /* @__PURE__ */ u(
            $e,
            {
              className: "btn btn-lg mx-2 " + (((d = t.actions) == null ? void 0 : d[b].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => i(b),
              children: ((f = ((E = t.actions) == null ? void 0 : E[b]) ?? null) == null ? void 0 : f.label) || b
            },
            b
          );
        }) })
      ] }) })
    ] }, r.current)
  ] });
}
const ua = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: a, generateLink: o } = ee(), s = a(e.entity, "list", e.namespace);
  return /* @__PURE__ */ w("section", { className: "edit", children: [
    /* @__PURE__ */ w("header", { children: [
      /* @__PURE__ */ w("h2", { className: "title", children: [
        s && /* @__PURE__ */ u(ct, { to: o(s.route, n), children: "←" }),
        /* @__PURE__ */ u(B, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ u("nav", { children: /* @__PURE__ */ u(B, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ u("main", { children: /* @__PURE__ */ u(B, { name: "content", content: t, data: r }) })
  ] });
}, _t = ({ action: e, children: t, onSuccess: n, modal: r, props: a }) => {
  const o = { ...e.parameters || {}, ...or() }, s = $(void 0), l = $(void 0), { results: c, setParameters: i } = Xt({
    entityAction: e.action,
    initParameters: o
  }), { open: m } = nn();
  return M(() => {
    i(o);
  }, [JSON.stringify(o)]), /* @__PURE__ */ w(r ? en : ua, { ref: l, ...a, action: e, routeParams: o, children: [
    /* @__PURE__ */ u(W, { name: "title", children: /* @__PURE__ */ u(B, { name: "title", content: t, data: c, children: (c == null ? void 0 : c.title) || "Title" }) }),
    /* @__PURE__ */ u(W, { name: "navigation", children: /* @__PURE__ */ u(ae, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ u(B, { name: "navigation", content: t, data: c }) }) }),
    /* @__PURE__ */ u(W, { name: "content", children: /* @__PURE__ */ u(ae, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ u(B, { name: "content", content: t, data: c, children: /* @__PURE__ */ u(
      ia,
      {
        ref: s,
        data: c,
        action: e.action,
        onSuccess: (d) => {
          var f, h;
          (f = l.current) == null || f.close();
          const E = new CustomEvent("success", { detail: d });
          n && n(E, d), !E.defaultPrevented && m({
            title: "Success",
            text: Object.values(((h = d.messages) == null ? void 0 : h.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: be.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (d) => {
          console.log(d), m({
            title: d.status + " " + d.detail,
            text: d.detail,
            icon: be.denied,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onLoad: () => {
          console.log("loaded");
        },
        embedded: r,
        parameters: o,
        children: r && /* @__PURE__ */ u(W, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ u(W, { name: "actions", children: /* @__PURE__ */ u(B, { name: "actions", content: t, data: c, children: /* @__PURE__ */ u(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var d, E;
          return (E = (d = s.current) == null ? void 0 : d.getFormRef()) == null ? void 0 : E.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, da = () => /* @__PURE__ */ u("div", { children: "No View Found" }), ne = ({ to: e, children: t, onClick: n, ...r }) => {
  const { navigate: a } = ee(), o = $(null), s = (l) => {
    var c;
    n && n(l), !l.defaultPrevented && (c = o == null ? void 0 : o.current) != null && c.href && (l.preventDefault(), a(o.current.href));
  };
  return M(() => {
    var l;
    return (l = o == null ? void 0 : o.current) == null || l.addEventListener("click", s), () => {
      var c;
      (c = o == null ? void 0 : o.current) == null || c.removeEventListener("click", s);
    };
  }, [e, n]), /* @__PURE__ */ u("a", { ref: o, href: e, ...r, children: /* @__PURE__ */ u(Zt, { children: t && t }) });
}, Q = /* @__PURE__ */ new Map(), Fe = {
  set(e, t, n) {
    Q.has(e) || Q.set(e, /* @__PURE__ */ new Map());
    const r = Q.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return Q.has(e) && Q.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!Q.has(e))
      return;
    const n = Q.get(e);
    n.delete(t), n.size === 0 && Q.delete(e);
  }
}, fa = 1e3, qe = "transitionend", rn = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), ma = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), ha = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), a = Number.parseFloat(n);
  return !r && !a ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * fa);
}, pa = (e) => {
  e.dispatchEvent(new Event(qe));
}, re = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Je = (e) => re(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(rn(e)) : null, an = (e) => {
  if (!re(e) || e.getClientRects().length === 0)
    return !1;
  const t = getComputedStyle(e).getPropertyValue("visibility") === "visible", n = e.closest("details:not([open])");
  if (!n)
    return t;
  if (n !== e) {
    const r = e.closest("summary");
    if (r && r.parentNode !== n || r === null)
      return !1;
  }
  return t;
}, Ge = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Nt = () => {
}, on = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Ie = [], ga = (e) => {
  document.readyState === "loading" ? (Ie.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Ie)
      t();
  }), Ie.push(e)) : e();
}, de = () => document.documentElement.dir === "rtl", ya = (e) => {
  ga(() => {
    const t = on();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, Qe = (e, t = [], n = e) => typeof e == "function" ? e(...t) : n, ba = (e, t, n = !0) => {
  if (!n) {
    Qe(e);
    return;
  }
  const a = ha(t) + 5;
  let o = !1;
  const s = ({ target: l }) => {
    l === t && (o = !0, t.removeEventListener(qe, s), Qe(e));
  };
  t.addEventListener(qe, s), setTimeout(() => {
    o || pa(t);
  }, a);
}, Ea = (e, t, n, r) => {
  const a = e.length;
  let o = e.indexOf(t);
  return o === -1 ? !n && r ? e[a - 1] : e[0] : (o += n ? 1 : -1, r && (o = (o + a) % a), e[Math.max(0, Math.min(o, a - 1))]);
}, Ca = /[^.]*(?=\..*)\.|.*/, va = /\..*/, xa = /::\d+$/, Ue = {};
let wt = 1;
const sn = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, _a = /* @__PURE__ */ new Set([
  "click",
  "dblclick",
  "mouseup",
  "mousedown",
  "contextmenu",
  "mousewheel",
  "DOMMouseScroll",
  "mouseover",
  "mouseout",
  "mousemove",
  "selectstart",
  "selectend",
  "keydown",
  "keypress",
  "keyup",
  "orientationchange",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointermove",
  "pointerup",
  "pointerleave",
  "pointercancel",
  "gesturestart",
  "gesturechange",
  "gestureend",
  "focus",
  "blur",
  "change",
  "reset",
  "select",
  "submit",
  "focusin",
  "focusout",
  "load",
  "unload",
  "beforeunload",
  "resize",
  "move",
  "DOMContentLoaded",
  "readystatechange",
  "error",
  "abort",
  "scroll"
]);
function ln(e, t) {
  return t && `${t}::${wt++}` || e.uidEvent || wt++;
}
function cn(e) {
  const t = ln(e);
  return e.uidEvent = t, Ue[t] = Ue[t] || {}, Ue[t];
}
function Na(e, t) {
  return function n(r) {
    return ft(r, { delegateTarget: e }), n.oneOff && V.off(e, r.type, t), t.apply(e, [r]);
  };
}
function wa(e, t, n) {
  return function r(a) {
    const o = e.querySelectorAll(t);
    for (let { target: s } = a; s && s !== this; s = s.parentNode)
      for (const l of o)
        if (l === s)
          return ft(a, { delegateTarget: s }), r.oneOff && V.off(e, a.type, t, n), n.apply(s, [a]);
  };
}
function un(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function dn(e, t, n) {
  const r = typeof t == "string", a = r ? n : t || n;
  let o = fn(e);
  return _a.has(o) || (o = e), [r, a, o];
}
function Pt(e, t, n, r, a) {
  if (typeof t != "string" || !e)
    return;
  let [o, s, l] = dn(t, n, r);
  t in sn && (s = ((f) => function(h) {
    if (!h.relatedTarget || h.relatedTarget !== h.delegateTarget && !h.delegateTarget.contains(h.relatedTarget))
      return f.call(this, h);
  })(s));
  const c = cn(e), i = c[l] || (c[l] = {}), m = un(i, s, o ? n : null);
  if (m) {
    m.oneOff = m.oneOff && a;
    return;
  }
  const b = ln(s, t.replace(Ca, "")), d = o ? wa(e, n, s) : Na(e, s);
  d.delegationSelector = o ? n : null, d.callable = s, d.oneOff = a, d.uidEvent = b, i[b] = d, e.addEventListener(l, d, o);
}
function Ze(e, t, n, r, a) {
  const o = un(t[n], r, a);
  o && (e.removeEventListener(n, o, !!a), delete t[n][o.uidEvent]);
}
function Pa(e, t, n, r) {
  const a = t[n] || {};
  for (const [o, s] of Object.entries(a))
    o.includes(r) && Ze(e, t, n, s.callable, s.delegationSelector);
}
function fn(e) {
  return e = e.replace(va, ""), sn[e] || e;
}
const V = {
  on(e, t, n, r) {
    Pt(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Pt(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [a, o, s] = dn(t, n, r), l = s !== t, c = cn(e), i = c[s] || {}, m = t.startsWith(".");
    if (typeof o < "u") {
      if (!Object.keys(i).length)
        return;
      Ze(e, c, s, o, a ? n : null);
      return;
    }
    if (m)
      for (const b of Object.keys(c))
        Pa(e, c, b, t.slice(1));
    for (const [b, d] of Object.entries(i)) {
      const E = b.replace(xa, "");
      (!l || t.includes(E)) && Ze(e, c, s, d.callable, d.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = on(), a = fn(t), o = t !== a;
    let s = null, l = !0, c = !0, i = !1;
    o && r && (s = r.Event(t, n), r(e).trigger(s), l = !s.isPropagationStopped(), c = !s.isImmediatePropagationStopped(), i = s.isDefaultPrevented());
    const m = ft(new Event(t, { bubbles: l, cancelable: !0 }), n);
    return i && m.preventDefault(), c && e.dispatchEvent(m), m.defaultPrevented && s && s.preventDefault(), m;
  }
};
function ft(e, t = {}) {
  for (const [n, r] of Object.entries(t))
    try {
      e[n] = r;
    } catch {
      Object.defineProperty(e, n, {
        configurable: !0,
        get() {
          return r;
        }
      });
    }
  return e;
}
function St(e) {
  if (e === "true")
    return !0;
  if (e === "false")
    return !1;
  if (e === Number(e).toString())
    return Number(e);
  if (e === "" || e === "null")
    return null;
  if (typeof e != "string")
    return e;
  try {
    return JSON.parse(decodeURIComponent(e));
  } catch {
    return e;
  }
}
function Ve(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Le = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${Ve(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Ve(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, n = Object.keys(e.dataset).filter((r) => r.startsWith("bs") && !r.startsWith("bsConfig"));
    for (const r of n) {
      let a = r.replace(/^bs/, "");
      a = a.charAt(0).toLowerCase() + a.slice(1, a.length), t[a] = St(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return St(e.getAttribute(`data-bs-${Ve(t)}`));
  }
};
class Sa {
  // Getters
  static get Default() {
    return {};
  }
  static get DefaultType() {
    return {};
  }
  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, n) {
    const r = re(n) ? Le.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...re(n) ? Le.getDataAttributes(n) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, a] of Object.entries(n)) {
      const o = t[r], s = re(o) ? "element" : ma(o);
      if (!new RegExp(a).test(s))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${a}".`
        );
    }
  }
}
const La = "5.3.3";
class Ra extends Sa {
  constructor(t, n) {
    super(), t = Je(t), t && (this._element = t, this._config = this._getConfig(n), Fe.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Fe.remove(this._element, this.constructor.DATA_KEY), V.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    ba(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Fe.get(Je(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return La;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const Be = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let n = e.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
  }
  return t ? t.split(",").map((n) => rn(n)).join(",") : null;
}, H = {
  find(e, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, e));
  },
  findOne(e, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, e);
  },
  children(e, t) {
    return [].concat(...e.children).filter((n) => n.matches(t));
  },
  parents(e, t) {
    const n = [];
    let r = e.parentNode.closest(t);
    for (; r; )
      n.push(r), r = r.parentNode.closest(t);
    return n;
  },
  prev(e, t) {
    let n = e.previousElementSibling;
    for (; n; ) {
      if (n.matches(t))
        return [n];
      n = n.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(e, t) {
    let n = e.nextElementSibling;
    for (; n; ) {
      if (n.matches(t))
        return [n];
      n = n.nextElementSibling;
    }
    return [];
  },
  focusableChildren(e) {
    const t = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((n) => `${n}:not([tabindex^="-"])`).join(",");
    return this.find(t, e).filter((n) => !Ge(n) && an(n));
  },
  getSelectorFromElement(e) {
    const t = Be(e);
    return t && H.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Be(e);
    return t ? H.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Be(e);
    return t ? H.find(t) : [];
  }
}, Lt = "dropdown", Aa = "bs.dropdown", se = `.${Aa}`, mt = ".data-api", ka = "Escape", Rt = "Tab", Oa = "ArrowUp", At = "ArrowDown", Ta = 2, Da = `hide${se}`, $a = `hidden${se}`, Ma = `show${se}`, ja = `shown${se}`, mn = `click${se}${mt}`, hn = `keydown${se}${mt}`, Fa = `keyup${se}${mt}`, ce = "show", Ia = "dropup", Ua = "dropend", Va = "dropstart", Ba = "dropup-center", Ha = "dropdown-center", te = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Wa = `${te}.${ce}`, Pe = ".dropdown-menu", Ka = ".navbar", za = ".navbar-nav", Ya = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", qa = de() ? "top-end" : "top-start", Ja = de() ? "top-start" : "top-end", Ga = de() ? "bottom-end" : "bottom-start", Qa = de() ? "bottom-start" : "bottom-end", Za = de() ? "left-start" : "right-start", Xa = de() ? "right-start" : "left-start", eo = "top", to = "bottom", no = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, ro = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let ie = class Se extends Ra {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = H.next(this._element, Pe)[0] || H.prev(this._element, Pe)[0] || H.findOne(Pe, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return no;
  }
  static get DefaultType() {
    return ro;
  }
  static get NAME() {
    return Lt;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Ge(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!V.trigger(this._element, Ma, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(za))
        for (const r of [].concat(...document.body.children))
          V.on(r, "mouseover", Nt);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ce), this._element.classList.add(ce), V.trigger(this._element, ja, t);
    }
  }
  hide() {
    if (Ge(this._element) || !this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    this._completeHide(t);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(t) {
    if (!V.trigger(this._element, Da, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          V.off(r, "mouseover", Nt);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ce), this._element.classList.remove(ce), this._element.setAttribute("aria-expanded", "false"), Le.removeDataAttribute(this._menu, "popper"), V.trigger(this._element, $a, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !re(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Lt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof gt > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : re(this._config.reference) ? t = Je(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = gt.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(ce);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Ua))
      return Za;
    if (t.classList.contains(Va))
      return Xa;
    if (t.classList.contains(Ba))
      return eo;
    if (t.classList.contains(Ha))
      return to;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Ia) ? n ? Ja : qa : n ? Qa : Ga;
  }
  _detectNavbar() {
    return this._element.closest(Ka) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string" ? t.split(",").map((n) => Number.parseInt(n, 10)) : typeof t == "function" ? (n) => t(n, this._element) : t;
  }
  _getPopperConfig() {
    const t = {
      placement: this._getPlacement(),
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            boundary: this._config.boundary
          }
        },
        {
          name: "offset",
          options: {
            offset: this._getOffset()
          }
        }
      ]
    };
    return (this._inNavbar || this._config.display === "static") && (Le.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Qe(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = H.find(Ya, this._menu).filter((a) => an(a));
    r.length && Ea(r, n, t === At, !r.includes(n)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const n = Se.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Ta || t.type === "keyup" && t.key !== Rt)
      return;
    const n = H.find(Wa);
    for (const r of n) {
      const a = Se.getInstance(r);
      if (!a || a._config.autoClose === !1)
        continue;
      const o = t.composedPath(), s = o.includes(a._menu);
      if (o.includes(a._element) || a._config.autoClose === "inside" && !s || a._config.autoClose === "outside" && s || a._menu.contains(t.target) && (t.type === "keyup" && t.key === Rt || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const l = { relatedTarget: a._element };
      t.type === "click" && (l.clickEvent = t), a._completeHide(l);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === ka, a = [Oa, At].includes(t.key);
    if (!a && !r || n && !r)
      return;
    t.preventDefault();
    const o = this.matches(te) ? this : H.prev(this, te)[0] || H.next(this, te)[0] || H.findOne(te, t.delegateTarget.parentNode), s = Se.getOrCreateInstance(o);
    if (a) {
      t.stopPropagation(), s.show(), s._selectMenuItem(t);
      return;
    }
    s._isShown() && (t.stopPropagation(), s.hide(), o.focus());
  }
};
V.on(document, hn, te, ie.dataApiKeydownHandler);
V.on(document, hn, Pe, ie.dataApiKeydownHandler);
V.on(document, mn, ie.clearMenus);
V.on(document, Fa, ie.clearMenus);
V.on(document, mn, te, function(e) {
  e.preventDefault(), ie.getOrCreateInstance(this).toggle();
});
ya(ie);
const Re = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ u(D, { children: e }), ge = ({ children: e, ...t }) => /* @__PURE__ */ u("div", { className: "dropdown-menu", children: e }), pn = ({ className: e, children: t, icon: n }) => {
  const r = $(null);
  M(() => {
    const i = new ie(r.current);
    return () => {
      i.dispose();
    };
  }, []);
  const a = R.Children.toArray(t).find((i) => R.isValidElement(i) && i.type === ge), o = R.Children.toArray(t).filter((i) => R.isValidElement(i) && i.type === ne), s = R.Children.toArray(t).find((i) => R.isValidElement(i) && i.type === Re), l = R.Children.toArray(t).filter((i) => !R.isValidElement(i) || i.type !== ne && i.type !== ge && i.type !== Re), c = R.isValidElement(s) ? s.props : {};
  return /* @__PURE__ */ w("div", { className: [...(e || "").split(" "), "dropdown"].filter((i, m, b) => b.indexOf(i) === m).join(" "), children: [
    /* @__PURE__ */ u($e, { ref: r, "data-bs-toggle": "dropdown", ...c, className: [...(c.className || "").split(" "), "btn", "dropdown-toggle"].filter((i, m, b) => b.indexOf(i) === m).join(" "), children: c.children ? c.children : l }),
    a || /* @__PURE__ */ u(ge, { children: o })
  ] });
}, ao = Ce(({ data: e, columns: t, options: n, onClick: r, onBatchClick: a, routeParams: o, namespace: s }, l) => {
  var k, T, j, N, S, A, F;
  t = (t || ((k = e == null ? void 0 : e.entity) == null ? void 0 : k.columns) || []).filter((x) => x.group !== !1);
  const [, c] = U(), { generateLink: i } = ee(), m = (T = e == null ? void 0 : e.entity) == null ? void 0 : T.primaryColumn, b = Object.values((e == null ? void 0 : e.action) || []), d = b.filter((x) => x.object), E = t.length + (b.length ? 1 : 0), f = ((e == null ? void 0 : e.entity.data.items) || []).map((x) => x[(m == null ? void 0 : m.field) || ""] || 0), h = $([]), g = !!f.length && f.reduce((x, O) => x && h.current.includes(O), !0), p = (S = (N = (j = e == null ? void 0 : e.form) == null ? void 0 : j.batch.view.children) == null ? void 0 : N.method) == null ? void 0 : S.choices, y = !!(p != null && p.length) && m, v = (x, O = !1) => {
    O ? h.current.push(x) : h.current = h.current.filter((L) => L !== x), c({});
  }, _ = (x = !1) => {
    h.current = (x ? h.current.concat(f) : h.current.filter((O) => !f.includes(O))).filter((O, L, Y) => Y.indexOf(O) === L), c({});
  }, P = (x) => {
    var Y, G;
    if (!a)
      return;
    const O = e == null ? void 0 : e.form.batch.view;
    if (!y || !((Y = h.current) != null && Y.length))
      return;
    const L = new FormData();
    h.current.forEach((fe) => {
      var pt;
      L.append(`${(pt = O == null ? void 0 : O.children) == null ? void 0 : pt.ids.full_name}[]`, fe.toString());
    }), L.append(((G = O == null ? void 0 : O.children) == null ? void 0 : G.method.full_name) || "method", x), a(x, h.current, L);
  };
  return /* @__PURE__ */ w(D, { children: [
    y && /* @__PURE__ */ w("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ u("label", { className: "btn btn-light", children: /* @__PURE__ */ u(
        "input",
        {
          checked: g,
          onChange: (x) => _(x.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ w(pn, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ u(Re, { disabled: !h.current.length, className: "btn-light" }),
        /* @__PURE__ */ u(ge, { children: (F = (A = e.form.batch.view.children) == null ? void 0 : A.method.choices) == null ? void 0 : F.map((x) => {
          const O = x.value instanceof Function ? x.value() : x.value;
          return /* @__PURE__ */ u(ne, { to: "#", onClick: () => P(O), className: "dropdown-item", children: x.label instanceof Function ? x.label() : x.label }, O);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ w("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ u("thead", { children: /* @__PURE__ */ w("tr", { children: [
        t.map((x, O) => /* @__PURE__ */ w("th", { children: [
          /* @__PURE__ */ u(ae, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: x, prefix: "list", view: x.field + ".label", children: x.label }),
          x.sortable && (e == null ? void 0 : e.sort[x.field]) !== void 0 && /* @__PURE__ */ u(
            ne,
            {
              onClick: (L) => r && r({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: s,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [x.field]: e != null && e.sort[x.field] ? (e == null ? void 0 : e.sort[x.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, L),
              className: "btn",
              to: "#",
              children: e.sort[x.field] ? e.sort[x.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, O)),
        m && d.length > 0 && /* @__PURE__ */ u("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ u("tbody", { children: e && (e.entity.data.items.length ? e.entity.data.items.map(
        (x, O) => /* @__PURE__ */ w("tr", { children: [
          t == null ? void 0 : t.map(
            (L, Y) => {
              var G;
              return /* @__PURE__ */ w("td", { children: [
                Y === 0 && y && /* @__PURE__ */ u(
                  "input",
                  {
                    checked: h.current.includes(x[m == null ? void 0 : m.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: x[m == null ? void 0 : m.field],
                    onChange: (fe) => v(x[m == null ? void 0 : m.field], fe.target.checked)
                  }
                ),
                /* @__PURE__ */ u(ae, { namespace: s || "unknown", data: x, prefix: "list", view: L.field, children: x[L.field] !== void 0 && (x[L.field] instanceof Object ? x[L.field] instanceof Array ? x[L.field].join(", ") : JSON.stringify(x[L.field]) : (G = x[L.field]) == null ? void 0 : G.toString()) })
              ] }, Y);
            }
          ),
          m && d.length > 0 && /* @__PURE__ */ u("td", { className: "text-end text-nowrap", children: d.map((L, Y) => {
            var G;
            return /* @__PURE__ */ u(
              ne,
              {
                onClick: (fe) => r && r({
                  action: L,
                  parameters: {
                    ...o || {},
                    id: x[m == null ? void 0 : m.field]
                  }
                }, fe),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((G = L.route) == null ? void 0 : G.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: i(L.route, {
                  ...o || {},
                  id: x[m.field]
                }),
                children: L.title
              },
              Y
            );
          }) })
        ] }, O)
      ) : /* @__PURE__ */ u("tr", { children: /* @__PURE__ */ u("td", { colSpan: E, children: "Not results found." }) })) })
    ] })
  ] });
}), pe = ({ route: e, page: t, active: n = !1, title: r, children: a }) => {
  const o = new URL(document.location.href);
  return o.searchParams.set("page", t.toString()), /* @__PURE__ */ u("li", { className: `page-item ${n ? "active" : ""}`, children: /* @__PURE__ */ u(
    ne,
    {
      to: o.toString(),
      className: "page-link",
      title: r,
      children: a || t
    }
  ) });
}, oo = ({ meta: e }) => {
  const n = e.totalPages, r = e.page || 1, a = e.links, o = !!e.totalPages;
  return /* @__PURE__ */ w("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ w("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      o && /* @__PURE__ */ w(D, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    o && /* @__PURE__ */ u("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ w("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ u(pe, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ w(D, { children: [
        /* @__PURE__ */ u(pe, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ u("div", { className: "page-item", children: /* @__PURE__ */ u("a", { className: "page-link", children: "..." }) })
      ] }),
      (a || []).map((s, l) => /* @__PURE__ */ u(pe, { page: s, active: s === r }, l)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ w(D, { children: [
        /* @__PURE__ */ u("div", { className: "page-item", children: /* @__PURE__ */ u("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ u(
          pe,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ u(pe, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, Xe = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = Xe(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), gn = R.createContext({});
function so() {
  const { setModal: e } = R.useContext(gn);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function io(e) {
  const [t, n] = U(), r = $(0);
  M(() => {
    r.current += 1;
  }, [t]);
  const a = {
    ...(t == null ? void 0 : t.props) || {},
    onClose: () => {
      var o;
      (o = t == null ? void 0 : t.props) != null && o.onClose && t.props.onClose(), n(null);
    }
  };
  return /* @__PURE__ */ w(gn.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ u(
      yn,
      {
        view: t.action.action.name || "list",
        namespace: t.action.action.namespace || "",
        props: {
          action: t.action,
          modal: !0,
          props: a
        }
      },
      r.current
    )
  ] });
}
const lo = X(({ action: e, embedded: t = !1 }) => {
  var P, k, T, j;
  const { generateLink: n, generateRoute: r, generateActionLink: a, location: o, navigate: s } = ee();
  let l = new URLSearchParams(o.search);
  const c = $(void 0), i = $(xn(l)), m = $(null), { openModal: b } = so(), { open: d } = nn(), E = e.action.entity;
  if (!E)
    throw new Error("Invalid Entity");
  const { results: f, refresh: h, setQueryParameters: g } = Xt({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: i.current }), p = Object.values((f == null ? void 0 : f.action) ?? []).filter((N) => !N.object && N.name !== e.action.name), y = (N) => {
    N == null || N.forEach((A) => {
      var F, x;
      (x = (F = i.current) == null ? void 0 : F.filter) == null || delete x[A];
    });
    const S = {
      ...i.current && i.current,
      ...c.current && { sort: c.current }
    };
    if (l = We(Xe(S)), t)
      g(l);
    else {
      const A = new URL(document.location.href);
      A.search = l.toString(), s(A.toString());
    }
  }, v = (N, S, A) => {
    d({
      title: "Are you sure?",
      icon: be.confirm,
      onResult: (F) => {
        F.isConfirmed && Ee().post({
          url: a(e),
          body: A
        }).catch((x) => {
          console.log("error", x);
        }).finally(() => {
          console.log("done"), h();
        });
      }
    });
  }, _ = (N, S) => {
    switch (N.parameters !== void 0 && (N.parameters = Xe(N.parameters), Object.keys(N.parameters).length || (N.parameters = void 0)), N.action.name) {
      case "filter": {
        S == null || S.preventDefault(), i.current = N.parameters;
        break;
      }
      case "sort": {
        S == null || S.preventDefault(), c.current = N.parameters;
        break;
      }
      case "delete": {
        S == null || S.preventDefault(), d({
          title: "Are you sure?",
          icon: be.confirm,
          onResult: (A) => {
            A.isConfirmed && Ee().fetch({
              url: r(N.action.route, { ...e.parameters, ...N.parameters }),
              method: Nn.DELETE
            }).catch((F) => {
              console.log("error", F);
            }).finally(() => {
              h();
            });
          }
        });
        return;
      }
      default: {
        t && (S == null || S.preventDefault(), b({
          action: N,
          props: {
            onClose: () => {
              h();
            }
          }
        }));
        return;
      }
    }
    y();
  };
  return M(() => {
    g(l);
  }, [o.search]), /* @__PURE__ */ u(D, { children: /* @__PURE__ */ w("section", { className: "list", children: [
    /* @__PURE__ */ w("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ u("h2", { children: f == null ? void 0 : f.title }),
      /* @__PURE__ */ w("div", { className: "d-flex align-items-center", children: [
        !!p.length && /* @__PURE__ */ u("div", { className: "btn-group btn-group-sm me-2", children: p.map((N, S) => /* @__PURE__ */ u(
          ne,
          {
            to: n(N.route, e.parameters),
            onClick: (A) => _({
              action: N,
              parameters: e.parameters
            }, A),
            className: "btn btn-outline-secondary",
            children: N.title || N.name
          },
          S
        )) }),
        ((P = f == null ? void 0 : f.form) == null ? void 0 : P.filter) && /* @__PURE__ */ w("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ w(pn, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ u(Re, { className: "btn-outline-dark", children: /* @__PURE__ */ u(Ye, { children: "Filter" }) }),
            /* @__PURE__ */ u(ge, { children: /* @__PURE__ */ u("div", { className: "filter", children: /* @__PURE__ */ w(
              Gt,
              {
                id: "filter_" + De(E),
                ref: m,
                onSubmit: (N) => _({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: E
                  },
                  parameters: _n(N)
                }),
                onReset: () => _({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: E
                  }
                }),
                children: [
                  ((k = f == null ? void 0 : f.form) == null ? void 0 : k.filter) && /* @__PURE__ */ u(dt, { view: f.form.filter.view }),
                  /* @__PURE__ */ u("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ u(Ye, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((T = i.current) == null ? void 0 : T.filter) || []).length && /* @__PURE__ */ u($e, { onClick: () => {
            var N;
            (N = m.current) == null || N.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((j = f == null ? void 0 : f.form) == null ? void 0 : j.filter) && /* @__PURE__ */ u(co, { formView: f.form.filter.view, onClick: (N) => y([N]) }),
    /* @__PURE__ */ w(ae, { namespace: e.action.namespace, prefix: "modify", view: "content", data: f, children: [
      /* @__PURE__ */ u("div", { className: "table-responsive", children: /* @__PURE__ */ u(
        ao,
        {
          data: f,
          onClick: _,
          onBatchClick: v,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      f && /* @__PURE__ */ u(oo, { meta: f.entity.data.meta })
    ] }, "modify")
  ] }) });
}), co = ({ formView: e, onClick: t }) => {
  const n = (r) => r.choices !== void 0 ? r.choices ? Object.values(r.data instanceof Object ? r.data : [r.data]).map((a) => {
    var o, s;
    return ((s = (o = r.choices) == null ? void 0 : o[a]) == null ? void 0 : s.label) ?? a;
  }).join(", ") : r.data : r.checked !== void 0 ? r.checked ? "Yes" : "No" : r.data;
  return /* @__PURE__ */ u("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((r) => r.data !== null).map((r, a) => /* @__PURE__ */ w("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ u("small", { className: "mb-2", children: r.label }),
    /* @__PURE__ */ w("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      n(r),
      t && /* @__PURE__ */ u("span", { onClick: () => t(r.name), className: "ms-2", children: "×" })
    ] })
  ] }, a)) });
}, uo = ({ view: e, props: t }) => {
  const n = {
    add: _t,
    edit: _t,
    list: lo
  };
  if (n[e] === void 0)
    throw new ve(500, "View not found");
  return R.createElement(n[e] || da, t);
}, yn = ({ view: e, namespace: t, props: n }) => /* @__PURE__ */ u(ae, { namespace: t, view: e, props: n, children: /* @__PURE__ */ u(uo, { view: e, props: n }) }, t + e), fo = ({ path: e, preloader: t }) => {
  if (!et.namespace[ht])
    throw new Ae(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = ee(), [r, a] = U();
  if (M(() => {
    n(e).then((o) => a(o));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ u(D, { children: "Loading" });
  if (!r)
    throw new ve(404, "Page Not Found");
  return /* @__PURE__ */ u(
    yn,
    {
      view: r.action.name,
      namespace: r.action.namespace || "",
      props: { action: r }
    }
  );
}, mo = ({ children: e }) => /* @__PURE__ */ u(ca, { children: /* @__PURE__ */ u(io, { children: e }) });
let He;
const bn = {}, ht = "dakataa_crud", vo = ({ connection: e, templates: t }) => {
  et.namespace[ht] = e, bn.templates = t;
}, Ee = () => (He || (He = et.instance({ namespace: ht })), He), xo = Xr(({ path: e, prefix: t, errorFallback: n, templates: r }) => {
  const { location: a } = ee();
  return e ?? (e = a.pathname), t && (e = e.replace(new RegExp("^/" + t.replace(new RegExp("^/"), "") + "(/)?"), "/")), r = Object.assign(bn.templates ?? {}, r ?? {}), /* @__PURE__ */ u(Qr, { config: {
    link: {
      prefix: t
    },
    templates: r
  }, children: /* @__PURE__ */ u(mo, { children: /* @__PURE__ */ u(Ln, { fallback: n ?? /* @__PURE__ */ u(An, {}), children: /* @__PURE__ */ u(fo, { path: e }) }, e) }) });
});
export {
  Zr as ActionProvider,
  ca as AlertProvider,
  xo as Crud,
  vo as CrudConfiguration,
  mo as CrudContext,
  fo as CrudLoader,
  ae as DynamicView,
  Ln as ErrorBoundary,
  Ae as Exception,
  Gt as Form,
  na as FormGroup,
  dt as FormView,
  aa as FormWidget,
  ao as GridTableView,
  ve as HttpException,
  ra as Input,
  lo as List,
  io as ModalProvider,
  _t as Modify,
  B as TemplateBlock,
  W as TemplateExtend,
  ee as UseActions,
  nn as UseAlert,
  so as UseModal,
  yn as ViewLoader,
  De as nameToId,
  ut as useForm,
  Xr as withRouterContext
};
