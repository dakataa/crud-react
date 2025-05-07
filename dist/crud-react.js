var Dt = Object.defineProperty;
var kt = (e, t, n) => t in e ? Dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => kt(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as s, jsxs as A, Fragment as j } from "react/jsx-runtime";
import De, { convertObjectToURLSearchParams as Ce, RequestBodyType as jt, convertURLSearchParamsToObject as Rt, convertFormDataToObject as wt, Method as Mt } from "@dakataa/requester";
import * as $e from "react";
import L, { memo as H, useState as M, useEffect as D, forwardRef as Q, useRef as T, useImperativeHandle as fe, useReducer as Ft, createRef as It } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { createPortal as $t } from "react-dom";
import Ut from "lottie-web/build/player/esm/lottie.min.js";
import * as Ue from "@popperjs/core";
class me {
  constructor(t = 0, n, r) {
    X(this, "code");
    X(this, "detail");
    X(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class ae extends me {
  constructor(n, r, o) {
    super(0, r, o);
    X(this, "status", 400);
    this.status = n;
  }
}
class Vt extends $e.Component {
  constructor(n) {
    super(n);
    X(this, "promiseRejectionHandler", (n) => {
      n.reason instanceof me && this.setState({
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
    return n instanceof Error && (n = new ae(0, n.message)), {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.log("error", n);
  }
  render() {
    return this.state.hasError ? $e.cloneElement(
      this.props.fallback,
      {
        error: this.state.error,
        children: this.props.children
      }
    ) : this.props.children;
  }
}
const Qe = H(({ children: e }) => /* @__PURE__ */ s("div", { className: "crud", children: e })), Bt = H(({ error: e }) => /* @__PURE__ */ s(Qe, { children: /* @__PURE__ */ s("main", { children: /* @__PURE__ */ A("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ s("h1", { className: "display-1", children: (e == null ? void 0 : e.status) || "Error" }),
  /* @__PURE__ */ s("p", { className: "text-secondary", children: (e == null ? void 0 : e.detail) || "Unknown Error" }),
  /* @__PURE__ */ s("br", {}),
  /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })), Kt = ({ children: e }) => /* @__PURE__ */ s(j, { children: e }), K = H(({ name: e, children: t, data: n, parent: r, render: o }) => (t = L.Children.toArray((o ? o(n, r) : t) || []).map((a) => (L.isValidElement(a) && a.type === Kt && (a = L.cloneElement(a, { children: r })), a)), /* @__PURE__ */ s(j, { children: t }))), U = H(({ name: e, content: t, children: n, data: r }) => {
  const o = L.Children.toArray(t).find((d) => L.isValidElement(d) && d.type === K && d.props.name === e);
  let a = null;
  o && L.isValidElement(o) && (a = L.cloneElement(o, { parent: n, data: r }));
  const i = L.Children.toArray(n).filter((d) => L.isValidElement(d) && d.type !== K);
  return /* @__PURE__ */ s(j, { children: a || (i.length ? i : n) });
}), Je = L.createContext({});
function Ze() {
  return L.useContext(Je);
}
function Ht({ config: e, ...t }) {
  return /* @__PURE__ */ s(Je.Provider, { value: e, children: t.children });
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
const Ve = "actions", Xe = L.createContext(void 0);
function Y() {
  const e = L.useContext(Xe), t = Ze(), { actions: n, location: r, setLocation: o } = e ?? {
    actions: null,
    location: new URL(document.location.href),
    setLocation: () => {
    }
  }, a = (f, u, E) => n == null ? void 0 : n.filter((g) => g.entity === f && g.name === u && (E === void 0 || g.namespace === E)).shift(), i = (f) => n == null ? void 0 : n.find((u) => {
    var E;
    return ((E = u.route) == null ? void 0 : E.path) && l(u.route.path, f);
  }), d = (f) => {
    const u = () => {
      var _;
      const E = i(f);
      if (!E)
        return null;
      const g = l(((_ = E.route) == null ? void 0 : _.path) || "", f);
      return {
        action: E,
        parameters: g == null ? void 0 : g.params
      };
    };
    return new Promise((E) => {
      let g = 0;
      const _ = () => {
        if (g > 10)
          throw new me(0, "Cannot load routes");
        if (e)
          return E(u());
        setTimeout(_, 200), g++;
      };
      _();
    });
  }, m = (f) => f.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), c = (f, u = void 0) => b(m(f), u), N = (f, u) => f ? c(f.path, { ...f.defaults || {}, ...u }) : "#", p = (f) => {
    const u = a(f.action.entity, f.action.name, f.action.namespace);
    return N(u == null ? void 0 : u.route, f.parameters);
  }, h = (f, u) => {
    const E = N(f, u);
    return C(E);
  }, C = (f) => {
    var u;
    return (u = t.link) != null && u.prefix && (f = "/" + t.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + f), f;
  }, y = (f) => {
    try {
      history.pushState(null, "", f);
    } catch {
      window.location.assign(f);
    }
  }, l = (f, u) => {
    var P;
    const E = "^" + f.replace(new RegExp("[{:](\\w+)}?", "g"), "(?<$1>[^/]+)") + "$";
    if (!new RegExp(E, "giu").test(u))
      return null;
    const _ = u.matchAll(new RegExp(E, "giu")), O = (P = _ == null ? void 0 : _.next().value) == null ? void 0 : P.groups;
    return {
      pathname: u,
      params: O,
      pattern: f
    };
  }, b = (f, u) => f.replaceAll(new RegExp("[{:](\\w+)}?", "g"), (E, g) => (u == null ? void 0 : u[g]) || "");
  return {
    getAction: a,
    getActionByPath: i,
    getOnClickActionByPath: d,
    navigate: y,
    location: r,
    matchPath: l,
    generateRoute: N,
    generateRoutePath: c,
    crudToReactPathPattern: m,
    generateActionLink: p,
    generateLink: h
  };
}
function Yt(e) {
  let t = null;
  try {
    const i = sessionStorage.getItem(Ve);
    t = JSON.parse(atob(i || ""));
  } catch {
  }
  const [n, r] = M(t), [o, a] = M(new URL(document.location.href));
  return D(() => {
    if (o && o.toString() !== document.location.toString())
      try {
        history.pushState(null, "", o);
      } catch {
        window.location.assign(o);
      }
  }, [o.toString()]), D(() => {
    const i = () => {
      a(new URL(document.location.href));
    };
    return window.addEventListener("pushstate", i), window.addEventListener("replacestate", i), window.addEventListener("popstate", i), () => {
      window.removeEventListener("pushstate", i), window.removeEventListener("replacestate", i), window.removeEventListener("popstate", i);
    };
  }, []), D(() => {
    t || ne().get({ url: "/_crud/actions" }).then(({ status: i, data: d }) => {
      i === 200 && (sessionStorage.setItem(Ve, btoa(JSON.stringify(d))), r(d));
    }).catch((i) => {
      console.log("error", i);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ s(Xe.Provider, { value: {
    actions: n,
    location: o,
    setLocation: a
  }, children: e.children });
}
function Wt(e) {
  return (t) => {
    const n = L.createElement(e, t);
    return /* @__PURE__ */ s(Yt, { children: n });
  };
}
const et = L.createContext(null);
function ke() {
  const e = L.useContext(et);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const pe = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), tt = Q(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: o,
  onSubmit: a,
  onReset: i,
  ...d
}, m) => {
  const c = T(null), N = {
    response: null,
    constraints: {},
    errors: {}
  }, p = {
    getFormData: () => new FormData(c.current || void 0),
    setFormData: (l) => {
      var b;
      [...((b = c.current) == null ? void 0 : b.elements) || []].forEach((f) => {
        const u = l.get(f.name);
        switch (f.tagName.toLowerCase()) {
          case "select": {
            f.multiple ? [...f.options].forEach((E) => {
              E.selected = l.getAll(f.name).includes(E.value);
            }) : f.value = u;
            break;
          }
          default:
            switch (f.type) {
              case "checkbox":
                f.checked = !!u;
                break;
              default:
                f.value = u;
                break;
            }
        }
      });
    },
    setErrors: (l) => {
      const [, b] = C;
      b({ action: "errors", payload: l });
    },
    reset: () => {
      var l;
      (l = c.current) == null || l.reset();
    },
    submit: () => {
      var l;
      return (l = c.current) == null ? void 0 : l.requestSubmit();
    }
  };
  fe(m, () => p), D(() => {
    const l = () => {
      i && i();
    }, b = c == null ? void 0 : c.current;
    return b == null || b.addEventListener("reset", l), () => {
      b == null || b.removeEventListener("reset", l);
    };
  }, []);
  const h = (l, b) => {
    const f = p.getFormData();
    for (const u of b)
      if (!u.isValid(f.get(l) || null))
        return { valid: !1, message: u.getMessage() };
    return { valid: !0, message: null };
  }, C = Ft((l, b) => {
    const { action: f, payload: u } = b;
    switch (f) {
      case "constraints": {
        const { name: E, constraints: g } = u;
        return {
          ...l,
          constraints: {
            ...l.constraints || {},
            [E]: g
          }
        };
      }
      case "validate": {
        const { valid: E, message: g } = h(u, l.constraints[u] || []), _ = l.errors || {}, O = u;
        return E ? delete _[O] : _[O] = [..._[O] || [], { message: g || "Error" }], Object.keys(_).length ? {
          ...l,
          errors: _
        } : l;
      }
      case "response":
        return {
          ...l,
          response: u
        };
      case "errors":
        return {
          ...l,
          errors: u || []
        };
      case "error": {
        const E = { ...l.errors, ...u };
        return {
          ...l,
          errors: E
        };
      }
    }
    return l;
  }, N), y = (l) => {
    l.preventDefault();
    const [b, f] = C;
    let u = {};
    for (const [g, _] of Object.entries(b.constraints)) {
      const { valid: O, message: P } = h(g, _);
      O || (u[g] = [P]);
    }
    if (Object.values(u).length) {
      f({ action: "errors", payload: u });
      return;
    }
    const E = new FormData((c == null ? void 0 : c.current) || void 0);
    if (o && o(E), a) {
      a(E);
      return;
    }
  };
  return /* @__PURE__ */ s(et.Provider, { value: [C, m, c], children: /* @__PURE__ */ s("form", { id: e, ref: c, onSubmit: y, ...d, children: t }) });
}), qt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: o,
  choiceLabelTransform: a,
  ...i
}) => {
  t = t || [];
  const [[d, m], c] = ke(), N = T(null), h = !!((d == null ? void 0 : d.errors[e.full_name]) || []).length, C = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  D(() => {
    m({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const y = (l) => {
    m({ action: "validate", payload: e.full_name }), r && r(l);
  };
  return e != null && e.expanded ? /* @__PURE__ */ s(j, { children: Object.values(e.choices || []).map(
    (l, b) => {
      var _;
      const f = pe(e.full_name, b), u = o ? o(l) : l.value, E = a ? a(l) : l.label || u, g = {
        id: f,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(l) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ A(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: N,
                defaultValue: u,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (_ = e == null ? void 0 : e.data) == null ? void 0 : _.includes(u),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: f,
                className: "form-check-input",
                ...g,
                onChange: (O) => {
                  var P, w;
                  return y({
                    value: (e != null && e.multiple ? (P = c == null ? void 0 : c.current) == null ? void 0 : P.getFormData().getAll(e == null ? void 0 : e.full_name) : (w = c == null ? void 0 : c.current) == null ? void 0 : w.getFormData().get(e == null ? void 0 : e.full_name)) || O.target.value,
                    targetValue: O.target.value,
                    checked: O.target.checked
                  });
                }
              },
              C
            ),
            /* @__PURE__ */ s(
              "label",
              {
                htmlFor: g.id,
                className: "form-check-label",
                children: E
              }
            )
          ]
        },
        b
      );
    }
  ) }) : /* @__PURE__ */ s(j, { children: /* @__PURE__ */ A(
    "select",
    {
      ref: N,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": h,
      onChange: (l) => {
        var b, f;
        return y({
          value: (e.multiple ? (b = c == null ? void 0 : c.current) == null ? void 0 : b.getFormData().getAll(e.full_name) : (f = c == null ? void 0 : c.current) == null ? void 0 : f.getFormData().get(e.full_name)) || l.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...h ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ s("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (l, b) => /* @__PURE__ */ s(
            "option",
            {
              value: l.value || l.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(l) : e.choice_attr),
              children: l.label
            },
            b
          )
        )
      ]
    },
    C
  ) });
}, nt = ({ name: e, className: t }) => {
  const [[n]] = ke(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ s("div", { className: t, children: r.map((o, a) => /* @__PURE__ */ s("span", { children: o.message }, a)) }) : /* @__PURE__ */ s(j, {});
}, Ae = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), zt = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((o) => o.toLowerCase()), n && t.unshift(Ae(n)), r && t.push(Ae(r)), t.join(" ");
}, Gt = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || zt(e.name), o = ["checkbox", "radio"].includes(e.type || "input");
  return /* @__PURE__ */ A(
    "div",
    {
      className: [...(n == null ? void 0 : n.split(" ")) || [], "mb-3", o && "form-check"].filter((a) => a).join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      children: [
        !o && /* @__PURE__ */ s(
          "label",
          {
            className: "form-label",
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        t,
        o && /* @__PURE__ */ s(
          "label",
          {
            className: "form-check-label",
            htmlFor: e.id || pe(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ s(nt, { name: e.full_name, className: "invalid-feedback" }),
        e.help && /* @__PURE__ */ s(
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
}, Qt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[o, a]] = ke(), i = T(null), d = (o == null ? void 0 : o.errors[e.full_name]) || [];
  D(() => {
    a({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const m = (h) => {
    a({ action: "validate", payload: e.full_name }), r && r(h);
  }, N = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", p = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ s(j, { children: /* @__PURE__ */ s(
    "input",
    {
      ref: i,
      id: e.id || pe(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !d.length,
      onKeyUp: (h) => m({ value: h.target.value }),
      onChange: (h) => m({ value: h.target.value }),
      className: [N, ...d.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    p
  ) });
}, Jt = ({
  view: e
}) => /* @__PURE__ */ s(Gt, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ s(qt, { view: e });
    default:
      return /* @__PURE__ */ s(Qt, { view: e });
  }
})() }), ve = ({ children: e }) => /* @__PURE__ */ s(j, { children: e }), rt = L.createContext("");
function st() {
  return L.useContext(rt);
}
function Zt({ namespace: e, ...t }) {
  return /* @__PURE__ */ s(rt.Provider, { value: e, children: t.children });
}
const q = H(({ namespace: e, view: t, prefix: n, children: r, props: o, data: a }) => {
  t = t.split(/[._]/).map((C) => Ae(C)).join(""), e ?? (e = st());
  const { templates: i } = Ze(), d = ["crud", e, n, t].filter((C) => C).join("/") + ".tsx", [m, c] = Object.entries(i ?? {}).filter(([C, y]) => C.endsWith(d)).shift() || [], [N, p] = M(1), h = T(ve);
  return D(() => {
    if (c === void 0)
      return () => {
      };
    c().then((C) => {
      h.current = C.default, p(N + 1);
    });
  }, []), /* @__PURE__ */ s(h.current, { ...o, view: t, controller: e, viewName: t, data: a, parent: r, children: (!c || h.current !== ve) && r });
}), je = H(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ s(
  q,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ s(je, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ s(Jt, { view: e }, e.id)
  },
  e.id
)), ot = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: o = !1 }) => /* @__PURE__ */ s(j, { children: r && r }), he = Q(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ s("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ s(ot, { preload: t, ...n, children: e }) })), Xt = L.createContext(null);
function en() {
  return L.useContext(Xt);
}
const at = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r, generateRoute: o } = Y();
  e = r(e.entity, e.name, e.namespace) || e;
  const [a, i] = M(), [d, m] = M(t || null);
  T(null);
  const [c, N] = M(n instanceof URLSearchParams ? n : Ce(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(d || {}).map(([y, l]) => y + "-" + l), (c instanceof URLSearchParams ? c : Ce(c)).toString()].filter((y) => y).join("."))), T({});
  const [p, h] = M(1), C = () => {
    e && ne().get({
      url: o(e.route, d ?? null),
      query: c
    }).then(({ data: y, response: l }) => {
      switch (l.status) {
        case 201:
        case 200: {
          i(y);
          break;
        }
        default: {
          if (y instanceof Object) {
            const b = y;
            throw new ae(b.status, b.detail, b.trace);
          }
          throw new ae(l.status, l.statusText);
        }
      }
    });
  };
  return D(() => {
    C();
  }, [JSON.stringify(d), c.toString(), p]), {
    results: a,
    setParameters: m,
    setQueryParameters: (y) => {
      N(new URLSearchParams(y));
    },
    refresh: () => {
      C();
    }
  };
}, te = H(({ children: e, domain: t, properties: n }) => (n ?? (n = {}), Object.keys(n).forEach((r) => {
  var o;
  e = e == null ? void 0 : e.replaceAll(new RegExp(":" + r, "g"), ((o = n[r]) == null ? void 0 : o.toString()) || "");
}), e = e == null ? void 0 : e.replaceAll(new RegExp(":w+", "g"), ""), /* @__PURE__ */ s(j, { children: e }))), tn = Q(({ name: e, data: t, action: n, parameters: r, onSuccess: o, onError: a, onLoad: i, children: d, embedded: m = !1 }, c) => {
  var O, P, w, v, x;
  const [N, p] = M(!1), { navigate: h, generateLink: C, generateRoute: y } = Y(), l = y(n.route, r || {}), b = T(null), f = en(), [u, E] = M();
  fe(c, () => ({
    getData: () => u,
    getFormRef: () => b.current
  }));
  const g = (S) => {
    var R, $;
    let k = {
      ...(R = S.errors) != null && R.length ? { [S.full_name]: S.errors } : {}
    };
    for (let [, F] of Object.entries((S == null ? void 0 : S.children) || []))
      F.children && Object.values(F.children).length ? k = { ...k, ...g(F) } : ($ = F.errors) != null && $.length && (k[F.full_name] = F.errors);
    return k;
  }, _ = (S) => {
    p(!0), ne().post({ url: l, body: S, bodyType: jt.FormData }).then(({ status: k, data: R }) => {
      var F;
      if (![200, 201, 400].includes(k))
        return Promise.reject(R);
      E(R);
      const $ = g(R.form.modify.view);
      if (Object.entries($).length) {
        (F = b.current) == null || F.setErrors($);
        return;
      }
      o && o(R), R.redirect && !m && h(C(R.redirect.route, { ...r || {}, ...R.redirect.parameters }));
    }).catch((k) => {
      a && a(k);
    }).finally(() => {
      p(!1);
    });
  };
  return D(() => {
    i && i();
  }, []), t = (f == null ? void 0 : f.results) ?? t, D(() => {
    E(t);
  }, [JSON.stringify(t)]), u && /* @__PURE__ */ A(j, { children: [
    Object.keys((u == null ? void 0 : u.messages) || {}).map((S, k) => /* @__PURE__ */ s("div", { className: ["alert", "alert-" + S].join(" "), children: ((u == null ? void 0 : u.messages[S]) || ["Item was saved successful."]).join(" ") }, "alert-" + S)),
    /* @__PURE__ */ A(tt, { id: (w = (P = (O = u == null ? void 0 : u.form) == null ? void 0 : O.modify) == null ? void 0 : P.view) == null ? void 0 : w.id, ref: b, action: l, method: "POST", onSubmit: _, children: [
      ((x = (v = u == null ? void 0 : u.form) == null ? void 0 : v.modify) == null ? void 0 : x.view) !== void 0 && /* @__PURE__ */ A(j, { children: [
        /* @__PURE__ */ s(
          je,
          {
            name: e,
            namespace: n.namespace,
            view: u.form.modify.view
          },
          u.form.modify.view.id
        ),
        /* @__PURE__ */ s(nt, { name: u.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ s(U, { name: "actions", content: d, data: { formRef: b }, children: /* @__PURE__ */ s(he, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ s(te, { children: "Save" }) }) })
    ] })
  ] });
}), it = Q(({
  children: e,
  open: t = !0,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: o = !0,
  size: a,
  onClose: i,
  className: d
}, m) => {
  const [c, N] = M(t);
  fe(m, () => ({
    toggle: () => N(!c),
    open: () => N(!0),
    close: () => l(),
    isOpen: () => c
  })), D(() => {
    N(t);
  }, [t]);
  const p = (b) => {
    if (o)
      switch (b.key) {
        case "Escape": {
          l();
          break;
        }
      }
  };
  D(() => {
    var u;
    if (!c)
      return;
    const b = () => {
      var E;
      (E = h.current) == null || E.addEventListener("animationend", f);
    }, f = () => {
      var E, g, _;
      (E = h.current) == null || E.classList.remove(n), (g = h.current) == null || g.removeEventListener("animationstart", b), (_ = h.current) == null || _.removeEventListener("animationend", f);
    };
    return setTimeout(() => {
      var E, g;
      (E = h.current) == null || E.classList.add("d-block", "show"), (g = C == null ? void 0 : C.current) == null || g.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", p), (u = h.current) == null || u.addEventListener("animationstart", b), () => {
      var E, g;
      document.removeEventListener("keydown", p), (E = h.current) == null || E.removeEventListener("animationstart", b), (g = h.current) == null || g.removeEventListener("animationend", f);
    };
  }, [c]);
  const h = T(null), C = T(null), y = () => {
    N(!1), i && i();
  }, l = () => new Promise((b, f) => {
    var E, g;
    if (!c)
      return b();
    const u = () => {
      var _;
      (_ = h == null ? void 0 : h.current) == null || _.classList.remove("show", "d-block"), b(), y();
    };
    if (n) {
      const _ = setTimeout(() => {
        u();
      }, n ? 50 : 0);
      (E = h.current) == null || E.addEventListener("animationstart", () => {
        var O, P;
        clearTimeout(_), (O = h.current) == null || O.removeEventListener("animationend", u), (P = h.current) == null || P.addEventListener("animationend", u);
      }), (g = h.current) == null || g.classList.add(n, "close");
    } else
      u();
  });
  return c && $t(/* @__PURE__ */ A(j, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: ["modal", a && "modal-" + a, n && n, d].filter((b) => b).join(" "),
        children: /* @__PURE__ */ s("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ A("div", { className: "modal-content", children: [
          /* @__PURE__ */ s(U, { name: "header", content: e, data: null, children: /* @__PURE__ */ A("div", { className: "modal-header", children: [
            /* @__PURE__ */ s("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ s(U, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ s("button", { onClick: l, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ s("div", { className: "modal-body", children: /* @__PURE__ */ s(U, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ s(U, { name: "footer", content: e, data: null, children: /* @__PURE__ */ s("div", { className: "modal-footer", children: /* @__PURE__ */ s(U, { name: "actions", content: e, data: null, children: /* @__PURE__ */ s("button", { onClick: l, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ s(
      "div",
      {
        ref: C,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((b) => b).join(" ")
      }
    )
  ] }), document.body);
}), nn = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: o,
  className: a,
  ...i
}) => {
  const d = T(null);
  return D(() => {
    if (!d.current)
      return;
    const m = Ut.loadAnimation({
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
  }, []), /* @__PURE__ */ s("div", { className: a, ref: d, style: { width: r, height: o } });
}, ct = L.createContext(void 0);
var ie = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(ie || {});
function lt() {
  const e = L.useContext(ct);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function rn(e) {
  var N;
  const [t, n] = M(), r = T(0), o = T(void 0), [a, i] = M(null);
  D(() => {
    r.current += 1;
  }, [t]);
  const d = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), m = (p) => {
    var y, l;
    let h = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...p || {}
    };
    const C = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(C, h.icon)) {
      const b = C[h.icon], f = Object.keys(d).filter((u) => u.endsWith(b)).pop();
      f && d[f]().then((u) => {
        i(u.default);
      });
    }
    !h.actions && !h.timeoutProgress && (h.actions = {
      cancel: {
        label: "Cancel",
        classList: ["btn-outline-primary"]
      },
      confirm: {
        label: "Confirm"
      }
    }), (y = o.current) != null && y.isOpen() ? (l = o.current) == null || l.close().finally(() => {
      n(h);
    }) : n(h);
  }, c = (p) => {
    var C;
    const h = {
      [p]: !0,
      isConfirmed: p === "confirm",
      isCancelled: p === "cancel",
      isDenied: p === "deny"
    };
    t != null && t.onResult && t.onResult(h), (C = o.current) == null || C.close().then(() => {
      i(null), n(void 0);
    });
  };
  return /* @__PURE__ */ A(ct.Provider, { value: { open: m }, children: [
    e.children,
    t && /* @__PURE__ */ A(it, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: o, children: [
      /* @__PURE__ */ s(K, { name: "header" }),
      /* @__PURE__ */ s(K, { name: "footer" }),
      /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ A("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ s(nn, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ s("h3", { className: "modal-alert-title", children: t.title }),
        !!((N = t.text) != null && N.length) && /* @__PURE__ */ s("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ s("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((p) => {
          var h, C, y;
          return /* @__PURE__ */ s(
            he,
            {
              className: "btn btn-lg mx-2 " + (((h = t.actions) == null ? void 0 : h[p].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => c(p),
              children: ((y = ((C = t.actions) == null ? void 0 : C[p]) ?? null) == null ? void 0 : y.label) || p
            },
            p
          );
        }) })
      ] }) })
    ] }, r.current)
  ] });
}
const V = ({ to: e, children: t, onClick: n, ...r }) => {
  const { navigate: o } = Y(), a = T(null), i = (d) => {
    var m;
    n && n(d), !d.defaultPrevented && (m = a == null ? void 0 : a.current) != null && m.href && (d.preventDefault(), o(a.current.href));
  };
  return D(() => {
    var d;
    return (d = a == null ? void 0 : a.current) == null || d.addEventListener("click", i), () => {
      var m;
      (m = a == null ? void 0 : a.current) == null || m.removeEventListener("click", i);
    };
  }, [e, n]), /* @__PURE__ */ s("a", { ref: a, href: e, ...r, children: /* @__PURE__ */ s(ot, { children: t && t }) });
}, sn = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: o, generateLink: a } = Y(), i = o(e.entity, "list", e.namespace);
  return /* @__PURE__ */ A("section", { className: "edit", children: [
    /* @__PURE__ */ A("header", { children: [
      /* @__PURE__ */ A("h2", { className: "title", children: [
        i && /* @__PURE__ */ s(V, { to: a(i.route, n), children: "←" }),
        /* @__PURE__ */ s(U, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ s("nav", { children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ s("main", { children: /* @__PURE__ */ s(U, { name: "content", content: t, data: r }) })
  ] });
}, Be = ({ action: e, children: t, onSuccess: n, modal: r, props: o }) => {
  const a = { ...e.parameters || {} }, i = T(void 0), d = T(void 0), { results: m } = at({
    entityAction: e.action,
    initParameters: a
  }), { open: c } = lt();
  return /* @__PURE__ */ A(r ? it : sn, { ref: d, ...o, action: e, routeParams: a, children: [
    /* @__PURE__ */ s(K, { name: "title", children: /* @__PURE__ */ s(U, { name: "title", content: t, data: m, children: (m == null ? void 0 : m.title) || "Title" }) }),
    /* @__PURE__ */ s(K, { name: "navigation", children: /* @__PURE__ */ s(q, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: m }) }) }),
    /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ s(q, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "content", content: t, data: m, children: /* @__PURE__ */ s(
      tn,
      {
        ref: i,
        data: m,
        action: e.action,
        onSuccess: (p) => {
          var C, y;
          (C = d.current) == null || C.close();
          const h = new CustomEvent("success", { detail: p });
          n && n(h, p), !h.defaultPrevented && c({
            title: "Success",
            text: Object.values(((y = p.messages) == null ? void 0 : y.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: ie.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (p) => {
          console.log(p), c({
            title: p.status + " " + p.detail,
            text: p.detail,
            icon: ie.denied,
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
        children: r && /* @__PURE__ */ s(K, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ s(K, { name: "actions", children: /* @__PURE__ */ s(U, { name: "actions", content: t, data: m, children: /* @__PURE__ */ s(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var p, h;
          return (h = (p = i.current) == null ? void 0 : p.getFormRef()) == null ? void 0 : h.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, ut = ({ column: e, row: t, data: n, namespace: r }) => {
  var a, i, d;
  const o = ((i = (a = n.entity) == null ? void 0 : a.data) == null ? void 0 : i.items[t]) || {};
  return /* @__PURE__ */ s(q, { namespace: r, data: o, prefix: "list", view: e.field, children: o[e.field] !== void 0 && (o[e.field] instanceof Object ? o[e.field] instanceof Array ? o[e.field].join(", ") : JSON.stringify(o[e.field]) : (d = o[e.field]) == null ? void 0 : d.toString()) });
}, dt = L.createContext(void 0);
function ft() {
  const e = L.useContext(dt);
  if (e === void 0)
    throw new Error("UseBatchActions must be within BatchActionsProvider");
  return e;
}
function on({ data: e, onClick: t, ...n }) {
  var l, b, f, u, E;
  const r = T([]), o = (l = e == null ? void 0 : e.entity) == null ? void 0 : l.primaryColumn, a = ((e == null ? void 0 : e.entity.data.items) || []).map((g) => g[(o == null ? void 0 : o.field) || ""] || 0), i = !!a.length && a.reduce((g, _) => g && r.current.includes(_), !0), d = (E = (u = (f = (b = e == null ? void 0 : e.form) == null ? void 0 : b.batch.view.children) == null ? void 0 : f.method) == null ? void 0 : u.choices) == null ? void 0 : E.reduce((g, _) => {
    var w;
    const O = _.label instanceof Function ? _.label() : _.label, P = _.value instanceof Function ? _.value() : (w = _.value) == null ? void 0 : w.toString();
    return { ...g, [P]: O };
  }, {}), m = !!Object.keys(d || {}).length && o, [, c] = M(), N = (g, _ = !1) => {
    const O = a[g];
    _ ? r.current.push(O) : r.current = r.current.filter((P) => P !== O), c({});
  }, p = (g = !1) => {
    r.current = (g ? r.current.concat(a) : r.current.filter((_) => !a.includes(_))).filter((_, O, P) => P.indexOf(_) === O), c({});
  }, h = () => {
    r.current = [], c({});
  }, C = (g) => {
    const _ = a[g];
    return r.current.includes(_);
  }, y = (g) => new Promise((_, O) => {
    var v, x;
    if (!r)
      return O();
    const P = e == null ? void 0 : e.form.batch.view;
    if (!m || !((v = r.current) != null && v.length))
      return O();
    const w = new FormData();
    r.current.forEach((S) => {
      var k;
      w.append(`${(k = P == null ? void 0 : P.children) == null ? void 0 : k.ids.full_name}[]`, S.toString());
    }), w.append(((x = P == null ? void 0 : P.children) == null ? void 0 : x.method.full_name) || "method", g), t(g, r.current, w).then(() => {
      h(), _();
    }).catch(O);
  });
  return /* @__PURE__ */ s(
    dt.Provider,
    {
      value: {
        actions: d,
        toggle: N,
        toggleAll: p,
        isSelected: C,
        isSelectedAll: i,
        executeAction: y,
        selected: r.current,
        clear: h
      },
      children: n.children
    }
  );
}
const mt = ({ row: e }) => {
  const { toggle: t, isSelected: n } = ft();
  return /* @__PURE__ */ s(j, { children: /* @__PURE__ */ s(
    "input",
    {
      checked: n(e),
      className: "me-2 float-start",
      type: "checkbox",
      name: "batch",
      onChange: (r) => t(e, r.target.checked)
    }
  ) });
}, pt = ({ column: e, namespace: t }) => /* @__PURE__ */ s(j, { children: /* @__PURE__ */ s(q, { namespace: t, data: e, prefix: "list", view: e.field + ".label", children: e.label }) }), an = Q(({ data: e, columns: t, options: n, onClick: r, routeParams: o, namespace: a }, i) => {
  var C, y;
  t = (t || ((C = e == null ? void 0 : e.entity) == null ? void 0 : C.columns) || []).filter((l) => l.visible).filter((l) => l.group !== !1);
  const { generateLink: d } = Y(), m = (y = e == null ? void 0 : e.entity) == null ? void 0 : y.primaryColumn, c = Object.values((e == null ? void 0 : e.action) || []), N = c.filter((l) => l.object), p = t.length + (c.length ? 1 : 0), h = (e == null ? void 0 : e.entity.data.items) ?? [];
  return /* @__PURE__ */ s("div", { className: "table-responsive", children: /* @__PURE__ */ A("table", { className: "table table-striped table-hover table-bordered", children: [
    /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ A("tr", { children: [
      t.map((l, b) => /* @__PURE__ */ A("th", { children: [
        /* @__PURE__ */ s(pt, { column: l, namespace: a }),
        l.sortable && (e == null ? void 0 : e.sort[l.field]) !== void 0 && /* @__PURE__ */ s(
          V,
          {
            onClick: (f) => r && r({
              action: {
                name: "sort",
                object: !1,
                namespace: a,
                entity: e == null ? void 0 : e.entity.name
              },
              parameters: { [l.field]: e != null && e.sort[l.field] ? (e == null ? void 0 : e.sort[l.field]) === "ASC" ? "DESC" : "" : "ASC" }
            }, f),
            className: "btn",
            to: "#",
            children: e.sort[l.field] ? e.sort[l.field] === "ASC" ? "⇑" : "⇓" : "⇅"
          }
        )
      ] }, b)),
      m && N.length > 0 && /* @__PURE__ */ s("th", { className: "text-end", children: "Actions" })
    ] }) }),
    /* @__PURE__ */ s("tbody", { children: h.length ? h.map(
      (l, b) => /* @__PURE__ */ A("tr", { children: [
        t == null ? void 0 : t.map(
          (f, u) => /* @__PURE__ */ A("td", { children: [
            u === 0 && /* @__PURE__ */ s(mt, { row: b }),
            /* @__PURE__ */ s(ut, { column: f, row: b, data: e, namespace: a || "unknown" })
          ] }, u)
        ),
        m && N.length > 0 && /* @__PURE__ */ s("td", { className: "text-end text-nowrap", children: N.map((f, u) => {
          var E;
          return /* @__PURE__ */ s(
            V,
            {
              onClick: (g) => r && r({
                action: f,
                parameters: {
                  ...o || {},
                  id: l[m == null ? void 0 : m.field]
                }
              }, g),
              className: ["btn", "btn-sm", "mb-1", "ms-1", (((E = f.route) == null ? void 0 : E.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
              to: d(f.route, {
                ...o || {},
                id: l[m.field]
              }),
              children: f.title
            },
            u
          );
        }) })
      ] }, b)
    ) : /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: p, children: /* @__PURE__ */ s(te, { children: "Not results found." }) }) }) })
  ] }) });
}), se = ({ route: e, page: t, active: n = !1, title: r, children: o }) => {
  const a = new URL(document.location.href);
  return a.searchParams.set("page", t.toString()), /* @__PURE__ */ s("li", { className: `page-item ${n ? "active" : ""}`, children: /* @__PURE__ */ s(
    V,
    {
      to: a.toString(),
      className: "page-link",
      title: r,
      children: o || t
    }
  ) });
}, cn = ({ meta: e }) => {
  const n = e == null ? void 0 : e.totalPages, r = (e == null ? void 0 : e.page) || 1, o = e == null ? void 0 : e.links, a = !!(e != null && e.totalPages);
  return n && /* @__PURE__ */ A("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ A("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ A(j, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ s("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ A("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ s(se, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ A(j, { children: [
        /* @__PURE__ */ s(se, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) })
      ] }),
      (o || []).map((i, d) => /* @__PURE__ */ s(se, { page: i, active: i === r }, d)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ A(j, { children: [
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ s(
          se,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ s(se, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, W = /* @__PURE__ */ new Map(), ge = {
  set(e, t, n) {
    W.has(e) || W.set(e, /* @__PURE__ */ new Map());
    const r = W.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return W.has(e) && W.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!W.has(e))
      return;
    const n = W.get(e);
    n.delete(t), n.size === 0 && W.delete(e);
  }
}, ln = 1e3, Le = "transitionend", ht = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), un = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), dn = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), o = Number.parseFloat(n);
  return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * ln);
}, fn = (e) => {
  e.dispatchEvent(new Event(Le));
}, G = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Oe = (e) => G(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(ht(e)) : null, gt = (e) => {
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
}, Pe = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", Ke = () => {
}, bt = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, be = [], mn = (e) => {
  document.readyState === "loading" ? (be.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of be)
      t();
  }), be.push(e)) : e();
}, re = () => document.documentElement.dir === "rtl", pn = (e) => {
  mn(() => {
    const t = bt();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, Se = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, hn = (e, t, n = !0) => {
  if (!n) {
    Se(e);
    return;
  }
  const o = dn(t) + 5;
  let a = !1;
  const i = ({ target: d }) => {
    d === t && (a = !0, t.removeEventListener(Le, i), Se(e));
  };
  t.addEventListener(Le, i), setTimeout(() => {
    a || fn(t);
  }, o);
}, gn = (e, t, n, r) => {
  const o = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[o - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + o) % o), e[Math.max(0, Math.min(a, o - 1))]);
}, bn = /[^.]*(?=\..*)\.|.*/, yn = /\..*/, En = /::\d+$/, ye = {};
let He = 1;
const yt = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, _n = /* @__PURE__ */ new Set([
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
function Et(e, t) {
  return t && `${t}::${He++}` || e.uidEvent || He++;
}
function _t(e) {
  const t = Et(e);
  return e.uidEvent = t, ye[t] = ye[t] || {}, ye[t];
}
function Nn(e, t) {
  return function n(r) {
    return Re(r, { delegateTarget: e }), n.oneOff && I.off(e, r.type, t), t.apply(e, [r]);
  };
}
function Cn(e, t, n) {
  return function r(o) {
    const a = e.querySelectorAll(t);
    for (let { target: i } = o; i && i !== this; i = i.parentNode)
      for (const d of a)
        if (d === i)
          return Re(o, { delegateTarget: i }), r.oneOff && I.off(e, o.type, t, n), n.apply(i, [o]);
  };
}
function Nt(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function Ct(e, t, n) {
  const r = typeof t == "string", o = r ? n : t || n;
  let a = At(e);
  return _n.has(a) || (a = e), [r, o, a];
}
function Ye(e, t, n, r, o) {
  if (typeof t != "string" || !e)
    return;
  let [a, i, d] = Ct(t, n, r);
  t in yt && (i = ((y) => function(l) {
    if (!l.relatedTarget || l.relatedTarget !== l.delegateTarget && !l.delegateTarget.contains(l.relatedTarget))
      return y.call(this, l);
  })(i));
  const m = _t(e), c = m[d] || (m[d] = {}), N = Nt(c, i, a ? n : null);
  if (N) {
    N.oneOff = N.oneOff && o;
    return;
  }
  const p = Et(i, t.replace(bn, "")), h = a ? Cn(e, n, i) : Nn(e, i);
  h.delegationSelector = a ? n : null, h.callable = i, h.oneOff = o, h.uidEvent = p, c[p] = h, e.addEventListener(d, h, a);
}
function xe(e, t, n, r, o) {
  const a = Nt(t[n], r, o);
  a && (e.removeEventListener(n, a, !!o), delete t[n][a.uidEvent]);
}
function An(e, t, n, r) {
  const o = t[n] || {};
  for (const [a, i] of Object.entries(o))
    a.includes(r) && xe(e, t, n, i.callable, i.delegationSelector);
}
function At(e) {
  return e = e.replace(yn, ""), yt[e] || e;
}
const I = {
  on(e, t, n, r) {
    Ye(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Ye(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [o, a, i] = Ct(t, n, r), d = i !== t, m = _t(e), c = m[i] || {}, N = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(c).length)
        return;
      xe(e, m, i, a, o ? n : null);
      return;
    }
    if (N)
      for (const p of Object.keys(m))
        An(e, m, p, t.slice(1));
    for (const [p, h] of Object.entries(c)) {
      const C = p.replace(En, "");
      (!d || t.includes(C)) && xe(e, m, i, h.callable, h.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = bt(), o = At(t), a = t !== o;
    let i = null, d = !0, m = !0, c = !1;
    a && r && (i = r.Event(t, n), r(e).trigger(i), d = !i.isPropagationStopped(), m = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented());
    const N = Re(new Event(t, { bubbles: d, cancelable: !0 }), n);
    return c && N.preventDefault(), m && e.dispatchEvent(N), N.defaultPrevented && i && i.preventDefault(), N;
  }
};
function Re(e, t = {}) {
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
function We(e) {
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
function Ee(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const ue = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${Ee(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Ee(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, n = Object.keys(e.dataset).filter((r) => r.startsWith("bs") && !r.startsWith("bsConfig"));
    for (const r of n) {
      let o = r.replace(/^bs/, "");
      o = o.charAt(0).toLowerCase() + o.slice(1), t[o] = We(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return We(e.getAttribute(`data-bs-${Ee(t)}`));
  }
};
class vn {
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
    const r = G(n) ? ue.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...G(n) ? ue.getDataAttributes(n) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, o] of Object.entries(n)) {
      const a = t[r], i = G(a) ? "element" : un(a);
      if (!new RegExp(o).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${o}".`
        );
    }
  }
}
const Ln = "5.3.5";
class On extends vn {
  constructor(t, n) {
    super(), t = Oe(t), t && (this._element = t, this._config = this._getConfig(n), ge.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    ge.remove(this._element, this.constructor.DATA_KEY), I.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    hn(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return ge.get(Oe(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return Ln;
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
const _e = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let n = e.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
  }
  return t ? t.split(",").map((n) => ht(n)).join(",") : null;
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
    return this.find(t, e).filter((n) => !Pe(n) && gt(n));
  },
  getSelectorFromElement(e) {
    const t = _e(e);
    return t && B.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = _e(e);
    return t ? B.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = _e(e);
    return t ? B.find(t) : [];
  }
}, qe = "dropdown", Pn = "bs.dropdown", J = `.${Pn}`, we = ".data-api", Sn = "Escape", ze = "Tab", xn = "ArrowUp", Ge = "ArrowDown", Tn = 2, Dn = `hide${J}`, kn = `hidden${J}`, jn = `show${J}`, Rn = `shown${J}`, vt = `click${J}${we}`, Lt = `keydown${J}${we}`, wn = `keyup${J}${we}`, ee = "show", Mn = "dropup", Fn = "dropend", In = "dropstart", $n = "dropup-center", Un = "dropdown-center", z = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Vn = `${z}.${ee}`, ce = ".dropdown-menu", Bn = ".navbar", Kn = ".navbar-nav", Hn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Yn = re() ? "top-end" : "top-start", Wn = re() ? "top-start" : "top-end", qn = re() ? "bottom-end" : "bottom-start", zn = re() ? "bottom-start" : "bottom-end", Gn = re() ? "left-start" : "right-start", Qn = re() ? "right-start" : "left-start", Jn = "top", Zn = "bottom", Xn = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, er = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let Z = class le extends On {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = B.next(this._element, ce)[0] || B.prev(this._element, ce)[0] || B.findOne(ce, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Xn;
  }
  static get DefaultType() {
    return er;
  }
  static get NAME() {
    return qe;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (Pe(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!I.trigger(this._element, jn, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Kn))
        for (const r of [].concat(...document.body.children))
          I.on(r, "mouseover", Ke);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ee), this._element.classList.add(ee), I.trigger(this._element, Rn, t);
    }
  }
  hide() {
    if (Pe(this._element) || !this._isShown())
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
    if (!I.trigger(this._element, Dn, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          I.off(r, "mouseover", Ke);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ee), this._element.classList.remove(ee), this._element.setAttribute("aria-expanded", "false"), ue.removeDataAttribute(this._menu, "popper"), I.trigger(this._element, kn, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !G(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${qe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Ue > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : G(this._config.reference) ? t = Oe(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = Ue.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(ee);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Fn))
      return Gn;
    if (t.classList.contains(In))
      return Qn;
    if (t.classList.contains($n))
      return Jn;
    if (t.classList.contains(Un))
      return Zn;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Mn) ? n ? Wn : Yn : n ? zn : qn;
  }
  _detectNavbar() {
    return this._element.closest(Bn) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (ue.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Se(this._config.popperConfig, [void 0, t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = B.find(Hn, this._menu).filter((o) => gt(o));
    r.length && gn(r, n, t === Ge, !r.includes(n)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const n = le.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Tn || t.type === "keyup" && t.key !== ze)
      return;
    const n = B.find(Vn);
    for (const r of n) {
      const o = le.getInstance(r);
      if (!o || o._config.autoClose === !1)
        continue;
      const a = t.composedPath(), i = a.includes(o._menu);
      if (a.includes(o._element) || o._config.autoClose === "inside" && !i || o._config.autoClose === "outside" && i || o._menu.contains(t.target) && (t.type === "keyup" && t.key === ze || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const d = { relatedTarget: o._element };
      t.type === "click" && (d.clickEvent = t), o._completeHide(d);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === Sn, o = [xn, Ge].includes(t.key);
    if (!o && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(z) ? this : B.prev(this, z)[0] || B.next(this, z)[0] || B.findOne(z, t.delegateTarget.parentNode), i = le.getOrCreateInstance(a);
    if (o) {
      t.stopPropagation(), i.show(), i._selectMenuItem(t);
      return;
    }
    i._isShown() && (t.stopPropagation(), i.hide(), a.focus());
  }
};
I.on(document, Lt, z, Z.dataApiKeydownHandler);
I.on(document, Lt, ce, Z.dataApiKeydownHandler);
I.on(document, vt, Z.clearMenus);
I.on(document, wn, Z.clearMenus);
I.on(document, vt, z, function(e) {
  e.preventDefault(), Z.getOrCreateInstance(this).toggle();
});
pn(Z);
const de = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ s(j, { children: e }), oe = ({ children: e, ...t }) => /* @__PURE__ */ s("div", { className: "dropdown-menu", children: e }), Me = ({ className: e, children: t, icon: n }) => {
  const r = T(null);
  D(() => {
    const c = new Z(r.current);
    return () => {
      c.dispose();
    };
  }, []);
  const o = L.Children.toArray(t).find((c) => L.isValidElement(c) && c.type === oe), a = L.Children.toArray(t).filter((c) => L.isValidElement(c) && c.type === V), i = L.Children.toArray(t).find((c) => L.isValidElement(c) && c.type === de), d = L.Children.toArray(t).filter((c) => !L.isValidElement(c) || c.type !== V && c.type !== oe && c.type !== de), m = L.isValidElement(i) ? i.props : {};
  return /* @__PURE__ */ A("div", { className: [...(e || "").split(" "), "dropdown"].filter((c, N, p) => p.indexOf(c) === N).join(" "), children: [
    /* @__PURE__ */ s(he, { ref: r, "data-bs-toggle": "dropdown", ...m, className: [...(m.className || "").split(" "), "btn", "dropdown-toggle"].filter((c, N, p) => p.indexOf(c) === N).join(" "), children: m.children ? m.children : d }),
    o || /* @__PURE__ */ s(oe, { children: a })
  ] });
}, Te = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = Te(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), Ot = L.createContext({});
function tr() {
  const { setModal: e } = L.useContext(Ot);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function nr(e) {
  const [t, n] = M(), r = T(0);
  D(() => {
    r.current += 1;
  }, [t]);
  const o = {
    ...(t == null ? void 0 : t.props) || {},
    onClose: () => {
      var a;
      (a = t == null ? void 0 : t.props) != null && a.onClose && t.props.onClose(), n(null);
    }
  };
  return /* @__PURE__ */ A(Ot.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ s(
      Pt,
      {
        view: t.action.action.name || "list",
        namespace: t.action.action.namespace || "",
        props: {
          action: t.action,
          modal: !0,
          props: o
        }
      },
      r.current
    )
  ] });
}
const rr = ({ formView: e, onClick: t }) => {
  const n = (r) => r.choices !== void 0 ? r.choices ? Object.values(r.data instanceof Object ? r.data : [r.data]).map((o) => {
    var a, i;
    return ((i = (a = r.choices) == null ? void 0 : a[o]) == null ? void 0 : i.label) ?? o;
  }).join(", ") : r.data : r.checked !== void 0 ? r.checked ? "Yes" : "No" : r.data;
  return /* @__PURE__ */ s("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((r) => r.data !== null).map((r, o) => /* @__PURE__ */ A("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ s("small", { className: "mb-2", children: r.label }),
    /* @__PURE__ */ A("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      n(r),
      t && /* @__PURE__ */ s("span", { onClick: () => t(r.name), className: "ms-2", children: "×" })
    ] })
  ] }, o)) });
}, sr = ({ row: e, data: t, onClick: n, namespace: r }) => {
  var a;
  const o = (((a = t == null ? void 0 : t.entity) == null ? void 0 : a.columns) || []).filter((i) => i.visible).filter((i) => i.group !== !1);
  return /* @__PURE__ */ s("div", { className: "card mb-3", children: /* @__PURE__ */ A("div", { className: "card-body", children: [
    /* @__PURE__ */ s(mt, { row: e }),
    /* @__PURE__ */ s("div", { className: "d-flex flex-column flex-wrap gap-2", children: o.map((i, d) => /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ A("span", { className: "text-secondary me-1", children: [
        /* @__PURE__ */ s(pt, { column: i, namespace: r }),
        ":"
      ] }),
      /* @__PURE__ */ s(ut, { column: i, row: e, data: t })
    ] }, d)) })
  ] }) });
}, or = Q(({ item: e, data: t, columns: n, onClick: r, routeParams: o, namespace: a }, i) => {
  var c;
  const d = (c = t == null ? void 0 : t.entity) == null ? void 0 : c.primaryColumn, m = (t == null ? void 0 : t.entity.data.items) ?? [];
  return !!t && /* @__PURE__ */ s(j, { children: m.length ? m.map((N, p) => /* @__PURE__ */ s(q, { namespace: (t == null ? void 0 : t.entity.name) || "unknown", data: N, prefix: "list", view: "listItem", children: /* @__PURE__ */ s(sr, { row: p, data: t, onClick: r, namespace: a }) }, t == null ? void 0 : t.entity.data.items[p][(d == null ? void 0 : d.field) ?? ""])) : /* @__PURE__ */ s(te, { children: "No results found." }) });
}), ar = () => {
  const { actions: e, isSelectedAll: t, toggleAll: n, selected: r, executeAction: o, clear: a } = ft();
  return e && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm mb-2", children: [
    /* @__PURE__ */ s("label", { className: "btn btn-light", children: /* @__PURE__ */ s(
      "input",
      {
        checked: t,
        onChange: (i) => n(i.target.checked),
        type: "checkbox"
      }
    ) }),
    /* @__PURE__ */ A(Me, { className: "btn-group btn-group-sm", children: [
      /* @__PURE__ */ s(de, { disabled: !(r != null && r.length), className: "btn-light", children: !!(r != null && r.length) && /* @__PURE__ */ s(te, { properties: { number: r == null ? void 0 : r.length }, children: ":number selected" }) }),
      /* @__PURE__ */ s(oe, { children: Object.keys(e).map((i) => /* @__PURE__ */ s(
        V,
        {
          to: "#",
          onClick: () => o(i),
          className: "dropdown-item",
          children: e[i]
        },
        i
      )) })
    ] }),
    !!(r != null && r.length) && /* @__PURE__ */ s("button", { title: "Clear selection", onClick: a, className: "btn btn-light", children: "×" })
  ] });
}, ir = H(({ action: e, embedded: t = !1 }) => {
  var _, O, P, w;
  const { generateLink: n, generateRoute: r, generateActionLink: o, location: a, navigate: i } = Y();
  let d = new URLSearchParams(a.search);
  const m = T(void 0), c = T(Rt(d)), N = T(null), { openModal: p } = tr(), { open: h } = lt(), C = e.action.entity;
  if (!C)
    throw new Error("Invalid Entity");
  const { results: y, refresh: l, setQueryParameters: b } = at({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: c.current }), f = Object.values((y == null ? void 0 : y.action) ?? []).filter((v) => !v.object && v.name !== e.action.name), u = (v) => {
    v == null || v.forEach((S) => {
      var k, R;
      (R = (k = c.current) == null ? void 0 : k.filter) == null || delete R[S];
    });
    const x = {
      ...c.current && c.current,
      ...m.current && { sort: m.current }
    };
    if (d = Ce(Te(x)), t)
      b(d);
    else {
      const S = new URL(document.location.href);
      S.search = d.toString(), i(S.toString());
    }
  }, E = (v, x, S) => new Promise((k, R) => {
    h({
      title: "Are you sure?",
      icon: ie.confirm,
      onResult: ($) => {
        $.isConfirmed && ne().post({
          url: o(e),
          body: S
        }).catch((F) => {
          console.log("error", F), R();
        }).finally(() => {
          console.log("done"), l(), k();
        });
      }
    });
  }), g = (v, x) => {
    switch (v.parameters !== void 0 && (v.parameters = Te(v.parameters), Object.keys(v.parameters).length || (v.parameters = void 0)), v.action.name) {
      case "filter": {
        x == null || x.preventDefault(), c.current = v.parameters;
        break;
      }
      case "sort": {
        x == null || x.preventDefault(), m.current = v.parameters;
        break;
      }
      case "delete": {
        x == null || x.preventDefault(), h({
          title: "Are you sure?",
          icon: ie.confirm,
          onResult: (S) => {
            S.isConfirmed && ne().fetch({
              url: r(v.action.route, { ...e.parameters, ...v.parameters }),
              method: Mt.DELETE
            }).catch((k) => {
              console.log("error", k);
            }).finally(() => {
              l();
            });
          }
        });
        return;
      }
      default: {
        t && (x == null || x.preventDefault(), p({
          action: v,
          props: {
            onClose: () => {
              l();
            }
          }
        }));
        return;
      }
    }
    u();
  };
  return D(() => {
    b(d);
  }, [a.search]), /* @__PURE__ */ s(j, { children: /* @__PURE__ */ A("section", { className: "list", children: [
    /* @__PURE__ */ A("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ s("h2", { children: y == null ? void 0 : y.title }),
      /* @__PURE__ */ A("div", { className: "d-flex align-items-center", children: [
        !!f.length && /* @__PURE__ */ s("div", { className: "btn-group btn-group-sm me-2", children: f.map((v, x) => /* @__PURE__ */ s(
          V,
          {
            to: n(v.route, e.parameters),
            onClick: (S) => g({
              action: v,
              parameters: e.parameters
            }, S),
            className: "btn btn-outline-secondary",
            children: v.title || v.name
          },
          x
        )) }),
        ((_ = y == null ? void 0 : y.form) == null ? void 0 : _.filter) && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ A(Me, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ s(de, { className: "btn-outline-dark", children: /* @__PURE__ */ s(te, { children: "Filter" }) }),
            /* @__PURE__ */ s(oe, { children: /* @__PURE__ */ s("div", { className: "filter", children: /* @__PURE__ */ A(
              tt,
              {
                id: "filter_" + pe(C),
                ref: N,
                onSubmit: (v) => g({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  },
                  parameters: wt(v)
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
                  ((O = y == null ? void 0 : y.form) == null ? void 0 : O.filter) && /* @__PURE__ */ s(je, { view: y.form.filter.view }),
                  /* @__PURE__ */ s("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ s(te, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((P = c.current) == null ? void 0 : P.filter) || []).length && /* @__PURE__ */ s(he, { onClick: () => {
            var v;
            (v = N.current) == null || v.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ A(on, { data: y, onClick: E, children: [
      ((w = y == null ? void 0 : y.form) == null ? void 0 : w.filter) && /* @__PURE__ */ s(rr, { formView: y.form.filter.view, onClick: (v) => u([v]) }),
      /* @__PURE__ */ s(ar, {}),
      /* @__PURE__ */ A(q, { namespace: e.action.namespace, prefix: "list", view: "content", data: y, children: [
        /* @__PURE__ */ s(
          an,
          {
            data: y,
            onClick: g,
            namespace: e.action.namespace,
            routeParams: e.parameters
          }
        ),
        /* @__PURE__ */ s(
          or,
          {
            data: y,
            onClick: g,
            namespace: e.action.namespace,
            routeParams: e.parameters
          }
        )
      ] }, "list"),
      /* @__PURE__ */ s(cn, { meta: y == null ? void 0 : y.entity.data.meta })
    ] })
  ] }) });
}), cr = ({ view: e, props: t }) => {
  const n = {
    add: Be,
    edit: Be,
    list: ir
  };
  if (n[e] === void 0)
    throw new ae(500, "View not found");
  return L.createElement(n[e] || ve, t);
}, Pt = ({ view: e, namespace: t, props: n }) => (t ?? (t = st()), /* @__PURE__ */ s(q, { view: e, props: n, children: /* @__PURE__ */ s(cr, { view: e, props: n }) }, t + e)), lr = ({ path: e, preloader: t }) => {
  if (!De.namespace[Fe])
    throw new me(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = Y(), [r, o] = M();
  if (D(() => {
    n(e).then((a) => o(a));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ s(j, { children: "Loading" });
  if (!r)
    throw new ae(404, "Page Not Found");
  return /* @__PURE__ */ s(Zt, { namespace: r.action.namespace || "", children: /* @__PURE__ */ s(
    Pt,
    {
      view: r.action.name,
      props: { action: r }
    }
  ) });
}, ur = ({ children: e, config: t }) => /* @__PURE__ */ s(Ht, { config: t, children: /* @__PURE__ */ s(rn, { children: /* @__PURE__ */ s(nr, { children: e }) }) });
let Ne;
const St = {}, Fe = "dakataa_crud", Nr = ({ connection: e, templates: t }) => {
  De.namespace[Fe] = e, St.templates = t;
}, ne = () => (Ne || (Ne = De.instance({ namespace: Fe })), Ne), Cr = Wt(({ path: e, prefix: t, errorFallback: n, templates: r }) => {
  const { location: o } = Y();
  return e ?? (e = o.pathname), t && (e = e.replace(new RegExp("^/" + t.replace(new RegExp("^/"), "") + "(/)?"), "/")), r = Object.assign(St.templates ?? {}, r ?? {}), /* @__PURE__ */ s(ur, { config: { templates: r, link: { prefix: t } }, children: /* @__PURE__ */ s(Vt, { fallback: n ?? /* @__PURE__ */ s(Bt, {}), children: /* @__PURE__ */ s(lr, { path: e }) }, e) });
}), xt = L.createContext(null), dr = () => L.useContext(xt), fr = ({ item: e, open: t = !1 }) => {
  var u, E;
  const n = !!((u = e.items) != null && u.length), { location: r, generateRoute: o } = Y(), a = r.pathname.replace(/(.*?)\/?$/i, "$1"), i = o(e.route), d = a.includes(i, 0), [m, c] = L.useState(d), N = dr(), p = T(null), h = T(null), C = "collapse", y = "collapsing", l = {
    toggle: (g) => {
      c(g !== void 0 ? g : !m);
    }
  }, b = () => {
    var g, _, O, P;
    (g = p.current) == null || g.classList.remove(y), (_ = p.current) == null || _.classList.add(C), (O = p.current) == null || O.classList.toggle("show", m), (P = p.current) == null || P.style.removeProperty("height");
  }, f = () => {
    h.current && (clearTimeout(h.current), h.current = null);
  };
  return D(() => {
    var g, _, O, P, w, v, x, S, k;
    return m && N && N.toggle(!0), (g = p.current) == null || g.addEventListener("animationstart", f), (_ = p.current) == null || _.addEventListener("transitionstart", f), (O = p.current) == null || O.addEventListener("animationend", b), (P = p.current) == null || P.addEventListener("transitionend", b), (v = p.current) == null || v.style.setProperty("height", (m ? 0 : (w = p.current) == null ? void 0 : w.scrollHeight) + "px"), (x = p.current) == null || x.classList.remove("show"), (S = p.current) == null || S.classList.remove(C), (k = p.current) == null || k.classList.add(y), setTimeout(() => {
      var R, $;
      ($ = p.current) == null || $.style.setProperty("height", (m ? (R = p.current) == null ? void 0 : R.scrollHeight : 0) + "px");
    }, 10), h.current = setTimeout(b, 50), () => {
      var R, $, F, Ie;
      f(), (R = p.current) == null || R.removeEventListener("animationstart", f), ($ = p.current) == null || $.removeEventListener("transitionstart", f), (F = p.current) == null || F.removeEventListener("animationend", b), (Ie = p.current) == null || Ie.removeEventListener("transitionend", b);
    };
  }, [m]), D(() => {
    t !== m && c(t);
  }, [t]), /* @__PURE__ */ s(xt.Provider, { value: l, children: /* @__PURE__ */ A("nav", { className: ["item", ...m || d ? ["active"] : []].join(" "), children: [
    /* @__PURE__ */ A(
      V,
      {
        to: n ? "#" : o(e.route),
        ...e.icon && { icon: e.icon },
        ...n && {
          onClick: () => {
            c(!m);
          }
        },
        children: [
          /* @__PURE__ */ s("span", { className: "icon" }),
          /* @__PURE__ */ s("span", { className: "title", children: e.title })
        ]
      }
    ),
    n && !!((E = e.items) != null && E.length) && /* @__PURE__ */ s("nav", { ref: p, className: C, children: /* @__PURE__ */ s(Tt, { items: e.items }) })
  ] }) });
}, Tt = ({ items: e }) => e.map(
  (t) => {
    const n = [parent, t.title].filter((r) => r).join("-").toLowerCase();
    return /* @__PURE__ */ s(fr, { item: t }, n);
  }
), mr = Q(({ items: e, className: t, open: n = !1 }, r) => {
  const o = T(null), [a, i] = L.useState(n);
  r = r || It();
  const d = {
    toggle: (m) => {
      i(m !== void 0 ? m : !a);
    }
  };
  return fe(r, () => d), D(() => {
    document.body.classList.toggle("toggle-nav", a);
    const m = (c) => {
      var N;
      (N = o.current) != null && N.contains(c.target) || (i(!1), document.body.removeEventListener("click", m));
    };
    if (a)
      return document.body.addEventListener("click", m), () => {
        document.body.removeEventListener("click", m);
      };
  }, [a]), /* @__PURE__ */ s("nav", { ref: o, children: /* @__PURE__ */ s(Tt, { items: e }) });
}), Ar = H(({ children: e, ...t }) => {
  const n = T(null), [r, o] = M([]);
  return D(() => {
    ne().get({
      url: "/_crud/navigation"
    }).then(({ status: a, data: i }) => {
      a === 200 && o(i);
    });
  }, []), /* @__PURE__ */ A(Qe, { children: [
    /* @__PURE__ */ s("header", { children: /* @__PURE__ */ A("div", { className: "wrap", children: [
      /* @__PURE__ */ s("button", { onClick: (a) => {
        var i;
        return (i = n.current) == null ? void 0 : i.toggle();
      }, className: "btn btn-mobile", children: /* @__PURE__ */ s("i", {}) }),
      /* @__PURE__ */ s("nav", { className: "first-nav", children: /* @__PURE__ */ s(V, { className: "logo", to: "/", children: "Admin" }) }),
      /* @__PURE__ */ s("nav", { className: "second-nav", children: /* @__PURE__ */ A(Me, { className: "user", children: [
        /* @__PURE__ */ s("span", { className: "initials", children: "YL" }),
        /* @__PURE__ */ s(V, { to: "#", children: "Yordan Lazarov" }),
        /* @__PURE__ */ s(V, { to: "#", children: "Logout" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ A("main", { children: [
      !!r.length && /* @__PURE__ */ s("div", { className: "navigation d-print-none", children: /* @__PURE__ */ s(mr, { ref: n, items: r }) }),
      /* @__PURE__ */ s("div", { className: "content", children: e })
    ] })
  ] });
});
export {
  Yt as ActionProvider,
  rn as AlertProvider,
  Qe as BaseLayout,
  Cr as Crud,
  Nr as CrudConfiguration,
  lr as CrudLoader,
  ur as CrudProvider,
  q as DynamicView,
  Vt as ErrorBoundary,
  me as Exception,
  tt as Form,
  je as FormField,
  Gt as FormGroup,
  Jt as FormWidget,
  an as GridView,
  ae as HttpException,
  Qt as Input,
  ir as List,
  Ar as MainLayout,
  nr as ModalProvider,
  Be as Modify,
  U as TemplateBlock,
  K as TemplateExtend,
  Y as UseActions,
  lt as UseAlert,
  tr as UseModal,
  Pt as ViewLoader,
  pe as nameToId,
  ke as useForm,
  Wt as withRouterContext
};
