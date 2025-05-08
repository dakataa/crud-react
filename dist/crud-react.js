var Ft = Object.defineProperty;
var It = (e, t, n) => t in e ? Ft(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => It(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as o, jsxs as v, Fragment as R } from "react/jsx-runtime";
import je, { convertObjectToURLSearchParams as Ae, RequestBodyType as Ut, convertURLSearchParamsToObject as $t, convertFormDataToObject as Vt, Method as Bt } from "@dakataa/requester";
import * as Ve from "react";
import A, { memo as Y, useState as M, useEffect as k, forwardRef as Q, useRef as T, useImperativeHandle as fe, useReducer as Kt, createRef as Ht } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { createPortal as Yt } from "react-dom";
import Wt from "lottie-web/build/player/esm/lottie.min.js";
import * as Be from "@popperjs/core";
class pe {
  constructor(t = 0, n, r) {
    X(this, "code");
    X(this, "detail");
    X(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class ie extends pe {
  constructor(n, r, s) {
    super(0, r, s);
    X(this, "status", 400);
    this.status = n;
  }
}
class qt extends Ve.Component {
  constructor(n) {
    super(n);
    X(this, "promiseRejectionHandler", (n) => {
      n.reason instanceof pe && this.setState({
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
    return n instanceof Error && (n = new ie(0, n.message)), {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.log("error", n);
  }
  render() {
    return this.state.hasError ? Ve.cloneElement(
      this.props.fallback,
      {
        error: this.state.error,
        children: this.props.children
      }
    ) : this.props.children;
  }
}
const Ze = Y(({ children: e }) => /* @__PURE__ */ o("div", { className: "crud", children: e })), zt = Y(({ error: e }) => /* @__PURE__ */ o(Ze, { children: /* @__PURE__ */ o("main", { children: /* @__PURE__ */ v("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ o("h1", { className: "display-1", children: (e == null ? void 0 : e.status) || "Error" }),
  /* @__PURE__ */ o("p", { className: "text-secondary", children: (e == null ? void 0 : e.detail) || "Unknown Error" }),
  /* @__PURE__ */ o("br", {}),
  /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })), Gt = ({ children: e }) => /* @__PURE__ */ o(R, { children: e }), K = Y(({ name: e, children: t, data: n, parent: r, render: s }) => (t = A.Children.toArray((s ? s(n, r) : t) || []).map((a) => (A.isValidElement(a) && a.type === Gt && (a = A.cloneElement(a, { children: r })), a)), /* @__PURE__ */ o(R, { children: t }))), $ = Y(({ name: e, content: t, children: n, data: r }) => {
  const s = A.Children.toArray(t).find((d) => A.isValidElement(d) && d.type === K && d.props.name === e);
  let a = null;
  s && A.isValidElement(s) && (a = A.cloneElement(s, { parent: n, data: r }));
  const i = A.Children.toArray(n).filter((d) => A.isValidElement(d) && d.type !== K);
  return /* @__PURE__ */ o(R, { children: a || (i.length ? i : n) });
}), Xe = A.createContext({});
function et() {
  return A.useContext(Xe);
}
function Qt({ config: e, ...t }) {
  return /* @__PURE__ */ o(Xe.Provider, { value: e, children: t.children });
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
const Ke = "actions", tt = A.createContext(void 0);
function W() {
  const e = A.useContext(tt), t = et(), { actions: n, location: r, setLocation: s } = e ?? {
    actions: null,
    location: new URL(document.location.href),
    setLocation: () => {
    }
  }, a = (h, u, _) => n == null ? void 0 : n.filter((g) => g.entity === h && g.name === u && (_ === void 0 || g.namespace === _)).shift(), i = (h) => n == null ? void 0 : n.find((u) => {
    var _;
    return ((_ = u.route) == null ? void 0 : _.path) && p(u.route.path, h);
  }), d = (h) => {
    const u = () => {
      var E;
      const _ = i(h);
      if (!_)
        return null;
      const g = p(((E = _.route) == null ? void 0 : E.path) || "", h);
      return {
        action: _,
        parameters: g == null ? void 0 : g.params
      };
    };
    return new Promise((_) => {
      let g = 0;
      const E = () => {
        if (g > 10)
          throw new pe(0, "Cannot load routes");
        if (e)
          return _(u());
        setTimeout(E, 200), g++;
      };
      E();
    });
  }, m = (h) => h.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), c = (h, u = void 0) => y(m(h), u), N = (h, u) => h ? c(h.path, { ...h.defaults || {}, ...u }) : "#", l = (h) => {
    const u = a(h.action.entity, h.action.name, h.action.namespace);
    return N(u == null ? void 0 : u.route, h.parameters);
  }, f = (h, u) => {
    const _ = N(h, u);
    return C(_);
  }, C = (h) => {
    var u;
    return (u = t.link) != null && u.prefix && (h = "/" + t.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + h), h;
  }, b = (h) => {
    try {
      history.pushState(null, "", h);
    } catch {
      window.location.assign(h);
    }
  }, p = (h, u) => {
    var O;
    const _ = "^" + h.replace(new RegExp("[{:](\\w+)}?", "g"), "(?<$1>[^/]+)") + "$";
    if (!new RegExp(_, "giu").test(u))
      return null;
    const E = u.matchAll(new RegExp(_, "giu")), P = (O = E == null ? void 0 : E.next().value) == null ? void 0 : O.groups;
    return {
      pathname: u,
      params: P,
      pattern: h
    };
  }, y = (h, u) => h.replaceAll(new RegExp("[{:](\\w+)}?", "g"), (_, g) => (u == null ? void 0 : u[g]) || "");
  return {
    getAction: a,
    getActionByPath: i,
    getOnClickActionByPath: d,
    navigate: b,
    location: r,
    matchPath: p,
    generateRoute: N,
    generateRoutePath: c,
    crudToReactPathPattern: m,
    generateActionLink: l,
    generateLink: f
  };
}
function Jt(e) {
  let t = null;
  try {
    const i = sessionStorage.getItem(Ke);
    t = JSON.parse(atob(i || ""));
  } catch {
  }
  const [n, r] = M(t), [s, a] = M(new URL(document.location.href));
  return k(() => {
    if (s && s.toString() !== document.location.toString())
      try {
        history.pushState(null, "", s);
      } catch {
        window.location.assign(s);
      }
  }, [s.toString()]), k(() => {
    const i = () => {
      a(new URL(document.location.href));
    };
    return window.addEventListener("pushstate", i), window.addEventListener("replacestate", i), window.addEventListener("popstate", i), () => {
      window.removeEventListener("pushstate", i), window.removeEventListener("replacestate", i), window.removeEventListener("popstate", i);
    };
  }, []), k(() => {
    t || ne().get({ url: "/_crud/actions" }).then(({ status: i, data: d }) => {
      i === 200 && (sessionStorage.setItem(Ke, btoa(JSON.stringify(d))), r(d));
    }).catch((i) => {
      console.log("error", i);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ o(tt.Provider, { value: {
    actions: n,
    location: s,
    setLocation: a
  }, children: e.children });
}
function Zt(e) {
  return (t) => {
    const n = A.createElement(e, t);
    return /* @__PURE__ */ o(Jt, { children: n });
  };
}
const nt = A.createContext(null);
function Re() {
  const e = A.useContext(nt);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const he = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), rt = Q(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: s,
  onSubmit: a,
  onReset: i,
  ...d
}, m) => {
  const c = T(null), N = {
    response: null,
    constraints: {},
    errors: {}
  }, l = {
    getFormData: () => new FormData(c.current || void 0),
    setFormData: (p) => {
      var y;
      [...((y = c.current) == null ? void 0 : y.elements) || []].forEach((h) => {
        const u = p.get(h.name);
        switch (h.tagName.toLowerCase()) {
          case "select": {
            h.multiple ? [...h.options].forEach((_) => {
              _.selected = p.getAll(h.name).includes(_.value);
            }) : h.value = u;
            break;
          }
          default:
            switch (h.type) {
              case "checkbox":
                h.checked = !!u;
                break;
              default:
                h.value = u;
                break;
            }
        }
      });
    },
    setErrors: (p) => {
      const [, y] = C;
      y({ action: "errors", payload: p });
    },
    reset: () => {
      var p;
      (p = c.current) == null || p.reset();
    },
    submit: () => {
      var p;
      return (p = c.current) == null ? void 0 : p.requestSubmit();
    }
  };
  fe(m, () => l), k(() => {
    const p = () => {
      i && i();
    }, y = c == null ? void 0 : c.current;
    return y == null || y.addEventListener("reset", p), () => {
      y == null || y.removeEventListener("reset", p);
    };
  }, []);
  const f = (p, y) => {
    const h = l.getFormData();
    for (const u of y)
      if (!u.isValid(h.get(p) || null))
        return { valid: !1, message: u.getMessage() };
    return { valid: !0, message: null };
  }, C = Kt((p, y) => {
    const { action: h, payload: u } = y;
    switch (h) {
      case "constraints": {
        const { name: _, constraints: g } = u;
        return {
          ...p,
          constraints: {
            ...p.constraints || {},
            [_]: g
          }
        };
      }
      case "validate": {
        const { valid: _, message: g } = f(u, p.constraints[u] || []), E = p.errors || {}, P = u;
        return _ ? delete E[P] : E[P] = [...E[P] || [], { message: g || "Error" }], Object.keys(E).length ? {
          ...p,
          errors: E
        } : p;
      }
      case "response":
        return {
          ...p,
          response: u
        };
      case "errors":
        return {
          ...p,
          errors: u || []
        };
      case "error": {
        const _ = { ...p.errors, ...u };
        return {
          ...p,
          errors: _
        };
      }
    }
    return p;
  }, N), b = (p) => {
    p.preventDefault();
    const [y, h] = C;
    let u = {};
    for (const [g, E] of Object.entries(y.constraints)) {
      const { valid: P, message: O } = f(g, E);
      P || (u[g] = [O]);
    }
    if (Object.values(u).length) {
      h({ action: "errors", payload: u });
      return;
    }
    const _ = new FormData((c == null ? void 0 : c.current) || void 0);
    if (s && s(_), a) {
      a(_);
      return;
    }
  };
  return /* @__PURE__ */ o(nt.Provider, { value: [C, m, c], children: /* @__PURE__ */ o("form", { id: e, ref: c, onSubmit: b, ...d, children: t }) });
}), Xt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: s,
  choiceLabelTransform: a,
  ...i
}) => {
  t = t || [];
  const [[d, m], c] = Re(), N = T(null), f = !!((d == null ? void 0 : d.errors[e.full_name]) || []).length, C = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  k(() => {
    m({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const b = (p) => {
    m({ action: "validate", payload: e.full_name }), r && r(p);
  };
  return e != null && e.expanded ? /* @__PURE__ */ o(R, { children: Object.values(e.choices || []).map(
    (p, y) => {
      var E;
      const h = he(e.full_name, y), u = s ? s(p) : p.value, _ = a ? a(p) : p.label || u, g = {
        id: h,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(p) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ v(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ o(
              "input",
              {
                ref: N,
                defaultValue: u,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (E = e == null ? void 0 : e.data) == null ? void 0 : E.includes(u),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: h,
                className: "form-check-input",
                ...g,
                onChange: (P) => {
                  var O, w;
                  return b({
                    value: (e != null && e.multiple ? (O = c == null ? void 0 : c.current) == null ? void 0 : O.getFormData().getAll(e == null ? void 0 : e.full_name) : (w = c == null ? void 0 : c.current) == null ? void 0 : w.getFormData().get(e == null ? void 0 : e.full_name)) || P.target.value,
                    targetValue: P.target.value,
                    checked: P.target.checked
                  });
                }
              },
              C
            ),
            /* @__PURE__ */ o(
              "label",
              {
                htmlFor: g.id,
                className: "form-check-label",
                children: _
              }
            )
          ]
        },
        y
      );
    }
  ) }) : /* @__PURE__ */ o(R, { children: /* @__PURE__ */ v(
    "select",
    {
      ref: N,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": f,
      onChange: (p) => {
        var y, h;
        return b({
          value: (e.multiple ? (y = c == null ? void 0 : c.current) == null ? void 0 : y.getFormData().getAll(e.full_name) : (h = c == null ? void 0 : c.current) == null ? void 0 : h.getFormData().get(e.full_name)) || p.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...f ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ o("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (p, y) => /* @__PURE__ */ o(
            "option",
            {
              value: p.value || p.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(p) : e.choice_attr),
              children: p.label
            },
            y
          )
        )
      ]
    },
    C
  ) });
}, ot = ({ name: e, className: t }) => {
  const [[n]] = Re(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ o("div", { className: t, children: r.map((s, a) => /* @__PURE__ */ o("span", { children: s.message }, a)) }) : /* @__PURE__ */ o(R, {});
}, Le = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), en = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((s) => s.toLowerCase()), n && t.unshift(Le(n)), r && t.push(Le(r)), t.join(" ");
}, tn = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || en(e.name), s = ["checkbox", "radio"].includes(e.type || "input");
  return /* @__PURE__ */ v(
    "div",
    {
      className: [...(n == null ? void 0 : n.split(" ")) || [], "mb-3", s && "form-check"].filter((a) => a).join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      children: [
        !s && /* @__PURE__ */ o(
          "label",
          {
            className: "form-label",
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        t,
        s && /* @__PURE__ */ o(
          "label",
          {
            className: "form-check-label",
            htmlFor: e.id || he(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ o(ot, { name: e.full_name, className: "invalid-feedback" }),
        e.help && /* @__PURE__ */ o(
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
}, nn = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[s, a]] = Re(), i = T(null), d = (s == null ? void 0 : s.errors[e.full_name]) || [];
  k(() => {
    a({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const m = (f) => {
    a({ action: "validate", payload: e.full_name }), r && r(f);
  }, N = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", l = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ o(R, { children: /* @__PURE__ */ o(
    "input",
    {
      ref: i,
      id: e.id || he(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !d.length,
      onKeyUp: (f) => m({ value: f.target.value }),
      onChange: (f) => m({ value: f.target.value }),
      className: [N, ...d.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    l
  ) });
}, rn = ({
  view: e
}) => /* @__PURE__ */ o(tn, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ o(Xt, { view: e });
    default:
      return /* @__PURE__ */ o(nn, { view: e });
  }
})() }), Pe = ({ children: e }) => /* @__PURE__ */ o(R, { children: e }), st = A.createContext("");
function at() {
  return A.useContext(st);
}
function on({ namespace: e, ...t }) {
  return /* @__PURE__ */ o(st.Provider, { value: e, children: t.children });
}
const H = Y(({ view: e, prefix: t, namespace: n, children: r, props: s, data: a }) => {
  e = e.split(/[._]/).map((C) => Le(C)).join(""), n ?? (n = at());
  const { templates: i } = et(), d = ["crud", n, t, e].filter((C) => C).join("/") + ".tsx", [m, c] = Object.entries(i ?? {}).filter(([C, b]) => C.endsWith(d)).shift() || [], [N, l] = M(1), f = T(Pe);
  return k(() => {
    if (c === void 0)
      return () => {
      };
    c().then((C) => {
      f.current = C.default, l(N + 1);
    });
  }, []), /* @__PURE__ */ o(f.current, { ...s, view: e, controller: n, viewName: e, data: a, parent: r, children: (!c || f.current !== Pe) && r });
}), we = Y(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ o(
  H,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ o(we, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ o(rn, { view: e }, e.id)
  },
  e.id
)), it = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: s = !1 }) => /* @__PURE__ */ o(R, { children: r && r }), ge = Q(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ o("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ o(it, { preload: t, ...n, children: e }) })), sn = A.createContext(null);
function an() {
  return A.useContext(sn);
}
const ct = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r, generateRoute: s } = W();
  e = r(e.entity, e.name, e.namespace) || e;
  const [a, i] = M(), [d, m] = M(t || null);
  T(null);
  const [c, N] = M(n instanceof URLSearchParams ? n : Ae(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(d || {}).map(([b, p]) => b + "-" + p), (c instanceof URLSearchParams ? c : Ae(c)).toString()].filter((b) => b).join("."))), T({});
  const [l, f] = M(1), C = () => {
    e && ne().get({
      url: s(e.route, d ?? null),
      query: c
    }).then(({ data: b, response: p }) => {
      switch (p.status) {
        case 201:
        case 200: {
          i(b);
          break;
        }
        default: {
          if (b instanceof Object) {
            const y = b;
            throw new ie(y.status, y.detail, y.trace);
          }
          throw new ie(p.status, p.statusText);
        }
      }
    });
  };
  return k(() => {
    C();
  }, [JSON.stringify(d), c.toString(), l]), {
    results: a,
    setParameters: m,
    setQueryParameters: (b) => {
      N(new URLSearchParams(b));
    },
    refresh: () => {
      C();
    }
  };
}, te = Y(({ children: e, domain: t, properties: n }) => (n ?? (n = {}), Object.keys(n).forEach((r) => {
  var s;
  e = e == null ? void 0 : e.replaceAll(new RegExp(":" + r, "g"), ((s = n[r]) == null ? void 0 : s.toString()) || "");
}), e = e == null ? void 0 : e.replaceAll(new RegExp(":w+", "g"), ""), /* @__PURE__ */ o(R, { children: e }))), cn = Q(({ name: e, data: t, action: n, parameters: r, onSuccess: s, onError: a, onLoad: i, children: d, embedded: m = !1 }, c) => {
  var P, O, w, L, S;
  const [N, l] = M(!1), { navigate: f, generateLink: C, generateRoute: b } = W(), p = b(n.route, r || {}), y = T(null), h = an(), [u, _] = M();
  fe(c, () => ({
    getData: () => u,
    getFormRef: () => y.current
  }));
  const g = (x) => {
    var j, I;
    let D = {
      ...(j = x.errors) != null && j.length ? { [x.full_name]: x.errors } : {}
    };
    for (let [, U] of Object.entries((x == null ? void 0 : x.children) || []))
      U.children && Object.values(U.children).length ? D = { ...D, ...g(U) } : (I = U.errors) != null && I.length && (D[U.full_name] = U.errors);
    return D;
  }, E = (x) => {
    l(!0), ne().post({ url: p, body: x, bodyType: Ut.FormData }).then(({ status: D, data: j }) => {
      var U;
      if (![200, 201, 400].includes(D))
        return Promise.reject(j);
      _(j);
      const I = g(j.form.modify.view);
      if (Object.entries(I).length) {
        (U = y.current) == null || U.setErrors(I);
        return;
      }
      s && s(j), j.redirect && !m && f(C(j.redirect.route, { ...r || {}, ...j.redirect.parameters }));
    }).catch((D) => {
      a && a(D);
    }).finally(() => {
      l(!1);
    });
  };
  return k(() => {
    i && i();
  }, []), t = (h == null ? void 0 : h.results) ?? t, k(() => {
    _(t);
  }, [JSON.stringify(t)]), u && /* @__PURE__ */ v(R, { children: [
    Object.keys((u == null ? void 0 : u.messages) || {}).map((x, D) => /* @__PURE__ */ o("div", { className: ["alert", "alert-" + x].join(" "), children: ((u == null ? void 0 : u.messages[x]) || ["Item was saved successful."]).join(" ") }, "alert-" + x)),
    /* @__PURE__ */ v(rt, { id: (w = (O = (P = u == null ? void 0 : u.form) == null ? void 0 : P.modify) == null ? void 0 : O.view) == null ? void 0 : w.id, ref: y, action: p, method: "POST", onSubmit: E, children: [
      ((S = (L = u == null ? void 0 : u.form) == null ? void 0 : L.modify) == null ? void 0 : S.view) !== void 0 && /* @__PURE__ */ v(R, { children: [
        /* @__PURE__ */ o(
          we,
          {
            name: e,
            namespace: n.namespace,
            view: u.form.modify.view
          },
          u.form.modify.view.id
        ),
        /* @__PURE__ */ o(ot, { name: u.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ o($, { name: "actions", content: d, data: { formRef: y }, children: /* @__PURE__ */ o(ge, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ o(te, { children: "Save" }) }) })
    ] })
  ] });
}), lt = Q(({
  children: e,
  open: t = !0,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: s = !0,
  size: a,
  onClose: i,
  className: d
}, m) => {
  const [c, N] = M(t);
  fe(m, () => ({
    toggle: () => N(!c),
    open: () => N(!0),
    close: () => p(),
    isOpen: () => c
  })), k(() => {
    N(t);
  }, [t]);
  const l = (y) => {
    if (s)
      switch (y.key) {
        case "Escape": {
          p();
          break;
        }
      }
  };
  k(() => {
    var u;
    if (!c)
      return;
    const y = () => {
      var _;
      (_ = f.current) == null || _.addEventListener("animationend", h);
    }, h = () => {
      var _, g, E;
      (_ = f.current) == null || _.classList.remove(n), (g = f.current) == null || g.removeEventListener("animationstart", y), (E = f.current) == null || E.removeEventListener("animationend", h);
    };
    return setTimeout(() => {
      var _, g;
      (_ = f.current) == null || _.classList.add("d-block", "show"), (g = C == null ? void 0 : C.current) == null || g.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", l), (u = f.current) == null || u.addEventListener("animationstart", y), () => {
      var _, g;
      document.removeEventListener("keydown", l), (_ = f.current) == null || _.removeEventListener("animationstart", y), (g = f.current) == null || g.removeEventListener("animationend", h);
    };
  }, [c]);
  const f = T(null), C = T(null), b = () => {
    N(!1), i && i();
  }, p = () => new Promise((y, h) => {
    var _, g;
    if (!c)
      return y();
    const u = () => {
      var E;
      (E = f == null ? void 0 : f.current) == null || E.classList.remove("show", "d-block"), y(), b();
    };
    if (n) {
      const E = setTimeout(() => {
        u();
      }, n ? 50 : 0);
      (_ = f.current) == null || _.addEventListener("animationstart", () => {
        var P, O;
        clearTimeout(E), (P = f.current) == null || P.removeEventListener("animationend", u), (O = f.current) == null || O.addEventListener("animationend", u);
      }), (g = f.current) == null || g.classList.add(n, "close");
    } else
      u();
  });
  return c && Yt(/* @__PURE__ */ v(R, { children: [
    /* @__PURE__ */ o(
      "div",
      {
        ref: f,
        className: ["modal", a && "modal-" + a, n && n, d].filter((y) => y).join(" "),
        children: /* @__PURE__ */ o("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ v("div", { className: "modal-content", children: [
          /* @__PURE__ */ o($, { name: "header", content: e, data: null, children: /* @__PURE__ */ v("div", { className: "modal-header", children: [
            /* @__PURE__ */ o("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ o($, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ o("button", { onClick: p, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ o("div", { className: "modal-body", children: /* @__PURE__ */ o($, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ o($, { name: "footer", content: e, data: null, children: /* @__PURE__ */ o("div", { className: "modal-footer", children: /* @__PURE__ */ o($, { name: "actions", content: e, data: null, children: /* @__PURE__ */ o("button", { onClick: p, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ o(
      "div",
      {
        ref: C,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((y) => y).join(" ")
      }
    )
  ] }), document.body);
}), ln = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: s,
  className: a,
  ...i
}) => {
  const d = T(null);
  return k(() => {
    if (!d.current)
      return;
    const m = Wt.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: e,
      path: t,
      container: d.current,
      ...n || {}
    });
    return () => {
      m.destroy();
    };
  }, []), /* @__PURE__ */ o("div", { className: a, ref: d, style: { width: r, height: s } });
}, ut = A.createContext(void 0);
var ce = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(ce || {});
function dt() {
  const e = A.useContext(ut);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function un(e) {
  var N;
  const [t, n] = M(), r = T(0), s = T(void 0), [a, i] = M(null);
  k(() => {
    r.current += 1;
  }, [t]);
  const d = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), m = (l) => {
    var b, p;
    let f = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...l || {}
    };
    const C = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(C, f.icon)) {
      const y = C[f.icon], h = Object.keys(d).filter((u) => u.endsWith(y)).pop();
      h && d[h]().then((u) => {
        i(u.default);
      });
    }
    !f.actions && !f.timeoutProgress && (f.actions = {
      cancel: {
        label: "Cancel",
        classList: ["btn-outline-primary"]
      },
      confirm: {
        label: "Confirm"
      }
    }), (b = s.current) != null && b.isOpen() ? (p = s.current) == null || p.close().finally(() => {
      n(f);
    }) : n(f);
  }, c = (l) => {
    var C;
    const f = {
      [l]: !0,
      isConfirmed: l === "confirm",
      isCancelled: l === "cancel",
      isDenied: l === "deny"
    };
    t != null && t.onResult && t.onResult(f), (C = s.current) == null || C.close().then(() => {
      i(null), n(void 0);
    });
  };
  return /* @__PURE__ */ v(ut.Provider, { value: { open: m }, children: [
    e.children,
    t && /* @__PURE__ */ v(lt, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: s, children: [
      /* @__PURE__ */ o(K, { name: "header" }),
      /* @__PURE__ */ o(K, { name: "footer" }),
      /* @__PURE__ */ o(K, { name: "content", children: /* @__PURE__ */ v("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ o(ln, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ o("h3", { className: "modal-alert-title", children: t.title }),
        !!((N = t.text) != null && N.length) && /* @__PURE__ */ o("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ o("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((l) => {
          var f, C, b;
          return /* @__PURE__ */ o(
            ge,
            {
              className: "btn btn-lg mx-2 " + (((f = t.actions) == null ? void 0 : f[l].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => c(l),
              children: ((b = ((C = t.actions) == null ? void 0 : C[l]) ?? null) == null ? void 0 : b.label) || l
            },
            l
          );
        }) })
      ] }) })
    ] }, r.current)
  ] });
}
const V = ({ to: e, children: t, onClick: n, ...r }) => {
  const { navigate: s } = W(), a = T(null), i = (d) => {
    var m;
    n && n(d), !d.defaultPrevented && (m = a == null ? void 0 : a.current) != null && m.href && (d.preventDefault(), s(a.current.href));
  };
  return k(() => {
    var d;
    return (d = a == null ? void 0 : a.current) == null || d.addEventListener("click", i), () => {
      var m;
      (m = a == null ? void 0 : a.current) == null || m.removeEventListener("click", i);
    };
  }, [e, n]), /* @__PURE__ */ o("a", { ref: a, href: e, ...r, children: /* @__PURE__ */ o(it, { children: t && t }) });
}, dn = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: s, generateLink: a } = W(), i = s(e.entity, "list", e.namespace);
  return /* @__PURE__ */ v("section", { className: "edit", children: [
    /* @__PURE__ */ v("header", { children: [
      /* @__PURE__ */ v("h2", { className: "title", children: [
        i && /* @__PURE__ */ o(V, { to: a(i.route, n), children: "←" }),
        /* @__PURE__ */ o($, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ o("nav", { children: /* @__PURE__ */ o($, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ o("main", { children: /* @__PURE__ */ o($, { name: "content", content: t, data: r }) })
  ] });
}, He = ({ action: e, children: t, onSuccess: n, modal: r, props: s }) => {
  const a = { ...e.parameters || {} }, i = T(void 0), d = T(void 0), { results: m } = ct({
    entityAction: e.action,
    initParameters: a
  }), { open: c } = dt();
  return /* @__PURE__ */ v(r ? lt : dn, { ref: d, ...s, action: e, routeParams: a, children: [
    /* @__PURE__ */ o(K, { name: "title", children: /* @__PURE__ */ o($, { name: "title", content: t, data: m, children: (m == null ? void 0 : m.title) || "Title" }) }),
    /* @__PURE__ */ o(K, { name: "navigation", children: /* @__PURE__ */ o(H, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ o($, { name: "navigation", content: t, data: m }) }) }),
    /* @__PURE__ */ o(K, { name: "content", children: /* @__PURE__ */ o(H, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ o($, { name: "content", content: t, data: m, children: /* @__PURE__ */ o(
      cn,
      {
        ref: i,
        data: m,
        action: e.action,
        onSuccess: (l) => {
          var C, b;
          (C = d.current) == null || C.close();
          const f = new CustomEvent("success", { detail: l });
          n && n(f, l), !f.defaultPrevented && c({
            title: "Success",
            text: Object.values(((b = l.messages) == null ? void 0 : b.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: ce.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (l) => {
          console.log(l), c({
            title: l.status + " " + l.detail,
            text: l.detail,
            icon: ce.denied,
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
        parameters: a,
        children: r && /* @__PURE__ */ o(K, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ o(K, { name: "actions", children: /* @__PURE__ */ o($, { name: "actions", content: t, data: m, children: /* @__PURE__ */ o(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var l, f;
          return (f = (l = i.current) == null ? void 0 : l.getFormRef()) == null ? void 0 : f.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, mt = A.createContext(void 0);
function re() {
  var c, N;
  const e = A.useContext(mt);
  if (e === void 0)
    throw new Error("UseList must be within ListProvider");
  const { data: t, onClick: n } = e, r = (c = t == null ? void 0 : t.entity) == null ? void 0 : c.primaryColumn, s = (((N = t == null ? void 0 : t.entity) == null ? void 0 : N.columns) || []).filter((l) => l.visible).filter((l) => l.group !== !1), a = Object.values((t == null ? void 0 : t.action) || []), i = a.filter((l) => l.object), d = s.length + (a.length ? 1 : 0), m = (t == null ? void 0 : t.entity.data.items) ?? [];
  return {
    data: t,
    columns: s,
    actions: a,
    objectActions: i,
    columnsTotal: d,
    primaryColumn: r,
    items: m,
    onClick: n
  };
}
function mn({ data: e, onClick: t, ...n }) {
  return /* @__PURE__ */ o(mt.Provider, { value: { data: e, onClick: t }, children: n.children });
}
const ft = A.createContext(void 0);
function be() {
  const e = A.useContext(ft);
  if (e === void 0)
    throw new Error("UseListItem must be within ListItemProvider");
  const { index: t } = e, { data: n, primaryColumn: r } = re();
  return {
    index: t,
    id: (n == null ? void 0 : n.entity.data.items[t][(r == null ? void 0 : r.field) || ""]) ?? null,
    data: (n == null ? void 0 : n.entity.data.items[t]) ?? null
  };
}
function pt({ index: e, ...t }) {
  return /* @__PURE__ */ o(ft.Provider, { value: { index: e }, children: t.children });
}
const ht = ({ column: e, namespace: t }) => {
  var r;
  const { data: n } = be();
  return n && /* @__PURE__ */ o(H, { namespace: t, data: n, prefix: "list", view: e.field, children: n[e.field] !== void 0 && (n[e.field] instanceof Object ? n[e.field] instanceof Array ? n[e.field].join(", ") : JSON.stringify(n[e.field]) : (r = n[e.field]) == null ? void 0 : r.toString()) });
}, gt = A.createContext(void 0);
function bt() {
  const e = A.useContext(gt);
  if (e === void 0)
    throw new Error("UseBatchActions must be within BatchActionsProvider");
  return e;
}
function fn({ data: e, onClick: t, ...n }) {
  var p, y, h, u, _;
  const r = T([]), s = (p = e == null ? void 0 : e.entity) == null ? void 0 : p.primaryColumn, a = ((e == null ? void 0 : e.entity.data.items) || []).map((g) => g[(s == null ? void 0 : s.field) || ""] || 0), i = !!a.length && a.reduce((g, E) => g && r.current.includes(E), !0), d = (_ = (u = (h = (y = e == null ? void 0 : e.form) == null ? void 0 : y.batch.view.children) == null ? void 0 : h.method) == null ? void 0 : u.choices) == null ? void 0 : _.reduce((g, E) => {
    var w;
    const P = E.label instanceof Function ? E.label() : E.label, O = E.value instanceof Function ? E.value() : (w = E.value) == null ? void 0 : w.toString();
    return { ...g, [O]: P };
  }, {}), m = !!Object.keys(d || {}).length && s, [, c] = M(), N = (g, E = !1) => {
    const P = a[g];
    E ? r.current.push(P) : r.current = r.current.filter((O) => O !== P), c({});
  }, l = (g = !1) => {
    r.current = (g ? r.current.concat(a) : r.current.filter((E) => !a.includes(E))).filter((E, P, O) => O.indexOf(E) === P), c({});
  }, f = () => {
    r.current = [], c({});
  }, C = (g) => {
    const E = a[g];
    return r.current.includes(E);
  }, b = (g) => new Promise((E, P) => {
    var L, S;
    if (!r)
      return P();
    const O = e == null ? void 0 : e.form.batch.view;
    if (!m || !((L = r.current) != null && L.length))
      return P();
    const w = new FormData();
    r.current.forEach((x) => {
      var D;
      w.append(`${(D = O == null ? void 0 : O.children) == null ? void 0 : D.ids.full_name}[]`, x.toString());
    }), w.append(((S = O == null ? void 0 : O.children) == null ? void 0 : S.method.full_name) || "method", g), t(g, r.current, w).then(() => {
      f(), E();
    }).catch(P);
  });
  return /* @__PURE__ */ o(
    gt.Provider,
    {
      value: {
        actions: d,
        toggle: N,
        toggleAll: l,
        isSelected: C,
        isSelectedAll: i,
        executeAction: b,
        selected: r.current,
        clear: f
      },
      children: n.children
    }
  );
}
const yt = ({ row: e }) => {
  const { toggle: t, isSelected: n } = bt();
  return /* @__PURE__ */ o(R, { children: /* @__PURE__ */ o(
    "input",
    {
      checked: n(e),
      className: "me-2 float-start",
      type: "checkbox",
      name: "batch",
      onChange: (r) => t(e, r.target.checked)
    }
  ) });
}, Et = ({ column: e, namespace: t }) => /* @__PURE__ */ o(R, { children: /* @__PURE__ */ o(H, { namespace: t, data: e, prefix: "list", view: e.field + ".label", children: e.label }) }), pn = ({ children: e, action: t, className: n, routeParams: r }) => {
  const { generateLink: s } = W(), { id: a } = be(), { onClick: i } = re();
  return /* @__PURE__ */ o(
    V,
    {
      onClick: (d) => i && i({
        action: t,
        parameters: {
          ...r || {},
          id: a
        }
      }, d),
      className: n,
      to: s(t.route, {
        ...r || {},
        id: a
      }),
      children: e ?? t.title
    }
  );
}, _t = ({ namespace: e, routeParams: t }) => {
  const { objectActions: n } = re(), { data: r } = be();
  return r && /* @__PURE__ */ o(H, { namespace: e, data: r, prefix: "list", view: "object.actions", children: n.map((s, a) => {
    var i;
    return /* @__PURE__ */ o(
      pn,
      {
        action: s,
        routeParams: t,
        className: ["btn", "btn-sm", "mb-1", "ms-1", (((i = s.route) == null ? void 0 : i.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" ")
      },
      a
    );
  }) });
}, hn = Q(({ options: e, routeParams: t, namespace: n }, r) => {
  const { columns: s, primaryColumn: a, objectActions: i, columnsTotal: d, items: m, data: c, onClick: N } = re();
  return /* @__PURE__ */ o("div", { className: "table-responsive", children: /* @__PURE__ */ v("table", { className: "table table-striped table-hover table-bordered", children: [
    /* @__PURE__ */ o("thead", { children: /* @__PURE__ */ v("tr", { children: [
      s.map((l, f) => /* @__PURE__ */ v("th", { children: [
        /* @__PURE__ */ o(Et, { column: l, namespace: n }),
        l.sortable && (c == null ? void 0 : c.sort[l.field]) !== void 0 && /* @__PURE__ */ o(
          V,
          {
            onClick: (C) => N && N({
              action: {
                name: "sort",
                object: !1,
                namespace: n,
                entity: c == null ? void 0 : c.entity.name
              },
              parameters: { [l.field]: c != null && c.sort[l.field] ? (c == null ? void 0 : c.sort[l.field]) === "ASC" ? "DESC" : "" : "ASC" }
            }, C),
            className: "btn",
            to: "#",
            children: c.sort[l.field] ? c.sort[l.field] === "ASC" ? "⇑" : "⇓" : "⇅"
          }
        )
      ] }, f)),
      a && i.length > 0 && /* @__PURE__ */ o("th", { className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ o("tbody", { children: m.length ? m.map((l, f) => /* @__PURE__ */ o(pt, { index: f, children: /* @__PURE__ */ v("tr", { children: [
      s == null ? void 0 : s.map(
        (C, b) => /* @__PURE__ */ v("td", { children: [
          b === 0 && /* @__PURE__ */ o(yt, { row: f }),
          /* @__PURE__ */ o(ht, { column: C, namespace: n })
        ] }, b)
      ),
      a && i.length > 0 && /* @__PURE__ */ o("td", { className: "text-end text-nowrap", children: /* @__PURE__ */ o(_t, { namespace: n }) })
    ] }, f) })) : /* @__PURE__ */ o("tr", { children: /* @__PURE__ */ o("td", { colSpan: d, children: /* @__PURE__ */ o(te, { children: "Not results found." }) }) }) })
  ] }) });
}), se = ({ route: e, page: t, active: n = !1, title: r, children: s }) => {
  const a = new URL(document.location.href);
  return a.searchParams.set("page", t.toString()), /* @__PURE__ */ o("li", { className: `page-item ${n ? "active" : ""}`, children: /* @__PURE__ */ o(
    V,
    {
      to: a.toString(),
      className: "page-link",
      title: r,
      children: s || t
    }
  ) });
}, gn = ({ meta: e }) => {
  const n = e == null ? void 0 : e.totalPages, r = (e == null ? void 0 : e.page) || 1, s = e == null ? void 0 : e.links, a = !!(e != null && e.totalPages);
  return n && /* @__PURE__ */ v("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ v("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ v(R, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ o("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ v("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ o(se, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ v(R, { children: [
        /* @__PURE__ */ o(se, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ o("div", { className: "page-item", children: /* @__PURE__ */ o("a", { className: "page-link", children: "..." }) })
      ] }),
      (s || []).map((i, d) => /* @__PURE__ */ o(se, { page: i, active: i === r }, d)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ v(R, { children: [
        /* @__PURE__ */ o("div", { className: "page-item", children: /* @__PURE__ */ o("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ o(
          se,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ o(se, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, q = /* @__PURE__ */ new Map(), ye = {
  set(e, t, n) {
    q.has(e) || q.set(e, /* @__PURE__ */ new Map());
    const r = q.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return q.has(e) && q.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!q.has(e))
      return;
    const n = q.get(e);
    n.delete(t), n.size === 0 && q.delete(e);
  }
}, bn = 1e3, Oe = "transitionend", Nt = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), yn = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), En = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), s = Number.parseFloat(n);
  return !r && !s ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * bn);
}, _n = (e) => {
  e.dispatchEvent(new Event(Oe));
}, G = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), xe = (e) => G(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(Nt(e)) : null, Ct = (e) => {
  if (!G(e) || e.getClientRects().length === 0)
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
}, Se = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Ye = () => {
}, vt = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Ee = [], Nn = (e) => {
  document.readyState === "loading" ? (Ee.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Ee)
      t();
  }), Ee.push(e)) : e();
}, oe = () => document.documentElement.dir === "rtl", Cn = (e) => {
  Nn(() => {
    const t = vt();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, Te = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, vn = (e, t, n = !0) => {
  if (!n) {
    Te(e);
    return;
  }
  const s = En(t) + 5;
  let a = !1;
  const i = ({ target: d }) => {
    d === t && (a = !0, t.removeEventListener(Oe, i), Te(e));
  };
  t.addEventListener(Oe, i), setTimeout(() => {
    a || _n(t);
  }, s);
}, An = (e, t, n, r) => {
  const s = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[s - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + s) % s), e[Math.max(0, Math.min(a, s - 1))]);
}, Ln = /[^.]*(?=\..*)\.|.*/, Pn = /\..*/, On = /::\d+$/, _e = {};
let We = 1;
const At = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, xn = /* @__PURE__ */ new Set([
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
function Lt(e, t) {
  return t && `${t}::${We++}` || e.uidEvent || We++;
}
function Pt(e) {
  const t = Lt(e);
  return e.uidEvent = t, _e[t] = _e[t] || {}, _e[t];
}
function Sn(e, t) {
  return function n(r) {
    return Me(r, { delegateTarget: e }), n.oneOff && F.off(e, r.type, t), t.apply(e, [r]);
  };
}
function Tn(e, t, n) {
  return function r(s) {
    const a = e.querySelectorAll(t);
    for (let { target: i } = s; i && i !== this; i = i.parentNode)
      for (const d of a)
        if (d === i)
          return Me(s, { delegateTarget: i }), r.oneOff && F.off(e, s.type, t, n), n.apply(i, [s]);
  };
}
function Ot(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function xt(e, t, n) {
  const r = typeof t == "string", s = r ? n : t || n;
  let a = St(e);
  return xn.has(a) || (a = e), [r, s, a];
}
function qe(e, t, n, r, s) {
  if (typeof t != "string" || !e)
    return;
  let [a, i, d] = xt(t, n, r);
  t in At && (i = ((b) => function(p) {
    if (!p.relatedTarget || p.relatedTarget !== p.delegateTarget && !p.delegateTarget.contains(p.relatedTarget))
      return b.call(this, p);
  })(i));
  const m = Pt(e), c = m[d] || (m[d] = {}), N = Ot(c, i, a ? n : null);
  if (N) {
    N.oneOff = N.oneOff && s;
    return;
  }
  const l = Lt(i, t.replace(Ln, "")), f = a ? Tn(e, n, i) : Sn(e, i);
  f.delegationSelector = a ? n : null, f.callable = i, f.oneOff = s, f.uidEvent = l, c[l] = f, e.addEventListener(d, f, a);
}
function ke(e, t, n, r, s) {
  const a = Ot(t[n], r, s);
  a && (e.removeEventListener(n, a, !!s), delete t[n][a.uidEvent]);
}
function kn(e, t, n, r) {
  const s = t[n] || {};
  for (const [a, i] of Object.entries(s))
    a.includes(r) && ke(e, t, n, i.callable, i.delegationSelector);
}
function St(e) {
  return e = e.replace(Pn, ""), At[e] || e;
}
const F = {
  on(e, t, n, r) {
    qe(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    qe(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [s, a, i] = xt(t, n, r), d = i !== t, m = Pt(e), c = m[i] || {}, N = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(c).length)
        return;
      ke(e, m, i, a, s ? n : null);
      return;
    }
    if (N)
      for (const l of Object.keys(m))
        kn(e, m, l, t.slice(1));
    for (const [l, f] of Object.entries(c)) {
      const C = l.replace(On, "");
      (!d || t.includes(C)) && ke(e, m, i, f.callable, f.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = vt(), s = St(t), a = t !== s;
    let i = null, d = !0, m = !0, c = !1;
    a && r && (i = r.Event(t, n), r(e).trigger(i), d = !i.isPropagationStopped(), m = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented());
    const N = Me(new Event(t, { bubbles: d, cancelable: !0 }), n);
    return c && N.preventDefault(), m && e.dispatchEvent(N), N.defaultPrevented && i && i.preventDefault(), N;
  }
};
function Me(e, t = {}) {
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
function ze(e) {
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
function Ne(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const de = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${Ne(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Ne(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, n = Object.keys(e.dataset).filter((r) => r.startsWith("bs") && !r.startsWith("bsConfig"));
    for (const r of n) {
      let s = r.replace(/^bs/, "");
      s = s.charAt(0).toLowerCase() + s.slice(1), t[s] = ze(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return ze(e.getAttribute(`data-bs-${Ne(t)}`));
  }
};
class Dn {
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
    const r = G(n) ? de.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...G(n) ? de.getDataAttributes(n) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, s] of Object.entries(n)) {
      const a = t[r], i = G(a) ? "element" : yn(a);
      if (!new RegExp(s).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${s}".`
        );
    }
  }
}
const jn = "5.3.5";
class Rn extends Dn {
  constructor(t, n) {
    super(), t = xe(t), t && (this._element = t, this._config = this._getConfig(n), ye.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    ye.remove(this._element, this.constructor.DATA_KEY), F.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    vn(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return ye.get(xe(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return jn;
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
const Ce = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let n = e.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
  }
  return t ? t.split(",").map((n) => Nt(n)).join(",") : null;
}, B = {
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
    return this.find(t, e).filter((n) => !Se(n) && Ct(n));
  },
  getSelectorFromElement(e) {
    const t = Ce(e);
    return t && B.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Ce(e);
    return t ? B.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Ce(e);
    return t ? B.find(t) : [];
  }
}, Ge = "dropdown", wn = "bs.dropdown", J = `.${wn}`, Fe = ".data-api", Mn = "Escape", Qe = "Tab", Fn = "ArrowUp", Je = "ArrowDown", In = 2, Un = `hide${J}`, $n = `hidden${J}`, Vn = `show${J}`, Bn = `shown${J}`, Tt = `click${J}${Fe}`, kt = `keydown${J}${Fe}`, Kn = `keyup${J}${Fe}`, ee = "show", Hn = "dropup", Yn = "dropend", Wn = "dropstart", qn = "dropup-center", zn = "dropdown-center", z = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Gn = `${z}.${ee}`, le = ".dropdown-menu", Qn = ".navbar", Jn = ".navbar-nav", Zn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Xn = oe() ? "top-end" : "top-start", er = oe() ? "top-start" : "top-end", tr = oe() ? "bottom-end" : "bottom-start", nr = oe() ? "bottom-start" : "bottom-end", rr = oe() ? "left-start" : "right-start", or = oe() ? "right-start" : "left-start", sr = "top", ar = "bottom", ir = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, cr = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let Z = class ue extends Rn {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = B.next(this._element, le)[0] || B.prev(this._element, le)[0] || B.findOne(le, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return ir;
  }
  static get DefaultType() {
    return cr;
  }
  static get NAME() {
    return Ge;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Se(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!F.trigger(this._element, Vn, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Jn))
        for (const r of [].concat(...document.body.children))
          F.on(r, "mouseover", Ye);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ee), this._element.classList.add(ee), F.trigger(this._element, Bn, t);
    }
  }
  hide() {
    if (Se(this._element) || !this._isShown())
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
    if (!F.trigger(this._element, Un, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          F.off(r, "mouseover", Ye);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ee), this._element.classList.remove(ee), this._element.setAttribute("aria-expanded", "false"), de.removeDataAttribute(this._menu, "popper"), F.trigger(this._element, $n, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !G(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Ge.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Be > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : G(this._config.reference) ? t = xe(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = Be.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(ee);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Yn))
      return rr;
    if (t.classList.contains(Wn))
      return or;
    if (t.classList.contains(qn))
      return sr;
    if (t.classList.contains(zn))
      return ar;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Hn) ? n ? er : Xn : n ? nr : tr;
  }
  _detectNavbar() {
    return this._element.closest(Qn) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (de.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Te(this._config.popperConfig, [void 0, t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = B.find(Zn, this._menu).filter((s) => Ct(s));
    r.length && An(r, n, t === Je, !r.includes(n)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const n = ue.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === In || t.type === "keyup" && t.key !== Qe)
      return;
    const n = B.find(Gn);
    for (const r of n) {
      const s = ue.getInstance(r);
      if (!s || s._config.autoClose === !1)
        continue;
      const a = t.composedPath(), i = a.includes(s._menu);
      if (a.includes(s._element) || s._config.autoClose === "inside" && !i || s._config.autoClose === "outside" && i || s._menu.contains(t.target) && (t.type === "keyup" && t.key === Qe || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const d = { relatedTarget: s._element };
      t.type === "click" && (d.clickEvent = t), s._completeHide(d);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === Mn, s = [Fn, Je].includes(t.key);
    if (!s && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(z) ? this : B.prev(this, z)[0] || B.next(this, z)[0] || B.findOne(z, t.delegateTarget.parentNode), i = ue.getOrCreateInstance(a);
    if (s) {
      t.stopPropagation(), i.show(), i._selectMenuItem(t);
      return;
    }
    i._isShown() && (t.stopPropagation(), i.hide(), a.focus());
  }
};
F.on(document, kt, z, Z.dataApiKeydownHandler);
F.on(document, kt, le, Z.dataApiKeydownHandler);
F.on(document, Tt, Z.clearMenus);
F.on(document, Kn, Z.clearMenus);
F.on(document, Tt, z, function(e) {
  e.preventDefault(), Z.getOrCreateInstance(this).toggle();
});
Cn(Z);
const me = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ o(R, { children: e }), ae = ({ children: e, ...t }) => /* @__PURE__ */ o("div", { className: "dropdown-menu", children: e }), Ie = ({ className: e, children: t, icon: n }) => {
  const r = T(null);
  k(() => {
    const c = new Z(r.current);
    return () => {
      c.dispose();
    };
  }, []);
  const s = A.Children.toArray(t).find((c) => A.isValidElement(c) && c.type === ae), a = A.Children.toArray(t).filter((c) => A.isValidElement(c) && c.type === V), i = A.Children.toArray(t).find((c) => A.isValidElement(c) && c.type === me), d = A.Children.toArray(t).filter((c) => !A.isValidElement(c) || c.type !== V && c.type !== ae && c.type !== me), m = A.isValidElement(i) ? i.props : {};
  return /* @__PURE__ */ v("div", { className: [...(e || "").split(" "), "dropdown"].filter((c, N, l) => l.indexOf(c) === N).join(" "), children: [
    /* @__PURE__ */ o(ge, { ref: r, "data-bs-toggle": "dropdown", ...m, className: [...(m.className || "").split(" "), "btn", "dropdown-toggle"].filter((c, N, l) => l.indexOf(c) === N).join(" "), children: m.children ? m.children : d }),
    s || /* @__PURE__ */ o(ae, { children: a })
  ] });
}, De = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = De(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), Dt = A.createContext({});
function lr() {
  const { setModal: e } = A.useContext(Dt);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function ur(e) {
  const [t, n] = M(), r = T(0);
  k(() => {
    r.current += 1;
  }, [t]);
  const s = {
    ...(t == null ? void 0 : t.props) || {},
    onClose: () => {
      var a;
      (a = t == null ? void 0 : t.props) != null && a.onClose && t.props.onClose(), n(null);
    }
  };
  return /* @__PURE__ */ v(Dt.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ o(
      jt,
      {
        view: t.action.action.name || "list",
        namespace: t.action.action.namespace || "",
        props: {
          action: t.action,
          modal: !0,
          props: s
        }
      },
      r.current
    )
  ] });
}
const dr = ({ formView: e, onClick: t }) => {
  const n = (r) => r.choices !== void 0 ? r.choices ? Object.values(r.data instanceof Object ? r.data : [r.data]).map((s) => {
    var a, i;
    return ((i = (a = r.choices) == null ? void 0 : a[s]) == null ? void 0 : i.label) ?? s;
  }).join(", ") : r.data : r.checked !== void 0 ? r.checked ? "Yes" : "No" : r.data;
  return /* @__PURE__ */ o("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((r) => r.data !== null).map((r, s) => /* @__PURE__ */ v("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ o("small", { className: "mb-2", children: r.label }),
    /* @__PURE__ */ v("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      n(r),
      t && /* @__PURE__ */ o("span", { onClick: () => t(r.name), className: "ms-2", children: "×" })
    ] })
  ] }, s)) });
}, mr = ({ namespace: e }) => {
  const { columns: t } = re(), { index: n } = be();
  return /* @__PURE__ */ o("div", { className: "card mb-3", children: /* @__PURE__ */ o("div", { className: "card-body", children: /* @__PURE__ */ v("div", { className: "d-flex flex-row align-items-start", children: [
    /* @__PURE__ */ o(yt, { row: n }),
    /* @__PURE__ */ o("div", { className: "d-flex flex-column flex-wrap gap-2", children: t.map((r, s) => /* @__PURE__ */ v("div", { children: [
      /* @__PURE__ */ v("span", { className: "text-secondary me-1", children: [
        /* @__PURE__ */ o(Et, { column: r, namespace: e }),
        ":"
      ] }),
      /* @__PURE__ */ o(ht, { column: r, namespace: e })
    ] }, s)) }),
    /* @__PURE__ */ o(_t, { namespace: e })
  ] }) }) });
}, fr = Q(({ item: e, routeParams: t, namespace: n }, r) => {
  const { items: s, primaryColumn: a, data: i } = re();
  return !!i && (s.length ? s.map((d, m) => /* @__PURE__ */ o(pt, { index: m, children: /* @__PURE__ */ o(
    H,
    {
      namespace: (i == null ? void 0 : i.entity.name) || "unknown",
      data: d,
      prefix: "list",
      view: "listItem",
      children: /* @__PURE__ */ o(mr, { namespace: n })
    },
    i == null ? void 0 : i.entity.data.items[m][(a == null ? void 0 : a.field) ?? ""]
  ) })) : /* @__PURE__ */ o(te, { children: "No results found." }));
}), pr = () => {
  const { actions: e, isSelectedAll: t, toggleAll: n, selected: r, executeAction: s, clear: a } = bt();
  return e && /* @__PURE__ */ v("div", { className: "btn-group btn-group-sm mb-2", children: [
    /* @__PURE__ */ o("label", { className: "btn btn-light", children: /* @__PURE__ */ o(
      "input",
      {
        checked: t,
        onChange: (i) => n(i.target.checked),
        type: "checkbox"
      }
    ) }),
    /* @__PURE__ */ v(Ie, { className: "btn-group btn-group-sm", children: [
      /* @__PURE__ */ o(me, { disabled: !(r != null && r.length), className: "btn-light", children: !!(r != null && r.length) && /* @__PURE__ */ o(te, { properties: { number: r == null ? void 0 : r.length }, children: ":number selected" }) }),
      /* @__PURE__ */ o(ae, { children: Object.keys(e).map((i) => /* @__PURE__ */ o(
        V,
        {
          to: "#",
          onClick: () => s(i),
          className: "dropdown-item",
          children: e[i]
        },
        i
      )) })
    ] }),
    !!(r != null && r.length) && /* @__PURE__ */ o("button", { title: "Clear selection", onClick: a, className: "btn btn-light", children: "×" })
  ] });
}, hr = Y(({ action: e, embedded: t = !1 }) => {
  var E, P, O, w;
  const { generateLink: n, generateRoute: r, generateActionLink: s, location: a, navigate: i } = W();
  let d = new URLSearchParams(a.search);
  const m = T(void 0), c = T($t(d)), N = T(null), { openModal: l } = lr(), { open: f } = dt(), C = e.action.entity;
  if (!C)
    throw new Error("Invalid Entity");
  const { results: b, refresh: p, setQueryParameters: y } = ct({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: c.current }), h = Object.values((b == null ? void 0 : b.action) ?? []).filter((L) => !L.object && L.name !== e.action.name), u = (L) => {
    L == null || L.forEach((x) => {
      var D, j;
      (j = (D = c.current) == null ? void 0 : D.filter) == null || delete j[x];
    });
    const S = {
      ...c.current && c.current,
      ...m.current && { sort: m.current }
    };
    if (d = Ae(De(S)), t)
      y(d);
    else {
      const x = new URL(document.location.href);
      x.search = d.toString(), i(x.toString());
    }
  }, _ = (L, S, x) => new Promise((D, j) => {
    f({
      title: "Are you sure?",
      icon: ce.confirm,
      onResult: (I) => {
        I.isConfirmed ? ne().post({
          url: s(e),
          body: x
        }).catch((U) => {
          j();
        }).finally(() => {
          p(), D();
        }) : j();
      }
    });
  }), g = (L, S) => {
    switch (L.parameters !== void 0 && (L.parameters = De(L.parameters), Object.keys(L.parameters).length || (L.parameters = void 0)), L.action.name) {
      case "filter": {
        S == null || S.preventDefault(), c.current = L.parameters;
        break;
      }
      case "sort": {
        S == null || S.preventDefault(), m.current = L.parameters;
        break;
      }
      case "delete": {
        S == null || S.preventDefault(), f({
          title: "Are you sure?",
          icon: ce.confirm,
          onResult: (x) => {
            x.isConfirmed && ne().fetch({
              url: r(L.action.route, { ...e.parameters, ...L.parameters }),
              method: Bt.DELETE
            }).catch((D) => {
              console.log("error", D);
            }).finally(() => {
              p();
            });
          }
        });
        return;
      }
      default: {
        t && (S == null || S.preventDefault(), l({
          action: L,
          props: {
            onClose: () => {
              p();
            }
          }
        }));
        return;
      }
    }
    u();
  };
  return k(() => {
    y(d);
  }, [a.search]), /* @__PURE__ */ o(mn, { data: b, onClick: g, children: /* @__PURE__ */ v("section", { className: "list", children: [
    /* @__PURE__ */ v("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ o("h2", { children: b == null ? void 0 : b.title }),
      /* @__PURE__ */ v("div", { className: "d-flex align-items-center", children: [
        !!h.length && /* @__PURE__ */ o("div", { className: "btn-group btn-group-sm me-2", children: h.map((L, S) => /* @__PURE__ */ o(
          V,
          {
            to: n(L.route, e.parameters),
            onClick: (x) => g({
              action: L,
              parameters: e.parameters
            }, x),
            className: "btn btn-outline-secondary",
            children: L.title || L.name
          },
          S
        )) }),
        ((E = b == null ? void 0 : b.form) == null ? void 0 : E.filter) && /* @__PURE__ */ v("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ v(Ie, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ o(me, { className: "btn-outline-dark", children: /* @__PURE__ */ o(te, { children: "Filter" }) }),
            /* @__PURE__ */ o(ae, { children: /* @__PURE__ */ o("div", { className: "filter", children: /* @__PURE__ */ v(
              rt,
              {
                id: "filter_" + he(C),
                ref: N,
                onSubmit: (L) => g({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  },
                  parameters: Vt(L)
                }),
                onReset: () => g({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  }
                }),
                children: [
                  ((P = b == null ? void 0 : b.form) == null ? void 0 : P.filter) && /* @__PURE__ */ o(we, { view: b.form.filter.view }),
                  /* @__PURE__ */ o("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ o(te, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((O = c.current) == null ? void 0 : O.filter) || []).length && /* @__PURE__ */ o(ge, { onClick: () => {
            var L;
            (L = N.current) == null || L.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ v(fn, { data: b, onClick: _, children: [
      ((w = b == null ? void 0 : b.form) == null ? void 0 : w.filter) && /* @__PURE__ */ o(dr, { formView: b.form.filter.view, onClick: (L) => u([L]) }),
      /* @__PURE__ */ o(pr, {}),
      /* @__PURE__ */ v(H, { prefix: "list", view: "content", data: b, children: [
        /* @__PURE__ */ o(
          hn,
          {
            routeParams: e.parameters
          }
        ),
        /* @__PURE__ */ o(
          fr,
          {
            routeParams: e.parameters
          }
        )
      ] }, "list"),
      /* @__PURE__ */ o(gn, { meta: b == null ? void 0 : b.entity.data.meta })
    ] })
  ] }) });
}), gr = ({ view: e, props: t }) => {
  const n = {
    add: He,
    edit: He,
    list: hr
  };
  if (n[e] === void 0)
    throw new ie(500, "View not found");
  return A.createElement(n[e] || Pe, t);
}, jt = ({ view: e, namespace: t, props: n }) => (t ?? (t = at()), /* @__PURE__ */ o(H, { view: e, props: n, children: /* @__PURE__ */ o(gr, { view: e, props: n }) }, t + e)), br = ({ path: e, preloader: t }) => {
  if (!je.namespace[Ue])
    throw new pe(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = W(), [r, s] = M();
  if (k(() => {
    n(e).then((a) => s(a));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ o(R, { children: "Loading" });
  if (!r)
    throw new ie(404, "Page Not Found");
  return /* @__PURE__ */ o(on, { namespace: r.action.namespace || "", children: /* @__PURE__ */ o(
    jt,
    {
      view: r.action.name,
      props: { action: r }
    }
  ) });
}, yr = ({ children: e, config: t }) => /* @__PURE__ */ o(Qt, { config: t, children: /* @__PURE__ */ o(un, { children: /* @__PURE__ */ o(ur, { children: e }) }) });
let ve;
const Rt = {}, Ue = "dakataa_crud", Sr = ({ connection: e, templates: t }) => {
  je.namespace[Ue] = e, Rt.templates = t;
}, ne = () => (ve || (ve = je.instance({ namespace: Ue })), ve), Tr = Zt(({ path: e, prefix: t, errorFallback: n, templates: r }) => {
  const { location: s } = W();
  return e ?? (e = s.pathname), t && (e = e.replace(new RegExp("^/" + t.replace(new RegExp("^/"), "") + "(/)?"), "/")), r = Object.assign(Rt.templates ?? {}, r ?? {}), /* @__PURE__ */ o(yr, { config: { templates: r, link: { prefix: t } }, children: /* @__PURE__ */ o(qt, { fallback: n ?? /* @__PURE__ */ o(zt, {}), children: /* @__PURE__ */ o(br, { path: e }) }, e) });
}), wt = A.createContext(null), Er = () => A.useContext(wt), _r = ({ item: e, open: t = !1 }) => {
  var u, _;
  const n = !!((u = e.items) != null && u.length), { location: r, generateRoute: s } = W(), a = r.pathname.replace(/(.*?)\/?$/i, "$1"), i = s(e.route), d = a.includes(i, 0), [m, c] = A.useState(d), N = Er(), l = T(null), f = T(null), C = "collapse", b = "collapsing", p = {
    toggle: (g) => {
      c(g !== void 0 ? g : !m);
    }
  }, y = () => {
    var g, E, P, O;
    (g = l.current) == null || g.classList.remove(b), (E = l.current) == null || E.classList.add(C), (P = l.current) == null || P.classList.toggle("show", m), (O = l.current) == null || O.style.removeProperty("height");
  }, h = () => {
    f.current && (clearTimeout(f.current), f.current = null);
  };
  return k(() => {
    var g, E, P, O, w, L, S, x, D;
    return m && N && N.toggle(!0), (g = l.current) == null || g.addEventListener("animationstart", h), (E = l.current) == null || E.addEventListener("transitionstart", h), (P = l.current) == null || P.addEventListener("animationend", y), (O = l.current) == null || O.addEventListener("transitionend", y), (L = l.current) == null || L.style.setProperty("height", (m ? 0 : (w = l.current) == null ? void 0 : w.scrollHeight) + "px"), (S = l.current) == null || S.classList.remove("show"), (x = l.current) == null || x.classList.remove(C), (D = l.current) == null || D.classList.add(b), setTimeout(() => {
      var j, I;
      (I = l.current) == null || I.style.setProperty("height", (m ? (j = l.current) == null ? void 0 : j.scrollHeight : 0) + "px");
    }, 10), f.current = setTimeout(y, 50), () => {
      var j, I, U, $e;
      h(), (j = l.current) == null || j.removeEventListener("animationstart", h), (I = l.current) == null || I.removeEventListener("transitionstart", h), (U = l.current) == null || U.removeEventListener("animationend", y), ($e = l.current) == null || $e.removeEventListener("transitionend", y);
    };
  }, [m]), k(() => {
    t !== m && c(t);
  }, [t]), /* @__PURE__ */ o(wt.Provider, { value: p, children: /* @__PURE__ */ v("nav", { className: ["item", ...m || d ? ["active"] : []].join(" "), children: [
    /* @__PURE__ */ v(
      V,
      {
        to: n ? "#" : s(e.route),
        ...e.icon && { icon: e.icon },
        ...n && {
          onClick: () => {
            c(!m);
          }
        },
        children: [
          /* @__PURE__ */ o("span", { className: "icon" }),
          /* @__PURE__ */ o("span", { className: "title", children: e.title })
        ]
      }
    ),
    n && !!((_ = e.items) != null && _.length) && /* @__PURE__ */ o("nav", { ref: l, className: C, children: /* @__PURE__ */ o(Mt, { items: e.items }) })
  ] }) });
}, Mt = ({ items: e }) => e.map(
  (t) => {
    const n = [parent, t.title].filter((r) => r).join("-").toLowerCase();
    return /* @__PURE__ */ o(_r, { item: t }, n);
  }
), Nr = Q(({ items: e, className: t, open: n = !1 }, r) => {
  const s = T(null), [a, i] = A.useState(n);
  r = r || Ht();
  const d = {
    toggle: (m) => {
      i(m !== void 0 ? m : !a);
    }
  };
  return fe(r, () => d), k(() => {
    document.body.classList.toggle("toggle-nav", a);
    const m = (c) => {
      var N;
      (N = s.current) != null && N.contains(c.target) || (i(!1), document.body.removeEventListener("click", m));
    };
    if (a)
      return document.body.addEventListener("click", m), () => {
        document.body.removeEventListener("click", m);
      };
  }, [a]), /* @__PURE__ */ o("nav", { ref: s, children: /* @__PURE__ */ o(Mt, { items: e }) });
}), kr = Y(({ children: e, ...t }) => {
  const n = T(null), [r, s] = M([]);
  return k(() => {
    ne().get({
      url: "/_crud/navigation"
    }).then(({ status: a, data: i }) => {
      a === 200 && s(i);
    });
  }, []), /* @__PURE__ */ v(Ze, { children: [
    /* @__PURE__ */ o("header", { children: /* @__PURE__ */ v("div", { className: "wrap", children: [
      /* @__PURE__ */ o("button", { onClick: (a) => {
        var i;
        return (i = n.current) == null ? void 0 : i.toggle();
      }, className: "btn btn-mobile", children: /* @__PURE__ */ o("i", {}) }),
      /* @__PURE__ */ o("nav", { className: "first-nav", children: /* @__PURE__ */ o(V, { className: "logo", to: "/", children: "Admin" }) }),
      /* @__PURE__ */ o("nav", { className: "second-nav", children: /* @__PURE__ */ v(Ie, { className: "user", children: [
        /* @__PURE__ */ o("span", { className: "initials", children: "YL" }),
        /* @__PURE__ */ o(V, { to: "#", children: "Yordan Lazarov" }),
        /* @__PURE__ */ o(V, { to: "#", children: "Logout" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ v("main", { children: [
      !!r.length && /* @__PURE__ */ o("div", { className: "navigation d-print-none", children: /* @__PURE__ */ o(Nr, { ref: n, items: r }) }),
      /* @__PURE__ */ o("div", { className: "content", children: e })
    ] })
  ] });
});
export {
  Jt as ActionProvider,
  un as AlertProvider,
  Ze as BaseLayout,
  Tr as Crud,
  Sr as CrudConfiguration,
  br as CrudLoader,
  yr as CrudProvider,
  H as DynamicView,
  qt as ErrorBoundary,
  pe as Exception,
  rt as Form,
  we as FormField,
  tn as FormGroup,
  rn as FormWidget,
  hn as GridView,
  ie as HttpException,
  nn as Input,
  hr as List,
  kr as MainLayout,
  ur as ModalProvider,
  He as Modify,
  $ as TemplateBlock,
  K as TemplateExtend,
  W as UseActions,
  dt as UseAlert,
  lr as UseModal,
  jt as ViewLoader,
  he as nameToId,
  Re as useForm,
  Zt as withRouterContext
};
