var mt = Object.defineProperty;
var vt = (t, e, r) => e in t ? mt(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var ft = (t, e, r) => vt(t, typeof e != "symbol" ? e + "" : e, r);
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import React__default, { memo, useContext, useState, useEffect, forwardRef, useRef, useImperativeHandle, useReducer, use, Suspense } from "react";
import Requester, { convertObjectToURLSearchParams, RequestBodyType, convertURLSearchParamsToObject, convertFormDataToObject, Method } from "@dakataa/requester";
import "@dakataa/crud-theme/scss/theme.scss";
import { generatePath, UNSAFE_RouteContext, matchPath, useNavigate, useParams, Link as Link$1, useLocation, useSearchParams } from "react-router";
import { createPortal } from "react-dom";
import * as Popper from "@popperjs/core";
class Exception {
  constructor(e = 0, r, i) {
    ft(this, "code");
    ft(this, "detail");
    ft(this, "trace");
    this.code = e, this.detail = r, this.trace = i;
  }
}
class HttpException extends Exception {
  constructor(r, i, s) {
    super(0, i, s);
    ft(this, "status", 400);
    this.status = r;
  }
}
class ErrorBoundary extends React.Component {
  constructor(r) {
    super(r);
    ft(this, "promiseRejectionHandler", (r) => {
      r.reason instanceof Exception && this.setState({
        ...this.state,
        hasError: !0,
        error: r.reason
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
  static getDerivedStateFromError(r) {
    return r instanceof Error && (r = new HttpException(0, r.message)), {
      hasError: !0,
      error: r
    };
  }
  componentDidCatch(r, i) {
  }
  render() {
    return this.state.hasError ? React.cloneElement(
      this.props.fallback,
      {
        error: this.state.error
      }
    ) : this.props.children;
  }
}
const Base = memo(({ children: t }) => /* @__PURE__ */ jsx(Fragment, { children: t })), Error$1 = memo(({ error: t }) => (t ?? (t = new HttpException(404, "Page not found.")), /* @__PURE__ */ jsx(Base, { children: /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsxs("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ jsx("h1", { className: "display-1", children: t.status || "Error" }),
  /* @__PURE__ */ jsx("p", { className: "text-secondary", children: t.detail }),
  /* @__PURE__ */ jsx("br", {}),
  /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) }))), TemplateParentBlock = ({ children: t }) => /* @__PURE__ */ jsx(Fragment, { children: t }), TemplateExtend = memo(({ name: t, children: e, data: r, parent: i, render: s }) => (e = React__default.Children.toArray((s ? s(r, i) : e) || []).map((n) => (React__default.isValidElement(n) && n.type === TemplateParentBlock && (n = React__default.cloneElement(n, { children: i })), n)), /* @__PURE__ */ jsx(Fragment, { children: e }))), TemplateBlock = memo(({ name: t, content: e, children: r, data: i }) => {
  const s = React__default.Children.toArray(e).find((l) => React__default.isValidElement(l) && l.type === TemplateExtend && l.props.name === t);
  let n = null;
  s && React__default.isValidElement(s) && (n = React__default.cloneElement(s, { parent: r, data: i }));
  const a = React__default.Children.toArray(r).filter((l) => React__default.isValidElement(l) && l.type !== TemplateExtend);
  return /* @__PURE__ */ jsx(Fragment, { children: n || (a.length ? a : r) });
}), crudToReactPathPattern = (t) => t.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), generateRoute = (t, e) => t ? generatePath(crudToReactPathPattern(t.path), { ...t.defaults || {}, ...e }) : "#", UseCurrentReactRoute = () => useContext(UNSAFE_RouteContext).matches.pop(), STORAGE_KEY = "actions", ActionContext = React__default.createContext(null);
function UseActions() {
  const t = React__default.useContext(ActionContext), e = (s, n, a) => t == null ? void 0 : t.filter((l) => l.entity === s && l.name === n && (a === void 0 || l.namespace === a)).shift(), r = (s) => t == null ? void 0 : t.find((n) => {
    var a;
    return ((a = n.route) == null ? void 0 : a.path) && matchPath(crudToReactPathPattern(n.route.path), s);
  });
  return {
    getAction: e,
    getActionByPath: r,
    getOnClickActionByPath: (s) => {
      const n = () => {
        var o;
        const a = r(s);
        if (!a)
          throw new HttpException(404, "Page not found.");
        const l = matchPath(crudToReactPathPattern(((o = a.route) == null ? void 0 : o.path) || ""), s);
        return {
          action: a,
          parameters: l == null ? void 0 : l.params
        };
      };
      return new Promise((a, l) => {
        let o = 0;
        const f = () => {
          if (o > 10)
            throw new HttpException(500, "Cannot load routes");
          if (t)
            return a(n());
          setTimeout(f, 200), o++;
        };
        f();
      });
    }
  };
}
function ActionProvider(t) {
  let e = null;
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    e = JSON.parse(atob(s || ""));
  } catch {
  }
  const [r, i] = useState(e);
  return useEffect(() => {
    e || new Requester().get("/_crud/actions", {}).then((s) => {
      s.status === 200 && s.getData().then((n) => {
        sessionStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(n))), i(n);
      });
    }).catch((s) => {
      console.log("error", s);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ jsx(ActionContext.Provider, { value: r, children: t.children });
}
const FormContext = React__default.createContext(null);
function useForm() {
  const t = React__default.useContext(FormContext);
  if (!t)
    throw new Error("useForm must be used in Form");
  return t;
}
const nameToId = (t, e = null) => (t.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_") + (e ?? "")).toLowerCase(), Form = forwardRef(({
  id: t,
  children: e,
  data: r,
  onError: i,
  onBeforeSubmit: s,
  onSubmit: n,
  onReset: a,
  ...l
}, o) => {
  const f = useRef(null), m = {
    response: null,
    constraints: {},
    errors: {}
  }, b = {
    getFormData: () => new FormData(f.current || void 0),
    setFormData: (u) => {
      var P;
      [...((P = f.current) == null ? void 0 : P.elements) || []].forEach((c) => {
        const d = u.get(c.name);
        switch (c.tagName.toLowerCase()) {
          case "select": {
            c.multiple ? [...c.options].forEach((p) => {
              p.selected = u.getAll(c.name).includes(p.value);
            }) : c.value = d;
            break;
          }
          default:
            switch (c.type) {
              case "checkbox":
                c.checked = !!d;
                break;
              default:
                c.value = d;
                break;
            }
        }
      });
    },
    setErrors: (u) => {
      const [, P] = g;
      P({ action: "errors", payload: u });
    },
    reset: () => {
      var u;
      (u = f.current) == null || u.reset();
    },
    submit: () => {
      var u;
      return (u = f.current) == null ? void 0 : u.requestSubmit();
    }
  };
  useImperativeHandle(o, () => b), useEffect(() => {
    const u = () => {
      a && a();
    }, P = f == null ? void 0 : f.current;
    return P == null || P.addEventListener("reset", u), () => {
      P == null || P.removeEventListener("reset", u);
    };
  }, []);
  const h = (u, P) => {
    const c = b.getFormData();
    for (const d of P)
      if (!d.isValid(c.get(u) || null))
        return { valid: !1, message: d.getMessage() };
    return { valid: !0, message: null };
  }, g = useReducer((u, P) => {
    const { action: c, payload: d } = P;
    switch (c) {
      case "constraints": {
        const { name: p, constraints: v } = d;
        return {
          ...u,
          constraints: {
            ...u.constraints || {},
            [p]: v
          }
        };
      }
      case "validate": {
        const { valid: p, message: v } = h(d, u.constraints[d] || []), S = u.errors || {}, _ = d;
        return p ? delete S[_] : S[_] = [...S[_] || [], { message: v || "Error" }], Object.keys(S).length ? {
          ...u,
          errors: S
        } : u;
      }
      case "response":
        return {
          ...u,
          response: d
        };
      case "errors":
        return {
          ...u,
          errors: d || []
        };
      case "error": {
        const p = { ...u.errors, ...d };
        return {
          ...u,
          errors: p
        };
      }
    }
    return u;
  }, m), y = (u) => {
    u.preventDefault();
    const [P, c] = g;
    let d = {};
    for (const [v, S] of Object.entries(P.constraints)) {
      const { valid: _, message: A } = h(v, S);
      _ || (d[v] = [A]);
    }
    if (Object.values(d).length) {
      c({ action: "errors", payload: d });
      return;
    }
    const p = new FormData((f == null ? void 0 : f.current) || void 0);
    if (s && s(p), n) {
      n(p);
      return;
    }
  };
  return /* @__PURE__ */ jsx(FormContext.Provider, { value: [g, o, f], children: /* @__PURE__ */ jsx("form", { id: t, ref: f, onSubmit: y, ...l, children: e }) });
}), Choice = ({
  view: t,
  constraints: e,
  className: r,
  onChange: i,
  choiceValueTransform: s,
  choiceLabelTransform: n,
  ...a
}) => {
  e = e || [];
  const [[l, o], f] = useForm(), m = useRef(null), h = !!((l == null ? void 0 : l.errors[t.full_name]) || []).length, g = btoa(encodeURIComponent(t.full_name + JSON.stringify(t.data)));
  useEffect(() => {
    o({
      action: "constraints",
      payload: {
        name: t.full_name,
        constraints: e
      }
    });
  }, []);
  const y = (u) => {
    o({ action: "validate", payload: t.full_name }), i && i(u);
  };
  return t != null && t.expanded ? /* @__PURE__ */ jsx(Fragment, { children: Object.values(t.choices || []).map(
    (u, P) => {
      var S;
      const c = nameToId(t.full_name, P), d = s ? s(u) : u.value, p = n ? n(u) : u.label || d, v = {
        id: c,
        ...(t == null ? void 0 : t.choice_attr) && ((t == null ? void 0 : t.choice_attr) instanceof Function ? t == null ? void 0 : t.choice_attr(u) : t == null ? void 0 : t.choice_attr)
      };
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: m,
                defaultValue: d,
                type: t != null && t.multiple ? "checkbox" : "radio",
                defaultChecked: (S = t == null ? void 0 : t.data) == null ? void 0 : S.includes(d),
                name: (t == null ? void 0 : t.full_name) + "[]",
                id: c,
                className: "form-check-input",
                ...v,
                onChange: (_) => {
                  var A, T;
                  return y({
                    value: (t != null && t.multiple ? (A = f == null ? void 0 : f.current) == null ? void 0 : A.getFormData().getAll(t == null ? void 0 : t.full_name) : (T = f == null ? void 0 : f.current) == null ? void 0 : T.getFormData().get(t == null ? void 0 : t.full_name)) || _.target.value,
                    targetValue: _.target.value,
                    checked: _.target.checked
                  });
                }
              },
              g
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: v.id,
                className: "form-check-label",
                children: p
              }
            )
          ]
        },
        P
      );
    }
  ) }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "select",
    {
      ref: m,
      name: t.full_name,
      multiple: t.multiple,
      "aria-invalid": h,
      onChange: (u) => {
        var P, c;
        return y({
          value: (t.multiple ? (P = f == null ? void 0 : f.current) == null ? void 0 : P.getFormData().getAll(t.full_name) : (c = f == null ? void 0 : f.current) == null ? void 0 : c.getFormData().get(t.full_name)) || u.target.value
        });
      },
      className: [...(r || "").split(" ") || [], "form-control", ...h ? ["is-invalid"] : []].join(" "),
      ...t.attr && (t.attr instanceof Function ? t.attr() : t.attr),
      defaultValue: t.data,
      children: [
        t.placeholder && /* @__PURE__ */ jsx("option", { value: "", children: t.placeholder }),
        Object.values(t.choices || []).map(
          (u, P) => /* @__PURE__ */ jsx(
            "option",
            {
              value: u.value || u.label,
              ...t.choice_attr && (t.choice_attr instanceof Function ? t.choice_attr(u) : t.choice_attr),
              children: u.label
            },
            P
          )
        )
      ]
    },
    g
  ) });
}, FormFieldError = ({ name: t, className: e }) => {
  const [[r]] = useForm(), i = (r == null ? void 0 : r.errors[t]) || [];
  return i.length ? /* @__PURE__ */ jsx("div", { className: e, children: i.map((s, n) => /* @__PURE__ */ jsx("span", { children: s.message }, n)) }) : /* @__PURE__ */ jsx(Fragment, {});
}, capitalize = (t) => t.toLowerCase().replace(new RegExp("^.{1,1}"), (e) => e.toUpperCase()), titlize = (t) => {
  let e = t.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const r = e.shift(), i = e.pop();
  return e = e.map((s) => s.toLowerCase()), r && e.unshift(capitalize(r)), i && e.push(capitalize(i)), e.join(" ");
}, FormGroup = ({
  view: t,
  children: e,
  className: r
}) => {
  const i = (a, l = null) => a.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_") + (l && l), s = t.label || titlize(t.name), n = ["checkbox", "radio"].includes(t.type || "input");
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: [...(r == null ? void 0 : r.split(" ")) || [], "mb-3", n && "form-check"].filter((a) => a).join(" "),
      ...t.attr && (t.attr instanceof Function ? t.attr() : t.attr),
      children: [
        !n && /* @__PURE__ */ jsx(
          "label",
          {
            className: "form-label",
            ...t.label_attr && (t.label_attr instanceof Function ? t.label_attr() : t.label_attr),
            children: s
          }
        ),
        e,
        n && /* @__PURE__ */ jsx(
          "label",
          {
            className: "form-check-label",
            htmlFor: t.id || i(t.full_name),
            ...t.label_attr && (t.label_attr instanceof Function ? t.label_attr() : t.label_attr),
            children: s
          }
        ),
        /* @__PURE__ */ jsx(FormFieldError, { name: t.full_name, className: "invalid-feedback" }),
        t.help && /* @__PURE__ */ jsx(
          "div",
          {
            className: "form-help",
            ...t.help_attr && (t.help_attr instanceof Function ? t.help_attr() : t.help_attr),
            children: t.help
          }
        )
      ]
    }
  );
}, Input = ({
  view: t,
  constraints: e,
  className: r,
  onChange: i
}) => {
  const [[s, n]] = useForm(), a = useRef(null), l = (s == null ? void 0 : s.errors[t.full_name]) || [];
  useEffect(() => {
    n({
      action: "constraints",
      payload: {
        name: t.full_name,
        constraints: e || []
      }
    });
  }, []);
  const o = (h) => {
    n({ action: "validate", payload: t.full_name }), i && i(h);
  }, m = ["checkbox", "radio"].includes(t.type) ? "form-check-input" : "form-control", b = btoa(encodeURIComponent(t.full_name + JSON.stringify(t.data)));
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "input",
    {
      ref: a,
      id: t.id || nameToId(t.full_name),
      name: t.full_name,
      type: t.type,
      defaultValue: t.data,
      "aria-invalid": !l.length,
      onKeyUp: (h) => o({ value: h.target.value }),
      onChange: (h) => o({ value: h.target.value }),
      className: [m, ...l.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: t == null ? void 0 : t.checked,
      ...t.attr && (t.attr instanceof Function ? t.attr() : t.attr)
    },
    b
  ) });
}, FormWidget = ({
  view: t
}) => /* @__PURE__ */ jsx(FormGroup, { className: "mb-3", view: t, children: (() => {
  switch (t.type) {
    case "entity":
    case "choice":
    case "collection":
    case "enum":
      return /* @__PURE__ */ jsx(Choice, { view: t });
    default:
      return /* @__PURE__ */ jsx(Input, { view: t });
  }
})() }), EmptyView$1 = ({ children: t }) => /* @__PURE__ */ jsx(Fragment, { children: t }), DynamicView = memo(({ namespace: t, view: e, prefix: r, children: i, props: s, data: n }) => {
  e = e.split(/[._]/).map((g) => capitalize(g)).join("");
  const a = /* @__PURE__ */ Object.assign({}), l = ["crud", t, r, e].filter((g) => g).join("/") + ".tsx", [o, f] = Object.entries(a).filter(([g, y]) => g.endsWith(l)).shift() || [], [m, b] = useState(1), h = useRef(EmptyView$1);
  return useEffect(() => {
    if (f === void 0)
      return () => {
      };
    f().then((g) => {
      h.current = g.default, b(m + 1);
    });
  }, []), /* @__PURE__ */ jsx(h.current, { ...s, view: e, controller: t, viewName: e, data: n, parent: i, children: (!f || h.current !== EmptyView$1) && i });
}), FormView = memo(({ view: t, namespace: e, name: r }) => t && /* @__PURE__ */ jsx(
  DynamicView,
  {
    namespace: e,
    view: r || t.name || "form",
    prefix: "modify/form",
    data: t,
    children: Object.keys(t.children || []).length ? Object.values(t.children || []).map((i) => /* @__PURE__ */ jsx(FormView, { namespace: e, view: i }, i.id)) : /* @__PURE__ */ jsx(FormWidget, { view: t }, t.id)
  },
  t.id
)), BaseButton = ({ icon: t, rightIcon: e, rightIconProps: r, children: i, preload: s = !1 }) => /* @__PURE__ */ jsx(Fragment, { children: i && i }), Button = forwardRef(({
  children: t,
  preload: e,
  ...r
}, i) => /* @__PURE__ */ jsx("button", { disabled: e, ...r, ref: i, children: /* @__PURE__ */ jsx(BaseButton, { preload: e, ...r, children: t }) })), GetDataContext = React__default.createContext(null);
function UseDataProvider() {
  return React__default.useContext(GetDataContext);
}
const GetData = ({ entityAction: t, initParameters: e, initQueryParameters: r }) => {
  const { getAction: i } = UseActions();
  t = i(t.entity, t.name, t.namespace) || t;
  const [s, n] = useState(), [a, l] = useState(e || null), [o, f] = useState(new URLSearchParams(r || {}));
  useRef(null), btoa(encodeURIComponent([t.entity, t.name, t.namespace, ...Object.entries(a || {}).map(([h, g]) => h + "-" + g), (o instanceof URLSearchParams ? o : convertObjectToURLSearchParams(o)).toString()].filter((h) => h).join("."))), useRef({});
  const [m, b] = useState(1);
  return useEffect(() => {
    t && new Requester().get(generateRoute(t.route, a ?? null), o).then((h) => h.getData().then((g) => {
      switch (h.status) {
        case 201:
        case 200: {
          n(g);
          break;
        }
        default: {
          const y = g;
          throw new HttpException(y.status, y.detail, y.trace);
        }
      }
    }));
  }, [JSON.stringify(a), o.toString(), m]), {
    results: s,
    setParameters: l,
    setQueryParameters: (h) => {
      f(new URLSearchParams(h));
    },
    refresh: () => {
      b(m + 1);
    }
  };
}, Translation = memo(({ children: t }) => /* @__PURE__ */ jsx(Fragment, { children: t })), ModifyForm = forwardRef(({ name: t, data: e, action: r, parameters: i, onSuccess: s, onError: n, onLoad: a, children: l, embedded: o = !1 }, f) => {
  var v, S, _, A, T;
  const [m, b] = useState(!1), h = useNavigate(), g = generateRoute(r.route, i || {}), y = useRef(null), u = UseDataProvider(), [P, c] = useState();
  useImperativeHandle(f, () => ({
    getData: () => P,
    getFormRef: () => y.current
  }));
  const d = (w) => {
    var D, I;
    let V = {
      ...(D = w.errors) != null && D.length ? { [w.full_name]: w.errors } : {}
    };
    for (let [, R] of Object.entries((w == null ? void 0 : w.children) || []))
      R.children && Object.values(R.children).length ? V = { ...V, ...d(R) } : (I = R.errors) != null && I.length && (V[R.full_name] = R.errors);
    return V;
  }, p = (w) => {
    b(!0), new Requester().post(g, w, RequestBodyType.FormData).then((V) => V.getData().then((D) => [200, 201, 400].includes(V.status) ? D : Promise.reject(D))).then((V) => {
      var I;
      c(V);
      const D = d(V.form.modify.view);
      if (Object.entries(D).length) {
        (I = y.current) == null || I.setErrors(D);
        return;
      }
      s && s(V), V.redirect && !o && h(generateRoute(V.redirect.route, { ...i || {}, ...V.redirect.parameters }));
    }).catch((V) => {
      n && n(V);
    }).finally(() => {
      b(!1);
    });
  };
  return useEffect(() => {
    a && a();
  }, []), e = (u == null ? void 0 : u.results) ?? e, useEffect(() => {
    c(e);
  }, [JSON.stringify(e)]), P && /* @__PURE__ */ jsxs(Fragment, { children: [
    Object.keys((P == null ? void 0 : P.messages) || {}).map((w, V) => /* @__PURE__ */ jsx("div", { className: ["alert", "alert-" + w].join(" "), children: ((P == null ? void 0 : P.messages[w]) || ["Item was saved successful."]).join(" ") }, "alert-" + w)),
    /* @__PURE__ */ jsxs(Form, { id: (_ = (S = (v = P == null ? void 0 : P.form) == null ? void 0 : v.modify) == null ? void 0 : S.view) == null ? void 0 : _.id, ref: y, action: g, method: "POST", onSubmit: p, children: [
      ((T = (A = P == null ? void 0 : P.form) == null ? void 0 : A.modify) == null ? void 0 : T.view) !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          FormView,
          {
            name: t,
            namespace: r.namespace,
            view: P.form.modify.view
          },
          P.form.modify.view.id
        ),
        /* @__PURE__ */ jsx(FormFieldError, { name: P.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ jsx(TemplateBlock, { name: "actions", content: l, data: { formRef: y }, children: /* @__PURE__ */ jsx(Button, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ jsx(Translation, { children: "Save" }) }) })
    ] })
  ] });
}), Modal = forwardRef(({
  children: t,
  open: e = !1,
  animation: r = "fade",
  backdrop: i = !0,
  keyboard: s = !0,
  size: n,
  onClose: a,
  className: l
}, o) => {
  const [f, m] = useState(e);
  useImperativeHandle(o, () => ({
    toggle: () => m(!f),
    open: () => m(!0),
    close: () => u(),
    isOpen: () => f
  })), useEffect(() => {
    m(e);
  }, [e]);
  const b = (P) => {
    if (s)
      switch (P.key) {
        case "Escape": {
          u();
          break;
        }
      }
  };
  useEffect(() => {
    var d;
    if (!f)
      return;
    const P = () => {
      var p;
      (p = h.current) == null || p.addEventListener("animationend", c);
    }, c = () => {
      var p, v, S;
      (p = h.current) == null || p.classList.remove(r), (v = h.current) == null || v.removeEventListener("animationstart", P), (S = h.current) == null || S.removeEventListener("animationend", c);
    };
    return setTimeout(() => {
      var p, v;
      (p = h.current) == null || p.classList.add("d-block", "show"), (v = g == null ? void 0 : g.current) == null || v.classList.add("show");
    }, r ? 100 : 0), document.addEventListener("keydown", b), (d = h.current) == null || d.addEventListener("animationstart", P), () => {
      var p, v;
      document.removeEventListener("keydown", b), (p = h.current) == null || p.removeEventListener("animationstart", P), (v = h.current) == null || v.removeEventListener("animationend", c);
    };
  }, [f]);
  const h = useRef(null), g = useRef(null), y = () => {
    m(!1), a && a();
  }, u = () => new Promise((P, c) => {
    var p, v;
    if (!f)
      return P();
    const d = () => {
      var S;
      (S = h == null ? void 0 : h.current) == null || S.classList.remove("show", "d-block"), P(), y();
    };
    if (r) {
      const S = setTimeout(() => {
        d();
      }, r ? 50 : 0);
      (p = h.current) == null || p.addEventListener("animationstart", () => {
        var _, A;
        console.log("timeout"), clearTimeout(S), (_ = h.current) == null || _.removeEventListener("animationend", d), (A = h.current) == null || A.addEventListener("animationend", d);
      }), (v = h.current) == null || v.classList.add(r, "close");
    } else
      d();
  });
  return f && createPortal(/* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: h,
        className: ["modal", n && "modal-" + n, r && r, l].filter((P) => P).join(" "),
        children: /* @__PURE__ */ jsx("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ jsxs("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsx(TemplateBlock, { name: "header", content: t, data: null, children: /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsx("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "title", content: t, data: null, children: "Title" }) }),
            /* @__PURE__ */ jsx("button", { onClick: u, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "content", content: t, data: null, children: t }) }),
          /* @__PURE__ */ jsx(TemplateBlock, { name: "footer", content: t, data: null, children: /* @__PURE__ */ jsx("div", { className: "modal-footer", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "actions", content: t, data: null, children: /* @__PURE__ */ jsx("button", { onClick: u, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    i && /* @__PURE__ */ jsx(
      "div",
      {
        ref: g,
        className: ["modal-backdrop", "fade", ...r && ["show"]].filter((P) => P).join(" ")
      }
    )
  ] }), document.body);
});
function getDefaultExportFromCjs(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var lottie$1 = { exports: {} }, lottie = lottie$1.exports, hasRequiredLottie;
function requireLottie() {
  return hasRequiredLottie || (hasRequiredLottie = 1, function(module, exports) {
    typeof navigator < "u" && function(t, e) {
      module.exports = e();
    }(lottie, function() {
      var svgNS = "http://www.w3.org/2000/svg", locationHref = "", _useWebWorker = !1, initialDefaultFrame = -999999, setWebWorker = function(e) {
        _useWebWorker = !!e;
      }, getWebWorker = function() {
        return _useWebWorker;
      }, setLocationHref = function(e) {
        locationHref = e;
      }, getLocationHref = function() {
        return locationHref;
      };
      function createTag(t) {
        return document.createElement(t);
      }
      function extendPrototype(t, e) {
        var r, i = t.length, s;
        for (r = 0; r < i; r += 1) {
          s = t[r].prototype;
          for (var n in s)
            Object.prototype.hasOwnProperty.call(s, n) && (e.prototype[n] = s[n]);
        }
      }
      function getDescriptor(t, e) {
        return Object.getOwnPropertyDescriptor(t, e);
      }
      function createProxyFunction(t) {
        function e() {
        }
        return e.prototype = t, e;
      }
      var audioControllerFactory = function() {
        function t(e) {
          this.audios = [], this.audioFactory = e, this._volume = 1, this._isMuted = !1;
        }
        return t.prototype = {
          addAudio: function(r) {
            this.audios.push(r);
          },
          pause: function() {
            var r, i = this.audios.length;
            for (r = 0; r < i; r += 1)
              this.audios[r].pause();
          },
          resume: function() {
            var r, i = this.audios.length;
            for (r = 0; r < i; r += 1)
              this.audios[r].resume();
          },
          setRate: function(r) {
            var i, s = this.audios.length;
            for (i = 0; i < s; i += 1)
              this.audios[i].setRate(r);
          },
          createAudio: function(r) {
            return this.audioFactory ? this.audioFactory(r) : window.Howl ? new window.Howl({
              src: [r]
            }) : {
              isPlaying: !1,
              play: function() {
                this.isPlaying = !0;
              },
              seek: function() {
                this.isPlaying = !1;
              },
              playing: function() {
              },
              rate: function() {
              },
              setVolume: function() {
              }
            };
          },
          setAudioFactory: function(r) {
            this.audioFactory = r;
          },
          setVolume: function(r) {
            this._volume = r, this._updateVolume();
          },
          mute: function() {
            this._isMuted = !0, this._updateVolume();
          },
          unmute: function() {
            this._isMuted = !1, this._updateVolume();
          },
          getVolume: function() {
            return this._volume;
          },
          _updateVolume: function() {
            var r, i = this.audios.length;
            for (r = 0; r < i; r += 1)
              this.audios[r].volume(this._volume * (this._isMuted ? 0 : 1));
          }
        }, function() {
          return new t();
        };
      }(), createTypedArray = /* @__PURE__ */ function() {
        function t(r, i) {
          var s = 0, n = [], a;
          switch (r) {
            case "int16":
            case "uint8c":
              a = 1;
              break;
            default:
              a = 1.1;
              break;
          }
          for (s = 0; s < i; s += 1)
            n.push(a);
          return n;
        }
        function e(r, i) {
          return r === "float32" ? new Float32Array(i) : r === "int16" ? new Int16Array(i) : r === "uint8c" ? new Uint8ClampedArray(i) : t(r, i);
        }
        return typeof Uint8ClampedArray == "function" && typeof Float32Array == "function" ? e : t;
      }();
      function createSizedArray(t) {
        return Array.apply(null, {
          length: t
        });
      }
      function _typeof$6(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$6 = function(r) {
          return typeof r;
        } : _typeof$6 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$6(t);
      }
      var subframeEnabled = !0, expressionsPlugin = null, expressionsInterfaces = null, idPrefix$1 = "", isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), bmPow = Math.pow, bmSqrt = Math.sqrt, bmFloor = Math.floor, bmMax = Math.max, bmMin = Math.min, BMMath = {};
      (function() {
        var t = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], e, r = t.length;
        for (e = 0; e < r; e += 1)
          BMMath[t[e]] = Math[t[e]];
      })(), BMMath.random = Math.random, BMMath.abs = function(t) {
        var e = _typeof$6(t);
        if (e === "object" && t.length) {
          var r = createSizedArray(t.length), i, s = t.length;
          for (i = 0; i < s; i += 1)
            r[i] = Math.abs(t[i]);
          return r;
        }
        return Math.abs(t);
      };
      var defaultCurveSegments = 150, degToRads = Math.PI / 180, roundCorner = 0.5519;
      function styleDiv(t) {
        t.style.position = "absolute", t.style.top = 0, t.style.left = 0, t.style.display = "block", t.style.transformOrigin = "0 0", t.style.webkitTransformOrigin = "0 0", t.style.backfaceVisibility = "visible", t.style.webkitBackfaceVisibility = "visible", t.style.transformStyle = "preserve-3d", t.style.webkitTransformStyle = "preserve-3d", t.style.mozTransformStyle = "preserve-3d";
      }
      function BMEnterFrameEvent(t, e, r, i) {
        this.type = t, this.currentTime = e, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
      }
      function BMCompleteEvent(t, e) {
        this.type = t, this.direction = e < 0 ? -1 : 1;
      }
      function BMCompleteLoopEvent(t, e, r, i) {
        this.type = t, this.currentLoop = r, this.totalLoops = e, this.direction = i < 0 ? -1 : 1;
      }
      function BMSegmentStartEvent(t, e, r) {
        this.type = t, this.firstFrame = e, this.totalFrames = r;
      }
      function BMDestroyEvent(t, e) {
        this.type = t, this.target = e;
      }
      function BMRenderFrameErrorEvent(t, e) {
        this.type = "renderFrameError", this.nativeError = t, this.currentTime = e;
      }
      function BMConfigErrorEvent(t) {
        this.type = "configError", this.nativeError = t;
      }
      var createElementID = /* @__PURE__ */ function() {
        var t = 0;
        return function() {
          return t += 1, idPrefix$1 + "__lottie_element_" + t;
        };
      }();
      function HSVtoRGB(t, e, r) {
        var i, s, n, a, l, o, f, m;
        switch (a = Math.floor(t * 6), l = t * 6 - a, o = r * (1 - e), f = r * (1 - l * e), m = r * (1 - (1 - l) * e), a % 6) {
          case 0:
            i = r, s = m, n = o;
            break;
          case 1:
            i = f, s = r, n = o;
            break;
          case 2:
            i = o, s = r, n = m;
            break;
          case 3:
            i = o, s = f, n = r;
            break;
          case 4:
            i = m, s = o, n = r;
            break;
          case 5:
            i = r, s = o, n = f;
            break;
        }
        return [i, s, n];
      }
      function RGBtoHSV(t, e, r) {
        var i = Math.max(t, e, r), s = Math.min(t, e, r), n = i - s, a, l = i === 0 ? 0 : n / i, o = i / 255;
        switch (i) {
          case s:
            a = 0;
            break;
          case t:
            a = e - r + n * (e < r ? 6 : 0), a /= 6 * n;
            break;
          case e:
            a = r - t + n * 2, a /= 6 * n;
            break;
          case r:
            a = t - e + n * 4, a /= 6 * n;
            break;
        }
        return [a, l, o];
      }
      function addSaturationToRGB(t, e) {
        var r = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
        return r[1] += e, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }
      function addBrightnessToRGB(t, e) {
        var r = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
        return r[2] += e, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }
      function addHueToRGB(t, e) {
        var r = RGBtoHSV(t[0] * 255, t[1] * 255, t[2] * 255);
        return r[0] += e / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
      }
      var rgbToHex = function() {
        var t = [], e, r;
        for (e = 0; e < 256; e += 1)
          r = e.toString(16), t[e] = r.length === 1 ? "0" + r : r;
        return function(i, s, n) {
          return i < 0 && (i = 0), s < 0 && (s = 0), n < 0 && (n = 0), "#" + t[i] + t[s] + t[n];
        };
      }(), setSubframeEnabled = function(e) {
        subframeEnabled = !!e;
      }, getSubframeEnabled = function() {
        return subframeEnabled;
      }, setExpressionsPlugin = function(e) {
        expressionsPlugin = e;
      }, getExpressionsPlugin = function() {
        return expressionsPlugin;
      }, setExpressionInterfaces = function(e) {
        expressionsInterfaces = e;
      }, getExpressionInterfaces = function() {
        return expressionsInterfaces;
      }, setDefaultCurveSegments = function(e) {
        defaultCurveSegments = e;
      }, getDefaultCurveSegments = function() {
        return defaultCurveSegments;
      }, setIdPrefix = function(e) {
        idPrefix$1 = e;
      };
      function createNS(t) {
        return document.createElementNS(svgNS, t);
      }
      function _typeof$5(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$5 = function(r) {
          return typeof r;
        } : _typeof$5 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$5(t);
      }
      var dataManager = /* @__PURE__ */ function() {
        var t = 1, e = [], r, i, s = {
          onmessage: function() {
          },
          postMessage: function(g) {
            r({
              data: g
            });
          }
        }, n = {
          postMessage: function(g) {
            s.onmessage({
              data: g
            });
          }
        };
        function a(h) {
          if (window.Worker && window.Blob && getWebWorker()) {
            var g = new Blob(["var _workerSelf = self; self.onmessage = ", h.toString()], {
              type: "text/javascript"
            }), y = URL.createObjectURL(g);
            return new Worker(y);
          }
          return r = h, s;
        }
        function l() {
          i || (i = a(function(g) {
            function y() {
              function P(L, C) {
                var M, E, x = L.length, F, k, B, j;
                for (E = 0; E < x; E += 1)
                  if (M = L[E], "ks" in M && !M.completed) {
                    if (M.completed = !0, M.hasMask) {
                      var G = M.masksProperties;
                      for (k = G.length, F = 0; F < k; F += 1)
                        if (G[F].pt.k.i)
                          S(G[F].pt.k);
                        else
                          for (j = G[F].pt.k.length, B = 0; B < j; B += 1)
                            G[F].pt.k[B].s && S(G[F].pt.k[B].s[0]), G[F].pt.k[B].e && S(G[F].pt.k[B].e[0]);
                    }
                    M.ty === 0 ? (M.layers = p(M.refId, C), P(M.layers, C)) : M.ty === 4 ? v(M.shapes) : M.ty === 5 && R(M);
                  }
              }
              function c(L, C) {
                if (L) {
                  var M = 0, E = L.length;
                  for (M = 0; M < E; M += 1)
                    L[M].t === 1 && (L[M].data.layers = p(L[M].data.refId, C), P(L[M].data.layers, C));
                }
              }
              function d(L, C) {
                for (var M = 0, E = C.length; M < E; ) {
                  if (C[M].id === L)
                    return C[M];
                  M += 1;
                }
                return null;
              }
              function p(L, C) {
                var M = d(L, C);
                return M ? M.layers.__used ? JSON.parse(JSON.stringify(M.layers)) : (M.layers.__used = !0, M.layers) : null;
              }
              function v(L) {
                var C, M = L.length, E, x;
                for (C = M - 1; C >= 0; C -= 1)
                  if (L[C].ty === "sh")
                    if (L[C].ks.k.i)
                      S(L[C].ks.k);
                    else
                      for (x = L[C].ks.k.length, E = 0; E < x; E += 1)
                        L[C].ks.k[E].s && S(L[C].ks.k[E].s[0]), L[C].ks.k[E].e && S(L[C].ks.k[E].e[0]);
                  else L[C].ty === "gr" && v(L[C].it);
              }
              function S(L) {
                var C, M = L.i.length;
                for (C = 0; C < M; C += 1)
                  L.i[C][0] += L.v[C][0], L.i[C][1] += L.v[C][1], L.o[C][0] += L.v[C][0], L.o[C][1] += L.v[C][1];
              }
              function _(L, C) {
                var M = C ? C.split(".") : [100, 100, 100];
                return L[0] > M[0] ? !0 : M[0] > L[0] ? !1 : L[1] > M[1] ? !0 : M[1] > L[1] ? !1 : L[2] > M[2] ? !0 : M[2] > L[2] ? !1 : null;
              }
              var A = /* @__PURE__ */ function() {
                var L = [4, 4, 14];
                function C(E) {
                  var x = E.t.d;
                  E.t.d = {
                    k: [{
                      s: x,
                      t: 0
                    }]
                  };
                }
                function M(E) {
                  var x, F = E.length;
                  for (x = 0; x < F; x += 1)
                    E[x].ty === 5 && C(E[x]);
                }
                return function(E) {
                  if (_(L, E.v) && (M(E.layers), E.assets)) {
                    var x, F = E.assets.length;
                    for (x = 0; x < F; x += 1)
                      E.assets[x].layers && M(E.assets[x].layers);
                  }
                };
              }(), T = /* @__PURE__ */ function() {
                var L = [4, 7, 99];
                return function(C) {
                  if (C.chars && !_(L, C.v)) {
                    var M, E = C.chars.length;
                    for (M = 0; M < E; M += 1) {
                      var x = C.chars[M];
                      x.data && x.data.shapes && (v(x.data.shapes), x.data.ip = 0, x.data.op = 99999, x.data.st = 0, x.data.sr = 1, x.data.ks = {
                        p: {
                          k: [0, 0],
                          a: 0
                        },
                        s: {
                          k: [100, 100],
                          a: 0
                        },
                        a: {
                          k: [0, 0],
                          a: 0
                        },
                        r: {
                          k: 0,
                          a: 0
                        },
                        o: {
                          k: 100,
                          a: 0
                        }
                      }, C.chars[M].t || (x.data.shapes.push({
                        ty: "no"
                      }), x.data.shapes[0].it.push({
                        p: {
                          k: [0, 0],
                          a: 0
                        },
                        s: {
                          k: [100, 100],
                          a: 0
                        },
                        a: {
                          k: [0, 0],
                          a: 0
                        },
                        r: {
                          k: 0,
                          a: 0
                        },
                        o: {
                          k: 100,
                          a: 0
                        },
                        sk: {
                          k: 0,
                          a: 0
                        },
                        sa: {
                          k: 0,
                          a: 0
                        },
                        ty: "tr"
                      })));
                    }
                  }
                };
              }(), w = /* @__PURE__ */ function() {
                var L = [5, 7, 15];
                function C(E) {
                  var x = E.t.p;
                  typeof x.a == "number" && (x.a = {
                    a: 0,
                    k: x.a
                  }), typeof x.p == "number" && (x.p = {
                    a: 0,
                    k: x.p
                  }), typeof x.r == "number" && (x.r = {
                    a: 0,
                    k: x.r
                  });
                }
                function M(E) {
                  var x, F = E.length;
                  for (x = 0; x < F; x += 1)
                    E[x].ty === 5 && C(E[x]);
                }
                return function(E) {
                  if (_(L, E.v) && (M(E.layers), E.assets)) {
                    var x, F = E.assets.length;
                    for (x = 0; x < F; x += 1)
                      E.assets[x].layers && M(E.assets[x].layers);
                  }
                };
              }(), V = /* @__PURE__ */ function() {
                var L = [4, 1, 9];
                function C(E) {
                  var x, F = E.length, k, B;
                  for (x = 0; x < F; x += 1)
                    if (E[x].ty === "gr")
                      C(E[x].it);
                    else if (E[x].ty === "fl" || E[x].ty === "st")
                      if (E[x].c.k && E[x].c.k[0].i)
                        for (B = E[x].c.k.length, k = 0; k < B; k += 1)
                          E[x].c.k[k].s && (E[x].c.k[k].s[0] /= 255, E[x].c.k[k].s[1] /= 255, E[x].c.k[k].s[2] /= 255, E[x].c.k[k].s[3] /= 255), E[x].c.k[k].e && (E[x].c.k[k].e[0] /= 255, E[x].c.k[k].e[1] /= 255, E[x].c.k[k].e[2] /= 255, E[x].c.k[k].e[3] /= 255);
                      else
                        E[x].c.k[0] /= 255, E[x].c.k[1] /= 255, E[x].c.k[2] /= 255, E[x].c.k[3] /= 255;
                }
                function M(E) {
                  var x, F = E.length;
                  for (x = 0; x < F; x += 1)
                    E[x].ty === 4 && C(E[x].shapes);
                }
                return function(E) {
                  if (_(L, E.v) && (M(E.layers), E.assets)) {
                    var x, F = E.assets.length;
                    for (x = 0; x < F; x += 1)
                      E.assets[x].layers && M(E.assets[x].layers);
                  }
                };
              }(), D = /* @__PURE__ */ function() {
                var L = [4, 4, 18];
                function C(E) {
                  var x, F = E.length, k, B;
                  for (x = F - 1; x >= 0; x -= 1)
                    if (E[x].ty === "sh")
                      if (E[x].ks.k.i)
                        E[x].ks.k.c = E[x].closed;
                      else
                        for (B = E[x].ks.k.length, k = 0; k < B; k += 1)
                          E[x].ks.k[k].s && (E[x].ks.k[k].s[0].c = E[x].closed), E[x].ks.k[k].e && (E[x].ks.k[k].e[0].c = E[x].closed);
                    else E[x].ty === "gr" && C(E[x].it);
                }
                function M(E) {
                  var x, F, k = E.length, B, j, G, z;
                  for (F = 0; F < k; F += 1) {
                    if (x = E[F], x.hasMask) {
                      var H = x.masksProperties;
                      for (j = H.length, B = 0; B < j; B += 1)
                        if (H[B].pt.k.i)
                          H[B].pt.k.c = H[B].cl;
                        else
                          for (z = H[B].pt.k.length, G = 0; G < z; G += 1)
                            H[B].pt.k[G].s && (H[B].pt.k[G].s[0].c = H[B].cl), H[B].pt.k[G].e && (H[B].pt.k[G].e[0].c = H[B].cl);
                    }
                    x.ty === 4 && C(x.shapes);
                  }
                }
                return function(E) {
                  if (_(L, E.v) && (M(E.layers), E.assets)) {
                    var x, F = E.assets.length;
                    for (x = 0; x < F; x += 1)
                      E.assets[x].layers && M(E.assets[x].layers);
                  }
                };
              }();
              function I(L) {
                L.__complete || (V(L), A(L), T(L), w(L), D(L), P(L.layers, L.assets), c(L.chars, L.assets), L.__complete = !0);
              }
              function R(L) {
                L.t.a.length === 0 && "m" in L.t.p;
              }
              var O = {};
              return O.completeData = I, O.checkColors = V, O.checkChars = T, O.checkPathProperties = w, O.checkShapes = D, O.completeLayers = P, O;
            }
            if (n.dataManager || (n.dataManager = y()), n.assetLoader || (n.assetLoader = /* @__PURE__ */ function() {
              function P(d) {
                var p = d.getResponseHeader("content-type");
                return p && d.responseType === "json" && p.indexOf("json") !== -1 || d.response && _typeof$5(d.response) === "object" ? d.response : d.response && typeof d.response == "string" ? JSON.parse(d.response) : d.responseText ? JSON.parse(d.responseText) : null;
              }
              function c(d, p, v, S) {
                var _, A = new XMLHttpRequest();
                try {
                  A.responseType = "json";
                } catch {
                }
                A.onreadystatechange = function() {
                  if (A.readyState === 4)
                    if (A.status === 200)
                      _ = P(A), v(_);
                    else
                      try {
                        _ = P(A), v(_);
                      } catch (T) {
                        S && S(T);
                      }
                };
                try {
                  A.open(["G", "E", "T"].join(""), d, !0);
                } catch {
                  A.open(["G", "E", "T"].join(""), p + "/" + d, !0);
                }
                A.send();
              }
              return {
                load: c
              };
            }()), g.data.type === "loadAnimation")
              n.assetLoader.load(g.data.path, g.data.fullPath, function(P) {
                n.dataManager.completeData(P), n.postMessage({
                  id: g.data.id,
                  payload: P,
                  status: "success"
                });
              }, function() {
                n.postMessage({
                  id: g.data.id,
                  status: "error"
                });
              });
            else if (g.data.type === "complete") {
              var u = g.data.animation;
              n.dataManager.completeData(u), n.postMessage({
                id: g.data.id,
                payload: u,
                status: "success"
              });
            } else g.data.type === "loadData" && n.assetLoader.load(g.data.path, g.data.fullPath, function(P) {
              n.postMessage({
                id: g.data.id,
                payload: P,
                status: "success"
              });
            }, function() {
              n.postMessage({
                id: g.data.id,
                status: "error"
              });
            });
          }), i.onmessage = function(h) {
            var g = h.data, y = g.id, u = e[y];
            e[y] = null, g.status === "success" ? u.onComplete(g.payload) : u.onError && u.onError();
          });
        }
        function o(h, g) {
          t += 1;
          var y = "processId_" + t;
          return e[y] = {
            onComplete: h,
            onError: g
          }, y;
        }
        function f(h, g, y) {
          l();
          var u = o(g, y);
          i.postMessage({
            type: "loadAnimation",
            path: h,
            fullPath: window.location.origin + window.location.pathname,
            id: u
          });
        }
        function m(h, g, y) {
          l();
          var u = o(g, y);
          i.postMessage({
            type: "loadData",
            path: h,
            fullPath: window.location.origin + window.location.pathname,
            id: u
          });
        }
        function b(h, g, y) {
          l();
          var u = o(g, y);
          i.postMessage({
            type: "complete",
            animation: h,
            id: u
          });
        }
        return {
          loadAnimation: f,
          loadData: m,
          completeAnimation: b
        };
      }(), ImagePreloader = function() {
        var t = function() {
          var c = createTag("canvas");
          c.width = 1, c.height = 1;
          var d = c.getContext("2d");
          return d.fillStyle = "rgba(0,0,0,0)", d.fillRect(0, 0, 1, 1), c;
        }();
        function e() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function r() {
          this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function i(c, d, p) {
          var v = "";
          if (c.e)
            v = c.p;
          else if (d) {
            var S = c.p;
            S.indexOf("images/") !== -1 && (S = S.split("/")[1]), v = d + S;
          } else
            v = p, v += c.u ? c.u : "", v += c.p;
          return v;
        }
        function s(c) {
          var d = 0, p = setInterval((function() {
            var v = c.getBBox();
            (v.width || d > 500) && (this._imageLoaded(), clearInterval(p)), d += 1;
          }).bind(this), 50);
        }
        function n(c) {
          var d = i(c, this.assetsPath, this.path), p = createNS("image");
          isSafari ? this.testImageLoaded(p) : p.addEventListener("load", this._imageLoaded, !1), p.addEventListener("error", (function() {
            v.img = t, this._imageLoaded();
          }).bind(this), !1), p.setAttributeNS("http://www.w3.org/1999/xlink", "href", d), this._elementHelper.append ? this._elementHelper.append(p) : this._elementHelper.appendChild(p);
          var v = {
            img: p,
            assetData: c
          };
          return v;
        }
        function a(c) {
          var d = i(c, this.assetsPath, this.path), p = createTag("img");
          p.crossOrigin = "anonymous", p.addEventListener("load", this._imageLoaded, !1), p.addEventListener("error", (function() {
            v.img = t, this._imageLoaded();
          }).bind(this), !1), p.src = d;
          var v = {
            img: p,
            assetData: c
          };
          return v;
        }
        function l(c) {
          var d = {
            assetData: c
          }, p = i(c, this.assetsPath, this.path);
          return dataManager.loadData(p, (function(v) {
            d.img = v, this._footageLoaded();
          }).bind(this), (function() {
            d.img = {}, this._footageLoaded();
          }).bind(this)), d;
        }
        function o(c, d) {
          this.imagesLoadedCb = d;
          var p, v = c.length;
          for (p = 0; p < v; p += 1)
            c[p].layers || (!c[p].t || c[p].t === "seq" ? (this.totalImages += 1, this.images.push(this._createImageData(c[p]))) : c[p].t === 3 && (this.totalFootages += 1, this.images.push(this.createFootageData(c[p]))));
        }
        function f(c) {
          this.path = c || "";
        }
        function m(c) {
          this.assetsPath = c || "";
        }
        function b(c) {
          for (var d = 0, p = this.images.length; d < p; ) {
            if (this.images[d].assetData === c)
              return this.images[d].img;
            d += 1;
          }
          return null;
        }
        function h() {
          this.imagesLoadedCb = null, this.images.length = 0;
        }
        function g() {
          return this.totalImages === this.loadedAssets;
        }
        function y() {
          return this.totalFootages === this.loadedFootagesCount;
        }
        function u(c, d) {
          c === "svg" ? (this._elementHelper = d, this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this);
        }
        function P() {
          this._imageLoaded = e.bind(this), this._footageLoaded = r.bind(this), this.testImageLoaded = s.bind(this), this.createFootageData = l.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.totalFootages = 0, this.loadedAssets = 0, this.loadedFootagesCount = 0, this.imagesLoadedCb = null, this.images = [];
        }
        return P.prototype = {
          loadAssets: o,
          setAssetsPath: m,
          setPath: f,
          loadedImages: g,
          loadedFootages: y,
          destroy: h,
          getAsset: b,
          createImgData: a,
          createImageData: n,
          imageLoaded: e,
          footageLoaded: r,
          setCacheType: u
        }, P;
      }();
      function BaseEvent() {
      }
      BaseEvent.prototype = {
        triggerEvent: function(e, r) {
          if (this._cbs[e])
            for (var i = this._cbs[e], s = 0; s < i.length; s += 1)
              i[s](r);
        },
        addEventListener: function(e, r) {
          return this._cbs[e] || (this._cbs[e] = []), this._cbs[e].push(r), (function() {
            this.removeEventListener(e, r);
          }).bind(this);
        },
        removeEventListener: function(e, r) {
          if (!r)
            this._cbs[e] = null;
          else if (this._cbs[e]) {
            for (var i = 0, s = this._cbs[e].length; i < s; )
              this._cbs[e][i] === r && (this._cbs[e].splice(i, 1), i -= 1, s -= 1), i += 1;
            this._cbs[e].length || (this._cbs[e] = null);
          }
        }
      };
      var markerParser = /* @__PURE__ */ function() {
        function t(e) {
          for (var r = e.split(`\r
`), i = {}, s, n = 0, a = 0; a < r.length; a += 1)
            s = r[a].split(":"), s.length === 2 && (i[s[0]] = s[1].trim(), n += 1);
          if (n === 0)
            throw new Error();
          return i;
        }
        return function(e) {
          for (var r = [], i = 0; i < e.length; i += 1) {
            var s = e[i], n = {
              time: s.tm,
              duration: s.dr
            };
            try {
              n.payload = JSON.parse(e[i].cm);
            } catch {
              try {
                n.payload = t(e[i].cm);
              } catch {
                n.payload = {
                  name: e[i].cm
                };
              }
            }
            r.push(n);
          }
          return r;
        };
      }(), ProjectInterface = /* @__PURE__ */ function() {
        function t(e) {
          this.compositions.push(e);
        }
        return function() {
          function e(r) {
            for (var i = 0, s = this.compositions.length; i < s; ) {
              if (this.compositions[i].data && this.compositions[i].data.nm === r)
                return this.compositions[i].prepareFrame && this.compositions[i].data.xt && this.compositions[i].prepareFrame(this.currentFrame), this.compositions[i].compInterface;
              i += 1;
            }
            return null;
          }
          return e.compositions = [], e.currentFrame = 0, e.registerComposition = t, e;
        };
      }(), renderers = {}, registerRenderer = function(e, r) {
        renderers[e] = r;
      };
      function getRenderer(t) {
        return renderers[t];
      }
      function getRegisteredRenderer() {
        if (renderers.canvas)
          return "canvas";
        for (var t in renderers)
          if (renderers[t])
            return t;
        return "";
      }
      function _typeof$4(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$4 = function(r) {
          return typeof r;
        } : _typeof$4 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$4(t);
      }
      var AnimationItem = function() {
        this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = getSubframeEnabled(), this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader(), this.audioController = audioControllerFactory(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this), this.drawnFrameEvent = new BMEnterFrameEvent("drawnFrame", 0, 0, 0), this.expressionsPlugin = getExpressionsPlugin();
      };
      extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function(t) {
        (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
        var e = "svg";
        t.animType ? e = t.animType : t.renderer && (e = t.renderer);
        var r = getRenderer(e);
        this.renderer = new r(this, t.rendererSettings), this.imagePreloader.setCacheType(e, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = e, t.loop === "" || t.loop === null || t.loop === void 0 || t.loop === !0 ? this.loop = !0 : t.loop === !1 ? this.loop = !1 : this.loop = parseInt(t.loop, 10), this.autoplay = "autoplay" in t ? t.autoplay : !0, this.name = t.name ? t.name : "", this.autoloadSegments = Object.prototype.hasOwnProperty.call(t, "autoloadSegments") ? t.autoloadSegments : !0, this.assetsPath = t.assetsPath, this.initialSegment = t.initialSegment, t.audioFactory && this.audioController.setAudioFactory(t.audioFactory), t.animationData ? this.setupAnimation(t.animationData) : t.path && (t.path.lastIndexOf("\\") !== -1 ? this.path = t.path.substr(0, t.path.lastIndexOf("\\") + 1) : this.path = t.path.substr(0, t.path.lastIndexOf("/") + 1), this.fileName = t.path.substr(t.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), dataManager.loadAnimation(t.path, this.configAnimation, this.onSetupError));
      }, AnimationItem.prototype.onSetupError = function() {
        this.trigger("data_failed");
      }, AnimationItem.prototype.setupAnimation = function(t) {
        dataManager.completeAnimation(t, this.configAnimation);
      }, AnimationItem.prototype.setData = function(t, e) {
        e && _typeof$4(e) !== "object" && (e = JSON.parse(e));
        var r = {
          wrapper: t,
          animationData: e
        }, i = t.attributes;
        r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : getRegisteredRenderer() || "canvas";
        var s = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
        s === "false" ? r.loop = !1 : s === "true" ? r.loop = !0 : s !== "" && (r.loop = parseInt(s, 10));
        var n = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : i.getNamedItem("bm-autoplay") ? i.getNamedItem("bm-autoplay").value : !0;
        r.autoplay = n !== "false", r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "";
        var a = i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "";
        a === "false" && (r.prerender = !1), r.path ? this.setParams(r) : this.trigger("destroy");
      }, AnimationItem.prototype.includeLayers = function(t) {
        t.op > this.animationData.op && (this.animationData.op = t.op, this.totalFrames = Math.floor(t.op - this.animationData.ip));
        var e = this.animationData.layers, r, i = e.length, s = t.layers, n, a = s.length;
        for (n = 0; n < a; n += 1)
          for (r = 0; r < i; ) {
            if (e[r].id === s[n].id) {
              e[r] = s[n];
              break;
            }
            r += 1;
          }
        if ((t.chars || t.fonts) && (this.renderer.globalData.fontManager.addChars(t.chars), this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)), t.assets)
          for (i = t.assets.length, r = 0; r < i; r += 1)
            this.animationData.assets.push(t.assets[r]);
        this.animationData.__complete = !1, dataManager.completeAnimation(this.animationData, this.onSegmentComplete);
      }, AnimationItem.prototype.onSegmentComplete = function(t) {
        this.animationData = t;
        var e = getExpressionsPlugin();
        e && e.initExpressions(this), this.loadNextSegment();
      }, AnimationItem.prototype.loadNextSegment = function() {
        var t = this.animationData.segments;
        if (!t || t.length === 0 || !this.autoloadSegments) {
          this.trigger("data_ready"), this.timeCompleted = this.totalFrames;
          return;
        }
        var e = t.shift();
        this.timeCompleted = e.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, dataManager.loadData(r, this.includeLayers.bind(this), (function() {
          this.trigger("data_failed");
        }).bind(this));
      }, AnimationItem.prototype.loadSegments = function() {
        var t = this.animationData.segments;
        t || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }, AnimationItem.prototype.imagesLoaded = function() {
        this.trigger("loaded_images"), this.checkLoaded();
      }, AnimationItem.prototype.preloadImages = function() {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }, AnimationItem.prototype.configAnimation = function(t) {
        if (this.renderer)
          try {
            this.animationData = t, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(t), t.assets || (t.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(t.assets), this.markers = markerParser(t.markers || []), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause();
          } catch (e) {
            this.triggerConfigError(e);
          }
      }, AnimationItem.prototype.waitForFontsLoaded = function() {
        this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }, AnimationItem.prototype.checkLoaded = function() {
        if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || this.renderer.rendererType !== "canvas") && this.imagePreloader.loadedFootages()) {
          this.isLoaded = !0;
          var t = getExpressionsPlugin();
          t && t.initExpressions(this), this.renderer.initItems(), setTimeout((function() {
            this.trigger("DOMLoaded");
          }).bind(this), 0), this.gotoFrame(), this.autoplay && this.play();
        }
      }, AnimationItem.prototype.resize = function(t, e) {
        var r = typeof t == "number" ? t : void 0, i = typeof e == "number" ? e : void 0;
        this.renderer.updateContainerSize(r, i);
      }, AnimationItem.prototype.setSubframe = function(t) {
        this.isSubframeEnabled = !!t;
      }, AnimationItem.prototype.gotoFrame = function() {
        this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame(), this.trigger("drawnFrame");
      }, AnimationItem.prototype.renderFrame = function() {
        if (!(this.isLoaded === !1 || !this.renderer))
          try {
            this.expressionsPlugin && this.expressionsPlugin.resetFrame(), this.renderer.renderFrame(this.currentFrame + this.firstFrame);
          } catch (t) {
            this.triggerRenderFrameError(t);
          }
      }, AnimationItem.prototype.play = function(t) {
        t && this.name !== t || this.isPaused === !0 && (this.isPaused = !1, this.trigger("_play"), this.audioController.resume(), this._idle && (this._idle = !1, this.trigger("_active")));
      }, AnimationItem.prototype.pause = function(t) {
        t && this.name !== t || this.isPaused === !1 && (this.isPaused = !0, this.trigger("_pause"), this._idle = !0, this.trigger("_idle"), this.audioController.pause());
      }, AnimationItem.prototype.togglePause = function(t) {
        t && this.name !== t || (this.isPaused === !0 ? this.play() : this.pause());
      }, AnimationItem.prototype.stop = function(t) {
        t && this.name !== t || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
      }, AnimationItem.prototype.getMarkerData = function(t) {
        for (var e, r = 0; r < this.markers.length; r += 1)
          if (e = this.markers[r], e.payload && e.payload.name === t)
            return e;
        return null;
      }, AnimationItem.prototype.goToAndStop = function(t, e, r) {
        if (!(r && this.name !== r)) {
          var i = Number(t);
          if (isNaN(i)) {
            var s = this.getMarkerData(t);
            s && this.goToAndStop(s.time, !0);
          } else e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
          this.pause();
        }
      }, AnimationItem.prototype.goToAndPlay = function(t, e, r) {
        if (!(r && this.name !== r)) {
          var i = Number(t);
          if (isNaN(i)) {
            var s = this.getMarkerData(t);
            s && (s.duration ? this.playSegments([s.time, s.time + s.duration], !0) : this.goToAndStop(s.time, !0));
          } else
            this.goToAndStop(i, e, r);
          this.play();
        }
      }, AnimationItem.prototype.advanceTime = function(t) {
        if (!(this.isPaused === !0 || this.isLoaded === !1)) {
          var e = this.currentRawFrame + t * this.frameModifier, r = !1;
          e >= this.totalFrames - 1 && this.frameModifier > 0 ? !this.loop || this.playCount === this.loop ? this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) || (r = !0, e = this.totalFrames - 1) : e >= this.totalFrames ? (this.playCount += 1, this.checkSegments(e % this.totalFrames) || (this.setCurrentRawFrameValue(e % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(e) : e < 0 ? this.checkSegments(e % this.totalFrames) || (this.loop && !(this.playCount-- <= 0 && this.loop !== !0) ? (this.setCurrentRawFrameValue(this.totalFrames + e % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0) : (r = !0, e = 0)) : this.setCurrentRawFrameValue(e), r && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger("complete"));
        }
      }, AnimationItem.prototype.adjustSegment = function(t, e) {
        this.playCount = 0, t[1] < t[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = t[0] - t[1], this.timeCompleted = this.totalFrames, this.firstFrame = t[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - e)) : t[1] > t[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = t[1] - t[0], this.timeCompleted = this.totalFrames, this.firstFrame = t[0], this.setCurrentRawFrameValue(1e-3 + e)), this.trigger("segmentStart");
      }, AnimationItem.prototype.setSegment = function(t, e) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < t ? r = t : this.currentRawFrame + this.firstFrame > e && (r = e - t)), this.firstFrame = t, this.totalFrames = e - t, this.timeCompleted = this.totalFrames, r !== -1 && this.goToAndStop(r, !0);
      }, AnimationItem.prototype.playSegments = function(t, e) {
        if (e && (this.segments.length = 0), _typeof$4(t[0]) === "object") {
          var r, i = t.length;
          for (r = 0; r < i; r += 1)
            this.segments.push(t[r]);
        } else
          this.segments.push(t);
        this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }, AnimationItem.prototype.resetSegments = function(t) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), t && this.checkSegments(0);
      }, AnimationItem.prototype.checkSegments = function(t) {
        return this.segments.length ? (this.adjustSegment(this.segments.shift(), t), !0) : !1;
      }, AnimationItem.prototype.destroy = function(t) {
        t && this.name !== t || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.expressionsPlugin = null, this.imagePreloader = null, this.projectInterface = null);
      }, AnimationItem.prototype.setCurrentRawFrameValue = function(t) {
        this.currentRawFrame = t, this.gotoFrame();
      }, AnimationItem.prototype.setSpeed = function(t) {
        this.playSpeed = t, this.updaFrameModifier();
      }, AnimationItem.prototype.setDirection = function(t) {
        this.playDirection = t < 0 ? -1 : 1, this.updaFrameModifier();
      }, AnimationItem.prototype.setLoop = function(t) {
        this.loop = t;
      }, AnimationItem.prototype.setVolume = function(t, e) {
        e && this.name !== e || this.audioController.setVolume(t);
      }, AnimationItem.prototype.getVolume = function() {
        return this.audioController.getVolume();
      }, AnimationItem.prototype.mute = function(t) {
        t && this.name !== t || this.audioController.mute();
      }, AnimationItem.prototype.unmute = function(t) {
        t && this.name !== t || this.audioController.unmute();
      }, AnimationItem.prototype.updaFrameModifier = function() {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection);
      }, AnimationItem.prototype.getPath = function() {
        return this.path;
      }, AnimationItem.prototype.getAssetsPath = function(t) {
        var e = "";
        if (t.e)
          e = t.p;
        else if (this.assetsPath) {
          var r = t.p;
          r.indexOf("images/") !== -1 && (r = r.split("/")[1]), e = this.assetsPath + r;
        } else
          e = this.path, e += t.u ? t.u : "", e += t.p;
        return e;
      }, AnimationItem.prototype.getAssetData = function(t) {
        for (var e = 0, r = this.assets.length; e < r; ) {
          if (t === this.assets[e].id)
            return this.assets[e];
          e += 1;
        }
        return null;
      }, AnimationItem.prototype.hide = function() {
        this.renderer.hide();
      }, AnimationItem.prototype.show = function() {
        this.renderer.show();
      }, AnimationItem.prototype.getDuration = function(t) {
        return t ? this.totalFrames : this.totalFrames / this.frameRate;
      }, AnimationItem.prototype.updateDocumentData = function(t, e, r) {
        try {
          var i = this.renderer.getElementByPath(t);
          i.updateDocumentData(e, r);
        } catch {
        }
      }, AnimationItem.prototype.trigger = function(t) {
        if (this._cbs && this._cbs[t])
          switch (t) {
            case "enterFrame":
              this.triggerEvent(t, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier));
              break;
            case "drawnFrame":
              this.drawnFrameEvent.currentTime = this.currentFrame, this.drawnFrameEvent.totalTime = this.totalFrames, this.drawnFrameEvent.direction = this.frameModifier, this.triggerEvent(t, this.drawnFrameEvent);
              break;
            case "loopComplete":
              this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
              break;
            case "complete":
              this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
              break;
            case "segmentStart":
              this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
              break;
            case "destroy":
              this.triggerEvent(t, new BMDestroyEvent(t, this));
              break;
            default:
              this.triggerEvent(t);
          }
        t === "enterFrame" && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult)), t === "loopComplete" && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)), t === "complete" && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)), t === "segmentStart" && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)), t === "destroy" && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
      }, AnimationItem.prototype.triggerRenderFrameError = function(t) {
        var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      }, AnimationItem.prototype.triggerConfigError = function(t) {
        var e = new BMConfigErrorEvent(t, this.currentFrame);
        this.triggerEvent("error", e), this.onError && this.onError.call(this, e);
      };
      var animationManager = function() {
        var t = {}, e = [], r = 0, i = 0, s = 0, n = !0, a = !1;
        function l(C) {
          for (var M = 0, E = C.target; M < i; )
            e[M].animation === E && (e.splice(M, 1), M -= 1, i -= 1, E.isPaused || b()), M += 1;
        }
        function o(C, M) {
          if (!C)
            return null;
          for (var E = 0; E < i; ) {
            if (e[E].elem === C && e[E].elem !== null)
              return e[E].animation;
            E += 1;
          }
          var x = new AnimationItem();
          return h(x, C), x.setData(C, M), x;
        }
        function f() {
          var C, M = e.length, E = [];
          for (C = 0; C < M; C += 1)
            E.push(e[C].animation);
          return E;
        }
        function m() {
          s += 1, V();
        }
        function b() {
          s -= 1;
        }
        function h(C, M) {
          C.addEventListener("destroy", l), C.addEventListener("_active", m), C.addEventListener("_idle", b), e.push({
            elem: M,
            animation: C
          }), i += 1;
        }
        function g(C) {
          var M = new AnimationItem();
          return h(M, null), M.setParams(C), M;
        }
        function y(C, M) {
          var E;
          for (E = 0; E < i; E += 1)
            e[E].animation.setSpeed(C, M);
        }
        function u(C, M) {
          var E;
          for (E = 0; E < i; E += 1)
            e[E].animation.setDirection(C, M);
        }
        function P(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.play(C);
        }
        function c(C) {
          var M = C - r, E;
          for (E = 0; E < i; E += 1)
            e[E].animation.advanceTime(M);
          r = C, s && !a ? window.requestAnimationFrame(c) : n = !0;
        }
        function d(C) {
          r = C, window.requestAnimationFrame(c);
        }
        function p(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.pause(C);
        }
        function v(C, M, E) {
          var x;
          for (x = 0; x < i; x += 1)
            e[x].animation.goToAndStop(C, M, E);
        }
        function S(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.stop(C);
        }
        function _(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.togglePause(C);
        }
        function A(C) {
          var M;
          for (M = i - 1; M >= 0; M -= 1)
            e[M].animation.destroy(C);
        }
        function T(C, M, E) {
          var x = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), F, k = x.length;
          for (F = 0; F < k; F += 1)
            E && x[F].setAttribute("data-bm-type", E), o(x[F], C);
          if (M && k === 0) {
            E || (E = "svg");
            var B = document.getElementsByTagName("body")[0];
            B.innerText = "";
            var j = createTag("div");
            j.style.width = "100%", j.style.height = "100%", j.setAttribute("data-bm-type", E), B.appendChild(j), o(j, C);
          }
        }
        function w() {
          var C;
          for (C = 0; C < i; C += 1)
            e[C].animation.resize();
        }
        function V() {
          !a && s && n && (window.requestAnimationFrame(d), n = !1);
        }
        function D() {
          a = !0;
        }
        function I() {
          a = !1, V();
        }
        function R(C, M) {
          var E;
          for (E = 0; E < i; E += 1)
            e[E].animation.setVolume(C, M);
        }
        function O(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.mute(C);
        }
        function L(C) {
          var M;
          for (M = 0; M < i; M += 1)
            e[M].animation.unmute(C);
        }
        return t.registerAnimation = o, t.loadAnimation = g, t.setSpeed = y, t.setDirection = u, t.play = P, t.pause = p, t.stop = S, t.togglePause = _, t.searchAnimations = T, t.resize = w, t.goToAndStop = v, t.destroy = A, t.freeze = D, t.unfreeze = I, t.setVolume = R, t.mute = O, t.unmute = L, t.getRegisteredAnimations = f, t;
      }(), BezierFactory = function() {
        var t = {};
        t.getBezierEasing = r;
        var e = {};
        function r(d, p, v, S, _) {
          var A = _ || ("bez_" + d + "_" + p + "_" + v + "_" + S).replace(/\./g, "p");
          if (e[A])
            return e[A];
          var T = new c([d, p, v, S]);
          return e[A] = T, T;
        }
        var i = 4, s = 1e-3, n = 1e-7, a = 10, l = 11, o = 1 / (l - 1), f = typeof Float32Array == "function";
        function m(d, p) {
          return 1 - 3 * p + 3 * d;
        }
        function b(d, p) {
          return 3 * p - 6 * d;
        }
        function h(d) {
          return 3 * d;
        }
        function g(d, p, v) {
          return ((m(p, v) * d + b(p, v)) * d + h(p)) * d;
        }
        function y(d, p, v) {
          return 3 * m(p, v) * d * d + 2 * b(p, v) * d + h(p);
        }
        function u(d, p, v, S, _) {
          var A, T, w = 0;
          do
            T = p + (v - p) / 2, A = g(T, S, _) - d, A > 0 ? v = T : p = T;
          while (Math.abs(A) > n && ++w < a);
          return T;
        }
        function P(d, p, v, S) {
          for (var _ = 0; _ < i; ++_) {
            var A = y(p, v, S);
            if (A === 0) return p;
            var T = g(p, v, S) - d;
            p -= T / A;
          }
          return p;
        }
        function c(d) {
          this._p = d, this._mSampleValues = f ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this);
        }
        return c.prototype = {
          get: function(p) {
            var v = this._p[0], S = this._p[1], _ = this._p[2], A = this._p[3];
            return this._precomputed || this._precompute(), v === S && _ === A ? p : p === 0 ? 0 : p === 1 ? 1 : g(this._getTForX(p), S, A);
          },
          // Private part
          _precompute: function() {
            var p = this._p[0], v = this._p[1], S = this._p[2], _ = this._p[3];
            this._precomputed = !0, (p !== v || S !== _) && this._calcSampleValues();
          },
          _calcSampleValues: function() {
            for (var p = this._p[0], v = this._p[2], S = 0; S < l; ++S)
              this._mSampleValues[S] = g(S * o, p, v);
          },
          /**
               * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
               */
          _getTForX: function(p) {
            for (var v = this._p[0], S = this._p[2], _ = this._mSampleValues, A = 0, T = 1, w = l - 1; T !== w && _[T] <= p; ++T)
              A += o;
            --T;
            var V = (p - _[T]) / (_[T + 1] - _[T]), D = A + V * o, I = y(D, v, S);
            return I >= s ? P(p, D, v, S) : I === 0 ? D : u(p, A, A + o, v, S);
          }
        }, t;
      }(), pooling = /* @__PURE__ */ function() {
        function t(e) {
          return e.concat(createSizedArray(e.length));
        }
        return {
          double: t
        };
      }(), poolFactory = /* @__PURE__ */ function() {
        return function(t, e, r) {
          var i = 0, s = t, n = createSizedArray(s), a = {
            newElement: l,
            release: o
          };
          function l() {
            var f;
            return i ? (i -= 1, f = n[i]) : f = e(), f;
          }
          function o(f) {
            i === s && (n = pooling.double(n), s *= 2), r && r(f), n[i] = f, i += 1;
          }
          return a;
        };
      }(), bezierLengthPool = function() {
        function t() {
          return {
            addedLength: 0,
            percents: createTypedArray("float32", getDefaultCurveSegments()),
            lengths: createTypedArray("float32", getDefaultCurveSegments())
          };
        }
        return poolFactory(8, t);
      }(), segmentsLengthPool = function() {
        function t() {
          return {
            lengths: [],
            totalLength: 0
          };
        }
        function e(r) {
          var i, s = r.lengths.length;
          for (i = 0; i < s; i += 1)
            bezierLengthPool.release(r.lengths[i]);
          r.lengths.length = 0;
        }
        return poolFactory(8, t, e);
      }();
      function bezFunction() {
        var t = Math;
        function e(h, g, y, u, P, c) {
          var d = h * u + g * P + y * c - P * u - c * h - y * g;
          return d > -1e-3 && d < 1e-3;
        }
        function r(h, g, y, u, P, c, d, p, v) {
          if (y === 0 && c === 0 && v === 0)
            return e(h, g, u, P, d, p);
          var S = t.sqrt(t.pow(u - h, 2) + t.pow(P - g, 2) + t.pow(c - y, 2)), _ = t.sqrt(t.pow(d - h, 2) + t.pow(p - g, 2) + t.pow(v - y, 2)), A = t.sqrt(t.pow(d - u, 2) + t.pow(p - P, 2) + t.pow(v - c, 2)), T;
          return S > _ ? S > A ? T = S - _ - A : T = A - _ - S : A > _ ? T = A - _ - S : T = _ - S - A, T > -1e-4 && T < 1e-4;
        }
        var i = /* @__PURE__ */ function() {
          return function(h, g, y, u) {
            var P = getDefaultCurveSegments(), c, d, p, v, S, _ = 0, A, T = [], w = [], V = bezierLengthPool.newElement();
            for (p = y.length, c = 0; c < P; c += 1) {
              for (S = c / (P - 1), A = 0, d = 0; d < p; d += 1)
                v = bmPow(1 - S, 3) * h[d] + 3 * bmPow(1 - S, 2) * S * y[d] + 3 * (1 - S) * bmPow(S, 2) * u[d] + bmPow(S, 3) * g[d], T[d] = v, w[d] !== null && (A += bmPow(T[d] - w[d], 2)), w[d] = T[d];
              A && (A = bmSqrt(A), _ += A), V.percents[c] = S, V.lengths[c] = _;
            }
            return V.addedLength = _, V;
          };
        }();
        function s(h) {
          var g = segmentsLengthPool.newElement(), y = h.c, u = h.v, P = h.o, c = h.i, d, p = h._length, v = g.lengths, S = 0;
          for (d = 0; d < p - 1; d += 1)
            v[d] = i(u[d], u[d + 1], P[d], c[d + 1]), S += v[d].addedLength;
          return y && p && (v[d] = i(u[d], u[0], P[d], c[0]), S += v[d].addedLength), g.totalLength = S, g;
        }
        function n(h) {
          this.segmentLength = 0, this.points = new Array(h);
        }
        function a(h, g) {
          this.partialLength = h, this.point = g;
        }
        var l = /* @__PURE__ */ function() {
          var h = {};
          return function(g, y, u, P) {
            var c = (g[0] + "_" + g[1] + "_" + y[0] + "_" + y[1] + "_" + u[0] + "_" + u[1] + "_" + P[0] + "_" + P[1]).replace(/\./g, "p");
            if (!h[c]) {
              var d = getDefaultCurveSegments(), p, v, S, _, A, T = 0, w, V, D = null;
              g.length === 2 && (g[0] !== y[0] || g[1] !== y[1]) && e(g[0], g[1], y[0], y[1], g[0] + u[0], g[1] + u[1]) && e(g[0], g[1], y[0], y[1], y[0] + P[0], y[1] + P[1]) && (d = 2);
              var I = new n(d);
              for (S = u.length, p = 0; p < d; p += 1) {
                for (V = createSizedArray(S), A = p / (d - 1), w = 0, v = 0; v < S; v += 1)
                  _ = bmPow(1 - A, 3) * g[v] + 3 * bmPow(1 - A, 2) * A * (g[v] + u[v]) + 3 * (1 - A) * bmPow(A, 2) * (y[v] + P[v]) + bmPow(A, 3) * y[v], V[v] = _, D !== null && (w += bmPow(V[v] - D[v], 2));
                w = bmSqrt(w), T += w, I.points[p] = new a(w, V), D = V;
              }
              I.segmentLength = T, h[c] = I;
            }
            return h[c];
          };
        }();
        function o(h, g) {
          var y = g.percents, u = g.lengths, P = y.length, c = bmFloor((P - 1) * h), d = h * g.addedLength, p = 0;
          if (c === P - 1 || c === 0 || d === u[c])
            return y[c];
          for (var v = u[c] > d ? -1 : 1, S = !0; S; )
            if (u[c] <= d && u[c + 1] > d ? (p = (d - u[c]) / (u[c + 1] - u[c]), S = !1) : c += v, c < 0 || c >= P - 1) {
              if (c === P - 1)
                return y[c];
              S = !1;
            }
          return y[c] + (y[c + 1] - y[c]) * p;
        }
        function f(h, g, y, u, P, c) {
          var d = o(P, c), p = 1 - d, v = t.round((p * p * p * h[0] + (d * p * p + p * d * p + p * p * d) * y[0] + (d * d * p + p * d * d + d * p * d) * u[0] + d * d * d * g[0]) * 1e3) / 1e3, S = t.round((p * p * p * h[1] + (d * p * p + p * d * p + p * p * d) * y[1] + (d * d * p + p * d * d + d * p * d) * u[1] + d * d * d * g[1]) * 1e3) / 1e3;
          return [v, S];
        }
        var m = createTypedArray("float32", 8);
        function b(h, g, y, u, P, c, d) {
          P < 0 ? P = 0 : P > 1 && (P = 1);
          var p = o(P, d);
          c = c > 1 ? 1 : c;
          var v = o(c, d), S, _ = h.length, A = 1 - p, T = 1 - v, w = A * A * A, V = p * A * A * 3, D = p * p * A * 3, I = p * p * p, R = A * A * T, O = p * A * T + A * p * T + A * A * v, L = p * p * T + A * p * v + p * A * v, C = p * p * v, M = A * T * T, E = p * T * T + A * v * T + A * T * v, x = p * v * T + A * v * v + p * T * v, F = p * v * v, k = T * T * T, B = v * T * T + T * v * T + T * T * v, j = v * v * T + T * v * v + v * T * v, G = v * v * v;
          for (S = 0; S < _; S += 1)
            m[S * 4] = t.round((w * h[S] + V * y[S] + D * u[S] + I * g[S]) * 1e3) / 1e3, m[S * 4 + 1] = t.round((R * h[S] + O * y[S] + L * u[S] + C * g[S]) * 1e3) / 1e3, m[S * 4 + 2] = t.round((M * h[S] + E * y[S] + x * u[S] + F * g[S]) * 1e3) / 1e3, m[S * 4 + 3] = t.round((k * h[S] + B * y[S] + j * u[S] + G * g[S]) * 1e3) / 1e3;
          return m;
        }
        return {
          getSegmentsLength: s,
          getNewSegment: b,
          getPointInSegment: f,
          buildBezierData: l,
          pointOnLine2D: e,
          pointOnLine3D: r
        };
      }
      var bez = bezFunction(), initFrame = initialDefaultFrame, mathAbs = Math.abs;
      function interpolateValue(t, e) {
        var r = this.offsetTime, i;
        this.propType === "multidimensional" && (i = createTypedArray("float32", this.pv.length));
        for (var s = e.lastIndex, n = s, a = this.keyframes.length - 1, l = !0, o, f, m; l; ) {
          if (o = this.keyframes[n], f = this.keyframes[n + 1], n === a - 1 && t >= f.t - r) {
            o.h && (o = f), s = 0;
            break;
          }
          if (f.t - r > t) {
            s = n;
            break;
          }
          n < a - 1 ? n += 1 : (s = 0, l = !1);
        }
        m = this.keyframesMetadata[n] || {};
        var b, h, g, y, u, P, c = f.t - r, d = o.t - r, p;
        if (o.to) {
          m.bezierData || (m.bezierData = bez.buildBezierData(o.s, f.s || o.e, o.to, o.ti));
          var v = m.bezierData;
          if (t >= c || t < d) {
            var S = t >= c ? v.points.length - 1 : 0;
            for (h = v.points[S].point.length, b = 0; b < h; b += 1)
              i[b] = v.points[S].point[b];
          } else {
            m.__fnct ? P = m.__fnct : (P = BezierFactory.getBezierEasing(o.o.x, o.o.y, o.i.x, o.i.y, o.n).get, m.__fnct = P), g = P((t - d) / (c - d));
            var _ = v.segmentLength * g, A, T = e.lastFrame < t && e._lastKeyframeIndex === n ? e._lastAddedLength : 0;
            for (u = e.lastFrame < t && e._lastKeyframeIndex === n ? e._lastPoint : 0, l = !0, y = v.points.length; l; ) {
              if (T += v.points[u].partialLength, _ === 0 || g === 0 || u === v.points.length - 1) {
                for (h = v.points[u].point.length, b = 0; b < h; b += 1)
                  i[b] = v.points[u].point[b];
                break;
              } else if (_ >= T && _ < T + v.points[u + 1].partialLength) {
                for (A = (_ - T) / v.points[u + 1].partialLength, h = v.points[u].point.length, b = 0; b < h; b += 1)
                  i[b] = v.points[u].point[b] + (v.points[u + 1].point[b] - v.points[u].point[b]) * A;
                break;
              }
              u < y - 1 ? u += 1 : l = !1;
            }
            e._lastPoint = u, e._lastAddedLength = T - v.points[u].partialLength, e._lastKeyframeIndex = n;
          }
        } else {
          var w, V, D, I, R;
          if (a = o.s.length, p = f.s || o.e, this.sh && o.h !== 1)
            if (t >= c)
              i[0] = p[0], i[1] = p[1], i[2] = p[2];
            else if (t <= d)
              i[0] = o.s[0], i[1] = o.s[1], i[2] = o.s[2];
            else {
              var O = createQuaternion(o.s), L = createQuaternion(p), C = (t - d) / (c - d);
              quaternionToEuler(i, slerp(O, L, C));
            }
          else
            for (n = 0; n < a; n += 1)
              o.h !== 1 && (t >= c ? g = 1 : t < d ? g = 0 : (o.o.x.constructor === Array ? (m.__fnct || (m.__fnct = []), m.__fnct[n] ? P = m.__fnct[n] : (w = o.o.x[n] === void 0 ? o.o.x[0] : o.o.x[n], V = o.o.y[n] === void 0 ? o.o.y[0] : o.o.y[n], D = o.i.x[n] === void 0 ? o.i.x[0] : o.i.x[n], I = o.i.y[n] === void 0 ? o.i.y[0] : o.i.y[n], P = BezierFactory.getBezierEasing(w, V, D, I).get, m.__fnct[n] = P)) : m.__fnct ? P = m.__fnct : (w = o.o.x, V = o.o.y, D = o.i.x, I = o.i.y, P = BezierFactory.getBezierEasing(w, V, D, I).get, o.keyframeMetadata = P), g = P((t - d) / (c - d)))), p = f.s || o.e, R = o.h === 1 ? o.s[n] : o.s[n] + (p[n] - o.s[n]) * g, this.propType === "multidimensional" ? i[n] = R : i = R;
        }
        return e.lastIndex = s, i;
      }
      function slerp(t, e, r) {
        var i = [], s = t[0], n = t[1], a = t[2], l = t[3], o = e[0], f = e[1], m = e[2], b = e[3], h, g, y, u, P;
        return g = s * o + n * f + a * m + l * b, g < 0 && (g = -g, o = -o, f = -f, m = -m, b = -b), 1 - g > 1e-6 ? (h = Math.acos(g), y = Math.sin(h), u = Math.sin((1 - r) * h) / y, P = Math.sin(r * h) / y) : (u = 1 - r, P = r), i[0] = u * s + P * o, i[1] = u * n + P * f, i[2] = u * a + P * m, i[3] = u * l + P * b, i;
      }
      function quaternionToEuler(t, e) {
        var r = e[0], i = e[1], s = e[2], n = e[3], a = Math.atan2(2 * i * n - 2 * r * s, 1 - 2 * i * i - 2 * s * s), l = Math.asin(2 * r * i + 2 * s * n), o = Math.atan2(2 * r * n - 2 * i * s, 1 - 2 * r * r - 2 * s * s);
        t[0] = a / degToRads, t[1] = l / degToRads, t[2] = o / degToRads;
      }
      function createQuaternion(t) {
        var e = t[0] * degToRads, r = t[1] * degToRads, i = t[2] * degToRads, s = Math.cos(e / 2), n = Math.cos(r / 2), a = Math.cos(i / 2), l = Math.sin(e / 2), o = Math.sin(r / 2), f = Math.sin(i / 2), m = s * n * a - l * o * f, b = l * o * a + s * n * f, h = l * n * a + s * o * f, g = s * o * a - l * n * f;
        return [b, h, g, m];
      }
      function getValueAtCurrentTime() {
        var t = this.comp.renderedFrame - this.offsetTime, e = this.keyframes[0].t - this.offsetTime, r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
        if (!(t === this._caching.lastFrame || this._caching.lastFrame !== initFrame && (this._caching.lastFrame >= r && t >= r || this._caching.lastFrame < e && t < e))) {
          this._caching.lastFrame >= t && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
          var i = this.interpolateValue(t, this._caching);
          this.pv = i;
        }
        return this._caching.lastFrame = t, this.pv;
      }
      function setVValue(t) {
        var e;
        if (this.propType === "unidimensional")
          e = t * this.mult, mathAbs(this.v - e) > 1e-5 && (this.v = e, this._mdf = !0);
        else
          for (var r = 0, i = this.v.length; r < i; )
            e = t[r] * this.mult, mathAbs(this.v[r] - e) > 1e-5 && (this.v[r] = e, this._mdf = !0), r += 1;
      }
      function processEffectsSequence() {
        if (!(this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length)) {
          if (this.lock) {
            this.setVValue(this.pv);
            return;
          }
          this.lock = !0, this._mdf = this._isFirstFrame;
          var t, e = this.effectsSequence.length, r = this.kf ? this.pv : this.data.k;
          for (t = 0; t < e; t += 1)
            r = this.effectsSequence[t](r);
          this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
        }
      }
      function addEffect(t) {
        this.effectsSequence.push(t), this.container.addDynamicProperty(this);
      }
      function ValueProperty(t, e, r, i) {
        this.propType = "unidimensional", this.mult = r || 1, this.data = e, this.v = r ? e.k * r : e.k, this.pv = e.k, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.addEffect = addEffect;
      }
      function MultiDimensionalProperty(t, e, r, i) {
        this.propType = "multidimensional", this.mult = r || 1, this.data = e, this._mdf = !1, this.elem = t, this.container = i, this.comp = t.comp, this.k = !1, this.kf = !1, this.frameId = -1;
        var s, n = e.k.length;
        for (this.v = createTypedArray("float32", n), this.pv = createTypedArray("float32", n), this.vel = createTypedArray("float32", n), s = 0; s < n; s += 1)
          this.v[s] = e.k[s] * this.mult, this.pv[s] = e.k[s];
        this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = processEffectsSequence, this.setVValue = setVValue, this.addEffect = addEffect;
      }
      function KeyframedValueProperty(t, e, r, i) {
        this.propType = "unidimensional", this.keyframes = e.k, this.keyframesMetadata = [], this.offsetTime = t.data.st, this.frameId = -1, this._caching = {
          lastFrame: initFrame,
          lastIndex: 0,
          value: 0,
          _lastKeyframeIndex: -1
        }, this.k = !0, this.kf = !0, this.data = e, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.v = initFrame, this.pv = initFrame, this._isFirstFrame = !0, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.interpolateValue = interpolateValue, this.effectsSequence = [getValueAtCurrentTime.bind(this)], this.addEffect = addEffect;
      }
      function KeyframedMultidimensionalProperty(t, e, r, i) {
        this.propType = "multidimensional";
        var s, n = e.k.length, a, l, o, f;
        for (s = 0; s < n - 1; s += 1)
          e.k[s].to && e.k[s].s && e.k[s + 1] && e.k[s + 1].s && (a = e.k[s].s, l = e.k[s + 1].s, o = e.k[s].to, f = e.k[s].ti, (a.length === 2 && !(a[0] === l[0] && a[1] === l[1]) && bez.pointOnLine2D(a[0], a[1], l[0], l[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], l[0], l[1], l[0] + f[0], l[1] + f[1]) || a.length === 3 && !(a[0] === l[0] && a[1] === l[1] && a[2] === l[2]) && bez.pointOnLine3D(a[0], a[1], a[2], l[0], l[1], l[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], l[0], l[1], l[2], l[0] + f[0], l[1] + f[1], l[2] + f[2])) && (e.k[s].to = null, e.k[s].ti = null), a[0] === l[0] && a[1] === l[1] && o[0] === 0 && o[1] === 0 && f[0] === 0 && f[1] === 0 && (a.length === 2 || a[2] === l[2] && o[2] === 0 && f[2] === 0) && (e.k[s].to = null, e.k[s].ti = null));
        this.effectsSequence = [getValueAtCurrentTime.bind(this)], this.data = e, this.keyframes = e.k, this.keyframesMetadata = [], this.offsetTime = t.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = r || 1, this.elem = t, this.container = i, this.comp = t.comp, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.interpolateValue = interpolateValue, this.frameId = -1;
        var m = e.k[0].s.length;
        for (this.v = createTypedArray("float32", m), this.pv = createTypedArray("float32", m), s = 0; s < m; s += 1)
          this.v[s] = initFrame, this.pv[s] = initFrame;
        this._caching = {
          lastFrame: initFrame,
          lastIndex: 0,
          value: createTypedArray("float32", m)
        }, this.addEffect = addEffect;
      }
      var PropertyFactory = /* @__PURE__ */ function() {
        function t(r, i, s, n, a) {
          i.sid && (i = r.globalData.slotManager.getProp(i));
          var l;
          if (!i.k.length)
            l = new ValueProperty(r, i, n, a);
          else if (typeof i.k[0] == "number")
            l = new MultiDimensionalProperty(r, i, n, a);
          else
            switch (s) {
              case 0:
                l = new KeyframedValueProperty(r, i, n, a);
                break;
              case 1:
                l = new KeyframedMultidimensionalProperty(r, i, n, a);
                break;
            }
          return l.effectsSequence.length && a.addDynamicProperty(l), l;
        }
        var e = {
          getProp: t
        };
        return e;
      }();
      function DynamicPropertyContainer() {
      }
      DynamicPropertyContainer.prototype = {
        addDynamicProperty: function(e) {
          this.dynamicProperties.indexOf(e) === -1 && (this.dynamicProperties.push(e), this.container.addDynamicProperty(this), this._isAnimated = !0);
        },
        iterateDynamicProperties: function() {
          this._mdf = !1;
          var e, r = this.dynamicProperties.length;
          for (e = 0; e < r; e += 1)
            this.dynamicProperties[e].getValue(), this.dynamicProperties[e]._mdf && (this._mdf = !0);
        },
        initDynamicPropertyContainer: function(e) {
          this.container = e, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
        }
      };
      var pointPool = function() {
        function t() {
          return createTypedArray("float32", 2);
        }
        return poolFactory(8, t);
      }();
      function ShapePath() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
      }
      ShapePath.prototype.setPathData = function(t, e) {
        this.c = t, this.setLength(e);
        for (var r = 0; r < e; )
          this.v[r] = pointPool.newElement(), this.o[r] = pointPool.newElement(), this.i[r] = pointPool.newElement(), r += 1;
      }, ShapePath.prototype.setLength = function(t) {
        for (; this._maxLength < t; )
          this.doubleArrayLength();
        this._length = t;
      }, ShapePath.prototype.doubleArrayLength = function() {
        this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
      }, ShapePath.prototype.setXYAt = function(t, e, r, i, s) {
        var n;
        switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
          case "v":
            n = this.v;
            break;
          case "i":
            n = this.i;
            break;
          case "o":
            n = this.o;
            break;
          default:
            n = [];
            break;
        }
        (!n[i] || n[i] && !s) && (n[i] = pointPool.newElement()), n[i][0] = t, n[i][1] = e;
      }, ShapePath.prototype.setTripleAt = function(t, e, r, i, s, n, a, l) {
        this.setXYAt(t, e, "v", a, l), this.setXYAt(r, i, "o", a, l), this.setXYAt(s, n, "i", a, l);
      }, ShapePath.prototype.reverse = function() {
        var t = new ShapePath();
        t.setPathData(this.c, this._length);
        var e = this.v, r = this.o, i = this.i, s = 0;
        this.c && (t.setTripleAt(e[0][0], e[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), s = 1);
        var n = this._length - 1, a = this._length, l;
        for (l = s; l < a; l += 1)
          t.setTripleAt(e[n][0], e[n][1], i[n][0], i[n][1], r[n][0], r[n][1], l, !1), n -= 1;
        return t;
      }, ShapePath.prototype.length = function() {
        return this._length;
      };
      var shapePool = function() {
        function t() {
          return new ShapePath();
        }
        function e(s) {
          var n = s._length, a;
          for (a = 0; a < n; a += 1)
            pointPool.release(s.v[a]), pointPool.release(s.i[a]), pointPool.release(s.o[a]), s.v[a] = null, s.i[a] = null, s.o[a] = null;
          s._length = 0, s.c = !1;
        }
        function r(s) {
          var n = i.newElement(), a, l = s._length === void 0 ? s.v.length : s._length;
          for (n.setLength(l), n.c = s.c, a = 0; a < l; a += 1)
            n.setTripleAt(s.v[a][0], s.v[a][1], s.o[a][0], s.o[a][1], s.i[a][0], s.i[a][1], a);
          return n;
        }
        var i = poolFactory(4, t, e);
        return i.clone = r, i;
      }();
      function ShapeCollection() {
        this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
      }
      ShapeCollection.prototype.addShape = function(t) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = t, this._length += 1;
      }, ShapeCollection.prototype.releaseShapes = function() {
        var t;
        for (t = 0; t < this._length; t += 1)
          shapePool.release(this.shapes[t]);
        this._length = 0;
      };
      var shapeCollectionPool = function() {
        var t = {
          newShapeCollection: s,
          release: n
        }, e = 0, r = 4, i = createSizedArray(r);
        function s() {
          var a;
          return e ? (e -= 1, a = i[e]) : a = new ShapeCollection(), a;
        }
        function n(a) {
          var l, o = a._length;
          for (l = 0; l < o; l += 1)
            shapePool.release(a.shapes[l]);
          a._length = 0, e === r && (i = pooling.double(i), r *= 2), i[e] = a, e += 1;
        }
        return t;
      }(), ShapePropertyFactory = function() {
        var t = -999999;
        function e(c, d, p) {
          var v = p.lastIndex, S, _, A, T, w, V, D, I, R, O = this.keyframes;
          if (c < O[0].t - this.offsetTime)
            S = O[0].s[0], A = !0, v = 0;
          else if (c >= O[O.length - 1].t - this.offsetTime)
            S = O[O.length - 1].s ? O[O.length - 1].s[0] : O[O.length - 2].e[0], A = !0;
          else {
            for (var L = v, C = O.length - 1, M = !0, E, x, F; M && (E = O[L], x = O[L + 1], !(x.t - this.offsetTime > c)); )
              L < C - 1 ? L += 1 : M = !1;
            if (F = this.keyframesMetadata[L] || {}, A = E.h === 1, v = L, !A) {
              if (c >= x.t - this.offsetTime)
                I = 1;
              else if (c < E.t - this.offsetTime)
                I = 0;
              else {
                var k;
                F.__fnct ? k = F.__fnct : (k = BezierFactory.getBezierEasing(E.o.x, E.o.y, E.i.x, E.i.y).get, F.__fnct = k), I = k((c - (E.t - this.offsetTime)) / (x.t - this.offsetTime - (E.t - this.offsetTime)));
              }
              _ = x.s ? x.s[0] : E.e[0];
            }
            S = E.s[0];
          }
          for (V = d._length, D = S.i[0].length, p.lastIndex = v, T = 0; T < V; T += 1)
            for (w = 0; w < D; w += 1)
              R = A ? S.i[T][w] : S.i[T][w] + (_.i[T][w] - S.i[T][w]) * I, d.i[T][w] = R, R = A ? S.o[T][w] : S.o[T][w] + (_.o[T][w] - S.o[T][w]) * I, d.o[T][w] = R, R = A ? S.v[T][w] : S.v[T][w] + (_.v[T][w] - S.v[T][w]) * I, d.v[T][w] = R;
        }
        function r() {
          var c = this.comp.renderedFrame - this.offsetTime, d = this.keyframes[0].t - this.offsetTime, p = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, v = this._caching.lastFrame;
          return v !== t && (v < d && c < d || v > p && c > p) || (this._caching.lastIndex = v < c ? this._caching.lastIndex : 0, this.interpolateShape(c, this.pv, this._caching)), this._caching.lastFrame = c, this.pv;
        }
        function i() {
          this.paths = this.localShapeCollection;
        }
        function s(c, d) {
          if (c._length !== d._length || c.c !== d.c)
            return !1;
          var p, v = c._length;
          for (p = 0; p < v; p += 1)
            if (c.v[p][0] !== d.v[p][0] || c.v[p][1] !== d.v[p][1] || c.o[p][0] !== d.o[p][0] || c.o[p][1] !== d.o[p][1] || c.i[p][0] !== d.i[p][0] || c.i[p][1] !== d.i[p][1])
              return !1;
          return !0;
        }
        function n(c) {
          s(this.v, c) || (this.v = shapePool.clone(c), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
        }
        function a() {
          if (this.elem.globalData.frameId !== this.frameId) {
            if (!this.effectsSequence.length) {
              this._mdf = !1;
              return;
            }
            if (this.lock) {
              this.setVValue(this.pv);
              return;
            }
            this.lock = !0, this._mdf = !1;
            var c;
            this.kf ? c = this.pv : this.data.ks ? c = this.data.ks.k : c = this.data.pt.k;
            var d, p = this.effectsSequence.length;
            for (d = 0; d < p; d += 1)
              c = this.effectsSequence[d](c);
            this.setVValue(c), this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }
        function l(c, d, p) {
          this.propType = "shape", this.comp = c.comp, this.container = c, this.elem = c, this.data = d, this.k = !1, this.kf = !1, this._mdf = !1;
          var v = p === 3 ? d.pt.k : d.ks.k;
          this.v = shapePool.clone(v), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = [];
        }
        function o(c) {
          this.effectsSequence.push(c), this.container.addDynamicProperty(this);
        }
        l.prototype.interpolateShape = e, l.prototype.getValue = a, l.prototype.setVValue = n, l.prototype.addEffect = o;
        function f(c, d, p) {
          this.propType = "shape", this.comp = c.comp, this.elem = c, this.container = c, this.offsetTime = c.data.st, this.keyframes = p === 3 ? d.pt.k : d.ks.k, this.keyframesMetadata = [], this.k = !0, this.kf = !0;
          var v = this.keyframes[0].s[0].i.length;
          this.v = shapePool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, v), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = t, this.reset = i, this._caching = {
            lastFrame: t,
            lastIndex: 0
          }, this.effectsSequence = [r.bind(this)];
        }
        f.prototype.getValue = a, f.prototype.interpolateShape = e, f.prototype.setVValue = n, f.prototype.addEffect = o;
        var m = function() {
          var c = roundCorner;
          function d(p, v) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = v.d, this.elem = p, this.comp = p.comp, this.frameId = -1, this.initDynamicPropertyContainer(p), this.p = PropertyFactory.getProp(p, v.p, 1, 0, this), this.s = PropertyFactory.getProp(p, v.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }
          return d.prototype = {
            reset: i,
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function() {
              var v = this.p.v[0], S = this.p.v[1], _ = this.s.v[0] / 2, A = this.s.v[1] / 2, T = this.d !== 3, w = this.v;
              w.v[0][0] = v, w.v[0][1] = S - A, w.v[1][0] = T ? v + _ : v - _, w.v[1][1] = S, w.v[2][0] = v, w.v[2][1] = S + A, w.v[3][0] = T ? v - _ : v + _, w.v[3][1] = S, w.i[0][0] = T ? v - _ * c : v + _ * c, w.i[0][1] = S - A, w.i[1][0] = T ? v + _ : v - _, w.i[1][1] = S - A * c, w.i[2][0] = T ? v + _ * c : v - _ * c, w.i[2][1] = S + A, w.i[3][0] = T ? v - _ : v + _, w.i[3][1] = S + A * c, w.o[0][0] = T ? v + _ * c : v - _ * c, w.o[0][1] = S - A, w.o[1][0] = T ? v + _ : v - _, w.o[1][1] = S + A * c, w.o[2][0] = T ? v - _ * c : v + _ * c, w.o[2][1] = S + A, w.o[3][0] = T ? v - _ : v + _, w.o[3][1] = S - A * c;
            }
          }, extendPrototype([DynamicPropertyContainer], d), d;
        }(), b = function() {
          function c(d, p) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 0), this.elem = d, this.comp = d.comp, this.data = p, this.frameId = -1, this.d = p.d, this.initDynamicPropertyContainer(d), p.sy === 1 ? (this.ir = PropertyFactory.getProp(d, p.ir, 0, 0, this), this.is = PropertyFactory.getProp(d, p.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(d, p.pt, 0, 0, this), this.p = PropertyFactory.getProp(d, p.p, 1, 0, this), this.r = PropertyFactory.getProp(d, p.r, 0, degToRads, this), this.or = PropertyFactory.getProp(d, p.or, 0, 0, this), this.os = PropertyFactory.getProp(d, p.os, 0, 0.01, this), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }
          return c.prototype = {
            reset: i,
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function() {
              var p = Math.floor(this.pt.v) * 2, v = Math.PI * 2 / p, S = !0, _ = this.or.v, A = this.ir.v, T = this.os.v, w = this.is.v, V = 2 * Math.PI * _ / (p * 2), D = 2 * Math.PI * A / (p * 2), I, R, O, L, C = -Math.PI / 2;
              C += this.r.v;
              var M = this.data.d === 3 ? -1 : 1;
              for (this.v._length = 0, I = 0; I < p; I += 1) {
                R = S ? _ : A, O = S ? T : w, L = S ? V : D;
                var E = R * Math.cos(C), x = R * Math.sin(C), F = E === 0 && x === 0 ? 0 : x / Math.sqrt(E * E + x * x), k = E === 0 && x === 0 ? 0 : -E / Math.sqrt(E * E + x * x);
                E += +this.p.v[0], x += +this.p.v[1], this.v.setTripleAt(E, x, E - F * L * O * M, x - k * L * O * M, E + F * L * O * M, x + k * L * O * M, I, !0), S = !S, C += v * M;
              }
            },
            convertPolygonToPath: function() {
              var p = Math.floor(this.pt.v), v = Math.PI * 2 / p, S = this.or.v, _ = this.os.v, A = 2 * Math.PI * S / (p * 4), T, w = -Math.PI * 0.5, V = this.data.d === 3 ? -1 : 1;
              for (w += this.r.v, this.v._length = 0, T = 0; T < p; T += 1) {
                var D = S * Math.cos(w), I = S * Math.sin(w), R = D === 0 && I === 0 ? 0 : I / Math.sqrt(D * D + I * I), O = D === 0 && I === 0 ? 0 : -D / Math.sqrt(D * D + I * I);
                D += +this.p.v[0], I += +this.p.v[1], this.v.setTripleAt(D, I, D - R * A * _ * V, I - O * A * _ * V, D + R * A * _ * V, I + O * A * _ * V, T, !0), w += v * V;
              }
              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, extendPrototype([DynamicPropertyContainer], c), c;
        }(), h = function() {
          function c(d, p) {
            this.v = shapePool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = d, this.comp = d.comp, this.frameId = -1, this.d = p.d, this.initDynamicPropertyContainer(d), this.p = PropertyFactory.getProp(d, p.p, 1, 0, this), this.s = PropertyFactory.getProp(d, p.s, 1, 0, this), this.r = PropertyFactory.getProp(d, p.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }
          return c.prototype = {
            convertRectToPath: function() {
              var p = this.p.v[0], v = this.p.v[1], S = this.s.v[0] / 2, _ = this.s.v[1] / 2, A = bmMin(S, _, this.r.v), T = A * (1 - roundCorner);
              this.v._length = 0, this.d === 2 || this.d === 1 ? (this.v.setTripleAt(p + S, v - _ + A, p + S, v - _ + A, p + S, v - _ + T, 0, !0), this.v.setTripleAt(p + S, v + _ - A, p + S, v + _ - T, p + S, v + _ - A, 1, !0), A !== 0 ? (this.v.setTripleAt(p + S - A, v + _, p + S - A, v + _, p + S - T, v + _, 2, !0), this.v.setTripleAt(p - S + A, v + _, p - S + T, v + _, p - S + A, v + _, 3, !0), this.v.setTripleAt(p - S, v + _ - A, p - S, v + _ - A, p - S, v + _ - T, 4, !0), this.v.setTripleAt(p - S, v - _ + A, p - S, v - _ + T, p - S, v - _ + A, 5, !0), this.v.setTripleAt(p - S + A, v - _, p - S + A, v - _, p - S + T, v - _, 6, !0), this.v.setTripleAt(p + S - A, v - _, p + S - T, v - _, p + S - A, v - _, 7, !0)) : (this.v.setTripleAt(p - S, v + _, p - S + T, v + _, p - S, v + _, 2), this.v.setTripleAt(p - S, v - _, p - S, v - _ + T, p - S, v - _, 3))) : (this.v.setTripleAt(p + S, v - _ + A, p + S, v - _ + T, p + S, v - _ + A, 0, !0), A !== 0 ? (this.v.setTripleAt(p + S - A, v - _, p + S - A, v - _, p + S - T, v - _, 1, !0), this.v.setTripleAt(p - S + A, v - _, p - S + T, v - _, p - S + A, v - _, 2, !0), this.v.setTripleAt(p - S, v - _ + A, p - S, v - _ + A, p - S, v - _ + T, 3, !0), this.v.setTripleAt(p - S, v + _ - A, p - S, v + _ - T, p - S, v + _ - A, 4, !0), this.v.setTripleAt(p - S + A, v + _, p - S + A, v + _, p - S + T, v + _, 5, !0), this.v.setTripleAt(p + S - A, v + _, p + S - T, v + _, p + S - A, v + _, 6, !0), this.v.setTripleAt(p + S, v + _ - A, p + S, v + _ - A, p + S, v + _ - T, 7, !0)) : (this.v.setTripleAt(p - S, v - _, p - S + T, v - _, p - S, v - _, 1, !0), this.v.setTripleAt(p - S, v + _, p - S, v + _ - T, p - S, v + _, 2, !0), this.v.setTripleAt(p + S, v + _, p + S - T, v + _, p + S, v + _, 3, !0)));
            },
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: i
          }, extendPrototype([DynamicPropertyContainer], c), c;
        }();
        function g(c, d, p) {
          var v;
          if (p === 3 || p === 4) {
            var S = p === 3 ? d.pt : d.ks, _ = S.k;
            _.length ? v = new f(c, d, p) : v = new l(c, d, p);
          } else p === 5 ? v = new h(c, d) : p === 6 ? v = new m(c, d) : p === 7 && (v = new b(c, d));
          return v.k && c.addDynamicProperty(v), v;
        }
        function y() {
          return l;
        }
        function u() {
          return f;
        }
        var P = {};
        return P.getShapeProp = g, P.getConstructorFunction = y, P.getKeyframedConstructorFunction = u, P;
      }();
      /*!
       Transformation Matrix v2.0
       (c) Epistemex 2014-2015
       www.epistemex.com
       By Ken Fyrstenberg
       Contributions by leeoniya.
       License: MIT, header required.
       */
      var Matrix = /* @__PURE__ */ function() {
        var t = Math.cos, e = Math.sin, r = Math.tan, i = Math.round;
        function s() {
          return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
        }
        function n(E) {
          if (E === 0)
            return this;
          var x = t(E), F = e(E);
          return this._t(x, -F, 0, 0, F, x, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function a(E) {
          if (E === 0)
            return this;
          var x = t(E), F = e(E);
          return this._t(1, 0, 0, 0, 0, x, -F, 0, 0, F, x, 0, 0, 0, 0, 1);
        }
        function l(E) {
          if (E === 0)
            return this;
          var x = t(E), F = e(E);
          return this._t(x, 0, F, 0, 0, 1, 0, 0, -F, 0, x, 0, 0, 0, 0, 1);
        }
        function o(E) {
          if (E === 0)
            return this;
          var x = t(E), F = e(E);
          return this._t(x, -F, 0, 0, F, x, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function f(E, x) {
          return this._t(1, x, E, 1, 0, 0);
        }
        function m(E, x) {
          return this.shear(r(E), r(x));
        }
        function b(E, x) {
          var F = t(x), k = e(x);
          return this._t(F, k, 0, 0, -k, F, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(E), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(F, -k, 0, 0, k, F, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function h(E, x, F) {
          return !F && F !== 0 && (F = 1), E === 1 && x === 1 && F === 1 ? this : this._t(E, 0, 0, 0, 0, x, 0, 0, 0, 0, F, 0, 0, 0, 0, 1);
        }
        function g(E, x, F, k, B, j, G, z, H, $, Y, Q, K, q, X, W) {
          return this.props[0] = E, this.props[1] = x, this.props[2] = F, this.props[3] = k, this.props[4] = B, this.props[5] = j, this.props[6] = G, this.props[7] = z, this.props[8] = H, this.props[9] = $, this.props[10] = Y, this.props[11] = Q, this.props[12] = K, this.props[13] = q, this.props[14] = X, this.props[15] = W, this;
        }
        function y(E, x, F) {
          return F = F || 0, E !== 0 || x !== 0 || F !== 0 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, E, x, F, 1) : this;
        }
        function u(E, x, F, k, B, j, G, z, H, $, Y, Q, K, q, X, W) {
          var N = this.props;
          if (E === 1 && x === 0 && F === 0 && k === 0 && B === 0 && j === 1 && G === 0 && z === 0 && H === 0 && $ === 0 && Y === 1 && Q === 0)
            return N[12] = N[12] * E + N[15] * K, N[13] = N[13] * j + N[15] * q, N[14] = N[14] * Y + N[15] * X, N[15] *= W, this._identityCalculated = !1, this;
          var et = N[0], nt = N[1], rt = N[2], tt = N[3], it = N[4], st = N[5], U = N[6], at = N[7], ot = N[8], J = N[9], lt = N[10], Z = N[11], ht = N[12], pt = N[13], ct = N[14], ut = N[15];
          return N[0] = et * E + nt * B + rt * H + tt * K, N[1] = et * x + nt * j + rt * $ + tt * q, N[2] = et * F + nt * G + rt * Y + tt * X, N[3] = et * k + nt * z + rt * Q + tt * W, N[4] = it * E + st * B + U * H + at * K, N[5] = it * x + st * j + U * $ + at * q, N[6] = it * F + st * G + U * Y + at * X, N[7] = it * k + st * z + U * Q + at * W, N[8] = ot * E + J * B + lt * H + Z * K, N[9] = ot * x + J * j + lt * $ + Z * q, N[10] = ot * F + J * G + lt * Y + Z * X, N[11] = ot * k + J * z + lt * Q + Z * W, N[12] = ht * E + pt * B + ct * H + ut * K, N[13] = ht * x + pt * j + ct * $ + ut * q, N[14] = ht * F + pt * G + ct * Y + ut * X, N[15] = ht * k + pt * z + ct * Q + ut * W, this._identityCalculated = !1, this;
        }
        function P(E) {
          var x = E.props;
          return this.transform(x[0], x[1], x[2], x[3], x[4], x[5], x[6], x[7], x[8], x[9], x[10], x[11], x[12], x[13], x[14], x[15]);
        }
        function c() {
          return this._identityCalculated || (this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1), this._identityCalculated = !0), this._identity;
        }
        function d(E) {
          for (var x = 0; x < 16; ) {
            if (E.props[x] !== this.props[x])
              return !1;
            x += 1;
          }
          return !0;
        }
        function p(E) {
          var x;
          for (x = 0; x < 16; x += 1)
            E.props[x] = this.props[x];
          return E;
        }
        function v(E) {
          var x;
          for (x = 0; x < 16; x += 1)
            this.props[x] = E[x];
        }
        function S(E, x, F) {
          return {
            x: E * this.props[0] + x * this.props[4] + F * this.props[8] + this.props[12],
            y: E * this.props[1] + x * this.props[5] + F * this.props[9] + this.props[13],
            z: E * this.props[2] + x * this.props[6] + F * this.props[10] + this.props[14]
          };
        }
        function _(E, x, F) {
          return E * this.props[0] + x * this.props[4] + F * this.props[8] + this.props[12];
        }
        function A(E, x, F) {
          return E * this.props[1] + x * this.props[5] + F * this.props[9] + this.props[13];
        }
        function T(E, x, F) {
          return E * this.props[2] + x * this.props[6] + F * this.props[10] + this.props[14];
        }
        function w() {
          var E = this.props[0] * this.props[5] - this.props[1] * this.props[4], x = this.props[5] / E, F = -this.props[1] / E, k = -this.props[4] / E, B = this.props[0] / E, j = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / E, G = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / E, z = new Matrix();
          return z.props[0] = x, z.props[1] = F, z.props[4] = k, z.props[5] = B, z.props[12] = j, z.props[13] = G, z;
        }
        function V(E) {
          var x = this.getInverseMatrix();
          return x.applyToPointArray(E[0], E[1], E[2] || 0);
        }
        function D(E) {
          var x, F = E.length, k = [];
          for (x = 0; x < F; x += 1)
            k[x] = V(E[x]);
          return k;
        }
        function I(E, x, F) {
          var k = createTypedArray("float32", 6);
          if (this.isIdentity())
            k[0] = E[0], k[1] = E[1], k[2] = x[0], k[3] = x[1], k[4] = F[0], k[5] = F[1];
          else {
            var B = this.props[0], j = this.props[1], G = this.props[4], z = this.props[5], H = this.props[12], $ = this.props[13];
            k[0] = E[0] * B + E[1] * G + H, k[1] = E[0] * j + E[1] * z + $, k[2] = x[0] * B + x[1] * G + H, k[3] = x[0] * j + x[1] * z + $, k[4] = F[0] * B + F[1] * G + H, k[5] = F[0] * j + F[1] * z + $;
          }
          return k;
        }
        function R(E, x, F) {
          var k;
          return this.isIdentity() ? k = [E, x, F] : k = [E * this.props[0] + x * this.props[4] + F * this.props[8] + this.props[12], E * this.props[1] + x * this.props[5] + F * this.props[9] + this.props[13], E * this.props[2] + x * this.props[6] + F * this.props[10] + this.props[14]], k;
        }
        function O(E, x) {
          if (this.isIdentity())
            return E + "," + x;
          var F = this.props;
          return Math.round((E * F[0] + x * F[4] + F[12]) * 100) / 100 + "," + Math.round((E * F[1] + x * F[5] + F[13]) * 100) / 100;
        }
        function L() {
          for (var E = 0, x = this.props, F = "matrix3d(", k = 1e4; E < 16; )
            F += i(x[E] * k) / k, F += E === 15 ? ")" : ",", E += 1;
          return F;
        }
        function C(E) {
          var x = 1e4;
          return E < 1e-6 && E > 0 || E > -1e-6 && E < 0 ? i(E * x) / x : E;
        }
        function M() {
          var E = this.props, x = C(E[0]), F = C(E[1]), k = C(E[4]), B = C(E[5]), j = C(E[12]), G = C(E[13]);
          return "matrix(" + x + "," + F + "," + k + "," + B + "," + j + "," + G + ")";
        }
        return function() {
          this.reset = s, this.rotate = n, this.rotateX = a, this.rotateY = l, this.rotateZ = o, this.skew = m, this.skewFromAxis = b, this.shear = f, this.scale = h, this.setTransform = g, this.translate = y, this.transform = u, this.multiply = P, this.applyToPoint = S, this.applyToX = _, this.applyToY = A, this.applyToZ = T, this.applyToPointArray = R, this.applyToTriplePoints = I, this.applyToPointStringified = O, this.toCSS = L, this.to2dCSS = M, this.clone = p, this.cloneFromProps = v, this.equals = d, this.inversePoints = D, this.inversePoint = V, this.getInverseMatrix = w, this._t = this.transform, this.isIdentity = c, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
        };
      }();
      function _typeof$3(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$3 = function(r) {
          return typeof r;
        } : _typeof$3 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$3(t);
      }
      var lottie = {};
      function setLocation(t) {
        setLocationHref(t);
      }
      function searchAnimations() {
        animationManager.searchAnimations();
      }
      function setSubframeRendering(t) {
        setSubframeEnabled(t);
      }
      function setPrefix(t) {
        setIdPrefix(t);
      }
      function loadAnimation(t) {
        return animationManager.loadAnimation(t);
      }
      function setQuality(t) {
        if (typeof t == "string")
          switch (t) {
            case "high":
              setDefaultCurveSegments(200);
              break;
            default:
            case "medium":
              setDefaultCurveSegments(50);
              break;
            case "low":
              setDefaultCurveSegments(10);
              break;
          }
        else !isNaN(t) && t > 1 && setDefaultCurveSegments(t);
      }
      function inBrowser() {
        return typeof navigator < "u";
      }
      function installPlugin(t, e) {
        t === "expressions" && setExpressionsPlugin(e);
      }
      function getFactory(t) {
        switch (t) {
          case "propertyFactory":
            return PropertyFactory;
          case "shapePropertyFactory":
            return ShapePropertyFactory;
          case "matrix":
            return Matrix;
          default:
            return null;
        }
      }
      lottie.play = animationManager.play, lottie.pause = animationManager.pause, lottie.setLocationHref = setLocation, lottie.togglePause = animationManager.togglePause, lottie.setSpeed = animationManager.setSpeed, lottie.setDirection = animationManager.setDirection, lottie.stop = animationManager.stop, lottie.searchAnimations = searchAnimations, lottie.registerAnimation = animationManager.registerAnimation, lottie.loadAnimation = loadAnimation, lottie.setSubframeRendering = setSubframeRendering, lottie.resize = animationManager.resize, lottie.goToAndStop = animationManager.goToAndStop, lottie.destroy = animationManager.destroy, lottie.setQuality = setQuality, lottie.inBrowser = inBrowser, lottie.installPlugin = installPlugin, lottie.freeze = animationManager.freeze, lottie.unfreeze = animationManager.unfreeze, lottie.setVolume = animationManager.setVolume, lottie.mute = animationManager.mute, lottie.unmute = animationManager.unmute, lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations, lottie.useWebWorker = setWebWorker, lottie.setIDPrefix = setPrefix, lottie.__getFactory = getFactory, lottie.version = "5.12.2";
      function checkReady() {
        document.readyState === "complete" && (clearInterval(readyStateCheckInterval), searchAnimations());
      }
      function getQueryVariable(t) {
        for (var e = queryString.split("&"), r = 0; r < e.length; r += 1) {
          var i = e[r].split("=");
          if (decodeURIComponent(i[0]) == t)
            return decodeURIComponent(i[1]);
        }
        return null;
      }
      var queryString = "";
      {
        var scripts = document.getElementsByTagName("script"), index = scripts.length - 1, myScript = scripts[index] || {
          src: ""
        };
        queryString = myScript.src ? myScript.src.replace(/^[^\?]+\??/, "") : "", getQueryVariable("renderer");
      }
      var readyStateCheckInterval = setInterval(checkReady, 100);
      try {
        _typeof$3(exports) !== "object" && (window.bodymovin = lottie);
      } catch (t) {
      }
      var ShapeModifiers = function() {
        var t = {}, e = {};
        t.registerModifier = r, t.getModifier = i;
        function r(s, n) {
          e[s] || (e[s] = n);
        }
        function i(s, n, a) {
          return new e[s](n, a);
        }
        return t;
      }();
      function ShapeModifier() {
      }
      ShapeModifier.prototype.initModifierProperties = function() {
      }, ShapeModifier.prototype.addShapeToModifier = function() {
      }, ShapeModifier.prototype.addShape = function(t) {
        if (!this.closed) {
          t.sh.container.addDynamicProperty(t.sh);
          var e = {
            shape: t.sh,
            data: t,
            localShapeCollection: shapeCollectionPool.newShapeCollection()
          };
          this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
        }
      }, ShapeModifier.prototype.init = function(t, e) {
        this.shapes = [], this.elem = t, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, ShapeModifier.prototype.processKeys = function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
      }, extendPrototype([DynamicPropertyContainer], ShapeModifier);
      function TrimModifier() {
      }
      extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function(t, e) {
        this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this), this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this), this.o = PropertyFactory.getProp(t, e.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = e.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
      }, TrimModifier.prototype.addShapeToModifier = function(t) {
        t.pathsData = [];
      }, TrimModifier.prototype.calculateShapeEdges = function(t, e, r, i, s) {
        var n = [];
        e <= 1 ? n.push({
          s: t,
          e
        }) : t >= 1 ? n.push({
          s: t - 1,
          e: e - 1
        }) : (n.push({
          s: t,
          e: 1
        }), n.push({
          s: 0,
          e: e - 1
        }));
        var a = [], l, o = n.length, f;
        for (l = 0; l < o; l += 1)
          if (f = n[l], !(f.e * s < i || f.s * s > i + r)) {
            var m, b;
            f.s * s <= i ? m = 0 : m = (f.s * s - i) / r, f.e * s >= i + r ? b = 1 : b = (f.e * s - i) / r, a.push([m, b]);
          }
        return a.length || a.push([0, 0]), a;
      }, TrimModifier.prototype.releasePathsData = function(t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
          segmentsLengthPool.release(t[e]);
        return t.length = 0, t;
      }, TrimModifier.prototype.processShapes = function(t) {
        var e, r;
        if (this._mdf || t) {
          var i = this.o.v % 360 / 360;
          if (i < 0 && (i += 1), this.s.v > 1 ? e = 1 + i : this.s.v < 0 ? e = 0 + i : e = this.s.v + i, this.e.v > 1 ? r = 1 + i : this.e.v < 0 ? r = 0 + i : r = this.e.v + i, e > r) {
            var s = e;
            e = r, r = s;
          }
          e = Math.round(e * 1e4) * 1e-4, r = Math.round(r * 1e4) * 1e-4, this.sValue = e, this.eValue = r;
        } else
          e = this.sValue, r = this.eValue;
        var n, a, l = this.shapes.length, o, f, m, b, h, g = 0;
        if (r === e)
          for (a = 0; a < l; a += 1)
            this.shapes[a].localShapeCollection.releaseShapes(), this.shapes[a].shape._mdf = !0, this.shapes[a].shape.paths = this.shapes[a].localShapeCollection, this._mdf && (this.shapes[a].pathsData.length = 0);
        else if (r === 1 && e === 0 || r === 0 && e === 1) {
          if (this._mdf)
            for (a = 0; a < l; a += 1)
              this.shapes[a].pathsData.length = 0, this.shapes[a].shape._mdf = !0;
        } else {
          var y = [], u, P;
          for (a = 0; a < l; a += 1)
            if (u = this.shapes[a], !u.shape._mdf && !this._mdf && !t && this.m !== 2)
              u.shape.paths = u.localShapeCollection;
            else {
              if (n = u.shape.paths, f = n._length, h = 0, !u.shape._mdf && u.pathsData.length)
                h = u.totalShapeLength;
              else {
                for (m = this.releasePathsData(u.pathsData), o = 0; o < f; o += 1)
                  b = bez.getSegmentsLength(n.shapes[o]), m.push(b), h += b.totalLength;
                u.totalShapeLength = h, u.pathsData = m;
              }
              g += h, u.shape._mdf = !0;
            }
          var c = e, d = r, p = 0, v;
          for (a = l - 1; a >= 0; a -= 1)
            if (u = this.shapes[a], u.shape._mdf) {
              for (P = u.localShapeCollection, P.releaseShapes(), this.m === 2 && l > 1 ? (v = this.calculateShapeEdges(e, r, u.totalShapeLength, p, g), p += u.totalShapeLength) : v = [[c, d]], f = v.length, o = 0; o < f; o += 1) {
                c = v[o][0], d = v[o][1], y.length = 0, d <= 1 ? y.push({
                  s: u.totalShapeLength * c,
                  e: u.totalShapeLength * d
                }) : c >= 1 ? y.push({
                  s: u.totalShapeLength * (c - 1),
                  e: u.totalShapeLength * (d - 1)
                }) : (y.push({
                  s: u.totalShapeLength * c,
                  e: u.totalShapeLength
                }), y.push({
                  s: 0,
                  e: u.totalShapeLength * (d - 1)
                }));
                var S = this.addShapes(u, y[0]);
                if (y[0].s !== y[0].e) {
                  if (y.length > 1) {
                    var _ = u.shape.paths.shapes[u.shape.paths._length - 1];
                    if (_.c) {
                      var A = S.pop();
                      this.addPaths(S, P), S = this.addShapes(u, y[1], A);
                    } else
                      this.addPaths(S, P), S = this.addShapes(u, y[1]);
                  }
                  this.addPaths(S, P);
                }
              }
              u.shape.paths = P;
            }
        }
      }, TrimModifier.prototype.addPaths = function(t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1)
          e.addShape(t[r]);
      }, TrimModifier.prototype.addSegment = function(t, e, r, i, s, n, a) {
        s.setXYAt(e[0], e[1], "o", n), s.setXYAt(r[0], r[1], "i", n + 1), a && s.setXYAt(t[0], t[1], "v", n), s.setXYAt(i[0], i[1], "v", n + 1);
      }, TrimModifier.prototype.addSegmentFromArray = function(t, e, r, i) {
        e.setXYAt(t[1], t[5], "o", r), e.setXYAt(t[2], t[6], "i", r + 1), i && e.setXYAt(t[0], t[4], "v", r), e.setXYAt(t[3], t[7], "v", r + 1);
      }, TrimModifier.prototype.addShapes = function(t, e, r) {
        var i = t.pathsData, s = t.shape.paths.shapes, n, a = t.shape.paths._length, l, o, f = 0, m, b, h, g, y = [], u, P = !0;
        for (r ? (b = r._length, u = r._length) : (r = shapePool.newElement(), b = 0, u = 0), y.push(r), n = 0; n < a; n += 1) {
          for (h = i[n].lengths, r.c = s[n].c, o = s[n].c ? h.length : h.length + 1, l = 1; l < o; l += 1)
            if (m = h[l - 1], f + m.addedLength < e.s)
              f += m.addedLength, r.c = !1;
            else if (f > e.e) {
              r.c = !1;
              break;
            } else
              e.s <= f && e.e >= f + m.addedLength ? (this.addSegment(s[n].v[l - 1], s[n].o[l - 1], s[n].i[l], s[n].v[l], r, b, P), P = !1) : (g = bez.getNewSegment(s[n].v[l - 1], s[n].v[l], s[n].o[l - 1], s[n].i[l], (e.s - f) / m.addedLength, (e.e - f) / m.addedLength, h[l - 1]), this.addSegmentFromArray(g, r, b, P), P = !1, r.c = !1), f += m.addedLength, b += 1;
          if (s[n].c && h.length) {
            if (m = h[l - 1], f <= e.e) {
              var c = h[l - 1].addedLength;
              e.s <= f && e.e >= f + c ? (this.addSegment(s[n].v[l - 1], s[n].o[l - 1], s[n].i[0], s[n].v[0], r, b, P), P = !1) : (g = bez.getNewSegment(s[n].v[l - 1], s[n].v[0], s[n].o[l - 1], s[n].i[0], (e.s - f) / c, (e.e - f) / c, h[l - 1]), this.addSegmentFromArray(g, r, b, P), P = !1, r.c = !1);
            } else
              r.c = !1;
            f += m.addedLength, b += 1;
          }
          if (r._length && (r.setXYAt(r.v[u][0], r.v[u][1], "i", u), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), f > e.e)
            break;
          n < a - 1 && (r = shapePool.newElement(), P = !0, y.push(r), b = 0);
        }
        return y;
      };
      function PuckerAndBloatModifier() {
      }
      extendPrototype([ShapeModifier], PuckerAndBloatModifier), PuckerAndBloatModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length;
      }, PuckerAndBloatModifier.prototype.processPath = function(t, e) {
        var r = e / 100, i = [0, 0], s = t._length, n = 0;
        for (n = 0; n < s; n += 1)
          i[0] += t.v[n][0], i[1] += t.v[n][1];
        i[0] /= s, i[1] /= s;
        var a = shapePool.newElement();
        a.c = t.c;
        var l, o, f, m, b, h;
        for (n = 0; n < s; n += 1)
          l = t.v[n][0] + (i[0] - t.v[n][0]) * r, o = t.v[n][1] + (i[1] - t.v[n][1]) * r, f = t.o[n][0] + (i[0] - t.o[n][0]) * -r, m = t.o[n][1] + (i[1] - t.o[n][1]) * -r, b = t.i[n][0] + (i[0] - t.i[n][0]) * -r, h = t.i[n][1] + (i[1] - t.i[n][1]) * -r, a.setTripleAt(l, o, f, m, b, h, n);
        return a;
      }, PuckerAndBloatModifier.prototype.processShapes = function(t) {
        var e, r, i = this.shapes.length, s, n, a = this.amount.v;
        if (a !== 0) {
          var l, o;
          for (r = 0; r < i; r += 1) {
            if (l = this.shapes[r], o = l.localShapeCollection, !(!l.shape._mdf && !this._mdf && !t))
              for (o.releaseShapes(), l.shape._mdf = !0, e = l.shape.paths.shapes, n = l.shape.paths._length, s = 0; s < n; s += 1)
                o.addShape(this.processPath(e[s], a));
            l.shape.paths = l.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      var TransformPropertyFactory = function() {
        var t = [0, 0];
        function e(o) {
          var f = this._mdf;
          this.iterateDynamicProperties(), this._mdf = this._mdf || f, this.a && o.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && o.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && o.skewFromAxis(-this.sk.v, this.sa.v), this.r ? o.rotate(-this.r.v) : o.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? o.translate(this.px.v, this.py.v, -this.pz.v) : o.translate(this.px.v, this.py.v, 0) : o.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
        }
        function r(o) {
          if (this.elem.globalData.frameId !== this.frameId) {
            if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || o) {
              var f;
              if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                var m, b;
                if (f = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime)
                  this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (m = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / f, 0), b = this.p.getValueAtTime(this.p.keyframes[0].t / f, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (m = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / f, 0), b = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / f, 0)) : (m = this.p.pv, b = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / f, this.p.offsetTime));
                else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                  m = [], b = [];
                  var h = this.px, g = this.py;
                  h._caching.lastFrame + h.offsetTime <= h.keyframes[0].t ? (m[0] = h.getValueAtTime((h.keyframes[0].t + 0.01) / f, 0), m[1] = g.getValueAtTime((g.keyframes[0].t + 0.01) / f, 0), b[0] = h.getValueAtTime(h.keyframes[0].t / f, 0), b[1] = g.getValueAtTime(g.keyframes[0].t / f, 0)) : h._caching.lastFrame + h.offsetTime >= h.keyframes[h.keyframes.length - 1].t ? (m[0] = h.getValueAtTime(h.keyframes[h.keyframes.length - 1].t / f, 0), m[1] = g.getValueAtTime(g.keyframes[g.keyframes.length - 1].t / f, 0), b[0] = h.getValueAtTime((h.keyframes[h.keyframes.length - 1].t - 0.01) / f, 0), b[1] = g.getValueAtTime((g.keyframes[g.keyframes.length - 1].t - 0.01) / f, 0)) : (m = [h.pv, g.pv], b[0] = h.getValueAtTime((h._caching.lastFrame + h.offsetTime - 0.01) / f, h.offsetTime), b[1] = g.getValueAtTime((g._caching.lastFrame + g.offsetTime - 0.01) / f, g.offsetTime));
                } else
                  b = t, m = b;
                this.v.rotate(-Math.atan2(m[1] - b[1], m[0] - b[0]));
              }
              this.data.p && this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            }
            this.frameId = this.elem.globalData.frameId;
          }
        }
        function i() {
          if (this.appliedTransformations = 0, this.pre.reset(), !this.a.effectsSequence.length)
            this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations = 1;
          else
            return;
          if (!this.s.effectsSequence.length)
            this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.appliedTransformations = 2;
          else
            return;
          if (this.sk)
            if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length)
              this.pre.skewFromAxis(-this.sk.v, this.sa.v), this.appliedTransformations = 3;
            else
              return;
          this.r ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), this.appliedTransformations = 4) : !this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length && (this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.appliedTransformations = 4);
        }
        function s() {
        }
        function n(o) {
          this._addDynamicProperty(o), this.elem.addDynamicProperty(o), this._isDirty = !0;
        }
        function a(o, f, m) {
          if (this.elem = o, this.frameId = -1, this.propType = "transform", this.data = f, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(m || o), f.p && f.p.s ? (this.px = PropertyFactory.getProp(o, f.p.x, 0, 0, this), this.py = PropertyFactory.getProp(o, f.p.y, 0, 0, this), f.p.z && (this.pz = PropertyFactory.getProp(o, f.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(o, f.p || {
            k: [0, 0, 0]
          }, 1, 0, this), f.rx) {
            if (this.rx = PropertyFactory.getProp(o, f.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(o, f.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(o, f.rz, 0, degToRads, this), f.or.k[0].ti) {
              var b, h = f.or.k.length;
              for (b = 0; b < h; b += 1)
                f.or.k[b].to = null, f.or.k[b].ti = null;
            }
            this.or = PropertyFactory.getProp(o, f.or, 1, degToRads, this), this.or.sh = !0;
          } else
            this.r = PropertyFactory.getProp(o, f.r || {
              k: 0
            }, 0, degToRads, this);
          f.sk && (this.sk = PropertyFactory.getProp(o, f.sk, 0, degToRads, this), this.sa = PropertyFactory.getProp(o, f.sa, 0, degToRads, this)), this.a = PropertyFactory.getProp(o, f.a || {
            k: [0, 0, 0]
          }, 1, 0, this), this.s = PropertyFactory.getProp(o, f.s || {
            k: [100, 100, 100]
          }, 1, 0.01, this), f.o ? this.o = PropertyFactory.getProp(o, f.o, 0, 0.01, o) : this.o = {
            _mdf: !1,
            v: 1
          }, this._isDirty = !0, this.dynamicProperties.length || this.getValue(!0);
        }
        a.prototype = {
          applyToMatrix: e,
          getValue: r,
          precalculateMatrix: i,
          autoOrient: s
        }, extendPrototype([DynamicPropertyContainer], a), a.prototype.addDynamicProperty = n, a.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty;
        function l(o, f, m) {
          return new a(o, f, m);
        }
        return {
          getTransformProperty: l
        };
      }();
      function RepeaterModifier() {
      }
      extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.c = PropertyFactory.getProp(t, e.c, 0, null, this), this.o = PropertyFactory.getProp(t, e.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this), this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this), this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this), this.data = e, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
      }, RepeaterModifier.prototype.applyTransforms = function(t, e, r, i, s, n) {
        var a = n ? -1 : 1, l = i.s.v[0] + (1 - i.s.v[0]) * (1 - s), o = i.s.v[1] + (1 - i.s.v[1]) * (1 - s);
        t.translate(i.p.v[0] * a * s, i.p.v[1] * a * s, i.p.v[2]), e.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), e.rotate(-i.r.v * a * s), e.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(n ? 1 / l : l, n ? 1 / o : o), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }, RepeaterModifier.prototype.init = function(t, e, r, i) {
        for (this.elem = t, this.arr = e, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(t), this.initModifierProperties(t, e[r]); r > 0; )
          r -= 1, this._elements.unshift(e[r]);
        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, RepeaterModifier.prototype.resetElements = function(t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
          t[e]._processed = !1, t[e].ty === "gr" && this.resetElements(t[e].it);
      }, RepeaterModifier.prototype.cloneElements = function(t) {
        var e = JSON.parse(JSON.stringify(t));
        return this.resetElements(e), e;
      }, RepeaterModifier.prototype.changeGroupRender = function(t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1)
          t[r]._render = e, t[r].ty === "gr" && this.changeGroupRender(t[r].it, e);
      }, RepeaterModifier.prototype.processShapes = function(t) {
        var e, r, i, s, n, a = !1;
        if (this._mdf || t) {
          var l = Math.ceil(this.c.v);
          if (this._groups.length < l) {
            for (; this._groups.length < l; ) {
              var o = {
                it: this.cloneElements(this._elements),
                ty: "gr"
              };
              o.it.push({
                a: {
                  a: 0,
                  ix: 1,
                  k: [0, 0]
                },
                nm: "Transform",
                o: {
                  a: 0,
                  ix: 7,
                  k: 100
                },
                p: {
                  a: 0,
                  ix: 2,
                  k: [0, 0]
                },
                r: {
                  a: 1,
                  ix: 6,
                  k: [{
                    s: 0,
                    e: 0,
                    t: 0
                  }, {
                    s: 0,
                    e: 0,
                    t: 1
                  }]
                },
                s: {
                  a: 0,
                  ix: 3,
                  k: [100, 100]
                },
                sa: {
                  a: 0,
                  ix: 5,
                  k: 0
                },
                sk: {
                  a: 0,
                  ix: 4,
                  k: 0
                },
                ty: "tr"
              }), this.arr.splice(0, 0, o), this._groups.splice(0, 0, o), this._currentCopies += 1;
            }
            this.elem.reloadShapes(), a = !0;
          }
          n = 0;
          var f;
          for (i = 0; i <= this._groups.length - 1; i += 1) {
            if (f = n < l, this._groups[i]._render = f, this.changeGroupRender(this._groups[i].it, f), !f) {
              var m = this.elemsData[i].it, b = m[m.length - 1];
              b.transform.op.v !== 0 ? (b.transform.op._mdf = !0, b.transform.op.v = 0) : b.transform.op._mdf = !1;
            }
            n += 1;
          }
          this._currentCopies = l;
          var h = this.o.v, g = h % 1, y = h > 0 ? Math.floor(h) : Math.ceil(h), u = this.pMatrix.props, P = this.rMatrix.props, c = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var d = 0;
          if (h > 0) {
            for (; d < y; )
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), d += 1;
            g && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, g, !1), d += g);
          } else if (h < 0) {
            for (; d > y; )
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), d -= 1;
            g && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -g, !0), d -= g);
          }
          i = this.data.m === 1 ? 0 : this._currentCopies - 1, s = this.data.m === 1 ? 1 : -1, n = this._currentCopies;
          for (var p, v; n; ) {
            if (e = this.elemsData[i].it, r = e[e.length - 1].transform.mProps.v.props, v = r.length, e[e.length - 1].transform.mProps._mdf = !0, e[e.length - 1].transform.op._mdf = !0, e[e.length - 1].transform.op.v = this._currentCopies === 1 ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), d !== 0) {
              for ((i !== 0 && s === 1 || i !== this._currentCopies - 1 && s === -1) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13], P[14], P[15]), this.matrix.transform(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15]), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), p = 0; p < v; p += 1)
                r[p] = this.matrix.props[p];
              this.matrix.reset();
            } else
              for (this.matrix.reset(), p = 0; p < v; p += 1)
                r[p] = this.matrix.props[p];
            d += 1, n -= 1, i += s;
          }
        } else
          for (n = this._currentCopies, i = 0, s = 1; n; )
            e = this.elemsData[i].it, r = e[e.length - 1].transform.mProps.v.props, e[e.length - 1].transform.mProps._mdf = !1, e[e.length - 1].transform.op._mdf = !1, n -= 1, i += s;
        return a;
      }, RepeaterModifier.prototype.addShape = function() {
      };
      function RoundCornersModifier() {
      }
      extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(t, e.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
      }, RoundCornersModifier.prototype.processPath = function(t, e) {
        var r = shapePool.newElement();
        r.c = t.c;
        var i, s = t._length, n, a, l, o, f, m, b = 0, h, g, y, u, P, c;
        for (i = 0; i < s; i += 1)
          n = t.v[i], l = t.o[i], a = t.i[i], n[0] === l[0] && n[1] === l[1] && n[0] === a[0] && n[1] === a[1] ? (i === 0 || i === s - 1) && !t.c ? (r.setTripleAt(n[0], n[1], l[0], l[1], a[0], a[1], b), b += 1) : (i === 0 ? o = t.v[s - 1] : o = t.v[i - 1], f = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2)), m = f ? Math.min(f / 2, e) / f : 0, P = n[0] + (o[0] - n[0]) * m, h = P, c = n[1] - (n[1] - o[1]) * m, g = c, y = h - (h - n[0]) * roundCorner, u = g - (g - n[1]) * roundCorner, r.setTripleAt(h, g, y, u, P, c, b), b += 1, i === s - 1 ? o = t.v[0] : o = t.v[i + 1], f = Math.sqrt(Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2)), m = f ? Math.min(f / 2, e) / f : 0, y = n[0] + (o[0] - n[0]) * m, h = y, u = n[1] + (o[1] - n[1]) * m, g = u, P = h - (h - n[0]) * roundCorner, c = g - (g - n[1]) * roundCorner, r.setTripleAt(h, g, y, u, P, c, b), b += 1) : (r.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], b), b += 1);
        return r;
      }, RoundCornersModifier.prototype.processShapes = function(t) {
        var e, r, i = this.shapes.length, s, n, a = this.rd.v;
        if (a !== 0) {
          var l, o;
          for (r = 0; r < i; r += 1) {
            if (l = this.shapes[r], o = l.localShapeCollection, !(!l.shape._mdf && !this._mdf && !t))
              for (o.releaseShapes(), l.shape._mdf = !0, e = l.shape.paths.shapes, n = l.shape.paths._length, s = 0; s < n; s += 1)
                o.addShape(this.processPath(e[s], a));
            l.shape.paths = l.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function floatEqual(t, e) {
        return Math.abs(t - e) * 1e5 <= Math.min(Math.abs(t), Math.abs(e));
      }
      function floatZero(t) {
        return Math.abs(t) <= 1e-5;
      }
      function lerp(t, e, r) {
        return t * (1 - r) + e * r;
      }
      function lerpPoint(t, e, r) {
        return [lerp(t[0], e[0], r), lerp(t[1], e[1], r)];
      }
      function quadRoots(t, e, r) {
        if (t === 0) return [];
        var i = e * e - 4 * t * r;
        if (i < 0) return [];
        var s = -e / (2 * t);
        if (i === 0) return [s];
        var n = Math.sqrt(i) / (2 * t);
        return [s - n, s + n];
      }
      function polynomialCoefficients(t, e, r, i) {
        return [-t + 3 * e - 3 * r + i, 3 * t - 6 * e + 3 * r, -3 * t + 3 * e, t];
      }
      function singlePoint(t) {
        return new PolynomialBezier(t, t, t, t, !1);
      }
      function PolynomialBezier(t, e, r, i, s) {
        s && pointEqual(t, e) && (e = lerpPoint(t, i, 1 / 3)), s && pointEqual(r, i) && (r = lerpPoint(t, i, 2 / 3));
        var n = polynomialCoefficients(t[0], e[0], r[0], i[0]), a = polynomialCoefficients(t[1], e[1], r[1], i[1]);
        this.a = [n[0], a[0]], this.b = [n[1], a[1]], this.c = [n[2], a[2]], this.d = [n[3], a[3]], this.points = [t, e, r, i];
      }
      PolynomialBezier.prototype.point = function(t) {
        return [((this.a[0] * t + this.b[0]) * t + this.c[0]) * t + this.d[0], ((this.a[1] * t + this.b[1]) * t + this.c[1]) * t + this.d[1]];
      }, PolynomialBezier.prototype.derivative = function(t) {
        return [(3 * t * this.a[0] + 2 * this.b[0]) * t + this.c[0], (3 * t * this.a[1] + 2 * this.b[1]) * t + this.c[1]];
      }, PolynomialBezier.prototype.tangentAngle = function(t) {
        var e = this.derivative(t);
        return Math.atan2(e[1], e[0]);
      }, PolynomialBezier.prototype.normalAngle = function(t) {
        var e = this.derivative(t);
        return Math.atan2(e[0], e[1]);
      }, PolynomialBezier.prototype.inflectionPoints = function() {
        var t = this.a[1] * this.b[0] - this.a[0] * this.b[1];
        if (floatZero(t)) return [];
        var e = -0.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / t, r = e * e - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / t;
        if (r < 0) return [];
        var i = Math.sqrt(r);
        return floatZero(i) ? i > 0 && i < 1 ? [e] : [] : [e - i, e + i].filter(function(s) {
          return s > 0 && s < 1;
        });
      }, PolynomialBezier.prototype.split = function(t) {
        if (t <= 0) return [singlePoint(this.points[0]), this];
        if (t >= 1) return [this, singlePoint(this.points[this.points.length - 1])];
        var e = lerpPoint(this.points[0], this.points[1], t), r = lerpPoint(this.points[1], this.points[2], t), i = lerpPoint(this.points[2], this.points[3], t), s = lerpPoint(e, r, t), n = lerpPoint(r, i, t), a = lerpPoint(s, n, t);
        return [new PolynomialBezier(this.points[0], e, s, a, !0), new PolynomialBezier(a, n, i, this.points[3], !0)];
      };
      function extrema(t, e) {
        var r = t.points[0][e], i = t.points[t.points.length - 1][e];
        if (r > i) {
          var s = i;
          i = r, r = s;
        }
        for (var n = quadRoots(3 * t.a[e], 2 * t.b[e], t.c[e]), a = 0; a < n.length; a += 1)
          if (n[a] > 0 && n[a] < 1) {
            var l = t.point(n[a])[e];
            l < r ? r = l : l > i && (i = l);
          }
        return {
          min: r,
          max: i
        };
      }
      PolynomialBezier.prototype.bounds = function() {
        return {
          x: extrema(this, 0),
          y: extrema(this, 1)
        };
      }, PolynomialBezier.prototype.boundingBox = function() {
        var t = this.bounds();
        return {
          left: t.x.min,
          right: t.x.max,
          top: t.y.min,
          bottom: t.y.max,
          width: t.x.max - t.x.min,
          height: t.y.max - t.y.min,
          cx: (t.x.max + t.x.min) / 2,
          cy: (t.y.max + t.y.min) / 2
        };
      };
      function intersectData(t, e, r) {
        var i = t.boundingBox();
        return {
          cx: i.cx,
          cy: i.cy,
          width: i.width,
          height: i.height,
          bez: t,
          t: (e + r) / 2,
          t1: e,
          t2: r
        };
      }
      function splitData(t) {
        var e = t.bez.split(0.5);
        return [intersectData(e[0], t.t1, t.t), intersectData(e[1], t.t, t.t2)];
      }
      function boxIntersect(t, e) {
        return Math.abs(t.cx - e.cx) * 2 < t.width + e.width && Math.abs(t.cy - e.cy) * 2 < t.height + e.height;
      }
      function intersectsImpl(t, e, r, i, s, n) {
        if (boxIntersect(t, e)) {
          if (r >= n || t.width <= i && t.height <= i && e.width <= i && e.height <= i) {
            s.push([t.t, e.t]);
            return;
          }
          var a = splitData(t), l = splitData(e);
          intersectsImpl(a[0], l[0], r + 1, i, s, n), intersectsImpl(a[0], l[1], r + 1, i, s, n), intersectsImpl(a[1], l[0], r + 1, i, s, n), intersectsImpl(a[1], l[1], r + 1, i, s, n);
        }
      }
      PolynomialBezier.prototype.intersections = function(t, e, r) {
        e === void 0 && (e = 2), r === void 0 && (r = 7);
        var i = [];
        return intersectsImpl(intersectData(this, 0, 1), intersectData(t, 0, 1), 0, e, i, r), i;
      }, PolynomialBezier.shapeSegment = function(t, e) {
        var r = (e + 1) % t.length();
        return new PolynomialBezier(t.v[e], t.o[e], t.i[r], t.v[r], !0);
      }, PolynomialBezier.shapeSegmentInverted = function(t, e) {
        var r = (e + 1) % t.length();
        return new PolynomialBezier(t.v[r], t.i[r], t.o[e], t.v[e], !0);
      };
      function crossProduct(t, e) {
        return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]];
      }
      function lineIntersection(t, e, r, i) {
        var s = [t[0], t[1], 1], n = [e[0], e[1], 1], a = [r[0], r[1], 1], l = [i[0], i[1], 1], o = crossProduct(crossProduct(s, n), crossProduct(a, l));
        return floatZero(o[2]) ? null : [o[0] / o[2], o[1] / o[2]];
      }
      function polarOffset(t, e, r) {
        return [t[0] + Math.cos(e) * r, t[1] - Math.sin(e) * r];
      }
      function pointDistance(t, e) {
        return Math.hypot(t[0] - e[0], t[1] - e[1]);
      }
      function pointEqual(t, e) {
        return floatEqual(t[0], e[0]) && floatEqual(t[1], e[1]);
      }
      function ZigZagModifier() {
      }
      extendPrototype([ShapeModifier], ZigZagModifier), ZigZagModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.amplitude = PropertyFactory.getProp(t, e.s, 0, null, this), this.frequency = PropertyFactory.getProp(t, e.r, 0, null, this), this.pointsType = PropertyFactory.getProp(t, e.pt, 0, null, this), this._isAnimated = this.amplitude.effectsSequence.length !== 0 || this.frequency.effectsSequence.length !== 0 || this.pointsType.effectsSequence.length !== 0;
      };
      function setPoint(t, e, r, i, s, n, a) {
        var l = r - Math.PI / 2, o = r + Math.PI / 2, f = e[0] + Math.cos(r) * i * s, m = e[1] - Math.sin(r) * i * s;
        t.setTripleAt(f, m, f + Math.cos(l) * n, m - Math.sin(l) * n, f + Math.cos(o) * a, m - Math.sin(o) * a, t.length());
      }
      function getPerpendicularVector(t, e) {
        var r = [e[0] - t[0], e[1] - t[1]], i = -Math.PI * 0.5, s = [Math.cos(i) * r[0] - Math.sin(i) * r[1], Math.sin(i) * r[0] + Math.cos(i) * r[1]];
        return s;
      }
      function getProjectingAngle(t, e) {
        var r = e === 0 ? t.length() - 1 : e - 1, i = (e + 1) % t.length(), s = t.v[r], n = t.v[i], a = getPerpendicularVector(s, n);
        return Math.atan2(0, 1) - Math.atan2(a[1], a[0]);
      }
      function zigZagCorner(t, e, r, i, s, n, a) {
        var l = getProjectingAngle(e, r), o = e.v[r % e._length], f = e.v[r === 0 ? e._length - 1 : r - 1], m = e.v[(r + 1) % e._length], b = n === 2 ? Math.sqrt(Math.pow(o[0] - f[0], 2) + Math.pow(o[1] - f[1], 2)) : 0, h = n === 2 ? Math.sqrt(Math.pow(o[0] - m[0], 2) + Math.pow(o[1] - m[1], 2)) : 0;
        setPoint(t, e.v[r % e._length], l, a, i, h / ((s + 1) * 2), b / ((s + 1) * 2));
      }
      function zigZagSegment(t, e, r, i, s, n) {
        for (var a = 0; a < i; a += 1) {
          var l = (a + 1) / (i + 1), o = s === 2 ? Math.sqrt(Math.pow(e.points[3][0] - e.points[0][0], 2) + Math.pow(e.points[3][1] - e.points[0][1], 2)) : 0, f = e.normalAngle(l), m = e.point(l);
          setPoint(t, m, f, n, r, o / ((i + 1) * 2), o / ((i + 1) * 2)), n = -n;
        }
        return n;
      }
      ZigZagModifier.prototype.processPath = function(t, e, r, i) {
        var s = t._length, n = shapePool.newElement();
        if (n.c = t.c, t.c || (s -= 1), s === 0) return n;
        var a = -1, l = PolynomialBezier.shapeSegment(t, 0);
        zigZagCorner(n, t, 0, e, r, i, a);
        for (var o = 0; o < s; o += 1)
          a = zigZagSegment(n, l, e, r, i, -a), o === s - 1 && !t.c ? l = null : l = PolynomialBezier.shapeSegment(t, (o + 1) % s), zigZagCorner(n, t, o + 1, e, r, i, a);
        return n;
      }, ZigZagModifier.prototype.processShapes = function(t) {
        var e, r, i = this.shapes.length, s, n, a = this.amplitude.v, l = Math.max(0, Math.round(this.frequency.v)), o = this.pointsType.v;
        if (a !== 0) {
          var f, m;
          for (r = 0; r < i; r += 1) {
            if (f = this.shapes[r], m = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !t))
              for (m.releaseShapes(), f.shape._mdf = !0, e = f.shape.paths.shapes, n = f.shape.paths._length, s = 0; s < n; s += 1)
                m.addShape(this.processPath(e[s], a, l, o));
            f.shape.paths = f.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function linearOffset(t, e, r) {
        var i = Math.atan2(e[0] - t[0], e[1] - t[1]);
        return [polarOffset(t, i, r), polarOffset(e, i, r)];
      }
      function offsetSegment(t, e) {
        var r, i, s, n, a, l, o;
        o = linearOffset(t.points[0], t.points[1], e), r = o[0], i = o[1], o = linearOffset(t.points[1], t.points[2], e), s = o[0], n = o[1], o = linearOffset(t.points[2], t.points[3], e), a = o[0], l = o[1];
        var f = lineIntersection(r, i, s, n);
        f === null && (f = i);
        var m = lineIntersection(a, l, s, n);
        return m === null && (m = a), new PolynomialBezier(r, f, m, l);
      }
      function joinLines(t, e, r, i, s) {
        var n = e.points[3], a = r.points[0];
        if (i === 3 || pointEqual(n, a)) return n;
        if (i === 2) {
          var l = -e.tangentAngle(1), o = -r.tangentAngle(0) + Math.PI, f = lineIntersection(n, polarOffset(n, l + Math.PI / 2, 100), a, polarOffset(a, l + Math.PI / 2, 100)), m = f ? pointDistance(f, n) : pointDistance(n, a) / 2, b = polarOffset(n, l, 2 * m * roundCorner);
          return t.setXYAt(b[0], b[1], "o", t.length() - 1), b = polarOffset(a, o, 2 * m * roundCorner), t.setTripleAt(a[0], a[1], a[0], a[1], b[0], b[1], t.length()), a;
        }
        var h = pointEqual(n, e.points[2]) ? e.points[0] : e.points[2], g = pointEqual(a, r.points[1]) ? r.points[3] : r.points[1], y = lineIntersection(h, n, a, g);
        return y && pointDistance(y, n) < s ? (t.setTripleAt(y[0], y[1], y[0], y[1], y[0], y[1], t.length()), y) : n;
      }
      function getIntersection(t, e) {
        var r = t.intersections(e);
        return r.length && floatEqual(r[0][0], 1) && r.shift(), r.length ? r[0] : null;
      }
      function pruneSegmentIntersection(t, e) {
        var r = t.slice(), i = e.slice(), s = getIntersection(t[t.length - 1], e[0]);
        return s && (r[t.length - 1] = t[t.length - 1].split(s[0])[0], i[0] = e[0].split(s[1])[1]), t.length > 1 && e.length > 1 && (s = getIntersection(t[0], e[e.length - 1]), s) ? [[t[0].split(s[0])[0]], [e[e.length - 1].split(s[1])[1]]] : [r, i];
      }
      function pruneIntersections(t) {
        for (var e, r = 1; r < t.length; r += 1)
          e = pruneSegmentIntersection(t[r - 1], t[r]), t[r - 1] = e[0], t[r] = e[1];
        return t.length > 1 && (e = pruneSegmentIntersection(t[t.length - 1], t[0]), t[t.length - 1] = e[0], t[0] = e[1]), t;
      }
      function offsetSegmentSplit(t, e) {
        var r = t.inflectionPoints(), i, s, n, a;
        if (r.length === 0)
          return [offsetSegment(t, e)];
        if (r.length === 1 || floatEqual(r[1], 1))
          return n = t.split(r[0]), i = n[0], s = n[1], [offsetSegment(i, e), offsetSegment(s, e)];
        n = t.split(r[0]), i = n[0];
        var l = (r[1] - r[0]) / (1 - r[0]);
        return n = n[1].split(l), a = n[0], s = n[1], [offsetSegment(i, e), offsetSegment(a, e), offsetSegment(s, e)];
      }
      function OffsetPathModifier() {
      }
      extendPrototype([ShapeModifier], OffsetPathModifier), OffsetPathModifier.prototype.initModifierProperties = function(t, e) {
        this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(t, e.a, 0, null, this), this.miterLimit = PropertyFactory.getProp(t, e.ml, 0, null, this), this.lineJoin = e.lj, this._isAnimated = this.amount.effectsSequence.length !== 0;
      }, OffsetPathModifier.prototype.processPath = function(t, e, r, i) {
        var s = shapePool.newElement();
        s.c = t.c;
        var n = t.length();
        t.c || (n -= 1);
        var a, l, o, f = [];
        for (a = 0; a < n; a += 1)
          o = PolynomialBezier.shapeSegment(t, a), f.push(offsetSegmentSplit(o, e));
        if (!t.c)
          for (a = n - 1; a >= 0; a -= 1)
            o = PolynomialBezier.shapeSegmentInverted(t, a), f.push(offsetSegmentSplit(o, e));
        f = pruneIntersections(f);
        var m = null, b = null;
        for (a = 0; a < f.length; a += 1) {
          var h = f[a];
          for (b && (m = joinLines(s, b, h[0], r, i)), b = h[h.length - 1], l = 0; l < h.length; l += 1)
            o = h[l], m && pointEqual(o.points[0], m) ? s.setXYAt(o.points[1][0], o.points[1][1], "o", s.length() - 1) : s.setTripleAt(o.points[0][0], o.points[0][1], o.points[1][0], o.points[1][1], o.points[0][0], o.points[0][1], s.length()), s.setTripleAt(o.points[3][0], o.points[3][1], o.points[3][0], o.points[3][1], o.points[2][0], o.points[2][1], s.length()), m = o.points[3];
        }
        return f.length && joinLines(s, b, f[0][0], r, i), s;
      }, OffsetPathModifier.prototype.processShapes = function(t) {
        var e, r, i = this.shapes.length, s, n, a = this.amount.v, l = this.miterLimit.v, o = this.lineJoin;
        if (a !== 0) {
          var f, m;
          for (r = 0; r < i; r += 1) {
            if (f = this.shapes[r], m = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !t))
              for (m.releaseShapes(), f.shape._mdf = !0, e = f.shape.paths.shapes, n = f.shape.paths._length, s = 0; s < n; s += 1)
                m.addShape(this.processPath(e[s], a, o, l));
            f.shape.paths = f.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function getFontProperties(t) {
        for (var e = t.fStyle ? t.fStyle.split(" ") : [], r = "normal", i = "normal", s = e.length, n, a = 0; a < s; a += 1)
          switch (n = e[a].toLowerCase(), n) {
            case "italic":
              i = "italic";
              break;
            case "bold":
              r = "700";
              break;
            case "black":
              r = "900";
              break;
            case "medium":
              r = "500";
              break;
            case "regular":
            case "normal":
              r = "400";
              break;
            case "light":
            case "thin":
              r = "200";
              break;
          }
        return {
          style: i,
          weight: t.fWeight || r
        };
      }
      var FontManager = function() {
        var t = 5e3, e = {
          w: 0,
          size: 0,
          shapes: [],
          data: {
            shapes: []
          }
        }, r = [];
        r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
        var i = 127988, s = 917631, n = 917601, a = 917626, l = 65039, o = 8205, f = 127462, m = 127487, b = ["d83cdffb", "d83cdffc", "d83cdffd", "d83cdffe", "d83cdfff"];
        function h(C) {
          var M = C.split(","), E, x = M.length, F = [];
          for (E = 0; E < x; E += 1)
            M[E] !== "sans-serif" && M[E] !== "monospace" && F.push(M[E]);
          return F.join(",");
        }
        function g(C, M) {
          var E = createTag("span");
          E.setAttribute("aria-hidden", !0), E.style.fontFamily = M;
          var x = createTag("span");
          x.innerText = "giItT1WQy@!-/#", E.style.position = "absolute", E.style.left = "-10000px", E.style.top = "-10000px", E.style.fontSize = "300px", E.style.fontVariant = "normal", E.style.fontStyle = "normal", E.style.fontWeight = "normal", E.style.letterSpacing = "0", E.appendChild(x), document.body.appendChild(E);
          var F = x.offsetWidth;
          return x.style.fontFamily = h(C) + ", " + M, {
            node: x,
            w: F,
            parent: E
          };
        }
        function y() {
          var C, M = this.fonts.length, E, x, F = M;
          for (C = 0; C < M; C += 1)
            this.fonts[C].loaded ? F -= 1 : this.fonts[C].fOrigin === "n" || this.fonts[C].origin === 0 ? this.fonts[C].loaded = !0 : (E = this.fonts[C].monoCase.node, x = this.fonts[C].monoCase.w, E.offsetWidth !== x ? (F -= 1, this.fonts[C].loaded = !0) : (E = this.fonts[C].sansCase.node, x = this.fonts[C].sansCase.w, E.offsetWidth !== x && (F -= 1, this.fonts[C].loaded = !0)), this.fonts[C].loaded && (this.fonts[C].sansCase.parent.parentNode.removeChild(this.fonts[C].sansCase.parent), this.fonts[C].monoCase.parent.parentNode.removeChild(this.fonts[C].monoCase.parent)));
          F !== 0 && Date.now() - this.initTime < t ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10);
        }
        function u(C, M) {
          var E = document.body && M ? "svg" : "canvas", x, F = getFontProperties(C);
          if (E === "svg") {
            var k = createNS("text");
            k.style.fontSize = "100px", k.setAttribute("font-family", C.fFamily), k.setAttribute("font-style", F.style), k.setAttribute("font-weight", F.weight), k.textContent = "1", C.fClass ? (k.style.fontFamily = "inherit", k.setAttribute("class", C.fClass)) : k.style.fontFamily = C.fFamily, M.appendChild(k), x = k;
          } else {
            var B = new OffscreenCanvas(500, 500).getContext("2d");
            B.font = F.style + " " + F.weight + " 100px " + C.fFamily, x = B;
          }
          function j(G) {
            return E === "svg" ? (x.textContent = G, x.getComputedTextLength()) : x.measureText(G).width;
          }
          return {
            measureText: j
          };
        }
        function P(C, M) {
          if (!C) {
            this.isLoaded = !0;
            return;
          }
          if (this.chars) {
            this.isLoaded = !0, this.fonts = C.list;
            return;
          }
          if (!document.body) {
            this.isLoaded = !0, C.list.forEach(function(Y) {
              Y.helper = u(Y), Y.cache = {};
            }), this.fonts = C.list;
            return;
          }
          var E = C.list, x, F = E.length, k = F;
          for (x = 0; x < F; x += 1) {
            var B = !0, j, G;
            if (E[x].loaded = !1, E[x].monoCase = g(E[x].fFamily, "monospace"), E[x].sansCase = g(E[x].fFamily, "sans-serif"), !E[x].fPath)
              E[x].loaded = !0, k -= 1;
            else if (E[x].fOrigin === "p" || E[x].origin === 3) {
              if (j = document.querySelectorAll('style[f-forigin="p"][f-family="' + E[x].fFamily + '"], style[f-origin="3"][f-family="' + E[x].fFamily + '"]'), j.length > 0 && (B = !1), B) {
                var z = createTag("style");
                z.setAttribute("f-forigin", E[x].fOrigin), z.setAttribute("f-origin", E[x].origin), z.setAttribute("f-family", E[x].fFamily), z.type = "text/css", z.innerText = "@font-face {font-family: " + E[x].fFamily + "; font-style: normal; src: url('" + E[x].fPath + "');}", M.appendChild(z);
              }
            } else if (E[x].fOrigin === "g" || E[x].origin === 1) {
              for (j = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), G = 0; G < j.length; G += 1)
                j[G].href.indexOf(E[x].fPath) !== -1 && (B = !1);
              if (B) {
                var H = createTag("link");
                H.setAttribute("f-forigin", E[x].fOrigin), H.setAttribute("f-origin", E[x].origin), H.type = "text/css", H.rel = "stylesheet", H.href = E[x].fPath, document.body.appendChild(H);
              }
            } else if (E[x].fOrigin === "t" || E[x].origin === 2) {
              for (j = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), G = 0; G < j.length; G += 1)
                E[x].fPath === j[G].src && (B = !1);
              if (B) {
                var $ = createTag("link");
                $.setAttribute("f-forigin", E[x].fOrigin), $.setAttribute("f-origin", E[x].origin), $.setAttribute("rel", "stylesheet"), $.setAttribute("href", E[x].fPath), M.appendChild($);
              }
            }
            E[x].helper = u(E[x], M), E[x].cache = {}, this.fonts.push(E[x]);
          }
          k === 0 ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
        }
        function c(C) {
          if (C) {
            this.chars || (this.chars = []);
            var M, E = C.length, x, F = this.chars.length, k;
            for (M = 0; M < E; M += 1) {
              for (x = 0, k = !1; x < F; )
                this.chars[x].style === C[M].style && this.chars[x].fFamily === C[M].fFamily && this.chars[x].ch === C[M].ch && (k = !0), x += 1;
              k || (this.chars.push(C[M]), F += 1);
            }
          }
        }
        function d(C, M, E) {
          for (var x = 0, F = this.chars.length; x < F; ) {
            if (this.chars[x].ch === C && this.chars[x].style === M && this.chars[x].fFamily === E)
              return this.chars[x];
            x += 1;
          }
          return (typeof C == "string" && C.charCodeAt(0) !== 13 || !C) && console && console.warn && !this._warned && (this._warned = !0, console.warn("Missing character from exported characters list: ", C, M, E)), e;
        }
        function p(C, M, E) {
          var x = this.getFontByName(M), F = C;
          if (!x.cache[F]) {
            var k = x.helper;
            if (C === " ") {
              var B = k.measureText("|" + C + "|"), j = k.measureText("||");
              x.cache[F] = (B - j) / 100;
            } else
              x.cache[F] = k.measureText(C) / 100;
          }
          return x.cache[F] * E;
        }
        function v(C) {
          for (var M = 0, E = this.fonts.length; M < E; ) {
            if (this.fonts[M].fName === C)
              return this.fonts[M];
            M += 1;
          }
          return this.fonts[0];
        }
        function S(C) {
          var M = 0, E = C.charCodeAt(0);
          if (E >= 55296 && E <= 56319) {
            var x = C.charCodeAt(1);
            x >= 56320 && x <= 57343 && (M = (E - 55296) * 1024 + x - 56320 + 65536);
          }
          return M;
        }
        function _(C, M) {
          var E = C.toString(16) + M.toString(16);
          return b.indexOf(E) !== -1;
        }
        function A(C) {
          return C === o;
        }
        function T(C) {
          return C === l;
        }
        function w(C) {
          var M = S(C);
          return M >= f && M <= m;
        }
        function V(C) {
          return w(C.substr(0, 2)) && w(C.substr(2, 2));
        }
        function D(C) {
          return r.indexOf(C) !== -1;
        }
        function I(C, M) {
          var E = S(C.substr(M, 2));
          if (E !== i)
            return !1;
          var x = 0;
          for (M += 2; x < 5; ) {
            if (E = S(C.substr(M, 2)), E < n || E > a)
              return !1;
            x += 1, M += 2;
          }
          return S(C.substr(M, 2)) === s;
        }
        function R() {
          this.isLoaded = !0;
        }
        var O = function() {
          this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this._warned = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
        };
        O.isModifier = _, O.isZeroWidthJoiner = A, O.isFlagEmoji = V, O.isRegionalCode = w, O.isCombinedCharacter = D, O.isRegionalFlag = I, O.isVariationSelector = T, O.BLACK_FLAG_CODE_POINT = i;
        var L = {
          addChars: c,
          addFonts: P,
          getCharData: d,
          getFontByName: v,
          measureText: p,
          checkLoadedFonts: y,
          setIsLoaded: R
        };
        return O.prototype = L, O;
      }();
      function SlotManager(t) {
        this.animationData = t;
      }
      SlotManager.prototype.getProp = function(t) {
        return this.animationData.slots && this.animationData.slots[t.sid] ? Object.assign(t, this.animationData.slots[t.sid].p) : t;
      };
      function slotFactory(t) {
        return new SlotManager(t);
      }
      function RenderableElement() {
      }
      RenderableElement.prototype = {
        initRenderable: function() {
          this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
        },
        addRenderableComponent: function(e) {
          this.renderableComponents.indexOf(e) === -1 && this.renderableComponents.push(e);
        },
        removeRenderableComponent: function(e) {
          this.renderableComponents.indexOf(e) !== -1 && this.renderableComponents.splice(this.renderableComponents.indexOf(e), 1);
        },
        prepareRenderableFrame: function(e) {
          this.checkLayerLimits(e);
        },
        checkTransparency: function() {
          this.finalTransform.mProp.o.v <= 0 ? !this.isTransparent && this.globalData.renderConfig.hideOnTransparent && (this.isTransparent = !0, this.hide()) : this.isTransparent && (this.isTransparent = !1, this.show());
        },
        /**
           * @function
           * Initializes frame related properties.
           *
           * @param {number} num
           * current frame number in Layer's time
           *
           */
        checkLayerLimits: function(e) {
          this.data.ip - this.data.st <= e && this.data.op - this.data.st > e ? this.isInRange !== !0 && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : this.isInRange !== !1 && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
        },
        renderRenderable: function() {
          var e, r = this.renderableComponents.length;
          for (e = 0; e < r; e += 1)
            this.renderableComponents[e].renderFrame(this._isFirstFrame);
        },
        sourceRectAtTime: function() {
          return {
            top: 0,
            left: 0,
            width: 100,
            height: 100
          };
        },
        getLayerSize: function() {
          return this.data.ty === 5 ? {
            w: this.data.textData.width,
            h: this.data.textData.height
          } : {
            w: this.data.width,
            h: this.data.height
          };
        }
      };
      var getBlendMode = /* @__PURE__ */ function() {
        var t = {
          0: "source-over",
          1: "multiply",
          2: "screen",
          3: "overlay",
          4: "darken",
          5: "lighten",
          6: "color-dodge",
          7: "color-burn",
          8: "hard-light",
          9: "soft-light",
          10: "difference",
          11: "exclusion",
          12: "hue",
          13: "saturation",
          14: "color",
          15: "luminosity"
        };
        return function(e) {
          return t[e] || "";
        };
      }();
      function SliderEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }
      function AngleEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }
      function ColorEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }
      function PointEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 1, 0, r);
      }
      function LayerIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }
      function MaskIndexEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }
      function CheckboxEffect(t, e, r) {
        this.p = PropertyFactory.getProp(e, t.v, 0, 0, r);
      }
      function NoValueEffect() {
        this.p = {};
      }
      function EffectsManager(t, e) {
        var r = t.ef || [];
        this.effectElements = [];
        var i, s = r.length, n;
        for (i = 0; i < s; i += 1)
          n = new GroupEffect(r[i], e), this.effectElements.push(n);
      }
      function GroupEffect(t, e) {
        this.init(t, e);
      }
      extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(t, e) {
        this.data = t, this.effectElements = [], this.initDynamicPropertyContainer(e);
        var r, i = this.data.ef.length, s, n = this.data.ef;
        for (r = 0; r < i; r += 1) {
          switch (s = null, n[r].ty) {
            case 0:
              s = new SliderEffect(n[r], e, this);
              break;
            case 1:
              s = new AngleEffect(n[r], e, this);
              break;
            case 2:
              s = new ColorEffect(n[r], e, this);
              break;
            case 3:
              s = new PointEffect(n[r], e, this);
              break;
            case 4:
            case 7:
              s = new CheckboxEffect(n[r], e, this);
              break;
            case 10:
              s = new LayerIndexEffect(n[r], e, this);
              break;
            case 11:
              s = new MaskIndexEffect(n[r], e, this);
              break;
            case 5:
              s = new EffectsManager(n[r], e);
              break;
            // case 6:
            default:
              s = new NoValueEffect(n[r]);
              break;
          }
          s && this.effectElements.push(s);
        }
      };
      function BaseElement() {
      }
      BaseElement.prototype = {
        checkMasks: function() {
          if (!this.data.hasMask)
            return !1;
          for (var e = 0, r = this.data.masksProperties.length; e < r; ) {
            if (this.data.masksProperties[e].mode !== "n" && this.data.masksProperties[e].cl !== !1)
              return !0;
            e += 1;
          }
          return !1;
        },
        initExpressions: function() {
          var e = getExpressionInterfaces();
          if (e) {
            var r = e("layer"), i = e("effects"), s = e("shape"), n = e("text"), a = e("comp");
            this.layerInterface = r(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
            var l = i.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(l), this.data.ty === 0 || this.data.xt ? this.compInterface = a(this) : this.data.ty === 4 ? (this.layerInterface.shapeInterface = s(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : this.data.ty === 5 && (this.layerInterface.textInterface = n(this), this.layerInterface.text = this.layerInterface.textInterface);
          }
        },
        setBlendMode: function() {
          var e = getBlendMode(this.data.bm), r = this.baseElement || this.layerElement;
          r.style["mix-blend-mode"] = e;
        },
        initBaseData: function(e, r, i) {
          this.globalData = r, this.comp = i, this.data = e, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
        },
        getType: function() {
          return this.type;
        },
        sourceRectAtTime: function() {
        }
      };
      function FrameElement() {
      }
      FrameElement.prototype = {
        /**
           * @function
           * Initializes frame related properties.
           *
           */
        initFrame: function() {
          this._isFirstFrame = !1, this.dynamicProperties = [], this._mdf = !1;
        },
        /**
           * @function
           * Calculates all dynamic values
           *
           * @param {number} num
           * current frame number in Layer's time
           * @param {boolean} isVisible
           * if layers is currently in range
           *
           */
        prepareProperties: function(e, r) {
          var i, s = this.dynamicProperties.length;
          for (i = 0; i < s; i += 1)
            (r || this._isParent && this.dynamicProperties[i].propType === "transform") && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
        },
        addDynamicProperty: function(e) {
          this.dynamicProperties.indexOf(e) === -1 && this.dynamicProperties.push(e);
        }
      };
      function FootageElement(t, e, r) {
        this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.footageData = e.imageLoader.getAsset(this.assetData), this.initBaseData(t, e, r);
      }
      FootageElement.prototype.prepareFrame = function() {
      }, extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement), FootageElement.prototype.getBaseElement = function() {
        return null;
      }, FootageElement.prototype.renderFrame = function() {
      }, FootageElement.prototype.destroy = function() {
      }, FootageElement.prototype.initExpressions = function() {
        var t = getExpressionInterfaces();
        if (t) {
          var e = t("footage");
          this.layerInterface = e(this);
        }
      }, FootageElement.prototype.getFootageData = function() {
        return this.footageData;
      };
      function AudioElement(t, e, r) {
        this.initFrame(), this.initRenderable(), this.assetData = e.getAssetData(t.refId), this.initBaseData(t, e, r), this._isPlaying = !1, this._canPlay = !1;
        var i = this.globalData.getAssetsPath(this.assetData);
        this.audio = this.globalData.audioController.createAudio(i), this._currentTime = 0, this.globalData.audioController.addAudio(this), this._volumeMultiplier = 1, this._volume = 1, this._previousVolume = null, this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        }, this.lv = PropertyFactory.getProp(this, t.au && t.au.lv ? t.au.lv : {
          k: [100]
        }, 1, 0.01, this);
      }
      AudioElement.prototype.prepareFrame = function(t) {
        if (this.prepareRenderableFrame(t, !0), this.prepareProperties(t, !0), this.tm._placeholder)
          this._currentTime = t / this.data.sr;
        else {
          var e = this.tm.v;
          this._currentTime = e;
        }
        this._volume = this.lv.v[0];
        var r = this._volume * this._volumeMultiplier;
        this._previousVolume !== r && (this._previousVolume = r, this.audio.volume(r));
      }, extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement), AudioElement.prototype.renderFrame = function() {
        this.isInRange && this._canPlay && (this._isPlaying ? (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1) && this.audio.seek(this._currentTime / this.globalData.frameRate) : (this.audio.play(), this.audio.seek(this._currentTime / this.globalData.frameRate), this._isPlaying = !0));
      }, AudioElement.prototype.show = function() {
      }, AudioElement.prototype.hide = function() {
        this.audio.pause(), this._isPlaying = !1;
      }, AudioElement.prototype.pause = function() {
        this.audio.pause(), this._isPlaying = !1, this._canPlay = !1;
      }, AudioElement.prototype.resume = function() {
        this._canPlay = !0;
      }, AudioElement.prototype.setRate = function(t) {
        this.audio.rate(t);
      }, AudioElement.prototype.volume = function(t) {
        this._volumeMultiplier = t, this._previousVolume = t * this._volume, this.audio.volume(this._previousVolume);
      }, AudioElement.prototype.getBaseElement = function() {
        return null;
      }, AudioElement.prototype.destroy = function() {
      }, AudioElement.prototype.sourceRectAtTime = function() {
      }, AudioElement.prototype.initExpressions = function() {
      };
      function BaseRenderer() {
      }
      BaseRenderer.prototype.checkLayers = function(t) {
        var e, r = this.layers.length, i;
        for (this.completeLayers = !0, e = r - 1; e >= 0; e -= 1)
          this.elements[e] || (i = this.layers[e], i.ip - i.st <= t - this.layers[e].st && i.op - i.st > t - this.layers[e].st && this.buildItem(e)), this.completeLayers = this.elements[e] ? this.completeLayers : !1;
        this.checkPendingElements();
      }, BaseRenderer.prototype.createItem = function(t) {
        switch (t.ty) {
          case 2:
            return this.createImage(t);
          case 0:
            return this.createComp(t);
          case 1:
            return this.createSolid(t);
          case 3:
            return this.createNull(t);
          case 4:
            return this.createShape(t);
          case 5:
            return this.createText(t);
          case 6:
            return this.createAudio(t);
          case 13:
            return this.createCamera(t);
          case 15:
            return this.createFootage(t);
          default:
            return this.createNull(t);
        }
      }, BaseRenderer.prototype.createCamera = function() {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }, BaseRenderer.prototype.createAudio = function(t) {
        return new AudioElement(t, this.globalData, this);
      }, BaseRenderer.prototype.createFootage = function(t) {
        return new FootageElement(t, this.globalData, this);
      }, BaseRenderer.prototype.buildAllItems = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
          this.buildItem(t);
        this.checkPendingElements();
      }, BaseRenderer.prototype.includeLayers = function(t) {
        this.completeLayers = !1;
        var e, r = t.length, i, s = this.layers.length;
        for (e = 0; e < r; e += 1)
          for (i = 0; i < s; ) {
            if (this.layers[i].id === t[e].id) {
              this.layers[i] = t[e];
              break;
            }
            i += 1;
          }
      }, BaseRenderer.prototype.setProjectInterface = function(t) {
        this.globalData.projectInterface = t;
      }, BaseRenderer.prototype.initItems = function() {
        this.globalData.progressiveLoad || this.buildAllItems();
      }, BaseRenderer.prototype.buildElementParenting = function(t, e, r) {
        for (var i = this.elements, s = this.layers, n = 0, a = s.length; n < a; )
          s[n].ind == e && (!i[n] || i[n] === !0 ? (this.buildItem(n), this.addPendingElement(t)) : (r.push(i[n]), i[n].setAsParent(), s[n].parent !== void 0 ? this.buildElementParenting(t, s[n].parent, r) : t.setHierarchy(r))), n += 1;
      }, BaseRenderer.prototype.addPendingElement = function(t) {
        this.pendingElements.push(t);
      }, BaseRenderer.prototype.searchExtraCompositions = function(t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
          if (t[e].xt) {
            var i = this.createComp(t[e]);
            i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
          }
      }, BaseRenderer.prototype.getElementById = function(t) {
        var e, r = this.elements.length;
        for (e = 0; e < r; e += 1)
          if (this.elements[e].data.ind === t)
            return this.elements[e];
        return null;
      }, BaseRenderer.prototype.getElementByPath = function(t) {
        var e = t.shift(), r;
        if (typeof e == "number")
          r = this.elements[e];
        else {
          var i, s = this.elements.length;
          for (i = 0; i < s; i += 1)
            if (this.elements[i].data.nm === e) {
              r = this.elements[i];
              break;
            }
        }
        return t.length === 0 ? r : r.getElementByPath(t);
      }, BaseRenderer.prototype.setupGlobalData = function(t, e) {
        this.globalData.fontManager = new FontManager(), this.globalData.slotManager = slotFactory(t), this.globalData.fontManager.addChars(t.chars), this.globalData.fontManager.addFonts(t.fonts, e), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = t.fr, this.globalData.nm = t.nm, this.globalData.compSize = {
          w: t.w,
          h: t.h
        };
      };
      var effectTypes = {
        TRANSFORM_EFFECT: "transformEFfect"
      };
      function TransformElement() {
      }
      TransformElement.prototype = {
        initTransform: function() {
          var e = new Matrix();
          this.finalTransform = {
            mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
              o: 0
            },
            _matMdf: !1,
            _localMatMdf: !1,
            _opMdf: !1,
            mat: e,
            localMat: e,
            localOpacity: 1
          }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
        },
        renderTransform: function() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var e, r = this.finalTransform.mat, i = 0, s = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; i < s; ) {
                if (this.hierarchy[i].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = !0;
                  break;
                }
                i += 1;
              }
            if (this.finalTransform._matMdf)
              for (e = this.finalTransform.mProp.v.props, r.cloneFromProps(e), i = 0; i < s; i += 1)
                r.multiply(this.hierarchy[i].finalTransform.mProp.v);
          }
          this.finalTransform._matMdf && (this.finalTransform._localMatMdf = this.finalTransform._matMdf), this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v);
        },
        renderLocalTransform: function() {
          if (this.localTransforms) {
            var e = 0, r = this.localTransforms.length;
            if (this.finalTransform._localMatMdf = this.finalTransform._matMdf, !this.finalTransform._localMatMdf || !this.finalTransform._opMdf)
              for (; e < r; )
                this.localTransforms[e]._mdf && (this.finalTransform._localMatMdf = !0), this.localTransforms[e]._opMdf && !this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v, this.finalTransform._opMdf = !0), e += 1;
            if (this.finalTransform._localMatMdf) {
              var i = this.finalTransform.localMat;
              for (this.localTransforms[0].matrix.clone(i), e = 1; e < r; e += 1) {
                var s = this.localTransforms[e].matrix;
                i.multiply(s);
              }
              i.multiply(this.finalTransform.mat);
            }
            if (this.finalTransform._opMdf) {
              var n = this.finalTransform.localOpacity;
              for (e = 0; e < r; e += 1)
                n *= this.localTransforms[e].opacity * 0.01;
              this.finalTransform.localOpacity = n;
            }
          }
        },
        searchEffectTransforms: function() {
          if (this.renderableEffectsManager) {
            var e = this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);
            if (e.length) {
              this.localTransforms = [], this.finalTransform.localMat = new Matrix();
              var r = 0, i = e.length;
              for (r = 0; r < i; r += 1)
                this.localTransforms.push(e[r]);
            }
          }
        },
        globalToLocal: function(e) {
          var r = [];
          r.push(this.finalTransform);
          for (var i = !0, s = this.comp; i; )
            s.finalTransform ? (s.data.hasMask && r.splice(0, 0, s.finalTransform), s = s.comp) : i = !1;
          var n, a = r.length, l;
          for (n = 0; n < a; n += 1)
            l = r[n].mat.applyToPointArray(0, 0, 0), e = [e[0] - l[0], e[1] - l[1], 0];
          return e;
        },
        mHelper: new Matrix()
      };
      function MaskElement(t, e, r) {
        this.data = t, this.element = e, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var i = this.globalData.defs, s, n = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = createSizedArray(n), this.solidPath = "";
        var a, l = this.masksProperties, o = 0, f = [], m, b, h = createElementID(), g, y, u, P, c = "clipPath", d = "clip-path";
        for (s = 0; s < n; s += 1)
          if ((l[s].mode !== "a" && l[s].mode !== "n" || l[s].inv || l[s].o.k !== 100 || l[s].o.x) && (c = "mask", d = "mask"), (l[s].mode === "s" || l[s].mode === "i") && o === 0 ? (g = createNS("rect"), g.setAttribute("fill", "#ffffff"), g.setAttribute("width", this.element.comp.data.w || 0), g.setAttribute("height", this.element.comp.data.h || 0), f.push(g)) : g = null, a = createNS("path"), l[s].mode === "n")
            this.viewData[s] = {
              op: PropertyFactory.getProp(this.element, l[s].o, 0, 0.01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, l[s], 3),
              elem: a,
              lastPath: ""
            }, i.appendChild(a);
          else {
            o += 1, a.setAttribute("fill", l[s].mode === "s" ? "#000000" : "#ffffff"), a.setAttribute("clip-rule", "nonzero");
            var p;
            if (l[s].x.k !== 0 ? (c = "mask", d = "mask", P = PropertyFactory.getProp(this.element, l[s].x, 0, null, this.element), p = createElementID(), y = createNS("filter"), y.setAttribute("id", p), u = createNS("feMorphology"), u.setAttribute("operator", "erode"), u.setAttribute("in", "SourceGraphic"), u.setAttribute("radius", "0"), y.appendChild(u), i.appendChild(y), a.setAttribute("stroke", l[s].mode === "s" ? "#000000" : "#ffffff")) : (u = null, P = null), this.storedData[s] = {
              elem: a,
              x: P,
              expan: u,
              lastPath: "",
              lastOperator: "",
              filterId: p,
              lastRadius: 0
            }, l[s].mode === "i") {
              b = f.length;
              var v = createNS("g");
              for (m = 0; m < b; m += 1)
                v.appendChild(f[m]);
              var S = createNS("mask");
              S.setAttribute("mask-type", "alpha"), S.setAttribute("id", h + "_" + o), S.appendChild(a), i.appendChild(S), v.setAttribute("mask", "url(" + getLocationHref() + "#" + h + "_" + o + ")"), f.length = 0, f.push(v);
            } else
              f.push(a);
            l[s].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[s] = {
              elem: a,
              lastPath: "",
              op: PropertyFactory.getProp(this.element, l[s].o, 0, 0.01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, l[s], 3),
              invRect: g
            }, this.viewData[s].prop.k || this.drawPath(l[s], this.viewData[s].prop.v, this.viewData[s]);
          }
        for (this.maskElement = createNS(c), n = f.length, s = 0; s < n; s += 1)
          this.maskElement.appendChild(f[s]);
        o > 0 && (this.maskElement.setAttribute("id", h), this.element.maskedElement.setAttribute(d, "url(" + getLocationHref() + "#" + h + ")"), i.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
      }
      MaskElement.prototype.getMaskProperty = function(t) {
        return this.viewData[t].prop;
      }, MaskElement.prototype.renderFrame = function(t) {
        var e = this.element.finalTransform.mat, r, i = this.masksProperties.length;
        for (r = 0; r < i; r += 1)
          if ((this.viewData[r].prop._mdf || t) && this.drawPath(this.masksProperties[r], this.viewData[r].prop.v, this.viewData[r]), (this.viewData[r].op._mdf || t) && this.viewData[r].elem.setAttribute("fill-opacity", this.viewData[r].op.v), this.masksProperties[r].mode !== "n" && (this.viewData[r].invRect && (this.element.finalTransform.mProp._mdf || t) && this.viewData[r].invRect.setAttribute("transform", e.getInverseMatrix().to2dCSS()), this.storedData[r].x && (this.storedData[r].x._mdf || t))) {
            var s = this.storedData[r].expan;
            this.storedData[r].x.v < 0 ? (this.storedData[r].lastOperator !== "erode" && (this.storedData[r].lastOperator = "erode", this.storedData[r].elem.setAttribute("filter", "url(" + getLocationHref() + "#" + this.storedData[r].filterId + ")")), s.setAttribute("radius", -this.storedData[r].x.v)) : (this.storedData[r].lastOperator !== "dilate" && (this.storedData[r].lastOperator = "dilate", this.storedData[r].elem.setAttribute("filter", null)), this.storedData[r].elem.setAttribute("stroke-width", this.storedData[r].x.v * 2));
          }
      }, MaskElement.prototype.getMaskelement = function() {
        return this.maskElement;
      }, MaskElement.prototype.createLayerSolidPath = function() {
        var t = "M0,0 ";
        return t += " h" + this.globalData.compSize.w, t += " v" + this.globalData.compSize.h, t += " h-" + this.globalData.compSize.w, t += " v-" + this.globalData.compSize.h + " ", t;
      }, MaskElement.prototype.drawPath = function(t, e, r) {
        var i = " M" + e.v[0][0] + "," + e.v[0][1], s, n;
        for (n = e._length, s = 1; s < n; s += 1)
          i += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[s][0] + "," + e.i[s][1] + " " + e.v[s][0] + "," + e.v[s][1];
        if (e.c && n > 1 && (i += " C" + e.o[s - 1][0] + "," + e.o[s - 1][1] + " " + e.i[0][0] + "," + e.i[0][1] + " " + e.v[0][0] + "," + e.v[0][1]), r.lastPath !== i) {
          var a = "";
          r.elem && (e.c && (a = t.inv ? this.solidPath + i : i), r.elem.setAttribute("d", a)), r.lastPath = i;
        }
      }, MaskElement.prototype.destroy = function() {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
      };
      var filtersFactory = function() {
        var t = {};
        t.createFilter = e, t.createAlphaToLuminanceFilter = r;
        function e(i, s) {
          var n = createNS("filter");
          return n.setAttribute("id", i), s !== !0 && (n.setAttribute("filterUnits", "objectBoundingBox"), n.setAttribute("x", "0%"), n.setAttribute("y", "0%"), n.setAttribute("width", "100%"), n.setAttribute("height", "100%")), n;
        }
        function r() {
          var i = createNS("feColorMatrix");
          return i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), i;
        }
        return t;
      }(), featureSupport = function() {
        var t = {
          maskType: !0,
          svgLumaHidden: !0,
          offscreenCanvas: typeof OffscreenCanvas < "u"
        };
        return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (t.maskType = !1), /firefox/i.test(navigator.userAgent) && (t.svgLumaHidden = !1), t;
      }(), registeredEffects$1 = {}, idPrefix = "filter_result_";
      function SVGEffects(t) {
        var e, r = "SourceGraphic", i = t.data.ef ? t.data.ef.length : 0, s = createElementID(), n = filtersFactory.createFilter(s, !0), a = 0;
        this.filters = [];
        var l;
        for (e = 0; e < i; e += 1) {
          l = null;
          var o = t.data.ef[e].ty;
          if (registeredEffects$1[o]) {
            var f = registeredEffects$1[o].effect;
            l = new f(n, t.effectsManager.effectElements[e], t, idPrefix + a, r), r = idPrefix + a, registeredEffects$1[o].countsAsEffect && (a += 1);
          }
          l && this.filters.push(l);
        }
        a && (t.globalData.defs.appendChild(n), t.layerElement.setAttribute("filter", "url(" + getLocationHref() + "#" + s + ")")), this.filters.length && t.addRenderableComponent(this);
      }
      SVGEffects.prototype.renderFrame = function(t) {
        var e, r = this.filters.length;
        for (e = 0; e < r; e += 1)
          this.filters[e].renderFrame(t);
      }, SVGEffects.prototype.getEffects = function(t) {
        var e, r = this.filters.length, i = [];
        for (e = 0; e < r; e += 1)
          this.filters[e].type === t && i.push(this.filters[e]);
        return i;
      };
      function registerEffect$1(t, e, r) {
        registeredEffects$1[t] = {
          effect: e,
          countsAsEffect: r
        };
      }
      function SVGBaseElement() {
      }
      SVGBaseElement.prototype = {
        initRendererElement: function() {
          this.layerElement = createNS("g");
        },
        createContainerElements: function() {
          this.matteElement = createNS("g"), this.transformedElement = this.layerElement, this.maskedElement = this.layerElement, this._sizeChanged = !1;
          var e = null;
          if (this.data.td) {
            this.matteMasks = {};
            var r = createNS("g");
            r.setAttribute("id", this.layerId), r.appendChild(this.layerElement), e = r, this.globalData.defs.appendChild(r);
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), e = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), this.data.ty === 0 && !this.data.hd) {
            var i = createNS("clipPath"), s = createNS("path");
            s.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var n = createElementID();
            if (i.setAttribute("id", n), i.appendChild(s), this.globalData.defs.appendChild(i), this.checkMasks()) {
              var a = createNS("g");
              a.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")"), a.appendChild(this.layerElement), this.transformedElement = a, e ? e.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else
              this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")");
          }
          this.data.bm !== 0 && this.setBlendMode();
        },
        renderElement: function() {
          this.finalTransform._localMatMdf && this.transformedElement.setAttribute("transform", this.finalTransform.localMat.to2dCSS()), this.finalTransform._opMdf && this.transformedElement.setAttribute("opacity", this.finalTransform.localOpacity);
        },
        destroyBaseElement: function() {
          this.layerElement = null, this.matteElement = null, this.maskManager.destroy();
        },
        getBaseElement: function() {
          return this.data.hd ? null : this.baseElement;
        },
        createRenderableComponents: function() {
          this.maskManager = new MaskElement(this.data, this, this.globalData), this.renderableEffectsManager = new SVGEffects(this), this.searchEffectTransforms();
        },
        getMatte: function(e) {
          if (this.matteMasks || (this.matteMasks = {}), !this.matteMasks[e]) {
            var r = this.layerId + "_" + e, i, s, n, a;
            if (e === 1 || e === 3) {
              var l = createNS("mask");
              l.setAttribute("id", r), l.setAttribute("mask-type", e === 3 ? "luminance" : "alpha"), n = createNS("use"), n.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), l.appendChild(n), this.globalData.defs.appendChild(l), !featureSupport.maskType && e === 1 && (l.setAttribute("mask-type", "luminance"), i = createElementID(), s = filtersFactory.createFilter(i), this.globalData.defs.appendChild(s), s.appendChild(filtersFactory.createAlphaToLuminanceFilter()), a = createNS("g"), a.appendChild(n), l.appendChild(a), a.setAttribute("filter", "url(" + getLocationHref() + "#" + i + ")"));
            } else if (e === 2) {
              var o = createNS("mask");
              o.setAttribute("id", r), o.setAttribute("mask-type", "alpha");
              var f = createNS("g");
              o.appendChild(f), i = createElementID(), s = filtersFactory.createFilter(i);
              var m = createNS("feComponentTransfer");
              m.setAttribute("in", "SourceGraphic"), s.appendChild(m);
              var b = createNS("feFuncA");
              b.setAttribute("type", "table"), b.setAttribute("tableValues", "1.0 0.0"), m.appendChild(b), this.globalData.defs.appendChild(s);
              var h = createNS("rect");
              h.setAttribute("width", this.comp.data.w), h.setAttribute("height", this.comp.data.h), h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("fill", "#ffffff"), h.setAttribute("opacity", "0"), f.setAttribute("filter", "url(" + getLocationHref() + "#" + i + ")"), f.appendChild(h), n = createNS("use"), n.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), f.appendChild(n), featureSupport.maskType || (o.setAttribute("mask-type", "luminance"), s.appendChild(filtersFactory.createAlphaToLuminanceFilter()), a = createNS("g"), f.appendChild(h), a.appendChild(this.layerElement), f.appendChild(a)), this.globalData.defs.appendChild(o);
            }
            this.matteMasks[e] = r;
          }
          return this.matteMasks[e];
        },
        setMatte: function(e) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + getLocationHref() + "#" + e + ")");
        }
      };
      function HierarchyElement() {
      }
      HierarchyElement.prototype = {
        /**
           * @function
           * Initializes hierarchy properties
           *
           */
        initHierarchy: function() {
          this.hierarchy = [], this._isParent = !1, this.checkParenting();
        },
        /**
           * @function
           * Sets layer's hierarchy.
           * @param {array} hierarch
           * layer's parent list
           *
           */
        setHierarchy: function(e) {
          this.hierarchy = e;
        },
        /**
           * @function
           * Sets layer as parent.
           *
           */
        setAsParent: function() {
          this._isParent = !0;
        },
        /**
           * @function
           * Searches layer's parenting chain
           *
           */
        checkParenting: function() {
          this.data.parent !== void 0 && this.comp.buildElementParenting(this, this.data.parent, []);
        }
      };
      function RenderableDOMElement() {
      }
      (function() {
        var t = {
          initElement: function(r, i, s) {
            this.initFrame(), this.initBaseData(r, i, s), this.initTransform(r, i, s), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
          },
          hide: function() {
            if (!this.hidden && (!this.isInRange || this.isTransparent)) {
              var r = this.baseElement || this.layerElement;
              r.style.display = "none", this.hidden = !0;
            }
          },
          show: function() {
            if (this.isInRange && !this.isTransparent) {
              if (!this.data.hd) {
                var r = this.baseElement || this.layerElement;
                r.style.display = "block";
              }
              this.hidden = !1, this._isFirstFrame = !0;
            }
          },
          renderFrame: function() {
            this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderLocalTransform(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
          },
          renderInnerContent: function() {
          },
          prepareFrame: function(r) {
            this._mdf = !1, this.prepareRenderableFrame(r), this.prepareProperties(r, this.isInRange), this.checkTransparency();
          },
          destroy: function() {
            this.innerElem = null, this.destroyBaseElement();
          }
        };
        extendPrototype([RenderableElement, createProxyFunction(t)], RenderableDOMElement);
      })();
      function IImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.assetData && this.assetData.sid && (this.assetData = e.slotManager.getProp(this.assetData)), this.initElement(t, e, r), this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        };
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function() {
        var t = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.innerElem);
      }, IImageElement.prototype.sourceRectAtTime = function() {
        return this.sourceRect;
      };
      function ProcessedElement(t, e) {
        this.elem = t, this.pos = e;
      }
      function IShapeElement() {
      }
      IShapeElement.prototype = {
        addShapeToModifiers: function(e) {
          var r, i = this.shapeModifiers.length;
          for (r = 0; r < i; r += 1)
            this.shapeModifiers[r].addShape(e);
        },
        isShapeInAnimatedModifiers: function(e) {
          for (var r = 0, i = this.shapeModifiers.length; r < i; )
            if (this.shapeModifiers[r].isAnimatedWithShape(e))
              return !0;
          return !1;
        },
        renderModifiers: function() {
          if (this.shapeModifiers.length) {
            var e, r = this.shapes.length;
            for (e = 0; e < r; e += 1)
              this.shapes[e].sh.reset();
            r = this.shapeModifiers.length;
            var i;
            for (e = r - 1; e >= 0 && (i = this.shapeModifiers[e].processShapes(this._isFirstFrame), !i); e -= 1)
              ;
          }
        },
        searchProcessedElement: function(e) {
          for (var r = this.processedElements, i = 0, s = r.length; i < s; ) {
            if (r[i].elem === e)
              return r[i].pos;
            i += 1;
          }
          return 0;
        },
        addProcessedElement: function(e, r) {
          for (var i = this.processedElements, s = i.length; s; )
            if (s -= 1, i[s].elem === e) {
              i[s].pos = r;
              return;
            }
          i.push(new ProcessedElement(e, r));
        },
        prepareFrame: function(e) {
          this.prepareRenderableFrame(e), this.prepareProperties(e, this.isInRange);
        }
      };
      var lineCapEnum = {
        1: "butt",
        2: "round",
        3: "square"
      }, lineJoinEnum = {
        1: "miter",
        2: "round",
        3: "bevel"
      };
      function SVGShapeData(t, e, r) {
        this.caches = [], this.styles = [], this.transformers = t, this.lStr = "", this.sh = r, this.lvl = e, this._isAnimated = !!r.k;
        for (var i = 0, s = t.length; i < s; ) {
          if (t[i].mProps.dynamicProperties.length) {
            this._isAnimated = !0;
            break;
          }
          i += 1;
        }
      }
      SVGShapeData.prototype.setAsAnimated = function() {
        this._isAnimated = !0;
      };
      function SVGStyleData(t, e) {
        this.data = t, this.type = t.ty, this.d = "", this.lvl = e, this._mdf = !1, this.closed = t.hd === !0, this.pElem = createNS("path"), this.msElem = null;
      }
      SVGStyleData.prototype.reset = function() {
        this.d = "", this._mdf = !1;
      };
      function DashProperty(t, e, r, i) {
        this.elem = t, this.frameId = -1, this.dataProps = createSizedArray(e.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", e.length ? e.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
        var s, n = e.length || 0, a;
        for (s = 0; s < n; s += 1)
          a = PropertyFactory.getProp(t, e[s].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[s] = {
            n: e[s].n,
            p: a
          };
        this.k || this.getValue(!0), this._isAnimated = this.k;
      }
      DashProperty.prototype.getValue = function(t) {
        if (!(this.elem.globalData.frameId === this.frameId && !t) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || t, this._mdf)) {
          var e = 0, r = this.dataProps.length;
          for (this.renderer === "svg" && (this.dashStr = ""), e = 0; e < r; e += 1)
            this.dataProps[e].n !== "o" ? this.renderer === "svg" ? this.dashStr += " " + this.dataProps[e].p.v : this.dashArray[e] = this.dataProps[e].p.v : this.dashoffset[0] = this.dataProps[e].p.v;
        }
      }, extendPrototype([DynamicPropertyContainer], DashProperty);
      function SVGStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this), this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
      }
      extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);
      function SVGFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this), this.c = PropertyFactory.getProp(t, e.c, 1, 255, this), this.style = r;
      }
      extendPrototype([DynamicPropertyContainer], SVGFillStyleData);
      function SVGNoStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.style = r;
      }
      extendPrototype([DynamicPropertyContainer], SVGNoStyleData);
      function GradientProperty(t, e, r) {
        this.data = e, this.c = createTypedArray("uint8c", e.p * 4);
        var i = e.k.k[0].s ? e.k.k[0].s.length - e.p * 4 : e.k.k.length - e.p * 4;
        this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(t, e.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
      }
      GradientProperty.prototype.comparePoints = function(t, e) {
        for (var r = 0, i = this.o.length / 2, s; r < i; ) {
          if (s = Math.abs(t[r * 4] - t[e * 4 + r * 2]), s > 0.01)
            return !1;
          r += 1;
        }
        return !0;
      }, GradientProperty.prototype.checkCollapsable = function() {
        if (this.o.length / 2 !== this.c.length / 4)
          return !1;
        if (this.data.k.k[0].s)
          for (var t = 0, e = this.data.k.k.length; t < e; ) {
            if (!this.comparePoints(this.data.k.k[t].s, this.data.p))
              return !1;
            t += 1;
          }
        else if (!this.comparePoints(this.data.k.k, this.data.p))
          return !1;
        return !0;
      }, GradientProperty.prototype.getValue = function(t) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || t) {
          var e, r = this.data.p * 4, i, s;
          for (e = 0; e < r; e += 1)
            i = e % 4 === 0 ? 100 : 255, s = Math.round(this.prop.v[e] * i), this.c[e] !== s && (this.c[e] = s, this._cmdf = !t);
          if (this.o.length)
            for (r = this.prop.v.length, e = this.data.p * 4; e < r; e += 1)
              i = e % 2 === 0 ? 100 : 1, s = e % 2 === 0 ? Math.round(this.prop.v[e] * 100) : this.prop.v[e], this.o[e - this.data.p * 4] !== s && (this.o[e - this.data.p * 4] = s, this._omdf = !t);
          this._mdf = !t;
        }
      }, extendPrototype([DynamicPropertyContainer], GradientProperty);
      function SVGGradientFillStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.initGradientData(t, e, r);
      }
      SVGGradientFillStyleData.prototype.initGradientData = function(t, e, r) {
        this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this), this.s = PropertyFactory.getProp(t, e.s, 1, null, this), this.e = PropertyFactory.getProp(t, e.e, 1, null, this), this.h = PropertyFactory.getProp(t, e.h || {
          k: 0
        }, 0, 0.01, this), this.a = PropertyFactory.getProp(t, e.a || {
          k: 0
        }, 0, degToRads, this), this.g = new GradientProperty(t, e.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, e), this.setGradientOpacity(e, r), this._isAnimated = !!this._isAnimated;
      }, SVGGradientFillStyleData.prototype.setGradientData = function(t, e) {
        var r = createElementID(), i = createNS(e.t === 1 ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
        var s = [], n, a, l;
        for (l = e.g.p * 4, a = 0; a < l; a += 4)
          n = createNS("stop"), i.appendChild(n), s.push(n);
        t.setAttribute(e.ty === "gf" ? "fill" : "stroke", "url(" + getLocationHref() + "#" + r + ")"), this.gf = i, this.cst = s;
      }, SVGGradientFillStyleData.prototype.setGradientOpacity = function(t, e) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r, i, s, n = createNS("mask"), a = createNS("path");
          n.appendChild(a);
          var l = createElementID(), o = createElementID();
          n.setAttribute("id", o);
          var f = createNS(t.t === 1 ? "linearGradient" : "radialGradient");
          f.setAttribute("id", l), f.setAttribute("spreadMethod", "pad"), f.setAttribute("gradientUnits", "userSpaceOnUse"), s = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length;
          var m = this.stops;
          for (i = t.g.p * 4; i < s; i += 2)
            r = createNS("stop"), r.setAttribute("stop-color", "rgb(255,255,255)"), f.appendChild(r), m.push(r);
          a.setAttribute(t.ty === "gf" ? "fill" : "stroke", "url(" + getLocationHref() + "#" + l + ")"), t.ty === "gs" && (a.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), a.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), t.lj === 1 && a.setAttribute("stroke-miterlimit", t.ml)), this.of = f, this.ms = n, this.ost = m, this.maskId = o, e.msElem = a;
        }
      }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData);
      function SVGGradientStrokeStyleData(t, e, r) {
        this.initDynamicPropertyContainer(t), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(t, e.w, 0, null, this), this.d = new DashProperty(t, e.d || {}, "svg", this), this.initGradientData(t, e, r), this._isAnimated = !!this._isAnimated;
      }
      extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
      function ShapeGroupData() {
        this.it = [], this.prevViewData = [], this.gr = createNS("g");
      }
      function SVGTransformData(t, e, r) {
        this.transform = {
          mProps: t,
          op: e,
          container: r
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
      }
      var buildShapeString = function(e, r, i, s) {
        if (r === 0)
          return "";
        var n = e.o, a = e.i, l = e.v, o, f = " M" + s.applyToPointStringified(l[0][0], l[0][1]);
        for (o = 1; o < r; o += 1)
          f += " C" + s.applyToPointStringified(n[o - 1][0], n[o - 1][1]) + " " + s.applyToPointStringified(a[o][0], a[o][1]) + " " + s.applyToPointStringified(l[o][0], l[o][1]);
        return i && r && (f += " C" + s.applyToPointStringified(n[o - 1][0], n[o - 1][1]) + " " + s.applyToPointStringified(a[0][0], a[0][1]) + " " + s.applyToPointStringified(l[0][0], l[0][1]), f += "z"), f;
      }, SVGElementsRenderer = function() {
        var t = new Matrix(), e = new Matrix(), r = {
          createRenderFunction: i
        };
        function i(b) {
          switch (b.ty) {
            case "fl":
              return l;
            case "gf":
              return f;
            case "gs":
              return o;
            case "st":
              return m;
            case "sh":
            case "el":
            case "rc":
            case "sr":
              return a;
            case "tr":
              return s;
            case "no":
              return n;
            default:
              return null;
          }
        }
        function s(b, h, g) {
          (g || h.transform.op._mdf) && h.transform.container.setAttribute("opacity", h.transform.op.v), (g || h.transform.mProps._mdf) && h.transform.container.setAttribute("transform", h.transform.mProps.v.to2dCSS());
        }
        function n() {
        }
        function a(b, h, g) {
          var y, u, P, c, d, p, v = h.styles.length, S = h.lvl, _, A, T, w;
          for (p = 0; p < v; p += 1) {
            if (c = h.sh._mdf || g, h.styles[p].lvl < S) {
              for (A = e.reset(), T = S - h.styles[p].lvl, w = h.transformers.length - 1; !c && T > 0; )
                c = h.transformers[w].mProps._mdf || c, T -= 1, w -= 1;
              if (c)
                for (T = S - h.styles[p].lvl, w = h.transformers.length - 1; T > 0; )
                  A.multiply(h.transformers[w].mProps.v), T -= 1, w -= 1;
            } else
              A = t;
            if (_ = h.sh.paths, u = _._length, c) {
              for (P = "", y = 0; y < u; y += 1)
                d = _.shapes[y], d && d._length && (P += buildShapeString(d, d._length, d.c, A));
              h.caches[p] = P;
            } else
              P = h.caches[p];
            h.styles[p].d += b.hd === !0 ? "" : P, h.styles[p]._mdf = c || h.styles[p]._mdf;
          }
        }
        function l(b, h, g) {
          var y = h.style;
          (h.c._mdf || g) && y.pElem.setAttribute("fill", "rgb(" + bmFloor(h.c.v[0]) + "," + bmFloor(h.c.v[1]) + "," + bmFloor(h.c.v[2]) + ")"), (h.o._mdf || g) && y.pElem.setAttribute("fill-opacity", h.o.v);
        }
        function o(b, h, g) {
          f(b, h, g), m(b, h, g);
        }
        function f(b, h, g) {
          var y = h.gf, u = h.g._hasOpacity, P = h.s.v, c = h.e.v;
          if (h.o._mdf || g) {
            var d = b.ty === "gf" ? "fill-opacity" : "stroke-opacity";
            h.style.pElem.setAttribute(d, h.o.v);
          }
          if (h.s._mdf || g) {
            var p = b.t === 1 ? "x1" : "cx", v = p === "x1" ? "y1" : "cy";
            y.setAttribute(p, P[0]), y.setAttribute(v, P[1]), u && !h.g._collapsable && (h.of.setAttribute(p, P[0]), h.of.setAttribute(v, P[1]));
          }
          var S, _, A, T;
          if (h.g._cmdf || g) {
            S = h.cst;
            var w = h.g.c;
            for (A = S.length, _ = 0; _ < A; _ += 1)
              T = S[_], T.setAttribute("offset", w[_ * 4] + "%"), T.setAttribute("stop-color", "rgb(" + w[_ * 4 + 1] + "," + w[_ * 4 + 2] + "," + w[_ * 4 + 3] + ")");
          }
          if (u && (h.g._omdf || g)) {
            var V = h.g.o;
            for (h.g._collapsable ? S = h.cst : S = h.ost, A = S.length, _ = 0; _ < A; _ += 1)
              T = S[_], h.g._collapsable || T.setAttribute("offset", V[_ * 2] + "%"), T.setAttribute("stop-opacity", V[_ * 2 + 1]);
          }
          if (b.t === 1)
            (h.e._mdf || g) && (y.setAttribute("x2", c[0]), y.setAttribute("y2", c[1]), u && !h.g._collapsable && (h.of.setAttribute("x2", c[0]), h.of.setAttribute("y2", c[1])));
          else {
            var D;
            if ((h.s._mdf || h.e._mdf || g) && (D = Math.sqrt(Math.pow(P[0] - c[0], 2) + Math.pow(P[1] - c[1], 2)), y.setAttribute("r", D), u && !h.g._collapsable && h.of.setAttribute("r", D)), h.e._mdf || h.h._mdf || h.a._mdf || g) {
              D || (D = Math.sqrt(Math.pow(P[0] - c[0], 2) + Math.pow(P[1] - c[1], 2)));
              var I = Math.atan2(c[1] - P[1], c[0] - P[0]), R = h.h.v;
              R >= 1 ? R = 0.99 : R <= -1 && (R = -0.99);
              var O = D * R, L = Math.cos(I + h.a.v) * O + P[0], C = Math.sin(I + h.a.v) * O + P[1];
              y.setAttribute("fx", L), y.setAttribute("fy", C), u && !h.g._collapsable && (h.of.setAttribute("fx", L), h.of.setAttribute("fy", C));
            }
          }
        }
        function m(b, h, g) {
          var y = h.style, u = h.d;
          u && (u._mdf || g) && u.dashStr && (y.pElem.setAttribute("stroke-dasharray", u.dashStr), y.pElem.setAttribute("stroke-dashoffset", u.dashoffset[0])), h.c && (h.c._mdf || g) && y.pElem.setAttribute("stroke", "rgb(" + bmFloor(h.c.v[0]) + "," + bmFloor(h.c.v[1]) + "," + bmFloor(h.c.v[2]) + ")"), (h.o._mdf || g) && y.pElem.setAttribute("stroke-opacity", h.o.v), (h.w._mdf || g) && (y.pElem.setAttribute("stroke-width", h.w.v), y.msElem && y.msElem.setAttribute("stroke-width", h.w.v));
        }
        return r;
      }();
      function SVGShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(t, e, r), this.prevViewData = [];
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function() {
      }, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function() {
      }, SVGShapeElement.prototype.createContent = function() {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }, SVGShapeElement.prototype.filterUniqueShapes = function() {
        var t, e = this.shapes.length, r, i, s = this.stylesList.length, n, a = [], l = !1;
        for (i = 0; i < s; i += 1) {
          for (n = this.stylesList[i], l = !1, a.length = 0, t = 0; t < e; t += 1)
            r = this.shapes[t], r.styles.indexOf(n) !== -1 && (a.push(r), l = r._isAnimated || l);
          a.length > 1 && l && this.setShapesAsAnimated(a);
        }
      }, SVGShapeElement.prototype.setShapesAsAnimated = function(t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
          t[e].setAsAnimated();
      }, SVGShapeElement.prototype.createStyleElement = function(t, e) {
        var r, i = new SVGStyleData(t, e), s = i.pElem;
        if (t.ty === "st")
          r = new SVGStrokeStyleData(this, t, i);
        else if (t.ty === "fl")
          r = new SVGFillStyleData(this, t, i);
        else if (t.ty === "gf" || t.ty === "gs") {
          var n = t.ty === "gf" ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
          r = new n(this, t, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), s.setAttribute("mask", "url(" + getLocationHref() + "#" + r.maskId + ")"));
        } else t.ty === "no" && (r = new SVGNoStyleData(this, t, i));
        return (t.ty === "st" || t.ty === "gs") && (s.setAttribute("stroke-linecap", lineCapEnum[t.lc || 2]), s.setAttribute("stroke-linejoin", lineJoinEnum[t.lj || 2]), s.setAttribute("fill-opacity", "0"), t.lj === 1 && s.setAttribute("stroke-miterlimit", t.ml)), t.r === 2 && s.setAttribute("fill-rule", "evenodd"), t.ln && s.setAttribute("id", t.ln), t.cl && s.setAttribute("class", t.cl), t.bm && (s.style["mix-blend-mode"] = getBlendMode(t.bm)), this.stylesList.push(i), this.addToAnimatedContents(t, r), r;
      }, SVGShapeElement.prototype.createGroupElement = function(t) {
        var e = new ShapeGroupData();
        return t.ln && e.gr.setAttribute("id", t.ln), t.cl && e.gr.setAttribute("class", t.cl), t.bm && (e.gr.style["mix-blend-mode"] = getBlendMode(t.bm)), e;
      }, SVGShapeElement.prototype.createTransformElement = function(t, e) {
        var r = TransformPropertyFactory.getTransformProperty(this, t, this), i = new SVGTransformData(r, r.o, e);
        return this.addToAnimatedContents(t, i), i;
      }, SVGShapeElement.prototype.createShapeElement = function(t, e, r) {
        var i = 4;
        t.ty === "rc" ? i = 5 : t.ty === "el" ? i = 6 : t.ty === "sr" && (i = 7);
        var s = ShapePropertyFactory.getShapeProp(this, t, i, this), n = new SVGShapeData(e, r, s);
        return this.shapes.push(n), this.addShapeToModifiers(n), this.addToAnimatedContents(t, n), n;
      }, SVGShapeElement.prototype.addToAnimatedContents = function(t, e) {
        for (var r = 0, i = this.animatedContents.length; r < i; ) {
          if (this.animatedContents[r].element === e)
            return;
          r += 1;
        }
        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(t),
          element: e,
          data: t
        });
      }, SVGShapeElement.prototype.setElementStyles = function(t) {
        var e = t.styles, r, i = this.stylesList.length;
        for (r = 0; r < i; r += 1)
          this.stylesList[r].closed || e.push(this.stylesList[r]);
      }, SVGShapeElement.prototype.reloadShapes = function() {
        this._isFirstFrame = !0;
        var t, e = this.itemsData.length;
        for (t = 0; t < e; t += 1)
          this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), e = this.dynamicProperties.length, t = 0; t < e; t += 1)
          this.dynamicProperties[t].getValue();
        this.renderModifiers();
      }, SVGShapeElement.prototype.searchShapes = function(t, e, r, i, s, n, a) {
        var l = [].concat(n), o, f = t.length - 1, m, b, h = [], g = [], y, u, P;
        for (o = f; o >= 0; o -= 1) {
          if (P = this.searchProcessedElement(t[o]), P ? e[o] = r[P - 1] : t[o]._render = a, t[o].ty === "fl" || t[o].ty === "st" || t[o].ty === "gf" || t[o].ty === "gs" || t[o].ty === "no")
            P ? e[o].style.closed = !1 : e[o] = this.createStyleElement(t[o], s), t[o]._render && e[o].style.pElem.parentNode !== i && i.appendChild(e[o].style.pElem), h.push(e[o].style);
          else if (t[o].ty === "gr") {
            if (!P)
              e[o] = this.createGroupElement(t[o]);
            else
              for (b = e[o].it.length, m = 0; m < b; m += 1)
                e[o].prevViewData[m] = e[o].it[m];
            this.searchShapes(t[o].it, e[o].it, e[o].prevViewData, e[o].gr, s + 1, l, a), t[o]._render && e[o].gr.parentNode !== i && i.appendChild(e[o].gr);
          } else t[o].ty === "tr" ? (P || (e[o] = this.createTransformElement(t[o], i)), y = e[o].transform, l.push(y)) : t[o].ty === "sh" || t[o].ty === "rc" || t[o].ty === "el" || t[o].ty === "sr" ? (P || (e[o] = this.createShapeElement(t[o], l, s)), this.setElementStyles(e[o])) : t[o].ty === "tm" || t[o].ty === "rd" || t[o].ty === "ms" || t[o].ty === "pb" || t[o].ty === "zz" || t[o].ty === "op" ? (P ? (u = e[o], u.closed = !1) : (u = ShapeModifiers.getModifier(t[o].ty), u.init(this, t[o]), e[o] = u, this.shapeModifiers.push(u)), g.push(u)) : t[o].ty === "rp" && (P ? (u = e[o], u.closed = !0) : (u = ShapeModifiers.getModifier(t[o].ty), e[o] = u, u.init(this, t, o, e), this.shapeModifiers.push(u), a = !1), g.push(u));
          this.addProcessedElement(t[o], o + 1);
        }
        for (f = h.length, o = 0; o < f; o += 1)
          h[o].closed = !0;
        for (f = g.length, o = 0; o < f; o += 1)
          g[o].closed = !0;
      }, SVGShapeElement.prototype.renderInnerContent = function() {
        this.renderModifiers();
        var t, e = this.stylesList.length;
        for (t = 0; t < e; t += 1)
          this.stylesList[t].reset();
        for (this.renderShape(), t = 0; t < e; t += 1)
          (this.stylesList[t]._mdf || this._isFirstFrame) && (this.stylesList[t].msElem && (this.stylesList[t].msElem.setAttribute("d", this.stylesList[t].d), this.stylesList[t].d = "M0 0" + this.stylesList[t].d), this.stylesList[t].pElem.setAttribute("d", this.stylesList[t].d || "M0 0"));
      }, SVGShapeElement.prototype.renderShape = function() {
        var t, e = this.animatedContents.length, r;
        for (t = 0; t < e; t += 1)
          r = this.animatedContents[t], (this._isFirstFrame || r.element._isAnimated) && r.data !== !0 && r.fn(r.data, r.element, this._isFirstFrame);
      }, SVGShapeElement.prototype.destroy = function() {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
      };
      function LetterProps(t, e, r, i, s, n) {
        this.o = t, this.sw = e, this.sc = r, this.fc = i, this.m = s, this.p = n, this._mdf = {
          o: !0,
          sw: !!e,
          sc: !!r,
          fc: !!i,
          m: !0,
          p: !0
        };
      }
      LetterProps.prototype.update = function(t, e, r, i, s, n) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
        var a = !1;
        return this.o !== t && (this.o = t, this._mdf.o = !0, a = !0), this.sw !== e && (this.sw = e, this._mdf.sw = !0, a = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, a = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, a = !0), this.m !== s && (this.m = s, this._mdf.m = !0, a = !0), n.length && (this.p[0] !== n[0] || this.p[1] !== n[1] || this.p[4] !== n[4] || this.p[5] !== n[5] || this.p[12] !== n[12] || this.p[13] !== n[13]) && (this.p = n, this._mdf.p = !0, a = !0), a;
      };
      function TextProperty(t, e) {
        this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, e.d && e.d.sid && (e.d = t.globalData.slotManager.getProp(e.d)), this.data = e, this.elem = t, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
          ascent: 0,
          boxWidth: this.defaultBoxWidth,
          f: "",
          fStyle: "",
          fWeight: "",
          fc: "",
          j: "",
          justifyOffset: "",
          l: [],
          lh: 0,
          lineWidths: [],
          ls: "",
          of: "",
          s: "",
          sc: "",
          sw: 0,
          t: 0,
          tr: 0,
          sz: 0,
          ps: null,
          fillColorAnim: !1,
          strokeColorAnim: !1,
          strokeWidthAnim: !1,
          yOffset: 0,
          finalSize: 0,
          finalText: [],
          finalLineHeight: 0,
          __complete: !1
        }, this.copyData(this.currentData, this.data.d.k[0].s), this.searchProperty() || this.completeTextData(this.currentData);
      }
      TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(t, e) {
        for (var r in e)
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        return t;
      }, TextProperty.prototype.setCurrentData = function(t) {
        t.__complete || this.completeTextData(t), this.currentData = t, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
      }, TextProperty.prototype.searchProperty = function() {
        return this.searchKeyframes();
      }, TextProperty.prototype.searchKeyframes = function() {
        return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }, TextProperty.prototype.addEffect = function(t) {
        this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.getValue = function(t) {
        if (!((this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) && !t)) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var e = this.currentData, r = this.keysIndex;
          if (this.lock) {
            this.setCurrentData(this.currentData);
            return;
          }
          this.lock = !0, this._mdf = !1;
          var i, s = this.effectsSequence.length, n = t || this.data.d.k[this.keysIndex].s;
          for (i = 0; i < s; i += 1)
            r !== this.keysIndex ? n = this.effectsSequence[i](n, n.t) : n = this.effectsSequence[i](this.currentData, n.t);
          e !== n && this.setCurrentData(n), this.v = this.currentData, this.pv = this.v, this.lock = !1, this.frameId = this.elem.globalData.frameId;
        }
      }, TextProperty.prototype.getKeyframeValue = function() {
        for (var t = this.data.d.k, e = this.elem.comp.renderedFrame, r = 0, i = t.length; r <= i - 1 && !(r === i - 1 || t[r + 1].t > e); )
          r += 1;
        return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
      }, TextProperty.prototype.buildFinalText = function(t) {
        for (var e = [], r = 0, i = t.length, s, n, a = !1, l = !1, o = ""; r < i; )
          a = l, l = !1, s = t.charCodeAt(r), o = t.charAt(r), FontManager.isCombinedCharacter(s) ? a = !0 : s >= 55296 && s <= 56319 ? FontManager.isRegionalFlag(t, r) ? o = t.substr(r, 14) : (n = t.charCodeAt(r + 1), n >= 56320 && n <= 57343 && (FontManager.isModifier(s, n) ? (o = t.substr(r, 2), a = !0) : FontManager.isFlagEmoji(t.substr(r, 4)) ? o = t.substr(r, 4) : o = t.substr(r, 2))) : s > 56319 ? (n = t.charCodeAt(r + 1), FontManager.isVariationSelector(s) && (a = !0)) : FontManager.isZeroWidthJoiner(s) && (a = !0, l = !0), a ? (e[e.length - 1] += o, a = !1) : e.push(o), r += o.length;
        return e;
      }, TextProperty.prototype.completeTextData = function(t) {
        t.__complete = !0;
        var e = this.elem.globalData.fontManager, r = this.data, i = [], s, n, a, l = 0, o, f = r.m.g, m = 0, b = 0, h = 0, g = [], y = 0, u = 0, P, c, d = e.getFontByName(t.f), p, v = 0, S = getFontProperties(d);
        t.fWeight = S.weight, t.fStyle = S.style, t.finalSize = t.s, t.finalText = this.buildFinalText(t.t), n = t.finalText.length, t.finalLineHeight = t.lh;
        var _ = t.tr / 1e3 * t.finalSize, A;
        if (t.sz)
          for (var T = !0, w = t.sz[0], V = t.sz[1], D, I; T; ) {
            I = this.buildFinalText(t.t), D = 0, y = 0, n = I.length, _ = t.tr / 1e3 * t.finalSize;
            var R = -1;
            for (s = 0; s < n; s += 1)
              A = I[s].charCodeAt(0), a = !1, I[s] === " " ? R = s : (A === 13 || A === 3) && (y = 0, a = !0, D += t.finalLineHeight || t.finalSize * 1.2), e.chars ? (p = e.getCharData(I[s], d.fStyle, d.fFamily), v = a ? 0 : p.w * t.finalSize / 100) : v = e.measureText(I[s], t.f, t.finalSize), y + v > w && I[s] !== " " ? (R === -1 ? n += 1 : s = R, D += t.finalLineHeight || t.finalSize * 1.2, I.splice(s, R === s ? 1 : 0, "\r"), R = -1, y = 0) : (y += v, y += _);
            D += d.ascent * t.finalSize / 100, this.canResize && t.finalSize > this.minimumFontSize && V < D ? (t.finalSize -= 1, t.finalLineHeight = t.finalSize * t.lh / t.s) : (t.finalText = I, n = t.finalText.length, T = !1);
          }
        y = -_, v = 0;
        var O = 0, L;
        for (s = 0; s < n; s += 1)
          if (a = !1, L = t.finalText[s], A = L.charCodeAt(0), A === 13 || A === 3 ? (O = 0, g.push(y), u = y > u ? y : u, y = -2 * _, o = "", a = !0, h += 1) : o = L, e.chars ? (p = e.getCharData(L, d.fStyle, e.getFontByName(t.f).fFamily), v = a ? 0 : p.w * t.finalSize / 100) : v = e.measureText(o, t.f, t.finalSize), L === " " ? O += v + _ : (y += v + _ + O, O = 0), i.push({
            l: v,
            an: v,
            add: m,
            n: a,
            anIndexes: [],
            val: o,
            line: h,
            animatorJustifyOffset: 0
          }), f == 2) {
            if (m += v, o === "" || o === " " || s === n - 1) {
              for ((o === "" || o === " ") && (m -= v); b <= s; )
                i[b].an = m, i[b].ind = l, i[b].extra = v, b += 1;
              l += 1, m = 0;
            }
          } else if (f == 3) {
            if (m += v, o === "" || s === n - 1) {
              for (o === "" && (m -= v); b <= s; )
                i[b].an = m, i[b].ind = l, i[b].extra = v, b += 1;
              m = 0, l += 1;
            }
          } else
            i[l].ind = l, i[l].extra = 0, l += 1;
        if (t.l = i, u = y > u ? y : u, g.push(y), t.sz)
          t.boxWidth = t.sz[0], t.justifyOffset = 0;
        else
          switch (t.boxWidth = u, t.j) {
            case 1:
              t.justifyOffset = -t.boxWidth;
              break;
            case 2:
              t.justifyOffset = -t.boxWidth / 2;
              break;
            default:
              t.justifyOffset = 0;
          }
        t.lineWidths = g;
        var C = r.a, M, E;
        c = C.length;
        var x, F, k = [];
        for (P = 0; P < c; P += 1) {
          for (M = C[P], M.a.sc && (t.strokeColorAnim = !0), M.a.sw && (t.strokeWidthAnim = !0), (M.a.fc || M.a.fh || M.a.fs || M.a.fb) && (t.fillColorAnim = !0), F = 0, x = M.s.b, s = 0; s < n; s += 1)
            E = i[s], E.anIndexes[P] = F, (x == 1 && E.val !== "" || x == 2 && E.val !== "" && E.val !== " " || x == 3 && (E.n || E.val == " " || s == n - 1) || x == 4 && (E.n || s == n - 1)) && (M.s.rn === 1 && k.push(F), F += 1);
          r.a[P].s.totalChars = F;
          var B = -1, j;
          if (M.s.rn === 1)
            for (s = 0; s < n; s += 1)
              E = i[s], B != E.anIndexes[P] && (B = E.anIndexes[P], j = k.splice(Math.floor(Math.random() * k.length), 1)[0]), E.anIndexes[P] = j;
        }
        t.yOffset = t.finalLineHeight || t.finalSize * 1.2, t.ls = t.ls || 0, t.ascent = d.ascent * t.finalSize / 100;
      }, TextProperty.prototype.updateDocumentData = function(t, e) {
        e = e === void 0 ? this.keysIndex : e;
        var r = this.copyData({}, this.data.d.k[e].s);
        r = this.copyData(r, t), this.data.d.k[e].s = r, this.recalculate(e), this.setCurrentData(r), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.recalculate = function(t) {
        var e = this.data.d.k[t].s;
        e.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(e);
      }, TextProperty.prototype.canResizeFont = function(t) {
        this.canResize = t, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.setMinimumFontSize = function(t) {
        this.minimumFontSize = Math.floor(t) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      };
      var TextSelectorProp = function() {
        var t = Math.max, e = Math.min, r = Math.floor;
        function i(n, a) {
          this._currentTextLength = -1, this.k = !1, this.data = a, this.elem = n, this.comp = n.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(n), this.s = PropertyFactory.getProp(n, a.s || {
            k: 0
          }, 0, 0, this), "e" in a ? this.e = PropertyFactory.getProp(n, a.e, 0, 0, this) : this.e = {
            v: 100
          }, this.o = PropertyFactory.getProp(n, a.o || {
            k: 0
          }, 0, 0, this), this.xe = PropertyFactory.getProp(n, a.xe || {
            k: 0
          }, 0, 0, this), this.ne = PropertyFactory.getProp(n, a.ne || {
            k: 0
          }, 0, 0, this), this.sm = PropertyFactory.getProp(n, a.sm || {
            k: 100
          }, 0, 0, this), this.a = PropertyFactory.getProp(n, a.a, 0, 0.01, this), this.dynamicProperties.length || this.getValue();
        }
        i.prototype = {
          getMult: function(a) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var l = 0, o = 0, f = 1, m = 1;
            this.ne.v > 0 ? l = this.ne.v / 100 : o = -this.ne.v / 100, this.xe.v > 0 ? f = 1 - this.xe.v / 100 : m = 1 + this.xe.v / 100;
            var b = BezierFactory.getBezierEasing(l, o, f, m).get, h = 0, g = this.finalS, y = this.finalE, u = this.data.sh;
            if (u === 2)
              y === g ? h = a >= y ? 1 : 0 : h = t(0, e(0.5 / (y - g) + (a - g) / (y - g), 1)), h = b(h);
            else if (u === 3)
              y === g ? h = a >= y ? 0 : 1 : h = 1 - t(0, e(0.5 / (y - g) + (a - g) / (y - g), 1)), h = b(h);
            else if (u === 4)
              y === g ? h = 0 : (h = t(0, e(0.5 / (y - g) + (a - g) / (y - g), 1)), h < 0.5 ? h *= 2 : h = 1 - 2 * (h - 0.5)), h = b(h);
            else if (u === 5) {
              if (y === g)
                h = 0;
              else {
                var P = y - g;
                a = e(t(0, a + 0.5 - g), y - g);
                var c = -P / 2 + a, d = P / 2;
                h = Math.sqrt(1 - c * c / (d * d));
              }
              h = b(h);
            } else u === 6 ? (y === g ? h = 0 : (a = e(t(0, a + 0.5 - g), y - g), h = (1 + Math.cos(Math.PI + Math.PI * 2 * a / (y - g))) / 2), h = b(h)) : (a >= r(g) && (a - g < 0 ? h = t(0, e(e(y, 1) - (g - a), 1)) : h = t(0, e(y - a, 1))), h = b(h));
            if (this.sm.v !== 100) {
              var p = this.sm.v * 0.01;
              p === 0 && (p = 1e-8);
              var v = 0.5 - p * 0.5;
              h < v ? h = 0 : (h = (h - v) / p, h > 1 && (h = 1));
            }
            return h * this.a.v;
          },
          getValue: function(a) {
            this.iterateDynamicProperties(), this._mdf = a || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, a && this.data.r === 2 && (this.e.v = this._currentTextLength);
            var l = this.data.r === 2 ? 1 : 100 / this.data.totalChars, o = this.o.v / l, f = this.s.v / l + o, m = this.e.v / l + o;
            if (f > m) {
              var b = f;
              f = m, m = b;
            }
            this.finalS = f, this.finalE = m;
          }
        }, extendPrototype([DynamicPropertyContainer], i);
        function s(n, a, l) {
          return new i(n, a);
        }
        return {
          getTextSelectorProp: s
        };
      }();
      function TextAnimatorDataProperty(t, e, r) {
        var i = {
          propType: !1
        }, s = PropertyFactory.getProp, n = e.a;
        this.a = {
          r: n.r ? s(t, n.r, 0, degToRads, r) : i,
          rx: n.rx ? s(t, n.rx, 0, degToRads, r) : i,
          ry: n.ry ? s(t, n.ry, 0, degToRads, r) : i,
          sk: n.sk ? s(t, n.sk, 0, degToRads, r) : i,
          sa: n.sa ? s(t, n.sa, 0, degToRads, r) : i,
          s: n.s ? s(t, n.s, 1, 0.01, r) : i,
          a: n.a ? s(t, n.a, 1, 0, r) : i,
          o: n.o ? s(t, n.o, 0, 0.01, r) : i,
          p: n.p ? s(t, n.p, 1, 0, r) : i,
          sw: n.sw ? s(t, n.sw, 0, 0, r) : i,
          sc: n.sc ? s(t, n.sc, 1, 0, r) : i,
          fc: n.fc ? s(t, n.fc, 1, 0, r) : i,
          fh: n.fh ? s(t, n.fh, 0, 0, r) : i,
          fs: n.fs ? s(t, n.fs, 0, 0.01, r) : i,
          fb: n.fb ? s(t, n.fb, 0, 0.01, r) : i,
          t: n.t ? s(t, n.t, 0, 0, r) : i
        }, this.s = TextSelectorProp.getTextSelectorProp(t, e.s, r), this.s.t = e.s.t;
      }
      function TextAnimatorProperty(t, e, r) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = t, this._renderType = e, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
          alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
      }
      TextAnimatorProperty.prototype.searchProperties = function() {
        var t, e = this._textData.a.length, r, i = PropertyFactory.getProp;
        for (t = 0; t < e; t += 1)
          r = this._textData.a[t], this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, r, this);
        this._textData.p && "m" in this._textData.p ? (this._pathData = {
          a: i(this._elem, this._textData.p.a, 0, 0, this),
          f: i(this._elem, this._textData.p.f, 0, 0, this),
          l: i(this._elem, this._textData.p.l, 0, 0, this),
          r: i(this._elem, this._textData.p.r, 0, 0, this),
          p: i(this._elem, this._textData.p.p, 0, 0, this),
          m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
      }, TextAnimatorProperty.prototype.getMeasures = function(t, e) {
        if (this.lettersChangedFlag = e, !(!this._mdf && !this._isFirstFrame && !e && (!this._hasMaskedPath || !this._pathData.m._mdf))) {
          this._isFirstFrame = !1;
          var r = this._moreOptions.alignment.v, i = this._animatorsData, s = this._textData, n = this.mHelper, a = this._renderType, l = this.renderedLetters.length, o, f, m, b, h = t.l, g, y, u, P, c, d, p, v, S, _, A, T, w, V, D;
          if (this._hasMaskedPath) {
            if (D = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
              var I = D.v;
              this._pathData.r.v && (I = I.reverse()), g = {
                tLength: 0,
                segments: []
              }, b = I._length - 1;
              var R;
              for (T = 0, m = 0; m < b; m += 1)
                R = bez.buildBezierData(I.v[m], I.v[m + 1], [I.o[m][0] - I.v[m][0], I.o[m][1] - I.v[m][1]], [I.i[m + 1][0] - I.v[m + 1][0], I.i[m + 1][1] - I.v[m + 1][1]]), g.tLength += R.segmentLength, g.segments.push(R), T += R.segmentLength;
              m = b, D.v.c && (R = bez.buildBezierData(I.v[m], I.v[0], [I.o[m][0] - I.v[m][0], I.o[m][1] - I.v[m][1]], [I.i[0][0] - I.v[0][0], I.i[0][1] - I.v[0][1]]), g.tLength += R.segmentLength, g.segments.push(R), T += R.segmentLength), this._pathData.pi = g;
            }
            if (g = this._pathData.pi, y = this._pathData.f.v, p = 0, d = 1, P = 0, c = !0, _ = g.segments, y < 0 && D.v.c)
              for (g.tLength < Math.abs(y) && (y = -Math.abs(y) % g.tLength), p = _.length - 1, S = _[p].points, d = S.length - 1; y < 0; )
                y += S[d].partialLength, d -= 1, d < 0 && (p -= 1, S = _[p].points, d = S.length - 1);
            S = _[p].points, v = S[d - 1], u = S[d], A = u.partialLength;
          }
          b = h.length, o = 0, f = 0;
          var O = t.finalSize * 1.2 * 0.714, L = !0, C, M, E, x, F;
          x = i.length;
          var k, B = -1, j, G, z, H = y, $ = p, Y = d, Q = -1, K, q, X, W, N, et, nt, rt, tt = "", it = this.defaultPropsArray, st;
          if (t.j === 2 || t.j === 1) {
            var U = 0, at = 0, ot = t.j === 2 ? -0.5 : -1, J = 0, lt = !0;
            for (m = 0; m < b; m += 1)
              if (h[m].n) {
                for (U && (U += at); J < m; )
                  h[J].animatorJustifyOffset = U, J += 1;
                U = 0, lt = !0;
              } else {
                for (E = 0; E < x; E += 1)
                  C = i[E].a, C.t.propType && (lt && t.j === 2 && (at += C.t.v * ot), M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), k.length ? U += C.t.v * k[0] * ot : U += C.t.v * k * ot);
                lt = !1;
              }
            for (U && (U += at); J < m; )
              h[J].animatorJustifyOffset = U, J += 1;
          }
          for (m = 0; m < b; m += 1) {
            if (n.reset(), K = 1, h[m].n)
              o = 0, f += t.yOffset, f += L ? 1 : 0, y = H, L = !1, this._hasMaskedPath && (p = $, d = Y, S = _[p].points, v = S[d - 1], u = S[d], A = u.partialLength, P = 0), tt = "", rt = "", et = "", st = "", it = this.defaultPropsArray;
            else {
              if (this._hasMaskedPath) {
                if (Q !== h[m].line) {
                  switch (t.j) {
                    case 1:
                      y += T - t.lineWidths[h[m].line];
                      break;
                    case 2:
                      y += (T - t.lineWidths[h[m].line]) / 2;
                      break;
                  }
                  Q = h[m].line;
                }
                B !== h[m].ind && (h[B] && (y += h[B].extra), y += h[m].an / 2, B = h[m].ind), y += r[0] * h[m].an * 5e-3;
                var Z = 0;
                for (E = 0; E < x; E += 1)
                  C = i[E].a, C.p.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), k.length ? Z += C.p.v[0] * k[0] : Z += C.p.v[0] * k), C.a.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), k.length ? Z += C.a.v[0] * k[0] : Z += C.a.v[0] * k);
                for (c = !0, this._pathData.a.v && (y = h[0].an * 0.5 + (T - this._pathData.f.v - h[0].an * 0.5 - h[h.length - 1].an * 0.5) * B / (b - 1), y += this._pathData.f.v); c; )
                  P + A >= y + Z || !S ? (w = (y + Z - P) / u.partialLength, G = v.point[0] + (u.point[0] - v.point[0]) * w, z = v.point[1] + (u.point[1] - v.point[1]) * w, n.translate(-r[0] * h[m].an * 5e-3, -(r[1] * O) * 0.01), c = !1) : S && (P += u.partialLength, d += 1, d >= S.length && (d = 0, p += 1, _[p] ? S = _[p].points : D.v.c ? (d = 0, p = 0, S = _[p].points) : (P -= u.partialLength, S = null)), S && (v = u, u = S[d], A = u.partialLength));
                j = h[m].an / 2 - h[m].add, n.translate(-j, 0, 0);
              } else
                j = h[m].an / 2 - h[m].add, n.translate(-j, 0, 0), n.translate(-r[0] * h[m].an * 5e-3, -r[1] * O * 0.01, 0);
              for (E = 0; E < x; E += 1)
                C = i[E].a, C.t.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), (o !== 0 || t.j !== 0) && (this._hasMaskedPath ? k.length ? y += C.t.v * k[0] : y += C.t.v * k : k.length ? o += C.t.v * k[0] : o += C.t.v * k));
              for (t.strokeWidthAnim && (X = t.sw || 0), t.strokeColorAnim && (t.sc ? q = [t.sc[0], t.sc[1], t.sc[2]] : q = [0, 0, 0]), t.fillColorAnim && t.fc && (W = [t.fc[0], t.fc[1], t.fc[2]]), E = 0; E < x; E += 1)
                C = i[E].a, C.a.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), k.length ? n.translate(-C.a.v[0] * k[0], -C.a.v[1] * k[1], C.a.v[2] * k[2]) : n.translate(-C.a.v[0] * k, -C.a.v[1] * k, C.a.v[2] * k));
              for (E = 0; E < x; E += 1)
                C = i[E].a, C.s.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), k.length ? n.scale(1 + (C.s.v[0] - 1) * k[0], 1 + (C.s.v[1] - 1) * k[1], 1) : n.scale(1 + (C.s.v[0] - 1) * k, 1 + (C.s.v[1] - 1) * k, 1));
              for (E = 0; E < x; E += 1) {
                if (C = i[E].a, M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), C.sk.propType && (k.length ? n.skewFromAxis(-C.sk.v * k[0], C.sa.v * k[1]) : n.skewFromAxis(-C.sk.v * k, C.sa.v * k)), C.r.propType && (k.length ? n.rotateZ(-C.r.v * k[2]) : n.rotateZ(-C.r.v * k)), C.ry.propType && (k.length ? n.rotateY(C.ry.v * k[1]) : n.rotateY(C.ry.v * k)), C.rx.propType && (k.length ? n.rotateX(C.rx.v * k[0]) : n.rotateX(C.rx.v * k)), C.o.propType && (k.length ? K += (C.o.v * k[0] - K) * k[0] : K += (C.o.v * k - K) * k), t.strokeWidthAnim && C.sw.propType && (k.length ? X += C.sw.v * k[0] : X += C.sw.v * k), t.strokeColorAnim && C.sc.propType)
                  for (N = 0; N < 3; N += 1)
                    k.length ? q[N] += (C.sc.v[N] - q[N]) * k[0] : q[N] += (C.sc.v[N] - q[N]) * k;
                if (t.fillColorAnim && t.fc) {
                  if (C.fc.propType)
                    for (N = 0; N < 3; N += 1)
                      k.length ? W[N] += (C.fc.v[N] - W[N]) * k[0] : W[N] += (C.fc.v[N] - W[N]) * k;
                  C.fh.propType && (k.length ? W = addHueToRGB(W, C.fh.v * k[0]) : W = addHueToRGB(W, C.fh.v * k)), C.fs.propType && (k.length ? W = addSaturationToRGB(W, C.fs.v * k[0]) : W = addSaturationToRGB(W, C.fs.v * k)), C.fb.propType && (k.length ? W = addBrightnessToRGB(W, C.fb.v * k[0]) : W = addBrightnessToRGB(W, C.fb.v * k));
                }
              }
              for (E = 0; E < x; E += 1)
                C = i[E].a, C.p.propType && (M = i[E].s, k = M.getMult(h[m].anIndexes[E], s.a[E].s.totalChars), this._hasMaskedPath ? k.length ? n.translate(0, C.p.v[1] * k[0], -C.p.v[2] * k[1]) : n.translate(0, C.p.v[1] * k, -C.p.v[2] * k) : k.length ? n.translate(C.p.v[0] * k[0], C.p.v[1] * k[1], -C.p.v[2] * k[2]) : n.translate(C.p.v[0] * k, C.p.v[1] * k, -C.p.v[2] * k));
              if (t.strokeWidthAnim && (et = X < 0 ? 0 : X), t.strokeColorAnim && (nt = "rgb(" + Math.round(q[0] * 255) + "," + Math.round(q[1] * 255) + "," + Math.round(q[2] * 255) + ")"), t.fillColorAnim && t.fc && (rt = "rgb(" + Math.round(W[0] * 255) + "," + Math.round(W[1] * 255) + "," + Math.round(W[2] * 255) + ")"), this._hasMaskedPath) {
                if (n.translate(0, -t.ls), n.translate(0, r[1] * O * 0.01 + f, 0), this._pathData.p.v) {
                  V = (u.point[1] - v.point[1]) / (u.point[0] - v.point[0]);
                  var ht = Math.atan(V) * 180 / Math.PI;
                  u.point[0] < v.point[0] && (ht += 180), n.rotate(-ht * Math.PI / 180);
                }
                n.translate(G, z, 0), y -= r[0] * h[m].an * 5e-3, h[m + 1] && B !== h[m + 1].ind && (y += h[m].an / 2, y += t.tr * 1e-3 * t.finalSize);
              } else {
                switch (n.translate(o, f, 0), t.ps && n.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j) {
                  case 1:
                    n.translate(h[m].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[h[m].line]), 0, 0);
                    break;
                  case 2:
                    n.translate(h[m].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[h[m].line]) / 2, 0, 0);
                    break;
                }
                n.translate(0, -t.ls), n.translate(j, 0, 0), n.translate(r[0] * h[m].an * 5e-3, r[1] * O * 0.01, 0), o += h[m].l + t.tr * 1e-3 * t.finalSize;
              }
              a === "html" ? tt = n.toCSS() : a === "svg" ? tt = n.to2dCSS() : it = [n.props[0], n.props[1], n.props[2], n.props[3], n.props[4], n.props[5], n.props[6], n.props[7], n.props[8], n.props[9], n.props[10], n.props[11], n.props[12], n.props[13], n.props[14], n.props[15]], st = K;
            }
            l <= m ? (F = new LetterProps(st, et, nt, rt, tt, it), this.renderedLetters.push(F), l += 1, this.lettersChangedFlag = !0) : (F = this.renderedLetters[m], this.lettersChangedFlag = F.update(st, et, nt, rt, tt, it) || this.lettersChangedFlag);
          }
        }
      }, TextAnimatorProperty.prototype.getValue = function() {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
      }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty);
      function ITextElement() {
      }
      ITextElement.prototype.initElement = function(t, e, r) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(t, e, r), this.textProperty = new TextProperty(this, t.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this), this.initTransform(t, e, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
      }, ITextElement.prototype.prepareFrame = function(t) {
        this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
      }, ITextElement.prototype.createPathShape = function(t, e) {
        var r, i = e.length, s, n = "";
        for (r = 0; r < i; r += 1)
          e[r].ty === "sh" && (s = e[r].ks.k, n += buildShapeString(s, s.i.length, !0, t));
        return n;
      }, ITextElement.prototype.updateDocumentData = function(t, e) {
        this.textProperty.updateDocumentData(t, e);
      }, ITextElement.prototype.canResizeFont = function(t) {
        this.textProperty.canResizeFont(t);
      }, ITextElement.prototype.setMinimumFontSize = function(t) {
        this.textProperty.setMinimumFontSize(t);
      }, ITextElement.prototype.applyTextPropertiesToMatrix = function(t, e, r, i, s) {
        switch (t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j) {
          case 1:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]), 0, 0);
            break;
          case 2:
            e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[r]) / 2, 0, 0);
            break;
        }
        e.translate(i, s, 0);
      }, ITextElement.prototype.buildColor = function(t) {
        return "rgb(" + Math.round(t[0] * 255) + "," + Math.round(t[1] * 255) + "," + Math.round(t[2] * 255) + ")";
      }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function() {
      }, ITextElement.prototype.validateText = function() {
        (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
      };
      var emptyShapeData = {
        shapes: []
      };
      function SVGTextLottieElement(t, e, r) {
        this.textSpans = [], this.renderType = "svg", this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement), SVGTextLottieElement.prototype.createContent = function() {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
      }, SVGTextLottieElement.prototype.buildTextContents = function(t) {
        for (var e = 0, r = t.length, i = [], s = ""; e < r; )
          t[e] === "\r" || t[e] === "" ? (i.push(s), s = "") : s += t[e], e += 1;
        return i.push(s), i;
      }, SVGTextLottieElement.prototype.buildShapeData = function(t, e) {
        if (t.shapes && t.shapes.length) {
          var r = t.shapes[0];
          if (r.it) {
            var i = r.it[r.it.length - 1];
            i.s && (i.s.k[0] = e, i.s.k[1] = e);
          }
        }
        return t;
      }, SVGTextLottieElement.prototype.buildNewText = function() {
        this.addDynamicProperty(this);
        var t, e, r = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass)
          this.layerElement.setAttribute("class", i.fClass);
        else {
          this.layerElement.setAttribute("font-family", i.fFamily);
          var s = r.fWeight, n = r.fStyle;
          this.layerElement.setAttribute("font-style", n), this.layerElement.setAttribute("font-weight", s);
        }
        this.layerElement.setAttribute("aria-label", r.t);
        var a = r.l || [], l = !!this.globalData.fontManager.chars;
        e = a.length;
        var o, f = this.mHelper, m = "", b = this.data.singleShape, h = 0, g = 0, y = !0, u = r.tr * 1e-3 * r.finalSize;
        if (b && !l && !r.sz) {
          var P = this.textContainer, c = "start";
          switch (r.j) {
            case 1:
              c = "end";
              break;
            case 2:
              c = "middle";
              break;
            default:
              c = "start";
              break;
          }
          P.setAttribute("text-anchor", c), P.setAttribute("letter-spacing", u);
          var d = this.buildTextContents(r.finalText);
          for (e = d.length, g = r.ps ? r.ps[1] + r.ascent : 0, t = 0; t < e; t += 1)
            o = this.textSpans[t].span || createNS("tspan"), o.textContent = d[t], o.setAttribute("x", 0), o.setAttribute("y", g), o.style.display = "inherit", P.appendChild(o), this.textSpans[t] || (this.textSpans[t] = {
              span: null,
              glyph: null
            }), this.textSpans[t].span = o, g += r.finalLineHeight;
          this.layerElement.appendChild(P);
        } else {
          var p = this.textSpans.length, v;
          for (t = 0; t < e; t += 1) {
            if (this.textSpans[t] || (this.textSpans[t] = {
              span: null,
              childSpan: null,
              glyph: null
            }), !l || !b || t === 0) {
              if (o = p > t ? this.textSpans[t].span : createNS(l ? "g" : "text"), p <= t) {
                if (o.setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4"), this.textSpans[t].span = o, l) {
                  var S = createNS("g");
                  o.appendChild(S), this.textSpans[t].childSpan = S;
                }
                this.textSpans[t].span = o, this.layerElement.appendChild(o);
              }
              o.style.display = "inherit";
            }
            if (f.reset(), b && (a[t].n && (h = -u, g += r.yOffset, g += y ? 1 : 0, y = !1), this.applyTextPropertiesToMatrix(r, f, a[t].line, h, g), h += a[t].l || 0, h += u), l) {
              v = this.globalData.fontManager.getCharData(r.finalText[t], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily);
              var _;
              if (v.t === 1)
                _ = new SVGCompElement(v.data, this.globalData, this);
              else {
                var A = emptyShapeData;
                v.data && v.data.shapes && (A = this.buildShapeData(v.data, r.finalSize)), _ = new SVGShapeElement(A, this.globalData, this);
              }
              if (this.textSpans[t].glyph) {
                var T = this.textSpans[t].glyph;
                this.textSpans[t].childSpan.removeChild(T.layerElement), T.destroy();
              }
              this.textSpans[t].glyph = _, _._debug = !0, _.prepareFrame(0), _.renderFrame(), this.textSpans[t].childSpan.appendChild(_.layerElement), v.t === 1 && this.textSpans[t].childSpan.setAttribute("transform", "scale(" + r.finalSize / 100 + "," + r.finalSize / 100 + ")");
            } else
              b && o.setAttribute("transform", "translate(" + f.props[12] + "," + f.props[13] + ")"), o.textContent = a[t].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
          }
          b && o && o.setAttribute("d", m);
        }
        for (; t < this.textSpans.length; )
          this.textSpans[t].span.style.display = "none", t += 1;
        this._sizeChanged = !0;
      }, SVGTextLottieElement.prototype.sourceRectAtTime = function() {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
          this._sizeChanged = !1;
          var t = this.layerElement.getBBox();
          this.bbox = {
            top: t.y,
            left: t.x,
            width: t.width,
            height: t.height
          };
        }
        return this.bbox;
      }, SVGTextLottieElement.prototype.getValue = function() {
        var t, e = this.textSpans.length, r;
        for (this.renderedFrame = this.comp.renderedFrame, t = 0; t < e; t += 1)
          r = this.textSpans[t].glyph, r && (r.prepareFrame(this.comp.renderedFrame - this.data.st), r._mdf && (this._mdf = !0));
      }, SVGTextLottieElement.prototype.renderInnerContent = function() {
        if (this.validateText(), (!this.data.singleShape || this._mdf) && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          this._sizeChanged = !0;
          var t, e, r = this.textAnimator.renderedLetters, i = this.textProperty.currentData.l;
          e = i.length;
          var s, n, a;
          for (t = 0; t < e; t += 1)
            i[t].n || (s = r[t], n = this.textSpans[t].span, a = this.textSpans[t].glyph, a && a.renderFrame(), s._mdf.m && n.setAttribute("transform", s.m), s._mdf.o && n.setAttribute("opacity", s.o), s._mdf.sw && n.setAttribute("stroke-width", s.sw), s._mdf.sc && n.setAttribute("stroke", s.sc), s._mdf.fc && n.setAttribute("fill", s.fc));
        }
      };
      function ISolidElement(t, e, r) {
        this.initElement(t, e, r);
      }
      extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function() {
        var t = createNS("rect");
        t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.layerElement.appendChild(t);
      };
      function NullElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initFrame(), this.initTransform(t, e, r), this.initHierarchy();
      }
      NullElement.prototype.prepareFrame = function(t) {
        this.prepareProperties(t, !0);
      }, NullElement.prototype.renderFrame = function() {
      }, NullElement.prototype.getBaseElement = function() {
        return null;
      }, NullElement.prototype.destroy = function() {
      }, NullElement.prototype.sourceRectAtTime = function() {
      }, NullElement.prototype.hide = function() {
      }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement);
      function SVGRendererBase() {
      }
      extendPrototype([BaseRenderer], SVGRendererBase), SVGRendererBase.prototype.createNull = function(t) {
        return new NullElement(t, this.globalData, this);
      }, SVGRendererBase.prototype.createShape = function(t) {
        return new SVGShapeElement(t, this.globalData, this);
      }, SVGRendererBase.prototype.createText = function(t) {
        return new SVGTextLottieElement(t, this.globalData, this);
      }, SVGRendererBase.prototype.createImage = function(t) {
        return new IImageElement(t, this.globalData, this);
      }, SVGRendererBase.prototype.createSolid = function(t) {
        return new ISolidElement(t, this.globalData, this);
      }, SVGRendererBase.prototype.configAnimation = function(t) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + t.w + " " + t.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", t.w), this.svgElement.setAttribute("height", t.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)", this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.width && this.svgElement.setAttribute("width", this.renderConfig.width), this.renderConfig.height && this.svgElement.setAttribute("height", this.renderConfig.height), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), this.renderConfig.focusable !== void 0 && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var e = this.globalData.defs;
        this.setupGlobalData(t, e), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = t;
        var r = createNS("clipPath"), i = createNS("rect");
        i.setAttribute("width", t.w), i.setAttribute("height", t.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
        var s = createElementID();
        r.setAttribute("id", s), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")"), e.appendChild(r), this.layers = t.layers, this.elements = createSizedArray(t.layers.length);
      }, SVGRendererBase.prototype.destroy = function() {
        this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t += 1)
          this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, SVGRendererBase.prototype.updateContainerSize = function() {
      }, SVGRendererBase.prototype.findIndexByInd = function(t) {
        var e = 0, r = this.layers.length;
        for (e = 0; e < r; e += 1)
          if (this.layers[e].ind === t)
            return e;
        return -1;
      }, SVGRendererBase.prototype.buildItem = function(t) {
        var e = this.elements;
        if (!(e[t] || this.layers[t].ty === 99)) {
          e[t] = !0;
          var r = this.createItem(this.layers[t]);
          if (e[t] = r, getExpressionsPlugin() && (this.layers[t].ty === 0 && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, t), this.layers[t].tt) {
            var i = "tp" in this.layers[t] ? this.findIndexByInd(this.layers[t].tp) : t - 1;
            if (i === -1)
              return;
            if (!this.elements[i] || this.elements[i] === !0)
              this.buildItem(i), this.addPendingElement(r);
            else {
              var s = e[i], n = s.getMatte(this.layers[t].tt);
              r.setMatte(n);
            }
          }
        }
      }, SVGRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          if (t.checkParenting(), t.data.tt)
            for (var e = 0, r = this.elements.length; e < r; ) {
              if (this.elements[e] === t) {
                var i = "tp" in t.data ? this.findIndexByInd(t.data.tp) : e - 1, s = this.elements[i], n = s.getMatte(this.layers[e].tt);
                t.setMatte(n);
                break;
              }
              e += 1;
            }
        }
      }, SVGRendererBase.prototype.renderFrame = function(t) {
        if (!(this.renderedFrame === t || this.destroyed)) {
          t === null ? t = this.renderedFrame : this.renderedFrame = t, this.globalData.frameNum = t, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = t, this.globalData._mdf = !1;
          var e, r = this.layers.length;
          for (this.completeLayers || this.checkLayers(t), e = r - 1; e >= 0; e -= 1)
            (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
          if (this.globalData._mdf)
            for (e = 0; e < r; e += 1)
              (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
        }
      }, SVGRendererBase.prototype.appendElementInPos = function(t, e) {
        var r = t.getBaseElement();
        if (r) {
          for (var i = 0, s; i < e; )
            this.elements[i] && this.elements[i] !== !0 && this.elements[i].getBaseElement() && (s = this.elements[i].getBaseElement()), i += 1;
          s ? this.layerElement.insertBefore(r, s) : this.layerElement.appendChild(r);
        }
      }, SVGRendererBase.prototype.hide = function() {
        this.layerElement.style.display = "none";
      }, SVGRendererBase.prototype.show = function() {
        this.layerElement.style.display = "block";
      };
      function ICompElement() {
      }
      extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initTransform(t, e, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), (this.data.xt || !e.progressiveLoad) && this.buildAllItems(), this.hide();
      }, ICompElement.prototype.prepareFrame = function(t) {
        if (this._mdf = !1, this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange), !(!this.isInRange && !this.data.xt)) {
          if (this.tm._placeholder)
            this.renderedFrame = t / this.data.sr;
          else {
            var e = this.tm.v;
            e === this.data.op && (e = this.data.op - 1), this.renderedFrame = e;
          }
          var r, i = this.elements.length;
          for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)
            (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
        }
      }, ICompElement.prototype.renderInnerContent = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
          (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
      }, ICompElement.prototype.setElements = function(t) {
        this.elements = t;
      }, ICompElement.prototype.getElements = function() {
        return this.elements;
      }, ICompElement.prototype.destroyElements = function() {
        var t, e = this.layers.length;
        for (t = 0; t < e; t += 1)
          this.elements[t] && this.elements[t].destroy();
      }, ICompElement.prototype.destroy = function() {
        this.destroyElements(), this.destroyBaseElement();
      };
      function SVGCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement), SVGCompElement.prototype.createComp = function(t) {
        return new SVGCompElement(t, this.globalData, this);
      };
      function SVGRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
        var r = "";
        if (e && e.title) {
          var i = createNS("title"), s = createElementID();
          i.setAttribute("id", s), i.textContent = e.title, this.svgElement.appendChild(i), r += s;
        }
        if (e && e.description) {
          var n = createNS("desc"), a = createElementID();
          n.setAttribute("id", a), n.textContent = e.description, this.svgElement.appendChild(n), r += " " + a;
        }
        r && this.svgElement.setAttribute("aria-labelledby", r);
        var l = createNS("defs");
        this.svgElement.appendChild(l);
        var o = createNS("g");
        this.svgElement.appendChild(o), this.layerElement = o, this.renderConfig = {
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          contentVisibility: e && e.contentVisibility || "visible",
          progressiveLoad: e && e.progressiveLoad || !1,
          hideOnTransparent: !(e && e.hideOnTransparent === !1),
          viewBoxOnly: e && e.viewBoxOnly || !1,
          viewBoxSize: e && e.viewBoxSize || !1,
          className: e && e.className || "",
          id: e && e.id || "",
          focusable: e && e.focusable,
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "100%",
            height: e && e.filterSize && e.filterSize.height || "100%",
            x: e && e.filterSize && e.filterSize.x || "0%",
            y: e && e.filterSize && e.filterSize.y || "0%"
          },
          width: e && e.width,
          height: e && e.height,
          runExpressions: !e || e.runExpressions === void 0 || e.runExpressions
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: l,
          renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
      }
      extendPrototype([SVGRendererBase], SVGRenderer), SVGRenderer.prototype.createComp = function(t) {
        return new SVGCompElement(t, this.globalData, this);
      };
      function ShapeTransformManager() {
        this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
      }
      ShapeTransformManager.prototype = {
        addTransformSequence: function(e) {
          var r, i = e.length, s = "_";
          for (r = 0; r < i; r += 1)
            s += e[r].transform.key + "_";
          var n = this.sequences[s];
          return n || (n = {
            transforms: [].concat(e),
            finalTransform: new Matrix(),
            _mdf: !1
          }, this.sequences[s] = n, this.sequenceList.push(n)), n;
        },
        processSequence: function(e, r) {
          for (var i = 0, s = e.transforms.length, n = r; i < s && !r; ) {
            if (e.transforms[i].transform.mProps._mdf) {
              n = !0;
              break;
            }
            i += 1;
          }
          if (n)
            for (e.finalTransform.reset(), i = s - 1; i >= 0; i -= 1)
              e.finalTransform.multiply(e.transforms[i].transform.mProps.v);
          e._mdf = n;
        },
        processSequences: function(e) {
          var r, i = this.sequenceList.length;
          for (r = 0; r < i; r += 1)
            this.processSequence(this.sequenceList[r], e);
        },
        getNewKey: function() {
          return this.transform_key_count += 1, "_" + this.transform_key_count;
        }
      };
      var lumaLoader = function() {
        var e = "__lottie_element_luma_buffer", r = null, i = null, s = null;
        function n() {
          var o = createNS("svg"), f = createNS("filter"), m = createNS("feColorMatrix");
          return f.setAttribute("id", e), m.setAttribute("type", "matrix"), m.setAttribute("color-interpolation-filters", "sRGB"), m.setAttribute("values", "0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0"), f.appendChild(m), o.appendChild(f), o.setAttribute("id", e + "_svg"), featureSupport.svgLumaHidden && (o.style.display = "none"), o;
        }
        function a() {
          r || (s = n(), document.body.appendChild(s), r = createTag("canvas"), i = r.getContext("2d"), i.filter = "url(#" + e + ")", i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1));
        }
        function l(o) {
          return r || a(), r.width = o.width, r.height = o.height, i.filter = "url(#" + e + ")", r;
        }
        return {
          load: a,
          get: l
        };
      };
      function createCanvas(t, e) {
        if (featureSupport.offscreenCanvas)
          return new OffscreenCanvas(t, e);
        var r = createTag("canvas");
        return r.width = t, r.height = e, r;
      }
      var assetLoader = function() {
        return {
          loadLumaCanvas: lumaLoader.load,
          getLumaCanvas: lumaLoader.get,
          createCanvas
        };
      }(), registeredEffects = {};
      function CVEffects(t) {
        var e, r = t.data.ef ? t.data.ef.length : 0;
        this.filters = [];
        var i;
        for (e = 0; e < r; e += 1) {
          i = null;
          var s = t.data.ef[e].ty;
          if (registeredEffects[s]) {
            var n = registeredEffects[s].effect;
            i = new n(t.effectsManager.effectElements[e], t);
          }
          i && this.filters.push(i);
        }
        this.filters.length && t.addRenderableComponent(this);
      }
      CVEffects.prototype.renderFrame = function(t) {
        var e, r = this.filters.length;
        for (e = 0; e < r; e += 1)
          this.filters[e].renderFrame(t);
      }, CVEffects.prototype.getEffects = function(t) {
        var e, r = this.filters.length, i = [];
        for (e = 0; e < r; e += 1)
          this.filters[e].type === t && i.push(this.filters[e]);
        return i;
      };
      function registerEffect(t, e) {
        registeredEffects[t] = {
          effect: e
        };
      }
      function CVMaskElement(t, e) {
        this.data = t, this.element = e, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
        var r, i = this.masksProperties.length, s = !1;
        for (r = 0; r < i; r += 1)
          this.masksProperties[r].mode !== "n" && (s = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
        this.hasMasks = s, s && this.element.addRenderableComponent(this);
      }
      CVMaskElement.prototype.renderFrame = function() {
        if (this.hasMasks) {
          var t = this.element.finalTransform.mat, e = this.element.canvasContext, r, i = this.masksProperties.length, s, n, a;
          for (e.beginPath(), r = 0; r < i; r += 1)
            if (this.masksProperties[r].mode !== "n") {
              this.masksProperties[r].inv && (e.moveTo(0, 0), e.lineTo(this.element.globalData.compSize.w, 0), e.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), e.lineTo(0, this.element.globalData.compSize.h), e.lineTo(0, 0)), a = this.viewData[r].v, s = t.applyToPointArray(a.v[0][0], a.v[0][1], 0), e.moveTo(s[0], s[1]);
              var l, o = a._length;
              for (l = 1; l < o; l += 1)
                n = t.applyToTriplePoints(a.o[l - 1], a.i[l], a.v[l]), e.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
              n = t.applyToTriplePoints(a.o[l - 1], a.i[0], a.v[0]), e.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
            }
          this.element.globalData.renderer.save(!0), e.clip();
        }
      }, CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty, CVMaskElement.prototype.destroy = function() {
        this.element = null;
      };
      function CVBaseElement() {
      }
      var operationsMap = {
        1: "source-in",
        2: "source-out",
        3: "source-in",
        4: "source-out"
      };
      CVBaseElement.prototype = {
        createElements: function() {
        },
        initRendererElement: function() {
        },
        createContainerElements: function() {
          if (this.data.tt >= 1) {
            this.buffers = [];
            var e = this.globalData.canvasContext, r = assetLoader.createCanvas(e.canvas.width, e.canvas.height);
            this.buffers.push(r);
            var i = assetLoader.createCanvas(e.canvas.width, e.canvas.height);
            this.buffers.push(i), this.data.tt >= 3 && !document._isProxy && assetLoader.loadLumaCanvas();
          }
          this.canvasContext = this.globalData.canvasContext, this.transformCanvas = this.globalData.transformCanvas, this.renderableEffectsManager = new CVEffects(this), this.searchEffectTransforms();
        },
        createContent: function() {
        },
        setBlendMode: function() {
          var e = this.globalData;
          if (e.blendMode !== this.data.bm) {
            e.blendMode = this.data.bm;
            var r = getBlendMode(this.data.bm);
            e.canvasContext.globalCompositeOperation = r;
          }
        },
        createRenderableComponents: function() {
          this.maskManager = new CVMaskElement(this.data, this), this.transformEffects = this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);
        },
        hideElement: function() {
          !this.hidden && (!this.isInRange || this.isTransparent) && (this.hidden = !0);
        },
        showElement: function() {
          this.isInRange && !this.isTransparent && (this.hidden = !1, this._isFirstFrame = !0, this.maskManager._isFirstFrame = !0);
        },
        clearCanvas: function(e) {
          e.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy);
        },
        prepareLayer: function() {
          if (this.data.tt >= 1) {
            var e = this.buffers[0], r = e.getContext("2d");
            this.clearCanvas(r), r.drawImage(this.canvasContext.canvas, 0, 0), this.currentTransform = this.canvasContext.getTransform(), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform);
          }
        },
        exitLayer: function() {
          if (this.data.tt >= 1) {
            var e = this.buffers[1], r = e.getContext("2d");
            this.clearCanvas(r), r.drawImage(this.canvasContext.canvas, 0, 0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform);
            var i = this.comp.getElementById("tp" in this.data ? this.data.tp : this.data.ind - 1);
            if (i.renderFrame(!0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.data.tt >= 3 && !document._isProxy) {
              var s = assetLoader.getLumaCanvas(this.canvasContext.canvas), n = s.getContext("2d");
              n.drawImage(this.canvasContext.canvas, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.drawImage(s, 0, 0);
            }
            this.canvasContext.globalCompositeOperation = operationsMap[this.data.tt], this.canvasContext.drawImage(e, 0, 0), this.canvasContext.globalCompositeOperation = "destination-over", this.canvasContext.drawImage(this.buffers[0], 0, 0), this.canvasContext.setTransform(this.currentTransform), this.canvasContext.globalCompositeOperation = "source-over";
          }
        },
        renderFrame: function(e) {
          if (!(this.hidden || this.data.hd) && !(this.data.td === 1 && !e)) {
            this.renderTransform(), this.renderRenderable(), this.renderLocalTransform(), this.setBlendMode();
            var r = this.data.ty === 0;
            this.prepareLayer(), this.globalData.renderer.save(r), this.globalData.renderer.ctxTransform(this.finalTransform.localMat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.localOpacity), this.renderInnerContent(), this.globalData.renderer.restore(r), this.exitLayer(), this.maskManager.hasMasks && this.globalData.renderer.restore(!0), this._isFirstFrame && (this._isFirstFrame = !1);
          }
        },
        destroy: function() {
          this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager.destroy();
        },
        mHelper: new Matrix()
      }, CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement, CVBaseElement.prototype.show = CVBaseElement.prototype.showElement;
      function CVShapeData(t, e, r, i) {
        this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
        var s = 4;
        e.ty === "rc" ? s = 5 : e.ty === "el" ? s = 6 : e.ty === "sr" && (s = 7), this.sh = ShapePropertyFactory.getShapeProp(t, e, s, t);
        var n, a = r.length, l;
        for (n = 0; n < a; n += 1)
          r[n].closed || (l = {
            transforms: i.addTransformSequence(r[n].transforms),
            trNodes: []
          }, this.styledShapes.push(l), r[n].elements.push(l));
      }
      CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated;
      function CVShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
        opacity: 1,
        _opMdf: !1
      }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
      }, CVShapeElement.prototype.createStyleElement = function(t, e) {
        var r = {
          data: t,
          type: t.ty,
          preTransforms: this.transformsManager.addTransformSequence(e),
          transforms: [],
          elements: [],
          closed: t.hd === !0
        }, i = {};
        if (t.ty === "fl" || t.ty === "st" ? (i.c = PropertyFactory.getProp(this, t.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : (t.ty === "gf" || t.ty === "gs") && (i.s = PropertyFactory.getProp(this, t.s, 1, null, this), i.e = PropertyFactory.getProp(this, t.e, 1, null, this), i.h = PropertyFactory.getProp(this, t.h || {
          k: 0
        }, 0, 0.01, this), i.a = PropertyFactory.getProp(this, t.a || {
          k: 0
        }, 0, degToRads, this), i.g = new GradientProperty(this, t.g, this)), i.o = PropertyFactory.getProp(this, t.o, 0, 0.01, this), t.ty === "st" || t.ty === "gs") {
          if (r.lc = lineCapEnum[t.lc || 2], r.lj = lineJoinEnum[t.lj || 2], t.lj == 1 && (r.ml = t.ml), i.w = PropertyFactory.getProp(this, t.w, 0, null, this), i.w.k || (r.wi = i.w.v), t.d) {
            var s = new DashProperty(this, t.d, "canvas", this);
            i.d = s, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0]);
          }
        } else
          r.r = t.r === 2 ? "evenodd" : "nonzero";
        return this.stylesList.push(r), i.style = r, i;
      }, CVShapeElement.prototype.createGroupElement = function() {
        var t = {
          it: [],
          prevViewData: []
        };
        return t;
      }, CVShapeElement.prototype.createTransformElement = function(t) {
        var e = {
          transform: {
            opacity: 1,
            _opMdf: !1,
            key: this.transformsManager.getNewKey(),
            op: PropertyFactory.getProp(this, t.o, 0, 0.01, this),
            mProps: TransformPropertyFactory.getTransformProperty(this, t, this)
          }
        };
        return e;
      }, CVShapeElement.prototype.createShapeElement = function(t) {
        var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
        return this.shapes.push(e), this.addShapeToModifiers(e), e;
      }, CVShapeElement.prototype.reloadShapes = function() {
        this._isFirstFrame = !0;
        var t, e = this.itemsData.length;
        for (t = 0; t < e; t += 1)
          this.prevViewData[t] = this.itemsData[t];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), e = this.dynamicProperties.length, t = 0; t < e; t += 1)
          this.dynamicProperties[t].getValue();
        this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
      }, CVShapeElement.prototype.addTransformToStyleList = function(t) {
        var e, r = this.stylesList.length;
        for (e = 0; e < r; e += 1)
          this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
      }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
        var t, e = this.stylesList.length;
        for (t = 0; t < e; t += 1)
          this.stylesList[t].closed || this.stylesList[t].transforms.pop();
      }, CVShapeElement.prototype.closeStyles = function(t) {
        var e, r = t.length;
        for (e = 0; e < r; e += 1)
          t[e].closed = !0;
      }, CVShapeElement.prototype.searchShapes = function(t, e, r, i, s) {
        var n, a = t.length - 1, l, o, f = [], m = [], b, h, g, y = [].concat(s);
        for (n = a; n >= 0; n -= 1) {
          if (b = this.searchProcessedElement(t[n]), b ? e[n] = r[b - 1] : t[n]._shouldRender = i, t[n].ty === "fl" || t[n].ty === "st" || t[n].ty === "gf" || t[n].ty === "gs")
            b ? e[n].style.closed = !1 : e[n] = this.createStyleElement(t[n], y), f.push(e[n].style);
          else if (t[n].ty === "gr") {
            if (!b)
              e[n] = this.createGroupElement(t[n]);
            else
              for (o = e[n].it.length, l = 0; l < o; l += 1)
                e[n].prevViewData[l] = e[n].it[l];
            this.searchShapes(t[n].it, e[n].it, e[n].prevViewData, i, y);
          } else t[n].ty === "tr" ? (b || (g = this.createTransformElement(t[n]), e[n] = g), y.push(e[n]), this.addTransformToStyleList(e[n])) : t[n].ty === "sh" || t[n].ty === "rc" || t[n].ty === "el" || t[n].ty === "sr" ? b || (e[n] = this.createShapeElement(t[n])) : t[n].ty === "tm" || t[n].ty === "rd" || t[n].ty === "pb" || t[n].ty === "zz" || t[n].ty === "op" ? (b ? (h = e[n], h.closed = !1) : (h = ShapeModifiers.getModifier(t[n].ty), h.init(this, t[n]), e[n] = h, this.shapeModifiers.push(h)), m.push(h)) : t[n].ty === "rp" && (b ? (h = e[n], h.closed = !0) : (h = ShapeModifiers.getModifier(t[n].ty), e[n] = h, h.init(this, t, n, e), this.shapeModifiers.push(h), i = !1), m.push(h));
          this.addProcessedElement(t[n], n + 1);
        }
        for (this.removeTransformFromStyleList(), this.closeStyles(f), a = m.length, n = 0; n < a; n += 1)
          m[n].closed = !0;
      }, CVShapeElement.prototype.renderInnerContent = function() {
        this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
      }, CVShapeElement.prototype.renderShapeTransform = function(t, e) {
        (t._opMdf || e.op._mdf || this._isFirstFrame) && (e.opacity = t.opacity, e.opacity *= e.op.v, e._opMdf = !0);
      }, CVShapeElement.prototype.drawLayer = function() {
        var t, e = this.stylesList.length, r, i, s, n, a, l, o = this.globalData.renderer, f = this.globalData.canvasContext, m, b;
        for (t = 0; t < e; t += 1)
          if (b = this.stylesList[t], m = b.type, !((m === "st" || m === "gs") && b.wi === 0 || !b.data._shouldRender || b.coOp === 0 || this.globalData.currentGlobalAlpha === 0)) {
            for (o.save(), a = b.elements, m === "st" || m === "gs" ? (o.ctxStrokeStyle(m === "st" ? b.co : b.grd), o.ctxLineWidth(b.wi), o.ctxLineCap(b.lc), o.ctxLineJoin(b.lj), o.ctxMiterLimit(b.ml || 0)) : o.ctxFillStyle(m === "fl" ? b.co : b.grd), o.ctxOpacity(b.coOp), m !== "st" && m !== "gs" && f.beginPath(), o.ctxTransform(b.preTransforms.finalTransform.props), i = a.length, r = 0; r < i; r += 1) {
              for ((m === "st" || m === "gs") && (f.beginPath(), b.da && (f.setLineDash(b.da), f.lineDashOffset = b.do)), l = a[r].trNodes, n = l.length, s = 0; s < n; s += 1)
                l[s].t === "m" ? f.moveTo(l[s].p[0], l[s].p[1]) : l[s].t === "c" ? f.bezierCurveTo(l[s].pts[0], l[s].pts[1], l[s].pts[2], l[s].pts[3], l[s].pts[4], l[s].pts[5]) : f.closePath();
              (m === "st" || m === "gs") && (o.ctxStroke(), b.da && f.setLineDash(this.dashResetter));
            }
            m !== "st" && m !== "gs" && this.globalData.renderer.ctxFill(b.r), o.restore();
          }
      }, CVShapeElement.prototype.renderShape = function(t, e, r, i) {
        var s, n = e.length - 1, a;
        for (a = t, s = n; s >= 0; s -= 1)
          e[s].ty === "tr" ? (a = r[s].transform, this.renderShapeTransform(t, a)) : e[s].ty === "sh" || e[s].ty === "el" || e[s].ty === "rc" || e[s].ty === "sr" ? this.renderPath(e[s], r[s]) : e[s].ty === "fl" ? this.renderFill(e[s], r[s], a) : e[s].ty === "st" ? this.renderStroke(e[s], r[s], a) : e[s].ty === "gf" || e[s].ty === "gs" ? this.renderGradientFill(e[s], r[s], a) : e[s].ty === "gr" ? this.renderShape(a, e[s].it, r[s].it) : e[s].ty;
        i && this.drawLayer();
      }, CVShapeElement.prototype.renderStyledShape = function(t, e) {
        if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
          var r = t.trNodes, i = e.paths, s, n, a, l = i._length;
          r.length = 0;
          var o = t.transforms.finalTransform;
          for (a = 0; a < l; a += 1) {
            var f = i.shapes[a];
            if (f && f.v) {
              for (n = f._length, s = 1; s < n; s += 1)
                s === 1 && r.push({
                  t: "m",
                  p: o.applyToPointArray(f.v[0][0], f.v[0][1], 0)
                }), r.push({
                  t: "c",
                  pts: o.applyToTriplePoints(f.o[s - 1], f.i[s], f.v[s])
                });
              n === 1 && r.push({
                t: "m",
                p: o.applyToPointArray(f.v[0][0], f.v[0][1], 0)
              }), f.c && n && (r.push({
                t: "c",
                pts: o.applyToTriplePoints(f.o[s - 1], f.i[0], f.v[0])
              }), r.push({
                t: "z"
              }));
            }
          }
          t.trNodes = r;
        }
      }, CVShapeElement.prototype.renderPath = function(t, e) {
        if (t.hd !== !0 && t._shouldRender) {
          var r, i = e.styledShapes.length;
          for (r = 0; r < i; r += 1)
            this.renderStyledShape(e.styledShapes[r], e.sh);
        }
      }, CVShapeElement.prototype.renderFill = function(t, e, r) {
        var i = e.style;
        (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity);
      }, CVShapeElement.prototype.renderGradientFill = function(t, e, r) {
        var i = e.style, s;
        if (!i.grd || e.g._mdf || e.s._mdf || e.e._mdf || t.t !== 1 && (e.h._mdf || e.a._mdf)) {
          var n = this.globalData.canvasContext, a = e.s.v, l = e.e.v;
          if (t.t === 1)
            s = n.createLinearGradient(a[0], a[1], l[0], l[1]);
          else {
            var o = Math.sqrt(Math.pow(a[0] - l[0], 2) + Math.pow(a[1] - l[1], 2)), f = Math.atan2(l[1] - a[1], l[0] - a[0]), m = e.h.v;
            m >= 1 ? m = 0.99 : m <= -1 && (m = -0.99);
            var b = o * m, h = Math.cos(f + e.a.v) * b + a[0], g = Math.sin(f + e.a.v) * b + a[1];
            s = n.createRadialGradient(h, g, 0, a[0], a[1], o);
          }
          var y, u = t.g.p, P = e.g.c, c = 1;
          for (y = 0; y < u; y += 1)
            e.g._hasOpacity && e.g._collapsable && (c = e.g.o[y * 2 + 1]), s.addColorStop(P[y * 4] / 100, "rgba(" + P[y * 4 + 1] + "," + P[y * 4 + 2] + "," + P[y * 4 + 3] + "," + c + ")");
          i.grd = s;
        }
        i.coOp = e.o.v * r.opacity;
      }, CVShapeElement.prototype.renderStroke = function(t, e, r) {
        var i = e.style, s = e.d;
        s && (s._mdf || this._isFirstFrame) && (i.da = s.dashArray, i.do = s.dashoffset[0]), (e.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(e.c.v[0]) + "," + bmFloor(e.c.v[1]) + "," + bmFloor(e.c.v[2]) + ")"), (e.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = e.o.v * r.opacity), (e.w._mdf || this._isFirstFrame) && (i.wi = e.w.v);
      }, CVShapeElement.prototype.destroy = function() {
        this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
      };
      function CVTextElement(t, e, r) {
        this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          sWidth: 0,
          fValue: ""
        }, this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function() {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = !1;
        t.fc ? (e = !0, this.values.fill = this.buildColor(t.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = e;
        var r = !1;
        t.sc && (r = !0, this.values.stroke = this.buildColor(t.sc), this.values.sWidth = t.sw);
        var i = this.globalData.fontManager.getFontByName(t.f), s, n, a = t.l, l = this.mHelper;
        this.stroke = r, this.values.fValue = t.finalSize + "px " + this.globalData.fontManager.getFontByName(t.f).fFamily, n = t.finalText.length;
        var o, f, m, b, h, g, y, u, P, c, d = this.data.singleShape, p = t.tr * 1e-3 * t.finalSize, v = 0, S = 0, _ = !0, A = 0;
        for (s = 0; s < n; s += 1) {
          o = this.globalData.fontManager.getCharData(t.finalText[s], i.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily), f = o && o.data || {}, l.reset(), d && a[s].n && (v = -p, S += t.yOffset, S += _ ? 1 : 0, _ = !1), h = f.shapes ? f.shapes[0].it : [], y = h.length, l.scale(t.finalSize / 100, t.finalSize / 100), d && this.applyTextPropertiesToMatrix(t, l, a[s].line, v, S), P = createSizedArray(y - 1);
          var T = 0;
          for (g = 0; g < y; g += 1)
            if (h[g].ty === "sh") {
              for (b = h[g].ks.k.i.length, u = h[g].ks.k, c = [], m = 1; m < b; m += 1)
                m === 1 && c.push(l.applyToX(u.v[0][0], u.v[0][1], 0), l.applyToY(u.v[0][0], u.v[0][1], 0)), c.push(l.applyToX(u.o[m - 1][0], u.o[m - 1][1], 0), l.applyToY(u.o[m - 1][0], u.o[m - 1][1], 0), l.applyToX(u.i[m][0], u.i[m][1], 0), l.applyToY(u.i[m][0], u.i[m][1], 0), l.applyToX(u.v[m][0], u.v[m][1], 0), l.applyToY(u.v[m][0], u.v[m][1], 0));
              c.push(l.applyToX(u.o[m - 1][0], u.o[m - 1][1], 0), l.applyToY(u.o[m - 1][0], u.o[m - 1][1], 0), l.applyToX(u.i[0][0], u.i[0][1], 0), l.applyToY(u.i[0][0], u.i[0][1], 0), l.applyToX(u.v[0][0], u.v[0][1], 0), l.applyToY(u.v[0][0], u.v[0][1], 0)), P[T] = c, T += 1;
            }
          d && (v += a[s].l, v += p), this.textSpans[A] ? this.textSpans[A].elem = P : this.textSpans[A] = {
            elem: P
          }, A += 1;
        }
      }, CVTextElement.prototype.renderInnerContent = function() {
        this.validateText();
        var t = this.canvasContext;
        t.font = this.values.fValue, this.globalData.renderer.ctxLineCap("butt"), this.globalData.renderer.ctxLineJoin("miter"), this.globalData.renderer.ctxMiterLimit(4), this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
        var e, r, i, s, n, a, l = this.textAnimator.renderedLetters, o = this.textProperty.currentData.l;
        r = o.length;
        var f, m = null, b = null, h = null, g, y, u = this.globalData.renderer;
        for (e = 0; e < r; e += 1)
          if (!o[e].n) {
            if (f = l[e], f && (u.save(), u.ctxTransform(f.p), u.ctxOpacity(f.o)), this.fill) {
              for (f && f.fc ? m !== f.fc && (u.ctxFillStyle(f.fc), m = f.fc) : m !== this.values.fill && (m = this.values.fill, u.ctxFillStyle(this.values.fill)), g = this.textSpans[e].elem, s = g.length, this.globalData.canvasContext.beginPath(), i = 0; i < s; i += 1)
                for (y = g[i], a = y.length, this.globalData.canvasContext.moveTo(y[0], y[1]), n = 2; n < a; n += 6)
                  this.globalData.canvasContext.bezierCurveTo(y[n], y[n + 1], y[n + 2], y[n + 3], y[n + 4], y[n + 5]);
              this.globalData.canvasContext.closePath(), u.ctxFill();
            }
            if (this.stroke) {
              for (f && f.sw ? h !== f.sw && (h = f.sw, u.ctxLineWidth(f.sw)) : h !== this.values.sWidth && (h = this.values.sWidth, u.ctxLineWidth(this.values.sWidth)), f && f.sc ? b !== f.sc && (b = f.sc, u.ctxStrokeStyle(f.sc)) : b !== this.values.stroke && (b = this.values.stroke, u.ctxStrokeStyle(this.values.stroke)), g = this.textSpans[e].elem, s = g.length, this.globalData.canvasContext.beginPath(), i = 0; i < s; i += 1)
                for (y = g[i], a = y.length, this.globalData.canvasContext.moveTo(y[0], y[1]), n = 2; n < a; n += 6)
                  this.globalData.canvasContext.bezierCurveTo(y[n], y[n + 1], y[n + 2], y[n + 3], y[n + 4], y[n + 5]);
              this.globalData.canvasContext.closePath(), u.ctxStroke();
            }
            f && this.globalData.renderer.restore();
          }
      };
      function CVImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.img = e.imageLoader.getAsset(this.assetData), this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function() {
        if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
          var t = createTag("canvas");
          t.width = this.assetData.w, t.height = this.assetData.h;
          var e = t.getContext("2d"), r = this.img.width, i = this.img.height, s = r / i, n = this.assetData.w / this.assetData.h, a, l, o = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
          s > n && o === "xMidYMid slice" || s < n && o !== "xMidYMid slice" ? (l = i, a = l * n) : (a = r, l = a / n), e.drawImage(this.img, (r - a) / 2, (i - l) / 2, a, l, 0, 0, this.assetData.w, this.assetData.h), this.img = t;
        }
      }, CVImageElement.prototype.renderInnerContent = function() {
        this.canvasContext.drawImage(this.img, 0, 0);
      }, CVImageElement.prototype.destroy = function() {
        this.img = null;
      };
      function CVSolidElement(t, e, r) {
        this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function() {
        this.globalData.renderer.ctxFillStyle(this.data.sc), this.globalData.renderer.ctxFillRect(0, 0, this.data.sw, this.data.sh);
      };
      function CanvasRendererBase() {
      }
      extendPrototype([BaseRenderer], CanvasRendererBase), CanvasRendererBase.prototype.createShape = function(t) {
        return new CVShapeElement(t, this.globalData, this);
      }, CanvasRendererBase.prototype.createText = function(t) {
        return new CVTextElement(t, this.globalData, this);
      }, CanvasRendererBase.prototype.createImage = function(t) {
        return new CVImageElement(t, this.globalData, this);
      }, CanvasRendererBase.prototype.createSolid = function(t) {
        return new CVSolidElement(t, this.globalData, this);
      }, CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRendererBase.prototype.ctxTransform = function(t) {
        t[0] === 1 && t[1] === 0 && t[4] === 0 && t[5] === 1 && t[12] === 0 && t[13] === 0 || this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
      }, CanvasRendererBase.prototype.ctxOpacity = function(t) {
        this.canvasContext.globalAlpha *= t < 0 ? 0 : t;
      }, CanvasRendererBase.prototype.ctxFillStyle = function(t) {
        this.canvasContext.fillStyle = t;
      }, CanvasRendererBase.prototype.ctxStrokeStyle = function(t) {
        this.canvasContext.strokeStyle = t;
      }, CanvasRendererBase.prototype.ctxLineWidth = function(t) {
        this.canvasContext.lineWidth = t;
      }, CanvasRendererBase.prototype.ctxLineCap = function(t) {
        this.canvasContext.lineCap = t;
      }, CanvasRendererBase.prototype.ctxLineJoin = function(t) {
        this.canvasContext.lineJoin = t;
      }, CanvasRendererBase.prototype.ctxMiterLimit = function(t) {
        this.canvasContext.miterLimit = t;
      }, CanvasRendererBase.prototype.ctxFill = function(t) {
        this.canvasContext.fill(t);
      }, CanvasRendererBase.prototype.ctxFillRect = function(t, e, r, i) {
        this.canvasContext.fillRect(t, e, r, i);
      }, CanvasRendererBase.prototype.ctxStroke = function() {
        this.canvasContext.stroke();
      }, CanvasRendererBase.prototype.reset = function() {
        if (!this.renderConfig.clearCanvas) {
          this.canvasContext.restore();
          return;
        }
        this.contextData.reset();
      }, CanvasRendererBase.prototype.save = function() {
        this.canvasContext.save();
      }, CanvasRendererBase.prototype.restore = function(t) {
        if (!this.renderConfig.clearCanvas) {
          this.canvasContext.restore();
          return;
        }
        t && (this.globalData.blendMode = "source-over"), this.contextData.restore(t);
      }, CanvasRendererBase.prototype.configAnimation = function(t) {
        if (this.animationItem.wrapper) {
          this.animationItem.container = createTag("canvas");
          var e = this.animationItem.container.style;
          e.width = "100%", e.height = "100%";
          var r = "0px 0px 0px";
          e.transformOrigin = r, e.mozTransformOrigin = r, e.webkitTransformOrigin = r, e["-webkit-transform"] = r, e.contentVisibility = this.renderConfig.contentVisibility, this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id);
        } else
          this.canvasContext = this.renderConfig.context;
        this.contextData.setContext(this.canvasContext), this.data = t, this.layers = t.layers, this.transformCanvas = {
          w: t.w,
          h: t.h,
          sx: 0,
          sy: 0,
          tx: 0,
          ty: 0
        }, this.setupGlobalData(t, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(t.layers.length), this.updateContainerSize();
      }, CanvasRendererBase.prototype.updateContainerSize = function(t, e) {
        this.reset();
        var r, i;
        t ? (r = t, i = e, this.canvasContext.canvas.width = r, this.canvasContext.canvas.height = i) : (this.animationItem.wrapper && this.animationItem.container ? (r = this.animationItem.wrapper.offsetWidth, i = this.animationItem.wrapper.offsetHeight) : (r = this.canvasContext.canvas.width, i = this.canvasContext.canvas.height), this.canvasContext.canvas.width = r * this.renderConfig.dpr, this.canvasContext.canvas.height = i * this.renderConfig.dpr);
        var s, n;
        if (this.renderConfig.preserveAspectRatio.indexOf("meet") !== -1 || this.renderConfig.preserveAspectRatio.indexOf("slice") !== -1) {
          var a = this.renderConfig.preserveAspectRatio.split(" "), l = a[1] || "meet", o = a[0] || "xMidYMid", f = o.substr(0, 4), m = o.substr(4);
          s = r / i, n = this.transformCanvas.w / this.transformCanvas.h, n > s && l === "meet" || n < s && l === "slice" ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = r / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr)), f === "xMid" && (n < s && l === "meet" || n > s && l === "slice") ? this.transformCanvas.tx = (r - this.transformCanvas.w * (i / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : f === "xMax" && (n < s && l === "meet" || n > s && l === "slice") ? this.transformCanvas.tx = (r - this.transformCanvas.w * (i / this.transformCanvas.h)) * this.renderConfig.dpr : this.transformCanvas.tx = 0, m === "YMid" && (n > s && l === "meet" || n < s && l === "slice") ? this.transformCanvas.ty = (i - this.transformCanvas.h * (r / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : m === "YMax" && (n > s && l === "meet" || n < s && l === "slice") ? this.transformCanvas.ty = (i - this.transformCanvas.h * (r / this.transformCanvas.w)) * this.renderConfig.dpr : this.transformCanvas.ty = 0;
        } else this.renderConfig.preserveAspectRatio === "none" ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
        this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0);
      }, CanvasRendererBase.prototype.destroy = function() {
        this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = "");
        var t, e = this.layers ? this.layers.length : 0;
        for (t = e - 1; t >= 0; t -= 1)
          this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
        this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
      }, CanvasRendererBase.prototype.renderFrame = function(t, e) {
        if (!(this.renderedFrame === t && this.renderConfig.clearCanvas === !0 && !e || this.destroyed || t === -1)) {
          this.renderedFrame = t, this.globalData.frameNum = t - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || e, this.globalData.projectInterface.currentFrame = t;
          var r, i = this.layers.length;
          for (this.completeLayers || this.checkLayers(t), r = i - 1; r >= 0; r -= 1)
            (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(t - this.layers[r].st);
          if (this.globalData._mdf) {
            for (this.renderConfig.clearCanvas === !0 ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)
              (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
            this.renderConfig.clearCanvas !== !0 && this.restore();
          }
        }
      }, CanvasRendererBase.prototype.buildItem = function(t) {
        var e = this.elements;
        if (!(e[t] || this.layers[t].ty === 99)) {
          var r = this.createItem(this.layers[t], this, this.globalData);
          e[t] = r, r.initExpressions();
        }
      }, CanvasRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          t.checkParenting();
        }
      }, CanvasRendererBase.prototype.hide = function() {
        this.animationItem.container.style.display = "none";
      }, CanvasRendererBase.prototype.show = function() {
        this.animationItem.container.style.display = "block";
      };
      function CanvasContext() {
        this.opacity = -1, this.transform = createTypedArray("float32", 16), this.fillStyle = "", this.strokeStyle = "", this.lineWidth = "", this.lineCap = "", this.lineJoin = "", this.miterLimit = "", this.id = Math.random();
      }
      function CVContextData() {
        this.stack = [], this.cArrPos = 0, this.cTr = new Matrix();
        var t, e = 15;
        for (t = 0; t < e; t += 1) {
          var r = new CanvasContext();
          this.stack[t] = r;
        }
        this._length = e, this.nativeContext = null, this.transformMat = new Matrix(), this.currentOpacity = 1, this.currentFillStyle = "", this.appliedFillStyle = "", this.currentStrokeStyle = "", this.appliedStrokeStyle = "", this.currentLineWidth = "", this.appliedLineWidth = "", this.currentLineCap = "", this.appliedLineCap = "", this.currentLineJoin = "", this.appliedLineJoin = "", this.appliedMiterLimit = "", this.currentMiterLimit = "";
      }
      CVContextData.prototype.duplicate = function() {
        var t = this._length * 2, e = 0;
        for (e = this._length; e < t; e += 1)
          this.stack[e] = new CanvasContext();
        this._length = t;
      }, CVContextData.prototype.reset = function() {
        this.cArrPos = 0, this.cTr.reset(), this.stack[this.cArrPos].opacity = 1;
      }, CVContextData.prototype.restore = function(t) {
        this.cArrPos -= 1;
        var e = this.stack[this.cArrPos], r = e.transform, i, s = this.cTr.props;
        for (i = 0; i < 16; i += 1)
          s[i] = r[i];
        if (t) {
          this.nativeContext.restore();
          var n = this.stack[this.cArrPos + 1];
          this.appliedFillStyle = n.fillStyle, this.appliedStrokeStyle = n.strokeStyle, this.appliedLineWidth = n.lineWidth, this.appliedLineCap = n.lineCap, this.appliedLineJoin = n.lineJoin, this.appliedMiterLimit = n.miterLimit;
        }
        this.nativeContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), (t || e.opacity !== -1 && this.currentOpacity !== e.opacity) && (this.nativeContext.globalAlpha = e.opacity, this.currentOpacity = e.opacity), this.currentFillStyle = e.fillStyle, this.currentStrokeStyle = e.strokeStyle, this.currentLineWidth = e.lineWidth, this.currentLineCap = e.lineCap, this.currentLineJoin = e.lineJoin, this.currentMiterLimit = e.miterLimit;
      }, CVContextData.prototype.save = function(t) {
        t && this.nativeContext.save();
        var e = this.cTr.props;
        this._length <= this.cArrPos && this.duplicate();
        var r = this.stack[this.cArrPos], i;
        for (i = 0; i < 16; i += 1)
          r.transform[i] = e[i];
        this.cArrPos += 1;
        var s = this.stack[this.cArrPos];
        s.opacity = r.opacity, s.fillStyle = r.fillStyle, s.strokeStyle = r.strokeStyle, s.lineWidth = r.lineWidth, s.lineCap = r.lineCap, s.lineJoin = r.lineJoin, s.miterLimit = r.miterLimit;
      }, CVContextData.prototype.setOpacity = function(t) {
        this.stack[this.cArrPos].opacity = t;
      }, CVContextData.prototype.setContext = function(t) {
        this.nativeContext = t;
      }, CVContextData.prototype.fillStyle = function(t) {
        this.stack[this.cArrPos].fillStyle !== t && (this.currentFillStyle = t, this.stack[this.cArrPos].fillStyle = t);
      }, CVContextData.prototype.strokeStyle = function(t) {
        this.stack[this.cArrPos].strokeStyle !== t && (this.currentStrokeStyle = t, this.stack[this.cArrPos].strokeStyle = t);
      }, CVContextData.prototype.lineWidth = function(t) {
        this.stack[this.cArrPos].lineWidth !== t && (this.currentLineWidth = t, this.stack[this.cArrPos].lineWidth = t);
      }, CVContextData.prototype.lineCap = function(t) {
        this.stack[this.cArrPos].lineCap !== t && (this.currentLineCap = t, this.stack[this.cArrPos].lineCap = t);
      }, CVContextData.prototype.lineJoin = function(t) {
        this.stack[this.cArrPos].lineJoin !== t && (this.currentLineJoin = t, this.stack[this.cArrPos].lineJoin = t);
      }, CVContextData.prototype.miterLimit = function(t) {
        this.stack[this.cArrPos].miterLimit !== t && (this.currentMiterLimit = t, this.stack[this.cArrPos].miterLimit = t);
      }, CVContextData.prototype.transform = function(t) {
        this.transformMat.cloneFromProps(t);
        var e = this.cTr;
        this.transformMat.multiply(e), e.cloneFromProps(this.transformMat.props);
        var r = e.props;
        this.nativeContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
      }, CVContextData.prototype.opacity = function(t) {
        var e = this.stack[this.cArrPos].opacity;
        e *= t < 0 ? 0 : t, this.stack[this.cArrPos].opacity !== e && (this.currentOpacity !== t && (this.nativeContext.globalAlpha = t, this.currentOpacity = t), this.stack[this.cArrPos].opacity = e);
      }, CVContextData.prototype.fill = function(t) {
        this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle, this.nativeContext.fillStyle = this.appliedFillStyle), this.nativeContext.fill(t);
      }, CVContextData.prototype.fillRect = function(t, e, r, i) {
        this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle, this.nativeContext.fillStyle = this.appliedFillStyle), this.nativeContext.fillRect(t, e, r, i);
      }, CVContextData.prototype.stroke = function() {
        this.appliedStrokeStyle !== this.currentStrokeStyle && (this.appliedStrokeStyle = this.currentStrokeStyle, this.nativeContext.strokeStyle = this.appliedStrokeStyle), this.appliedLineWidth !== this.currentLineWidth && (this.appliedLineWidth = this.currentLineWidth, this.nativeContext.lineWidth = this.appliedLineWidth), this.appliedLineCap !== this.currentLineCap && (this.appliedLineCap = this.currentLineCap, this.nativeContext.lineCap = this.appliedLineCap), this.appliedLineJoin !== this.currentLineJoin && (this.appliedLineJoin = this.currentLineJoin, this.nativeContext.lineJoin = this.appliedLineJoin), this.appliedMiterLimit !== this.currentMiterLimit && (this.appliedMiterLimit = this.currentMiterLimit, this.nativeContext.miterLimit = this.appliedMiterLimit), this.nativeContext.stroke();
      };
      function CVCompElement(t, e, r) {
        this.completeLayers = !1, this.layers = t.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function() {
        var t = this.canvasContext;
        t.beginPath(), t.moveTo(0, 0), t.lineTo(this.data.w, 0), t.lineTo(this.data.w, this.data.h), t.lineTo(0, this.data.h), t.lineTo(0, 0), t.clip();
        var e, r = this.layers.length;
        for (e = r - 1; e >= 0; e -= 1)
          (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
      }, CVCompElement.prototype.destroy = function() {
        var t, e = this.layers.length;
        for (t = e - 1; t >= 0; t -= 1)
          this.elements[t] && this.elements[t].destroy();
        this.layers = null, this.elements = null;
      }, CVCompElement.prototype.createComp = function(t) {
        return new CVCompElement(t, this.globalData, this);
      };
      function CanvasRenderer(t, e) {
        this.animationItem = t, this.renderConfig = {
          clearCanvas: e && e.clearCanvas !== void 0 ? e.clearCanvas : !0,
          context: e && e.context || null,
          progressiveLoad: e && e.progressiveLoad || !1,
          preserveAspectRatio: e && e.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          contentVisibility: e && e.contentVisibility || "visible",
          className: e && e.className || "",
          id: e && e.id || "",
          runExpressions: !e || e.runExpressions === void 0 || e.runExpressions
        }, this.renderConfig.dpr = e && e.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = e && e.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
          frameNum: -1,
          _mdf: !1,
          renderConfig: this.renderConfig,
          currentGlobalAlpha: -1
        }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1, this.rendererType = "canvas", this.renderConfig.clearCanvas && (this.ctxTransform = this.contextData.transform.bind(this.contextData), this.ctxOpacity = this.contextData.opacity.bind(this.contextData), this.ctxFillStyle = this.contextData.fillStyle.bind(this.contextData), this.ctxStrokeStyle = this.contextData.strokeStyle.bind(this.contextData), this.ctxLineWidth = this.contextData.lineWidth.bind(this.contextData), this.ctxLineCap = this.contextData.lineCap.bind(this.contextData), this.ctxLineJoin = this.contextData.lineJoin.bind(this.contextData), this.ctxMiterLimit = this.contextData.miterLimit.bind(this.contextData), this.ctxFill = this.contextData.fill.bind(this.contextData), this.ctxFillRect = this.contextData.fillRect.bind(this.contextData), this.ctxStroke = this.contextData.stroke.bind(this.contextData), this.save = this.contextData.save.bind(this.contextData));
      }
      extendPrototype([CanvasRendererBase], CanvasRenderer), CanvasRenderer.prototype.createComp = function(t) {
        return new CVCompElement(t, this.globalData, this);
      };
      function HBaseElement() {
      }
      HBaseElement.prototype = {
        checkBlendMode: function() {
        },
        initRendererElement: function() {
          this.baseElement = createTag(this.data.tg || "div"), this.data.hasMask ? (this.svgElement = createNS("svg"), this.layerElement = createNS("g"), this.maskedElement = this.layerElement, this.svgElement.appendChild(this.layerElement), this.baseElement.appendChild(this.svgElement)) : this.layerElement = this.baseElement, styleDiv(this.baseElement);
        },
        createContainerElements: function() {
          this.renderableEffectsManager = new CVEffects(this), this.transformedElement = this.baseElement, this.maskedElement = this.layerElement, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), this.data.bm !== 0 && this.setBlendMode();
        },
        renderElement: function() {
          var e = this.transformedElement ? this.transformedElement.style : {};
          if (this.finalTransform._matMdf) {
            var r = this.finalTransform.mat.toCSS();
            e.transform = r, e.webkitTransform = r;
          }
          this.finalTransform._opMdf && (e.opacity = this.finalTransform.mProp.o.v);
        },
        renderFrame: function() {
          this.data.hd || this.hidden || (this.renderTransform(), this.renderRenderable(), this.renderElement(), this.renderInnerContent(), this._isFirstFrame && (this._isFirstFrame = !1));
        },
        destroy: function() {
          this.layerElement = null, this.transformedElement = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null);
        },
        createRenderableComponents: function() {
          this.maskManager = new MaskElement(this.data, this, this.globalData);
        },
        addEffects: function() {
        },
        setMatte: function() {
        }
      }, HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement, HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy, HBaseElement.prototype.buildElementParenting = BaseRenderer.prototype.buildElementParenting;
      function HSolidElement(t, e, r) {
        this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function() {
        var t;
        this.data.hasMask ? (t = createNS("rect"), t.setAttribute("width", this.data.sw), t.setAttribute("height", this.data.sh), t.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : (t = createTag("div"), t.style.width = this.data.sw + "px", t.style.height = this.data.sh + "px", t.style.backgroundColor = this.data.sc), this.layerElement.appendChild(t);
      };
      function HShapeElement(t, e, r) {
        this.shapes = [], this.shapesData = t.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(t, e, r), this.prevViewData = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        };
      }
      extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function() {
        var t;
        if (this.baseElement.style.fontSize = 0, this.data.hasMask)
          this.layerElement.appendChild(this.shapesContainer), t = this.svgElement;
        else {
          t = createNS("svg");
          var e = this.comp.data ? this.comp.data : this.globalData.compSize;
          t.setAttribute("width", e.w), t.setAttribute("height", e.h), t.appendChild(this.shapesContainer), this.layerElement.appendChild(t);
        }
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = t;
      }, HShapeElement.prototype.getTransformedPoint = function(t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1)
          e = t[r].mProps.v.applyToPointArray(e[0], e[1], 0);
        return e;
      }, HShapeElement.prototype.calculateShapeBoundingBox = function(t, e) {
        var r = t.sh.v, i = t.transformers, s, n = r._length, a, l, o, f;
        if (!(n <= 1)) {
          for (s = 0; s < n - 1; s += 1)
            a = this.getTransformedPoint(i, r.v[s]), l = this.getTransformedPoint(i, r.o[s]), o = this.getTransformedPoint(i, r.i[s + 1]), f = this.getTransformedPoint(i, r.v[s + 1]), this.checkBounds(a, l, o, f, e);
          r.c && (a = this.getTransformedPoint(i, r.v[s]), l = this.getTransformedPoint(i, r.o[s]), o = this.getTransformedPoint(i, r.i[0]), f = this.getTransformedPoint(i, r.v[0]), this.checkBounds(a, l, o, f, e));
        }
      }, HShapeElement.prototype.checkBounds = function(t, e, r, i, s) {
        this.getBoundsOfCurve(t, e, r, i);
        var n = this.shapeBoundingBox;
        s.x = bmMin(n.left, s.x), s.xMax = bmMax(n.right, s.xMax), s.y = bmMin(n.top, s.y), s.yMax = bmMax(n.bottom, s.yMax);
      }, HShapeElement.prototype.shapeBoundingBox = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }, HShapeElement.prototype.tempBoundingBox = {
        x: 0,
        xMax: 0,
        y: 0,
        yMax: 0,
        width: 0,
        height: 0
      }, HShapeElement.prototype.getBoundsOfCurve = function(t, e, r, i) {
        for (var s = [[t[0], i[0]], [t[1], i[1]]], n, a, l, o, f, m, b, h = 0; h < 2; ++h)
          a = 6 * t[h] - 12 * e[h] + 6 * r[h], n = -3 * t[h] + 9 * e[h] - 9 * r[h] + 3 * i[h], l = 3 * e[h] - 3 * t[h], a |= 0, n |= 0, l |= 0, n === 0 && a === 0 || (n === 0 ? (o = -l / a, o > 0 && o < 1 && s[h].push(this.calculateF(o, t, e, r, i, h))) : (f = a * a - 4 * l * n, f >= 0 && (m = (-a + bmSqrt(f)) / (2 * n), m > 0 && m < 1 && s[h].push(this.calculateF(m, t, e, r, i, h)), b = (-a - bmSqrt(f)) / (2 * n), b > 0 && b < 1 && s[h].push(this.calculateF(b, t, e, r, i, h)))));
        this.shapeBoundingBox.left = bmMin.apply(null, s[0]), this.shapeBoundingBox.top = bmMin.apply(null, s[1]), this.shapeBoundingBox.right = bmMax.apply(null, s[0]), this.shapeBoundingBox.bottom = bmMax.apply(null, s[1]);
      }, HShapeElement.prototype.calculateF = function(t, e, r, i, s, n) {
        return bmPow(1 - t, 3) * e[n] + 3 * bmPow(1 - t, 2) * t * r[n] + 3 * (1 - t) * bmPow(t, 2) * i[n] + bmPow(t, 3) * s[n];
      }, HShapeElement.prototype.calculateBoundingBox = function(t, e) {
        var r, i = t.length;
        for (r = 0; r < i; r += 1)
          t[r] && t[r].sh ? this.calculateShapeBoundingBox(t[r], e) : t[r] && t[r].it ? this.calculateBoundingBox(t[r].it, e) : t[r] && t[r].style && t[r].w && this.expandStrokeBoundingBox(t[r].w, e);
      }, HShapeElement.prototype.expandStrokeBoundingBox = function(t, e) {
        var r = 0;
        if (t.keyframes) {
          for (var i = 0; i < t.keyframes.length; i += 1) {
            var s = t.keyframes[i].s;
            s > r && (r = s);
          }
          r *= t.mult;
        } else
          r = t.v * t.mult;
        e.x -= r, e.xMax += r, e.y -= r, e.yMax += r;
      }, HShapeElement.prototype.currentBoxContains = function(t) {
        return this.currentBBox.x <= t.x && this.currentBBox.y <= t.y && this.currentBBox.width + this.currentBBox.x >= t.x + t.width && this.currentBBox.height + this.currentBBox.y >= t.y + t.height;
      }, HShapeElement.prototype.renderInnerContent = function() {
        if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
          var t = this.tempBoundingBox, e = 999999;
          if (t.x = e, t.xMax = -e, t.y = e, t.yMax = -e, this.calculateBoundingBox(this.itemsData, t), t.width = t.xMax < t.x ? 0 : t.xMax - t.x, t.height = t.yMax < t.y ? 0 : t.yMax - t.y, this.currentBoxContains(t))
            return;
          var r = !1;
          if (this.currentBBox.w !== t.width && (this.currentBBox.w = t.width, this.shapeCont.setAttribute("width", t.width), r = !0), this.currentBBox.h !== t.height && (this.currentBBox.h = t.height, this.shapeCont.setAttribute("height", t.height), r = !0), r || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y) {
            this.currentBBox.w = t.width, this.currentBBox.h = t.height, this.currentBBox.x = t.x, this.currentBBox.y = t.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
            var i = this.shapeCont.style, s = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
            i.transform = s, i.webkitTransform = s;
          }
        }
      };
      function HTextElement(t, e, r) {
        this.textSpans = [], this.textPaths = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        }, this.renderType = "svg", this.isMasked = !1, this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function() {
        if (this.isMasked = this.checkMasks(), this.isMasked) {
          this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
          var t = createNS("g");
          this.maskedElement.appendChild(t), this.innerElem = t;
        } else
          this.renderType = "html", this.innerElem = this.layerElement;
        this.checkParenting();
      }, HTextElement.prototype.buildNewText = function() {
        var t = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
        var e = this.innerElem.style, r = t.fc ? this.buildColor(t.fc) : "rgba(0,0,0,0)";
        e.fill = r, e.color = r, t.sc && (e.stroke = this.buildColor(t.sc), e.strokeWidth = t.sw + "px");
        var i = this.globalData.fontManager.getFontByName(t.f);
        if (!this.globalData.fontManager.chars)
          if (e.fontSize = t.finalSize + "px", e.lineHeight = t.finalSize + "px", i.fClass)
            this.innerElem.className = i.fClass;
          else {
            e.fontFamily = i.fFamily;
            var s = t.fWeight, n = t.fStyle;
            e.fontStyle = n, e.fontWeight = s;
          }
        var a, l, o = t.l;
        l = o.length;
        var f, m, b, h = this.mHelper, g, y = "", u = 0;
        for (a = 0; a < l; a += 1) {
          if (this.globalData.fontManager.chars ? (this.textPaths[u] ? f = this.textPaths[u] : (f = createNS("path"), f.setAttribute("stroke-linecap", lineCapEnum[1]), f.setAttribute("stroke-linejoin", lineJoinEnum[2]), f.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[u] ? (m = this.textSpans[u], b = m.children[0]) : (m = createTag("div"), m.style.lineHeight = 0, b = createNS("svg"), b.appendChild(f), styleDiv(m)))) : this.isMasked ? f = this.textPaths[u] ? this.textPaths[u] : createNS("text") : this.textSpans[u] ? (m = this.textSpans[u], f = this.textPaths[u]) : (m = createTag("span"), styleDiv(m), f = createTag("span"), styleDiv(f), m.appendChild(f)), this.globalData.fontManager.chars) {
            var P = this.globalData.fontManager.getCharData(t.finalText[a], i.fStyle, this.globalData.fontManager.getFontByName(t.f).fFamily), c;
            if (P ? c = P.data : c = null, h.reset(), c && c.shapes && c.shapes.length && (g = c.shapes[0].it, h.scale(t.finalSize / 100, t.finalSize / 100), y = this.createPathShape(h, g), f.setAttribute("d", y)), this.isMasked)
              this.innerElem.appendChild(f);
            else {
              if (this.innerElem.appendChild(m), c && c.shapes) {
                document.body.appendChild(b);
                var d = b.getBBox();
                b.setAttribute("width", d.width + 2), b.setAttribute("height", d.height + 2), b.setAttribute("viewBox", d.x - 1 + " " + (d.y - 1) + " " + (d.width + 2) + " " + (d.height + 2));
                var p = b.style, v = "translate(" + (d.x - 1) + "px," + (d.y - 1) + "px)";
                p.transform = v, p.webkitTransform = v, o[a].yOffset = d.y - 1;
              } else
                b.setAttribute("width", 1), b.setAttribute("height", 1);
              m.appendChild(b);
            }
          } else if (f.textContent = o[a].val, f.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked)
            this.innerElem.appendChild(f);
          else {
            this.innerElem.appendChild(m);
            var S = f.style, _ = "translate3d(0," + -t.finalSize / 1.2 + "px,0)";
            S.transform = _, S.webkitTransform = _;
          }
          this.isMasked ? this.textSpans[u] = f : this.textSpans[u] = m, this.textSpans[u].style.display = "block", this.textPaths[u] = f, u += 1;
        }
        for (; u < this.textSpans.length; )
          this.textSpans[u].style.display = "none", u += 1;
      }, HTextElement.prototype.renderInnerContent = function() {
        this.validateText();
        var t;
        if (this.data.singleShape) {
          if (!this._isFirstFrame && !this.lettersChangedFlag)
            return;
          if (this.isMasked && this.finalTransform._matMdf) {
            this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), t = this.svgElement.style;
            var e = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
            t.transform = e, t.webkitTransform = e;
          }
        }
        if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), !(!this.lettersChangedFlag && !this.textAnimator.lettersChangedFlag)) {
          var r, i, s = 0, n = this.textAnimator.renderedLetters, a = this.textProperty.currentData.l;
          i = a.length;
          var l, o, f;
          for (r = 0; r < i; r += 1)
            a[r].n ? s += 1 : (o = this.textSpans[r], f = this.textPaths[r], l = n[s], s += 1, l._mdf.m && (this.isMasked ? o.setAttribute("transform", l.m) : (o.style.webkitTransform = l.m, o.style.transform = l.m)), o.style.opacity = l.o, l.sw && l._mdf.sw && f.setAttribute("stroke-width", l.sw), l.sc && l._mdf.sc && f.setAttribute("stroke", l.sc), l.fc && l._mdf.fc && (f.setAttribute("fill", l.fc), f.style.color = l.fc));
          if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
            var m = this.innerElem.getBBox();
            this.currentBBox.w !== m.width && (this.currentBBox.w = m.width, this.svgElement.setAttribute("width", m.width)), this.currentBBox.h !== m.height && (this.currentBBox.h = m.height, this.svgElement.setAttribute("height", m.height));
            var b = 1;
            if (this.currentBBox.w !== m.width + b * 2 || this.currentBBox.h !== m.height + b * 2 || this.currentBBox.x !== m.x - b || this.currentBBox.y !== m.y - b) {
              this.currentBBox.w = m.width + b * 2, this.currentBBox.h = m.height + b * 2, this.currentBBox.x = m.x - b, this.currentBBox.y = m.y - b, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), t = this.svgElement.style;
              var h = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
              t.transform = h, t.webkitTransform = h;
            }
          }
        }
      };
      function HCameraElement(t, e, r) {
        this.initFrame(), this.initBaseData(t, e, r), this.initHierarchy();
        var i = PropertyFactory.getProp;
        if (this.pe = i(this, t.pe, 0, 0, this), t.ks.p.s ? (this.px = i(this, t.ks.p.x, 1, 0, this), this.py = i(this, t.ks.p.y, 1, 0, this), this.pz = i(this, t.ks.p.z, 1, 0, this)) : this.p = i(this, t.ks.p, 1, 0, this), t.ks.a && (this.a = i(this, t.ks.a, 1, 0, this)), t.ks.or.k.length && t.ks.or.k[0].to) {
          var s, n = t.ks.or.k.length;
          for (s = 0; s < n; s += 1)
            t.ks.or.k[s].to = null, t.ks.or.k[s].ti = null;
        }
        this.or = i(this, t.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, t.ks.rx, 0, degToRads, this), this.ry = i(this, t.ks.ry, 0, degToRads, this), this.rz = i(this, t.ks.rz, 0, degToRads, this), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0, this.finalTransform = {
          mProp: this
        };
      }
      extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function() {
        var t, e = this.comp.threeDElements.length, r, i, s;
        for (t = 0; t < e; t += 1)
          if (r = this.comp.threeDElements[t], r.type === "3d") {
            i = r.perspectiveElem.style, s = r.container.style;
            var n = this.pe.v + "px", a = "0px 0px 0px", l = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
            i.perspective = n, i.webkitPerspective = n, s.transformOrigin = a, s.mozTransformOrigin = a, s.webkitTransformOrigin = a, i.transform = l, i.webkitTransform = l;
          }
      }, HCameraElement.prototype.createElements = function() {
      }, HCameraElement.prototype.hide = function() {
      }, HCameraElement.prototype.renderFrame = function() {
        var t = this._isFirstFrame, e, r;
        if (this.hierarchy)
          for (r = this.hierarchy.length, e = 0; e < r; e += 1)
            t = this.hierarchy[e].finalTransform.mProp._mdf || t;
        if (t || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
          if (this.mat.reset(), this.hierarchy)
            for (r = this.hierarchy.length - 1, e = r; e >= 0; e -= 1) {
              var i = this.hierarchy[e].finalTransform.mProp;
              this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
            }
          if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
            var s;
            this.p ? s = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : s = [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
            var n = Math.sqrt(Math.pow(s[0], 2) + Math.pow(s[1], 2) + Math.pow(s[2], 2)), a = [s[0] / n, s[1] / n, s[2] / n], l = Math.sqrt(a[2] * a[2] + a[0] * a[0]), o = Math.atan2(a[1], l), f = Math.atan2(a[0], -a[2]);
            this.mat.rotateY(f).rotateX(-o);
          }
          this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
          var m = !this._prevMat.equals(this.mat);
          if ((m || this.pe._mdf) && this.comp.threeDElements) {
            r = this.comp.threeDElements.length;
            var b, h, g;
            for (e = 0; e < r; e += 1)
              if (b = this.comp.threeDElements[e], b.type === "3d") {
                if (m) {
                  var y = this.mat.toCSS();
                  g = b.container.style, g.transform = y, g.webkitTransform = y;
                }
                this.pe._mdf && (h = b.perspectiveElem.style, h.perspective = this.pe.v + "px", h.webkitPerspective = this.pe.v + "px");
              }
            this.mat.clone(this._prevMat);
          }
        }
        this._isFirstFrame = !1;
      }, HCameraElement.prototype.prepareFrame = function(t) {
        this.prepareProperties(t, !0);
      }, HCameraElement.prototype.destroy = function() {
      }, HCameraElement.prototype.getBaseElement = function() {
        return null;
      };
      function HImageElement(t, e, r) {
        this.assetData = e.getAssetData(t.refId), this.initElement(t, e, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function() {
        var t = this.globalData.getAssetsPath(this.assetData), e = new Image();
        this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", t), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(e), e.crossOrigin = "anonymous", e.src = t, this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
      };
      function HybridRendererBase(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
          className: e && e.className || "",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          hideOnTransparent: !(e && e.hideOnTransparent === !1),
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "400%",
            height: e && e.filterSize && e.filterSize.height || "400%",
            x: e && e.filterSize && e.filterSize.x || "-100%",
            y: e && e.filterSize && e.filterSize.y || "-100%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
      }
      extendPrototype([BaseRenderer], HybridRendererBase), HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var t = this.pendingElements.pop();
          t.checkParenting();
        }
      }, HybridRendererBase.prototype.appendElementInPos = function(t, e) {
        var r = t.getBaseElement();
        if (r) {
          var i = this.layers[e];
          if (!i.ddd || !this.supports3d)
            if (this.threeDElements)
              this.addTo3dContainer(r, e);
            else {
              for (var s = 0, n, a, l; s < e; )
                this.elements[s] && this.elements[s] !== !0 && this.elements[s].getBaseElement && (a = this.elements[s], l = this.layers[s].ddd ? this.getThreeDContainerByPos(s) : a.getBaseElement(), n = l || n), s += 1;
              n ? (!i.ddd || !this.supports3d) && this.layerElement.insertBefore(r, n) : (!i.ddd || !this.supports3d) && this.layerElement.appendChild(r);
            }
          else
            this.addTo3dContainer(r, e);
        }
      }, HybridRendererBase.prototype.createShape = function(t) {
        return this.supports3d ? new HShapeElement(t, this.globalData, this) : new SVGShapeElement(t, this.globalData, this);
      }, HybridRendererBase.prototype.createText = function(t) {
        return this.supports3d ? new HTextElement(t, this.globalData, this) : new SVGTextLottieElement(t, this.globalData, this);
      }, HybridRendererBase.prototype.createCamera = function(t) {
        return this.camera = new HCameraElement(t, this.globalData, this), this.camera;
      }, HybridRendererBase.prototype.createImage = function(t) {
        return this.supports3d ? new HImageElement(t, this.globalData, this) : new IImageElement(t, this.globalData, this);
      }, HybridRendererBase.prototype.createSolid = function(t) {
        return this.supports3d ? new HSolidElement(t, this.globalData, this) : new ISolidElement(t, this.globalData, this);
      }, HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, HybridRendererBase.prototype.getThreeDContainerByPos = function(t) {
        for (var e = 0, r = this.threeDElements.length; e < r; ) {
          if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t)
            return this.threeDElements[e].perspectiveElem;
          e += 1;
        }
        return null;
      }, HybridRendererBase.prototype.createThreeDContainer = function(t, e) {
        var r = createTag("div"), i, s;
        styleDiv(r);
        var n = createTag("div");
        if (styleDiv(n), e === "3d") {
          i = r.style, i.width = this.globalData.compSize.w + "px", i.height = this.globalData.compSize.h + "px";
          var a = "50% 50%";
          i.webkitTransformOrigin = a, i.mozTransformOrigin = a, i.transformOrigin = a, s = n.style;
          var l = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
          s.transform = l, s.webkitTransform = l;
        }
        r.appendChild(n);
        var o = {
          container: n,
          perspectiveElem: r,
          startPos: t,
          endPos: t,
          type: e
        };
        return this.threeDElements.push(o), o;
      }, HybridRendererBase.prototype.build3dContainers = function() {
        var t, e = this.layers.length, r, i = "";
        for (t = 0; t < e; t += 1)
          this.layers[t].ddd && this.layers[t].ty !== 3 ? (i !== "3d" && (i = "3d", r = this.createThreeDContainer(t, "3d")), r.endPos = Math.max(r.endPos, t)) : (i !== "2d" && (i = "2d", r = this.createThreeDContainer(t, "2d")), r.endPos = Math.max(r.endPos, t));
        for (e = this.threeDElements.length, t = e - 1; t >= 0; t -= 1)
          this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
      }, HybridRendererBase.prototype.addTo3dContainer = function(t, e) {
        for (var r = 0, i = this.threeDElements.length; r < i; ) {
          if (e <= this.threeDElements[r].endPos) {
            for (var s = this.threeDElements[r].startPos, n; s < e; )
              this.elements[s] && this.elements[s].getBaseElement && (n = this.elements[s].getBaseElement()), s += 1;
            n ? this.threeDElements[r].container.insertBefore(t, n) : this.threeDElements[r].container.appendChild(t);
            break;
          }
          r += 1;
        }
      }, HybridRendererBase.prototype.configAnimation = function(t) {
        var e = createTag("div"), r = this.animationItem.wrapper, i = e.style;
        i.width = t.w + "px", i.height = t.h + "px", this.resizerElem = e, styleDiv(e), i.transformStyle = "flat", i.mozTransformStyle = "flat", i.webkitTransformStyle = "flat", this.renderConfig.className && e.setAttribute("class", this.renderConfig.className), r.appendChild(e), i.overflow = "hidden";
        var s = createNS("svg");
        s.setAttribute("width", "1"), s.setAttribute("height", "1"), styleDiv(s), this.resizerElem.appendChild(s);
        var n = createNS("defs");
        s.appendChild(n), this.data = t, this.setupGlobalData(t, s), this.globalData.defs = n, this.layers = t.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
      }, HybridRendererBase.prototype.destroy = function() {
        this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.animationItem.container = null, this.globalData.defs = null;
        var t, e = this.layers ? this.layers.length : 0;
        for (t = 0; t < e; t += 1)
          this.elements[t] && this.elements[t].destroy && this.elements[t].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, HybridRendererBase.prototype.updateContainerSize = function() {
        var t = this.animationItem.wrapper.offsetWidth, e = this.animationItem.wrapper.offsetHeight, r = t / e, i = this.globalData.compSize.w / this.globalData.compSize.h, s, n, a, l;
        i > r ? (s = t / this.globalData.compSize.w, n = t / this.globalData.compSize.w, a = 0, l = (e - this.globalData.compSize.h * (t / this.globalData.compSize.w)) / 2) : (s = e / this.globalData.compSize.h, n = e / this.globalData.compSize.h, a = (t - this.globalData.compSize.w * (e / this.globalData.compSize.h)) / 2, l = 0);
        var o = this.resizerElem.style;
        o.webkitTransform = "matrix3d(" + s + ",0,0,0,0," + n + ",0,0,0,0,1,0," + a + "," + l + ",0,1)", o.transform = o.webkitTransform;
      }, HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRendererBase.prototype.hide = function() {
        this.resizerElem.style.display = "none";
      }, HybridRendererBase.prototype.show = function() {
        this.resizerElem.style.display = "block";
      }, HybridRendererBase.prototype.initItems = function() {
        if (this.buildAllItems(), this.camera)
          this.camera.setup();
        else {
          var t = this.globalData.compSize.w, e = this.globalData.compSize.h, r, i = this.threeDElements.length;
          for (r = 0; r < i; r += 1) {
            var s = this.threeDElements[r].perspectiveElem.style;
            s.webkitPerspective = Math.sqrt(Math.pow(t, 2) + Math.pow(e, 2)) + "px", s.perspective = s.webkitPerspective;
          }
        }
      }, HybridRendererBase.prototype.searchExtraCompositions = function(t) {
        var e, r = t.length, i = createTag("div");
        for (e = 0; e < r; e += 1)
          if (t[e].xt) {
            var s = this.createComp(t[e], i, this.globalData.comp, null);
            s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
          }
      };
      function HCompElement(t, e, r) {
        this.layers = t.layers, this.supports3d = !t.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(t, e, r), this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function() {
        this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement;
      }, HCompElement.prototype.addTo3dContainer = function(t, e) {
        for (var r = 0, i; r < e; )
          this.elements[r] && this.elements[r].getBaseElement && (i = this.elements[r].getBaseElement()), r += 1;
        i ? this.layerElement.insertBefore(t, i) : this.layerElement.appendChild(t);
      }, HCompElement.prototype.createComp = function(t) {
        return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
      };
      function HybridRenderer(t, e) {
        this.animationItem = t, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
          className: e && e.className || "",
          imagePreserveAspectRatio: e && e.imagePreserveAspectRatio || "xMidYMid slice",
          hideOnTransparent: !(e && e.hideOnTransparent === !1),
          filterSize: {
            width: e && e.filterSize && e.filterSize.width || "400%",
            height: e && e.filterSize && e.filterSize.height || "400%",
            x: e && e.filterSize && e.filterSize.x || "-100%",
            y: e && e.filterSize && e.filterSize.y || "-100%"
          },
          runExpressions: !e || e.runExpressions === void 0 || e.runExpressions
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
      }
      extendPrototype([HybridRendererBase], HybridRenderer), HybridRenderer.prototype.createComp = function(t) {
        return this.supports3d ? new HCompElement(t, this.globalData, this) : new SVGCompElement(t, this.globalData, this);
      };
      var CompExpressionInterface = /* @__PURE__ */ function() {
        return function(t) {
          function e(r) {
            for (var i = 0, s = t.layers.length; i < s; ) {
              if (t.layers[i].nm === r || t.layers[i].ind === r)
                return t.elements[i].layerInterface;
              i += 1;
            }
            return null;
          }
          return Object.defineProperty(e, "_name", {
            value: t.data.nm
          }), e.layer = e, e.pixelAspect = 1, e.height = t.data.h || t.globalData.compSize.h, e.width = t.data.w || t.globalData.compSize.w, e.pixelAspect = 1, e.frameDuration = 1 / t.globalData.frameRate, e.displayStartTime = 0, e.numLayers = t.layers.length, e;
        };
      }();
      function _typeof$2(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$2 = function(r) {
          return typeof r;
        } : _typeof$2 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$2(t);
      }
      function seedRandom(t, e) {
        var r = this, i = 256, s = 6, n = 52, a = "random", l = e.pow(i, s), o = e.pow(2, n), f = o * 2, m = i - 1, b;
        function h(p, v, S) {
          var _ = [];
          v = v === !0 ? {
            entropy: !0
          } : v || {};
          var A = P(u(v.entropy ? [p, d(t)] : p === null ? c() : p, 3), _), T = new g(_), w = function() {
            for (var D = T.g(s), I = l, R = 0; D < o; )
              D = (D + R) * i, I *= i, R = T.g(1);
            for (; D >= f; )
              D /= 2, I /= 2, R >>>= 1;
            return (D + R) / I;
          };
          return w.int32 = function() {
            return T.g(4) | 0;
          }, w.quick = function() {
            return T.g(4) / 4294967296;
          }, w.double = w, P(d(T.S), t), (v.pass || S || function(V, D, I, R) {
            return R && (R.S && y(R, T), V.state = function() {
              return y(T, {});
            }), I ? (e[a] = V, D) : V;
          })(w, A, "global" in v ? v.global : this == e, v.state);
        }
        e["seed" + a] = h;
        function g(p) {
          var v, S = p.length, _ = this, A = 0, T = _.i = _.j = 0, w = _.S = [];
          for (S || (p = [S++]); A < i; )
            w[A] = A++;
          for (A = 0; A < i; A++)
            w[A] = w[T = m & T + p[A % S] + (v = w[A])], w[T] = v;
          _.g = function(V) {
            for (var D, I = 0, R = _.i, O = _.j, L = _.S; V--; )
              D = L[R = m & R + 1], I = I * i + L[m & (L[R] = L[O = m & O + D]) + (L[O] = D)];
            return _.i = R, _.j = O, I;
          };
        }
        function y(p, v) {
          return v.i = p.i, v.j = p.j, v.S = p.S.slice(), v;
        }
        function u(p, v) {
          var S = [], _ = _typeof$2(p), A;
          if (v && _ == "object")
            for (A in p)
              try {
                S.push(u(p[A], v - 1));
              } catch {
              }
          return S.length ? S : _ == "string" ? p : p + "\0";
        }
        function P(p, v) {
          for (var S = p + "", _, A = 0; A < S.length; )
            v[m & A] = m & (_ ^= v[m & A] * 19) + S.charCodeAt(A++);
          return d(v);
        }
        function c() {
          try {
            var p = new Uint8Array(i);
            return (r.crypto || r.msCrypto).getRandomValues(p), d(p);
          } catch {
            var v = r.navigator, S = v && v.plugins;
            return [+/* @__PURE__ */ new Date(), r, S, r.screen, d(t)];
          }
        }
        function d(p) {
          return String.fromCharCode.apply(0, p);
        }
        P(e.random(), t);
      }
      function initialize$2(t) {
        seedRandom([], t);
      }
      var propTypes = {
        SHAPE: "shape"
      };
      function _typeof$1(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$1 = function(r) {
          return typeof r;
        } : _typeof$1 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$1(t);
      }
      var ExpressionManager = function() {
        var ob = {}, Math = BMMath, window = null, document = null, XMLHttpRequest = null, fetch = null, frames = null, _lottieGlobal = {};
        initialize$2(BMMath);
        function resetFrame() {
          _lottieGlobal = {};
        }
        function $bm_isInstanceOfArray(t) {
          return t.constructor === Array || t.constructor === Float32Array;
        }
        function isNumerable(t, e) {
          return t === "number" || e instanceof Number || t === "boolean" || t === "string";
        }
        function $bm_neg(t) {
          var e = _typeof$1(t);
          if (e === "number" || t instanceof Number || e === "boolean")
            return -t;
          if ($bm_isInstanceOfArray(t)) {
            var r, i = t.length, s = [];
            for (r = 0; r < i; r += 1)
              s[r] = -t[r];
            return s;
          }
          return t.propType ? t.v : -t;
        }
        var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get, easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get, easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
        function sum(t, e) {
          var r = _typeof$1(t), i = _typeof$1(e);
          if (isNumerable(r, t) && isNumerable(i, e) || r === "string" || i === "string")
            return t + e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
            return t = t.slice(0), t[0] += e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
            return e = e.slice(0), e[0] = t + e[0], e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, n = t.length, a = e.length, l = []; s < n || s < a; )
              (typeof t[s] == "number" || t[s] instanceof Number) && (typeof e[s] == "number" || e[s] instanceof Number) ? l[s] = t[s] + e[s] : l[s] = e[s] === void 0 ? t[s] : t[s] || e[s], s += 1;
            return l;
          }
          return 0;
        }
        var add = sum;
        function sub(t, e) {
          var r = _typeof$1(t), i = _typeof$1(e);
          if (isNumerable(r, t) && isNumerable(i, e))
            return r === "string" && (t = parseInt(t, 10)), i === "string" && (e = parseInt(e, 10)), t - e;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e))
            return t = t.slice(0), t[0] -= e, t;
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e))
            return e = e.slice(0), e[0] = t - e[0], e;
          if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
            for (var s = 0, n = t.length, a = e.length, l = []; s < n || s < a; )
              (typeof t[s] == "number" || t[s] instanceof Number) && (typeof e[s] == "number" || e[s] instanceof Number) ? l[s] = t[s] - e[s] : l[s] = e[s] === void 0 ? t[s] : t[s] || e[s], s += 1;
            return l;
          }
          return 0;
        }
        function mul(t, e) {
          var r = _typeof$1(t), i = _typeof$1(e), s;
          if (isNumerable(r, t) && isNumerable(i, e))
            return t * e;
          var n, a;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) {
            for (a = t.length, s = createTypedArray("float32", a), n = 0; n < a; n += 1)
              s[n] = t[n] * e;
            return s;
          }
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) {
            for (a = e.length, s = createTypedArray("float32", a), n = 0; n < a; n += 1)
              s[n] = t * e[n];
            return s;
          }
          return 0;
        }
        function div(t, e) {
          var r = _typeof$1(t), i = _typeof$1(e), s;
          if (isNumerable(r, t) && isNumerable(i, e))
            return t / e;
          var n, a;
          if ($bm_isInstanceOfArray(t) && isNumerable(i, e)) {
            for (a = t.length, s = createTypedArray("float32", a), n = 0; n < a; n += 1)
              s[n] = t[n] / e;
            return s;
          }
          if (isNumerable(r, t) && $bm_isInstanceOfArray(e)) {
            for (a = e.length, s = createTypedArray("float32", a), n = 0; n < a; n += 1)
              s[n] = t / e[n];
            return s;
          }
          return 0;
        }
        function mod(t, e) {
          return typeof t == "string" && (t = parseInt(t, 10)), typeof e == "string" && (e = parseInt(e, 10)), t % e;
        }
        var $bm_sum = sum, $bm_sub = sub, $bm_mul = mul, $bm_div = div, $bm_mod = mod;
        function clamp(t, e, r) {
          if (e > r) {
            var i = r;
            r = e, e = i;
          }
          return Math.min(Math.max(t, e), r);
        }
        function radiansToDegrees(t) {
          return t / degToRads;
        }
        var radians_to_degrees = radiansToDegrees;
        function degreesToRadians(t) {
          return t * degToRads;
        }
        var degrees_to_radians = radiansToDegrees, helperLengthArray = [0, 0, 0, 0, 0, 0];
        function length(t, e) {
          if (typeof t == "number" || t instanceof Number)
            return e = e || 0, Math.abs(t - e);
          e || (e = helperLengthArray);
          var r, i = Math.min(t.length, e.length), s = 0;
          for (r = 0; r < i; r += 1)
            s += Math.pow(e[r] - t[r], 2);
          return Math.sqrt(s);
        }
        function normalize(t) {
          return div(t, length(t));
        }
        function rgbToHsl(t) {
          var e = t[0], r = t[1], i = t[2], s = Math.max(e, r, i), n = Math.min(e, r, i), a, l, o = (s + n) / 2;
          if (s === n)
            a = 0, l = 0;
          else {
            var f = s - n;
            switch (l = o > 0.5 ? f / (2 - s - n) : f / (s + n), s) {
              case e:
                a = (r - i) / f + (r < i ? 6 : 0);
                break;
              case r:
                a = (i - e) / f + 2;
                break;
              case i:
                a = (e - r) / f + 4;
                break;
            }
            a /= 6;
          }
          return [a, l, o, t[3]];
        }
        function hue2rgb(t, e, r) {
          return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (e - t) * 6 * r : r < 1 / 2 ? e : r < 2 / 3 ? t + (e - t) * (2 / 3 - r) * 6 : t;
        }
        function hslToRgb(t) {
          var e = t[0], r = t[1], i = t[2], s, n, a;
          if (r === 0)
            s = i, a = i, n = i;
          else {
            var l = i < 0.5 ? i * (1 + r) : i + r - i * r, o = 2 * i - l;
            s = hue2rgb(o, l, e + 1 / 3), n = hue2rgb(o, l, e), a = hue2rgb(o, l, e - 1 / 3);
          }
          return [s, n, a, t[3]];
        }
        function linear(t, e, r, i, s) {
          if ((i === void 0 || s === void 0) && (i = e, s = r, e = 0, r = 1), r < e) {
            var n = r;
            r = e, e = n;
          }
          if (t <= e)
            return i;
          if (t >= r)
            return s;
          var a = r === e ? 0 : (t - e) / (r - e);
          if (!i.length)
            return i + (s - i) * a;
          var l, o = i.length, f = createTypedArray("float32", o);
          for (l = 0; l < o; l += 1)
            f[l] = i[l] + (s[l] - i[l]) * a;
          return f;
        }
        function random(t, e) {
          if (e === void 0 && (t === void 0 ? (t = 0, e = 1) : (e = t, t = void 0)), e.length) {
            var r, i = e.length;
            t || (t = createTypedArray("float32", i));
            var s = createTypedArray("float32", i), n = BMMath.random();
            for (r = 0; r < i; r += 1)
              s[r] = t[r] + n * (e[r] - t[r]);
            return s;
          }
          t === void 0 && (t = 0);
          var a = BMMath.random();
          return t + a * (e - t);
        }
        function createPath(t, e, r, i) {
          var s, n = t.length, a = shapePool.newElement();
          a.setPathData(!!i, n);
          var l = [0, 0], o, f;
          for (s = 0; s < n; s += 1)
            o = e && e[s] ? e[s] : l, f = r && r[s] ? r[s] : l, a.setTripleAt(t[s][0], t[s][1], f[0] + t[s][0], f[1] + t[s][1], o[0] + t[s][0], o[1] + t[s][1], s, !0);
          return a;
        }
        function initiateExpression(elem, data, property) {
          function noOp(t) {
            return t;
          }
          if (!elem.globalData.renderConfig.runExpressions)
            return noOp;
          var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val), _needsRandom = val.indexOf("random") !== -1, elemType = elem.data.ty, transform, $bm_transform, content, effect, thisProperty = property;
          thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
            get: function() {
              return thisProperty.v;
            }
          }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate, outPoint = elem.data.op / elem.comp.globalData.frameRate, width = elem.data.sw ? elem.data.sw : 0, height = elem.data.sh ? elem.data.sh : 0, name = elem.data.nm, loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, scoped_bm_rt, expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0], numKeys = property.kf ? data.k.length : 0, active = !this.data || this.data.hd !== !0, wiggle = (function t(e, r) {
            var i, s, n = this.pv.length ? this.pv.length : 1, a = createTypedArray("float32", n);
            e = 5;
            var l = Math.floor(time * e);
            for (i = 0, s = 0; i < l; ) {
              for (s = 0; s < n; s += 1)
                a[s] += -r + r * 2 * BMMath.random();
              i += 1;
            }
            var o = time * e, f = o - Math.floor(o), m = createTypedArray("float32", n);
            if (n > 1) {
              for (s = 0; s < n; s += 1)
                m[s] = this.pv[s] + a[s] + (-r + r * 2 * BMMath.random()) * f;
              return m;
            }
            return this.pv + a[0] + (-r + r * 2 * BMMath.random()) * f;
          }).bind(this);
          thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty));
          function loopInDuration(t, e) {
            return loopIn(t, e, !0);
          }
          function loopOutDuration(t, e) {
            return loopOut(t, e, !0);
          }
          this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
          function lookAt(t, e) {
            var r = [e[0] - t[0], e[1] - t[1], e[2] - t[2]], i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads, s = -Math.atan2(r[1], r[2]) / degToRads;
            return [s, i, 0];
          }
          function easeOut(t, e, r, i, s) {
            return applyEase(easeOutBez, t, e, r, i, s);
          }
          function easeIn(t, e, r, i, s) {
            return applyEase(easeInBez, t, e, r, i, s);
          }
          function ease(t, e, r, i, s) {
            return applyEase(easeInOutBez, t, e, r, i, s);
          }
          function applyEase(t, e, r, i, s, n) {
            s === void 0 ? (s = r, n = i) : e = (e - r) / (i - r), e > 1 ? e = 1 : e < 0 && (e = 0);
            var a = t(e);
            if ($bm_isInstanceOfArray(s)) {
              var l, o = s.length, f = createTypedArray("float32", o);
              for (l = 0; l < o; l += 1)
                f[l] = (n[l] - s[l]) * a + s[l];
              return f;
            }
            return (n - s) * a + s;
          }
          function nearestKey(t) {
            var e, r = data.k.length, i, s;
            if (!data.k.length || typeof data.k[0] == "number")
              i = 0, s = 0;
            else if (i = -1, t *= elem.comp.globalData.frameRate, t < data.k[0].t)
              i = 1, s = data.k[0].t;
            else {
              for (e = 0; e < r - 1; e += 1)
                if (t === data.k[e].t) {
                  i = e + 1, s = data.k[e].t;
                  break;
                } else if (t > data.k[e].t && t < data.k[e + 1].t) {
                  t - data.k[e].t > data.k[e + 1].t - t ? (i = e + 2, s = data.k[e + 1].t) : (i = e + 1, s = data.k[e].t);
                  break;
                }
              i === -1 && (i = e + 1, s = data.k[e].t);
            }
            var n = {};
            return n.index = i, n.time = s / elem.comp.globalData.frameRate, n;
          }
          function key(t) {
            var e, r, i;
            if (!data.k.length || typeof data.k[0] == "number")
              throw new Error("The property has no keyframe at index " + t);
            t -= 1, e = {
              time: data.k[t].t / elem.comp.globalData.frameRate,
              value: []
            };
            var s = Object.prototype.hasOwnProperty.call(data.k[t], "s") ? data.k[t].s : data.k[t - 1].e;
            for (i = s.length, r = 0; r < i; r += 1)
              e[r] = s[r], e.value[r] = s[r];
            return e;
          }
          function framesToTime(t, e) {
            return e || (e = elem.comp.globalData.frameRate), t / e;
          }
          function timeToFrames(t, e) {
            return !t && t !== 0 && (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
          }
          function seedRandom(t) {
            BMMath.seedrandom(randSeed + t);
          }
          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }
          function substring(t, e) {
            return typeof value == "string" ? e === void 0 ? value.substring(t) : value.substring(t, e) : "";
          }
          function substr(t, e) {
            return typeof value == "string" ? e === void 0 ? value.substr(t) : value.substr(t, e) : "";
          }
          function posterizeTime(t) {
            time = t === 0 ? 0 : Math.floor(time * t) / t, value = valueAtTime(time);
          }
          var time, velocity, value, text, textIndex, textTotal, selectorValue, index = elem.data.ind, hasParent = !!(elem.hierarchy && elem.hierarchy.length), parent, randSeed = Math.floor(Math.random() * 1e6), globalData = elem.globalData;
          function executeExpression(t) {
            return value = t, this.frameExpressionId === elem.globalData.frameId && this.propType !== "textSelector" ? value : (this.propType === "textSelector" && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), elemType === 4 && !content && (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), hasParent = !!(elem.hierarchy && elem.hierarchy.length), hasParent && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, _needsRandom && seedRandom(randSeed + time), needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt, scoped_bm_rt);
          }
          return executeExpression.__preventDeadCodeRemoval = [$bm_transform, anchorPoint, time, velocity, inPoint, outPoint, width, height, name, loop_in, loop_out, smooth, toComp, fromCompToSurface, toWorld, fromWorld, mask, position, rotation, scale, thisComp, numKeys, active, wiggle, loopInDuration, loopOutDuration, comp, lookAt, easeOut, easeIn, ease, nearestKey, key, text, textIndex, textTotal, selectorValue, framesToTime, timeToFrames, sourceRectAtTime, substring, substr, posterizeTime, index, globalData], executeExpression;
        }
        return ob.initiateExpression = initiateExpression, ob.__preventDeadCodeRemoval = [window, document, XMLHttpRequest, fetch, frames, $bm_neg, add, $bm_sum, $bm_sub, $bm_mul, $bm_div, $bm_mod, clamp, radians_to_degrees, degreesToRadians, degrees_to_radians, normalize, rgbToHsl, hslToRgb, linear, random, createPath, _lottieGlobal], ob.resetFrame = resetFrame, ob;
      }(), Expressions = function() {
        var t = {};
        t.initExpressions = e, t.resetFrame = ExpressionManager.resetFrame;
        function e(r) {
          var i = 0, s = [];
          function n() {
            i += 1;
          }
          function a() {
            i -= 1, i === 0 && o();
          }
          function l(f) {
            s.indexOf(f) === -1 && s.push(f);
          }
          function o() {
            var f, m = s.length;
            for (f = 0; f < m; f += 1)
              s[f].release();
            s.length = 0;
          }
          r.renderer.compInterface = CompExpressionInterface(r.renderer), r.renderer.globalData.projectInterface.registerComposition(r.renderer), r.renderer.globalData.pushExpression = n, r.renderer.globalData.popExpression = a, r.renderer.globalData.registerExpressionProperty = l;
        }
        return t;
      }(), MaskManagerInterface = function() {
        function t(r, i) {
          this._mask = r, this._data = i;
        }
        Object.defineProperty(t.prototype, "maskPath", {
          get: function() {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          }
        }), Object.defineProperty(t.prototype, "maskOpacity", {
          get: function() {
            return this._mask.op.k && this._mask.op.getValue(), this._mask.op.v * 100;
          }
        });
        var e = function(i) {
          var s = createSizedArray(i.viewData.length), n, a = i.viewData.length;
          for (n = 0; n < a; n += 1)
            s[n] = new t(i.viewData[n], i.masksProperties[n]);
          var l = function(f) {
            for (n = 0; n < a; ) {
              if (i.masksProperties[n].nm === f)
                return s[n];
              n += 1;
            }
            return null;
          };
          return l;
        };
        return e;
      }(), ExpressionPropertyInterface = /* @__PURE__ */ function() {
        var t = {
          pv: 0,
          v: 0,
          mult: 1
        }, e = {
          pv: [0, 0, 0],
          v: [0, 0, 0],
          mult: 1
        };
        function r(a, l, o) {
          Object.defineProperty(a, "velocity", {
            get: function() {
              return l.getVelocityAtTime(l.comp.currentFrame);
            }
          }), a.numKeys = l.keyframes ? l.keyframes.length : 0, a.key = function(f) {
            if (!a.numKeys)
              return 0;
            var m = "";
            "s" in l.keyframes[f - 1] ? m = l.keyframes[f - 1].s : "e" in l.keyframes[f - 2] ? m = l.keyframes[f - 2].e : m = l.keyframes[f - 2].s;
            var b = o === "unidimensional" ? new Number(m) : Object.assign({}, m);
            return b.time = l.keyframes[f - 1].t / l.elem.comp.globalData.frameRate, b.value = o === "unidimensional" ? m[0] : m, b;
          }, a.valueAtTime = l.getValueAtTime, a.speedAtTime = l.getSpeedAtTime, a.velocityAtTime = l.getVelocityAtTime, a.propertyGroup = l.propertyGroup;
        }
        function i(a) {
          (!a || !("pv" in a)) && (a = t);
          var l = 1 / a.mult, o = a.pv * l, f = new Number(o);
          return f.value = o, r(f, a, "unidimensional"), function() {
            return a.k && a.getValue(), o = a.v * l, f.value !== o && (f = new Number(o), f.value = o, r(f, a, "unidimensional")), f;
          };
        }
        function s(a) {
          (!a || !("pv" in a)) && (a = e);
          var l = 1 / a.mult, o = a.data && a.data.l || a.pv.length, f = createTypedArray("float32", o), m = createTypedArray("float32", o);
          return f.value = m, r(f, a, "multidimensional"), function() {
            a.k && a.getValue();
            for (var b = 0; b < o; b += 1)
              m[b] = a.v[b] * l, f[b] = m[b];
            return f;
          };
        }
        function n() {
          return t;
        }
        return function(a) {
          return a ? a.propType === "unidimensional" ? i(a) : s(a) : n;
        };
      }(), TransformExpressionInterface = /* @__PURE__ */ function() {
        return function(t) {
          function e(a) {
            switch (a) {
              case "scale":
              case "Scale":
              case "ADBE Scale":
              case 6:
                return e.scale;
              case "rotation":
              case "Rotation":
              case "ADBE Rotation":
              case "ADBE Rotate Z":
              case 10:
                return e.rotation;
              case "ADBE Rotate X":
                return e.xRotation;
              case "ADBE Rotate Y":
                return e.yRotation;
              case "position":
              case "Position":
              case "ADBE Position":
              case 2:
                return e.position;
              case "ADBE Position_0":
                return e.xPosition;
              case "ADBE Position_1":
                return e.yPosition;
              case "ADBE Position_2":
                return e.zPosition;
              case "anchorPoint":
              case "AnchorPoint":
              case "Anchor Point":
              case "ADBE AnchorPoint":
              case 1:
                return e.anchorPoint;
              case "opacity":
              case "Opacity":
              case 11:
                return e.opacity;
              default:
                return null;
            }
          }
          Object.defineProperty(e, "rotation", {
            get: ExpressionPropertyInterface(t.r || t.rz)
          }), Object.defineProperty(e, "zRotation", {
            get: ExpressionPropertyInterface(t.rz || t.r)
          }), Object.defineProperty(e, "xRotation", {
            get: ExpressionPropertyInterface(t.rx)
          }), Object.defineProperty(e, "yRotation", {
            get: ExpressionPropertyInterface(t.ry)
          }), Object.defineProperty(e, "scale", {
            get: ExpressionPropertyInterface(t.s)
          });
          var r, i, s, n;
          return t.p ? n = ExpressionPropertyInterface(t.p) : (r = ExpressionPropertyInterface(t.px), i = ExpressionPropertyInterface(t.py), t.pz && (s = ExpressionPropertyInterface(t.pz))), Object.defineProperty(e, "position", {
            get: function() {
              return t.p ? n() : [r(), i(), s ? s() : 0];
            }
          }), Object.defineProperty(e, "xPosition", {
            get: ExpressionPropertyInterface(t.px)
          }), Object.defineProperty(e, "yPosition", {
            get: ExpressionPropertyInterface(t.py)
          }), Object.defineProperty(e, "zPosition", {
            get: ExpressionPropertyInterface(t.pz)
          }), Object.defineProperty(e, "anchorPoint", {
            get: ExpressionPropertyInterface(t.a)
          }), Object.defineProperty(e, "opacity", {
            get: ExpressionPropertyInterface(t.o)
          }), Object.defineProperty(e, "skew", {
            get: ExpressionPropertyInterface(t.sk)
          }), Object.defineProperty(e, "skewAxis", {
            get: ExpressionPropertyInterface(t.sa)
          }), Object.defineProperty(e, "orientation", {
            get: ExpressionPropertyInterface(t.or)
          }), e;
        };
      }(), LayerExpressionInterface = /* @__PURE__ */ function() {
        function t(f) {
          var m = new Matrix();
          if (f !== void 0) {
            var b = this._elem.finalTransform.mProp.getValueAtTime(f);
            b.clone(m);
          } else {
            var h = this._elem.finalTransform.mProp;
            h.applyToMatrix(m);
          }
          return m;
        }
        function e(f, m) {
          var b = this.getMatrix(m);
          return b.props[12] = 0, b.props[13] = 0, b.props[14] = 0, this.applyPoint(b, f);
        }
        function r(f, m) {
          var b = this.getMatrix(m);
          return this.applyPoint(b, f);
        }
        function i(f, m) {
          var b = this.getMatrix(m);
          return b.props[12] = 0, b.props[13] = 0, b.props[14] = 0, this.invertPoint(b, f);
        }
        function s(f, m) {
          var b = this.getMatrix(m);
          return this.invertPoint(b, f);
        }
        function n(f, m) {
          if (this._elem.hierarchy && this._elem.hierarchy.length) {
            var b, h = this._elem.hierarchy.length;
            for (b = 0; b < h; b += 1)
              this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(f);
          }
          return f.applyToPointArray(m[0], m[1], m[2] || 0);
        }
        function a(f, m) {
          if (this._elem.hierarchy && this._elem.hierarchy.length) {
            var b, h = this._elem.hierarchy.length;
            for (b = 0; b < h; b += 1)
              this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(f);
          }
          return f.inversePoint(m);
        }
        function l(f) {
          var m = new Matrix();
          if (m.reset(), this._elem.finalTransform.mProp.applyToMatrix(m), this._elem.hierarchy && this._elem.hierarchy.length) {
            var b, h = this._elem.hierarchy.length;
            for (b = 0; b < h; b += 1)
              this._elem.hierarchy[b].finalTransform.mProp.applyToMatrix(m);
            return m.inversePoint(f);
          }
          return m.inversePoint(f);
        }
        function o() {
          return [1, 1, 1, 1];
        }
        return function(f) {
          var m;
          function b(u) {
            g.mask = new MaskManagerInterface(u, f);
          }
          function h(u) {
            g.effect = u;
          }
          function g(u) {
            switch (u) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return g.shapeInterface;
              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return m;
              case 4:
              case "ADBE Effect Parade":
              case "effects":
              case "Effects":
                return g.effect;
              case "ADBE Text Properties":
                return g.textInterface;
              default:
                return null;
            }
          }
          g.getMatrix = t, g.invertPoint = a, g.applyPoint = n, g.toWorld = r, g.toWorldVec = e, g.fromWorld = s, g.fromWorldVec = i, g.toComp = r, g.fromComp = l, g.sampleImage = o, g.sourceRectAtTime = f.sourceRectAtTime.bind(f), g._elem = f, m = TransformExpressionInterface(f.finalTransform.mProp);
          var y = getDescriptor(m, "anchorPoint");
          return Object.defineProperties(g, {
            hasParent: {
              get: function() {
                return f.hierarchy.length;
              }
            },
            parent: {
              get: function() {
                return f.hierarchy[0].layerInterface;
              }
            },
            rotation: getDescriptor(m, "rotation"),
            scale: getDescriptor(m, "scale"),
            position: getDescriptor(m, "position"),
            opacity: getDescriptor(m, "opacity"),
            anchorPoint: y,
            anchor_point: y,
            transform: {
              get: function() {
                return m;
              }
            },
            active: {
              get: function() {
                return f.isInRange;
              }
            }
          }), g.startTime = f.data.st, g.index = f.data.ind, g.source = f.data.refId, g.height = f.data.ty === 0 ? f.data.h : 100, g.width = f.data.ty === 0 ? f.data.w : 100, g.inPoint = f.data.ip / f.comp.globalData.frameRate, g.outPoint = f.data.op / f.comp.globalData.frameRate, g._name = f.data.nm, g.registerMaskInterface = b, g.registerEffectsInterface = h, g;
        };
      }(), propertyGroupFactory = /* @__PURE__ */ function() {
        return function(t, e) {
          return function(r) {
            return r = r === void 0 ? 1 : r, r <= 0 ? t : e(r - 1);
          };
        };
      }(), PropertyInterface = /* @__PURE__ */ function() {
        return function(t, e) {
          var r = {
            _name: t
          };
          function i(s) {
            return s = s === void 0 ? 1 : s, s <= 0 ? r : e(s - 1);
          }
          return i;
        };
      }(), EffectsExpressionInterface = /* @__PURE__ */ function() {
        var t = {
          createEffectsInterface: e
        };
        function e(s, n) {
          if (s.effectsManager) {
            var a = [], l = s.data.ef, o, f = s.effectsManager.effectElements.length;
            for (o = 0; o < f; o += 1)
              a.push(r(l[o], s.effectsManager.effectElements[o], n, s));
            var m = s.data.ef || [], b = function(g) {
              for (o = 0, f = m.length; o < f; ) {
                if (g === m[o].nm || g === m[o].mn || g === m[o].ix)
                  return a[o];
                o += 1;
              }
              return null;
            };
            return Object.defineProperty(b, "numProperties", {
              get: function() {
                return m.length;
              }
            }), b;
          }
          return null;
        }
        function r(s, n, a, l) {
          function o(g) {
            for (var y = s.ef, u = 0, P = y.length; u < P; ) {
              if (g === y[u].nm || g === y[u].mn || g === y[u].ix)
                return y[u].ty === 5 ? m[u] : m[u]();
              u += 1;
            }
            throw new Error();
          }
          var f = propertyGroupFactory(o, a), m = [], b, h = s.ef.length;
          for (b = 0; b < h; b += 1)
            s.ef[b].ty === 5 ? m.push(r(s.ef[b], n.effectElements[b], n.effectElements[b].propertyGroup, l)) : m.push(i(n.effectElements[b], s.ef[b].ty, l, f));
          return s.mn === "ADBE Color Control" && Object.defineProperty(o, "color", {
            get: function() {
              return m[0]();
            }
          }), Object.defineProperties(o, {
            numProperties: {
              get: function() {
                return s.np;
              }
            },
            _name: {
              value: s.nm
            },
            propertyGroup: {
              value: f
            }
          }), o.enabled = s.en !== 0, o.active = o.enabled, o;
        }
        function i(s, n, a, l) {
          var o = ExpressionPropertyInterface(s.p);
          function f() {
            return n === 10 ? a.comp.compInterface(s.p.v) : o();
          }
          return s.p.setGroupProperty && s.p.setGroupProperty(PropertyInterface("", l)), f;
        }
        return t;
      }(), ShapePathInterface = /* @__PURE__ */ function() {
        return function(e, r, i) {
          var s = r.sh;
          function n(l) {
            return l === "Shape" || l === "shape" || l === "Path" || l === "path" || l === "ADBE Vector Shape" || l === 2 ? n.path : null;
          }
          var a = propertyGroupFactory(n, i);
          return s.setGroupProperty(PropertyInterface("Path", a)), Object.defineProperties(n, {
            path: {
              get: function() {
                return s.k && s.getValue(), s;
              }
            },
            shape: {
              get: function() {
                return s.k && s.getValue(), s;
              }
            },
            _name: {
              value: e.nm
            },
            ix: {
              value: e.ix
            },
            propertyIndex: {
              value: e.ix
            },
            mn: {
              value: e.mn
            },
            propertyGroup: {
              value: i
            }
          }), n;
        };
      }(), ShapeExpressionInterface = /* @__PURE__ */ function() {
        function t(y, u, P) {
          var c = [], d, p = y ? y.length : 0;
          for (d = 0; d < p; d += 1)
            y[d].ty === "gr" ? c.push(r(y[d], u[d], P)) : y[d].ty === "fl" ? c.push(i(y[d], u[d], P)) : y[d].ty === "st" ? c.push(a(y[d], u[d], P)) : y[d].ty === "tm" ? c.push(l(y[d], u[d], P)) : y[d].ty === "tr" || (y[d].ty === "el" ? c.push(f(y[d], u[d], P)) : y[d].ty === "sr" ? c.push(m(y[d], u[d], P)) : y[d].ty === "sh" ? c.push(ShapePathInterface(y[d], u[d], P)) : y[d].ty === "rc" ? c.push(b(y[d], u[d], P)) : y[d].ty === "rd" ? c.push(h(y[d], u[d], P)) : y[d].ty === "rp" ? c.push(g(y[d], u[d], P)) : y[d].ty === "gf" ? c.push(s(y[d], u[d], P)) : c.push(n(y[d], u[d])));
          return c;
        }
        function e(y, u, P) {
          var c, d = function(S) {
            for (var _ = 0, A = c.length; _ < A; ) {
              if (c[_]._name === S || c[_].mn === S || c[_].propertyIndex === S || c[_].ix === S || c[_].ind === S)
                return c[_];
              _ += 1;
            }
            return typeof S == "number" ? c[S - 1] : null;
          };
          d.propertyGroup = propertyGroupFactory(d, P), c = t(y.it, u.it, d.propertyGroup), d.numProperties = c.length;
          var p = o(y.it[y.it.length - 1], u.it[u.it.length - 1], d.propertyGroup);
          return d.transform = p, d.propertyIndex = y.cix, d._name = y.nm, d;
        }
        function r(y, u, P) {
          var c = function(S) {
            switch (S) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return c.content;
              // Not necessary for now. Keeping them here in case a new case appears
              // case 'ADBE Vector Transform Group':
              // case 3:
              default:
                return c.transform;
            }
          };
          c.propertyGroup = propertyGroupFactory(c, P);
          var d = e(y, u, c.propertyGroup), p = o(y.it[y.it.length - 1], u.it[u.it.length - 1], c.propertyGroup);
          return c.content = d, c.transform = p, Object.defineProperty(c, "_name", {
            get: function() {
              return y.nm;
            }
          }), c.numProperties = y.np, c.propertyIndex = y.ix, c.nm = y.nm, c.mn = y.mn, c;
        }
        function i(y, u, P) {
          function c(d) {
            return d === "Color" || d === "color" ? c.color : d === "Opacity" || d === "opacity" ? c.opacity : null;
          }
          return Object.defineProperties(c, {
            color: {
              get: ExpressionPropertyInterface(u.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(u.o)
            },
            _name: {
              value: y.nm
            },
            mn: {
              value: y.mn
            }
          }), u.c.setGroupProperty(PropertyInterface("Color", P)), u.o.setGroupProperty(PropertyInterface("Opacity", P)), c;
        }
        function s(y, u, P) {
          function c(d) {
            return d === "Start Point" || d === "start point" ? c.startPoint : d === "End Point" || d === "end point" ? c.endPoint : d === "Opacity" || d === "opacity" ? c.opacity : null;
          }
          return Object.defineProperties(c, {
            startPoint: {
              get: ExpressionPropertyInterface(u.s)
            },
            endPoint: {
              get: ExpressionPropertyInterface(u.e)
            },
            opacity: {
              get: ExpressionPropertyInterface(u.o)
            },
            type: {
              get: function() {
                return "a";
              }
            },
            _name: {
              value: y.nm
            },
            mn: {
              value: y.mn
            }
          }), u.s.setGroupProperty(PropertyInterface("Start Point", P)), u.e.setGroupProperty(PropertyInterface("End Point", P)), u.o.setGroupProperty(PropertyInterface("Opacity", P)), c;
        }
        function n() {
          function y() {
            return null;
          }
          return y;
        }
        function a(y, u, P) {
          var c = propertyGroupFactory(A, P), d = propertyGroupFactory(_, c);
          function p(T) {
            Object.defineProperty(_, y.d[T].nm, {
              get: ExpressionPropertyInterface(u.d.dataProps[T].p)
            });
          }
          var v, S = y.d ? y.d.length : 0, _ = {};
          for (v = 0; v < S; v += 1)
            p(v), u.d.dataProps[v].p.setGroupProperty(d);
          function A(T) {
            return T === "Color" || T === "color" ? A.color : T === "Opacity" || T === "opacity" ? A.opacity : T === "Stroke Width" || T === "stroke width" ? A.strokeWidth : null;
          }
          return Object.defineProperties(A, {
            color: {
              get: ExpressionPropertyInterface(u.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(u.o)
            },
            strokeWidth: {
              get: ExpressionPropertyInterface(u.w)
            },
            dash: {
              get: function() {
                return _;
              }
            },
            _name: {
              value: y.nm
            },
            mn: {
              value: y.mn
            }
          }), u.c.setGroupProperty(PropertyInterface("Color", c)), u.o.setGroupProperty(PropertyInterface("Opacity", c)), u.w.setGroupProperty(PropertyInterface("Stroke Width", c)), A;
        }
        function l(y, u, P) {
          function c(p) {
            return p === y.e.ix || p === "End" || p === "end" ? c.end : p === y.s.ix ? c.start : p === y.o.ix ? c.offset : null;
          }
          var d = propertyGroupFactory(c, P);
          return c.propertyIndex = y.ix, u.s.setGroupProperty(PropertyInterface("Start", d)), u.e.setGroupProperty(PropertyInterface("End", d)), u.o.setGroupProperty(PropertyInterface("Offset", d)), c.propertyIndex = y.ix, c.propertyGroup = P, Object.defineProperties(c, {
            start: {
              get: ExpressionPropertyInterface(u.s)
            },
            end: {
              get: ExpressionPropertyInterface(u.e)
            },
            offset: {
              get: ExpressionPropertyInterface(u.o)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        function o(y, u, P) {
          function c(p) {
            return y.a.ix === p || p === "Anchor Point" ? c.anchorPoint : y.o.ix === p || p === "Opacity" ? c.opacity : y.p.ix === p || p === "Position" ? c.position : y.r.ix === p || p === "Rotation" || p === "ADBE Vector Rotation" ? c.rotation : y.s.ix === p || p === "Scale" ? c.scale : y.sk && y.sk.ix === p || p === "Skew" ? c.skew : y.sa && y.sa.ix === p || p === "Skew Axis" ? c.skewAxis : null;
          }
          var d = propertyGroupFactory(c, P);
          return u.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", d)), u.transform.mProps.p.setGroupProperty(PropertyInterface("Position", d)), u.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", d)), u.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", d)), u.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", d)), u.transform.mProps.sk && (u.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", d)), u.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", d))), u.transform.op.setGroupProperty(PropertyInterface("Opacity", d)), Object.defineProperties(c, {
            opacity: {
              get: ExpressionPropertyInterface(u.transform.mProps.o)
            },
            position: {
              get: ExpressionPropertyInterface(u.transform.mProps.p)
            },
            anchorPoint: {
              get: ExpressionPropertyInterface(u.transform.mProps.a)
            },
            scale: {
              get: ExpressionPropertyInterface(u.transform.mProps.s)
            },
            rotation: {
              get: ExpressionPropertyInterface(u.transform.mProps.r)
            },
            skew: {
              get: ExpressionPropertyInterface(u.transform.mProps.sk)
            },
            skewAxis: {
              get: ExpressionPropertyInterface(u.transform.mProps.sa)
            },
            _name: {
              value: y.nm
            }
          }), c.ty = "tr", c.mn = y.mn, c.propertyGroup = P, c;
        }
        function f(y, u, P) {
          function c(v) {
            return y.p.ix === v ? c.position : y.s.ix === v ? c.size : null;
          }
          var d = propertyGroupFactory(c, P);
          c.propertyIndex = y.ix;
          var p = u.sh.ty === "tm" ? u.sh.prop : u.sh;
          return p.s.setGroupProperty(PropertyInterface("Size", d)), p.p.setGroupProperty(PropertyInterface("Position", d)), Object.defineProperties(c, {
            size: {
              get: ExpressionPropertyInterface(p.s)
            },
            position: {
              get: ExpressionPropertyInterface(p.p)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        function m(y, u, P) {
          function c(v) {
            return y.p.ix === v ? c.position : y.r.ix === v ? c.rotation : y.pt.ix === v ? c.points : y.or.ix === v || v === "ADBE Vector Star Outer Radius" ? c.outerRadius : y.os.ix === v ? c.outerRoundness : y.ir && (y.ir.ix === v || v === "ADBE Vector Star Inner Radius") ? c.innerRadius : y.is && y.is.ix === v ? c.innerRoundness : null;
          }
          var d = propertyGroupFactory(c, P), p = u.sh.ty === "tm" ? u.sh.prop : u.sh;
          return c.propertyIndex = y.ix, p.or.setGroupProperty(PropertyInterface("Outer Radius", d)), p.os.setGroupProperty(PropertyInterface("Outer Roundness", d)), p.pt.setGroupProperty(PropertyInterface("Points", d)), p.p.setGroupProperty(PropertyInterface("Position", d)), p.r.setGroupProperty(PropertyInterface("Rotation", d)), y.ir && (p.ir.setGroupProperty(PropertyInterface("Inner Radius", d)), p.is.setGroupProperty(PropertyInterface("Inner Roundness", d))), Object.defineProperties(c, {
            position: {
              get: ExpressionPropertyInterface(p.p)
            },
            rotation: {
              get: ExpressionPropertyInterface(p.r)
            },
            points: {
              get: ExpressionPropertyInterface(p.pt)
            },
            outerRadius: {
              get: ExpressionPropertyInterface(p.or)
            },
            outerRoundness: {
              get: ExpressionPropertyInterface(p.os)
            },
            innerRadius: {
              get: ExpressionPropertyInterface(p.ir)
            },
            innerRoundness: {
              get: ExpressionPropertyInterface(p.is)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        function b(y, u, P) {
          function c(v) {
            return y.p.ix === v ? c.position : y.r.ix === v ? c.roundness : y.s.ix === v || v === "Size" || v === "ADBE Vector Rect Size" ? c.size : null;
          }
          var d = propertyGroupFactory(c, P), p = u.sh.ty === "tm" ? u.sh.prop : u.sh;
          return c.propertyIndex = y.ix, p.p.setGroupProperty(PropertyInterface("Position", d)), p.s.setGroupProperty(PropertyInterface("Size", d)), p.r.setGroupProperty(PropertyInterface("Rotation", d)), Object.defineProperties(c, {
            position: {
              get: ExpressionPropertyInterface(p.p)
            },
            roundness: {
              get: ExpressionPropertyInterface(p.r)
            },
            size: {
              get: ExpressionPropertyInterface(p.s)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        function h(y, u, P) {
          function c(v) {
            return y.r.ix === v || v === "Round Corners 1" ? c.radius : null;
          }
          var d = propertyGroupFactory(c, P), p = u;
          return c.propertyIndex = y.ix, p.rd.setGroupProperty(PropertyInterface("Radius", d)), Object.defineProperties(c, {
            radius: {
              get: ExpressionPropertyInterface(p.rd)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        function g(y, u, P) {
          function c(v) {
            return y.c.ix === v || v === "Copies" ? c.copies : y.o.ix === v || v === "Offset" ? c.offset : null;
          }
          var d = propertyGroupFactory(c, P), p = u;
          return c.propertyIndex = y.ix, p.c.setGroupProperty(PropertyInterface("Copies", d)), p.o.setGroupProperty(PropertyInterface("Offset", d)), Object.defineProperties(c, {
            copies: {
              get: ExpressionPropertyInterface(p.c)
            },
            offset: {
              get: ExpressionPropertyInterface(p.o)
            },
            _name: {
              value: y.nm
            }
          }), c.mn = y.mn, c;
        }
        return function(y, u, P) {
          var c;
          function d(v) {
            if (typeof v == "number")
              return v = v === void 0 ? 1 : v, v === 0 ? P : c[v - 1];
            for (var S = 0, _ = c.length; S < _; ) {
              if (c[S]._name === v)
                return c[S];
              S += 1;
            }
            return null;
          }
          function p() {
            return P;
          }
          return d.propertyGroup = propertyGroupFactory(d, p), c = t(y, u, d.propertyGroup), d.numProperties = c.length, d._name = "Contents", d;
        };
      }(), TextExpressionInterface = /* @__PURE__ */ function() {
        return function(t) {
          var e;
          function r(i) {
            switch (i) {
              case "ADBE Text Document":
                return r.sourceText;
              default:
                return null;
            }
          }
          return Object.defineProperty(r, "sourceText", {
            get: function() {
              t.textProperty.getValue();
              var s = t.textProperty.currentData.t;
              return (!e || s !== e.value) && (e = new String(s), e.value = s || new String(s), Object.defineProperty(e, "style", {
                get: function() {
                  return {
                    fillColor: t.textProperty.currentData.fc
                  };
                }
              })), e;
            }
          }), r;
        };
      }();
      function _typeof(t) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(r) {
          return typeof r;
        } : _typeof = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof(t);
      }
      var FootageInterface = /* @__PURE__ */ function() {
        var t = function(i) {
          var s = "", n = i.getFootageData();
          function a() {
            return s = "", n = i.getFootageData(), l;
          }
          function l(o) {
            if (n[o])
              return s = o, n = n[o], _typeof(n) === "object" ? l : n;
            var f = o.indexOf(s);
            if (f !== -1) {
              var m = parseInt(o.substr(f + s.length), 10);
              return n = n[m], _typeof(n) === "object" ? l : n;
            }
            return "";
          }
          return a;
        }, e = function(i) {
          function s(n) {
            return n === "Outline" ? s.outlineInterface() : null;
          }
          return s._name = "Outline", s.outlineInterface = t(i), s;
        };
        return function(r) {
          function i(s) {
            return s === "Data" ? i.dataInterface : null;
          }
          return i._name = "Data", i.dataInterface = e(r), i;
        };
      }(), interfaces = {
        layer: LayerExpressionInterface,
        effects: EffectsExpressionInterface,
        comp: CompExpressionInterface,
        shape: ShapeExpressionInterface,
        text: TextExpressionInterface,
        footage: FootageInterface
      };
      function getInterface(t) {
        return interfaces[t] || null;
      }
      var expressionHelpers = /* @__PURE__ */ function() {
        function t(a, l, o) {
          l.x && (o.k = !0, o.x = !0, o.initiateExpression = ExpressionManager.initiateExpression, o.effectsSequence.push(o.initiateExpression(a, l, o).bind(o)));
        }
        function e(a) {
          return a *= this.elem.globalData.frameRate, a -= this.offsetTime, a !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < a ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(a, this._cachingAtTime), this._cachingAtTime.lastFrame = a), this._cachingAtTime.value;
        }
        function r(a) {
          var l = -0.01, o = this.getValueAtTime(a), f = this.getValueAtTime(a + l), m = 0;
          if (o.length) {
            var b;
            for (b = 0; b < o.length; b += 1)
              m += Math.pow(f[b] - o[b], 2);
            m = Math.sqrt(m) * 100;
          } else
            m = 0;
          return m;
        }
        function i(a) {
          if (this.vel !== void 0)
            return this.vel;
          var l = -1e-3, o = this.getValueAtTime(a), f = this.getValueAtTime(a + l), m;
          if (o.length) {
            m = createTypedArray("float32", o.length);
            var b;
            for (b = 0; b < o.length; b += 1)
              m[b] = (f[b] - o[b]) / l;
          } else
            m = (f - o) / l;
          return m;
        }
        function s() {
          return this.pv;
        }
        function n(a) {
          this.propertyGroup = a;
        }
        return {
          searchExpressions: t,
          getSpeedAtTime: r,
          getVelocityAtTime: i,
          getValueAtTime: e,
          getStaticValueAtTime: s,
          setGroupProperty: n
        };
      }();
      function addPropertyDecorator() {
        function t(h, g, y) {
          if (!this.k || !this.keyframes)
            return this.pv;
          h = h ? h.toLowerCase() : "";
          var u = this.comp.renderedFrame, P = this.keyframes, c = P[P.length - 1].t;
          if (u <= c)
            return this.pv;
          var d, p;
          y ? (g ? d = Math.abs(c - this.elem.comp.globalData.frameRate * g) : d = Math.max(0, c - this.elem.data.ip), p = c - d) : ((!g || g > P.length - 1) && (g = P.length - 1), p = P[P.length - 1 - g].t, d = c - p);
          var v, S, _;
          if (h === "pingpong") {
            var A = Math.floor((u - p) / d);
            if (A % 2 !== 0)
              return this.getValueAtTime((d - (u - p) % d + p) / this.comp.globalData.frameRate, 0);
          } else if (h === "offset") {
            var T = this.getValueAtTime(p / this.comp.globalData.frameRate, 0), w = this.getValueAtTime(c / this.comp.globalData.frameRate, 0), V = this.getValueAtTime(((u - p) % d + p) / this.comp.globalData.frameRate, 0), D = Math.floor((u - p) / d);
            if (this.pv.length) {
              for (_ = new Array(T.length), S = _.length, v = 0; v < S; v += 1)
                _[v] = (w[v] - T[v]) * D + V[v];
              return _;
            }
            return (w - T) * D + V;
          } else if (h === "continue") {
            var I = this.getValueAtTime(c / this.comp.globalData.frameRate, 0), R = this.getValueAtTime((c - 1e-3) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (_ = new Array(I.length), S = _.length, v = 0; v < S; v += 1)
                _[v] = I[v] + (I[v] - R[v]) * ((u - c) / this.comp.globalData.frameRate) / 5e-4;
              return _;
            }
            return I + (I - R) * ((u - c) / 1e-3);
          }
          return this.getValueAtTime(((u - p) % d + p) / this.comp.globalData.frameRate, 0);
        }
        function e(h, g, y) {
          if (!this.k)
            return this.pv;
          h = h ? h.toLowerCase() : "";
          var u = this.comp.renderedFrame, P = this.keyframes, c = P[0].t;
          if (u >= c)
            return this.pv;
          var d, p;
          y ? (g ? d = Math.abs(this.elem.comp.globalData.frameRate * g) : d = Math.max(0, this.elem.data.op - c), p = c + d) : ((!g || g > P.length - 1) && (g = P.length - 1), p = P[g].t, d = p - c);
          var v, S, _;
          if (h === "pingpong") {
            var A = Math.floor((c - u) / d);
            if (A % 2 === 0)
              return this.getValueAtTime(((c - u) % d + c) / this.comp.globalData.frameRate, 0);
          } else if (h === "offset") {
            var T = this.getValueAtTime(c / this.comp.globalData.frameRate, 0), w = this.getValueAtTime(p / this.comp.globalData.frameRate, 0), V = this.getValueAtTime((d - (c - u) % d + c) / this.comp.globalData.frameRate, 0), D = Math.floor((c - u) / d) + 1;
            if (this.pv.length) {
              for (_ = new Array(T.length), S = _.length, v = 0; v < S; v += 1)
                _[v] = V[v] - (w[v] - T[v]) * D;
              return _;
            }
            return V - (w - T) * D;
          } else if (h === "continue") {
            var I = this.getValueAtTime(c / this.comp.globalData.frameRate, 0), R = this.getValueAtTime((c + 1e-3) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (_ = new Array(I.length), S = _.length, v = 0; v < S; v += 1)
                _[v] = I[v] + (I[v] - R[v]) * (c - u) / 1e-3;
              return _;
            }
            return I + (I - R) * (c - u) / 1e-3;
          }
          return this.getValueAtTime((d - ((c - u) % d + c)) / this.comp.globalData.frameRate, 0);
        }
        function r(h, g) {
          if (!this.k)
            return this.pv;
          if (h = (h || 0.4) * 0.5, g = Math.floor(g || 5), g <= 1)
            return this.pv;
          var y = this.comp.renderedFrame / this.comp.globalData.frameRate, u = y - h, P = y + h, c = g > 1 ? (P - u) / (g - 1) : 1, d = 0, p = 0, v;
          this.pv.length ? v = createTypedArray("float32", this.pv.length) : v = 0;
          for (var S; d < g; ) {
            if (S = this.getValueAtTime(u + d * c), this.pv.length)
              for (p = 0; p < this.pv.length; p += 1)
                v[p] += S[p];
            else
              v += S;
            d += 1;
          }
          if (this.pv.length)
            for (p = 0; p < this.pv.length; p += 1)
              v[p] /= g;
          else
            v /= g;
          return v;
        }
        function i(h) {
          this._transformCachingAtTime || (this._transformCachingAtTime = {
            v: new Matrix()
          });
          var g = this._transformCachingAtTime.v;
          if (g.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
            var y = this.a.getValueAtTime(h);
            g.translate(-y[0] * this.a.mult, -y[1] * this.a.mult, y[2] * this.a.mult);
          }
          if (this.appliedTransformations < 2) {
            var u = this.s.getValueAtTime(h);
            g.scale(u[0] * this.s.mult, u[1] * this.s.mult, u[2] * this.s.mult);
          }
          if (this.sk && this.appliedTransformations < 3) {
            var P = this.sk.getValueAtTime(h), c = this.sa.getValueAtTime(h);
            g.skewFromAxis(-P * this.sk.mult, c * this.sa.mult);
          }
          if (this.r && this.appliedTransformations < 4) {
            var d = this.r.getValueAtTime(h);
            g.rotate(-d * this.r.mult);
          } else if (!this.r && this.appliedTransformations < 4) {
            var p = this.rz.getValueAtTime(h), v = this.ry.getValueAtTime(h), S = this.rx.getValueAtTime(h), _ = this.or.getValueAtTime(h);
            g.rotateZ(-p * this.rz.mult).rotateY(v * this.ry.mult).rotateX(S * this.rx.mult).rotateZ(-_[2] * this.or.mult).rotateY(_[1] * this.or.mult).rotateX(_[0] * this.or.mult);
          }
          if (this.data.p && this.data.p.s) {
            var A = this.px.getValueAtTime(h), T = this.py.getValueAtTime(h);
            if (this.data.p.z) {
              var w = this.pz.getValueAtTime(h);
              g.translate(A * this.px.mult, T * this.py.mult, -w * this.pz.mult);
            } else
              g.translate(A * this.px.mult, T * this.py.mult, 0);
          } else {
            var V = this.p.getValueAtTime(h);
            g.translate(V[0] * this.p.mult, V[1] * this.p.mult, -V[2] * this.p.mult);
          }
          return g;
        }
        function s() {
          return this.v.clone(new Matrix());
        }
        var n = TransformPropertyFactory.getTransformProperty;
        TransformPropertyFactory.getTransformProperty = function(h, g, y) {
          var u = n(h, g, y);
          return u.dynamicProperties.length ? u.getValueAtTime = i.bind(u) : u.getValueAtTime = s.bind(u), u.setGroupProperty = expressionHelpers.setGroupProperty, u;
        };
        var a = PropertyFactory.getProp;
        PropertyFactory.getProp = function(h, g, y, u, P) {
          var c = a(h, g, y, u, P);
          c.kf ? c.getValueAtTime = expressionHelpers.getValueAtTime.bind(c) : c.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(c), c.setGroupProperty = expressionHelpers.setGroupProperty, c.loopOut = t, c.loopIn = e, c.smooth = r, c.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(c), c.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(c), c.numKeys = g.a === 1 ? g.k.length : 0, c.propertyIndex = g.ix;
          var d = 0;
          return y !== 0 && (d = createTypedArray("float32", g.a === 1 ? g.k[0].s.length : g.k.length)), c._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: d
          }, expressionHelpers.searchExpressions(h, g, c), c.k && P.addDynamicProperty(c), c;
        };
        function l(h) {
          return this._cachingAtTime || (this._cachingAtTime = {
            shapeValue: shapePool.clone(this.pv),
            lastIndex: 0,
            lastTime: initialDefaultFrame
          }), h *= this.elem.globalData.frameRate, h -= this.offsetTime, h !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < h ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = h, this.interpolateShape(h, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
        }
        var o = ShapePropertyFactory.getConstructorFunction(), f = ShapePropertyFactory.getKeyframedConstructorFunction();
        function m() {
        }
        m.prototype = {
          vertices: function(g, y) {
            this.k && this.getValue();
            var u = this.v;
            y !== void 0 && (u = this.getValueAtTime(y, 0));
            var P, c = u._length, d = u[g], p = u.v, v = createSizedArray(c);
            for (P = 0; P < c; P += 1)
              g === "i" || g === "o" ? v[P] = [d[P][0] - p[P][0], d[P][1] - p[P][1]] : v[P] = [d[P][0], d[P][1]];
            return v;
          },
          points: function(g) {
            return this.vertices("v", g);
          },
          inTangents: function(g) {
            return this.vertices("i", g);
          },
          outTangents: function(g) {
            return this.vertices("o", g);
          },
          isClosed: function() {
            return this.v.c;
          },
          pointOnPath: function(g, y) {
            var u = this.v;
            y !== void 0 && (u = this.getValueAtTime(y, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(u));
            for (var P = this._segmentsLength, c = P.lengths, d = P.totalLength * g, p = 0, v = c.length, S = 0, _; p < v; ) {
              if (S + c[p].addedLength > d) {
                var A = p, T = u.c && p === v - 1 ? 0 : p + 1, w = (d - S) / c[p].addedLength;
                _ = bez.getPointInSegment(u.v[A], u.v[T], u.o[A], u.i[T], w, c[p]);
                break;
              } else
                S += c[p].addedLength;
              p += 1;
            }
            return _ || (_ = u.c ? [u.v[0][0], u.v[0][1]] : [u.v[u._length - 1][0], u.v[u._length - 1][1]]), _;
          },
          vectorOnPath: function(g, y, u) {
            g == 1 ? g = this.v.c : g == 0 && (g = 0.999);
            var P = this.pointOnPath(g, y), c = this.pointOnPath(g + 1e-3, y), d = c[0] - P[0], p = c[1] - P[1], v = Math.sqrt(Math.pow(d, 2) + Math.pow(p, 2));
            if (v === 0)
              return [0, 0];
            var S = u === "tangent" ? [d / v, p / v] : [-p / v, d / v];
            return S;
          },
          tangentOnPath: function(g, y) {
            return this.vectorOnPath(g, y, "tangent");
          },
          normalOnPath: function(g, y) {
            return this.vectorOnPath(g, y, "normal");
          },
          setGroupProperty: expressionHelpers.setGroupProperty,
          getValueAtTime: expressionHelpers.getStaticValueAtTime
        }, extendPrototype([m], o), extendPrototype([m], f), f.prototype.getValueAtTime = l, f.prototype.initiateExpression = ExpressionManager.initiateExpression;
        var b = ShapePropertyFactory.getShapeProp;
        ShapePropertyFactory.getShapeProp = function(h, g, y, u, P) {
          var c = b(h, g, y, u, P);
          return c.propertyIndex = g.ix, c.lock = !1, y === 3 ? expressionHelpers.searchExpressions(h, g.pt, c) : y === 4 && expressionHelpers.searchExpressions(h, g.ks, c), c.k && h.addDynamicProperty(c), c;
        };
      }
      function initialize$1() {
        addPropertyDecorator();
      }
      function addDecorator() {
        function t() {
          return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0) : null;
        }
        TextProperty.prototype.getExpressionValue = function(e, r) {
          var i = this.calculateExpression(r);
          if (e.t !== i) {
            var s = {};
            return this.copyData(s, e), s.t = i.toString(), s.__complete = !1, s;
          }
          return e;
        }, TextProperty.prototype.searchProperty = function() {
          var e = this.searchKeyframes(), r = this.searchExpressions();
          return this.kf = e || r, this.kf;
        }, TextProperty.prototype.searchExpressions = t;
      }
      function initialize() {
        addDecorator();
      }
      function SVGComposableEffect() {
      }
      SVGComposableEffect.prototype = {
        createMergeNode: function t(e, r) {
          var i = createNS("feMerge");
          i.setAttribute("result", e);
          var s, n;
          for (n = 0; n < r.length; n += 1)
            s = createNS("feMergeNode"), s.setAttribute("in", r[n]), i.appendChild(s), i.appendChild(s);
          return i;
        }
      };
      var linearFilterValue = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";
      function SVGTintFilter(t, e, r, i, s) {
        this.filterManager = e;
        var n = createNS("feColorMatrix");
        n.setAttribute("type", "matrix"), n.setAttribute("color-interpolation-filters", "linearRGB"), n.setAttribute("values", linearFilterValue + " 1 0"), this.linearFilter = n, n.setAttribute("result", i + "_tint_1"), t.appendChild(n), n = createNS("feColorMatrix"), n.setAttribute("type", "matrix"), n.setAttribute("color-interpolation-filters", "sRGB"), n.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), n.setAttribute("result", i + "_tint_2"), t.appendChild(n), this.matrixFilter = n;
        var a = this.createMergeNode(i, [s, i + "_tint_1", i + "_tint_2"]);
        t.appendChild(a);
      }
      extendPrototype([SVGComposableEffect], SVGTintFilter), SVGTintFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v, r = this.filterManager.effectElements[1].p.v, i = this.filterManager.effectElements[2].p.v / 100;
          this.linearFilter.setAttribute("values", linearFilterValue + " " + i + " 0"), this.matrixFilter.setAttribute("values", r[0] - e[0] + " 0 0 0 " + e[0] + " " + (r[1] - e[1]) + " 0 0 0 " + e[1] + " " + (r[2] - e[2]) + " 0 0 0 " + e[2] + " 0 0 0 1 0");
        }
      };
      function SVGFillFilter(t, e, r, i) {
        this.filterManager = e;
        var s = createNS("feColorMatrix");
        s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), s.setAttribute("result", i), t.appendChild(s), this.matrixFilter = s;
      }
      SVGFillFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[2].p.v, r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute("values", "0 0 0 0 " + e[0] + " 0 0 0 0 " + e[1] + " 0 0 0 0 " + e[2] + " 0 0 0 " + r + " 0");
        }
      };
      function SVGStrokeEffect(t, e, r) {
        this.initialized = !1, this.filterManager = e, this.elem = r, this.paths = [];
      }
      SVGStrokeEffect.prototype.initialize = function() {
        var t = this.elem.layerElement.children || this.elem.layerElement.childNodes, e, r, i, s;
        for (this.filterManager.effectElements[1].p.v === 1 ? (s = this.elem.maskManager.masksProperties.length, i = 0) : (i = this.filterManager.effectElements[0].p.v - 1, s = i + 1), r = createNS("g"), r.setAttribute("fill", "none"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-dashoffset", 1), i; i < s; i += 1)
          e = createNS("path"), r.appendChild(e), this.paths.push({
            p: e,
            m: i
          });
        if (this.filterManager.effectElements[10].p.v === 3) {
          var n = createNS("mask"), a = createElementID();
          n.setAttribute("id", a), n.setAttribute("mask-type", "alpha"), n.appendChild(r), this.elem.globalData.defs.appendChild(n);
          var l = createNS("g");
          for (l.setAttribute("mask", "url(" + getLocationHref() + "#" + a + ")"); t[0]; )
            l.appendChild(t[0]);
          this.elem.layerElement.appendChild(l), this.masker = n, r.setAttribute("stroke", "#fff");
        } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
          if (this.filterManager.effectElements[10].p.v === 2)
            for (t = this.elem.layerElement.children || this.elem.layerElement.childNodes; t.length; )
              this.elem.layerElement.removeChild(t[0]);
          this.elem.layerElement.appendChild(r), this.elem.layerElement.removeAttribute("mask"), r.setAttribute("stroke", "#fff");
        }
        this.initialized = !0, this.pathMasker = r;
      }, SVGStrokeEffect.prototype.renderFrame = function(t) {
        this.initialized || this.initialize();
        var e, r = this.paths.length, i, s;
        for (e = 0; e < r; e += 1)
          if (this.paths[e].m !== -1 && (i = this.elem.maskManager.viewData[this.paths[e].m], s = this.paths[e].p, (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute("d", i.lastPath), t || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
            var n;
            if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
              var a = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, l = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, o = s.getTotalLength();
              n = "0 0 0 " + o * a + " ";
              var f = o * (l - a), m = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01, b = Math.floor(f / m), h;
              for (h = 0; h < b; h += 1)
                n += "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + " ";
              n += "0 " + o * 10 + " 0 0";
            } else
              n = "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
            s.setAttribute("stroke-dasharray", n);
          }
        if ((t || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", this.filterManager.effectElements[4].p.v * 2), (t || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) && (t || this.filterManager.effectElements[3].p._mdf)) {
          var g = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(g[0] * 255) + "," + bmFloor(g[1] * 255) + "," + bmFloor(g[2] * 255) + ")");
        }
      };
      function SVGTritoneFilter(t, e, r, i) {
        this.filterManager = e;
        var s = createNS("feColorMatrix");
        s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "linearRGB"), s.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), t.appendChild(s);
        var n = createNS("feComponentTransfer");
        n.setAttribute("color-interpolation-filters", "sRGB"), n.setAttribute("result", i), this.matrixFilter = n;
        var a = createNS("feFuncR");
        a.setAttribute("type", "table"), n.appendChild(a), this.feFuncR = a;
        var l = createNS("feFuncG");
        l.setAttribute("type", "table"), n.appendChild(l), this.feFuncG = l;
        var o = createNS("feFuncB");
        o.setAttribute("type", "table"), n.appendChild(o), this.feFuncB = o, t.appendChild(n);
      }
      SVGTritoneFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          var e = this.filterManager.effectElements[0].p.v, r = this.filterManager.effectElements[1].p.v, i = this.filterManager.effectElements[2].p.v, s = i[0] + " " + r[0] + " " + e[0], n = i[1] + " " + r[1] + " " + e[1], a = i[2] + " " + r[2] + " " + e[2];
          this.feFuncR.setAttribute("tableValues", s), this.feFuncG.setAttribute("tableValues", n), this.feFuncB.setAttribute("tableValues", a);
        }
      };
      function SVGProLevelsFilter(t, e, r, i) {
        this.filterManager = e;
        var s = this.filterManager.effectElements, n = createNS("feComponentTransfer");
        (s[10].p.k || s[10].p.v !== 0 || s[11].p.k || s[11].p.v !== 1 || s[12].p.k || s[12].p.v !== 1 || s[13].p.k || s[13].p.v !== 0 || s[14].p.k || s[14].p.v !== 1) && (this.feFuncR = this.createFeFunc("feFuncR", n)), (s[17].p.k || s[17].p.v !== 0 || s[18].p.k || s[18].p.v !== 1 || s[19].p.k || s[19].p.v !== 1 || s[20].p.k || s[20].p.v !== 0 || s[21].p.k || s[21].p.v !== 1) && (this.feFuncG = this.createFeFunc("feFuncG", n)), (s[24].p.k || s[24].p.v !== 0 || s[25].p.k || s[25].p.v !== 1 || s[26].p.k || s[26].p.v !== 1 || s[27].p.k || s[27].p.v !== 0 || s[28].p.k || s[28].p.v !== 1) && (this.feFuncB = this.createFeFunc("feFuncB", n)), (s[31].p.k || s[31].p.v !== 0 || s[32].p.k || s[32].p.v !== 1 || s[33].p.k || s[33].p.v !== 1 || s[34].p.k || s[34].p.v !== 0 || s[35].p.k || s[35].p.v !== 1) && (this.feFuncA = this.createFeFunc("feFuncA", n)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (n.setAttribute("color-interpolation-filters", "sRGB"), t.appendChild(n)), (s[3].p.k || s[3].p.v !== 0 || s[4].p.k || s[4].p.v !== 1 || s[5].p.k || s[5].p.v !== 1 || s[6].p.k || s[6].p.v !== 0 || s[7].p.k || s[7].p.v !== 1) && (n = createNS("feComponentTransfer"), n.setAttribute("color-interpolation-filters", "sRGB"), n.setAttribute("result", i), t.appendChild(n), this.feFuncRComposed = this.createFeFunc("feFuncR", n), this.feFuncGComposed = this.createFeFunc("feFuncG", n), this.feFuncBComposed = this.createFeFunc("feFuncB", n));
      }
      SVGProLevelsFilter.prototype.createFeFunc = function(t, e) {
        var r = createNS(t);
        return r.setAttribute("type", "table"), e.appendChild(r), r;
      }, SVGProLevelsFilter.prototype.getTableValue = function(t, e, r, i, s) {
        for (var n = 0, a = 256, l, o = Math.min(t, e), f = Math.max(t, e), m = Array.call(null, {
          length: a
        }), b, h = 0, g = s - i, y = e - t; n <= 256; )
          l = n / 256, l <= o ? b = y < 0 ? s : i : l >= f ? b = y < 0 ? i : s : b = i + g * Math.pow((l - t) / y, 1 / r), m[h] = b, h += 1, n += 256 / (a - 1);
        return m.join(" ");
      }, SVGProLevelsFilter.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          var e, r = this.filterManager.effectElements;
          this.feFuncRComposed && (t || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (e = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", e), this.feFuncGComposed.setAttribute("tableValues", e), this.feFuncBComposed.setAttribute("tableValues", e)), this.feFuncR && (t || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (e = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", e)), this.feFuncG && (t || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (e = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", e)), this.feFuncB && (t || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (e = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", e)), this.feFuncA && (t || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (e = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", e));
        }
      };
      function SVGDropShadowEffect(t, e, r, i, s) {
        var n = e.container.globalData.renderConfig.filterSize, a = e.data.fs || n;
        t.setAttribute("x", a.x || n.x), t.setAttribute("y", a.y || n.y), t.setAttribute("width", a.width || n.width), t.setAttribute("height", a.height || n.height), this.filterManager = e;
        var l = createNS("feGaussianBlur");
        l.setAttribute("in", "SourceAlpha"), l.setAttribute("result", i + "_drop_shadow_1"), l.setAttribute("stdDeviation", "0"), this.feGaussianBlur = l, t.appendChild(l);
        var o = createNS("feOffset");
        o.setAttribute("dx", "25"), o.setAttribute("dy", "0"), o.setAttribute("in", i + "_drop_shadow_1"), o.setAttribute("result", i + "_drop_shadow_2"), this.feOffset = o, t.appendChild(o);
        var f = createNS("feFlood");
        f.setAttribute("flood-color", "#00ff00"), f.setAttribute("flood-opacity", "1"), f.setAttribute("result", i + "_drop_shadow_3"), this.feFlood = f, t.appendChild(f);
        var m = createNS("feComposite");
        m.setAttribute("in", i + "_drop_shadow_3"), m.setAttribute("in2", i + "_drop_shadow_2"), m.setAttribute("operator", "in"), m.setAttribute("result", i + "_drop_shadow_4"), t.appendChild(m);
        var b = this.createMergeNode(i, [i + "_drop_shadow_4", s]);
        t.appendChild(b);
      }
      extendPrototype([SVGComposableEffect], SVGDropShadowEffect), SVGDropShadowEffect.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          if ((t || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), t || this.filterManager.effectElements[0].p._mdf) {
            var e = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(e[0] * 255), Math.round(e[1] * 255), Math.round(e[2] * 255)));
          }
          if ((t || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
            var r = this.filterManager.effectElements[3].p.v, i = (this.filterManager.effectElements[2].p.v - 90) * degToRads, s = r * Math.cos(i), n = r * Math.sin(i);
            this.feOffset.setAttribute("dx", s), this.feOffset.setAttribute("dy", n);
          }
        }
      };
      var _svgMatteSymbols = [];
      function SVGMatte3Effect(t, e, r) {
        this.initialized = !1, this.filterManager = e, this.filterElem = t, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
      }
      SVGMatte3Effect.prototype.findSymbol = function(t) {
        for (var e = 0, r = _svgMatteSymbols.length; e < r; ) {
          if (_svgMatteSymbols[e] === t)
            return _svgMatteSymbols[e];
          e += 1;
        }
        return null;
      }, SVGMatte3Effect.prototype.replaceInParent = function(t, e) {
        var r = t.layerElement.parentNode;
        if (r) {
          for (var i = r.children, s = 0, n = i.length; s < n && i[s] !== t.layerElement; )
            s += 1;
          var a;
          s <= n - 2 && (a = i[s + 1]);
          var l = createNS("use");
          l.setAttribute("href", "#" + e), a ? r.insertBefore(l, a) : r.appendChild(l);
        }
      }, SVGMatte3Effect.prototype.setElementAsMask = function(t, e) {
        if (!this.findSymbol(e)) {
          var r = createElementID(), i = createNS("mask");
          i.setAttribute("id", e.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(e);
          var s = t.globalData.defs;
          s.appendChild(i);
          var n = createNS("symbol");
          n.setAttribute("id", r), this.replaceInParent(e, r), n.appendChild(e.layerElement), s.appendChild(n);
          var a = createNS("use");
          a.setAttribute("href", "#" + r), i.appendChild(a), e.data.hd = !1, e.show();
        }
        t.setMatte(e.layerId);
      }, SVGMatte3Effect.prototype.initialize = function() {
        for (var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, r = 0, i = e.length; r < i; )
          e[r] && e[r].data.ind === t && this.setElementAsMask(this.elem, e[r]), r += 1;
        this.initialized = !0;
      }, SVGMatte3Effect.prototype.renderFrame = function() {
        this.initialized || this.initialize();
      };
      function SVGGaussianBlurEffect(t, e, r, i) {
        t.setAttribute("x", "-100%"), t.setAttribute("y", "-100%"), t.setAttribute("width", "300%"), t.setAttribute("height", "300%"), this.filterManager = e;
        var s = createNS("feGaussianBlur");
        s.setAttribute("result", i), t.appendChild(s), this.feGaussianBlur = s;
      }
      SVGGaussianBlurEffect.prototype.renderFrame = function(t) {
        if (t || this.filterManager._mdf) {
          var e = 0.3, r = this.filterManager.effectElements[0].p.v * e, i = this.filterManager.effectElements[1].p.v, s = i == 3 ? 0 : r, n = i == 2 ? 0 : r;
          this.feGaussianBlur.setAttribute("stdDeviation", s + " " + n);
          var a = this.filterManager.effectElements[2].p.v == 1 ? "wrap" : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      };
      function TransformEffect() {
      }
      TransformEffect.prototype.init = function(t) {
        this.effectsManager = t, this.type = effectTypes.TRANSFORM_EFFECT, this.matrix = new Matrix(), this.opacity = -1, this._mdf = !1, this._opMdf = !1;
      }, TransformEffect.prototype.renderFrame = function(t) {
        if (this._opMdf = !1, this._mdf = !1, t || this.effectsManager._mdf) {
          var e = this.effectsManager.effectElements, r = e[0].p.v, i = e[1].p.v, s = e[2].p.v === 1, n = e[3].p.v, a = s ? n : e[4].p.v, l = e[5].p.v, o = e[6].p.v, f = e[7].p.v;
          this.matrix.reset(), this.matrix.translate(-r[0], -r[1], r[2]), this.matrix.scale(a * 0.01, n * 0.01, 1), this.matrix.rotate(-f * degToRads), this.matrix.skewFromAxis(-l * degToRads, (o + 90) * degToRads), this.matrix.translate(i[0], i[1], 0), this._mdf = !0, this.opacity !== e[8].p.v && (this.opacity = e[8].p.v, this._opMdf = !0);
        }
      };
      function SVGTransformEffect(t, e) {
        this.init(e);
      }
      extendPrototype([TransformEffect], SVGTransformEffect);
      function CVTransformEffect(t) {
        this.init(t);
      }
      return extendPrototype([TransformEffect], CVTransformEffect), registerRenderer("canvas", CanvasRenderer), registerRenderer("html", HybridRenderer), registerRenderer("svg", SVGRenderer), ShapeModifiers.registerModifier("tm", TrimModifier), ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier), ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeModifiers.registerModifier("rd", RoundCornersModifier), ShapeModifiers.registerModifier("zz", ZigZagModifier), ShapeModifiers.registerModifier("op", OffsetPathModifier), setExpressionsPlugin(Expressions), setExpressionInterfaces(getInterface), initialize$1(), initialize(), registerEffect$1(20, SVGTintFilter, !0), registerEffect$1(21, SVGFillFilter, !0), registerEffect$1(22, SVGStrokeEffect, !1), registerEffect$1(23, SVGTritoneFilter, !0), registerEffect$1(24, SVGProLevelsFilter, !0), registerEffect$1(25, SVGDropShadowEffect, !0), registerEffect$1(28, SVGMatte3Effect, !1), registerEffect$1(29, SVGGaussianBlurEffect, !0), registerEffect$1(35, SVGTransformEffect, !1), registerEffect(35, CVTransformEffect), lottie;
    });
  }(lottie$1, lottie$1.exports)), lottie$1.exports;
}
var lottieExports = requireLottie();
const LottiePlayer = /* @__PURE__ */ getDefaultExportFromCjs(lottieExports), Animation = ({
  animationData: t,
  path: e,
  options: r,
  width: i,
  height: s,
  className: n,
  ...a
}) => {
  const l = useRef(null);
  return useEffect(() => {
    if (!l.current)
      return;
    const o = LottiePlayer.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: t,
      path: e,
      container: l.current,
      ...r || {}
    });
    return () => {
      o.destroy();
    };
  }, []), /* @__PURE__ */ jsx("div", { className: n, ref: l, style: { width: i, height: s } });
}, AlertContext = React__default.createContext(void 0);
var Icon = /* @__PURE__ */ ((t) => (t[t.success = 0] = "success", t[t.denied = 1] = "denied", t[t.warning = 2] = "warning", t[t.info = 3] = "info", t[t.confirm = 4] = "confirm", t))(Icon || {});
function UseAlert() {
  const t = React__default.useContext(AlertContext);
  if (t === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return t;
}
function AlertProvider(t) {
  var m;
  const [e, r] = useState(), i = useRef(0), s = useRef(void 0), [n, a] = useState(null);
  useEffect(() => {
    i.current += 1;
  }, [e]);
  const l = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), o = (b) => {
    var y, u;
    let h = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...b || {}
    };
    const g = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(g, h.icon)) {
      const P = g[h.icon], c = Object.keys(l).filter((d) => d.endsWith(P)).pop();
      c && l[c]().then((d) => {
        a(d.default);
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
    }), (y = s.current) != null && y.isOpen() ? (u = s.current) == null || u.close().finally(() => {
      r(h);
    }) : r(h);
  }, f = (b) => {
    var g;
    const h = {
      [b]: !0,
      isConfirmed: b === "confirm",
      isCancelled: b === "cancel",
      isDenied: b === "deny"
    };
    e != null && e.onResult && e.onResult(h), (g = s.current) == null || g.close().then(() => {
      a(null), r(void 0);
    });
  };
  return /* @__PURE__ */ jsxs(AlertContext.Provider, { value: { open: o }, children: [
    t.children,
    e && /* @__PURE__ */ jsxs(Modal, { size: e.size, className: "modal-alert", animation: e.animation, open: !0, ref: s, children: [
      /* @__PURE__ */ jsx(TemplateExtend, { name: "header" }),
      /* @__PURE__ */ jsx(TemplateExtend, { name: "footer" }),
      /* @__PURE__ */ jsx(TemplateExtend, { name: "content", children: /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column align-items-center", children: [
        n !== null && /* @__PURE__ */ jsx(Animation, { className: "modal-alert-icon", animationData: n }),
        /* @__PURE__ */ jsx("h3", { className: "modal-alert-title", children: e.title }),
        !!((m = e.text) != null && m.length) && /* @__PURE__ */ jsx("p", { className: "modal-alert-text", children: e.text }),
        e.actions && /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(e.actions).map((b) => {
          var h, g, y;
          return /* @__PURE__ */ jsx(
            Button,
            {
              className: "btn btn-lg mx-2 " + (((h = e.actions) == null ? void 0 : h[b].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => f(b),
              children: ((y = ((g = e.actions) == null ? void 0 : g[b]) ?? null) == null ? void 0 : y.label) || b
            },
            b
          );
        }) })
      ] }) })
    ] })
  ] });
}
const DefaultModifyTemplate = ({ action: t, children: e, routeParams: r, results: i }) => {
  const { getAction: s } = UseActions(), n = s(t.entity, "list", t.namespace);
  return /* @__PURE__ */ jsxs("section", { className: "edit", children: [
    /* @__PURE__ */ jsxs("header", { children: [
      /* @__PURE__ */ jsxs("h2", { className: "title", children: [
        n && /* @__PURE__ */ jsx(Link$1, { to: generateRoute(n.route, r), children: "←" }),
        /* @__PURE__ */ jsx(TemplateBlock, { name: "title", content: e, data: i })
      ] }),
      /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx(TemplateBlock, { name: "navigation", content: e, data: i }) })
    ] }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(TemplateBlock, { name: "content", content: e, data: i }) })
  ] });
}, Modify = ({ action: t, children: e, onSuccess: r, modal: i, props: s }) => {
  const n = { ...t.parameters || {}, ...useParams() }, a = useRef(void 0), l = useRef(void 0), { results: o, setParameters: f } = GetData({
    entityAction: t.action,
    initParameters: n
  }), { open: m } = UseAlert();
  return useEffect(() => {
    f(n);
  }, [JSON.stringify(n)]), useEffect(() => {
    var h;
    (h = l.current) == null || h.open();
  }, [JSON.stringify(o)]), /* @__PURE__ */ jsxs(i ? Modal : DefaultModifyTemplate, { ref: l, ...s, action: t, routeParams: n, children: [
    /* @__PURE__ */ jsx(TemplateExtend, { name: "title", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "title", content: e, data: o, children: (o == null ? void 0 : o.title) || "Title" }) }),
    /* @__PURE__ */ jsx(TemplateExtend, { name: "navigation", children: /* @__PURE__ */ jsx(DynamicView, { namespace: t.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ jsxs(TemplateBlock, { name: "navigation", content: e, data: o, children: [
      "original ",
      t.action.namespace
    ] }) }) }),
    /* @__PURE__ */ jsx(TemplateExtend, { name: "content", children: /* @__PURE__ */ jsx(DynamicView, { namespace: t.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "content", content: e, data: o, children: /* @__PURE__ */ jsx(
      ModifyForm,
      {
        ref: a,
        data: o,
        action: t.action,
        onSuccess: (h) => {
          var y, u;
          (y = l.current) == null || y.close();
          const g = new CustomEvent("success", { detail: h });
          r && r(g, h), !g.defaultPrevented && m({
            title: "Success",
            text: Object.values(((u = h.messages) == null ? void 0 : u.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: Icon.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (h) => {
          m({
            title: h.status + " " + h.detail,
            text: h.detail,
            icon: Icon.denied,
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
        embedded: i,
        parameters: n,
        children: i && /* @__PURE__ */ jsx(TemplateExtend, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ jsx(TemplateExtend, { name: "actions", children: /* @__PURE__ */ jsx(TemplateBlock, { name: "actions", content: e, data: o, children: /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "btn btn-primary",
        onClick: () => {
          var h, g;
          return (g = (h = a.current) == null ? void 0 : h.getFormRef()) == null ? void 0 : g.submit();
        },
        children: "Submit"
      }
    ) }) })
  ] });
}, EmptyView = () => /* @__PURE__ */ jsx("div", { children: "No View Found" }), Link = ({ to: t, children: e, ...r }) => /* @__PURE__ */ jsx(Link$1, { to: t, ...r, children: /* @__PURE__ */ jsx(BaseButton, { ...r, children: e && e }) }), elementMap = /* @__PURE__ */ new Map(), Data = {
  set(t, e, r) {
    elementMap.has(t) || elementMap.set(t, /* @__PURE__ */ new Map());
    const i = elementMap.get(t);
    if (!i.has(e) && i.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`);
      return;
    }
    i.set(e, r);
  },
  get(t, e) {
    return elementMap.has(t) && elementMap.get(t).get(e) || null;
  },
  remove(t, e) {
    if (!elementMap.has(t))
      return;
    const r = elementMap.get(t);
    r.delete(e), r.size === 0 && elementMap.delete(t);
  }
}, MILLISECONDS_MULTIPLIER = 1e3, TRANSITION_END = "transitionend", parseSelector = (t) => (t && window.CSS && window.CSS.escape && (t = t.replace(/#([^\s"#']+)/g, (e, r) => `#${CSS.escape(r)}`)), t), toType = (t) => t == null ? `${t}` : Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase(), getTransitionDurationFromElement = (t) => {
  if (!t)
    return 0;
  let { transitionDuration: e, transitionDelay: r } = window.getComputedStyle(t);
  const i = Number.parseFloat(e), s = Number.parseFloat(r);
  return !i && !s ? 0 : (e = e.split(",")[0], r = r.split(",")[0], (Number.parseFloat(e) + Number.parseFloat(r)) * MILLISECONDS_MULTIPLIER);
}, triggerTransitionEnd = (t) => {
  t.dispatchEvent(new Event(TRANSITION_END));
}, isElement = (t) => !t || typeof t != "object" ? !1 : (typeof t.jquery < "u" && (t = t[0]), typeof t.nodeType < "u"), getElement = (t) => isElement(t) ? t.jquery ? t[0] : t : typeof t == "string" && t.length > 0 ? document.querySelector(parseSelector(t)) : null, isVisible = (t) => {
  if (!isElement(t) || t.getClientRects().length === 0)
    return !1;
  const e = getComputedStyle(t).getPropertyValue("visibility") === "visible", r = t.closest("details:not([open])");
  if (!r)
    return e;
  if (r !== t) {
    const i = t.closest("summary");
    if (i && i.parentNode !== r || i === null)
      return !1;
  }
  return e;
}, isDisabled = (t) => !t || t.nodeType !== Node.ELEMENT_NODE || t.classList.contains("disabled") ? !0 : typeof t.disabled < "u" ? t.disabled : t.hasAttribute("disabled") && t.getAttribute("disabled") !== "false", noop = () => {
}, getjQuery = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, DOMContentLoadedCallbacks = [], onDOMContentLoaded = (t) => {
  document.readyState === "loading" ? (DOMContentLoadedCallbacks.length || document.addEventListener("DOMContentLoaded", () => {
    for (const e of DOMContentLoadedCallbacks)
      e();
  }), DOMContentLoadedCallbacks.push(t)) : t();
}, isRTL = () => document.documentElement.dir === "rtl", defineJQueryPlugin = (t) => {
  onDOMContentLoaded(() => {
    const e = getjQuery();
    if (e) {
      const r = t.NAME, i = e.fn[r];
      e.fn[r] = t.jQueryInterface, e.fn[r].Constructor = t, e.fn[r].noConflict = () => (e.fn[r] = i, t.jQueryInterface);
    }
  });
}, execute = (t, e = [], r = t) => typeof t == "function" ? t(...e) : r, executeAfterTransition = (t, e, r = !0) => {
  if (!r) {
    execute(t);
    return;
  }
  const s = getTransitionDurationFromElement(e) + 5;
  let n = !1;
  const a = ({ target: l }) => {
    l === e && (n = !0, e.removeEventListener(TRANSITION_END, a), execute(t));
  };
  e.addEventListener(TRANSITION_END, a), setTimeout(() => {
    n || triggerTransitionEnd(e);
  }, s);
}, getNextActiveElement = (t, e, r, i) => {
  const s = t.length;
  let n = t.indexOf(e);
  return n === -1 ? !r && i ? t[s - 1] : t[0] : (n += r ? 1 : -1, i && (n = (n + s) % s), t[Math.max(0, Math.min(n, s - 1))]);
}, namespaceRegex = /[^.]*(?=\..*)\.|.*/, stripNameRegex = /\..*/, stripUidRegex = /::\d+$/, eventRegistry = {};
let uidEvent = 1;
const customEvents = {
  mouseenter: "mouseover",
  mouseleave: "mouseout"
}, nativeEvents = /* @__PURE__ */ new Set([
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
function makeEventUid(t, e) {
  return e && `${e}::${uidEvent++}` || t.uidEvent || uidEvent++;
}
function getElementEvents(t) {
  const e = makeEventUid(t);
  return t.uidEvent = e, eventRegistry[e] = eventRegistry[e] || {}, eventRegistry[e];
}
function bootstrapHandler(t, e) {
  return function r(i) {
    return hydrateObj(i, { delegateTarget: t }), r.oneOff && EventHandler.off(t, i.type, e), e.apply(t, [i]);
  };
}
function bootstrapDelegationHandler(t, e, r) {
  return function i(s) {
    const n = t.querySelectorAll(e);
    for (let { target: a } = s; a && a !== this; a = a.parentNode)
      for (const l of n)
        if (l === a)
          return hydrateObj(s, { delegateTarget: a }), i.oneOff && EventHandler.off(t, s.type, e, r), r.apply(a, [s]);
  };
}
function findHandler(t, e, r = null) {
  return Object.values(t).find((i) => i.callable === e && i.delegationSelector === r);
}
function normalizeParameters(t, e, r) {
  const i = typeof e == "string", s = i ? r : e || r;
  let n = getTypeEvent(t);
  return nativeEvents.has(n) || (n = t), [i, s, n];
}
function addHandler(t, e, r, i, s) {
  if (typeof e != "string" || !t)
    return;
  let [n, a, l] = normalizeParameters(e, r, i);
  e in customEvents && (a = ((y) => function(u) {
    if (!u.relatedTarget || u.relatedTarget !== u.delegateTarget && !u.delegateTarget.contains(u.relatedTarget))
      return y.call(this, u);
  })(a));
  const o = getElementEvents(t), f = o[l] || (o[l] = {}), m = findHandler(f, a, n ? r : null);
  if (m) {
    m.oneOff = m.oneOff && s;
    return;
  }
  const b = makeEventUid(a, e.replace(namespaceRegex, "")), h = n ? bootstrapDelegationHandler(t, r, a) : bootstrapHandler(t, a);
  h.delegationSelector = n ? r : null, h.callable = a, h.oneOff = s, h.uidEvent = b, f[b] = h, t.addEventListener(l, h, n);
}
function removeHandler(t, e, r, i, s) {
  const n = findHandler(e[r], i, s);
  n && (t.removeEventListener(r, n, !!s), delete e[r][n.uidEvent]);
}
function removeNamespacedHandlers(t, e, r, i) {
  const s = e[r] || {};
  for (const [n, a] of Object.entries(s))
    n.includes(i) && removeHandler(t, e, r, a.callable, a.delegationSelector);
}
function getTypeEvent(t) {
  return t = t.replace(stripNameRegex, ""), customEvents[t] || t;
}
const EventHandler = {
  on(t, e, r, i) {
    addHandler(t, e, r, i, !1);
  },
  one(t, e, r, i) {
    addHandler(t, e, r, i, !0);
  },
  off(t, e, r, i) {
    if (typeof e != "string" || !t)
      return;
    const [s, n, a] = normalizeParameters(e, r, i), l = a !== e, o = getElementEvents(t), f = o[a] || {}, m = e.startsWith(".");
    if (typeof n < "u") {
      if (!Object.keys(f).length)
        return;
      removeHandler(t, o, a, n, s ? r : null);
      return;
    }
    if (m)
      for (const b of Object.keys(o))
        removeNamespacedHandlers(t, o, b, e.slice(1));
    for (const [b, h] of Object.entries(f)) {
      const g = b.replace(stripUidRegex, "");
      (!l || e.includes(g)) && removeHandler(t, o, a, h.callable, h.delegationSelector);
    }
  },
  trigger(t, e, r) {
    if (typeof e != "string" || !t)
      return null;
    const i = getjQuery(), s = getTypeEvent(e), n = e !== s;
    let a = null, l = !0, o = !0, f = !1;
    n && i && (a = i.Event(e, r), i(t).trigger(a), l = !a.isPropagationStopped(), o = !a.isImmediatePropagationStopped(), f = a.isDefaultPrevented());
    const m = hydrateObj(new Event(e, { bubbles: l, cancelable: !0 }), r);
    return f && m.preventDefault(), o && t.dispatchEvent(m), m.defaultPrevented && a && a.preventDefault(), m;
  }
};
function hydrateObj(t, e = {}) {
  for (const [r, i] of Object.entries(e))
    try {
      t[r] = i;
    } catch {
      Object.defineProperty(t, r, {
        configurable: !0,
        get() {
          return i;
        }
      });
    }
  return t;
}
function normalizeData(t) {
  if (t === "true")
    return !0;
  if (t === "false")
    return !1;
  if (t === Number(t).toString())
    return Number(t);
  if (t === "" || t === "null")
    return null;
  if (typeof t != "string")
    return t;
  try {
    return JSON.parse(decodeURIComponent(t));
  } catch {
    return t;
  }
}
function normalizeDataKey(t) {
  return t.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(t, e, r) {
    t.setAttribute(`data-bs-${normalizeDataKey(e)}`, r);
  },
  removeDataAttribute(t, e) {
    t.removeAttribute(`data-bs-${normalizeDataKey(e)}`);
  },
  getDataAttributes(t) {
    if (!t)
      return {};
    const e = {}, r = Object.keys(t.dataset).filter((i) => i.startsWith("bs") && !i.startsWith("bsConfig"));
    for (const i of r) {
      let s = i.replace(/^bs/, "");
      s = s.charAt(0).toLowerCase() + s.slice(1, s.length), e[s] = normalizeData(t.dataset[i]);
    }
    return e;
  },
  getDataAttribute(t, e) {
    return normalizeData(t.getAttribute(`data-bs-${normalizeDataKey(e)}`));
  }
};
class Config {
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
  _getConfig(e) {
    return e = this._mergeConfigObj(e), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  _configAfterMerge(e) {
    return e;
  }
  _mergeConfigObj(e, r) {
    const i = isElement(r) ? Manipulator.getDataAttribute(r, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof i == "object" ? i : {},
      ...isElement(r) ? Manipulator.getDataAttributes(r) : {},
      ...typeof e == "object" ? e : {}
    };
  }
  _typeCheckConfig(e, r = this.constructor.DefaultType) {
    for (const [i, s] of Object.entries(r)) {
      const n = e[i], a = isElement(n) ? "element" : toType(n);
      if (!new RegExp(s).test(a))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${a}" but expected type "${s}".`
        );
    }
  }
}
const VERSION = "5.3.3";
class BaseComponent extends Config {
  constructor(e, r) {
    super(), e = getElement(e), e && (this._element = e, this._config = this._getConfig(r), Data.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY), EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const e of Object.getOwnPropertyNames(this))
      this[e] = null;
  }
  _queueCallback(e, r, i = !0) {
    executeAfterTransition(e, r, i);
  }
  _getConfig(e) {
    return e = this._mergeConfigObj(e, this._element), e = this._configAfterMerge(e), this._typeCheckConfig(e), e;
  }
  // Static
  static getInstance(e) {
    return Data.get(getElement(e), this.DATA_KEY);
  }
  static getOrCreateInstance(e, r = {}) {
    return this.getInstance(e) || new this(e, typeof r == "object" ? r : null);
  }
  static get VERSION() {
    return VERSION;
  }
  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }
  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }
  static eventName(e) {
    return `${e}${this.EVENT_KEY}`;
  }
}
const getSelector = (t) => {
  let e = t.getAttribute("data-bs-target");
  if (!e || e === "#") {
    let r = t.getAttribute("href");
    if (!r || !r.includes("#") && !r.startsWith("."))
      return null;
    r.includes("#") && !r.startsWith("#") && (r = `#${r.split("#")[1]}`), e = r && r !== "#" ? r.trim() : null;
  }
  return e ? e.split(",").map((r) => parseSelector(r)).join(",") : null;
}, SelectorEngine = {
  find(t, e = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(e, t));
  },
  findOne(t, e = document.documentElement) {
    return Element.prototype.querySelector.call(e, t);
  },
  children(t, e) {
    return [].concat(...t.children).filter((r) => r.matches(e));
  },
  parents(t, e) {
    const r = [];
    let i = t.parentNode.closest(e);
    for (; i; )
      r.push(i), i = i.parentNode.closest(e);
    return r;
  },
  prev(t, e) {
    let r = t.previousElementSibling;
    for (; r; ) {
      if (r.matches(e))
        return [r];
      r = r.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(t, e) {
    let r = t.nextElementSibling;
    for (; r; ) {
      if (r.matches(e))
        return [r];
      r = r.nextElementSibling;
    }
    return [];
  },
  focusableChildren(t) {
    const e = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "details",
      "[tabindex]",
      '[contenteditable="true"]'
    ].map((r) => `${r}:not([tabindex^="-"])`).join(",");
    return this.find(e, t).filter((r) => !isDisabled(r) && isVisible(r));
  },
  getSelectorFromElement(t) {
    const e = getSelector(t);
    return e && SelectorEngine.findOne(e) ? e : null;
  },
  getElementFromSelector(t) {
    const e = getSelector(t);
    return e ? SelectorEngine.findOne(e) : null;
  },
  getMultipleElementsFromSelector(t) {
    const e = getSelector(t);
    return e ? SelectorEngine.find(e) : [];
  }
}, NAME = "dropdown", DATA_KEY = "bs.dropdown", EVENT_KEY = `.${DATA_KEY}`, DATA_API_KEY = ".data-api", ESCAPE_KEY = "Escape", TAB_KEY = "Tab", ARROW_UP_KEY = "ArrowUp", ARROW_DOWN_KEY = "ArrowDown", RIGHT_MOUSE_BUTTON = 2, EVENT_HIDE = `hide${EVENT_KEY}`, EVENT_HIDDEN = `hidden${EVENT_KEY}`, EVENT_SHOW = `show${EVENT_KEY}`, EVENT_SHOWN = `shown${EVENT_KEY}`, EVENT_CLICK_DATA_API = `click${EVENT_KEY}${DATA_API_KEY}`, EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY}${DATA_API_KEY}`, EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY}${DATA_API_KEY}`, CLASS_NAME_SHOW = "show", CLASS_NAME_DROPUP = "dropup", CLASS_NAME_DROPEND = "dropend", CLASS_NAME_DROPSTART = "dropstart", CLASS_NAME_DROPUP_CENTER = "dropup-center", CLASS_NAME_DROPDOWN_CENTER = "dropdown-center", SELECTOR_DATA_TOGGLE = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', SELECTOR_DATA_TOGGLE_SHOWN = `${SELECTOR_DATA_TOGGLE}.${CLASS_NAME_SHOW}`, SELECTOR_MENU = ".dropdown-menu", SELECTOR_NAVBAR = ".navbar", SELECTOR_NAVBAR_NAV = ".navbar-nav", SELECTOR_VISIBLE_ITEMS = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", PLACEMENT_TOP = isRTL() ? "top-end" : "top-start", PLACEMENT_TOPEND = isRTL() ? "top-start" : "top-end", PLACEMENT_BOTTOM = isRTL() ? "bottom-end" : "bottom-start", PLACEMENT_BOTTOMEND = isRTL() ? "bottom-start" : "bottom-end", PLACEMENT_RIGHT = isRTL() ? "left-start" : "right-start", PLACEMENT_LEFT = isRTL() ? "right-start" : "left-start", PLACEMENT_TOPCENTER = "top", PLACEMENT_BOTTOMCENTER = "bottom", Default = {
  autoClose: !0,
  boundary: "clippingParents",
  display: "dynamic",
  offset: [0, 2],
  popperConfig: null,
  reference: "toggle"
}, DefaultType = {
  autoClose: "(boolean|string)",
  boundary: "(string|element)",
  display: "string",
  offset: "(array|string|function)",
  popperConfig: "(null|object|function)",
  reference: "(string|element|object)"
};
let Dropdown$1 = class dt extends BaseComponent {
  constructor(e, r) {
    super(e, r), this._popper = null, this._parent = this._element.parentNode, this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent), this._inNavbar = this._detectNavbar();
  }
  // Getters
  static get Default() {
    return Default;
  }
  static get DefaultType() {
    return DefaultType;
  }
  static get NAME() {
    return NAME;
  }
  // Public
  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }
  show() {
    if (isDisabled(this._element) || this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    if (!EventHandler.trigger(this._element, EVENT_SHOW, e).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV))
        for (const i of [].concat(...document.body.children))
          EventHandler.on(i, "mouseover", noop);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(CLASS_NAME_SHOW), this._element.classList.add(CLASS_NAME_SHOW), EventHandler.trigger(this._element, EVENT_SHOWN, e);
    }
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown())
      return;
    const e = {
      relatedTarget: this._element
    };
    this._completeHide(e);
  }
  dispose() {
    this._popper && this._popper.destroy(), super.dispose();
  }
  update() {
    this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
  }
  // Private
  _completeHide(e) {
    if (!EventHandler.trigger(this._element, EVENT_HIDE, e).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const i of [].concat(...document.body.children))
          EventHandler.off(i, "mouseover", noop);
      this._popper && this._popper.destroy(), this._menu.classList.remove(CLASS_NAME_SHOW), this._element.classList.remove(CLASS_NAME_SHOW), this._element.setAttribute("aria-expanded", "false"), Manipulator.removeDataAttribute(this._menu, "popper"), EventHandler.trigger(this._element, EVENT_HIDDEN, e);
    }
  }
  _getConfig(e) {
    if (e = super._getConfig(e), typeof e.reference == "object" && !isElement(e.reference) && typeof e.reference.getBoundingClientRect != "function")
      throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return e;
  }
  _createPopper() {
    if (typeof Popper > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let e = this._element;
    this._config.reference === "parent" ? e = this._parent : isElement(this._config.reference) ? e = getElement(this._config.reference) : typeof this._config.reference == "object" && (e = this._config.reference);
    const r = this._getPopperConfig();
    this._popper = Popper.createPopper(e, this._menu, r);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW);
  }
  _getPlacement() {
    const e = this._parent;
    if (e.classList.contains(CLASS_NAME_DROPEND))
      return PLACEMENT_RIGHT;
    if (e.classList.contains(CLASS_NAME_DROPSTART))
      return PLACEMENT_LEFT;
    if (e.classList.contains(CLASS_NAME_DROPUP_CENTER))
      return PLACEMENT_TOPCENTER;
    if (e.classList.contains(CLASS_NAME_DROPDOWN_CENTER))
      return PLACEMENT_BOTTOMCENTER;
    const r = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return e.classList.contains(CLASS_NAME_DROPUP) ? r ? PLACEMENT_TOPEND : PLACEMENT_TOP : r ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const { offset: e } = this._config;
    return typeof e == "string" ? e.split(",").map((r) => Number.parseInt(r, 10)) : typeof e == "function" ? (r) => e(r, this._element) : e;
  }
  _getPopperConfig() {
    const e = {
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
    return (this._inNavbar || this._config.display === "static") && (Manipulator.setDataAttribute(this._menu, "popper", "static"), e.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...e,
      ...execute(this._config.popperConfig, [e])
    };
  }
  _selectMenuItem({ key: e, target: r }) {
    const i = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((s) => isVisible(s));
    i.length && getNextActiveElement(i, r, e === ARROW_DOWN_KEY, !i.includes(r)).focus();
  }
  // Static
  static jQueryInterface(e) {
    return this.each(function() {
      const r = dt.getOrCreateInstance(this, e);
      if (typeof e == "string") {
        if (typeof r[e] > "u")
          throw new TypeError(`No method named "${e}"`);
        r[e]();
      }
    });
  }
  static clearMenus(e) {
    if (e.button === RIGHT_MOUSE_BUTTON || e.type === "keyup" && e.key !== TAB_KEY)
      return;
    const r = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const i of r) {
      const s = dt.getInstance(i);
      if (!s || s._config.autoClose === !1)
        continue;
      const n = e.composedPath(), a = n.includes(s._menu);
      if (n.includes(s._element) || s._config.autoClose === "inside" && !a || s._config.autoClose === "outside" && a || s._menu.contains(e.target) && (e.type === "keyup" && e.key === TAB_KEY || /input|select|option|textarea|form/i.test(e.target.tagName)))
        continue;
      const l = { relatedTarget: s._element };
      e.type === "click" && (l.clickEvent = e), s._completeHide(l);
    }
  }
  static dataApiKeydownHandler(e) {
    const r = /input|textarea/i.test(e.target.tagName), i = e.key === ESCAPE_KEY, s = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(e.key);
    if (!s && !i || r && !i)
      return;
    e.preventDefault();
    const n = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, e.delegateTarget.parentNode), a = dt.getOrCreateInstance(n);
    if (s) {
      e.stopPropagation(), a.show(), a._selectMenuItem(e);
      return;
    }
    a._isShown() && (e.stopPropagation(), a.hide(), n.focus());
  }
};
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown$1.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown$1.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown$1.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown$1.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(t) {
  t.preventDefault(), Dropdown$1.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown$1);
const DropdownButton = ({ children: t, disabled: e, className: r }) => /* @__PURE__ */ jsx(Fragment, { children: t }), DropdownContent = ({ children: t, ...e }) => /* @__PURE__ */ jsx("div", { className: "dropdown-menu", children: t }), Dropdown = ({ items: t, className: e, children: r, icon: i }) => {
  const s = useRef(null);
  useEffect(() => {
    const m = new Dropdown$1(s.current);
    return () => {
      m.dispose();
    };
  }, []);
  const n = React__default.Children.toArray(r).find((m) => React__default.isValidElement(m) && m.type === DropdownContent), a = React__default.Children.toArray(r).filter((m) => React__default.isValidElement(m) && m.type === Link), l = React__default.Children.toArray(r).find((m) => React__default.isValidElement(m) && m.type === DropdownButton), o = React__default.Children.toArray(r).filter((m) => !React__default.isValidElement(m) || m.type !== Link && m.type !== DropdownContent && m.type !== DropdownButton), f = React__default.isValidElement(l) ? l.props : {};
  return /* @__PURE__ */ jsxs("div", { className: [...(e || "").split(" "), "dropdown"].filter((m, b, h) => h.indexOf(m) === b).join(" "), children: [
    /* @__PURE__ */ jsx(Button, { ref: s, "data-bs-toggle": "dropdown", ...f, className: [...(f.className || "").split(" "), "btn", "dropdown-toggle"].filter((m, b, h) => h.indexOf(m) === b).join(" "), children: f.children ? f.children : o }),
    n || /* @__PURE__ */ jsx(DropdownContent, { children: a })
  ] });
}, GridTableView = forwardRef(({ data: t, columns: e, options: r, onClick: i, onBatchClick: s, routeParams: n, namespace: a }, l) => {
  var S, _, A, T, w, V, D;
  e = (e || ((S = t == null ? void 0 : t.entity) == null ? void 0 : S.columns) || []).filter((I) => I.group !== !1);
  const [, o] = useState(), f = (_ = t == null ? void 0 : t.entity) == null ? void 0 : _.primaryColumn, m = Object.values((t == null ? void 0 : t.action) || []), b = m.filter((I) => I.object), h = e.length + (m.length ? 1 : 0), g = ((t == null ? void 0 : t.entity.data.items) || []).map((I) => I[(f == null ? void 0 : f.field) || ""] || 0), y = useRef([]), u = !!g.length && g.reduce((I, R) => I && y.current.includes(R), !0), P = (w = (T = (A = t == null ? void 0 : t.form) == null ? void 0 : A.batch.view.children) == null ? void 0 : T.method) == null ? void 0 : w.choices, c = !!(P != null && P.length) && f, d = (I, R = !1) => {
    R ? y.current.push(I) : y.current = y.current.filter((O) => O !== I), o({});
  }, p = (I = !1) => {
    y.current = (I ? y.current.concat(g) : y.current.filter((R) => !g.includes(R))).filter((R, O, L) => L.indexOf(R) === O), o({});
  }, v = (I) => {
    var L, C;
    if (!s)
      return;
    const R = t == null ? void 0 : t.form.batch.view;
    if (!c || !((L = y.current) != null && L.length))
      return;
    const O = new FormData();
    y.current.forEach((M) => {
      var E;
      O.append(`${(E = R == null ? void 0 : R.children) == null ? void 0 : E.ids.full_name}[]`, M.toString());
    }), O.append(((C = R == null ? void 0 : R.children) == null ? void 0 : C.method.full_name) || "method", I), s(I, y.current, O);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    c && /* @__PURE__ */ jsxs("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ jsx("label", { className: "btn btn-light", children: /* @__PURE__ */ jsx(
        "input",
        {
          checked: u,
          onChange: (I) => p(I.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ jsxs(Dropdown, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ jsx(DropdownButton, { disabled: !y.current.length, className: "btn-light" }),
        /* @__PURE__ */ jsx(DropdownContent, { children: (D = (V = t.form.batch.view.children) == null ? void 0 : V.method.choices) == null ? void 0 : D.map((I) => {
          const R = I.value instanceof Function ? I.value() : I.value;
          return /* @__PURE__ */ jsx(Link$1, { to: "#", onClick: () => v(R), className: "dropdown-item", children: I.label instanceof Function ? I.label() : I.label }, R);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        e.map((I, R) => /* @__PURE__ */ jsxs("th", { children: [
          /* @__PURE__ */ jsx(DynamicView, { namespace: (t == null ? void 0 : t.entity.name) || "unknown", data: I, prefix: "list", view: I.field + ".label", children: I.label }),
          I.sortable && (t == null ? void 0 : t.sort[I.field]) !== void 0 && /* @__PURE__ */ jsx(
            Link$1,
            {
              onClick: (O) => i && i({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: a,
                  entity: t == null ? void 0 : t.entity.name
                },
                parameters: { [I.field]: t != null && t.sort[I.field] ? (t == null ? void 0 : t.sort[I.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, O),
              className: "btn",
              to: "#",
              children: t.sort[I.field] ? t.sort[I.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, R)),
        f && b.length > 0 && /* @__PURE__ */ jsx("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: t && (t.entity.data.items.length ? t.entity.data.items.map(
        (I, R) => /* @__PURE__ */ jsxs("tr", { children: [
          e == null ? void 0 : e.map(
            (O, L) => {
              var C;
              return /* @__PURE__ */ jsxs("td", { children: [
                L === 0 && c && /* @__PURE__ */ jsx(
                  "input",
                  {
                    checked: y.current.includes(I[f == null ? void 0 : f.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: t.form.batch.view.full_name,
                    value: I[f == null ? void 0 : f.field],
                    onChange: (M) => d(I[f == null ? void 0 : f.field], M.target.checked)
                  }
                ),
                /* @__PURE__ */ jsx(DynamicView, { namespace: a || "unknown", data: I, prefix: "list", view: O.field, children: I[O.field] !== void 0 && (I[O.field] instanceof Object ? I[O.field] instanceof Array ? I[O.field].join(", ") : JSON.stringify(I[O.field]) : (C = I[O.field]) == null ? void 0 : C.toString()) })
              ] }, L);
            }
          ),
          f && b.length > 0 && /* @__PURE__ */ jsx("td", { className: "text-end text-nowrap", children: b.map((O, L) => {
            var C;
            return /* @__PURE__ */ jsx(
              Link$1,
              {
                onClick: (M) => i && i({
                  action: O,
                  parameters: {
                    ...n || {},
                    id: I[f == null ? void 0 : f.field]
                  }
                }, M),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((C = O.route) == null ? void 0 : C.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: generateRoute(O.route, {
                  ...n || {},
                  id: I[f.field]
                }),
                children: O.title
              },
              L
            );
          }) })
        ] }, R)
      ) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: h, children: "Not results found." }) })) })
    ] })
  ] });
}), PageItem = ({ route: t, page: e, active: r = !1, title: i, children: s }) => {
  const n = new URL(document.location.href);
  return n.searchParams.set("page", e.toString()), /* @__PURE__ */ jsx("li", { className: `page-item ${r ? "active" : ""}`, children: /* @__PURE__ */ jsx(
    Link$1,
    {
      to: n.toString(),
      className: "page-link",
      title: i,
      children: s || e
    }
  ) });
}, Paginator = ({ meta: t }) => {
  const r = t.totalPages, i = t.page || 1, s = t.links, n = !!t.totalPages;
  return /* @__PURE__ */ jsxs("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ jsxs("small", { className: "mb-2", children: [
      t.totalResults,
      " Results",
      n && /* @__PURE__ */ jsxs(Fragment, { children: [
        " - Page ",
        i,
        " of ",
        t.totalPages
      ] })
    ] }),
    n && /* @__PURE__ */ jsx("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ jsxs("ul", { className: "pagination pagination-sm", children: [
      i > 1 && /* @__PURE__ */ jsx(PageItem, { page: i - 1, title: "Go to First Page", children: "«" }),
      t.links[0] !== 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(PageItem, { page: 1, active: i === 1, children: 1 }, 1),
        /* @__PURE__ */ jsx("div", { className: "page-item", children: /* @__PURE__ */ jsx("a", { className: "page-link", children: "..." }) })
      ] }),
      (s || []).map((a, l) => /* @__PURE__ */ jsx(PageItem, { page: a, active: a === i }, l)),
      [...t.links].reverse()[0] !== r && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "page-item", children: /* @__PURE__ */ jsx("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ jsx(
          PageItem,
          {
            page: r,
            active: r === i,
            children: r
          },
          r
        )
      ] }),
      i < r && /* @__PURE__ */ jsx(PageItem, { page: t.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, objectRemoveEmpty = (t, e = !0) => (Object.entries(t).map(([r, i]) => (e && i instanceof Object && (i = objectRemoveEmpty(i)), [r, i])).filter(([, r]) => !(r instanceof Object ? Object.keys(r).length : r)).forEach(([r]) => {
  delete t[r];
}), t), SESSION_KEY = "settings", initialState = {
  locale: "en"
  // accessToken: null,
  // user: null,
  // branch: null,
  // authChain: []
}, SessionContext = React__default.createContext(initialState);
function reducer(t, e) {
  const r = {
    ...t,
    ...e
  };
  return sessionStorage.setItem(SESSION_KEY, btoa(JSON.stringify(r))), r;
}
function SessionProvider(t) {
  let e = initialState;
  try {
    const r = sessionStorage.getItem(SESSION_KEY);
    e = JSON.parse(atob(r || ""));
  } catch {
    reducer(initialState, e);
  }
  return /* @__PURE__ */ jsx(SessionContext.Provider, { value: React__default.useReducer(reducer, e), children: t.children });
}
const CrudContext = ({ children: t }) => /* @__PURE__ */ jsx(ModalProvider, { children: /* @__PURE__ */ jsx(AlertProvider, { children: /* @__PURE__ */ jsx(ActionProvider, { children: /* @__PURE__ */ jsx(SessionProvider, { children: t }) }) }) }), ModalContext = React__default.createContext({});
function UseModal() {
  const { setModal: t } = React__default.useContext(ModalContext);
  return {
    openModal: (e) => {
      t && t(e);
    }
  };
}
function ModalProvider(t) {
  const [e, r] = useState(), i = useRef(0);
  return useEffect(() => {
    i.current += 1;
  }, [e]), /* @__PURE__ */ jsxs(ModalContext.Provider, { value: { setModal: r }, children: [
    t.children,
    e && /* @__PURE__ */ jsx(CrudContext, { children: /* @__PURE__ */ jsx(
      ViewLoader,
      {
        view: e.action.action.name || "list",
        namespace: e.action.action.namespace || "",
        props: {
          action: e.action.action,
          routeParams: e.action.parameters,
          modal: !0,
          props: e.props
        }
      },
      i.current
    ) })
  ] });
}
const List = memo(({ action: t, embedded: e = !1 }) => {
  var d, p, v, S;
  const r = useLocation(), [i, s] = useSearchParams(), n = useRef(void 0), a = useRef(convertURLSearchParamsToObject(i)), l = useRef(null), { openModal: o } = UseModal(), { open: f } = UseAlert(), m = t.action.entity;
  if (!m)
    throw new Error("Invalid Entity");
  const { results: b, refresh: h, setQueryParameters: g } = GetData({ entityAction: t.action, initParameters: t.parameters, initQueryParameters: a.current }), y = Object.values((b == null ? void 0 : b.action) ?? []).filter((_) => !_.object && _.name !== t.action.name), u = (_) => {
    _ == null || _.forEach((w) => {
      var V, D;
      (D = (V = a.current) == null ? void 0 : V.filter) == null || delete D[w];
    });
    const A = {
      ...a.current && a.current,
      ...n.current && { sort: n.current }
    }, T = convertObjectToURLSearchParams(objectRemoveEmpty(A));
    e ? g(T) : s(T);
  }, P = (_, A, T) => {
    console.log("method", A, T), f({
      title: "Are you sure?",
      icon: Icon.confirm,
      onResult: (w) => {
        w.isConfirmed && new Requester().post(generateRoute(t.action.route, t.parameters), T).catch((V) => {
          console.log("error", V);
        }).finally(() => {
          console.log("done"), h();
        });
      }
    });
  }, c = (_, A) => {
    switch (_.parameters !== void 0 && (_.parameters = objectRemoveEmpty(_.parameters), Object.keys(_.parameters).length || (_.parameters = void 0)), _.action.name) {
      case "filter": {
        A == null || A.preventDefault(), a.current = _.parameters;
        break;
      }
      case "sort": {
        A == null || A.preventDefault(), n.current = _.parameters;
        break;
      }
      case "delete": {
        A == null || A.preventDefault(), f({
          title: "Are you sure?",
          icon: Icon.confirm,
          onResult: (T) => {
            T.isConfirmed && new Requester().fetch({
              url: generateRoute(_.action.route, { ...t.parameters, ..._.parameters }),
              method: Method.DELETE
            }).catch((w) => {
              console.log("error", w);
            }).finally(() => {
              h();
            });
          }
        });
        return;
      }
      default: {
        e && (A == null || A.preventDefault(), o({
          action: _,
          props: {
            onClose: () => {
              h();
            }
          }
        }));
        return;
      }
    }
    u();
  };
  return useEffect(() => {
    g(i);
  }, [r]), /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("section", { className: "list", children: [
    /* @__PURE__ */ jsxs("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ jsx("h2", { children: b == null ? void 0 : b.title }),
      /* @__PURE__ */ jsxs("div", { className: "d-flex align-items-center", children: [
        !!y.length && /* @__PURE__ */ jsx("div", { className: "btn-group btn-group-sm me-2", children: y.map((_, A) => /* @__PURE__ */ jsx(
          Link$1,
          {
            to: generateRoute(_.route, t.parameters),
            onClick: (T) => c({
              action: _,
              parameters: t.parameters
            }, T),
            className: "btn btn-outline-secondary",
            children: _.title || _.name
          },
          A
        )) }),
        ((d = b == null ? void 0 : b.form) == null ? void 0 : d.filter) && /* @__PURE__ */ jsxs("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ jsxs(Dropdown, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ jsx(DropdownButton, { className: "btn-outline-dark", children: /* @__PURE__ */ jsx(Translation, { children: "Filter" }) }),
            /* @__PURE__ */ jsx(DropdownContent, { children: /* @__PURE__ */ jsx("div", { className: "filter", children: /* @__PURE__ */ jsxs(
              Form,
              {
                id: "filter_" + nameToId(m),
                ref: l,
                onSubmit: (_) => c({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: t.action.namespace,
                    entity: m
                  },
                  parameters: convertFormDataToObject(_)
                }),
                onReset: () => c({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: t.action.namespace,
                    entity: m
                  }
                }),
                children: [
                  ((p = b == null ? void 0 : b.form) == null ? void 0 : p.filter) && /* @__PURE__ */ jsx(FormView, { view: b.form.filter.view }),
                  /* @__PURE__ */ jsx("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ jsx(Translation, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((v = a.current) == null ? void 0 : v.filter) || []).length && /* @__PURE__ */ jsx(Button, { onClick: () => {
            var _;
            (_ = l.current) == null || _.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((S = b == null ? void 0 : b.form) == null ? void 0 : S.filter) && /* @__PURE__ */ jsx(FiltersView, { formView: b.form.filter.view, onClick: (_) => u([_]) }),
    /* @__PURE__ */ jsxs(DynamicView, { namespace: t.action.namespace, prefix: "modify", view: "content", data: b, children: [
      /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx(
        GridTableView,
        {
          data: b,
          onClick: c,
          onBatchClick: P,
          namespace: t.action.namespace,
          routeParams: t.parameters
        }
      ) }),
      b && /* @__PURE__ */ jsx(Paginator, { meta: b.entity.data.meta })
    ] }, "modify")
  ] }) });
}), FiltersView = ({ formView: t, onClick: e }) => {
  const r = (i) => i.choices !== void 0 ? i.choices ? Object.values(i.data instanceof Object ? i.data : [i.data]).map((s) => {
    var n, a;
    return ((a = (n = i.choices) == null ? void 0 : n[s]) == null ? void 0 : a.label) ?? s;
  }).join(", ") : i.data : i.checked !== void 0 ? i.checked ? "Yes" : "No" : i.data;
  return /* @__PURE__ */ jsx("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(t.children || []).filter((i) => i.data !== null).map((i, s) => /* @__PURE__ */ jsxs("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ jsx("small", { className: "mb-2", children: i.label }),
    /* @__PURE__ */ jsxs("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      r(i),
      e && /* @__PURE__ */ jsx("span", { onClick: () => e(i.name), className: "ms-2", children: "×" })
    ] })
  ] }, s)) });
}, DefaultViewComponent = ({ view: t, props: e }) => {
  const r = {
    add: Modify,
    edit: Modify,
    list: List
  };
  if (r[t] === void 0)
    throw new HttpException(500, "View not found");
  return React__default.createElement(r[t] || EmptyView, e);
}, ViewLoader = ({ view: t, namespace: e, props: r }) => /* @__PURE__ */ jsx(DynamicView, { namespace: e, view: t, props: r, children: /* @__PURE__ */ jsx(DefaultViewComponent, { view: t, props: r }) }, e + t), CrudLoader = ({ path: t }) => {
  const e = UseCurrentReactRoute();
  t ?? (t = document.location.pathname.replace(new RegExp("^" + (e == null ? void 0 : e.pathnameBase) + "(/)?"), "/"));
  const { getOnClickActionByPath: r } = UseActions(), i = use(r(t));
  if (!i)
    throw new HttpException(404, "Missing Route");
  return /* @__PURE__ */ jsx(
    ViewLoader,
    {
      view: i.action.name,
      namespace: i.action.namespace || "",
      props: { action: i }
    }
  );
};
Requester.defaults = {
  baseURL: "https://rent.local",
  headers: {
    Accept: "application/json"
  }
};
const Crud = () => (console.log("crud"), /* @__PURE__ */ jsx(CrudContext, { children: /* @__PURE__ */ jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsx(Error$1, {}), children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, { children: "Loading" }), children: /* @__PURE__ */ jsx(CrudLoader, {}) }) }) }));
export {
  AlertProvider,
  Crud,
  CrudContext,
  CrudLoader,
  DynamicView,
  FormView,
  FormWidget,
  GridTableView,
  List,
  ModalProvider,
  Modify,
  TemplateBlock,
  TemplateExtend,
  UseAlert,
  UseModal,
  ViewLoader
};
