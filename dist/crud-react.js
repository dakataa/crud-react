var rt = Object.defineProperty;
var it = (e, t, r) => t in e ? rt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Fe = (e, t, r) => it(e, typeof t != "symbol" ? t + "" : t, r);
function getDefaultExportFromCjs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jsxRuntime = { exports: {} }, reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function r(i, n, s) {
    var a = null;
    if (s !== void 0 && (a = "" + s), n.key !== void 0 && (a = "" + n.key), "key" in n) {
      s = {};
      for (var l in n)
        l !== "key" && (s[l] = n[l]);
    } else s = n;
    return n = s.ref, {
      $$typeof: e,
      type: i,
      key: a,
      ref: n !== void 0 ? n : null,
      props: s
    };
  }
  return reactJsxRuntime_production.Fragment = t, reactJsxRuntime_production.jsx = r, reactJsxRuntime_production.jsxs = r, reactJsxRuntime_production;
}
var reactJsxRuntime_development = {}, react = { exports: {} }, react_production = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReact_production;
function requireReact_production() {
  if (hasRequiredReact_production) return react_production;
  hasRequiredReact_production = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), n = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), a = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), o = Symbol.for("react.suspense"), f = Symbol.for("react.memo"), c = Symbol.for("react.lazy"), v = Symbol.iterator;
  function h(T) {
    return T === null || typeof T != "object" ? null : (T = v && T[v] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var g = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, m = Object.assign, p = {};
  function b(T, R, N) {
    this.props = T, this.context = R, this.refs = p, this.updater = N || g;
  }
  b.prototype.isReactComponent = {}, b.prototype.setState = function(T, R) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, R, "setState");
  }, b.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function u() {
  }
  u.prototype = b.prototype;
  function y(T, R, N) {
    this.props = T, this.context = R, this.refs = p, this.updater = N || g;
  }
  var d = y.prototype = new u();
  d.constructor = y, m(d, b.prototype), d.isPureReactComponent = !0;
  var E = Array.isArray, S = { H: null, A: null, T: null, S: null }, C = Object.prototype.hasOwnProperty;
  function w(T, R, N, H, z, J) {
    return N = J.ref, {
      $$typeof: e,
      type: T,
      key: R,
      ref: N !== void 0 ? N : null,
      props: J
    };
  }
  function M(T, R) {
    return w(
      T.type,
      R,
      void 0,
      void 0,
      void 0,
      T.props
    );
  }
  function O(T) {
    return typeof T == "object" && T !== null && T.$$typeof === e;
  }
  function j(T) {
    var R = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(N) {
      return R[N];
    });
  }
  var B = /\/+/g;
  function L(T, R) {
    return typeof T == "object" && T !== null && T.key != null ? j("" + T.key) : R.toString(36);
  }
  function V() {
  }
  function $(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(V, V) : (T.status = "pending", T.then(
          function(R) {
            T.status === "pending" && (T.status = "fulfilled", T.value = R);
          },
          function(R) {
            T.status === "pending" && (T.status = "rejected", T.reason = R);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function D(T, R, N, H, z) {
    var J = typeof T;
    (J === "undefined" || J === "boolean") && (T = null);
    var q = !1;
    if (T === null) q = !0;
    else
      switch (J) {
        case "bigint":
        case "string":
        case "number":
          q = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case e:
            case t:
              q = !0;
              break;
            case c:
              return q = T._init, D(
                q(T._payload),
                R,
                N,
                H,
                z
              );
          }
      }
    if (q)
      return z = z(T), q = H === "" ? "." + L(T, 0) : H, E(z) ? (N = "", q != null && (N = q.replace(B, "$&/") + "/"), D(z, R, N, "", function(ce) {
        return ce;
      })) : z != null && (O(z) && (z = M(
        z,
        N + (z.key == null || T && T.key === z.key ? "" : ("" + z.key).replace(
          B,
          "$&/"
        ) + "/") + q
      )), R.push(z)), 1;
    q = 0;
    var se = H === "" ? "." : H + ":";
    if (E(T))
      for (var ie = 0; ie < T.length; ie++)
        H = T[ie], J = se + L(H, ie), q += D(
          H,
          R,
          N,
          J,
          z
        );
    else if (ie = h(T), typeof ie == "function")
      for (T = ie.call(T), ie = 0; !(H = T.next()).done; )
        H = H.value, J = se + L(H, ie++), q += D(
          H,
          R,
          N,
          J,
          z
        );
    else if (J === "object") {
      if (typeof T.then == "function")
        return D(
          $(T),
          R,
          N,
          H,
          z
        );
      throw R = String(T), Error(
        "Objects are not valid as a React child (found: " + (R === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : R) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return q;
  }
  function A(T, R, N) {
    if (T == null) return T;
    var H = [], z = 0;
    return D(T, H, "", "", function(J) {
      return R.call(N, J, z++);
    }), H;
  }
  function k(T) {
    if (T._status === -1) {
      var R = T._result;
      R = R(), R.then(
        function(N) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = N);
        },
        function(N) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = N);
        }
      ), T._status === -1 && (T._status = 0, T._result = R);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var x = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var R = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(R)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function P() {
  }
  return react_production.Children = {
    map: A,
    forEach: function(T, R, N) {
      A(
        T,
        function() {
          R.apply(this, arguments);
        },
        N
      );
    },
    count: function(T) {
      var R = 0;
      return A(T, function() {
        R++;
      }), R;
    },
    toArray: function(T) {
      return A(T, function(R) {
        return R;
      }) || [];
    },
    only: function(T) {
      if (!O(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  }, react_production.Component = b, react_production.Fragment = r, react_production.Profiler = n, react_production.PureComponent = y, react_production.StrictMode = i, react_production.Suspense = o, react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, react_production.act = function() {
    throw Error("act(...) is not supported in production builds of React.");
  }, react_production.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, react_production.cloneElement = function(T, R, N) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var H = m({}, T.props), z = T.key, J = void 0;
    if (R != null)
      for (q in R.ref !== void 0 && (J = void 0), R.key !== void 0 && (z = "" + R.key), R)
        !C.call(R, q) || q === "key" || q === "__self" || q === "__source" || q === "ref" && R.ref === void 0 || (H[q] = R[q]);
    var q = arguments.length - 2;
    if (q === 1) H.children = N;
    else if (1 < q) {
      for (var se = Array(q), ie = 0; ie < q; ie++)
        se[ie] = arguments[ie + 2];
      H.children = se;
    }
    return w(T.type, z, void 0, void 0, J, H);
  }, react_production.createContext = function(T) {
    return T = {
      $$typeof: a,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: s,
      _context: T
    }, T;
  }, react_production.createElement = function(T, R, N) {
    var H, z = {}, J = null;
    if (R != null)
      for (H in R.key !== void 0 && (J = "" + R.key), R)
        C.call(R, H) && H !== "key" && H !== "__self" && H !== "__source" && (z[H] = R[H]);
    var q = arguments.length - 2;
    if (q === 1) z.children = N;
    else if (1 < q) {
      for (var se = Array(q), ie = 0; ie < q; ie++)
        se[ie] = arguments[ie + 2];
      z.children = se;
    }
    if (T && T.defaultProps)
      for (H in q = T.defaultProps, q)
        z[H] === void 0 && (z[H] = q[H]);
    return w(T, J, void 0, void 0, null, z);
  }, react_production.createRef = function() {
    return { current: null };
  }, react_production.forwardRef = function(T) {
    return { $$typeof: l, render: T };
  }, react_production.isValidElement = O, react_production.lazy = function(T) {
    return {
      $$typeof: c,
      _payload: { _status: -1, _result: T },
      _init: k
    };
  }, react_production.memo = function(T, R) {
    return {
      $$typeof: f,
      type: T,
      compare: R === void 0 ? null : R
    };
  }, react_production.startTransition = function(T) {
    var R = S.T, N = {};
    S.T = N;
    try {
      var H = T(), z = S.S;
      z !== null && z(N, H), typeof H == "object" && H !== null && typeof H.then == "function" && H.then(P, x);
    } catch (J) {
      x(J);
    } finally {
      S.T = R;
    }
  }, react_production.unstable_useCacheRefresh = function() {
    return S.H.useCacheRefresh();
  }, react_production.use = function(T) {
    return S.H.use(T);
  }, react_production.useActionState = function(T, R, N) {
    return S.H.useActionState(T, R, N);
  }, react_production.useCallback = function(T, R) {
    return S.H.useCallback(T, R);
  }, react_production.useContext = function(T) {
    return S.H.useContext(T);
  }, react_production.useDebugValue = function() {
  }, react_production.useDeferredValue = function(T, R) {
    return S.H.useDeferredValue(T, R);
  }, react_production.useEffect = function(T, R) {
    return S.H.useEffect(T, R);
  }, react_production.useId = function() {
    return S.H.useId();
  }, react_production.useImperativeHandle = function(T, R, N) {
    return S.H.useImperativeHandle(T, R, N);
  }, react_production.useInsertionEffect = function(T, R) {
    return S.H.useInsertionEffect(T, R);
  }, react_production.useLayoutEffect = function(T, R) {
    return S.H.useLayoutEffect(T, R);
  }, react_production.useMemo = function(T, R) {
    return S.H.useMemo(T, R);
  }, react_production.useOptimistic = function(T, R) {
    return S.H.useOptimistic(T, R);
  }, react_production.useReducer = function(T, R, N) {
    return S.H.useReducer(T, R, N);
  }, react_production.useRef = function(T) {
    return S.H.useRef(T);
  }, react_production.useState = function(T) {
    return S.H.useState(T);
  }, react_production.useSyncExternalStore = function(T, R, N) {
    return S.H.useSyncExternalStore(
      T,
      R,
      N
    );
  }, react_production.useTransition = function() {
    return S.H.useTransition();
  }, react_production.version = "19.0.0", react_production;
}
var react_development = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
react_development.exports;
var hasRequiredReact_development;
function requireReact_development() {
  return hasRequiredReact_development || (hasRequiredReact_development = 1, function(e, t) {
    process.env.NODE_ENV !== "production" && function() {
      function r(_, I) {
        Object.defineProperty(s.prototype, _, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              I[0],
              I[1]
            );
          }
        });
      }
      function i(_) {
        return _ === null || typeof _ != "object" ? null : (_ = be && _[be] || _["@@iterator"], typeof _ == "function" ? _ : null);
      }
      function n(_, I) {
        _ = (_ = _.constructor) && (_.displayName || _.name) || "ReactClass";
        var G = _ + "." + I;
        de[G] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          I,
          _
        ), de[G] = !0);
      }
      function s(_, I, G) {
        this.props = _, this.context = I, this.refs = Y, this.updater = G || F;
      }
      function a() {
      }
      function l(_, I, G) {
        this.props = _, this.context = I, this.refs = Y, this.updater = G || F;
      }
      function o(_) {
        return "" + _;
      }
      function f(_) {
        try {
          o(_);
          var I = !1;
        } catch {
          I = !0;
        }
        if (I) {
          I = console;
          var G = I.error, W = typeof Symbol == "function" && Symbol.toStringTag && _[Symbol.toStringTag] || _.constructor.name || "Object";
          return G.call(
            I,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            W
          ), o(_);
        }
      }
      function c(_) {
        if (_ == null) return null;
        if (typeof _ == "function")
          return _.$$typeof === re ? null : _.displayName || _.name || null;
        if (typeof _ == "string") return _;
        switch (_) {
          case ie:
            return "Fragment";
          case se:
            return "Portal";
          case ue:
            return "Profiler";
          case ce:
            return "StrictMode";
          case K:
            return "Suspense";
          case ye:
            return "SuspenseList";
        }
        if (typeof _ == "object")
          switch (typeof _.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), _.$$typeof) {
            case pe:
              return (_.displayName || "Context") + ".Provider";
            case fe:
              return (_._context.displayName || "Context") + ".Consumer";
            case ae:
              var I = _.render;
              return _ = _.displayName, _ || (_ = I.displayName || I.name || "", _ = _ !== "" ? "ForwardRef(" + _ + ")" : "ForwardRef"), _;
            case Ee:
              return I = _.displayName || null, I !== null ? I : c(_.type) || "Memo";
            case ge:
              I = _._payload, _ = _._init;
              try {
                return c(_(I));
              } catch {
              }
          }
        return null;
      }
      function v(_) {
        return typeof _ == "string" || typeof _ == "function" || _ === ie || _ === ue || _ === ce || _ === K || _ === ye || _ === xe || typeof _ == "object" && _ !== null && (_.$$typeof === ge || _.$$typeof === Ee || _.$$typeof === pe || _.$$typeof === fe || _.$$typeof === ae || _.$$typeof === me || _.getModuleId !== void 0);
      }
      function h() {
      }
      function g() {
        if (Pe === 0) {
          Re = console.log, Te = console.info, Me = console.warn, Ce = console.error, He = console.group, $e = console.groupCollapsed, ze = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: h,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        Pe++;
      }
      function m() {
        if (Pe--, Pe === 0) {
          var _ = { configurable: !0, enumerable: !0, writable: !0 };
          Object.defineProperties(console, {
            log: U({}, _, { value: Re }),
            info: U({}, _, { value: Te }),
            warn: U({}, _, { value: Me }),
            error: U({}, _, { value: Ce }),
            group: U({}, _, { value: He }),
            groupCollapsed: U({}, _, { value: $e }),
            groupEnd: U({}, _, { value: ze })
          });
        }
        0 > Pe && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function p(_) {
        if (Ne === void 0)
          try {
            throw Error();
          } catch (G) {
            var I = G.stack.trim().match(/\n( *(at )?)/);
            Ne = I && I[1] || "", We = -1 < G.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < G.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return `
` + Ne + _ + We;
      }
      function b(_, I) {
        if (!_ || Ve) return "";
        var G = Be.get(_);
        if (G !== void 0) return G;
        Ve = !0, G = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
        var W = null;
        W = Q.H, Q.H = null, g();
        try {
          var X = {
            DetermineComponentFrameRoot: function() {
              try {
                if (I) {
                  var Ae = function() {
                    throw Error();
                  };
                  if (Object.defineProperty(Ae.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                    try {
                      Reflect.construct(Ae, []);
                    } catch (we) {
                      var De = we;
                    }
                    Reflect.construct(_, [], Ae);
                  } else {
                    try {
                      Ae.call();
                    } catch (we) {
                      De = we;
                    }
                    _.call(Ae.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (we) {
                    De = we;
                  }
                  (Ae = _()) && typeof Ae.catch == "function" && Ae.catch(function() {
                  });
                }
              } catch (we) {
                if (we && De && typeof we.stack == "string")
                  return [we.stack, De.stack];
              }
              return [null, null];
            }
          };
          X.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var te = Object.getOwnPropertyDescriptor(
            X.DetermineComponentFrameRoot,
            "name"
          );
          te && te.configurable && Object.defineProperty(
            X.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var Z = X.DetermineComponentFrameRoot(), he = Z[0], le = Z[1];
          if (he && le) {
            var ve = he.split(`
`), Se = le.split(`
`);
            for (Z = te = 0; te < ve.length && !ve[te].includes(
              "DetermineComponentFrameRoot"
            ); )
              te++;
            for (; Z < Se.length && !Se[Z].includes(
              "DetermineComponentFrameRoot"
            ); )
              Z++;
            if (te === ve.length || Z === Se.length)
              for (te = ve.length - 1, Z = Se.length - 1; 1 <= te && 0 <= Z && ve[te] !== Se[Z]; )
                Z--;
            for (; 1 <= te && 0 <= Z; te--, Z--)
              if (ve[te] !== Se[Z]) {
                if (te !== 1 || Z !== 1)
                  do
                    if (te--, Z--, 0 > Z || ve[te] !== Se[Z]) {
                      var ke = `
` + ve[te].replace(
                        " at new ",
                        " at "
                      );
                      return _.displayName && ke.includes("<anonymous>") && (ke = ke.replace("<anonymous>", _.displayName)), typeof _ == "function" && Be.set(_, ke), ke;
                    }
                  while (1 <= te && 0 <= Z);
                break;
              }
          }
        } finally {
          Ve = !1, Q.H = W, m(), Error.prepareStackTrace = G;
        }
        return ve = (ve = _ ? _.displayName || _.name : "") ? p(ve) : "", typeof _ == "function" && Be.set(_, ve), ve;
      }
      function u(_) {
        if (_ == null) return "";
        if (typeof _ == "function") {
          var I = _.prototype;
          return b(
            _,
            !(!I || !I.isReactComponent)
          );
        }
        if (typeof _ == "string") return p(_);
        switch (_) {
          case K:
            return p("Suspense");
          case ye:
            return p("SuspenseList");
        }
        if (typeof _ == "object")
          switch (_.$$typeof) {
            case ae:
              return _ = b(_.render, !1), _;
            case Ee:
              return u(_.type);
            case ge:
              I = _._payload, _ = _._init;
              try {
                return u(_(I));
              } catch {
              }
          }
        return "";
      }
      function y() {
        var _ = Q.A;
        return _ === null ? null : _.getOwner();
      }
      function d(_) {
        if (_e.call(_, "key")) {
          var I = Object.getOwnPropertyDescriptor(_, "key").get;
          if (I && I.isReactWarning) return !1;
        }
        return _.key !== void 0;
      }
      function E(_, I) {
        function G() {
          qe || (qe = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            I
          ));
        }
        G.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: G,
          configurable: !0
        });
      }
      function S() {
        var _ = c(this.type);
        return Ye[_] || (Ye[_] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), _ = this.props.ref, _ !== void 0 ? _ : null;
      }
      function C(_, I, G, W, X, te) {
        return G = te.ref, _ = {
          $$typeof: q,
          type: _,
          key: I,
          props: te,
          _owner: X
        }, (G !== void 0 ? G : null) !== null ? Object.defineProperty(_, "ref", {
          enumerable: !1,
          get: S
        }) : Object.defineProperty(_, "ref", { enumerable: !1, value: null }), _._store = {}, Object.defineProperty(_._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(_, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.freeze && (Object.freeze(_.props), Object.freeze(_)), _;
      }
      function w(_, I) {
        return I = C(
          _.type,
          I,
          void 0,
          void 0,
          _._owner,
          _.props
        ), I._store.validated = _._store.validated, I;
      }
      function M(_, I) {
        if (typeof _ == "object" && _ && _.$$typeof !== tt) {
          if (ne(_))
            for (var G = 0; G < _.length; G++) {
              var W = _[G];
              O(W) && j(W, I);
            }
          else if (O(_))
            _._store && (_._store.validated = 1);
          else if (G = i(_), typeof G == "function" && G !== _.entries && (G = G.call(_), G !== _))
            for (; !(_ = G.next()).done; )
              O(_.value) && j(_.value, I);
        }
      }
      function O(_) {
        return typeof _ == "object" && _ !== null && _.$$typeof === q;
      }
      function j(_, I) {
        if (_._store && !_._store.validated && _.key == null && (_._store.validated = 1, I = B(I), !Ke[I])) {
          Ke[I] = !0;
          var G = "";
          _ && _._owner != null && _._owner !== y() && (G = null, typeof _._owner.tag == "number" ? G = c(_._owner.type) : typeof _._owner.name == "string" && (G = _._owner.name), G = " It was passed a child from " + G + ".");
          var W = Q.getCurrentStack;
          Q.getCurrentStack = function() {
            var X = u(_.type);
            return W && (X += W() || ""), X;
          }, console.error(
            'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
            I,
            G
          ), Q.getCurrentStack = W;
        }
      }
      function B(_) {
        var I = "", G = y();
        return G && (G = c(G.type)) && (I = `

Check the render method of \`` + G + "`."), I || (_ = c(_)) && (I = `

Check the top-level render call using <` + _ + ">."), I;
      }
      function L(_) {
        var I = { "=": "=0", ":": "=2" };
        return "$" + _.replace(/[=:]/g, function(G) {
          return I[G];
        });
      }
      function V(_, I) {
        return typeof _ == "object" && _ !== null && _.key != null ? (f(_.key), L("" + _.key)) : I.toString(36);
      }
      function $() {
      }
      function D(_) {
        switch (_.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
          default:
            switch (typeof _.status == "string" ? _.then($, $) : (_.status = "pending", _.then(
              function(I) {
                _.status === "pending" && (_.status = "fulfilled", _.value = I);
              },
              function(I) {
                _.status === "pending" && (_.status = "rejected", _.reason = I);
              }
            )), _.status) {
              case "fulfilled":
                return _.value;
              case "rejected":
                throw _.reason;
            }
        }
        throw _;
      }
      function A(_, I, G, W, X) {
        var te = typeof _;
        (te === "undefined" || te === "boolean") && (_ = null);
        var Z = !1;
        if (_ === null) Z = !0;
        else
          switch (te) {
            case "bigint":
            case "string":
            case "number":
              Z = !0;
              break;
            case "object":
              switch (_.$$typeof) {
                case q:
                case se:
                  Z = !0;
                  break;
                case ge:
                  return Z = _._init, A(
                    Z(_._payload),
                    I,
                    G,
                    W,
                    X
                  );
              }
          }
        if (Z) {
          Z = _, X = X(Z);
          var he = W === "" ? "." + V(Z, 0) : W;
          return ne(X) ? (G = "", he != null && (G = he.replace(Xe, "$&/") + "/"), A(X, I, G, "", function(ve) {
            return ve;
          })) : X != null && (O(X) && (X.key != null && (Z && Z.key === X.key || f(X.key)), G = w(
            X,
            G + (X.key == null || Z && Z.key === X.key ? "" : ("" + X.key).replace(
              Xe,
              "$&/"
            ) + "/") + he
          ), W !== "" && Z != null && O(Z) && Z.key == null && Z._store && !Z._store.validated && (G._store.validated = 2), X = G), I.push(X)), 1;
        }
        if (Z = 0, he = W === "" ? "." : W + ":", ne(_))
          for (var le = 0; le < _.length; le++)
            W = _[le], te = he + V(W, le), Z += A(
              W,
              I,
              G,
              te,
              X
            );
        else if (le = i(_), typeof le == "function")
          for (le === _.entries && (Je || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Je = !0), _ = le.call(_), le = 0; !(W = _.next()).done; )
            W = W.value, te = he + V(W, le++), Z += A(
              W,
              I,
              G,
              te,
              X
            );
        else if (te === "object") {
          if (typeof _.then == "function")
            return A(
              D(_),
              I,
              G,
              W,
              X
            );
          throw I = String(_), Error(
            "Objects are not valid as a React child (found: " + (I === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : I) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return Z;
      }
      function k(_, I, G) {
        if (_ == null) return _;
        var W = [], X = 0;
        return A(_, W, "", "", function(te) {
          return I.call(G, te, X++);
        }), W;
      }
      function x(_) {
        if (_._status === -1) {
          var I = _._result;
          I = I(), I.then(
            function(G) {
              (_._status === 0 || _._status === -1) && (_._status = 1, _._result = G);
            },
            function(G) {
              (_._status === 0 || _._status === -1) && (_._status = 2, _._result = G);
            }
          ), _._status === -1 && (_._status = 0, _._result = I);
        }
        if (_._status === 1)
          return I = _._result, I === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            I
          ), "default" in I || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            I
          ), I.default;
        throw _._result;
      }
      function P() {
        var _ = Q.H;
        return _ === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), _;
      }
      function T() {
      }
      function R(_) {
        if (Oe === null)
          try {
            var I = ("require" + Math.random()).slice(0, 7);
            Oe = (e && e[I]).call(
              e,
              "timers"
            ).setImmediate;
          } catch {
            Oe = function(W) {
              Qe === !1 && (Qe = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var X = new MessageChannel();
              X.port1.onmessage = W, X.port2.postMessage(void 0);
            };
          }
        return Oe(_);
      }
      function N(_) {
        return 1 < _.length && typeof AggregateError == "function" ? new AggregateError(_) : _[0];
      }
      function H(_, I) {
        I !== Ie - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), Ie = I;
      }
      function z(_, I, G) {
        var W = Q.actQueue;
        if (W !== null)
          if (W.length !== 0)
            try {
              J(W), R(function() {
                return z(_, I, G);
              });
              return;
            } catch (X) {
              Q.thrownErrors.push(X);
            }
          else Q.actQueue = null;
        0 < Q.thrownErrors.length ? (W = N(Q.thrownErrors), Q.thrownErrors.length = 0, G(W)) : I(_);
      }
      function J(_) {
        if (!Ge) {
          Ge = !0;
          var I = 0;
          try {
            for (; I < _.length; I++) {
              var G = _[I];
              do {
                Q.didUsePromise = !1;
                var W = G(!1);
                if (W !== null) {
                  if (Q.didUsePromise) {
                    _[I] = G, _.splice(0, I);
                    return;
                  }
                  G = W;
                } else break;
              } while (!0);
            }
            _.length = 0;
          } catch (X) {
            _.splice(0, I + 1), Q.thrownErrors.push(X);
          } finally {
            Ge = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var q = Symbol.for("react.transitional.element"), se = Symbol.for("react.portal"), ie = Symbol.for("react.fragment"), ce = Symbol.for("react.strict_mode"), ue = Symbol.for("react.profiler"), fe = Symbol.for("react.consumer"), pe = Symbol.for("react.context"), ae = Symbol.for("react.forward_ref"), K = Symbol.for("react.suspense"), ye = Symbol.for("react.suspense_list"), Ee = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), xe = Symbol.for("react.offscreen"), be = Symbol.iterator, de = {}, F = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(_) {
          n(_, "forceUpdate");
        },
        enqueueReplaceState: function(_) {
          n(_, "replaceState");
        },
        enqueueSetState: function(_) {
          n(_, "setState");
        }
      }, U = Object.assign, Y = {};
      Object.freeze(Y), s.prototype.isReactComponent = {}, s.prototype.setState = function(_, I) {
        if (typeof _ != "object" && typeof _ != "function" && _ != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, _, I, "setState");
      }, s.prototype.forceUpdate = function(_) {
        this.updater.enqueueForceUpdate(this, _, "forceUpdate");
      };
      var ee = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, oe;
      for (oe in ee)
        ee.hasOwnProperty(oe) && r(oe, ee[oe]);
      a.prototype = s.prototype, ee = l.prototype = new a(), ee.constructor = l, U(ee, s.prototype), ee.isPureReactComponent = !0;
      var ne = Array.isArray, re = Symbol.for("react.client.reference"), Q = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null
      }, _e = Object.prototype.hasOwnProperty, me = Symbol.for("react.client.reference"), Pe = 0, Re, Te, Me, Ce, He, $e, ze;
      h.__reactDisabledLog = !0;
      var Ne, We, Ve = !1, Be = new (typeof WeakMap == "function" ? WeakMap : Map)(), tt = Symbol.for("react.client.reference"), qe, Ue, Ye = {}, Ke = {}, Je = !1, Xe = /\/+/g, Ze = typeof reportError == "function" ? reportError : function(_) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var I = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
            error: _
          });
          if (!window.dispatchEvent(I)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", _);
          return;
        }
        console.error(_);
      }, Qe = !1, Oe = null, Ie = 0, Le = !1, Ge = !1, et = typeof queueMicrotask == "function" ? function(_) {
        queueMicrotask(function() {
          return queueMicrotask(_);
        });
      } : R;
      t.Children = {
        map: k,
        forEach: function(_, I, G) {
          k(
            _,
            function() {
              I.apply(this, arguments);
            },
            G
          );
        },
        count: function(_) {
          var I = 0;
          return k(_, function() {
            I++;
          }), I;
        },
        toArray: function(_) {
          return k(_, function(I) {
            return I;
          }) || [];
        },
        only: function(_) {
          if (!O(_))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return _;
        }
      }, t.Component = s, t.Fragment = ie, t.Profiler = ue, t.PureComponent = l, t.StrictMode = ce, t.Suspense = K, t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, t.act = function(_) {
        var I = Q.actQueue, G = Ie;
        Ie++;
        var W = Q.actQueue = I !== null ? I : [], X = !1;
        try {
          var te = _();
        } catch (le) {
          Q.thrownErrors.push(le);
        }
        if (0 < Q.thrownErrors.length)
          throw H(I, G), _ = N(Q.thrownErrors), Q.thrownErrors.length = 0, _;
        if (te !== null && typeof te == "object" && typeof te.then == "function") {
          var Z = te;
          return et(function() {
            X || Le || (Le = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(le, ve) {
              X = !0, Z.then(
                function(Se) {
                  if (H(I, G), G === 0) {
                    try {
                      J(W), R(function() {
                        return z(
                          Se,
                          le,
                          ve
                        );
                      });
                    } catch (Ae) {
                      Q.thrownErrors.push(Ae);
                    }
                    if (0 < Q.thrownErrors.length) {
                      var ke = N(
                        Q.thrownErrors
                      );
                      Q.thrownErrors.length = 0, ve(ke);
                    }
                  } else le(Se);
                },
                function(Se) {
                  H(I, G), 0 < Q.thrownErrors.length && (Se = N(
                    Q.thrownErrors
                  ), Q.thrownErrors.length = 0), ve(Se);
                }
              );
            }
          };
        }
        var he = te;
        if (H(I, G), G === 0 && (J(W), W.length !== 0 && et(function() {
          X || Le || (Le = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), Q.actQueue = null), 0 < Q.thrownErrors.length)
          throw _ = N(Q.thrownErrors), Q.thrownErrors.length = 0, _;
        return {
          then: function(le, ve) {
            X = !0, G === 0 ? (Q.actQueue = W, R(function() {
              return z(
                he,
                le,
                ve
              );
            })) : le(he);
          }
        };
      }, t.cache = function(_) {
        return function() {
          return _.apply(null, arguments);
        };
      }, t.cloneElement = function(_, I, G) {
        if (_ == null)
          throw Error(
            "The argument must be a React element, but you passed " + _ + "."
          );
        var W = U({}, _.props), X = _.key, te = _._owner;
        if (I != null) {
          var Z;
          e: {
            if (_e.call(I, "ref") && (Z = Object.getOwnPropertyDescriptor(
              I,
              "ref"
            ).get) && Z.isReactWarning) {
              Z = !1;
              break e;
            }
            Z = I.ref !== void 0;
          }
          Z && (te = y()), d(I) && (f(I.key), X = "" + I.key);
          for (he in I)
            !_e.call(I, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && I.ref === void 0 || (W[he] = I[he]);
        }
        var he = arguments.length - 2;
        if (he === 1) W.children = G;
        else if (1 < he) {
          Z = Array(he);
          for (var le = 0; le < he; le++)
            Z[le] = arguments[le + 2];
          W.children = Z;
        }
        for (W = C(_.type, X, void 0, void 0, te, W), X = 2; X < arguments.length; X++)
          M(arguments[X], W.type);
        return W;
      }, t.createContext = function(_) {
        return _ = {
          $$typeof: pe,
          _currentValue: _,
          _currentValue2: _,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, _.Provider = _, _.Consumer = {
          $$typeof: fe,
          _context: _
        }, _._currentRenderer = null, _._currentRenderer2 = null, _;
      }, t.createElement = function(_, I, G) {
        if (v(_))
          for (var W = 2; W < arguments.length; W++)
            M(arguments[W], _);
        else {
          if (W = "", (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (W += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), _ === null) var X = "null";
          else
            ne(_) ? X = "array" : _ !== void 0 && _.$$typeof === q ? (X = "<" + (c(_.type) || "Unknown") + " />", W = " Did you accidentally export a JSX literal instead of a component?") : X = typeof _;
          console.error(
            "React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
            X,
            W
          );
        }
        var te;
        if (W = {}, X = null, I != null)
          for (te in Ue || !("__self" in I) || "key" in I || (Ue = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), d(I) && (f(I.key), X = "" + I.key), I)
            _e.call(I, te) && te !== "key" && te !== "__self" && te !== "__source" && (W[te] = I[te]);
        var Z = arguments.length - 2;
        if (Z === 1) W.children = G;
        else if (1 < Z) {
          for (var he = Array(Z), le = 0; le < Z; le++)
            he[le] = arguments[le + 2];
          Object.freeze && Object.freeze(he), W.children = he;
        }
        if (_ && _.defaultProps)
          for (te in Z = _.defaultProps, Z)
            W[te] === void 0 && (W[te] = Z[te]);
        return X && E(
          W,
          typeof _ == "function" ? _.displayName || _.name || "Unknown" : _
        ), C(_, X, void 0, void 0, y(), W);
      }, t.createRef = function() {
        var _ = { current: null };
        return Object.seal(_), _;
      }, t.forwardRef = function(_) {
        _ != null && _.$$typeof === Ee ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof _ != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          _ === null ? "null" : typeof _
        ) : _.length !== 0 && _.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          _.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), _ != null && _.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var I = { $$typeof: ae, render: _ }, G;
        return Object.defineProperty(I, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return G;
          },
          set: function(W) {
            G = W, _.name || _.displayName || (Object.defineProperty(_, "name", { value: W }), _.displayName = W);
          }
        }), I;
      }, t.isValidElement = O, t.lazy = function(_) {
        return {
          $$typeof: ge,
          _payload: { _status: -1, _result: _ },
          _init: x
        };
      }, t.memo = function(_, I) {
        v(_) || console.error(
          "memo: The first argument must be a component. Instead received: %s",
          _ === null ? "null" : typeof _
        ), I = {
          $$typeof: Ee,
          type: _,
          compare: I === void 0 ? null : I
        };
        var G;
        return Object.defineProperty(I, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return G;
          },
          set: function(W) {
            G = W, _.name || _.displayName || (Object.defineProperty(_, "name", { value: W }), _.displayName = W);
          }
        }), I;
      }, t.startTransition = function(_) {
        var I = Q.T, G = {};
        Q.T = G, G._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var W = _(), X = Q.S;
          X !== null && X(G, W), typeof W == "object" && W !== null && typeof W.then == "function" && W.then(T, Ze);
        } catch (te) {
          Ze(te);
        } finally {
          I === null && G._updatedFibers && (_ = G._updatedFibers.size, G._updatedFibers.clear(), 10 < _ && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), Q.T = I;
        }
      }, t.unstable_useCacheRefresh = function() {
        return P().useCacheRefresh();
      }, t.use = function(_) {
        return P().use(_);
      }, t.useActionState = function(_, I, G) {
        return P().useActionState(
          _,
          I,
          G
        );
      }, t.useCallback = function(_, I) {
        return P().useCallback(_, I);
      }, t.useContext = function(_) {
        var I = P();
        return _.$$typeof === fe && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), I.useContext(_);
      }, t.useDebugValue = function(_, I) {
        return P().useDebugValue(_, I);
      }, t.useDeferredValue = function(_, I) {
        return P().useDeferredValue(_, I);
      }, t.useEffect = function(_, I) {
        return P().useEffect(_, I);
      }, t.useId = function() {
        return P().useId();
      }, t.useImperativeHandle = function(_, I, G) {
        return P().useImperativeHandle(_, I, G);
      }, t.useInsertionEffect = function(_, I) {
        return P().useInsertionEffect(_, I);
      }, t.useLayoutEffect = function(_, I) {
        return P().useLayoutEffect(_, I);
      }, t.useMemo = function(_, I) {
        return P().useMemo(_, I);
      }, t.useOptimistic = function(_, I) {
        return P().useOptimistic(_, I);
      }, t.useReducer = function(_, I, G) {
        return P().useReducer(_, I, G);
      }, t.useRef = function(_) {
        return P().useRef(_);
      }, t.useState = function(_) {
        return P().useState(_);
      }, t.useSyncExternalStore = function(_, I, G) {
        return P().useSyncExternalStore(
          _,
          I,
          G
        );
      }, t.useTransition = function() {
        return P().useTransition();
      }, t.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(react_development, react_development.exports)), react_development.exports;
}
var hasRequiredReact;
function requireReact() {
  return hasRequiredReact || (hasRequiredReact = 1, process.env.NODE_ENV === "production" ? react.exports = requireReact_production() : react.exports = requireReact_development()), react.exports;
}
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  return hasRequiredReactJsxRuntime_development || (hasRequiredReactJsxRuntime_development = 1, process.env.NODE_ENV !== "production" && function() {
    function e(F) {
      if (F == null) return null;
      if (typeof F == "function")
        return F.$$typeof === x ? null : F.displayName || F.name || null;
      if (typeof F == "string") return F;
      switch (F) {
        case C:
          return "Fragment";
        case S:
          return "Portal";
        case M:
          return "Profiler";
        case w:
          return "StrictMode";
        case L:
          return "Suspense";
        case V:
          return "SuspenseList";
      }
      if (typeof F == "object")
        switch (typeof F.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), F.$$typeof) {
          case j:
            return (F.displayName || "Context") + ".Provider";
          case O:
            return (F._context.displayName || "Context") + ".Consumer";
          case B:
            var U = F.render;
            return F = F.displayName, F || (F = U.displayName || U.name || "", F = F !== "" ? "ForwardRef(" + F + ")" : "ForwardRef"), F;
          case $:
            return U = F.displayName || null, U !== null ? U : e(F.type) || "Memo";
          case D:
            U = F._payload, F = F._init;
            try {
              return e(F(U));
            } catch {
            }
        }
      return null;
    }
    function t(F) {
      return "" + F;
    }
    function r(F) {
      try {
        t(F);
        var U = !1;
      } catch {
        U = !0;
      }
      if (U) {
        U = console;
        var Y = U.error, ee = typeof Symbol == "function" && Symbol.toStringTag && F[Symbol.toStringTag] || F.constructor.name || "Object";
        return Y.call(
          U,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ee
        ), t(F);
      }
    }
    function i() {
    }
    function n() {
      if (z === 0) {
        J = console.log, q = console.info, se = console.warn, ie = console.error, ce = console.group, ue = console.groupCollapsed, fe = console.groupEnd;
        var F = {
          configurable: !0,
          enumerable: !0,
          value: i,
          writable: !0
        };
        Object.defineProperties(console, {
          info: F,
          log: F,
          warn: F,
          error: F,
          group: F,
          groupCollapsed: F,
          groupEnd: F
        });
      }
      z++;
    }
    function s() {
      if (z--, z === 0) {
        var F = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: R({}, F, { value: J }),
          info: R({}, F, { value: q }),
          warn: R({}, F, { value: se }),
          error: R({}, F, { value: ie }),
          group: R({}, F, { value: ce }),
          groupCollapsed: R({}, F, { value: ue }),
          groupEnd: R({}, F, { value: fe })
        });
      }
      0 > z && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function a(F) {
      if (pe === void 0)
        try {
          throw Error();
        } catch (Y) {
          var U = Y.stack.trim().match(/\n( *(at )?)/);
          pe = U && U[1] || "", ae = -1 < Y.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < Y.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + pe + F + ae;
    }
    function l(F, U) {
      if (!F || K) return "";
      var Y = ye.get(F);
      if (Y !== void 0) return Y;
      K = !0, Y = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var ee = null;
      ee = P.H, P.H = null, n();
      try {
        var oe = {
          DetermineComponentFrameRoot: function() {
            try {
              if (U) {
                var Te = function() {
                  throw Error();
                };
                if (Object.defineProperty(Te.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Te, []);
                  } catch (Ce) {
                    var Me = Ce;
                  }
                  Reflect.construct(F, [], Te);
                } else {
                  try {
                    Te.call();
                  } catch (Ce) {
                    Me = Ce;
                  }
                  F.call(Te.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ce) {
                  Me = Ce;
                }
                (Te = F()) && typeof Te.catch == "function" && Te.catch(function() {
                });
              }
            } catch (Ce) {
              if (Ce && Me && typeof Ce.stack == "string")
                return [Ce.stack, Me.stack];
            }
            return [null, null];
          }
        };
        oe.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var ne = Object.getOwnPropertyDescriptor(
          oe.DetermineComponentFrameRoot,
          "name"
        );
        ne && ne.configurable && Object.defineProperty(
          oe.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var re = oe.DetermineComponentFrameRoot(), Q = re[0], _e = re[1];
        if (Q && _e) {
          var me = Q.split(`
`), Pe = _e.split(`
`);
          for (re = ne = 0; ne < me.length && !me[ne].includes(
            "DetermineComponentFrameRoot"
          ); )
            ne++;
          for (; re < Pe.length && !Pe[re].includes(
            "DetermineComponentFrameRoot"
          ); )
            re++;
          if (ne === me.length || re === Pe.length)
            for (ne = me.length - 1, re = Pe.length - 1; 1 <= ne && 0 <= re && me[ne] !== Pe[re]; )
              re--;
          for (; 1 <= ne && 0 <= re; ne--, re--)
            if (me[ne] !== Pe[re]) {
              if (ne !== 1 || re !== 1)
                do
                  if (ne--, re--, 0 > re || me[ne] !== Pe[re]) {
                    var Re = `
` + me[ne].replace(
                      " at new ",
                      " at "
                    );
                    return F.displayName && Re.includes("<anonymous>") && (Re = Re.replace("<anonymous>", F.displayName)), typeof F == "function" && ye.set(F, Re), Re;
                  }
                while (1 <= ne && 0 <= re);
              break;
            }
        }
      } finally {
        K = !1, P.H = ee, s(), Error.prepareStackTrace = Y;
      }
      return me = (me = F ? F.displayName || F.name : "") ? a(me) : "", typeof F == "function" && ye.set(F, me), me;
    }
    function o(F) {
      if (F == null) return "";
      if (typeof F == "function") {
        var U = F.prototype;
        return l(
          F,
          !(!U || !U.isReactComponent)
        );
      }
      if (typeof F == "string") return a(F);
      switch (F) {
        case L:
          return a("Suspense");
        case V:
          return a("SuspenseList");
      }
      if (typeof F == "object")
        switch (F.$$typeof) {
          case B:
            return F = l(F.render, !1), F;
          case $:
            return o(F.type);
          case D:
            U = F._payload, F = F._init;
            try {
              return o(F(U));
            } catch {
            }
        }
      return "";
    }
    function f() {
      var F = P.A;
      return F === null ? null : F.getOwner();
    }
    function c(F) {
      if (T.call(F, "key")) {
        var U = Object.getOwnPropertyDescriptor(F, "key").get;
        if (U && U.isReactWarning) return !1;
      }
      return F.key !== void 0;
    }
    function v(F, U) {
      function Y() {
        ge || (ge = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          U
        ));
      }
      Y.isReactWarning = !0, Object.defineProperty(F, "key", {
        get: Y,
        configurable: !0
      });
    }
    function h() {
      var F = e(this.type);
      return xe[F] || (xe[F] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), F = this.props.ref, F !== void 0 ? F : null;
    }
    function g(F, U, Y, ee, oe, ne) {
      return Y = ne.ref, F = {
        $$typeof: E,
        type: F,
        key: U,
        props: ne,
        _owner: oe
      }, (Y !== void 0 ? Y : null) !== null ? Object.defineProperty(F, "ref", {
        enumerable: !1,
        get: h
      }) : Object.defineProperty(F, "ref", { enumerable: !1, value: null }), F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(F, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    }
    function m(F, U, Y, ee, oe, ne) {
      if (typeof F == "string" || typeof F == "function" || F === C || F === M || F === w || F === L || F === V || F === A || typeof F == "object" && F !== null && (F.$$typeof === D || F.$$typeof === $ || F.$$typeof === j || F.$$typeof === O || F.$$typeof === B || F.$$typeof === N || F.getModuleId !== void 0)) {
        var re = U.children;
        if (re !== void 0)
          if (ee)
            if (H(re)) {
              for (ee = 0; ee < re.length; ee++)
                p(re[ee], F);
              Object.freeze && Object.freeze(re);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else p(re, F);
      } else
        re = "", (F === void 0 || typeof F == "object" && F !== null && Object.keys(F).length === 0) && (re += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), F === null ? ee = "null" : H(F) ? ee = "array" : F !== void 0 && F.$$typeof === E ? (ee = "<" + (e(F.type) || "Unknown") + " />", re = " Did you accidentally export a JSX literal instead of a component?") : ee = typeof F, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          ee,
          re
        );
      if (T.call(U, "key")) {
        re = e(F);
        var Q = Object.keys(U).filter(function(me) {
          return me !== "key";
        });
        ee = 0 < Q.length ? "{key: someKey, " + Q.join(": ..., ") + ": ...}" : "{key: someKey}", be[re + ee] || (Q = 0 < Q.length ? "{" + Q.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ee,
          re,
          Q,
          re
        ), be[re + ee] = !0);
      }
      if (re = null, Y !== void 0 && (r(Y), re = "" + Y), c(U) && (r(U.key), re = "" + U.key), "key" in U) {
        Y = {};
        for (var _e in U)
          _e !== "key" && (Y[_e] = U[_e]);
      } else Y = U;
      return re && v(
        Y,
        typeof F == "function" ? F.displayName || F.name || "Unknown" : F
      ), g(F, re, ne, oe, f(), Y);
    }
    function p(F, U) {
      if (typeof F == "object" && F && F.$$typeof !== Ee) {
        if (H(F))
          for (var Y = 0; Y < F.length; Y++) {
            var ee = F[Y];
            b(ee) && u(ee, U);
          }
        else if (b(F))
          F._store && (F._store.validated = 1);
        else if (F === null || typeof F != "object" ? Y = null : (Y = k && F[k] || F["@@iterator"], Y = typeof Y == "function" ? Y : null), typeof Y == "function" && Y !== F.entries && (Y = Y.call(F), Y !== F))
          for (; !(F = Y.next()).done; )
            b(F.value) && u(F.value, U);
      }
    }
    function b(F) {
      return typeof F == "object" && F !== null && F.$$typeof === E;
    }
    function u(F, U) {
      if (F._store && !F._store.validated && F.key == null && (F._store.validated = 1, U = y(U), !de[U])) {
        de[U] = !0;
        var Y = "";
        F && F._owner != null && F._owner !== f() && (Y = null, typeof F._owner.tag == "number" ? Y = e(F._owner.type) : typeof F._owner.name == "string" && (Y = F._owner.name), Y = " It was passed a child from " + Y + ".");
        var ee = P.getCurrentStack;
        P.getCurrentStack = function() {
          var oe = o(F.type);
          return ee && (oe += ee() || ""), oe;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          U,
          Y
        ), P.getCurrentStack = ee;
      }
    }
    function y(F) {
      var U = "", Y = f();
      return Y && (Y = e(Y.type)) && (U = `

Check the render method of \`` + Y + "`."), U || (F = e(F)) && (U = `

Check the top-level render call using <` + F + ">."), U;
    }
    var d = requireReact(), E = Symbol.for("react.transitional.element"), S = Symbol.for("react.portal"), C = Symbol.for("react.fragment"), w = Symbol.for("react.strict_mode"), M = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), j = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), L = Symbol.for("react.suspense"), V = Symbol.for("react.suspense_list"), $ = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), A = Symbol.for("react.offscreen"), k = Symbol.iterator, x = Symbol.for("react.client.reference"), P = d.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = Object.prototype.hasOwnProperty, R = Object.assign, N = Symbol.for("react.client.reference"), H = Array.isArray, z = 0, J, q, se, ie, ce, ue, fe;
    i.__reactDisabledLog = !0;
    var pe, ae, K = !1, ye = new (typeof WeakMap == "function" ? WeakMap : Map)(), Ee = Symbol.for("react.client.reference"), ge, xe = {}, be = {}, de = {};
    reactJsxRuntime_development.Fragment = C, reactJsxRuntime_development.jsx = function(F, U, Y, ee, oe) {
      return m(F, U, Y, !1, ee, oe);
    }, reactJsxRuntime_development.jsxs = function(F, U, Y, ee, oe) {
      return m(F, U, Y, !0, ee, oe);
    };
  }()), reactJsxRuntime_development;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  return hasRequiredJsxRuntime || (hasRequiredJsxRuntime = 1, process.env.NODE_ENV === "production" ? jsxRuntime.exports = requireReactJsxRuntime_production() : jsxRuntime.exports = requireReactJsxRuntime_development()), jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime(), reactExports = requireReact();
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
function _array_like_to_array(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, i = new Array(t); r < t; r++) i[r] = e[r];
  return i;
}
function _array_with_holes(e) {
  if (Array.isArray(e)) return e;
}
function _array_without_holes(e) {
  if (Array.isArray(e)) return _array_like_to_array(e);
}
function _class_call_check(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, t) {
  for (var r = 0; r < t.length; r++) {
    var i = t[r];
    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
  }
}
function _create_class(e, t, r) {
  return t && _defineProperties(e.prototype, t), r && _defineProperties(e, r), e;
}
function _define_property(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function _instanceof(e, t) {
  return t != null && typeof Symbol < "u" && t[Symbol.hasInstance] ? !!t[Symbol.hasInstance](e) : e instanceof t;
}
function _iterable_to_array(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
}
function _iterable_to_array_limit(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var i = [], n = !0, s = !1, a, l;
    try {
      for (r = r.call(e); !(n = (a = r.next()).done) && (i.push(a.value), !(t && i.length === t)); n = !0)
        ;
    } catch (o) {
      s = !0, l = o;
    } finally {
      try {
        !n && r.return != null && r.return();
      } finally {
        if (s) throw l;
      }
    }
    return i;
  }
}
function _non_iterable_rest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {}, i = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (i = i.concat(Object.getOwnPropertySymbols(r).filter(function(n) {
      return Object.getOwnPropertyDescriptor(r, n).enumerable;
    }))), i.forEach(function(n) {
      _define_property(e, n, r[n]);
    });
  }
  return e;
}
function ownKeys(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(e);
    r.push.apply(r, i);
  }
  return r;
}
function _object_spread_props(e, t) {
  return t = t ?? {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
  }), e;
}
function _sliced_to_array(e, t) {
  return _array_with_holes(e) || _iterable_to_array_limit(e, t) || _unsupported_iterable_to_array(e, t) || _non_iterable_rest();
}
function _to_consumable_array(e) {
  return _array_without_holes(e) || _iterable_to_array(e) || _unsupported_iterable_to_array(e) || _non_iterable_spread();
}
function _type_of(e) {
  "@swc/helpers - typeof";
  return e && typeof Symbol < "u" && e.constructor === Symbol ? "symbol" : typeof e;
}
function _unsupported_iterable_to_array(e, t) {
  if (e) {
    if (typeof e == "string") return _array_like_to_array(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set") return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)) return _array_like_to_array(e, t);
  }
}
var Method = /* @__PURE__ */ function(e) {
  return e.POST = "POST", e.GET = "GET", e.PUT = "PUT", e.DELETE = "DELETE", e.PATCH = "PATCH", e;
}(Method || {}), Method_default = Method, RequesterResponse = /* @__PURE__ */ function() {
  function e(t) {
    _class_call_check(this, e), this.response = t, this.status = t.status;
  }
  return _create_class(e, [
    {
      key: "getData",
      value: function() {
        var r = this;
        return new Promise(function(i, n) {
          var s;
          if (r.data)
            return i(r.data);
          (!((s = r.response.headers.get("content-type")) === null || s === void 0) && s.includes("application/json") ? r.response.json() : r.response.text()).then(function(a) {
            r.data = a, i(r.data);
          });
        });
      }
    },
    {
      key: "getHeaders",
      value: function() {
        return this.response.headers;
      }
    }
  ]), e;
}(), Response_default = RequesterResponse, InterceptEvent = /* @__PURE__ */ function(e) {
  return e[e.PRE_REQUEST = 0] = "PRE_REQUEST", e[e.POST_REQUEST = 1] = "POST_REQUEST", e[e.PRE_RESPONSE = 2] = "PRE_RESPONSE", e[e.POST_RESPONSE = 3] = "POST_RESPONSE", e;
}(InterceptEvent || {}), InterceptEvent_default = InterceptEvent, RequestBodyType = /* @__PURE__ */ function(e) {
  return e.FormData = "form-data", e.Urlencoded = "x-www-form-urlencoded", e.JSON = "raw-json", e.Text = "raw-text", e.Xml = "raw-xml", e.Html = "raw-html", e.Javascript = "raw-javascript", e.Binary = "binary", e;
}(RequestBodyType || {}), _obj, RequestBodyTypeHeaders = (_obj = {}, _define_property(_obj, "form-data", {}), _define_property(_obj, "x-www-form-urlencoded", {
  "Content-Type": "application/x-www-form-urlencoded"
}), _define_property(_obj, "raw-json", {
  "Content-Type": "application/json"
}), _define_property(_obj, "raw-text", {
  "Content-Type": "text/plain"
}), _define_property(_obj, "raw-html", {
  "Content-Type": "text/html"
}), _define_property(_obj, "raw-xml", {
  "Content-Type": "text/xml"
}), _define_property(_obj, "raw-javascript", {
  "Content-Type": "text/javascript"
}), _define_property(_obj, "binary", {
  "Content-Type": "application/octet-stream"
}), _obj), RequestBodyType_default = RequestBodyType, convertFormDataToObject = function(e) {
  var t = {};
  return e.forEach(function(r, i) {
    var n, s = (n = i.match(/\w+/gi)) !== null && n !== void 0 ? n : [];
    if (!s.length)
      throw new Error("Invalid Form Data Key: " + i);
    var a = s.pop(), l = i.endsWith("[]"), o = t;
    if ((s || []).forEach(function(c) {
      var v;
      o[c] = _object_spread({}, (v = o[c]) !== null && v !== void 0 ? v : {}), o = o[c];
    }), a) {
      var f;
      o[a] = l ? _to_consumable_array((f = o[a]) !== null && f !== void 0 ? f : []).concat([
        r
      ]) : r;
    }
  }), t;
}, convertObjectToFormData = function(e, t, r) {
  t = t || new FormData();
  for (var i in e) {
    var n = e[i], s = _to_consumable_array(r || []).concat([
      i
    ]);
    if (_instanceof(n, Object) && !_instanceof(n, File)) {
      t = convertObjectToFormData(n, t, s);
      continue;
    }
    var a = s.shift() + s.map(function(l) {
      return "[" + l + "]";
    }).join("");
    t.set(a, n);
  }
  return t;
}, convertObjectToURLSearchParams = function(e) {
  var t = convertObjectToFormData(e);
  return new URLSearchParams(Object.fromEntries(t.entries()));
}, convertURLSearchParamsToObject = function(e) {
  var t = {};
  return e.forEach(function(r, i) {
    var n = i.match(/\w+/gi), s = Object.create(n).pop(), a = t;
    (n || []).forEach(function(l) {
      l === s ? a[l] = i.match(/\[]$/i) ? Object.assign(a[l] || [], [
        r
      ]) : r : (a[l] = a[l] || {}, a = a[l]);
    });
  }), t;
}, _Requester = /* @__PURE__ */ function() {
  function e(t) {
    _class_call_check(this, e), this.config = _object_spread({}, t, e.defaults);
  }
  return _create_class(e, [
    {
      key: "fetch",
      value: function(r) {
        var i = r.url, n = r.method, s = n === void 0 ? Method_default.GET : n, a = r.body, l = r.query, o = r.signal, f = r.auth, c = r.headers, v, h, g;
        i = new URL(i, ((v = this.config) === null || v === void 0 ? void 0 : v.baseURL) || void 0), f ?? (f = (h = this.config) === null || h === void 0 ? void 0 : h.authorization);
        var m = new URLSearchParams(_object_spread({}, l ? Object.fromEntries(_instanceof(l, URLSearchParams) ? l : _instanceof(l, FormData) ? convertObjectToURLSearchParams(convertFormDataToObject(l)) : new URLSearchParams(l)) : {}, Object.fromEntries(i.searchParams), new URLSearchParams((f == null ? void 0 : f.getQuery()) || {})));
        i.search = m.toString();
        var p = new AbortController(), b = {
          signal: o || p.signal,
          method: s || Method_default.GET,
          // ...(auth ? { credentials: 'include' } : {}),
          headers: _object_spread({}, c || {}, (f == null ? void 0 : f.getHeaders()) || {}, ((g = this.config) === null || g === void 0 ? void 0 : g.headers) || {})
        };
        switch (s) {
          case Method_default.POST:
            b = _object_spread_props(_object_spread({}, b), {
              body: a
            });
        }
        var u = setTimeout(function() {
          return p == null ? void 0 : p.abort();
        }, this.config.timeout || 3e4);
        return e.interceptors.filter(function(y) {
          var d = _sliced_to_array(y, 1), E = d[0];
          return E === InterceptEvent_default.PRE_REQUEST;
        }).forEach(function(y) {
          var d = _sliced_to_array(y, 2);
          d[0];
          var E = d[1];
          b = E(b);
        }), new Promise(function(y, d) {
          fetch(i, b).then(function(E) {
            e.interceptors.filter(function(S) {
              var C = _sliced_to_array(S, 1), w = C[0];
              return w === InterceptEvent_default.PRE_RESPONSE;
            }).forEach(function(S) {
              var C = _sliced_to_array(S, 2);
              C[0];
              var w = C[1];
              E = w(E);
            }), y(new Response_default(E)), e.interceptors.filter(function(S) {
              var C = _sliced_to_array(S, 1), w = C[0];
              return w === InterceptEvent_default.POST_RESPONSE;
            }).forEach(function(S) {
              var C = _sliced_to_array(S, 2);
              C[0];
              var w = C[1];
              E = w(E);
            });
          }).catch(function(E) {
            return d(E);
          }).finally(function() {
            return clearTimeout(u);
          });
        });
      }
    },
    {
      key: "post",
      value: function(r, i, n) {
        var s = null;
        switch (n || (n = RequestBodyType_default.JSON), typeof i > "u" ? "undefined" : _type_of(i)) {
          case "string": {
            try {
              s = JSON.parse(i);
            } catch {
            }
            break;
          }
          case "object": {
            s = _instanceof(i, FormData) ? convertFormDataToObject(i) : i;
            break;
          }
        }
        var a = s ? convertObjectToFormData(s) : null;
        switch (n) {
          case RequestBodyType_default.Urlencoded: {
            i = s ? convertObjectToURLSearchParams(s).toString() : i;
            break;
          }
          case RequestBodyType_default.FormData: {
            i = a || i;
            break;
          }
          case RequestBodyType_default.JSON: {
            i = s ? JSON.stringify(s) : i;
            break;
          }
        }
        return this.fetch({
          url: r,
          method: Method_default.POST,
          body: i,
          headers: RequestBodyTypeHeaders[n]
        });
      }
    },
    {
      key: "get",
      value: function(r, i) {
        return _instanceof(i, URLSearchParams) || (i = convertObjectToURLSearchParams(i)), this.fetch({
          url: r,
          method: Method_default.GET,
          query: i
        });
      }
    }
  ], [
    {
      key: "on",
      value: function(r, i) {
        return this.interceptors.push([
          r,
          i
        ]);
      }
    },
    {
      key: "off",
      value: function(r) {
        this.interceptors[r] !== void 0 && this.interceptors.splice(r, 1);
      }
    }
  ]), e;
}();
_Requester.interceptors = [];
_Requester.defaults = {
  timeout: 3e3
};
var Requester = _Requester, Requester_default = Requester;
class Exception {
  constructor(t = 0, r, i) {
    Fe(this, "code");
    Fe(this, "detail");
    Fe(this, "trace");
    this.code = t, this.detail = r, this.trace = i;
  }
}
class HttpException extends Exception {
  constructor(r, i, n) {
    super(0, i, n);
    Fe(this, "status", 400);
    this.status = r;
  }
}
class ErrorBoundary extends reactExports.Component {
  constructor(r) {
    super(r);
    Fe(this, "promiseRejectionHandler", (r) => {
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
    return this.state.hasError ? reactExports.cloneElement(
      this.props.fallback,
      {
        error: this.state.error
      }
    ) : this.props.children;
  }
}
const Base = reactExports.memo(({ children: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e })), Error$1 = reactExports.memo(({ error: e }) => (e ?? (e = new HttpException(404, "Page not found.")), /* @__PURE__ */ jsxRuntimeExports.jsx(Base, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content d-flex flex-column", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "display-1", children: e.status || "Error" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-secondary", children: e.detail }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "btn btn-primary", href: "#", children: "Back to home" }) })
] }) }) })));
var dist = {}, hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1, Object.defineProperty(dist, "__esModule", { value: !0 }), dist.parse = a, dist.serialize = f;
  const e = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, t = /^[\u0021-\u003A\u003C-\u007E]*$/, r = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, i = /^[\u0020-\u003A\u003D-\u007E]*$/, n = Object.prototype.toString, s = /* @__PURE__ */ (() => {
    const h = function() {
    };
    return h.prototype = /* @__PURE__ */ Object.create(null), h;
  })();
  function a(h, g) {
    const m = new s(), p = h.length;
    if (p < 2)
      return m;
    const b = (g == null ? void 0 : g.decode) || c;
    let u = 0;
    do {
      const y = h.indexOf("=", u);
      if (y === -1)
        break;
      const d = h.indexOf(";", u), E = d === -1 ? p : d;
      if (y > E) {
        u = h.lastIndexOf(";", y - 1) + 1;
        continue;
      }
      const S = l(h, u, y), C = o(h, y, S), w = h.slice(S, C);
      if (m[w] === void 0) {
        let M = l(h, y + 1, E), O = o(h, E, M);
        const j = b(h.slice(M, O));
        m[w] = j;
      }
      u = E + 1;
    } while (u < p);
    return m;
  }
  function l(h, g, m) {
    do {
      const p = h.charCodeAt(g);
      if (p !== 32 && p !== 9)
        return g;
    } while (++g < m);
    return m;
  }
  function o(h, g, m) {
    for (; g > m; ) {
      const p = h.charCodeAt(--g);
      if (p !== 32 && p !== 9)
        return g + 1;
    }
    return m;
  }
  function f(h, g, m) {
    const p = (m == null ? void 0 : m.encode) || encodeURIComponent;
    if (!e.test(h))
      throw new TypeError(`argument name is invalid: ${h}`);
    const b = p(g);
    if (!t.test(b))
      throw new TypeError(`argument val is invalid: ${g}`);
    let u = h + "=" + b;
    if (!m)
      return u;
    if (m.maxAge !== void 0) {
      if (!Number.isInteger(m.maxAge))
        throw new TypeError(`option maxAge is invalid: ${m.maxAge}`);
      u += "; Max-Age=" + m.maxAge;
    }
    if (m.domain) {
      if (!r.test(m.domain))
        throw new TypeError(`option domain is invalid: ${m.domain}`);
      u += "; Domain=" + m.domain;
    }
    if (m.path) {
      if (!i.test(m.path))
        throw new TypeError(`option path is invalid: ${m.path}`);
      u += "; Path=" + m.path;
    }
    if (m.expires) {
      if (!v(m.expires) || !Number.isFinite(m.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${m.expires}`);
      u += "; Expires=" + m.expires.toUTCString();
    }
    if (m.httpOnly && (u += "; HttpOnly"), m.secure && (u += "; Secure"), m.partitioned && (u += "; Partitioned"), m.priority)
      switch (typeof m.priority == "string" ? m.priority.toLowerCase() : void 0) {
        case "low":
          u += "; Priority=Low";
          break;
        case "medium":
          u += "; Priority=Medium";
          break;
        case "high":
          u += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${m.priority}`);
      }
    if (m.sameSite)
      switch (typeof m.sameSite == "string" ? m.sameSite.toLowerCase() : m.sameSite) {
        case !0:
        case "strict":
          u += "; SameSite=Strict";
          break;
        case "lax":
          u += "; SameSite=Lax";
          break;
        case "none":
          u += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${m.sameSite}`);
      }
    return u;
  }
  function c(h) {
    if (h.indexOf("%") === -1)
      return h;
    try {
      return decodeURIComponent(h);
    } catch {
      return h;
    }
  }
  function v(h) {
    return n.call(h) === "[object Date]";
  }
  return dist;
}
requireDist();
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
function invariant(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function warning(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function createPath({
  pathname: e = "/",
  search: t = "",
  hash: r = ""
}) {
  return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), r && r !== "#" && (e += r.charAt(0) === "#" ? r : "#" + r), e;
}
function parsePath(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substring(r), e = e.substring(0, r));
    let i = e.indexOf("?");
    i >= 0 && (t.search = e.substring(i), e = e.substring(0, i)), e && (t.pathname = e);
  }
  return t;
}
function matchRoutes(e, t, r = "/") {
  return matchRoutesImpl(e, t, r, !1);
}
function matchRoutesImpl(e, t, r, i) {
  let n = typeof t == "string" ? parsePath(t) : t, s = stripBasename(n.pathname || "/", r);
  if (s == null)
    return null;
  let a = flattenRoutes(e);
  rankRouteBranches(a);
  let l = null;
  for (let o = 0; l == null && o < a.length; ++o) {
    let f = decodePath(s);
    l = matchRouteBranch(
      a[o],
      f,
      i
    );
  }
  return l;
}
function flattenRoutes(e, t = [], r = [], i = "") {
  let n = (s, a, l) => {
    let o = {
      relativePath: l === void 0 ? s.path || "" : l,
      caseSensitive: s.caseSensitive === !0,
      childrenIndex: a,
      route: s
    };
    o.relativePath.startsWith("/") && (invariant(
      o.relativePath.startsWith(i),
      `Absolute route path "${o.relativePath}" nested under path "${i}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
    ), o.relativePath = o.relativePath.slice(i.length));
    let f = joinPaths([i, o.relativePath]), c = r.concat(o);
    s.children && s.children.length > 0 && (invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      s.index !== !0,
      `Index routes must not have child routes. Please remove all child routes from route path "${f}".`
    ), flattenRoutes(s.children, t, c, f)), !(s.path == null && !s.index) && t.push({
      path: f,
      score: computeScore(f, s.index),
      routesMeta: c
    });
  };
  return e.forEach((s, a) => {
    var l;
    if (s.path === "" || !((l = s.path) != null && l.includes("?")))
      n(s, a);
    else
      for (let o of explodeOptionalSegments(s.path))
        n(s, a, o);
  }), t;
}
function explodeOptionalSegments(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [r, ...i] = t, n = r.endsWith("?"), s = r.replace(/\?$/, "");
  if (i.length === 0)
    return n ? [s, ""] : [s];
  let a = explodeOptionalSegments(i.join("/")), l = [];
  return l.push(
    ...a.map(
      (o) => o === "" ? s : [s, o].join("/")
    )
  ), n && l.push(...a), l.map(
    (o) => e.startsWith("/") && o === "" ? "/" : o
  );
}
function rankRouteBranches(e) {
  e.sort(
    (t, r) => t.score !== r.score ? r.score - t.score : compareIndexes(
      t.routesMeta.map((i) => i.childrenIndex),
      r.routesMeta.map((i) => i.childrenIndex)
    )
  );
}
var paramRe = /^:[\w-]+$/, dynamicSegmentValue = 3, indexRouteValue = 2, emptySegmentValue = 1, staticSegmentValue = 10, splatPenalty = -2, isSplat = (e) => e === "*";
function computeScore(e, t) {
  let r = e.split("/"), i = r.length;
  return r.some(isSplat) && (i += splatPenalty), t && (i += indexRouteValue), r.filter((n) => !isSplat(n)).reduce(
    (n, s) => n + (paramRe.test(s) ? dynamicSegmentValue : s === "" ? emptySegmentValue : staticSegmentValue),
    i
  );
}
function compareIndexes(e, t) {
  return e.length === t.length && e.slice(0, -1).every((i, n) => i === t[n]) ? (
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
function matchRouteBranch(e, t, r = !1) {
  let { routesMeta: i } = e, n = {}, s = "/", a = [];
  for (let l = 0; l < i.length; ++l) {
    let o = i[l], f = l === i.length - 1, c = s === "/" ? t : t.slice(s.length) || "/", v = matchPath(
      { path: o.relativePath, caseSensitive: o.caseSensitive, end: f },
      c
    ), h = o.route;
    if (!v && f && r && !i[i.length - 1].route.index && (v = matchPath(
      {
        path: o.relativePath,
        caseSensitive: o.caseSensitive,
        end: !1
      },
      c
    )), !v)
      return null;
    Object.assign(n, v.params), a.push({
      // TODO: Can this as be avoided?
      params: n,
      pathname: joinPaths([s, v.pathname]),
      pathnameBase: normalizePathname(
        joinPaths([s, v.pathnameBase])
      ),
      route: h
    }), v.pathnameBase !== "/" && (s = joinPaths([s, v.pathnameBase]));
  }
  return a;
}
function generatePath(e, t = {}) {
  let r = e;
  r.endsWith("*") && r !== "*" && !r.endsWith("/*") && (warning(
    !1,
    `Route path "${r}" will be treated as if it were "${r.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/, "/*")}".`
  ), r = r.replace(/\*$/, "/*"));
  const i = r.startsWith("/") ? "/" : "", n = (a) => a == null ? "" : typeof a == "string" ? a : String(a), s = r.split(/\/+/).map((a, l, o) => {
    if (l === o.length - 1 && a === "*")
      return n(t["*"]);
    const c = a.match(/^:([\w-]+)(\??)$/);
    if (c) {
      const [, v, h] = c;
      let g = t[v];
      return invariant(h === "?" || g != null, `Missing ":${v}" param`), n(g);
    }
    return a.replace(/\?$/g, "");
  }).filter((a) => !!a);
  return i + s.join("/");
}
function matchPath(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [r, i] = compilePath(
    e.path,
    e.caseSensitive,
    e.end
  ), n = t.match(r);
  if (!n) return null;
  let s = n[0], a = s.replace(/(.)\/+$/, "$1"), l = n.slice(1);
  return {
    params: i.reduce(
      (f, { paramName: c, isOptional: v }, h) => {
        if (c === "*") {
          let m = l[h] || "";
          a = s.slice(0, s.length - m.length).replace(/(.)\/+$/, "$1");
        }
        const g = l[h];
        return v && !g ? f[c] = void 0 : f[c] = (g || "").replace(/%2F/g, "/"), f;
      },
      {}
    ),
    pathname: s,
    pathnameBase: a,
    pattern: e
  };
}
function compilePath(e, t = !1, r = !0) {
  warning(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`
  );
  let i = [], n = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(
    /\/:([\w-]+)(\?)?/g,
    (a, l, o) => (i.push({ paramName: l, isOptional: o != null }), o ? "/?([^\\/]+)?" : "/([^\\/]+)")
  );
  return e.endsWith("*") ? (i.push({ paramName: "*" }), n += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : r ? n += "\\/*$" : e !== "" && e !== "/" && (n += "(?:(?=\\/|$))"), [new RegExp(n, t ? void 0 : "i"), i];
}
function decodePath(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return warning(
      !1,
      `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
    ), e;
  }
}
function stripBasename(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, i = e.charAt(r);
  return i && i !== "/" ? null : e.slice(r) || "/";
}
function resolvePath(e, t = "/") {
  let {
    pathname: r,
    search: i = "",
    hash: n = ""
  } = typeof e == "string" ? parsePath(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : resolvePathname(r, t) : t,
    search: normalizeSearch(i),
    hash: normalizeHash(n)
  };
}
function resolvePathname(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((n) => {
    n === ".." ? r.length > 1 && r.pop() : n !== "." && r.push(n);
  }), r.length > 1 ? r.join("/") : "/";
}
function getInvalidPathError(e, t, r, i) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    i
  )}].  Please separate it out to the \`to.${r}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function getPathContributingMatches(e) {
  return e.filter(
    (t, r) => r === 0 || t.route.path && t.route.path.length > 0
  );
}
function getResolveToMatches(e) {
  let t = getPathContributingMatches(e);
  return t.map(
    (r, i) => i === t.length - 1 ? r.pathname : r.pathnameBase
  );
}
function resolveTo(e, t, r, i = !1) {
  let n;
  typeof e == "string" ? n = parsePath(e) : (n = { ...e }, invariant(
    !n.pathname || !n.pathname.includes("?"),
    getInvalidPathError("?", "pathname", "search", n)
  ), invariant(
    !n.pathname || !n.pathname.includes("#"),
    getInvalidPathError("#", "pathname", "hash", n)
  ), invariant(
    !n.search || !n.search.includes("#"),
    getInvalidPathError("#", "search", "hash", n)
  ));
  let s = e === "" || n.pathname === "", a = s ? "/" : n.pathname, l;
  if (a == null)
    l = r;
  else {
    let v = t.length - 1;
    if (!i && a.startsWith("..")) {
      let h = a.split("/");
      for (; h[0] === ".."; )
        h.shift(), v -= 1;
      n.pathname = h.join("/");
    }
    l = v >= 0 ? t[v] : "/";
  }
  let o = resolvePath(n, l), f = a && a !== "/" && a.endsWith("/"), c = (s || a === ".") && r.endsWith("/");
  return !o.pathname.endsWith("/") && (f || c) && (o.pathname += "/"), o;
}
var joinPaths = (e) => e.join("/").replace(/\/\/+/g, "/"), normalizePathname = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), normalizeSearch = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, normalizeHash = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function isRouteErrorResponse(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
var validMutationMethodsArr = [
  "POST",
  "PUT",
  "PATCH",
  "DELETE"
];
new Set(
  validMutationMethodsArr
);
var validRequestMethodsArr = [
  "GET",
  ...validMutationMethodsArr
];
new Set(validRequestMethodsArr);
var DataRouterContext = reactExports.createContext(null);
DataRouterContext.displayName = "DataRouter";
var DataRouterStateContext = reactExports.createContext(null);
DataRouterStateContext.displayName = "DataRouterState";
var ViewTransitionContext = reactExports.createContext({
  isTransitioning: !1
});
ViewTransitionContext.displayName = "ViewTransition";
var FetchersContext = reactExports.createContext(
  /* @__PURE__ */ new Map()
);
FetchersContext.displayName = "Fetchers";
var AwaitContext = reactExports.createContext(null);
AwaitContext.displayName = "Await";
var NavigationContext = reactExports.createContext(
  null
);
NavigationContext.displayName = "Navigation";
var LocationContext = reactExports.createContext(
  null
);
LocationContext.displayName = "Location";
var RouteContext = reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
RouteContext.displayName = "Route";
var RouteErrorContext = reactExports.createContext(null);
RouteErrorContext.displayName = "RouteError";
function useHref(e, { relative: t } = {}) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: r, navigator: i } = reactExports.useContext(NavigationContext), { hash: n, pathname: s, search: a } = useResolvedPath(e, { relative: t }), l = s;
  return r !== "/" && (l = s === "/" ? r : joinPaths([r, s])), i.createHref({ pathname: l, search: a, hash: n });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  return invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), reactExports.useContext(LocationContext).location;
}
var navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function useIsomorphicLayoutEffect(e) {
  reactExports.useContext(NavigationContext).static || reactExports.useLayoutEffect(e);
}
function useNavigate() {
  let { isDataRoute: e } = reactExports.useContext(RouteContext);
  return e ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = reactExports.useContext(DataRouterContext), { basename: t, navigator: r } = reactExports.useContext(NavigationContext), { matches: i } = reactExports.useContext(RouteContext), { pathname: n } = useLocation(), s = JSON.stringify(getResolveToMatches(i)), a = reactExports.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    a.current = !0;
  }), reactExports.useCallback(
    (o, f = {}) => {
      if (warning(a.current, navigateEffectWarning), !a.current) return;
      if (typeof o == "number") {
        r.go(o);
        return;
      }
      let c = resolveTo(
        o,
        JSON.parse(s),
        n,
        f.relative === "path"
      );
      e == null && t !== "/" && (c.pathname = c.pathname === "/" ? t : joinPaths([t, c.pathname])), (f.replace ? r.replace : r.push)(
        c,
        f.state,
        f
      );
    },
    [
      t,
      r,
      s,
      n,
      e
    ]
  );
}
reactExports.createContext(null);
function useParams() {
  let { matches: e } = reactExports.useContext(RouteContext), t = e[e.length - 1];
  return t ? t.params : {};
}
function useResolvedPath(e, { relative: t } = {}) {
  let { matches: r } = reactExports.useContext(RouteContext), { pathname: i } = useLocation(), n = JSON.stringify(getResolveToMatches(r));
  return reactExports.useMemo(
    () => resolveTo(
      e,
      JSON.parse(n),
      i,
      t === "path"
    ),
    [e, n, i, t]
  );
}
function useRoutesImpl(e, t, r, i) {
  invariant(
    useInRouterContext(),
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: n, static: s } = reactExports.useContext(NavigationContext), { matches: a } = reactExports.useContext(RouteContext), l = a[a.length - 1], o = l ? l.params : {}, f = l ? l.pathname : "/", c = l ? l.pathnameBase : "/", v = l && l.route;
  {
    let y = v && v.path || "";
    warningOnce(
      f,
      !v || y.endsWith("*") || y.endsWith("*?"),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${f}" (under <Route path="${y}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${y}"> to <Route path="${y === "/" ? "*" : `${y}/*`}">.`
    );
  }
  let h = useLocation(), g;
  g = h;
  let m = g.pathname || "/", p = m;
  if (c !== "/") {
    let y = c.replace(/^\//, "").split("/");
    p = "/" + m.replace(/^\//, "").split("/").slice(y.length).join("/");
  }
  let b = !s && r && r.matches && r.matches.length > 0 ? r.matches : matchRoutes(e, { pathname: p });
  return warning(
    v || b != null,
    `No routes matched location "${g.pathname}${g.search}${g.hash}" `
  ), warning(
    b == null || b[b.length - 1].route.element !== void 0 || b[b.length - 1].route.Component !== void 0 || b[b.length - 1].route.lazy !== void 0,
    `Matched leaf route at location "${g.pathname}${g.search}${g.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`
  ), _renderMatches(
    b && b.map(
      (y) => Object.assign({}, y, {
        params: Object.assign({}, o, y.params),
        pathname: joinPaths([
          c,
          // Re-encode pathnames that were decoded inside matchRoutes
          n.encodeLocation ? n.encodeLocation(y.pathname).pathname : y.pathname
        ]),
        pathnameBase: y.pathnameBase === "/" ? c : joinPaths([
          c,
          // Re-encode pathnames that were decoded inside matchRoutes
          n.encodeLocation ? n.encodeLocation(y.pathnameBase).pathname : y.pathnameBase
        ])
      })
    ),
    a,
    r,
    i
  );
}
function DefaultErrorComponent() {
  let e = useRouteError(), t = isRouteErrorResponse(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e), r = e instanceof Error ? e.stack : null, i = "rgba(200,200,200, 0.5)", n = { padding: "0.5rem", backgroundColor: i }, s = { padding: "2px 4px", backgroundColor: i }, a = null;
  return console.error(
    "Error handled by React Router default ErrorBoundary:",
    e
  ), a = /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ reactExports.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ reactExports.createElement("code", { style: s }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ reactExports.createElement("code", { style: s }, "errorElement"), " prop on your route.")), /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", { style: { fontStyle: "italic" } }, t), r ? /* @__PURE__ */ reactExports.createElement("pre", { style: n }, r) : null, a);
}
var defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null), RenderErrorBoundary = class extends reactExports.Component {
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
    return this.state.error !== void 0 ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: this.props.routeContext }, /* @__PURE__ */ reactExports.createElement(
      RouteErrorContext.Provider,
      {
        value: this.state.error,
        children: this.props.component
      }
    )) : this.props.children;
  }
};
function RenderedRoute({ routeContext: e, match: t, children: r }) {
  let i = reactExports.useContext(DataRouterContext);
  return i && i.static && i.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (i.staticContext._deepestRenderedBoundaryId = t.route.id), /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, { value: e }, r);
}
function _renderMatches(e, t = [], r = null, i = null) {
  if (e == null) {
    if (!r)
      return null;
    if (r.errors)
      e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0)
      e = r.matches;
    else
      return null;
  }
  let n = e, s = r == null ? void 0 : r.errors;
  if (s != null) {
    let o = n.findIndex(
      (f) => f.route.id && (s == null ? void 0 : s[f.route.id]) !== void 0
    );
    invariant(
      o >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        s
      ).join(",")}`
    ), n = n.slice(
      0,
      Math.min(n.length, o + 1)
    );
  }
  let a = !1, l = -1;
  if (r)
    for (let o = 0; o < n.length; o++) {
      let f = n[o];
      if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (l = o), f.route.id) {
        let { loaderData: c, errors: v } = r, h = f.route.loader && !c.hasOwnProperty(f.route.id) && (!v || v[f.route.id] === void 0);
        if (f.route.lazy || h) {
          a = !0, l >= 0 ? n = n.slice(0, l + 1) : n = [n[0]];
          break;
        }
      }
    }
  return n.reduceRight((o, f, c) => {
    let v, h = !1, g = null, m = null;
    r && (v = s && f.route.id ? s[f.route.id] : void 0, g = f.route.errorElement || defaultErrorElement, a && (l < 0 && c === 0 ? (warningOnce(
      "route-fallback",
      !1,
      "No `HydrateFallback` element provided to render during initial hydration"
    ), h = !0, m = null) : l === c && (h = !0, m = f.route.hydrateFallbackElement || null)));
    let p = t.concat(n.slice(0, c + 1)), b = () => {
      let u;
      return v ? u = g : h ? u = m : f.route.Component ? u = /* @__PURE__ */ reactExports.createElement(f.route.Component, null) : f.route.element ? u = f.route.element : u = o, /* @__PURE__ */ reactExports.createElement(
        RenderedRoute,
        {
          match: f,
          routeContext: {
            outlet: o,
            matches: p,
            isDataRoute: r != null
          },
          children: u
        }
      );
    };
    return r && (f.route.ErrorBoundary || f.route.errorElement || c === 0) ? /* @__PURE__ */ reactExports.createElement(
      RenderErrorBoundary,
      {
        location: r.location,
        revalidation: r.revalidation,
        component: g,
        error: v,
        children: b(),
        routeContext: { outlet: null, matches: p, isDataRoute: !0 }
      }
    ) : b();
  }, null);
}
function getDataRouterConsoleError(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext(e) {
  let t = reactExports.useContext(DataRouterContext);
  return invariant(t, getDataRouterConsoleError(e)), t;
}
function useDataRouterState(e) {
  let t = reactExports.useContext(DataRouterStateContext);
  return invariant(t, getDataRouterConsoleError(e)), t;
}
function useRouteContext(e) {
  let t = reactExports.useContext(RouteContext);
  return invariant(t, getDataRouterConsoleError(e)), t;
}
function useCurrentRouteId(e) {
  let t = useRouteContext(e), r = t.matches[t.matches.length - 1];
  return invariant(
    r.route.id,
    `${e} can only be used on routes that contain a unique "id"`
  ), r.route.id;
}
function useRouteId() {
  return useCurrentRouteId(
    "useRouteId"
    /* UseRouteId */
  );
}
function useRouteError() {
  var i;
  let e = reactExports.useContext(RouteErrorContext), t = useDataRouterState(
    "useRouteError"
    /* UseRouteError */
  ), r = useCurrentRouteId(
    "useRouteError"
    /* UseRouteError */
  );
  return e !== void 0 ? e : (i = t.errors) == null ? void 0 : i[r];
}
function useNavigateStable() {
  let { router: e } = useDataRouterContext(
    "useNavigate"
    /* UseNavigateStable */
  ), t = useCurrentRouteId(
    "useNavigate"
    /* UseNavigateStable */
  ), r = reactExports.useRef(!1);
  return useIsomorphicLayoutEffect(() => {
    r.current = !0;
  }), reactExports.useCallback(
    async (n, s = {}) => {
      warning(r.current, navigateEffectWarning), r.current && (typeof n == "number" ? e.navigate(n) : await e.navigate(n, { fromRouteId: t, ...s }));
    },
    [e, t]
  );
}
var alreadyWarned = {};
function warningOnce(e, t, r) {
  !t && !alreadyWarned[e] && (alreadyWarned[e] = !0, warning(!1, r));
}
reactExports.memo(DataRoutes);
function DataRoutes({
  routes: e,
  future: t,
  state: r
}) {
  return useRoutesImpl(e, void 0, r, t);
}
var defaultMethod = "get", defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(e) {
  return e != null && typeof e.tagName == "string";
}
function isButtonElement(e) {
  return isHtmlElement(e) && e.tagName.toLowerCase() === "button";
}
function isFormElement(e) {
  return isHtmlElement(e) && e.tagName.toLowerCase() === "form";
}
function isInputElement(e) {
  return isHtmlElement(e) && e.tagName.toLowerCase() === "input";
}
function isModifiedEvent(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function shouldProcessLinkClick(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(e);
}
function createSearchParams(e = "") {
  return new URLSearchParams(
    typeof e == "string" || Array.isArray(e) || e instanceof URLSearchParams ? e : Object.keys(e).reduce((t, r) => {
      let i = e[r];
      return t.concat(
        Array.isArray(i) ? i.map((n) => [r, n]) : [[r, i]]
      );
    }, [])
  );
}
function getSearchParamsForLocation(e, t) {
  let r = createSearchParams(e);
  return t && t.forEach((i, n) => {
    r.has(n) || t.getAll(n).forEach((s) => {
      r.append(n, s);
    });
  }), r;
}
var _formDataSupportsSubmitter = null;
function isFormDataSubmitterSupported() {
  if (_formDataSupportsSubmitter === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), _formDataSupportsSubmitter = !1;
    } catch {
      _formDataSupportsSubmitter = !0;
    }
  return _formDataSupportsSubmitter;
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain"
]);
function getFormEncType(e) {
  return e != null && !supportedFormEncTypes.has(e) ? (warning(
    !1,
    `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`
  ), null) : e;
}
function getFormSubmissionInfo(e, t) {
  let r, i, n, s, a;
  if (isFormElement(e)) {
    let l = e.getAttribute("action");
    i = l ? stripBasename(l, t) : null, r = e.getAttribute("method") || defaultMethod, n = getFormEncType(e.getAttribute("enctype")) || defaultEncType, s = new FormData(e);
  } else if (isButtonElement(e) || isInputElement(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let o = e.getAttribute("formaction") || l.getAttribute("action");
    if (i = o ? stripBasename(o, t) : null, r = e.getAttribute("formmethod") || l.getAttribute("method") || defaultMethod, n = getFormEncType(e.getAttribute("formenctype")) || getFormEncType(l.getAttribute("enctype")) || defaultEncType, s = new FormData(l, e), !isFormDataSubmitterSupported()) {
      let { name: f, type: c, value: v } = e;
      if (c === "image") {
        let h = f ? `${f}.` : "";
        s.append(`${h}x`, "0"), s.append(`${h}y`, "0");
      } else f && s.append(f, v);
    }
  } else {
    if (isHtmlElement(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    r = defaultMethod, i = null, n = defaultEncType, a = e;
  }
  return s && n === "text/plain" && (a = s, s = void 0), { action: i, method: r.toLowerCase(), encType: n, formData: s, body: a };
}
function invariant2(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
async function loadRouteModule(e, t) {
  if (e.id in t)
    return t[e.id];
  try {
    let r = await import(
      /* @vite-ignore */
      /* webpackIgnore: true */
      e.module
    );
    return t[e.id] = r, r;
  } catch (r) {
    return console.error(
      `Error loading route module \`${e.module}\`, reloading page...`
    ), console.error(r), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {
    });
  }
}
function isHtmlLinkDescriptor(e) {
  return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string";
}
async function getKeyedPrefetchLinks(e, t, r) {
  let i = await Promise.all(
    e.map(async (n) => {
      let s = t.routes[n.route.id];
      if (s) {
        let a = await loadRouteModule(s, r);
        return a.links ? a.links() : [];
      }
      return [];
    })
  );
  return dedupeLinkDescriptors(
    i.flat(1).filter(isHtmlLinkDescriptor).filter((n) => n.rel === "stylesheet" || n.rel === "preload").map(
      (n) => n.rel === "stylesheet" ? { ...n, rel: "prefetch", as: "style" } : { ...n, rel: "prefetch" }
    )
  );
}
function getNewMatchesForLinks(e, t, r, i, n, s) {
  let a = (o, f) => r[f] ? o.route.id !== r[f].route.id : !0, l = (o, f) => {
    var c;
    return (
      // param change, /users/123 -> /users/456
      r[f].pathname !== o.pathname || // splat param changed, which is not present in match.path
      // e.g. /files/images/avatar.jpg -> files/finances.xls
      ((c = r[f].route.path) == null ? void 0 : c.endsWith("*")) && r[f].params["*"] !== o.params["*"]
    );
  };
  return s === "assets" ? t.filter(
    (o, f) => a(o, f) || l(o, f)
  ) : s === "data" ? t.filter((o, f) => {
    var v;
    let c = i.routes[o.route.id];
    if (!c || !c.hasLoader)
      return !1;
    if (a(o, f) || l(o, f))
      return !0;
    if (o.route.shouldRevalidate) {
      let h = o.route.shouldRevalidate({
        currentUrl: new URL(
          n.pathname + n.search + n.hash,
          window.origin
        ),
        currentParams: ((v = r[0]) == null ? void 0 : v.params) || {},
        nextUrl: new URL(e, window.origin),
        nextParams: o.params,
        defaultShouldRevalidate: !0
      });
      if (typeof h == "boolean")
        return h;
    }
    return !0;
  }) : [];
}
function getModuleLinkHrefs(e, t, { includeHydrateFallback: r } = {}) {
  return dedupeHrefs(
    e.map((i) => {
      let n = t.routes[i.route.id];
      if (!n) return [];
      let s = [n.module];
      return n.clientActionModule && (s = s.concat(n.clientActionModule)), n.clientLoaderModule && (s = s.concat(n.clientLoaderModule)), r && n.hydrateFallbackModule && (s = s.concat(n.hydrateFallbackModule)), n.imports && (s = s.concat(n.imports)), s;
    }).flat(1)
  );
}
function dedupeHrefs(e) {
  return [...new Set(e)];
}
function sortKeys(e) {
  let t = {}, r = Object.keys(e).sort();
  for (let i of r)
    t[i] = e[i];
  return t;
}
function dedupeLinkDescriptors(e, t) {
  let r = /* @__PURE__ */ new Set();
  return new Set(t), e.reduce((i, n) => {
    let s = JSON.stringify(sortKeys(n));
    return r.has(s) || (r.add(s), i.push({ key: s, link: n })), i;
  }, []);
}
function singleFetchUrl(e, t) {
  let r = typeof e == "string" ? new URL(
    e,
    // This can be called during the SSR flow via PrefetchPageLinksImpl so
    // don't assume window is available
    typeof window > "u" ? "server://singlefetch/" : window.location.origin
  ) : e;
  return r.pathname === "/" ? r.pathname = "_root.data" : t && stripBasename(r.pathname, t) === "/" ? r.pathname = `${t.replace(/\/$/, "")}/_root.data` : r.pathname = `${r.pathname.replace(/\/$/, "")}.data`, r;
}
function useDataRouterContext2() {
  let e = reactExports.useContext(DataRouterContext);
  return invariant2(
    e,
    "You must render this element inside a <DataRouterContext.Provider> element"
  ), e;
}
function useDataRouterStateContext() {
  let e = reactExports.useContext(DataRouterStateContext);
  return invariant2(
    e,
    "You must render this element inside a <DataRouterStateContext.Provider> element"
  ), e;
}
var FrameworkContext = reactExports.createContext(void 0);
FrameworkContext.displayName = "FrameworkContext";
function useFrameworkContext() {
  let e = reactExports.useContext(FrameworkContext);
  return invariant2(
    e,
    "You must render this element inside a <HydratedRouter> element"
  ), e;
}
function usePrefetchBehavior(e, t) {
  let r = reactExports.useContext(FrameworkContext), [i, n] = reactExports.useState(!1), [s, a] = reactExports.useState(!1), { onFocus: l, onBlur: o, onMouseEnter: f, onMouseLeave: c, onTouchStart: v } = t, h = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (e === "render" && a(!0), e === "viewport") {
      let p = (u) => {
        u.forEach((y) => {
          a(y.isIntersecting);
        });
      }, b = new IntersectionObserver(p, { threshold: 0.5 });
      return h.current && b.observe(h.current), () => {
        b.disconnect();
      };
    }
  }, [e]), reactExports.useEffect(() => {
    if (i) {
      let p = setTimeout(() => {
        a(!0);
      }, 100);
      return () => {
        clearTimeout(p);
      };
    }
  }, [i]);
  let g = () => {
    n(!0);
  }, m = () => {
    n(!1), a(!1);
  };
  return r ? e !== "intent" ? [s, h, {}] : [
    s,
    h,
    {
      onFocus: composeEventHandlers(l, g),
      onBlur: composeEventHandlers(o, m),
      onMouseEnter: composeEventHandlers(f, g),
      onMouseLeave: composeEventHandlers(c, m),
      onTouchStart: composeEventHandlers(v, g)
    }
  ] : [!1, h, {}];
}
function composeEventHandlers(e, t) {
  return (r) => {
    e && e(r), r.defaultPrevented || t(r);
  };
}
function PrefetchPageLinks({
  page: e,
  ...t
}) {
  let { router: r } = useDataRouterContext2(), i = reactExports.useMemo(
    () => matchRoutes(r.routes, e, r.basename),
    [r.routes, e, r.basename]
  );
  return i ? /* @__PURE__ */ reactExports.createElement(PrefetchPageLinksImpl, { page: e, matches: i, ...t }) : null;
}
function useKeyedPrefetchLinks(e) {
  let { manifest: t, routeModules: r } = useFrameworkContext(), [i, n] = reactExports.useState([]);
  return reactExports.useEffect(() => {
    let s = !1;
    return getKeyedPrefetchLinks(e, t, r).then(
      (a) => {
        s || n(a);
      }
    ), () => {
      s = !0;
    };
  }, [e, t, r]), i;
}
function PrefetchPageLinksImpl({
  page: e,
  matches: t,
  ...r
}) {
  let i = useLocation(), { manifest: n, routeModules: s } = useFrameworkContext(), { basename: a } = useDataRouterContext2(), { loaderData: l, matches: o } = useDataRouterStateContext(), f = reactExports.useMemo(
    () => getNewMatchesForLinks(
      e,
      t,
      o,
      n,
      i,
      "data"
    ),
    [e, t, o, n, i]
  ), c = reactExports.useMemo(
    () => getNewMatchesForLinks(
      e,
      t,
      o,
      n,
      i,
      "assets"
    ),
    [e, t, o, n, i]
  ), v = reactExports.useMemo(() => {
    if (e === i.pathname + i.search + i.hash)
      return [];
    let m = /* @__PURE__ */ new Set(), p = !1;
    if (t.forEach((u) => {
      var d;
      let y = n.routes[u.route.id];
      !y || !y.hasLoader || (!f.some((E) => E.route.id === u.route.id) && u.route.id in l && ((d = s[u.route.id]) != null && d.shouldRevalidate) || y.hasClientLoader ? p = !0 : m.add(u.route.id));
    }), m.size === 0)
      return [];
    let b = singleFetchUrl(e, a);
    return p && m.size > 0 && b.searchParams.set(
      "_routes",
      t.filter((u) => m.has(u.route.id)).map((u) => u.route.id).join(",")
    ), [b.pathname + b.search];
  }, [
    a,
    l,
    i,
    n,
    f,
    t,
    e,
    s
  ]), h = reactExports.useMemo(
    () => getModuleLinkHrefs(c, n),
    [c, n]
  ), g = useKeyedPrefetchLinks(c);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, v.map((m) => /* @__PURE__ */ reactExports.createElement("link", { key: m, rel: "prefetch", as: "fetch", href: m, ...r })), h.map((m) => /* @__PURE__ */ reactExports.createElement("link", { key: m, rel: "modulepreload", href: m, ...r })), g.map(({ key: m, link: p }) => (
    // these don't spread `linkProps` because they are full link descriptors
    // already with their own props
    /* @__PURE__ */ reactExports.createElement("link", { key: m, ...p })
  )));
}
function mergeRefs(...e) {
  return (t) => {
    e.forEach((r) => {
      typeof r == "function" ? r(t) : r != null && (r.current = t);
    });
  };
}
var isBrowser = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
  isBrowser && (window.__reactRouterVersion = "7.3.0");
} catch {
}
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Link$1 = reactExports.forwardRef(
  function({
    onClick: t,
    discover: r = "render",
    prefetch: i = "none",
    relative: n,
    reloadDocument: s,
    replace: a,
    state: l,
    target: o,
    to: f,
    preventScrollReset: c,
    viewTransition: v,
    ...h
  }, g) {
    let { basename: m } = reactExports.useContext(NavigationContext), p = typeof f == "string" && ABSOLUTE_URL_REGEX2.test(f), b, u = !1;
    if (typeof f == "string" && p && (b = f, isBrowser))
      try {
        let O = new URL(window.location.href), j = f.startsWith("//") ? new URL(O.protocol + f) : new URL(f), B = stripBasename(j.pathname, m);
        j.origin === O.origin && B != null ? f = B + j.search + j.hash : u = !0;
      } catch {
        warning(
          !1,
          `<Link to="${f}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let y = useHref(f, { relative: n }), [d, E, S] = usePrefetchBehavior(
      i,
      h
    ), C = useLinkClickHandler(f, {
      replace: a,
      state: l,
      target: o,
      preventScrollReset: c,
      relative: n,
      viewTransition: v
    });
    function w(O) {
      t && t(O), O.defaultPrevented || C(O);
    }
    let M = (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      /* @__PURE__ */ reactExports.createElement(
        "a",
        {
          ...h,
          ...S,
          href: b || y,
          onClick: u || s ? t : w,
          ref: mergeRefs(g, E),
          target: o,
          "data-discover": !p && r === "render" ? "true" : void 0
        }
      )
    );
    return d && !p ? /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, M, /* @__PURE__ */ reactExports.createElement(PrefetchPageLinks, { page: y })) : M;
  }
);
Link$1.displayName = "Link";
var NavLink = reactExports.forwardRef(
  function({
    "aria-current": t = "page",
    caseSensitive: r = !1,
    className: i = "",
    end: n = !1,
    style: s,
    to: a,
    viewTransition: l,
    children: o,
    ...f
  }, c) {
    let v = useResolvedPath(a, { relative: f.relative }), h = useLocation(), g = reactExports.useContext(DataRouterStateContext), { navigator: m, basename: p } = reactExports.useContext(NavigationContext), b = g != null && // Conditional usage is OK here because the usage of a data router is static
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useViewTransitionState(v) && l === !0, u = m.encodeLocation ? m.encodeLocation(v).pathname : v.pathname, y = h.pathname, d = g && g.navigation && g.navigation.location ? g.navigation.location.pathname : null;
    r || (y = y.toLowerCase(), d = d ? d.toLowerCase() : null, u = u.toLowerCase()), d && p && (d = stripBasename(d, p) || d);
    const E = u !== "/" && u.endsWith("/") ? u.length - 1 : u.length;
    let S = y === u || !n && y.startsWith(u) && y.charAt(E) === "/", C = d != null && (d === u || !n && d.startsWith(u) && d.charAt(u.length) === "/"), w = {
      isActive: S,
      isPending: C,
      isTransitioning: b
    }, M = S ? t : void 0, O;
    typeof i == "function" ? O = i(w) : O = [
      i,
      S ? "active" : null,
      C ? "pending" : null,
      b ? "transitioning" : null
    ].filter(Boolean).join(" ");
    let j = typeof s == "function" ? s(w) : s;
    return /* @__PURE__ */ reactExports.createElement(
      Link$1,
      {
        ...f,
        "aria-current": M,
        className: O,
        ref: c,
        style: j,
        to: a,
        viewTransition: l
      },
      typeof o == "function" ? o(w) : o
    );
  }
);
NavLink.displayName = "NavLink";
var Form$1 = reactExports.forwardRef(
  ({
    discover: e = "render",
    fetcherKey: t,
    navigate: r,
    reloadDocument: i,
    replace: n,
    state: s,
    method: a = defaultMethod,
    action: l,
    onSubmit: o,
    relative: f,
    preventScrollReset: c,
    viewTransition: v,
    ...h
  }, g) => {
    let m = useSubmit(), p = useFormAction(l, { relative: f }), b = a.toLowerCase() === "get" ? "get" : "post", u = typeof l == "string" && ABSOLUTE_URL_REGEX2.test(l), y = (d) => {
      if (o && o(d), d.defaultPrevented) return;
      d.preventDefault();
      let E = d.nativeEvent.submitter, S = (E == null ? void 0 : E.getAttribute("formmethod")) || a;
      m(E || d.currentTarget, {
        fetcherKey: t,
        method: S,
        navigate: r,
        replace: n,
        state: s,
        relative: f,
        preventScrollReset: c,
        viewTransition: v
      });
    };
    return /* @__PURE__ */ reactExports.createElement(
      "form",
      {
        ref: g,
        method: b,
        action: p,
        onSubmit: i ? o : y,
        ...h,
        "data-discover": !u && e === "render" ? "true" : void 0
      }
    );
  }
);
Form$1.displayName = "Form";
function getDataRouterConsoleError2(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function useDataRouterContext3(e) {
  let t = reactExports.useContext(DataRouterContext);
  return invariant(t, getDataRouterConsoleError2(e)), t;
}
function useLinkClickHandler(e, {
  target: t,
  replace: r,
  state: i,
  preventScrollReset: n,
  relative: s,
  viewTransition: a
} = {}) {
  let l = useNavigate(), o = useLocation(), f = useResolvedPath(e, { relative: s });
  return reactExports.useCallback(
    (c) => {
      if (shouldProcessLinkClick(c, t)) {
        c.preventDefault();
        let v = r !== void 0 ? r : createPath(o) === createPath(f);
        l(e, {
          replace: v,
          state: i,
          preventScrollReset: n,
          relative: s,
          viewTransition: a
        });
      }
    },
    [
      o,
      l,
      f,
      r,
      i,
      t,
      e,
      n,
      s,
      a
    ]
  );
}
function useSearchParams(e) {
  warning(
    typeof URLSearchParams < "u",
    "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params."
  );
  let t = reactExports.useRef(createSearchParams(e)), r = reactExports.useRef(!1), i = useLocation(), n = reactExports.useMemo(
    () => (
      // Only merge in the defaults if we haven't yet called setSearchParams.
      // Once we call that we want those to take precedence, otherwise you can't
      // remove a param with setSearchParams({}) if it has an initial value
      getSearchParamsForLocation(
        i.search,
        r.current ? null : t.current
      )
    ),
    [i.search]
  ), s = useNavigate(), a = reactExports.useCallback(
    (l, o) => {
      const f = createSearchParams(
        typeof l == "function" ? l(n) : l
      );
      r.current = !0, s("?" + f, o);
    },
    [s, n]
  );
  return [n, a];
}
var fetcherId = 0, getUniqueFetcherId = () => `__${String(++fetcherId)}__`;
function useSubmit() {
  let { router: e } = useDataRouterContext3(
    "useSubmit"
    /* UseSubmit */
  ), { basename: t } = reactExports.useContext(NavigationContext), r = useRouteId();
  return reactExports.useCallback(
    async (i, n = {}) => {
      let { action: s, method: a, encType: l, formData: o, body: f } = getFormSubmissionInfo(
        i,
        t
      );
      if (n.navigate === !1) {
        let c = n.fetcherKey || getUniqueFetcherId();
        await e.fetch(c, r, n.action || s, {
          preventScrollReset: n.preventScrollReset,
          formData: o,
          body: f,
          formMethod: n.method || a,
          formEncType: n.encType || l,
          flushSync: n.flushSync
        });
      } else
        await e.navigate(n.action || s, {
          preventScrollReset: n.preventScrollReset,
          formData: o,
          body: f,
          formMethod: n.method || a,
          formEncType: n.encType || l,
          replace: n.replace,
          state: n.state,
          fromRouteId: r,
          flushSync: n.flushSync,
          viewTransition: n.viewTransition
        });
    },
    [e, t, r]
  );
}
function useFormAction(e, { relative: t } = {}) {
  let { basename: r } = reactExports.useContext(NavigationContext), i = reactExports.useContext(RouteContext);
  invariant(i, "useFormAction must be used inside a RouteContext");
  let [n] = i.matches.slice(-1), s = { ...useResolvedPath(e || ".", { relative: t }) }, a = useLocation();
  if (e == null) {
    s.search = a.search;
    let l = new URLSearchParams(s.search), o = l.getAll("index");
    if (o.some((c) => c === "")) {
      l.delete("index"), o.filter((v) => v).forEach((v) => l.append("index", v));
      let c = l.toString();
      s.search = c ? `?${c}` : "";
    }
  }
  return (!e || e === ".") && n.route.index && (s.search = s.search ? s.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (s.pathname = s.pathname === "/" ? r : joinPaths([r, s.pathname])), createPath(s);
}
function useViewTransitionState(e, t = {}) {
  let r = reactExports.useContext(ViewTransitionContext);
  invariant(
    r != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: i } = useDataRouterContext3(
    "useViewTransitionState"
    /* useViewTransitionState */
  ), n = useResolvedPath(e, { relative: t.relative });
  if (!r.isTransitioning)
    return !1;
  let s = stripBasename(r.currentLocation.pathname, i) || r.currentLocation.pathname, a = stripBasename(r.nextLocation.pathname, i) || r.nextLocation.pathname;
  return matchPath(n.pathname, a) != null || matchPath(n.pathname, s) != null;
}
new TextEncoder();
const TemplateParentBlock = ({ children: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e }), TemplateExtend = reactExports.memo(({ name: e, children: t, data: r, parent: i, render: n }) => (t = React.Children.toArray((n ? n(r, i) : t) || []).map((s) => (React.isValidElement(s) && s.type === TemplateParentBlock && (s = React.cloneElement(s, { children: i })), s)), /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: t }))), TemplateBlock = reactExports.memo(({ name: e, content: t, children: r, data: i }) => {
  const n = React.Children.toArray(t).find((l) => React.isValidElement(l) && l.type === TemplateExtend && l.props.name === e);
  let s = null;
  n && React.isValidElement(n) && (s = React.cloneElement(n, { parent: r, data: i }));
  const a = React.Children.toArray(r).filter((l) => React.isValidElement(l) && l.type !== TemplateExtend);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: s || (a.length ? a : r) });
}), crudToReactPathPattern = (e) => e.replaceAll(new RegExp("{(.*?)}", "gi"), ":$1"), generateRoute = (e, t) => e ? generatePath(crudToReactPathPattern(e.path), { ...e.defaults || {}, ...t }) : "#", UseCurrentReactRoute = () => reactExports.useContext(RouteContext).matches.pop(), STORAGE_KEY = "actions", ActionContext = React.createContext(null);
function UseActions() {
  const e = React.useContext(ActionContext), t = (n, s, a) => e == null ? void 0 : e.filter((l) => l.entity === n && l.name === s && (a === void 0 || l.namespace === a)).shift(), r = (n) => e == null ? void 0 : e.find((s) => {
    var a;
    return ((a = s.route) == null ? void 0 : a.path) && matchPath(crudToReactPathPattern(s.route.path), n);
  });
  return {
    getAction: t,
    getActionByPath: r,
    getOnClickActionByPath: (n) => {
      const s = () => {
        var o;
        const a = r(n);
        if (!a)
          throw new HttpException(404, "Page not found.");
        const l = matchPath(crudToReactPathPattern(((o = a.route) == null ? void 0 : o.path) || ""), n);
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
          if (e)
            return a(s());
          setTimeout(f, 200), o++;
        };
        f();
      });
    }
  };
}
function ActionProvider(e) {
  let t = null;
  try {
    const n = sessionStorage.getItem(STORAGE_KEY);
    t = JSON.parse(atob(n || ""));
  } catch {
  }
  const [r, i] = reactExports.useState(t);
  return reactExports.useEffect(() => {
    t || new Requester_default().get("/_crud/actions", {}).then((n) => {
      n.status === 200 && n.getData().then((s) => {
        sessionStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(s))), i(s);
      });
    }).catch((n) => {
      console.log("error", n);
    }).finally(() => {
    });
  }, []), /* @__PURE__ */ jsxRuntimeExports.jsx(ActionContext.Provider, { value: r, children: e.children });
}
const FormContext = React.createContext(null);
function useForm() {
  const e = React.useContext(FormContext);
  if (!e)
    throw new Error("useForm must be used in Form");
  return e;
}
const nameToId = (e, t = null) => (e.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_").replace(/([a-zA-Z])(?=[A-Z])/g, "$1_") + (t ?? "")).toLowerCase(), Form = reactExports.forwardRef(({
  id: e,
  children: t,
  data: r,
  onError: i,
  onBeforeSubmit: n,
  onSubmit: s,
  onReset: a,
  ...l
}, o) => {
  const f = reactExports.useRef(null), c = {
    response: null,
    constraints: {},
    errors: {}
  }, v = {
    getFormData: () => new FormData(f.current || void 0),
    setFormData: (p) => {
      var b;
      [...((b = f.current) == null ? void 0 : b.elements) || []].forEach((u) => {
        const y = p.get(u.name);
        switch (u.tagName.toLowerCase()) {
          case "select": {
            u.multiple ? [...u.options].forEach((d) => {
              d.selected = p.getAll(u.name).includes(d.value);
            }) : u.value = y;
            break;
          }
          default:
            switch (u.type) {
              case "checkbox":
                u.checked = !!y;
                break;
              default:
                u.value = y;
                break;
            }
        }
      });
    },
    setErrors: (p) => {
      const [, b] = g;
      b({ action: "errors", payload: p });
    },
    reset: () => {
      var p;
      (p = f.current) == null || p.reset();
    },
    submit: () => {
      var p;
      return (p = f.current) == null ? void 0 : p.requestSubmit();
    }
  };
  reactExports.useImperativeHandle(o, () => v), reactExports.useEffect(() => {
    const p = () => {
      a && a();
    }, b = f == null ? void 0 : f.current;
    return b == null || b.addEventListener("reset", p), () => {
      b == null || b.removeEventListener("reset", p);
    };
  }, []);
  const h = (p, b) => {
    const u = v.getFormData();
    for (const y of b)
      if (!y.isValid(u.get(p) || null))
        return { valid: !1, message: y.getMessage() };
    return { valid: !0, message: null };
  }, g = reactExports.useReducer((p, b) => {
    const { action: u, payload: y } = b;
    switch (u) {
      case "constraints": {
        const { name: d, constraints: E } = y;
        return {
          ...p,
          constraints: {
            ...p.constraints || {},
            [d]: E
          }
        };
      }
      case "validate": {
        const { valid: d, message: E } = h(y, p.constraints[y] || []), S = p.errors || {}, C = y;
        return d ? delete S[C] : S[C] = [...S[C] || [], { message: E || "Error" }], Object.keys(S).length ? {
          ...p,
          errors: S
        } : p;
      }
      case "response":
        return {
          ...p,
          response: y
        };
      case "errors":
        return {
          ...p,
          errors: y || []
        };
      case "error": {
        const d = { ...p.errors, ...y };
        return {
          ...p,
          errors: d
        };
      }
    }
    return p;
  }, c), m = (p) => {
    p.preventDefault();
    const [b, u] = g;
    let y = {};
    for (const [E, S] of Object.entries(b.constraints)) {
      const { valid: C, message: w } = h(E, S);
      C || (y[E] = [w]);
    }
    if (Object.values(y).length) {
      u({ action: "errors", payload: y });
      return;
    }
    const d = new FormData((f == null ? void 0 : f.current) || void 0);
    if (n && n(d), s) {
      s(d);
      return;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormContext.Provider, { value: [g, o, f], children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { id: e, ref: f, onSubmit: m, ...l, children: t }) });
}), Choice = ({
  view: e,
  constraints: t,
  className: r,
  onChange: i,
  choiceValueTransform: n,
  choiceLabelTransform: s,
  ...a
}) => {
  t = t || [];
  const [[l, o], f] = useForm(), c = reactExports.useRef(null), h = !!((l == null ? void 0 : l.errors[e.full_name]) || []).length, g = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  reactExports.useEffect(() => {
    o({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t
      }
    });
  }, []);
  const m = (p) => {
    o({ action: "validate", payload: e.full_name }), i && i(p);
  };
  return e != null && e.expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: Object.values(e.choices || []).map(
    (p, b) => {
      var S;
      const u = nameToId(e.full_name, b), y = n ? n(p) : p.value, d = s ? s(p) : p.label || y, E = {
        id: u,
        ...(e == null ? void 0 : e.choice_attr) && ((e == null ? void 0 : e.choice_attr) instanceof Function ? e == null ? void 0 : e.choice_attr(p) : e == null ? void 0 : e.choice_attr)
      };
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "form-check",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: c,
                defaultValue: y,
                type: e != null && e.multiple ? "checkbox" : "radio",
                defaultChecked: (S = e == null ? void 0 : e.data) == null ? void 0 : S.includes(y),
                name: (e == null ? void 0 : e.full_name) + "[]",
                id: u,
                className: "form-check-input",
                ...E,
                onChange: (C) => {
                  var w, M;
                  return m({
                    value: (e != null && e.multiple ? (w = f == null ? void 0 : f.current) == null ? void 0 : w.getFormData().getAll(e == null ? void 0 : e.full_name) : (M = f == null ? void 0 : f.current) == null ? void 0 : M.getFormData().get(e == null ? void 0 : e.full_name)) || C.target.value,
                    targetValue: C.target.value,
                    checked: C.target.checked
                  });
                }
              },
              g
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "label",
              {
                htmlFor: E.id,
                className: "form-check-label",
                children: d
              }
            )
          ]
        },
        b
      );
    }
  ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "select",
    {
      ref: c,
      name: e.full_name,
      multiple: e.multiple,
      "aria-invalid": h,
      onChange: (p) => {
        var b, u;
        return m({
          value: (e.multiple ? (b = f == null ? void 0 : f.current) == null ? void 0 : b.getFormData().getAll(e.full_name) : (u = f == null ? void 0 : f.current) == null ? void 0 : u.getFormData().get(e.full_name)) || p.target.value
        });
      },
      className: [...(r || "").split(" ") || [], "form-control", ...h ? ["is-invalid"] : []].join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      defaultValue: e.data,
      children: [
        e.placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: e.placeholder }),
        Object.values(e.choices || []).map(
          (p, b) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "option",
            {
              value: p.value || p.label,
              ...e.choice_attr && (e.choice_attr instanceof Function ? e.choice_attr(p) : e.choice_attr),
              children: p.label
            },
            b
          )
        )
      ]
    },
    g
  ) });
}, FormFieldError = ({ name: e, className: t }) => {
  const [[r]] = useForm(), i = (r == null ? void 0 : r.errors[e]) || [];
  return i.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: t, children: i.map((n, s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.message }, s)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}, capitalize = (e) => e.toLowerCase().replace(new RegExp("^.{1,1}"), (t) => t.toUpperCase()), titlize = (e) => {
  let t = e.replace(new RegExp("[-_]", "gi"), " ").split(new RegExp("(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])"));
  const r = t.shift(), i = t.pop();
  return t = t.map((n) => n.toLowerCase()), r && t.unshift(capitalize(r)), i && t.push(capitalize(i)), t.join(" ");
}, FormGroup = ({
  view: e,
  children: t,
  className: r
}) => {
  const i = (a, l = null) => a.replace(/[\[\]]/gi, "_").replace(/_+/gi, "_") + (l && l), n = e.label || titlize(e.name), s = ["checkbox", "radio"].includes(e.type || "input");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: [...(r == null ? void 0 : r.split(" ")) || [], "mb-3", s && "form-check"].filter((a) => a).join(" "),
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr),
      children: [
        !s && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "form-label",
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: n
          }
        ),
        t,
        s && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            className: "form-check-label",
            htmlFor: e.id || i(e.full_name),
            ...e.label_attr && (e.label_attr instanceof Function ? e.label_attr() : e.label_attr),
            children: n
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldError, { name: e.full_name, className: "invalid-feedback" }),
        e.help && /* @__PURE__ */ jsxRuntimeExports.jsx(
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
}, Input = ({
  view: e,
  constraints: t,
  className: r,
  onChange: i
}) => {
  const [[n, s]] = useForm(), a = reactExports.useRef(null), l = (n == null ? void 0 : n.errors[e.full_name]) || [];
  reactExports.useEffect(() => {
    s({
      action: "constraints",
      payload: {
        name: e.full_name,
        constraints: t || []
      }
    });
  }, []);
  const o = (h) => {
    s({ action: "validate", payload: e.full_name }), i && i(h);
  }, c = ["checkbox", "radio"].includes(e.type) ? "form-check-input" : "form-control", v = btoa(encodeURIComponent(e.full_name + JSON.stringify(e.data)));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      ref: a,
      id: e.id || nameToId(e.full_name),
      name: e.full_name,
      type: e.type,
      defaultValue: e.data,
      "aria-invalid": !l.length,
      onKeyUp: (h) => o({ value: h.target.value }),
      onChange: (h) => o({ value: h.target.value }),
      className: [c, ...l.length ? ["is-invalid"] : []].join(" "),
      defaultChecked: e == null ? void 0 : e.checked,
      ...e.attr && (e.attr instanceof Function ? e.attr() : e.attr)
    },
    v
  ) });
}, FormWidget = ({
  view: e
}) => {
  const t = () => {
    switch (e.type) {
      case "entity":
      case "choice":
      case "collection":
      case "enum":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Choice, { view: e });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { view: e });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormGroup, { className: "mb-3", view: e, children: t() });
}, EmptyView$1 = ({ children: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e }), DynamicView = reactExports.memo(({ namespace: e, view: t, prefix: r, children: i, props: n, data: s }) => {
  t = t.split(/[._]/).map((g) => capitalize(g)).join("");
  const a = /* @__PURE__ */ Object.assign({}), l = ["crud", e, r, t].filter((g) => g).join("/") + ".tsx", [o, f] = Object.entries(a).filter(([g, m]) => g.endsWith(l)).shift() || [], [c, v] = reactExports.useState(1), h = reactExports.useRef(EmptyView$1);
  return reactExports.useEffect(() => {
    if (f === void 0)
      return () => {
      };
    f().then((g) => {
      h.current = g.default, v(c + 1);
    });
  }, []), /* @__PURE__ */ jsxRuntimeExports.jsx(h.current, { ...n, view: t, controller: e, viewName: t, data: s, parent: i, children: (!f || h.current !== EmptyView$1) && i });
}), FormView = reactExports.memo(({ view: e, namespace: t, name: r }) => e && /* @__PURE__ */ jsxRuntimeExports.jsx(
  DynamicView,
  {
    namespace: t,
    view: r || e.name || "form",
    prefix: "modify/form",
    data: e,
    children: Object.keys(e.children || []).length ? Object.values(e.children || []).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormView, { namespace: t, view: i }, i.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx(FormWidget, { view: e }, e.id)
  },
  e.id
)), BaseButton = ({ icon: e, rightIcon: t, rightIconProps: r, children: i, preload: n = !1 }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: i && i }), Button = reactExports.forwardRef(({
  children: e,
  preload: t,
  ...r
}, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: t, ...r, ref: i, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BaseButton, { preload: t, ...r, children: e }) })), GetDataContext = React.createContext(null);
function UseDataProvider() {
  return React.useContext(GetDataContext);
}
const GetData = ({ entityAction: e, initParameters: t, initQueryParameters: r }) => {
  const { getAction: i } = UseActions();
  e = i(e.entity, e.name, e.namespace) || e;
  const [n, s] = reactExports.useState(), [a, l] = reactExports.useState(t || null), [o, f] = reactExports.useState(new URLSearchParams(r || {}));
  reactExports.useRef(null), btoa(encodeURIComponent([e.entity, e.name, e.namespace, ...Object.entries(a || {}).map(([h, g]) => h + "-" + g), (o instanceof URLSearchParams ? o : convertObjectToURLSearchParams(o)).toString()].filter((h) => h).join("."))), reactExports.useRef({});
  const [c, v] = reactExports.useState(1);
  return reactExports.useEffect(() => {
    e && new Requester_default().get(generateRoute(e.route, a ?? null), o).then((h) => h.getData().then((g) => {
      switch (h.status) {
        case 201:
        case 200: {
          s(g);
          break;
        }
        default: {
          const m = g;
          throw new HttpException(m.status, m.detail, m.trace);
        }
      }
    }));
  }, [JSON.stringify(a), o.toString(), c]), {
    results: n,
    setParameters: l,
    setQueryParameters: (h) => {
      f(new URLSearchParams(h));
    },
    refresh: () => {
      v(c + 1);
    }
  };
}, Translation = reactExports.memo(({ children: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e })), ModifyForm = reactExports.forwardRef(({ name: e, data: t, action: r, parameters: i, onSuccess: n, onError: s, onLoad: a, children: l, embedded: o = !1 }, f) => {
  var E, S, C, w, M;
  const [c, v] = reactExports.useState(!1), h = useNavigate(), g = generateRoute(r.route, i || {}), m = reactExports.useRef(null), p = UseDataProvider(), [b, u] = reactExports.useState();
  reactExports.useImperativeHandle(f, () => ({
    getData: () => b,
    getFormRef: () => m.current
  }));
  const y = (O) => {
    var B, L;
    let j = {
      ...(B = O.errors) != null && B.length ? { [O.full_name]: O.errors } : {}
    };
    for (let [, V] of Object.entries((O == null ? void 0 : O.children) || []))
      V.children && Object.values(V.children).length ? j = { ...j, ...y(V) } : (L = V.errors) != null && L.length && (j[V.full_name] = V.errors);
    return j;
  }, d = (O) => {
    v(!0), new Requester_default().post(g, O, RequestBodyType_default.FormData).then((j) => j.getData().then((B) => [200, 201, 400].includes(j.status) ? B : Promise.reject(B))).then((j) => {
      var L;
      u(j);
      const B = y(j.form.modify.view);
      if (Object.entries(B).length) {
        (L = m.current) == null || L.setErrors(B);
        return;
      }
      n && n(j), j.redirect && !o && h(generateRoute(j.redirect.route, { ...i || {}, ...j.redirect.parameters }));
    }).catch((j) => {
      s && s(j);
    }).finally(() => {
      v(!1);
    });
  };
  return reactExports.useEffect(() => {
    a && a();
  }, []), t = (p == null ? void 0 : p.results) ?? t, reactExports.useEffect(() => {
    u(t);
  }, [JSON.stringify(t)]), b && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    Object.keys((b == null ? void 0 : b.messages) || {}).map((O, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: ["alert", "alert-" + O].join(" "), children: ((b == null ? void 0 : b.messages[O]) || ["Item was saved successful."]).join(" ") }, "alert-" + O)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { id: (C = (S = (E = b == null ? void 0 : b.form) == null ? void 0 : E.modify) == null ? void 0 : S.view) == null ? void 0 : C.id, ref: m, action: g, method: "POST", onSubmit: d, children: [
      ((M = (w = b == null ? void 0 : b.form) == null ? void 0 : w.modify) == null ? void 0 : M.view) !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          FormView,
          {
            name: e,
            namespace: r.namespace,
            view: b.form.modify.view
          },
          b.form.modify.view.id
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldError, { name: b.form.modify.view.full_name, className: "alert alert-danger" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "actions", content: l, data: { formRef: m }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "btn btn-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Translation, { children: "Save" }) }) })
    ] })
  ] });
});
var reactDom = { exports: {} }, reactDom_production = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_production;
function requireReactDom_production() {
  if (hasRequiredReactDom_production) return reactDom_production;
  hasRequiredReactDom_production = 1;
  var e = requireReact();
  function t(o) {
    var f = "https://react.dev/errors/" + o;
    if (1 < arguments.length) {
      f += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var c = 2; c < arguments.length; c++)
        f += "&args[]=" + encodeURIComponent(arguments[c]);
    }
    return "Minified React error #" + o + "; visit " + f + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var i = {
    d: {
      f: r,
      r: function() {
        throw Error(t(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, n = Symbol.for("react.portal");
  function s(o, f, c) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: n,
      key: v == null ? null : "" + v,
      children: o,
      containerInfo: f,
      implementation: c
    };
  }
  var a = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function l(o, f) {
    if (o === "font") return "";
    if (typeof f == "string")
      return f === "use-credentials" ? f : "";
  }
  return reactDom_production.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, reactDom_production.createPortal = function(o, f) {
    var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!f || f.nodeType !== 1 && f.nodeType !== 9 && f.nodeType !== 11)
      throw Error(t(299));
    return s(o, f, null, c);
  }, reactDom_production.flushSync = function(o) {
    var f = a.T, c = i.p;
    try {
      if (a.T = null, i.p = 2, o) return o();
    } finally {
      a.T = f, i.p = c, i.d.f();
    }
  }, reactDom_production.preconnect = function(o, f) {
    typeof o == "string" && (f ? (f = f.crossOrigin, f = typeof f == "string" ? f === "use-credentials" ? f : "" : void 0) : f = null, i.d.C(o, f));
  }, reactDom_production.prefetchDNS = function(o) {
    typeof o == "string" && i.d.D(o);
  }, reactDom_production.preinit = function(o, f) {
    if (typeof o == "string" && f && typeof f.as == "string") {
      var c = f.as, v = l(c, f.crossOrigin), h = typeof f.integrity == "string" ? f.integrity : void 0, g = typeof f.fetchPriority == "string" ? f.fetchPriority : void 0;
      c === "style" ? i.d.S(
        o,
        typeof f.precedence == "string" ? f.precedence : void 0,
        {
          crossOrigin: v,
          integrity: h,
          fetchPriority: g
        }
      ) : c === "script" && i.d.X(o, {
        crossOrigin: v,
        integrity: h,
        fetchPriority: g,
        nonce: typeof f.nonce == "string" ? f.nonce : void 0
      });
    }
  }, reactDom_production.preinitModule = function(o, f) {
    if (typeof o == "string")
      if (typeof f == "object" && f !== null) {
        if (f.as == null || f.as === "script") {
          var c = l(
            f.as,
            f.crossOrigin
          );
          i.d.M(o, {
            crossOrigin: c,
            integrity: typeof f.integrity == "string" ? f.integrity : void 0,
            nonce: typeof f.nonce == "string" ? f.nonce : void 0
          });
        }
      } else f == null && i.d.M(o);
  }, reactDom_production.preload = function(o, f) {
    if (typeof o == "string" && typeof f == "object" && f !== null && typeof f.as == "string") {
      var c = f.as, v = l(c, f.crossOrigin);
      i.d.L(o, c, {
        crossOrigin: v,
        integrity: typeof f.integrity == "string" ? f.integrity : void 0,
        nonce: typeof f.nonce == "string" ? f.nonce : void 0,
        type: typeof f.type == "string" ? f.type : void 0,
        fetchPriority: typeof f.fetchPriority == "string" ? f.fetchPriority : void 0,
        referrerPolicy: typeof f.referrerPolicy == "string" ? f.referrerPolicy : void 0,
        imageSrcSet: typeof f.imageSrcSet == "string" ? f.imageSrcSet : void 0,
        imageSizes: typeof f.imageSizes == "string" ? f.imageSizes : void 0,
        media: typeof f.media == "string" ? f.media : void 0
      });
    }
  }, reactDom_production.preloadModule = function(o, f) {
    if (typeof o == "string")
      if (f) {
        var c = l(f.as, f.crossOrigin);
        i.d.m(o, {
          as: typeof f.as == "string" && f.as !== "script" ? f.as : void 0,
          crossOrigin: c,
          integrity: typeof f.integrity == "string" ? f.integrity : void 0
        });
      } else i.d.m(o);
  }, reactDom_production.requestFormReset = function(o) {
    i.d.r(o);
  }, reactDom_production.unstable_batchedUpdates = function(o, f) {
    return o(f);
  }, reactDom_production.useFormState = function(o, f, c) {
    return a.H.useFormState(o, f, c);
  }, reactDom_production.useFormStatus = function() {
    return a.H.useHostTransitionStatus();
  }, reactDom_production.version = "19.0.0", reactDom_production;
}
var reactDom_development = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactDom_development;
function requireReactDom_development() {
  return hasRequiredReactDom_development || (hasRequiredReactDom_development = 1, process.env.NODE_ENV !== "production" && function() {
    function e() {
    }
    function t(v) {
      return "" + v;
    }
    function r(v, h, g) {
      var m = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        t(m);
        var p = !1;
      } catch {
        p = !0;
      }
      return p && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && m[Symbol.toStringTag] || m.constructor.name || "Object"
      ), t(m)), {
        $$typeof: f,
        key: m == null ? null : "" + m,
        children: v,
        containerInfo: h,
        implementation: g
      };
    }
    function i(v, h) {
      if (v === "font") return "";
      if (typeof h == "string")
        return h === "use-credentials" ? h : "";
    }
    function n(v) {
      return v === null ? "`null`" : v === void 0 ? "`undefined`" : v === "" ? "an empty string" : 'something with type "' + typeof v + '"';
    }
    function s(v) {
      return v === null ? "`null`" : v === void 0 ? "`undefined`" : v === "" ? "an empty string" : typeof v == "string" ? JSON.stringify(v) : typeof v == "number" ? "`" + v + "`" : 'something with type "' + typeof v + '"';
    }
    function a() {
      var v = c.H;
      return v === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), v;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var l = requireReact(), o = {
      d: {
        f: e,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: e,
        C: e,
        L: e,
        m: e,
        X: e,
        S: e,
        M: e
      },
      p: 0,
      findDOMNode: null
    }, f = Symbol.for("react.portal"), c = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), reactDom_development.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o, reactDom_development.createPortal = function(v, h) {
      var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!h || h.nodeType !== 1 && h.nodeType !== 9 && h.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return r(v, h, null, g);
    }, reactDom_development.flushSync = function(v) {
      var h = c.T, g = o.p;
      try {
        if (c.T = null, o.p = 2, v)
          return v();
      } finally {
        c.T = h, o.p = g, o.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, reactDom_development.preconnect = function(v, h) {
      typeof v == "string" && v ? h != null && typeof h != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        s(h)
      ) : h != null && typeof h.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        n(h.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        n(v)
      ), typeof v == "string" && (h ? (h = h.crossOrigin, h = typeof h == "string" ? h === "use-credentials" ? h : "" : void 0) : h = null, o.d.C(v, h));
    }, reactDom_development.prefetchDNS = function(v) {
      if (typeof v != "string" || !v)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          n(v)
        );
      else if (1 < arguments.length) {
        var h = arguments[1];
        typeof h == "object" && h.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          s(h)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          s(h)
        );
      }
      typeof v == "string" && o.d.D(v);
    }, reactDom_development.preinit = function(v, h) {
      if (typeof v == "string" && v ? h == null || typeof h != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        s(h)
      ) : h.as !== "style" && h.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        s(h.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        n(v)
      ), typeof v == "string" && h && typeof h.as == "string") {
        var g = h.as, m = i(g, h.crossOrigin), p = typeof h.integrity == "string" ? h.integrity : void 0, b = typeof h.fetchPriority == "string" ? h.fetchPriority : void 0;
        g === "style" ? o.d.S(
          v,
          typeof h.precedence == "string" ? h.precedence : void 0,
          {
            crossOrigin: m,
            integrity: p,
            fetchPriority: b
          }
        ) : g === "script" && o.d.X(v, {
          crossOrigin: m,
          integrity: p,
          fetchPriority: b,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0
        });
      }
    }, reactDom_development.preinitModule = function(v, h) {
      var g = "";
      if (typeof v == "string" && v || (g += " The `href` argument encountered was " + n(v) + "."), h !== void 0 && typeof h != "object" ? g += " The `options` argument encountered was " + n(h) + "." : h && "as" in h && h.as !== "script" && (g += " The `as` option encountered was " + s(h.as) + "."), g)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          g
        );
      else
        switch (g = h && typeof h.as == "string" ? h.as : "script", g) {
          case "script":
            break;
          default:
            g = s(g), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              g,
              v
            );
        }
      typeof v == "string" && (typeof h == "object" && h !== null ? (h.as == null || h.as === "script") && (g = i(
        h.as,
        h.crossOrigin
      ), o.d.M(v, {
        crossOrigin: g,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0,
        nonce: typeof h.nonce == "string" ? h.nonce : void 0
      })) : h == null && o.d.M(v));
    }, reactDom_development.preload = function(v, h) {
      var g = "";
      if (typeof v == "string" && v || (g += " The `href` argument encountered was " + n(v) + "."), h == null || typeof h != "object" ? g += " The `options` argument encountered was " + n(h) + "." : typeof h.as == "string" && h.as || (g += " The `as` option encountered was " + n(h.as) + "."), g && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        g
      ), typeof v == "string" && typeof h == "object" && h !== null && typeof h.as == "string") {
        g = h.as;
        var m = i(
          g,
          h.crossOrigin
        );
        o.d.L(v, g, {
          crossOrigin: m,
          integrity: typeof h.integrity == "string" ? h.integrity : void 0,
          nonce: typeof h.nonce == "string" ? h.nonce : void 0,
          type: typeof h.type == "string" ? h.type : void 0,
          fetchPriority: typeof h.fetchPriority == "string" ? h.fetchPriority : void 0,
          referrerPolicy: typeof h.referrerPolicy == "string" ? h.referrerPolicy : void 0,
          imageSrcSet: typeof h.imageSrcSet == "string" ? h.imageSrcSet : void 0,
          imageSizes: typeof h.imageSizes == "string" ? h.imageSizes : void 0,
          media: typeof h.media == "string" ? h.media : void 0
        });
      }
    }, reactDom_development.preloadModule = function(v, h) {
      var g = "";
      typeof v == "string" && v || (g += " The `href` argument encountered was " + n(v) + "."), h !== void 0 && typeof h != "object" ? g += " The `options` argument encountered was " + n(h) + "." : h && "as" in h && typeof h.as != "string" && (g += " The `as` option encountered was " + n(h.as) + "."), g && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        g
      ), typeof v == "string" && (h ? (g = i(
        h.as,
        h.crossOrigin
      ), o.d.m(v, {
        as: typeof h.as == "string" && h.as !== "script" ? h.as : void 0,
        crossOrigin: g,
        integrity: typeof h.integrity == "string" ? h.integrity : void 0
      })) : o.d.m(v));
    }, reactDom_development.requestFormReset = function(v) {
      o.d.r(v);
    }, reactDom_development.unstable_batchedUpdates = function(v, h) {
      return v(h);
    }, reactDom_development.useFormState = function(v, h, g) {
      return a().useFormState(v, h, g);
    }, reactDom_development.useFormStatus = function() {
      return a().useHostTransitionStatus();
    }, reactDom_development.version = "19.0.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }()), reactDom_development;
}
var hasRequiredReactDom;
function requireReactDom() {
  if (hasRequiredReactDom) return reactDom.exports;
  hasRequiredReactDom = 1;
  function e() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (process.env.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (t) {
        console.error(t);
      }
    }
  }
  return process.env.NODE_ENV === "production" ? (e(), reactDom.exports = requireReactDom_production()) : reactDom.exports = requireReactDom_development(), reactDom.exports;
}
var reactDomExports = requireReactDom();
const Modal = reactExports.forwardRef(({
  children: e,
  open: t = !1,
  animation: r = "fade",
  backdrop: i = !0,
  keyboard: n = !0,
  size: s,
  onClose: a,
  className: l
}, o) => {
  const [f, c] = reactExports.useState(t);
  reactExports.useImperativeHandle(o, () => ({
    toggle: () => c(!f),
    open: () => c(!0),
    close: () => p(),
    isOpen: () => f
  })), reactExports.useEffect(() => {
    c(t);
  }, [t]);
  const v = (b) => {
    if (n)
      switch (b.key) {
        case "Escape": {
          p();
          break;
        }
      }
  };
  reactExports.useEffect(() => {
    var y;
    if (!f)
      return;
    const b = () => {
      var d;
      (d = h.current) == null || d.addEventListener("animationend", u);
    }, u = () => {
      var d, E, S;
      (d = h.current) == null || d.classList.remove(r), (E = h.current) == null || E.removeEventListener("animationstart", b), (S = h.current) == null || S.removeEventListener("animationend", u);
    };
    return setTimeout(() => {
      var d, E;
      (d = h.current) == null || d.classList.add("d-block", "show"), (E = g == null ? void 0 : g.current) == null || E.classList.add("show");
    }, r ? 100 : 0), document.addEventListener("keydown", v), (y = h.current) == null || y.addEventListener("animationstart", b), () => {
      var d, E;
      document.removeEventListener("keydown", v), (d = h.current) == null || d.removeEventListener("animationstart", b), (E = h.current) == null || E.removeEventListener("animationend", u);
    };
  }, [f]);
  const h = reactExports.useRef(null), g = reactExports.useRef(null), m = () => {
    c(!1), a && a();
  }, p = () => new Promise((b, u) => {
    var d, E;
    if (!f)
      return b();
    const y = () => {
      var S;
      (S = h == null ? void 0 : h.current) == null || S.classList.remove("show", "d-block"), b(), m();
    };
    if (r) {
      const S = setTimeout(() => {
        y();
      }, r ? 50 : 0);
      (d = h.current) == null || d.addEventListener("animationstart", () => {
        var C, w;
        console.log("timeout"), clearTimeout(S), (C = h.current) == null || C.removeEventListener("animationend", y), (w = h.current) == null || w.addEventListener("animationend", y);
      }), (E = h.current) == null || E.classList.add(r, "close");
    } else
      y();
  });
  return f && reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: h,
        className: ["modal", s && "modal-" + s, r && r, l].filter((b) => b).join(" "),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-dialog modal-dialog-centered", role: "document", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "header", content: e, data: null, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "modal-title", id: "exampleModalLabel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "title", content: e, data: null, children: "Title" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: p, type: "button", className: "btn-close", "aria-label": "Close" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-body", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "content", content: e, data: null, children: e }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "footer", content: e, data: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "actions", content: e, data: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: p, type: "button", className: "btn btn-secondary", children: "Close" }) }) }) })
        ] }) })
      }
    ),
    i && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: g,
        className: ["modal-backdrop", "fade", ...r && ["show"]].filter((b) => b).join(" ")
      }
    )
  ] }), document.body);
});
var lottie$1 = { exports: {} }, lottie = lottie$1.exports, hasRequiredLottie;
function requireLottie() {
  return hasRequiredLottie || (hasRequiredLottie = 1, function(module, exports) {
    typeof navigator < "u" && function(e, t) {
      module.exports = t();
    }(lottie, function() {
      var svgNS = "http://www.w3.org/2000/svg", locationHref = "", _useWebWorker = !1, initialDefaultFrame = -999999, setWebWorker = function(t) {
        _useWebWorker = !!t;
      }, getWebWorker = function() {
        return _useWebWorker;
      }, setLocationHref = function(t) {
        locationHref = t;
      }, getLocationHref = function() {
        return locationHref;
      };
      function createTag(e) {
        return document.createElement(e);
      }
      function extendPrototype(e, t) {
        var r, i = e.length, n;
        for (r = 0; r < i; r += 1) {
          n = e[r].prototype;
          for (var s in n)
            Object.prototype.hasOwnProperty.call(n, s) && (t.prototype[s] = n[s]);
        }
      }
      function getDescriptor(e, t) {
        return Object.getOwnPropertyDescriptor(e, t);
      }
      function createProxyFunction(e) {
        function t() {
        }
        return t.prototype = e, t;
      }
      var audioControllerFactory = function() {
        function e(t) {
          this.audios = [], this.audioFactory = t, this._volume = 1, this._isMuted = !1;
        }
        return e.prototype = {
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
            var i, n = this.audios.length;
            for (i = 0; i < n; i += 1)
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
          return new e();
        };
      }(), createTypedArray = /* @__PURE__ */ function() {
        function e(r, i) {
          var n = 0, s = [], a;
          switch (r) {
            case "int16":
            case "uint8c":
              a = 1;
              break;
            default:
              a = 1.1;
              break;
          }
          for (n = 0; n < i; n += 1)
            s.push(a);
          return s;
        }
        function t(r, i) {
          return r === "float32" ? new Float32Array(i) : r === "int16" ? new Int16Array(i) : r === "uint8c" ? new Uint8ClampedArray(i) : e(r, i);
        }
        return typeof Uint8ClampedArray == "function" && typeof Float32Array == "function" ? t : e;
      }();
      function createSizedArray(e) {
        return Array.apply(null, {
          length: e
        });
      }
      function _typeof$6(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$6 = function(r) {
          return typeof r;
        } : _typeof$6 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$6(e);
      }
      var subframeEnabled = !0, expressionsPlugin = null, expressionsInterfaces = null, idPrefix$1 = "", isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), bmPow = Math.pow, bmSqrt = Math.sqrt, bmFloor = Math.floor, bmMax = Math.max, bmMin = Math.min, BMMath = {};
      (function() {
        var e = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"], t, r = e.length;
        for (t = 0; t < r; t += 1)
          BMMath[e[t]] = Math[e[t]];
      })(), BMMath.random = Math.random, BMMath.abs = function(e) {
        var t = _typeof$6(e);
        if (t === "object" && e.length) {
          var r = createSizedArray(e.length), i, n = e.length;
          for (i = 0; i < n; i += 1)
            r[i] = Math.abs(e[i]);
          return r;
        }
        return Math.abs(e);
      };
      var defaultCurveSegments = 150, degToRads = Math.PI / 180, roundCorner = 0.5519;
      function styleDiv(e) {
        e.style.position = "absolute", e.style.top = 0, e.style.left = 0, e.style.display = "block", e.style.transformOrigin = "0 0", e.style.webkitTransformOrigin = "0 0", e.style.backfaceVisibility = "visible", e.style.webkitBackfaceVisibility = "visible", e.style.transformStyle = "preserve-3d", e.style.webkitTransformStyle = "preserve-3d", e.style.mozTransformStyle = "preserve-3d";
      }
      function BMEnterFrameEvent(e, t, r, i) {
        this.type = e, this.currentTime = t, this.totalTime = r, this.direction = i < 0 ? -1 : 1;
      }
      function BMCompleteEvent(e, t) {
        this.type = e, this.direction = t < 0 ? -1 : 1;
      }
      function BMCompleteLoopEvent(e, t, r, i) {
        this.type = e, this.currentLoop = r, this.totalLoops = t, this.direction = i < 0 ? -1 : 1;
      }
      function BMSegmentStartEvent(e, t, r) {
        this.type = e, this.firstFrame = t, this.totalFrames = r;
      }
      function BMDestroyEvent(e, t) {
        this.type = e, this.target = t;
      }
      function BMRenderFrameErrorEvent(e, t) {
        this.type = "renderFrameError", this.nativeError = e, this.currentTime = t;
      }
      function BMConfigErrorEvent(e) {
        this.type = "configError", this.nativeError = e;
      }
      var createElementID = /* @__PURE__ */ function() {
        var e = 0;
        return function() {
          return e += 1, idPrefix$1 + "__lottie_element_" + e;
        };
      }();
      function HSVtoRGB(e, t, r) {
        var i, n, s, a, l, o, f, c;
        switch (a = Math.floor(e * 6), l = e * 6 - a, o = r * (1 - t), f = r * (1 - l * t), c = r * (1 - (1 - l) * t), a % 6) {
          case 0:
            i = r, n = c, s = o;
            break;
          case 1:
            i = f, n = r, s = o;
            break;
          case 2:
            i = o, n = r, s = c;
            break;
          case 3:
            i = o, n = f, s = r;
            break;
          case 4:
            i = c, n = o, s = r;
            break;
          case 5:
            i = r, n = o, s = f;
            break;
        }
        return [i, n, s];
      }
      function RGBtoHSV(e, t, r) {
        var i = Math.max(e, t, r), n = Math.min(e, t, r), s = i - n, a, l = i === 0 ? 0 : s / i, o = i / 255;
        switch (i) {
          case n:
            a = 0;
            break;
          case e:
            a = t - r + s * (t < r ? 6 : 0), a /= 6 * s;
            break;
          case t:
            a = r - e + s * 2, a /= 6 * s;
            break;
          case r:
            a = e - t + s * 4, a /= 6 * s;
            break;
        }
        return [a, l, o];
      }
      function addSaturationToRGB(e, t) {
        var r = RGBtoHSV(e[0] * 255, e[1] * 255, e[2] * 255);
        return r[1] += t, r[1] > 1 ? r[1] = 1 : r[1] <= 0 && (r[1] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }
      function addBrightnessToRGB(e, t) {
        var r = RGBtoHSV(e[0] * 255, e[1] * 255, e[2] * 255);
        return r[2] += t, r[2] > 1 ? r[2] = 1 : r[2] < 0 && (r[2] = 0), HSVtoRGB(r[0], r[1], r[2]);
      }
      function addHueToRGB(e, t) {
        var r = RGBtoHSV(e[0] * 255, e[1] * 255, e[2] * 255);
        return r[0] += t / 360, r[0] > 1 ? r[0] -= 1 : r[0] < 0 && (r[0] += 1), HSVtoRGB(r[0], r[1], r[2]);
      }
      var rgbToHex = function() {
        var e = [], t, r;
        for (t = 0; t < 256; t += 1)
          r = t.toString(16), e[t] = r.length === 1 ? "0" + r : r;
        return function(i, n, s) {
          return i < 0 && (i = 0), n < 0 && (n = 0), s < 0 && (s = 0), "#" + e[i] + e[n] + e[s];
        };
      }(), setSubframeEnabled = function(t) {
        subframeEnabled = !!t;
      }, getSubframeEnabled = function() {
        return subframeEnabled;
      }, setExpressionsPlugin = function(t) {
        expressionsPlugin = t;
      }, getExpressionsPlugin = function() {
        return expressionsPlugin;
      }, setExpressionInterfaces = function(t) {
        expressionsInterfaces = t;
      }, getExpressionInterfaces = function() {
        return expressionsInterfaces;
      }, setDefaultCurveSegments = function(t) {
        defaultCurveSegments = t;
      }, getDefaultCurveSegments = function() {
        return defaultCurveSegments;
      }, setIdPrefix = function(t) {
        idPrefix$1 = t;
      };
      function createNS(e) {
        return document.createElementNS(svgNS, e);
      }
      function _typeof$5(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$5 = function(r) {
          return typeof r;
        } : _typeof$5 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$5(e);
      }
      var dataManager = /* @__PURE__ */ function() {
        var e = 1, t = [], r, i, n = {
          onmessage: function() {
          },
          postMessage: function(g) {
            r({
              data: g
            });
          }
        }, s = {
          postMessage: function(g) {
            n.onmessage({
              data: g
            });
          }
        };
        function a(h) {
          if (window.Worker && window.Blob && getWebWorker()) {
            var g = new Blob(["var _workerSelf = self; self.onmessage = ", h.toString()], {
              type: "text/javascript"
            }), m = URL.createObjectURL(g);
            return new Worker(m);
          }
          return r = h, n;
        }
        function l() {
          i || (i = a(function(g) {
            function m() {
              function b(D, A) {
                var k, x, P = D.length, T, R, N, H;
                for (x = 0; x < P; x += 1)
                  if (k = D[x], "ks" in k && !k.completed) {
                    if (k.completed = !0, k.hasMask) {
                      var z = k.masksProperties;
                      for (R = z.length, T = 0; T < R; T += 1)
                        if (z[T].pt.k.i)
                          S(z[T].pt.k);
                        else
                          for (H = z[T].pt.k.length, N = 0; N < H; N += 1)
                            z[T].pt.k[N].s && S(z[T].pt.k[N].s[0]), z[T].pt.k[N].e && S(z[T].pt.k[N].e[0]);
                    }
                    k.ty === 0 ? (k.layers = d(k.refId, A), b(k.layers, A)) : k.ty === 4 ? E(k.shapes) : k.ty === 5 && V(k);
                  }
              }
              function u(D, A) {
                if (D) {
                  var k = 0, x = D.length;
                  for (k = 0; k < x; k += 1)
                    D[k].t === 1 && (D[k].data.layers = d(D[k].data.refId, A), b(D[k].data.layers, A));
                }
              }
              function y(D, A) {
                for (var k = 0, x = A.length; k < x; ) {
                  if (A[k].id === D)
                    return A[k];
                  k += 1;
                }
                return null;
              }
              function d(D, A) {
                var k = y(D, A);
                return k ? k.layers.__used ? JSON.parse(JSON.stringify(k.layers)) : (k.layers.__used = !0, k.layers) : null;
              }
              function E(D) {
                var A, k = D.length, x, P;
                for (A = k - 1; A >= 0; A -= 1)
                  if (D[A].ty === "sh")
                    if (D[A].ks.k.i)
                      S(D[A].ks.k);
                    else
                      for (P = D[A].ks.k.length, x = 0; x < P; x += 1)
                        D[A].ks.k[x].s && S(D[A].ks.k[x].s[0]), D[A].ks.k[x].e && S(D[A].ks.k[x].e[0]);
                  else D[A].ty === "gr" && E(D[A].it);
              }
              function S(D) {
                var A, k = D.i.length;
                for (A = 0; A < k; A += 1)
                  D.i[A][0] += D.v[A][0], D.i[A][1] += D.v[A][1], D.o[A][0] += D.v[A][0], D.o[A][1] += D.v[A][1];
              }
              function C(D, A) {
                var k = A ? A.split(".") : [100, 100, 100];
                return D[0] > k[0] ? !0 : k[0] > D[0] ? !1 : D[1] > k[1] ? !0 : k[1] > D[1] ? !1 : D[2] > k[2] ? !0 : k[2] > D[2] ? !1 : null;
              }
              var w = /* @__PURE__ */ function() {
                var D = [4, 4, 14];
                function A(x) {
                  var P = x.t.d;
                  x.t.d = {
                    k: [{
                      s: P,
                      t: 0
                    }]
                  };
                }
                function k(x) {
                  var P, T = x.length;
                  for (P = 0; P < T; P += 1)
                    x[P].ty === 5 && A(x[P]);
                }
                return function(x) {
                  if (C(D, x.v) && (k(x.layers), x.assets)) {
                    var P, T = x.assets.length;
                    for (P = 0; P < T; P += 1)
                      x.assets[P].layers && k(x.assets[P].layers);
                  }
                };
              }(), M = /* @__PURE__ */ function() {
                var D = [4, 7, 99];
                return function(A) {
                  if (A.chars && !C(D, A.v)) {
                    var k, x = A.chars.length;
                    for (k = 0; k < x; k += 1) {
                      var P = A.chars[k];
                      P.data && P.data.shapes && (E(P.data.shapes), P.data.ip = 0, P.data.op = 99999, P.data.st = 0, P.data.sr = 1, P.data.ks = {
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
                      }, A.chars[k].t || (P.data.shapes.push({
                        ty: "no"
                      }), P.data.shapes[0].it.push({
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
              }(), O = /* @__PURE__ */ function() {
                var D = [5, 7, 15];
                function A(x) {
                  var P = x.t.p;
                  typeof P.a == "number" && (P.a = {
                    a: 0,
                    k: P.a
                  }), typeof P.p == "number" && (P.p = {
                    a: 0,
                    k: P.p
                  }), typeof P.r == "number" && (P.r = {
                    a: 0,
                    k: P.r
                  });
                }
                function k(x) {
                  var P, T = x.length;
                  for (P = 0; P < T; P += 1)
                    x[P].ty === 5 && A(x[P]);
                }
                return function(x) {
                  if (C(D, x.v) && (k(x.layers), x.assets)) {
                    var P, T = x.assets.length;
                    for (P = 0; P < T; P += 1)
                      x.assets[P].layers && k(x.assets[P].layers);
                  }
                };
              }(), j = /* @__PURE__ */ function() {
                var D = [4, 1, 9];
                function A(x) {
                  var P, T = x.length, R, N;
                  for (P = 0; P < T; P += 1)
                    if (x[P].ty === "gr")
                      A(x[P].it);
                    else if (x[P].ty === "fl" || x[P].ty === "st")
                      if (x[P].c.k && x[P].c.k[0].i)
                        for (N = x[P].c.k.length, R = 0; R < N; R += 1)
                          x[P].c.k[R].s && (x[P].c.k[R].s[0] /= 255, x[P].c.k[R].s[1] /= 255, x[P].c.k[R].s[2] /= 255, x[P].c.k[R].s[3] /= 255), x[P].c.k[R].e && (x[P].c.k[R].e[0] /= 255, x[P].c.k[R].e[1] /= 255, x[P].c.k[R].e[2] /= 255, x[P].c.k[R].e[3] /= 255);
                      else
                        x[P].c.k[0] /= 255, x[P].c.k[1] /= 255, x[P].c.k[2] /= 255, x[P].c.k[3] /= 255;
                }
                function k(x) {
                  var P, T = x.length;
                  for (P = 0; P < T; P += 1)
                    x[P].ty === 4 && A(x[P].shapes);
                }
                return function(x) {
                  if (C(D, x.v) && (k(x.layers), x.assets)) {
                    var P, T = x.assets.length;
                    for (P = 0; P < T; P += 1)
                      x.assets[P].layers && k(x.assets[P].layers);
                  }
                };
              }(), B = /* @__PURE__ */ function() {
                var D = [4, 4, 18];
                function A(x) {
                  var P, T = x.length, R, N;
                  for (P = T - 1; P >= 0; P -= 1)
                    if (x[P].ty === "sh")
                      if (x[P].ks.k.i)
                        x[P].ks.k.c = x[P].closed;
                      else
                        for (N = x[P].ks.k.length, R = 0; R < N; R += 1)
                          x[P].ks.k[R].s && (x[P].ks.k[R].s[0].c = x[P].closed), x[P].ks.k[R].e && (x[P].ks.k[R].e[0].c = x[P].closed);
                    else x[P].ty === "gr" && A(x[P].it);
                }
                function k(x) {
                  var P, T, R = x.length, N, H, z, J;
                  for (T = 0; T < R; T += 1) {
                    if (P = x[T], P.hasMask) {
                      var q = P.masksProperties;
                      for (H = q.length, N = 0; N < H; N += 1)
                        if (q[N].pt.k.i)
                          q[N].pt.k.c = q[N].cl;
                        else
                          for (J = q[N].pt.k.length, z = 0; z < J; z += 1)
                            q[N].pt.k[z].s && (q[N].pt.k[z].s[0].c = q[N].cl), q[N].pt.k[z].e && (q[N].pt.k[z].e[0].c = q[N].cl);
                    }
                    P.ty === 4 && A(P.shapes);
                  }
                }
                return function(x) {
                  if (C(D, x.v) && (k(x.layers), x.assets)) {
                    var P, T = x.assets.length;
                    for (P = 0; P < T; P += 1)
                      x.assets[P].layers && k(x.assets[P].layers);
                  }
                };
              }();
              function L(D) {
                D.__complete || (j(D), w(D), M(D), O(D), B(D), b(D.layers, D.assets), u(D.chars, D.assets), D.__complete = !0);
              }
              function V(D) {
                D.t.a.length === 0 && "m" in D.t.p;
              }
              var $ = {};
              return $.completeData = L, $.checkColors = j, $.checkChars = M, $.checkPathProperties = O, $.checkShapes = B, $.completeLayers = b, $;
            }
            if (s.dataManager || (s.dataManager = m()), s.assetLoader || (s.assetLoader = /* @__PURE__ */ function() {
              function b(y) {
                var d = y.getResponseHeader("content-type");
                return d && y.responseType === "json" && d.indexOf("json") !== -1 || y.response && _typeof$5(y.response) === "object" ? y.response : y.response && typeof y.response == "string" ? JSON.parse(y.response) : y.responseText ? JSON.parse(y.responseText) : null;
              }
              function u(y, d, E, S) {
                var C, w = new XMLHttpRequest();
                try {
                  w.responseType = "json";
                } catch {
                }
                w.onreadystatechange = function() {
                  if (w.readyState === 4)
                    if (w.status === 200)
                      C = b(w), E(C);
                    else
                      try {
                        C = b(w), E(C);
                      } catch (M) {
                        S && S(M);
                      }
                };
                try {
                  w.open(["G", "E", "T"].join(""), y, !0);
                } catch {
                  w.open(["G", "E", "T"].join(""), d + "/" + y, !0);
                }
                w.send();
              }
              return {
                load: u
              };
            }()), g.data.type === "loadAnimation")
              s.assetLoader.load(g.data.path, g.data.fullPath, function(b) {
                s.dataManager.completeData(b), s.postMessage({
                  id: g.data.id,
                  payload: b,
                  status: "success"
                });
              }, function() {
                s.postMessage({
                  id: g.data.id,
                  status: "error"
                });
              });
            else if (g.data.type === "complete") {
              var p = g.data.animation;
              s.dataManager.completeData(p), s.postMessage({
                id: g.data.id,
                payload: p,
                status: "success"
              });
            } else g.data.type === "loadData" && s.assetLoader.load(g.data.path, g.data.fullPath, function(b) {
              s.postMessage({
                id: g.data.id,
                payload: b,
                status: "success"
              });
            }, function() {
              s.postMessage({
                id: g.data.id,
                status: "error"
              });
            });
          }), i.onmessage = function(h) {
            var g = h.data, m = g.id, p = t[m];
            t[m] = null, g.status === "success" ? p.onComplete(g.payload) : p.onError && p.onError();
          });
        }
        function o(h, g) {
          e += 1;
          var m = "processId_" + e;
          return t[m] = {
            onComplete: h,
            onError: g
          }, m;
        }
        function f(h, g, m) {
          l();
          var p = o(g, m);
          i.postMessage({
            type: "loadAnimation",
            path: h,
            fullPath: window.location.origin + window.location.pathname,
            id: p
          });
        }
        function c(h, g, m) {
          l();
          var p = o(g, m);
          i.postMessage({
            type: "loadData",
            path: h,
            fullPath: window.location.origin + window.location.pathname,
            id: p
          });
        }
        function v(h, g, m) {
          l();
          var p = o(g, m);
          i.postMessage({
            type: "complete",
            animation: h,
            id: p
          });
        }
        return {
          loadAnimation: f,
          loadData: c,
          completeAnimation: v
        };
      }(), ImagePreloader = function() {
        var e = function() {
          var u = createTag("canvas");
          u.width = 1, u.height = 1;
          var y = u.getContext("2d");
          return y.fillStyle = "rgba(0,0,0,0)", y.fillRect(0, 0, 1, 1), u;
        }();
        function t() {
          this.loadedAssets += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function r() {
          this.loadedFootagesCount += 1, this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages && this.imagesLoadedCb && this.imagesLoadedCb(null);
        }
        function i(u, y, d) {
          var E = "";
          if (u.e)
            E = u.p;
          else if (y) {
            var S = u.p;
            S.indexOf("images/") !== -1 && (S = S.split("/")[1]), E = y + S;
          } else
            E = d, E += u.u ? u.u : "", E += u.p;
          return E;
        }
        function n(u) {
          var y = 0, d = setInterval((function() {
            var E = u.getBBox();
            (E.width || y > 500) && (this._imageLoaded(), clearInterval(d)), y += 1;
          }).bind(this), 50);
        }
        function s(u) {
          var y = i(u, this.assetsPath, this.path), d = createNS("image");
          isSafari ? this.testImageLoaded(d) : d.addEventListener("load", this._imageLoaded, !1), d.addEventListener("error", (function() {
            E.img = e, this._imageLoaded();
          }).bind(this), !1), d.setAttributeNS("http://www.w3.org/1999/xlink", "href", y), this._elementHelper.append ? this._elementHelper.append(d) : this._elementHelper.appendChild(d);
          var E = {
            img: d,
            assetData: u
          };
          return E;
        }
        function a(u) {
          var y = i(u, this.assetsPath, this.path), d = createTag("img");
          d.crossOrigin = "anonymous", d.addEventListener("load", this._imageLoaded, !1), d.addEventListener("error", (function() {
            E.img = e, this._imageLoaded();
          }).bind(this), !1), d.src = y;
          var E = {
            img: d,
            assetData: u
          };
          return E;
        }
        function l(u) {
          var y = {
            assetData: u
          }, d = i(u, this.assetsPath, this.path);
          return dataManager.loadData(d, (function(E) {
            y.img = E, this._footageLoaded();
          }).bind(this), (function() {
            y.img = {}, this._footageLoaded();
          }).bind(this)), y;
        }
        function o(u, y) {
          this.imagesLoadedCb = y;
          var d, E = u.length;
          for (d = 0; d < E; d += 1)
            u[d].layers || (!u[d].t || u[d].t === "seq" ? (this.totalImages += 1, this.images.push(this._createImageData(u[d]))) : u[d].t === 3 && (this.totalFootages += 1, this.images.push(this.createFootageData(u[d]))));
        }
        function f(u) {
          this.path = u || "";
        }
        function c(u) {
          this.assetsPath = u || "";
        }
        function v(u) {
          for (var y = 0, d = this.images.length; y < d; ) {
            if (this.images[y].assetData === u)
              return this.images[y].img;
            y += 1;
          }
          return null;
        }
        function h() {
          this.imagesLoadedCb = null, this.images.length = 0;
        }
        function g() {
          return this.totalImages === this.loadedAssets;
        }
        function m() {
          return this.totalFootages === this.loadedFootagesCount;
        }
        function p(u, y) {
          u === "svg" ? (this._elementHelper = y, this._createImageData = this.createImageData.bind(this)) : this._createImageData = this.createImgData.bind(this);
        }
        function b() {
          this._imageLoaded = t.bind(this), this._footageLoaded = r.bind(this), this.testImageLoaded = n.bind(this), this.createFootageData = l.bind(this), this.assetsPath = "", this.path = "", this.totalImages = 0, this.totalFootages = 0, this.loadedAssets = 0, this.loadedFootagesCount = 0, this.imagesLoadedCb = null, this.images = [];
        }
        return b.prototype = {
          loadAssets: o,
          setAssetsPath: c,
          setPath: f,
          loadedImages: g,
          loadedFootages: m,
          destroy: h,
          getAsset: v,
          createImgData: a,
          createImageData: s,
          imageLoaded: t,
          footageLoaded: r,
          setCacheType: p
        }, b;
      }();
      function BaseEvent() {
      }
      BaseEvent.prototype = {
        triggerEvent: function(t, r) {
          if (this._cbs[t])
            for (var i = this._cbs[t], n = 0; n < i.length; n += 1)
              i[n](r);
        },
        addEventListener: function(t, r) {
          return this._cbs[t] || (this._cbs[t] = []), this._cbs[t].push(r), (function() {
            this.removeEventListener(t, r);
          }).bind(this);
        },
        removeEventListener: function(t, r) {
          if (!r)
            this._cbs[t] = null;
          else if (this._cbs[t]) {
            for (var i = 0, n = this._cbs[t].length; i < n; )
              this._cbs[t][i] === r && (this._cbs[t].splice(i, 1), i -= 1, n -= 1), i += 1;
            this._cbs[t].length || (this._cbs[t] = null);
          }
        }
      };
      var markerParser = /* @__PURE__ */ function() {
        function e(t) {
          for (var r = t.split(`\r
`), i = {}, n, s = 0, a = 0; a < r.length; a += 1)
            n = r[a].split(":"), n.length === 2 && (i[n[0]] = n[1].trim(), s += 1);
          if (s === 0)
            throw new Error();
          return i;
        }
        return function(t) {
          for (var r = [], i = 0; i < t.length; i += 1) {
            var n = t[i], s = {
              time: n.tm,
              duration: n.dr
            };
            try {
              s.payload = JSON.parse(t[i].cm);
            } catch {
              try {
                s.payload = e(t[i].cm);
              } catch {
                s.payload = {
                  name: t[i].cm
                };
              }
            }
            r.push(s);
          }
          return r;
        };
      }(), ProjectInterface = /* @__PURE__ */ function() {
        function e(t) {
          this.compositions.push(t);
        }
        return function() {
          function t(r) {
            for (var i = 0, n = this.compositions.length; i < n; ) {
              if (this.compositions[i].data && this.compositions[i].data.nm === r)
                return this.compositions[i].prepareFrame && this.compositions[i].data.xt && this.compositions[i].prepareFrame(this.currentFrame), this.compositions[i].compInterface;
              i += 1;
            }
            return null;
          }
          return t.compositions = [], t.currentFrame = 0, t.registerComposition = e, t;
        };
      }(), renderers = {}, registerRenderer = function(t, r) {
        renderers[t] = r;
      };
      function getRenderer(e) {
        return renderers[e];
      }
      function getRegisteredRenderer() {
        if (renderers.canvas)
          return "canvas";
        for (var e in renderers)
          if (renderers[e])
            return e;
        return "";
      }
      function _typeof$4(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$4 = function(r) {
          return typeof r;
        } : _typeof$4 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$4(e);
      }
      var AnimationItem = function() {
        this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.firstFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.playCount = 0, this.animationData = {}, this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = createElementID(), this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.isSubframeEnabled = getSubframeEnabled(), this.segments = [], this._idle = !0, this._completedLoop = !1, this.projectInterface = ProjectInterface(), this.imagePreloader = new ImagePreloader(), this.audioController = audioControllerFactory(), this.markers = [], this.configAnimation = this.configAnimation.bind(this), this.onSetupError = this.onSetupError.bind(this), this.onSegmentComplete = this.onSegmentComplete.bind(this), this.drawnFrameEvent = new BMEnterFrameEvent("drawnFrame", 0, 0, 0), this.expressionsPlugin = getExpressionsPlugin();
      };
      extendPrototype([BaseEvent], AnimationItem), AnimationItem.prototype.setParams = function(e) {
        (e.wrapper || e.container) && (this.wrapper = e.wrapper || e.container);
        var t = "svg";
        e.animType ? t = e.animType : e.renderer && (t = e.renderer);
        var r = getRenderer(t);
        this.renderer = new r(this, e.rendererSettings), this.imagePreloader.setCacheType(t, this.renderer.globalData.defs), this.renderer.setProjectInterface(this.projectInterface), this.animType = t, e.loop === "" || e.loop === null || e.loop === void 0 || e.loop === !0 ? this.loop = !0 : e.loop === !1 ? this.loop = !1 : this.loop = parseInt(e.loop, 10), this.autoplay = "autoplay" in e ? e.autoplay : !0, this.name = e.name ? e.name : "", this.autoloadSegments = Object.prototype.hasOwnProperty.call(e, "autoloadSegments") ? e.autoloadSegments : !0, this.assetsPath = e.assetsPath, this.initialSegment = e.initialSegment, e.audioFactory && this.audioController.setAudioFactory(e.audioFactory), e.animationData ? this.setupAnimation(e.animationData) : e.path && (e.path.lastIndexOf("\\") !== -1 ? this.path = e.path.substr(0, e.path.lastIndexOf("\\") + 1) : this.path = e.path.substr(0, e.path.lastIndexOf("/") + 1), this.fileName = e.path.substr(e.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), dataManager.loadAnimation(e.path, this.configAnimation, this.onSetupError));
      }, AnimationItem.prototype.onSetupError = function() {
        this.trigger("data_failed");
      }, AnimationItem.prototype.setupAnimation = function(e) {
        dataManager.completeAnimation(e, this.configAnimation);
      }, AnimationItem.prototype.setData = function(e, t) {
        t && _typeof$4(t) !== "object" && (t = JSON.parse(t));
        var r = {
          wrapper: e,
          animationData: t
        }, i = e.attributes;
        r.path = i.getNamedItem("data-animation-path") ? i.getNamedItem("data-animation-path").value : i.getNamedItem("data-bm-path") ? i.getNamedItem("data-bm-path").value : i.getNamedItem("bm-path") ? i.getNamedItem("bm-path").value : "", r.animType = i.getNamedItem("data-anim-type") ? i.getNamedItem("data-anim-type").value : i.getNamedItem("data-bm-type") ? i.getNamedItem("data-bm-type").value : i.getNamedItem("bm-type") ? i.getNamedItem("bm-type").value : i.getNamedItem("data-bm-renderer") ? i.getNamedItem("data-bm-renderer").value : i.getNamedItem("bm-renderer") ? i.getNamedItem("bm-renderer").value : getRegisteredRenderer() || "canvas";
        var n = i.getNamedItem("data-anim-loop") ? i.getNamedItem("data-anim-loop").value : i.getNamedItem("data-bm-loop") ? i.getNamedItem("data-bm-loop").value : i.getNamedItem("bm-loop") ? i.getNamedItem("bm-loop").value : "";
        n === "false" ? r.loop = !1 : n === "true" ? r.loop = !0 : n !== "" && (r.loop = parseInt(n, 10));
        var s = i.getNamedItem("data-anim-autoplay") ? i.getNamedItem("data-anim-autoplay").value : i.getNamedItem("data-bm-autoplay") ? i.getNamedItem("data-bm-autoplay").value : i.getNamedItem("bm-autoplay") ? i.getNamedItem("bm-autoplay").value : !0;
        r.autoplay = s !== "false", r.name = i.getNamedItem("data-name") ? i.getNamedItem("data-name").value : i.getNamedItem("data-bm-name") ? i.getNamedItem("data-bm-name").value : i.getNamedItem("bm-name") ? i.getNamedItem("bm-name").value : "";
        var a = i.getNamedItem("data-anim-prerender") ? i.getNamedItem("data-anim-prerender").value : i.getNamedItem("data-bm-prerender") ? i.getNamedItem("data-bm-prerender").value : i.getNamedItem("bm-prerender") ? i.getNamedItem("bm-prerender").value : "";
        a === "false" && (r.prerender = !1), r.path ? this.setParams(r) : this.trigger("destroy");
      }, AnimationItem.prototype.includeLayers = function(e) {
        e.op > this.animationData.op && (this.animationData.op = e.op, this.totalFrames = Math.floor(e.op - this.animationData.ip));
        var t = this.animationData.layers, r, i = t.length, n = e.layers, s, a = n.length;
        for (s = 0; s < a; s += 1)
          for (r = 0; r < i; ) {
            if (t[r].id === n[s].id) {
              t[r] = n[s];
              break;
            }
            r += 1;
          }
        if ((e.chars || e.fonts) && (this.renderer.globalData.fontManager.addChars(e.chars), this.renderer.globalData.fontManager.addFonts(e.fonts, this.renderer.globalData.defs)), e.assets)
          for (i = e.assets.length, r = 0; r < i; r += 1)
            this.animationData.assets.push(e.assets[r]);
        this.animationData.__complete = !1, dataManager.completeAnimation(this.animationData, this.onSegmentComplete);
      }, AnimationItem.prototype.onSegmentComplete = function(e) {
        this.animationData = e;
        var t = getExpressionsPlugin();
        t && t.initExpressions(this), this.loadNextSegment();
      }, AnimationItem.prototype.loadNextSegment = function() {
        var e = this.animationData.segments;
        if (!e || e.length === 0 || !this.autoloadSegments) {
          this.trigger("data_ready"), this.timeCompleted = this.totalFrames;
          return;
        }
        var t = e.shift();
        this.timeCompleted = t.time * this.frameRate;
        var r = this.path + this.fileName + "_" + this.segmentPos + ".json";
        this.segmentPos += 1, dataManager.loadData(r, this.includeLayers.bind(this), (function() {
          this.trigger("data_failed");
        }).bind(this));
      }, AnimationItem.prototype.loadSegments = function() {
        var e = this.animationData.segments;
        e || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
      }, AnimationItem.prototype.imagesLoaded = function() {
        this.trigger("loaded_images"), this.checkLoaded();
      }, AnimationItem.prototype.preloadImages = function() {
        this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
      }, AnimationItem.prototype.configAnimation = function(e) {
        if (this.renderer)
          try {
            this.animationData = e, this.initialSegment ? (this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]), this.firstFrame = Math.round(this.initialSegment[0])) : (this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.firstFrame = Math.round(this.animationData.ip)), this.renderer.configAnimation(e), e.assets || (e.assets = []), this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.frameMult = this.animationData.fr / 1e3, this.renderer.searchExtraCompositions(e.assets), this.markers = markerParser(e.markers || []), this.trigger("config_ready"), this.preloadImages(), this.loadSegments(), this.updaFrameModifier(), this.waitForFontsLoaded(), this.isPaused && this.audioController.pause();
          } catch (t) {
            this.triggerConfigError(t);
          }
      }, AnimationItem.prototype.waitForFontsLoaded = function() {
        this.renderer && (this.renderer.globalData.fontManager.isLoaded ? this.checkLoaded() : setTimeout(this.waitForFontsLoaded.bind(this), 20));
      }, AnimationItem.prototype.checkLoaded = function() {
        if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || this.renderer.rendererType !== "canvas") && this.imagePreloader.loadedFootages()) {
          this.isLoaded = !0;
          var e = getExpressionsPlugin();
          e && e.initExpressions(this), this.renderer.initItems(), setTimeout((function() {
            this.trigger("DOMLoaded");
          }).bind(this), 0), this.gotoFrame(), this.autoplay && this.play();
        }
      }, AnimationItem.prototype.resize = function(e, t) {
        var r = typeof e == "number" ? e : void 0, i = typeof t == "number" ? t : void 0;
        this.renderer.updateContainerSize(r, i);
      }, AnimationItem.prototype.setSubframe = function(e) {
        this.isSubframeEnabled = !!e;
      }, AnimationItem.prototype.gotoFrame = function() {
        this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame, this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame(), this.trigger("drawnFrame");
      }, AnimationItem.prototype.renderFrame = function() {
        if (!(this.isLoaded === !1 || !this.renderer))
          try {
            this.expressionsPlugin && this.expressionsPlugin.resetFrame(), this.renderer.renderFrame(this.currentFrame + this.firstFrame);
          } catch (e) {
            this.triggerRenderFrameError(e);
          }
      }, AnimationItem.prototype.play = function(e) {
        e && this.name !== e || this.isPaused === !0 && (this.isPaused = !1, this.trigger("_play"), this.audioController.resume(), this._idle && (this._idle = !1, this.trigger("_active")));
      }, AnimationItem.prototype.pause = function(e) {
        e && this.name !== e || this.isPaused === !1 && (this.isPaused = !0, this.trigger("_pause"), this._idle = !0, this.trigger("_idle"), this.audioController.pause());
      }, AnimationItem.prototype.togglePause = function(e) {
        e && this.name !== e || (this.isPaused === !0 ? this.play() : this.pause());
      }, AnimationItem.prototype.stop = function(e) {
        e && this.name !== e || (this.pause(), this.playCount = 0, this._completedLoop = !1, this.setCurrentRawFrameValue(0));
      }, AnimationItem.prototype.getMarkerData = function(e) {
        for (var t, r = 0; r < this.markers.length; r += 1)
          if (t = this.markers[r], t.payload && t.payload.name === e)
            return t;
        return null;
      }, AnimationItem.prototype.goToAndStop = function(e, t, r) {
        if (!(r && this.name !== r)) {
          var i = Number(e);
          if (isNaN(i)) {
            var n = this.getMarkerData(e);
            n && this.goToAndStop(n.time, !0);
          } else t ? this.setCurrentRawFrameValue(e) : this.setCurrentRawFrameValue(e * this.frameModifier);
          this.pause();
        }
      }, AnimationItem.prototype.goToAndPlay = function(e, t, r) {
        if (!(r && this.name !== r)) {
          var i = Number(e);
          if (isNaN(i)) {
            var n = this.getMarkerData(e);
            n && (n.duration ? this.playSegments([n.time, n.time + n.duration], !0) : this.goToAndStop(n.time, !0));
          } else
            this.goToAndStop(i, t, r);
          this.play();
        }
      }, AnimationItem.prototype.advanceTime = function(e) {
        if (!(this.isPaused === !0 || this.isLoaded === !1)) {
          var t = this.currentRawFrame + e * this.frameModifier, r = !1;
          t >= this.totalFrames - 1 && this.frameModifier > 0 ? !this.loop || this.playCount === this.loop ? this.checkSegments(t > this.totalFrames ? t % this.totalFrames : 0) || (r = !0, t = this.totalFrames - 1) : t >= this.totalFrames ? (this.playCount += 1, this.checkSegments(t % this.totalFrames) || (this.setCurrentRawFrameValue(t % this.totalFrames), this._completedLoop = !0, this.trigger("loopComplete"))) : this.setCurrentRawFrameValue(t) : t < 0 ? this.checkSegments(t % this.totalFrames) || (this.loop && !(this.playCount-- <= 0 && this.loop !== !0) ? (this.setCurrentRawFrameValue(this.totalFrames + t % this.totalFrames), this._completedLoop ? this.trigger("loopComplete") : this._completedLoop = !0) : (r = !0, t = 0)) : this.setCurrentRawFrameValue(t), r && (this.setCurrentRawFrameValue(t), this.pause(), this.trigger("complete"));
        }
      }, AnimationItem.prototype.adjustSegment = function(e, t) {
        this.playCount = 0, e[1] < e[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = e[0] - e[1], this.timeCompleted = this.totalFrames, this.firstFrame = e[1], this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - t)) : e[1] > e[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = e[1] - e[0], this.timeCompleted = this.totalFrames, this.firstFrame = e[0], this.setCurrentRawFrameValue(1e-3 + t)), this.trigger("segmentStart");
      }, AnimationItem.prototype.setSegment = function(e, t) {
        var r = -1;
        this.isPaused && (this.currentRawFrame + this.firstFrame < e ? r = e : this.currentRawFrame + this.firstFrame > t && (r = t - e)), this.firstFrame = e, this.totalFrames = t - e, this.timeCompleted = this.totalFrames, r !== -1 && this.goToAndStop(r, !0);
      }, AnimationItem.prototype.playSegments = function(e, t) {
        if (t && (this.segments.length = 0), _typeof$4(e[0]) === "object") {
          var r, i = e.length;
          for (r = 0; r < i; r += 1)
            this.segments.push(e[r]);
        } else
          this.segments.push(e);
        this.segments.length && t && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
      }, AnimationItem.prototype.resetSegments = function(e) {
        this.segments.length = 0, this.segments.push([this.animationData.ip, this.animationData.op]), e && this.checkSegments(0);
      }, AnimationItem.prototype.checkSegments = function(e) {
        return this.segments.length ? (this.adjustSegment(this.segments.shift(), e), !0) : !1;
      }, AnimationItem.prototype.destroy = function(e) {
        e && this.name !== e || !this.renderer || (this.renderer.destroy(), this.imagePreloader.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = null, this.onLoopComplete = null, this.onComplete = null, this.onSegmentStart = null, this.onDestroy = null, this.renderer = null, this.expressionsPlugin = null, this.imagePreloader = null, this.projectInterface = null);
      }, AnimationItem.prototype.setCurrentRawFrameValue = function(e) {
        this.currentRawFrame = e, this.gotoFrame();
      }, AnimationItem.prototype.setSpeed = function(e) {
        this.playSpeed = e, this.updaFrameModifier();
      }, AnimationItem.prototype.setDirection = function(e) {
        this.playDirection = e < 0 ? -1 : 1, this.updaFrameModifier();
      }, AnimationItem.prototype.setLoop = function(e) {
        this.loop = e;
      }, AnimationItem.prototype.setVolume = function(e, t) {
        t && this.name !== t || this.audioController.setVolume(e);
      }, AnimationItem.prototype.getVolume = function() {
        return this.audioController.getVolume();
      }, AnimationItem.prototype.mute = function(e) {
        e && this.name !== e || this.audioController.mute();
      }, AnimationItem.prototype.unmute = function(e) {
        e && this.name !== e || this.audioController.unmute();
      }, AnimationItem.prototype.updaFrameModifier = function() {
        this.frameModifier = this.frameMult * this.playSpeed * this.playDirection, this.audioController.setRate(this.playSpeed * this.playDirection);
      }, AnimationItem.prototype.getPath = function() {
        return this.path;
      }, AnimationItem.prototype.getAssetsPath = function(e) {
        var t = "";
        if (e.e)
          t = e.p;
        else if (this.assetsPath) {
          var r = e.p;
          r.indexOf("images/") !== -1 && (r = r.split("/")[1]), t = this.assetsPath + r;
        } else
          t = this.path, t += e.u ? e.u : "", t += e.p;
        return t;
      }, AnimationItem.prototype.getAssetData = function(e) {
        for (var t = 0, r = this.assets.length; t < r; ) {
          if (e === this.assets[t].id)
            return this.assets[t];
          t += 1;
        }
        return null;
      }, AnimationItem.prototype.hide = function() {
        this.renderer.hide();
      }, AnimationItem.prototype.show = function() {
        this.renderer.show();
      }, AnimationItem.prototype.getDuration = function(e) {
        return e ? this.totalFrames : this.totalFrames / this.frameRate;
      }, AnimationItem.prototype.updateDocumentData = function(e, t, r) {
        try {
          var i = this.renderer.getElementByPath(e);
          i.updateDocumentData(t, r);
        } catch {
        }
      }, AnimationItem.prototype.trigger = function(e) {
        if (this._cbs && this._cbs[e])
          switch (e) {
            case "enterFrame":
              this.triggerEvent(e, new BMEnterFrameEvent(e, this.currentFrame, this.totalFrames, this.frameModifier));
              break;
            case "drawnFrame":
              this.drawnFrameEvent.currentTime = this.currentFrame, this.drawnFrameEvent.totalTime = this.totalFrames, this.drawnFrameEvent.direction = this.frameModifier, this.triggerEvent(e, this.drawnFrameEvent);
              break;
            case "loopComplete":
              this.triggerEvent(e, new BMCompleteLoopEvent(e, this.loop, this.playCount, this.frameMult));
              break;
            case "complete":
              this.triggerEvent(e, new BMCompleteEvent(e, this.frameMult));
              break;
            case "segmentStart":
              this.triggerEvent(e, new BMSegmentStartEvent(e, this.firstFrame, this.totalFrames));
              break;
            case "destroy":
              this.triggerEvent(e, new BMDestroyEvent(e, this));
              break;
            default:
              this.triggerEvent(e);
          }
        e === "enterFrame" && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(e, this.currentFrame, this.totalFrames, this.frameMult)), e === "loopComplete" && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(e, this.loop, this.playCount, this.frameMult)), e === "complete" && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(e, this.frameMult)), e === "segmentStart" && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(e, this.firstFrame, this.totalFrames)), e === "destroy" && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(e, this));
      }, AnimationItem.prototype.triggerRenderFrameError = function(e) {
        var t = new BMRenderFrameErrorEvent(e, this.currentFrame);
        this.triggerEvent("error", t), this.onError && this.onError.call(this, t);
      }, AnimationItem.prototype.triggerConfigError = function(e) {
        var t = new BMConfigErrorEvent(e, this.currentFrame);
        this.triggerEvent("error", t), this.onError && this.onError.call(this, t);
      };
      var animationManager = function() {
        var e = {}, t = [], r = 0, i = 0, n = 0, s = !0, a = !1;
        function l(A) {
          for (var k = 0, x = A.target; k < i; )
            t[k].animation === x && (t.splice(k, 1), k -= 1, i -= 1, x.isPaused || v()), k += 1;
        }
        function o(A, k) {
          if (!A)
            return null;
          for (var x = 0; x < i; ) {
            if (t[x].elem === A && t[x].elem !== null)
              return t[x].animation;
            x += 1;
          }
          var P = new AnimationItem();
          return h(P, A), P.setData(A, k), P;
        }
        function f() {
          var A, k = t.length, x = [];
          for (A = 0; A < k; A += 1)
            x.push(t[A].animation);
          return x;
        }
        function c() {
          n += 1, j();
        }
        function v() {
          n -= 1;
        }
        function h(A, k) {
          A.addEventListener("destroy", l), A.addEventListener("_active", c), A.addEventListener("_idle", v), t.push({
            elem: k,
            animation: A
          }), i += 1;
        }
        function g(A) {
          var k = new AnimationItem();
          return h(k, null), k.setParams(A), k;
        }
        function m(A, k) {
          var x;
          for (x = 0; x < i; x += 1)
            t[x].animation.setSpeed(A, k);
        }
        function p(A, k) {
          var x;
          for (x = 0; x < i; x += 1)
            t[x].animation.setDirection(A, k);
        }
        function b(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.play(A);
        }
        function u(A) {
          var k = A - r, x;
          for (x = 0; x < i; x += 1)
            t[x].animation.advanceTime(k);
          r = A, n && !a ? window.requestAnimationFrame(u) : s = !0;
        }
        function y(A) {
          r = A, window.requestAnimationFrame(u);
        }
        function d(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.pause(A);
        }
        function E(A, k, x) {
          var P;
          for (P = 0; P < i; P += 1)
            t[P].animation.goToAndStop(A, k, x);
        }
        function S(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.stop(A);
        }
        function C(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.togglePause(A);
        }
        function w(A) {
          var k;
          for (k = i - 1; k >= 0; k -= 1)
            t[k].animation.destroy(A);
        }
        function M(A, k, x) {
          var P = [].concat([].slice.call(document.getElementsByClassName("lottie")), [].slice.call(document.getElementsByClassName("bodymovin"))), T, R = P.length;
          for (T = 0; T < R; T += 1)
            x && P[T].setAttribute("data-bm-type", x), o(P[T], A);
          if (k && R === 0) {
            x || (x = "svg");
            var N = document.getElementsByTagName("body")[0];
            N.innerText = "";
            var H = createTag("div");
            H.style.width = "100%", H.style.height = "100%", H.setAttribute("data-bm-type", x), N.appendChild(H), o(H, A);
          }
        }
        function O() {
          var A;
          for (A = 0; A < i; A += 1)
            t[A].animation.resize();
        }
        function j() {
          !a && n && s && (window.requestAnimationFrame(y), s = !1);
        }
        function B() {
          a = !0;
        }
        function L() {
          a = !1, j();
        }
        function V(A, k) {
          var x;
          for (x = 0; x < i; x += 1)
            t[x].animation.setVolume(A, k);
        }
        function $(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.mute(A);
        }
        function D(A) {
          var k;
          for (k = 0; k < i; k += 1)
            t[k].animation.unmute(A);
        }
        return e.registerAnimation = o, e.loadAnimation = g, e.setSpeed = m, e.setDirection = p, e.play = b, e.pause = d, e.stop = S, e.togglePause = C, e.searchAnimations = M, e.resize = O, e.goToAndStop = E, e.destroy = w, e.freeze = B, e.unfreeze = L, e.setVolume = V, e.mute = $, e.unmute = D, e.getRegisteredAnimations = f, e;
      }(), BezierFactory = function() {
        var e = {};
        e.getBezierEasing = r;
        var t = {};
        function r(y, d, E, S, C) {
          var w = C || ("bez_" + y + "_" + d + "_" + E + "_" + S).replace(/\./g, "p");
          if (t[w])
            return t[w];
          var M = new u([y, d, E, S]);
          return t[w] = M, M;
        }
        var i = 4, n = 1e-3, s = 1e-7, a = 10, l = 11, o = 1 / (l - 1), f = typeof Float32Array == "function";
        function c(y, d) {
          return 1 - 3 * d + 3 * y;
        }
        function v(y, d) {
          return 3 * d - 6 * y;
        }
        function h(y) {
          return 3 * y;
        }
        function g(y, d, E) {
          return ((c(d, E) * y + v(d, E)) * y + h(d)) * y;
        }
        function m(y, d, E) {
          return 3 * c(d, E) * y * y + 2 * v(d, E) * y + h(d);
        }
        function p(y, d, E, S, C) {
          var w, M, O = 0;
          do
            M = d + (E - d) / 2, w = g(M, S, C) - y, w > 0 ? E = M : d = M;
          while (Math.abs(w) > s && ++O < a);
          return M;
        }
        function b(y, d, E, S) {
          for (var C = 0; C < i; ++C) {
            var w = m(d, E, S);
            if (w === 0) return d;
            var M = g(d, E, S) - y;
            d -= M / w;
          }
          return d;
        }
        function u(y) {
          this._p = y, this._mSampleValues = f ? new Float32Array(l) : new Array(l), this._precomputed = !1, this.get = this.get.bind(this);
        }
        return u.prototype = {
          get: function(d) {
            var E = this._p[0], S = this._p[1], C = this._p[2], w = this._p[3];
            return this._precomputed || this._precompute(), E === S && C === w ? d : d === 0 ? 0 : d === 1 ? 1 : g(this._getTForX(d), S, w);
          },
          // Private part
          _precompute: function() {
            var d = this._p[0], E = this._p[1], S = this._p[2], C = this._p[3];
            this._precomputed = !0, (d !== E || S !== C) && this._calcSampleValues();
          },
          _calcSampleValues: function() {
            for (var d = this._p[0], E = this._p[2], S = 0; S < l; ++S)
              this._mSampleValues[S] = g(S * o, d, E);
          },
          /**
               * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
               */
          _getTForX: function(d) {
            for (var E = this._p[0], S = this._p[2], C = this._mSampleValues, w = 0, M = 1, O = l - 1; M !== O && C[M] <= d; ++M)
              w += o;
            --M;
            var j = (d - C[M]) / (C[M + 1] - C[M]), B = w + j * o, L = m(B, E, S);
            return L >= n ? b(d, B, E, S) : L === 0 ? B : p(d, w, w + o, E, S);
          }
        }, e;
      }(), pooling = /* @__PURE__ */ function() {
        function e(t) {
          return t.concat(createSizedArray(t.length));
        }
        return {
          double: e
        };
      }(), poolFactory = /* @__PURE__ */ function() {
        return function(e, t, r) {
          var i = 0, n = e, s = createSizedArray(n), a = {
            newElement: l,
            release: o
          };
          function l() {
            var f;
            return i ? (i -= 1, f = s[i]) : f = t(), f;
          }
          function o(f) {
            i === n && (s = pooling.double(s), n *= 2), r && r(f), s[i] = f, i += 1;
          }
          return a;
        };
      }(), bezierLengthPool = function() {
        function e() {
          return {
            addedLength: 0,
            percents: createTypedArray("float32", getDefaultCurveSegments()),
            lengths: createTypedArray("float32", getDefaultCurveSegments())
          };
        }
        return poolFactory(8, e);
      }(), segmentsLengthPool = function() {
        function e() {
          return {
            lengths: [],
            totalLength: 0
          };
        }
        function t(r) {
          var i, n = r.lengths.length;
          for (i = 0; i < n; i += 1)
            bezierLengthPool.release(r.lengths[i]);
          r.lengths.length = 0;
        }
        return poolFactory(8, e, t);
      }();
      function bezFunction() {
        var e = Math;
        function t(h, g, m, p, b, u) {
          var y = h * p + g * b + m * u - b * p - u * h - m * g;
          return y > -1e-3 && y < 1e-3;
        }
        function r(h, g, m, p, b, u, y, d, E) {
          if (m === 0 && u === 0 && E === 0)
            return t(h, g, p, b, y, d);
          var S = e.sqrt(e.pow(p - h, 2) + e.pow(b - g, 2) + e.pow(u - m, 2)), C = e.sqrt(e.pow(y - h, 2) + e.pow(d - g, 2) + e.pow(E - m, 2)), w = e.sqrt(e.pow(y - p, 2) + e.pow(d - b, 2) + e.pow(E - u, 2)), M;
          return S > C ? S > w ? M = S - C - w : M = w - C - S : w > C ? M = w - C - S : M = C - S - w, M > -1e-4 && M < 1e-4;
        }
        var i = /* @__PURE__ */ function() {
          return function(h, g, m, p) {
            var b = getDefaultCurveSegments(), u, y, d, E, S, C = 0, w, M = [], O = [], j = bezierLengthPool.newElement();
            for (d = m.length, u = 0; u < b; u += 1) {
              for (S = u / (b - 1), w = 0, y = 0; y < d; y += 1)
                E = bmPow(1 - S, 3) * h[y] + 3 * bmPow(1 - S, 2) * S * m[y] + 3 * (1 - S) * bmPow(S, 2) * p[y] + bmPow(S, 3) * g[y], M[y] = E, O[y] !== null && (w += bmPow(M[y] - O[y], 2)), O[y] = M[y];
              w && (w = bmSqrt(w), C += w), j.percents[u] = S, j.lengths[u] = C;
            }
            return j.addedLength = C, j;
          };
        }();
        function n(h) {
          var g = segmentsLengthPool.newElement(), m = h.c, p = h.v, b = h.o, u = h.i, y, d = h._length, E = g.lengths, S = 0;
          for (y = 0; y < d - 1; y += 1)
            E[y] = i(p[y], p[y + 1], b[y], u[y + 1]), S += E[y].addedLength;
          return m && d && (E[y] = i(p[y], p[0], b[y], u[0]), S += E[y].addedLength), g.totalLength = S, g;
        }
        function s(h) {
          this.segmentLength = 0, this.points = new Array(h);
        }
        function a(h, g) {
          this.partialLength = h, this.point = g;
        }
        var l = /* @__PURE__ */ function() {
          var h = {};
          return function(g, m, p, b) {
            var u = (g[0] + "_" + g[1] + "_" + m[0] + "_" + m[1] + "_" + p[0] + "_" + p[1] + "_" + b[0] + "_" + b[1]).replace(/\./g, "p");
            if (!h[u]) {
              var y = getDefaultCurveSegments(), d, E, S, C, w, M = 0, O, j, B = null;
              g.length === 2 && (g[0] !== m[0] || g[1] !== m[1]) && t(g[0], g[1], m[0], m[1], g[0] + p[0], g[1] + p[1]) && t(g[0], g[1], m[0], m[1], m[0] + b[0], m[1] + b[1]) && (y = 2);
              var L = new s(y);
              for (S = p.length, d = 0; d < y; d += 1) {
                for (j = createSizedArray(S), w = d / (y - 1), O = 0, E = 0; E < S; E += 1)
                  C = bmPow(1 - w, 3) * g[E] + 3 * bmPow(1 - w, 2) * w * (g[E] + p[E]) + 3 * (1 - w) * bmPow(w, 2) * (m[E] + b[E]) + bmPow(w, 3) * m[E], j[E] = C, B !== null && (O += bmPow(j[E] - B[E], 2));
                O = bmSqrt(O), M += O, L.points[d] = new a(O, j), B = j;
              }
              L.segmentLength = M, h[u] = L;
            }
            return h[u];
          };
        }();
        function o(h, g) {
          var m = g.percents, p = g.lengths, b = m.length, u = bmFloor((b - 1) * h), y = h * g.addedLength, d = 0;
          if (u === b - 1 || u === 0 || y === p[u])
            return m[u];
          for (var E = p[u] > y ? -1 : 1, S = !0; S; )
            if (p[u] <= y && p[u + 1] > y ? (d = (y - p[u]) / (p[u + 1] - p[u]), S = !1) : u += E, u < 0 || u >= b - 1) {
              if (u === b - 1)
                return m[u];
              S = !1;
            }
          return m[u] + (m[u + 1] - m[u]) * d;
        }
        function f(h, g, m, p, b, u) {
          var y = o(b, u), d = 1 - y, E = e.round((d * d * d * h[0] + (y * d * d + d * y * d + d * d * y) * m[0] + (y * y * d + d * y * y + y * d * y) * p[0] + y * y * y * g[0]) * 1e3) / 1e3, S = e.round((d * d * d * h[1] + (y * d * d + d * y * d + d * d * y) * m[1] + (y * y * d + d * y * y + y * d * y) * p[1] + y * y * y * g[1]) * 1e3) / 1e3;
          return [E, S];
        }
        var c = createTypedArray("float32", 8);
        function v(h, g, m, p, b, u, y) {
          b < 0 ? b = 0 : b > 1 && (b = 1);
          var d = o(b, y);
          u = u > 1 ? 1 : u;
          var E = o(u, y), S, C = h.length, w = 1 - d, M = 1 - E, O = w * w * w, j = d * w * w * 3, B = d * d * w * 3, L = d * d * d, V = w * w * M, $ = d * w * M + w * d * M + w * w * E, D = d * d * M + w * d * E + d * w * E, A = d * d * E, k = w * M * M, x = d * M * M + w * E * M + w * M * E, P = d * E * M + w * E * E + d * M * E, T = d * E * E, R = M * M * M, N = E * M * M + M * E * M + M * M * E, H = E * E * M + M * E * E + E * M * E, z = E * E * E;
          for (S = 0; S < C; S += 1)
            c[S * 4] = e.round((O * h[S] + j * m[S] + B * p[S] + L * g[S]) * 1e3) / 1e3, c[S * 4 + 1] = e.round((V * h[S] + $ * m[S] + D * p[S] + A * g[S]) * 1e3) / 1e3, c[S * 4 + 2] = e.round((k * h[S] + x * m[S] + P * p[S] + T * g[S]) * 1e3) / 1e3, c[S * 4 + 3] = e.round((R * h[S] + N * m[S] + H * p[S] + z * g[S]) * 1e3) / 1e3;
          return c;
        }
        return {
          getSegmentsLength: n,
          getNewSegment: v,
          getPointInSegment: f,
          buildBezierData: l,
          pointOnLine2D: t,
          pointOnLine3D: r
        };
      }
      var bez = bezFunction(), initFrame = initialDefaultFrame, mathAbs = Math.abs;
      function interpolateValue(e, t) {
        var r = this.offsetTime, i;
        this.propType === "multidimensional" && (i = createTypedArray("float32", this.pv.length));
        for (var n = t.lastIndex, s = n, a = this.keyframes.length - 1, l = !0, o, f, c; l; ) {
          if (o = this.keyframes[s], f = this.keyframes[s + 1], s === a - 1 && e >= f.t - r) {
            o.h && (o = f), n = 0;
            break;
          }
          if (f.t - r > e) {
            n = s;
            break;
          }
          s < a - 1 ? s += 1 : (n = 0, l = !1);
        }
        c = this.keyframesMetadata[s] || {};
        var v, h, g, m, p, b, u = f.t - r, y = o.t - r, d;
        if (o.to) {
          c.bezierData || (c.bezierData = bez.buildBezierData(o.s, f.s || o.e, o.to, o.ti));
          var E = c.bezierData;
          if (e >= u || e < y) {
            var S = e >= u ? E.points.length - 1 : 0;
            for (h = E.points[S].point.length, v = 0; v < h; v += 1)
              i[v] = E.points[S].point[v];
          } else {
            c.__fnct ? b = c.__fnct : (b = BezierFactory.getBezierEasing(o.o.x, o.o.y, o.i.x, o.i.y, o.n).get, c.__fnct = b), g = b((e - y) / (u - y));
            var C = E.segmentLength * g, w, M = t.lastFrame < e && t._lastKeyframeIndex === s ? t._lastAddedLength : 0;
            for (p = t.lastFrame < e && t._lastKeyframeIndex === s ? t._lastPoint : 0, l = !0, m = E.points.length; l; ) {
              if (M += E.points[p].partialLength, C === 0 || g === 0 || p === E.points.length - 1) {
                for (h = E.points[p].point.length, v = 0; v < h; v += 1)
                  i[v] = E.points[p].point[v];
                break;
              } else if (C >= M && C < M + E.points[p + 1].partialLength) {
                for (w = (C - M) / E.points[p + 1].partialLength, h = E.points[p].point.length, v = 0; v < h; v += 1)
                  i[v] = E.points[p].point[v] + (E.points[p + 1].point[v] - E.points[p].point[v]) * w;
                break;
              }
              p < m - 1 ? p += 1 : l = !1;
            }
            t._lastPoint = p, t._lastAddedLength = M - E.points[p].partialLength, t._lastKeyframeIndex = s;
          }
        } else {
          var O, j, B, L, V;
          if (a = o.s.length, d = f.s || o.e, this.sh && o.h !== 1)
            if (e >= u)
              i[0] = d[0], i[1] = d[1], i[2] = d[2];
            else if (e <= y)
              i[0] = o.s[0], i[1] = o.s[1], i[2] = o.s[2];
            else {
              var $ = createQuaternion(o.s), D = createQuaternion(d), A = (e - y) / (u - y);
              quaternionToEuler(i, slerp($, D, A));
            }
          else
            for (s = 0; s < a; s += 1)
              o.h !== 1 && (e >= u ? g = 1 : e < y ? g = 0 : (o.o.x.constructor === Array ? (c.__fnct || (c.__fnct = []), c.__fnct[s] ? b = c.__fnct[s] : (O = o.o.x[s] === void 0 ? o.o.x[0] : o.o.x[s], j = o.o.y[s] === void 0 ? o.o.y[0] : o.o.y[s], B = o.i.x[s] === void 0 ? o.i.x[0] : o.i.x[s], L = o.i.y[s] === void 0 ? o.i.y[0] : o.i.y[s], b = BezierFactory.getBezierEasing(O, j, B, L).get, c.__fnct[s] = b)) : c.__fnct ? b = c.__fnct : (O = o.o.x, j = o.o.y, B = o.i.x, L = o.i.y, b = BezierFactory.getBezierEasing(O, j, B, L).get, o.keyframeMetadata = b), g = b((e - y) / (u - y)))), d = f.s || o.e, V = o.h === 1 ? o.s[s] : o.s[s] + (d[s] - o.s[s]) * g, this.propType === "multidimensional" ? i[s] = V : i = V;
        }
        return t.lastIndex = n, i;
      }
      function slerp(e, t, r) {
        var i = [], n = e[0], s = e[1], a = e[2], l = e[3], o = t[0], f = t[1], c = t[2], v = t[3], h, g, m, p, b;
        return g = n * o + s * f + a * c + l * v, g < 0 && (g = -g, o = -o, f = -f, c = -c, v = -v), 1 - g > 1e-6 ? (h = Math.acos(g), m = Math.sin(h), p = Math.sin((1 - r) * h) / m, b = Math.sin(r * h) / m) : (p = 1 - r, b = r), i[0] = p * n + b * o, i[1] = p * s + b * f, i[2] = p * a + b * c, i[3] = p * l + b * v, i;
      }
      function quaternionToEuler(e, t) {
        var r = t[0], i = t[1], n = t[2], s = t[3], a = Math.atan2(2 * i * s - 2 * r * n, 1 - 2 * i * i - 2 * n * n), l = Math.asin(2 * r * i + 2 * n * s), o = Math.atan2(2 * r * s - 2 * i * n, 1 - 2 * r * r - 2 * n * n);
        e[0] = a / degToRads, e[1] = l / degToRads, e[2] = o / degToRads;
      }
      function createQuaternion(e) {
        var t = e[0] * degToRads, r = e[1] * degToRads, i = e[2] * degToRads, n = Math.cos(t / 2), s = Math.cos(r / 2), a = Math.cos(i / 2), l = Math.sin(t / 2), o = Math.sin(r / 2), f = Math.sin(i / 2), c = n * s * a - l * o * f, v = l * o * a + n * s * f, h = l * s * a + n * o * f, g = n * o * a - l * s * f;
        return [v, h, g, c];
      }
      function getValueAtCurrentTime() {
        var e = this.comp.renderedFrame - this.offsetTime, t = this.keyframes[0].t - this.offsetTime, r = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
        if (!(e === this._caching.lastFrame || this._caching.lastFrame !== initFrame && (this._caching.lastFrame >= r && e >= r || this._caching.lastFrame < t && e < t))) {
          this._caching.lastFrame >= e && (this._caching._lastKeyframeIndex = -1, this._caching.lastIndex = 0);
          var i = this.interpolateValue(e, this._caching);
          this.pv = i;
        }
        return this._caching.lastFrame = e, this.pv;
      }
      function setVValue(e) {
        var t;
        if (this.propType === "unidimensional")
          t = e * this.mult, mathAbs(this.v - t) > 1e-5 && (this.v = t, this._mdf = !0);
        else
          for (var r = 0, i = this.v.length; r < i; )
            t = e[r] * this.mult, mathAbs(this.v[r] - t) > 1e-5 && (this.v[r] = t, this._mdf = !0), r += 1;
      }
      function processEffectsSequence() {
        if (!(this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length)) {
          if (this.lock) {
            this.setVValue(this.pv);
            return;
          }
          this.lock = !0, this._mdf = this._isFirstFrame;
          var e, t = this.effectsSequence.length, r = this.kf ? this.pv : this.data.k;
          for (e = 0; e < t; e += 1)
            r = this.effectsSequence[e](r);
          this.setVValue(r), this._isFirstFrame = !1, this.lock = !1, this.frameId = this.elem.globalData.frameId;
        }
      }
      function addEffect(e) {
        this.effectsSequence.push(e), this.container.addDynamicProperty(this);
      }
      function ValueProperty(e, t, r, i) {
        this.propType = "unidimensional", this.mult = r || 1, this.data = t, this.v = r ? t.k * r : t.k, this.pv = t.k, this._mdf = !1, this.elem = e, this.container = i, this.comp = e.comp, this.k = !1, this.kf = !1, this.vel = 0, this.effectsSequence = [], this._isFirstFrame = !0, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.addEffect = addEffect;
      }
      function MultiDimensionalProperty(e, t, r, i) {
        this.propType = "multidimensional", this.mult = r || 1, this.data = t, this._mdf = !1, this.elem = e, this.container = i, this.comp = e.comp, this.k = !1, this.kf = !1, this.frameId = -1;
        var n, s = t.k.length;
        for (this.v = createTypedArray("float32", s), this.pv = createTypedArray("float32", s), this.vel = createTypedArray("float32", s), n = 0; n < s; n += 1)
          this.v[n] = t.k[n] * this.mult, this.pv[n] = t.k[n];
        this._isFirstFrame = !0, this.effectsSequence = [], this.getValue = processEffectsSequence, this.setVValue = setVValue, this.addEffect = addEffect;
      }
      function KeyframedValueProperty(e, t, r, i) {
        this.propType = "unidimensional", this.keyframes = t.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.frameId = -1, this._caching = {
          lastFrame: initFrame,
          lastIndex: 0,
          value: 0,
          _lastKeyframeIndex: -1
        }, this.k = !0, this.kf = !0, this.data = t, this.mult = r || 1, this.elem = e, this.container = i, this.comp = e.comp, this.v = initFrame, this.pv = initFrame, this._isFirstFrame = !0, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.interpolateValue = interpolateValue, this.effectsSequence = [getValueAtCurrentTime.bind(this)], this.addEffect = addEffect;
      }
      function KeyframedMultidimensionalProperty(e, t, r, i) {
        this.propType = "multidimensional";
        var n, s = t.k.length, a, l, o, f;
        for (n = 0; n < s - 1; n += 1)
          t.k[n].to && t.k[n].s && t.k[n + 1] && t.k[n + 1].s && (a = t.k[n].s, l = t.k[n + 1].s, o = t.k[n].to, f = t.k[n].ti, (a.length === 2 && !(a[0] === l[0] && a[1] === l[1]) && bez.pointOnLine2D(a[0], a[1], l[0], l[1], a[0] + o[0], a[1] + o[1]) && bez.pointOnLine2D(a[0], a[1], l[0], l[1], l[0] + f[0], l[1] + f[1]) || a.length === 3 && !(a[0] === l[0] && a[1] === l[1] && a[2] === l[2]) && bez.pointOnLine3D(a[0], a[1], a[2], l[0], l[1], l[2], a[0] + o[0], a[1] + o[1], a[2] + o[2]) && bez.pointOnLine3D(a[0], a[1], a[2], l[0], l[1], l[2], l[0] + f[0], l[1] + f[1], l[2] + f[2])) && (t.k[n].to = null, t.k[n].ti = null), a[0] === l[0] && a[1] === l[1] && o[0] === 0 && o[1] === 0 && f[0] === 0 && f[1] === 0 && (a.length === 2 || a[2] === l[2] && o[2] === 0 && f[2] === 0) && (t.k[n].to = null, t.k[n].ti = null));
        this.effectsSequence = [getValueAtCurrentTime.bind(this)], this.data = t, this.keyframes = t.k, this.keyframesMetadata = [], this.offsetTime = e.data.st, this.k = !0, this.kf = !0, this._isFirstFrame = !0, this.mult = r || 1, this.elem = e, this.container = i, this.comp = e.comp, this.getValue = processEffectsSequence, this.setVValue = setVValue, this.interpolateValue = interpolateValue, this.frameId = -1;
        var c = t.k[0].s.length;
        for (this.v = createTypedArray("float32", c), this.pv = createTypedArray("float32", c), n = 0; n < c; n += 1)
          this.v[n] = initFrame, this.pv[n] = initFrame;
        this._caching = {
          lastFrame: initFrame,
          lastIndex: 0,
          value: createTypedArray("float32", c)
        }, this.addEffect = addEffect;
      }
      var PropertyFactory = /* @__PURE__ */ function() {
        function e(r, i, n, s, a) {
          i.sid && (i = r.globalData.slotManager.getProp(i));
          var l;
          if (!i.k.length)
            l = new ValueProperty(r, i, s, a);
          else if (typeof i.k[0] == "number")
            l = new MultiDimensionalProperty(r, i, s, a);
          else
            switch (n) {
              case 0:
                l = new KeyframedValueProperty(r, i, s, a);
                break;
              case 1:
                l = new KeyframedMultidimensionalProperty(r, i, s, a);
                break;
            }
          return l.effectsSequence.length && a.addDynamicProperty(l), l;
        }
        var t = {
          getProp: e
        };
        return t;
      }();
      function DynamicPropertyContainer() {
      }
      DynamicPropertyContainer.prototype = {
        addDynamicProperty: function(t) {
          this.dynamicProperties.indexOf(t) === -1 && (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), this._isAnimated = !0);
        },
        iterateDynamicProperties: function() {
          this._mdf = !1;
          var t, r = this.dynamicProperties.length;
          for (t = 0; t < r; t += 1)
            this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
        },
        initDynamicPropertyContainer: function(t) {
          this.container = t, this.dynamicProperties = [], this._mdf = !1, this._isAnimated = !1;
        }
      };
      var pointPool = function() {
        function e() {
          return createTypedArray("float32", 2);
        }
        return poolFactory(8, e);
      }();
      function ShapePath() {
        this.c = !1, this._length = 0, this._maxLength = 8, this.v = createSizedArray(this._maxLength), this.o = createSizedArray(this._maxLength), this.i = createSizedArray(this._maxLength);
      }
      ShapePath.prototype.setPathData = function(e, t) {
        this.c = e, this.setLength(t);
        for (var r = 0; r < t; )
          this.v[r] = pointPool.newElement(), this.o[r] = pointPool.newElement(), this.i[r] = pointPool.newElement(), r += 1;
      }, ShapePath.prototype.setLength = function(e) {
        for (; this._maxLength < e; )
          this.doubleArrayLength();
        this._length = e;
      }, ShapePath.prototype.doubleArrayLength = function() {
        this.v = this.v.concat(createSizedArray(this._maxLength)), this.i = this.i.concat(createSizedArray(this._maxLength)), this.o = this.o.concat(createSizedArray(this._maxLength)), this._maxLength *= 2;
      }, ShapePath.prototype.setXYAt = function(e, t, r, i, n) {
        var s;
        switch (this._length = Math.max(this._length, i + 1), this._length >= this._maxLength && this.doubleArrayLength(), r) {
          case "v":
            s = this.v;
            break;
          case "i":
            s = this.i;
            break;
          case "o":
            s = this.o;
            break;
          default:
            s = [];
            break;
        }
        (!s[i] || s[i] && !n) && (s[i] = pointPool.newElement()), s[i][0] = e, s[i][1] = t;
      }, ShapePath.prototype.setTripleAt = function(e, t, r, i, n, s, a, l) {
        this.setXYAt(e, t, "v", a, l), this.setXYAt(r, i, "o", a, l), this.setXYAt(n, s, "i", a, l);
      }, ShapePath.prototype.reverse = function() {
        var e = new ShapePath();
        e.setPathData(this.c, this._length);
        var t = this.v, r = this.o, i = this.i, n = 0;
        this.c && (e.setTripleAt(t[0][0], t[0][1], i[0][0], i[0][1], r[0][0], r[0][1], 0, !1), n = 1);
        var s = this._length - 1, a = this._length, l;
        for (l = n; l < a; l += 1)
          e.setTripleAt(t[s][0], t[s][1], i[s][0], i[s][1], r[s][0], r[s][1], l, !1), s -= 1;
        return e;
      }, ShapePath.prototype.length = function() {
        return this._length;
      };
      var shapePool = function() {
        function e() {
          return new ShapePath();
        }
        function t(n) {
          var s = n._length, a;
          for (a = 0; a < s; a += 1)
            pointPool.release(n.v[a]), pointPool.release(n.i[a]), pointPool.release(n.o[a]), n.v[a] = null, n.i[a] = null, n.o[a] = null;
          n._length = 0, n.c = !1;
        }
        function r(n) {
          var s = i.newElement(), a, l = n._length === void 0 ? n.v.length : n._length;
          for (s.setLength(l), s.c = n.c, a = 0; a < l; a += 1)
            s.setTripleAt(n.v[a][0], n.v[a][1], n.o[a][0], n.o[a][1], n.i[a][0], n.i[a][1], a);
          return s;
        }
        var i = poolFactory(4, e, t);
        return i.clone = r, i;
      }();
      function ShapeCollection() {
        this._length = 0, this._maxLength = 4, this.shapes = createSizedArray(this._maxLength);
      }
      ShapeCollection.prototype.addShape = function(e) {
        this._length === this._maxLength && (this.shapes = this.shapes.concat(createSizedArray(this._maxLength)), this._maxLength *= 2), this.shapes[this._length] = e, this._length += 1;
      }, ShapeCollection.prototype.releaseShapes = function() {
        var e;
        for (e = 0; e < this._length; e += 1)
          shapePool.release(this.shapes[e]);
        this._length = 0;
      };
      var shapeCollectionPool = function() {
        var e = {
          newShapeCollection: n,
          release: s
        }, t = 0, r = 4, i = createSizedArray(r);
        function n() {
          var a;
          return t ? (t -= 1, a = i[t]) : a = new ShapeCollection(), a;
        }
        function s(a) {
          var l, o = a._length;
          for (l = 0; l < o; l += 1)
            shapePool.release(a.shapes[l]);
          a._length = 0, t === r && (i = pooling.double(i), r *= 2), i[t] = a, t += 1;
        }
        return e;
      }(), ShapePropertyFactory = function() {
        var e = -999999;
        function t(u, y, d) {
          var E = d.lastIndex, S, C, w, M, O, j, B, L, V, $ = this.keyframes;
          if (u < $[0].t - this.offsetTime)
            S = $[0].s[0], w = !0, E = 0;
          else if (u >= $[$.length - 1].t - this.offsetTime)
            S = $[$.length - 1].s ? $[$.length - 1].s[0] : $[$.length - 2].e[0], w = !0;
          else {
            for (var D = E, A = $.length - 1, k = !0, x, P, T; k && (x = $[D], P = $[D + 1], !(P.t - this.offsetTime > u)); )
              D < A - 1 ? D += 1 : k = !1;
            if (T = this.keyframesMetadata[D] || {}, w = x.h === 1, E = D, !w) {
              if (u >= P.t - this.offsetTime)
                L = 1;
              else if (u < x.t - this.offsetTime)
                L = 0;
              else {
                var R;
                T.__fnct ? R = T.__fnct : (R = BezierFactory.getBezierEasing(x.o.x, x.o.y, x.i.x, x.i.y).get, T.__fnct = R), L = R((u - (x.t - this.offsetTime)) / (P.t - this.offsetTime - (x.t - this.offsetTime)));
              }
              C = P.s ? P.s[0] : x.e[0];
            }
            S = x.s[0];
          }
          for (j = y._length, B = S.i[0].length, d.lastIndex = E, M = 0; M < j; M += 1)
            for (O = 0; O < B; O += 1)
              V = w ? S.i[M][O] : S.i[M][O] + (C.i[M][O] - S.i[M][O]) * L, y.i[M][O] = V, V = w ? S.o[M][O] : S.o[M][O] + (C.o[M][O] - S.o[M][O]) * L, y.o[M][O] = V, V = w ? S.v[M][O] : S.v[M][O] + (C.v[M][O] - S.v[M][O]) * L, y.v[M][O] = V;
        }
        function r() {
          var u = this.comp.renderedFrame - this.offsetTime, y = this.keyframes[0].t - this.offsetTime, d = this.keyframes[this.keyframes.length - 1].t - this.offsetTime, E = this._caching.lastFrame;
          return E !== e && (E < y && u < y || E > d && u > d) || (this._caching.lastIndex = E < u ? this._caching.lastIndex : 0, this.interpolateShape(u, this.pv, this._caching)), this._caching.lastFrame = u, this.pv;
        }
        function i() {
          this.paths = this.localShapeCollection;
        }
        function n(u, y) {
          if (u._length !== y._length || u.c !== y.c)
            return !1;
          var d, E = u._length;
          for (d = 0; d < E; d += 1)
            if (u.v[d][0] !== y.v[d][0] || u.v[d][1] !== y.v[d][1] || u.o[d][0] !== y.o[d][0] || u.o[d][1] !== y.o[d][1] || u.i[d][0] !== y.i[d][0] || u.i[d][1] !== y.i[d][1])
              return !1;
          return !0;
        }
        function s(u) {
          n(this.v, u) || (this.v = shapePool.clone(u), this.localShapeCollection.releaseShapes(), this.localShapeCollection.addShape(this.v), this._mdf = !0, this.paths = this.localShapeCollection);
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
            var u;
            this.kf ? u = this.pv : this.data.ks ? u = this.data.ks.k : u = this.data.pt.k;
            var y, d = this.effectsSequence.length;
            for (y = 0; y < d; y += 1)
              u = this.effectsSequence[y](u);
            this.setVValue(u), this.lock = !1, this.frameId = this.elem.globalData.frameId;
          }
        }
        function l(u, y, d) {
          this.propType = "shape", this.comp = u.comp, this.container = u, this.elem = u, this.data = y, this.k = !1, this.kf = !1, this._mdf = !1;
          var E = d === 3 ? y.pt.k : y.ks.k;
          this.v = shapePool.clone(E), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.reset = i, this.effectsSequence = [];
        }
        function o(u) {
          this.effectsSequence.push(u), this.container.addDynamicProperty(this);
        }
        l.prototype.interpolateShape = t, l.prototype.getValue = a, l.prototype.setVValue = s, l.prototype.addEffect = o;
        function f(u, y, d) {
          this.propType = "shape", this.comp = u.comp, this.elem = u, this.container = u, this.offsetTime = u.data.st, this.keyframes = d === 3 ? y.pt.k : y.ks.k, this.keyframesMetadata = [], this.k = !0, this.kf = !0;
          var E = this.keyframes[0].s[0].i.length;
          this.v = shapePool.newElement(), this.v.setPathData(this.keyframes[0].s[0].c, E), this.pv = shapePool.clone(this.v), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.paths.addShape(this.v), this.lastFrame = e, this.reset = i, this._caching = {
            lastFrame: e,
            lastIndex: 0
          }, this.effectsSequence = [r.bind(this)];
        }
        f.prototype.getValue = a, f.prototype.interpolateShape = t, f.prototype.setVValue = s, f.prototype.addEffect = o;
        var c = function() {
          var u = roundCorner;
          function y(d, E) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 4), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.paths = this.localShapeCollection, this.localShapeCollection.addShape(this.v), this.d = E.d, this.elem = d, this.comp = d.comp, this.frameId = -1, this.initDynamicPropertyContainer(d), this.p = PropertyFactory.getProp(d, E.p, 1, 0, this), this.s = PropertyFactory.getProp(d, E.s, 1, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertEllToPath());
          }
          return y.prototype = {
            reset: i,
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertEllToPath());
            },
            convertEllToPath: function() {
              var E = this.p.v[0], S = this.p.v[1], C = this.s.v[0] / 2, w = this.s.v[1] / 2, M = this.d !== 3, O = this.v;
              O.v[0][0] = E, O.v[0][1] = S - w, O.v[1][0] = M ? E + C : E - C, O.v[1][1] = S, O.v[2][0] = E, O.v[2][1] = S + w, O.v[3][0] = M ? E - C : E + C, O.v[3][1] = S, O.i[0][0] = M ? E - C * u : E + C * u, O.i[0][1] = S - w, O.i[1][0] = M ? E + C : E - C, O.i[1][1] = S - w * u, O.i[2][0] = M ? E + C * u : E - C * u, O.i[2][1] = S + w, O.i[3][0] = M ? E - C : E + C, O.i[3][1] = S + w * u, O.o[0][0] = M ? E + C * u : E - C * u, O.o[0][1] = S - w, O.o[1][0] = M ? E + C : E - C, O.o[1][1] = S + w * u, O.o[2][0] = M ? E - C * u : E + C * u, O.o[2][1] = S + w, O.o[3][0] = M ? E - C : E + C, O.o[3][1] = S - w * u;
            }
          }, extendPrototype([DynamicPropertyContainer], y), y;
        }(), v = function() {
          function u(y, d) {
            this.v = shapePool.newElement(), this.v.setPathData(!0, 0), this.elem = y, this.comp = y.comp, this.data = d, this.frameId = -1, this.d = d.d, this.initDynamicPropertyContainer(y), d.sy === 1 ? (this.ir = PropertyFactory.getProp(y, d.ir, 0, 0, this), this.is = PropertyFactory.getProp(y, d.is, 0, 0.01, this), this.convertToPath = this.convertStarToPath) : this.convertToPath = this.convertPolygonToPath, this.pt = PropertyFactory.getProp(y, d.pt, 0, 0, this), this.p = PropertyFactory.getProp(y, d.p, 1, 0, this), this.r = PropertyFactory.getProp(y, d.r, 0, degToRads, this), this.or = PropertyFactory.getProp(y, d.or, 0, 0, this), this.os = PropertyFactory.getProp(y, d.os, 0, 0.01, this), this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertToPath());
          }
          return u.prototype = {
            reset: i,
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertToPath());
            },
            convertStarToPath: function() {
              var d = Math.floor(this.pt.v) * 2, E = Math.PI * 2 / d, S = !0, C = this.or.v, w = this.ir.v, M = this.os.v, O = this.is.v, j = 2 * Math.PI * C / (d * 2), B = 2 * Math.PI * w / (d * 2), L, V, $, D, A = -Math.PI / 2;
              A += this.r.v;
              var k = this.data.d === 3 ? -1 : 1;
              for (this.v._length = 0, L = 0; L < d; L += 1) {
                V = S ? C : w, $ = S ? M : O, D = S ? j : B;
                var x = V * Math.cos(A), P = V * Math.sin(A), T = x === 0 && P === 0 ? 0 : P / Math.sqrt(x * x + P * P), R = x === 0 && P === 0 ? 0 : -x / Math.sqrt(x * x + P * P);
                x += +this.p.v[0], P += +this.p.v[1], this.v.setTripleAt(x, P, x - T * D * $ * k, P - R * D * $ * k, x + T * D * $ * k, P + R * D * $ * k, L, !0), S = !S, A += E * k;
              }
            },
            convertPolygonToPath: function() {
              var d = Math.floor(this.pt.v), E = Math.PI * 2 / d, S = this.or.v, C = this.os.v, w = 2 * Math.PI * S / (d * 4), M, O = -Math.PI * 0.5, j = this.data.d === 3 ? -1 : 1;
              for (O += this.r.v, this.v._length = 0, M = 0; M < d; M += 1) {
                var B = S * Math.cos(O), L = S * Math.sin(O), V = B === 0 && L === 0 ? 0 : L / Math.sqrt(B * B + L * L), $ = B === 0 && L === 0 ? 0 : -B / Math.sqrt(B * B + L * L);
                B += +this.p.v[0], L += +this.p.v[1], this.v.setTripleAt(B, L, B - V * w * C * j, L - $ * w * C * j, B + V * w * C * j, L + $ * w * C * j, M, !0), O += E * j;
              }
              this.paths.length = 0, this.paths[0] = this.v;
            }
          }, extendPrototype([DynamicPropertyContainer], u), u;
        }(), h = function() {
          function u(y, d) {
            this.v = shapePool.newElement(), this.v.c = !0, this.localShapeCollection = shapeCollectionPool.newShapeCollection(), this.localShapeCollection.addShape(this.v), this.paths = this.localShapeCollection, this.elem = y, this.comp = y.comp, this.frameId = -1, this.d = d.d, this.initDynamicPropertyContainer(y), this.p = PropertyFactory.getProp(y, d.p, 1, 0, this), this.s = PropertyFactory.getProp(y, d.s, 1, 0, this), this.r = PropertyFactory.getProp(y, d.r, 0, 0, this), this.dynamicProperties.length ? this.k = !0 : (this.k = !1, this.convertRectToPath());
          }
          return u.prototype = {
            convertRectToPath: function() {
              var d = this.p.v[0], E = this.p.v[1], S = this.s.v[0] / 2, C = this.s.v[1] / 2, w = bmMin(S, C, this.r.v), M = w * (1 - roundCorner);
              this.v._length = 0, this.d === 2 || this.d === 1 ? (this.v.setTripleAt(d + S, E - C + w, d + S, E - C + w, d + S, E - C + M, 0, !0), this.v.setTripleAt(d + S, E + C - w, d + S, E + C - M, d + S, E + C - w, 1, !0), w !== 0 ? (this.v.setTripleAt(d + S - w, E + C, d + S - w, E + C, d + S - M, E + C, 2, !0), this.v.setTripleAt(d - S + w, E + C, d - S + M, E + C, d - S + w, E + C, 3, !0), this.v.setTripleAt(d - S, E + C - w, d - S, E + C - w, d - S, E + C - M, 4, !0), this.v.setTripleAt(d - S, E - C + w, d - S, E - C + M, d - S, E - C + w, 5, !0), this.v.setTripleAt(d - S + w, E - C, d - S + w, E - C, d - S + M, E - C, 6, !0), this.v.setTripleAt(d + S - w, E - C, d + S - M, E - C, d + S - w, E - C, 7, !0)) : (this.v.setTripleAt(d - S, E + C, d - S + M, E + C, d - S, E + C, 2), this.v.setTripleAt(d - S, E - C, d - S, E - C + M, d - S, E - C, 3))) : (this.v.setTripleAt(d + S, E - C + w, d + S, E - C + M, d + S, E - C + w, 0, !0), w !== 0 ? (this.v.setTripleAt(d + S - w, E - C, d + S - w, E - C, d + S - M, E - C, 1, !0), this.v.setTripleAt(d - S + w, E - C, d - S + M, E - C, d - S + w, E - C, 2, !0), this.v.setTripleAt(d - S, E - C + w, d - S, E - C + w, d - S, E - C + M, 3, !0), this.v.setTripleAt(d - S, E + C - w, d - S, E + C - M, d - S, E + C - w, 4, !0), this.v.setTripleAt(d - S + w, E + C, d - S + w, E + C, d - S + M, E + C, 5, !0), this.v.setTripleAt(d + S - w, E + C, d + S - M, E + C, d + S - w, E + C, 6, !0), this.v.setTripleAt(d + S, E + C - w, d + S, E + C - w, d + S, E + C - M, 7, !0)) : (this.v.setTripleAt(d - S, E - C, d - S + M, E - C, d - S, E - C, 1, !0), this.v.setTripleAt(d - S, E + C, d - S, E + C - M, d - S, E + C, 2, !0), this.v.setTripleAt(d + S, E + C, d + S - M, E + C, d + S, E + C, 3, !0)));
            },
            getValue: function() {
              this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf && this.convertRectToPath());
            },
            reset: i
          }, extendPrototype([DynamicPropertyContainer], u), u;
        }();
        function g(u, y, d) {
          var E;
          if (d === 3 || d === 4) {
            var S = d === 3 ? y.pt : y.ks, C = S.k;
            C.length ? E = new f(u, y, d) : E = new l(u, y, d);
          } else d === 5 ? E = new h(u, y) : d === 6 ? E = new c(u, y) : d === 7 && (E = new v(u, y));
          return E.k && u.addDynamicProperty(E), E;
        }
        function m() {
          return l;
        }
        function p() {
          return f;
        }
        var b = {};
        return b.getShapeProp = g, b.getConstructorFunction = m, b.getKeyframedConstructorFunction = p, b;
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
        var e = Math.cos, t = Math.sin, r = Math.tan, i = Math.round;
        function n() {
          return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this;
        }
        function s(x) {
          if (x === 0)
            return this;
          var P = e(x), T = t(x);
          return this._t(P, -T, 0, 0, T, P, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function a(x) {
          if (x === 0)
            return this;
          var P = e(x), T = t(x);
          return this._t(1, 0, 0, 0, 0, P, -T, 0, 0, T, P, 0, 0, 0, 0, 1);
        }
        function l(x) {
          if (x === 0)
            return this;
          var P = e(x), T = t(x);
          return this._t(P, 0, T, 0, 0, 1, 0, 0, -T, 0, P, 0, 0, 0, 0, 1);
        }
        function o(x) {
          if (x === 0)
            return this;
          var P = e(x), T = t(x);
          return this._t(P, -T, 0, 0, T, P, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function f(x, P) {
          return this._t(1, P, x, 1, 0, 0);
        }
        function c(x, P) {
          return this.shear(r(x), r(P));
        }
        function v(x, P) {
          var T = e(P), R = t(P);
          return this._t(T, R, 0, 0, -R, T, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, r(x), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(T, -R, 0, 0, R, T, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        function h(x, P, T) {
          return !T && T !== 0 && (T = 1), x === 1 && P === 1 && T === 1 ? this : this._t(x, 0, 0, 0, 0, P, 0, 0, 0, 0, T, 0, 0, 0, 0, 1);
        }
        function g(x, P, T, R, N, H, z, J, q, se, ie, ce, ue, fe, pe, ae) {
          return this.props[0] = x, this.props[1] = P, this.props[2] = T, this.props[3] = R, this.props[4] = N, this.props[5] = H, this.props[6] = z, this.props[7] = J, this.props[8] = q, this.props[9] = se, this.props[10] = ie, this.props[11] = ce, this.props[12] = ue, this.props[13] = fe, this.props[14] = pe, this.props[15] = ae, this;
        }
        function m(x, P, T) {
          return T = T || 0, x !== 0 || P !== 0 || T !== 0 ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, P, T, 1) : this;
        }
        function p(x, P, T, R, N, H, z, J, q, se, ie, ce, ue, fe, pe, ae) {
          var K = this.props;
          if (x === 1 && P === 0 && T === 0 && R === 0 && N === 0 && H === 1 && z === 0 && J === 0 && q === 0 && se === 0 && ie === 1 && ce === 0)
            return K[12] = K[12] * x + K[15] * ue, K[13] = K[13] * H + K[15] * fe, K[14] = K[14] * ie + K[15] * pe, K[15] *= ae, this._identityCalculated = !1, this;
          var ye = K[0], Ee = K[1], ge = K[2], xe = K[3], be = K[4], de = K[5], F = K[6], U = K[7], Y = K[8], ee = K[9], oe = K[10], ne = K[11], re = K[12], Q = K[13], _e = K[14], me = K[15];
          return K[0] = ye * x + Ee * N + ge * q + xe * ue, K[1] = ye * P + Ee * H + ge * se + xe * fe, K[2] = ye * T + Ee * z + ge * ie + xe * pe, K[3] = ye * R + Ee * J + ge * ce + xe * ae, K[4] = be * x + de * N + F * q + U * ue, K[5] = be * P + de * H + F * se + U * fe, K[6] = be * T + de * z + F * ie + U * pe, K[7] = be * R + de * J + F * ce + U * ae, K[8] = Y * x + ee * N + oe * q + ne * ue, K[9] = Y * P + ee * H + oe * se + ne * fe, K[10] = Y * T + ee * z + oe * ie + ne * pe, K[11] = Y * R + ee * J + oe * ce + ne * ae, K[12] = re * x + Q * N + _e * q + me * ue, K[13] = re * P + Q * H + _e * se + me * fe, K[14] = re * T + Q * z + _e * ie + me * pe, K[15] = re * R + Q * J + _e * ce + me * ae, this._identityCalculated = !1, this;
        }
        function b(x) {
          var P = x.props;
          return this.transform(P[0], P[1], P[2], P[3], P[4], P[5], P[6], P[7], P[8], P[9], P[10], P[11], P[12], P[13], P[14], P[15]);
        }
        function u() {
          return this._identityCalculated || (this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1), this._identityCalculated = !0), this._identity;
        }
        function y(x) {
          for (var P = 0; P < 16; ) {
            if (x.props[P] !== this.props[P])
              return !1;
            P += 1;
          }
          return !0;
        }
        function d(x) {
          var P;
          for (P = 0; P < 16; P += 1)
            x.props[P] = this.props[P];
          return x;
        }
        function E(x) {
          var P;
          for (P = 0; P < 16; P += 1)
            this.props[P] = x[P];
        }
        function S(x, P, T) {
          return {
            x: x * this.props[0] + P * this.props[4] + T * this.props[8] + this.props[12],
            y: x * this.props[1] + P * this.props[5] + T * this.props[9] + this.props[13],
            z: x * this.props[2] + P * this.props[6] + T * this.props[10] + this.props[14]
          };
        }
        function C(x, P, T) {
          return x * this.props[0] + P * this.props[4] + T * this.props[8] + this.props[12];
        }
        function w(x, P, T) {
          return x * this.props[1] + P * this.props[5] + T * this.props[9] + this.props[13];
        }
        function M(x, P, T) {
          return x * this.props[2] + P * this.props[6] + T * this.props[10] + this.props[14];
        }
        function O() {
          var x = this.props[0] * this.props[5] - this.props[1] * this.props[4], P = this.props[5] / x, T = -this.props[1] / x, R = -this.props[4] / x, N = this.props[0] / x, H = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / x, z = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / x, J = new Matrix();
          return J.props[0] = P, J.props[1] = T, J.props[4] = R, J.props[5] = N, J.props[12] = H, J.props[13] = z, J;
        }
        function j(x) {
          var P = this.getInverseMatrix();
          return P.applyToPointArray(x[0], x[1], x[2] || 0);
        }
        function B(x) {
          var P, T = x.length, R = [];
          for (P = 0; P < T; P += 1)
            R[P] = j(x[P]);
          return R;
        }
        function L(x, P, T) {
          var R = createTypedArray("float32", 6);
          if (this.isIdentity())
            R[0] = x[0], R[1] = x[1], R[2] = P[0], R[3] = P[1], R[4] = T[0], R[5] = T[1];
          else {
            var N = this.props[0], H = this.props[1], z = this.props[4], J = this.props[5], q = this.props[12], se = this.props[13];
            R[0] = x[0] * N + x[1] * z + q, R[1] = x[0] * H + x[1] * J + se, R[2] = P[0] * N + P[1] * z + q, R[3] = P[0] * H + P[1] * J + se, R[4] = T[0] * N + T[1] * z + q, R[5] = T[0] * H + T[1] * J + se;
          }
          return R;
        }
        function V(x, P, T) {
          var R;
          return this.isIdentity() ? R = [x, P, T] : R = [x * this.props[0] + P * this.props[4] + T * this.props[8] + this.props[12], x * this.props[1] + P * this.props[5] + T * this.props[9] + this.props[13], x * this.props[2] + P * this.props[6] + T * this.props[10] + this.props[14]], R;
        }
        function $(x, P) {
          if (this.isIdentity())
            return x + "," + P;
          var T = this.props;
          return Math.round((x * T[0] + P * T[4] + T[12]) * 100) / 100 + "," + Math.round((x * T[1] + P * T[5] + T[13]) * 100) / 100;
        }
        function D() {
          for (var x = 0, P = this.props, T = "matrix3d(", R = 1e4; x < 16; )
            T += i(P[x] * R) / R, T += x === 15 ? ")" : ",", x += 1;
          return T;
        }
        function A(x) {
          var P = 1e4;
          return x < 1e-6 && x > 0 || x > -1e-6 && x < 0 ? i(x * P) / P : x;
        }
        function k() {
          var x = this.props, P = A(x[0]), T = A(x[1]), R = A(x[4]), N = A(x[5]), H = A(x[12]), z = A(x[13]);
          return "matrix(" + P + "," + T + "," + R + "," + N + "," + H + "," + z + ")";
        }
        return function() {
          this.reset = n, this.rotate = s, this.rotateX = a, this.rotateY = l, this.rotateZ = o, this.skew = c, this.skewFromAxis = v, this.shear = f, this.scale = h, this.setTransform = g, this.translate = m, this.transform = p, this.multiply = b, this.applyToPoint = S, this.applyToX = C, this.applyToY = w, this.applyToZ = M, this.applyToPointArray = V, this.applyToTriplePoints = L, this.applyToPointStringified = $, this.toCSS = D, this.to2dCSS = k, this.clone = d, this.cloneFromProps = E, this.equals = y, this.inversePoints = B, this.inversePoint = j, this.getInverseMatrix = O, this._t = this.transform, this.isIdentity = u, this._identity = !0, this._identityCalculated = !1, this.props = createTypedArray("float32", 16), this.reset();
        };
      }();
      function _typeof$3(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$3 = function(r) {
          return typeof r;
        } : _typeof$3 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$3(e);
      }
      var lottie = {};
      function setLocation(e) {
        setLocationHref(e);
      }
      function searchAnimations() {
        animationManager.searchAnimations();
      }
      function setSubframeRendering(e) {
        setSubframeEnabled(e);
      }
      function setPrefix(e) {
        setIdPrefix(e);
      }
      function loadAnimation(e) {
        return animationManager.loadAnimation(e);
      }
      function setQuality(e) {
        if (typeof e == "string")
          switch (e) {
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
        else !isNaN(e) && e > 1 && setDefaultCurveSegments(e);
      }
      function inBrowser() {
        return typeof navigator < "u";
      }
      function installPlugin(e, t) {
        e === "expressions" && setExpressionsPlugin(t);
      }
      function getFactory(e) {
        switch (e) {
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
      function getQueryVariable(e) {
        for (var t = queryString.split("&"), r = 0; r < t.length; r += 1) {
          var i = t[r].split("=");
          if (decodeURIComponent(i[0]) == e)
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
      } catch (e) {
      }
      var ShapeModifiers = function() {
        var e = {}, t = {};
        e.registerModifier = r, e.getModifier = i;
        function r(n, s) {
          t[n] || (t[n] = s);
        }
        function i(n, s, a) {
          return new t[n](s, a);
        }
        return e;
      }();
      function ShapeModifier() {
      }
      ShapeModifier.prototype.initModifierProperties = function() {
      }, ShapeModifier.prototype.addShapeToModifier = function() {
      }, ShapeModifier.prototype.addShape = function(e) {
        if (!this.closed) {
          e.sh.container.addDynamicProperty(e.sh);
          var t = {
            shape: e.sh,
            data: e,
            localShapeCollection: shapeCollectionPool.newShapeCollection()
          };
          this.shapes.push(t), this.addShapeToModifier(t), this._isAnimated && e.setAsAnimated();
        }
      }, ShapeModifier.prototype.init = function(e, t) {
        this.shapes = [], this.elem = e, this.initDynamicPropertyContainer(e), this.initModifierProperties(e, t), this.frameId = initialDefaultFrame, this.closed = !1, this.k = !1, this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, ShapeModifier.prototype.processKeys = function() {
        this.elem.globalData.frameId !== this.frameId && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties());
      }, extendPrototype([DynamicPropertyContainer], ShapeModifier);
      function TrimModifier() {
      }
      extendPrototype([ShapeModifier], TrimModifier), TrimModifier.prototype.initModifierProperties = function(e, t) {
        this.s = PropertyFactory.getProp(e, t.s, 0, 0.01, this), this.e = PropertyFactory.getProp(e, t.e, 0, 0.01, this), this.o = PropertyFactory.getProp(e, t.o, 0, 0, this), this.sValue = 0, this.eValue = 0, this.getValue = this.processKeys, this.m = t.m, this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
      }, TrimModifier.prototype.addShapeToModifier = function(e) {
        e.pathsData = [];
      }, TrimModifier.prototype.calculateShapeEdges = function(e, t, r, i, n) {
        var s = [];
        t <= 1 ? s.push({
          s: e,
          e: t
        }) : e >= 1 ? s.push({
          s: e - 1,
          e: t - 1
        }) : (s.push({
          s: e,
          e: 1
        }), s.push({
          s: 0,
          e: t - 1
        }));
        var a = [], l, o = s.length, f;
        for (l = 0; l < o; l += 1)
          if (f = s[l], !(f.e * n < i || f.s * n > i + r)) {
            var c, v;
            f.s * n <= i ? c = 0 : c = (f.s * n - i) / r, f.e * n >= i + r ? v = 1 : v = (f.e * n - i) / r, a.push([c, v]);
          }
        return a.length || a.push([0, 0]), a;
      }, TrimModifier.prototype.releasePathsData = function(e) {
        var t, r = e.length;
        for (t = 0; t < r; t += 1)
          segmentsLengthPool.release(e[t]);
        return e.length = 0, e;
      }, TrimModifier.prototype.processShapes = function(e) {
        var t, r;
        if (this._mdf || e) {
          var i = this.o.v % 360 / 360;
          if (i < 0 && (i += 1), this.s.v > 1 ? t = 1 + i : this.s.v < 0 ? t = 0 + i : t = this.s.v + i, this.e.v > 1 ? r = 1 + i : this.e.v < 0 ? r = 0 + i : r = this.e.v + i, t > r) {
            var n = t;
            t = r, r = n;
          }
          t = Math.round(t * 1e4) * 1e-4, r = Math.round(r * 1e4) * 1e-4, this.sValue = t, this.eValue = r;
        } else
          t = this.sValue, r = this.eValue;
        var s, a, l = this.shapes.length, o, f, c, v, h, g = 0;
        if (r === t)
          for (a = 0; a < l; a += 1)
            this.shapes[a].localShapeCollection.releaseShapes(), this.shapes[a].shape._mdf = !0, this.shapes[a].shape.paths = this.shapes[a].localShapeCollection, this._mdf && (this.shapes[a].pathsData.length = 0);
        else if (r === 1 && t === 0 || r === 0 && t === 1) {
          if (this._mdf)
            for (a = 0; a < l; a += 1)
              this.shapes[a].pathsData.length = 0, this.shapes[a].shape._mdf = !0;
        } else {
          var m = [], p, b;
          for (a = 0; a < l; a += 1)
            if (p = this.shapes[a], !p.shape._mdf && !this._mdf && !e && this.m !== 2)
              p.shape.paths = p.localShapeCollection;
            else {
              if (s = p.shape.paths, f = s._length, h = 0, !p.shape._mdf && p.pathsData.length)
                h = p.totalShapeLength;
              else {
                for (c = this.releasePathsData(p.pathsData), o = 0; o < f; o += 1)
                  v = bez.getSegmentsLength(s.shapes[o]), c.push(v), h += v.totalLength;
                p.totalShapeLength = h, p.pathsData = c;
              }
              g += h, p.shape._mdf = !0;
            }
          var u = t, y = r, d = 0, E;
          for (a = l - 1; a >= 0; a -= 1)
            if (p = this.shapes[a], p.shape._mdf) {
              for (b = p.localShapeCollection, b.releaseShapes(), this.m === 2 && l > 1 ? (E = this.calculateShapeEdges(t, r, p.totalShapeLength, d, g), d += p.totalShapeLength) : E = [[u, y]], f = E.length, o = 0; o < f; o += 1) {
                u = E[o][0], y = E[o][1], m.length = 0, y <= 1 ? m.push({
                  s: p.totalShapeLength * u,
                  e: p.totalShapeLength * y
                }) : u >= 1 ? m.push({
                  s: p.totalShapeLength * (u - 1),
                  e: p.totalShapeLength * (y - 1)
                }) : (m.push({
                  s: p.totalShapeLength * u,
                  e: p.totalShapeLength
                }), m.push({
                  s: 0,
                  e: p.totalShapeLength * (y - 1)
                }));
                var S = this.addShapes(p, m[0]);
                if (m[0].s !== m[0].e) {
                  if (m.length > 1) {
                    var C = p.shape.paths.shapes[p.shape.paths._length - 1];
                    if (C.c) {
                      var w = S.pop();
                      this.addPaths(S, b), S = this.addShapes(p, m[1], w);
                    } else
                      this.addPaths(S, b), S = this.addShapes(p, m[1]);
                  }
                  this.addPaths(S, b);
                }
              }
              p.shape.paths = b;
            }
        }
      }, TrimModifier.prototype.addPaths = function(e, t) {
        var r, i = e.length;
        for (r = 0; r < i; r += 1)
          t.addShape(e[r]);
      }, TrimModifier.prototype.addSegment = function(e, t, r, i, n, s, a) {
        n.setXYAt(t[0], t[1], "o", s), n.setXYAt(r[0], r[1], "i", s + 1), a && n.setXYAt(e[0], e[1], "v", s), n.setXYAt(i[0], i[1], "v", s + 1);
      }, TrimModifier.prototype.addSegmentFromArray = function(e, t, r, i) {
        t.setXYAt(e[1], e[5], "o", r), t.setXYAt(e[2], e[6], "i", r + 1), i && t.setXYAt(e[0], e[4], "v", r), t.setXYAt(e[3], e[7], "v", r + 1);
      }, TrimModifier.prototype.addShapes = function(e, t, r) {
        var i = e.pathsData, n = e.shape.paths.shapes, s, a = e.shape.paths._length, l, o, f = 0, c, v, h, g, m = [], p, b = !0;
        for (r ? (v = r._length, p = r._length) : (r = shapePool.newElement(), v = 0, p = 0), m.push(r), s = 0; s < a; s += 1) {
          for (h = i[s].lengths, r.c = n[s].c, o = n[s].c ? h.length : h.length + 1, l = 1; l < o; l += 1)
            if (c = h[l - 1], f + c.addedLength < t.s)
              f += c.addedLength, r.c = !1;
            else if (f > t.e) {
              r.c = !1;
              break;
            } else
              t.s <= f && t.e >= f + c.addedLength ? (this.addSegment(n[s].v[l - 1], n[s].o[l - 1], n[s].i[l], n[s].v[l], r, v, b), b = !1) : (g = bez.getNewSegment(n[s].v[l - 1], n[s].v[l], n[s].o[l - 1], n[s].i[l], (t.s - f) / c.addedLength, (t.e - f) / c.addedLength, h[l - 1]), this.addSegmentFromArray(g, r, v, b), b = !1, r.c = !1), f += c.addedLength, v += 1;
          if (n[s].c && h.length) {
            if (c = h[l - 1], f <= t.e) {
              var u = h[l - 1].addedLength;
              t.s <= f && t.e >= f + u ? (this.addSegment(n[s].v[l - 1], n[s].o[l - 1], n[s].i[0], n[s].v[0], r, v, b), b = !1) : (g = bez.getNewSegment(n[s].v[l - 1], n[s].v[0], n[s].o[l - 1], n[s].i[0], (t.s - f) / u, (t.e - f) / u, h[l - 1]), this.addSegmentFromArray(g, r, v, b), b = !1, r.c = !1);
            } else
              r.c = !1;
            f += c.addedLength, v += 1;
          }
          if (r._length && (r.setXYAt(r.v[p][0], r.v[p][1], "i", p), r.setXYAt(r.v[r._length - 1][0], r.v[r._length - 1][1], "o", r._length - 1)), f > t.e)
            break;
          s < a - 1 && (r = shapePool.newElement(), b = !0, m.push(r), v = 0);
        }
        return m;
      };
      function PuckerAndBloatModifier() {
      }
      extendPrototype([ShapeModifier], PuckerAndBloatModifier), PuckerAndBloatModifier.prototype.initModifierProperties = function(e, t) {
        this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(e, t.a, 0, null, this), this._isAnimated = !!this.amount.effectsSequence.length;
      }, PuckerAndBloatModifier.prototype.processPath = function(e, t) {
        var r = t / 100, i = [0, 0], n = e._length, s = 0;
        for (s = 0; s < n; s += 1)
          i[0] += e.v[s][0], i[1] += e.v[s][1];
        i[0] /= n, i[1] /= n;
        var a = shapePool.newElement();
        a.c = e.c;
        var l, o, f, c, v, h;
        for (s = 0; s < n; s += 1)
          l = e.v[s][0] + (i[0] - e.v[s][0]) * r, o = e.v[s][1] + (i[1] - e.v[s][1]) * r, f = e.o[s][0] + (i[0] - e.o[s][0]) * -r, c = e.o[s][1] + (i[1] - e.o[s][1]) * -r, v = e.i[s][0] + (i[0] - e.i[s][0]) * -r, h = e.i[s][1] + (i[1] - e.i[s][1]) * -r, a.setTripleAt(l, o, f, c, v, h, s);
        return a;
      }, PuckerAndBloatModifier.prototype.processShapes = function(e) {
        var t, r, i = this.shapes.length, n, s, a = this.amount.v;
        if (a !== 0) {
          var l, o;
          for (r = 0; r < i; r += 1) {
            if (l = this.shapes[r], o = l.localShapeCollection, !(!l.shape._mdf && !this._mdf && !e))
              for (o.releaseShapes(), l.shape._mdf = !0, t = l.shape.paths.shapes, s = l.shape.paths._length, n = 0; n < s; n += 1)
                o.addShape(this.processPath(t[n], a));
            l.shape.paths = l.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      var TransformPropertyFactory = function() {
        var e = [0, 0];
        function t(o) {
          var f = this._mdf;
          this.iterateDynamicProperties(), this._mdf = this._mdf || f, this.a && o.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && o.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && o.skewFromAxis(-this.sk.v, this.sa.v), this.r ? o.rotate(-this.r.v) : o.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? o.translate(this.px.v, this.py.v, -this.pz.v) : o.translate(this.px.v, this.py.v, 0) : o.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
        }
        function r(o) {
          if (this.elem.globalData.frameId !== this.frameId) {
            if (this._isDirty && (this.precalculateMatrix(), this._isDirty = !1), this.iterateDynamicProperties(), this._mdf || o) {
              var f;
              if (this.v.cloneFromProps(this.pre.props), this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r && this.appliedTransformations < 4 ? this.v.rotate(-this.r.v) : !this.r && this.appliedTransformations < 4 && this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented) {
                var c, v;
                if (f = this.elem.globalData.frameRate, this.p && this.p.keyframes && this.p.getValueAtTime)
                  this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t ? (c = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / f, 0), v = this.p.getValueAtTime(this.p.keyframes[0].t / f, 0)) : this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t ? (c = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / f, 0), v = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / f, 0)) : (c = this.p.pv, v = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / f, this.p.offsetTime));
                else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                  c = [], v = [];
                  var h = this.px, g = this.py;
                  h._caching.lastFrame + h.offsetTime <= h.keyframes[0].t ? (c[0] = h.getValueAtTime((h.keyframes[0].t + 0.01) / f, 0), c[1] = g.getValueAtTime((g.keyframes[0].t + 0.01) / f, 0), v[0] = h.getValueAtTime(h.keyframes[0].t / f, 0), v[1] = g.getValueAtTime(g.keyframes[0].t / f, 0)) : h._caching.lastFrame + h.offsetTime >= h.keyframes[h.keyframes.length - 1].t ? (c[0] = h.getValueAtTime(h.keyframes[h.keyframes.length - 1].t / f, 0), c[1] = g.getValueAtTime(g.keyframes[g.keyframes.length - 1].t / f, 0), v[0] = h.getValueAtTime((h.keyframes[h.keyframes.length - 1].t - 0.01) / f, 0), v[1] = g.getValueAtTime((g.keyframes[g.keyframes.length - 1].t - 0.01) / f, 0)) : (c = [h.pv, g.pv], v[0] = h.getValueAtTime((h._caching.lastFrame + h.offsetTime - 0.01) / f, h.offsetTime), v[1] = g.getValueAtTime((g._caching.lastFrame + g.offsetTime - 0.01) / f, g.offsetTime));
                } else
                  v = e, c = v;
                this.v.rotate(-Math.atan2(c[1] - v[1], c[0] - v[0]));
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
        function n() {
        }
        function s(o) {
          this._addDynamicProperty(o), this.elem.addDynamicProperty(o), this._isDirty = !0;
        }
        function a(o, f, c) {
          if (this.elem = o, this.frameId = -1, this.propType = "transform", this.data = f, this.v = new Matrix(), this.pre = new Matrix(), this.appliedTransformations = 0, this.initDynamicPropertyContainer(c || o), f.p && f.p.s ? (this.px = PropertyFactory.getProp(o, f.p.x, 0, 0, this), this.py = PropertyFactory.getProp(o, f.p.y, 0, 0, this), f.p.z && (this.pz = PropertyFactory.getProp(o, f.p.z, 0, 0, this))) : this.p = PropertyFactory.getProp(o, f.p || {
            k: [0, 0, 0]
          }, 1, 0, this), f.rx) {
            if (this.rx = PropertyFactory.getProp(o, f.rx, 0, degToRads, this), this.ry = PropertyFactory.getProp(o, f.ry, 0, degToRads, this), this.rz = PropertyFactory.getProp(o, f.rz, 0, degToRads, this), f.or.k[0].ti) {
              var v, h = f.or.k.length;
              for (v = 0; v < h; v += 1)
                f.or.k[v].to = null, f.or.k[v].ti = null;
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
          applyToMatrix: t,
          getValue: r,
          precalculateMatrix: i,
          autoOrient: n
        }, extendPrototype([DynamicPropertyContainer], a), a.prototype.addDynamicProperty = s, a.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty;
        function l(o, f, c) {
          return new a(o, f, c);
        }
        return {
          getTransformProperty: l
        };
      }();
      function RepeaterModifier() {
      }
      extendPrototype([ShapeModifier], RepeaterModifier), RepeaterModifier.prototype.initModifierProperties = function(e, t) {
        this.getValue = this.processKeys, this.c = PropertyFactory.getProp(e, t.c, 0, null, this), this.o = PropertyFactory.getProp(e, t.o, 0, null, this), this.tr = TransformPropertyFactory.getTransformProperty(e, t.tr, this), this.so = PropertyFactory.getProp(e, t.tr.so, 0, 0.01, this), this.eo = PropertyFactory.getProp(e, t.tr.eo, 0, 0.01, this), this.data = t, this.dynamicProperties.length || this.getValue(!0), this._isAnimated = !!this.dynamicProperties.length, this.pMatrix = new Matrix(), this.rMatrix = new Matrix(), this.sMatrix = new Matrix(), this.tMatrix = new Matrix(), this.matrix = new Matrix();
      }, RepeaterModifier.prototype.applyTransforms = function(e, t, r, i, n, s) {
        var a = s ? -1 : 1, l = i.s.v[0] + (1 - i.s.v[0]) * (1 - n), o = i.s.v[1] + (1 - i.s.v[1]) * (1 - n);
        e.translate(i.p.v[0] * a * n, i.p.v[1] * a * n, i.p.v[2]), t.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), t.rotate(-i.r.v * a * n), t.translate(i.a.v[0], i.a.v[1], i.a.v[2]), r.translate(-i.a.v[0], -i.a.v[1], i.a.v[2]), r.scale(s ? 1 / l : l, s ? 1 / o : o), r.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
      }, RepeaterModifier.prototype.init = function(e, t, r, i) {
        for (this.elem = e, this.arr = t, this.pos = r, this.elemsData = i, this._currentCopies = 0, this._elements = [], this._groups = [], this.frameId = -1, this.initDynamicPropertyContainer(e), this.initModifierProperties(e, t[r]); r > 0; )
          r -= 1, this._elements.unshift(t[r]);
        this.dynamicProperties.length ? this.k = !0 : this.getValue(!0);
      }, RepeaterModifier.prototype.resetElements = function(e) {
        var t, r = e.length;
        for (t = 0; t < r; t += 1)
          e[t]._processed = !1, e[t].ty === "gr" && this.resetElements(e[t].it);
      }, RepeaterModifier.prototype.cloneElements = function(e) {
        var t = JSON.parse(JSON.stringify(e));
        return this.resetElements(t), t;
      }, RepeaterModifier.prototype.changeGroupRender = function(e, t) {
        var r, i = e.length;
        for (r = 0; r < i; r += 1)
          e[r]._render = t, e[r].ty === "gr" && this.changeGroupRender(e[r].it, t);
      }, RepeaterModifier.prototype.processShapes = function(e) {
        var t, r, i, n, s, a = !1;
        if (this._mdf || e) {
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
          s = 0;
          var f;
          for (i = 0; i <= this._groups.length - 1; i += 1) {
            if (f = s < l, this._groups[i]._render = f, this.changeGroupRender(this._groups[i].it, f), !f) {
              var c = this.elemsData[i].it, v = c[c.length - 1];
              v.transform.op.v !== 0 ? (v.transform.op._mdf = !0, v.transform.op.v = 0) : v.transform.op._mdf = !1;
            }
            s += 1;
          }
          this._currentCopies = l;
          var h = this.o.v, g = h % 1, m = h > 0 ? Math.floor(h) : Math.ceil(h), p = this.pMatrix.props, b = this.rMatrix.props, u = this.sMatrix.props;
          this.pMatrix.reset(), this.rMatrix.reset(), this.sMatrix.reset(), this.tMatrix.reset(), this.matrix.reset();
          var y = 0;
          if (h > 0) {
            for (; y < m; )
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), y += 1;
            g && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, g, !1), y += g);
          } else if (h < 0) {
            for (; y > m; )
              this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), y -= 1;
            g && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -g, !0), y -= g);
          }
          i = this.data.m === 1 ? 0 : this._currentCopies - 1, n = this.data.m === 1 ? 1 : -1, s = this._currentCopies;
          for (var d, E; s; ) {
            if (t = this.elemsData[i].it, r = t[t.length - 1].transform.mProps.v.props, E = r.length, t[t.length - 1].transform.mProps._mdf = !0, t[t.length - 1].transform.op._mdf = !0, t[t.length - 1].transform.op.v = this._currentCopies === 1 ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1)), y !== 0) {
              for ((i !== 0 && n === 1 || i !== this._currentCopies - 1 && n === -1) && this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), this.matrix.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]), this.matrix.transform(u[0], u[1], u[2], u[3], u[4], u[5], u[6], u[7], u[8], u[9], u[10], u[11], u[12], u[13], u[14], u[15]), this.matrix.transform(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10], p[11], p[12], p[13], p[14], p[15]), d = 0; d < E; d += 1)
                r[d] = this.matrix.props[d];
              this.matrix.reset();
            } else
              for (this.matrix.reset(), d = 0; d < E; d += 1)
                r[d] = this.matrix.props[d];
            y += 1, s -= 1, i += n;
          }
        } else
          for (s = this._currentCopies, i = 0, n = 1; s; )
            t = this.elemsData[i].it, r = t[t.length - 1].transform.mProps.v.props, t[t.length - 1].transform.mProps._mdf = !1, t[t.length - 1].transform.op._mdf = !1, s -= 1, i += n;
        return a;
      }, RepeaterModifier.prototype.addShape = function() {
      };
      function RoundCornersModifier() {
      }
      extendPrototype([ShapeModifier], RoundCornersModifier), RoundCornersModifier.prototype.initModifierProperties = function(e, t) {
        this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(e, t.r, 0, null, this), this._isAnimated = !!this.rd.effectsSequence.length;
      }, RoundCornersModifier.prototype.processPath = function(e, t) {
        var r = shapePool.newElement();
        r.c = e.c;
        var i, n = e._length, s, a, l, o, f, c, v = 0, h, g, m, p, b, u;
        for (i = 0; i < n; i += 1)
          s = e.v[i], l = e.o[i], a = e.i[i], s[0] === l[0] && s[1] === l[1] && s[0] === a[0] && s[1] === a[1] ? (i === 0 || i === n - 1) && !e.c ? (r.setTripleAt(s[0], s[1], l[0], l[1], a[0], a[1], v), v += 1) : (i === 0 ? o = e.v[n - 1] : o = e.v[i - 1], f = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)), c = f ? Math.min(f / 2, t) / f : 0, b = s[0] + (o[0] - s[0]) * c, h = b, u = s[1] - (s[1] - o[1]) * c, g = u, m = h - (h - s[0]) * roundCorner, p = g - (g - s[1]) * roundCorner, r.setTripleAt(h, g, m, p, b, u, v), v += 1, i === n - 1 ? o = e.v[0] : o = e.v[i + 1], f = Math.sqrt(Math.pow(s[0] - o[0], 2) + Math.pow(s[1] - o[1], 2)), c = f ? Math.min(f / 2, t) / f : 0, m = s[0] + (o[0] - s[0]) * c, h = m, p = s[1] + (o[1] - s[1]) * c, g = p, b = h - (h - s[0]) * roundCorner, u = g - (g - s[1]) * roundCorner, r.setTripleAt(h, g, m, p, b, u, v), v += 1) : (r.setTripleAt(e.v[i][0], e.v[i][1], e.o[i][0], e.o[i][1], e.i[i][0], e.i[i][1], v), v += 1);
        return r;
      }, RoundCornersModifier.prototype.processShapes = function(e) {
        var t, r, i = this.shapes.length, n, s, a = this.rd.v;
        if (a !== 0) {
          var l, o;
          for (r = 0; r < i; r += 1) {
            if (l = this.shapes[r], o = l.localShapeCollection, !(!l.shape._mdf && !this._mdf && !e))
              for (o.releaseShapes(), l.shape._mdf = !0, t = l.shape.paths.shapes, s = l.shape.paths._length, n = 0; n < s; n += 1)
                o.addShape(this.processPath(t[n], a));
            l.shape.paths = l.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function floatEqual(e, t) {
        return Math.abs(e - t) * 1e5 <= Math.min(Math.abs(e), Math.abs(t));
      }
      function floatZero(e) {
        return Math.abs(e) <= 1e-5;
      }
      function lerp(e, t, r) {
        return e * (1 - r) + t * r;
      }
      function lerpPoint(e, t, r) {
        return [lerp(e[0], t[0], r), lerp(e[1], t[1], r)];
      }
      function quadRoots(e, t, r) {
        if (e === 0) return [];
        var i = t * t - 4 * e * r;
        if (i < 0) return [];
        var n = -t / (2 * e);
        if (i === 0) return [n];
        var s = Math.sqrt(i) / (2 * e);
        return [n - s, n + s];
      }
      function polynomialCoefficients(e, t, r, i) {
        return [-e + 3 * t - 3 * r + i, 3 * e - 6 * t + 3 * r, -3 * e + 3 * t, e];
      }
      function singlePoint(e) {
        return new PolynomialBezier(e, e, e, e, !1);
      }
      function PolynomialBezier(e, t, r, i, n) {
        n && pointEqual(e, t) && (t = lerpPoint(e, i, 1 / 3)), n && pointEqual(r, i) && (r = lerpPoint(e, i, 2 / 3));
        var s = polynomialCoefficients(e[0], t[0], r[0], i[0]), a = polynomialCoefficients(e[1], t[1], r[1], i[1]);
        this.a = [s[0], a[0]], this.b = [s[1], a[1]], this.c = [s[2], a[2]], this.d = [s[3], a[3]], this.points = [e, t, r, i];
      }
      PolynomialBezier.prototype.point = function(e) {
        return [((this.a[0] * e + this.b[0]) * e + this.c[0]) * e + this.d[0], ((this.a[1] * e + this.b[1]) * e + this.c[1]) * e + this.d[1]];
      }, PolynomialBezier.prototype.derivative = function(e) {
        return [(3 * e * this.a[0] + 2 * this.b[0]) * e + this.c[0], (3 * e * this.a[1] + 2 * this.b[1]) * e + this.c[1]];
      }, PolynomialBezier.prototype.tangentAngle = function(e) {
        var t = this.derivative(e);
        return Math.atan2(t[1], t[0]);
      }, PolynomialBezier.prototype.normalAngle = function(e) {
        var t = this.derivative(e);
        return Math.atan2(t[0], t[1]);
      }, PolynomialBezier.prototype.inflectionPoints = function() {
        var e = this.a[1] * this.b[0] - this.a[0] * this.b[1];
        if (floatZero(e)) return [];
        var t = -0.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1]) / e, r = t * t - 1 / 3 * (this.b[1] * this.c[0] - this.b[0] * this.c[1]) / e;
        if (r < 0) return [];
        var i = Math.sqrt(r);
        return floatZero(i) ? i > 0 && i < 1 ? [t] : [] : [t - i, t + i].filter(function(n) {
          return n > 0 && n < 1;
        });
      }, PolynomialBezier.prototype.split = function(e) {
        if (e <= 0) return [singlePoint(this.points[0]), this];
        if (e >= 1) return [this, singlePoint(this.points[this.points.length - 1])];
        var t = lerpPoint(this.points[0], this.points[1], e), r = lerpPoint(this.points[1], this.points[2], e), i = lerpPoint(this.points[2], this.points[3], e), n = lerpPoint(t, r, e), s = lerpPoint(r, i, e), a = lerpPoint(n, s, e);
        return [new PolynomialBezier(this.points[0], t, n, a, !0), new PolynomialBezier(a, s, i, this.points[3], !0)];
      };
      function extrema(e, t) {
        var r = e.points[0][t], i = e.points[e.points.length - 1][t];
        if (r > i) {
          var n = i;
          i = r, r = n;
        }
        for (var s = quadRoots(3 * e.a[t], 2 * e.b[t], e.c[t]), a = 0; a < s.length; a += 1)
          if (s[a] > 0 && s[a] < 1) {
            var l = e.point(s[a])[t];
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
        var e = this.bounds();
        return {
          left: e.x.min,
          right: e.x.max,
          top: e.y.min,
          bottom: e.y.max,
          width: e.x.max - e.x.min,
          height: e.y.max - e.y.min,
          cx: (e.x.max + e.x.min) / 2,
          cy: (e.y.max + e.y.min) / 2
        };
      };
      function intersectData(e, t, r) {
        var i = e.boundingBox();
        return {
          cx: i.cx,
          cy: i.cy,
          width: i.width,
          height: i.height,
          bez: e,
          t: (t + r) / 2,
          t1: t,
          t2: r
        };
      }
      function splitData(e) {
        var t = e.bez.split(0.5);
        return [intersectData(t[0], e.t1, e.t), intersectData(t[1], e.t, e.t2)];
      }
      function boxIntersect(e, t) {
        return Math.abs(e.cx - t.cx) * 2 < e.width + t.width && Math.abs(e.cy - t.cy) * 2 < e.height + t.height;
      }
      function intersectsImpl(e, t, r, i, n, s) {
        if (boxIntersect(e, t)) {
          if (r >= s || e.width <= i && e.height <= i && t.width <= i && t.height <= i) {
            n.push([e.t, t.t]);
            return;
          }
          var a = splitData(e), l = splitData(t);
          intersectsImpl(a[0], l[0], r + 1, i, n, s), intersectsImpl(a[0], l[1], r + 1, i, n, s), intersectsImpl(a[1], l[0], r + 1, i, n, s), intersectsImpl(a[1], l[1], r + 1, i, n, s);
        }
      }
      PolynomialBezier.prototype.intersections = function(e, t, r) {
        t === void 0 && (t = 2), r === void 0 && (r = 7);
        var i = [];
        return intersectsImpl(intersectData(this, 0, 1), intersectData(e, 0, 1), 0, t, i, r), i;
      }, PolynomialBezier.shapeSegment = function(e, t) {
        var r = (t + 1) % e.length();
        return new PolynomialBezier(e.v[t], e.o[t], e.i[r], e.v[r], !0);
      }, PolynomialBezier.shapeSegmentInverted = function(e, t) {
        var r = (t + 1) % e.length();
        return new PolynomialBezier(e.v[r], e.i[r], e.o[t], e.v[t], !0);
      };
      function crossProduct(e, t) {
        return [e[1] * t[2] - e[2] * t[1], e[2] * t[0] - e[0] * t[2], e[0] * t[1] - e[1] * t[0]];
      }
      function lineIntersection(e, t, r, i) {
        var n = [e[0], e[1], 1], s = [t[0], t[1], 1], a = [r[0], r[1], 1], l = [i[0], i[1], 1], o = crossProduct(crossProduct(n, s), crossProduct(a, l));
        return floatZero(o[2]) ? null : [o[0] / o[2], o[1] / o[2]];
      }
      function polarOffset(e, t, r) {
        return [e[0] + Math.cos(t) * r, e[1] - Math.sin(t) * r];
      }
      function pointDistance(e, t) {
        return Math.hypot(e[0] - t[0], e[1] - t[1]);
      }
      function pointEqual(e, t) {
        return floatEqual(e[0], t[0]) && floatEqual(e[1], t[1]);
      }
      function ZigZagModifier() {
      }
      extendPrototype([ShapeModifier], ZigZagModifier), ZigZagModifier.prototype.initModifierProperties = function(e, t) {
        this.getValue = this.processKeys, this.amplitude = PropertyFactory.getProp(e, t.s, 0, null, this), this.frequency = PropertyFactory.getProp(e, t.r, 0, null, this), this.pointsType = PropertyFactory.getProp(e, t.pt, 0, null, this), this._isAnimated = this.amplitude.effectsSequence.length !== 0 || this.frequency.effectsSequence.length !== 0 || this.pointsType.effectsSequence.length !== 0;
      };
      function setPoint(e, t, r, i, n, s, a) {
        var l = r - Math.PI / 2, o = r + Math.PI / 2, f = t[0] + Math.cos(r) * i * n, c = t[1] - Math.sin(r) * i * n;
        e.setTripleAt(f, c, f + Math.cos(l) * s, c - Math.sin(l) * s, f + Math.cos(o) * a, c - Math.sin(o) * a, e.length());
      }
      function getPerpendicularVector(e, t) {
        var r = [t[0] - e[0], t[1] - e[1]], i = -Math.PI * 0.5, n = [Math.cos(i) * r[0] - Math.sin(i) * r[1], Math.sin(i) * r[0] + Math.cos(i) * r[1]];
        return n;
      }
      function getProjectingAngle(e, t) {
        var r = t === 0 ? e.length() - 1 : t - 1, i = (t + 1) % e.length(), n = e.v[r], s = e.v[i], a = getPerpendicularVector(n, s);
        return Math.atan2(0, 1) - Math.atan2(a[1], a[0]);
      }
      function zigZagCorner(e, t, r, i, n, s, a) {
        var l = getProjectingAngle(t, r), o = t.v[r % t._length], f = t.v[r === 0 ? t._length - 1 : r - 1], c = t.v[(r + 1) % t._length], v = s === 2 ? Math.sqrt(Math.pow(o[0] - f[0], 2) + Math.pow(o[1] - f[1], 2)) : 0, h = s === 2 ? Math.sqrt(Math.pow(o[0] - c[0], 2) + Math.pow(o[1] - c[1], 2)) : 0;
        setPoint(e, t.v[r % t._length], l, a, i, h / ((n + 1) * 2), v / ((n + 1) * 2));
      }
      function zigZagSegment(e, t, r, i, n, s) {
        for (var a = 0; a < i; a += 1) {
          var l = (a + 1) / (i + 1), o = n === 2 ? Math.sqrt(Math.pow(t.points[3][0] - t.points[0][0], 2) + Math.pow(t.points[3][1] - t.points[0][1], 2)) : 0, f = t.normalAngle(l), c = t.point(l);
          setPoint(e, c, f, s, r, o / ((i + 1) * 2), o / ((i + 1) * 2)), s = -s;
        }
        return s;
      }
      ZigZagModifier.prototype.processPath = function(e, t, r, i) {
        var n = e._length, s = shapePool.newElement();
        if (s.c = e.c, e.c || (n -= 1), n === 0) return s;
        var a = -1, l = PolynomialBezier.shapeSegment(e, 0);
        zigZagCorner(s, e, 0, t, r, i, a);
        for (var o = 0; o < n; o += 1)
          a = zigZagSegment(s, l, t, r, i, -a), o === n - 1 && !e.c ? l = null : l = PolynomialBezier.shapeSegment(e, (o + 1) % n), zigZagCorner(s, e, o + 1, t, r, i, a);
        return s;
      }, ZigZagModifier.prototype.processShapes = function(e) {
        var t, r, i = this.shapes.length, n, s, a = this.amplitude.v, l = Math.max(0, Math.round(this.frequency.v)), o = this.pointsType.v;
        if (a !== 0) {
          var f, c;
          for (r = 0; r < i; r += 1) {
            if (f = this.shapes[r], c = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !e))
              for (c.releaseShapes(), f.shape._mdf = !0, t = f.shape.paths.shapes, s = f.shape.paths._length, n = 0; n < s; n += 1)
                c.addShape(this.processPath(t[n], a, l, o));
            f.shape.paths = f.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function linearOffset(e, t, r) {
        var i = Math.atan2(t[0] - e[0], t[1] - e[1]);
        return [polarOffset(e, i, r), polarOffset(t, i, r)];
      }
      function offsetSegment(e, t) {
        var r, i, n, s, a, l, o;
        o = linearOffset(e.points[0], e.points[1], t), r = o[0], i = o[1], o = linearOffset(e.points[1], e.points[2], t), n = o[0], s = o[1], o = linearOffset(e.points[2], e.points[3], t), a = o[0], l = o[1];
        var f = lineIntersection(r, i, n, s);
        f === null && (f = i);
        var c = lineIntersection(a, l, n, s);
        return c === null && (c = a), new PolynomialBezier(r, f, c, l);
      }
      function joinLines(e, t, r, i, n) {
        var s = t.points[3], a = r.points[0];
        if (i === 3 || pointEqual(s, a)) return s;
        if (i === 2) {
          var l = -t.tangentAngle(1), o = -r.tangentAngle(0) + Math.PI, f = lineIntersection(s, polarOffset(s, l + Math.PI / 2, 100), a, polarOffset(a, l + Math.PI / 2, 100)), c = f ? pointDistance(f, s) : pointDistance(s, a) / 2, v = polarOffset(s, l, 2 * c * roundCorner);
          return e.setXYAt(v[0], v[1], "o", e.length() - 1), v = polarOffset(a, o, 2 * c * roundCorner), e.setTripleAt(a[0], a[1], a[0], a[1], v[0], v[1], e.length()), a;
        }
        var h = pointEqual(s, t.points[2]) ? t.points[0] : t.points[2], g = pointEqual(a, r.points[1]) ? r.points[3] : r.points[1], m = lineIntersection(h, s, a, g);
        return m && pointDistance(m, s) < n ? (e.setTripleAt(m[0], m[1], m[0], m[1], m[0], m[1], e.length()), m) : s;
      }
      function getIntersection(e, t) {
        var r = e.intersections(t);
        return r.length && floatEqual(r[0][0], 1) && r.shift(), r.length ? r[0] : null;
      }
      function pruneSegmentIntersection(e, t) {
        var r = e.slice(), i = t.slice(), n = getIntersection(e[e.length - 1], t[0]);
        return n && (r[e.length - 1] = e[e.length - 1].split(n[0])[0], i[0] = t[0].split(n[1])[1]), e.length > 1 && t.length > 1 && (n = getIntersection(e[0], t[t.length - 1]), n) ? [[e[0].split(n[0])[0]], [t[t.length - 1].split(n[1])[1]]] : [r, i];
      }
      function pruneIntersections(e) {
        for (var t, r = 1; r < e.length; r += 1)
          t = pruneSegmentIntersection(e[r - 1], e[r]), e[r - 1] = t[0], e[r] = t[1];
        return e.length > 1 && (t = pruneSegmentIntersection(e[e.length - 1], e[0]), e[e.length - 1] = t[0], e[0] = t[1]), e;
      }
      function offsetSegmentSplit(e, t) {
        var r = e.inflectionPoints(), i, n, s, a;
        if (r.length === 0)
          return [offsetSegment(e, t)];
        if (r.length === 1 || floatEqual(r[1], 1))
          return s = e.split(r[0]), i = s[0], n = s[1], [offsetSegment(i, t), offsetSegment(n, t)];
        s = e.split(r[0]), i = s[0];
        var l = (r[1] - r[0]) / (1 - r[0]);
        return s = s[1].split(l), a = s[0], n = s[1], [offsetSegment(i, t), offsetSegment(a, t), offsetSegment(n, t)];
      }
      function OffsetPathModifier() {
      }
      extendPrototype([ShapeModifier], OffsetPathModifier), OffsetPathModifier.prototype.initModifierProperties = function(e, t) {
        this.getValue = this.processKeys, this.amount = PropertyFactory.getProp(e, t.a, 0, null, this), this.miterLimit = PropertyFactory.getProp(e, t.ml, 0, null, this), this.lineJoin = t.lj, this._isAnimated = this.amount.effectsSequence.length !== 0;
      }, OffsetPathModifier.prototype.processPath = function(e, t, r, i) {
        var n = shapePool.newElement();
        n.c = e.c;
        var s = e.length();
        e.c || (s -= 1);
        var a, l, o, f = [];
        for (a = 0; a < s; a += 1)
          o = PolynomialBezier.shapeSegment(e, a), f.push(offsetSegmentSplit(o, t));
        if (!e.c)
          for (a = s - 1; a >= 0; a -= 1)
            o = PolynomialBezier.shapeSegmentInverted(e, a), f.push(offsetSegmentSplit(o, t));
        f = pruneIntersections(f);
        var c = null, v = null;
        for (a = 0; a < f.length; a += 1) {
          var h = f[a];
          for (v && (c = joinLines(n, v, h[0], r, i)), v = h[h.length - 1], l = 0; l < h.length; l += 1)
            o = h[l], c && pointEqual(o.points[0], c) ? n.setXYAt(o.points[1][0], o.points[1][1], "o", n.length() - 1) : n.setTripleAt(o.points[0][0], o.points[0][1], o.points[1][0], o.points[1][1], o.points[0][0], o.points[0][1], n.length()), n.setTripleAt(o.points[3][0], o.points[3][1], o.points[3][0], o.points[3][1], o.points[2][0], o.points[2][1], n.length()), c = o.points[3];
        }
        return f.length && joinLines(n, v, f[0][0], r, i), n;
      }, OffsetPathModifier.prototype.processShapes = function(e) {
        var t, r, i = this.shapes.length, n, s, a = this.amount.v, l = this.miterLimit.v, o = this.lineJoin;
        if (a !== 0) {
          var f, c;
          for (r = 0; r < i; r += 1) {
            if (f = this.shapes[r], c = f.localShapeCollection, !(!f.shape._mdf && !this._mdf && !e))
              for (c.releaseShapes(), f.shape._mdf = !0, t = f.shape.paths.shapes, s = f.shape.paths._length, n = 0; n < s; n += 1)
                c.addShape(this.processPath(t[n], a, o, l));
            f.shape.paths = f.localShapeCollection;
          }
        }
        this.dynamicProperties.length || (this._mdf = !1);
      };
      function getFontProperties(e) {
        for (var t = e.fStyle ? e.fStyle.split(" ") : [], r = "normal", i = "normal", n = t.length, s, a = 0; a < n; a += 1)
          switch (s = t[a].toLowerCase(), s) {
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
          weight: e.fWeight || r
        };
      }
      var FontManager = function() {
        var e = 5e3, t = {
          w: 0,
          size: 0,
          shapes: [],
          data: {
            shapes: []
          }
        }, r = [];
        r = r.concat([2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403]);
        var i = 127988, n = 917631, s = 917601, a = 917626, l = 65039, o = 8205, f = 127462, c = 127487, v = ["d83cdffb", "d83cdffc", "d83cdffd", "d83cdffe", "d83cdfff"];
        function h(A) {
          var k = A.split(","), x, P = k.length, T = [];
          for (x = 0; x < P; x += 1)
            k[x] !== "sans-serif" && k[x] !== "monospace" && T.push(k[x]);
          return T.join(",");
        }
        function g(A, k) {
          var x = createTag("span");
          x.setAttribute("aria-hidden", !0), x.style.fontFamily = k;
          var P = createTag("span");
          P.innerText = "giItT1WQy@!-/#", x.style.position = "absolute", x.style.left = "-10000px", x.style.top = "-10000px", x.style.fontSize = "300px", x.style.fontVariant = "normal", x.style.fontStyle = "normal", x.style.fontWeight = "normal", x.style.letterSpacing = "0", x.appendChild(P), document.body.appendChild(x);
          var T = P.offsetWidth;
          return P.style.fontFamily = h(A) + ", " + k, {
            node: P,
            w: T,
            parent: x
          };
        }
        function m() {
          var A, k = this.fonts.length, x, P, T = k;
          for (A = 0; A < k; A += 1)
            this.fonts[A].loaded ? T -= 1 : this.fonts[A].fOrigin === "n" || this.fonts[A].origin === 0 ? this.fonts[A].loaded = !0 : (x = this.fonts[A].monoCase.node, P = this.fonts[A].monoCase.w, x.offsetWidth !== P ? (T -= 1, this.fonts[A].loaded = !0) : (x = this.fonts[A].sansCase.node, P = this.fonts[A].sansCase.w, x.offsetWidth !== P && (T -= 1, this.fonts[A].loaded = !0)), this.fonts[A].loaded && (this.fonts[A].sansCase.parent.parentNode.removeChild(this.fonts[A].sansCase.parent), this.fonts[A].monoCase.parent.parentNode.removeChild(this.fonts[A].monoCase.parent)));
          T !== 0 && Date.now() - this.initTime < e ? setTimeout(this.checkLoadedFontsBinded, 20) : setTimeout(this.setIsLoadedBinded, 10);
        }
        function p(A, k) {
          var x = document.body && k ? "svg" : "canvas", P, T = getFontProperties(A);
          if (x === "svg") {
            var R = createNS("text");
            R.style.fontSize = "100px", R.setAttribute("font-family", A.fFamily), R.setAttribute("font-style", T.style), R.setAttribute("font-weight", T.weight), R.textContent = "1", A.fClass ? (R.style.fontFamily = "inherit", R.setAttribute("class", A.fClass)) : R.style.fontFamily = A.fFamily, k.appendChild(R), P = R;
          } else {
            var N = new OffscreenCanvas(500, 500).getContext("2d");
            N.font = T.style + " " + T.weight + " 100px " + A.fFamily, P = N;
          }
          function H(z) {
            return x === "svg" ? (P.textContent = z, P.getComputedTextLength()) : P.measureText(z).width;
          }
          return {
            measureText: H
          };
        }
        function b(A, k) {
          if (!A) {
            this.isLoaded = !0;
            return;
          }
          if (this.chars) {
            this.isLoaded = !0, this.fonts = A.list;
            return;
          }
          if (!document.body) {
            this.isLoaded = !0, A.list.forEach(function(ie) {
              ie.helper = p(ie), ie.cache = {};
            }), this.fonts = A.list;
            return;
          }
          var x = A.list, P, T = x.length, R = T;
          for (P = 0; P < T; P += 1) {
            var N = !0, H, z;
            if (x[P].loaded = !1, x[P].monoCase = g(x[P].fFamily, "monospace"), x[P].sansCase = g(x[P].fFamily, "sans-serif"), !x[P].fPath)
              x[P].loaded = !0, R -= 1;
            else if (x[P].fOrigin === "p" || x[P].origin === 3) {
              if (H = document.querySelectorAll('style[f-forigin="p"][f-family="' + x[P].fFamily + '"], style[f-origin="3"][f-family="' + x[P].fFamily + '"]'), H.length > 0 && (N = !1), N) {
                var J = createTag("style");
                J.setAttribute("f-forigin", x[P].fOrigin), J.setAttribute("f-origin", x[P].origin), J.setAttribute("f-family", x[P].fFamily), J.type = "text/css", J.innerText = "@font-face {font-family: " + x[P].fFamily + "; font-style: normal; src: url('" + x[P].fPath + "');}", k.appendChild(J);
              }
            } else if (x[P].fOrigin === "g" || x[P].origin === 1) {
              for (H = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), z = 0; z < H.length; z += 1)
                H[z].href.indexOf(x[P].fPath) !== -1 && (N = !1);
              if (N) {
                var q = createTag("link");
                q.setAttribute("f-forigin", x[P].fOrigin), q.setAttribute("f-origin", x[P].origin), q.type = "text/css", q.rel = "stylesheet", q.href = x[P].fPath, document.body.appendChild(q);
              }
            } else if (x[P].fOrigin === "t" || x[P].origin === 2) {
              for (H = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), z = 0; z < H.length; z += 1)
                x[P].fPath === H[z].src && (N = !1);
              if (N) {
                var se = createTag("link");
                se.setAttribute("f-forigin", x[P].fOrigin), se.setAttribute("f-origin", x[P].origin), se.setAttribute("rel", "stylesheet"), se.setAttribute("href", x[P].fPath), k.appendChild(se);
              }
            }
            x[P].helper = p(x[P], k), x[P].cache = {}, this.fonts.push(x[P]);
          }
          R === 0 ? this.isLoaded = !0 : setTimeout(this.checkLoadedFonts.bind(this), 100);
        }
        function u(A) {
          if (A) {
            this.chars || (this.chars = []);
            var k, x = A.length, P, T = this.chars.length, R;
            for (k = 0; k < x; k += 1) {
              for (P = 0, R = !1; P < T; )
                this.chars[P].style === A[k].style && this.chars[P].fFamily === A[k].fFamily && this.chars[P].ch === A[k].ch && (R = !0), P += 1;
              R || (this.chars.push(A[k]), T += 1);
            }
          }
        }
        function y(A, k, x) {
          for (var P = 0, T = this.chars.length; P < T; ) {
            if (this.chars[P].ch === A && this.chars[P].style === k && this.chars[P].fFamily === x)
              return this.chars[P];
            P += 1;
          }
          return (typeof A == "string" && A.charCodeAt(0) !== 13 || !A) && console && console.warn && !this._warned && (this._warned = !0, console.warn("Missing character from exported characters list: ", A, k, x)), t;
        }
        function d(A, k, x) {
          var P = this.getFontByName(k), T = A;
          if (!P.cache[T]) {
            var R = P.helper;
            if (A === " ") {
              var N = R.measureText("|" + A + "|"), H = R.measureText("||");
              P.cache[T] = (N - H) / 100;
            } else
              P.cache[T] = R.measureText(A) / 100;
          }
          return P.cache[T] * x;
        }
        function E(A) {
          for (var k = 0, x = this.fonts.length; k < x; ) {
            if (this.fonts[k].fName === A)
              return this.fonts[k];
            k += 1;
          }
          return this.fonts[0];
        }
        function S(A) {
          var k = 0, x = A.charCodeAt(0);
          if (x >= 55296 && x <= 56319) {
            var P = A.charCodeAt(1);
            P >= 56320 && P <= 57343 && (k = (x - 55296) * 1024 + P - 56320 + 65536);
          }
          return k;
        }
        function C(A, k) {
          var x = A.toString(16) + k.toString(16);
          return v.indexOf(x) !== -1;
        }
        function w(A) {
          return A === o;
        }
        function M(A) {
          return A === l;
        }
        function O(A) {
          var k = S(A);
          return k >= f && k <= c;
        }
        function j(A) {
          return O(A.substr(0, 2)) && O(A.substr(2, 2));
        }
        function B(A) {
          return r.indexOf(A) !== -1;
        }
        function L(A, k) {
          var x = S(A.substr(k, 2));
          if (x !== i)
            return !1;
          var P = 0;
          for (k += 2; P < 5; ) {
            if (x = S(A.substr(k, 2)), x < s || x > a)
              return !1;
            P += 1, k += 2;
          }
          return S(A.substr(k, 2)) === n;
        }
        function V() {
          this.isLoaded = !0;
        }
        var $ = function() {
          this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.isLoaded = !1, this._warned = !1, this.initTime = Date.now(), this.setIsLoadedBinded = this.setIsLoaded.bind(this), this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
        };
        $.isModifier = C, $.isZeroWidthJoiner = w, $.isFlagEmoji = j, $.isRegionalCode = O, $.isCombinedCharacter = B, $.isRegionalFlag = L, $.isVariationSelector = M, $.BLACK_FLAG_CODE_POINT = i;
        var D = {
          addChars: u,
          addFonts: b,
          getCharData: y,
          getFontByName: E,
          measureText: d,
          checkLoadedFonts: m,
          setIsLoaded: V
        };
        return $.prototype = D, $;
      }();
      function SlotManager(e) {
        this.animationData = e;
      }
      SlotManager.prototype.getProp = function(e) {
        return this.animationData.slots && this.animationData.slots[e.sid] ? Object.assign(e, this.animationData.slots[e.sid].p) : e;
      };
      function slotFactory(e) {
        return new SlotManager(e);
      }
      function RenderableElement() {
      }
      RenderableElement.prototype = {
        initRenderable: function() {
          this.isInRange = !1, this.hidden = !1, this.isTransparent = !1, this.renderableComponents = [];
        },
        addRenderableComponent: function(t) {
          this.renderableComponents.indexOf(t) === -1 && this.renderableComponents.push(t);
        },
        removeRenderableComponent: function(t) {
          this.renderableComponents.indexOf(t) !== -1 && this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
        },
        prepareRenderableFrame: function(t) {
          this.checkLayerLimits(t);
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
        checkLayerLimits: function(t) {
          this.data.ip - this.data.st <= t && this.data.op - this.data.st > t ? this.isInRange !== !0 && (this.globalData._mdf = !0, this._mdf = !0, this.isInRange = !0, this.show()) : this.isInRange !== !1 && (this.globalData._mdf = !0, this.isInRange = !1, this.hide());
        },
        renderRenderable: function() {
          var t, r = this.renderableComponents.length;
          for (t = 0; t < r; t += 1)
            this.renderableComponents[t].renderFrame(this._isFirstFrame);
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
        var e = {
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
        return function(t) {
          return e[t] || "";
        };
      }();
      function SliderEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r);
      }
      function AngleEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r);
      }
      function ColorEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 1, 0, r);
      }
      function PointEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 1, 0, r);
      }
      function LayerIndexEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r);
      }
      function MaskIndexEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r);
      }
      function CheckboxEffect(e, t, r) {
        this.p = PropertyFactory.getProp(t, e.v, 0, 0, r);
      }
      function NoValueEffect() {
        this.p = {};
      }
      function EffectsManager(e, t) {
        var r = e.ef || [];
        this.effectElements = [];
        var i, n = r.length, s;
        for (i = 0; i < n; i += 1)
          s = new GroupEffect(r[i], t), this.effectElements.push(s);
      }
      function GroupEffect(e, t) {
        this.init(e, t);
      }
      extendPrototype([DynamicPropertyContainer], GroupEffect), GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties, GroupEffect.prototype.init = function(e, t) {
        this.data = e, this.effectElements = [], this.initDynamicPropertyContainer(t);
        var r, i = this.data.ef.length, n, s = this.data.ef;
        for (r = 0; r < i; r += 1) {
          switch (n = null, s[r].ty) {
            case 0:
              n = new SliderEffect(s[r], t, this);
              break;
            case 1:
              n = new AngleEffect(s[r], t, this);
              break;
            case 2:
              n = new ColorEffect(s[r], t, this);
              break;
            case 3:
              n = new PointEffect(s[r], t, this);
              break;
            case 4:
            case 7:
              n = new CheckboxEffect(s[r], t, this);
              break;
            case 10:
              n = new LayerIndexEffect(s[r], t, this);
              break;
            case 11:
              n = new MaskIndexEffect(s[r], t, this);
              break;
            case 5:
              n = new EffectsManager(s[r], t);
              break;
            // case 6:
            default:
              n = new NoValueEffect(s[r]);
              break;
          }
          n && this.effectElements.push(n);
        }
      };
      function BaseElement() {
      }
      BaseElement.prototype = {
        checkMasks: function() {
          if (!this.data.hasMask)
            return !1;
          for (var t = 0, r = this.data.masksProperties.length; t < r; ) {
            if (this.data.masksProperties[t].mode !== "n" && this.data.masksProperties[t].cl !== !1)
              return !0;
            t += 1;
          }
          return !1;
        },
        initExpressions: function() {
          var t = getExpressionInterfaces();
          if (t) {
            var r = t("layer"), i = t("effects"), n = t("shape"), s = t("text"), a = t("comp");
            this.layerInterface = r(this), this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
            var l = i.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(l), this.data.ty === 0 || this.data.xt ? this.compInterface = a(this) : this.data.ty === 4 ? (this.layerInterface.shapeInterface = n(this.shapesData, this.itemsData, this.layerInterface), this.layerInterface.content = this.layerInterface.shapeInterface) : this.data.ty === 5 && (this.layerInterface.textInterface = s(this), this.layerInterface.text = this.layerInterface.textInterface);
          }
        },
        setBlendMode: function() {
          var t = getBlendMode(this.data.bm), r = this.baseElement || this.layerElement;
          r.style["mix-blend-mode"] = t;
        },
        initBaseData: function(t, r, i) {
          this.globalData = r, this.comp = i, this.data = t, this.layerId = createElementID(), this.data.sr || (this.data.sr = 1), this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
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
        prepareProperties: function(t, r) {
          var i, n = this.dynamicProperties.length;
          for (i = 0; i < n; i += 1)
            (r || this._isParent && this.dynamicProperties[i].propType === "transform") && (this.dynamicProperties[i].getValue(), this.dynamicProperties[i]._mdf && (this.globalData._mdf = !0, this._mdf = !0));
        },
        addDynamicProperty: function(t) {
          this.dynamicProperties.indexOf(t) === -1 && this.dynamicProperties.push(t);
        }
      };
      function FootageElement(e, t, r) {
        this.initFrame(), this.initRenderable(), this.assetData = t.getAssetData(e.refId), this.footageData = t.imageLoader.getAsset(this.assetData), this.initBaseData(e, t, r);
      }
      FootageElement.prototype.prepareFrame = function() {
      }, extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement), FootageElement.prototype.getBaseElement = function() {
        return null;
      }, FootageElement.prototype.renderFrame = function() {
      }, FootageElement.prototype.destroy = function() {
      }, FootageElement.prototype.initExpressions = function() {
        var e = getExpressionInterfaces();
        if (e) {
          var t = e("footage");
          this.layerInterface = t(this);
        }
      }, FootageElement.prototype.getFootageData = function() {
        return this.footageData;
      };
      function AudioElement(e, t, r) {
        this.initFrame(), this.initRenderable(), this.assetData = t.getAssetData(e.refId), this.initBaseData(e, t, r), this._isPlaying = !1, this._canPlay = !1;
        var i = this.globalData.getAssetsPath(this.assetData);
        this.audio = this.globalData.audioController.createAudio(i), this._currentTime = 0, this.globalData.audioController.addAudio(this), this._volumeMultiplier = 1, this._volume = 1, this._previousVolume = null, this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : {
          _placeholder: !0
        }, this.lv = PropertyFactory.getProp(this, e.au && e.au.lv ? e.au.lv : {
          k: [100]
        }, 1, 0.01, this);
      }
      AudioElement.prototype.prepareFrame = function(e) {
        if (this.prepareRenderableFrame(e, !0), this.prepareProperties(e, !0), this.tm._placeholder)
          this._currentTime = e / this.data.sr;
        else {
          var t = this.tm.v;
          this._currentTime = t;
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
      }, AudioElement.prototype.setRate = function(e) {
        this.audio.rate(e);
      }, AudioElement.prototype.volume = function(e) {
        this._volumeMultiplier = e, this._previousVolume = e * this._volume, this.audio.volume(this._previousVolume);
      }, AudioElement.prototype.getBaseElement = function() {
        return null;
      }, AudioElement.prototype.destroy = function() {
      }, AudioElement.prototype.sourceRectAtTime = function() {
      }, AudioElement.prototype.initExpressions = function() {
      };
      function BaseRenderer() {
      }
      BaseRenderer.prototype.checkLayers = function(e) {
        var t, r = this.layers.length, i;
        for (this.completeLayers = !0, t = r - 1; t >= 0; t -= 1)
          this.elements[t] || (i = this.layers[t], i.ip - i.st <= e - this.layers[t].st && i.op - i.st > e - this.layers[t].st && this.buildItem(t)), this.completeLayers = this.elements[t] ? this.completeLayers : !1;
        this.checkPendingElements();
      }, BaseRenderer.prototype.createItem = function(e) {
        switch (e.ty) {
          case 2:
            return this.createImage(e);
          case 0:
            return this.createComp(e);
          case 1:
            return this.createSolid(e);
          case 3:
            return this.createNull(e);
          case 4:
            return this.createShape(e);
          case 5:
            return this.createText(e);
          case 6:
            return this.createAudio(e);
          case 13:
            return this.createCamera(e);
          case 15:
            return this.createFootage(e);
          default:
            return this.createNull(e);
        }
      }, BaseRenderer.prototype.createCamera = function() {
        throw new Error("You're using a 3d camera. Try the html renderer.");
      }, BaseRenderer.prototype.createAudio = function(e) {
        return new AudioElement(e, this.globalData, this);
      }, BaseRenderer.prototype.createFootage = function(e) {
        return new FootageElement(e, this.globalData, this);
      }, BaseRenderer.prototype.buildAllItems = function() {
        var e, t = this.layers.length;
        for (e = 0; e < t; e += 1)
          this.buildItem(e);
        this.checkPendingElements();
      }, BaseRenderer.prototype.includeLayers = function(e) {
        this.completeLayers = !1;
        var t, r = e.length, i, n = this.layers.length;
        for (t = 0; t < r; t += 1)
          for (i = 0; i < n; ) {
            if (this.layers[i].id === e[t].id) {
              this.layers[i] = e[t];
              break;
            }
            i += 1;
          }
      }, BaseRenderer.prototype.setProjectInterface = function(e) {
        this.globalData.projectInterface = e;
      }, BaseRenderer.prototype.initItems = function() {
        this.globalData.progressiveLoad || this.buildAllItems();
      }, BaseRenderer.prototype.buildElementParenting = function(e, t, r) {
        for (var i = this.elements, n = this.layers, s = 0, a = n.length; s < a; )
          n[s].ind == t && (!i[s] || i[s] === !0 ? (this.buildItem(s), this.addPendingElement(e)) : (r.push(i[s]), i[s].setAsParent(), n[s].parent !== void 0 ? this.buildElementParenting(e, n[s].parent, r) : e.setHierarchy(r))), s += 1;
      }, BaseRenderer.prototype.addPendingElement = function(e) {
        this.pendingElements.push(e);
      }, BaseRenderer.prototype.searchExtraCompositions = function(e) {
        var t, r = e.length;
        for (t = 0; t < r; t += 1)
          if (e[t].xt) {
            var i = this.createComp(e[t]);
            i.initExpressions(), this.globalData.projectInterface.registerComposition(i);
          }
      }, BaseRenderer.prototype.getElementById = function(e) {
        var t, r = this.elements.length;
        for (t = 0; t < r; t += 1)
          if (this.elements[t].data.ind === e)
            return this.elements[t];
        return null;
      }, BaseRenderer.prototype.getElementByPath = function(e) {
        var t = e.shift(), r;
        if (typeof t == "number")
          r = this.elements[t];
        else {
          var i, n = this.elements.length;
          for (i = 0; i < n; i += 1)
            if (this.elements[i].data.nm === t) {
              r = this.elements[i];
              break;
            }
        }
        return e.length === 0 ? r : r.getElementByPath(e);
      }, BaseRenderer.prototype.setupGlobalData = function(e, t) {
        this.globalData.fontManager = new FontManager(), this.globalData.slotManager = slotFactory(e), this.globalData.fontManager.addChars(e.chars), this.globalData.fontManager.addFonts(e.fonts, t), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.imageLoader = this.animationItem.imagePreloader, this.globalData.audioController = this.animationItem.audioController, this.globalData.frameId = 0, this.globalData.frameRate = e.fr, this.globalData.nm = e.nm, this.globalData.compSize = {
          w: e.w,
          h: e.h
        };
      };
      var effectTypes = {
        TRANSFORM_EFFECT: "transformEFfect"
      };
      function TransformElement() {
      }
      TransformElement.prototype = {
        initTransform: function() {
          var t = new Matrix();
          this.finalTransform = {
            mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : {
              o: 0
            },
            _matMdf: !1,
            _localMatMdf: !1,
            _opMdf: !1,
            mat: t,
            localMat: t,
            localOpacity: 1
          }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.data.ty;
        },
        renderTransform: function() {
          if (this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame, this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame, this.hierarchy) {
            var t, r = this.finalTransform.mat, i = 0, n = this.hierarchy.length;
            if (!this.finalTransform._matMdf)
              for (; i < n; ) {
                if (this.hierarchy[i].finalTransform.mProp._mdf) {
                  this.finalTransform._matMdf = !0;
                  break;
                }
                i += 1;
              }
            if (this.finalTransform._matMdf)
              for (t = this.finalTransform.mProp.v.props, r.cloneFromProps(t), i = 0; i < n; i += 1)
                r.multiply(this.hierarchy[i].finalTransform.mProp.v);
          }
          this.finalTransform._matMdf && (this.finalTransform._localMatMdf = this.finalTransform._matMdf), this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v);
        },
        renderLocalTransform: function() {
          if (this.localTransforms) {
            var t = 0, r = this.localTransforms.length;
            if (this.finalTransform._localMatMdf = this.finalTransform._matMdf, !this.finalTransform._localMatMdf || !this.finalTransform._opMdf)
              for (; t < r; )
                this.localTransforms[t]._mdf && (this.finalTransform._localMatMdf = !0), this.localTransforms[t]._opMdf && !this.finalTransform._opMdf && (this.finalTransform.localOpacity = this.finalTransform.mProp.o.v, this.finalTransform._opMdf = !0), t += 1;
            if (this.finalTransform._localMatMdf) {
              var i = this.finalTransform.localMat;
              for (this.localTransforms[0].matrix.clone(i), t = 1; t < r; t += 1) {
                var n = this.localTransforms[t].matrix;
                i.multiply(n);
              }
              i.multiply(this.finalTransform.mat);
            }
            if (this.finalTransform._opMdf) {
              var s = this.finalTransform.localOpacity;
              for (t = 0; t < r; t += 1)
                s *= this.localTransforms[t].opacity * 0.01;
              this.finalTransform.localOpacity = s;
            }
          }
        },
        searchEffectTransforms: function() {
          if (this.renderableEffectsManager) {
            var t = this.renderableEffectsManager.getEffects(effectTypes.TRANSFORM_EFFECT);
            if (t.length) {
              this.localTransforms = [], this.finalTransform.localMat = new Matrix();
              var r = 0, i = t.length;
              for (r = 0; r < i; r += 1)
                this.localTransforms.push(t[r]);
            }
          }
        },
        globalToLocal: function(t) {
          var r = [];
          r.push(this.finalTransform);
          for (var i = !0, n = this.comp; i; )
            n.finalTransform ? (n.data.hasMask && r.splice(0, 0, n.finalTransform), n = n.comp) : i = !1;
          var s, a = r.length, l;
          for (s = 0; s < a; s += 1)
            l = r[s].mat.applyToPointArray(0, 0, 0), t = [t[0] - l[0], t[1] - l[1], 0];
          return t;
        },
        mHelper: new Matrix()
      };
      function MaskElement(e, t, r) {
        this.data = e, this.element = t, this.globalData = r, this.storedData = [], this.masksProperties = this.data.masksProperties || [], this.maskElement = null;
        var i = this.globalData.defs, n, s = this.masksProperties ? this.masksProperties.length : 0;
        this.viewData = createSizedArray(s), this.solidPath = "";
        var a, l = this.masksProperties, o = 0, f = [], c, v, h = createElementID(), g, m, p, b, u = "clipPath", y = "clip-path";
        for (n = 0; n < s; n += 1)
          if ((l[n].mode !== "a" && l[n].mode !== "n" || l[n].inv || l[n].o.k !== 100 || l[n].o.x) && (u = "mask", y = "mask"), (l[n].mode === "s" || l[n].mode === "i") && o === 0 ? (g = createNS("rect"), g.setAttribute("fill", "#ffffff"), g.setAttribute("width", this.element.comp.data.w || 0), g.setAttribute("height", this.element.comp.data.h || 0), f.push(g)) : g = null, a = createNS("path"), l[n].mode === "n")
            this.viewData[n] = {
              op: PropertyFactory.getProp(this.element, l[n].o, 0, 0.01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, l[n], 3),
              elem: a,
              lastPath: ""
            }, i.appendChild(a);
          else {
            o += 1, a.setAttribute("fill", l[n].mode === "s" ? "#000000" : "#ffffff"), a.setAttribute("clip-rule", "nonzero");
            var d;
            if (l[n].x.k !== 0 ? (u = "mask", y = "mask", b = PropertyFactory.getProp(this.element, l[n].x, 0, null, this.element), d = createElementID(), m = createNS("filter"), m.setAttribute("id", d), p = createNS("feMorphology"), p.setAttribute("operator", "erode"), p.setAttribute("in", "SourceGraphic"), p.setAttribute("radius", "0"), m.appendChild(p), i.appendChild(m), a.setAttribute("stroke", l[n].mode === "s" ? "#000000" : "#ffffff")) : (p = null, b = null), this.storedData[n] = {
              elem: a,
              x: b,
              expan: p,
              lastPath: "",
              lastOperator: "",
              filterId: d,
              lastRadius: 0
            }, l[n].mode === "i") {
              v = f.length;
              var E = createNS("g");
              for (c = 0; c < v; c += 1)
                E.appendChild(f[c]);
              var S = createNS("mask");
              S.setAttribute("mask-type", "alpha"), S.setAttribute("id", h + "_" + o), S.appendChild(a), i.appendChild(S), E.setAttribute("mask", "url(" + getLocationHref() + "#" + h + "_" + o + ")"), f.length = 0, f.push(E);
            } else
              f.push(a);
            l[n].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[n] = {
              elem: a,
              lastPath: "",
              op: PropertyFactory.getProp(this.element, l[n].o, 0, 0.01, this.element),
              prop: ShapePropertyFactory.getShapeProp(this.element, l[n], 3),
              invRect: g
            }, this.viewData[n].prop.k || this.drawPath(l[n], this.viewData[n].prop.v, this.viewData[n]);
          }
        for (this.maskElement = createNS(u), s = f.length, n = 0; n < s; n += 1)
          this.maskElement.appendChild(f[n]);
        o > 0 && (this.maskElement.setAttribute("id", h), this.element.maskedElement.setAttribute(y, "url(" + getLocationHref() + "#" + h + ")"), i.appendChild(this.maskElement)), this.viewData.length && this.element.addRenderableComponent(this);
      }
      MaskElement.prototype.getMaskProperty = function(e) {
        return this.viewData[e].prop;
      }, MaskElement.prototype.renderFrame = function(e) {
        var t = this.element.finalTransform.mat, r, i = this.masksProperties.length;
        for (r = 0; r < i; r += 1)
          if ((this.viewData[r].prop._mdf || e) && this.drawPath(this.masksProperties[r], this.viewData[r].prop.v, this.viewData[r]), (this.viewData[r].op._mdf || e) && this.viewData[r].elem.setAttribute("fill-opacity", this.viewData[r].op.v), this.masksProperties[r].mode !== "n" && (this.viewData[r].invRect && (this.element.finalTransform.mProp._mdf || e) && this.viewData[r].invRect.setAttribute("transform", t.getInverseMatrix().to2dCSS()), this.storedData[r].x && (this.storedData[r].x._mdf || e))) {
            var n = this.storedData[r].expan;
            this.storedData[r].x.v < 0 ? (this.storedData[r].lastOperator !== "erode" && (this.storedData[r].lastOperator = "erode", this.storedData[r].elem.setAttribute("filter", "url(" + getLocationHref() + "#" + this.storedData[r].filterId + ")")), n.setAttribute("radius", -this.storedData[r].x.v)) : (this.storedData[r].lastOperator !== "dilate" && (this.storedData[r].lastOperator = "dilate", this.storedData[r].elem.setAttribute("filter", null)), this.storedData[r].elem.setAttribute("stroke-width", this.storedData[r].x.v * 2));
          }
      }, MaskElement.prototype.getMaskelement = function() {
        return this.maskElement;
      }, MaskElement.prototype.createLayerSolidPath = function() {
        var e = "M0,0 ";
        return e += " h" + this.globalData.compSize.w, e += " v" + this.globalData.compSize.h, e += " h-" + this.globalData.compSize.w, e += " v-" + this.globalData.compSize.h + " ", e;
      }, MaskElement.prototype.drawPath = function(e, t, r) {
        var i = " M" + t.v[0][0] + "," + t.v[0][1], n, s;
        for (s = t._length, n = 1; n < s; n += 1)
          i += " C" + t.o[n - 1][0] + "," + t.o[n - 1][1] + " " + t.i[n][0] + "," + t.i[n][1] + " " + t.v[n][0] + "," + t.v[n][1];
        if (t.c && s > 1 && (i += " C" + t.o[n - 1][0] + "," + t.o[n - 1][1] + " " + t.i[0][0] + "," + t.i[0][1] + " " + t.v[0][0] + "," + t.v[0][1]), r.lastPath !== i) {
          var a = "";
          r.elem && (t.c && (a = e.inv ? this.solidPath + i : i), r.elem.setAttribute("d", a)), r.lastPath = i;
        }
      }, MaskElement.prototype.destroy = function() {
        this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.masksProperties = null;
      };
      var filtersFactory = function() {
        var e = {};
        e.createFilter = t, e.createAlphaToLuminanceFilter = r;
        function t(i, n) {
          var s = createNS("filter");
          return s.setAttribute("id", i), n !== !0 && (s.setAttribute("filterUnits", "objectBoundingBox"), s.setAttribute("x", "0%"), s.setAttribute("y", "0%"), s.setAttribute("width", "100%"), s.setAttribute("height", "100%")), s;
        }
        function r() {
          var i = createNS("feColorMatrix");
          return i.setAttribute("type", "matrix"), i.setAttribute("color-interpolation-filters", "sRGB"), i.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1"), i;
        }
        return e;
      }(), featureSupport = function() {
        var e = {
          maskType: !0,
          svgLumaHidden: !0,
          offscreenCanvas: typeof OffscreenCanvas < "u"
        };
        return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (e.maskType = !1), /firefox/i.test(navigator.userAgent) && (e.svgLumaHidden = !1), e;
      }(), registeredEffects$1 = {}, idPrefix = "filter_result_";
      function SVGEffects(e) {
        var t, r = "SourceGraphic", i = e.data.ef ? e.data.ef.length : 0, n = createElementID(), s = filtersFactory.createFilter(n, !0), a = 0;
        this.filters = [];
        var l;
        for (t = 0; t < i; t += 1) {
          l = null;
          var o = e.data.ef[t].ty;
          if (registeredEffects$1[o]) {
            var f = registeredEffects$1[o].effect;
            l = new f(s, e.effectsManager.effectElements[t], e, idPrefix + a, r), r = idPrefix + a, registeredEffects$1[o].countsAsEffect && (a += 1);
          }
          l && this.filters.push(l);
        }
        a && (e.globalData.defs.appendChild(s), e.layerElement.setAttribute("filter", "url(" + getLocationHref() + "#" + n + ")")), this.filters.length && e.addRenderableComponent(this);
      }
      SVGEffects.prototype.renderFrame = function(e) {
        var t, r = this.filters.length;
        for (t = 0; t < r; t += 1)
          this.filters[t].renderFrame(e);
      }, SVGEffects.prototype.getEffects = function(e) {
        var t, r = this.filters.length, i = [];
        for (t = 0; t < r; t += 1)
          this.filters[t].type === e && i.push(this.filters[t]);
        return i;
      };
      function registerEffect$1(e, t, r) {
        registeredEffects$1[e] = {
          effect: t,
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
          var t = null;
          if (this.data.td) {
            this.matteMasks = {};
            var r = createNS("g");
            r.setAttribute("id", this.layerId), r.appendChild(this.layerElement), t = r, this.globalData.defs.appendChild(r);
          } else this.data.tt ? (this.matteElement.appendChild(this.layerElement), t = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
          if (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl), this.data.ty === 0 && !this.data.hd) {
            var i = createNS("clipPath"), n = createNS("path");
            n.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
            var s = createElementID();
            if (i.setAttribute("id", s), i.appendChild(n), this.globalData.defs.appendChild(i), this.checkMasks()) {
              var a = createNS("g");
              a.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")"), a.appendChild(this.layerElement), this.transformedElement = a, t ? t.appendChild(this.transformedElement) : this.baseElement = this.transformedElement;
            } else
              this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + s + ")");
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
        getMatte: function(t) {
          if (this.matteMasks || (this.matteMasks = {}), !this.matteMasks[t]) {
            var r = this.layerId + "_" + t, i, n, s, a;
            if (t === 1 || t === 3) {
              var l = createNS("mask");
              l.setAttribute("id", r), l.setAttribute("mask-type", t === 3 ? "luminance" : "alpha"), s = createNS("use"), s.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), l.appendChild(s), this.globalData.defs.appendChild(l), !featureSupport.maskType && t === 1 && (l.setAttribute("mask-type", "luminance"), i = createElementID(), n = filtersFactory.createFilter(i), this.globalData.defs.appendChild(n), n.appendChild(filtersFactory.createAlphaToLuminanceFilter()), a = createNS("g"), a.appendChild(s), l.appendChild(a), a.setAttribute("filter", "url(" + getLocationHref() + "#" + i + ")"));
            } else if (t === 2) {
              var o = createNS("mask");
              o.setAttribute("id", r), o.setAttribute("mask-type", "alpha");
              var f = createNS("g");
              o.appendChild(f), i = createElementID(), n = filtersFactory.createFilter(i);
              var c = createNS("feComponentTransfer");
              c.setAttribute("in", "SourceGraphic"), n.appendChild(c);
              var v = createNS("feFuncA");
              v.setAttribute("type", "table"), v.setAttribute("tableValues", "1.0 0.0"), c.appendChild(v), this.globalData.defs.appendChild(n);
              var h = createNS("rect");
              h.setAttribute("width", this.comp.data.w), h.setAttribute("height", this.comp.data.h), h.setAttribute("x", "0"), h.setAttribute("y", "0"), h.setAttribute("fill", "#ffffff"), h.setAttribute("opacity", "0"), f.setAttribute("filter", "url(" + getLocationHref() + "#" + i + ")"), f.appendChild(h), s = createNS("use"), s.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#" + this.layerId), f.appendChild(s), featureSupport.maskType || (o.setAttribute("mask-type", "luminance"), n.appendChild(filtersFactory.createAlphaToLuminanceFilter()), a = createNS("g"), f.appendChild(h), a.appendChild(this.layerElement), f.appendChild(a)), this.globalData.defs.appendChild(o);
            }
            this.matteMasks[t] = r;
          }
          return this.matteMasks[t];
        },
        setMatte: function(t) {
          this.matteElement && this.matteElement.setAttribute("mask", "url(" + getLocationHref() + "#" + t + ")");
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
        setHierarchy: function(t) {
          this.hierarchy = t;
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
        var e = {
          initElement: function(r, i, n) {
            this.initFrame(), this.initBaseData(r, i, n), this.initTransform(r, i, n), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide();
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
        extendPrototype([RenderableElement, createProxyFunction(e)], RenderableDOMElement);
      })();
      function IImageElement(e, t, r) {
        this.assetData = t.getAssetData(e.refId), this.assetData && this.assetData.sid && (this.assetData = t.slotManager.getProp(this.assetData)), this.initElement(e, t, r), this.sourceRect = {
          top: 0,
          left: 0,
          width: this.assetData.w,
          height: this.assetData.h
        };
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement), IImageElement.prototype.createContent = function() {
        var e = this.globalData.getAssetsPath(this.assetData);
        this.innerElem = createNS("image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", e), this.layerElement.appendChild(this.innerElem);
      }, IImageElement.prototype.sourceRectAtTime = function() {
        return this.sourceRect;
      };
      function ProcessedElement(e, t) {
        this.elem = e, this.pos = t;
      }
      function IShapeElement() {
      }
      IShapeElement.prototype = {
        addShapeToModifiers: function(t) {
          var r, i = this.shapeModifiers.length;
          for (r = 0; r < i; r += 1)
            this.shapeModifiers[r].addShape(t);
        },
        isShapeInAnimatedModifiers: function(t) {
          for (var r = 0, i = this.shapeModifiers.length; r < i; )
            if (this.shapeModifiers[r].isAnimatedWithShape(t))
              return !0;
          return !1;
        },
        renderModifiers: function() {
          if (this.shapeModifiers.length) {
            var t, r = this.shapes.length;
            for (t = 0; t < r; t += 1)
              this.shapes[t].sh.reset();
            r = this.shapeModifiers.length;
            var i;
            for (t = r - 1; t >= 0 && (i = this.shapeModifiers[t].processShapes(this._isFirstFrame), !i); t -= 1)
              ;
          }
        },
        searchProcessedElement: function(t) {
          for (var r = this.processedElements, i = 0, n = r.length; i < n; ) {
            if (r[i].elem === t)
              return r[i].pos;
            i += 1;
          }
          return 0;
        },
        addProcessedElement: function(t, r) {
          for (var i = this.processedElements, n = i.length; n; )
            if (n -= 1, i[n].elem === t) {
              i[n].pos = r;
              return;
            }
          i.push(new ProcessedElement(t, r));
        },
        prepareFrame: function(t) {
          this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
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
      function SVGShapeData(e, t, r) {
        this.caches = [], this.styles = [], this.transformers = e, this.lStr = "", this.sh = r, this.lvl = t, this._isAnimated = !!r.k;
        for (var i = 0, n = e.length; i < n; ) {
          if (e[i].mProps.dynamicProperties.length) {
            this._isAnimated = !0;
            break;
          }
          i += 1;
        }
      }
      SVGShapeData.prototype.setAsAnimated = function() {
        this._isAnimated = !0;
      };
      function SVGStyleData(e, t) {
        this.data = e, this.type = e.ty, this.d = "", this.lvl = t, this._mdf = !1, this.closed = e.hd === !0, this.pElem = createNS("path"), this.msElem = null;
      }
      SVGStyleData.prototype.reset = function() {
        this.d = "", this._mdf = !1;
      };
      function DashProperty(e, t, r, i) {
        this.elem = e, this.frameId = -1, this.dataProps = createSizedArray(t.length), this.renderer = r, this.k = !1, this.dashStr = "", this.dashArray = createTypedArray("float32", t.length ? t.length - 1 : 0), this.dashoffset = createTypedArray("float32", 1), this.initDynamicPropertyContainer(i);
        var n, s = t.length || 0, a;
        for (n = 0; n < s; n += 1)
          a = PropertyFactory.getProp(e, t[n].v, 0, 0, this), this.k = a.k || this.k, this.dataProps[n] = {
            n: t[n].n,
            p: a
          };
        this.k || this.getValue(!0), this._isAnimated = this.k;
      }
      DashProperty.prototype.getValue = function(e) {
        if (!(this.elem.globalData.frameId === this.frameId && !e) && (this.frameId = this.elem.globalData.frameId, this.iterateDynamicProperties(), this._mdf = this._mdf || e, this._mdf)) {
          var t = 0, r = this.dataProps.length;
          for (this.renderer === "svg" && (this.dashStr = ""), t = 0; t < r; t += 1)
            this.dataProps[t].n !== "o" ? this.renderer === "svg" ? this.dashStr += " " + this.dataProps[t].p.v : this.dashArray[t] = this.dataProps[t].p.v : this.dashoffset[0] = this.dataProps[t].p.v;
        }
      }, extendPrototype([DynamicPropertyContainer], DashProperty);
      function SVGStrokeStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this), this.w = PropertyFactory.getProp(e, t.w, 0, null, this), this.d = new DashProperty(e, t.d || {}, "svg", this), this.c = PropertyFactory.getProp(e, t.c, 1, 255, this), this.style = r, this._isAnimated = !!this._isAnimated;
      }
      extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);
      function SVGFillStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), this.getValue = this.iterateDynamicProperties, this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this), this.c = PropertyFactory.getProp(e, t.c, 1, 255, this), this.style = r;
      }
      extendPrototype([DynamicPropertyContainer], SVGFillStyleData);
      function SVGNoStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), this.getValue = this.iterateDynamicProperties, this.style = r;
      }
      extendPrototype([DynamicPropertyContainer], SVGNoStyleData);
      function GradientProperty(e, t, r) {
        this.data = t, this.c = createTypedArray("uint8c", t.p * 4);
        var i = t.k.k[0].s ? t.k.k[0].s.length - t.p * 4 : t.k.k.length - t.p * 4;
        this.o = createTypedArray("float32", i), this._cmdf = !1, this._omdf = !1, this._collapsable = this.checkCollapsable(), this._hasOpacity = i, this.initDynamicPropertyContainer(r), this.prop = PropertyFactory.getProp(e, t.k, 1, null, this), this.k = this.prop.k, this.getValue(!0);
      }
      GradientProperty.prototype.comparePoints = function(e, t) {
        for (var r = 0, i = this.o.length / 2, n; r < i; ) {
          if (n = Math.abs(e[r * 4] - e[t * 4 + r * 2]), n > 0.01)
            return !1;
          r += 1;
        }
        return !0;
      }, GradientProperty.prototype.checkCollapsable = function() {
        if (this.o.length / 2 !== this.c.length / 4)
          return !1;
        if (this.data.k.k[0].s)
          for (var e = 0, t = this.data.k.k.length; e < t; ) {
            if (!this.comparePoints(this.data.k.k[e].s, this.data.p))
              return !1;
            e += 1;
          }
        else if (!this.comparePoints(this.data.k.k, this.data.p))
          return !1;
        return !0;
      }, GradientProperty.prototype.getValue = function(e) {
        if (this.prop.getValue(), this._mdf = !1, this._cmdf = !1, this._omdf = !1, this.prop._mdf || e) {
          var t, r = this.data.p * 4, i, n;
          for (t = 0; t < r; t += 1)
            i = t % 4 === 0 ? 100 : 255, n = Math.round(this.prop.v[t] * i), this.c[t] !== n && (this.c[t] = n, this._cmdf = !e);
          if (this.o.length)
            for (r = this.prop.v.length, t = this.data.p * 4; t < r; t += 1)
              i = t % 2 === 0 ? 100 : 1, n = t % 2 === 0 ? Math.round(this.prop.v[t] * 100) : this.prop.v[t], this.o[t - this.data.p * 4] !== n && (this.o[t - this.data.p * 4] = n, this._omdf = !e);
          this._mdf = !e;
        }
      }, extendPrototype([DynamicPropertyContainer], GradientProperty);
      function SVGGradientFillStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), this.getValue = this.iterateDynamicProperties, this.initGradientData(e, t, r);
      }
      SVGGradientFillStyleData.prototype.initGradientData = function(e, t, r) {
        this.o = PropertyFactory.getProp(e, t.o, 0, 0.01, this), this.s = PropertyFactory.getProp(e, t.s, 1, null, this), this.e = PropertyFactory.getProp(e, t.e, 1, null, this), this.h = PropertyFactory.getProp(e, t.h || {
          k: 0
        }, 0, 0.01, this), this.a = PropertyFactory.getProp(e, t.a || {
          k: 0
        }, 0, degToRads, this), this.g = new GradientProperty(e, t.g, this), this.style = r, this.stops = [], this.setGradientData(r.pElem, t), this.setGradientOpacity(t, r), this._isAnimated = !!this._isAnimated;
      }, SVGGradientFillStyleData.prototype.setGradientData = function(e, t) {
        var r = createElementID(), i = createNS(t.t === 1 ? "linearGradient" : "radialGradient");
        i.setAttribute("id", r), i.setAttribute("spreadMethod", "pad"), i.setAttribute("gradientUnits", "userSpaceOnUse");
        var n = [], s, a, l;
        for (l = t.g.p * 4, a = 0; a < l; a += 4)
          s = createNS("stop"), i.appendChild(s), n.push(s);
        e.setAttribute(t.ty === "gf" ? "fill" : "stroke", "url(" + getLocationHref() + "#" + r + ")"), this.gf = i, this.cst = n;
      }, SVGGradientFillStyleData.prototype.setGradientOpacity = function(e, t) {
        if (this.g._hasOpacity && !this.g._collapsable) {
          var r, i, n, s = createNS("mask"), a = createNS("path");
          s.appendChild(a);
          var l = createElementID(), o = createElementID();
          s.setAttribute("id", o);
          var f = createNS(e.t === 1 ? "linearGradient" : "radialGradient");
          f.setAttribute("id", l), f.setAttribute("spreadMethod", "pad"), f.setAttribute("gradientUnits", "userSpaceOnUse"), n = e.g.k.k[0].s ? e.g.k.k[0].s.length : e.g.k.k.length;
          var c = this.stops;
          for (i = e.g.p * 4; i < n; i += 2)
            r = createNS("stop"), r.setAttribute("stop-color", "rgb(255,255,255)"), f.appendChild(r), c.push(r);
          a.setAttribute(e.ty === "gf" ? "fill" : "stroke", "url(" + getLocationHref() + "#" + l + ")"), e.ty === "gs" && (a.setAttribute("stroke-linecap", lineCapEnum[e.lc || 2]), a.setAttribute("stroke-linejoin", lineJoinEnum[e.lj || 2]), e.lj === 1 && a.setAttribute("stroke-miterlimit", e.ml)), this.of = f, this.ms = s, this.ost = c, this.maskId = o, t.msElem = a;
        }
      }, extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData);
      function SVGGradientStrokeStyleData(e, t, r) {
        this.initDynamicPropertyContainer(e), this.getValue = this.iterateDynamicProperties, this.w = PropertyFactory.getProp(e, t.w, 0, null, this), this.d = new DashProperty(e, t.d || {}, "svg", this), this.initGradientData(e, t, r), this._isAnimated = !!this._isAnimated;
      }
      extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
      function ShapeGroupData() {
        this.it = [], this.prevViewData = [], this.gr = createNS("g");
      }
      function SVGTransformData(e, t, r) {
        this.transform = {
          mProps: e,
          op: t,
          container: r
        }, this.elements = [], this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
      }
      var buildShapeString = function(t, r, i, n) {
        if (r === 0)
          return "";
        var s = t.o, a = t.i, l = t.v, o, f = " M" + n.applyToPointStringified(l[0][0], l[0][1]);
        for (o = 1; o < r; o += 1)
          f += " C" + n.applyToPointStringified(s[o - 1][0], s[o - 1][1]) + " " + n.applyToPointStringified(a[o][0], a[o][1]) + " " + n.applyToPointStringified(l[o][0], l[o][1]);
        return i && r && (f += " C" + n.applyToPointStringified(s[o - 1][0], s[o - 1][1]) + " " + n.applyToPointStringified(a[0][0], a[0][1]) + " " + n.applyToPointStringified(l[0][0], l[0][1]), f += "z"), f;
      }, SVGElementsRenderer = function() {
        var e = new Matrix(), t = new Matrix(), r = {
          createRenderFunction: i
        };
        function i(v) {
          switch (v.ty) {
            case "fl":
              return l;
            case "gf":
              return f;
            case "gs":
              return o;
            case "st":
              return c;
            case "sh":
            case "el":
            case "rc":
            case "sr":
              return a;
            case "tr":
              return n;
            case "no":
              return s;
            default:
              return null;
          }
        }
        function n(v, h, g) {
          (g || h.transform.op._mdf) && h.transform.container.setAttribute("opacity", h.transform.op.v), (g || h.transform.mProps._mdf) && h.transform.container.setAttribute("transform", h.transform.mProps.v.to2dCSS());
        }
        function s() {
        }
        function a(v, h, g) {
          var m, p, b, u, y, d, E = h.styles.length, S = h.lvl, C, w, M, O;
          for (d = 0; d < E; d += 1) {
            if (u = h.sh._mdf || g, h.styles[d].lvl < S) {
              for (w = t.reset(), M = S - h.styles[d].lvl, O = h.transformers.length - 1; !u && M > 0; )
                u = h.transformers[O].mProps._mdf || u, M -= 1, O -= 1;
              if (u)
                for (M = S - h.styles[d].lvl, O = h.transformers.length - 1; M > 0; )
                  w.multiply(h.transformers[O].mProps.v), M -= 1, O -= 1;
            } else
              w = e;
            if (C = h.sh.paths, p = C._length, u) {
              for (b = "", m = 0; m < p; m += 1)
                y = C.shapes[m], y && y._length && (b += buildShapeString(y, y._length, y.c, w));
              h.caches[d] = b;
            } else
              b = h.caches[d];
            h.styles[d].d += v.hd === !0 ? "" : b, h.styles[d]._mdf = u || h.styles[d]._mdf;
          }
        }
        function l(v, h, g) {
          var m = h.style;
          (h.c._mdf || g) && m.pElem.setAttribute("fill", "rgb(" + bmFloor(h.c.v[0]) + "," + bmFloor(h.c.v[1]) + "," + bmFloor(h.c.v[2]) + ")"), (h.o._mdf || g) && m.pElem.setAttribute("fill-opacity", h.o.v);
        }
        function o(v, h, g) {
          f(v, h, g), c(v, h, g);
        }
        function f(v, h, g) {
          var m = h.gf, p = h.g._hasOpacity, b = h.s.v, u = h.e.v;
          if (h.o._mdf || g) {
            var y = v.ty === "gf" ? "fill-opacity" : "stroke-opacity";
            h.style.pElem.setAttribute(y, h.o.v);
          }
          if (h.s._mdf || g) {
            var d = v.t === 1 ? "x1" : "cx", E = d === "x1" ? "y1" : "cy";
            m.setAttribute(d, b[0]), m.setAttribute(E, b[1]), p && !h.g._collapsable && (h.of.setAttribute(d, b[0]), h.of.setAttribute(E, b[1]));
          }
          var S, C, w, M;
          if (h.g._cmdf || g) {
            S = h.cst;
            var O = h.g.c;
            for (w = S.length, C = 0; C < w; C += 1)
              M = S[C], M.setAttribute("offset", O[C * 4] + "%"), M.setAttribute("stop-color", "rgb(" + O[C * 4 + 1] + "," + O[C * 4 + 2] + "," + O[C * 4 + 3] + ")");
          }
          if (p && (h.g._omdf || g)) {
            var j = h.g.o;
            for (h.g._collapsable ? S = h.cst : S = h.ost, w = S.length, C = 0; C < w; C += 1)
              M = S[C], h.g._collapsable || M.setAttribute("offset", j[C * 2] + "%"), M.setAttribute("stop-opacity", j[C * 2 + 1]);
          }
          if (v.t === 1)
            (h.e._mdf || g) && (m.setAttribute("x2", u[0]), m.setAttribute("y2", u[1]), p && !h.g._collapsable && (h.of.setAttribute("x2", u[0]), h.of.setAttribute("y2", u[1])));
          else {
            var B;
            if ((h.s._mdf || h.e._mdf || g) && (B = Math.sqrt(Math.pow(b[0] - u[0], 2) + Math.pow(b[1] - u[1], 2)), m.setAttribute("r", B), p && !h.g._collapsable && h.of.setAttribute("r", B)), h.e._mdf || h.h._mdf || h.a._mdf || g) {
              B || (B = Math.sqrt(Math.pow(b[0] - u[0], 2) + Math.pow(b[1] - u[1], 2)));
              var L = Math.atan2(u[1] - b[1], u[0] - b[0]), V = h.h.v;
              V >= 1 ? V = 0.99 : V <= -1 && (V = -0.99);
              var $ = B * V, D = Math.cos(L + h.a.v) * $ + b[0], A = Math.sin(L + h.a.v) * $ + b[1];
              m.setAttribute("fx", D), m.setAttribute("fy", A), p && !h.g._collapsable && (h.of.setAttribute("fx", D), h.of.setAttribute("fy", A));
            }
          }
        }
        function c(v, h, g) {
          var m = h.style, p = h.d;
          p && (p._mdf || g) && p.dashStr && (m.pElem.setAttribute("stroke-dasharray", p.dashStr), m.pElem.setAttribute("stroke-dashoffset", p.dashoffset[0])), h.c && (h.c._mdf || g) && m.pElem.setAttribute("stroke", "rgb(" + bmFloor(h.c.v[0]) + "," + bmFloor(h.c.v[1]) + "," + bmFloor(h.c.v[2]) + ")"), (h.o._mdf || g) && m.pElem.setAttribute("stroke-opacity", h.o.v), (h.w._mdf || g) && (m.pElem.setAttribute("stroke-width", h.w.v), m.msElem && m.msElem.setAttribute("stroke-width", h.w.v));
        }
        return r;
      }();
      function SVGShapeElement(e, t, r) {
        this.shapes = [], this.shapesData = e.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.initElement(e, t, r), this.prevViewData = [];
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement), SVGShapeElement.prototype.initSecondaryElement = function() {
      }, SVGShapeElement.prototype.identityMatrix = new Matrix(), SVGShapeElement.prototype.buildExpressionInterface = function() {
      }, SVGShapeElement.prototype.createContent = function() {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes();
      }, SVGShapeElement.prototype.filterUniqueShapes = function() {
        var e, t = this.shapes.length, r, i, n = this.stylesList.length, s, a = [], l = !1;
        for (i = 0; i < n; i += 1) {
          for (s = this.stylesList[i], l = !1, a.length = 0, e = 0; e < t; e += 1)
            r = this.shapes[e], r.styles.indexOf(s) !== -1 && (a.push(r), l = r._isAnimated || l);
          a.length > 1 && l && this.setShapesAsAnimated(a);
        }
      }, SVGShapeElement.prototype.setShapesAsAnimated = function(e) {
        var t, r = e.length;
        for (t = 0; t < r; t += 1)
          e[t].setAsAnimated();
      }, SVGShapeElement.prototype.createStyleElement = function(e, t) {
        var r, i = new SVGStyleData(e, t), n = i.pElem;
        if (e.ty === "st")
          r = new SVGStrokeStyleData(this, e, i);
        else if (e.ty === "fl")
          r = new SVGFillStyleData(this, e, i);
        else if (e.ty === "gf" || e.ty === "gs") {
          var s = e.ty === "gf" ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
          r = new s(this, e, i), this.globalData.defs.appendChild(r.gf), r.maskId && (this.globalData.defs.appendChild(r.ms), this.globalData.defs.appendChild(r.of), n.setAttribute("mask", "url(" + getLocationHref() + "#" + r.maskId + ")"));
        } else e.ty === "no" && (r = new SVGNoStyleData(this, e, i));
        return (e.ty === "st" || e.ty === "gs") && (n.setAttribute("stroke-linecap", lineCapEnum[e.lc || 2]), n.setAttribute("stroke-linejoin", lineJoinEnum[e.lj || 2]), n.setAttribute("fill-opacity", "0"), e.lj === 1 && n.setAttribute("stroke-miterlimit", e.ml)), e.r === 2 && n.setAttribute("fill-rule", "evenodd"), e.ln && n.setAttribute("id", e.ln), e.cl && n.setAttribute("class", e.cl), e.bm && (n.style["mix-blend-mode"] = getBlendMode(e.bm)), this.stylesList.push(i), this.addToAnimatedContents(e, r), r;
      }, SVGShapeElement.prototype.createGroupElement = function(e) {
        var t = new ShapeGroupData();
        return e.ln && t.gr.setAttribute("id", e.ln), e.cl && t.gr.setAttribute("class", e.cl), e.bm && (t.gr.style["mix-blend-mode"] = getBlendMode(e.bm)), t;
      }, SVGShapeElement.prototype.createTransformElement = function(e, t) {
        var r = TransformPropertyFactory.getTransformProperty(this, e, this), i = new SVGTransformData(r, r.o, t);
        return this.addToAnimatedContents(e, i), i;
      }, SVGShapeElement.prototype.createShapeElement = function(e, t, r) {
        var i = 4;
        e.ty === "rc" ? i = 5 : e.ty === "el" ? i = 6 : e.ty === "sr" && (i = 7);
        var n = ShapePropertyFactory.getShapeProp(this, e, i, this), s = new SVGShapeData(t, r, n);
        return this.shapes.push(s), this.addShapeToModifiers(s), this.addToAnimatedContents(e, s), s;
      }, SVGShapeElement.prototype.addToAnimatedContents = function(e, t) {
        for (var r = 0, i = this.animatedContents.length; r < i; ) {
          if (this.animatedContents[r].element === t)
            return;
          r += 1;
        }
        this.animatedContents.push({
          fn: SVGElementsRenderer.createRenderFunction(e),
          element: t,
          data: e
        });
      }, SVGShapeElement.prototype.setElementStyles = function(e) {
        var t = e.styles, r, i = this.stylesList.length;
        for (r = 0; r < i; r += 1)
          this.stylesList[r].closed || t.push(this.stylesList[r]);
      }, SVGShapeElement.prototype.reloadShapes = function() {
        this._isFirstFrame = !0;
        var e, t = this.itemsData.length;
        for (e = 0; e < t; e += 1)
          this.prevViewData[e] = this.itemsData[e];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0), this.filterUniqueShapes(), t = this.dynamicProperties.length, e = 0; e < t; e += 1)
          this.dynamicProperties[e].getValue();
        this.renderModifiers();
      }, SVGShapeElement.prototype.searchShapes = function(e, t, r, i, n, s, a) {
        var l = [].concat(s), o, f = e.length - 1, c, v, h = [], g = [], m, p, b;
        for (o = f; o >= 0; o -= 1) {
          if (b = this.searchProcessedElement(e[o]), b ? t[o] = r[b - 1] : e[o]._render = a, e[o].ty === "fl" || e[o].ty === "st" || e[o].ty === "gf" || e[o].ty === "gs" || e[o].ty === "no")
            b ? t[o].style.closed = !1 : t[o] = this.createStyleElement(e[o], n), e[o]._render && t[o].style.pElem.parentNode !== i && i.appendChild(t[o].style.pElem), h.push(t[o].style);
          else if (e[o].ty === "gr") {
            if (!b)
              t[o] = this.createGroupElement(e[o]);
            else
              for (v = t[o].it.length, c = 0; c < v; c += 1)
                t[o].prevViewData[c] = t[o].it[c];
            this.searchShapes(e[o].it, t[o].it, t[o].prevViewData, t[o].gr, n + 1, l, a), e[o]._render && t[o].gr.parentNode !== i && i.appendChild(t[o].gr);
          } else e[o].ty === "tr" ? (b || (t[o] = this.createTransformElement(e[o], i)), m = t[o].transform, l.push(m)) : e[o].ty === "sh" || e[o].ty === "rc" || e[o].ty === "el" || e[o].ty === "sr" ? (b || (t[o] = this.createShapeElement(e[o], l, n)), this.setElementStyles(t[o])) : e[o].ty === "tm" || e[o].ty === "rd" || e[o].ty === "ms" || e[o].ty === "pb" || e[o].ty === "zz" || e[o].ty === "op" ? (b ? (p = t[o], p.closed = !1) : (p = ShapeModifiers.getModifier(e[o].ty), p.init(this, e[o]), t[o] = p, this.shapeModifiers.push(p)), g.push(p)) : e[o].ty === "rp" && (b ? (p = t[o], p.closed = !0) : (p = ShapeModifiers.getModifier(e[o].ty), t[o] = p, p.init(this, e, o, t), this.shapeModifiers.push(p), a = !1), g.push(p));
          this.addProcessedElement(e[o], o + 1);
        }
        for (f = h.length, o = 0; o < f; o += 1)
          h[o].closed = !0;
        for (f = g.length, o = 0; o < f; o += 1)
          g[o].closed = !0;
      }, SVGShapeElement.prototype.renderInnerContent = function() {
        this.renderModifiers();
        var e, t = this.stylesList.length;
        for (e = 0; e < t; e += 1)
          this.stylesList[e].reset();
        for (this.renderShape(), e = 0; e < t; e += 1)
          (this.stylesList[e]._mdf || this._isFirstFrame) && (this.stylesList[e].msElem && (this.stylesList[e].msElem.setAttribute("d", this.stylesList[e].d), this.stylesList[e].d = "M0 0" + this.stylesList[e].d), this.stylesList[e].pElem.setAttribute("d", this.stylesList[e].d || "M0 0"));
      }, SVGShapeElement.prototype.renderShape = function() {
        var e, t = this.animatedContents.length, r;
        for (e = 0; e < t; e += 1)
          r = this.animatedContents[e], (this._isFirstFrame || r.element._isAnimated) && r.data !== !0 && r.fn(r.data, r.element, this._isFirstFrame);
      }, SVGShapeElement.prototype.destroy = function() {
        this.destroyBaseElement(), this.shapesData = null, this.itemsData = null;
      };
      function LetterProps(e, t, r, i, n, s) {
        this.o = e, this.sw = t, this.sc = r, this.fc = i, this.m = n, this.p = s, this._mdf = {
          o: !0,
          sw: !!t,
          sc: !!r,
          fc: !!i,
          m: !0,
          p: !0
        };
      }
      LetterProps.prototype.update = function(e, t, r, i, n, s) {
        this._mdf.o = !1, this._mdf.sw = !1, this._mdf.sc = !1, this._mdf.fc = !1, this._mdf.m = !1, this._mdf.p = !1;
        var a = !1;
        return this.o !== e && (this.o = e, this._mdf.o = !0, a = !0), this.sw !== t && (this.sw = t, this._mdf.sw = !0, a = !0), this.sc !== r && (this.sc = r, this._mdf.sc = !0, a = !0), this.fc !== i && (this.fc = i, this._mdf.fc = !0, a = !0), this.m !== n && (this.m = n, this._mdf.m = !0, a = !0), s.length && (this.p[0] !== s[0] || this.p[1] !== s[1] || this.p[4] !== s[4] || this.p[5] !== s[5] || this.p[12] !== s[12] || this.p[13] !== s[13]) && (this.p = s, this._mdf.p = !0, a = !0), a;
      };
      function TextProperty(e, t) {
        this._frameId = initialDefaultFrame, this.pv = "", this.v = "", this.kf = !1, this._isFirstFrame = !0, this._mdf = !1, t.d && t.d.sid && (t.d = e.globalData.slotManager.getProp(t.d)), this.data = t, this.elem = e, this.comp = this.elem.comp, this.keysIndex = 0, this.canResize = !1, this.minimumFontSize = 1, this.effectsSequence = [], this.currentData = {
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
      TextProperty.prototype.defaultBoxWidth = [0, 0], TextProperty.prototype.copyData = function(e, t) {
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        return e;
      }, TextProperty.prototype.setCurrentData = function(e) {
        e.__complete || this.completeTextData(e), this.currentData = e, this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth, this._mdf = !0;
      }, TextProperty.prototype.searchProperty = function() {
        return this.searchKeyframes();
      }, TextProperty.prototype.searchKeyframes = function() {
        return this.kf = this.data.d.k.length > 1, this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf;
      }, TextProperty.prototype.addEffect = function(e) {
        this.effectsSequence.push(e), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.getValue = function(e) {
        if (!((this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) && !e)) {
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var t = this.currentData, r = this.keysIndex;
          if (this.lock) {
            this.setCurrentData(this.currentData);
            return;
          }
          this.lock = !0, this._mdf = !1;
          var i, n = this.effectsSequence.length, s = e || this.data.d.k[this.keysIndex].s;
          for (i = 0; i < n; i += 1)
            r !== this.keysIndex ? s = this.effectsSequence[i](s, s.t) : s = this.effectsSequence[i](this.currentData, s.t);
          t !== s && this.setCurrentData(s), this.v = this.currentData, this.pv = this.v, this.lock = !1, this.frameId = this.elem.globalData.frameId;
        }
      }, TextProperty.prototype.getKeyframeValue = function() {
        for (var e = this.data.d.k, t = this.elem.comp.renderedFrame, r = 0, i = e.length; r <= i - 1 && !(r === i - 1 || e[r + 1].t > t); )
          r += 1;
        return this.keysIndex !== r && (this.keysIndex = r), this.data.d.k[this.keysIndex].s;
      }, TextProperty.prototype.buildFinalText = function(e) {
        for (var t = [], r = 0, i = e.length, n, s, a = !1, l = !1, o = ""; r < i; )
          a = l, l = !1, n = e.charCodeAt(r), o = e.charAt(r), FontManager.isCombinedCharacter(n) ? a = !0 : n >= 55296 && n <= 56319 ? FontManager.isRegionalFlag(e, r) ? o = e.substr(r, 14) : (s = e.charCodeAt(r + 1), s >= 56320 && s <= 57343 && (FontManager.isModifier(n, s) ? (o = e.substr(r, 2), a = !0) : FontManager.isFlagEmoji(e.substr(r, 4)) ? o = e.substr(r, 4) : o = e.substr(r, 2))) : n > 56319 ? (s = e.charCodeAt(r + 1), FontManager.isVariationSelector(n) && (a = !0)) : FontManager.isZeroWidthJoiner(n) && (a = !0, l = !0), a ? (t[t.length - 1] += o, a = !1) : t.push(o), r += o.length;
        return t;
      }, TextProperty.prototype.completeTextData = function(e) {
        e.__complete = !0;
        var t = this.elem.globalData.fontManager, r = this.data, i = [], n, s, a, l = 0, o, f = r.m.g, c = 0, v = 0, h = 0, g = [], m = 0, p = 0, b, u, y = t.getFontByName(e.f), d, E = 0, S = getFontProperties(y);
        e.fWeight = S.weight, e.fStyle = S.style, e.finalSize = e.s, e.finalText = this.buildFinalText(e.t), s = e.finalText.length, e.finalLineHeight = e.lh;
        var C = e.tr / 1e3 * e.finalSize, w;
        if (e.sz)
          for (var M = !0, O = e.sz[0], j = e.sz[1], B, L; M; ) {
            L = this.buildFinalText(e.t), B = 0, m = 0, s = L.length, C = e.tr / 1e3 * e.finalSize;
            var V = -1;
            for (n = 0; n < s; n += 1)
              w = L[n].charCodeAt(0), a = !1, L[n] === " " ? V = n : (w === 13 || w === 3) && (m = 0, a = !0, B += e.finalLineHeight || e.finalSize * 1.2), t.chars ? (d = t.getCharData(L[n], y.fStyle, y.fFamily), E = a ? 0 : d.w * e.finalSize / 100) : E = t.measureText(L[n], e.f, e.finalSize), m + E > O && L[n] !== " " ? (V === -1 ? s += 1 : n = V, B += e.finalLineHeight || e.finalSize * 1.2, L.splice(n, V === n ? 1 : 0, "\r"), V = -1, m = 0) : (m += E, m += C);
            B += y.ascent * e.finalSize / 100, this.canResize && e.finalSize > this.minimumFontSize && j < B ? (e.finalSize -= 1, e.finalLineHeight = e.finalSize * e.lh / e.s) : (e.finalText = L, s = e.finalText.length, M = !1);
          }
        m = -C, E = 0;
        var $ = 0, D;
        for (n = 0; n < s; n += 1)
          if (a = !1, D = e.finalText[n], w = D.charCodeAt(0), w === 13 || w === 3 ? ($ = 0, g.push(m), p = m > p ? m : p, m = -2 * C, o = "", a = !0, h += 1) : o = D, t.chars ? (d = t.getCharData(D, y.fStyle, t.getFontByName(e.f).fFamily), E = a ? 0 : d.w * e.finalSize / 100) : E = t.measureText(o, e.f, e.finalSize), D === " " ? $ += E + C : (m += E + C + $, $ = 0), i.push({
            l: E,
            an: E,
            add: c,
            n: a,
            anIndexes: [],
            val: o,
            line: h,
            animatorJustifyOffset: 0
          }), f == 2) {
            if (c += E, o === "" || o === " " || n === s - 1) {
              for ((o === "" || o === " ") && (c -= E); v <= n; )
                i[v].an = c, i[v].ind = l, i[v].extra = E, v += 1;
              l += 1, c = 0;
            }
          } else if (f == 3) {
            if (c += E, o === "" || n === s - 1) {
              for (o === "" && (c -= E); v <= n; )
                i[v].an = c, i[v].ind = l, i[v].extra = E, v += 1;
              c = 0, l += 1;
            }
          } else
            i[l].ind = l, i[l].extra = 0, l += 1;
        if (e.l = i, p = m > p ? m : p, g.push(m), e.sz)
          e.boxWidth = e.sz[0], e.justifyOffset = 0;
        else
          switch (e.boxWidth = p, e.j) {
            case 1:
              e.justifyOffset = -e.boxWidth;
              break;
            case 2:
              e.justifyOffset = -e.boxWidth / 2;
              break;
            default:
              e.justifyOffset = 0;
          }
        e.lineWidths = g;
        var A = r.a, k, x;
        u = A.length;
        var P, T, R = [];
        for (b = 0; b < u; b += 1) {
          for (k = A[b], k.a.sc && (e.strokeColorAnim = !0), k.a.sw && (e.strokeWidthAnim = !0), (k.a.fc || k.a.fh || k.a.fs || k.a.fb) && (e.fillColorAnim = !0), T = 0, P = k.s.b, n = 0; n < s; n += 1)
            x = i[n], x.anIndexes[b] = T, (P == 1 && x.val !== "" || P == 2 && x.val !== "" && x.val !== " " || P == 3 && (x.n || x.val == " " || n == s - 1) || P == 4 && (x.n || n == s - 1)) && (k.s.rn === 1 && R.push(T), T += 1);
          r.a[b].s.totalChars = T;
          var N = -1, H;
          if (k.s.rn === 1)
            for (n = 0; n < s; n += 1)
              x = i[n], N != x.anIndexes[b] && (N = x.anIndexes[b], H = R.splice(Math.floor(Math.random() * R.length), 1)[0]), x.anIndexes[b] = H;
        }
        e.yOffset = e.finalLineHeight || e.finalSize * 1.2, e.ls = e.ls || 0, e.ascent = y.ascent * e.finalSize / 100;
      }, TextProperty.prototype.updateDocumentData = function(e, t) {
        t = t === void 0 ? this.keysIndex : t;
        var r = this.copyData({}, this.data.d.k[t].s);
        r = this.copyData(r, e), this.data.d.k[t].s = r, this.recalculate(t), this.setCurrentData(r), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.recalculate = function(e) {
        var t = this.data.d.k[e].s;
        t.__complete = !1, this.keysIndex = 0, this._isFirstFrame = !0, this.getValue(t);
      }, TextProperty.prototype.canResizeFont = function(e) {
        this.canResize = e, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      }, TextProperty.prototype.setMinimumFontSize = function(e) {
        this.minimumFontSize = Math.floor(e) || 1, this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
      };
      var TextSelectorProp = function() {
        var e = Math.max, t = Math.min, r = Math.floor;
        function i(s, a) {
          this._currentTextLength = -1, this.k = !1, this.data = a, this.elem = s, this.comp = s.comp, this.finalS = 0, this.finalE = 0, this.initDynamicPropertyContainer(s), this.s = PropertyFactory.getProp(s, a.s || {
            k: 0
          }, 0, 0, this), "e" in a ? this.e = PropertyFactory.getProp(s, a.e, 0, 0, this) : this.e = {
            v: 100
          }, this.o = PropertyFactory.getProp(s, a.o || {
            k: 0
          }, 0, 0, this), this.xe = PropertyFactory.getProp(s, a.xe || {
            k: 0
          }, 0, 0, this), this.ne = PropertyFactory.getProp(s, a.ne || {
            k: 0
          }, 0, 0, this), this.sm = PropertyFactory.getProp(s, a.sm || {
            k: 100
          }, 0, 0, this), this.a = PropertyFactory.getProp(s, a.a, 0, 0.01, this), this.dynamicProperties.length || this.getValue();
        }
        i.prototype = {
          getMult: function(a) {
            this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
            var l = 0, o = 0, f = 1, c = 1;
            this.ne.v > 0 ? l = this.ne.v / 100 : o = -this.ne.v / 100, this.xe.v > 0 ? f = 1 - this.xe.v / 100 : c = 1 + this.xe.v / 100;
            var v = BezierFactory.getBezierEasing(l, o, f, c).get, h = 0, g = this.finalS, m = this.finalE, p = this.data.sh;
            if (p === 2)
              m === g ? h = a >= m ? 1 : 0 : h = e(0, t(0.5 / (m - g) + (a - g) / (m - g), 1)), h = v(h);
            else if (p === 3)
              m === g ? h = a >= m ? 0 : 1 : h = 1 - e(0, t(0.5 / (m - g) + (a - g) / (m - g), 1)), h = v(h);
            else if (p === 4)
              m === g ? h = 0 : (h = e(0, t(0.5 / (m - g) + (a - g) / (m - g), 1)), h < 0.5 ? h *= 2 : h = 1 - 2 * (h - 0.5)), h = v(h);
            else if (p === 5) {
              if (m === g)
                h = 0;
              else {
                var b = m - g;
                a = t(e(0, a + 0.5 - g), m - g);
                var u = -b / 2 + a, y = b / 2;
                h = Math.sqrt(1 - u * u / (y * y));
              }
              h = v(h);
            } else p === 6 ? (m === g ? h = 0 : (a = t(e(0, a + 0.5 - g), m - g), h = (1 + Math.cos(Math.PI + Math.PI * 2 * a / (m - g))) / 2), h = v(h)) : (a >= r(g) && (a - g < 0 ? h = e(0, t(t(m, 1) - (g - a), 1)) : h = e(0, t(m - a, 1))), h = v(h));
            if (this.sm.v !== 100) {
              var d = this.sm.v * 0.01;
              d === 0 && (d = 1e-8);
              var E = 0.5 - d * 0.5;
              h < E ? h = 0 : (h = (h - E) / d, h > 1 && (h = 1));
            }
            return h * this.a.v;
          },
          getValue: function(a) {
            this.iterateDynamicProperties(), this._mdf = a || this._mdf, this._currentTextLength = this.elem.textProperty.currentData.l.length || 0, a && this.data.r === 2 && (this.e.v = this._currentTextLength);
            var l = this.data.r === 2 ? 1 : 100 / this.data.totalChars, o = this.o.v / l, f = this.s.v / l + o, c = this.e.v / l + o;
            if (f > c) {
              var v = f;
              f = c, c = v;
            }
            this.finalS = f, this.finalE = c;
          }
        }, extendPrototype([DynamicPropertyContainer], i);
        function n(s, a, l) {
          return new i(s, a);
        }
        return {
          getTextSelectorProp: n
        };
      }();
      function TextAnimatorDataProperty(e, t, r) {
        var i = {
          propType: !1
        }, n = PropertyFactory.getProp, s = t.a;
        this.a = {
          r: s.r ? n(e, s.r, 0, degToRads, r) : i,
          rx: s.rx ? n(e, s.rx, 0, degToRads, r) : i,
          ry: s.ry ? n(e, s.ry, 0, degToRads, r) : i,
          sk: s.sk ? n(e, s.sk, 0, degToRads, r) : i,
          sa: s.sa ? n(e, s.sa, 0, degToRads, r) : i,
          s: s.s ? n(e, s.s, 1, 0.01, r) : i,
          a: s.a ? n(e, s.a, 1, 0, r) : i,
          o: s.o ? n(e, s.o, 0, 0.01, r) : i,
          p: s.p ? n(e, s.p, 1, 0, r) : i,
          sw: s.sw ? n(e, s.sw, 0, 0, r) : i,
          sc: s.sc ? n(e, s.sc, 1, 0, r) : i,
          fc: s.fc ? n(e, s.fc, 1, 0, r) : i,
          fh: s.fh ? n(e, s.fh, 0, 0, r) : i,
          fs: s.fs ? n(e, s.fs, 0, 0.01, r) : i,
          fb: s.fb ? n(e, s.fb, 0, 0.01, r) : i,
          t: s.t ? n(e, s.t, 0, 0, r) : i
        }, this.s = TextSelectorProp.getTextSelectorProp(e, t.s, r), this.s.t = t.s.t;
      }
      function TextAnimatorProperty(e, t, r) {
        this._isFirstFrame = !0, this._hasMaskedPath = !1, this._frameId = -1, this._textData = e, this._renderType = t, this._elem = r, this._animatorsData = createSizedArray(this._textData.a.length), this._pathData = {}, this._moreOptions = {
          alignment: {}
        }, this.renderedLetters = [], this.lettersChangedFlag = !1, this.initDynamicPropertyContainer(r);
      }
      TextAnimatorProperty.prototype.searchProperties = function() {
        var e, t = this._textData.a.length, r, i = PropertyFactory.getProp;
        for (e = 0; e < t; e += 1)
          r = this._textData.a[e], this._animatorsData[e] = new TextAnimatorDataProperty(this._elem, r, this);
        this._textData.p && "m" in this._textData.p ? (this._pathData = {
          a: i(this._elem, this._textData.p.a, 0, 0, this),
          f: i(this._elem, this._textData.p.f, 0, 0, this),
          l: i(this._elem, this._textData.p.l, 0, 0, this),
          r: i(this._elem, this._textData.p.r, 0, 0, this),
          p: i(this._elem, this._textData.p.p, 0, 0, this),
          m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
        }, this._hasMaskedPath = !0) : this._hasMaskedPath = !1, this._moreOptions.alignment = i(this._elem, this._textData.m.a, 1, 0, this);
      }, TextAnimatorProperty.prototype.getMeasures = function(e, t) {
        if (this.lettersChangedFlag = t, !(!this._mdf && !this._isFirstFrame && !t && (!this._hasMaskedPath || !this._pathData.m._mdf))) {
          this._isFirstFrame = !1;
          var r = this._moreOptions.alignment.v, i = this._animatorsData, n = this._textData, s = this.mHelper, a = this._renderType, l = this.renderedLetters.length, o, f, c, v, h = e.l, g, m, p, b, u, y, d, E, S, C, w, M, O, j, B;
          if (this._hasMaskedPath) {
            if (B = this._pathData.m, !this._pathData.n || this._pathData._mdf) {
              var L = B.v;
              this._pathData.r.v && (L = L.reverse()), g = {
                tLength: 0,
                segments: []
              }, v = L._length - 1;
              var V;
              for (M = 0, c = 0; c < v; c += 1)
                V = bez.buildBezierData(L.v[c], L.v[c + 1], [L.o[c][0] - L.v[c][0], L.o[c][1] - L.v[c][1]], [L.i[c + 1][0] - L.v[c + 1][0], L.i[c + 1][1] - L.v[c + 1][1]]), g.tLength += V.segmentLength, g.segments.push(V), M += V.segmentLength;
              c = v, B.v.c && (V = bez.buildBezierData(L.v[c], L.v[0], [L.o[c][0] - L.v[c][0], L.o[c][1] - L.v[c][1]], [L.i[0][0] - L.v[0][0], L.i[0][1] - L.v[0][1]]), g.tLength += V.segmentLength, g.segments.push(V), M += V.segmentLength), this._pathData.pi = g;
            }
            if (g = this._pathData.pi, m = this._pathData.f.v, d = 0, y = 1, b = 0, u = !0, C = g.segments, m < 0 && B.v.c)
              for (g.tLength < Math.abs(m) && (m = -Math.abs(m) % g.tLength), d = C.length - 1, S = C[d].points, y = S.length - 1; m < 0; )
                m += S[y].partialLength, y -= 1, y < 0 && (d -= 1, S = C[d].points, y = S.length - 1);
            S = C[d].points, E = S[y - 1], p = S[y], w = p.partialLength;
          }
          v = h.length, o = 0, f = 0;
          var $ = e.finalSize * 1.2 * 0.714, D = !0, A, k, x, P, T;
          P = i.length;
          var R, N = -1, H, z, J, q = m, se = d, ie = y, ce = -1, ue, fe, pe, ae, K, ye, Ee, ge, xe = "", be = this.defaultPropsArray, de;
          if (e.j === 2 || e.j === 1) {
            var F = 0, U = 0, Y = e.j === 2 ? -0.5 : -1, ee = 0, oe = !0;
            for (c = 0; c < v; c += 1)
              if (h[c].n) {
                for (F && (F += U); ee < c; )
                  h[ee].animatorJustifyOffset = F, ee += 1;
                F = 0, oe = !0;
              } else {
                for (x = 0; x < P; x += 1)
                  A = i[x].a, A.t.propType && (oe && e.j === 2 && (U += A.t.v * Y), k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), R.length ? F += A.t.v * R[0] * Y : F += A.t.v * R * Y);
                oe = !1;
              }
            for (F && (F += U); ee < c; )
              h[ee].animatorJustifyOffset = F, ee += 1;
          }
          for (c = 0; c < v; c += 1) {
            if (s.reset(), ue = 1, h[c].n)
              o = 0, f += e.yOffset, f += D ? 1 : 0, m = q, D = !1, this._hasMaskedPath && (d = se, y = ie, S = C[d].points, E = S[y - 1], p = S[y], w = p.partialLength, b = 0), xe = "", ge = "", ye = "", de = "", be = this.defaultPropsArray;
            else {
              if (this._hasMaskedPath) {
                if (ce !== h[c].line) {
                  switch (e.j) {
                    case 1:
                      m += M - e.lineWidths[h[c].line];
                      break;
                    case 2:
                      m += (M - e.lineWidths[h[c].line]) / 2;
                      break;
                  }
                  ce = h[c].line;
                }
                N !== h[c].ind && (h[N] && (m += h[N].extra), m += h[c].an / 2, N = h[c].ind), m += r[0] * h[c].an * 5e-3;
                var ne = 0;
                for (x = 0; x < P; x += 1)
                  A = i[x].a, A.p.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), R.length ? ne += A.p.v[0] * R[0] : ne += A.p.v[0] * R), A.a.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), R.length ? ne += A.a.v[0] * R[0] : ne += A.a.v[0] * R);
                for (u = !0, this._pathData.a.v && (m = h[0].an * 0.5 + (M - this._pathData.f.v - h[0].an * 0.5 - h[h.length - 1].an * 0.5) * N / (v - 1), m += this._pathData.f.v); u; )
                  b + w >= m + ne || !S ? (O = (m + ne - b) / p.partialLength, z = E.point[0] + (p.point[0] - E.point[0]) * O, J = E.point[1] + (p.point[1] - E.point[1]) * O, s.translate(-r[0] * h[c].an * 5e-3, -(r[1] * $) * 0.01), u = !1) : S && (b += p.partialLength, y += 1, y >= S.length && (y = 0, d += 1, C[d] ? S = C[d].points : B.v.c ? (y = 0, d = 0, S = C[d].points) : (b -= p.partialLength, S = null)), S && (E = p, p = S[y], w = p.partialLength));
                H = h[c].an / 2 - h[c].add, s.translate(-H, 0, 0);
              } else
                H = h[c].an / 2 - h[c].add, s.translate(-H, 0, 0), s.translate(-r[0] * h[c].an * 5e-3, -r[1] * $ * 0.01, 0);
              for (x = 0; x < P; x += 1)
                A = i[x].a, A.t.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), (o !== 0 || e.j !== 0) && (this._hasMaskedPath ? R.length ? m += A.t.v * R[0] : m += A.t.v * R : R.length ? o += A.t.v * R[0] : o += A.t.v * R));
              for (e.strokeWidthAnim && (pe = e.sw || 0), e.strokeColorAnim && (e.sc ? fe = [e.sc[0], e.sc[1], e.sc[2]] : fe = [0, 0, 0]), e.fillColorAnim && e.fc && (ae = [e.fc[0], e.fc[1], e.fc[2]]), x = 0; x < P; x += 1)
                A = i[x].a, A.a.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), R.length ? s.translate(-A.a.v[0] * R[0], -A.a.v[1] * R[1], A.a.v[2] * R[2]) : s.translate(-A.a.v[0] * R, -A.a.v[1] * R, A.a.v[2] * R));
              for (x = 0; x < P; x += 1)
                A = i[x].a, A.s.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), R.length ? s.scale(1 + (A.s.v[0] - 1) * R[0], 1 + (A.s.v[1] - 1) * R[1], 1) : s.scale(1 + (A.s.v[0] - 1) * R, 1 + (A.s.v[1] - 1) * R, 1));
              for (x = 0; x < P; x += 1) {
                if (A = i[x].a, k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), A.sk.propType && (R.length ? s.skewFromAxis(-A.sk.v * R[0], A.sa.v * R[1]) : s.skewFromAxis(-A.sk.v * R, A.sa.v * R)), A.r.propType && (R.length ? s.rotateZ(-A.r.v * R[2]) : s.rotateZ(-A.r.v * R)), A.ry.propType && (R.length ? s.rotateY(A.ry.v * R[1]) : s.rotateY(A.ry.v * R)), A.rx.propType && (R.length ? s.rotateX(A.rx.v * R[0]) : s.rotateX(A.rx.v * R)), A.o.propType && (R.length ? ue += (A.o.v * R[0] - ue) * R[0] : ue += (A.o.v * R - ue) * R), e.strokeWidthAnim && A.sw.propType && (R.length ? pe += A.sw.v * R[0] : pe += A.sw.v * R), e.strokeColorAnim && A.sc.propType)
                  for (K = 0; K < 3; K += 1)
                    R.length ? fe[K] += (A.sc.v[K] - fe[K]) * R[0] : fe[K] += (A.sc.v[K] - fe[K]) * R;
                if (e.fillColorAnim && e.fc) {
                  if (A.fc.propType)
                    for (K = 0; K < 3; K += 1)
                      R.length ? ae[K] += (A.fc.v[K] - ae[K]) * R[0] : ae[K] += (A.fc.v[K] - ae[K]) * R;
                  A.fh.propType && (R.length ? ae = addHueToRGB(ae, A.fh.v * R[0]) : ae = addHueToRGB(ae, A.fh.v * R)), A.fs.propType && (R.length ? ae = addSaturationToRGB(ae, A.fs.v * R[0]) : ae = addSaturationToRGB(ae, A.fs.v * R)), A.fb.propType && (R.length ? ae = addBrightnessToRGB(ae, A.fb.v * R[0]) : ae = addBrightnessToRGB(ae, A.fb.v * R));
                }
              }
              for (x = 0; x < P; x += 1)
                A = i[x].a, A.p.propType && (k = i[x].s, R = k.getMult(h[c].anIndexes[x], n.a[x].s.totalChars), this._hasMaskedPath ? R.length ? s.translate(0, A.p.v[1] * R[0], -A.p.v[2] * R[1]) : s.translate(0, A.p.v[1] * R, -A.p.v[2] * R) : R.length ? s.translate(A.p.v[0] * R[0], A.p.v[1] * R[1], -A.p.v[2] * R[2]) : s.translate(A.p.v[0] * R, A.p.v[1] * R, -A.p.v[2] * R));
              if (e.strokeWidthAnim && (ye = pe < 0 ? 0 : pe), e.strokeColorAnim && (Ee = "rgb(" + Math.round(fe[0] * 255) + "," + Math.round(fe[1] * 255) + "," + Math.round(fe[2] * 255) + ")"), e.fillColorAnim && e.fc && (ge = "rgb(" + Math.round(ae[0] * 255) + "," + Math.round(ae[1] * 255) + "," + Math.round(ae[2] * 255) + ")"), this._hasMaskedPath) {
                if (s.translate(0, -e.ls), s.translate(0, r[1] * $ * 0.01 + f, 0), this._pathData.p.v) {
                  j = (p.point[1] - E.point[1]) / (p.point[0] - E.point[0]);
                  var re = Math.atan(j) * 180 / Math.PI;
                  p.point[0] < E.point[0] && (re += 180), s.rotate(-re * Math.PI / 180);
                }
                s.translate(z, J, 0), m -= r[0] * h[c].an * 5e-3, h[c + 1] && N !== h[c + 1].ind && (m += h[c].an / 2, m += e.tr * 1e-3 * e.finalSize);
              } else {
                switch (s.translate(o, f, 0), e.ps && s.translate(e.ps[0], e.ps[1] + e.ascent, 0), e.j) {
                  case 1:
                    s.translate(h[c].animatorJustifyOffset + e.justifyOffset + (e.boxWidth - e.lineWidths[h[c].line]), 0, 0);
                    break;
                  case 2:
                    s.translate(h[c].animatorJustifyOffset + e.justifyOffset + (e.boxWidth - e.lineWidths[h[c].line]) / 2, 0, 0);
                    break;
                }
                s.translate(0, -e.ls), s.translate(H, 0, 0), s.translate(r[0] * h[c].an * 5e-3, r[1] * $ * 0.01, 0), o += h[c].l + e.tr * 1e-3 * e.finalSize;
              }
              a === "html" ? xe = s.toCSS() : a === "svg" ? xe = s.to2dCSS() : be = [s.props[0], s.props[1], s.props[2], s.props[3], s.props[4], s.props[5], s.props[6], s.props[7], s.props[8], s.props[9], s.props[10], s.props[11], s.props[12], s.props[13], s.props[14], s.props[15]], de = ue;
            }
            l <= c ? (T = new LetterProps(de, ye, Ee, ge, xe, be), this.renderedLetters.push(T), l += 1, this.lettersChangedFlag = !0) : (T = this.renderedLetters[c], this.lettersChangedFlag = T.update(de, ye, Ee, ge, xe, be) || this.lettersChangedFlag);
          }
        }
      }, TextAnimatorProperty.prototype.getValue = function() {
        this._elem.globalData.frameId !== this._frameId && (this._frameId = this._elem.globalData.frameId, this.iterateDynamicProperties());
      }, TextAnimatorProperty.prototype.mHelper = new Matrix(), TextAnimatorProperty.prototype.defaultPropsArray = [], extendPrototype([DynamicPropertyContainer], TextAnimatorProperty);
      function ITextElement() {
      }
      ITextElement.prototype.initElement = function(e, t, r) {
        this.lettersChangedFlag = !0, this.initFrame(), this.initBaseData(e, t, r), this.textProperty = new TextProperty(this, e.t, this.dynamicProperties), this.textAnimator = new TextAnimatorProperty(e.t, this.renderType, this), this.initTransform(e, t, r), this.initHierarchy(), this.initRenderable(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), this.createContent(), this.hide(), this.textAnimator.searchProperties(this.dynamicProperties);
      }, ITextElement.prototype.prepareFrame = function(e) {
        this._mdf = !1, this.prepareRenderableFrame(e), this.prepareProperties(e, this.isInRange);
      }, ITextElement.prototype.createPathShape = function(e, t) {
        var r, i = t.length, n, s = "";
        for (r = 0; r < i; r += 1)
          t[r].ty === "sh" && (n = t[r].ks.k, s += buildShapeString(n, n.i.length, !0, e));
        return s;
      }, ITextElement.prototype.updateDocumentData = function(e, t) {
        this.textProperty.updateDocumentData(e, t);
      }, ITextElement.prototype.canResizeFont = function(e) {
        this.textProperty.canResizeFont(e);
      }, ITextElement.prototype.setMinimumFontSize = function(e) {
        this.textProperty.setMinimumFontSize(e);
      }, ITextElement.prototype.applyTextPropertiesToMatrix = function(e, t, r, i, n) {
        switch (e.ps && t.translate(e.ps[0], e.ps[1] + e.ascent, 0), t.translate(0, -e.ls, 0), e.j) {
          case 1:
            t.translate(e.justifyOffset + (e.boxWidth - e.lineWidths[r]), 0, 0);
            break;
          case 2:
            t.translate(e.justifyOffset + (e.boxWidth - e.lineWidths[r]) / 2, 0, 0);
            break;
        }
        t.translate(i, n, 0);
      }, ITextElement.prototype.buildColor = function(e) {
        return "rgb(" + Math.round(e[0] * 255) + "," + Math.round(e[1] * 255) + "," + Math.round(e[2] * 255) + ")";
      }, ITextElement.prototype.emptyProp = new LetterProps(), ITextElement.prototype.destroy = function() {
      }, ITextElement.prototype.validateText = function() {
        (this.textProperty._mdf || this.textProperty._isFirstFrame) && (this.buildNewText(), this.textProperty._isFirstFrame = !1, this.textProperty._mdf = !1);
      };
      var emptyShapeData = {
        shapes: []
      };
      function SVGTextLottieElement(e, t, r) {
        this.textSpans = [], this.renderType = "svg", this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement), SVGTextLottieElement.prototype.createContent = function() {
        this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS("text"));
      }, SVGTextLottieElement.prototype.buildTextContents = function(e) {
        for (var t = 0, r = e.length, i = [], n = ""; t < r; )
          e[t] === "\r" || e[t] === "" ? (i.push(n), n = "") : n += e[t], t += 1;
        return i.push(n), i;
      }, SVGTextLottieElement.prototype.buildShapeData = function(e, t) {
        if (e.shapes && e.shapes.length) {
          var r = e.shapes[0];
          if (r.it) {
            var i = r.it[r.it.length - 1];
            i.s && (i.s.k[0] = t, i.s.k[1] = t);
          }
        }
        return e;
      }, SVGTextLottieElement.prototype.buildNewText = function() {
        this.addDynamicProperty(this);
        var e, t, r = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(r ? r.l.length : 0), r.fc ? this.layerElement.setAttribute("fill", this.buildColor(r.fc)) : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), r.sc && (this.layerElement.setAttribute("stroke", this.buildColor(r.sc)), this.layerElement.setAttribute("stroke-width", r.sw)), this.layerElement.setAttribute("font-size", r.finalSize);
        var i = this.globalData.fontManager.getFontByName(r.f);
        if (i.fClass)
          this.layerElement.setAttribute("class", i.fClass);
        else {
          this.layerElement.setAttribute("font-family", i.fFamily);
          var n = r.fWeight, s = r.fStyle;
          this.layerElement.setAttribute("font-style", s), this.layerElement.setAttribute("font-weight", n);
        }
        this.layerElement.setAttribute("aria-label", r.t);
        var a = r.l || [], l = !!this.globalData.fontManager.chars;
        t = a.length;
        var o, f = this.mHelper, c = "", v = this.data.singleShape, h = 0, g = 0, m = !0, p = r.tr * 1e-3 * r.finalSize;
        if (v && !l && !r.sz) {
          var b = this.textContainer, u = "start";
          switch (r.j) {
            case 1:
              u = "end";
              break;
            case 2:
              u = "middle";
              break;
            default:
              u = "start";
              break;
          }
          b.setAttribute("text-anchor", u), b.setAttribute("letter-spacing", p);
          var y = this.buildTextContents(r.finalText);
          for (t = y.length, g = r.ps ? r.ps[1] + r.ascent : 0, e = 0; e < t; e += 1)
            o = this.textSpans[e].span || createNS("tspan"), o.textContent = y[e], o.setAttribute("x", 0), o.setAttribute("y", g), o.style.display = "inherit", b.appendChild(o), this.textSpans[e] || (this.textSpans[e] = {
              span: null,
              glyph: null
            }), this.textSpans[e].span = o, g += r.finalLineHeight;
          this.layerElement.appendChild(b);
        } else {
          var d = this.textSpans.length, E;
          for (e = 0; e < t; e += 1) {
            if (this.textSpans[e] || (this.textSpans[e] = {
              span: null,
              childSpan: null,
              glyph: null
            }), !l || !v || e === 0) {
              if (o = d > e ? this.textSpans[e].span : createNS(l ? "g" : "text"), d <= e) {
                if (o.setAttribute("stroke-linecap", "butt"), o.setAttribute("stroke-linejoin", "round"), o.setAttribute("stroke-miterlimit", "4"), this.textSpans[e].span = o, l) {
                  var S = createNS("g");
                  o.appendChild(S), this.textSpans[e].childSpan = S;
                }
                this.textSpans[e].span = o, this.layerElement.appendChild(o);
              }
              o.style.display = "inherit";
            }
            if (f.reset(), v && (a[e].n && (h = -p, g += r.yOffset, g += m ? 1 : 0, m = !1), this.applyTextPropertiesToMatrix(r, f, a[e].line, h, g), h += a[e].l || 0, h += p), l) {
              E = this.globalData.fontManager.getCharData(r.finalText[e], i.fStyle, this.globalData.fontManager.getFontByName(r.f).fFamily);
              var C;
              if (E.t === 1)
                C = new SVGCompElement(E.data, this.globalData, this);
              else {
                var w = emptyShapeData;
                E.data && E.data.shapes && (w = this.buildShapeData(E.data, r.finalSize)), C = new SVGShapeElement(w, this.globalData, this);
              }
              if (this.textSpans[e].glyph) {
                var M = this.textSpans[e].glyph;
                this.textSpans[e].childSpan.removeChild(M.layerElement), M.destroy();
              }
              this.textSpans[e].glyph = C, C._debug = !0, C.prepareFrame(0), C.renderFrame(), this.textSpans[e].childSpan.appendChild(C.layerElement), E.t === 1 && this.textSpans[e].childSpan.setAttribute("transform", "scale(" + r.finalSize / 100 + "," + r.finalSize / 100 + ")");
            } else
              v && o.setAttribute("transform", "translate(" + f.props[12] + "," + f.props[13] + ")"), o.textContent = a[e].val, o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
          }
          v && o && o.setAttribute("d", c);
        }
        for (; e < this.textSpans.length; )
          this.textSpans[e].span.style.display = "none", e += 1;
        this._sizeChanged = !0;
      }, SVGTextLottieElement.prototype.sourceRectAtTime = function() {
        if (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged) {
          this._sizeChanged = !1;
          var e = this.layerElement.getBBox();
          this.bbox = {
            top: e.y,
            left: e.x,
            width: e.width,
            height: e.height
          };
        }
        return this.bbox;
      }, SVGTextLottieElement.prototype.getValue = function() {
        var e, t = this.textSpans.length, r;
        for (this.renderedFrame = this.comp.renderedFrame, e = 0; e < t; e += 1)
          r = this.textSpans[e].glyph, r && (r.prepareFrame(this.comp.renderedFrame - this.data.st), r._mdf && (this._mdf = !0));
      }, SVGTextLottieElement.prototype.renderInnerContent = function() {
        if (this.validateText(), (!this.data.singleShape || this._mdf) && (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)) {
          this._sizeChanged = !0;
          var e, t, r = this.textAnimator.renderedLetters, i = this.textProperty.currentData.l;
          t = i.length;
          var n, s, a;
          for (e = 0; e < t; e += 1)
            i[e].n || (n = r[e], s = this.textSpans[e].span, a = this.textSpans[e].glyph, a && a.renderFrame(), n._mdf.m && s.setAttribute("transform", n.m), n._mdf.o && s.setAttribute("opacity", n.o), n._mdf.sw && s.setAttribute("stroke-width", n.sw), n._mdf.sc && s.setAttribute("stroke", n.sc), n._mdf.fc && s.setAttribute("fill", n.fc));
        }
      };
      function ISolidElement(e, t, r) {
        this.initElement(e, t, r);
      }
      extendPrototype([IImageElement], ISolidElement), ISolidElement.prototype.createContent = function() {
        var e = createNS("rect");
        e.setAttribute("width", this.data.sw), e.setAttribute("height", this.data.sh), e.setAttribute("fill", this.data.sc), this.layerElement.appendChild(e);
      };
      function NullElement(e, t, r) {
        this.initFrame(), this.initBaseData(e, t, r), this.initFrame(), this.initTransform(e, t, r), this.initHierarchy();
      }
      NullElement.prototype.prepareFrame = function(e) {
        this.prepareProperties(e, !0);
      }, NullElement.prototype.renderFrame = function() {
      }, NullElement.prototype.getBaseElement = function() {
        return null;
      }, NullElement.prototype.destroy = function() {
      }, NullElement.prototype.sourceRectAtTime = function() {
      }, NullElement.prototype.hide = function() {
      }, extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement);
      function SVGRendererBase() {
      }
      extendPrototype([BaseRenderer], SVGRendererBase), SVGRendererBase.prototype.createNull = function(e) {
        return new NullElement(e, this.globalData, this);
      }, SVGRendererBase.prototype.createShape = function(e) {
        return new SVGShapeElement(e, this.globalData, this);
      }, SVGRendererBase.prototype.createText = function(e) {
        return new SVGTextLottieElement(e, this.globalData, this);
      }, SVGRendererBase.prototype.createImage = function(e) {
        return new IImageElement(e, this.globalData, this);
      }, SVGRendererBase.prototype.createSolid = function(e) {
        return new ISolidElement(e, this.globalData, this);
      }, SVGRendererBase.prototype.configAnimation = function(e) {
        this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink"), this.renderConfig.viewBoxSize ? this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize) : this.svgElement.setAttribute("viewBox", "0 0 " + e.w + " " + e.h), this.renderConfig.viewBoxOnly || (this.svgElement.setAttribute("width", e.w), this.svgElement.setAttribute("height", e.h), this.svgElement.style.width = "100%", this.svgElement.style.height = "100%", this.svgElement.style.transform = "translate3d(0,0,0)", this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility), this.renderConfig.width && this.svgElement.setAttribute("width", this.renderConfig.width), this.renderConfig.height && this.svgElement.setAttribute("height", this.renderConfig.height), this.renderConfig.className && this.svgElement.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.svgElement.setAttribute("id", this.renderConfig.id), this.renderConfig.focusable !== void 0 && this.svgElement.setAttribute("focusable", this.renderConfig.focusable), this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.animationItem.wrapper.appendChild(this.svgElement);
        var t = this.globalData.defs;
        this.setupGlobalData(e, t), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.data = e;
        var r = createNS("clipPath"), i = createNS("rect");
        i.setAttribute("width", e.w), i.setAttribute("height", e.h), i.setAttribute("x", 0), i.setAttribute("y", 0);
        var n = createElementID();
        r.setAttribute("id", n), r.appendChild(i), this.layerElement.setAttribute("clip-path", "url(" + getLocationHref() + "#" + n + ")"), t.appendChild(r), this.layers = e.layers, this.elements = createSizedArray(e.layers.length);
      }, SVGRendererBase.prototype.destroy = function() {
        this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.layerElement = null, this.globalData.defs = null;
        var e, t = this.layers ? this.layers.length : 0;
        for (e = 0; e < t; e += 1)
          this.elements[e] && this.elements[e].destroy && this.elements[e].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, SVGRendererBase.prototype.updateContainerSize = function() {
      }, SVGRendererBase.prototype.findIndexByInd = function(e) {
        var t = 0, r = this.layers.length;
        for (t = 0; t < r; t += 1)
          if (this.layers[t].ind === e)
            return t;
        return -1;
      }, SVGRendererBase.prototype.buildItem = function(e) {
        var t = this.elements;
        if (!(t[e] || this.layers[e].ty === 99)) {
          t[e] = !0;
          var r = this.createItem(this.layers[e]);
          if (t[e] = r, getExpressionsPlugin() && (this.layers[e].ty === 0 && this.globalData.projectInterface.registerComposition(r), r.initExpressions()), this.appendElementInPos(r, e), this.layers[e].tt) {
            var i = "tp" in this.layers[e] ? this.findIndexByInd(this.layers[e].tp) : e - 1;
            if (i === -1)
              return;
            if (!this.elements[i] || this.elements[i] === !0)
              this.buildItem(i), this.addPendingElement(r);
            else {
              var n = t[i], s = n.getMatte(this.layers[e].tt);
              r.setMatte(s);
            }
          }
        }
      }, SVGRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var e = this.pendingElements.pop();
          if (e.checkParenting(), e.data.tt)
            for (var t = 0, r = this.elements.length; t < r; ) {
              if (this.elements[t] === e) {
                var i = "tp" in e.data ? this.findIndexByInd(e.data.tp) : t - 1, n = this.elements[i], s = n.getMatte(this.layers[t].tt);
                e.setMatte(s);
                break;
              }
              t += 1;
            }
        }
      }, SVGRendererBase.prototype.renderFrame = function(e) {
        if (!(this.renderedFrame === e || this.destroyed)) {
          e === null ? e = this.renderedFrame : this.renderedFrame = e, this.globalData.frameNum = e, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = e, this.globalData._mdf = !1;
          var t, r = this.layers.length;
          for (this.completeLayers || this.checkLayers(e), t = r - 1; t >= 0; t -= 1)
            (this.completeLayers || this.elements[t]) && this.elements[t].prepareFrame(e - this.layers[t].st);
          if (this.globalData._mdf)
            for (t = 0; t < r; t += 1)
              (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
        }
      }, SVGRendererBase.prototype.appendElementInPos = function(e, t) {
        var r = e.getBaseElement();
        if (r) {
          for (var i = 0, n; i < t; )
            this.elements[i] && this.elements[i] !== !0 && this.elements[i].getBaseElement() && (n = this.elements[i].getBaseElement()), i += 1;
          n ? this.layerElement.insertBefore(r, n) : this.layerElement.appendChild(r);
        }
      }, SVGRendererBase.prototype.hide = function() {
        this.layerElement.style.display = "none";
      }, SVGRendererBase.prototype.show = function() {
        this.layerElement.style.display = "block";
      };
      function ICompElement() {
      }
      extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement), ICompElement.prototype.initElement = function(e, t, r) {
        this.initFrame(), this.initBaseData(e, t, r), this.initTransform(e, t, r), this.initRenderable(), this.initHierarchy(), this.initRendererElement(), this.createContainerElements(), this.createRenderableComponents(), (this.data.xt || !t.progressiveLoad) && this.buildAllItems(), this.hide();
      }, ICompElement.prototype.prepareFrame = function(e) {
        if (this._mdf = !1, this.prepareRenderableFrame(e), this.prepareProperties(e, this.isInRange), !(!this.isInRange && !this.data.xt)) {
          if (this.tm._placeholder)
            this.renderedFrame = e / this.data.sr;
          else {
            var t = this.tm.v;
            t === this.data.op && (t = this.data.op - 1), this.renderedFrame = t;
          }
          var r, i = this.elements.length;
          for (this.completeLayers || this.checkLayers(this.renderedFrame), r = i - 1; r >= 0; r -= 1)
            (this.completeLayers || this.elements[r]) && (this.elements[r].prepareFrame(this.renderedFrame - this.layers[r].st), this.elements[r]._mdf && (this._mdf = !0));
        }
      }, ICompElement.prototype.renderInnerContent = function() {
        var e, t = this.layers.length;
        for (e = 0; e < t; e += 1)
          (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
      }, ICompElement.prototype.setElements = function(e) {
        this.elements = e;
      }, ICompElement.prototype.getElements = function() {
        return this.elements;
      }, ICompElement.prototype.destroyElements = function() {
        var e, t = this.layers.length;
        for (e = 0; e < t; e += 1)
          this.elements[e] && this.elements[e].destroy();
      }, ICompElement.prototype.destroy = function() {
        this.destroyElements(), this.destroyBaseElement();
      };
      function SVGCompElement(e, t, r) {
        this.layers = e.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(e, t, r), this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement), SVGCompElement.prototype.createComp = function(e) {
        return new SVGCompElement(e, this.globalData, this);
      };
      function SVGRenderer(e, t) {
        this.animationItem = e, this.layers = null, this.renderedFrame = -1, this.svgElement = createNS("svg");
        var r = "";
        if (t && t.title) {
          var i = createNS("title"), n = createElementID();
          i.setAttribute("id", n), i.textContent = t.title, this.svgElement.appendChild(i), r += n;
        }
        if (t && t.description) {
          var s = createNS("desc"), a = createElementID();
          s.setAttribute("id", a), s.textContent = t.description, this.svgElement.appendChild(s), r += " " + a;
        }
        r && this.svgElement.setAttribute("aria-labelledby", r);
        var l = createNS("defs");
        this.svgElement.appendChild(l);
        var o = createNS("g");
        this.svgElement.appendChild(o), this.layerElement = o, this.renderConfig = {
          preserveAspectRatio: t && t.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: t && t.imagePreserveAspectRatio || "xMidYMid slice",
          contentVisibility: t && t.contentVisibility || "visible",
          progressiveLoad: t && t.progressiveLoad || !1,
          hideOnTransparent: !(t && t.hideOnTransparent === !1),
          viewBoxOnly: t && t.viewBoxOnly || !1,
          viewBoxSize: t && t.viewBoxSize || !1,
          className: t && t.className || "",
          id: t && t.id || "",
          focusable: t && t.focusable,
          filterSize: {
            width: t && t.filterSize && t.filterSize.width || "100%",
            height: t && t.filterSize && t.filterSize.height || "100%",
            x: t && t.filterSize && t.filterSize.x || "0%",
            y: t && t.filterSize && t.filterSize.y || "0%"
          },
          width: t && t.width,
          height: t && t.height,
          runExpressions: !t || t.runExpressions === void 0 || t.runExpressions
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          defs: l,
          renderConfig: this.renderConfig
        }, this.elements = [], this.pendingElements = [], this.destroyed = !1, this.rendererType = "svg";
      }
      extendPrototype([SVGRendererBase], SVGRenderer), SVGRenderer.prototype.createComp = function(e) {
        return new SVGCompElement(e, this.globalData, this);
      };
      function ShapeTransformManager() {
        this.sequences = {}, this.sequenceList = [], this.transform_key_count = 0;
      }
      ShapeTransformManager.prototype = {
        addTransformSequence: function(t) {
          var r, i = t.length, n = "_";
          for (r = 0; r < i; r += 1)
            n += t[r].transform.key + "_";
          var s = this.sequences[n];
          return s || (s = {
            transforms: [].concat(t),
            finalTransform: new Matrix(),
            _mdf: !1
          }, this.sequences[n] = s, this.sequenceList.push(s)), s;
        },
        processSequence: function(t, r) {
          for (var i = 0, n = t.transforms.length, s = r; i < n && !r; ) {
            if (t.transforms[i].transform.mProps._mdf) {
              s = !0;
              break;
            }
            i += 1;
          }
          if (s)
            for (t.finalTransform.reset(), i = n - 1; i >= 0; i -= 1)
              t.finalTransform.multiply(t.transforms[i].transform.mProps.v);
          t._mdf = s;
        },
        processSequences: function(t) {
          var r, i = this.sequenceList.length;
          for (r = 0; r < i; r += 1)
            this.processSequence(this.sequenceList[r], t);
        },
        getNewKey: function() {
          return this.transform_key_count += 1, "_" + this.transform_key_count;
        }
      };
      var lumaLoader = function() {
        var t = "__lottie_element_luma_buffer", r = null, i = null, n = null;
        function s() {
          var o = createNS("svg"), f = createNS("filter"), c = createNS("feColorMatrix");
          return f.setAttribute("id", t), c.setAttribute("type", "matrix"), c.setAttribute("color-interpolation-filters", "sRGB"), c.setAttribute("values", "0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0, 0.3, 0.3, 0.3, 0, 0"), f.appendChild(c), o.appendChild(f), o.setAttribute("id", t + "_svg"), featureSupport.svgLumaHidden && (o.style.display = "none"), o;
        }
        function a() {
          r || (n = s(), document.body.appendChild(n), r = createTag("canvas"), i = r.getContext("2d"), i.filter = "url(#" + t + ")", i.fillStyle = "rgba(0,0,0,0)", i.fillRect(0, 0, 1, 1));
        }
        function l(o) {
          return r || a(), r.width = o.width, r.height = o.height, i.filter = "url(#" + t + ")", r;
        }
        return {
          load: a,
          get: l
        };
      };
      function createCanvas(e, t) {
        if (featureSupport.offscreenCanvas)
          return new OffscreenCanvas(e, t);
        var r = createTag("canvas");
        return r.width = e, r.height = t, r;
      }
      var assetLoader = function() {
        return {
          loadLumaCanvas: lumaLoader.load,
          getLumaCanvas: lumaLoader.get,
          createCanvas
        };
      }(), registeredEffects = {};
      function CVEffects(e) {
        var t, r = e.data.ef ? e.data.ef.length : 0;
        this.filters = [];
        var i;
        for (t = 0; t < r; t += 1) {
          i = null;
          var n = e.data.ef[t].ty;
          if (registeredEffects[n]) {
            var s = registeredEffects[n].effect;
            i = new s(e.effectsManager.effectElements[t], e);
          }
          i && this.filters.push(i);
        }
        this.filters.length && e.addRenderableComponent(this);
      }
      CVEffects.prototype.renderFrame = function(e) {
        var t, r = this.filters.length;
        for (t = 0; t < r; t += 1)
          this.filters[t].renderFrame(e);
      }, CVEffects.prototype.getEffects = function(e) {
        var t, r = this.filters.length, i = [];
        for (t = 0; t < r; t += 1)
          this.filters[t].type === e && i.push(this.filters[t]);
        return i;
      };
      function registerEffect(e, t) {
        registeredEffects[e] = {
          effect: t
        };
      }
      function CVMaskElement(e, t) {
        this.data = e, this.element = t, this.masksProperties = this.data.masksProperties || [], this.viewData = createSizedArray(this.masksProperties.length);
        var r, i = this.masksProperties.length, n = !1;
        for (r = 0; r < i; r += 1)
          this.masksProperties[r].mode !== "n" && (n = !0), this.viewData[r] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[r], 3);
        this.hasMasks = n, n && this.element.addRenderableComponent(this);
      }
      CVMaskElement.prototype.renderFrame = function() {
        if (this.hasMasks) {
          var e = this.element.finalTransform.mat, t = this.element.canvasContext, r, i = this.masksProperties.length, n, s, a;
          for (t.beginPath(), r = 0; r < i; r += 1)
            if (this.masksProperties[r].mode !== "n") {
              this.masksProperties[r].inv && (t.moveTo(0, 0), t.lineTo(this.element.globalData.compSize.w, 0), t.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h), t.lineTo(0, this.element.globalData.compSize.h), t.lineTo(0, 0)), a = this.viewData[r].v, n = e.applyToPointArray(a.v[0][0], a.v[0][1], 0), t.moveTo(n[0], n[1]);
              var l, o = a._length;
              for (l = 1; l < o; l += 1)
                s = e.applyToTriplePoints(a.o[l - 1], a.i[l], a.v[l]), t.bezierCurveTo(s[0], s[1], s[2], s[3], s[4], s[5]);
              s = e.applyToTriplePoints(a.o[l - 1], a.i[0], a.v[0]), t.bezierCurveTo(s[0], s[1], s[2], s[3], s[4], s[5]);
            }
          this.element.globalData.renderer.save(!0), t.clip();
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
            var t = this.globalData.canvasContext, r = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
            this.buffers.push(r);
            var i = assetLoader.createCanvas(t.canvas.width, t.canvas.height);
            this.buffers.push(i), this.data.tt >= 3 && !document._isProxy && assetLoader.loadLumaCanvas();
          }
          this.canvasContext = this.globalData.canvasContext, this.transformCanvas = this.globalData.transformCanvas, this.renderableEffectsManager = new CVEffects(this), this.searchEffectTransforms();
        },
        createContent: function() {
        },
        setBlendMode: function() {
          var t = this.globalData;
          if (t.blendMode !== this.data.bm) {
            t.blendMode = this.data.bm;
            var r = getBlendMode(this.data.bm);
            t.canvasContext.globalCompositeOperation = r;
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
        clearCanvas: function(t) {
          t.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy);
        },
        prepareLayer: function() {
          if (this.data.tt >= 1) {
            var t = this.buffers[0], r = t.getContext("2d");
            this.clearCanvas(r), r.drawImage(this.canvasContext.canvas, 0, 0), this.currentTransform = this.canvasContext.getTransform(), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform);
          }
        },
        exitLayer: function() {
          if (this.data.tt >= 1) {
            var t = this.buffers[1], r = t.getContext("2d");
            this.clearCanvas(r), r.drawImage(this.canvasContext.canvas, 0, 0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.setTransform(this.currentTransform);
            var i = this.comp.getElementById("tp" in this.data ? this.data.tp : this.data.ind - 1);
            if (i.renderFrame(!0), this.canvasContext.setTransform(1, 0, 0, 1, 0, 0), this.data.tt >= 3 && !document._isProxy) {
              var n = assetLoader.getLumaCanvas(this.canvasContext.canvas), s = n.getContext("2d");
              s.drawImage(this.canvasContext.canvas, 0, 0), this.clearCanvas(this.canvasContext), this.canvasContext.drawImage(n, 0, 0);
            }
            this.canvasContext.globalCompositeOperation = operationsMap[this.data.tt], this.canvasContext.drawImage(t, 0, 0), this.canvasContext.globalCompositeOperation = "destination-over", this.canvasContext.drawImage(this.buffers[0], 0, 0), this.canvasContext.setTransform(this.currentTransform), this.canvasContext.globalCompositeOperation = "source-over";
          }
        },
        renderFrame: function(t) {
          if (!(this.hidden || this.data.hd) && !(this.data.td === 1 && !t)) {
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
      function CVShapeData(e, t, r, i) {
        this.styledShapes = [], this.tr = [0, 0, 0, 0, 0, 0];
        var n = 4;
        t.ty === "rc" ? n = 5 : t.ty === "el" ? n = 6 : t.ty === "sr" && (n = 7), this.sh = ShapePropertyFactory.getShapeProp(e, t, n, e);
        var s, a = r.length, l;
        for (s = 0; s < a; s += 1)
          r[s].closed || (l = {
            transforms: i.addTransformSequence(r[s].transforms),
            trNodes: []
          }, this.styledShapes.push(l), r[s].elements.push(l));
      }
      CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated;
      function CVShapeElement(e, t, r) {
        this.shapes = [], this.shapesData = e.shapes, this.stylesList = [], this.itemsData = [], this.prevViewData = [], this.shapeModifiers = [], this.processedElements = [], this.transformsManager = new ShapeTransformManager(), this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement), CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement, CVShapeElement.prototype.transformHelper = {
        opacity: 1,
        _opMdf: !1
      }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createContent = function() {
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
      }, CVShapeElement.prototype.createStyleElement = function(e, t) {
        var r = {
          data: e,
          type: e.ty,
          preTransforms: this.transformsManager.addTransformSequence(t),
          transforms: [],
          elements: [],
          closed: e.hd === !0
        }, i = {};
        if (e.ty === "fl" || e.ty === "st" ? (i.c = PropertyFactory.getProp(this, e.c, 1, 255, this), i.c.k || (r.co = "rgb(" + bmFloor(i.c.v[0]) + "," + bmFloor(i.c.v[1]) + "," + bmFloor(i.c.v[2]) + ")")) : (e.ty === "gf" || e.ty === "gs") && (i.s = PropertyFactory.getProp(this, e.s, 1, null, this), i.e = PropertyFactory.getProp(this, e.e, 1, null, this), i.h = PropertyFactory.getProp(this, e.h || {
          k: 0
        }, 0, 0.01, this), i.a = PropertyFactory.getProp(this, e.a || {
          k: 0
        }, 0, degToRads, this), i.g = new GradientProperty(this, e.g, this)), i.o = PropertyFactory.getProp(this, e.o, 0, 0.01, this), e.ty === "st" || e.ty === "gs") {
          if (r.lc = lineCapEnum[e.lc || 2], r.lj = lineJoinEnum[e.lj || 2], e.lj == 1 && (r.ml = e.ml), i.w = PropertyFactory.getProp(this, e.w, 0, null, this), i.w.k || (r.wi = i.w.v), e.d) {
            var n = new DashProperty(this, e.d, "canvas", this);
            i.d = n, i.d.k || (r.da = i.d.dashArray, r.do = i.d.dashoffset[0]);
          }
        } else
          r.r = e.r === 2 ? "evenodd" : "nonzero";
        return this.stylesList.push(r), i.style = r, i;
      }, CVShapeElement.prototype.createGroupElement = function() {
        var e = {
          it: [],
          prevViewData: []
        };
        return e;
      }, CVShapeElement.prototype.createTransformElement = function(e) {
        var t = {
          transform: {
            opacity: 1,
            _opMdf: !1,
            key: this.transformsManager.getNewKey(),
            op: PropertyFactory.getProp(this, e.o, 0, 0.01, this),
            mProps: TransformPropertyFactory.getTransformProperty(this, e, this)
          }
        };
        return t;
      }, CVShapeElement.prototype.createShapeElement = function(e) {
        var t = new CVShapeData(this, e, this.stylesList, this.transformsManager);
        return this.shapes.push(t), this.addShapeToModifiers(t), t;
      }, CVShapeElement.prototype.reloadShapes = function() {
        this._isFirstFrame = !0;
        var e, t = this.itemsData.length;
        for (e = 0; e < t; e += 1)
          this.prevViewData[e] = this.itemsData[e];
        for (this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []), t = this.dynamicProperties.length, e = 0; e < t; e += 1)
          this.dynamicProperties[e].getValue();
        this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
      }, CVShapeElement.prototype.addTransformToStyleList = function(e) {
        var t, r = this.stylesList.length;
        for (t = 0; t < r; t += 1)
          this.stylesList[t].closed || this.stylesList[t].transforms.push(e);
      }, CVShapeElement.prototype.removeTransformFromStyleList = function() {
        var e, t = this.stylesList.length;
        for (e = 0; e < t; e += 1)
          this.stylesList[e].closed || this.stylesList[e].transforms.pop();
      }, CVShapeElement.prototype.closeStyles = function(e) {
        var t, r = e.length;
        for (t = 0; t < r; t += 1)
          e[t].closed = !0;
      }, CVShapeElement.prototype.searchShapes = function(e, t, r, i, n) {
        var s, a = e.length - 1, l, o, f = [], c = [], v, h, g, m = [].concat(n);
        for (s = a; s >= 0; s -= 1) {
          if (v = this.searchProcessedElement(e[s]), v ? t[s] = r[v - 1] : e[s]._shouldRender = i, e[s].ty === "fl" || e[s].ty === "st" || e[s].ty === "gf" || e[s].ty === "gs")
            v ? t[s].style.closed = !1 : t[s] = this.createStyleElement(e[s], m), f.push(t[s].style);
          else if (e[s].ty === "gr") {
            if (!v)
              t[s] = this.createGroupElement(e[s]);
            else
              for (o = t[s].it.length, l = 0; l < o; l += 1)
                t[s].prevViewData[l] = t[s].it[l];
            this.searchShapes(e[s].it, t[s].it, t[s].prevViewData, i, m);
          } else e[s].ty === "tr" ? (v || (g = this.createTransformElement(e[s]), t[s] = g), m.push(t[s]), this.addTransformToStyleList(t[s])) : e[s].ty === "sh" || e[s].ty === "rc" || e[s].ty === "el" || e[s].ty === "sr" ? v || (t[s] = this.createShapeElement(e[s])) : e[s].ty === "tm" || e[s].ty === "rd" || e[s].ty === "pb" || e[s].ty === "zz" || e[s].ty === "op" ? (v ? (h = t[s], h.closed = !1) : (h = ShapeModifiers.getModifier(e[s].ty), h.init(this, e[s]), t[s] = h, this.shapeModifiers.push(h)), c.push(h)) : e[s].ty === "rp" && (v ? (h = t[s], h.closed = !0) : (h = ShapeModifiers.getModifier(e[s].ty), t[s] = h, h.init(this, e, s, t), this.shapeModifiers.push(h), i = !1), c.push(h));
          this.addProcessedElement(e[s], s + 1);
        }
        for (this.removeTransformFromStyleList(), this.closeStyles(f), a = c.length, s = 0; s < a; s += 1)
          c[s].closed = !0;
      }, CVShapeElement.prototype.renderInnerContent = function() {
        this.transformHelper.opacity = 1, this.transformHelper._opMdf = !1, this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame), this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
      }, CVShapeElement.prototype.renderShapeTransform = function(e, t) {
        (e._opMdf || t.op._mdf || this._isFirstFrame) && (t.opacity = e.opacity, t.opacity *= t.op.v, t._opMdf = !0);
      }, CVShapeElement.prototype.drawLayer = function() {
        var e, t = this.stylesList.length, r, i, n, s, a, l, o = this.globalData.renderer, f = this.globalData.canvasContext, c, v;
        for (e = 0; e < t; e += 1)
          if (v = this.stylesList[e], c = v.type, !((c === "st" || c === "gs") && v.wi === 0 || !v.data._shouldRender || v.coOp === 0 || this.globalData.currentGlobalAlpha === 0)) {
            for (o.save(), a = v.elements, c === "st" || c === "gs" ? (o.ctxStrokeStyle(c === "st" ? v.co : v.grd), o.ctxLineWidth(v.wi), o.ctxLineCap(v.lc), o.ctxLineJoin(v.lj), o.ctxMiterLimit(v.ml || 0)) : o.ctxFillStyle(c === "fl" ? v.co : v.grd), o.ctxOpacity(v.coOp), c !== "st" && c !== "gs" && f.beginPath(), o.ctxTransform(v.preTransforms.finalTransform.props), i = a.length, r = 0; r < i; r += 1) {
              for ((c === "st" || c === "gs") && (f.beginPath(), v.da && (f.setLineDash(v.da), f.lineDashOffset = v.do)), l = a[r].trNodes, s = l.length, n = 0; n < s; n += 1)
                l[n].t === "m" ? f.moveTo(l[n].p[0], l[n].p[1]) : l[n].t === "c" ? f.bezierCurveTo(l[n].pts[0], l[n].pts[1], l[n].pts[2], l[n].pts[3], l[n].pts[4], l[n].pts[5]) : f.closePath();
              (c === "st" || c === "gs") && (o.ctxStroke(), v.da && f.setLineDash(this.dashResetter));
            }
            c !== "st" && c !== "gs" && this.globalData.renderer.ctxFill(v.r), o.restore();
          }
      }, CVShapeElement.prototype.renderShape = function(e, t, r, i) {
        var n, s = t.length - 1, a;
        for (a = e, n = s; n >= 0; n -= 1)
          t[n].ty === "tr" ? (a = r[n].transform, this.renderShapeTransform(e, a)) : t[n].ty === "sh" || t[n].ty === "el" || t[n].ty === "rc" || t[n].ty === "sr" ? this.renderPath(t[n], r[n]) : t[n].ty === "fl" ? this.renderFill(t[n], r[n], a) : t[n].ty === "st" ? this.renderStroke(t[n], r[n], a) : t[n].ty === "gf" || t[n].ty === "gs" ? this.renderGradientFill(t[n], r[n], a) : t[n].ty === "gr" ? this.renderShape(a, t[n].it, r[n].it) : t[n].ty;
        i && this.drawLayer();
      }, CVShapeElement.prototype.renderStyledShape = function(e, t) {
        if (this._isFirstFrame || t._mdf || e.transforms._mdf) {
          var r = e.trNodes, i = t.paths, n, s, a, l = i._length;
          r.length = 0;
          var o = e.transforms.finalTransform;
          for (a = 0; a < l; a += 1) {
            var f = i.shapes[a];
            if (f && f.v) {
              for (s = f._length, n = 1; n < s; n += 1)
                n === 1 && r.push({
                  t: "m",
                  p: o.applyToPointArray(f.v[0][0], f.v[0][1], 0)
                }), r.push({
                  t: "c",
                  pts: o.applyToTriplePoints(f.o[n - 1], f.i[n], f.v[n])
                });
              s === 1 && r.push({
                t: "m",
                p: o.applyToPointArray(f.v[0][0], f.v[0][1], 0)
              }), f.c && s && (r.push({
                t: "c",
                pts: o.applyToTriplePoints(f.o[n - 1], f.i[0], f.v[0])
              }), r.push({
                t: "z"
              }));
            }
          }
          e.trNodes = r;
        }
      }, CVShapeElement.prototype.renderPath = function(e, t) {
        if (e.hd !== !0 && e._shouldRender) {
          var r, i = t.styledShapes.length;
          for (r = 0; r < i; r += 1)
            this.renderStyledShape(t.styledShapes[r], t.sh);
        }
      }, CVShapeElement.prototype.renderFill = function(e, t, r) {
        var i = t.style;
        (t.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(t.c.v[0]) + "," + bmFloor(t.c.v[1]) + "," + bmFloor(t.c.v[2]) + ")"), (t.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = t.o.v * r.opacity);
      }, CVShapeElement.prototype.renderGradientFill = function(e, t, r) {
        var i = t.style, n;
        if (!i.grd || t.g._mdf || t.s._mdf || t.e._mdf || e.t !== 1 && (t.h._mdf || t.a._mdf)) {
          var s = this.globalData.canvasContext, a = t.s.v, l = t.e.v;
          if (e.t === 1)
            n = s.createLinearGradient(a[0], a[1], l[0], l[1]);
          else {
            var o = Math.sqrt(Math.pow(a[0] - l[0], 2) + Math.pow(a[1] - l[1], 2)), f = Math.atan2(l[1] - a[1], l[0] - a[0]), c = t.h.v;
            c >= 1 ? c = 0.99 : c <= -1 && (c = -0.99);
            var v = o * c, h = Math.cos(f + t.a.v) * v + a[0], g = Math.sin(f + t.a.v) * v + a[1];
            n = s.createRadialGradient(h, g, 0, a[0], a[1], o);
          }
          var m, p = e.g.p, b = t.g.c, u = 1;
          for (m = 0; m < p; m += 1)
            t.g._hasOpacity && t.g._collapsable && (u = t.g.o[m * 2 + 1]), n.addColorStop(b[m * 4] / 100, "rgba(" + b[m * 4 + 1] + "," + b[m * 4 + 2] + "," + b[m * 4 + 3] + "," + u + ")");
          i.grd = n;
        }
        i.coOp = t.o.v * r.opacity;
      }, CVShapeElement.prototype.renderStroke = function(e, t, r) {
        var i = t.style, n = t.d;
        n && (n._mdf || this._isFirstFrame) && (i.da = n.dashArray, i.do = n.dashoffset[0]), (t.c._mdf || this._isFirstFrame) && (i.co = "rgb(" + bmFloor(t.c.v[0]) + "," + bmFloor(t.c.v[1]) + "," + bmFloor(t.c.v[2]) + ")"), (t.o._mdf || r._opMdf || this._isFirstFrame) && (i.coOp = t.o.v * r.opacity), (t.w._mdf || this._isFirstFrame) && (i.wi = t.w.v);
      }, CVShapeElement.prototype.destroy = function() {
        this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.itemsData.length = 0;
      };
      function CVTextElement(e, t, r) {
        this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
          fill: "rgba(0,0,0,0)",
          stroke: "rgba(0,0,0,0)",
          sWidth: 0,
          fValue: ""
        }, this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement), CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d"), CVTextElement.prototype.buildNewText = function() {
        var e = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(e.l ? e.l.length : 0);
        var t = !1;
        e.fc ? (t = !0, this.values.fill = this.buildColor(e.fc)) : this.values.fill = "rgba(0,0,0,0)", this.fill = t;
        var r = !1;
        e.sc && (r = !0, this.values.stroke = this.buildColor(e.sc), this.values.sWidth = e.sw);
        var i = this.globalData.fontManager.getFontByName(e.f), n, s, a = e.l, l = this.mHelper;
        this.stroke = r, this.values.fValue = e.finalSize + "px " + this.globalData.fontManager.getFontByName(e.f).fFamily, s = e.finalText.length;
        var o, f, c, v, h, g, m, p, b, u, y = this.data.singleShape, d = e.tr * 1e-3 * e.finalSize, E = 0, S = 0, C = !0, w = 0;
        for (n = 0; n < s; n += 1) {
          o = this.globalData.fontManager.getCharData(e.finalText[n], i.fStyle, this.globalData.fontManager.getFontByName(e.f).fFamily), f = o && o.data || {}, l.reset(), y && a[n].n && (E = -d, S += e.yOffset, S += C ? 1 : 0, C = !1), h = f.shapes ? f.shapes[0].it : [], m = h.length, l.scale(e.finalSize / 100, e.finalSize / 100), y && this.applyTextPropertiesToMatrix(e, l, a[n].line, E, S), b = createSizedArray(m - 1);
          var M = 0;
          for (g = 0; g < m; g += 1)
            if (h[g].ty === "sh") {
              for (v = h[g].ks.k.i.length, p = h[g].ks.k, u = [], c = 1; c < v; c += 1)
                c === 1 && u.push(l.applyToX(p.v[0][0], p.v[0][1], 0), l.applyToY(p.v[0][0], p.v[0][1], 0)), u.push(l.applyToX(p.o[c - 1][0], p.o[c - 1][1], 0), l.applyToY(p.o[c - 1][0], p.o[c - 1][1], 0), l.applyToX(p.i[c][0], p.i[c][1], 0), l.applyToY(p.i[c][0], p.i[c][1], 0), l.applyToX(p.v[c][0], p.v[c][1], 0), l.applyToY(p.v[c][0], p.v[c][1], 0));
              u.push(l.applyToX(p.o[c - 1][0], p.o[c - 1][1], 0), l.applyToY(p.o[c - 1][0], p.o[c - 1][1], 0), l.applyToX(p.i[0][0], p.i[0][1], 0), l.applyToY(p.i[0][0], p.i[0][1], 0), l.applyToX(p.v[0][0], p.v[0][1], 0), l.applyToY(p.v[0][0], p.v[0][1], 0)), b[M] = u, M += 1;
            }
          y && (E += a[n].l, E += d), this.textSpans[w] ? this.textSpans[w].elem = b : this.textSpans[w] = {
            elem: b
          }, w += 1;
        }
      }, CVTextElement.prototype.renderInnerContent = function() {
        this.validateText();
        var e = this.canvasContext;
        e.font = this.values.fValue, this.globalData.renderer.ctxLineCap("butt"), this.globalData.renderer.ctxLineJoin("miter"), this.globalData.renderer.ctxMiterLimit(4), this.data.singleShape || this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
        var t, r, i, n, s, a, l = this.textAnimator.renderedLetters, o = this.textProperty.currentData.l;
        r = o.length;
        var f, c = null, v = null, h = null, g, m, p = this.globalData.renderer;
        for (t = 0; t < r; t += 1)
          if (!o[t].n) {
            if (f = l[t], f && (p.save(), p.ctxTransform(f.p), p.ctxOpacity(f.o)), this.fill) {
              for (f && f.fc ? c !== f.fc && (p.ctxFillStyle(f.fc), c = f.fc) : c !== this.values.fill && (c = this.values.fill, p.ctxFillStyle(this.values.fill)), g = this.textSpans[t].elem, n = g.length, this.globalData.canvasContext.beginPath(), i = 0; i < n; i += 1)
                for (m = g[i], a = m.length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6)
                  this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
              this.globalData.canvasContext.closePath(), p.ctxFill();
            }
            if (this.stroke) {
              for (f && f.sw ? h !== f.sw && (h = f.sw, p.ctxLineWidth(f.sw)) : h !== this.values.sWidth && (h = this.values.sWidth, p.ctxLineWidth(this.values.sWidth)), f && f.sc ? v !== f.sc && (v = f.sc, p.ctxStrokeStyle(f.sc)) : v !== this.values.stroke && (v = this.values.stroke, p.ctxStrokeStyle(this.values.stroke)), g = this.textSpans[t].elem, n = g.length, this.globalData.canvasContext.beginPath(), i = 0; i < n; i += 1)
                for (m = g[i], a = m.length, this.globalData.canvasContext.moveTo(m[0], m[1]), s = 2; s < a; s += 6)
                  this.globalData.canvasContext.bezierCurveTo(m[s], m[s + 1], m[s + 2], m[s + 3], m[s + 4], m[s + 5]);
              this.globalData.canvasContext.closePath(), p.ctxStroke();
            }
            f && this.globalData.renderer.restore();
          }
      };
      function CVImageElement(e, t, r) {
        this.assetData = t.getAssetData(e.refId), this.img = t.imageLoader.getAsset(this.assetData), this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement), CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVImageElement.prototype.createContent = function() {
        if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
          var e = createTag("canvas");
          e.width = this.assetData.w, e.height = this.assetData.h;
          var t = e.getContext("2d"), r = this.img.width, i = this.img.height, n = r / i, s = this.assetData.w / this.assetData.h, a, l, o = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
          n > s && o === "xMidYMid slice" || n < s && o !== "xMidYMid slice" ? (l = i, a = l * s) : (a = r, l = a / s), t.drawImage(this.img, (r - a) / 2, (i - l) / 2, a, l, 0, 0, this.assetData.w, this.assetData.h), this.img = e;
        }
      }, CVImageElement.prototype.renderInnerContent = function() {
        this.canvasContext.drawImage(this.img, 0, 0);
      }, CVImageElement.prototype.destroy = function() {
        this.img = null;
      };
      function CVSolidElement(e, t, r) {
        this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement), CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement, CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame, CVSolidElement.prototype.renderInnerContent = function() {
        this.globalData.renderer.ctxFillStyle(this.data.sc), this.globalData.renderer.ctxFillRect(0, 0, this.data.sw, this.data.sh);
      };
      function CanvasRendererBase() {
      }
      extendPrototype([BaseRenderer], CanvasRendererBase), CanvasRendererBase.prototype.createShape = function(e) {
        return new CVShapeElement(e, this.globalData, this);
      }, CanvasRendererBase.prototype.createText = function(e) {
        return new CVTextElement(e, this.globalData, this);
      }, CanvasRendererBase.prototype.createImage = function(e) {
        return new CVImageElement(e, this.globalData, this);
      }, CanvasRendererBase.prototype.createSolid = function(e) {
        return new CVSolidElement(e, this.globalData, this);
      }, CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, CanvasRendererBase.prototype.ctxTransform = function(e) {
        e[0] === 1 && e[1] === 0 && e[4] === 0 && e[5] === 1 && e[12] === 0 && e[13] === 0 || this.canvasContext.transform(e[0], e[1], e[4], e[5], e[12], e[13]);
      }, CanvasRendererBase.prototype.ctxOpacity = function(e) {
        this.canvasContext.globalAlpha *= e < 0 ? 0 : e;
      }, CanvasRendererBase.prototype.ctxFillStyle = function(e) {
        this.canvasContext.fillStyle = e;
      }, CanvasRendererBase.prototype.ctxStrokeStyle = function(e) {
        this.canvasContext.strokeStyle = e;
      }, CanvasRendererBase.prototype.ctxLineWidth = function(e) {
        this.canvasContext.lineWidth = e;
      }, CanvasRendererBase.prototype.ctxLineCap = function(e) {
        this.canvasContext.lineCap = e;
      }, CanvasRendererBase.prototype.ctxLineJoin = function(e) {
        this.canvasContext.lineJoin = e;
      }, CanvasRendererBase.prototype.ctxMiterLimit = function(e) {
        this.canvasContext.miterLimit = e;
      }, CanvasRendererBase.prototype.ctxFill = function(e) {
        this.canvasContext.fill(e);
      }, CanvasRendererBase.prototype.ctxFillRect = function(e, t, r, i) {
        this.canvasContext.fillRect(e, t, r, i);
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
      }, CanvasRendererBase.prototype.restore = function(e) {
        if (!this.renderConfig.clearCanvas) {
          this.canvasContext.restore();
          return;
        }
        e && (this.globalData.blendMode = "source-over"), this.contextData.restore(e);
      }, CanvasRendererBase.prototype.configAnimation = function(e) {
        if (this.animationItem.wrapper) {
          this.animationItem.container = createTag("canvas");
          var t = this.animationItem.container.style;
          t.width = "100%", t.height = "100%";
          var r = "0px 0px 0px";
          t.transformOrigin = r, t.mozTransformOrigin = r, t.webkitTransformOrigin = r, t["-webkit-transform"] = r, t.contentVisibility = this.renderConfig.contentVisibility, this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d"), this.renderConfig.className && this.animationItem.container.setAttribute("class", this.renderConfig.className), this.renderConfig.id && this.animationItem.container.setAttribute("id", this.renderConfig.id);
        } else
          this.canvasContext = this.renderConfig.context;
        this.contextData.setContext(this.canvasContext), this.data = e, this.layers = e.layers, this.transformCanvas = {
          w: e.w,
          h: e.h,
          sx: 0,
          sy: 0,
          tx: 0,
          ty: 0
        }, this.setupGlobalData(e, document.body), this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.transformCanvas = this.transformCanvas, this.elements = createSizedArray(e.layers.length), this.updateContainerSize();
      }, CanvasRendererBase.prototype.updateContainerSize = function(e, t) {
        this.reset();
        var r, i;
        e ? (r = e, i = t, this.canvasContext.canvas.width = r, this.canvasContext.canvas.height = i) : (this.animationItem.wrapper && this.animationItem.container ? (r = this.animationItem.wrapper.offsetWidth, i = this.animationItem.wrapper.offsetHeight) : (r = this.canvasContext.canvas.width, i = this.canvasContext.canvas.height), this.canvasContext.canvas.width = r * this.renderConfig.dpr, this.canvasContext.canvas.height = i * this.renderConfig.dpr);
        var n, s;
        if (this.renderConfig.preserveAspectRatio.indexOf("meet") !== -1 || this.renderConfig.preserveAspectRatio.indexOf("slice") !== -1) {
          var a = this.renderConfig.preserveAspectRatio.split(" "), l = a[1] || "meet", o = a[0] || "xMidYMid", f = o.substr(0, 4), c = o.substr(4);
          n = r / i, s = this.transformCanvas.w / this.transformCanvas.h, s > n && l === "meet" || s < n && l === "slice" ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = r / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr)), f === "xMid" && (s < n && l === "meet" || s > n && l === "slice") ? this.transformCanvas.tx = (r - this.transformCanvas.w * (i / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : f === "xMax" && (s < n && l === "meet" || s > n && l === "slice") ? this.transformCanvas.tx = (r - this.transformCanvas.w * (i / this.transformCanvas.h)) * this.renderConfig.dpr : this.transformCanvas.tx = 0, c === "YMid" && (s > n && l === "meet" || s < n && l === "slice") ? this.transformCanvas.ty = (i - this.transformCanvas.h * (r / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : c === "YMax" && (s > n && l === "meet" || s < n && l === "slice") ? this.transformCanvas.ty = (i - this.transformCanvas.h * (r / this.transformCanvas.w)) * this.renderConfig.dpr : this.transformCanvas.ty = 0;
        } else this.renderConfig.preserveAspectRatio === "none" ? (this.transformCanvas.sx = r / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = i / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
        this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1], this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip(), this.renderFrame(this.renderedFrame, !0);
      }, CanvasRendererBase.prototype.destroy = function() {
        this.renderConfig.clearCanvas && this.animationItem.wrapper && (this.animationItem.wrapper.innerText = "");
        var e, t = this.layers ? this.layers.length : 0;
        for (e = t - 1; e >= 0; e -= 1)
          this.elements[e] && this.elements[e].destroy && this.elements[e].destroy();
        this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0;
      }, CanvasRendererBase.prototype.renderFrame = function(e, t) {
        if (!(this.renderedFrame === e && this.renderConfig.clearCanvas === !0 && !t || this.destroyed || e === -1)) {
          this.renderedFrame = e, this.globalData.frameNum = e - this.animationItem._isFirstFrame, this.globalData.frameId += 1, this.globalData._mdf = !this.renderConfig.clearCanvas || t, this.globalData.projectInterface.currentFrame = e;
          var r, i = this.layers.length;
          for (this.completeLayers || this.checkLayers(e), r = i - 1; r >= 0; r -= 1)
            (this.completeLayers || this.elements[r]) && this.elements[r].prepareFrame(e - this.layers[r].st);
          if (this.globalData._mdf) {
            for (this.renderConfig.clearCanvas === !0 ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h) : this.save(), r = i - 1; r >= 0; r -= 1)
              (this.completeLayers || this.elements[r]) && this.elements[r].renderFrame();
            this.renderConfig.clearCanvas !== !0 && this.restore();
          }
        }
      }, CanvasRendererBase.prototype.buildItem = function(e) {
        var t = this.elements;
        if (!(t[e] || this.layers[e].ty === 99)) {
          var r = this.createItem(this.layers[e], this, this.globalData);
          t[e] = r, r.initExpressions();
        }
      }, CanvasRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var e = this.pendingElements.pop();
          e.checkParenting();
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
        var e, t = 15;
        for (e = 0; e < t; e += 1) {
          var r = new CanvasContext();
          this.stack[e] = r;
        }
        this._length = t, this.nativeContext = null, this.transformMat = new Matrix(), this.currentOpacity = 1, this.currentFillStyle = "", this.appliedFillStyle = "", this.currentStrokeStyle = "", this.appliedStrokeStyle = "", this.currentLineWidth = "", this.appliedLineWidth = "", this.currentLineCap = "", this.appliedLineCap = "", this.currentLineJoin = "", this.appliedLineJoin = "", this.appliedMiterLimit = "", this.currentMiterLimit = "";
      }
      CVContextData.prototype.duplicate = function() {
        var e = this._length * 2, t = 0;
        for (t = this._length; t < e; t += 1)
          this.stack[t] = new CanvasContext();
        this._length = e;
      }, CVContextData.prototype.reset = function() {
        this.cArrPos = 0, this.cTr.reset(), this.stack[this.cArrPos].opacity = 1;
      }, CVContextData.prototype.restore = function(e) {
        this.cArrPos -= 1;
        var t = this.stack[this.cArrPos], r = t.transform, i, n = this.cTr.props;
        for (i = 0; i < 16; i += 1)
          n[i] = r[i];
        if (e) {
          this.nativeContext.restore();
          var s = this.stack[this.cArrPos + 1];
          this.appliedFillStyle = s.fillStyle, this.appliedStrokeStyle = s.strokeStyle, this.appliedLineWidth = s.lineWidth, this.appliedLineCap = s.lineCap, this.appliedLineJoin = s.lineJoin, this.appliedMiterLimit = s.miterLimit;
        }
        this.nativeContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]), (e || t.opacity !== -1 && this.currentOpacity !== t.opacity) && (this.nativeContext.globalAlpha = t.opacity, this.currentOpacity = t.opacity), this.currentFillStyle = t.fillStyle, this.currentStrokeStyle = t.strokeStyle, this.currentLineWidth = t.lineWidth, this.currentLineCap = t.lineCap, this.currentLineJoin = t.lineJoin, this.currentMiterLimit = t.miterLimit;
      }, CVContextData.prototype.save = function(e) {
        e && this.nativeContext.save();
        var t = this.cTr.props;
        this._length <= this.cArrPos && this.duplicate();
        var r = this.stack[this.cArrPos], i;
        for (i = 0; i < 16; i += 1)
          r.transform[i] = t[i];
        this.cArrPos += 1;
        var n = this.stack[this.cArrPos];
        n.opacity = r.opacity, n.fillStyle = r.fillStyle, n.strokeStyle = r.strokeStyle, n.lineWidth = r.lineWidth, n.lineCap = r.lineCap, n.lineJoin = r.lineJoin, n.miterLimit = r.miterLimit;
      }, CVContextData.prototype.setOpacity = function(e) {
        this.stack[this.cArrPos].opacity = e;
      }, CVContextData.prototype.setContext = function(e) {
        this.nativeContext = e;
      }, CVContextData.prototype.fillStyle = function(e) {
        this.stack[this.cArrPos].fillStyle !== e && (this.currentFillStyle = e, this.stack[this.cArrPos].fillStyle = e);
      }, CVContextData.prototype.strokeStyle = function(e) {
        this.stack[this.cArrPos].strokeStyle !== e && (this.currentStrokeStyle = e, this.stack[this.cArrPos].strokeStyle = e);
      }, CVContextData.prototype.lineWidth = function(e) {
        this.stack[this.cArrPos].lineWidth !== e && (this.currentLineWidth = e, this.stack[this.cArrPos].lineWidth = e);
      }, CVContextData.prototype.lineCap = function(e) {
        this.stack[this.cArrPos].lineCap !== e && (this.currentLineCap = e, this.stack[this.cArrPos].lineCap = e);
      }, CVContextData.prototype.lineJoin = function(e) {
        this.stack[this.cArrPos].lineJoin !== e && (this.currentLineJoin = e, this.stack[this.cArrPos].lineJoin = e);
      }, CVContextData.prototype.miterLimit = function(e) {
        this.stack[this.cArrPos].miterLimit !== e && (this.currentMiterLimit = e, this.stack[this.cArrPos].miterLimit = e);
      }, CVContextData.prototype.transform = function(e) {
        this.transformMat.cloneFromProps(e);
        var t = this.cTr;
        this.transformMat.multiply(t), t.cloneFromProps(this.transformMat.props);
        var r = t.props;
        this.nativeContext.setTransform(r[0], r[1], r[4], r[5], r[12], r[13]);
      }, CVContextData.prototype.opacity = function(e) {
        var t = this.stack[this.cArrPos].opacity;
        t *= e < 0 ? 0 : e, this.stack[this.cArrPos].opacity !== t && (this.currentOpacity !== e && (this.nativeContext.globalAlpha = e, this.currentOpacity = e), this.stack[this.cArrPos].opacity = t);
      }, CVContextData.prototype.fill = function(e) {
        this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle, this.nativeContext.fillStyle = this.appliedFillStyle), this.nativeContext.fill(e);
      }, CVContextData.prototype.fillRect = function(e, t, r, i) {
        this.appliedFillStyle !== this.currentFillStyle && (this.appliedFillStyle = this.currentFillStyle, this.nativeContext.fillStyle = this.appliedFillStyle), this.nativeContext.fillRect(e, t, r, i);
      }, CVContextData.prototype.stroke = function() {
        this.appliedStrokeStyle !== this.currentStrokeStyle && (this.appliedStrokeStyle = this.currentStrokeStyle, this.nativeContext.strokeStyle = this.appliedStrokeStyle), this.appliedLineWidth !== this.currentLineWidth && (this.appliedLineWidth = this.currentLineWidth, this.nativeContext.lineWidth = this.appliedLineWidth), this.appliedLineCap !== this.currentLineCap && (this.appliedLineCap = this.currentLineCap, this.nativeContext.lineCap = this.appliedLineCap), this.appliedLineJoin !== this.currentLineJoin && (this.appliedLineJoin = this.currentLineJoin, this.nativeContext.lineJoin = this.appliedLineJoin), this.appliedMiterLimit !== this.currentMiterLimit && (this.appliedMiterLimit = this.currentMiterLimit, this.nativeContext.miterLimit = this.appliedMiterLimit), this.nativeContext.stroke();
      };
      function CVCompElement(e, t, r) {
        this.completeLayers = !1, this.layers = e.layers, this.pendingElements = [], this.elements = createSizedArray(this.layers.length), this.initElement(e, t, r), this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement), CVCompElement.prototype.renderInnerContent = function() {
        var e = this.canvasContext;
        e.beginPath(), e.moveTo(0, 0), e.lineTo(this.data.w, 0), e.lineTo(this.data.w, this.data.h), e.lineTo(0, this.data.h), e.lineTo(0, 0), e.clip();
        var t, r = this.layers.length;
        for (t = r - 1; t >= 0; t -= 1)
          (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
      }, CVCompElement.prototype.destroy = function() {
        var e, t = this.layers.length;
        for (e = t - 1; e >= 0; e -= 1)
          this.elements[e] && this.elements[e].destroy();
        this.layers = null, this.elements = null;
      }, CVCompElement.prototype.createComp = function(e) {
        return new CVCompElement(e, this.globalData, this);
      };
      function CanvasRenderer(e, t) {
        this.animationItem = e, this.renderConfig = {
          clearCanvas: t && t.clearCanvas !== void 0 ? t.clearCanvas : !0,
          context: t && t.context || null,
          progressiveLoad: t && t.progressiveLoad || !1,
          preserveAspectRatio: t && t.preserveAspectRatio || "xMidYMid meet",
          imagePreserveAspectRatio: t && t.imagePreserveAspectRatio || "xMidYMid slice",
          contentVisibility: t && t.contentVisibility || "visible",
          className: t && t.className || "",
          id: t && t.id || "",
          runExpressions: !t || t.runExpressions === void 0 || t.runExpressions
        }, this.renderConfig.dpr = t && t.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = t && t.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
          frameNum: -1,
          _mdf: !1,
          renderConfig: this.renderConfig,
          currentGlobalAlpha: -1
        }, this.contextData = new CVContextData(), this.elements = [], this.pendingElements = [], this.transformMat = new Matrix(), this.completeLayers = !1, this.rendererType = "canvas", this.renderConfig.clearCanvas && (this.ctxTransform = this.contextData.transform.bind(this.contextData), this.ctxOpacity = this.contextData.opacity.bind(this.contextData), this.ctxFillStyle = this.contextData.fillStyle.bind(this.contextData), this.ctxStrokeStyle = this.contextData.strokeStyle.bind(this.contextData), this.ctxLineWidth = this.contextData.lineWidth.bind(this.contextData), this.ctxLineCap = this.contextData.lineCap.bind(this.contextData), this.ctxLineJoin = this.contextData.lineJoin.bind(this.contextData), this.ctxMiterLimit = this.contextData.miterLimit.bind(this.contextData), this.ctxFill = this.contextData.fill.bind(this.contextData), this.ctxFillRect = this.contextData.fillRect.bind(this.contextData), this.ctxStroke = this.contextData.stroke.bind(this.contextData), this.save = this.contextData.save.bind(this.contextData));
      }
      extendPrototype([CanvasRendererBase], CanvasRenderer), CanvasRenderer.prototype.createComp = function(e) {
        return new CVCompElement(e, this.globalData, this);
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
          var t = this.transformedElement ? this.transformedElement.style : {};
          if (this.finalTransform._matMdf) {
            var r = this.finalTransform.mat.toCSS();
            t.transform = r, t.webkitTransform = r;
          }
          this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v);
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
      function HSolidElement(e, t, r) {
        this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement), HSolidElement.prototype.createContent = function() {
        var e;
        this.data.hasMask ? (e = createNS("rect"), e.setAttribute("width", this.data.sw), e.setAttribute("height", this.data.sh), e.setAttribute("fill", this.data.sc), this.svgElement.setAttribute("width", this.data.sw), this.svgElement.setAttribute("height", this.data.sh)) : (e = createTag("div"), e.style.width = this.data.sw + "px", e.style.height = this.data.sh + "px", e.style.backgroundColor = this.data.sc), this.layerElement.appendChild(e);
      };
      function HShapeElement(e, t, r) {
        this.shapes = [], this.shapesData = e.shapes, this.stylesList = [], this.shapeModifiers = [], this.itemsData = [], this.processedElements = [], this.animatedContents = [], this.shapesContainer = createNS("g"), this.initElement(e, t, r), this.prevViewData = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        };
      }
      extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement), HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent, HShapeElement.prototype.createContent = function() {
        var e;
        if (this.baseElement.style.fontSize = 0, this.data.hasMask)
          this.layerElement.appendChild(this.shapesContainer), e = this.svgElement;
        else {
          e = createNS("svg");
          var t = this.comp.data ? this.comp.data : this.globalData.compSize;
          e.setAttribute("width", t.w), e.setAttribute("height", t.h), e.appendChild(this.shapesContainer), this.layerElement.appendChild(e);
        }
        this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0), this.filterUniqueShapes(), this.shapeCont = e;
      }, HShapeElement.prototype.getTransformedPoint = function(e, t) {
        var r, i = e.length;
        for (r = 0; r < i; r += 1)
          t = e[r].mProps.v.applyToPointArray(t[0], t[1], 0);
        return t;
      }, HShapeElement.prototype.calculateShapeBoundingBox = function(e, t) {
        var r = e.sh.v, i = e.transformers, n, s = r._length, a, l, o, f;
        if (!(s <= 1)) {
          for (n = 0; n < s - 1; n += 1)
            a = this.getTransformedPoint(i, r.v[n]), l = this.getTransformedPoint(i, r.o[n]), o = this.getTransformedPoint(i, r.i[n + 1]), f = this.getTransformedPoint(i, r.v[n + 1]), this.checkBounds(a, l, o, f, t);
          r.c && (a = this.getTransformedPoint(i, r.v[n]), l = this.getTransformedPoint(i, r.o[n]), o = this.getTransformedPoint(i, r.i[0]), f = this.getTransformedPoint(i, r.v[0]), this.checkBounds(a, l, o, f, t));
        }
      }, HShapeElement.prototype.checkBounds = function(e, t, r, i, n) {
        this.getBoundsOfCurve(e, t, r, i);
        var s = this.shapeBoundingBox;
        n.x = bmMin(s.left, n.x), n.xMax = bmMax(s.right, n.xMax), n.y = bmMin(s.top, n.y), n.yMax = bmMax(s.bottom, n.yMax);
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
      }, HShapeElement.prototype.getBoundsOfCurve = function(e, t, r, i) {
        for (var n = [[e[0], i[0]], [e[1], i[1]]], s, a, l, o, f, c, v, h = 0; h < 2; ++h)
          a = 6 * e[h] - 12 * t[h] + 6 * r[h], s = -3 * e[h] + 9 * t[h] - 9 * r[h] + 3 * i[h], l = 3 * t[h] - 3 * e[h], a |= 0, s |= 0, l |= 0, s === 0 && a === 0 || (s === 0 ? (o = -l / a, o > 0 && o < 1 && n[h].push(this.calculateF(o, e, t, r, i, h))) : (f = a * a - 4 * l * s, f >= 0 && (c = (-a + bmSqrt(f)) / (2 * s), c > 0 && c < 1 && n[h].push(this.calculateF(c, e, t, r, i, h)), v = (-a - bmSqrt(f)) / (2 * s), v > 0 && v < 1 && n[h].push(this.calculateF(v, e, t, r, i, h)))));
        this.shapeBoundingBox.left = bmMin.apply(null, n[0]), this.shapeBoundingBox.top = bmMin.apply(null, n[1]), this.shapeBoundingBox.right = bmMax.apply(null, n[0]), this.shapeBoundingBox.bottom = bmMax.apply(null, n[1]);
      }, HShapeElement.prototype.calculateF = function(e, t, r, i, n, s) {
        return bmPow(1 - e, 3) * t[s] + 3 * bmPow(1 - e, 2) * e * r[s] + 3 * (1 - e) * bmPow(e, 2) * i[s] + bmPow(e, 3) * n[s];
      }, HShapeElement.prototype.calculateBoundingBox = function(e, t) {
        var r, i = e.length;
        for (r = 0; r < i; r += 1)
          e[r] && e[r].sh ? this.calculateShapeBoundingBox(e[r], t) : e[r] && e[r].it ? this.calculateBoundingBox(e[r].it, t) : e[r] && e[r].style && e[r].w && this.expandStrokeBoundingBox(e[r].w, t);
      }, HShapeElement.prototype.expandStrokeBoundingBox = function(e, t) {
        var r = 0;
        if (e.keyframes) {
          for (var i = 0; i < e.keyframes.length; i += 1) {
            var n = e.keyframes[i].s;
            n > r && (r = n);
          }
          r *= e.mult;
        } else
          r = e.v * e.mult;
        t.x -= r, t.xMax += r, t.y -= r, t.yMax += r;
      }, HShapeElement.prototype.currentBoxContains = function(e) {
        return this.currentBBox.x <= e.x && this.currentBBox.y <= e.y && this.currentBBox.width + this.currentBBox.x >= e.x + e.width && this.currentBBox.height + this.currentBBox.y >= e.y + e.height;
      }, HShapeElement.prototype.renderInnerContent = function() {
        if (this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf)) {
          var e = this.tempBoundingBox, t = 999999;
          if (e.x = t, e.xMax = -t, e.y = t, e.yMax = -t, this.calculateBoundingBox(this.itemsData, e), e.width = e.xMax < e.x ? 0 : e.xMax - e.x, e.height = e.yMax < e.y ? 0 : e.yMax - e.y, this.currentBoxContains(e))
            return;
          var r = !1;
          if (this.currentBBox.w !== e.width && (this.currentBBox.w = e.width, this.shapeCont.setAttribute("width", e.width), r = !0), this.currentBBox.h !== e.height && (this.currentBBox.h = e.height, this.shapeCont.setAttribute("height", e.height), r = !0), r || this.currentBBox.x !== e.x || this.currentBBox.y !== e.y) {
            this.currentBBox.w = e.width, this.currentBBox.h = e.height, this.currentBBox.x = e.x, this.currentBBox.y = e.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
            var i = this.shapeCont.style, n = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
            i.transform = n, i.webkitTransform = n;
          }
        }
      };
      function HTextElement(e, t, r) {
        this.textSpans = [], this.textPaths = [], this.currentBBox = {
          x: 999999,
          y: -999999,
          h: 0,
          w: 0
        }, this.renderType = "svg", this.isMasked = !1, this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement), HTextElement.prototype.createContent = function() {
        if (this.isMasked = this.checkMasks(), this.isMasked) {
          this.renderType = "svg", this.compW = this.comp.data.w, this.compH = this.comp.data.h, this.svgElement.setAttribute("width", this.compW), this.svgElement.setAttribute("height", this.compH);
          var e = createNS("g");
          this.maskedElement.appendChild(e), this.innerElem = e;
        } else
          this.renderType = "html", this.innerElem = this.layerElement;
        this.checkParenting();
      }, HTextElement.prototype.buildNewText = function() {
        var e = this.textProperty.currentData;
        this.renderedLetters = createSizedArray(e.l ? e.l.length : 0);
        var t = this.innerElem.style, r = e.fc ? this.buildColor(e.fc) : "rgba(0,0,0,0)";
        t.fill = r, t.color = r, e.sc && (t.stroke = this.buildColor(e.sc), t.strokeWidth = e.sw + "px");
        var i = this.globalData.fontManager.getFontByName(e.f);
        if (!this.globalData.fontManager.chars)
          if (t.fontSize = e.finalSize + "px", t.lineHeight = e.finalSize + "px", i.fClass)
            this.innerElem.className = i.fClass;
          else {
            t.fontFamily = i.fFamily;
            var n = e.fWeight, s = e.fStyle;
            t.fontStyle = s, t.fontWeight = n;
          }
        var a, l, o = e.l;
        l = o.length;
        var f, c, v, h = this.mHelper, g, m = "", p = 0;
        for (a = 0; a < l; a += 1) {
          if (this.globalData.fontManager.chars ? (this.textPaths[p] ? f = this.textPaths[p] : (f = createNS("path"), f.setAttribute("stroke-linecap", lineCapEnum[1]), f.setAttribute("stroke-linejoin", lineJoinEnum[2]), f.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[p] ? (c = this.textSpans[p], v = c.children[0]) : (c = createTag("div"), c.style.lineHeight = 0, v = createNS("svg"), v.appendChild(f), styleDiv(c)))) : this.isMasked ? f = this.textPaths[p] ? this.textPaths[p] : createNS("text") : this.textSpans[p] ? (c = this.textSpans[p], f = this.textPaths[p]) : (c = createTag("span"), styleDiv(c), f = createTag("span"), styleDiv(f), c.appendChild(f)), this.globalData.fontManager.chars) {
            var b = this.globalData.fontManager.getCharData(e.finalText[a], i.fStyle, this.globalData.fontManager.getFontByName(e.f).fFamily), u;
            if (b ? u = b.data : u = null, h.reset(), u && u.shapes && u.shapes.length && (g = u.shapes[0].it, h.scale(e.finalSize / 100, e.finalSize / 100), m = this.createPathShape(h, g), f.setAttribute("d", m)), this.isMasked)
              this.innerElem.appendChild(f);
            else {
              if (this.innerElem.appendChild(c), u && u.shapes) {
                document.body.appendChild(v);
                var y = v.getBBox();
                v.setAttribute("width", y.width + 2), v.setAttribute("height", y.height + 2), v.setAttribute("viewBox", y.x - 1 + " " + (y.y - 1) + " " + (y.width + 2) + " " + (y.height + 2));
                var d = v.style, E = "translate(" + (y.x - 1) + "px," + (y.y - 1) + "px)";
                d.transform = E, d.webkitTransform = E, o[a].yOffset = y.y - 1;
              } else
                v.setAttribute("width", 1), v.setAttribute("height", 1);
              c.appendChild(v);
            }
          } else if (f.textContent = o[a].val, f.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked)
            this.innerElem.appendChild(f);
          else {
            this.innerElem.appendChild(c);
            var S = f.style, C = "translate3d(0," + -e.finalSize / 1.2 + "px,0)";
            S.transform = C, S.webkitTransform = C;
          }
          this.isMasked ? this.textSpans[p] = f : this.textSpans[p] = c, this.textSpans[p].style.display = "block", this.textPaths[p] = f, p += 1;
        }
        for (; p < this.textSpans.length; )
          this.textSpans[p].style.display = "none", p += 1;
      }, HTextElement.prototype.renderInnerContent = function() {
        this.validateText();
        var e;
        if (this.data.singleShape) {
          if (!this._isFirstFrame && !this.lettersChangedFlag)
            return;
          if (this.isMasked && this.finalTransform._matMdf) {
            this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), e = this.svgElement.style;
            var t = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
            e.transform = t, e.webkitTransform = t;
          }
        }
        if (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag), !(!this.lettersChangedFlag && !this.textAnimator.lettersChangedFlag)) {
          var r, i, n = 0, s = this.textAnimator.renderedLetters, a = this.textProperty.currentData.l;
          i = a.length;
          var l, o, f;
          for (r = 0; r < i; r += 1)
            a[r].n ? n += 1 : (o = this.textSpans[r], f = this.textPaths[r], l = s[n], n += 1, l._mdf.m && (this.isMasked ? o.setAttribute("transform", l.m) : (o.style.webkitTransform = l.m, o.style.transform = l.m)), o.style.opacity = l.o, l.sw && l._mdf.sw && f.setAttribute("stroke-width", l.sw), l.sc && l._mdf.sc && f.setAttribute("stroke", l.sc), l.fc && l._mdf.fc && (f.setAttribute("fill", l.fc), f.style.color = l.fc));
          if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
            var c = this.innerElem.getBBox();
            this.currentBBox.w !== c.width && (this.currentBBox.w = c.width, this.svgElement.setAttribute("width", c.width)), this.currentBBox.h !== c.height && (this.currentBBox.h = c.height, this.svgElement.setAttribute("height", c.height));
            var v = 1;
            if (this.currentBBox.w !== c.width + v * 2 || this.currentBBox.h !== c.height + v * 2 || this.currentBBox.x !== c.x - v || this.currentBBox.y !== c.y - v) {
              this.currentBBox.w = c.width + v * 2, this.currentBBox.h = c.height + v * 2, this.currentBBox.x = c.x - v, this.currentBBox.y = c.y - v, this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), e = this.svgElement.style;
              var h = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
              e.transform = h, e.webkitTransform = h;
            }
          }
        }
      };
      function HCameraElement(e, t, r) {
        this.initFrame(), this.initBaseData(e, t, r), this.initHierarchy();
        var i = PropertyFactory.getProp;
        if (this.pe = i(this, e.pe, 0, 0, this), e.ks.p.s ? (this.px = i(this, e.ks.p.x, 1, 0, this), this.py = i(this, e.ks.p.y, 1, 0, this), this.pz = i(this, e.ks.p.z, 1, 0, this)) : this.p = i(this, e.ks.p, 1, 0, this), e.ks.a && (this.a = i(this, e.ks.a, 1, 0, this)), e.ks.or.k.length && e.ks.or.k[0].to) {
          var n, s = e.ks.or.k.length;
          for (n = 0; n < s; n += 1)
            e.ks.or.k[n].to = null, e.ks.or.k[n].ti = null;
        }
        this.or = i(this, e.ks.or, 1, degToRads, this), this.or.sh = !0, this.rx = i(this, e.ks.rx, 0, degToRads, this), this.ry = i(this, e.ks.ry, 0, degToRads, this), this.rz = i(this, e.ks.rz, 0, degToRads, this), this.mat = new Matrix(), this._prevMat = new Matrix(), this._isFirstFrame = !0, this.finalTransform = {
          mProp: this
        };
      }
      extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement), HCameraElement.prototype.setup = function() {
        var e, t = this.comp.threeDElements.length, r, i, n;
        for (e = 0; e < t; e += 1)
          if (r = this.comp.threeDElements[e], r.type === "3d") {
            i = r.perspectiveElem.style, n = r.container.style;
            var s = this.pe.v + "px", a = "0px 0px 0px", l = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
            i.perspective = s, i.webkitPerspective = s, n.transformOrigin = a, n.mozTransformOrigin = a, n.webkitTransformOrigin = a, i.transform = l, i.webkitTransform = l;
          }
      }, HCameraElement.prototype.createElements = function() {
      }, HCameraElement.prototype.hide = function() {
      }, HCameraElement.prototype.renderFrame = function() {
        var e = this._isFirstFrame, t, r;
        if (this.hierarchy)
          for (r = this.hierarchy.length, t = 0; t < r; t += 1)
            e = this.hierarchy[t].finalTransform.mProp._mdf || e;
        if (e || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
          if (this.mat.reset(), this.hierarchy)
            for (r = this.hierarchy.length - 1, t = r; t >= 0; t -= 1) {
              var i = this.hierarchy[t].finalTransform.mProp;
              this.mat.translate(-i.p.v[0], -i.p.v[1], i.p.v[2]), this.mat.rotateX(-i.or.v[0]).rotateY(-i.or.v[1]).rotateZ(i.or.v[2]), this.mat.rotateX(-i.rx.v).rotateY(-i.ry.v).rotateZ(i.rz.v), this.mat.scale(1 / i.s.v[0], 1 / i.s.v[1], 1 / i.s.v[2]), this.mat.translate(i.a.v[0], i.a.v[1], i.a.v[2]);
            }
          if (this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
            var n;
            this.p ? n = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]] : n = [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
            var s = Math.sqrt(Math.pow(n[0], 2) + Math.pow(n[1], 2) + Math.pow(n[2], 2)), a = [n[0] / s, n[1] / s, n[2] / s], l = Math.sqrt(a[2] * a[2] + a[0] * a[0]), o = Math.atan2(a[1], l), f = Math.atan2(a[0], -a[2]);
            this.mat.rotateY(f).rotateX(-o);
          }
          this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v);
          var c = !this._prevMat.equals(this.mat);
          if ((c || this.pe._mdf) && this.comp.threeDElements) {
            r = this.comp.threeDElements.length;
            var v, h, g;
            for (t = 0; t < r; t += 1)
              if (v = this.comp.threeDElements[t], v.type === "3d") {
                if (c) {
                  var m = this.mat.toCSS();
                  g = v.container.style, g.transform = m, g.webkitTransform = m;
                }
                this.pe._mdf && (h = v.perspectiveElem.style, h.perspective = this.pe.v + "px", h.webkitPerspective = this.pe.v + "px");
              }
            this.mat.clone(this._prevMat);
          }
        }
        this._isFirstFrame = !1;
      }, HCameraElement.prototype.prepareFrame = function(e) {
        this.prepareProperties(e, !0);
      }, HCameraElement.prototype.destroy = function() {
      }, HCameraElement.prototype.getBaseElement = function() {
        return null;
      };
      function HImageElement(e, t, r) {
        this.assetData = t.getAssetData(e.refId), this.initElement(e, t, r);
      }
      extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement), HImageElement.prototype.createContent = function() {
        var e = this.globalData.getAssetsPath(this.assetData), t = new Image();
        this.data.hasMask ? (this.imageElem = createNS("image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", e), this.layerElement.appendChild(this.imageElem), this.baseElement.setAttribute("width", this.assetData.w), this.baseElement.setAttribute("height", this.assetData.h)) : this.layerElement.appendChild(t), t.crossOrigin = "anonymous", t.src = e, this.data.ln && this.baseElement.setAttribute("id", this.data.ln);
      };
      function HybridRendererBase(e, t) {
        this.animationItem = e, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
          className: t && t.className || "",
          imagePreserveAspectRatio: t && t.imagePreserveAspectRatio || "xMidYMid slice",
          hideOnTransparent: !(t && t.hideOnTransparent === !1),
          filterSize: {
            width: t && t.filterSize && t.filterSize.width || "400%",
            height: t && t.filterSize && t.filterSize.height || "400%",
            x: t && t.filterSize && t.filterSize.x || "-100%",
            y: t && t.filterSize && t.filterSize.y || "-100%"
          }
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
      }
      extendPrototype([BaseRenderer], HybridRendererBase), HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRendererBase.prototype.checkPendingElements = function() {
        for (; this.pendingElements.length; ) {
          var e = this.pendingElements.pop();
          e.checkParenting();
        }
      }, HybridRendererBase.prototype.appendElementInPos = function(e, t) {
        var r = e.getBaseElement();
        if (r) {
          var i = this.layers[t];
          if (!i.ddd || !this.supports3d)
            if (this.threeDElements)
              this.addTo3dContainer(r, t);
            else {
              for (var n = 0, s, a, l; n < t; )
                this.elements[n] && this.elements[n] !== !0 && this.elements[n].getBaseElement && (a = this.elements[n], l = this.layers[n].ddd ? this.getThreeDContainerByPos(n) : a.getBaseElement(), s = l || s), n += 1;
              s ? (!i.ddd || !this.supports3d) && this.layerElement.insertBefore(r, s) : (!i.ddd || !this.supports3d) && this.layerElement.appendChild(r);
            }
          else
            this.addTo3dContainer(r, t);
        }
      }, HybridRendererBase.prototype.createShape = function(e) {
        return this.supports3d ? new HShapeElement(e, this.globalData, this) : new SVGShapeElement(e, this.globalData, this);
      }, HybridRendererBase.prototype.createText = function(e) {
        return this.supports3d ? new HTextElement(e, this.globalData, this) : new SVGTextLottieElement(e, this.globalData, this);
      }, HybridRendererBase.prototype.createCamera = function(e) {
        return this.camera = new HCameraElement(e, this.globalData, this), this.camera;
      }, HybridRendererBase.prototype.createImage = function(e) {
        return this.supports3d ? new HImageElement(e, this.globalData, this) : new IImageElement(e, this.globalData, this);
      }, HybridRendererBase.prototype.createSolid = function(e) {
        return this.supports3d ? new HSolidElement(e, this.globalData, this) : new ISolidElement(e, this.globalData, this);
      }, HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull, HybridRendererBase.prototype.getThreeDContainerByPos = function(e) {
        for (var t = 0, r = this.threeDElements.length; t < r; ) {
          if (this.threeDElements[t].startPos <= e && this.threeDElements[t].endPos >= e)
            return this.threeDElements[t].perspectiveElem;
          t += 1;
        }
        return null;
      }, HybridRendererBase.prototype.createThreeDContainer = function(e, t) {
        var r = createTag("div"), i, n;
        styleDiv(r);
        var s = createTag("div");
        if (styleDiv(s), t === "3d") {
          i = r.style, i.width = this.globalData.compSize.w + "px", i.height = this.globalData.compSize.h + "px";
          var a = "50% 50%";
          i.webkitTransformOrigin = a, i.mozTransformOrigin = a, i.transformOrigin = a, n = s.style;
          var l = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
          n.transform = l, n.webkitTransform = l;
        }
        r.appendChild(s);
        var o = {
          container: s,
          perspectiveElem: r,
          startPos: e,
          endPos: e,
          type: t
        };
        return this.threeDElements.push(o), o;
      }, HybridRendererBase.prototype.build3dContainers = function() {
        var e, t = this.layers.length, r, i = "";
        for (e = 0; e < t; e += 1)
          this.layers[e].ddd && this.layers[e].ty !== 3 ? (i !== "3d" && (i = "3d", r = this.createThreeDContainer(e, "3d")), r.endPos = Math.max(r.endPos, e)) : (i !== "2d" && (i = "2d", r = this.createThreeDContainer(e, "2d")), r.endPos = Math.max(r.endPos, e));
        for (t = this.threeDElements.length, e = t - 1; e >= 0; e -= 1)
          this.resizerElem.appendChild(this.threeDElements[e].perspectiveElem);
      }, HybridRendererBase.prototype.addTo3dContainer = function(e, t) {
        for (var r = 0, i = this.threeDElements.length; r < i; ) {
          if (t <= this.threeDElements[r].endPos) {
            for (var n = this.threeDElements[r].startPos, s; n < t; )
              this.elements[n] && this.elements[n].getBaseElement && (s = this.elements[n].getBaseElement()), n += 1;
            s ? this.threeDElements[r].container.insertBefore(e, s) : this.threeDElements[r].container.appendChild(e);
            break;
          }
          r += 1;
        }
      }, HybridRendererBase.prototype.configAnimation = function(e) {
        var t = createTag("div"), r = this.animationItem.wrapper, i = t.style;
        i.width = e.w + "px", i.height = e.h + "px", this.resizerElem = t, styleDiv(t), i.transformStyle = "flat", i.mozTransformStyle = "flat", i.webkitTransformStyle = "flat", this.renderConfig.className && t.setAttribute("class", this.renderConfig.className), r.appendChild(t), i.overflow = "hidden";
        var n = createNS("svg");
        n.setAttribute("width", "1"), n.setAttribute("height", "1"), styleDiv(n), this.resizerElem.appendChild(n);
        var s = createNS("defs");
        n.appendChild(s), this.data = e, this.setupGlobalData(e, n), this.globalData.defs = s, this.layers = e.layers, this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize();
      }, HybridRendererBase.prototype.destroy = function() {
        this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ""), this.animationItem.container = null, this.globalData.defs = null;
        var e, t = this.layers ? this.layers.length : 0;
        for (e = 0; e < t; e += 1)
          this.elements[e] && this.elements[e].destroy && this.elements[e].destroy();
        this.elements.length = 0, this.destroyed = !0, this.animationItem = null;
      }, HybridRendererBase.prototype.updateContainerSize = function() {
        var e = this.animationItem.wrapper.offsetWidth, t = this.animationItem.wrapper.offsetHeight, r = e / t, i = this.globalData.compSize.w / this.globalData.compSize.h, n, s, a, l;
        i > r ? (n = e / this.globalData.compSize.w, s = e / this.globalData.compSize.w, a = 0, l = (t - this.globalData.compSize.h * (e / this.globalData.compSize.w)) / 2) : (n = t / this.globalData.compSize.h, s = t / this.globalData.compSize.h, a = (e - this.globalData.compSize.w * (t / this.globalData.compSize.h)) / 2, l = 0);
        var o = this.resizerElem.style;
        o.webkitTransform = "matrix3d(" + n + ",0,0,0,0," + s + ",0,0,0,0,1,0," + a + "," + l + ",0,1)", o.transform = o.webkitTransform;
      }, HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRendererBase.prototype.hide = function() {
        this.resizerElem.style.display = "none";
      }, HybridRendererBase.prototype.show = function() {
        this.resizerElem.style.display = "block";
      }, HybridRendererBase.prototype.initItems = function() {
        if (this.buildAllItems(), this.camera)
          this.camera.setup();
        else {
          var e = this.globalData.compSize.w, t = this.globalData.compSize.h, r, i = this.threeDElements.length;
          for (r = 0; r < i; r += 1) {
            var n = this.threeDElements[r].perspectiveElem.style;
            n.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) + "px", n.perspective = n.webkitPerspective;
          }
        }
      }, HybridRendererBase.prototype.searchExtraCompositions = function(e) {
        var t, r = e.length, i = createTag("div");
        for (t = 0; t < r; t += 1)
          if (e[t].xt) {
            var n = this.createComp(e[t], i, this.globalData.comp, null);
            n.initExpressions(), this.globalData.projectInterface.registerComposition(n);
          }
      };
      function HCompElement(e, t, r) {
        this.layers = e.layers, this.supports3d = !e.hasMask, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? createSizedArray(this.layers.length) : [], this.initElement(e, t, r), this.tm = e.tm ? PropertyFactory.getProp(this, e.tm, 0, t.frameRate, this) : {
          _placeholder: !0
        };
      }
      extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement), HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements, HCompElement.prototype.createContainerElements = function() {
        this._createBaseContainerElements(), this.data.hasMask ? (this.svgElement.setAttribute("width", this.data.w), this.svgElement.setAttribute("height", this.data.h), this.transformedElement = this.baseElement) : this.transformedElement = this.layerElement;
      }, HCompElement.prototype.addTo3dContainer = function(e, t) {
        for (var r = 0, i; r < t; )
          this.elements[r] && this.elements[r].getBaseElement && (i = this.elements[r].getBaseElement()), r += 1;
        i ? this.layerElement.insertBefore(e, i) : this.layerElement.appendChild(e);
      }, HCompElement.prototype.createComp = function(e) {
        return this.supports3d ? new HCompElement(e, this.globalData, this) : new SVGCompElement(e, this.globalData, this);
      };
      function HybridRenderer(e, t) {
        this.animationItem = e, this.layers = null, this.renderedFrame = -1, this.renderConfig = {
          className: t && t.className || "",
          imagePreserveAspectRatio: t && t.imagePreserveAspectRatio || "xMidYMid slice",
          hideOnTransparent: !(t && t.hideOnTransparent === !1),
          filterSize: {
            width: t && t.filterSize && t.filterSize.width || "400%",
            height: t && t.filterSize && t.filterSize.height || "400%",
            x: t && t.filterSize && t.filterSize.x || "-100%",
            y: t && t.filterSize && t.filterSize.y || "-100%"
          },
          runExpressions: !t || t.runExpressions === void 0 || t.runExpressions
        }, this.globalData = {
          _mdf: !1,
          frameNum: -1,
          renderConfig: this.renderConfig
        }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0, this.rendererType = "html";
      }
      extendPrototype([HybridRendererBase], HybridRenderer), HybridRenderer.prototype.createComp = function(e) {
        return this.supports3d ? new HCompElement(e, this.globalData, this) : new SVGCompElement(e, this.globalData, this);
      };
      var CompExpressionInterface = /* @__PURE__ */ function() {
        return function(e) {
          function t(r) {
            for (var i = 0, n = e.layers.length; i < n; ) {
              if (e.layers[i].nm === r || e.layers[i].ind === r)
                return e.elements[i].layerInterface;
              i += 1;
            }
            return null;
          }
          return Object.defineProperty(t, "_name", {
            value: e.data.nm
          }), t.layer = t, t.pixelAspect = 1, t.height = e.data.h || e.globalData.compSize.h, t.width = e.data.w || e.globalData.compSize.w, t.pixelAspect = 1, t.frameDuration = 1 / e.globalData.frameRate, t.displayStartTime = 0, t.numLayers = e.layers.length, t;
        };
      }();
      function _typeof$2(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$2 = function(r) {
          return typeof r;
        } : _typeof$2 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$2(e);
      }
      function seedRandom(e, t) {
        var r = this, i = 256, n = 6, s = 52, a = "random", l = t.pow(i, n), o = t.pow(2, s), f = o * 2, c = i - 1, v;
        function h(d, E, S) {
          var C = [];
          E = E === !0 ? {
            entropy: !0
          } : E || {};
          var w = b(p(E.entropy ? [d, y(e)] : d === null ? u() : d, 3), C), M = new g(C), O = function() {
            for (var B = M.g(n), L = l, V = 0; B < o; )
              B = (B + V) * i, L *= i, V = M.g(1);
            for (; B >= f; )
              B /= 2, L /= 2, V >>>= 1;
            return (B + V) / L;
          };
          return O.int32 = function() {
            return M.g(4) | 0;
          }, O.quick = function() {
            return M.g(4) / 4294967296;
          }, O.double = O, b(y(M.S), e), (E.pass || S || function(j, B, L, V) {
            return V && (V.S && m(V, M), j.state = function() {
              return m(M, {});
            }), L ? (t[a] = j, B) : j;
          })(O, w, "global" in E ? E.global : this == t, E.state);
        }
        t["seed" + a] = h;
        function g(d) {
          var E, S = d.length, C = this, w = 0, M = C.i = C.j = 0, O = C.S = [];
          for (S || (d = [S++]); w < i; )
            O[w] = w++;
          for (w = 0; w < i; w++)
            O[w] = O[M = c & M + d[w % S] + (E = O[w])], O[M] = E;
          C.g = function(j) {
            for (var B, L = 0, V = C.i, $ = C.j, D = C.S; j--; )
              B = D[V = c & V + 1], L = L * i + D[c & (D[V] = D[$ = c & $ + B]) + (D[$] = B)];
            return C.i = V, C.j = $, L;
          };
        }
        function m(d, E) {
          return E.i = d.i, E.j = d.j, E.S = d.S.slice(), E;
        }
        function p(d, E) {
          var S = [], C = _typeof$2(d), w;
          if (E && C == "object")
            for (w in d)
              try {
                S.push(p(d[w], E - 1));
              } catch {
              }
          return S.length ? S : C == "string" ? d : d + "\0";
        }
        function b(d, E) {
          for (var S = d + "", C, w = 0; w < S.length; )
            E[c & w] = c & (C ^= E[c & w] * 19) + S.charCodeAt(w++);
          return y(E);
        }
        function u() {
          try {
            var d = new Uint8Array(i);
            return (r.crypto || r.msCrypto).getRandomValues(d), y(d);
          } catch {
            var E = r.navigator, S = E && E.plugins;
            return [+/* @__PURE__ */ new Date(), r, S, r.screen, y(e)];
          }
        }
        function y(d) {
          return String.fromCharCode.apply(0, d);
        }
        b(t.random(), e);
      }
      function initialize$2(e) {
        seedRandom([], e);
      }
      var propTypes = {
        SHAPE: "shape"
      };
      function _typeof$1(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof$1 = function(r) {
          return typeof r;
        } : _typeof$1 = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof$1(e);
      }
      var ExpressionManager = function() {
        var ob = {}, Math = BMMath, window = null, document = null, XMLHttpRequest = null, fetch = null, frames = null, _lottieGlobal = {};
        initialize$2(BMMath);
        function resetFrame() {
          _lottieGlobal = {};
        }
        function $bm_isInstanceOfArray(e) {
          return e.constructor === Array || e.constructor === Float32Array;
        }
        function isNumerable(e, t) {
          return e === "number" || t instanceof Number || e === "boolean" || e === "string";
        }
        function $bm_neg(e) {
          var t = _typeof$1(e);
          if (t === "number" || e instanceof Number || t === "boolean")
            return -e;
          if ($bm_isInstanceOfArray(e)) {
            var r, i = e.length, n = [];
            for (r = 0; r < i; r += 1)
              n[r] = -e[r];
            return n;
          }
          return e.propType ? e.v : -e;
        }
        var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get, easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get, easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
        function sum(e, t) {
          var r = _typeof$1(e), i = _typeof$1(t);
          if (isNumerable(r, e) && isNumerable(i, t) || r === "string" || i === "string")
            return e + t;
          if ($bm_isInstanceOfArray(e) && isNumerable(i, t))
            return e = e.slice(0), e[0] += t, e;
          if (isNumerable(r, e) && $bm_isInstanceOfArray(t))
            return t = t.slice(0), t[0] = e + t[0], t;
          if ($bm_isInstanceOfArray(e) && $bm_isInstanceOfArray(t)) {
            for (var n = 0, s = e.length, a = t.length, l = []; n < s || n < a; )
              (typeof e[n] == "number" || e[n] instanceof Number) && (typeof t[n] == "number" || t[n] instanceof Number) ? l[n] = e[n] + t[n] : l[n] = t[n] === void 0 ? e[n] : e[n] || t[n], n += 1;
            return l;
          }
          return 0;
        }
        var add = sum;
        function sub(e, t) {
          var r = _typeof$1(e), i = _typeof$1(t);
          if (isNumerable(r, e) && isNumerable(i, t))
            return r === "string" && (e = parseInt(e, 10)), i === "string" && (t = parseInt(t, 10)), e - t;
          if ($bm_isInstanceOfArray(e) && isNumerable(i, t))
            return e = e.slice(0), e[0] -= t, e;
          if (isNumerable(r, e) && $bm_isInstanceOfArray(t))
            return t = t.slice(0), t[0] = e - t[0], t;
          if ($bm_isInstanceOfArray(e) && $bm_isInstanceOfArray(t)) {
            for (var n = 0, s = e.length, a = t.length, l = []; n < s || n < a; )
              (typeof e[n] == "number" || e[n] instanceof Number) && (typeof t[n] == "number" || t[n] instanceof Number) ? l[n] = e[n] - t[n] : l[n] = t[n] === void 0 ? e[n] : e[n] || t[n], n += 1;
            return l;
          }
          return 0;
        }
        function mul(e, t) {
          var r = _typeof$1(e), i = _typeof$1(t), n;
          if (isNumerable(r, e) && isNumerable(i, t))
            return e * t;
          var s, a;
          if ($bm_isInstanceOfArray(e) && isNumerable(i, t)) {
            for (a = e.length, n = createTypedArray("float32", a), s = 0; s < a; s += 1)
              n[s] = e[s] * t;
            return n;
          }
          if (isNumerable(r, e) && $bm_isInstanceOfArray(t)) {
            for (a = t.length, n = createTypedArray("float32", a), s = 0; s < a; s += 1)
              n[s] = e * t[s];
            return n;
          }
          return 0;
        }
        function div(e, t) {
          var r = _typeof$1(e), i = _typeof$1(t), n;
          if (isNumerable(r, e) && isNumerable(i, t))
            return e / t;
          var s, a;
          if ($bm_isInstanceOfArray(e) && isNumerable(i, t)) {
            for (a = e.length, n = createTypedArray("float32", a), s = 0; s < a; s += 1)
              n[s] = e[s] / t;
            return n;
          }
          if (isNumerable(r, e) && $bm_isInstanceOfArray(t)) {
            for (a = t.length, n = createTypedArray("float32", a), s = 0; s < a; s += 1)
              n[s] = e / t[s];
            return n;
          }
          return 0;
        }
        function mod(e, t) {
          return typeof e == "string" && (e = parseInt(e, 10)), typeof t == "string" && (t = parseInt(t, 10)), e % t;
        }
        var $bm_sum = sum, $bm_sub = sub, $bm_mul = mul, $bm_div = div, $bm_mod = mod;
        function clamp(e, t, r) {
          if (t > r) {
            var i = r;
            r = t, t = i;
          }
          return Math.min(Math.max(e, t), r);
        }
        function radiansToDegrees(e) {
          return e / degToRads;
        }
        var radians_to_degrees = radiansToDegrees;
        function degreesToRadians(e) {
          return e * degToRads;
        }
        var degrees_to_radians = radiansToDegrees, helperLengthArray = [0, 0, 0, 0, 0, 0];
        function length(e, t) {
          if (typeof e == "number" || e instanceof Number)
            return t = t || 0, Math.abs(e - t);
          t || (t = helperLengthArray);
          var r, i = Math.min(e.length, t.length), n = 0;
          for (r = 0; r < i; r += 1)
            n += Math.pow(t[r] - e[r], 2);
          return Math.sqrt(n);
        }
        function normalize(e) {
          return div(e, length(e));
        }
        function rgbToHsl(e) {
          var t = e[0], r = e[1], i = e[2], n = Math.max(t, r, i), s = Math.min(t, r, i), a, l, o = (n + s) / 2;
          if (n === s)
            a = 0, l = 0;
          else {
            var f = n - s;
            switch (l = o > 0.5 ? f / (2 - n - s) : f / (n + s), n) {
              case t:
                a = (r - i) / f + (r < i ? 6 : 0);
                break;
              case r:
                a = (i - t) / f + 2;
                break;
              case i:
                a = (t - r) / f + 4;
                break;
            }
            a /= 6;
          }
          return [a, l, o, e[3]];
        }
        function hue2rgb(e, t, r) {
          return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * 6 * r : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e;
        }
        function hslToRgb(e) {
          var t = e[0], r = e[1], i = e[2], n, s, a;
          if (r === 0)
            n = i, a = i, s = i;
          else {
            var l = i < 0.5 ? i * (1 + r) : i + r - i * r, o = 2 * i - l;
            n = hue2rgb(o, l, t + 1 / 3), s = hue2rgb(o, l, t), a = hue2rgb(o, l, t - 1 / 3);
          }
          return [n, s, a, e[3]];
        }
        function linear(e, t, r, i, n) {
          if ((i === void 0 || n === void 0) && (i = t, n = r, t = 0, r = 1), r < t) {
            var s = r;
            r = t, t = s;
          }
          if (e <= t)
            return i;
          if (e >= r)
            return n;
          var a = r === t ? 0 : (e - t) / (r - t);
          if (!i.length)
            return i + (n - i) * a;
          var l, o = i.length, f = createTypedArray("float32", o);
          for (l = 0; l < o; l += 1)
            f[l] = i[l] + (n[l] - i[l]) * a;
          return f;
        }
        function random(e, t) {
          if (t === void 0 && (e === void 0 ? (e = 0, t = 1) : (t = e, e = void 0)), t.length) {
            var r, i = t.length;
            e || (e = createTypedArray("float32", i));
            var n = createTypedArray("float32", i), s = BMMath.random();
            for (r = 0; r < i; r += 1)
              n[r] = e[r] + s * (t[r] - e[r]);
            return n;
          }
          e === void 0 && (e = 0);
          var a = BMMath.random();
          return e + a * (t - e);
        }
        function createPath(e, t, r, i) {
          var n, s = e.length, a = shapePool.newElement();
          a.setPathData(!!i, s);
          var l = [0, 0], o, f;
          for (n = 0; n < s; n += 1)
            o = t && t[n] ? t[n] : l, f = r && r[n] ? r[n] : l, a.setTripleAt(e[n][0], e[n][1], f[0] + e[n][0], f[1] + e[n][1], o[0] + e[n][0], o[1] + e[n][1], n, !0);
          return a;
        }
        function initiateExpression(elem, data, property) {
          function noOp(e) {
            return e;
          }
          if (!elem.globalData.renderConfig.runExpressions)
            return noOp;
          var val = data.x, needsVelocity = /velocity(?![\w\d])/.test(val), _needsRandom = val.indexOf("random") !== -1, elemType = elem.data.ty, transform, $bm_transform, content, effect, thisProperty = property;
          thisProperty.valueAtTime = thisProperty.getValueAtTime, Object.defineProperty(thisProperty, "value", {
            get: function() {
              return thisProperty.v;
            }
          }), elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate, elem.comp.displayStartTime = 0;
          var inPoint = elem.data.ip / elem.comp.globalData.frameRate, outPoint = elem.data.op / elem.comp.globalData.frameRate, width = elem.data.sw ? elem.data.sw : 0, height = elem.data.sh ? elem.data.sh : 0, name = elem.data.nm, loopIn, loop_in, loopOut, loop_out, smooth, toWorld, fromWorld, fromComp, toComp, fromCompToSurface, position, rotation, anchorPoint, scale, thisLayer, thisComp, mask, valueAtTime, velocityAtTime, scoped_bm_rt, expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0], numKeys = property.kf ? data.k.length : 0, active = !this.data || this.data.hd !== !0, wiggle = (function e(t, r) {
            var i, n, s = this.pv.length ? this.pv.length : 1, a = createTypedArray("float32", s);
            t = 5;
            var l = Math.floor(time * t);
            for (i = 0, n = 0; i < l; ) {
              for (n = 0; n < s; n += 1)
                a[n] += -r + r * 2 * BMMath.random();
              i += 1;
            }
            var o = time * t, f = o - Math.floor(o), c = createTypedArray("float32", s);
            if (s > 1) {
              for (n = 0; n < s; n += 1)
                c[n] = this.pv[n] + a[n] + (-r + r * 2 * BMMath.random()) * f;
              return c;
            }
            return this.pv + a[0] + (-r + r * 2 * BMMath.random()) * f;
          }).bind(this);
          thisProperty.loopIn && (loopIn = thisProperty.loopIn.bind(thisProperty), loop_in = loopIn), thisProperty.loopOut && (loopOut = thisProperty.loopOut.bind(thisProperty), loop_out = loopOut), thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty));
          function loopInDuration(e, t) {
            return loopIn(e, t, !0);
          }
          function loopOutDuration(e, t) {
            return loopOut(e, t, !0);
          }
          this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)), this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
          var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
          function lookAt(e, t) {
            var r = [t[0] - e[0], t[1] - e[1], t[2] - e[2]], i = Math.atan2(r[0], Math.sqrt(r[1] * r[1] + r[2] * r[2])) / degToRads, n = -Math.atan2(r[1], r[2]) / degToRads;
            return [n, i, 0];
          }
          function easeOut(e, t, r, i, n) {
            return applyEase(easeOutBez, e, t, r, i, n);
          }
          function easeIn(e, t, r, i, n) {
            return applyEase(easeInBez, e, t, r, i, n);
          }
          function ease(e, t, r, i, n) {
            return applyEase(easeInOutBez, e, t, r, i, n);
          }
          function applyEase(e, t, r, i, n, s) {
            n === void 0 ? (n = r, s = i) : t = (t - r) / (i - r), t > 1 ? t = 1 : t < 0 && (t = 0);
            var a = e(t);
            if ($bm_isInstanceOfArray(n)) {
              var l, o = n.length, f = createTypedArray("float32", o);
              for (l = 0; l < o; l += 1)
                f[l] = (s[l] - n[l]) * a + n[l];
              return f;
            }
            return (s - n) * a + n;
          }
          function nearestKey(e) {
            var t, r = data.k.length, i, n;
            if (!data.k.length || typeof data.k[0] == "number")
              i = 0, n = 0;
            else if (i = -1, e *= elem.comp.globalData.frameRate, e < data.k[0].t)
              i = 1, n = data.k[0].t;
            else {
              for (t = 0; t < r - 1; t += 1)
                if (e === data.k[t].t) {
                  i = t + 1, n = data.k[t].t;
                  break;
                } else if (e > data.k[t].t && e < data.k[t + 1].t) {
                  e - data.k[t].t > data.k[t + 1].t - e ? (i = t + 2, n = data.k[t + 1].t) : (i = t + 1, n = data.k[t].t);
                  break;
                }
              i === -1 && (i = t + 1, n = data.k[t].t);
            }
            var s = {};
            return s.index = i, s.time = n / elem.comp.globalData.frameRate, s;
          }
          function key(e) {
            var t, r, i;
            if (!data.k.length || typeof data.k[0] == "number")
              throw new Error("The property has no keyframe at index " + e);
            e -= 1, t = {
              time: data.k[e].t / elem.comp.globalData.frameRate,
              value: []
            };
            var n = Object.prototype.hasOwnProperty.call(data.k[e], "s") ? data.k[e].s : data.k[e - 1].e;
            for (i = n.length, r = 0; r < i; r += 1)
              t[r] = n[r], t.value[r] = n[r];
            return t;
          }
          function framesToTime(e, t) {
            return t || (t = elem.comp.globalData.frameRate), e / t;
          }
          function timeToFrames(e, t) {
            return !e && e !== 0 && (e = time), t || (t = elem.comp.globalData.frameRate), e * t;
          }
          function seedRandom(e) {
            BMMath.seedrandom(randSeed + e);
          }
          function sourceRectAtTime() {
            return elem.sourceRectAtTime();
          }
          function substring(e, t) {
            return typeof value == "string" ? t === void 0 ? value.substring(e) : value.substring(e, t) : "";
          }
          function substr(e, t) {
            return typeof value == "string" ? t === void 0 ? value.substr(e) : value.substr(e, t) : "";
          }
          function posterizeTime(e) {
            time = e === 0 ? 0 : Math.floor(time * e) / e, value = valueAtTime(time);
          }
          var time, velocity, value, text, textIndex, textTotal, selectorValue, index = elem.data.ind, hasParent = !!(elem.hierarchy && elem.hierarchy.length), parent, randSeed = Math.floor(Math.random() * 1e6), globalData = elem.globalData;
          function executeExpression(e) {
            return value = e, this.frameExpressionId === elem.globalData.frameId && this.propType !== "textSelector" ? value : (this.propType === "textSelector" && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), thisLayer || (text = elem.layerInterface.text, thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface, toWorld = thisLayer.toWorld.bind(thisLayer), fromWorld = thisLayer.fromWorld.bind(thisLayer), fromComp = thisLayer.fromComp.bind(thisLayer), toComp = thisLayer.toComp.bind(thisLayer), mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null, fromCompToSurface = fromComp), transform || (transform = elem.layerInterface("ADBE Transform Group"), $bm_transform = transform, transform && (anchorPoint = transform.anchorPoint)), elemType === 4 && !content && (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), hasParent = !!(elem.hierarchy && elem.hierarchy.length), hasParent && !parent && (parent = elem.hierarchy[0].layerInterface), time = this.comp.renderedFrame / this.comp.globalData.frameRate, _needsRandom && seedRandom(randSeed + time), needsVelocity && (velocity = velocityAtTime(time)), expression_function(), this.frameExpressionId = elem.globalData.frameId, scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt, scoped_bm_rt);
          }
          return executeExpression.__preventDeadCodeRemoval = [$bm_transform, anchorPoint, time, velocity, inPoint, outPoint, width, height, name, loop_in, loop_out, smooth, toComp, fromCompToSurface, toWorld, fromWorld, mask, position, rotation, scale, thisComp, numKeys, active, wiggle, loopInDuration, loopOutDuration, comp, lookAt, easeOut, easeIn, ease, nearestKey, key, text, textIndex, textTotal, selectorValue, framesToTime, timeToFrames, sourceRectAtTime, substring, substr, posterizeTime, index, globalData], executeExpression;
        }
        return ob.initiateExpression = initiateExpression, ob.__preventDeadCodeRemoval = [window, document, XMLHttpRequest, fetch, frames, $bm_neg, add, $bm_sum, $bm_sub, $bm_mul, $bm_div, $bm_mod, clamp, radians_to_degrees, degreesToRadians, degrees_to_radians, normalize, rgbToHsl, hslToRgb, linear, random, createPath, _lottieGlobal], ob.resetFrame = resetFrame, ob;
      }(), Expressions = function() {
        var e = {};
        e.initExpressions = t, e.resetFrame = ExpressionManager.resetFrame;
        function t(r) {
          var i = 0, n = [];
          function s() {
            i += 1;
          }
          function a() {
            i -= 1, i === 0 && o();
          }
          function l(f) {
            n.indexOf(f) === -1 && n.push(f);
          }
          function o() {
            var f, c = n.length;
            for (f = 0; f < c; f += 1)
              n[f].release();
            n.length = 0;
          }
          r.renderer.compInterface = CompExpressionInterface(r.renderer), r.renderer.globalData.projectInterface.registerComposition(r.renderer), r.renderer.globalData.pushExpression = s, r.renderer.globalData.popExpression = a, r.renderer.globalData.registerExpressionProperty = l;
        }
        return e;
      }(), MaskManagerInterface = function() {
        function e(r, i) {
          this._mask = r, this._data = i;
        }
        Object.defineProperty(e.prototype, "maskPath", {
          get: function() {
            return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
          }
        }), Object.defineProperty(e.prototype, "maskOpacity", {
          get: function() {
            return this._mask.op.k && this._mask.op.getValue(), this._mask.op.v * 100;
          }
        });
        var t = function(i) {
          var n = createSizedArray(i.viewData.length), s, a = i.viewData.length;
          for (s = 0; s < a; s += 1)
            n[s] = new e(i.viewData[s], i.masksProperties[s]);
          var l = function(f) {
            for (s = 0; s < a; ) {
              if (i.masksProperties[s].nm === f)
                return n[s];
              s += 1;
            }
            return null;
          };
          return l;
        };
        return t;
      }(), ExpressionPropertyInterface = /* @__PURE__ */ function() {
        var e = {
          pv: 0,
          v: 0,
          mult: 1
        }, t = {
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
            var c = "";
            "s" in l.keyframes[f - 1] ? c = l.keyframes[f - 1].s : "e" in l.keyframes[f - 2] ? c = l.keyframes[f - 2].e : c = l.keyframes[f - 2].s;
            var v = o === "unidimensional" ? new Number(c) : Object.assign({}, c);
            return v.time = l.keyframes[f - 1].t / l.elem.comp.globalData.frameRate, v.value = o === "unidimensional" ? c[0] : c, v;
          }, a.valueAtTime = l.getValueAtTime, a.speedAtTime = l.getSpeedAtTime, a.velocityAtTime = l.getVelocityAtTime, a.propertyGroup = l.propertyGroup;
        }
        function i(a) {
          (!a || !("pv" in a)) && (a = e);
          var l = 1 / a.mult, o = a.pv * l, f = new Number(o);
          return f.value = o, r(f, a, "unidimensional"), function() {
            return a.k && a.getValue(), o = a.v * l, f.value !== o && (f = new Number(o), f.value = o, r(f, a, "unidimensional")), f;
          };
        }
        function n(a) {
          (!a || !("pv" in a)) && (a = t);
          var l = 1 / a.mult, o = a.data && a.data.l || a.pv.length, f = createTypedArray("float32", o), c = createTypedArray("float32", o);
          return f.value = c, r(f, a, "multidimensional"), function() {
            a.k && a.getValue();
            for (var v = 0; v < o; v += 1)
              c[v] = a.v[v] * l, f[v] = c[v];
            return f;
          };
        }
        function s() {
          return e;
        }
        return function(a) {
          return a ? a.propType === "unidimensional" ? i(a) : n(a) : s;
        };
      }(), TransformExpressionInterface = /* @__PURE__ */ function() {
        return function(e) {
          function t(a) {
            switch (a) {
              case "scale":
              case "Scale":
              case "ADBE Scale":
              case 6:
                return t.scale;
              case "rotation":
              case "Rotation":
              case "ADBE Rotation":
              case "ADBE Rotate Z":
              case 10:
                return t.rotation;
              case "ADBE Rotate X":
                return t.xRotation;
              case "ADBE Rotate Y":
                return t.yRotation;
              case "position":
              case "Position":
              case "ADBE Position":
              case 2:
                return t.position;
              case "ADBE Position_0":
                return t.xPosition;
              case "ADBE Position_1":
                return t.yPosition;
              case "ADBE Position_2":
                return t.zPosition;
              case "anchorPoint":
              case "AnchorPoint":
              case "Anchor Point":
              case "ADBE AnchorPoint":
              case 1:
                return t.anchorPoint;
              case "opacity":
              case "Opacity":
              case 11:
                return t.opacity;
              default:
                return null;
            }
          }
          Object.defineProperty(t, "rotation", {
            get: ExpressionPropertyInterface(e.r || e.rz)
          }), Object.defineProperty(t, "zRotation", {
            get: ExpressionPropertyInterface(e.rz || e.r)
          }), Object.defineProperty(t, "xRotation", {
            get: ExpressionPropertyInterface(e.rx)
          }), Object.defineProperty(t, "yRotation", {
            get: ExpressionPropertyInterface(e.ry)
          }), Object.defineProperty(t, "scale", {
            get: ExpressionPropertyInterface(e.s)
          });
          var r, i, n, s;
          return e.p ? s = ExpressionPropertyInterface(e.p) : (r = ExpressionPropertyInterface(e.px), i = ExpressionPropertyInterface(e.py), e.pz && (n = ExpressionPropertyInterface(e.pz))), Object.defineProperty(t, "position", {
            get: function() {
              return e.p ? s() : [r(), i(), n ? n() : 0];
            }
          }), Object.defineProperty(t, "xPosition", {
            get: ExpressionPropertyInterface(e.px)
          }), Object.defineProperty(t, "yPosition", {
            get: ExpressionPropertyInterface(e.py)
          }), Object.defineProperty(t, "zPosition", {
            get: ExpressionPropertyInterface(e.pz)
          }), Object.defineProperty(t, "anchorPoint", {
            get: ExpressionPropertyInterface(e.a)
          }), Object.defineProperty(t, "opacity", {
            get: ExpressionPropertyInterface(e.o)
          }), Object.defineProperty(t, "skew", {
            get: ExpressionPropertyInterface(e.sk)
          }), Object.defineProperty(t, "skewAxis", {
            get: ExpressionPropertyInterface(e.sa)
          }), Object.defineProperty(t, "orientation", {
            get: ExpressionPropertyInterface(e.or)
          }), t;
        };
      }(), LayerExpressionInterface = /* @__PURE__ */ function() {
        function e(f) {
          var c = new Matrix();
          if (f !== void 0) {
            var v = this._elem.finalTransform.mProp.getValueAtTime(f);
            v.clone(c);
          } else {
            var h = this._elem.finalTransform.mProp;
            h.applyToMatrix(c);
          }
          return c;
        }
        function t(f, c) {
          var v = this.getMatrix(c);
          return v.props[12] = 0, v.props[13] = 0, v.props[14] = 0, this.applyPoint(v, f);
        }
        function r(f, c) {
          var v = this.getMatrix(c);
          return this.applyPoint(v, f);
        }
        function i(f, c) {
          var v = this.getMatrix(c);
          return v.props[12] = 0, v.props[13] = 0, v.props[14] = 0, this.invertPoint(v, f);
        }
        function n(f, c) {
          var v = this.getMatrix(c);
          return this.invertPoint(v, f);
        }
        function s(f, c) {
          if (this._elem.hierarchy && this._elem.hierarchy.length) {
            var v, h = this._elem.hierarchy.length;
            for (v = 0; v < h; v += 1)
              this._elem.hierarchy[v].finalTransform.mProp.applyToMatrix(f);
          }
          return f.applyToPointArray(c[0], c[1], c[2] || 0);
        }
        function a(f, c) {
          if (this._elem.hierarchy && this._elem.hierarchy.length) {
            var v, h = this._elem.hierarchy.length;
            for (v = 0; v < h; v += 1)
              this._elem.hierarchy[v].finalTransform.mProp.applyToMatrix(f);
          }
          return f.inversePoint(c);
        }
        function l(f) {
          var c = new Matrix();
          if (c.reset(), this._elem.finalTransform.mProp.applyToMatrix(c), this._elem.hierarchy && this._elem.hierarchy.length) {
            var v, h = this._elem.hierarchy.length;
            for (v = 0; v < h; v += 1)
              this._elem.hierarchy[v].finalTransform.mProp.applyToMatrix(c);
            return c.inversePoint(f);
          }
          return c.inversePoint(f);
        }
        function o() {
          return [1, 1, 1, 1];
        }
        return function(f) {
          var c;
          function v(p) {
            g.mask = new MaskManagerInterface(p, f);
          }
          function h(p) {
            g.effect = p;
          }
          function g(p) {
            switch (p) {
              case "ADBE Root Vectors Group":
              case "Contents":
              case 2:
                return g.shapeInterface;
              case 1:
              case 6:
              case "Transform":
              case "transform":
              case "ADBE Transform Group":
                return c;
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
          g.getMatrix = e, g.invertPoint = a, g.applyPoint = s, g.toWorld = r, g.toWorldVec = t, g.fromWorld = n, g.fromWorldVec = i, g.toComp = r, g.fromComp = l, g.sampleImage = o, g.sourceRectAtTime = f.sourceRectAtTime.bind(f), g._elem = f, c = TransformExpressionInterface(f.finalTransform.mProp);
          var m = getDescriptor(c, "anchorPoint");
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
            rotation: getDescriptor(c, "rotation"),
            scale: getDescriptor(c, "scale"),
            position: getDescriptor(c, "position"),
            opacity: getDescriptor(c, "opacity"),
            anchorPoint: m,
            anchor_point: m,
            transform: {
              get: function() {
                return c;
              }
            },
            active: {
              get: function() {
                return f.isInRange;
              }
            }
          }), g.startTime = f.data.st, g.index = f.data.ind, g.source = f.data.refId, g.height = f.data.ty === 0 ? f.data.h : 100, g.width = f.data.ty === 0 ? f.data.w : 100, g.inPoint = f.data.ip / f.comp.globalData.frameRate, g.outPoint = f.data.op / f.comp.globalData.frameRate, g._name = f.data.nm, g.registerMaskInterface = v, g.registerEffectsInterface = h, g;
        };
      }(), propertyGroupFactory = /* @__PURE__ */ function() {
        return function(e, t) {
          return function(r) {
            return r = r === void 0 ? 1 : r, r <= 0 ? e : t(r - 1);
          };
        };
      }(), PropertyInterface = /* @__PURE__ */ function() {
        return function(e, t) {
          var r = {
            _name: e
          };
          function i(n) {
            return n = n === void 0 ? 1 : n, n <= 0 ? r : t(n - 1);
          }
          return i;
        };
      }(), EffectsExpressionInterface = /* @__PURE__ */ function() {
        var e = {
          createEffectsInterface: t
        };
        function t(n, s) {
          if (n.effectsManager) {
            var a = [], l = n.data.ef, o, f = n.effectsManager.effectElements.length;
            for (o = 0; o < f; o += 1)
              a.push(r(l[o], n.effectsManager.effectElements[o], s, n));
            var c = n.data.ef || [], v = function(g) {
              for (o = 0, f = c.length; o < f; ) {
                if (g === c[o].nm || g === c[o].mn || g === c[o].ix)
                  return a[o];
                o += 1;
              }
              return null;
            };
            return Object.defineProperty(v, "numProperties", {
              get: function() {
                return c.length;
              }
            }), v;
          }
          return null;
        }
        function r(n, s, a, l) {
          function o(g) {
            for (var m = n.ef, p = 0, b = m.length; p < b; ) {
              if (g === m[p].nm || g === m[p].mn || g === m[p].ix)
                return m[p].ty === 5 ? c[p] : c[p]();
              p += 1;
            }
            throw new Error();
          }
          var f = propertyGroupFactory(o, a), c = [], v, h = n.ef.length;
          for (v = 0; v < h; v += 1)
            n.ef[v].ty === 5 ? c.push(r(n.ef[v], s.effectElements[v], s.effectElements[v].propertyGroup, l)) : c.push(i(s.effectElements[v], n.ef[v].ty, l, f));
          return n.mn === "ADBE Color Control" && Object.defineProperty(o, "color", {
            get: function() {
              return c[0]();
            }
          }), Object.defineProperties(o, {
            numProperties: {
              get: function() {
                return n.np;
              }
            },
            _name: {
              value: n.nm
            },
            propertyGroup: {
              value: f
            }
          }), o.enabled = n.en !== 0, o.active = o.enabled, o;
        }
        function i(n, s, a, l) {
          var o = ExpressionPropertyInterface(n.p);
          function f() {
            return s === 10 ? a.comp.compInterface(n.p.v) : o();
          }
          return n.p.setGroupProperty && n.p.setGroupProperty(PropertyInterface("", l)), f;
        }
        return e;
      }(), ShapePathInterface = /* @__PURE__ */ function() {
        return function(t, r, i) {
          var n = r.sh;
          function s(l) {
            return l === "Shape" || l === "shape" || l === "Path" || l === "path" || l === "ADBE Vector Shape" || l === 2 ? s.path : null;
          }
          var a = propertyGroupFactory(s, i);
          return n.setGroupProperty(PropertyInterface("Path", a)), Object.defineProperties(s, {
            path: {
              get: function() {
                return n.k && n.getValue(), n;
              }
            },
            shape: {
              get: function() {
                return n.k && n.getValue(), n;
              }
            },
            _name: {
              value: t.nm
            },
            ix: {
              value: t.ix
            },
            propertyIndex: {
              value: t.ix
            },
            mn: {
              value: t.mn
            },
            propertyGroup: {
              value: i
            }
          }), s;
        };
      }(), ShapeExpressionInterface = /* @__PURE__ */ function() {
        function e(m, p, b) {
          var u = [], y, d = m ? m.length : 0;
          for (y = 0; y < d; y += 1)
            m[y].ty === "gr" ? u.push(r(m[y], p[y], b)) : m[y].ty === "fl" ? u.push(i(m[y], p[y], b)) : m[y].ty === "st" ? u.push(a(m[y], p[y], b)) : m[y].ty === "tm" ? u.push(l(m[y], p[y], b)) : m[y].ty === "tr" || (m[y].ty === "el" ? u.push(f(m[y], p[y], b)) : m[y].ty === "sr" ? u.push(c(m[y], p[y], b)) : m[y].ty === "sh" ? u.push(ShapePathInterface(m[y], p[y], b)) : m[y].ty === "rc" ? u.push(v(m[y], p[y], b)) : m[y].ty === "rd" ? u.push(h(m[y], p[y], b)) : m[y].ty === "rp" ? u.push(g(m[y], p[y], b)) : m[y].ty === "gf" ? u.push(n(m[y], p[y], b)) : u.push(s(m[y], p[y])));
          return u;
        }
        function t(m, p, b) {
          var u, y = function(S) {
            for (var C = 0, w = u.length; C < w; ) {
              if (u[C]._name === S || u[C].mn === S || u[C].propertyIndex === S || u[C].ix === S || u[C].ind === S)
                return u[C];
              C += 1;
            }
            return typeof S == "number" ? u[S - 1] : null;
          };
          y.propertyGroup = propertyGroupFactory(y, b), u = e(m.it, p.it, y.propertyGroup), y.numProperties = u.length;
          var d = o(m.it[m.it.length - 1], p.it[p.it.length - 1], y.propertyGroup);
          return y.transform = d, y.propertyIndex = m.cix, y._name = m.nm, y;
        }
        function r(m, p, b) {
          var u = function(S) {
            switch (S) {
              case "ADBE Vectors Group":
              case "Contents":
              case 2:
                return u.content;
              // Not necessary for now. Keeping them here in case a new case appears
              // case 'ADBE Vector Transform Group':
              // case 3:
              default:
                return u.transform;
            }
          };
          u.propertyGroup = propertyGroupFactory(u, b);
          var y = t(m, p, u.propertyGroup), d = o(m.it[m.it.length - 1], p.it[p.it.length - 1], u.propertyGroup);
          return u.content = y, u.transform = d, Object.defineProperty(u, "_name", {
            get: function() {
              return m.nm;
            }
          }), u.numProperties = m.np, u.propertyIndex = m.ix, u.nm = m.nm, u.mn = m.mn, u;
        }
        function i(m, p, b) {
          function u(y) {
            return y === "Color" || y === "color" ? u.color : y === "Opacity" || y === "opacity" ? u.opacity : null;
          }
          return Object.defineProperties(u, {
            color: {
              get: ExpressionPropertyInterface(p.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(p.o)
            },
            _name: {
              value: m.nm
            },
            mn: {
              value: m.mn
            }
          }), p.c.setGroupProperty(PropertyInterface("Color", b)), p.o.setGroupProperty(PropertyInterface("Opacity", b)), u;
        }
        function n(m, p, b) {
          function u(y) {
            return y === "Start Point" || y === "start point" ? u.startPoint : y === "End Point" || y === "end point" ? u.endPoint : y === "Opacity" || y === "opacity" ? u.opacity : null;
          }
          return Object.defineProperties(u, {
            startPoint: {
              get: ExpressionPropertyInterface(p.s)
            },
            endPoint: {
              get: ExpressionPropertyInterface(p.e)
            },
            opacity: {
              get: ExpressionPropertyInterface(p.o)
            },
            type: {
              get: function() {
                return "a";
              }
            },
            _name: {
              value: m.nm
            },
            mn: {
              value: m.mn
            }
          }), p.s.setGroupProperty(PropertyInterface("Start Point", b)), p.e.setGroupProperty(PropertyInterface("End Point", b)), p.o.setGroupProperty(PropertyInterface("Opacity", b)), u;
        }
        function s() {
          function m() {
            return null;
          }
          return m;
        }
        function a(m, p, b) {
          var u = propertyGroupFactory(w, b), y = propertyGroupFactory(C, u);
          function d(M) {
            Object.defineProperty(C, m.d[M].nm, {
              get: ExpressionPropertyInterface(p.d.dataProps[M].p)
            });
          }
          var E, S = m.d ? m.d.length : 0, C = {};
          for (E = 0; E < S; E += 1)
            d(E), p.d.dataProps[E].p.setGroupProperty(y);
          function w(M) {
            return M === "Color" || M === "color" ? w.color : M === "Opacity" || M === "opacity" ? w.opacity : M === "Stroke Width" || M === "stroke width" ? w.strokeWidth : null;
          }
          return Object.defineProperties(w, {
            color: {
              get: ExpressionPropertyInterface(p.c)
            },
            opacity: {
              get: ExpressionPropertyInterface(p.o)
            },
            strokeWidth: {
              get: ExpressionPropertyInterface(p.w)
            },
            dash: {
              get: function() {
                return C;
              }
            },
            _name: {
              value: m.nm
            },
            mn: {
              value: m.mn
            }
          }), p.c.setGroupProperty(PropertyInterface("Color", u)), p.o.setGroupProperty(PropertyInterface("Opacity", u)), p.w.setGroupProperty(PropertyInterface("Stroke Width", u)), w;
        }
        function l(m, p, b) {
          function u(d) {
            return d === m.e.ix || d === "End" || d === "end" ? u.end : d === m.s.ix ? u.start : d === m.o.ix ? u.offset : null;
          }
          var y = propertyGroupFactory(u, b);
          return u.propertyIndex = m.ix, p.s.setGroupProperty(PropertyInterface("Start", y)), p.e.setGroupProperty(PropertyInterface("End", y)), p.o.setGroupProperty(PropertyInterface("Offset", y)), u.propertyIndex = m.ix, u.propertyGroup = b, Object.defineProperties(u, {
            start: {
              get: ExpressionPropertyInterface(p.s)
            },
            end: {
              get: ExpressionPropertyInterface(p.e)
            },
            offset: {
              get: ExpressionPropertyInterface(p.o)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        function o(m, p, b) {
          function u(d) {
            return m.a.ix === d || d === "Anchor Point" ? u.anchorPoint : m.o.ix === d || d === "Opacity" ? u.opacity : m.p.ix === d || d === "Position" ? u.position : m.r.ix === d || d === "Rotation" || d === "ADBE Vector Rotation" ? u.rotation : m.s.ix === d || d === "Scale" ? u.scale : m.sk && m.sk.ix === d || d === "Skew" ? u.skew : m.sa && m.sa.ix === d || d === "Skew Axis" ? u.skewAxis : null;
          }
          var y = propertyGroupFactory(u, b);
          return p.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", y)), p.transform.mProps.p.setGroupProperty(PropertyInterface("Position", y)), p.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", y)), p.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", y)), p.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", y)), p.transform.mProps.sk && (p.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", y)), p.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", y))), p.transform.op.setGroupProperty(PropertyInterface("Opacity", y)), Object.defineProperties(u, {
            opacity: {
              get: ExpressionPropertyInterface(p.transform.mProps.o)
            },
            position: {
              get: ExpressionPropertyInterface(p.transform.mProps.p)
            },
            anchorPoint: {
              get: ExpressionPropertyInterface(p.transform.mProps.a)
            },
            scale: {
              get: ExpressionPropertyInterface(p.transform.mProps.s)
            },
            rotation: {
              get: ExpressionPropertyInterface(p.transform.mProps.r)
            },
            skew: {
              get: ExpressionPropertyInterface(p.transform.mProps.sk)
            },
            skewAxis: {
              get: ExpressionPropertyInterface(p.transform.mProps.sa)
            },
            _name: {
              value: m.nm
            }
          }), u.ty = "tr", u.mn = m.mn, u.propertyGroup = b, u;
        }
        function f(m, p, b) {
          function u(E) {
            return m.p.ix === E ? u.position : m.s.ix === E ? u.size : null;
          }
          var y = propertyGroupFactory(u, b);
          u.propertyIndex = m.ix;
          var d = p.sh.ty === "tm" ? p.sh.prop : p.sh;
          return d.s.setGroupProperty(PropertyInterface("Size", y)), d.p.setGroupProperty(PropertyInterface("Position", y)), Object.defineProperties(u, {
            size: {
              get: ExpressionPropertyInterface(d.s)
            },
            position: {
              get: ExpressionPropertyInterface(d.p)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        function c(m, p, b) {
          function u(E) {
            return m.p.ix === E ? u.position : m.r.ix === E ? u.rotation : m.pt.ix === E ? u.points : m.or.ix === E || E === "ADBE Vector Star Outer Radius" ? u.outerRadius : m.os.ix === E ? u.outerRoundness : m.ir && (m.ir.ix === E || E === "ADBE Vector Star Inner Radius") ? u.innerRadius : m.is && m.is.ix === E ? u.innerRoundness : null;
          }
          var y = propertyGroupFactory(u, b), d = p.sh.ty === "tm" ? p.sh.prop : p.sh;
          return u.propertyIndex = m.ix, d.or.setGroupProperty(PropertyInterface("Outer Radius", y)), d.os.setGroupProperty(PropertyInterface("Outer Roundness", y)), d.pt.setGroupProperty(PropertyInterface("Points", y)), d.p.setGroupProperty(PropertyInterface("Position", y)), d.r.setGroupProperty(PropertyInterface("Rotation", y)), m.ir && (d.ir.setGroupProperty(PropertyInterface("Inner Radius", y)), d.is.setGroupProperty(PropertyInterface("Inner Roundness", y))), Object.defineProperties(u, {
            position: {
              get: ExpressionPropertyInterface(d.p)
            },
            rotation: {
              get: ExpressionPropertyInterface(d.r)
            },
            points: {
              get: ExpressionPropertyInterface(d.pt)
            },
            outerRadius: {
              get: ExpressionPropertyInterface(d.or)
            },
            outerRoundness: {
              get: ExpressionPropertyInterface(d.os)
            },
            innerRadius: {
              get: ExpressionPropertyInterface(d.ir)
            },
            innerRoundness: {
              get: ExpressionPropertyInterface(d.is)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        function v(m, p, b) {
          function u(E) {
            return m.p.ix === E ? u.position : m.r.ix === E ? u.roundness : m.s.ix === E || E === "Size" || E === "ADBE Vector Rect Size" ? u.size : null;
          }
          var y = propertyGroupFactory(u, b), d = p.sh.ty === "tm" ? p.sh.prop : p.sh;
          return u.propertyIndex = m.ix, d.p.setGroupProperty(PropertyInterface("Position", y)), d.s.setGroupProperty(PropertyInterface("Size", y)), d.r.setGroupProperty(PropertyInterface("Rotation", y)), Object.defineProperties(u, {
            position: {
              get: ExpressionPropertyInterface(d.p)
            },
            roundness: {
              get: ExpressionPropertyInterface(d.r)
            },
            size: {
              get: ExpressionPropertyInterface(d.s)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        function h(m, p, b) {
          function u(E) {
            return m.r.ix === E || E === "Round Corners 1" ? u.radius : null;
          }
          var y = propertyGroupFactory(u, b), d = p;
          return u.propertyIndex = m.ix, d.rd.setGroupProperty(PropertyInterface("Radius", y)), Object.defineProperties(u, {
            radius: {
              get: ExpressionPropertyInterface(d.rd)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        function g(m, p, b) {
          function u(E) {
            return m.c.ix === E || E === "Copies" ? u.copies : m.o.ix === E || E === "Offset" ? u.offset : null;
          }
          var y = propertyGroupFactory(u, b), d = p;
          return u.propertyIndex = m.ix, d.c.setGroupProperty(PropertyInterface("Copies", y)), d.o.setGroupProperty(PropertyInterface("Offset", y)), Object.defineProperties(u, {
            copies: {
              get: ExpressionPropertyInterface(d.c)
            },
            offset: {
              get: ExpressionPropertyInterface(d.o)
            },
            _name: {
              value: m.nm
            }
          }), u.mn = m.mn, u;
        }
        return function(m, p, b) {
          var u;
          function y(E) {
            if (typeof E == "number")
              return E = E === void 0 ? 1 : E, E === 0 ? b : u[E - 1];
            for (var S = 0, C = u.length; S < C; ) {
              if (u[S]._name === E)
                return u[S];
              S += 1;
            }
            return null;
          }
          function d() {
            return b;
          }
          return y.propertyGroup = propertyGroupFactory(y, d), u = e(m, p, y.propertyGroup), y.numProperties = u.length, y._name = "Contents", y;
        };
      }(), TextExpressionInterface = /* @__PURE__ */ function() {
        return function(e) {
          var t;
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
              e.textProperty.getValue();
              var n = e.textProperty.currentData.t;
              return (!t || n !== t.value) && (t = new String(n), t.value = n || new String(n), Object.defineProperty(t, "style", {
                get: function() {
                  return {
                    fillColor: e.textProperty.currentData.fc
                  };
                }
              })), t;
            }
          }), r;
        };
      }();
      function _typeof(e) {
        "@babel/helpers - typeof";
        return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? _typeof = function(r) {
          return typeof r;
        } : _typeof = function(r) {
          return r && typeof Symbol == "function" && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r;
        }, _typeof(e);
      }
      var FootageInterface = /* @__PURE__ */ function() {
        var e = function(i) {
          var n = "", s = i.getFootageData();
          function a() {
            return n = "", s = i.getFootageData(), l;
          }
          function l(o) {
            if (s[o])
              return n = o, s = s[o], _typeof(s) === "object" ? l : s;
            var f = o.indexOf(n);
            if (f !== -1) {
              var c = parseInt(o.substr(f + n.length), 10);
              return s = s[c], _typeof(s) === "object" ? l : s;
            }
            return "";
          }
          return a;
        }, t = function(i) {
          function n(s) {
            return s === "Outline" ? n.outlineInterface() : null;
          }
          return n._name = "Outline", n.outlineInterface = e(i), n;
        };
        return function(r) {
          function i(n) {
            return n === "Data" ? i.dataInterface : null;
          }
          return i._name = "Data", i.dataInterface = t(r), i;
        };
      }(), interfaces = {
        layer: LayerExpressionInterface,
        effects: EffectsExpressionInterface,
        comp: CompExpressionInterface,
        shape: ShapeExpressionInterface,
        text: TextExpressionInterface,
        footage: FootageInterface
      };
      function getInterface(e) {
        return interfaces[e] || null;
      }
      var expressionHelpers = /* @__PURE__ */ function() {
        function e(a, l, o) {
          l.x && (o.k = !0, o.x = !0, o.initiateExpression = ExpressionManager.initiateExpression, o.effectsSequence.push(o.initiateExpression(a, l, o).bind(o)));
        }
        function t(a) {
          return a *= this.elem.globalData.frameRate, a -= this.offsetTime, a !== this._cachingAtTime.lastFrame && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < a ? this._cachingAtTime.lastIndex : 0, this._cachingAtTime.value = this.interpolateValue(a, this._cachingAtTime), this._cachingAtTime.lastFrame = a), this._cachingAtTime.value;
        }
        function r(a) {
          var l = -0.01, o = this.getValueAtTime(a), f = this.getValueAtTime(a + l), c = 0;
          if (o.length) {
            var v;
            for (v = 0; v < o.length; v += 1)
              c += Math.pow(f[v] - o[v], 2);
            c = Math.sqrt(c) * 100;
          } else
            c = 0;
          return c;
        }
        function i(a) {
          if (this.vel !== void 0)
            return this.vel;
          var l = -1e-3, o = this.getValueAtTime(a), f = this.getValueAtTime(a + l), c;
          if (o.length) {
            c = createTypedArray("float32", o.length);
            var v;
            for (v = 0; v < o.length; v += 1)
              c[v] = (f[v] - o[v]) / l;
          } else
            c = (f - o) / l;
          return c;
        }
        function n() {
          return this.pv;
        }
        function s(a) {
          this.propertyGroup = a;
        }
        return {
          searchExpressions: e,
          getSpeedAtTime: r,
          getVelocityAtTime: i,
          getValueAtTime: t,
          getStaticValueAtTime: n,
          setGroupProperty: s
        };
      }();
      function addPropertyDecorator() {
        function e(h, g, m) {
          if (!this.k || !this.keyframes)
            return this.pv;
          h = h ? h.toLowerCase() : "";
          var p = this.comp.renderedFrame, b = this.keyframes, u = b[b.length - 1].t;
          if (p <= u)
            return this.pv;
          var y, d;
          m ? (g ? y = Math.abs(u - this.elem.comp.globalData.frameRate * g) : y = Math.max(0, u - this.elem.data.ip), d = u - y) : ((!g || g > b.length - 1) && (g = b.length - 1), d = b[b.length - 1 - g].t, y = u - d);
          var E, S, C;
          if (h === "pingpong") {
            var w = Math.floor((p - d) / y);
            if (w % 2 !== 0)
              return this.getValueAtTime((y - (p - d) % y + d) / this.comp.globalData.frameRate, 0);
          } else if (h === "offset") {
            var M = this.getValueAtTime(d / this.comp.globalData.frameRate, 0), O = this.getValueAtTime(u / this.comp.globalData.frameRate, 0), j = this.getValueAtTime(((p - d) % y + d) / this.comp.globalData.frameRate, 0), B = Math.floor((p - d) / y);
            if (this.pv.length) {
              for (C = new Array(M.length), S = C.length, E = 0; E < S; E += 1)
                C[E] = (O[E] - M[E]) * B + j[E];
              return C;
            }
            return (O - M) * B + j;
          } else if (h === "continue") {
            var L = this.getValueAtTime(u / this.comp.globalData.frameRate, 0), V = this.getValueAtTime((u - 1e-3) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (C = new Array(L.length), S = C.length, E = 0; E < S; E += 1)
                C[E] = L[E] + (L[E] - V[E]) * ((p - u) / this.comp.globalData.frameRate) / 5e-4;
              return C;
            }
            return L + (L - V) * ((p - u) / 1e-3);
          }
          return this.getValueAtTime(((p - d) % y + d) / this.comp.globalData.frameRate, 0);
        }
        function t(h, g, m) {
          if (!this.k)
            return this.pv;
          h = h ? h.toLowerCase() : "";
          var p = this.comp.renderedFrame, b = this.keyframes, u = b[0].t;
          if (p >= u)
            return this.pv;
          var y, d;
          m ? (g ? y = Math.abs(this.elem.comp.globalData.frameRate * g) : y = Math.max(0, this.elem.data.op - u), d = u + y) : ((!g || g > b.length - 1) && (g = b.length - 1), d = b[g].t, y = d - u);
          var E, S, C;
          if (h === "pingpong") {
            var w = Math.floor((u - p) / y);
            if (w % 2 === 0)
              return this.getValueAtTime(((u - p) % y + u) / this.comp.globalData.frameRate, 0);
          } else if (h === "offset") {
            var M = this.getValueAtTime(u / this.comp.globalData.frameRate, 0), O = this.getValueAtTime(d / this.comp.globalData.frameRate, 0), j = this.getValueAtTime((y - (u - p) % y + u) / this.comp.globalData.frameRate, 0), B = Math.floor((u - p) / y) + 1;
            if (this.pv.length) {
              for (C = new Array(M.length), S = C.length, E = 0; E < S; E += 1)
                C[E] = j[E] - (O[E] - M[E]) * B;
              return C;
            }
            return j - (O - M) * B;
          } else if (h === "continue") {
            var L = this.getValueAtTime(u / this.comp.globalData.frameRate, 0), V = this.getValueAtTime((u + 1e-3) / this.comp.globalData.frameRate, 0);
            if (this.pv.length) {
              for (C = new Array(L.length), S = C.length, E = 0; E < S; E += 1)
                C[E] = L[E] + (L[E] - V[E]) * (u - p) / 1e-3;
              return C;
            }
            return L + (L - V) * (u - p) / 1e-3;
          }
          return this.getValueAtTime((y - ((u - p) % y + u)) / this.comp.globalData.frameRate, 0);
        }
        function r(h, g) {
          if (!this.k)
            return this.pv;
          if (h = (h || 0.4) * 0.5, g = Math.floor(g || 5), g <= 1)
            return this.pv;
          var m = this.comp.renderedFrame / this.comp.globalData.frameRate, p = m - h, b = m + h, u = g > 1 ? (b - p) / (g - 1) : 1, y = 0, d = 0, E;
          this.pv.length ? E = createTypedArray("float32", this.pv.length) : E = 0;
          for (var S; y < g; ) {
            if (S = this.getValueAtTime(p + y * u), this.pv.length)
              for (d = 0; d < this.pv.length; d += 1)
                E[d] += S[d];
            else
              E += S;
            y += 1;
          }
          if (this.pv.length)
            for (d = 0; d < this.pv.length; d += 1)
              E[d] /= g;
          else
            E /= g;
          return E;
        }
        function i(h) {
          this._transformCachingAtTime || (this._transformCachingAtTime = {
            v: new Matrix()
          });
          var g = this._transformCachingAtTime.v;
          if (g.cloneFromProps(this.pre.props), this.appliedTransformations < 1) {
            var m = this.a.getValueAtTime(h);
            g.translate(-m[0] * this.a.mult, -m[1] * this.a.mult, m[2] * this.a.mult);
          }
          if (this.appliedTransformations < 2) {
            var p = this.s.getValueAtTime(h);
            g.scale(p[0] * this.s.mult, p[1] * this.s.mult, p[2] * this.s.mult);
          }
          if (this.sk && this.appliedTransformations < 3) {
            var b = this.sk.getValueAtTime(h), u = this.sa.getValueAtTime(h);
            g.skewFromAxis(-b * this.sk.mult, u * this.sa.mult);
          }
          if (this.r && this.appliedTransformations < 4) {
            var y = this.r.getValueAtTime(h);
            g.rotate(-y * this.r.mult);
          } else if (!this.r && this.appliedTransformations < 4) {
            var d = this.rz.getValueAtTime(h), E = this.ry.getValueAtTime(h), S = this.rx.getValueAtTime(h), C = this.or.getValueAtTime(h);
            g.rotateZ(-d * this.rz.mult).rotateY(E * this.ry.mult).rotateX(S * this.rx.mult).rotateZ(-C[2] * this.or.mult).rotateY(C[1] * this.or.mult).rotateX(C[0] * this.or.mult);
          }
          if (this.data.p && this.data.p.s) {
            var w = this.px.getValueAtTime(h), M = this.py.getValueAtTime(h);
            if (this.data.p.z) {
              var O = this.pz.getValueAtTime(h);
              g.translate(w * this.px.mult, M * this.py.mult, -O * this.pz.mult);
            } else
              g.translate(w * this.px.mult, M * this.py.mult, 0);
          } else {
            var j = this.p.getValueAtTime(h);
            g.translate(j[0] * this.p.mult, j[1] * this.p.mult, -j[2] * this.p.mult);
          }
          return g;
        }
        function n() {
          return this.v.clone(new Matrix());
        }
        var s = TransformPropertyFactory.getTransformProperty;
        TransformPropertyFactory.getTransformProperty = function(h, g, m) {
          var p = s(h, g, m);
          return p.dynamicProperties.length ? p.getValueAtTime = i.bind(p) : p.getValueAtTime = n.bind(p), p.setGroupProperty = expressionHelpers.setGroupProperty, p;
        };
        var a = PropertyFactory.getProp;
        PropertyFactory.getProp = function(h, g, m, p, b) {
          var u = a(h, g, m, p, b);
          u.kf ? u.getValueAtTime = expressionHelpers.getValueAtTime.bind(u) : u.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(u), u.setGroupProperty = expressionHelpers.setGroupProperty, u.loopOut = e, u.loopIn = t, u.smooth = r, u.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(u), u.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(u), u.numKeys = g.a === 1 ? g.k.length : 0, u.propertyIndex = g.ix;
          var y = 0;
          return m !== 0 && (y = createTypedArray("float32", g.a === 1 ? g.k[0].s.length : g.k.length)), u._cachingAtTime = {
            lastFrame: initialDefaultFrame,
            lastIndex: 0,
            value: y
          }, expressionHelpers.searchExpressions(h, g, u), u.k && b.addDynamicProperty(u), u;
        };
        function l(h) {
          return this._cachingAtTime || (this._cachingAtTime = {
            shapeValue: shapePool.clone(this.pv),
            lastIndex: 0,
            lastTime: initialDefaultFrame
          }), h *= this.elem.globalData.frameRate, h -= this.offsetTime, h !== this._cachingAtTime.lastTime && (this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < h ? this._caching.lastIndex : 0, this._cachingAtTime.lastTime = h, this.interpolateShape(h, this._cachingAtTime.shapeValue, this._cachingAtTime)), this._cachingAtTime.shapeValue;
        }
        var o = ShapePropertyFactory.getConstructorFunction(), f = ShapePropertyFactory.getKeyframedConstructorFunction();
        function c() {
        }
        c.prototype = {
          vertices: function(g, m) {
            this.k && this.getValue();
            var p = this.v;
            m !== void 0 && (p = this.getValueAtTime(m, 0));
            var b, u = p._length, y = p[g], d = p.v, E = createSizedArray(u);
            for (b = 0; b < u; b += 1)
              g === "i" || g === "o" ? E[b] = [y[b][0] - d[b][0], y[b][1] - d[b][1]] : E[b] = [y[b][0], y[b][1]];
            return E;
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
          pointOnPath: function(g, m) {
            var p = this.v;
            m !== void 0 && (p = this.getValueAtTime(m, 0)), this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(p));
            for (var b = this._segmentsLength, u = b.lengths, y = b.totalLength * g, d = 0, E = u.length, S = 0, C; d < E; ) {
              if (S + u[d].addedLength > y) {
                var w = d, M = p.c && d === E - 1 ? 0 : d + 1, O = (y - S) / u[d].addedLength;
                C = bez.getPointInSegment(p.v[w], p.v[M], p.o[w], p.i[M], O, u[d]);
                break;
              } else
                S += u[d].addedLength;
              d += 1;
            }
            return C || (C = p.c ? [p.v[0][0], p.v[0][1]] : [p.v[p._length - 1][0], p.v[p._length - 1][1]]), C;
          },
          vectorOnPath: function(g, m, p) {
            g == 1 ? g = this.v.c : g == 0 && (g = 0.999);
            var b = this.pointOnPath(g, m), u = this.pointOnPath(g + 1e-3, m), y = u[0] - b[0], d = u[1] - b[1], E = Math.sqrt(Math.pow(y, 2) + Math.pow(d, 2));
            if (E === 0)
              return [0, 0];
            var S = p === "tangent" ? [y / E, d / E] : [-d / E, y / E];
            return S;
          },
          tangentOnPath: function(g, m) {
            return this.vectorOnPath(g, m, "tangent");
          },
          normalOnPath: function(g, m) {
            return this.vectorOnPath(g, m, "normal");
          },
          setGroupProperty: expressionHelpers.setGroupProperty,
          getValueAtTime: expressionHelpers.getStaticValueAtTime
        }, extendPrototype([c], o), extendPrototype([c], f), f.prototype.getValueAtTime = l, f.prototype.initiateExpression = ExpressionManager.initiateExpression;
        var v = ShapePropertyFactory.getShapeProp;
        ShapePropertyFactory.getShapeProp = function(h, g, m, p, b) {
          var u = v(h, g, m, p, b);
          return u.propertyIndex = g.ix, u.lock = !1, m === 3 ? expressionHelpers.searchExpressions(h, g.pt, u) : m === 4 && expressionHelpers.searchExpressions(h, g.ks, u), u.k && h.addDynamicProperty(u), u;
        };
      }
      function initialize$1() {
        addPropertyDecorator();
      }
      function addDecorator() {
        function e() {
          return this.data.d.x ? (this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this), this.addEffect(this.getExpressionValue.bind(this)), !0) : null;
        }
        TextProperty.prototype.getExpressionValue = function(t, r) {
          var i = this.calculateExpression(r);
          if (t.t !== i) {
            var n = {};
            return this.copyData(n, t), n.t = i.toString(), n.__complete = !1, n;
          }
          return t;
        }, TextProperty.prototype.searchProperty = function() {
          var t = this.searchKeyframes(), r = this.searchExpressions();
          return this.kf = t || r, this.kf;
        }, TextProperty.prototype.searchExpressions = e;
      }
      function initialize() {
        addDecorator();
      }
      function SVGComposableEffect() {
      }
      SVGComposableEffect.prototype = {
        createMergeNode: function e(t, r) {
          var i = createNS("feMerge");
          i.setAttribute("result", t);
          var n, s;
          for (s = 0; s < r.length; s += 1)
            n = createNS("feMergeNode"), n.setAttribute("in", r[s]), i.appendChild(n), i.appendChild(n);
          return i;
        }
      };
      var linearFilterValue = "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0";
      function SVGTintFilter(e, t, r, i, n) {
        this.filterManager = t;
        var s = createNS("feColorMatrix");
        s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "linearRGB"), s.setAttribute("values", linearFilterValue + " 1 0"), this.linearFilter = s, s.setAttribute("result", i + "_tint_1"), e.appendChild(s), s = createNS("feColorMatrix"), s.setAttribute("type", "matrix"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), s.setAttribute("result", i + "_tint_2"), e.appendChild(s), this.matrixFilter = s;
        var a = this.createMergeNode(i, [n, i + "_tint_1", i + "_tint_2"]);
        e.appendChild(a);
      }
      extendPrototype([SVGComposableEffect], SVGTintFilter), SVGTintFilter.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          var t = this.filterManager.effectElements[0].p.v, r = this.filterManager.effectElements[1].p.v, i = this.filterManager.effectElements[2].p.v / 100;
          this.linearFilter.setAttribute("values", linearFilterValue + " " + i + " 0"), this.matrixFilter.setAttribute("values", r[0] - t[0] + " 0 0 0 " + t[0] + " " + (r[1] - t[1]) + " 0 0 0 " + t[1] + " " + (r[2] - t[2]) + " 0 0 0 " + t[2] + " 0 0 0 1 0");
        }
      };
      function SVGFillFilter(e, t, r, i) {
        this.filterManager = t;
        var n = createNS("feColorMatrix");
        n.setAttribute("type", "matrix"), n.setAttribute("color-interpolation-filters", "sRGB"), n.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), n.setAttribute("result", i), e.appendChild(n), this.matrixFilter = n;
      }
      SVGFillFilter.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          var t = this.filterManager.effectElements[2].p.v, r = this.filterManager.effectElements[6].p.v;
          this.matrixFilter.setAttribute("values", "0 0 0 0 " + t[0] + " 0 0 0 0 " + t[1] + " 0 0 0 0 " + t[2] + " 0 0 0 " + r + " 0");
        }
      };
      function SVGStrokeEffect(e, t, r) {
        this.initialized = !1, this.filterManager = t, this.elem = r, this.paths = [];
      }
      SVGStrokeEffect.prototype.initialize = function() {
        var e = this.elem.layerElement.children || this.elem.layerElement.childNodes, t, r, i, n;
        for (this.filterManager.effectElements[1].p.v === 1 ? (n = this.elem.maskManager.masksProperties.length, i = 0) : (i = this.filterManager.effectElements[0].p.v - 1, n = i + 1), r = createNS("g"), r.setAttribute("fill", "none"), r.setAttribute("stroke-linecap", "round"), r.setAttribute("stroke-dashoffset", 1), i; i < n; i += 1)
          t = createNS("path"), r.appendChild(t), this.paths.push({
            p: t,
            m: i
          });
        if (this.filterManager.effectElements[10].p.v === 3) {
          var s = createNS("mask"), a = createElementID();
          s.setAttribute("id", a), s.setAttribute("mask-type", "alpha"), s.appendChild(r), this.elem.globalData.defs.appendChild(s);
          var l = createNS("g");
          for (l.setAttribute("mask", "url(" + getLocationHref() + "#" + a + ")"); e[0]; )
            l.appendChild(e[0]);
          this.elem.layerElement.appendChild(l), this.masker = s, r.setAttribute("stroke", "#fff");
        } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
          if (this.filterManager.effectElements[10].p.v === 2)
            for (e = this.elem.layerElement.children || this.elem.layerElement.childNodes; e.length; )
              this.elem.layerElement.removeChild(e[0]);
          this.elem.layerElement.appendChild(r), this.elem.layerElement.removeAttribute("mask"), r.setAttribute("stroke", "#fff");
        }
        this.initialized = !0, this.pathMasker = r;
      }, SVGStrokeEffect.prototype.renderFrame = function(e) {
        this.initialized || this.initialize();
        var t, r = this.paths.length, i, n;
        for (t = 0; t < r; t += 1)
          if (this.paths[t].m !== -1 && (i = this.elem.maskManager.viewData[this.paths[t].m], n = this.paths[t].p, (e || this.filterManager._mdf || i.prop._mdf) && n.setAttribute("d", i.lastPath), e || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || i.prop._mdf)) {
            var s;
            if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
              var a = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, l = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01, o = n.getTotalLength();
              s = "0 0 0 " + o * a + " ";
              var f = o * (l - a), c = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01, v = Math.floor(f / c), h;
              for (h = 0; h < v; h += 1)
                s += "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + " ";
              s += "0 " + o * 10 + " 0 0";
            } else
              s = "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
            n.setAttribute("stroke-dasharray", s);
          }
        if ((e || this.filterManager.effectElements[4].p._mdf) && this.pathMasker.setAttribute("stroke-width", this.filterManager.effectElements[4].p.v * 2), (e || this.filterManager.effectElements[6].p._mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) && (e || this.filterManager.effectElements[3].p._mdf)) {
          var g = this.filterManager.effectElements[3].p.v;
          this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(g[0] * 255) + "," + bmFloor(g[1] * 255) + "," + bmFloor(g[2] * 255) + ")");
        }
      };
      function SVGTritoneFilter(e, t, r, i) {
        this.filterManager = t;
        var n = createNS("feColorMatrix");
        n.setAttribute("type", "matrix"), n.setAttribute("color-interpolation-filters", "linearRGB"), n.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), e.appendChild(n);
        var s = createNS("feComponentTransfer");
        s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("result", i), this.matrixFilter = s;
        var a = createNS("feFuncR");
        a.setAttribute("type", "table"), s.appendChild(a), this.feFuncR = a;
        var l = createNS("feFuncG");
        l.setAttribute("type", "table"), s.appendChild(l), this.feFuncG = l;
        var o = createNS("feFuncB");
        o.setAttribute("type", "table"), s.appendChild(o), this.feFuncB = o, e.appendChild(s);
      }
      SVGTritoneFilter.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          var t = this.filterManager.effectElements[0].p.v, r = this.filterManager.effectElements[1].p.v, i = this.filterManager.effectElements[2].p.v, n = i[0] + " " + r[0] + " " + t[0], s = i[1] + " " + r[1] + " " + t[1], a = i[2] + " " + r[2] + " " + t[2];
          this.feFuncR.setAttribute("tableValues", n), this.feFuncG.setAttribute("tableValues", s), this.feFuncB.setAttribute("tableValues", a);
        }
      };
      function SVGProLevelsFilter(e, t, r, i) {
        this.filterManager = t;
        var n = this.filterManager.effectElements, s = createNS("feComponentTransfer");
        (n[10].p.k || n[10].p.v !== 0 || n[11].p.k || n[11].p.v !== 1 || n[12].p.k || n[12].p.v !== 1 || n[13].p.k || n[13].p.v !== 0 || n[14].p.k || n[14].p.v !== 1) && (this.feFuncR = this.createFeFunc("feFuncR", s)), (n[17].p.k || n[17].p.v !== 0 || n[18].p.k || n[18].p.v !== 1 || n[19].p.k || n[19].p.v !== 1 || n[20].p.k || n[20].p.v !== 0 || n[21].p.k || n[21].p.v !== 1) && (this.feFuncG = this.createFeFunc("feFuncG", s)), (n[24].p.k || n[24].p.v !== 0 || n[25].p.k || n[25].p.v !== 1 || n[26].p.k || n[26].p.v !== 1 || n[27].p.k || n[27].p.v !== 0 || n[28].p.k || n[28].p.v !== 1) && (this.feFuncB = this.createFeFunc("feFuncB", s)), (n[31].p.k || n[31].p.v !== 0 || n[32].p.k || n[32].p.v !== 1 || n[33].p.k || n[33].p.v !== 1 || n[34].p.k || n[34].p.v !== 0 || n[35].p.k || n[35].p.v !== 1) && (this.feFuncA = this.createFeFunc("feFuncA", s)), (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (s.setAttribute("color-interpolation-filters", "sRGB"), e.appendChild(s)), (n[3].p.k || n[3].p.v !== 0 || n[4].p.k || n[4].p.v !== 1 || n[5].p.k || n[5].p.v !== 1 || n[6].p.k || n[6].p.v !== 0 || n[7].p.k || n[7].p.v !== 1) && (s = createNS("feComponentTransfer"), s.setAttribute("color-interpolation-filters", "sRGB"), s.setAttribute("result", i), e.appendChild(s), this.feFuncRComposed = this.createFeFunc("feFuncR", s), this.feFuncGComposed = this.createFeFunc("feFuncG", s), this.feFuncBComposed = this.createFeFunc("feFuncB", s));
      }
      SVGProLevelsFilter.prototype.createFeFunc = function(e, t) {
        var r = createNS(e);
        return r.setAttribute("type", "table"), t.appendChild(r), r;
      }, SVGProLevelsFilter.prototype.getTableValue = function(e, t, r, i, n) {
        for (var s = 0, a = 256, l, o = Math.min(e, t), f = Math.max(e, t), c = Array.call(null, {
          length: a
        }), v, h = 0, g = n - i, m = t - e; s <= 256; )
          l = s / 256, l <= o ? v = m < 0 ? n : i : l >= f ? v = m < 0 ? i : n : v = i + g * Math.pow((l - e) / m, 1 / r), c[h] = v, h += 1, s += 256 / (a - 1);
        return c.join(" ");
      }, SVGProLevelsFilter.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          var t, r = this.filterManager.effectElements;
          this.feFuncRComposed && (e || r[3].p._mdf || r[4].p._mdf || r[5].p._mdf || r[6].p._mdf || r[7].p._mdf) && (t = this.getTableValue(r[3].p.v, r[4].p.v, r[5].p.v, r[6].p.v, r[7].p.v), this.feFuncRComposed.setAttribute("tableValues", t), this.feFuncGComposed.setAttribute("tableValues", t), this.feFuncBComposed.setAttribute("tableValues", t)), this.feFuncR && (e || r[10].p._mdf || r[11].p._mdf || r[12].p._mdf || r[13].p._mdf || r[14].p._mdf) && (t = this.getTableValue(r[10].p.v, r[11].p.v, r[12].p.v, r[13].p.v, r[14].p.v), this.feFuncR.setAttribute("tableValues", t)), this.feFuncG && (e || r[17].p._mdf || r[18].p._mdf || r[19].p._mdf || r[20].p._mdf || r[21].p._mdf) && (t = this.getTableValue(r[17].p.v, r[18].p.v, r[19].p.v, r[20].p.v, r[21].p.v), this.feFuncG.setAttribute("tableValues", t)), this.feFuncB && (e || r[24].p._mdf || r[25].p._mdf || r[26].p._mdf || r[27].p._mdf || r[28].p._mdf) && (t = this.getTableValue(r[24].p.v, r[25].p.v, r[26].p.v, r[27].p.v, r[28].p.v), this.feFuncB.setAttribute("tableValues", t)), this.feFuncA && (e || r[31].p._mdf || r[32].p._mdf || r[33].p._mdf || r[34].p._mdf || r[35].p._mdf) && (t = this.getTableValue(r[31].p.v, r[32].p.v, r[33].p.v, r[34].p.v, r[35].p.v), this.feFuncA.setAttribute("tableValues", t));
        }
      };
      function SVGDropShadowEffect(e, t, r, i, n) {
        var s = t.container.globalData.renderConfig.filterSize, a = t.data.fs || s;
        e.setAttribute("x", a.x || s.x), e.setAttribute("y", a.y || s.y), e.setAttribute("width", a.width || s.width), e.setAttribute("height", a.height || s.height), this.filterManager = t;
        var l = createNS("feGaussianBlur");
        l.setAttribute("in", "SourceAlpha"), l.setAttribute("result", i + "_drop_shadow_1"), l.setAttribute("stdDeviation", "0"), this.feGaussianBlur = l, e.appendChild(l);
        var o = createNS("feOffset");
        o.setAttribute("dx", "25"), o.setAttribute("dy", "0"), o.setAttribute("in", i + "_drop_shadow_1"), o.setAttribute("result", i + "_drop_shadow_2"), this.feOffset = o, e.appendChild(o);
        var f = createNS("feFlood");
        f.setAttribute("flood-color", "#00ff00"), f.setAttribute("flood-opacity", "1"), f.setAttribute("result", i + "_drop_shadow_3"), this.feFlood = f, e.appendChild(f);
        var c = createNS("feComposite");
        c.setAttribute("in", i + "_drop_shadow_3"), c.setAttribute("in2", i + "_drop_shadow_2"), c.setAttribute("operator", "in"), c.setAttribute("result", i + "_drop_shadow_4"), e.appendChild(c);
        var v = this.createMergeNode(i, [i + "_drop_shadow_4", n]);
        e.appendChild(v);
      }
      extendPrototype([SVGComposableEffect], SVGDropShadowEffect), SVGDropShadowEffect.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          if ((e || this.filterManager.effectElements[4].p._mdf) && this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4), e || this.filterManager.effectElements[0].p._mdf) {
            var t = this.filterManager.effectElements[0].p.v;
            this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(t[0] * 255), Math.round(t[1] * 255), Math.round(t[2] * 255)));
          }
          if ((e || this.filterManager.effectElements[1].p._mdf) && this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255), e || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
            var r = this.filterManager.effectElements[3].p.v, i = (this.filterManager.effectElements[2].p.v - 90) * degToRads, n = r * Math.cos(i), s = r * Math.sin(i);
            this.feOffset.setAttribute("dx", n), this.feOffset.setAttribute("dy", s);
          }
        }
      };
      var _svgMatteSymbols = [];
      function SVGMatte3Effect(e, t, r) {
        this.initialized = !1, this.filterManager = t, this.filterElem = e, this.elem = r, r.matteElement = createNS("g"), r.matteElement.appendChild(r.layerElement), r.matteElement.appendChild(r.transformedElement), r.baseElement = r.matteElement;
      }
      SVGMatte3Effect.prototype.findSymbol = function(e) {
        for (var t = 0, r = _svgMatteSymbols.length; t < r; ) {
          if (_svgMatteSymbols[t] === e)
            return _svgMatteSymbols[t];
          t += 1;
        }
        return null;
      }, SVGMatte3Effect.prototype.replaceInParent = function(e, t) {
        var r = e.layerElement.parentNode;
        if (r) {
          for (var i = r.children, n = 0, s = i.length; n < s && i[n] !== e.layerElement; )
            n += 1;
          var a;
          n <= s - 2 && (a = i[n + 1]);
          var l = createNS("use");
          l.setAttribute("href", "#" + t), a ? r.insertBefore(l, a) : r.appendChild(l);
        }
      }, SVGMatte3Effect.prototype.setElementAsMask = function(e, t) {
        if (!this.findSymbol(t)) {
          var r = createElementID(), i = createNS("mask");
          i.setAttribute("id", t.layerId), i.setAttribute("mask-type", "alpha"), _svgMatteSymbols.push(t);
          var n = e.globalData.defs;
          n.appendChild(i);
          var s = createNS("symbol");
          s.setAttribute("id", r), this.replaceInParent(t, r), s.appendChild(t.layerElement), n.appendChild(s);
          var a = createNS("use");
          a.setAttribute("href", "#" + r), i.appendChild(a), t.data.hd = !1, t.show();
        }
        e.setMatte(t.layerId);
      }, SVGMatte3Effect.prototype.initialize = function() {
        for (var e = this.filterManager.effectElements[0].p.v, t = this.elem.comp.elements, r = 0, i = t.length; r < i; )
          t[r] && t[r].data.ind === e && this.setElementAsMask(this.elem, t[r]), r += 1;
        this.initialized = !0;
      }, SVGMatte3Effect.prototype.renderFrame = function() {
        this.initialized || this.initialize();
      };
      function SVGGaussianBlurEffect(e, t, r, i) {
        e.setAttribute("x", "-100%"), e.setAttribute("y", "-100%"), e.setAttribute("width", "300%"), e.setAttribute("height", "300%"), this.filterManager = t;
        var n = createNS("feGaussianBlur");
        n.setAttribute("result", i), e.appendChild(n), this.feGaussianBlur = n;
      }
      SVGGaussianBlurEffect.prototype.renderFrame = function(e) {
        if (e || this.filterManager._mdf) {
          var t = 0.3, r = this.filterManager.effectElements[0].p.v * t, i = this.filterManager.effectElements[1].p.v, n = i == 3 ? 0 : r, s = i == 2 ? 0 : r;
          this.feGaussianBlur.setAttribute("stdDeviation", n + " " + s);
          var a = this.filterManager.effectElements[2].p.v == 1 ? "wrap" : "duplicate";
          this.feGaussianBlur.setAttribute("edgeMode", a);
        }
      };
      function TransformEffect() {
      }
      TransformEffect.prototype.init = function(e) {
        this.effectsManager = e, this.type = effectTypes.TRANSFORM_EFFECT, this.matrix = new Matrix(), this.opacity = -1, this._mdf = !1, this._opMdf = !1;
      }, TransformEffect.prototype.renderFrame = function(e) {
        if (this._opMdf = !1, this._mdf = !1, e || this.effectsManager._mdf) {
          var t = this.effectsManager.effectElements, r = t[0].p.v, i = t[1].p.v, n = t[2].p.v === 1, s = t[3].p.v, a = n ? s : t[4].p.v, l = t[5].p.v, o = t[6].p.v, f = t[7].p.v;
          this.matrix.reset(), this.matrix.translate(-r[0], -r[1], r[2]), this.matrix.scale(a * 0.01, s * 0.01, 1), this.matrix.rotate(-f * degToRads), this.matrix.skewFromAxis(-l * degToRads, (o + 90) * degToRads), this.matrix.translate(i[0], i[1], 0), this._mdf = !0, this.opacity !== t[8].p.v && (this.opacity = t[8].p.v, this._opMdf = !0);
        }
      };
      function SVGTransformEffect(e, t) {
        this.init(t);
      }
      extendPrototype([TransformEffect], SVGTransformEffect);
      function CVTransformEffect(e) {
        this.init(e);
      }
      return extendPrototype([TransformEffect], CVTransformEffect), registerRenderer("canvas", CanvasRenderer), registerRenderer("html", HybridRenderer), registerRenderer("svg", SVGRenderer), ShapeModifiers.registerModifier("tm", TrimModifier), ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier), ShapeModifiers.registerModifier("rp", RepeaterModifier), ShapeModifiers.registerModifier("rd", RoundCornersModifier), ShapeModifiers.registerModifier("zz", ZigZagModifier), ShapeModifiers.registerModifier("op", OffsetPathModifier), setExpressionsPlugin(Expressions), setExpressionInterfaces(getInterface), initialize$1(), initialize(), registerEffect$1(20, SVGTintFilter, !0), registerEffect$1(21, SVGFillFilter, !0), registerEffect$1(22, SVGStrokeEffect, !1), registerEffect$1(23, SVGTritoneFilter, !0), registerEffect$1(24, SVGProLevelsFilter, !0), registerEffect$1(25, SVGDropShadowEffect, !0), registerEffect$1(28, SVGMatte3Effect, !1), registerEffect$1(29, SVGGaussianBlurEffect, !0), registerEffect$1(35, SVGTransformEffect, !1), registerEffect(35, CVTransformEffect), lottie;
    });
  }(lottie$1, lottie$1.exports)), lottie$1.exports;
}
var lottieExports = requireLottie();
const LottiePlayer = /* @__PURE__ */ getDefaultExportFromCjs(lottieExports), Animation = ({
  animationData: e,
  path: t,
  options: r,
  width: i,
  height: n,
  className: s,
  ...a
}) => {
  const l = reactExports.useRef(null);
  return reactExports.useEffect(() => {
    if (!l.current)
      return;
    const o = LottiePlayer.loadAnimation({
      renderer: "svg",
      loop: !1,
      autoplay: !0,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet"
      },
      animationData: e,
      path: t,
      container: l.current,
      ...r || {}
    });
    return () => {
      o.destroy();
    };
  }, []), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: s, ref: l, style: { width: i, height: n } });
}, AlertContext = React.createContext(void 0);
var Icon = /* @__PURE__ */ ((e) => (e[e.success = 0] = "success", e[e.denied = 1] = "denied", e[e.warning = 2] = "warning", e[e.info = 3] = "info", e[e.confirm = 4] = "confirm", e))(Icon || {});
function UseAlert() {
  const e = React.useContext(AlertContext);
  if (e === void 0)
    throw new Error("UseAlert must be within AlertProvider");
  return e;
}
function AlertProvider(e) {
  var c;
  const [t, r] = reactExports.useState(), i = reactExports.useRef(0), n = reactExports.useRef(void 0), [s, a] = reactExports.useState(null);
  reactExports.useEffect(() => {
    i.current += 1;
  }, [t]);
  const l = /* @__PURE__ */ Object.assign({ "/src/assets/images/alert/denied.json": () => import("./denied-CgoMpaA7.js"), "/src/assets/images/alert/info.json": () => import("./info-D-NzIEYs.js"), "/src/assets/images/alert/success.json": () => import("./success-Bu_BJcf1.js"), "/src/assets/images/alert/warning.json": () => import("./warning-B1nr7TsB.js") }), o = (v) => {
    var m, p;
    let h = {
      title: "Are you confirm?",
      icon: 0,
      animation: "scale",
      size: "auto",
      allowClose: !1,
      timeoutProgress: !1,
      ...v || {}
    };
    const g = {
      0: "success.json",
      1: "denied.json",
      2: "warning.json",
      3: "info.json",
      4: "info.json"
    };
    if (Object.hasOwn(g, h.icon)) {
      const b = g[h.icon], u = Object.keys(l).filter((y) => y.endsWith(b)).pop();
      u && l[u]().then((y) => {
        a(y.default);
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
    }), (m = n.current) != null && m.isOpen() ? (p = n.current) == null || p.close().finally(() => {
      r(h);
    }) : r(h);
  }, f = (v) => {
    var g;
    const h = {
      [v]: !0,
      isConfirmed: v === "confirm",
      isCancelled: v === "cancel",
      isDenied: v === "deny"
    };
    t != null && t.onResult && t.onResult(h), (g = n.current) == null || g.close().then(() => {
      a(null), r(void 0);
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertContext.Provider, { value: { open: o }, children: [
    e.children,
    t && /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { size: t.size, className: "modal-alert", animation: t.animation, open: !0, ref: n, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "header" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "footer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "content", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column align-items-center", children: [
        s !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(Animation, { className: "modal-alert-icon", animationData: s }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "modal-alert-title", children: t.title }),
        !!((c = t.text) != null && c.length) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "modal-alert-text", children: t.text }),
        t.actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "d-flex justify-content-center align-items-center", children: Object.keys(t.actions).map((v) => {
          var h, g, m;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              className: "btn btn-lg mx-2 " + (((h = t.actions) == null ? void 0 : h[v].classList) ?? ["btn-primary"]).join(" "),
              onClick: () => f(v),
              children: ((m = ((g = t.actions) == null ? void 0 : g[v]) ?? null) == null ? void 0 : m.label) || v
            },
            v
          );
        }) })
      ] }) })
    ] })
  ] });
}
const DefaultModifyTemplate = ({ action: e, children: t, routeParams: r, results: i }) => {
  const { getAction: n } = UseActions(), s = n(e.entity, "list", e.namespace);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "edit", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "title", children: [
        s && /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: generateRoute(s.route, r), children: "←" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "title", content: t, data: i })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "navigation", content: t, data: i }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "content", content: t, data: i }) })
  ] });
}, Modify = ({ action: e, children: t, onSuccess: r, modal: i, props: n }) => {
  const s = { ...e.parameters || {}, ...useParams() }, a = reactExports.useRef(void 0), l = reactExports.useRef(void 0), { results: o, setParameters: f } = GetData({
    entityAction: e.action,
    initParameters: s
  }), { open: c } = UseAlert();
  reactExports.useEffect(() => {
    f(s);
  }, [JSON.stringify(s)]), reactExports.useEffect(() => {
    var h;
    (h = l.current) == null || h.open();
  }, [JSON.stringify(o)]);
  const v = i ? Modal : DefaultModifyTemplate;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(v, { ref: l, ...n, action: e, routeParams: s, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "title", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "title", content: t, data: o, children: (o == null ? void 0 : o.title) || "Title" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "navigation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicView, { namespace: e.action.namespace, view: "navigation", prefix: "modify", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TemplateBlock, { name: "navigation", content: t, data: o, children: [
      "original ",
      e.action.namespace
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicView, { namespace: e.action.namespace, view: "content", prefix: "modify", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "content", content: t, data: o, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModifyForm,
      {
        ref: a,
        data: o,
        action: e.action,
        onSuccess: (h) => {
          var m, p;
          (m = l.current) == null || m.close();
          const g = new CustomEvent("success", { detail: h });
          r && r(g, h), !g.defaultPrevented && c({
            title: "Success",
            text: Object.values(((p = h.messages) == null ? void 0 : p.success) ?? []).join(" ") ?? "Item was saved successful!",
            icon: Icon.success,
            actions: {
              close: {
                label: "OK"
              }
            }
          });
        },
        onError: (h) => {
          c({
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
        parameters: s,
        children: i && /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "actions" })
      }
    ) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateExtend, { name: "actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TemplateBlock, { name: "actions", content: t, data: o, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
}, EmptyView = () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No View Found" }), Link = ({ to: e, children: t, ...r }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: e, ...r, children: /* @__PURE__ */ jsxRuntimeExports.jsx(BaseButton, { ...r, children: t && t }) });
var top = "top", bottom = "bottom", right = "right", left = "left", auto = "auto", basePlacements = [top, bottom, right, left], start = "start", end = "end", clippingParents = "clippingParents", viewport = "viewport", popper = "popper", reference = "reference", variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(e, t) {
  return e.concat([t + "-" + start, t + "-" + end]);
}, []), placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(e, t) {
  return e.concat([t, t + "-" + start, t + "-" + end]);
}, []), beforeRead = "beforeRead", read = "read", afterRead = "afterRead", beforeMain = "beforeMain", main = "main", afterMain = "afterMain", beforeWrite = "beforeWrite", write = "write", afterWrite = "afterWrite", modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function getWindow(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function isElement$1(e) {
  var t = getWindow(e).Element;
  return e instanceof t || e instanceof Element;
}
function isHTMLElement(e) {
  var t = getWindow(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function isShadowRoot(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = getWindow(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function applyStyles(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var i = t.styles[r] || {}, n = t.attributes[r] || {}, s = t.elements[r];
    !isHTMLElement(s) || !getNodeName(s) || (Object.assign(s.style, i), Object.keys(n).forEach(function(a) {
      var l = n[a];
      l === !1 ? s.removeAttribute(a) : s.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function effect$2(e) {
  var t = e.state, r = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(i) {
      var n = t.elements[i], s = t.attributes[i] || {}, a = Object.keys(t.styles.hasOwnProperty(i) ? t.styles[i] : r[i]), l = a.reduce(function(o, f) {
        return o[f] = "", o;
      }, {});
      !isHTMLElement(n) || !getNodeName(n) || (Object.assign(n.style, l), Object.keys(s).forEach(function(o) {
        n.removeAttribute(o);
      }));
    });
  };
}
const applyStyles$1 = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: applyStyles,
  effect: effect$2,
  requires: ["computeStyles"]
};
function getBasePlacement(e) {
  return e.split("-")[0];
}
var max = Math.max, min = Math.min, round = Math.round;
function getUAString() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function getBoundingClientRect(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var i = e.getBoundingClientRect(), n = 1, s = 1;
  t && isHTMLElement(e) && (n = e.offsetWidth > 0 && round(i.width) / e.offsetWidth || 1, s = e.offsetHeight > 0 && round(i.height) / e.offsetHeight || 1);
  var a = isElement$1(e) ? getWindow(e) : window, l = a.visualViewport, o = !isLayoutViewport() && r, f = (i.left + (o && l ? l.offsetLeft : 0)) / n, c = (i.top + (o && l ? l.offsetTop : 0)) / s, v = i.width / n, h = i.height / s;
  return {
    width: v,
    height: h,
    top: c,
    right: f + v,
    bottom: c + h,
    left: f,
    x: f,
    y: c
  };
}
function getLayoutRect(e) {
  var t = getBoundingClientRect(e), r = e.offsetWidth, i = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: i
  };
}
function contains(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && isShadowRoot(r)) {
    var i = t;
    do {
      if (i && e.isSameNode(i))
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function getComputedStyle$1(e) {
  return getWindow(e).getComputedStyle(e);
}
function isTableElement(e) {
  return ["table", "td", "th"].indexOf(getNodeName(e)) >= 0;
}
function getDocumentElement(e) {
  return ((isElement$1(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function getParentNode(e) {
  return getNodeName(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (isShadowRoot(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(e)
  );
}
function getTrueOffsetParent(e) {
  return !isHTMLElement(e) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(e).position === "fixed" ? null : e.offsetParent;
}
function getContainingBlock(e) {
  var t = /firefox/i.test(getUAString()), r = /Trident/i.test(getUAString());
  if (r && isHTMLElement(e)) {
    var i = getComputedStyle$1(e);
    if (i.position === "fixed")
      return null;
  }
  var n = getParentNode(e);
  for (isShadowRoot(n) && (n = n.host); isHTMLElement(n) && ["html", "body"].indexOf(getNodeName(n)) < 0; ) {
    var s = getComputedStyle$1(n);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return n;
    n = n.parentNode;
  }
  return null;
}
function getOffsetParent(e) {
  for (var t = getWindow(e), r = getTrueOffsetParent(e); r && isTableElement(r) && getComputedStyle$1(r).position === "static"; )
    r = getTrueOffsetParent(r);
  return r && (getNodeName(r) === "html" || getNodeName(r) === "body" && getComputedStyle$1(r).position === "static") ? t : r || getContainingBlock(e) || t;
}
function getMainAxisFromPlacement(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function within(e, t, r) {
  return max(e, min(t, r));
}
function withinMaxClamp(e, t, r) {
  var i = within(e, t, r);
  return i > r ? r : i;
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(e) {
  return Object.assign({}, getFreshSideObject(), e);
}
function expandToHashMap(e, t) {
  return t.reduce(function(r, i) {
    return r[i] = e, r;
  }, {});
}
var toPaddingObject = function e(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, mergePaddingObject(typeof t != "number" ? t : expandToHashMap(t, basePlacements));
};
function arrow(e) {
  var t, r = e.state, i = e.name, n = e.options, s = r.elements.arrow, a = r.modifiersData.popperOffsets, l = getBasePlacement(r.placement), o = getMainAxisFromPlacement(l), f = [left, right].indexOf(l) >= 0, c = f ? "height" : "width";
  if (!(!s || !a)) {
    var v = toPaddingObject(n.padding, r), h = getLayoutRect(s), g = o === "y" ? top : left, m = o === "y" ? bottom : right, p = r.rects.reference[c] + r.rects.reference[o] - a[o] - r.rects.popper[c], b = a[o] - r.rects.reference[o], u = getOffsetParent(s), y = u ? o === "y" ? u.clientHeight || 0 : u.clientWidth || 0 : 0, d = p / 2 - b / 2, E = v[g], S = y - h[c] - v[m], C = y / 2 - h[c] / 2 + d, w = within(E, C, S), M = o;
    r.modifiersData[i] = (t = {}, t[M] = w, t.centerOffset = w - C, t);
  }
}
function effect$1(e) {
  var t = e.state, r = e.options, i = r.element, n = i === void 0 ? "[data-popper-arrow]" : i;
  n != null && (typeof n == "string" && (n = t.elements.popper.querySelector(n), !n) || contains(t.elements.popper, n) && (t.elements.arrow = n));
}
const arrow$1 = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(e) {
  return e.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(e, t) {
  var r = e.x, i = e.y, n = t.devicePixelRatio || 1;
  return {
    x: round(r * n) / n || 0,
    y: round(i * n) / n || 0
  };
}
function mapToStyles(e) {
  var t, r = e.popper, i = e.popperRect, n = e.placement, s = e.variation, a = e.offsets, l = e.position, o = e.gpuAcceleration, f = e.adaptive, c = e.roundOffsets, v = e.isFixed, h = a.x, g = h === void 0 ? 0 : h, m = a.y, p = m === void 0 ? 0 : m, b = typeof c == "function" ? c({
    x: g,
    y: p
  }) : {
    x: g,
    y: p
  };
  g = b.x, p = b.y;
  var u = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), d = left, E = top, S = window;
  if (f) {
    var C = getOffsetParent(r), w = "clientHeight", M = "clientWidth";
    if (C === getWindow(r) && (C = getDocumentElement(r), getComputedStyle$1(C).position !== "static" && l === "absolute" && (w = "scrollHeight", M = "scrollWidth")), C = C, n === top || (n === left || n === right) && s === end) {
      E = bottom;
      var O = v && C === S && S.visualViewport ? S.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[w]
      );
      p -= O - i.height, p *= o ? 1 : -1;
    }
    if (n === left || (n === top || n === bottom) && s === end) {
      d = right;
      var j = v && C === S && S.visualViewport ? S.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[M]
      );
      g -= j - i.width, g *= o ? 1 : -1;
    }
  }
  var B = Object.assign({
    position: l
  }, f && unsetSides), L = c === !0 ? roundOffsetsByDPR({
    x: g,
    y: p
  }, getWindow(r)) : {
    x: g,
    y: p
  };
  if (g = L.x, p = L.y, o) {
    var V;
    return Object.assign({}, B, (V = {}, V[E] = y ? "0" : "", V[d] = u ? "0" : "", V.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + p + "px)" : "translate3d(" + g + "px, " + p + "px, 0)", V));
  }
  return Object.assign({}, B, (t = {}, t[E] = y ? p + "px" : "", t[d] = u ? g + "px" : "", t.transform = "", t));
}
function computeStyles(e) {
  var t = e.state, r = e.options, i = r.gpuAcceleration, n = i === void 0 ? !0 : i, s = r.adaptive, a = s === void 0 ? !0 : s, l = r.roundOffsets, o = l === void 0 ? !0 : l, f = {
    placement: getBasePlacement(t.placement),
    variation: getVariation(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: n,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, mapToStyles(Object.assign({}, f, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: o
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, mapToStyles(Object.assign({}, f, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: o
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const computeStyles$1 = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: !0
};
function effect(e) {
  var t = e.state, r = e.instance, i = e.options, n = i.scroll, s = n === void 0 ? !0 : n, a = i.resize, l = a === void 0 ? !0 : a, o = getWindow(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && f.forEach(function(c) {
    c.addEventListener("scroll", r.update, passive);
  }), l && o.addEventListener("resize", r.update, passive), function() {
    s && f.forEach(function(c) {
      c.removeEventListener("scroll", r.update, passive);
    }), l && o.removeEventListener("resize", r.update, passive);
  };
}
const eventListeners = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function e() {
  },
  effect,
  data: {}
};
var hash$1 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return hash$1[t];
  });
}
var hash = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(e) {
  return e.replace(/start|end/g, function(t) {
    return hash[t];
  });
}
function getWindowScroll(e) {
  var t = getWindow(e), r = t.pageXOffset, i = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: i
  };
}
function getWindowScrollBarX(e) {
  return getBoundingClientRect(getDocumentElement(e)).left + getWindowScroll(e).scrollLeft;
}
function getViewportRect(e, t) {
  var r = getWindow(e), i = getDocumentElement(e), n = r.visualViewport, s = i.clientWidth, a = i.clientHeight, l = 0, o = 0;
  if (n) {
    s = n.width, a = n.height;
    var f = isLayoutViewport();
    (f || !f && t === "fixed") && (l = n.offsetLeft, o = n.offsetTop);
  }
  return {
    width: s,
    height: a,
    x: l + getWindowScrollBarX(e),
    y: o
  };
}
function getDocumentRect(e) {
  var t, r = getDocumentElement(e), i = getWindowScroll(e), n = (t = e.ownerDocument) == null ? void 0 : t.body, s = max(r.scrollWidth, r.clientWidth, n ? n.scrollWidth : 0, n ? n.clientWidth : 0), a = max(r.scrollHeight, r.clientHeight, n ? n.scrollHeight : 0, n ? n.clientHeight : 0), l = -i.scrollLeft + getWindowScrollBarX(e), o = -i.scrollTop;
  return getComputedStyle$1(n || r).direction === "rtl" && (l += max(r.clientWidth, n ? n.clientWidth : 0) - s), {
    width: s,
    height: a,
    x: l,
    y: o
  };
}
function isScrollParent(e) {
  var t = getComputedStyle$1(e), r = t.overflow, i = t.overflowX, n = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + n + i);
}
function getScrollParent(e) {
  return ["html", "body", "#document"].indexOf(getNodeName(e)) >= 0 ? e.ownerDocument.body : isHTMLElement(e) && isScrollParent(e) ? e : getScrollParent(getParentNode(e));
}
function listScrollParents(e, t) {
  var r;
  t === void 0 && (t = []);
  var i = getScrollParent(e), n = i === ((r = e.ownerDocument) == null ? void 0 : r.body), s = getWindow(i), a = n ? [s].concat(s.visualViewport || [], isScrollParent(i) ? i : []) : i, l = t.concat(a);
  return n ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(listScrollParents(getParentNode(a)))
  );
}
function rectToClientRect(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function getInnerBoundingClientRect(e, t) {
  var r = getBoundingClientRect(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function getClientRectFromMixedType(e, t, r) {
  return t === viewport ? rectToClientRect(getViewportRect(e, r)) : isElement$1(t) ? getInnerBoundingClientRect(t, r) : rectToClientRect(getDocumentRect(getDocumentElement(e)));
}
function getClippingParents(e) {
  var t = listScrollParents(getParentNode(e)), r = ["absolute", "fixed"].indexOf(getComputedStyle$1(e).position) >= 0, i = r && isHTMLElement(e) ? getOffsetParent(e) : e;
  return isElement$1(i) ? t.filter(function(n) {
    return isElement$1(n) && contains(n, i) && getNodeName(n) !== "body";
  }) : [];
}
function getClippingRect(e, t, r, i) {
  var n = t === "clippingParents" ? getClippingParents(e) : [].concat(t), s = [].concat(n, [r]), a = s[0], l = s.reduce(function(o, f) {
    var c = getClientRectFromMixedType(e, f, i);
    return o.top = max(c.top, o.top), o.right = min(c.right, o.right), o.bottom = min(c.bottom, o.bottom), o.left = max(c.left, o.left), o;
  }, getClientRectFromMixedType(e, a, i));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function computeOffsets(e) {
  var t = e.reference, r = e.element, i = e.placement, n = i ? getBasePlacement(i) : null, s = i ? getVariation(i) : null, a = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, o;
  switch (n) {
    case top:
      o = {
        x: a,
        y: t.y - r.height
      };
      break;
    case bottom:
      o = {
        x: a,
        y: t.y + t.height
      };
      break;
    case right:
      o = {
        x: t.x + t.width,
        y: l
      };
      break;
    case left:
      o = {
        x: t.x - r.width,
        y: l
      };
      break;
    default:
      o = {
        x: t.x,
        y: t.y
      };
  }
  var f = n ? getMainAxisFromPlacement(n) : null;
  if (f != null) {
    var c = f === "y" ? "height" : "width";
    switch (s) {
      case start:
        o[f] = o[f] - (t[c] / 2 - r[c] / 2);
        break;
      case end:
        o[f] = o[f] + (t[c] / 2 - r[c] / 2);
        break;
    }
  }
  return o;
}
function detectOverflow(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, n = i === void 0 ? e.placement : i, s = r.strategy, a = s === void 0 ? e.strategy : s, l = r.boundary, o = l === void 0 ? clippingParents : l, f = r.rootBoundary, c = f === void 0 ? viewport : f, v = r.elementContext, h = v === void 0 ? popper : v, g = r.altBoundary, m = g === void 0 ? !1 : g, p = r.padding, b = p === void 0 ? 0 : p, u = mergePaddingObject(typeof b != "number" ? b : expandToHashMap(b, basePlacements)), y = h === popper ? reference : popper, d = e.rects.popper, E = e.elements[m ? y : h], S = getClippingRect(isElement$1(E) ? E : E.contextElement || getDocumentElement(e.elements.popper), o, c, a), C = getBoundingClientRect(e.elements.reference), w = computeOffsets({
    reference: C,
    element: d,
    placement: n
  }), M = rectToClientRect(Object.assign({}, d, w)), O = h === popper ? M : C, j = {
    top: S.top - O.top + u.top,
    bottom: O.bottom - S.bottom + u.bottom,
    left: S.left - O.left + u.left,
    right: O.right - S.right + u.right
  }, B = e.modifiersData.offset;
  if (h === popper && B) {
    var L = B[n];
    Object.keys(j).forEach(function(V) {
      var $ = [right, bottom].indexOf(V) >= 0 ? 1 : -1, D = [top, bottom].indexOf(V) >= 0 ? "y" : "x";
      j[V] += L[D] * $;
    });
  }
  return j;
}
function computeAutoPlacement(e, t) {
  t === void 0 && (t = {});
  var r = t, i = r.placement, n = r.boundary, s = r.rootBoundary, a = r.padding, l = r.flipVariations, o = r.allowedAutoPlacements, f = o === void 0 ? placements : o, c = getVariation(i), v = c ? l ? variationPlacements : variationPlacements.filter(function(m) {
    return getVariation(m) === c;
  }) : basePlacements, h = v.filter(function(m) {
    return f.indexOf(m) >= 0;
  });
  h.length === 0 && (h = v);
  var g = h.reduce(function(m, p) {
    return m[p] = detectOverflow(e, {
      placement: p,
      boundary: n,
      rootBoundary: s,
      padding: a
    })[getBasePlacement(p)], m;
  }, {});
  return Object.keys(g).sort(function(m, p) {
    return g[m] - g[p];
  });
}
function getExpandedFallbackPlacements(e) {
  if (getBasePlacement(e) === auto)
    return [];
  var t = getOppositePlacement(e);
  return [getOppositeVariationPlacement(e), t, getOppositeVariationPlacement(t)];
}
function flip(e) {
  var t = e.state, r = e.options, i = e.name;
  if (!t.modifiersData[i]._skip) {
    for (var n = r.mainAxis, s = n === void 0 ? !0 : n, a = r.altAxis, l = a === void 0 ? !0 : a, o = r.fallbackPlacements, f = r.padding, c = r.boundary, v = r.rootBoundary, h = r.altBoundary, g = r.flipVariations, m = g === void 0 ? !0 : g, p = r.allowedAutoPlacements, b = t.options.placement, u = getBasePlacement(b), y = u === b, d = o || (y || !m ? [getOppositePlacement(b)] : getExpandedFallbackPlacements(b)), E = [b].concat(d).reduce(function(z, J) {
      return z.concat(getBasePlacement(J) === auto ? computeAutoPlacement(t, {
        placement: J,
        boundary: c,
        rootBoundary: v,
        padding: f,
        flipVariations: m,
        allowedAutoPlacements: p
      }) : J);
    }, []), S = t.rects.reference, C = t.rects.popper, w = /* @__PURE__ */ new Map(), M = !0, O = E[0], j = 0; j < E.length; j++) {
      var B = E[j], L = getBasePlacement(B), V = getVariation(B) === start, $ = [top, bottom].indexOf(L) >= 0, D = $ ? "width" : "height", A = detectOverflow(t, {
        placement: B,
        boundary: c,
        rootBoundary: v,
        altBoundary: h,
        padding: f
      }), k = $ ? V ? right : left : V ? bottom : top;
      S[D] > C[D] && (k = getOppositePlacement(k));
      var x = getOppositePlacement(k), P = [];
      if (s && P.push(A[L] <= 0), l && P.push(A[k] <= 0, A[x] <= 0), P.every(function(z) {
        return z;
      })) {
        O = B, M = !1;
        break;
      }
      w.set(B, P);
    }
    if (M)
      for (var T = m ? 3 : 1, R = function(J) {
        var q = E.find(function(se) {
          var ie = w.get(se);
          if (ie)
            return ie.slice(0, J).every(function(ce) {
              return ce;
            });
        });
        if (q)
          return O = q, "break";
      }, N = T; N > 0; N--) {
        var H = R(N);
        if (H === "break") break;
      }
    t.placement !== O && (t.modifiersData[i]._skip = !0, t.placement = O, t.reset = !0);
  }
}
const flip$1 = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function getSideOffsets(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function isAnySideFullyClipped(e) {
  return [top, right, bottom, left].some(function(t) {
    return e[t] >= 0;
  });
}
function hide(e) {
  var t = e.state, r = e.name, i = t.rects.reference, n = t.rects.popper, s = t.modifiersData.preventOverflow, a = detectOverflow(t, {
    elementContext: "reference"
  }), l = detectOverflow(t, {
    altBoundary: !0
  }), o = getSideOffsets(a, i), f = getSideOffsets(l, n, s), c = isAnySideFullyClipped(o), v = isAnySideFullyClipped(f);
  t.modifiersData[r] = {
    referenceClippingOffsets: o,
    popperEscapeOffsets: f,
    isReferenceHidden: c,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": v
  });
}
const hide$1 = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(e, t, r) {
  var i = getBasePlacement(e), n = [left, top].indexOf(i) >= 0 ? -1 : 1, s = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, a = s[0], l = s[1];
  return a = a || 0, l = (l || 0) * n, [left, right].indexOf(i) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function offset(e) {
  var t = e.state, r = e.options, i = e.name, n = r.offset, s = n === void 0 ? [0, 0] : n, a = placements.reduce(function(c, v) {
    return c[v] = distanceAndSkiddingToXY(v, t.rects, s), c;
  }, {}), l = a[t.placement], o = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += o, t.modifiersData.popperOffsets.y += f), t.modifiersData[i] = a;
}
const offset$1 = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = computeOffsets({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const popperOffsets$1 = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(e) {
  return e === "x" ? "y" : "x";
}
function preventOverflow(e) {
  var t = e.state, r = e.options, i = e.name, n = r.mainAxis, s = n === void 0 ? !0 : n, a = r.altAxis, l = a === void 0 ? !1 : a, o = r.boundary, f = r.rootBoundary, c = r.altBoundary, v = r.padding, h = r.tether, g = h === void 0 ? !0 : h, m = r.tetherOffset, p = m === void 0 ? 0 : m, b = detectOverflow(t, {
    boundary: o,
    rootBoundary: f,
    padding: v,
    altBoundary: c
  }), u = getBasePlacement(t.placement), y = getVariation(t.placement), d = !y, E = getMainAxisFromPlacement(u), S = getAltAxis(E), C = t.modifiersData.popperOffsets, w = t.rects.reference, M = t.rects.popper, O = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, j = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), B = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, L = {
    x: 0,
    y: 0
  };
  if (C) {
    if (s) {
      var V, $ = E === "y" ? top : left, D = E === "y" ? bottom : right, A = E === "y" ? "height" : "width", k = C[E], x = k + b[$], P = k - b[D], T = g ? -M[A] / 2 : 0, R = y === start ? w[A] : M[A], N = y === start ? -M[A] : -w[A], H = t.elements.arrow, z = g && H ? getLayoutRect(H) : {
        width: 0,
        height: 0
      }, J = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : getFreshSideObject(), q = J[$], se = J[D], ie = within(0, w[A], z[A]), ce = d ? w[A] / 2 - T - ie - q - j.mainAxis : R - ie - q - j.mainAxis, ue = d ? -w[A] / 2 + T + ie + se + j.mainAxis : N + ie + se + j.mainAxis, fe = t.elements.arrow && getOffsetParent(t.elements.arrow), pe = fe ? E === "y" ? fe.clientTop || 0 : fe.clientLeft || 0 : 0, ae = (V = B == null ? void 0 : B[E]) != null ? V : 0, K = k + ce - ae - pe, ye = k + ue - ae, Ee = within(g ? min(x, K) : x, k, g ? max(P, ye) : P);
      C[E] = Ee, L[E] = Ee - k;
    }
    if (l) {
      var ge, xe = E === "x" ? top : left, be = E === "x" ? bottom : right, de = C[S], F = S === "y" ? "height" : "width", U = de + b[xe], Y = de - b[be], ee = [top, left].indexOf(u) !== -1, oe = (ge = B == null ? void 0 : B[S]) != null ? ge : 0, ne = ee ? U : de - w[F] - M[F] - oe + j.altAxis, re = ee ? de + w[F] + M[F] - oe - j.altAxis : Y, Q = g && ee ? withinMaxClamp(ne, de, re) : within(g ? ne : U, de, g ? re : Y);
      C[S] = Q, L[S] = Q - de;
    }
    t.modifiersData[i] = L;
  }
}
const preventOverflow$1 = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function getNodeScroll(e) {
  return e === getWindow(e) || !isHTMLElement(e) ? getWindowScroll(e) : getHTMLElementScroll(e);
}
function isElementScaled(e) {
  var t = e.getBoundingClientRect(), r = round(t.width) / e.offsetWidth || 1, i = round(t.height) / e.offsetHeight || 1;
  return r !== 1 || i !== 1;
}
function getCompositeRect(e, t, r) {
  r === void 0 && (r = !1);
  var i = isHTMLElement(t), n = isHTMLElement(t) && isElementScaled(t), s = getDocumentElement(t), a = getBoundingClientRect(e, n, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, o = {
    x: 0,
    y: 0
  };
  return (i || !i && !r) && ((getNodeName(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  isScrollParent(s)) && (l = getNodeScroll(t)), isHTMLElement(t) ? (o = getBoundingClientRect(t, !0), o.x += t.clientLeft, o.y += t.clientTop) : s && (o.x = getWindowScrollBarX(s))), {
    x: a.left + l.scrollLeft - o.x,
    y: a.top + l.scrollTop - o.y,
    width: a.width,
    height: a.height
  };
}
function order(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), i = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function n(s) {
    r.add(s.name);
    var a = [].concat(s.requires || [], s.requiresIfExists || []);
    a.forEach(function(l) {
      if (!r.has(l)) {
        var o = t.get(l);
        o && n(o);
      }
    }), i.push(s);
  }
  return e.forEach(function(s) {
    r.has(s.name) || n(s);
  }), i;
}
function orderModifiers(e) {
  var t = order(e);
  return modifierPhases.reduce(function(r, i) {
    return r.concat(t.filter(function(n) {
      return n.phase === i;
    }));
  }, []);
}
function debounce(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function mergeByName(e) {
  var t = e.reduce(function(r, i) {
    var n = r[i.name];
    return r[i.name] = n ? Object.assign({}, n, i, {
      options: Object.assign({}, n.options, i.options),
      data: Object.assign({}, n.data, i.data)
    }) : i, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(i) {
    return !(i && typeof i.getBoundingClientRect == "function");
  });
}
function popperGenerator(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, i = r === void 0 ? [] : r, n = t.defaultOptions, s = n === void 0 ? DEFAULT_OPTIONS : n;
  return function(l, o, f) {
    f === void 0 && (f = s);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, s),
      modifiersData: {},
      elements: {
        reference: l,
        popper: o
      },
      attributes: {},
      styles: {}
    }, v = [], h = !1, g = {
      state: c,
      setOptions: function(u) {
        var y = typeof u == "function" ? u(c.options) : u;
        p(), c.options = Object.assign({}, s, c.options, y), c.scrollParents = {
          reference: isElement$1(l) ? listScrollParents(l) : l.contextElement ? listScrollParents(l.contextElement) : [],
          popper: listScrollParents(o)
        };
        var d = orderModifiers(mergeByName([].concat(i, c.options.modifiers)));
        return c.orderedModifiers = d.filter(function(E) {
          return E.enabled;
        }), m(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!h) {
          var u = c.elements, y = u.reference, d = u.popper;
          if (areValidElements(y, d)) {
            c.rects = {
              reference: getCompositeRect(y, getOffsetParent(d), c.options.strategy === "fixed"),
              popper: getLayoutRect(d)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(j) {
              return c.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var E = 0; E < c.orderedModifiers.length; E++) {
              if (c.reset === !0) {
                c.reset = !1, E = -1;
                continue;
              }
              var S = c.orderedModifiers[E], C = S.fn, w = S.options, M = w === void 0 ? {} : w, O = S.name;
              typeof C == "function" && (c = C({
                state: c,
                options: M,
                name: O,
                instance: g
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(b) {
          g.forceUpdate(), b(c);
        });
      }),
      destroy: function() {
        p(), h = !0;
      }
    };
    if (!areValidElements(l, o))
      return g;
    g.setOptions(f).then(function(b) {
      !h && f.onFirstUpdate && f.onFirstUpdate(b);
    });
    function m() {
      c.orderedModifiers.forEach(function(b) {
        var u = b.name, y = b.options, d = y === void 0 ? {} : y, E = b.effect;
        if (typeof E == "function") {
          var S = E({
            state: c,
            name: u,
            instance: g,
            options: d
          }), C = function() {
          };
          v.push(S || C);
        }
      });
    }
    function p() {
      v.forEach(function(b) {
        return b();
      }), v = [];
    }
    return g;
  };
}
var createPopper$2 = /* @__PURE__ */ popperGenerator(), defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1], createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
}), defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1], createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
const Popper = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  afterMain,
  afterRead,
  afterWrite,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  auto,
  basePlacements,
  beforeMain,
  beforeRead,
  beforeWrite,
  bottom,
  clippingParents,
  computeStyles: computeStyles$1,
  createPopper,
  createPopperBase: createPopper$2,
  createPopperLite: createPopper$1,
  detectOverflow,
  end,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  left,
  main,
  modifierPhases,
  offset: offset$1,
  placements,
  popper,
  popperGenerator,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1,
  read,
  reference,
  right,
  start,
  top,
  variationPlacements,
  viewport,
  write
}, Symbol.toStringTag, { value: "Module" })), elementMap = /* @__PURE__ */ new Map(), Data = {
  set(e, t, r) {
    elementMap.has(e) || elementMap.set(e, /* @__PURE__ */ new Map());
    const i = elementMap.get(e);
    if (!i.has(t) && i.size !== 0) {
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`);
      return;
    }
    i.set(t, r);
  },
  get(e, t) {
    return elementMap.has(e) && elementMap.get(e).get(t) || null;
  },
  remove(e, t) {
    if (!elementMap.has(e))
      return;
    const r = elementMap.get(e);
    r.delete(t), r.size === 0 && elementMap.delete(e);
  }
}, MILLISECONDS_MULTIPLIER = 1e3, TRANSITION_END = "transitionend", parseSelector = (e) => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (t, r) => `#${CSS.escape(r)}`)), e), toType = (e) => e == null ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(), getTransitionDurationFromElement = (e) => {
  if (!e)
    return 0;
  let { transitionDuration: t, transitionDelay: r } = window.getComputedStyle(e);
  const i = Number.parseFloat(t), n = Number.parseFloat(r);
  return !i && !n ? 0 : (t = t.split(",")[0], r = r.split(",")[0], (Number.parseFloat(t) + Number.parseFloat(r)) * MILLISECONDS_MULTIPLIER);
}, triggerTransitionEnd = (e) => {
  e.dispatchEvent(new Event(TRANSITION_END));
}, isElement = (e) => !e || typeof e != "object" ? !1 : (typeof e.jquery < "u" && (e = e[0]), typeof e.nodeType < "u"), getElement = (e) => isElement(e) ? e.jquery ? e[0] : e : typeof e == "string" && e.length > 0 ? document.querySelector(parseSelector(e)) : null, isVisible = (e) => {
  if (!isElement(e) || e.getClientRects().length === 0)
    return !1;
  const t = getComputedStyle(e).getPropertyValue("visibility") === "visible", r = e.closest("details:not([open])");
  if (!r)
    return t;
  if (r !== e) {
    const i = e.closest("summary");
    if (i && i.parentNode !== r || i === null)
      return !1;
  }
  return t;
}, isDisabled = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled") ? !0 : typeof e.disabled < "u" ? e.disabled : e.hasAttribute("disabled") && e.getAttribute("disabled") !== "false", noop = () => {
}, getjQuery = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, DOMContentLoadedCallbacks = [], onDOMContentLoaded = (e) => {
  document.readyState === "loading" ? (DOMContentLoadedCallbacks.length || document.addEventListener("DOMContentLoaded", () => {
    for (const t of DOMContentLoadedCallbacks)
      t();
  }), DOMContentLoadedCallbacks.push(e)) : e();
}, isRTL = () => document.documentElement.dir === "rtl", defineJQueryPlugin = (e) => {
  onDOMContentLoaded(() => {
    const t = getjQuery();
    if (t) {
      const r = e.NAME, i = t.fn[r];
      t.fn[r] = e.jQueryInterface, t.fn[r].Constructor = e, t.fn[r].noConflict = () => (t.fn[r] = i, e.jQueryInterface);
    }
  });
}, execute = (e, t = [], r = e) => typeof e == "function" ? e(...t) : r, executeAfterTransition = (e, t, r = !0) => {
  if (!r) {
    execute(e);
    return;
  }
  const n = getTransitionDurationFromElement(t) + 5;
  let s = !1;
  const a = ({ target: l }) => {
    l === t && (s = !0, t.removeEventListener(TRANSITION_END, a), execute(e));
  };
  t.addEventListener(TRANSITION_END, a), setTimeout(() => {
    s || triggerTransitionEnd(t);
  }, n);
}, getNextActiveElement = (e, t, r, i) => {
  const n = e.length;
  let s = e.indexOf(t);
  return s === -1 ? !r && i ? e[n - 1] : e[0] : (s += r ? 1 : -1, i && (s = (s + n) % n), e[Math.max(0, Math.min(s, n - 1))]);
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
function makeEventUid(e, t) {
  return t && `${t}::${uidEvent++}` || e.uidEvent || uidEvent++;
}
function getElementEvents(e) {
  const t = makeEventUid(e);
  return e.uidEvent = t, eventRegistry[t] = eventRegistry[t] || {}, eventRegistry[t];
}
function bootstrapHandler(e, t) {
  return function r(i) {
    return hydrateObj(i, { delegateTarget: e }), r.oneOff && EventHandler.off(e, i.type, t), t.apply(e, [i]);
  };
}
function bootstrapDelegationHandler(e, t, r) {
  return function i(n) {
    const s = e.querySelectorAll(t);
    for (let { target: a } = n; a && a !== this; a = a.parentNode)
      for (const l of s)
        if (l === a)
          return hydrateObj(n, { delegateTarget: a }), i.oneOff && EventHandler.off(e, n.type, t, r), r.apply(a, [n]);
  };
}
function findHandler(e, t, r = null) {
  return Object.values(e).find((i) => i.callable === t && i.delegationSelector === r);
}
function normalizeParameters(e, t, r) {
  const i = typeof t == "string", n = i ? r : t || r;
  let s = getTypeEvent(e);
  return nativeEvents.has(s) || (s = e), [i, n, s];
}
function addHandler(e, t, r, i, n) {
  if (typeof t != "string" || !e)
    return;
  let [s, a, l] = normalizeParameters(t, r, i);
  t in customEvents && (a = ((m) => function(p) {
    if (!p.relatedTarget || p.relatedTarget !== p.delegateTarget && !p.delegateTarget.contains(p.relatedTarget))
      return m.call(this, p);
  })(a));
  const o = getElementEvents(e), f = o[l] || (o[l] = {}), c = findHandler(f, a, s ? r : null);
  if (c) {
    c.oneOff = c.oneOff && n;
    return;
  }
  const v = makeEventUid(a, t.replace(namespaceRegex, "")), h = s ? bootstrapDelegationHandler(e, r, a) : bootstrapHandler(e, a);
  h.delegationSelector = s ? r : null, h.callable = a, h.oneOff = n, h.uidEvent = v, f[v] = h, e.addEventListener(l, h, s);
}
function removeHandler(e, t, r, i, n) {
  const s = findHandler(t[r], i, n);
  s && (e.removeEventListener(r, s, !!n), delete t[r][s.uidEvent]);
}
function removeNamespacedHandlers(e, t, r, i) {
  const n = t[r] || {};
  for (const [s, a] of Object.entries(n))
    s.includes(i) && removeHandler(e, t, r, a.callable, a.delegationSelector);
}
function getTypeEvent(e) {
  return e = e.replace(stripNameRegex, ""), customEvents[e] || e;
}
const EventHandler = {
  on(e, t, r, i) {
    addHandler(e, t, r, i, !1);
  },
  one(e, t, r, i) {
    addHandler(e, t, r, i, !0);
  },
  off(e, t, r, i) {
    if (typeof t != "string" || !e)
      return;
    const [n, s, a] = normalizeParameters(t, r, i), l = a !== t, o = getElementEvents(e), f = o[a] || {}, c = t.startsWith(".");
    if (typeof s < "u") {
      if (!Object.keys(f).length)
        return;
      removeHandler(e, o, a, s, n ? r : null);
      return;
    }
    if (c)
      for (const v of Object.keys(o))
        removeNamespacedHandlers(e, o, v, t.slice(1));
    for (const [v, h] of Object.entries(f)) {
      const g = v.replace(stripUidRegex, "");
      (!l || t.includes(g)) && removeHandler(e, o, a, h.callable, h.delegationSelector);
    }
  },
  trigger(e, t, r) {
    if (typeof t != "string" || !e)
      return null;
    const i = getjQuery(), n = getTypeEvent(t), s = t !== n;
    let a = null, l = !0, o = !0, f = !1;
    s && i && (a = i.Event(t, r), i(e).trigger(a), l = !a.isPropagationStopped(), o = !a.isImmediatePropagationStopped(), f = a.isDefaultPrevented());
    const c = hydrateObj(new Event(t, { bubbles: l, cancelable: !0 }), r);
    return f && c.preventDefault(), o && e.dispatchEvent(c), c.defaultPrevented && a && a.preventDefault(), c;
  }
};
function hydrateObj(e, t = {}) {
  for (const [r, i] of Object.entries(t))
    try {
      e[r] = i;
    } catch {
      Object.defineProperty(e, r, {
        configurable: !0,
        get() {
          return i;
        }
      });
    }
  return e;
}
function normalizeData(e) {
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
function normalizeDataKey(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
const Manipulator = {
  setDataAttribute(e, t, r) {
    e.setAttribute(`data-bs-${normalizeDataKey(t)}`, r);
  },
  removeDataAttribute(e, t) {
    e.removeAttribute(`data-bs-${normalizeDataKey(t)}`);
  },
  getDataAttributes(e) {
    if (!e)
      return {};
    const t = {}, r = Object.keys(e.dataset).filter((i) => i.startsWith("bs") && !i.startsWith("bsConfig"));
    for (const i of r) {
      let n = i.replace(/^bs/, "");
      n = n.charAt(0).toLowerCase() + n.slice(1, n.length), t[n] = normalizeData(e.dataset[i]);
    }
    return t;
  },
  getDataAttribute(e, t) {
    return normalizeData(e.getAttribute(`data-bs-${normalizeDataKey(t)}`));
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
  _getConfig(t) {
    return t = this._mergeConfigObj(t), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  _configAfterMerge(t) {
    return t;
  }
  _mergeConfigObj(t, r) {
    const i = isElement(r) ? Manipulator.getDataAttribute(r, "config") : {};
    return {
      ...this.constructor.Default,
      ...typeof i == "object" ? i : {},
      ...isElement(r) ? Manipulator.getDataAttributes(r) : {},
      ...typeof t == "object" ? t : {}
    };
  }
  _typeCheckConfig(t, r = this.constructor.DefaultType) {
    for (const [i, n] of Object.entries(r)) {
      const s = t[i], a = isElement(s) ? "element" : toType(s);
      if (!new RegExp(n).test(a))
        throw new TypeError(
          `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${a}" but expected type "${n}".`
        );
    }
  }
}
const VERSION = "5.3.3";
class BaseComponent extends Config {
  constructor(t, r) {
    super(), t = getElement(t), t && (this._element = t, this._config = this._getConfig(r), Data.set(this._element, this.constructor.DATA_KEY, this));
  }
  // Public
  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY), EventHandler.off(this._element, this.constructor.EVENT_KEY);
    for (const t of Object.getOwnPropertyNames(this))
      this[t] = null;
  }
  _queueCallback(t, r, i = !0) {
    executeAfterTransition(t, r, i);
  }
  _getConfig(t) {
    return t = this._mergeConfigObj(t, this._element), t = this._configAfterMerge(t), this._typeCheckConfig(t), t;
  }
  // Static
  static getInstance(t) {
    return Data.get(getElement(t), this.DATA_KEY);
  }
  static getOrCreateInstance(t, r = {}) {
    return this.getInstance(t) || new this(t, typeof r == "object" ? r : null);
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
  static eventName(t) {
    return `${t}${this.EVENT_KEY}`;
  }
}
const getSelector = (e) => {
  let t = e.getAttribute("data-bs-target");
  if (!t || t === "#") {
    let r = e.getAttribute("href");
    if (!r || !r.includes("#") && !r.startsWith("."))
      return null;
    r.includes("#") && !r.startsWith("#") && (r = `#${r.split("#")[1]}`), t = r && r !== "#" ? r.trim() : null;
  }
  return t ? t.split(",").map((r) => parseSelector(r)).join(",") : null;
}, SelectorEngine = {
  find(e, t = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(t, e));
  },
  findOne(e, t = document.documentElement) {
    return Element.prototype.querySelector.call(t, e);
  },
  children(e, t) {
    return [].concat(...e.children).filter((r) => r.matches(t));
  },
  parents(e, t) {
    const r = [];
    let i = e.parentNode.closest(t);
    for (; i; )
      r.push(i), i = i.parentNode.closest(t);
    return r;
  },
  prev(e, t) {
    let r = e.previousElementSibling;
    for (; r; ) {
      if (r.matches(t))
        return [r];
      r = r.previousElementSibling;
    }
    return [];
  },
  // TODO: this is now unused; remove later along with prev()
  next(e, t) {
    let r = e.nextElementSibling;
    for (; r; ) {
      if (r.matches(t))
        return [r];
      r = r.nextElementSibling;
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
    ].map((r) => `${r}:not([tabindex^="-"])`).join(",");
    return this.find(t, e).filter((r) => !isDisabled(r) && isVisible(r));
  },
  getSelectorFromElement(e) {
    const t = getSelector(e);
    return t && SelectorEngine.findOne(t) ? t : null;
  },
  getElementFromSelector(e) {
    const t = getSelector(e);
    return t ? SelectorEngine.findOne(t) : null;
  },
  getMultipleElementsFromSelector(e) {
    const t = getSelector(e);
    return t ? SelectorEngine.find(t) : [];
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
let Dropdown$1 = class je extends BaseComponent {
  constructor(t, r) {
    super(t, r), this._popper = null, this._parent = this._element.parentNode, this._menu = SelectorEngine.next(this._element, SELECTOR_MENU)[0] || SelectorEngine.prev(this._element, SELECTOR_MENU)[0] || SelectorEngine.findOne(SELECTOR_MENU, this._parent), this._inNavbar = this._detectNavbar();
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
    const t = {
      relatedTarget: this._element
    };
    if (!EventHandler.trigger(this._element, EVENT_SHOW, t).defaultPrevented) {
      if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(SELECTOR_NAVBAR_NAV))
        for (const i of [].concat(...document.body.children))
          EventHandler.on(i, "mouseover", noop);
      this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(CLASS_NAME_SHOW), this._element.classList.add(CLASS_NAME_SHOW), EventHandler.trigger(this._element, EVENT_SHOWN, t);
    }
  }
  hide() {
    if (isDisabled(this._element) || !this._isShown())
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
    if (!EventHandler.trigger(this._element, EVENT_HIDE, t).defaultPrevented) {
      if ("ontouchstart" in document.documentElement)
        for (const i of [].concat(...document.body.children))
          EventHandler.off(i, "mouseover", noop);
      this._popper && this._popper.destroy(), this._menu.classList.remove(CLASS_NAME_SHOW), this._element.classList.remove(CLASS_NAME_SHOW), this._element.setAttribute("aria-expanded", "false"), Manipulator.removeDataAttribute(this._menu, "popper"), EventHandler.trigger(this._element, EVENT_HIDDEN, t);
    }
  }
  _getConfig(t) {
    if (t = super._getConfig(t), typeof t.reference == "object" && !isElement(t.reference) && typeof t.reference.getBoundingClientRect != "function")
      throw new TypeError(`${NAME.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    return t;
  }
  _createPopper() {
    if (typeof Popper > "u")
      throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
    let t = this._element;
    this._config.reference === "parent" ? t = this._parent : isElement(this._config.reference) ? t = getElement(this._config.reference) : typeof this._config.reference == "object" && (t = this._config.reference);
    const r = this._getPopperConfig();
    this._popper = createPopper(t, this._menu, r);
  }
  _isShown() {
    return this._menu.classList.contains(CLASS_NAME_SHOW);
  }
  _getPlacement() {
    const t = this._parent;
    if (t.classList.contains(CLASS_NAME_DROPEND))
      return PLACEMENT_RIGHT;
    if (t.classList.contains(CLASS_NAME_DROPSTART))
      return PLACEMENT_LEFT;
    if (t.classList.contains(CLASS_NAME_DROPUP_CENTER))
      return PLACEMENT_TOPCENTER;
    if (t.classList.contains(CLASS_NAME_DROPDOWN_CENTER))
      return PLACEMENT_BOTTOMCENTER;
    const r = getComputedStyle(this._menu).getPropertyValue("--bs-position").trim() === "end";
    return t.classList.contains(CLASS_NAME_DROPUP) ? r ? PLACEMENT_TOPEND : PLACEMENT_TOP : r ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }
  _detectNavbar() {
    return this._element.closest(SELECTOR_NAVBAR) !== null;
  }
  _getOffset() {
    const { offset: t } = this._config;
    return typeof t == "string" ? t.split(",").map((r) => Number.parseInt(r, 10)) : typeof t == "function" ? (r) => t(r, this._element) : t;
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
    return (this._inNavbar || this._config.display === "static") && (Manipulator.setDataAttribute(this._menu, "popper", "static"), t.modifiers = [{
      name: "applyStyles",
      enabled: !1
    }]), {
      ...t,
      ...execute(this._config.popperConfig, [t])
    };
  }
  _selectMenuItem({ key: t, target: r }) {
    const i = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter((n) => isVisible(n));
    i.length && getNextActiveElement(i, r, t === ARROW_DOWN_KEY, !i.includes(r)).focus();
  }
  // Static
  static jQueryInterface(t) {
    return this.each(function() {
      const r = je.getOrCreateInstance(this, t);
      if (typeof t == "string") {
        if (typeof r[t] > "u")
          throw new TypeError(`No method named "${t}"`);
        r[t]();
      }
    });
  }
  static clearMenus(t) {
    if (t.button === RIGHT_MOUSE_BUTTON || t.type === "keyup" && t.key !== TAB_KEY)
      return;
    const r = SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);
    for (const i of r) {
      const n = je.getInstance(i);
      if (!n || n._config.autoClose === !1)
        continue;
      const s = t.composedPath(), a = s.includes(n._menu);
      if (s.includes(n._element) || n._config.autoClose === "inside" && !a || n._config.autoClose === "outside" && a || n._menu.contains(t.target) && (t.type === "keyup" && t.key === TAB_KEY || /input|select|option|textarea|form/i.test(t.target.tagName)))
        continue;
      const l = { relatedTarget: n._element };
      t.type === "click" && (l.clickEvent = t), n._completeHide(l);
    }
  }
  static dataApiKeydownHandler(t) {
    const r = /input|textarea/i.test(t.target.tagName), i = t.key === ESCAPE_KEY, n = [ARROW_UP_KEY, ARROW_DOWN_KEY].includes(t.key);
    if (!n && !i || r && !i)
      return;
    t.preventDefault();
    const s = this.matches(SELECTOR_DATA_TOGGLE) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.next(this, SELECTOR_DATA_TOGGLE)[0] || SelectorEngine.findOne(SELECTOR_DATA_TOGGLE, t.delegateTarget.parentNode), a = je.getOrCreateInstance(s);
    if (n) {
      t.stopPropagation(), a.show(), a._selectMenuItem(t);
      return;
    }
    a._isShown() && (t.stopPropagation(), a.hide(), s.focus());
  }
};
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown$1.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown$1.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API, Dropdown$1.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown$1.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function(e) {
  e.preventDefault(), Dropdown$1.getOrCreateInstance(this).toggle();
});
defineJQueryPlugin(Dropdown$1);
const DropdownButton = ({ children: e, disabled: t, className: r }) => /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: e }), DropdownContent = ({ children: e, ...t }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "dropdown-menu", children: e }), Dropdown = ({ items: e, className: t, children: r, icon: i }) => {
  const n = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const c = new Dropdown$1(n.current);
    return () => {
      c.dispose();
    };
  }, []);
  const s = React.Children.toArray(r).find((c) => React.isValidElement(c) && c.type === DropdownContent), a = React.Children.toArray(r).filter((c) => React.isValidElement(c) && c.type === Link), l = React.Children.toArray(r).find((c) => React.isValidElement(c) && c.type === DropdownButton), o = React.Children.toArray(r).filter((c) => !React.isValidElement(c) || c.type !== Link && c.type !== DropdownContent && c.type !== DropdownButton), f = React.isValidElement(l) ? l.props : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: [...(t || "").split(" "), "dropdown"].filter((c, v, h) => h.indexOf(c) === v).join(" "), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { ref: n, "data-bs-toggle": "dropdown", ...f, className: [...(f.className || "").split(" "), "btn", "dropdown-toggle"].filter((c, v, h) => h.indexOf(c) === v).join(" "), children: f.children ? f.children : o }),
    s || /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownContent, { children: a })
  ] });
}, GridTableView = reactExports.forwardRef(({ data: e, columns: t, options: r, onClick: i, onBatchClick: n, routeParams: s, namespace: a }, l) => {
  var S, C, w, M, O, j, B;
  t = (t || ((S = e == null ? void 0 : e.entity) == null ? void 0 : S.columns) || []).filter((L) => L.group !== !1);
  const [, o] = reactExports.useState(), f = (C = e == null ? void 0 : e.entity) == null ? void 0 : C.primaryColumn, c = Object.values((e == null ? void 0 : e.action) || []), v = c.filter((L) => L.object), h = t.length + (c.length ? 1 : 0), g = ((e == null ? void 0 : e.entity.data.items) || []).map((L) => L[(f == null ? void 0 : f.field) || ""] || 0), m = reactExports.useRef([]), p = !!g.length && g.reduce((L, V) => L && m.current.includes(V), !0), b = (O = (M = (w = e == null ? void 0 : e.form) == null ? void 0 : w.batch.view.children) == null ? void 0 : M.method) == null ? void 0 : O.choices, u = !!(b != null && b.length) && f, y = (L, V = !1) => {
    V ? m.current.push(L) : m.current = m.current.filter(($) => $ !== L), o({});
  }, d = (L = !1) => {
    m.current = (L ? m.current.concat(g) : m.current.filter((V) => !g.includes(V))).filter((V, $, D) => D.indexOf(V) === $), o({});
  }, E = (L) => {
    var D, A;
    if (!n)
      return;
    const V = e == null ? void 0 : e.form.batch.view;
    if (!u || !((D = m.current) != null && D.length))
      return;
    const $ = new FormData();
    m.current.forEach((k) => {
      var x;
      $.append(`${(x = V == null ? void 0 : V.children) == null ? void 0 : x.ids.full_name}[]`, k.toString());
    }), $.append(((A = V == null ? void 0 : V.children) == null ? void 0 : A.method.full_name) || "method", L), n(L, m.current, $);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    u && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-group btn-group-sm mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "btn btn-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          checked: p,
          onChange: (L) => d(L.target.checked),
          type: "checkbox"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dropdown, { className: "btn-group btn-group-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownButton, { disabled: !m.current.length, className: "btn-light" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownContent, { children: (B = (j = e.form.batch.view.children) == null ? void 0 : j.method.choices) == null ? void 0 : B.map((L) => {
          const V = L.value instanceof Function ? L.value() : L.value;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: "#", onClick: () => E(V), className: "dropdown-item", children: L.label instanceof Function ? L.label() : L.label }, V);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "table table-striped table-hover table-bordered", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        t.map((L, V) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicView, { namespace: (e == null ? void 0 : e.entity.name) || "unknown", data: L, prefix: "list", view: L.field + ".label", children: L.label }),
          L.sortable && (e == null ? void 0 : e.sort[L.field]) !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link$1,
            {
              onClick: ($) => i && i({
                action: {
                  name: "sort",
                  object: !1,
                  namespace: a,
                  entity: e == null ? void 0 : e.entity.name
                },
                parameters: { [L.field]: e != null && e.sort[L.field] ? (e == null ? void 0 : e.sort[L.field]) === "ASC" ? "DESC" : "" : "ASC" }
              }, $),
              className: "btn",
              to: "#",
              children: e.sort[L.field] ? e.sort[L.field] === "ASC" ? "⇑" : "⇓" : "⇅"
            }
          )
        ] }, V)),
        f && v.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-end", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: e && (e.entity.data.items.length ? e.entity.data.items.map(
        (L, V) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          t == null ? void 0 : t.map(
            ($, D) => {
              var A;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
                D === 0 && u && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    checked: m.current.includes(L[f == null ? void 0 : f.field]),
                    className: "me-2",
                    type: "checkbox",
                    name: e.form.batch.view.full_name,
                    value: L[f == null ? void 0 : f.field],
                    onChange: (k) => y(L[f == null ? void 0 : f.field], k.target.checked)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicView, { namespace: a || "unknown", data: L, prefix: "list", view: $.field, children: L[$.field] !== void 0 && (L[$.field] instanceof Object ? L[$.field] instanceof Array ? L[$.field].join(", ") : JSON.stringify(L[$.field]) : (A = L[$.field]) == null ? void 0 : A.toString()) })
              ] }, D);
            }
          ),
          f && v.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "text-end text-nowrap", children: v.map(($, D) => {
            var A;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link$1,
              {
                onClick: (k) => i && i({
                  action: $,
                  parameters: {
                    ...s || {},
                    id: L[f == null ? void 0 : f.field]
                  }
                }, k),
                className: ["btn", "btn-sm", "mb-1", "ms-1", (((A = $.route) == null ? void 0 : A.methods) ?? []).includes("DELETE") ? "btn-outline-danger" : "btn-outline-secondary"].join(" "),
                to: generateRoute($.route, {
                  ...s || {},
                  id: L[f.field]
                }),
                children: $.title
              },
              D
            );
          }) })
        ] }, V)
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: h, children: "Not results found." }) })) })
    ] })
  ] });
}), PageItem = ({ route: e, page: t, active: r = !1, title: i, children: n }) => {
  const s = new URL(document.location.href);
  return s.searchParams.set("page", t.toString()), /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: `page-item ${r ? "active" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link$1,
    {
      to: s.toString(),
      className: "page-link",
      title: i,
      children: n || t
    }
  ) });
}, Paginator = ({ meta: e }) => {
  const r = e.totalPages, i = e.page || 1, n = e.links, s = !!e.totalPages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex flex-column justiry-content-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { className: "mb-2", children: [
      e.totalResults,
      " Results",
      s && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        " - Page ",
        i,
        " of ",
        e.totalPages
      ] })
    ] }),
    s && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "Page navigation", className: "m-auto text-center d-inline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "pagination pagination-sm", children: [
      i > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(PageItem, { page: i - 1, title: "Go to First Page", children: "«" }),
      e.links[0] !== 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PageItem, { page: 1, active: i === 1, children: 1 }, 1),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "page-link", children: "..." }) })
      ] }),
      (n || []).map((a, l) => /* @__PURE__ */ jsxRuntimeExports.jsx(PageItem, { page: a, active: a === i }, l)),
      [...e.links].reverse()[0] !== r && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "page-link", children: "..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PageItem,
          {
            page: r,
            active: r === i,
            children: r
          },
          r
        )
      ] }),
      i < r && /* @__PURE__ */ jsxRuntimeExports.jsx(PageItem, { page: e.totalPages, title: "Go to Last Page", children: "»" })
    ] }) })
  ] });
}, objectRemoveEmpty = (e, t = !0) => (Object.entries(e).map(([r, i]) => (t && i instanceof Object && (i = objectRemoveEmpty(i)), [r, i])).filter(([, r]) => !(r instanceof Object ? Object.keys(r).length : r)).forEach(([r]) => {
  delete e[r];
}), e), SESSION_KEY = "settings", initialState = {
  locale: "en"
  // accessToken: null,
  // user: null,
  // branch: null,
  // authChain: []
}, SessionContext = React.createContext(initialState);
function reducer(e, t) {
  const r = {
    ...e,
    ...t
  };
  return sessionStorage.setItem(SESSION_KEY, btoa(JSON.stringify(r))), r;
}
function SessionProvider(e) {
  let t = initialState;
  try {
    const r = sessionStorage.getItem(SESSION_KEY);
    t = JSON.parse(atob(r || ""));
  } catch {
    reducer(initialState, t);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SessionContext.Provider, { value: React.useReducer(reducer, t), children: e.children });
}
const CrudContext = ({ children: e }) => /* @__PURE__ */ jsxRuntimeExports.jsx(ModalProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionProvider, { children: e }) }) }) }), ModalContext = React.createContext({});
function UseModal() {
  const { setModal: e } = React.useContext(ModalContext);
  return {
    openModal: (t) => {
      e && e(t);
    }
  };
}
function ModalProvider(e) {
  const [t, r] = reactExports.useState(), i = reactExports.useRef(0);
  return reactExports.useEffect(() => {
    i.current += 1;
  }, [t]), /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalContext.Provider, { value: { setModal: r }, children: [
    e.children,
    t && /* @__PURE__ */ jsxRuntimeExports.jsx(CrudContext, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ViewLoader,
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
      i.current
    ) })
  ] });
}
const List = reactExports.memo(({ action: e, embedded: t = !1 }) => {
  var y, d, E, S;
  const r = useLocation(), [i, n] = useSearchParams(), s = reactExports.useRef(void 0), a = reactExports.useRef(convertURLSearchParamsToObject(i)), l = reactExports.useRef(null), { openModal: o } = UseModal(), { open: f } = UseAlert(), c = e.action.entity;
  if (!c)
    throw new Error("Invalid Entity");
  const { results: v, refresh: h, setQueryParameters: g } = GetData({ entityAction: e.action, initParameters: e.parameters, initQueryParameters: a.current }), m = Object.values((v == null ? void 0 : v.action) ?? []).filter((C) => !C.object && C.name !== e.action.name), p = (C) => {
    C == null || C.forEach((O) => {
      var j, B;
      (B = (j = a.current) == null ? void 0 : j.filter) == null || delete B[O];
    });
    const w = {
      ...a.current && a.current,
      ...s.current && { sort: s.current }
    }, M = convertObjectToURLSearchParams(objectRemoveEmpty(w));
    t ? g(M) : n(M);
  }, b = (C, w, M) => {
    console.log("method", w, M), f({
      title: "Are you sure?",
      icon: Icon.confirm,
      onResult: (O) => {
        O.isConfirmed && new Requester_default().post(generateRoute(e.action.route, e.parameters), M).catch((j) => {
          console.log("error", j);
        }).finally(() => {
          console.log("done"), h();
        });
      }
    });
  }, u = (C, w) => {
    switch (C.parameters !== void 0 && (C.parameters = objectRemoveEmpty(C.parameters), Object.keys(C.parameters).length || (C.parameters = void 0)), C.action.name) {
      case "filter": {
        w == null || w.preventDefault(), a.current = C.parameters;
        break;
      }
      case "sort": {
        w == null || w.preventDefault(), s.current = C.parameters;
        break;
      }
      case "delete": {
        w == null || w.preventDefault(), f({
          title: "Are you sure?",
          icon: Icon.confirm,
          onResult: (M) => {
            M.isConfirmed && new Requester_default().fetch({
              url: generateRoute(C.action.route, { ...e.parameters, ...C.parameters }),
              method: Method_default.DELETE
            }).catch((O) => {
              console.log("error", O);
            }).finally(() => {
              h();
            });
          }
        });
        return;
      }
      default: {
        t && (w == null || w.preventDefault(), o({
          action: C,
          props: {
            onClose: () => {
              h();
            }
          }
        }));
        return;
      }
    }
    p();
  };
  return reactExports.useEffect(() => {
    g(i);
  }, [r]), /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "content-header d-md-flex mb-3 justify-content-between align-items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: v == null ? void 0 : v.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "d-flex align-items-center", children: [
        !!m.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "btn-group btn-group-sm me-2", children: m.map((C, w) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link$1,
          {
            to: generateRoute(C.route, e.parameters),
            onClick: (M) => u({
              action: C,
              parameters: e.parameters
            }, M),
            className: "btn btn-outline-secondary",
            children: C.title || C.name
          },
          w
        )) }),
        ((y = v == null ? void 0 : v.form) == null ? void 0 : y.filter) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-group btn-group-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Dropdown, { className: "btn-group btn-group-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownButton, { className: "btn-outline-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Translation, { children: "Filter" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "filter", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Form,
              {
                id: "filter_" + nameToId(c),
                ref: l,
                onSubmit: (C) => u({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: c
                  },
                  parameters: convertFormDataToObject(C)
                }),
                onReset: () => u({
                  action: {
                    name: "filter",
                    object: !1,
                    namespace: e.action.namespace,
                    entity: c
                  }
                }),
                children: [
                  ((d = v == null ? void 0 : v.form) == null ? void 0 : d.filter) && /* @__PURE__ */ jsxRuntimeExports.jsx(FormView, { view: v.form.filter.view }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-primary me-2", type: "submit", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Translation, { children: "Submit" }) })
                ]
              }
            ) }) })
          ] }),
          !!Object.values(((E = a.current) == null ? void 0 : E.filter) || []).length && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
            var C;
            (C = l.current) == null || C.reset();
          }, className: "btn btn-outline-dark", children: "x" })
        ] })
      ] })
    ] }),
    ((S = v == null ? void 0 : v.form) == null ? void 0 : S.filter) && /* @__PURE__ */ jsxRuntimeExports.jsx(FiltersView, { formView: v.form.filter.view, onClick: (C) => p([C]) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DynamicView, { namespace: e.action.namespace, prefix: "modify", view: "content", data: v, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        GridTableView,
        {
          data: v,
          onClick: u,
          onBatchClick: b,
          namespace: e.action.namespace,
          routeParams: e.parameters
        }
      ) }),
      v && /* @__PURE__ */ jsxRuntimeExports.jsx(Paginator, { meta: v.entity.data.meta })
    ] }, "modify")
  ] }) });
}), FiltersView = ({ formView: e, onClick: t }) => {
  const r = (i) => i.choices !== void 0 ? i.choices ? Object.values(i.data instanceof Object ? i.data : [i.data]).map((n) => {
    var s, a;
    return ((a = (s = i.choices) == null ? void 0 : s[n]) == null ? void 0 : a.label) ?? n;
  }).join(", ") : i.data : i.checked !== void 0 ? i.checked ? "Yes" : "No" : i.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "filters d-flex mb-sm overflow-auto", children: Object.values(e.children || []).filter((i) => i.data !== null).map((i, n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "filters-item d-flex text-nowrap flex-column me-2 mb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("small", { className: "mb-2", children: i.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn btn-sm btn-primary me-1 mb-1", children: [
      r(i),
      t && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { onClick: () => t(i.name), className: "ms-2", children: "×" })
    ] })
  ] }, n)) });
}, DefaultViewComponent = ({ view: e, props: t }) => {
  const r = {
    add: Modify,
    edit: Modify,
    list: List
  };
  if (r[e] === void 0)
    throw new HttpException(500, "View not found");
  return React.createElement(r[e] || EmptyView, t);
}, ViewLoader = ({ view: e, namespace: t, props: r }) => /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicView, { namespace: t, view: e, props: r, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DefaultViewComponent, { view: e, props: r }) }, t + e), CrudLoader = ({ path: e }) => {
  const t = UseCurrentReactRoute();
  e ?? (e = document.location.pathname.replace(new RegExp("^" + (t == null ? void 0 : t.pathnameBase) + "(/)?"), "/"));
  const { getOnClickActionByPath: r } = UseActions(), i = reactExports.use(r(e));
  if (!i)
    throw new HttpException(404, "Missing Route");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ViewLoader,
    {
      view: i.action.name,
      namespace: i.action.namespace || "",
      props: { action: i }
    }
  );
};
Requester_default.defaults = {
  baseURL: "https://rent.local",
  headers: {
    Accept: "application/json"
  }
};
const Crud = () => (console.log("crud"), /* @__PURE__ */ jsxRuntimeExports.jsx(CrudContext, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Error$1, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Loading" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CrudLoader, {}) }) }) }));
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
