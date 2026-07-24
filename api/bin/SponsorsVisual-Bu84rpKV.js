import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { m as createLucideIcon, r as reactExports, b as jsxRuntimeExports, G as createSlot$1, j as jsxDevRuntimeExports, v as cn, I as cva, S as Slot$1, P as Primitive$1, J as useLayoutEffect2, K as createContextScope, N as useComposedRefs, O as useFloating, Q as offset, V as shift, W as flip, Y as size, Z as arrow, _ as hide, $ as autoUpdate, a0 as useCallbackRef, a1 as limitShift, a2 as composeRefs, a3 as useDirection, a4 as useControllableState, a5 as useId, a6 as createCollection, a7 as composeEventHandlers, a8 as Portal$1, a9 as reactDomExports, aa as hideOthers, ab as useFocusGuards, ac as ReactRemoveScroll, ad as FocusScope, ae as DismissableLayer, k as Check, c as trackEvent, a as ArrowRight } from "./entry-server-Dtcmmwg9.js";
import { g as get, s as set, a as appendErrors, F as FormProvider, C as Controller, u as useFormContext, b as useForm } from "./DynamicForm-Drbm7K6R.js";
import { C as ChevronDown } from "./chevron-down-D1j3Hqwd.js";
import { o as objectType, d as stringType } from "../index.js";
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ChevronUp = createLucideIcon("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const CircleCheck = createLucideIcon("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
const s = (e, s2, o2) => {
  if (e && "reportValidity" in e) {
    const r2 = get(o2, s2);
    e.setCustomValidity(r2 && r2.message || ""), e.reportValidity();
  }
}, o = (t2, e) => {
  for (const o2 in e.fields) {
    const r2 = e.fields[o2];
    r2 && r2.ref && "reportValidity" in r2.ref ? s(r2.ref, o2, t2) : r2.refs && r2.refs.forEach((e2) => s(e2, o2, t2));
  }
}, r = (s2, r2) => {
  r2.shouldUseNativeValidation && o(s2, r2);
  const f = {};
  for (const o2 in s2) {
    const n2 = get(r2.fields, o2), a = Object.assign(s2[o2] || {}, { ref: n2 && n2.ref });
    if (i(r2.names || Object.keys(s2), o2)) {
      const s3 = Object.assign({}, get(f, o2));
      set(s3, "root", a), set(f, o2, s3);
    } else set(f, o2, a);
  }
  return f;
}, i = (t2, e) => t2.some((t3) => t3.startsWith(e + "."));
var n = function(r2, e) {
  for (var n2 = {}; r2.length; ) {
    var t2 = r2[0], s2 = t2.code, i2 = t2.message, a = t2.path.join(".");
    if (!n2[a]) if ("unionErrors" in t2) {
      var u = t2.unionErrors[0].errors[0];
      n2[a] = { message: u.message, type: u.code };
    } else n2[a] = { message: i2, type: s2 };
    if ("unionErrors" in t2 && t2.unionErrors.forEach(function(e2) {
      return e2.errors.forEach(function(e3) {
        return r2.push(e3);
      });
    }), e) {
      var c = n2[a].types, f = c && c[t2.code];
      n2[a] = appendErrors(a, e, n2, s2, f ? [].concat(f, t2.message) : t2.message);
    }
    r2.shift();
  }
  return n2;
}, t = function(o$1, t2, s2) {
  return void 0 === s2 && (s2 = {}), function(i2, a, u) {
    try {
      return Promise.resolve((function(e, n2) {
        try {
          var a2 = Promise.resolve(o$1["sync" === s2.mode ? "parse" : "parseAsync"](i2, t2)).then(function(e2) {
            return u.shouldUseNativeValidation && o({}, u), { errors: {}, values: s2.raw ? i2 : e2 };
          });
        } catch (r2) {
          return n2(r2);
        }
        return a2 && a2.then ? a2.then(void 0, n2) : a2;
      })(0, function(r$1) {
        if ((function(r2) {
          return Array.isArray(null == r2 ? void 0 : r2.errors);
        })(r$1)) return { values: {}, errors: r(n(r$1.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u) };
        throw r$1;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
};
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot$1(`Primitive.${node}`);
  const Node = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
var NAME$2 = "Label";
var Label$2 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$2.displayName = NAME$2;
var Root$1 = Label$2;
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label$1 = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Root$1,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/label.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  void 0
));
Label$1.displayName = Root$1.displayName;
const Form = FormProvider;
const FormFieldContext = reactExports.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Controller, { ...props }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
const useFormField = () => {
  const fieldContext = reactExports.useContext(FormFieldContext);
  const itemContext = reactExports.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = reactExports.createContext(
  {}
);
const FormItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref, className: cn("space-y-2", className), ...props }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
    lineNumber: 81,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, void 0);
});
FormItem.displayName = "FormItem";
const FormLabel = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Label$1,
    {
      ref,
      className: cn(error && "text-destructive", className),
      htmlFor: formItemId,
      ...props
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
      lineNumber: 94,
      columnNumber: 5
    },
    void 0
  );
});
FormLabel.displayName = "FormLabel";
const FormControl = reactExports.forwardRef(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Slot$1,
    {
      ref,
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
      lineNumber: 111,
      columnNumber: 5
    },
    void 0
  );
});
FormControl.displayName = "FormControl";
const FormDescription = reactExports.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "p",
    {
      ref,
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
      lineNumber: 133,
      columnNumber: 5
    },
    void 0
  );
});
FormDescription.displayName = "FormDescription";
const FormMessage = reactExports.forwardRef(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String((error == null ? void 0 : error.message) ?? "") : children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "p",
    {
      ref,
      id: formMessageId,
      className: cn("text-sm font-medium text-destructive", className),
      ...props,
      children: body
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/form.tsx",
      lineNumber: 155,
      columnNumber: 5
    },
    void 0
  );
});
FormMessage.displayName = "FormMessage";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        type,
        className: cn(
          "flex h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E] disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
      },
      void 0
    );
  }
);
Input.displayName = "Input";
const Textarea = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    },
    void 0,
    false,
    {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/textarea.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    void 0
  );
});
Textarea.displayName = "Textarea";
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
var NAME$1 = "Arrow";
var Arrow$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow$1.displayName = NAME$1;
var Root = Arrow$1;
function useSize(element) {
  const [size2, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size2;
}
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME, __scopePopper);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const anchorRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      const previousAnchor = anchorRef.current;
      anchorRef.current = (virtualRef == null ? void 0 : virtualRef.current) || ref.current;
      if (previousAnchor !== anchorRef.current) {
        context.onAnchorChange(anchorRef.current);
      }
    });
    return virtualRef ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor.displayName = ANCHOR_NAME;
var CONTENT_NAME$1 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
var PopperContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    var _a, _b, _c, _d, _e, _f;
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
    const [content, setContent] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$1, setArrow] = reactExports.useState(null);
    const arrowSize = useSize(arrow$1);
    const arrowWidth = (arrowSize == null ? void 0 : arrowSize.width) ?? 0;
    const arrowHeight = (arrowSize == null ? void 0 : arrowSize.height) ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$1 && arrow({ element: arrow$1, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced == null ? void 0 : handlePlaced();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = (_a = middlewareData.arrow) == null ? void 0 : _a.x;
    const arrowY = (_b = middlewareData.arrow) == null ? void 0 : _b.y;
    const cannotCenterArrow = ((_c = middlewareData.arrow) == null ? void 0 : _c.centerOffset) !== 0;
    const [contentZIndex, setContentZIndex] = reactExports.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            (_d = middlewareData.transformOrigin) == null ? void 0 : _d.x,
            (_e = middlewareData.transformOrigin) == null ? void 0 : _e.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((_f = middlewareData.hide) == null ? void 0 : _f.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive$1.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME$1;
var ARROW_NAME$1 = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = reactExports.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    var _a, _b, _c;
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = ((_a = middlewareData.arrow) == null ? void 0 : _a.centerOffset) !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (((_b = middlewareData.arrow) == null ? void 0 : _b.x) ?? 0) + arrowWidth / 2;
    const arrowYCenter = (((_c = middlewareData.arrow) == null ? void 0 : _c.y) ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2$1 = Popper;
var Anchor = PopperAnchor;
var Content = PopperContent;
var Arrow = PopperArrow;
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;
var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection, useCollection, createCollectionScope] = createCollection(SELECT_NAME);
var [createSelectContext] = createContextScope(SELECT_NAME, [
  createCollectionScope,
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  const [trigger, setTrigger] = reactExports.useState(null);
  const [valueNode, setValueNode] = reactExports.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = reactExports.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = reactExports.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = reactExports.useState(/* @__PURE__ */ new Set());
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2$1, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SelectProvider,
    {
      required,
      scope: __scopeSelect,
      trigger,
      onTriggerChange: setTrigger,
      valueNode,
      onValueNodeChange: setValueNode,
      valueNodeHasChildren,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      contentId: useId(),
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      dir: direction,
      triggerPointerDownPosRef,
      disabled,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          SelectNativeOptionsProvider,
          {
            scope: props.__scopeSelect,
            onNativeOptionAdd: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => new Set(prev).add(option));
            }, []),
            onNativeOptionRemove: reactExports.useCallback((option) => {
              setNativeOptionsSet((prev) => {
                const optionsSet = new Set(prev);
                optionsSet.delete(option);
                return optionsSet;
              });
            }, []),
            children
          }
        ) }),
        isFormControl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          SelectBubbleInput,
          {
            "aria-hidden": true,
            required,
            tabIndex: -1,
            name,
            autoComplete,
            value,
            onChange: (event) => setValue(event.target.value),
            disabled,
            form,
            children: [
              value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "" }) : null,
              Array.from(nativeOptionsSet)
            ]
          },
          nativeSelectKey
        ) : null
      ]
    }
  ) });
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME = "SelectTrigger";
var SelectTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection(__scopeSelect);
    const pointerTypeRef = reactExports.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.contentId,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger$1.displayName = TRIGGER_NAME;
var VALUE_NAME = "SelectValue";
var SelectValue$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        ...valueProps,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: placeholder }) : children
      }
    );
  }
);
SelectValue$1.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "▼" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "SelectContent";
var SelectContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useSelectContext(CONTENT_NAME, props.__scopeSelect);
    const [fragment, setFragment] = reactExports.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
      const frag = fragment;
      return frag ? reactDomExports.createPortal(
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: props.children }) }) }),
        frag
      ) : null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContentImpl, { ...props, ref: forwardedRef });
  }
);
SelectContent$1.displayName = CONTENT_NAME;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot = /* @__PURE__ */ createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME, __scopeSelect);
    const [content, setContent] = reactExports.useState(null);
    const [viewport, setViewport] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = reactExports.useState(null);
    const [selectedItemText, setSelectedItemText] = reactExports.useState(
      null
    );
    const getItems = useCollection(__scopeSelect);
    const [isPositioned, setIsPositioned] = reactExports.useState(false);
    const firstValidItemFoundRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (content) return hideOthers(content);
    }, [content]);
    useFocusGuards();
    const focusFirst = reactExports.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate == null ? void 0 : candidate.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate == null ? void 0 : candidate.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = reactExports.useCallback(
      () => focusFirst([selectedItem, content]),
      [focusFirst, selectedItem, content]
    );
    reactExports.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    reactExports.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          var _a, _b;
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (((_a = triggerPointerDownPosRef.current) == null ? void 0 : _a.x) ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (((_b = triggerPointerDownPosRef.current) == null ? void 0 : _b.y) ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!content.contains(event.target)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    reactExports.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current.focus());
      }
    });
    const itemRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = reactExports.useCallback(() => content == null ? void 0 : content.focus(), [content]);
    const itemTextRefCallback = reactExports.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers(onCloseAutoFocus, (event) => {
              var _a;
              (_a = context.trigger) == null ? void 0 : _a.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              DismissableLayer,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst(candidateNodes));
                        event.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME, __scopeSelect);
  const [contentWrapper, setContentWrapper] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection(__scopeSelect);
  const shouldExpandOnScrollRef = reactExports.useRef(false);
  const shouldRepositionRef = reactExports.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = reactExports.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced == null ? void 0 : onPlaced();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = reactExports.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = reactExports.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem == null ? void 0 : focusSelectedItem();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Primitive$1.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope(__scopeSelect);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = reactExports.useRef(0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if ((shouldExpandOnScrollRef == null ? void 0 : shouldExpandOnScrollRef.current) && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME);
var SelectGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME;
var LABEL_NAME = "SelectLabel";
var SelectLabel$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel$1.displayName = LABEL_NAME;
var ITEM_NAME = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME);
var SelectItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = reactExports.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = reactExports.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => {
        var _a;
        return (_a = contentContext.itemRefCallback) == null ? void 0 : _a.call(contentContext, node, value, disabled);
      }
    );
    const textId = useId();
    const pointerTypeRef = reactExports.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    if (value === "") {
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: reactExports.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || ((node == null ? void 0 : node.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Collection.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive$1.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers(itemProps.onPointerMove, (event) => {
                  var _a;
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers(itemProps.onPointerLeave, (event) => {
                  var _a;
                  if (event.currentTarget === document.activeElement) {
                    (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
                  }
                }),
                onKeyDown: composeEventHandlers(itemProps.onKeyDown, (event) => {
                  var _a;
                  const isTypingAhead = ((_a = contentContext.searchRef) == null ? void 0 : _a.current) !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem$1.displayName = ITEM_NAME;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = reactExports.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => {
        var _a;
        return (_a = contentContext.itemTextRefCallback) == null ? void 0 : _a.call(contentContext, node, itemContext.value, itemContext.disabled);
      }
    );
    const textContent = itemTextNode == null ? void 0 : itemTextNode.textContent;
    const nativeOption = reactExports.useMemo(
      () => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? reactDomExports.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton$1.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton$1 = reactExports.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = reactExports.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton$1.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = reactExports.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = reactExports.useRef(null);
  const getItems = useCollection(__scopeSelect);
  const clearAutoScrollTimer = reactExports.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  reactExports.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    var _a;
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    (_a = activeItem == null ? void 0 : activeItem.ref.current) == null ? void 0 : _a.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive$1.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers(scrollIndicatorProps.onPointerMove, () => {
        var _a;
        (_a = contentContext.onItemLeave) == null ? void 0 : _a.call(contentContext);
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive$1.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator$1.displayName = SEPARATOR_NAME;
var ARROW_NAME = "SelectArrow";
var SelectArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeSelect);
    const context = useSelectContext(ARROW_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = reactExports.forwardRef(
  ({ __scopeSelect, value, ...props }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const prevValue = usePrevious(value);
    reactExports.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, value);
        select.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.select,
      {
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef(onSearchChange);
  const searchRef = reactExports.useRef("");
  const timerRef = reactExports.useRef(0);
  const handleTypeaheadSearch = reactExports.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = reactExports.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  reactExports.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root2 = Select$1;
var Trigger = SelectTrigger$1;
var Value = SelectValue$1;
var Icon = SelectIcon;
var Portal = SelectPortal;
var Content2 = SelectContent$1;
var Viewport = SelectViewport;
var Label = SelectLabel$1;
var Item = SelectItem$1;
var ItemText = SelectItemText;
var ItemIndicator = SelectItemIndicator;
var ScrollUpButton = SelectScrollUpButton$1;
var ScrollDownButton = SelectScrollDownButton$1;
var Separator = SelectSeparator$1;
const Select = Root2;
const SelectValue = Value;
const SelectTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Trigger,
  {
    ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Icon, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 29,
        columnNumber: 7
      }, void 0) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 28,
        columnNumber: 5
      }, void 0)
    ]
  },
  void 0,
  true,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 19,
    columnNumber: 3
  },
  void 0
));
SelectTrigger.displayName = Trigger.displayName;
const SelectScrollUpButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
      lineNumber: 47,
      columnNumber: 5
    }, void 0)
  },
  void 0,
  false,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 39,
    columnNumber: 3
  },
  void 0
));
SelectScrollUpButton.displayName = ScrollUpButton.displayName;
const SelectScrollDownButton = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
      lineNumber: 64,
      columnNumber: 5
    }, void 0)
  },
  void 0,
  false,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 56,
    columnNumber: 3
  },
  void 0
));
SelectScrollDownButton.displayName = ScrollDownButton.displayName;
const SelectContent = reactExports.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Portal, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Content2,
  {
    ref,
    className: cn(
      "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectScrollUpButton, {}, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 86,
        columnNumber: 7
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
          lineNumber: 87,
          columnNumber: 7
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectScrollDownButton, {}, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 96,
        columnNumber: 7
      }, void 0)
    ]
  },
  void 0,
  true,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 75,
    columnNumber: 5
  },
  void 0
) }, void 0, false, {
  fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
  lineNumber: 74,
  columnNumber: 3
}, void 0));
SelectContent.displayName = Content2.displayName;
const SelectLabel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Label,
  {
    ref,
    className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 106,
    columnNumber: 3
  },
  void 0
));
SelectLabel.displayName = Label.displayName;
const SelectItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ItemIndicator, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "h-4 w-4" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 128,
        columnNumber: 9
      }, void 0) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 127,
        columnNumber: 7
      }, void 0) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 126,
        columnNumber: 5
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ItemText, { children }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
        lineNumber: 132,
        columnNumber: 5
      }, void 0)
    ]
  },
  void 0,
  true,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 118,
    columnNumber: 3
  },
  void 0
));
SelectItem.displayName = Item.displayName;
const SelectSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  },
  void 0,
  false,
  {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/ui/select.tsx",
    lineNumber: 141,
    columnNumber: 3
  },
  void 0
));
SelectSeparator.displayName = Separator.displayName;
const formSchema = objectType({
  companyName: stringType().min(2, "Company name is required"),
  email: stringType().email("Please enter a valid email address"),
  packageInterest: stringType().min(1, "Please select a package of interest"),
  message: stringType().optional()
});
function SponsorIntakeForm() {
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const form = useForm({
    resolver: t(formSchema),
    defaultValues: {
      companyName: "",
      email: "",
      packageInterest: "",
      message: ""
    }
  });
  const onSubmit = async (values) => {
    setIsSubmitting(true);
    setError(null);
    trackEvent("sponsor_inquiry_submitted", { package: values.packageInterest });
    try {
      const res = await fetch("/api/sponsors/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit inquiry");
      }
      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isSuccess) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] p-8 border border-[#2C2F38] rounded-sm text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[#C79A4E] mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CircleCheck, { className: "mx-auto h-12 w-12" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold text-[#F0EDE8] mb-2", children: "Inquiry Received" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96]", children: "Thank you for your interest! Our team will get back to you shortly to discuss sponsorship opportunities." }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          className: "mt-6 text-sm text-[#C79A4E] hover:underline",
          onClick: () => setIsSuccess(false),
          children: "Submit another inquiry"
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
          lineNumber: 87,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
      lineNumber: 79,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Form, { ...form, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        FormField,
        {
          control: form.control,
          name: "companyName",
          render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormItem, { className: "flex flex-col gap-2 space-y-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormLabel, { className: "font-semibold text-sm text-[#F0EDE8] uppercase tracking-wider", children: [
              "Company Name ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", "aria-hidden": "true", children: "*" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 108,
                columnNumber: 34
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 107,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Input,
              {
                placeholder: "Acme Corp",
                ...field
              },
              void 0,
              false,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 111,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 110,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormMessage, { className: "text-xs text-red-400" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 116,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 106,
            columnNumber: 17
          }, this)
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
          lineNumber: 102,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        FormField,
        {
          control: form.control,
          name: "email",
          render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormItem, { className: "flex flex-col gap-2 space-y-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormLabel, { className: "font-semibold text-sm text-[#F0EDE8] uppercase tracking-wider", children: [
              "Work Email ",
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", "aria-hidden": "true", children: "*" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 127,
                columnNumber: 32
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 126,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Input,
              {
                type: "email",
                placeholder: "partner@acmecorp.com",
                ...field
              },
              void 0,
              false,
              {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 130,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 129,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormMessage, { className: "text-xs text-red-400" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 136,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 125,
            columnNumber: 17
          }, this)
        },
        void 0,
        false,
        {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
          lineNumber: 121,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
      lineNumber: 101,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      FormField,
      {
        control: form.control,
        name: "packageInterest",
        render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormItem, { className: "flex flex-col gap-2 space-y-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormLabel, { className: "font-semibold text-sm text-[#F0EDE8] uppercase tracking-wider", children: [
            "Package of Interest ",
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-red-500", "aria-hidden": "true", children: "*" }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 148,
              columnNumber: 39
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 147,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectTrigger, { className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectValue, { placeholder: "Select a package..." }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 153,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 152,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 151,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectContent, { className: "bg-neutral-900 border-neutral-700", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "logo_placement", className: "text-white hover:bg-neutral-800 cursor-pointer focus:bg-neutral-800 focus:text-white", children: "Logo Placement" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 157,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "dedicated_session", className: "text-white hover:bg-neutral-800 cursor-pointer focus:bg-neutral-800 focus:text-white", children: "Dedicated Session Slots" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 158,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "registration_list", className: "text-white hover:bg-neutral-800 cursor-pointer focus:bg-neutral-800 focus:text-white", children: "Registration List Sharing" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 159,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SelectItem, { value: "custom", className: "text-white hover:bg-neutral-800 cursor-pointer focus:bg-neutral-800 focus:text-white", children: "Custom Package / Other" }, void 0, false, {
                fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
                lineNumber: 160,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 156,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 150,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormMessage, { className: "text-xs text-red-400" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 163,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
          lineNumber: 146,
          columnNumber: 15
        }, this)
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 142,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      FormField,
      {
        control: form.control,
        name: "message",
        render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormItem, { className: "flex flex-col gap-2 space-y-0", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormLabel, { className: "font-semibold text-sm text-[#F0EDE8] uppercase tracking-wider", children: "Additional Details (Optional)" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 173,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormControl, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Textarea,
            {
              placeholder: "Tell us about your goals...",
              className: "w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-3 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E] min-h-[100px] resize-none",
              ...field
            },
            void 0,
            false,
            {
              fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
              lineNumber: 177,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 176,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormMessage, { className: "text-xs text-red-400" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
            lineNumber: 183,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
          lineNumber: 172,
          columnNumber: 15
        }, this)
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 168,
        columnNumber: 11
      },
      this
    ),
    error && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded", children: error }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
      lineNumber: 189,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 border-t border-[#2C2F38] pt-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
        children: isSubmitting ? "Submitting..." : "Submit Inquiry"
      },
      void 0,
      false,
      {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 195,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
      lineNumber: 194,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#8A8D96] text-center mt-2", children: [
      "Protected by reCAPTCHA. ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://policies.google.com/privacy", target: "_blank", rel: "noreferrer", className: "hover:text-[#C79A4E] underline", children: "Privacy" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 205,
        columnNumber: 37
      }, this),
      " & ",
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://policies.google.com/terms", target: "_blank", rel: "noreferrer", className: "hover:text-[#C79A4E] underline", children: "Terms" }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
        lineNumber: 205,
        columnNumber: 177
      }, this),
      " apply."
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
      lineNumber: 204,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
    lineNumber: 100,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
    lineNumber: 99,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/SponsorIntakeForm.tsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
}
const TIER_COLORS = {
  "Session Sponsor": "border-[#CD7F32]/40 bg-[#CD7F32]/5",
  "Series Sponsor": "border-[#9CA3AF]/40 bg-[#9CA3AF]/5",
  "Platform Partner": "border-[#C79A4E]/40 bg-[#C79A4E]/5"
};
function SponsorsVisual({ data }) {
  const { hero, tiers, cta } = data;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-sponsors-hero-section", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none diq-sponsors-hero-grid-bg", "aria-hidden": "true", style: {
        backgroundImage: "linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      } }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "absolute inset-0 pointer-events-none diq-sponsors-hero-glow-bg", "aria-hidden": "true", style: {
        background: "radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)"
      } }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 relative z-10 diq-sponsors-hero-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-sponsors-hero-row", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "diq-sponsors-hero-copy", children: [
          hero.eyebrow && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4 diq-sponsors-hero-eyebrow", children: hero.eyebrow }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 29,
            columnNumber: 32
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line diq-sponsors-hero-headline", children: hero.headline }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 30,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8 diq-sponsors-hero-subheadline", children: hero.subheadline }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 31,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
          lineNumber: 28,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "lg:sticky lg:top-32 w-full diq-sponsors-form-sticky-col", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl diq-sponsors-form-box", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40 diq-sponsors-form-header", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase diq-sponsors-form-title", children: "Custom Partnerships & Inquiries" }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 37,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 36,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-6 diq-sponsors-form-body", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SponsorIntakeForm, {}, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 42,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
            lineNumber: 41,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
          lineNumber: 35,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
          lineNumber: 34,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    tiers.length > 0 && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-16 diq-sponsors-tiers-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 diq-sponsors-tiers-container", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 diq-sponsors-tiers-grid", children: tiers.map((t2, i2) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: `p-6 border rounded-sm diq-sponsors-tier-card ${TIER_COLORS[t2.name] || "border-[#2C2F38] bg-[#21242C]/40"}`, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] font-bold tracking-widest uppercase text-[#C79A4E] mb-2 diq-sponsors-tier-name", children: t2.name }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 55,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-lg font-bold text-[#F0EDE8] mb-4 diq-sponsors-tier-price", children: t2.priceLabel }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 56,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "flex flex-col gap-2 diq-sponsors-tier-benefits-list", children: t2.benefits.map((b, j) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { className: "flex items-start gap-2 text-sm text-[#8A8D96] diq-sponsors-tier-benefit-item", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { size: 13, className: "text-[#C79A4E] mt-0.5 shrink-0" }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
          lineNumber: 60,
          columnNumber: 25
        }, this),
        " ",
        b
      ] }, j, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 59,
        columnNumber: 23
      }, this)) }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 57,
        columnNumber: 19
      }, this)
    ] }, i2, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 54,
      columnNumber: 17
    }, this)) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 52,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 51,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 50,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("section", { className: "py-16 border-t border-[#2C2F38] diq-sponsors-cta-section", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "container mx-auto px-6 lg:px-8 text-center diq-sponsors-cta-container", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-2xl font-bold text-[#F0EDE8] mb-3 diq-sponsors-cta-headline", children: cta.headline }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      cta.subtext && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96] mb-6 diq-sponsors-cta-subtext", children: cta.subtext }, void 0, false, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 73,
        columnNumber: 27
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: cta.buttonHref, className: "inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110 diq-sponsors-cta-btn", children: [
        cta.buttonLabel,
        " ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ArrowRight, { size: 14 }, void 0, false, {
          fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
          lineNumber: 75,
          columnNumber: 31
        }, this)
      ] }, void 0, true, {
        fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
        lineNumber: 74,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 71,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
      lineNumber: 70,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/deliverIQ-new/DeliverIQ_2/src/components/page-renderers/SponsorsVisual.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
export {
  SponsorsVisual as S
};
