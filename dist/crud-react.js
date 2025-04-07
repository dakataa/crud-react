var Pt = Object.defineProperty;
var St = (e, t, n) => t in e ? Pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ee = (e, t, n) => St(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as s, Fragment as w, jsxs as A } from "react/jsx-runtime";
import Re, { convertObjectToURLSearchParams as Le, RequestBodyType as Tt, convertURLSearchParamsToObject as Dt, convertFormDataToObject as xt, Method as kt } from "@dakataa/requester";
import * as Be from "react";
import O, { memo as Y, useState as F, useEffect as R, forwardRef as re, useRef as j, useImperativeHandle as me, useReducer as jt, createRef as Rt } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { createPortal as Mt } from "react-dom";
import wt from "lottie-web/build/player/esm/lottie.min.js";
import * as He from "@popperjs/core";
class pe {
  constructor(t = 0, n, r) {
    ee(this, "code");
    ee(this, "detail");
    ee(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class he extends pe {
  constructor(n, r, o) {
    super(0, r, o);
    ee(this, "status", 400);
    this.status = n;
  }
}
class Ft extends Be.Component {
  constructor(n) {
    super(n);
    ee(this, "promiseRejectionHandler", (n) => {
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
    return n instanceof Error && (n = new he(0, n.message)), {
      hasError: !0,
      error: n
    };
  }
  componentDidCatch(n, r) {
    console.log("error", n);
  }
  render() {
    return this.state.hasError ? Be.cloneElement(
      this.props.fallback,
      {
        error: this.state.error,
        children: this.props.children
      }
    ) : this.props.children;
  }
}
const Xe = Y(({ children: e }) => /* @__PURE__ */ s(w, { children: e })), It = Y(({ error: e }) => /* @__PURE__ */ s(Xe, { children: /* @__PURE__ */ s("main", { children: /* @__PURE__ */ A("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ s("h1", { className: "display-1", children: (e == null ? void 0 : e.status) || "Error" }),
  /* @__PURE__ */ s("p", { className: "text-secondary", children: (e == null ? void 0 : e.detail) || "Unknown Error" }),
  /* @__PURE__ */ s("br", {}),
  /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })), $t = ({ children: e }) => /* @__PURE__ */ s(w, { children: e }), K = Y(({ name: e, children: t, data: n, parent: r, render: o }) => (t = O.Children.toArray((o ? o(n, r) : t) || []).map((a) => (O.isValidElement(a) && a.type === $t && (a = O.cloneElement(a, { children: r })), a)), /* @__PURE__ */ s(w, { children: t }))), U = Y(({ name: e, content: t, children: n, data: r }) => {
  const o = O.Children.toArray(t).find((f) => O.isValidElement(f) && f.type === K && f.props.name === e);
  let a = null;
  o && O.isValidElement(o) && (a = O.cloneElement(o, { parent: n, data: r }));
  const i = O.Children.toArray(n).filter((f) => O.isValidElement(f) && f.type !== K);
  return /* @__PURE__ */ s(w, { children: a || (i.length ? i : n) });
}), et = O.createContext({});
function tt() {
  return O.useContext(et);
}
function Ut({ config: e, ...t }) {
  return /* @__PURE__ */ s(et.Provider, { value: e, children: t.children });
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
const Ke = "actions", nt = O.createContext(void 0);
function W() {
  const e = O.useContext(nt), t = tt(), { actions: n, location: r, setLocation: o } = e ?? {
    actions: null,
    location: new URL(document.location.href),
    setLocation: () => {
    }
  }, a = (d, l, _) => n == null ? void 0 : n.filter((N) => N.entity === d && N.name === l && (_ === void 0 || N.namespace === _)).shift(), i = (d) => n == null ? void 0 : n.find((l) => {
    var _;
    return ((_ = l.route) == null ? void 0 : _.path) && u(l.route.path, d);
  }), f = (d) => {
    const l = () => {
      var L;
      const _ = i(d);
      if (!_)
        return null;
      const N = u(((L = _.route) == null ? void 0 : L.path) || "", d);
      return {
        action: _,
        parameters: N == null ? void 0 : N.params
      };
    };
    return new Promise((_) => {
      let N = 0;
      const L = () => {
        if (N > 10)
          throw new pe(0, "Cannot load routes");
        if (e)
          return _(l());
        setTimeout(L, 200), N++;
      };
      L();
    });
  }, p = (d) => d.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), c = (d, l = void 0) => y(p(d), l), b = (d, l) => d ? c(d.path, { ...d.defaults || {}, ...l }) : "#", m = (d) => {
    const l = a(d.action.entity, d.action.name, d.action.namespace);
    return b(l == null ? void 0 : l.route, d.parameters);
  }, h = (d, l) => {
    const _ = b(d, l);
    return C(_);
  }, C = (d) => {
    var l;
    return (l = t.link) != null && l.prefix && (d = "/" + t.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + d), d;
  }, E = (d) => {
    try {
      history.pushState(null, "", d);
    } catch {
      window.location.assign(d);
    }
  }, u = (d, l) => {
    var k;
    const _ = new RegExp("^" + d.replace(new RegExp("[{:](\\w+)}?", "g"), "(?<$1>.+)") + "$", "giu");
    if (!_.test(l))
      return !1;
    const L = l.matchAll(_), T = (k = L == null ? void 0 : L.next().value) == null ? void 0 : k.groups;
    return {
      pathname: l,
      params: T,
      pattern: d
    };
  }, y = (d, l) => d.replaceAll(new RegExp("[{:](\\w+)}?", "g"), (_, N) => (l == null ? void 0 : l[N]) || "");
  return {
    getAction: a,
    getActionByPath: i,
    getOnClickActionByPath: f,
    navigate: E,
    location: r,
    matchPath: u,
    generateRoute: b,
    generateRoutePath: c,
    crudToReactPathPattern: p,
    generateActionLink: m,
    generateLink: h
  };
}
function Vt(e) {
  let t = null;
  try {
    const i = sessionStorage.getItem(Ke);
    t = JSON.parse(atob(i || ""));
  } catch {
  }
  const [n, r] = F(t), [o, a] = F(new URL(document.location.href));
  return R(() => {
    if (o && o.toString() !== document.location.toString())
      try {
        history.pushState(null, "", o);
      } catch {
        window.location.assign(o);
      }
  }, [o.toString()]), R(() => {
    const i = () => {
      a(new URL(document.location.href));
    };
    return window.addEventListener("pushstate", i), window.addEventListener("replacestate", i), window.addEventListener("popstate", i), () => {
      window.removeEventListener("pushstate", i), window.removeEventListener("replacestate", i), window.removeEventListener("popstate", i);
    };
  }, []), R(() => {
    t || ne().get({ url: "/_crud/actions" }).then(({ status: i, data: f }) => {
      i === 200 && (sessionStorage.setItem(Ke, btoa(JSON.stringify(f))), r(f));
    }).catch((i) => {
      console.log("error", i);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ s(nt.Provider, { value: {
    actions: n,
    location: o,
    setLocation: a
  }, children: e.children });
}
function Bt(e) {
  return (t) => {
    const n = O.createElement(e, t);
    return /* @__PURE__ */ s(Vt, { children: n });
  };
}
const rt = O.createContext(null);
function Me() {
  const e = O.useContext(rt);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const ge = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), st = re(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: o,
  onSubmit: a,
  onReset: i,
  ...f
}, p) => {
  const c = j(null), b = {
    response: null,
    constraints: {},
    errors: {}
  }, m = {
    getFormData: () => new FormData(c.current || void 0),
    setFormData: (u) => {
      var y;
      [...((y = c.current) == null ? void 0 : y.elements) || []].forEach((d) => {
        const l = u.get(d.name);
        switch (d.tagName.toLowerCase()) {
          case "select": {
            d.multiple ? [...d.options].forEach((_) => {
              _.selected = u.getAll(d.name).includes(_.value);
            }) : d.value = l;
            break;
          }
          default:
            switch (d.type) {
              case "checkbox":
                d.checked = !!l;
                break;
              default:
                d.value = l;
                break;
            }
        }
      });
    },
    setErrors: (u) => {
      const [, y] = C;
      y({ action: "errors", payload: u });
    },
    reset: () => {
      var u;
      (u = c.current) == null || u.reset();
    },
    submit: () => {
      var u;
      return (u = c.current) == null ? void 0 : u.requestSubmit();
    }
  };
  me(p, () => m), R(() => {
    const u = () => {
      i && i();
    }, y = c == null ? void 0 : c.current;
    return y == null || y.addEventListener("reset", u), () => {
      y == null || y.removeEventListener("reset", u);
    };
  }, []);
  const h = (u, y) => {
    const d = m.getFormData();
    for (const l of y)
      if (!l.isValid(d.get(u) || null))
        return { valid: !1, message: l.getMessage() };
    return { valid: !0, message: null };
  }, C = jt((u, y) => {
    const { action: d, payload: l } = y;
    switch (d) {
      case "constraints": {
        const { name: _, constraints: N } = l;
        return {
          ...u,
          constraints: {
            ...u.constraints || {},
            [_]: N
          }
        };
      }
      case "validate": {
        const { valid: _, message: N } = h(l, u.constraints[l] || []), L = u.errors || {}, T = l;
        return _ ? delete L[T] : L[T] = [...L[T] || [], { message: N || "Error" }], Object.keys(L).length ? {
          ...u,
          errors: L
        } : u;
      }
      case "response":
        return {
          ...u,
          response: l
        };
      case "errors":
        return {
          ...u,
          errors: l || []
        };
      case "error": {
        const _ = { ...u.errors, ...l };
        return {
          ...u,
          errors: _
        };
      }
    }
    return u;
  }, b), E = (u) => {
    u.preventDefault();
    const [y, d] = C;
    let l = {};
    for (const [N, L] of Object.entries(y.constraints)) {
      const { valid: T, message: k } = h(N, L);
      T || (l[N] = [k]);
    }
    if (Object.values(l).length) {
      d({ action: "errors", payload: l });
      return;
    }
    const _ = new FormData((c == null ? void 0 : c.current) || void 0);
    if (o && o(_), a) {
      a(_);
      return;
    }
  };
  return /* @__PURE__ */ s(rt.Provider, { value: [C, p, c], children: /* @__PURE__ */ s("form", { id: e, ref: c, onSubmit: E, ...f, children: t }) });
}), Ht = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: o,
  choiceLabelTransform: a,
  ...i
}) => {
  t = t || [];
  const [[f, p], c] = Me(), b = j(null), h = !!((f == null ? void 0 : f.errors[e.full_name]) || []).length, C = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  R(() => {
    p({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const E = (u) => {
    p({ action: "validate", payload: e.full_name }), r && r(u);
  };
  return e != null && e.expanded ? /* @__PURE__ */ s(w, { children: Object.values(e.choices || []).map(
    (u, y) => {
      var L;
      const d = ge(e.full_name, y), l = o ? o(u) : u.value, _ = a ? a(u) : u.label || l, N = {
        id: d,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(u) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ A(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: b,
                defaultValue: l,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (L = e == null ? void 0 : e.data) == null ? void 0 : L.includes(l),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: d,
                className: "form-check-input",
                ...N,
                onChange: (T) => {
                  var k, I;
                  return E({
                    value: (e != null && e.multiple ? (k = c == null ? void 0 : c.current) == null ? void 0 : k.getFormData().getAll(e == null ? void 0 : e.full_name) : (I = c == null ? void 0 : c.current) == null ? void 0 : I.getFormData().get(e == null ? void 0 : e.full_name)) || T.target.value,
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
        y
      );
    }
  ) }) : /* @__PURE__ */ s(w, { children: /* @__PURE__ */ A(
    "select",
    {
      ref: b,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": h,
      onChange: (u) => {
        var y, d;
        return E({
          value: (e.multiple ? (y = c == null ? void 0 : c.current) == null ? void 0 : y.getFormData().getAll(e.full_name) : (d = c == null ? void 0 : c.current) == null ? void 0 : d.getFormData().get(e.full_name)) || u.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...h ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ s("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (u, y) => /* @__PURE__ */ s(
            "option",
            {
              value: u.value || u.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(u) : e.choice_attr),
              children: u.label
            },
            y
          )
        )
      ]
    },
    C
  ) });
}, ot = ({ name: e, className: t }) => {
  const [[n]] = Me(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ s("div", { className: t, children: r.map((o, a) => /* @__PURE__ */ s("span", { children: o.message }, a)) }) : /* @__PURE__ */ s(w, {});
}, ve = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), Kt = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((o) => o.toLowerCase()), n && t.unshift(ve(n)), r && t.push(ve(r)), t.join(" ");
}, Yt = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || Kt(e.name), o = ["checkbox", "radio"].includes(e.type || "input");
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
            htmlFor: e.id || ge(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ s(ot, { name: e.full_name, className: "invalid-feedback" }),
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
}, Wt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[o, a]] = Me(), i = j(null), f = (o == null ? void 0 : o.errors[e.full_name]) || [];
  R(() => {
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
  }, b = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", m = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ s(w, { children: /* @__PURE__ */ s(
    "input",
    {
      ref: i,
      id: e.id || ge(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !f.length,
      onKeyUp: (h) => p({ value: h.target.value }),
      onChange: (h) => p({ value: h.target.value }),
      className: [b, ...f.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    m
  ) });
}, qt = ({
  view: e
}) => /* @__PURE__ */ s(Yt, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ s(Ht, { view: e });
    default:
      return /* @__PURE__ */ s(Wt, { view: e });
  }
})() }), Oe = ({ children: e }) => /* @__PURE__ */ s(w, { children: e }), J = Y(({ namespace: e, view: t, prefix: n, children: r, props: o, data: a }) => {
  t = t.split(/[._]/).map((C) => ve(C)).join("");
  const { templates: i } = tt(), f = ["crud", e, n, t].filter((C) => C).join("/") + ".tsx", [p, c] = Object.entries(i ?? {}).filter(([C, E]) => C.endsWith(f)).shift() || [], [b, m] = F(1), h = j(Oe);
  return R(() => {
    if (c === void 0)
      return () => {
      };
    c().then((C) => {
      h.current = C.default, m(b + 1);
    });
  }, []), /* @__PURE__ */ s(h.current, { ...o, view: t, controller: e, viewName: t, data: a, parent: r, children: (!c || h.current !== Oe) && r });
}), we = Y(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ s(
  J,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ s(we, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ s(qt, { view: e }, e.id)
  },
  e.id
)), at = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: o = !1 }) => /* @__PURE__ */ s(w, { children: r && r }), be = re(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ s("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ s(at, { preload: t, ...n, children: e }) })), zt = O.createContext(null);
function Gt() {
  return O.useContext(zt);
}
const it = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r, generateRoute: o } = W();
  e = r(e.entity, e.name, e.namespace) || e;
  const [a, i] = F(), [f, p] = F(t || null);
  j(null);
  const [c, b] = F(n instanceof URLSearchParams ? n : Le(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(f || {}).map(([E, u]) => E + "-" + u), (c instanceof URLSearchParams ? c : Le(c)).toString()].filter((E) => E).join("."))), j({});
  const [m, h] = F(1), C = () => {
    e && ne().get({
      url: o(e.route, f ?? null),
      query: c
    }).then(({ status: E, data: u }) => {
      switch (E) {
        case 201:
        case 200: {
          i(u);
          break;
        }
        default: {
          const y = u;
          throw new he(y.status, y.detail, y.trace);
        }
      }
    });
  };
  return R(() => {
    C();
  }, [JSON.stringify(f), c.toString(), m]), {
    results: a,
    setParameters: p,
    setQueryParameters: (E) => {
      b(new URLSearchParams(E));
    },
    refresh: () => {
      C();
    }
  };
}, Pe = Y(({ children: e }) => /* @__PURE__ */ s(w, { children: e })), Qt = re(({ name: e, data: t, action: n, parameters: r, onSuccess: o, onError: a, onLoad: i, children: f, embedded: p = !1 }, c) => {
  var T, k, I, v, x;
  const [b, m] = F(!1), { navigate: h, generateLink: C, generateRoute: E } = W(), u = E(n.route, r || {}), y = j(null), d = Gt(), [l, _] = F();
  me(c, () => ({
    getData: () => l,
    getFormRef: () => y.current
  }));
  const N = (D) => {
    var g, S;
    let M = {
      ...(g = D.errors) != null && g.length ? { [D.full_name]: D.errors } : {}
    };
    for (let [, P] of Object.entries((D == null ? void 0 : D.children) || []))
      P.children && Object.values(P.children).length ? M = { ...M, ...N(P) } : (S = P.errors) != null && S.length && (M[P.full_name] = P.errors);
    return M;
  }, L = (D) => {
    m(!0), ne().post({ url: u, body: D, bodyType: Tt.FormData }).then(({ status: M, data: g }) => {
      var P;
      if (![200, 201, 400].includes(M))
        return Promise.reject(g);
      _(g);
      const S = N(g.form.modify.view);
      if (Object.entries(S).length) {
        (P = y.current) == null || P.setErrors(S);
        return;
      }
      o && o(g), g.redirect && !p && h(C(g.redirect.route, { ...r || {}, ...g.redirect.parameters }));
    }).catch((M) => {
      a && a(M);
    }).finally(() => {
      m(!1);
    });
  };
  return R(() => {
    i && i();
  }, []), t = (d == null ? void 0 : d.results) ?? t, R(() => {
    _(t);
  }, [JSON.stringify(t)]), l && /* @__PURE__ */ A(w, { children: [
    Object.keys((l == null ? void 0 : l.messages) || {}).map((D, M) => /* @__PURE__ */ s("div", { className: ["alert", "alert-" + D].join(" "), children: ((l == null ? void 0 : l.messages[D]) || ["Item was saved successful."]).join(" ") }, "alert-" + D)),
    /* @__PURE__ */ A(st, { id: (I = (k = (T = l == null ? void 0 : l.form) == null ? void 0 : T.modify) == null ? void 0 : k.view) == null ? void 0 : I.id, ref: y, action: u, method: "POST", onSubmit: L, children: [
      ((x = (v = l == null ? void 0 : l.form) == null ? void 0 : v.modify) == null ? void 0 : x.view) !== void 0 && /* @__PURE__ */ A(w, { children: [
        /* @__PURE__ */ s(
          we,
          {
            name: e,
            namespace: n.namespace,
            view: l.form.modify.view
          },
          l.form.modify.view.id
        ),
        /* @__PURE__ */ s(ot, { name: l.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ s(U, { name: "actions", content: f, data: { formRef: y }, children: /* @__PURE__ */ s(be, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ s(Pe, { children: "Save" }) }) })
    ] })
  ] });
}), ct = re(({
  children: e,
  open: t = !0,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: o = !0,
  size: a,
  onClose: i,
  className: f
}, p) => {
  const [c, b] = F(t);
  me(p, () => ({
    toggle: () => b(!c),
    open: () => b(!0),
    close: () => u(),
    isOpen: () => c
  })), R(() => {
    b(t);
  }, [t]);
  const m = (y) => {
    if (o)
      switch (y.key) {
        case "Escape": {
          u();
          break;
        }
      }
  };
  R(() => {
    var l;
    if (!c)
      return;
    const y = () => {
      var _;
      (_ = h.current) == null || _.addEventListener("animationend", d);
    }, d = () => {
      var _, N, L;
      (_ = h.current) == null || _.classList.remove(n), (N = h.current) == null || N.removeEventListener("animationstart", y), (L = h.current) == null || L.removeEventListener("animationend", d);
    };
    return setTimeout(() => {
      var _, N;
      (_ = h.current) == null || _.classList.add("d-block", "show"), (N = C == null ? void 0 : C.current) == null || N.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", m), (l = h.current) == null || l.addEventListener("animationstart", y), () => {
      var _, N;
      document.removeEventListener("keydown", m), (_ = h.current) == null || _.removeEventListener("animationstart", y), (N = h.current) == null || N.removeEventListener("animationend", d);
    };
  }, [c]);
  const h = j(null), C = j(null), E = () => {
    b(!1), i && i();
  }, u = () => new Promise((y, d) => {
    var _, N;
    if (!c)
      return y();
    const l = () => {
      var L;
      (L = h == null ? void 0 : h.current) == null || L.classList.remove("show", "d-block"), y(), E();
    };
    if (n) {
      const L = setTimeout(() => {
        l();
      }, n ? 50 : 0);
      (_ = h.current) == null || _.addEventListener("animationstart", () => {
        var T, k;
        clearTimeout(L), (T = h.current) == null || T.removeEventListener("animationend", l), (k = h.current) == null || k.addEventListener("animationend", l);
      }), (N = h.current) == null || N.classList.add(n, "close");
    } else
      l();
  });
  return c && Mt(/* @__PURE__ */ A(w, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: h,
        className: ["modal", a && "modal-" + a, n && n, f].filter((y) => y).join(" "),
        children: /* @__PURE__ */ s("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ A("div", { className: "modal-content", children: [
          /* @__PURE__ */ s(U, { name: "header", content: e, data: null, children: /* @__PURE__ */ A("div", { className: "modal-header", children: [
            /* @__PURE__ */ s("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ s(U, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ s("button", { onClick: u, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ s("div", { className: "modal-body", children: /* @__PURE__ */ s(U, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ s(U, { name: "footer", content: e, data: null, children: /* @__PURE__ */ s("div", { className: "modal-footer", children: /* @__PURE__ */ s(U, { name: "actions", content: e, data: null, children: /* @__PURE__ */ s("button", { onClick: u, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ s(
      "div",
      {
        ref: C,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((y) => y).join(" ")
      }
    )
  ] }), document.body);
}), Jt = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: o,
  className: a,
  ...i
}) => {
  const f = j(null);
  return R(() => {
    if (!f.current)
      return;
    const p = wt.loadAnimation({
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
}, lt = O.createContext(void 0);
var ce = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(ce || {});
function ut() {
  const e = O.useContext(lt);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function Zt(e) {
  var b;
  const [t, n] = F(), r = j(0), o = j(void 0), [a, i] = F(null);
  R(() => {
    r.current += 1;
  }, [t]);
  const f = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), p = (m) => {
    var E, u;
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
      const y = C[h.icon], d = Object.keys(f).filter((l) => l.endsWith(y)).pop();
      d && f[d]().then((l) => {
        i(l.default);
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
    }), (E = o.current) != null && E.isOpen() ? (u = o.current) == null || u.close().finally(() => {
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
  return /* @__PURE__ */ A(lt.Provider, { value: { open: p }, children: [
    e.children,
    t && /* @__PURE__ */ A(ct, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: o, children: [
      /* @__PURE__ */ s(K, { name: "header" }),
      /* @__PURE__ */ s(K, { name: "footer" }),
      /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ A("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ s(Jt, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ s("h3", { className: "modal-alert-title", children: t.title }),
        !!((b = t.text) != null && b.length) && /* @__PURE__ */ s("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ s("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((m) => {
          var h, C, E;
          return /* @__PURE__ */ s(
            be,
            {
              className: "btn btn-lg mx-2 " + (((h = t.actions) == null ? void 0 : h[m].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => c(m),
              children: ((E = ((C = t.actions) == null ? void 0 : C[m]) ?? null) == null ? void 0 : E.label) || m
            },
            m
          );
        }) })
      ] }) })
    ] }, r.current)
  ] });
}
const B = ({ to: e, children: t, onClick: n, ...r }) => {
  const { navigate: o } = W(), a = j(null), i = (f) => {
    var p;
    n && n(f), !f.defaultPrevented && (p = a == null ? void 0 : a.current) != null && p.href && (f.preventDefault(), o(a.current.href));
  };
  return R(() => {
    var f;
    return (f = a == null ? void 0 : a.current) == null || f.addEventListener("click", i), () => {
      var p;
      (p = a == null ? void 0 : a.current) == null || p.removeEventListener("click", i);
    };
  }, [e, n]), /* @__PURE__ */ s("a", { ref: a, href: e, ...r, children: /* @__PURE__ */ s(at, { children: t && t }) });
}, Xt = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: o, generateLink: a } = W(), i = o(e.entity, "list", e.namespace);
  return /* @__PURE__ */ A("section", { className: "edit", children: [
    /* @__PURE__ */ A("header", { children: [
      /* @__PURE__ */ A("h2", { className: "title", children: [
        i && /* @__PURE__ */ s(B, { to: a(i.route, n), children: "←" }),
        /* @__PURE__ */ s(U, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ s("nav", { children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ s("main", { children: /* @__PURE__ */ s(U, { name: "content", content: t, data: r }) })
  ] });
}, Ye = ({ action: e, children: t, onSuccess: n, modal: r, props: o }) => {
  const a = { ...e.parameters || {} }, i = j(void 0), f = j(void 0), { results: p } = it({
    entityAction: e.action,
    initParameters: a
  }), { open: c } = ut();
  return /* @__PURE__ */ A(r ? ct : Xt, { ref: f, ...o, action: e, routeParams: a, children: [
    /* @__PURE__ */ s(K, { name: "title", children: /* @__PURE__ */ s(U, { name: "title", content: t, data: p, children: (p == null ? void 0 : p.title) || "Title" }) }),
    /* @__PURE__ */ s(K, { name: "navigation", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: p }) }) }),
    /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "content", content: t, data: p, children: /* @__PURE__ */ s(
      Qt,
      {
        ref: i,
        data: p,
        action: e.action,
        onSuccess: (m) => {
          var C, E;
          (C = f.current) == null || C.close();
          const h = new CustomEvent("success", { detail: m });
          n && n(h, m), !h.defaultPrevented && c({
            title: "Success",
            text: Object.values(((E = m.messages) == null ? void 0 : E.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: ce.success,
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
        children: r && /* @__PURE__ */ s(K, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ s(K, { name: "actions", children: /* @__PURE__ */ s(U, { name: "actions", content: t, data: p, children: /* @__PURE__ */ s(
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
}, z = /* @__PURE__ */ new Map(), ye = {
  set(e, t, n) {
    z.has(e) || z.set(e, /* @__PURE__ */ new Map());
    const r = z.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return z.has(e) && z.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!z.has(e))
      return;
    const n = z.get(e);
    n.delete(t), n.size === 0 && z.delete(e);
  }
}, en = 1e3, Se = "transitionend", dt = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), tn = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), nn = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), o = Number.parseFloat(n);
  return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * en);
}, rn = (e) => {
  e.dispatchEvent(new Event(Se));
}, Q = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Te = (e) => Q(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(dt(e)) : null, ft = (e) => {
  if (!Q(e) || e.getClientRects().length === 0)
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
}, De = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", We = () => {
}, mt = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, Ee = [], sn = (e) => {
  document.readyState === "loading" ? (Ee.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of Ee)
      t();
  }), Ee.push(e)) : e();
}, se = () => document.documentElement.dir === "rtl", on = (e) => {
  sn(() => {
    const t = mt();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, xe = (e, t = [], n = e) => typeof e == "function" ? e(...t) : n, an = (e, t, n = !0) => {
  if (!n) {
    xe(e);
    return;
  }
  const o = nn(t) + 5;
  let a = !1;
  const i = ({ target: f }) => {
    f === t && (a = !0, t.removeEventListener(Se, i), xe(e));
  };
  t.addEventListener(Se, i), setTimeout(() => {
    a || rn(t);
  }, o);
}, cn = (e, t, n, r) => {
  const o = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[o - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + o) % o), e[Math.max(0, Math.min(a, o - 1))]);
}, ln = /[^.]*(?=\..*)\.|.*/, un = /\..*/, dn = /::\d+$/, _e = {};
let qe = 1;
const pt = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, fn = /* @__PURE__ */ new Set([
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
function ht(e, t) {
  return t && `${t}::${qe++}` || e.uidEvent || qe++;
}
function gt(e) {
  const t = ht(e);
  return e.uidEvent = t, _e[t] = _e[t] || {}, _e[t];
}
function mn(e, t) {
  return function n(r) {
    return Fe(r, { delegateTarget: e }), n.oneOff && $.off(e, r.type, t), t.apply(e, [r]);
  };
}
function pn(e, t, n) {
  return function r(o) {
    const a = e.querySelectorAll(t);
    for (let { target: i } = o; i && i !== this; i = i.parentNode)
      for (const f of a)
        if (f === i)
          return Fe(o, { delegateTarget: i }), r.oneOff && $.off(e, o.type, t, n), n.apply(i, [o]);
  };
}
function bt(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function yt(e, t, n) {
  const r = typeof t == "string", o = r ? n : t || n;
  let a = Et(e);
  return fn.has(a) || (a = e), [r, o, a];
}
function ze(e, t, n, r, o) {
  if (typeof t != "string" || !e)
    return;
  let [a, i, f] = yt(t, n, r);
  t in pt && (i = ((E) => function(u) {
    if (!u.relatedTarget || u.relatedTarget !== u.delegateTarget && !u.delegateTarget.contains(u.relatedTarget))
      return E.call(this, u);
  })(i));
  const p = gt(e), c = p[f] || (p[f] = {}), b = bt(c, i, a ? n : null);
  if (b) {
    b.oneOff = b.oneOff && o;
    return;
  }
  const m = ht(i, t.replace(ln, "")), h = a ? pn(e, n, i) : mn(e, i);
  h.delegationSelector = a ? n : null, h.callable = i, h.oneOff = o, h.uidEvent = m, c[m] = h, e.addEventListener(f, h, a);
}
function ke(e, t, n, r, o) {
  const a = bt(t[n], r, o);
  a && (e.removeEventListener(n, a, !!o), delete t[n][a.uidEvent]);
}
function hn(e, t, n, r) {
  const o = t[n] || {};
  for (const [a, i] of Object.entries(o))
    a.includes(r) && ke(e, t, n, i.callable, i.delegationSelector);
}
function Et(e) {
  return e = e.replace(un, ""), pt[e] || e;
}
const $ = {
  on(e, t, n, r) {
    ze(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    ze(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [o, a, i] = yt(t, n, r), f = i !== t, p = gt(e), c = p[i] || {}, b = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(c).length)
        return;
      ke(e, p, i, a, o ? n : null);
      return;
    }
    if (b)
      for (const m of Object.keys(p))
        hn(e, p, m, t.slice(1));
    for (const [m, h] of Object.entries(c)) {
      const C = m.replace(dn, "");
      (!f || t.includes(C)) && ke(e, p, i, h.callable, h.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = mt(), o = Et(t), a = t !== o;
    let i = null, f = !0, p = !0, c = !1;
    a && r && (i = r.Event(t, n), r(e).trigger(i), f = !i.isPropagationStopped(), p = !i.isImmediatePropagationStopped(), c = i.isDefaultPrevented());
    const b = Fe(new Event(t, { bubbles: f, cancelable: !0 }), n);
    return c && b.preventDefault(), p && e.dispatchEvent(b), b.defaultPrevented && i && i.preventDefault(), b;
  }
};
function Fe(e, t = {}) {
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
function Ge(e) {
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
      let o = r.replace(/^bs/, "");
      o = o.charAt(0).toLowerCase() + o.slice(1, o.length), t[o] = Ge(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Ge(e.getAttribute(`data-bs-${Ne(t)}`));
  }
};
class gn {
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
    const r = Q(n) ? de.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...Q(n) ? de.getDataAttributes(n) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, n = this.constructor.DefaultType) {
    for (const [r, o] of Object.entries(n)) {
      const a = t[r], i = Q(a) ? "element" : tn(a);
      if (!new RegExp(o).test(i))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${i}" but expected type "${o}".`
        );
    }
  }
}
const bn = "5.3.3";
class yn extends gn {
  constructor(t, n) {
    super(), t = Te(t), t && (this._element = t, this._config = this._getConfig(n), ye.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    ye.remove(this._element, this.constructor.DATA_KEY), $.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    an(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return ye.get(Te(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return bn;
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
  return t ? t.split(",").map((n) => dt(n)).join(",") : null;
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
    return this.find(t, e).filter((n) => !De(n) && ft(n));
  },
  getSelectorFromElement(e) {
    const t = Ce(e);
    return t && H.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Ce(e);
    return t ? H.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Ce(e);
    return t ? H.find(t) : [];
  }
}, Qe = "dropdown", En = "bs.dropdown", Z = `.${En}`, Ie = ".data-api", _n = "Escape", Je = "Tab", Nn = "ArrowUp", Ze = "ArrowDown", Cn = 2, An = `hide${Z}`, Ln = `hidden${Z}`, vn = `show${Z}`, On = `shown${Z}`, _t = `click${Z}${Ie}`, Nt = `keydown${Z}${Ie}`, Pn = `keyup${Z}${Ie}`, te = "show", Sn = "dropup", Tn = "dropend", Dn = "dropstart", xn = "dropup-center", kn = "dropdown-center", G = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', jn = `${G}.${te}`, le = ".dropdown-menu", Rn = ".navbar", Mn = ".navbar-nav", wn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", Fn = se() ? "top-end" : "top-start", In = se() ? "top-start" : "top-end", $n = se() ? "bottom-end" : "bottom-start", Un = se() ? "bottom-start" : "bottom-end", Vn = se() ? "left-start" : "right-start", Bn = se() ? "right-start" : "left-start", Hn = "top", Kn = "bottom", Yn = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Wn = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let X = class ue extends yn {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = H.next(this._element, le)[0] || H.prev(this._element, le)[0] || H.findOne(le, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Yn;
  }
  static get DefaultType() {
    return Wn;
  }
  static get NAME() {
    return Qe;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (De(this._element) || this._isShown())
      return;
    const t = {
      relatedTarget: this._element
    };
    if (!$.trigger(this._element, vn, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Mn))
        for (const r of [].concat(...document.body.children))
          $.on(r, "mouseover", We);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(te), this._element.classList.add(te), $.trigger(this._element, On, t);
    }
  }
  hide() {
    if (De(this._element) || !this._isShown())
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
    if (!$.trigger(this._element, An, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          $.off(r, "mouseover", We);
      this._popper && this._popper.destroy(), this._menu.classList.remove(te), this._element.classList.remove(te), this._element.setAttribute("aria-expanded", "false"), de.removeDataAttribute(this._menu, "popper"), $.trigger(this._element, Ln, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !Q(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Qe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof He > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : Q(this._config.reference) ? t = Te(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = He.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(te);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Tn))
      return Vn;
    if (t.classList.contains(Dn))
      return Bn;
    if (t.classList.contains(xn))
      return Hn;
    if (t.classList.contains(kn))
      return Kn;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Sn) ? n ? In : Fn : n ? Un : $n;
  }
  _detectNavbar() {
    return this._element.closest(Rn) !== null;
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
      ...xe(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = H.find(wn, this._menu).filter((o) => ft(o));
    r.length && cn(r, n, t === Ze, !r.includes(n)).focus();
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
    if (t.button === Cn || t.type === "keyup" && t.key !== Je)
      return;
    const n = H.find(jn);
    for (const r of n) {
      const o = ue.getInstance(r);
      if (!o || o._config.autoClose === !1)
        continue;
      const a = t.composedPath(), i = a.includes(o._menu);
      if (a.includes(o._element) || o._config.autoClose === "inside" && !i || o._config.autoClose === "outside" && i || o._menu.contains(t.target) && (t.type === "keyup" && t.key === Je || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const f = { relatedTarget: o._element };
      t.type === "click" && (f.clickEvent = t), o._completeHide(f);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === _n, o = [Nn, Ze].includes(t.key);
    if (!o && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(G) ? this : H.prev(this, G)[0] || H.next(this, G)[0] || H.findOne(G, t.delegateTarget.parentNode), i = ue.getOrCreateInstance(a);
    if (o) {
      t.stopPropagation(), i.show(), i._selectMenuItem(t);
      return;
    }
    i._isShown() && (t.stopPropagation(), i.hide(), a.focus());
  }
};
$.on(document, Nt, G, X.dataApiKeydownHandler);
$.on(document, Nt, le, X.dataApiKeydownHandler);
$.on(document, _t, X.clearMenus);
$.on(document, Pn, X.clearMenus);
$.on(document, _t, G, function(e) {
  e.preventDefault(), X.getOrCreateInstance(this).toggle();
});
on(X);
const fe = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ s(w, { children: e }), ie = ({ children: e, ...t }) => /* @__PURE__ */ s("div", { className: "dropdown-menu", children: e }), $e = ({ className: e, children: t, icon: n }) => {
  const r = j(null);
  R(() => {
    const c = new X(r.current);
    return () => {
      c.dispose();
    };
  }, []);
  const o = O.Children.toArray(t).find((c) => O.isValidElement(c) && c.type === ie), a = O.Children.toArray(t).filter((c) => O.isValidElement(c) && c.type === B), i = O.Children.toArray(t).find((c) => O.isValidElement(c) && c.type === fe), f = O.Children.toArray(t).filter((c) => !O.isValidElement(c) || c.type !== B && c.type !== ie && c.type !== fe), p = O.isValidElement(i) ? i.props : {};
  return /* @__PURE__ */ A("div", { className: [...(e || "").split(" "), "dropdown"].filter((c, b, m) => m.indexOf(c) === b).join(" "), children: [
    /* @__PURE__ */ s(be, { ref: r, "data-bs-toggle": "dropdown", ...p, className: [...(p.className || "").split(" "), "btn", "dropdown-toggle"].filter((c, b, m) => m.indexOf(c) === b).join(" "), children: p.children ? p.children : f }),
    o || /* @__PURE__ */ s(ie, { children: a })
  ] });
}, qn = re(({ data: e, columns: t, options: n, onClick: r, onBatchClick: o, routeParams: a, namespace: i }, f) => {
  var T, k, I, v, x, D, M;
  t = (t || ((T = e == null ? void 0 : e.entity) == null ? void 0 : T.columns) || []).filter((g) => g.group !== !1);
  const [, p] = F(), { generateLink: c } = W(), b = (k = e == null ? void 0 : e.entity) == null ? void 0 : k.primaryColumn, m = Object.values((e == null ? void 0 : e.action) || []), h = m.filter((g) => g.object), C = t.length + (m.length ? 1 : 0), E = ((e == null ? void 0 : e.entity.data.items) || []).map((g) => g[(b == null ? void 0 : b.field) || ""] || 0), u = j([]), y = !!E.length && E.reduce((g, S) => g && u.current.includes(S), !0), d = (x = (v = (I = e == null ? void 0 : e.form) == null ? void 0 : I.batch.view.children) == null ? void 0 : v.method) == null ? void 0 : x.choices, l = !!(d != null && d.length) && b, _ = (g, S = !1) => {
    S ? u.current.push(g) : u.current = u.current.filter((P) => P !== g), p({});
  }, N = (g = !1) => {
    u.current = (g ? u.current.concat(E) : u.current.filter((S) => !E.includes(S))).filter((S, P, V) => V.indexOf(S) === P), p({});
  }, L = (g) => {
    var V, q;
    if (!o)
      return;
    const S = e == null ? void 0 : e.form.batch.view;
    if (!l || !((V = u.current) != null && V.length))
      return;
    const P = new FormData();
    u.current.forEach((oe) => {
      var Ve;
      P.append(`${(Ve = S == null ? void 0 : S.children) == null ? void 0 : Ve.ids.full_name}[]`, oe.toString());
    }), P.append(((q = S == null ? void 0 : S.children) == null ? void 0 : q.method.full_name) || "method", g), o(g, u.current, P);
  };
  return /* @__PURE__ */ A(w, { children: [
    l && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ s("label", { className: "btn btn-light", children: /* @__PURE__ */ s(
        "input",
        {
          checked: y,
          onChange: (g) => N(g.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ A($e, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ s(fe, { disabled: !u.current.length, className: "btn-light" }),
        /* @__PURE__ */ s(ie, { children: (M = (D = e.form.batch.view.children) == null ? void 0 : D.method.choices) == null ? void 0 : M.map((g) => {
          const S = g.value instanceof Function ? g.value() : g.value;
          return /* @__PURE__ */ s(B, { to: "#", onClick: () => L(S), className: "dropdown-item", children: g.label instanceof Function ? g.label() : g.label }, S);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ A("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ A("tr", { children: [
        t.map((g, S) => /* @__PURE__ */ A("th", { children: [
          /* @__PURE__ */ s(J, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: g, prefix: "list", view: g.field + ".label", children: g.label }),
          g.sortable && (e == null ? void 0 : e.sort[g.field]) !== void 0 && /* @__PURE__ */ s(
            B,
            {
              onClick: (P) => r && r({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: i,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [g.field]: e != null && e.sort[g.field] ? (e == null ? void 0 : e.sort[g.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, P),
              className: "btn",
              to: "#",
              children: e.sort[g.field] ? e.sort[g.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, S)),
        b && h.length > 0 && /* @__PURE__ */ s("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ s("tbody", { children: e && (e.entity.data.items.length ? e.entity.data.items.map(
        (g, S) => /* @__PURE__ */ A("tr", { children: [
          t == null ? void 0 : t.map(
            (P, V) => {
              var q;
              return /* @__PURE__ */ A("td", { children: [
                V === 0 && l && /* @__PURE__ */ s(
                  "input",
                  {
                    checked: u.current.includes(g[b == null ? void 0 : b.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: g[b == null ? void 0 : b.field],
                    onChange: (oe) => _(g[b == null ? void 0 : b.field], oe.target.checked)
                  }
                ),
                /* @__PURE__ */ s(J, { namespace: i || "unknown", data: g, prefix: "list", view: P.field, children: g[P.field] !== void 0 && (g[P.field] instanceof Object ? g[P.field] instanceof Array ? g[P.field].join(", ") : JSON.stringify(g[P.field]) : (q = g[P.field]) == null ? void 0 : q.toString()) })
              ] }, V);
            }
          ),
          b && h.length > 0 && /* @__PURE__ */ s("td", { className: "text-end text-nowrap", children: h.map((P, V) => {
            var q;
            return /* @__PURE__ */ s(
              B,
              {
                onClick: (oe) => r && r({
                  action: P,
                  parameters: {
                    ...a || {},
                    id: g[b == null ? void 0 : b.field]
                  }
                }, oe),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((q = P.route) == null ? void 0 : q.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: c(P.route, {
                  ...a || {},
                  id: g[b.field]
                }),
                children: P.title
              },
              V
            );
          }) })
        ] }, S)
      ) : /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: C, children: "Not results found." }) })) })
    ] })
  ] });
}), ae = ({ route: e, page: t, active: n = !1, title: r, children: o }) => {
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
}, zn = ({ meta: e }) => {
  const n = e.totalPages, r = e.page || 1, o = e.links, a = !!e.totalPages;
  return /* @__PURE__ */ A("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ A("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ A(w, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ s("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ A("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ s(ae, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ A(w, { children: [
        /* @__PURE__ */ s(ae, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) })
      ] }),
      (o || []).map((i, f) => /* @__PURE__ */ s(ae, { page: i, active: i === r }, f)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ A(w, { children: [
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ s(
          ae,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ s(ae, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, je = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = je(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), Ct = O.createContext({});
function Gn() {
  const { setModal: e } = O.useContext(Ct);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function Qn(e) {
  const [t, n] = F(), r = j(0);
  R(() => {
    r.current += 1;
  }, [t]);
  const o = {
    ...(t == null ? void 0 : t.props) || {},
    onClose: () => {
      var a;
      (a = t == null ? void 0 : t.props) != null && a.onClose && t.props.onClose(), n(null);
    }
  };
  return /* @__PURE__ */ A(Ct.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ s(
      At,
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
const Jn = Y(({ action: e, embedded: t = !1 }) => {
  var L, T, k, I;
  const { generateLink: n, generateRoute: r, generateActionLink: o, location: a, navigate: i } = W();
  let f = new URLSearchParams(a.search);
  const p = j(void 0), c = j(Dt(f)), b = j(null), { openModal: m } = Gn(), { open: h } = ut(), C = e.action.entity;
  if (!C)
    throw new Error("Invalid Entity");
  const { results: E, refresh: u, setQueryParameters: y } = it({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: c.current }), d = Object.values((E == null ? void 0 : E.action) ?? []).filter((v) => !v.object && v.name !== e.action.name), l = (v) => {
    v == null || v.forEach((D) => {
      var M, g;
      (g = (M = c.current) == null ? void 0 : M.filter) == null || delete g[D];
    });
    const x = {
      ...c.current && c.current,
      ...p.current && { sort: p.current }
    };
    if (f = Le(je(x)), t)
      y(f);
    else {
      const D = new URL(document.location.href);
      D.search = f.toString(), i(D.toString());
    }
  }, _ = (v, x, D) => {
    h({
      title: "Are you sure?",
      icon: ce.confirm,
      onResult: (M) => {
        M.isConfirmed && ne().post({
          url: o(e),
          body: D
        }).catch((g) => {
          console.log("error", g);
        }).finally(() => {
          console.log("done"), u();
        });
      }
    });
  }, N = (v, x) => {
    switch (v.parameters !== void 0 && (v.parameters = je(v.parameters), Object.keys(v.parameters).length || (v.parameters = void 0)), v.action.name) {
      case "filter": {
        x == null || x.preventDefault(), c.current = v.parameters;
        break;
      }
      case "sort": {
        x == null || x.preventDefault(), p.current = v.parameters;
        break;
      }
      case "delete": {
        x == null || x.preventDefault(), h({
          title: "Are you sure?",
          icon: ce.confirm,
          onResult: (D) => {
            D.isConfirmed && ne().fetch({
              url: r(v.action.route, { ...e.parameters, ...v.parameters }),
              method: kt.DELETE
            }).catch((M) => {
              console.log("error", M);
            }).finally(() => {
              u();
            });
          }
        });
        return;
      }
      default: {
        t && (x == null || x.preventDefault(), m({
          action: v,
          props: {
            onClose: () => {
              u();
            }
          }
        }));
        return;
      }
    }
    l();
  };
  return R(() => {
    y(f);
  }, [a.search]), /* @__PURE__ */ s(w, { children: /* @__PURE__ */ A("section", { className: "list", children: [
    /* @__PURE__ */ A("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ s("h2", { children: E == null ? void 0 : E.title }),
      /* @__PURE__ */ A("div", { className: "d-flex align-items-center", children: [
        !!d.length && /* @__PURE__ */ s("div", { className: "btn-group btn-group-sm me-2", children: d.map((v, x) => /* @__PURE__ */ s(
          B,
          {
            to: n(v.route, e.parameters),
            onClick: (D) => N({
              action: v,
              parameters: e.parameters
            }, D),
            className: "btn btn-outline-secondary",
            children: v.title || v.name
          },
          x
        )) }),
        ((L = E == null ? void 0 : E.form) == null ? void 0 : L.filter) && /* @__PURE__ */ A("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ A($e, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ s(fe, { className: "btn-outline-dark", children: /* @__PURE__ */ s(Pe, { children: "Filter" }) }),
            /* @__PURE__ */ s(ie, { children: /* @__PURE__ */ s("div", { className: "filter", children: /* @__PURE__ */ A(
              st,
              {
                id: "filter_" + ge(C),
                ref: b,
                onSubmit: (v) => N({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: C
                  },
                  parameters: xt(v)
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
                  ((T = E == null ? void 0 : E.form) == null ? void 0 : T.filter) && /* @__PURE__ */ s(we, { view: E.form.filter.view }),
                  /* @__PURE__ */ s("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ s(Pe, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((k = c.current) == null ? void 0 : k.filter) || []).length && /* @__PURE__ */ s(be, { onClick: () => {
            var v;
            (v = b.current) == null || v.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((I = E == null ? void 0 : E.form) == null ? void 0 : I.filter) && /* @__PURE__ */ s(Zn, { formView: E.form.filter.view, onClick: (v) => l([v]) }),
    /* @__PURE__ */ A(J, { namespace: e.action.namespace, prefix: "modify", view: "content", data: E, children: [
      /* @__PURE__ */ s("div", { className: "table-responsive", children: /* @__PURE__ */ s(
        qn,
        {
          data: E,
          onClick: N,
          onBatchClick: _,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      E && /* @__PURE__ */ s(zn, { meta: E.entity.data.meta })
    ] }, "modify")
  ] }) });
}), Zn = ({ formView: e, onClick: t }) => {
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
}, Xn = ({ view: e, props: t }) => {
  const n = {
    add: Ye,
    edit: Ye,
    list: Jn
  };
  if (n[e] === void 0)
    throw new he(500, "View not found");
  return O.createElement(n[e] || Oe, t);
}, At = ({ view: e, namespace: t, props: n }) => /* @__PURE__ */ s(J, { namespace: t, view: e, props: n, children: /* @__PURE__ */ s(Xn, { view: e, props: n }) }, t + e), er = ({ path: e, preloader: t }) => {
  if (!Re.namespace[Ue])
    throw new pe(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = W(), [r, o] = F();
  if (R(() => {
    n(e).then((a) => o(a));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ s(w, { children: "Loading" });
  if (!r)
    throw new he(404, "Page Not Found");
  return /* @__PURE__ */ s(
    At,
    {
      view: r.action.name,
      namespace: r.action.namespace || "",
      props: { action: r }
    }
  );
}, tr = ({ children: e, config: t }) => /* @__PURE__ */ s(Ut, { config: t, children: /* @__PURE__ */ s(Zt, { children: /* @__PURE__ */ s(Qn, { children: e }) }) });
let Ae;
const Lt = {}, Ue = "dakataa_crud", fr = ({ connection: e, templates: t }) => {
  Re.namespace[Ue] = e, Lt.templates = t;
}, ne = () => (Ae || (Ae = Re.instance({ namespace: Ue })), Ae), mr = Bt(({ path: e, prefix: t, errorFallback: n, templates: r }) => {
  const { location: o } = W();
  return e ?? (e = o.pathname), t && (e = e.replace(new RegExp("^/" + t.replace(new RegExp("^/"), "") + "(/)?"), "/")), r = Object.assign(Lt.templates ?? {}, r ?? {}), /* @__PURE__ */ s(tr, { config: { templates: r, link: { prefix: t } }, children: /* @__PURE__ */ s(Ft, { fallback: n ?? /* @__PURE__ */ s(It, {}), children: /* @__PURE__ */ s(er, { path: e }) }, e) });
}), vt = O.createContext(null), nr = () => O.useContext(vt), rr = ({ item: e, open: t = !1 }) => {
  var l, _;
  const n = !!((l = e.items) != null && l.length), { location: r, generateRoute: o } = W(), a = r.pathname.replace(/(.*?)\/?$/i, "$1"), i = o(e.route), f = a.includes(i, 0), [p, c] = O.useState(f), b = nr(), m = j(null), h = j(null), C = "collapse", E = "collapsing", u = {
    toggle: (N) => {
      c(N !== void 0 ? N : !p);
    }
  }, y = () => {
    var N, L, T, k;
    (N = m.current) == null || N.classList.remove(E), (L = m.current) == null || L.classList.add(C), (T = m.current) == null || T.classList.toggle("show", p), (k = m.current) == null || k.style.removeProperty("height");
  }, d = () => {
    h.current && (clearTimeout(h.current), h.current = null);
  };
  return R(() => {
    var N, L, T, k, I, v, x, D, M;
    return p && b && b.toggle(!0), (N = m.current) == null || N.addEventListener("animationstart", d), (L = m.current) == null || L.addEventListener("transitionstart", d), (T = m.current) == null || T.addEventListener("animationend", y), (k = m.current) == null || k.addEventListener("transitionend", y), (v = m.current) == null || v.style.setProperty("height", (p ? 0 : (I = m.current) == null ? void 0 : I.scrollHeight) + "px"), (x = m.current) == null || x.classList.remove("show"), (D = m.current) == null || D.classList.remove(C), (M = m.current) == null || M.classList.add(E), setTimeout(() => {
      var g, S;
      (S = m.current) == null || S.style.setProperty("height", (p ? (g = m.current) == null ? void 0 : g.scrollHeight : 0) + "px");
    }, 10), h.current = setTimeout(y, 50), () => {
      var g, S, P, V;
      d(), (g = m.current) == null || g.removeEventListener("animationstart", d), (S = m.current) == null || S.removeEventListener("transitionstart", d), (P = m.current) == null || P.removeEventListener("animationend", y), (V = m.current) == null || V.removeEventListener("transitionend", y);
    };
  }, [p]), R(() => {
    t !== p && c(t);
  }, [t]), /* @__PURE__ */ s(vt.Provider, { value: u, children: /* @__PURE__ */ A("nav", { className: ["item", ...p || f ? ["active"] : []].join(" "), children: [
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
    n && !!((_ = e.items) != null && _.length) && /* @__PURE__ */ s("nav", { ref: m, className: C, children: /* @__PURE__ */ s(Ot, { items: e.items }) })
  ] }) });
}, Ot = ({ items: e }) => e.map(
  (t) => {
    const n = [parent, t.title].filter((r) => r).join("-").toLowerCase();
    return /* @__PURE__ */ s(rr, { item: t }, n);
  }
), sr = re(({ items: e, className: t, open: n = !1 }, r) => {
  const o = j(null), [a, i] = O.useState(n);
  r = r || Rt();
  const f = {
    toggle: (p) => {
      i(p !== void 0 ? p : !a);
    }
  };
  return me(r, () => f), R(() => {
    document.body.classList.toggle("toggle-nav", a);
    const p = (c) => {
      var b;
      (b = o.current) != null && b.contains(c.target) || (i(!1), document.body.removeEventListener("click", p));
    };
    if (a)
      return document.body.addEventListener("click", p), () => {
        document.body.removeEventListener("click", p);
      };
  }, [a]), /* @__PURE__ */ s("nav", { ref: o, children: /* @__PURE__ */ s(Ot, { items: e }) });
}), pr = Y(({ children: e, ...t }) => {
  const n = j(null), [r, o] = F([]);
  return R(() => {
    ne().get({
      url: "/_crud/navigation"
    }).then(({ status: a, data: i }) => {
      a === 200 && o(i);
    });
  }, []), /* @__PURE__ */ A(Xe, { children: [
    /* @__PURE__ */ s("header", { children: /* @__PURE__ */ A("div", { className: "wrap", children: [
      /* @__PURE__ */ s("button", { onClick: (a) => {
        var i;
        return (i = n.current) == null ? void 0 : i.toggle();
      }, className: "btn btn-mobile", children: /* @__PURE__ */ s("i", {}) }),
      /* @__PURE__ */ s("nav", { className: "first-nav", children: /* @__PURE__ */ s(B, { className: "logo", to: "/", children: "Admin" }) }),
      /* @__PURE__ */ s("nav", { className: "second-nav", children: /* @__PURE__ */ A($e, { className: "user", children: [
        /* @__PURE__ */ s("span", { className: "initials", children: "YL" }),
        /* @__PURE__ */ s(B, { to: "#", children: "Yordan Lazarov" }),
        /* @__PURE__ */ s(B, { to: "#", children: "Logout" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ A("main", { children: [
      !!r.length && /* @__PURE__ */ s("div", { className: "navigation d-print-none", children: /* @__PURE__ */ s(sr, { ref: n, items: r }) }),
      /* @__PURE__ */ s("div", { className: "content", children: e })
    ] })
  ] });
});
export {
  Vt as ActionProvider,
  Zt as AlertProvider,
  Xe as BaseLayout,
  mr as Crud,
  fr as CrudConfiguration,
  er as CrudLoader,
  tr as CrudProvider,
  J as DynamicView,
  Ft as ErrorBoundary,
  pe as Exception,
  st as Form,
  we as FormField,
  Yt as FormGroup,
  qt as FormWidget,
  qn as GridTable,
  he as HttpException,
  Wt as Input,
  Jn as List,
  pr as MainLayout,
  Qn as ModalProvider,
  Ye as Modify,
  U as TemplateBlock,
  K as TemplateExtend,
  W as UseActions,
  ut as UseAlert,
  Gn as UseModal,
  At as ViewLoader,
  ge as nameToId,
  Me as useForm,
  Bt as withRouterContext
};
