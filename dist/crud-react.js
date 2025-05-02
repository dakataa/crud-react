var St = Object.defineProperty;
var Tt = (e, t, n) => t in e ? St(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var te = (e, t, n) => Tt(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as s, jsxs as A, Fragment as F } from "react/jsx-runtime";
import Me, { convertObjectToURLSearchParams as Oe, RequestBodyType as Dt, convertURLSearchParamsToObject as xt, convertFormDataToObject as kt, Method as jt } from "@dakataa/requester";
import * as He from "react";
import O, { memo as W, useState as I, useEffect as M, forwardRef as se, useRef as j, useImperativeHandle as ge, useReducer as Rt, createRef as Mt } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { createPortal as wt } from "react-dom";
import Ft from "lottie-web/build/player/esm/lottie.min.js";
import * as Ke from "@popperjs/core";
class be {
  constructor(t = 0, n, r) {
    te(this, "code");
    te(this, "detail");
    te(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class le extends be {
  constructor(n, r, o) {
    super(0, r, o);
    te(this, "status", 400);
    this.status = n;
  }
}
class It extends He.Component {
  constructor(n) {
    super(n);
    te(this, "promiseRejectionHandler", (n) => {
      n.reason instanceof be && this.setState({
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
    return n instanceof Error && (n = new le(0, n.message)), {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.log("error", n);
  }
  render() {
    return this.state.hasError ? He.cloneElement(
      this.props.fallback,
      {
        error: this.state.error,
        children: this.props.children
      }
    ) : this.props.children;
  }
}
const et = W(({ children: e }) => /* @__PURE__ */ s("div", { className: "crud", children: e })), $t = W(({ error: e }) => /* @__PURE__ */ s(et, { children: /* @__PURE__ */ s("main", { children: /* @__PURE__ */ A("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ s("h1", { className: "display-1", children: (e == null ? void 0 : e.status) || "Error" }),
  /* @__PURE__ */ s("p", { className: "text-secondary", children: (e == null ? void 0 : e.detail) || "Unknown Error" }),
  /* @__PURE__ */ s("br", {}),
  /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })), Ut = ({ children: e }) => /* @__PURE__ */ s(F, { children: e }), K = W(({ name: e, children: t, data: n, parent: r, render: o }) => (t = O.Children.toArray((o ? o(n, r) : t) || []).map((a) => (O.isValidElement(a) && a.type === Ut && (a = O.cloneElement(a, { children: r })), a)), /* @__PURE__ */ s(F, { children: t }))), V = W(({ name: e, content: t, children: n, data: r }) => {
  const o = O.Children.toArray(t).find((f) => O.isValidElement(f) && f.type === K && f.props.name === e);
  let a = null;
  o && O.isValidElement(o) && (a = O.cloneElement(o, { parent: n, data: r }));
  const i = O.Children.toArray(n).filter((f) => O.isValidElement(f) && f.type !== K);
  return /* @__PURE__ */ s(F, { children: a || (i.length ? i : n) });
}), tt = O.createContext({});
function nt() {
  return O.useContext(tt);
}
function Vt({ config: e, ...t }) {
  return /* @__PURE__ */ s(tt.Provider, { value: e, children: t.children });
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
const Ye = "actions", rt = O.createContext(void 0);
function q() {
  const e = O.useContext(rt), t = nt(), { actions: n, location: r, setLocation: o } = e ?? {
    actions: null,
    location: new URL(document.location.href),
    setLocation: () => {
    }
  }, a = (d, u, _) => n == null ? void 0 : n.filter((N) => N.entity === d && N.name === u && (_ === void 0 || N.namespace === _)).shift(), i = (d) => n == null ? void 0 : n.find((u) => {
    var _;
    return ((_ = u.route) == null ? void 0 : _.path) && l(u.route.path, d);
  }), f = (d) => {
    const u = () => {
      var v;
      const _ = i(d);
      if (!_)
        return null;
      const N = l(((v = _.route) == null ? void 0 : v.path) || "", d);
      return {
        action: _,
        parameters: N == null ? void 0 : N.params
      };
    };
    return new Promise((_) => {
      let N = 0;
      const v = () => {
        if (N > 10)
          throw new be(0, "Cannot load routes");
        if (e)
          return _(u());
        setTimeout(v, 200), N++;
      };
      v();
    });
  }, p = (d) => d.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), c = (d, u = void 0) => E(p(d), u), g = (d, u) => d ? c(d.path, { ...d.defaults || {}, ...u }) : "#", m = (d) => {
    const u = a(d.action.entity, d.action.name, d.action.namespace);
    return g(u == null ? void 0 : u.route, d.parameters);
  }, h = (d, u) => {
    const _ = g(d, u);
    return C(_);
  }, C = (d) => {
    var u;
    return (u = t.link) != null && u.prefix && (d = "/" + t.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + d), d;
  }, b = (d) => {
    try {
      history.pushState(null, "", d);
    } catch {
      window.location.assign(d);
    }
  }, l = (d, u) => {
    var x;
    const _ = "^" + d.replace(new RegExp("[{:](\\w+)}?", "g"), "(?<$1>.+)") + "$";
    if (!new RegExp(_, "giu").test(u))
      return null;
    const v = u.matchAll(new RegExp(_, "giu")), T = (x = v == null ? void 0 : v.next().value) == null ? void 0 : x.groups;
    return {
      pathname: u,
      params: T,
      pattern: d
    };
  }, E = (d, u) => d.replaceAll(new RegExp("[{:](\\w+)}?", "g"), (_, N) => (u == null ? void 0 : u[N]) || "");
  return {
    getAction: a,
    getActionByPath: i,
    getOnClickActionByPath: f,
    navigate: b,
    location: r,
    matchPath: l,
    generateRoute: g,
    generateRoutePath: c,
    crudToReactPathPattern: p,
    generateActionLink: m,
    generateLink: h
  };
}
function Bt(e) {
  let t = null;
  try {
    const i = sessionStorage.getItem(Ye);
    t = JSON.parse(atob(i || ""));
  } catch {
  }
  const [n, r] = I(t), [o, a] = I(new URL(document.location.href));
  return M(() => {
    if (o && o.toString() !== document.location.toString())
      try {
        history.pushState(null, "", o);
      } catch {
        window.location.assign(o);
      }
  }, [o.toString()]), M(() => {
    const i = () => {
      a(new URL(document.location.href));
    };
    return window.addEventListener("pushstate", i), window.addEventListener("replacestate", i), window.addEventListener("popstate", i), () => {
      window.removeEventListener("pushstate", i), window.removeEventListener("replacestate", i), window.removeEventListener("popstate", i);
    };
  }, []), M(() => {
    t || re().get({ url: "/_crud/actions" }).then(({ status: i, data: f }) => {
      i === 200 && (sessionStorage.setItem(Ye, btoa(JSON.stringify(f))), r(f));
    }).catch((i) => {
      console.log("error", i);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ s(rt.Provider, { value: {
    actions: n,
    location: o,
    setLocation: a
  }, children: e.children });
}
function Ht(e) {
  return (t) => {
    const n = O.createElement(e, t);
    return /* @__PURE__ */ s(Bt, { children: n });
  };
}
const st = O.createContext(null);
function we() {
  const e = O.useContext(st);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const Ee = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), ot = se(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: o,
  onSubmit: a,
  onReset: i,
  ...f
}, p) => {
  const c = j(null), g = {
    response: null,
    constraints: {},
    errors: {}
  }, m = {
    getFormData: () => new FormData(c.current || void 0),
    setFormData: (l) => {
      var E;
      [...((E = c.current) == null ? void 0 : E.elements) || []].forEach((d) => {
        const u = l.get(d.name);
        switch (d.tagName.toLowerCase()) {
          case "select": {
            d.multiple ? [...d.options].forEach((_) => {
              _.selected = l.getAll(d.name).includes(_.value);
            }) : d.value = u;
            break;
          }
          default:
            switch (d.type) {
              case "checkbox":
                d.checked = !!u;
                break;
              default:
                d.value = u;
                break;
            }
        }
      });
    },
    setErrors: (l) => {
      const [, E] = C;
      E({ action: "errors", payload: l });
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
  ge(p, () => m), M(() => {
    const l = () => {
      i && i();
    }, E = c == null ? void 0 : c.current;
    return E == null || E.addEventListener("reset", l), () => {
      E == null || E.removeEventListener("reset", l);
    };
  }, []);
  const h = (l, E) => {
    const d = m.getFormData();
    for (const u of E)
      if (!u.isValid(d.get(l) || null))
        return { valid: !1, message: u.getMessage() };
    return { valid: !0, message: null };
  }, C = Rt((l, E) => {
    const { action: d, payload: u } = E;
    switch (d) {
      case "constraints": {
        const { name: _, constraints: N } = u;
        return {
          ...l,
          constraints: {
            ...l.constraints || {},
            [_]: N
          }
        };
      }
      case "validate": {
        const { valid: _, message: N } = h(u, l.constraints[u] || []), v = l.errors || {}, T = u;
        return _ ? delete v[T] : v[T] = [...v[T] || [], { message: N || "Error" }], Object.keys(v).length ? {
          ...l,
          errors: v
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
        const _ = { ...l.errors, ...u };
        return {
          ...l,
          errors: _
        };
      }
    }
    return l;
  }, g), b = (l) => {
    l.preventDefault();
    const [E, d] = C;
    let u = {};
    for (const [N, v] of Object.entries(E.constraints)) {
      const { valid: T, message: x } = h(N, v);
      T || (u[N] = [x]);
    }
    if (Object.values(u).length) {
      d({ action: "errors", payload: u });
      return;
    }
    const _ = new FormData((c == null ? void 0 : c.current) || void 0);
    if (o && o(_), a) {
      a(_);
      return;
    }
  };
  return /* @__PURE__ */ s(st.Provider, { value: [C, p, c], children: /* @__PURE__ */ s("form", { id: e, ref: c, onSubmit: b, ...f, children: t }) });
}), Kt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: o,
  choiceLabelTransform: a,
  ...i
}) => {
  t = t || [];
  const [[f, p], c] = we(), g = j(null), h = !!((f == null ? void 0 : f.errors[e.full_name]) || []).length, C = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  M(() => {
    p({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const b = (l) => {
    p({ action: "validate", payload: e.full_name }), r && r(l);
  };
  return e != null && e.expanded ? /* @__PURE__ */ s(F, { children: Object.values(e.choices || []).map(
    (l, E) => {
      var v;
      const d = Ee(e.full_name, E), u = o ? o(l) : l.value, _ = a ? a(l) : l.label || u, N = {
        id: d,
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
                ref: g,
                defaultValue: u,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (v = e == null ? void 0 : e.data) == null ? void 0 : v.includes(u),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: d,
                className: "form-check-input",
                ...N,
                onChange: (T) => {
                  var x, $;
                  return b({
                    value: (e != null && e.multiple ? (x = c == null ? void 0 : c.current) == null ? void 0 : x.getFormData().getAll(e == null ? void 0 : e.full_name) : ($ = c == null ? void 0 : c.current) == null ? void 0 : $.getFormData().get(e == null ? void 0 : e.full_name)) || T.target.value,
                    targetValue: T.target.value,
                    checked: T.target.checked
                  });
                }
              },
              C
            ),
            /* @__PURE__ */ s(
              "label",
              {
                htmlFor: N.id,
                className: "form-check-label",
                children: _
              }
            )
          ]
        },
        E
      );
    }
  ) }) : /* @__PURE__ */ s(F, { children: /* @__PURE__ */ A(
    "select",
    {
      ref: g,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": h,
      onChange: (l) => {
        var E, d;
        return b({
          value: (e.multiple ? (E = c == null ? void 0 : c.current) == null ? void 0 : E.getFormData().getAll(e.full_name) : (d = c == null ? void 0 : c.current) == null ? void 0 : d.getFormData().get(e.full_name)) || l.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...h ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ s("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (l, E) => /* @__PURE__ */ s(
            "option",
            {
              value: l.value || l.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(l) : e.choice_attr),
              children: l.label
            },
            E
          )
        )
      ]
    },
    C
  ) });
}, at = ({ name: e, className: t }) => {
  const [[n]] = we(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ s("div", { className: t, children: r.map((o, a) => /* @__PURE__ */ s("span", { children: o.message }, a)) }) : /* @__PURE__ */ s(F, {});
}, Pe = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), Yt = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((o) => o.toLowerCase()), n && t.unshift(Pe(n)), r && t.push(Pe(r)), t.join(" ");
}, Wt = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || Yt(e.name), o = ["checkbox", "radio"].includes(e.type || "input");
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
            htmlFor: e.id || Ee(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ s(at, { name: e.full_name, className: "invalid-feedback" }),
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
}, qt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[o, a]] = we(), i = j(null), f = (o == null ? void 0 : o.errors[e.full_name]) || [];
  M(() => {
    a({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const p = (h) => {
    a({ action: "validate", payload: e.full_name }), r && r(h);
  }, g = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", m = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ s(F, { children: /* @__PURE__ */ s(
    "input",
    {
      ref: i,
      id: e.id || Ee(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !f.length,
      onKeyUp: (h) => p({ value: h.target.value }),
      onChange: (h) => p({ value: h.target.value }),
      className: [g, ...f.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    m
  ) });
}, zt = ({
  view: e
}) => /* @__PURE__ */ s(Wt, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ s(Kt, { view: e });
    default:
      return /* @__PURE__ */ s(qt, { view: e });
  }
})() }), Se = ({ children: e }) => /* @__PURE__ */ s(F, { children: e }), Z = W(({ namespace: e, view: t, prefix: n, children: r, props: o, data: a }) => {
  t = t.split(/[._]/).map((C) => Pe(C)).join("");
  const { templates: i } = nt(), f = ["crud", e, n, t].filter((C) => C).join("/") + ".tsx", [p, c] = Object.entries(i ?? {}).filter(([C, b]) => C.endsWith(f)).shift() || [], [g, m] = I(1), h = j(Se);
  return M(() => {
    if (c === void 0)
      return () => {
      };
    c().then((C) => {
      h.current = C.default, m(g + 1);
    });
  }, []), /* @__PURE__ */ s(h.current, { ...o, view: t, controller: e, viewName: t, data: a, parent: r, children: (!c || h.current !== Se) && r });
}), Fe = W(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ s(
  Z,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ s(Fe, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ s(zt, { view: e }, e.id)
  },
  e.id
)), it = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: o = !1 }) => /* @__PURE__ */ s(F, { children: r && r }), ye = se(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ s("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ s(it, { preload: t, ...n, children: e }) })), Gt = O.createContext(null);
function Qt() {
  return O.useContext(Gt);
}
const ct = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r, generateRoute: o } = q();
  e = r(e.entity, e.name, e.namespace) || e;
  const [a, i] = I(), [f, p] = I(t || null);
  j(null);
  const [c, g] = I(n instanceof URLSearchParams ? n : Oe(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(f || {}).map(([b, l]) => b + "-" + l), (c instanceof URLSearchParams ? c : Oe(c)).toString()].filter((b) => b).join("."))), j({});
  const [m, h] = I(1), C = () => {
    e && re().get({
      url: o(e.route, f ?? null),
      query: c
    }).then(({ data: b, response: l }) => {
      switch (l.status) {
        case 201:
        case 200: {
          i(b);
          break;
        }
        default: {
          if (b instanceof Object) {
            const E = b;
            throw new le(E.status, E.detail, E.trace);
          }
          throw new le(l.status, l.statusText);
        }
      }
    });
  };
  return M(() => {
    C();
  }, [JSON.stringify(f), c.toString(), m]), {
    results: a,
    setParameters: p,
    setQueryParameters: (b) => {
      g(new URLSearchParams(b));
    },
    refresh: () => {
      C();
    }
  };
}, me = W(({ children: e }) => /* @__PURE__ */ s(F, { children: e })), Jt = se(({ name: e, data: t, action: n, parameters: r, onSuccess: o, onError: a, onLoad: i, children: f, embedded: p = !1 }, c) => {
  var T, x, $, L, D;
  const [g, m] = I(!1), { navigate: h, generateLink: C, generateRoute: b } = q(), l = b(n.route, r || {}), E = j(null), d = Qt(), [u, _] = I();
  ge(c, () => ({
    getData: () => u,
    getFormRef: () => E.current
  }));
  const N = (S) => {
    var R, y;
    let w = {
      ...(R = S.errors) != null && R.length ? { [S.full_name]: S.errors } : {}
    };
    for (let [, P] of Object.entries((S == null ? void 0 : S.children) || []))
      P.children && Object.values(P.children).length ? w = { ...w, ...N(P) } : (y = P.errors) != null && y.length && (w[P.full_name] = P.errors);
    return w;
  }, v = (S) => {
    m(!0), re().post({ url: l, body: S, bodyType: Dt.FormData }).then(({ status: w, data: R }) => {
      var P;
      if (![200, 201, 400].includes(w))
        return Promise.reject(R);
      _(R);
      const y = N(R.form.modify.view);
      if (Object.entries(y).length) {
        (P = E.current) == null || P.setErrors(y);
        return;
      }
      o && o(R), R.redirect && !p && h(C(R.redirect.route, { ...r || {}, ...R.redirect.parameters }));
    }).catch((w) => {
      a && a(w);
    }).finally(() => {
      m(!1);
    });
  };
  return M(() => {
    i && i();
  }, []), t = (d == null ? void 0 : d.results) ?? t, M(() => {
    _(t);
  }, [JSON.stringify(t)]), u && /* @__PURE__ */ A(F, { children: [
    Object.keys((u == null ? void 0 : u.messages) || {}).map((S, w) => /* @__PURE__ */ s("div", { className: ["alert", "alert-" + S].join(" "), children: ((u == null ? void 0 : u.messages[S]) || ["Item was saved successful."]).join(" ") }, "alert-" + S)),
    /* @__PURE__ */ A(ot, { id: ($ = (x = (T = u == null ? void 0 : u.form) == null ? void 0 : T.modify) == null ? void 0 : x.view) == null ? void 0 : $.id, ref: E, action: l, method: "POST", onSubmit: v, children: [
      ((D = (L = u == null ? void 0 : u.form) == null ? void 0 : L.modify) == null ? void 0 : D.view) !== void 0 && /* @__PURE__ */ A(F, { children: [
        /* @__PURE__ */ s(
          Fe,
          {
            name: e,
            namespace: n.namespace,
            view: u.form.modify.view
          },
          u.form.modify.view.id
        ),
        /* @__PURE__ */ s(at, { name: u.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ s(V, { name: "actions", content: f, data: { formRef: E }, children: /* @__PURE__ */ s(ye, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ s(me, { children: "Save" }) }) })
    ] })
  ] });
}), lt = se(({
  children: e,
  open: t = !0,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: o = !0,
  size: a,
  onClose: i,
  className: f
}, p) => {
  const [c, g] = I(t);
  ge(p, () => ({
    toggle: () => g(!c),
    open: () => g(!0),
    close: () => l(),
    isOpen: () => c
  })), M(() => {
    g(t);
  }, [t]);
  const m = (E) => {
    if (o)
      switch (E.key) {
        case "Escape": {
          l();
          break;
        }
      }
  };
  M(() => {
    var u;
    if (!c)
      return;
    const E = () => {
      var _;
      (_ = h.current) == null || _.addEventListener("animationend", d);
    }, d = () => {
      var _, N, v;
      (_ = h.current) == null || _.classList.remove(n), (N = h.current) == null || N.removeEventListener("animationstart", E), (v = h.current) == null || v.removeEventListener("animationend", d);
    };
    return setTimeout(() => {
      var _, N;
      (_ = h.current) == null || _.classList.add("d-block", "show"), (N = C == null ? void 0 : C.current) == null || N.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", m), (u = h.current) == null || u.addEventListener("animationstart", E), () => {
      var _, N;
      document.removeEventListener("keydown", m), (_ = h.current) == null || _.removeEventListener("animationstart", E), (N = h.current) == null || N.removeEventListener("animationend", d);
    };
  }, [c]);
  const h = j(null), C = j(null), b = () => {
    g(!1), i && i();
  }, l = () => new Promise((E, d) => {
    var _, N;
    if (!c)
      return E();
    const u = () => {
      var v;
      (v = h == null ? void 0 : h.current) == null || v.classList.remove("show", "d-block"), E(), b();
    };
    if (n) {
      const v = setTimeout(() => {
        u();
      }, n ? 50 : 0);
      (_ = h.current) == null || _.addEventListener("animationstart", () => {
        var T, x;
        clearTimeout(v), (T = h.current) == null || T.removeEventListener("animationend", u), (x = h.current) == null || x.addEventListener("animationend", u);
      }), (N = h.current) == null || N.classList.add(n, "close");
    } else
      u();
  });
  return c && wt(/* @__PURE__ */ A(F, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: ["modal", a && "modal-" + a, n && n, f].filter((E) => E).join(" "),
        children: /* @__PURE__ */ s("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ A("div", { className: "modal-content", children: [
          /* @__PURE__ */ s(V, { name: "header", content: e, data: null, children: /* @__PURE__ */ A("div", { className: "modal-header", children: [
            /* @__PURE__ */ s("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ s(V, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ s("button", { onClick: l, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ s("div", { className: "modal-body", children: /* @__PURE__ */ s(V, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ s(V, { name: "footer", content: e, data: null, children: /* @__PURE__ */ s("div", { className: "modal-footer", children: /* @__PURE__ */ s(V, { name: "actions", content: e, data: null, children: /* @__PURE__ */ s("button", { onClick: l, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ s(
      "div",
      {
        ref: C,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((E) => E).join(" ")
      }
    )
  ] }), document.body);
}), Zt = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: o,
  className: a,
  ...i
}) => {
  const f = j(null);
  return M(() => {
    if (!f.current)
      return;
    const p = Ft.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: e,
      path: t,
      container: f.current,
      ...n || {}
    });
    return () => {
      p.destroy();
    };
  }, []), /* @__PURE__ */ s("div", { className: a, ref: f, style: { width: r, height: o } });
}, ut = O.createContext(void 0);
var ue = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(ue || {});
function dt() {
  const e = O.useContext(ut);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function Xt(e) {
  var g;
  const [t, n] = I(), r = j(0), o = j(void 0), [a, i] = I(null);
  M(() => {
    r.current += 1;
  }, [t]);
  const f = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), p = (m) => {
    var b, l;
    let h = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...m || {}
    };
    const C = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(C, h.icon)) {
      const E = C[h.icon], d = Object.keys(f).filter((u) => u.endsWith(E)).pop();
      d && f[d]().then((u) => {
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
    }), (b = o.current) != null && b.isOpen() ? (l = o.current) == null || l.close().finally(() => {
      n(h);
    }) : n(h);
  }, c = (m) => {
    var C;
    const h = {
      [m]: !0,
      isConfirmed: m === "confirm",
      isCancelled: m === "cancel",
      isDenied: m === "deny"
    };
    t != null && t.onResult && t.onResult(h), (C = o.current) == null || C.close().then(() => {
      i(null), n(void 0);
    });
  };
  return /* @__PURE__ */ A(ut.Provider, { value: { open: p }, children: [
    e.children,
    t && /* @__PURE__ */ A(lt, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: o, children: [
      /* @__PURE__ */ s(K, { name: "header" }),
      /* @__PURE__ */ s(K, { name: "footer" }),
      /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ A("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ s(Zt, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ s("h3", { className: "modal-alert-title", children: t.title }),
        !!((g = t.text) != null && g.length) && /* @__PURE__ */ s("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ s("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((m) => {
          var h, C, b;
          return /* @__PURE__ */ s(
            ye,
            {
              className: "btn btn-lg mx-2 " + (((h = t.actions) == null ? void 0 : h[m].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => c(m),
              children: ((b = ((C = t.actions) == null ? void 0 : C[m]) ?? null) == null ? void 0 : b.label) || m
            },
            m
          );
        }) })
      ] }) })
    ] }, r.current)
  ] });
}
const B = ({ to: e, children: t, onClick: n, ...r }) => {
  const { navigate: o } = q(), a = j(null), i = (f) => {
    var p;
    n && n(f), !f.defaultPrevented && (p = a == null ? void 0 : a.current) != null && p.href && (f.preventDefault(), o(a.current.href));
  };
  return M(() => {
    var f;
    return (f = a == null ? void 0 : a.current) == null || f.addEventListener("click", i), () => {
      var p;
      (p = a == null ? void 0 : a.current) == null || p.removeEventListener("click", i);
    };
  }, [e, n]), /* @__PURE__ */ s("a", { ref: a, href: e, ...r, children: /* @__PURE__ */ s(it, { children: t && t }) });
}, en = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: o, generateLink: a } = q(), i = o(e.entity, "list", e.namespace);
  return /* @__PURE__ */ A("section", { className: "edit", children: [
    /* @__PURE__ */ A("header", { children: [
      /* @__PURE__ */ A("h2", { className: "title", children: [
        i && /* @__PURE__ */ s(B, { to: a(i.route, n), children: "←" }),
        /* @__PURE__ */ s(V, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ s("nav", { children: /* @__PURE__ */ s(V, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ s("main", { children: /* @__PURE__ */ s(V, { name: "content", content: t, data: r }) })
  ] });
}, We = ({ action: e, children: t, onSuccess: n, modal: r, props: o }) => {
  const a = { ...e.parameters || {} }, i = j(void 0), f = j(void 0), { results: p } = ct({
    entityAction: e.action,
    initParameters: a
  }), { open: c } = dt();
  return /* @__PURE__ */ A(r ? lt : en, { ref: f, ...o, action: e, routeParams: a, children: [
    /* @__PURE__ */ s(K, { name: "title", children: /* @__PURE__ */ s(V, { name: "title", content: t, data: p, children: (p == null ? void 0 : p.title) || "Title" }) }),
    /* @__PURE__ */ s(K, { name: "navigation", children: /* @__PURE__ */ s(Z, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ s(V, { name: "navigation", content: t, data: p }) }) }),
    /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ s(Z, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ s(V, { name: "content", content: t, data: p, children: /* @__PURE__ */ s(
      Jt,
      {
        ref: i,
        data: p,
        action: e.action,
        onSuccess: (m) => {
          var C, b;
          (C = f.current) == null || C.close();
          const h = new CustomEvent("success", { detail: m });
          n && n(h, m), !h.defaultPrevented && c({
            title: "Success",
            text: Object.values(((b = m.messages) == null ? void 0 : b.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: ue.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (m) => {
          console.log(m), c({
            title: m.status + " " + m.detail,
            text: m.detail,
            icon: ue.denied,
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
    /* @__PURE__ */ s(K, { name: "actions", children: /* @__PURE__ */ s(V, { name: "actions", content: t, data: p, children: /* @__PURE__ */ s(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var m, h;
          return (h = (m = i.current) == null ? void 0 : m.getFormRef()) == null ? void 0 : h.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, G = /* @__PURE__ */ new Map(), _e = {
  set(e, t, n) {
    G.has(e) || G.set(e, /* @__PURE__ */ new Map());
    const r = G.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return G.has(e) && G.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!G.has(e))
      return;
    const n = G.get(e);
    n.delete(t), n.size === 0 && G.delete(e);
  }
}, tn = 1e3, Te = "transitionend", ft = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), nn = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), rn = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), o = Number.parseFloat(n);
  return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * tn);
}, sn = (e) => {
  e.dispatchEvent(new Event(Te));
}, J = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), De = (e) => J(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(ft(e)) : null, mt = (e) => {
  if (!J(e) || e.getClientRects().length === 0)
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
}, xe = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", qe = () => {
}, pt = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Ne = [], on = (e) => {
  document.readyState === "loading" ? (Ne.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Ne)
      t();
  }), Ne.push(e)) : e();
}, oe = () => document.documentElement.dir === "rtl", an = (e) => {
  on(() => {
    const t = pt();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, ke = (e, t = [], n = e) => typeof e == "function" ? e.call(...t) : n, cn = (e, t, n = !0) => {
  if (!n) {
    ke(e);
    return;
  }
  const o = rn(t) + 5;
  let a = !1;
  const i = ({ target: f }) => {
    f === t && (a = !0, t.removeEventListener(Te, i), ke(e));
  };
  t.addEventListener(Te, i), setTimeout(() => {
    a || sn(t);
  }, o);
}, ln = (e, t, n, r) => {
  const o = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[o - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + o) % o), e[Math.max(0, Math.min(a, o - 1))]);
}, un = /[^.]*(?=\..*)\.|.*/, dn = /\..*/, fn = /::\d+$/, Ce = {};
let ze = 1;
const ht = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, mn = /* @__PURE__ */ new Set([
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
function gt(e, t) {
  return t && `${t}::${ze++}` || e.uidEvent || ze++;
}
function bt(e) {
  const t = gt(e);
  return e.uidEvent = t, Ce[t] = Ce[t] || {}, Ce[t];
}
function pn(e, t) {
  return function n(r) {
    return Ie(r, { delegateTarget: e }), n.oneOff && U.off(e, r.type, t), t.apply(e, [r]);
  };
}
function hn(e, t, n) {
  return function r(o) {
    const a = e.querySelectorAll(t);
    for (let { target: i } = o; i && i !== this; i = i.parentNode)
      for (const f of a)
        if (f === i)
          return Ie(o, { delegateTarget: i }), r.oneOff && U.off(e, o.type, t, n), n.apply(i, [o]);
  };
}
function Et(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function yt(e, t, n) {
  const r = typeof t == "string", o = r ? n : t || n;
  let a = _t(e);
  return mn.has(a) || (a = e), [r, o, a];
}
function Ge(e, t, n, r, o) {
  if (typeof t != "string" || !e)
    return;
  let [a, i, f] = yt(t, n, r);
  t in ht && (i = ((b) => function(l) {
    if (!l.relatedTarget || l.relatedTarget !== l.delegateTarget && !l.delegateTarget.contains(l.relatedTarget))
      return b.call(this, l);
  })(i));
  const p = bt(e), c = p[f] || (p[f] = {}), g = Et(c, i, a ? n : null);
  if (g) {
    g.oneOff = g.oneOff && o;
    return;
  }
  const m = gt(i, t.replace(un, "")), h = a ? hn(e, n, i) : pn(e, i);
  h.delegationSelector = a ? n : null, h.callable = i, h.oneOff = o, h.uidEvent = m, c[m] = h, e.addEventListener(f, h, a);
}
function je(e, t, n, r, o) {
  const a = Et(t[n], r, o);
  a && (e.removeEventListener(n, a, !!o), delete t[n][a.uidEvent]);
}
function gn(e, t, n, r) {
  const o = t[n] || {};
  for (const [a, i] of Object.entries(o))
    a.includes(r) && je(e, t, n, i.callable, i.delegationSelector);
}
function _t(e) {
  return e = e.replace(dn, ""), ht[e] || e;
}
const U = {
  on(e, t, n, r) {
    Ge(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Ge(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [o, a, i] = yt(t, n, r), f = i !== t, p = bt(e), c = p[i] || {}, g = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(c).length)
        return;
      je(e, p, i, a, o ? n : null);
      return;
    }
    if (g)
      for (const m of Object.keys(p))
        gn(e, p, m, t.slice(1));
    for (const [m, h] of Object.entries(c)) {
      const C = m.replace(fn, "");
      (!f || t.includes(C)) && je(e, p, i, h.callable, h.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = pt(), o = _t(t), a = t !== o;
    let i = null, f = !0, p = !0, c = !1;
    a && r && (i = r.Event(t, n), r(e).trigger(i), f = !i.isPropagationStopped(), p = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented());
    const g = Ie(new Event(t, { bubbles: f, cancelable: !0 }), n);
    return c && g.preventDefault(), p && e.dispatchEvent(g), g.defaultPrevented && i && i.preventDefault(), g;
  }
};
function Ie(e, t = {}) {
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
function Qe(e) {
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
function Ae(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const pe = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${Ae(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${Ae(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, n = Object.keys(e.dataset).filter((r) => r.startsWith("bs") && !r.startsWith("bsConfig"));
    for (const r of n) {
      let o = r.replace(/^bs/, "");
      o = o.charAt(0).toLowerCase() + o.slice(1), t[o] = Qe(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Qe(e.getAttribute(`data-bs-${Ae(t)}`));
  }
};
class bn {
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
    const r = J(n) ? pe.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...J(n) ? pe.getDataAttributes(n) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, o] of Object.entries(n)) {
      const a = t[r], i = J(a) ? "element" : nn(a);
      if (!new RegExp(o).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${o}".`
        );
    }
  }
}
const En = "5.3.5";
class yn extends bn {
  constructor(t, n) {
    super(), t = De(t), t && (this._element = t, this._config = this._getConfig(n), _e.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    _e.remove(this._element, this.constructor.DATA_KEY), U.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    cn(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return _e.get(De(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return En;
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
const ve = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let n = e.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
  }
  return t ? t.split(",").map((n) => ft(n)).join(",") : null;
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
    return this.find(t, e).filter((n) => !xe(n) && mt(n));
  },
  getSelectorFromElement(e) {
    const t = ve(e);
    return t && H.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = ve(e);
    return t ? H.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = ve(e);
    return t ? H.find(t) : [];
  }
}, Je = "dropdown", _n = "bs.dropdown", X = `.${_n}`, $e = ".data-api", Nn = "Escape", Ze = "Tab", Cn = "ArrowUp", Xe = "ArrowDown", An = 2, vn = `hide${X}`, Ln = `hidden${X}`, On = `show${X}`, Pn = `shown${X}`, Nt = `click${X}${$e}`, Ct = `keydown${X}${$e}`, Sn = `keyup${X}${$e}`, ne = "show", Tn = "dropup", Dn = "dropend", xn = "dropstart", kn = "dropup-center", jn = "dropdown-center", Q = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Rn = `${Q}.${ne}`, de = ".dropdown-menu", Mn = ".navbar", wn = ".navbar-nav", Fn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", In = oe() ? "top-end" : "top-start", $n = oe() ? "top-start" : "top-end", Un = oe() ? "bottom-end" : "bottom-start", Vn = oe() ? "bottom-start" : "bottom-end", Bn = oe() ? "left-start" : "right-start", Hn = oe() ? "right-start" : "left-start", Kn = "top", Yn = "bottom", Wn = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, qn = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let ee = class fe extends yn {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = H.next(this._element, de)[0] || H.prev(this._element, de)[0] || H.findOne(de, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Wn;
  }
  static get DefaultType() {
    return qn;
  }
  static get NAME() {
    return Je;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (xe(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!U.trigger(this._element, On, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(wn))
        for (const r of [].concat(...document.body.children))
          U.on(r, "mouseover", qe);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ne), this._element.classList.add(ne), U.trigger(this._element, Pn, t);
    }
  }
  hide() {
    if (xe(this._element) || !this._isShown())
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
    if (!U.trigger(this._element, vn, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          U.off(r, "mouseover", qe);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ne), this._element.classList.remove(ne), this._element.setAttribute("aria-expanded", "false"), pe.removeDataAttribute(this._menu, "popper"), U.trigger(this._element, Ln, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !J(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Je.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Ke > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : J(this._config.reference) ? t = De(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = Ke.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(ne);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Dn))
      return Bn;
    if (t.classList.contains(xn))
      return Hn;
    if (t.classList.contains(kn))
      return Kn;
    if (t.classList.contains(jn))
      return Yn;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Tn) ? n ? $n : In : n ? Vn : Un;
  }
  _detectNavbar() {
    return this._element.closest(Mn) !== null;
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
    return (this._inNavbar || this._config.display === "static") && (pe.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...ke(this._config.popperConfig, [void 0, t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = H.find(Fn, this._menu).filter((o) => mt(o));
    r.length && ln(r, n, t === Xe, !r.includes(n)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const n = fe.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === An || t.type === "keyup" && t.key !== Ze)
      return;
    const n = H.find(Rn);
    for (const r of n) {
      const o = fe.getInstance(r);
      if (!o || o._config.autoClose === !1)
        continue;
      const a = t.composedPath(), i = a.includes(o._menu);
      if (a.includes(o._element) || o._config.autoClose === "inside" && !i || o._config.autoClose === "outside" && i || o._menu.contains(t.target) && (t.type === "keyup" && t.key === Ze || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const f = { relatedTarget: o._element };
      t.type === "click" && (f.clickEvent = t), o._completeHide(f);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === Nn, o = [Cn, Xe].includes(t.key);
    if (!o && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(Q) ? this : H.prev(this, Q)[0] || H.next(this, Q)[0] || H.findOne(Q, t.delegateTarget.parentNode), i = fe.getOrCreateInstance(a);
    if (o) {
      t.stopPropagation(), i.show(), i._selectMenuItem(t);
      return;
    }
    i._isShown() && (t.stopPropagation(), i.hide(), a.focus());
  }
};
U.on(document, Ct, Q, ee.dataApiKeydownHandler);
U.on(document, Ct, de, ee.dataApiKeydownHandler);
U.on(document, Nt, ee.clearMenus);
U.on(document, Sn, ee.clearMenus);
U.on(document, Nt, Q, function(e) {
  e.preventDefault(), ee.getOrCreateInstance(this).toggle();
});
an(ee);
const he = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ s(F, { children: e }), ce = ({ children: e, ...t }) => /* @__PURE__ */ s("div", { className: "dropdown-menu", children: e }), Ue = ({ className: e, children: t, icon: n }) => {
  const r = j(null);
  M(() => {
    const c = new ee(r.current);
    return () => {
      c.dispose();
    };
  }, []);
  const o = O.Children.toArray(t).find((c) => O.isValidElement(c) && c.type === ce), a = O.Children.toArray(t).filter((c) => O.isValidElement(c) && c.type === B), i = O.Children.toArray(t).find((c) => O.isValidElement(c) && c.type === he), f = O.Children.toArray(t).filter((c) => !O.isValidElement(c) || c.type !== B && c.type !== ce && c.type !== he), p = O.isValidElement(i) ? i.props : {};
  return /* @__PURE__ */ A("div", { className: [...(e || "").split(" "), "dropdown"].filter((c, g, m) => m.indexOf(c) === g).join(" "), children: [
    /* @__PURE__ */ s(ye, { ref: r, "data-bs-toggle": "dropdown", ...p, className: [...(p.className || "").split(" "), "btn", "dropdown-toggle"].filter((c, g, m) => m.indexOf(c) === g).join(" "), children: p.children ? p.children : f }),
    o || /* @__PURE__ */ s(ce, { children: a })
  ] });
}, zn = se(({ data: e, columns: t, options: n, onClick: r, onBatchClick: o, routeParams: a, namespace: i }, f) => {
  var x, $, L, D, S, w, R;
  t = (t || ((x = e == null ? void 0 : e.entity) == null ? void 0 : x.columns) || []).filter((y) => y.visible).filter((y) => y.group !== !1);
  const [, p] = I(), { generateLink: c } = q(), g = ($ = e == null ? void 0 : e.entity) == null ? void 0 : $.primaryColumn, m = Object.values((e == null ? void 0 : e.action) || []), h = m.filter((y) => y.object), C = t.length + (m.length ? 1 : 0), b = ((e == null ? void 0 : e.entity.data.items) || []).map((y) => y[(g == null ? void 0 : g.field) || ""] || 0), l = j([]), E = !!b.length && b.reduce((y, P) => y && l.current.includes(P), !0), d = (S = (D = (L = e == null ? void 0 : e.form) == null ? void 0 : L.batch.view.children) == null ? void 0 : D.method) == null ? void 0 : S.choices, u = !!(d != null && d.length) && g, _ = (e == null ? void 0 : e.entity.data.items) ?? [], N = (y, P = !1) => {
    P ? l.current.push(y) : l.current = l.current.filter((k) => k !== y), p({});
  }, v = (y = !1) => {
    l.current = (y ? l.current.concat(b) : l.current.filter((P) => !b.includes(P))).filter((P, k, Y) => Y.indexOf(P) === k), p({});
  }, T = (y) => {
    var Y, z;
    if (!o)
      return;
    const P = e == null ? void 0 : e.form.batch.view;
    if (!u || !((Y = l.current) != null && Y.length))
      return;
    const k = new FormData();
    l.current.forEach((ae) => {
      var Be;
      k.append(`${(Be = P == null ? void 0 : P.children) == null ? void 0 : Be.ids.full_name}[]`, ae.toString());
    }), k.append(((z = P == null ? void 0 : P.children) == null ? void 0 : z.method.full_name) || "method", y), o(y, l.current, k);
  };
  return /* @__PURE__ */ A(F, { children: [
    u && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ s("label", { className: "btn btn-light", children: /* @__PURE__ */ s(
        "input",
        {
          checked: E,
          onChange: (y) => v(y.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ A(Ue, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ s(he, { disabled: !l.current.length, className: "btn-light" }),
        /* @__PURE__ */ s(ce, { children: (R = (w = e.form.batch.view.children) == null ? void 0 : w.method.choices) == null ? void 0 : R.map((y) => {
          const P = y.value instanceof Function ? y.value() : y.value;
          return /* @__PURE__ */ s(B, { to: "#", onClick: () => T(P), className: "dropdown-item", children: y.label instanceof Function ? y.label() : y.label }, P);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ A("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ A("tr", { children: [
        t.map((y, P) => /* @__PURE__ */ A("th", { children: [
          /* @__PURE__ */ s(Z, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: y, prefix: "list", view: y.field + ".label", children: y.label }),
          y.sortable && (e == null ? void 0 : e.sort[y.field]) !== void 0 && /* @__PURE__ */ s(
            B,
            {
              onClick: (k) => r && r({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: i,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [y.field]: e != null && e.sort[y.field] ? (e == null ? void 0 : e.sort[y.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, k),
              className: "btn",
              to: "#",
              children: e.sort[y.field] ? e.sort[y.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, P)),
        g && h.length > 0 && /* @__PURE__ */ s("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ s("tbody", { children: _.length ? _.map(
        (y, P) => /* @__PURE__ */ A("tr", { children: [
          t == null ? void 0 : t.map(
            (k, Y) => {
              var z;
              return /* @__PURE__ */ A("td", { children: [
                Y === 0 && u && /* @__PURE__ */ s(
                  "input",
                  {
                    checked: l.current.includes(y[g == null ? void 0 : g.field]),
                    className: "me-2 float-start",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: y[g == null ? void 0 : g.field],
                    onChange: (ae) => N(y[g == null ? void 0 : g.field], ae.target.checked)
                  }
                ),
                /* @__PURE__ */ s(Z, { namespace: i || "unknown", data: y, prefix: "list", view: k.field, children: y[k.field] !== void 0 && (y[k.field] instanceof Object ? y[k.field] instanceof Array ? y[k.field].join(", ") : JSON.stringify(y[k.field]) : (z = y[k.field]) == null ? void 0 : z.toString()) })
              ] }, Y);
            }
          ),
          g && h.length > 0 && /* @__PURE__ */ s("td", { className: "text-end text-nowrap", children: h.map((k, Y) => {
            var z;
            return /* @__PURE__ */ s(
              B,
              {
                onClick: (ae) => r && r({
                  action: k,
                  parameters: {
                    ...a || {},
                    id: y[g == null ? void 0 : g.field]
                  }
                }, ae),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((z = k.route) == null ? void 0 : z.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: c(k.route, {
                  ...a || {},
                  id: y[g.field]
                }),
                children: k.title
              },
              Y
            );
          }) })
        ] }, P)
      ) : /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: C, children: /* @__PURE__ */ s(me, { children: "Not results found." }) }) }) })
    ] })
  ] });
}), ie = ({ route: e, page: t, active: n = !1, title: r, children: o }) => {
  const a = new URL(document.location.href);
  return a.searchParams.set("page", t.toString()), /* @__PURE__ */ s("li", { className: `page-item ${n ? "active" : ""}`, children: /* @__PURE__ */ s(
    B,
    {
      to: a.toString(),
      className: "page-link",
      title: r,
      children: o || t
    }
  ) });
}, Gn = ({ meta: e }) => {
  const n = e.totalPages, r = e.page || 1, o = e.links, a = !!e.totalPages;
  return /* @__PURE__ */ A("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ A("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ A(F, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ s("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ A("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ s(ie, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ A(F, { children: [
        /* @__PURE__ */ s(ie, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) })
      ] }),
      (o || []).map((i, f) => /* @__PURE__ */ s(ie, { page: i, active: i === r }, f)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ A(F, { children: [
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ s(
          ie,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ s(ie, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, Re = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = Re(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), At = O.createContext({});
function Qn() {
  const { setModal: e } = O.useContext(At);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function Jn(e) {
  const [t, n] = I(), r = j(0);
  M(() => {
    r.current += 1;
  }, [t]);
  const o = {
    ...(t == null ? void 0 : t.props) || {},
    onClose: () => {
      var a;
      (a = t == null ? void 0 : t.props) != null && a.onClose && t.props.onClose(), n(null);
    }
  };
  return /* @__PURE__ */ A(At.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ s(
      vt,
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
const Zn = ({ formView: e, onClick: t }) => {
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
}, Xn = W(({ action: e, embedded: t = !1 }) => {
  var v, T, x, $;
  const { generateLink: n, generateRoute: r, generateActionLink: o, location: a, navigate: i } = q();
  let f = new URLSearchParams(a.search);
  const p = j(void 0), c = j(xt(f)), g = j(null), { openModal: m } = Qn(), { open: h } = dt(), C = e.action.entity;
  if (!C)
    throw new Error("Invalid Entity");
  const { results: b, refresh: l, setQueryParameters: E } = ct({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: c.current }), d = Object.values((b == null ? void 0 : b.action) ?? []).filter((L) => !L.object && L.name !== e.action.name), u = (L) => {
    L == null || L.forEach((S) => {
      var w, R;
      (R = (w = c.current) == null ? void 0 : w.filter) == null || delete R[S];
    });
    const D = {
      ...c.current && c.current,
      ...p.current && { sort: p.current }
    };
    if (f = Oe(Re(D)), t)
      E(f);
    else {
      const S = new URL(document.location.href);
      S.search = f.toString(), i(S.toString());
    }
  }, _ = (L, D, S) => {
    h({
      title: "Are you sure?",
      icon: ue.confirm,
      onResult: (w) => {
        w.isConfirmed && re().post({
          url: o(e),
          body: S
        }).catch((R) => {
          console.log("error", R);
        }).finally(() => {
          console.log("done"), l();
        });
      }
    });
  }, N = (L, D) => {
    switch (L.parameters !== void 0 && (L.parameters = Re(L.parameters), Object.keys(L.parameters).length || (L.parameters = void 0)), L.action.name) {
      case "filter": {
        D == null || D.preventDefault(), c.current = L.parameters;
        break;
      }
      case "sort": {
        D == null || D.preventDefault(), p.current = L.parameters;
        break;
      }
      case "delete": {
        D == null || D.preventDefault(), h({
          title: "Are you sure?",
          icon: ue.confirm,
          onResult: (S) => {
            S.isConfirmed && re().fetch({
              url: r(L.action.route, { ...e.parameters, ...L.parameters }),
              method: jt.DELETE
            }).catch((w) => {
              console.log("error", w);
            }).finally(() => {
              l();
            });
          }
        });
        return;
      }
      default: {
        t && (D == null || D.preventDefault(), m({
          action: L,
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
  return M(() => {
    E(f);
  }, [a.search]), /* @__PURE__ */ s(F, { children: /* @__PURE__ */ A("section", { className: "list", children: [
    /* @__PURE__ */ A("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ s("h2", { children: b == null ? void 0 : b.title }),
      /* @__PURE__ */ A("div", { className: "d-flex align-items-center", children: [
        !!d.length && /* @__PURE__ */ s("div", { className: "btn-group btn-group-sm me-2", children: d.map((L, D) => /* @__PURE__ */ s(
          B,
          {
            to: n(L.route, e.parameters),
            onClick: (S) => N({
              action: L,
              parameters: e.parameters
            }, S),
            className: "btn btn-outline-secondary",
            children: L.title || L.name
          },
          D
        )) }),
        ((v = b == null ? void 0 : b.form) == null ? void 0 : v.filter) && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ A(Ue, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ s(he, { className: "btn-outline-dark", children: /* @__PURE__ */ s(me, { children: "Filter" }) }),
            /* @__PURE__ */ s(ce, { children: /* @__PURE__ */ s("div", { className: "filter", children: /* @__PURE__ */ A(
              ot,
              {
                id: "filter_" + Ee(C),
                ref: g,
                onSubmit: (L) => N({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  },
                  parameters: kt(L)
                }),
                onReset: () => N({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  }
                }),
                children: [
                  ((T = b == null ? void 0 : b.form) == null ? void 0 : T.filter) && /* @__PURE__ */ s(Fe, { view: b.form.filter.view }),
                  /* @__PURE__ */ s("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ s(me, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((x = c.current) == null ? void 0 : x.filter) || []).length && /* @__PURE__ */ s(ye, { onClick: () => {
            var L;
            (L = g.current) == null || L.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    (($ = b == null ? void 0 : b.form) == null ? void 0 : $.filter) && /* @__PURE__ */ s(Zn, { formView: b.form.filter.view, onClick: (L) => u([L]) }),
    /* @__PURE__ */ A(Z, { namespace: e.action.namespace, prefix: "list", view: "content", data: b, children: [
      /* @__PURE__ */ s("div", { className: "table-responsive", children: /* @__PURE__ */ s(
        zn,
        {
          data: b,
          onClick: N,
          onBatchClick: _,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      b && /* @__PURE__ */ s(Gn, { meta: b.entity.data.meta })
    ] }, "list")
  ] }) });
}), er = ({ view: e, props: t }) => {
  const n = {
    add: We,
    edit: We,
    list: Xn
  };
  if (n[e] === void 0)
    throw new le(500, "View not found");
  return O.createElement(n[e] || Se, t);
}, vt = ({ view: e, namespace: t, props: n }) => /* @__PURE__ */ s(Z, { namespace: t, view: e, props: n, children: /* @__PURE__ */ s(er, { view: e, props: n }) }, t + e), tr = ({ path: e, preloader: t }) => {
  if (!Me.namespace[Ve])
    throw new be(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = q(), [r, o] = I();
  if (M(() => {
    n(e).then((a) => o(a));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ s(F, { children: "Loading" });
  if (!r)
    throw new le(404, "Page Not Found");
  return /* @__PURE__ */ s(
    vt,
    {
      view: r.action.name,
      namespace: r.action.namespace || "",
      props: { action: r }
    }
  );
}, nr = ({ children: e, config: t }) => /* @__PURE__ */ s(Vt, { config: t, children: /* @__PURE__ */ s(Xt, { children: /* @__PURE__ */ s(Jn, { children: e }) }) });
let Le;
const Lt = {}, Ve = "dakataa_crud", mr = ({ connection: e, templates: t }) => {
  Me.namespace[Ve] = e, Lt.templates = t;
}, re = () => (Le || (Le = Me.instance({ namespace: Ve })), Le), pr = Ht(({ path: e, prefix: t, errorFallback: n, templates: r }) => {
  const { location: o } = q();
  return e ?? (e = o.pathname), t && (e = e.replace(new RegExp("^/" + t.replace(new RegExp("^/"), "") + "(/)?"), "/")), r = Object.assign(Lt.templates ?? {}, r ?? {}), /* @__PURE__ */ s(nr, { config: { templates: r, link: { prefix: t } }, children: /* @__PURE__ */ s(It, { fallback: n ?? /* @__PURE__ */ s($t, {}), children: /* @__PURE__ */ s(tr, { path: e }) }, e) });
}), Ot = O.createContext(null), rr = () => O.useContext(Ot), sr = ({ item: e, open: t = !1 }) => {
  var u, _;
  const n = !!((u = e.items) != null && u.length), { location: r, generateRoute: o } = q(), a = r.pathname.replace(/(.*?)\/?$/i, "$1"), i = o(e.route), f = a.includes(i, 0), [p, c] = O.useState(f), g = rr(), m = j(null), h = j(null), C = "collapse", b = "collapsing", l = {
    toggle: (N) => {
      c(N !== void 0 ? N : !p);
    }
  }, E = () => {
    var N, v, T, x;
    (N = m.current) == null || N.classList.remove(b), (v = m.current) == null || v.classList.add(C), (T = m.current) == null || T.classList.toggle("show", p), (x = m.current) == null || x.style.removeProperty("height");
  }, d = () => {
    h.current && (clearTimeout(h.current), h.current = null);
  };
  return M(() => {
    var N, v, T, x, $, L, D, S, w;
    return p && g && g.toggle(!0), (N = m.current) == null || N.addEventListener("animationstart", d), (v = m.current) == null || v.addEventListener("transitionstart", d), (T = m.current) == null || T.addEventListener("animationend", E), (x = m.current) == null || x.addEventListener("transitionend", E), (L = m.current) == null || L.style.setProperty("height", (p ? 0 : ($ = m.current) == null ? void 0 : $.scrollHeight) + "px"), (D = m.current) == null || D.classList.remove("show"), (S = m.current) == null || S.classList.remove(C), (w = m.current) == null || w.classList.add(b), setTimeout(() => {
      var R, y;
      (y = m.current) == null || y.style.setProperty("height", (p ? (R = m.current) == null ? void 0 : R.scrollHeight : 0) + "px");
    }, 10), h.current = setTimeout(E, 50), () => {
      var R, y, P, k;
      d(), (R = m.current) == null || R.removeEventListener("animationstart", d), (y = m.current) == null || y.removeEventListener("transitionstart", d), (P = m.current) == null || P.removeEventListener("animationend", E), (k = m.current) == null || k.removeEventListener("transitionend", E);
    };
  }, [p]), M(() => {
    t !== p && c(t);
  }, [t]), /* @__PURE__ */ s(Ot.Provider, { value: l, children: /* @__PURE__ */ A("nav", { className: ["item", ...p || f ? ["active"] : []].join(" "), children: [
    /* @__PURE__ */ A(
      B,
      {
        to: n ? "#" : o(e.route),
        ...e.icon && { icon: e.icon },
        ...n && {
          onClick: () => {
            c(!p);
          }
        },
        children: [
          /* @__PURE__ */ s("span", { className: "icon" }),
          /* @__PURE__ */ s("span", { className: "title", children: e.title })
        ]
      }
    ),
    n && !!((_ = e.items) != null && _.length) && /* @__PURE__ */ s("nav", { ref: m, className: C, children: /* @__PURE__ */ s(Pt, { items: e.items }) })
  ] }) });
}, Pt = ({ items: e }) => e.map(
  (t) => {
    const n = [parent, t.title].filter((r) => r).join("-").toLowerCase();
    return /* @__PURE__ */ s(sr, { item: t }, n);
  }
), or = se(({ items: e, className: t, open: n = !1 }, r) => {
  const o = j(null), [a, i] = O.useState(n);
  r = r || Mt();
  const f = {
    toggle: (p) => {
      i(p !== void 0 ? p : !a);
    }
  };
  return ge(r, () => f), M(() => {
    document.body.classList.toggle("toggle-nav", a);
    const p = (c) => {
      var g;
      (g = o.current) != null && g.contains(c.target) || (i(!1), document.body.removeEventListener("click", p));
    };
    if (a)
      return document.body.addEventListener("click", p), () => {
        document.body.removeEventListener("click", p);
      };
  }, [a]), /* @__PURE__ */ s("nav", { ref: o, children: /* @__PURE__ */ s(Pt, { items: e }) });
}), hr = W(({ children: e, ...t }) => {
  const n = j(null), [r, o] = I([]);
  return M(() => {
    re().get({
      url: "/_crud/navigation"
    }).then(({ status: a, data: i }) => {
      a === 200 && o(i);
    });
  }, []), /* @__PURE__ */ A(et, { children: [
    /* @__PURE__ */ s("header", { children: /* @__PURE__ */ A("div", { className: "wrap", children: [
      /* @__PURE__ */ s("button", { onClick: (a) => {
        var i;
        return (i = n.current) == null ? void 0 : i.toggle();
      }, className: "btn btn-mobile", children: /* @__PURE__ */ s("i", {}) }),
      /* @__PURE__ */ s("nav", { className: "first-nav", children: /* @__PURE__ */ s(B, { className: "logo", to: "/", children: "Admin" }) }),
      /* @__PURE__ */ s("nav", { className: "second-nav", children: /* @__PURE__ */ A(Ue, { className: "user", children: [
        /* @__PURE__ */ s("span", { className: "initials", children: "YL" }),
        /* @__PURE__ */ s(B, { to: "#", children: "Yordan Lazarov" }),
        /* @__PURE__ */ s(B, { to: "#", children: "Logout" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ A("main", { children: [
      !!r.length && /* @__PURE__ */ s("div", { className: "navigation d-print-none", children: /* @__PURE__ */ s(or, { ref: n, items: r }) }),
      /* @__PURE__ */ s("div", { className: "content", children: e })
    ] })
  ] });
});
export {
  Bt as ActionProvider,
  Xt as AlertProvider,
  et as BaseLayout,
  pr as Crud,
  mr as CrudConfiguration,
  tr as CrudLoader,
  nr as CrudProvider,
  Z as DynamicView,
  It as ErrorBoundary,
  be as Exception,
  ot as Form,
  Fe as FormField,
  Wt as FormGroup,
  zt as FormWidget,
  zn as GridView,
  le as HttpException,
  qt as Input,
  Xn as List,
  hr as MainLayout,
  Jn as ModalProvider,
  We as Modify,
  V as TemplateBlock,
  K as TemplateExtend,
  q as UseActions,
  dt as UseAlert,
  Qn as UseModal,
  vt as ViewLoader,
  Ee as nameToId,
  we as useForm,
  Ht as withRouterContext
};
