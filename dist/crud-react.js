var Dt = Object.defineProperty;
var Lt = (e, t, n) => t in e ? Dt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ee = (e, t, n) => Lt(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as s, Fragment as j, jsxs as E } from "react/jsx-runtime";
import je, { convertObjectToURLSearchParams as Ae, RequestBodyType as kt, convertURLSearchParamsToObject as xt, convertFormDataToObject as jt, Method as Rt } from "@dakataa/requester";
import * as Be from "react";
import P, { memo as W, useContext as vt, useState as V, useEffect as v, forwardRef as ce, useRef as R, useImperativeHandle as Re, useReducer as Mt } from "react";
import "@dakataa/crud-theme/scss/theme.scss";
import { UNSAFE_RouteContext as Ft, useNavigate as It, generatePath as $t, matchPath as Ke, useParams as Vt, Link as et, useLocation as tt, useSearchParams as Ut } from "react-router";
import { createPortal as Bt } from "react-dom";
import Kt from "lottie-web/build/player/esm/lottie.min.js";
import * as He from "@popperjs/core";
class pe {
  constructor(t = 0, n, r) {
    ee(this, "code");
    ee(this, "detail");
    ee(this, "trace");
    this.code = t, this.detail = n, this.trace = r;
  }
}
class le extends pe {
  constructor(n, r, o) {
    super(0, r, o);
    ee(this, "status", 400);
    this.status = n;
  }
}
class Ht extends Be.Component {
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
    return n instanceof Error && (n = new le(0, n.message)), {
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
const wt = W(({ children: e }) => /* @__PURE__ */ s(j, { children: e })), Yt = W(({ error: e }) => (e ?? (e = new le(404, "Page not found.")), /* @__PURE__ */ s(wt, { children: /* @__PURE__ */ s("main", { children: /* @__PURE__ */ E("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ s("h1", { className: "display-1", children: e.status || "Error" }),
  /* @__PURE__ */ s("p", { className: "text-secondary", children: e.detail }),
  /* @__PURE__ */ s("br", {}),
  /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) }))), Wt = ({ children: e }) => /* @__PURE__ */ s(j, { children: e }), K = W(({ name: e, children: t, data: n, parent: r, render: o }) => (t = P.Children.toArray((o ? o(n, r) : t) || []).map((a) => (P.isValidElement(a) && a.type === Wt && (a = P.cloneElement(a, { children: r })), a)), /* @__PURE__ */ s(j, { children: t }))), U = W(({ name: e, content: t, children: n, data: r }) => {
  const o = P.Children.toArray(t).find((f) => P.isValidElement(f) && f.type === K && f.props.name === e);
  let a = null;
  o && P.isValidElement(o) && (a = P.cloneElement(o, { parent: n, data: r }));
  const c = P.Children.toArray(n).filter((f) => P.isValidElement(f) && f.type !== K);
  return /* @__PURE__ */ s(j, { children: a || (c.length ? c : n) });
}), nt = P.createContext({});
function rt() {
  return P.useContext(nt);
}
function qt({ config: e, ...t }) {
  return /* @__PURE__ */ s(nt.Provider, { value: e, children: t.children });
}
const Q = () => {
  const e = vt(Ft), t = It(), n = rt(), r = (i) => i.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), o = (i, b = void 0) => $t(r(i), b), a = (i, b) => i ? o(i.path, { ...i.defaults || {}, ...b }) : "#", c = (i, b) => {
    let l = a(i, b);
    return f(l);
  }, f = (i) => {
    var b;
    return (b = n.link) != null && b.prefix && (i = "/" + n.link.prefix.replaceAll(new RegExp("^/|/$", "g"), "") + i), i;
  };
  return {
    navigate: (i) => t(i),
    generateRoute: a,
    generateLink: c,
    generateRoutePath: o,
    crudToReactPathPattern: r,
    getParentReactRoute: () => e.matches.reverse()[1] ?? null
  };
}, we = "actions", st = P.createContext(void 0);
function ve() {
  const e = P.useContext(st), { crudToReactPathPattern: t } = Q();
  if (e === void 0)
    throw new Error("UseActions should be used inside ActionProvider");
  const n = () => {
    if (Array.isArray(e))
      return e;
  }, r = (c, f, p) => {
    var d;
    return (d = n()) == null ? void 0 : d.filter((i) => i.entity === c && i.name === f && (p === void 0 || i.namespace === p)).shift();
  }, o = (c) => {
    var f;
    return (f = n()) == null ? void 0 : f.find((p) => {
      var d;
      return ((d = p.route) == null ? void 0 : d.path) && Ke(t(p.route.path), c);
    });
  };
  return {
    getAction: r,
    getActionByPath: o,
    getOnClickActionByPath: (c) => {
      const f = () => {
        var i;
        const p = o(c);
        if (!p)
          return null;
        const d = Ke(t(((i = p.route) == null ? void 0 : i.path) || ""), c);
        return {
          action: p,
          parameters: d == null ? void 0 : d.params
        };
      };
      return new Promise((p) => {
        let d = 0;
        const i = () => {
          if (d > 10)
            throw new pe(0, "Cannot load routes");
          if (e)
            return p(f());
          setTimeout(i, 200), d++;
        };
        i();
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
  const [n, r] = V(t);
  return v(() => {
    t || ie().get({ url: "/_crud/actions" }).then(({ status: o, data: a }) => {
      o === 200 && (sessionStorage.setItem(we, btoa(JSON.stringify(a))), r(a));
    }).catch((o) => {
      console.log("error", o);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ s(st.Provider, { value: n, children: e.children });
}
const ot = P.createContext(null);
function Me() {
  const e = P.useContext(ot);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const he = (e, t = null) => ((e == null ? void 0 : e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_")) + (t ?? "")).toLowerCase(), at = ce(({
  id: e,
  children: t,
  data: n,
  onError: r,
  onBeforeSubmit: o,
  onSubmit: a,
  onReset: c,
  ...f
}, p) => {
  const d = R(null), i = {
    response: null,
    constraints: {},
    errors: {}
  }, b = {
    getFormData: () => new FormData(d.current || void 0),
    setFormData: (u) => {
      var y;
      [...((y = d.current) == null ? void 0 : y.elements) || []].forEach((_) => {
        const g = u.get(_.name);
        switch (_.tagName.toLowerCase()) {
          case "select": {
            _.multiple ? [..._.options].forEach((C) => {
              C.selected = u.getAll(_.name).includes(C.value);
            }) : _.value = g;
            break;
          }
          default:
            switch (_.type) {
              case "checkbox":
                _.checked = !!g;
                break;
              default:
                _.value = g;
                break;
            }
        }
      });
    },
    setErrors: (u) => {
      const [, y] = m;
      y({ action: "errors", payload: u });
    },
    reset: () => {
      var u;
      (u = d.current) == null || u.reset();
    },
    submit: () => {
      var u;
      return (u = d.current) == null ? void 0 : u.requestSubmit();
    }
  };
  Re(p, () => b), v(() => {
    const u = () => {
      c && c();
    }, y = d == null ? void 0 : d.current;
    return y == null || y.addEventListener("reset", u), () => {
      y == null || y.removeEventListener("reset", u);
    };
  }, []);
  const l = (u, y) => {
    const _ = b.getFormData();
    for (const g of y)
      if (!g.isValid(_.get(u) || null))
        return { valid: !1, message: g.getMessage() };
    return { valid: !0, message: null };
  }, m = Mt((u, y) => {
    const { action: _, payload: g } = y;
    switch (_) {
      case "constraints": {
        const { name: C, constraints: T } = g;
        return {
          ...u,
          constraints: {
            ...u.constraints || {},
            [C]: T
          }
        };
      }
      case "validate": {
        const { valid: C, message: T } = l(g, u.constraints[g] || []), D = u.errors || {}, k = g;
        return C ? delete D[k] : D[k] = [...D[k] || [], { message: T || "Error" }], Object.keys(D).length ? {
          ...u,
          errors: D
        } : u;
      }
      case "response":
        return {
          ...u,
          response: g
        };
      case "errors":
        return {
          ...u,
          errors: g || []
        };
      case "error": {
        const C = { ...u.errors, ...g };
        return {
          ...u,
          errors: C
        };
      }
    }
    return u;
  }, i), A = (u) => {
    u.preventDefault();
    const [y, _] = m;
    let g = {};
    for (const [T, D] of Object.entries(y.constraints)) {
      const { valid: k, message: F } = l(T, D);
      k || (g[T] = [F]);
    }
    if (Object.values(g).length) {
      _({ action: "errors", payload: g });
      return;
    }
    const C = new FormData((d == null ? void 0 : d.current) || void 0);
    if (o && o(C), a) {
      a(C);
      return;
    }
  };
  return /* @__PURE__ */ s(ot.Provider, { value: [m, p, d], children: /* @__PURE__ */ s("form", { id: e, ref: d, onSubmit: A, ...f, children: t }) });
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
  const [[f, p], d] = Me(), i = R(null), l = !!((f == null ? void 0 : f.errors[e.full_name]) || []).length, m = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  v(() => {
    p({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const A = (u) => {
    p({ action: "validate", payload: e.full_name }), r && r(u);
  };
  return e != null && e.expanded ? /* @__PURE__ */ s(j, { children: Object.values(e.choices || []).map(
    (u, y) => {
      var D;
      const _ = he(e.full_name, y), g = o ? o(u) : u.value, C = a ? a(u) : u.label || g, T = {
        id: _,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(u) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ E(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ s(
              "input",
              {
                ref: i,
                defaultValue: g,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (D = e == null ? void 0 : e.data) == null ? void 0 : D.includes(g),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: _,
                className: "form-check-input",
                ...T,
                onChange: (k) => {
                  var F, N;
                  return A({
                    value: (e != null && e.multiple ? (F = d == null ? void 0 : d.current) == null ? void 0 : F.getFormData().getAll(e == null ? void 0 : e.full_name) : (N = d == null ? void 0 : d.current) == null ? void 0 : N.getFormData().get(e == null ? void 0 : e.full_name)) || k.target.value,
                    targetValue: k.target.value,
                    checked: k.target.checked
                  });
                }
              },
              m
            ),
            /* @__PURE__ */ s(
              "label",
              {
                htmlFor: T.id,
                className: "form-check-label",
                children: C
              }
            )
          ]
        },
        y
      );
    }
  ) }) : /* @__PURE__ */ s(j, { children: /* @__PURE__ */ E(
    "select",
    {
      ref: i,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": l,
      onChange: (u) => {
        var y, _;
        return A({
          value: (e.multiple ? (y = d == null ? void 0 : d.current) == null ? void 0 : y.getFormData().getAll(e.full_name) : (_ = d == null ? void 0 : d.current) == null ? void 0 : _.getFormData().get(e.full_name)) || u.target.value
        });
      },
      className: [...(n || "").split(" ") || [], "form-control", ...l ? ["is-invalid"] : []].join(" "),
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
    m
  ) });
}, it = ({ name: e, className: t }) => {
  const [[n]] = Me(), r = (n == null ? void 0 : n.errors[e]) || [];
  return r.length ? /* @__PURE__ */ s("div", { className: t, children: r.map((o, a) => /* @__PURE__ */ s("span", { children: o.message }, a)) }) : /* @__PURE__ */ s(j, {});
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
  return /* @__PURE__ */ E(
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
            htmlFor: e.id || he(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: r
          }
        ),
        /* @__PURE__ */ s(it, { name: e.full_name, className: "invalid-feedback" }),
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
  const [[o, a]] = Me(), c = R(null), f = (o == null ? void 0 : o.errors[e.full_name]) || [];
  v(() => {
    a({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const p = (l) => {
    a({ action: "validate", payload: e.full_name }), r && r(l);
  }, i = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", b = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ s(j, { children: /* @__PURE__ */ s(
    "input",
    {
      ref: c,
      id: e.id || he(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !f.length,
      onKeyUp: (l) => p({ value: l.target.value }),
      onChange: (l) => p({ value: l.target.value }),
      className: [i, ...f.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    b
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
})() }), Ye = ({ children: e }) => /* @__PURE__ */ s(j, { children: e }), J = W(({ namespace: e, view: t, prefix: n, children: r, props: o, data: a }) => {
  t = t.split(/[._]/).map((m) => Oe(m)).join("");
  const c = /* @__PURE__ */ Object.assign({}), f = ["crud", e, n, t].filter((m) => m).join("/") + ".tsx", [p, d] = Object.entries(c).filter(([m, A]) => m.endsWith(f)).shift() || [], [i, b] = V(1), l = R(Ye);
  return v(() => {
    if (d === void 0)
      return () => {
      };
    d().then((m) => {
      l.current = m.default, b(i + 1);
    });
  }, []), /* @__PURE__ */ s(l.current, { ...o, view: t, controller: e, viewName: t, data: a, parent: r, children: (!d || l.current !== Ye) && r });
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
)), ct = ({ icon: e, rightIcon: t, rightIconProps: n, children: r, preload: o = !1 }) => /* @__PURE__ */ s(j, { children: r && r }), ge = ce(({
  children: e,
  preload: t,
  ...n
}, r) => /* @__PURE__ */ s("button", { disabled: t, ...n, ref: r, children: /* @__PURE__ */ s(ct, { preload: t, ...n, children: e }) })), en = P.createContext(null);
function tn() {
  return P.useContext(en);
}
const lt = ({ entityAction: e, initParameters: t, initQueryParameters: n }) => {
  const { getAction: r } = ve(), { generateRoute: o } = Q();
  e = r(e.entity, e.name, e.namespace) || e;
  const [a, c] = V(), [f, p] = V(t || null);
  R(null);
  const [d, i] = V(n instanceof URLSearchParams ? n : Ae(n || {}));
  btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(f || {}).map(([m, A]) => m + "-" + A), (d instanceof URLSearchParams ? d : Ae(d)).toString()].filter((m) => m).join("."))), R({});
  const [b, l] = V(1);
  return v(() => {
    e && ie().get({
      url: o(e.route, f ?? null),
      query: d
    }).then(({ status: m, data: A }) => {
      switch (m) {
        case 201:
        case 200: {
          c(A);
          break;
        }
        default: {
          const u = A;
          throw new le(u.status, u.detail, u.trace);
        }
      }
    });
  }, [JSON.stringify(f), d.toString(), b]), {
    results: a,
    setParameters: p,
    setQueryParameters: (m) => {
      i(new URLSearchParams(m));
    },
    refresh: () => {
      l(b + 1);
    }
  };
}, Pe = W(({ children: e }) => /* @__PURE__ */ s(j, { children: e })), nn = ce(({ name: e, data: t, action: n, parameters: r, onSuccess: o, onError: a, onLoad: c, children: f, embedded: p = !1 }, d) => {
  var k, F, N, L, I;
  const [i, b] = V(!1), { navigate: l, generateLink: m, generateRoute: A } = Q(), u = A(n.route, r || {}), y = R(null), _ = tn(), [g, C] = V();
  Re(d, () => ({
    getData: () => g,
    getFormRef: () => y.current
  }));
  const T = (x) => {
    var h, S;
    let M = {
      ...(h = x.errors) != null && h.length ? { [x.full_name]: x.errors } : {}
    };
    for (let [, O] of Object.entries((x == null ? void 0 : x.children) || []))
      O.children && Object.values(O.children).length ? M = { ...M, ...T(O) } : (S = O.errors) != null && S.length && (M[O.full_name] = O.errors);
    return M;
  }, D = (x) => {
    b(!0), ie().post({ url: u, body: x, bodyType: kt.FormData }).then(({ status: M, data: h }) => {
      var O;
      if (![200, 201, 400].includes(M))
        return Promise.reject(h);
      C(h);
      const S = T(h.form.modify.view);
      if (Object.entries(S).length) {
        (O = y.current) == null || O.setErrors(S);
        return;
      }
      o && o(h), h.redirect && !p && l(m(h.redirect.route, { ...r || {}, ...h.redirect.parameters }));
    }).catch((M) => {
      a && a(M);
    }).finally(() => {
      b(!1);
    });
  };
  return v(() => {
    c && c();
  }, []), t = (_ == null ? void 0 : _.results) ?? t, v(() => {
    C(t);
  }, [JSON.stringify(t)]), g && /* @__PURE__ */ E(j, { children: [
    Object.keys((g == null ? void 0 : g.messages) || {}).map((x, M) => /* @__PURE__ */ s("div", { className: ["alert", "alert-" + x].join(" "), children: ((g == null ? void 0 : g.messages[x]) || ["Item was saved successful."]).join(" ") }, "alert-" + x)),
    /* @__PURE__ */ E(at, { id: (N = (F = (k = g == null ? void 0 : g.form) == null ? void 0 : k.modify) == null ? void 0 : F.view) == null ? void 0 : N.id, ref: y, action: u, method: "POST", onSubmit: D, children: [
      ((I = (L = g == null ? void 0 : g.form) == null ? void 0 : L.modify) == null ? void 0 : I.view) !== void 0 && /* @__PURE__ */ E(j, { children: [
        /* @__PURE__ */ s(
          Fe,
          {
            name: e,
            namespace: n.namespace,
            view: g.form.modify.view
          },
          g.form.modify.view.id
        ),
        /* @__PURE__ */ s(it, { name: g.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ s(U, { name: "actions", content: f, data: { formRef: y }, children: /* @__PURE__ */ s(ge, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ s(Pe, { children: "Save" }) }) })
    ] })
  ] });
}), ut = ce(({
  children: e,
  open: t = !1,
  animation: n = "fade",
  backdrop: r = !0,
  keyboard: o = !0,
  size: a,
  onClose: c,
  className: f
}, p) => {
  const [d, i] = V(t);
  Re(p, () => ({
    toggle: () => i(!d),
    open: () => i(!0),
    close: () => u(),
    isOpen: () => d
  })), v(() => {
    i(t);
  }, [t]);
  const b = (y) => {
    if (o)
      switch (y.key) {
        case "Escape": {
          u();
          break;
        }
      }
  };
  v(() => {
    var g;
    if (!d)
      return;
    const y = () => {
      var C;
      (C = l.current) == null || C.addEventListener("animationend", _);
    }, _ = () => {
      var C, T, D;
      (C = l.current) == null || C.classList.remove(n), (T = l.current) == null || T.removeEventListener("animationstart", y), (D = l.current) == null || D.removeEventListener("animationend", _);
    };
    return setTimeout(() => {
      var C, T;
      (C = l.current) == null || C.classList.add("d-block", "show"), (T = m == null ? void 0 : m.current) == null || T.classList.add("show");
    }, n ? 100 : 0), document.addEventListener("keydown", b), (g = l.current) == null || g.addEventListener("animationstart", y), () => {
      var C, T;
      document.removeEventListener("keydown", b), (C = l.current) == null || C.removeEventListener("animationstart", y), (T = l.current) == null || T.removeEventListener("animationend", _);
    };
  }, [d]);
  const l = R(null), m = R(null), A = () => {
    i(!1), c && c();
  }, u = () => new Promise((y, _) => {
    var C, T;
    if (!d)
      return y();
    const g = () => {
      var D;
      (D = l == null ? void 0 : l.current) == null || D.classList.remove("show", "d-block"), y(), A();
    };
    if (n) {
      const D = setTimeout(() => {
        g();
      }, n ? 50 : 0);
      (C = l.current) == null || C.addEventListener("animationstart", () => {
        var k, F;
        console.log("timeout"), clearTimeout(D), (k = l.current) == null || k.removeEventListener("animationend", g), (F = l.current) == null || F.addEventListener("animationend", g);
      }), (T = l.current) == null || T.classList.add(n, "close");
    } else
      g();
  });
  return d && Bt(/* @__PURE__ */ E(j, { children: [
    /* @__PURE__ */ s(
      "div",
      {
        ref: l,
        className: ["modal", a && "modal-" + a, n && n, f].filter((y) => y).join(" "),
        children: /* @__PURE__ */ s("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ E("div", { className: "modal-content", children: [
          /* @__PURE__ */ s(U, { name: "header", content: e, data: null, children: /* @__PURE__ */ E("div", { className: "modal-header", children: [
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
        ref: m,
        className: ["modal-backdrop", "fade", ...n && ["show"]].filter((y) => y).join(" ")
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
  const f = R(null);
  return v(() => {
    if (!f.current)
      return;
    const p = Kt.loadAnimation({
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
}, dt = P.createContext(void 0);
var ae = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(ae || {});
function ft() {
  const e = P.useContext(dt);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function sn(e) {
  var i;
  const [t, n] = V(), r = R(0), o = R(void 0), [a, c] = V(null);
  v(() => {
    r.current += 1;
  }, [t]);
  const f = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), p = (b) => {
    var A, u;
    let l = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...b || {}
    };
    const m = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(m, l.icon)) {
      const y = m[l.icon], _ = Object.keys(f).filter((g) => g.endsWith(y)).pop();
      _ && f[_]().then((g) => {
        c(g.default);
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
    }), (A = o.current) != null && A.isOpen() ? (u = o.current) == null || u.close().finally(() => {
      n(l);
    }) : n(l);
  }, d = (b) => {
    var m;
    const l = {
      [b]: !0,
      isConfirmed: b === "confirm",
      isCancelled: b === "cancel",
      isDenied: b === "deny"
    };
    t != null && t.onResult && t.onResult(l), (m = o.current) == null || m.close().then(() => {
      c(null), n(void 0);
    });
  };
  return /* @__PURE__ */ E(dt.Provider, { value: { open: p }, children: [
    e.children,
    t && /* @__PURE__ */ E(ut, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: o, children: [
      /* @__PURE__ */ s(K, { name: "header" }),
      /* @__PURE__ */ s(K, { name: "footer" }),
      /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ E("div", { className: "d-flex flex-column align-items-center", children: [
        a !== null && /* @__PURE__ */ s(rn, { className: "modal-alert-icon", animationData: a }),
        /* @__PURE__ */ s("h3", { className: "modal-alert-title", children: t.title }),
        !!((i = t.text) != null && i.length) && /* @__PURE__ */ s("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ s("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((b) => {
          var l, m, A;
          return /* @__PURE__ */ s(
            ge,
            {
              className: "btn btn-lg mx-2 " + (((l = t.actions) == null ? void 0 : l[b].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => d(b),
              children: ((A = ((m = t.actions) == null ? void 0 : m[b]) ?? null) == null ? void 0 : A.label) || b
            },
            b
          );
        }) })
      ] }) })
    ] })
  ] });
}
const on = ({ action: e, children: t, routeParams: n, results: r }) => {
  const { getAction: o } = ve(), { generateLink: a } = Q(), c = o(e.entity, "list", e.namespace);
  return /* @__PURE__ */ E("section", { className: "edit", children: [
    /* @__PURE__ */ E("header", { children: [
      /* @__PURE__ */ E("h2", { className: "title", children: [
        c && /* @__PURE__ */ s(et, { to: a(c.route, n), children: "←" }),
        /* @__PURE__ */ s(U, { name: "title", content: t, data: r })
      ] }),
      /* @__PURE__ */ s("nav", { children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: r }) })
    ] }),
    /* @__PURE__ */ s("main", { children: /* @__PURE__ */ s(U, { name: "content", content: t, data: r }) })
  ] });
}, We = ({ action: e, children: t, onSuccess: n, modal: r, props: o }) => {
  const a = { ...e.parameters || {}, ...Vt() }, c = R(void 0), f = R(void 0), { results: p, setParameters: d } = lt({
    entityAction: e.action,
    initParameters: a
  }), { open: i } = ft();
  return v(() => {
    d(a);
  }, [JSON.stringify(a)]), v(() => {
    var l;
    (l = f.current) == null || l.open();
  }, [JSON.stringify(p)]), /* @__PURE__ */ E(r ? ut : on, { ref: f, ...o, action: e, routeParams: a, children: [
    /* @__PURE__ */ s(K, { name: "title", children: /* @__PURE__ */ s(U, { name: "title", content: t, data: p, children: (p == null ? void 0 : p.title) || "Title" }) }),
    /* @__PURE__ */ s(K, { name: "navigation", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "navigation", content: t, data: p }) }) }),
    /* @__PURE__ */ s(K, { name: "content", children: /* @__PURE__ */ s(J, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ s(U, { name: "content", content: t, data: p, children: /* @__PURE__ */ s(
      nn,
      {
        ref: c,
        data: p,
        action: e.action,
        onSuccess: (l) => {
          var A, u;
          (A = f.current) == null || A.close();
          const m = new CustomEvent("success", { detail: l });
          n && n(m, l), !m.defaultPrevented && i({
            title: "Success",
            text: Object.values(((u = l.messages) == null ? void 0 : u.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: ae.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (l) => {
          console.log(l), i({
            title: l.status + " " + l.detail,
            text: l.detail,
            icon: ae.denied,
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
          var l, m;
          return (m = (l = c.current) == null ? void 0 : l.getFormRef()) == null ? void 0 : m.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, an = () => /* @__PURE__ */ s("div", { children: "No View Found" }), z = ({ to: e, children: t, ...n }) => (rt(), /* @__PURE__ */ s(et, { to: e, ...n, children: /* @__PURE__ */ s(ct, { ...n, children: t && t }) })), Y = /* @__PURE__ */ new Map(), be = {
  set(e, t, n) {
    Y.has(e) || Y.set(e, /* @__PURE__ */ new Map());
    const r = Y.get(e);
    if (!r.has(t) && r.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(r.keys())[0]}.`);
      return;
    }
    r.set(t, n);
  },
  get(e, t) {
    return Y.has(e) && Y.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!Y.has(e))
      return;
    const n = Y.get(e);
    n.delete(t), n.size === 0 && Y.delete(e);
  }
}, cn = 1e3, Te = "transitionend", mt = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, n) => `#${CSS.escape(n)}`)), e), ln = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), un = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: n } = window.getComputedStyle(e);
  const r = Number.parseFloat(t), o = Number.parseFloat(n);
  return !r && !o ? 0 : (t = t.split(",")[0], n = n.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(n)) * cn);
}, dn = (e) => {
  e.dispatchEvent(new Event(Te));
}, G = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), Se = (e) => G(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(mt(e)) : null, pt = (e) => {
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
}, De = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", qe = () => {
}, ht = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, ye = [], fn = (e) => {
  document.readyState === "loading" ? (ye.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of ye)
      t();
  }), ye.push(e)) : e();
}, ne = () => document.documentElement.dir === "rtl", mn = (e) => {
  fn(() => {
    const t = ht();
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
  const c = ({ target: f }) => {
    f === t && (a = !0, t.removeEventListener(Te, c), Le(e));
  };
  t.addEventListener(Te, c), setTimeout(() => {
    a || dn(t);
  }, o);
}, hn = (e, t, n, r) => {
  const o = e.length;
  let a = e.indexOf(t);
  return a === -1 ? !n && r ? e[o - 1] : e[0] : (a += n ? 1 : -1, r && (a = (a + o) % o), e[Math.max(0, Math.min(a, o - 1))]);
}, gn = /[^.]*(?=\..*)\.|.*/, bn = /\..*/, yn = /::\d+$/, Ee = {};
let ze = 1;
const gt = {
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
function bt(e, t) {
  return t && `${t}::${ze++}` || e.uidEvent || ze++;
}
function yt(e) {
  const t = bt(e);
  return e.uidEvent = t, Ee[t] = Ee[t] || {}, Ee[t];
}
function _n(e, t) {
  return function n(r) {
    return Ie(r, { delegateTarget: e }), n.oneOff && $.off(e, r.type, t), t.apply(e, [r]);
  };
}
function Nn(e, t, n) {
  return function r(o) {
    const a = e.querySelectorAll(t);
    for (let { target: c } = o; c && c !== this; c = c.parentNode)
      for (const f of a)
        if (f === c)
          return Ie(o, { delegateTarget: c }), r.oneOff && $.off(e, o.type, t, n), n.apply(c, [o]);
  };
}
function Et(e, t, n = null) {
  return Object.values(e).find((r) => r.callable === t && r.delegationSelector === n);
}
function _t(e, t, n) {
  const r = typeof t == "string", o = r ? n : t || n;
  let a = Nt(e);
  return En.has(a) || (a = e), [r, o, a];
}
function Ge(e, t, n, r, o) {
  if (typeof t != "string" || !e)
    return;
  let [a, c, f] = _t(t, n, r);
  t in gt && (c = ((A) => function(u) {
    if (!u.relatedTarget || u.relatedTarget !== u.delegateTarget && !u.delegateTarget.contains(u.relatedTarget))
      return A.call(this, u);
  })(c));
  const p = yt(e), d = p[f] || (p[f] = {}), i = Et(d, c, a ? n : null);
  if (i) {
    i.oneOff = i.oneOff && o;
    return;
  }
  const b = bt(c, t.replace(gn, "")), l = a ? Nn(e, n, c) : _n(e, c);
  l.delegationSelector = a ? n : null, l.callable = c, l.oneOff = o, l.uidEvent = b, d[b] = l, e.addEventListener(f, l, a);
}
function ke(e, t, n, r, o) {
  const a = Et(t[n], r, o);
  a && (e.removeEventListener(n, a, !!o), delete t[n][a.uidEvent]);
}
function Cn(e, t, n, r) {
  const o = t[n] || {};
  for (const [a, c] of Object.entries(o))
    a.includes(r) && ke(e, t, n, c.callable, c.delegationSelector);
}
function Nt(e) {
  return e = e.replace(bn, ""), gt[e] || e;
}
const $ = {
  on(e, t, n, r) {
    Ge(e, t, n, r, !1);
  },
  one(e, t, n, r) {
    Ge(e, t, n, r, !0);
  },
  off(e, t, n, r) {
    if (typeof t != "string" || !e)
      return;
    const [o, a, c] = _t(t, n, r), f = c !== t, p = yt(e), d = p[c] || {}, i = t.startsWith(".");
    if (typeof a < "u") {
      if (!Object.keys(d).length)
        return;
      ke(e, p, c, a, o ? n : null);
      return;
    }
    if (i)
      for (const b of Object.keys(p))
        Cn(e, p, b, t.slice(1));
    for (const [b, l] of Object.entries(d)) {
      const m = b.replace(yn, "");
      (!f || t.includes(m)) && ke(e, p, c, l.callable, l.delegationSelector);
    }
  },
  trigger(e, t, n) {
    if (typeof t != "string" || !e)
      return null;
    const r = ht(), o = Nt(t), a = t !== o;
    let c = null, f = !0, p = !0, d = !1;
    a && r && (c = r.Event(t, n), r(e).trigger(c), f = !c.isPropagationStopped(), p = !c.isImmediatePropagationStopped(), d = c.isDefaultPrevented());
    const i = Ie(new Event(t, { bubbles: f, cancelable: !0 }), n);
    return d && i.preventDefault(), p && e.dispatchEvent(i), i.defaultPrevented && c && c.preventDefault(), i;
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
function Je(e) {
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
function _e(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const fe = {
  setDataAttribute(e, t, n) {
    e.setAttribute(`data-bs-${_e(t)}`, n);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${_e(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, n = Object.keys(e.dataset).filter((r) => r.startsWith("bs") && !r.startsWith("bsConfig"));
    for (const r of n) {
      let o = r.replace(/^bs/, "");
      o = o.charAt(0).toLowerCase() + o.slice(1, o.length), t[o] = Je(e.dataset[r]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return Je(e.getAttribute(`data-bs-${_e(t)}`));
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
    const r = G(n) ? fe.getDataAttribute(n, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof r == "object" ? r : {},
      ...G(n) ? fe.getDataAttributes(n) : {},
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
    super(), t = Se(t), t && (this._element = t, this._config = this._getConfig(n), be.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    be.remove(this._element, this.constructor.DATA_KEY), $.off(this._element, this.constructor.EVENT_KEY);
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
    return be.get(Se(t), this.DATA_KEY);
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
const Ne = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let n = e.getAttribute("href");
    if (!n || !n.includes("#") && !n.startsWith("."))
      return null;
    n.includes("#") && !n.startsWith("#") && (n = `#${n.split("#")[1]}`), t = n && n !== "#" ? n.trim() : null;
  }
  return t ? t.split(",").map((n) => mt(n)).join(",") : null;
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
    return this.find(t, e).filter((n) => !De(n) && pt(n));
  },
  getSelectorFromElement(e) {
    const t = Ne(e);
    return t && B.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = Ne(e);
    return t ? B.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = Ne(e);
    return t ? B.find(t) : [];
  }
}, Qe = "dropdown", Tn = "bs.dropdown", Z = `.${Tn}`, $e = ".data-api", Sn = "Escape", Ze = "Tab", Dn = "ArrowUp", Xe = "ArrowDown", Ln = 2, kn = `hide${Z}`, xn = `hidden${Z}`, jn = `show${Z}`, Rn = `shown${Z}`, Ct = `click${Z}${$e}`, At = `keydown${Z}${$e}`, vn = `keyup${Z}${$e}`, te = "show", Mn = "dropup", Fn = "dropend", In = "dropstart", $n = "dropup-center", Vn = "dropdown-center", q = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', Un = `${q}.${te}`, ue = ".dropdown-menu", Bn = ".navbar", Kn = ".navbar-nav", Hn = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", wn = ne() ? "top-end" : "top-start", Yn = ne() ? "top-start" : "top-end", Wn = ne() ? "bottom-end" : "bottom-start", qn = ne() ? "bottom-start" : "bottom-end", zn = ne() ? "left-start" : "right-start", Gn = ne() ? "right-start" : "left-start", Jn = "top", Qn = "bottom", Zn = {
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
let X = class de extends Pn {
  constructor(t, n) {
    super(t, n), this._popper = null, this._parent = this._element.parentNode, this._menu = B.next(this._element, ue)[0] || B.prev(this._element, ue)[0] || B.findOne(ue, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Zn;
  }
  static get DefaultType() {
    return Xn;
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
    if (!$.trigger(this._element, jn, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(Kn))
        for (const r of [].concat(...document.body.children))
          $.on(r, "mouseover", qe);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(te), this._element.classList.add(te), $.trigger(this._element, Rn, t);
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
    if (!$.trigger(this._element, kn, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const r of [].concat(...document.body.children))
          $.off(r, "mouseover", qe);
      this._popper && this._popper.destroy(), this._menu.classList.remove(te), this._element.classList.remove(te), this._element.setAttribute("aria-expanded", "false"), fe.removeDataAttribute(this._menu, "popper"), $.trigger(this._element, xn, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !G(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${Qe.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof He > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : G(this._config.reference) ? t = Se(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const n = this._getPopperConfig();
    this._popper = He.createPopper(t, this._menu, n);
  }
  _isShown() {
    return this._menu.classList.contains(te);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(Fn))
      return zn;
    if (t.classList.contains(In))
      return Gn;
    if (t.classList.contains($n))
      return Jn;
    if (t.classList.contains(Vn))
      return Qn;
    const n = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(Mn) ? n ? Yn : wn : n ? qn : Wn;
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
    return (this._inNavbar || this._config.display === "static") && (fe.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...Le(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({ key: t, target: n }) {
    const r = B.find(Hn, this._menu).filter((o) => pt(o));
    r.length && hn(r, n, t === Xe, !r.includes(n)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const n = de.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof n[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        n[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === Ln || t.type === "keyup" && t.key !== Ze)
      return;
    const n = B.find(Un);
    for (const r of n) {
      const o = de.getInstance(r);
      if (!o || o._config.autoClose === !1)
        continue;
      const a = t.composedPath(), c = a.includes(o._menu);
      if (a.includes(o._element) || o._config.autoClose === "inside" && !c || o._config.autoClose === "outside" && c || o._menu.contains(t.target) && (t.type === "keyup" && t.key === Ze || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const f = { relatedTarget: o._element };
      t.type === "click" && (f.clickEvent = t), o._completeHide(f);
    }
  }
  static dataApiKeydownHandler(t) {
    const n = /input|textarea/i.test(t.target.tagName), r = t.key === Sn, o = [Dn, Xe].includes(t.key);
    if (!o && !r || n && !r)
      return;
    t.preventDefault();
    const a = this.matches(q) ? this : B.prev(this, q)[0] || B.next(this, q)[0] || B.findOne(q, t.delegateTarget.parentNode), c = de.getOrCreateInstance(a);
    if (o) {
      t.stopPropagation(), c.show(), c._selectMenuItem(t);
      return;
    }
    c._isShown() && (t.stopPropagation(), c.hide(), a.focus());
  }
};
$.on(document, At, q, X.dataApiKeydownHandler);
$.on(document, At, ue, X.dataApiKeydownHandler);
$.on(document, Ct, X.clearMenus);
$.on(document, vn, X.clearMenus);
$.on(document, Ct, q, function(e) {
  e.preventDefault(), X.getOrCreateInstance(this).toggle();
});
mn(X);
const me = ({ children: e, disabled: t, className: n }) => /* @__PURE__ */ s(j, { children: e }), oe = ({ children: e, ...t }) => /* @__PURE__ */ s("div", { className: "dropdown-menu", children: e }), Ot = ({ items: e, className: t, children: n, icon: r }) => {
  const o = R(null);
  v(() => {
    const i = new X(o.current);
    return () => {
      i.dispose();
    };
  }, []);
  const a = P.Children.toArray(n).find((i) => P.isValidElement(i) && i.type === oe), c = P.Children.toArray(n).filter((i) => P.isValidElement(i) && i.type === z), f = P.Children.toArray(n).find((i) => P.isValidElement(i) && i.type === me), p = P.Children.toArray(n).filter((i) => !P.isValidElement(i) || i.type !== z && i.type !== oe && i.type !== me), d = P.isValidElement(f) ? f.props : {};
  return /* @__PURE__ */ E("div", { className: [...(t || "").split(" "), "dropdown"].filter((i, b, l) => l.indexOf(i) === b).join(" "), children: [
    /* @__PURE__ */ s(ge, { ref: o, "data-bs-toggle": "dropdown", ...d, className: [...(d.className || "").split(" "), "btn", "dropdown-toggle"].filter((i, b, l) => l.indexOf(i) === b).join(" "), children: d.children ? d.children : p }),
    a || /* @__PURE__ */ s(oe, { children: c })
  ] });
}, er = ce(({ data: e, columns: t, options: n, onClick: r, onBatchClick: o, routeParams: a, namespace: c }, f) => {
  var k, F, N, L, I, x, M;
  t = (t || ((k = e == null ? void 0 : e.entity) == null ? void 0 : k.columns) || []).filter((h) => h.group !== !1);
  const [, p] = V(), { generateLink: d } = Q(), i = (F = e == null ? void 0 : e.entity) == null ? void 0 : F.primaryColumn, b = Object.values((e == null ? void 0 : e.action) || []), l = b.filter((h) => h.object), m = t.length + (b.length ? 1 : 0), A = ((e == null ? void 0 : e.entity.data.items) || []).map((h) => h[(i == null ? void 0 : i.field) || ""] || 0), u = R([]), y = !!A.length && A.reduce((h, S) => h && u.current.includes(S), !0), _ = (I = (L = (N = e == null ? void 0 : e.form) == null ? void 0 : N.batch.view.children) == null ? void 0 : L.method) == null ? void 0 : I.choices, g = !!(_ != null && _.length) && i, C = (h, S = !1) => {
    S ? u.current.push(h) : u.current = u.current.filter((O) => O !== h), p({});
  }, T = (h = !1) => {
    u.current = (h ? u.current.concat(A) : u.current.filter((S) => !A.includes(S))).filter((S, O, H) => H.indexOf(S) === O), p({});
  }, D = (h) => {
    var H, w;
    if (!o)
      return;
    const S = e == null ? void 0 : e.form.batch.view;
    if (!g || !((H = u.current) != null && H.length))
      return;
    const O = new FormData();
    u.current.forEach((re) => {
      var Ue;
      O.append(`${(Ue = S == null ? void 0 : S.children) == null ? void 0 : Ue.ids.full_name}[]`, re.toString());
    }), O.append(((w = S == null ? void 0 : S.children) == null ? void 0 : w.method.full_name) || "method", h), o(h, u.current, O);
  };
  return /* @__PURE__ */ E(j, { children: [
    g && /* @__PURE__ */ E("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ s("label", { className: "btn btn-light", children: /* @__PURE__ */ s(
        "input",
        {
          checked: y,
          onChange: (h) => T(h.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ E(Ot, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ s(me, { disabled: !u.current.length, className: "btn-light" }),
        /* @__PURE__ */ s(oe, { children: (M = (x = e.form.batch.view.children) == null ? void 0 : x.method.choices) == null ? void 0 : M.map((h) => {
          const S = h.value instanceof Function ? h.value() : h.value;
          return /* @__PURE__ */ s(z, { to: "#", onClick: () => D(S), className: "dropdown-item", children: h.label instanceof Function ? h.label() : h.label }, S);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ E("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ s("thead", { children: /* @__PURE__ */ E("tr", { children: [
        t.map((h, S) => /* @__PURE__ */ E("th", { children: [
          /* @__PURE__ */ s(J, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: h, prefix: "list", view: h.field + ".label", children: h.label }),
          h.sortable && (e == null ? void 0 : e.sort[h.field]) !== void 0 && /* @__PURE__ */ s(
            z,
            {
              onClick: (O) => r && r({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: c,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [h.field]: e != null && e.sort[h.field] ? (e == null ? void 0 : e.sort[h.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, O),
              className: "btn",
              to: "#",
              children: e.sort[h.field] ? e.sort[h.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, S)),
        i && l.length > 0 && /* @__PURE__ */ s("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ s("tbody", { children: e && (e.entity.data.items.length ? e.entity.data.items.map(
        (h, S) => /* @__PURE__ */ E("tr", { children: [
          t == null ? void 0 : t.map(
            (O, H) => {
              var w;
              return /* @__PURE__ */ E("td", { children: [
                H === 0 && g && /* @__PURE__ */ s(
                  "input",
                  {
                    checked: u.current.includes(h[i == null ? void 0 : i.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: h[i == null ? void 0 : i.field],
                    onChange: (re) => C(h[i == null ? void 0 : i.field], re.target.checked)
                  }
                ),
                /* @__PURE__ */ s(J, { namespace: c || "unknown", data: h, prefix: "list", view: O.field, children: h[O.field] !== void 0 && (h[O.field] instanceof Object ? h[O.field] instanceof Array ? h[O.field].join(", ") : JSON.stringify(h[O.field]) : (w = h[O.field]) == null ? void 0 : w.toString()) })
              ] }, H);
            }
          ),
          i && l.length > 0 && /* @__PURE__ */ s("td", { className: "text-end text-nowrap", children: l.map((O, H) => {
            var w;
            return /* @__PURE__ */ s(
              z,
              {
                onClick: (re) => r && r({
                  action: O,
                  parameters: {
                    ...a || {},
                    id: h[i == null ? void 0 : i.field]
                  }
                }, re),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((w = O.route) == null ? void 0 : w.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: d(O.route, {
                  ...a || {},
                  id: h[i.field]
                }),
                children: O.title
              },
              H
            );
          }) })
        ] }, S)
      ) : /* @__PURE__ */ s("tr", { children: /* @__PURE__ */ s("td", { colSpan: m, children: "Not results found." }) })) })
    ] })
  ] });
}), se = ({ route: e, page: t, active: n = !1, title: r, children: o }) => {
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
  return /* @__PURE__ */ E("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ E("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      a && /* @__PURE__ */ E(j, { children: [
        " - Page ",
        r,
        " of ",
        e.totalPages
      ] })
    ] }),
    a && /* @__PURE__ */ s("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ E("ul", { className: "pagination pagination-sm", children: [
      r > 1 && /* @__PURE__ */ s(se, { page: r - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ E(j, { children: [
        /* @__PURE__ */ s(se, { page: 1, active: r === 1, children: 1 }, 1),
        /* @__PURE__ */ s("div", { className: "page-item", children: /* @__PURE__ */ s("a", { className: "page-link", children: "..." }) })
      ] }),
      (o || []).map((c, f) => /* @__PURE__ */ s(se, { page: c, active: c === r }, f)),
      [...e.links].reverse()[0] !== n && /* @__PURE__ */ E(j, { children: [
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
}, xe = (e, t = !0) => (Object.entries(e).map(([n, r]) => (t && r instanceof Object && (r = xe(r)), [n, r])).filter(([, n]) => !(n instanceof Object ? Object.keys(n).length : n)).forEach(([n]) => {
  delete e[n];
}), e), Pt = ({ children: e }) => /* @__PURE__ */ s(rr, { children: /* @__PURE__ */ s(sn, { children: /* @__PURE__ */ s(zt, { children: e }) }) }), Tt = P.createContext({});
function nr() {
  const { setModal: e } = P.useContext(Tt);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function rr(e) {
  const [t, n] = V(), r = R(0);
  return v(() => {
    r.current += 1;
  }, [t]), /* @__PURE__ */ E(Tt.Provider, { value: { setModal: n }, children: [
    e.children,
    t && /* @__PURE__ */ s(Pt, { children: /* @__PURE__ */ s(
      St,
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
  var T, D, k, F;
  const n = tt(), { generateLink: r, generateRoute: o } = Q(), [a, c] = Ut(), f = R(void 0), p = R(xt(a)), d = R(null), { openModal: i } = nr(), { open: b } = ft(), l = e.action.entity;
  if (!l)
    throw new Error("Invalid Entity");
  const { results: m, refresh: A, setQueryParameters: u } = lt({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: p.current }), y = Object.values((m == null ? void 0 : m.action) ?? []).filter((N) => !N.object && N.name !== e.action.name), _ = (N) => {
    N == null || N.forEach((x) => {
      var M, h;
      (h = (M = p.current) == null ? void 0 : M.filter) == null || delete h[x];
    });
    const L = {
      ...p.current && p.current,
      ...f.current && { sort: f.current }
    }, I = Ae(xe(L));
    t ? u(I) : c(I);
  }, g = (N, L, I) => {
    console.log("method", L, I), b({
      title: "Are you sure?",
      icon: ae.confirm,
      onResult: (x) => {
        x.isConfirmed && ie().post({
          url: o(e.action.route, e.parameters),
          body: I
        }).catch((M) => {
          console.log("error", M);
        }).finally(() => {
          console.log("done"), A();
        });
      }
    });
  }, C = (N, L) => {
    switch (N.parameters !== void 0 && (N.parameters = xe(N.parameters), Object.keys(N.parameters).length || (N.parameters = void 0)), N.action.name) {
      case "filter": {
        L == null || L.preventDefault(), p.current = N.parameters;
        break;
      }
      case "sort": {
        L == null || L.preventDefault(), f.current = N.parameters;
        break;
      }
      case "delete": {
        L == null || L.preventDefault(), b({
          title: "Are you sure?",
          icon: ae.confirm,
          onResult: (I) => {
            I.isConfirmed && ie().fetch({
              url: o(N.action.route, { ...e.parameters, ...N.parameters }),
              method: Rt.DELETE
            }).catch((x) => {
              console.log("error", x);
            }).finally(() => {
              A();
            });
          }
        });
        return;
      }
      default: {
        t && (L == null || L.preventDefault(), i({
          action: N,
          props: {
            onClose: () => {
              A();
            }
          }
        }));
        return;
      }
    }
    _();
  };
  return v(() => {
    u(a);
  }, [n]), /* @__PURE__ */ s(j, { children: /* @__PURE__ */ E("section", { className: "list", children: [
    /* @__PURE__ */ E("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ s("h2", { children: m == null ? void 0 : m.title }),
      /* @__PURE__ */ E("div", { className: "d-flex align-items-center", children: [
        !!y.length && /* @__PURE__ */ s("div", { className: "btn-group btn-group-sm me-2", children: y.map((N, L) => /* @__PURE__ */ s(
          z,
          {
            to: r(N.route, e.parameters),
            onClick: (I) => C({
              action: N,
              parameters: e.parameters
            }, I),
            className: "btn btn-outline-secondary",
            children: N.title || N.name
          },
          L
        )) }),
        ((T = m == null ? void 0 : m.form) == null ? void 0 : T.filter) && /* @__PURE__ */ E("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ E(Ot, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ s(me, { className: "btn-outline-dark", children: /* @__PURE__ */ s(Pe, { children: "Filter" }) }),
            /* @__PURE__ */ s(oe, { children: /* @__PURE__ */ s("div", { className: "filter", children: /* @__PURE__ */ E(
              at,
              {
                id: "filter_" + he(l),
                ref: d,
                onSubmit: (N) => C({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: l
                  },
                  parameters: jt(N)
                }),
                onReset: () => C({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: l
                  }
                }),
                children: [
                  ((D = m == null ? void 0 : m.form) == null ? void 0 : D.filter) && /* @__PURE__ */ s(Fe, { view: m.form.filter.view }),
                  /* @__PURE__ */ s("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ s(Pe, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((k = p.current) == null ? void 0 : k.filter) || []).length && /* @__PURE__ */ s(ge, { onClick: () => {
            var N;
            (N = d.current) == null || N.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((F = m == null ? void 0 : m.form) == null ? void 0 : F.filter) && /* @__PURE__ */ s(or, { formView: m.form.filter.view, onClick: (N) => _([N]) }),
    /* @__PURE__ */ E(J, { namespace: e.action.namespace, prefix: "modify", view: "content", data: m, children: [
      /* @__PURE__ */ s("div", { className: "table-responsive", children: /* @__PURE__ */ s(
        er,
        {
          data: m,
          onClick: C,
          onBatchClick: g,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      m && /* @__PURE__ */ s(tr, { meta: m.entity.data.meta })
    ] }, "modify")
  ] }) });
}), or = ({ formView: e, onClick: t }) => {
  const n = (r) => r.choices !== void 0 ? r.choices ? Object.values(r.data instanceof Object ? r.data : [r.data]).map((o) => {
    var a, c;
    return ((c = (a = r.choices) == null ? void 0 : a[o]) == null ? void 0 : c.label) ?? o;
  }).join(", ") : r.data : r.checked !== void 0 ? r.checked ? "Yes" : "No" : r.data;
  return /* @__PURE__ */ s("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((r) => r.data !== null).map((r, o) => /* @__PURE__ */ E("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ s("small", { className: "mb-2", children: r.label }),
    /* @__PURE__ */ E("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
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
    throw new le(500, "View not found");
  return P.createElement(n[e] || an, t);
}, St = ({ view: e, namespace: t, props: n }) => /* @__PURE__ */ s(J, { namespace: t, view: e, props: n, children: /* @__PURE__ */ s(ar, { view: e, props: n }) }, t + e), ir = ({ path: e, preloader: t }) => {
  if (!je.namespace[Ve])
    throw new pe(500, "Invalid Configuration.");
  const { getOnClickActionByPath: n } = ve(), [r, o] = V();
  if (v(() => {
    n(e).then((a) => o(a));
  }, [e]), r === void 0)
    return t ?? /* @__PURE__ */ s(j, { children: "Loading" });
  if (!r)
    throw new le(404, "Page Not Found");
  return /* @__PURE__ */ s(
    St,
    {
      view: r.action.name,
      namespace: r.action.namespace || "",
      props: { action: r }
    }
  );
};
let Ce;
const Ve = "dakataa_crud", gr = ({ connection: e }) => {
  je.namespace[Ve] = e;
}, ie = () => (Ce || (Ce = je.instance({ namespace: Ve })), Ce), br = ({ includeParentRoutePath: e = !1, errorFallback: t }) => {
  const n = tt(), { getParentReactRoute: r } = Q(), o = r();
  let a = n.pathname, c;
  return e && (c = o == null ? void 0 : o.pathnameBase, a = a.replace(new RegExp("^" + c + "(/)?"), "/")), /* @__PURE__ */ s(qt, { config: {
    link: {
      prefix: c
    }
  }, children: /* @__PURE__ */ s(Pt, { children: /* @__PURE__ */ s(Ht, { fallback: t ?? /* @__PURE__ */ s(Yt, {}), children: /* @__PURE__ */ s(ir, { path: a }) }) }) });
};
export {
  sn as AlertProvider,
  br as Crud,
  gr as CrudConfiguration,
  Pt as CrudContext,
  ir as CrudLoader,
  J as DynamicView,
  Ht as ErrorBoundary,
  pe as Exception,
  at as Form,
  Qt as FormGroup,
  Fe as FormView,
  Xt as FormWidget,
  er as GridTableView,
  le as HttpException,
  Zt as Input,
  sr as List,
  rr as ModalProvider,
  We as Modify,
  U as TemplateBlock,
  K as TemplateExtend,
  ft as UseAlert,
  nr as UseModal,
  St as ViewLoader,
  he as nameToId,
  Me as useForm
};
