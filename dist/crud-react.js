var Pt = Object.defineProperty;
var St = (e, t, n) => t in e ? Pt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var X = (e, t, n) => St(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as s, Fragment as k, jsxs as N } from "react/jsx-runtime";
import * as Be from "react";
import S, { memo as W, useContext as Tt, useState as $, useEffect as v, forwardRef as ce, useRef as R, useImperativeHandle as ke, useReducer as Dt, use as Lt, Suspense as jt } from "react";
import Re, { convertObjectToURLSearchParams as Ce, RequestBodyType as xt, convertURLSearchParamsToObject as kt, convertFormDataToObject as Rt, Method as Mt } from "@dakataa/requester";
import "@dakataa/crud-theme/scss/theme.scss";
import { generatePath as vt, UNSAFE_RouteContext as Ft, matchPath as Ke, useNavigate as It, useParams as Vt, Link as z, useLocation as $t, useSearchParams as Ut } from "react-router";
import { createPortal as Bt } from "react-dom";
import Kt from "lottie-web/build/player/esm/lottie.min.js";
import * as He from "@popperjs/core";
class me {
  constructor(t = 0, n, r) {
    X(this, "code");
    X(this, "detail");
    X(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class ie extends me {
  constructor(n, r, o) {
    super(0, r, o);
    X(this, "status", 400);
    this.status = n;
  }
}
class Ht extends Be.Component {
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
    return n instanceof Error && (n = new ie(0, n.message)), {
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
        error: this.state.error
      }
    ) : this.props.children;
  }
}
const wt = W(({ children: e }) => /* @__PURE__ */ s(k, { children: e })), Yt = W(({ error: e }) => (e ?? (e = new ie(404, "Page not found.")), /* @__PURE__ */ s(wt, { children: /* @__PURE__ */ s("main", { children: /* @__PURE__ */ N("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ s("h1", { className: "display-1", children: e.status || "Error" }),
  /* @__PURE__ */ s("p", { className: "text-secondary", children: e.detail }),
  /* @__PURE__ */ s("br", {}),
  /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) }))), Wt = ({ children: e }) => /* @__PURE__ */ s(k, { children: e }), B = W(({ name: e, children: t, data: n, parent: r, render: o }) => (t = S.Children.toArray((o ? o(n, r) : t) || []).map((a) => (S.isValidElement(a) && a.type === Wt && (a = S.cloneElement(a, { children: r })), a)), /* @__PURE__ */ s(k, { children: t }))), V = W(({ name: e, content: t, children: n, data: r }) => {
  const o = S.Children.toArray(t).find((u) => S.isValidElement(u) && u.type === B && u.props.name === e);
  let a = null;
  o && S.isValidElement(o) && (a = S.cloneElement(o, { parent: n, data: r }));
  const c = S.Children.toArray(n).filter((u) => S.isValidElement(u) && u.type !== B);
  return /* @__PURE__ */ s(k, { children: a || (c.length ? c : n) });
}), Ae = (e) => e.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), Y = (e, t) => e ? vt(Ae(e.path), { ...e.defaults || {}, ...t }) : "#", qt = () => Tt(Ft).matches.reverse()[1] ?? null, we = "actions", tt = S.createContext(null);
function Me() {
  const e = S.useContext(tt), t = () => {
    if (Array.isArray(e))
      return e;
  }, n = (a, c, u) => {
    var h;
    return (h = t()) == null ? void 0 : h.filter((i) => i.entity === a && i.name === c && (u === void 0 || i.namespace === u)).shift();
  }, r = (a) => {
    var c;
    return (c = t()) == null ? void 0 : c.find((u) => {
      var h;
      return ((h = u.route) == null ? void 0 : h.path) && Ke(Ae(u.route.path), a);
    });
  };
  return {
    getAction: n,
    getActionByPath: r,
    getOnClickActionByPath: (a) => {
      const c = () => {
        var i;
        const u = r(a);
        if (!u)
          return null;
        const h = Ke(Ae(((i = u.route) == null ? void 0 : i.path) || ""), a);
        return {
          action: u,
          parameters: h == null ? void 0 : h.params
        };
      };
      return new Promise((u, h) => {
        let i = 0;
        const m = () => {
          if (i > 10)
            throw new me(0, "Cannot load routes");
          if (e)
            return u(c());
          setTimeout(m, 200), i++;
        };
        m();
      });
    }
  };
}
function zt(e) {
  let t = null;
  try {
    const o = sessionStorage.getItem(we);
    t = JSON.parse(atob(o || ""));
  } catch {
  }
  const [n, r] = $(t);
  return v(() => {
    t || ae().get("/_crud/actions", {}).then((o) => {
      o.status === 200 && o.getData().then((a) => {
        sessionStorage.setItem(we, btoa(JSON.stringify(a))), r(a);
      });
    }).catch((o) => {
      console.log("error", o);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ s(tt.Provider, { value: n, children: e.children });
}
const nt = S.createContext(null);
function ve() {
  const e = S.useContext(nt);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const pe = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), rt = ce(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: o,
  onSubmit: a,
  onReset: c,
  ...u
}, h) => {
  const i = R(null), m = {
    response: null,
    constraints: {},
    errors: {}
  }, f = {
    getFormData: () => new FormData(i.current || void 0),
    setFormData: (d) => {
      var p;
      [...((p = i.current) == null ? void 0 : p.elements) || []].forEach((C) => {
        const _ = d.get(C.name);
        switch (C.tagName.toLowerCase()) {
          case "select": {
            C.multiple ? [...C.options].forEach((A) => {
              A.selected = d.getAll(C.name).includes(A.value);
            }) : C.value = _;
            break;
          }
          default:
            switch (C.type) {
              case "checkbox":
                C.checked = !!_;
                break;
              default:
                C.value = _;
                break;
            }
        }
      });
    },
    setErrors: (d) => {
      const [, p] = b;
      p({ action: "errors", payload: d });
    },
    reset: () => {
      var d;
      (d = i.current) == null || d.reset();
    },
    submit: () => {
      var d;
      return (d = i.current) == null ? void 0 : d.requestSubmit();
    }
  };
  ke(h, () => f), v(() => {
    const d = () => {
      c && c();
    }, p = i == null ? void 0 : i.current;
    return p == null || p.addEventListener("reset", d), () => {
      p == null || p.removeEventListener("reset", d);
    };
  }, []);
  const l = (d, p) => {
    const C = f.getFormData();
    for (const _ of p)
      if (!_.isValid(C.get(d) || null))
        return { valid: !1, message: _.getMessage() };
    return { valid: !0, message: null };
  }, b = Dt((d, p) => {
    const { action: C, payload: _ } = p;
    switch (C) {
      case "constraints": {
        const { name: A, constraints: P } = _;
        return {
          ...d,
          constraints: {
            ...d.constraints || {},
            [A]: P
          }
        };
      }
      case "validate": {
        const { valid: A, message: P } = l(_, d.constraints[_] || []), D = d.errors || {}, y = _;
        return A ? delete D[y] : D[y] = [...D[y] || [], { message: P || "Error" }], Object.keys(D).length ? {
          ...d,
          errors: D
        } : d;
      }
      case "response":
        return {
          ...d,
          response: _
        };
      case "errors":
        return {
          ...d,
          errors: _ || []
        };
      case "error": {
        const A = { ...d.errors, ..._ };
        return {
          ...d,
          errors: A
        };
      }
    }
    return d;
  }, m), E = (d) => {
    d.preventDefault();
    const [p, C] = b;
    let _ = {};
    for (const [P, D] of Object.entries(p.constraints)) {
      const { valid: y, message: O } = l(P, D);
      y || (_[P] = [O]);
    }
    if (Object.values(_).length) {
      C({ action: "errors", payload: _ });
      return;
    }
    const A = new FormData((i == null ? void 0 : i.current) || void 0);
    if (o && o(A), a) {
      a(A);
      return;
    }
  };
  return /* @__PURE__ */ s(nt.Provider, { value: [b, h, i], children: /* @__PURE__ */ s("form", { id: e, ref: i, onSubmit: E, ...u, children: t }) });
}), Gt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r,
  choiceValueTransform: o,
  choiceLabelTransform: a,
  ...c
}) => {
  t = t || [];
  const [[u, h], i] = ve(), m = R(null), l = !!((u == null ? void 0 : u.errors[e.full_name]) || []).length, b = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  v(() => {
    h({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const E = (d) => {
    h({ action: "validate", payload: e.full_name }), r && r(d);
  };
  return e != null && e.expanded ? /* @__PURE__ */ s(k, { children: Object.values(e.choices || []).map(
    (d, p) => {
      var D;
      const C = pe(e.full_name, p), _ = o ? o(d) : d.value, A = a ? a(d) : d.label || _, P = {
        id: C,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(d) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ N(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: m,
                defaultValue: _,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (D = e == null ? void 0 : e.data) == null ? void 0 : D.includes(_),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: C,
                className: "form-check-input",
                ...P,
                onChange: (y) => {
                  var O, M;
                  return E({
                    value: (e != null && e.multiple ? (O = i == null ? void 0 : i.current) == null ? void 0 : O.getFormData().getAll(e == null ? void 0 : e.full_name) : (M = i == null ? void 0 : i.current) == null ? void 0 : M.getFormData().get(e == null ? void 0 : e.full_name)) || y.target.value,
                    targetValue: y.target.value,
                    checked: y.target.checked
                  });
                }
              },
              b
            ),
            /* @__PURE__ */ s(
              "label",
              {
                htmlFor: P.id,
                className: "form-check-label",
                children: A
              }
            )
          ]
        },
        p
      );
    }
  ) }) : /* @__PURE__ */ s(k, { children: /* @__PURE__ */ N(
    "select",
    {
      ref: m,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": l,
      onChange: (d) => {
        var p, C;
        return E({
          value: (e.multiple ? (p = i == null ? void 0 : i.current) == null ? void 0 : p.getFormData().getAll(e.full_name) : (C = i == null ? void 0 : i.current) == null ? void 0 : C.getFormData().get(e.full_name)) || d.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...l ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ s("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (d, p) => /* @__PURE__ */ s(
            "option",
            {
              value: d.value || d.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(d) : e.choice_attr),
              children: d.label
            },
            p
          )
        )
      ]
    },
    b
  ) });
}, st = ({ name: e, className: t }) => {
  const [[n]] = ve(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ s("div", { className: t, children: r.map((o, a) => /* @__PURE__ */ s("span", { children: o.message }, a)) }) : /* @__PURE__ */ s(k, {});
}, Oe = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), Jt = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const n = t.shift(), r = t.pop();
  return t = t.map((o) => o.toLowerCase()), n && t.unshift(Oe(n)), r && t.push(Oe(r)), t.join(" ");
}, Qt = ({
  view: e,
  children: t,
  className: n
}) => {
  const r = e.label || Jt(e.name), o = ["checkbox", "radio"].includes(e.type || "input");
  return /* @__PURE__ */ N(
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
        /* @__PURE__ */ s(st, { name: e.full_name, className: "invalid-feedback" }),
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
}, Zt = ({
  view: e,
  constraints: t,
  className: n,
  onChange: r
}) => {
  const [[o, a]] = ve(), c = R(null), u = (o == null ? void 0 : o.errors[e.full_name]) || [];
  v(() => {
    a({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const h = (l) => {
    a({ action: "validate", payload: e.full_name }), r && r(l);
  }, m = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", f = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ s(k, { children: /* @__PURE__ */ s(
    "input",
    {
      ref: c,
      id: e.id || pe(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !u.length,
      onKeyUp: (l) => h({ value: l.target.value }),
      onChange: (l) => h({ value: l.target.value }),
      className: [m, ...u.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    f
  ) });
}, Xt = ({
  view: e
}) => /* @__PURE__ */ s(Qt, { className: "mb-3", view: e, children: (() => {
  switch (e.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ s(Gt, { view: e });
    default:
      return /* @__PURE__ */ s(Zt, { view: e });
  }
})() }), Ye = ({ children: e }) => /* @__PURE__ */ s(k, { children: e }), J = W(({ namespace: e, view: t, prefix: n, children: r, props: o, data: a }) => {
  t = t.split(/[._]/).map((b) => Oe(b)).join("");
  const c = /* @__PURE__ */ Object.assign({}), u = ["crud", e, n, t].filter((b) => b).join("/") + ".tsx", [h, i] = Object.entries(c).filter(([b, E]) => b.endsWith(u)).shift() || [], [m, f] = $(1), l = R(Ye);
  return v(() => {
    if (i === void 0)
      return () => {
      };
    i().then((b) => {
      l.current = b.default, f(m + 1);
    });
  }, []), /* @__PURE__ */ s(l.current, { ...o, view: t, controller: e, viewName: t, data: a, parent: r, children: (!i || l.current !== Ye) && r });
}), Fe = W(({ view: e, namespace: t, name: n }) => e && /* @__PURE__ */ s(
  J,
  {
    namespace: t,
    view: n || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((r) => /* @__PURE__ */ s(Fe, { namespace: t, view: r }, r.id)) : /* @__PURE__ */ s(Xt, { view: e }, e.id)
  },
  e.id
)), ot = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: o = !1 }) => /* @__PURE__ */ s(k, { children: r && r }), he = ce(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ s("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ s(ot, { preload: t, ...n, children: e }) })), en = S.createContext(null);
function tn() {
  return S.useContext(en);
}
const at = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r } = Me();
  e = r(e.entity, e.name, e.namespace) || e;
  const [o, a] = $(), [c, u] = $(t || null), [h, i] = $(n instanceof URLSearchParams ? n : Ce(n || {}));
  R(null), btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(c || {}).map(([l, b]) => l + "-" + b), (h instanceof URLSearchParams ? h : Ce(h)).toString()].filter((l) => l).join("."))), R({});
  const [m, f] = $(1);
  return v(() => {
    e && ae().get(Y(e.route, c ?? null), h).then((l) => l.getData().then((b) => {
      switch (l.status) {
        case 201:
        case 200: {
          a(b);
          break;
        }
        default: {
          const E = b;
          throw new ie(E.status, E.detail, E.trace);
        }
      }
    }));
  }, [JSON.stringify(c), h.toString(), m]), {
    results: o,
    setParameters: u,
    setQueryParameters: (l) => {
      i(new URLSearchParams(l));
    },
    refresh: () => {
      f(m + 1);
    }
  };
}, Pe = W(({ children: e }) => /* @__PURE__ */ s(k, { children: e })), nn = ce(({ name: e, data: t, action: n, parameters: r, onSuccess: o, onError: a, onLoad: c, children: u, embedded: h = !1 }, i) => {
  var P, D, y, O, M;
  const [m, f] = $(!1), l = It(), b = Y(n.route, r || {}), E = R(null), d = tn(), [p, C] = $();
  ke(i, () => ({
    getData: () => p,
    getFormRef: () => E.current
  }));
  const _ = (x) => {
    var F, g;
    let L = {
      ...(F = x.errors) != null && F.length ? { [x.full_name]: x.errors } : {}
    };
    for (let [, T] of Object.entries((x == null ? void 0 : x.children) || []))
      T.children && Object.values(T.children).length ? L = { ...L, ..._(T) } : (g = T.errors) != null && g.length && (L[T.full_name] = T.errors);
    return L;
  }, A = (x) => {
    f(!0), ae().post(b, x, xt.FormData).then((L) => L.getData().then((F) => [200, 201, 400].includes(L.status) ? F : Promise.reject(F))).then((L) => {
      var g;
      C(L);
      const F = _(L.form.modify.view);
      if (Object.entries(F).length) {
        (g = E.current) == null || g.setErrors(F);
        return;
      }
      o && o(L), L.redirect && !h && l(Y(L.redirect.route, { ...r || {}, ...L.redirect.parameters }));
    }).catch((L) => {
      a && a(L);
    }).finally(() => {
      f(!1);
    });
  };
  return v(() => {
    c && c();
  }, []), t = (d == null ? void 0 : d.results) ?? t, v(() => {
    C(t);
  }, [JSON.stringify(t)]), p && /* @__PURE__ */ N(k, { children: [
    Object.keys((p == null ? void 0 : p.messages) || {}).map((x, L) => /* @__PURE__ */ s("div", { className: ["alert", "alert-" + x].join(" "), children: ((p == null ? void 0 : p.messages[x]) || ["Item was saved successful."]).join(" ") }, "alert-" + x)),
    /* @__PURE__ */ N(rt, { id: (y = (D = (P = p == null ? void 0 : p.form) == null ? void 0 : P.modify) == null ? void 0 : D.view) == null ? void 0 : y.id, ref: E, action: b, method: "POST", onSubmit: A, children: [
      ((M = (O = p == null ? void 0 : p.form) == null ? void 0 : O.modify) == null ? void 0 : M.view) !== void 0 && /* @__PURE__ */ N(k, { children: [
        /* @__PURE__ */ s(
          Fe,
          {
            name: e,
            namespace: n.namespace,
            view: p.form.modify.view
          },
          p.form.modify.view.id
        ),
        /* @__PURE__ */ s(st, { name: p.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ s(V, { name: "actions", content: u, data: { formRef: E }, children: /* @__PURE__ */ s(he, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ s(Pe, { children: "Save" }) }) })
    ] })
  ] });
}), ct = ce(({
  children: e,
  open: t = !1,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: o = !0,
  size: a,
  onClose: c,
  className: u
}, h) => {
  const [i, m] = $(t);
  ke(h, () => ({
    toggle: () => m(!i),
    open: () => m(!0),
    close: () => d(),
    isOpen: () => i
  })), v(() => {
    m(t);
  }, [t]);
  const f = (p) => {
    if (o)
      switch (p.key) {
        case "Escape": {
          d();
          break;
        }
      }
  };
  v(() => {
    var _;
    if (!i)
      return;
    const p = () => {
      var A;
      (A = l.current) == null || A.addEventListener("animationend", C);
    }, C = () => {
      var A, P, D;
      (A = l.current) == null || A.classList.remove(n), (P = l.current) == null || P.removeEventListener("animationstart", p), (D = l.current) == null || D.removeEventListener("animationend", C);
    };
    return setTimeout(() => {
      var A, P;
      (A = l.current) == null || A.classList.add("d-block", "show"), (P = b == null ? void 0 : b.current) == null || P.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", f), (_ = l.current) == null || _.addEventListener("animationstart", p), () => {
      var A, P;
      document.removeEventListener("keydown", f), (A = l.current) == null || A.removeEventListener("animationstart", p), (P = l.current) == null || P.removeEventListener("animationend", C);
    };
  }, [i]);
  const l = R(null), b = R(null), E = () => {
    m(!1), c && c();
  }, d = () => new Promise((p, C) => {
    var A, P;
    if (!i)
      return p();
    const _ = () => {
      var D;
      (D = l == null ? void 0 : l.current) == null || D.classList.remove("show", "d-block"), p(), E();
    };
    if (n) {
      const D = setTimeout(() => {
        _();
      }, n ? 50 : 0);
      (A = l.current) == null || A.addEventListener("animationstart", () => {
        var y, O;
        console.log("timeout"), clearTimeout(D), (y = l.current) == null || y.removeEventListener("animationend", _), (O = l.current) == null || O.addEventListener("animationend", _);
      }), (P = l.current) == null || P.classList.add(n, "close");
    } else
      _();
  });
  return i && Bt(/* @__PURE__ */ N(k, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: l,
        className: ["modal", a && "modal-" + a, n && n, u].filter((p) => p).join(" "),
        children: /* @__PURE__ */ s("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ N("div", { className: "modal-content", children: [
          /* @__PURE__ */ s(V, { name: "header", content: e, data: null, children: /* @__PURE__ */ N("div", { className: "modal-header", children: [
            /* @__PURE__ */ s("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ s(V, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ s("button", { onClick: d, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ s("div", { className: "modal-body", children: /* @__PURE__ */ s(V, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ s(V, { name: "footer", content: e, data: null, children: /* @__PURE__ */ s("div", { className: "modal-footer", children: /* @__PURE__ */ s(V, { name: "actions", content: e, data: null, children: /* @__PURE__ */ s("button", { onClick: d, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    r && /* @__PURE__ */ s(
      "div",
      {
        ref: b,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((p) => p).join(" ")
      }
    )
  ] }), document.body);
}), rn = ({
  animationData: e,
  path: t,
  options: n,
  width: r,
  height: o,
  className: a,
  ...c
}) => {
  const u = R(null);
  return v(() => {
    if (!u.current)
      return;
    const h = Kt.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: e,
      path: t,
      container: u.current,
      ...n || {}
    });
    return () => {
      h.destroy();
    };
  }, []), /* @__PURE__ */ s("div", { className: a, ref: u, style: { width: r, height: o } });
}, it = S.createContext(void 0);
var oe = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(oe || {});
function lt() {
  const e = S.useContext(it);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function sn(e) {
  var m;
  const [t, n] = $(), r = R(0), o = R(void 0), [a, c] = $(null);
  v(() => {
    r.current += 1;
  }, [t]);
  const u = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), h = (f) => {
    var E, d;
    let l = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...f || {}
    };
    const b = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(b, l.icon)) {
      const p = b[l.icon], C = Object.keys(u).filter((_) => _.endsWith(p)).pop();
      C && u[C]().then((_) => {
        c(_.default);
      });
    }
    !l.actions && !l.timeoutProgress && (l.actions = {
      cancel: {
        label: "Cancel",
        classList: ["btn-outline-primary"]
      },
      confirm: {
        label: "Confirm"
      }
    }), (E = o.current) != null && E.isOpen() ? (d = o.current) == null || d.close().finally(() => {
      n(l);
    }) : n(l);
  }, i = (f) => {
    var b;
    const l = {
      [f]: !0,
      isConfirmed: f === "confirm",
      isCancelled: f === "cancel",
      isDenied: f === "deny"
    };
    t != null && t.onResult && t.onResult(l), (b = o.current) == null || b.close().then(() => {
      c(null), n(void 0);
    });
  };
  return /* @__PURE__ */ N(it.Provider, { value: { open: h }, children: [
    e.children,
    t && /* @__PURE__ */ N(ct, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: o, children: [
      /* @__PURE__ */ s(B, { name: "header" }),
      /* @__PURE__ */ s(B, { name: "footer" }),
      /* @__PURE__ */ s(B, { name: "content", children: /* @__PURE__ */ N("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ s(rn, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ s("h3", { className: "modal-alert-title", children: t.title }),
        !!((m = t.text) != null && m.length) && /* @__PURE__ */ s("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ s("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((f) => {
          var l, b, E;
          return /* @__PURE__ */ s(
            he,
            {
              className: "btn btn-lg mx-2 " + (((l = t.actions) == null ? void 0 : l[f].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => i(f),
              children: ((E = ((b = t.actions) == null ? void 0 : b[f]) ?? null) == null ? void 0 : E.label) || f
            },
            f
          );
        }) })
      ] }) })
    ] })
  ] });
}
const on = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: o } = Me(), a = o(e.entity, "list", e.namespace);
  return /* @__PURE__ */ N("section", { className: "edit", children: [
    /* @__PURE__ */ N("header", { children: [
      /* @__PURE__ */ N("h2", { className: "title", children: [
        a && /* @__PURE__ */ s(z, { to: Y(a.route, n), children: "←" }),
        /* @__PURE__ */ s(V, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ s("nav", { children: /* @__PURE__ */ s(V, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ s("main", { children: /* @__PURE__ */ s(V, { name: "content", content: t, data: r }) })
  ] });
}, We = ({ action: e, children: t, onSuccess: n, modal: r, props: o }) => {
  const a = { ...e.parameters || {}, ...Vt() }, c = R(void 0), u = R(void 0), { results: h, setParameters: i } = at({
    entityAction: e.action,
    initParameters: a
  }), { open: m } = lt();
  return v(() => {
    i(a);
  }, [JSON.stringify(a)]), v(() => {
    var l;
    (l = u.current) == null || l.open();
  }, [JSON.stringify(h)]), /* @__PURE__ */ N(r ? ct : on, { ref: u, ...o, action: e, routeParams: a, children: [
    /* @__PURE__ */ s(B, { name: "title", children: /* @__PURE__ */ s(V, { name: "title", content: t, data: h, children: (h == null ? void 0 : h.title) || "Title" }) }),
    /* @__PURE__ */ s(B, { name: "navigation", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ s(V, { name: "navigation", content: t, data: h }) }) }),
    /* @__PURE__ */ s(B, { name: "content", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ s(V, { name: "content", content: t, data: h, children: /* @__PURE__ */ s(
      nn,
      {
        ref: c,
        data: h,
        action: e.action,
        onSuccess: (l) => {
          var E, d;
          (E = u.current) == null || E.close();
          const b = new CustomEvent("success", { detail: l });
          n && n(b, l), !b.defaultPrevented && m({
            title: "Success",
            text: Object.values(((d = l.messages) == null ? void 0 : d.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: oe.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (l) => {
          m({
            title: l.status + " " + l.detail,
            text: l.detail,
            icon: oe.denied,
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
        children: r && /* @__PURE__ */ s(B, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ s(B, { name: "actions", children: /* @__PURE__ */ s(V, { name: "actions", content: t, data: h, children: /* @__PURE__ */ s(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var l, b;
          return (b = (l = c.current) == null ? void 0 : l.getFormRef()) == null ? void 0 : b.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, an = () => /* @__PURE__ */ s("div", { children: "No View Found" }), qe = ({ to: e, children: t, ...n }) => /* @__PURE__ */ s(z, { to: e, ...n, children: /* @__PURE__ */ s(ot, { ...n, children: t && t }) }), w = /* @__PURE__ */ new Map(), ge = {
  set(e, t, n) {
    w.has(e) || w.set(e, /* @__PURE__ */ new Map());
    const r = w.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return w.has(e) && w.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!w.has(e))
      return;
    const n = w.get(e);
    n.delete(t), n.size === 0 && w.delete(e);
  }
}, cn = 1e3, Se = "transitionend", ut = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), ln = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), un = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), o = Number.parseFloat(n);
  return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * cn);
}, dn = (e) => {
  e.dispatchEvent(new Event(Se));
}, G = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Te = (e) => G(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(ut(e)) : null, dt = (e) => {
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
}, De = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", ze = () => {
}, ft = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, be = [], fn = (e) => {
  document.readyState === "loading" ? (be.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of be)
      t();
  }), be.push(e)) : e();
}, te = () => document.documentElement.dir === "rtl", mn = (e) => {
  fn(() => {
    const t = ft();
    if (t) {
      const n = e.NAME, r = t.fn[n];
      t.fn[n] = e.jQueryInterface, t.fn[n].Constructor = e, t.fn[n].noConflict = () => (t.fn[n] = r, e.jQueryInterface);
    }
  });
}, Le = (e, t = [], n = e) => typeof e == "function" ? e(...t) : n, pn = (e, t, n = !0) => {
  if (!n) {
    Le(e);
    return;
  }
  const o = un(t) + 5;
  let a = !1;
  const c = ({ target: u }) => {
    u === t && (a = !0, t.removeEventListener(Se, c), Le(e));
  };
  t.addEventListener(Se, c), setTimeout(() => {
    a || dn(t);
  }, o);
}, hn = (e, t, n, r) => {
  const o = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[o - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + o) % o), e[Math.max(0, Math.min(a, o - 1))]);
}, gn = /[^.]*(?=\..*)\.|.*/, bn = /\..*/, yn = /::\d+$/, ye = {};
let Ge = 1;
const mt = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, En = /* @__PURE__ */ new Set([
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
function pt(e, t) {
  return t && `${t}::${Ge++}` || e.uidEvent || Ge++;
}
function ht(e) {
  const t = pt(e);
  return e.uidEvent = t, ye[t] = ye[t] || {}, ye[t];
}
function _n(e, t) {
  return function n(r) {
    return Ie(r, { delegateTarget: e }), n.oneOff && I.off(e, r.type, t), t.apply(e, [r]);
  };
}
function Nn(e, t, n) {
  return function r(o) {
    const a = e.querySelectorAll(t);
    for (let { target: c } = o; c && c !== this; c = c.parentNode)
      for (const u of a)
        if (u === c)
          return Ie(o, { delegateTarget: c }), r.oneOff && I.off(e, o.type, t, n), n.apply(c, [o]);
  };
}
function gt(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function bt(e, t, n) {
  const r = typeof t == "string", o = r ? n : t || n;
  let a = yt(e);
  return En.has(a) || (a = e), [r, o, a];
}
function Je(e, t, n, r, o) {
  if (typeof t != "string" || !e)
    return;
  let [a, c, u] = bt(t, n, r);
  t in mt && (c = ((E) => function(d) {
    if (!d.relatedTarget || d.relatedTarget !== d.delegateTarget && !d.delegateTarget.contains(d.relatedTarget))
      return E.call(this, d);
  })(c));
  const h = ht(e), i = h[u] || (h[u] = {}), m = gt(i, c, a ? n : null);
  if (m) {
    m.oneOff = m.oneOff && o;
    return;
  }
  const f = pt(c, t.replace(gn, "")), l = a ? Nn(e, n, c) : _n(e, c);
  l.delegationSelector = a ? n : null, l.callable = c, l.oneOff = o, l.uidEvent = f, i[f] = l, e.addEventListener(u, l, a);
}
function je(e, t, n, r, o) {
  const a = gt(t[n], r, o);
  a && (e.removeEventListener(n, a, !!o), delete t[n][a.uidEvent]);
}
function Cn(e, t, n, r) {
  const o = t[n] || {};
  for (const [a, c] of Object.entries(o))
    a.includes(r) && je(e, t, n, c.callable, c.delegationSelector);
}
function yt(e) {
  return e = e.replace(bn, ""), mt[e] || e;
}
const I = {
  on(e, t, n, r) {
    Je(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Je(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [o, a, c] = bt(t, n, r), u = c !== t, h = ht(e), i = h[c] || {}, m = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(i).length)
        return;
      je(e, h, c, a, o ? n : null);
      return;
    }
    if (m)
      for (const f of Object.keys(h))
        Cn(e, h, f, t.slice(1));
    for (const [f, l] of Object.entries(i)) {
      const b = f.replace(yn, "");
      (!u || t.includes(b)) && je(e, h, c, l.callable, l.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = ft(), o = yt(t), a = t !== o;
    let c = null, u = !0, h = !0, i = !1;
    a && r && (c = r.Event(t, n), r(e).trigger(c), u = !c.isPropagationStopped(), h = !c.isImmediatePropagationStopped(), i = c.isDefaultPrevented());
    const m = Ie(new Event(t, { bubbles: u, cancelable: !0 }), n);
    return i && m.preventDefault(), h && e.dispatchEvent(m), m.defaultPrevented && c && c.preventDefault(), m;
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
function Ee(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const de = {
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
      o = o.charAt(0).toLowerCase() + o.slice(1, o.length), t[o] = Qe(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Qe(e.getAttribute(`data-bs-${Ee(t)}`));
  }
};
class An {
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
    for (const [r, o] of Object.entries(n)) {
      const a = t[r], c = G(a) ? "element" : ln(a);
      if (!new RegExp(o).test(c))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${c}" but expected type "${o}".`
        );
    }
  }
}
const On = "5.3.3";
class Pn extends An {
  constructor(t, n) {
    super(), t = Te(t), t && (this._element = t, this._config = this._getConfig(n), ge.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    ge.remove(this._element, this.constructor.DATA_KEY), I.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, n, r = !0) {
    pn(t, n, r);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return ge.get(Te(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, n = {}) {
    return this.getInstance(t) || new this(t, typeof n == "object" ? n : null);
  }
  static get VERSION() {
    return On;
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
  return t ? t.split(",").map((n) => ut(n)).join(",") : null;
}, U = {
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
    return this.find(t, e).filter((n) => !De(n) && dt(n));
  },
  getSelectorFromElement(e) {
    const t = _e(e);
    return t && U.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = _e(e);
    return t ? U.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = _e(e);
    return t ? U.find(t) : [];
  }
}, Ze = "dropdown", Sn = "bs.dropdown", Q = `.${Sn}`, Ve = ".data-api", Tn = "Escape", Xe = "Tab", Dn = "ArrowUp", et = "ArrowDown", Ln = 2, jn = `hide${Q}`, xn = `hidden${Q}`, kn = `show${Q}`, Rn = `shown${Q}`, Et = `click${Q}${Ve}`, _t = `keydown${Q}${Ve}`, Mn = `keyup${Q}${Ve}`, ee = "show", vn = "dropup", Fn = "dropend", In = "dropstart", Vn = "dropup-center", $n = "dropdown-center", q = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Un = `${q}.${ee}`, le = ".dropdown-menu", Bn = ".navbar", Kn = ".navbar-nav", Hn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", wn = te() ? "top-end" : "top-start", Yn = te() ? "top-start" : "top-end", Wn = te() ? "bottom-end" : "bottom-start", qn = te() ? "bottom-start" : "bottom-end", zn = te() ? "left-start" : "right-start", Gn = te() ? "right-start" : "left-start", Jn = "top", Qn = "bottom", Zn = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, Xn = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let Z = class ue extends Pn {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = U.next(this._element, le)[0] || U.prev(this._element, le)[0] || U.findOne(le, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Zn;
  }
  static get DefaultType() {
    return Xn;
  }
  static get NAME() {
    return Ze;
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
    if (!I.trigger(this._element, kn, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Kn))
        for (const r of [].concat(...document.body.children))
          I.on(r, "mouseover", ze);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(ee), this._element.classList.add(ee), I.trigger(this._element, Rn, t);
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
    if (!I.trigger(this._element, jn, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          I.off(r, "mouseover", ze);
      this._popper && this._popper.destroy(), this._menu.classList.remove(ee), this._element.classList.remove(ee), this._element.setAttribute("aria-expanded", "false"), de.removeDataAttribute(this._menu, "popper"), I.trigger(this._element, xn, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !G(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Ze.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof He > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : G(this._config.reference) ? t = Te(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = He.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(ee);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Fn))
      return zn;
    if (t.classList.contains(In))
      return Gn;
    if (t.classList.contains(Vn))
      return Jn;
    if (t.classList.contains($n))
      return Qn;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(vn) ? n ? Yn : wn : n ? qn : Wn;
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
    return (this._inNavbar || this._config.display === "static") && (de.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Le(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = U.find(Hn, this._menu).filter((o) => dt(o));
    r.length && hn(r, n, t === et, !r.includes(n)).focus();
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
    if (t.button === Ln || t.type === "keyup" && t.key !== Xe)
      return;
    const n = U.find(Un);
    for (const r of n) {
      const o = ue.getInstance(r);
      if (!o || o._config.autoClose === !1)
        continue;
      const a = t.composedPath(), c = a.includes(o._menu);
      if (a.includes(o._element) || o._config.autoClose === "inside" && !c || o._config.autoClose === "outside" && c || o._menu.contains(t.target) && (t.type === "keyup" && t.key === Xe || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const u = { relatedTarget: o._element };
      t.type === "click" && (u.clickEvent = t), o._completeHide(u);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === Tn, o = [Dn, et].includes(t.key);
    if (!o && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(q) ? this : U.prev(this, q)[0] || U.next(this, q)[0] || U.findOne(q, t.delegateTarget.parentNode), c = ue.getOrCreateInstance(a);
    if (o) {
      t.stopPropagation(), c.show(), c._selectMenuItem(t);
      return;
    }
    c._isShown() && (t.stopPropagation(), c.hide(), a.focus());
  }
};
I.on(document, _t, q, Z.dataApiKeydownHandler);
I.on(document, _t, le, Z.dataApiKeydownHandler);
I.on(document, Et, Z.clearMenus);
I.on(document, Mn, Z.clearMenus);
I.on(document, Et, q, function(e) {
  e.preventDefault(), Z.getOrCreateInstance(this).toggle();
});
mn(Z);
const fe = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ s(k, { children: e }), se = ({ children: e, ...t }) => /* @__PURE__ */ s("div", { className: "dropdown-menu", children: e }), Nt = ({ items: e, className: t, children: n, icon: r }) => {
  const o = R(null);
  v(() => {
    const m = new Z(o.current);
    return () => {
      m.dispose();
    };
  }, []);
  const a = S.Children.toArray(n).find((m) => S.isValidElement(m) && m.type === se), c = S.Children.toArray(n).filter((m) => S.isValidElement(m) && m.type === qe), u = S.Children.toArray(n).find((m) => S.isValidElement(m) && m.type === fe), h = S.Children.toArray(n).filter((m) => !S.isValidElement(m) || m.type !== qe && m.type !== se && m.type !== fe), i = S.isValidElement(u) ? u.props : {};
  return /* @__PURE__ */ N("div", { className: [...(t || "").split(" "), "dropdown"].filter((m, f, l) => l.indexOf(m) === f).join(" "), children: [
    /* @__PURE__ */ s(he, { ref: o, "data-bs-toggle": "dropdown", ...i, className: [...(i.className || "").split(" "), "btn", "dropdown-toggle"].filter((m, f, l) => l.indexOf(m) === f).join(" "), children: i.children ? i.children : h }),
    a || /* @__PURE__ */ s(se, { children: c })
  ] });
}, er = ce(({ data: e, columns: t, options: n, onClick: r, onBatchClick: o, routeParams: a, namespace: c }, u) => {
  var D, y, O, M, x, L, F;
  t = (t || ((D = e == null ? void 0 : e.entity) == null ? void 0 : D.columns) || []).filter((g) => g.group !== !1);
  const [, h] = $(), i = (y = e == null ? void 0 : e.entity) == null ? void 0 : y.primaryColumn, m = Object.values((e == null ? void 0 : e.action) || []), f = m.filter((g) => g.object), l = t.length + (m.length ? 1 : 0), b = ((e == null ? void 0 : e.entity.data.items) || []).map((g) => g[(i == null ? void 0 : i.field) || ""] || 0), E = R([]), d = !!b.length && b.reduce((g, T) => g && E.current.includes(T), !0), p = (x = (M = (O = e == null ? void 0 : e.form) == null ? void 0 : O.batch.view.children) == null ? void 0 : M.method) == null ? void 0 : x.choices, C = !!(p != null && p.length) && i, _ = (g, T = !1) => {
    T ? E.current.push(g) : E.current = E.current.filter((j) => j !== g), h({});
  }, A = (g = !1) => {
    E.current = (g ? E.current.concat(b) : E.current.filter((T) => !b.includes(T))).filter((T, j, K) => K.indexOf(T) === j), h({});
  }, P = (g) => {
    var K, H;
    if (!o)
      return;
    const T = e == null ? void 0 : e.form.batch.view;
    if (!C || !((K = E.current) != null && K.length))
      return;
    const j = new FormData();
    E.current.forEach((ne) => {
      var Ue;
      j.append(`${(Ue = T == null ? void 0 : T.children) == null ? void 0 : Ue.ids.full_name}[]`, ne.toString());
    }), j.append(((H = T == null ? void 0 : T.children) == null ? void 0 : H.method.full_name) || "method", g), o(g, E.current, j);
  };
  return /* @__PURE__ */ N(k, { children: [
    C && /* @__PURE__ */ N("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ s("label", { className: "btn btn-light", children: /* @__PURE__ */ s(
        "input",
        {
          checked: d,
          onChange: (g) => A(g.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ N(Nt, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ s(fe, { disabled: !E.current.length, className: "btn-light" }),
        /* @__PURE__ */ s(se, { children: (F = (L = e.form.batch.view.children) == null ? void 0 : L.method.choices) == null ? void 0 : F.map((g) => {
          const T = g.value instanceof Function ? g.value() : g.value;
          return /* @__PURE__ */ s(z, { to: "#", onClick: () => P(T), className: "dropdown-item", children: g.label instanceof Function ? g.label() : g.label }, T);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ N("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ N("tr", { children: [
        t.map((g, T) => /* @__PURE__ */ N("th", { children: [
          /* @__PURE__ */ s(J, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: g, prefix: "list", view: g.field + ".label", children: g.label }),
          g.sortable && (e == null ? void 0 : e.sort[g.field]) !== void 0 && /* @__PURE__ */ s(
            z,
            {
              onClick: (j) => r && r({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: c,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [g.field]: e != null && e.sort[g.field] ? (e == null ? void 0 : e.sort[g.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, j),
              className: "btn",
              to: "#",
              children: e.sort[g.field] ? e.sort[g.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, T)),
        i && f.length > 0 && /* @__PURE__ */ s("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ s("tbody", { children: e && (e.entity.data.items.length ? e.entity.data.items.map(
        (g, T) => /* @__PURE__ */ N("tr", { children: [
          t == null ? void 0 : t.map(
            (j, K) => {
              var H;
              return /* @__PURE__ */ N("td", { children: [
                K === 0 && C && /* @__PURE__ */ s(
                  "input",
                  {
                    checked: E.current.includes(g[i == null ? void 0 : i.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: g[i == null ? void 0 : i.field],
                    onChange: (ne) => _(g[i == null ? void 0 : i.field], ne.target.checked)
                  }
                ),
                /* @__PURE__ */ s(J, { namespace: c || "unknown", data: g, prefix: "list", view: j.field, children: g[j.field] !== void 0 && (g[j.field] instanceof Object ? g[j.field] instanceof Array ? g[j.field].join(", ") : JSON.stringify(g[j.field]) : (H = g[j.field]) == null ? void 0 : H.toString()) })
              ] }, K);
            }
          ),
          i && f.length > 0 && /* @__PURE__ */ s("td", { className: "text-end text-nowrap", children: f.map((j, K) => {
            var H;
            return /* @__PURE__ */ s(
              z,
              {
                onClick: (ne) => r && r({
                  action: j,
                  parameters: {
                    ...a || {},
                    id: g[i == null ? void 0 : i.field]
                  }
                }, ne),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((H = j.route) == null ? void 0 : H.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: Y(j.route, {
                  ...a || {},
                  id: g[i.field]
                }),
                children: j.title
              },
              K
            );
          }) })
        ] }, T)
      ) : /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: l, children: "Not results found." }) })) })
    ] })
  ] });
}), re = ({ route: e, page: t, active: n = !1, title: r, children: o }) => {
  const a = new URL(document.location.href);
  return a.searchParams.set("page", t.toString()), /* @__PURE__ */ s("li", { className: `page-item ${n ? "active" : ""}`, children: /* @__PURE__ */ s(
    z,
    {
      to: a.toString(),
      className: "page-link",
      title: r,
      children: o || t
    }
  ) });
}, tr = ({ meta: e }) => {
  const n = e.totalPages, r = e.page || 1, o = e.links, a = !!e.totalPages;
  return /* @__PURE__ */ N("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ N("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ N(k, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ s("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ N("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ s(re, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ N(k, { children: [
        /* @__PURE__ */ s(re, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) })
      ] }),
      (o || []).map((c, u) => /* @__PURE__ */ s(re, { page: c, active: c === r }, u)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ N(k, { children: [
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ s(
          re,
          {
            page: n,
            active: n === r,
            children: n
          },
          n
        )
      ] }),
      r < n && /* @__PURE__ */ s(re, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, xe = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = xe(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), Ct = ({ children: e }) => /* @__PURE__ */ s(rr, { children: /* @__PURE__ */ s(sn, { children: /* @__PURE__ */ s(zt, { children: e }) }) }), At = S.createContext({});
function nr() {
  const { setModal: e } = S.useContext(At);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function rr(e) {
  const [t, n] = $(), r = R(0);
  return v(() => {
    r.current += 1;
  }, [t]), /* @__PURE__ */ N(At.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ s(Ct, { children: /* @__PURE__ */ s(
      Ot,
      {
        view: t.action.action.name || "list",
        namespace: t.action.action.namespace || "",
        props: {
          action: t.action.action,
          routeParams: t.action.parameters,
          modal: !0,
          props: t.props
        }
      },
      r.current
    ) })
  ] });
}
const sr = W(({ action: e, embedded: t = !1 }) => {
  var _, A, P, D;
  const n = $t(), [r, o] = Ut(), a = R(void 0), c = R(kt(r)), u = R(null), { openModal: h } = nr(), { open: i } = lt(), m = e.action.entity;
  if (!m)
    throw new Error("Invalid Entity");
  const { results: f, refresh: l, setQueryParameters: b } = at({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: c.current }), E = Object.values((f == null ? void 0 : f.action) ?? []).filter((y) => !y.object && y.name !== e.action.name), d = (y) => {
    y == null || y.forEach((x) => {
      var L, F;
      (F = (L = c.current) == null ? void 0 : L.filter) == null || delete F[x];
    });
    const O = {
      ...c.current && c.current,
      ...a.current && { sort: a.current }
    }, M = Ce(xe(O));
    t ? b(M) : o(M);
  }, p = (y, O, M) => {
    console.log("method", O, M), i({
      title: "Are you sure?",
      icon: oe.confirm,
      onResult: (x) => {
        x.isConfirmed && ae().post(Y(e.action.route, e.parameters), M).catch((L) => {
          console.log("error", L);
        }).finally(() => {
          console.log("done"), l();
        });
      }
    });
  }, C = (y, O) => {
    switch (y.parameters !== void 0 && (y.parameters = xe(y.parameters), Object.keys(y.parameters).length || (y.parameters = void 0)), y.action.name) {
      case "filter": {
        O == null || O.preventDefault(), c.current = y.parameters;
        break;
      }
      case "sort": {
        O == null || O.preventDefault(), a.current = y.parameters;
        break;
      }
      case "delete": {
        O == null || O.preventDefault(), i({
          title: "Are you sure?",
          icon: oe.confirm,
          onResult: (M) => {
            M.isConfirmed && ae().fetch({
              url: Y(y.action.route, { ...e.parameters, ...y.parameters }),
              method: Mt.DELETE
            }).catch((x) => {
              console.log("error", x);
            }).finally(() => {
              l();
            });
          }
        });
        return;
      }
      default: {
        t && (O == null || O.preventDefault(), h({
          action: y,
          props: {
            onClose: () => {
              l();
            }
          }
        }));
        return;
      }
    }
    d();
  };
  return v(() => {
    b(r);
  }, [n]), /* @__PURE__ */ s(k, { children: /* @__PURE__ */ N("section", { className: "list", children: [
    /* @__PURE__ */ N("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ s("h2", { children: f == null ? void 0 : f.title }),
      /* @__PURE__ */ N("div", { className: "d-flex align-items-center", children: [
        !!E.length && /* @__PURE__ */ s("div", { className: "btn-group btn-group-sm me-2", children: E.map((y, O) => /* @__PURE__ */ s(
          z,
          {
            to: Y(y.route, e.parameters),
            onClick: (M) => C({
              action: y,
              parameters: e.parameters
            }, M),
            className: "btn btn-outline-secondary",
            children: y.title || y.name
          },
          O
        )) }),
        ((_ = f == null ? void 0 : f.form) == null ? void 0 : _.filter) && /* @__PURE__ */ N("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ N(Nt, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ s(fe, { className: "btn-outline-dark", children: /* @__PURE__ */ s(Pe, { children: "Filter" }) }),
            /* @__PURE__ */ s(se, { children: /* @__PURE__ */ s("div", { className: "filter", children: /* @__PURE__ */ N(
              rt,
              {
                id: "filter_" + pe(m),
                ref: u,
                onSubmit: (y) => C({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: m
                  },
                  parameters: Rt(y)
                }),
                onReset: () => C({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: m
                  }
                }),
                children: [
                  ((A = f == null ? void 0 : f.form) == null ? void 0 : A.filter) && /* @__PURE__ */ s(Fe, { view: f.form.filter.view }),
                  /* @__PURE__ */ s("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ s(Pe, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((P = c.current) == null ? void 0 : P.filter) || []).length && /* @__PURE__ */ s(he, { onClick: () => {
            var y;
            (y = u.current) == null || y.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((D = f == null ? void 0 : f.form) == null ? void 0 : D.filter) && /* @__PURE__ */ s(or, { formView: f.form.filter.view, onClick: (y) => d([y]) }),
    /* @__PURE__ */ N(J, { namespace: e.action.namespace, prefix: "modify", view: "content", data: f, children: [
      /* @__PURE__ */ s("div", { className: "table-responsive", children: /* @__PURE__ */ s(
        er,
        {
          data: f,
          onClick: C,
          onBatchClick: p,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      f && /* @__PURE__ */ s(tr, { meta: f.entity.data.meta })
    ] }, "modify")
  ] }) });
}), or = ({ formView: e, onClick: t }) => {
  const n = (r) => r.choices !== void 0 ? r.choices ? Object.values(r.data instanceof Object ? r.data : [r.data]).map((o) => {
    var a, c;
    return ((c = (a = r.choices) == null ? void 0 : a[o]) == null ? void 0 : c.label) ?? o;
  }).join(", ") : r.data : r.checked !== void 0 ? r.checked ? "Yes" : "No" : r.data;
  return /* @__PURE__ */ s("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((r) => r.data !== null).map((r, o) => /* @__PURE__ */ N("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ s("small", { className: "mb-2", children: r.label }),
    /* @__PURE__ */ N("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      n(r),
      t && /* @__PURE__ */ s("span", { onClick: () => t(r.name), className: "ms-2", children: "×" })
    ] })
  ] }, o)) });
}, ar = ({ view: e, props: t }) => {
  const n = {
    add: We,
    edit: We,
    list: sr
  };
  if (n[e] === void 0)
    throw new ie(500, "View not found");
  return S.createElement(n[e] || an, t);
}, Ot = ({ view: e, namespace: t, props: n }) => /* @__PURE__ */ s(J, { namespace: t, view: e, props: n, children: /* @__PURE__ */ s(ar, { view: e, props: n }) }, t + e), cr = ({ path: e }) => {
  const t = qt();
  e ?? (e = document.location.pathname.replace(new RegExp("^" + (t == null ? void 0 : t.pathnameBase) + "(/)?"), "/"));
  const { getOnClickActionByPath: n } = Me(), r = Lt(n(e));
  if (!r)
    throw new ie(404, "Page Not Found");
  return /* @__PURE__ */ s(
    Ot,
    {
      view: r.action.name,
      namespace: r.action.namespace || "",
      props: { action: r }
    }
  );
};
let Ne;
const $e = "dakataa_crud", gr = (e) => {
  Re.namespace[$e] = e;
}, ae = () => (Ne || (Ne = new Re({}, $e)), Ne), br = ({ path: e, errorFallback: t }) => {
  if (!Re.namespace[$e])
    throw new me(500, "Invalid Configuration.");
  return /* @__PURE__ */ s(Ct, { children: /* @__PURE__ */ s(Ht, { fallback: t ?? /* @__PURE__ */ s(Yt, {}), children: /* @__PURE__ */ s(jt, { fallback: /* @__PURE__ */ s(k, { children: "Loading" }), children: /* @__PURE__ */ s(cr, { path: e }) }) }) });
};
export {
  sn as AlertProvider,
  br as Crud,
  gr as CrudConfiguration,
  Ct as CrudContext,
  cr as CrudLoader,
  J as DynamicView,
  Ht as ErrorBoundary,
  me as Exception,
  rt as Form,
  Qt as FormGroup,
  Fe as FormView,
  Xt as FormWidget,
  er as GridTableView,
  ie as HttpException,
  Zt as Input,
  sr as List,
  rr as ModalProvider,
  We as Modify,
  V as TemplateBlock,
  B as TemplateExtend,
  lt as UseAlert,
  nr as UseModal,
  Ot as ViewLoader,
  pe as nameToId,
  ve as useForm
};
