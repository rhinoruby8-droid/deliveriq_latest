import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
import { R as React4, r as reactExports, j as jsxDevRuntimeExports, u as useCmsContent, d as distExports } from "./entry-server-CnSQFCy3.js";
var isCheckBoxInput = (element) => element.type === "checkbox";
var isDateObject = (value) => value instanceof Date;
var isNullOrUndefined = (value) => value == null;
const isObjectType = (value) => typeof value === "object";
var isObject = (value) => !isNullOrUndefined(value) && !Array.isArray(value) && isObjectType(value) && !isDateObject(value);
var getEventValue = (event) => isObject(event) && event.target ? isCheckBoxInput(event.target) ? event.target.checked : event.target.value : event;
var isNameInFieldArray = (names, name) => name.split(".").some((part, index, arr) => !isNaN(Number(part)) && names.has(arr.slice(0, index).join(".")));
var isPlainObject = (tempObject) => {
  const prototypeCopy = tempObject.constructor && tempObject.constructor.prototype;
  return isObject(prototypeCopy) && prototypeCopy.hasOwnProperty("isPrototypeOf");
};
var isWeb = typeof window !== "undefined" && typeof window.HTMLElement !== "undefined" && typeof document !== "undefined";
function cloneObject(data) {
  if (data instanceof Date) {
    return new Date(data);
  }
  const isFileListInstance = typeof FileList !== "undefined" && data instanceof FileList;
  if (isWeb && (data instanceof Blob || isFileListInstance)) {
    return data;
  }
  const isArray = Array.isArray(data);
  if (!isArray && !(isObject(data) && isPlainObject(data))) {
    return data;
  }
  const copy = isArray ? [] : Object.create(Object.getPrototypeOf(data));
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      copy[key] = cloneObject(data[key]);
    }
  }
  return copy;
}
const EVENTS = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change",
  SUBMIT: "submit",
  TRIGGER: "trigger",
  VALID: "valid"
};
const VALIDATION_MODE = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
};
const INPUT_VALIDATION_RULES = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
};
const ROOT_ERROR_TYPE = "root";
const PROTOTYPE_KEYWORDS = ["__proto__", "constructor", "prototype"];
const IS_KEY_RE = /^\w*$/;
var isKey = (value) => IS_KEY_RE.test(value);
var isUndefined = (val) => val === void 0;
const FIELD_PATH_RE = /[.[\]'"]/;
var stringToPath = (input) => input.split(FIELD_PATH_RE).filter(Boolean);
var get = (object, path, defaultValue) => {
  if (!path || !isObject(object)) {
    return defaultValue;
  }
  const paths = isKey(path) ? [path] : stringToPath(path);
  if (paths.some((key) => PROTOTYPE_KEYWORDS.includes(key))) {
    return defaultValue;
  }
  const result = paths.reduce((result2, key) => {
    return isNullOrUndefined(result2) ? void 0 : result2[key];
  }, object);
  return isUndefined(result) || result === object ? isUndefined(object[path]) ? defaultValue : object[path] : result;
};
var isBoolean = (value) => typeof value === "boolean";
var isFunction = (value) => typeof value === "function";
var set = (object, path, value) => {
  let index = -1;
  const tempPath = isKey(path) ? [path] : stringToPath(path);
  const length = tempPath.length;
  const lastIndex = length - 1;
  while (++index < length) {
    const key = tempPath[index];
    let newValue = value;
    if (index !== lastIndex) {
      const objValue = object[key];
      newValue = isObject(objValue) || Array.isArray(objValue) ? objValue : !isNaN(+tempPath[index + 1]) ? [] : {};
    }
    if (PROTOTYPE_KEYWORDS.includes(key)) {
      return;
    }
    object[key] = newValue;
    object = object[key];
  }
};
const HookFormControlContext = React4.createContext(null);
HookFormControlContext.displayName = "HookFormControlContext";
const useFormControlContext = () => React4.useContext(HookFormControlContext);
var getProxyFormState = (formState, control, localProxyFormState, isRoot = true) => {
  const result = {};
  for (const key in formState) {
    Object.defineProperty(result, key, {
      get: () => {
        const _key = key;
        if (control._proxyFormState[_key] !== VALIDATION_MODE.all) {
          control._proxyFormState[_key] = !isRoot || VALIDATION_MODE.all;
        }
        localProxyFormState && (localProxyFormState[_key] = true);
        return formState[_key];
      }
    });
  }
  return result;
};
const useIsomorphicLayoutEffect = isWeb ? React4.useLayoutEffect : React4.useEffect;
function useFormState(props) {
  const formControl = useFormControlContext();
  const { control = formControl, disabled, name, exact } = props || {};
  const [formState, updateFormState] = React4.useState(() => ({
    ...control._formState,
    defaultValues: control._defaultValues
  }));
  const _localProxyFormState = React4.useRef({
    isDirty: false,
    isLoading: false,
    dirtyFields: false,
    touchedFields: false,
    validatingFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  });
  useIsomorphicLayoutEffect(() => control._subscribe({
    name,
    formState: _localProxyFormState.current,
    exact,
    callback: (formState2) => {
      !disabled && updateFormState({
        ...control._formState,
        ...formState2,
        defaultValues: control._defaultValues
      });
    }
  }), [name, disabled, exact]);
  React4.useEffect(() => {
    _localProxyFormState.current.isValid && control._setValid(true);
  }, [control]);
  return React4.useMemo(() => getProxyFormState(formState, control, _localProxyFormState.current, false), [formState, control]);
}
var isString = (value) => typeof value === "string";
var generateWatchOutput = (names, _names, formValues, isGlobal, defaultValue) => {
  if (isString(names)) {
    isGlobal && _names.watch.add(names);
    return get(formValues, names, defaultValue);
  }
  if (Array.isArray(names)) {
    return names.map((fieldName) => (isGlobal && _names.watch.add(fieldName), get(formValues, fieldName)));
  }
  isGlobal && (_names.watchAll = true);
  return formValues;
};
var isPrimitive = (value) => isNullOrUndefined(value) || !isObjectType(value);
const isEmptyObjectWithCustomPrototype = (object, keys) => keys.length === 0 && !Array.isArray(object) && !isPlainObject(object);
function deepEqual(object1, object2, visited = /* @__PURE__ */ new WeakMap()) {
  if (object1 === object2) {
    return true;
  }
  if (isPrimitive(object1) || isPrimitive(object2)) {
    return Object.is(object1, object2);
  }
  if (isDateObject(object1) && isDateObject(object2)) {
    return Object.is(object1.getTime(), object2.getTime());
  }
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  if (isEmptyObjectWithCustomPrototype(object1, keys1) || isEmptyObjectWithCustomPrototype(object2, keys2)) {
    return Object.is(object1, object2);
  }
  if (!keys1.length && Array.isArray(object1) !== Array.isArray(object2)) {
    return false;
  }
  const visitedPairs = visited.get(object1);
  if (visitedPairs && visitedPairs.has(object2)) {
    return true;
  }
  if (visitedPairs) {
    visitedPairs.add(object2);
  } else {
    const ws = /* @__PURE__ */ new WeakSet();
    ws.add(object2);
    visited.set(object1, ws);
  }
  for (const key of keys1) {
    const val1 = object1[key];
    if (!(key in object2)) {
      return false;
    }
    if (key !== "ref") {
      const val2 = object2[key];
      if (isDateObject(val1) && isDateObject(val2) || (isObject(val1) || Array.isArray(val1)) && (isObject(val2) || Array.isArray(val2)) ? !deepEqual(val1, val2, visited) : !Object.is(val1, val2)) {
        return false;
      }
    }
  }
  return true;
}
function useWatch(props) {
  const formControl = useFormControlContext();
  const { control = formControl, name, defaultValue, disabled, exact, compute } = props || {};
  const _defaultValue = React4.useRef(defaultValue);
  const _compute = React4.useRef(compute);
  const _computeFormValues = React4.useRef(void 0);
  const _prevControl = React4.useRef(control);
  const _prevName = React4.useRef(name);
  _compute.current = compute;
  const [value, updateValue] = React4.useState(() => {
    const defaultValue2 = control._getWatch(name, _defaultValue.current);
    return _compute.current ? _compute.current(defaultValue2) : defaultValue2;
  });
  const getCurrentOutput = React4.useCallback((values) => {
    const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
    return _compute.current ? _compute.current(formValues) : formValues;
  }, [control._formValues, control._names, name]);
  const refreshValue = React4.useCallback((values) => {
    if (!disabled) {
      const formValues = generateWatchOutput(name, control._names, values || control._formValues, false, _defaultValue.current);
      if (_compute.current) {
        const computedFormValues = _compute.current(formValues);
        if (!deepEqual(computedFormValues, _computeFormValues.current)) {
          updateValue(computedFormValues);
          _computeFormValues.current = computedFormValues;
        }
      } else {
        updateValue(formValues);
      }
    }
  }, [control._formValues, control._names, disabled, name]);
  useIsomorphicLayoutEffect(() => {
    if (_prevControl.current !== control || !deepEqual(_prevName.current, name)) {
      _prevControl.current = control;
      _prevName.current = name;
      refreshValue();
    }
    return control._subscribe({
      name,
      formState: {
        values: true
      },
      exact,
      callback: (formState) => {
        refreshValue(formState.values);
      }
    });
  }, [control, exact, name, refreshValue]);
  React4.useEffect(() => control._removeUnmounted());
  const controlChanged = _prevControl.current !== control;
  const prevName = _prevName.current;
  const computedOutput = React4.useMemo(() => {
    if (disabled) {
      return null;
    }
    const nameChanged = !controlChanged && !deepEqual(prevName, name);
    const shouldReturnImmediate = controlChanged || nameChanged;
    return shouldReturnImmediate ? getCurrentOutput() : null;
  }, [disabled, controlChanged, name, prevName, getCurrentOutput]);
  return computedOutput !== null ? computedOutput : value;
}
function useController(props) {
  const formControl = useFormControlContext();
  const { name, disabled, control = formControl, shouldUnregister, defaultValue, exact = true } = props;
  const isArrayField = isNameInFieldArray(control._names.array, name);
  const defaultValueMemo = React4.useMemo(() => get(control._formValues, name, get(control._defaultValues, name, defaultValue)), [control, name, defaultValue]);
  const value = useWatch({
    control,
    name,
    defaultValue: defaultValueMemo,
    exact
  });
  const formState = useFormState({
    control,
    name,
    exact
  });
  const _props = React4.useRef(props);
  const _proxyRef = React4.useRef(null);
  const _registerProps = React4.useRef(control.register(name, {
    ...props.rules,
    value,
    ...isBoolean(props.disabled) ? { disabled: props.disabled } : {}
  }));
  _props.current = props;
  const fieldState = React4.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: true,
      get: () => !!get(formState.errors, name)
    },
    isDirty: {
      enumerable: true,
      get: () => !!get(formState.dirtyFields, name)
    },
    isTouched: {
      enumerable: true,
      get: () => !!get(formState.touchedFields, name)
    },
    isValidating: {
      enumerable: true,
      get: () => !!get(formState.validatingFields, name)
    },
    error: {
      enumerable: true,
      get: () => get(formState.errors, name)
    }
  }), [formState, name]);
  const onChange = React4.useCallback((event) => {
    const value2 = getEventValue(event);
    if (!get(control._fields, name)) {
      _registerProps.current = control.register(name, {
        ..._props.current.rules,
        value: value2
      });
    }
    return _registerProps.current.onChange({
      target: {
        value: getEventValue(event),
        name
      },
      type: EVENTS.CHANGE
    });
  }, [name, control]);
  const onBlur = React4.useCallback(() => _registerProps.current.onBlur({
    target: {
      value: get(control._formValues, name),
      name
    },
    type: EVENTS.BLUR
  }), [name, control._formValues]);
  const ref = React4.useCallback((elm) => {
    if (elm) {
      _proxyRef.current = {
        focus: () => isFunction(elm.focus) && elm.focus(),
        select: () => isFunction(elm.select) && elm.select(),
        setCustomValidity: (message) => isFunction(elm.setCustomValidity) && elm.setCustomValidity(message),
        reportValidity: () => isFunction(elm.reportValidity) && elm.reportValidity()
      };
    }
    const field2 = get(control._fields, name);
    if (field2 && field2._f && elm) {
      field2._f.ref = _proxyRef.current;
    }
  }, [control._fields, name]);
  const field = React4.useMemo(() => ({
    name,
    value,
    ...isBoolean(disabled) || formState.disabled ? { disabled: formState.disabled || disabled } : {},
    onChange,
    onBlur,
    ref
  }), [name, disabled, formState.disabled, onChange, onBlur, ref, value]);
  React4.useEffect(() => {
    const _shouldUnregisterField = control._options.shouldUnregister || shouldUnregister;
    control.register(name, {
      ..._props.current.rules,
      ...isBoolean(_props.current.disabled) ? { disabled: _props.current.disabled } : {}
    });
    const updateMounted = (name2, value2) => {
      const field2 = get(control._fields, name2);
      if (field2 && field2._f) {
        field2._f.mount = value2;
      }
    };
    updateMounted(name, true);
    if (_shouldUnregisterField) {
      const value2 = cloneObject(get(shouldUnregister ? control._defaultValues : control._options.values || control._defaultValues, name, get(control._options.defaultValues, name, _props.current.defaultValue)));
      set(control._defaultValues, name, value2);
      if (isUndefined(get(control._formValues, name))) {
        set(control._formValues, name, value2);
      }
    }
    !isArrayField && control.register(name);
    if (_proxyRef.current) {
      const field2 = get(control._fields, name);
      if (field2 && field2._f) {
        field2._f.ref = _proxyRef.current;
      }
    }
    return () => {
      (isArrayField ? _shouldUnregisterField && !control._state.action : _shouldUnregisterField) ? control.unregister(name) : updateMounted(name, false);
    };
  }, [name, control, isArrayField, shouldUnregister]);
  React4.useEffect(() => {
    control._setDisabledField({
      disabled,
      name
    });
  }, [disabled, name, control]);
  return React4.useMemo(() => ({
    field,
    formState,
    fieldState
  }), [field, formState, fieldState]);
}
const Controller = (props) => props.render(useController(props));
const flatten = (obj) => {
  const output = {};
  for (const key of Object.keys(obj)) {
    if (isObjectType(obj[key]) && obj[key] !== null && !isDateObject(obj[key])) {
      const nested = flatten(obj[key]);
      for (const nestedKey of Object.keys(nested)) {
        output[`${key}.${nestedKey}`] = nested[nestedKey];
      }
    } else {
      output[key] = obj[key];
    }
  }
  return output;
};
const HookFormContext = React4.createContext(null);
HookFormContext.displayName = "HookFormContext";
const useFormContext = () => React4.useContext(HookFormContext);
const FormProvider = ({ children, watch, getValues, getFieldState, setError, clearErrors, setValue, setValues, trigger, formState, resetField, reset, handleSubmit, unregister, control, register, setFocus, subscribe }) => {
  const memoizedValue = React4.useMemo(() => ({
    watch,
    getValues,
    getFieldState,
    setError,
    clearErrors,
    setValue,
    setValues,
    trigger,
    formState,
    resetField,
    reset,
    handleSubmit,
    unregister,
    control,
    register,
    setFocus,
    subscribe
  }), [
    clearErrors,
    control,
    formState,
    getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    resetField,
    setError,
    setFocus,
    setValue,
    setValues,
    subscribe,
    trigger,
    unregister,
    watch
  ]);
  return React4.createElement(
    HookFormContext.Provider,
    { value: memoizedValue },
    React4.createElement(HookFormControlContext.Provider, { value: memoizedValue.control }, children)
  );
};
var appendErrors = (name, validateAllFieldCriteria, errors, type, message) => validateAllFieldCriteria ? {
  ...errors[name],
  types: {
    ...errors[name] && errors[name].types ? errors[name].types : {},
    [type]: message || true
  }
} : {};
var compact = (value) => Array.isArray(value) ? value.filter(Boolean) : [];
var convertToArrayPayload = (value) => Array.isArray(value) ? value : [value];
var createSubject = () => {
  let _observers = [];
  const next = (value) => {
    for (const observer of _observers) {
      observer.next && observer.next(value);
    }
  };
  const subscribe = (observer) => {
    _observers.push(observer);
    return {
      unsubscribe: () => {
        _observers = _observers.filter((o) => o !== observer);
      }
    };
  };
  const unsubscribe = () => {
    _observers = [];
  };
  return {
    get observers() {
      return _observers;
    },
    next,
    subscribe,
    unsubscribe
  };
};
function extractFormValues(fieldsState, formValues) {
  const values = {};
  for (const key in fieldsState) {
    if (fieldsState.hasOwnProperty(key)) {
      const fieldState = fieldsState[key];
      const fieldValue = formValues[key];
      if (fieldState && isObject(fieldState) && fieldValue) {
        const nestedFieldsState = extractFormValues(fieldState, fieldValue);
        if (isObject(nestedFieldsState)) {
          values[key] = nestedFieldsState;
        }
      } else if (fieldsState[key]) {
        values[key] = fieldValue;
      }
    }
  }
  return values;
}
var isEmptyObject = (value) => isObject(value) && !Object.keys(value).length;
var isFileInput = (element) => element.type === "file";
var isHTMLElement = (value) => {
  if (!isWeb) {
    return false;
  }
  const owner = value ? value.ownerDocument : 0;
  return value instanceof (owner && owner.defaultView ? owner.defaultView.HTMLElement : HTMLElement);
};
var isMultipleSelect = (element) => element.type === `select-multiple`;
var isRadioInput = (element) => element.type === "radio";
var isRadioOrCheckbox = (ref) => isRadioInput(ref) || isCheckBoxInput(ref);
var live = (ref) => isHTMLElement(ref) && ref.isConnected;
function baseGet(object, updatePath) {
  const length = updatePath.slice(0, -1).length;
  let index = 0;
  while (index < length) {
    if (isNullOrUndefined(object)) {
      object = void 0;
      break;
    }
    object = object[updatePath[index]];
    index++;
  }
  return object;
}
function isEmptyArray(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !isUndefined(obj[key])) {
      return false;
    }
  }
  return true;
}
function unset(object, path) {
  if (isString(path) && Object.prototype.hasOwnProperty.call(object, path)) {
    delete object[path];
    return object;
  }
  const paths = Array.isArray(path) ? path : isKey(path) ? [path] : stringToPath(path);
  if (paths.some((segment) => PROTOTYPE_KEYWORDS.includes(String(segment)))) {
    return object;
  }
  const childObject = paths.length === 1 ? object : baseGet(object, paths);
  const index = paths.length - 1;
  const key = paths[index];
  if (childObject) {
    delete childObject[key];
  }
  if (index !== 0 && (isObject(childObject) && isEmptyObject(childObject) || Array.isArray(childObject) && isEmptyArray(childObject))) {
    unset(object, paths.slice(0, -1));
  }
  return object;
}
var objectHasFunction = (data) => {
  for (const key in data) {
    if (isFunction(data[key])) {
      return true;
    }
  }
  return false;
};
function isTraversable(value) {
  return Array.isArray(value) || isObject(value) && !objectHasFunction(value);
}
function markFieldsDirty(data, fields = {}) {
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      fields[key] = Array.isArray(value) ? [] : {};
      markFieldsDirty(value, fields[key]);
    } else if (!isUndefined(value)) {
      fields[key] = true;
    }
  }
  return fields;
}
function pruneDirtyFields(value) {
  if (value === false) {
    return void 0;
  }
  if (value === true) {
    return true;
  }
  if (Array.isArray(value)) {
    const result = value.map((value2) => pruneDirtyFields(value2));
    return result.some((value2) => value2 !== void 0) ? result : void 0;
  }
  if (isObject(value)) {
    const result = {};
    for (const key in value) {
      const pruned = pruneDirtyFields(value[key]);
      if (!isUndefined(pruned)) {
        result[key] = pruned;
      }
    }
    return Object.keys(result).length ? result : void 0;
  }
  return void 0;
}
function getDirtyFields(data, formValues, dirtyFieldsFromValues) {
  if (!dirtyFieldsFromValues) {
    dirtyFieldsFromValues = markFieldsDirty(formValues);
  }
  for (const key in data) {
    const value = data[key];
    if (isTraversable(value)) {
      if (isUndefined(formValues) || isPrimitive(dirtyFieldsFromValues[key])) {
        dirtyFieldsFromValues[key] = markFieldsDirty(value, Array.isArray(value) ? [] : {});
      } else {
        getDirtyFields(value, isNullOrUndefined(formValues) ? {} : formValues[key], dirtyFieldsFromValues[key]);
      }
    } else {
      const formValue = formValues[key];
      dirtyFieldsFromValues[key] = !deepEqual(value, formValue);
    }
  }
  return pruneDirtyFields(dirtyFieldsFromValues) || {};
}
const defaultResult = {
  value: false,
  isValid: false
};
const validResult = { value: true, isValid: true };
var getCheckboxValue = (options) => {
  if (Array.isArray(options)) {
    if (options.length > 1) {
      const values = options.filter((option) => option && option.checked && !option.disabled).map((option) => option.value);
      return { value: values, isValid: !!values.length };
    }
    return options[0].checked && !options[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      options[0].attributes && !isUndefined(options[0].attributes.value) ? isUndefined(options[0].value) || options[0].value === "" ? validResult : { value: options[0].value, isValid: true } : validResult
    ) : defaultResult;
  }
  return defaultResult;
};
var getFieldValueAs = (value, { valueAsNumber, valueAsDate, setValueAs }) => isUndefined(value) ? value : valueAsNumber ? value === "" ? NaN : value ? +value : value : valueAsDate && isString(value) ? new Date(value) : setValueAs ? setValueAs(value) : value;
const defaultReturn = {
  isValid: false,
  value: null
};
var getRadioValue = (options) => Array.isArray(options) ? options.reduce((previous, option) => option && option.checked && !option.disabled ? {
  isValid: true,
  value: option.value
} : previous, defaultReturn) : defaultReturn;
function getFieldValue(_f) {
  const ref = _f.ref;
  if (isFileInput(ref)) {
    return ref.files;
  }
  if (isRadioInput(ref)) {
    return getRadioValue(_f.refs).value;
  }
  if (isMultipleSelect(ref)) {
    return [...ref.selectedOptions].map(({ value }) => value);
  }
  if (isCheckBoxInput(ref)) {
    return getCheckboxValue(_f.refs).value;
  }
  return getFieldValueAs(isUndefined(ref.value) ? _f.ref.value : ref.value, _f);
}
var getResolverOptions = (fieldsNames, _fields, criteriaMode, shouldUseNativeValidation) => {
  const fields = {};
  for (const name of fieldsNames) {
    const field = get(_fields, name);
    field && set(fields, name, field._f);
  }
  return {
    criteriaMode,
    names: [...fieldsNames],
    fields,
    shouldUseNativeValidation
  };
};
var isRegex = (value) => value instanceof RegExp;
var getRuleValue = (rule) => isUndefined(rule) ? rule : isRegex(rule) ? rule.source : isObject(rule) ? isRegex(rule.value) ? rule.value.source : rule.value : rule;
var getValidationModes = (mode) => ({
  isOnSubmit: !mode || mode === VALIDATION_MODE.onSubmit,
  isOnBlur: mode === VALIDATION_MODE.onBlur,
  isOnChange: mode === VALIDATION_MODE.onChange,
  isOnAll: mode === VALIDATION_MODE.all,
  isOnTouch: mode === VALIDATION_MODE.onTouched
});
const ASYNC_FUNCTION = "AsyncFunction";
var hasPromiseValidation = (fieldReference) => {
  if (!fieldReference || !fieldReference.validate)
    return false;
  if (isFunction(fieldReference.validate)) {
    return fieldReference.validate.constructor.name === ASYNC_FUNCTION;
  }
  if (isObject(fieldReference.validate)) {
    for (const key in fieldReference.validate) {
      if (fieldReference.validate[key].constructor.name === ASYNC_FUNCTION) {
        return true;
      }
    }
  }
  return false;
};
var hasValidation = (options) => options.mount && (options.required || options.min || options.max || options.maxLength || options.minLength || options.pattern || options.validate);
var isWatched = (name, _names, isBlurEvent) => {
  if (isBlurEvent)
    return false;
  if (_names.watchAll || _names.watch.has(name))
    return true;
  for (const watchName of _names.watch) {
    if (name.startsWith(watchName) && name.charAt(watchName.length) === ".")
      return true;
  }
  return false;
};
const iterateFieldsByAction = (fields, action, fieldsNames, abortEarly) => {
  for (const key of fieldsNames || Object.keys(fields)) {
    const field = get(fields, key);
    if (field) {
      const { _f, ...currentField } = field;
      if (_f) {
        if (_f.refs && _f.refs[0] && action(_f.refs[0], key) && !abortEarly) {
          return true;
        } else if (_f.ref && action(_f.ref, _f.name) && !abortEarly) {
          return true;
        } else {
          if (iterateFieldsByAction(currentField, action)) {
            break;
          }
        }
      } else if (isObject(currentField)) {
        if (iterateFieldsByAction(currentField, action)) {
          break;
        }
      }
    }
  }
  return;
};
function schemaErrorLookup(errors, _fields, name) {
  const error = get(errors, name);
  if (error || isKey(name)) {
    return {
      error,
      name
    };
  }
  const names = name.split(".");
  while (names.length) {
    const fieldName = names.join(".");
    const field = get(_fields, fieldName);
    const foundError = get(errors, fieldName);
    if (field && !Array.isArray(field) && name !== fieldName) {
      return { name };
    }
    if (foundError && foundError.type) {
      return {
        name: fieldName,
        error: foundError
      };
    }
    if (foundError && foundError.root && foundError.root.type) {
      return {
        name: `${fieldName}.root`,
        error: foundError.root
      };
    }
    names.pop();
  }
  return {
    name
  };
}
var shouldRenderFormState = (formStateData, _proxyFormState, updateFormState, isRoot) => {
  updateFormState(formStateData);
  const { name, ...formState } = formStateData;
  const keys = Object.keys(formState);
  return !keys.length || isRoot && keys.length >= Object.keys(_proxyFormState).length || keys.find((key) => _proxyFormState[key] === (!isRoot || VALIDATION_MODE.all));
};
var shouldSubscribeByName = (name, signalName, exact) => !name || !signalName || name === signalName || convertToArrayPayload(name).some((currentName) => currentName && (exact ? currentName === signalName || currentName.startsWith(signalName + ".") : currentName.startsWith(signalName) || signalName.startsWith(currentName)));
var skipValidation = (isBlurEvent, isTouched, isSubmitted, reValidateMode, mode) => {
  if (mode.isOnAll) {
    return false;
  } else if (!isSubmitted && mode.isOnTouch) {
    return !(isTouched || isBlurEvent);
  } else if (isSubmitted ? reValidateMode.isOnBlur : mode.isOnBlur) {
    return !isBlurEvent;
  } else if (isSubmitted ? reValidateMode.isOnChange : mode.isOnChange) {
    return isBlurEvent;
  }
  return true;
};
var unsetEmptyArray = (ref, name) => !compact(get(ref, name)).length && unset(ref, name);
var updateFieldArrayRootError = (errors, error, name) => {
  const existingErrors = get(errors, name);
  const fieldArrayErrors = Array.isArray(existingErrors) ? existingErrors : [];
  set(fieldArrayErrors, ROOT_ERROR_TYPE, error[name]);
  set(errors, name, fieldArrayErrors);
  return errors;
};
function getValidateError(result, ref, type = "validate") {
  if (isString(result) || Array.isArray(result) && result.every(isString) || isBoolean(result) && !result) {
    return {
      type,
      message: isString(result) ? result : "",
      ref
    };
  }
}
var getValueAndMessage = (validationData) => isObject(validationData) && !isRegex(validationData) ? validationData : {
  value: validationData,
  message: ""
};
var validateField = async (field, disabledFieldNames, formValues, validateAllFieldCriteria, shouldUseNativeValidation, isFieldArray) => {
  const { ref, refs, required, maxLength, minLength, min, max, pattern, validate, name, valueAsNumber, mount } = field._f;
  const inputValue = get(formValues, name);
  if (!mount || disabledFieldNames.has(name)) {
    return {};
  }
  const inputRef = refs ? refs[0] : ref;
  const setCustomValidity = (message) => {
    if (shouldUseNativeValidation && inputRef.reportValidity) {
      const validityMessage = isBoolean(message) ? "" : message || "";
      if (refs) {
        refs.forEach((ref2) => ref2.setCustomValidity(validityMessage));
      } else {
        inputRef.setCustomValidity(validityMessage);
      }
      inputRef.reportValidity();
    }
  };
  const error = {};
  const isRadio = isRadioInput(ref);
  const isCheckBox = isCheckBoxInput(ref);
  const isRadioOrCheckbox2 = isRadio || isCheckBox;
  const isEmpty = (valueAsNumber || isFileInput(ref)) && isUndefined(ref.value) && isUndefined(inputValue) || isHTMLElement(ref) && ref.value === "" || inputValue === "" || Array.isArray(inputValue) && !inputValue.length;
  const appendErrorsCurry = appendErrors.bind(null, name, validateAllFieldCriteria, error);
  const getMinMaxMessage = (exceedMax, maxLengthMessage, minLengthMessage, maxType = INPUT_VALIDATION_RULES.maxLength, minType = INPUT_VALIDATION_RULES.minLength) => {
    const message = exceedMax ? maxLengthMessage : minLengthMessage;
    error[name] = {
      type: exceedMax ? maxType : minType,
      message,
      ref,
      ...appendErrorsCurry(exceedMax ? maxType : minType, message)
    };
  };
  if (isFieldArray ? !Array.isArray(inputValue) || !inputValue.length : required && (!isRadioOrCheckbox2 && (isEmpty || isNullOrUndefined(inputValue)) || isBoolean(inputValue) && !inputValue || isCheckBox && !getCheckboxValue(refs).isValid || isRadio && !getRadioValue(refs).isValid)) {
    const { value, message } = isString(required) ? { value: !!required, message: required } : getValueAndMessage(required);
    if (value) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.required,
        message,
        ref: inputRef,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.required, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (!isEmpty && (!isNullOrUndefined(min) || !isNullOrUndefined(max))) {
    let exceedMax;
    let exceedMin;
    const maxOutput = getValueAndMessage(max);
    const minOutput = getValueAndMessage(min);
    if (!isNullOrUndefined(inputValue) && !isNaN(inputValue)) {
      const valueNumber = ref.valueAsNumber || (inputValue ? +inputValue : inputValue);
      if (!isNullOrUndefined(maxOutput.value)) {
        exceedMax = valueNumber > maxOutput.value;
      }
      if (!isNullOrUndefined(minOutput.value)) {
        exceedMin = valueNumber < minOutput.value;
      }
    } else {
      const valueDate = ref.valueAsDate || new Date(inputValue);
      const convertTimeToDate = (time) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + time);
      const isTime = ref.type == "time";
      const isWeek = ref.type == "week";
      if (isString(maxOutput.value) && inputValue) {
        exceedMax = isTime ? convertTimeToDate(inputValue) > convertTimeToDate(maxOutput.value) : isWeek ? inputValue > maxOutput.value : valueDate > new Date(maxOutput.value);
      }
      if (isString(minOutput.value) && inputValue) {
        exceedMin = isTime ? convertTimeToDate(inputValue) < convertTimeToDate(minOutput.value) : isWeek ? inputValue < minOutput.value : valueDate < new Date(minOutput.value);
      }
    }
    if (exceedMax || exceedMin) {
      getMinMaxMessage(!!exceedMax, maxOutput.message, minOutput.message, INPUT_VALIDATION_RULES.max, INPUT_VALIDATION_RULES.min);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if ((maxLength || minLength) && !isEmpty && (isString(inputValue) || isFieldArray && Array.isArray(inputValue))) {
    const maxLengthOutput = getValueAndMessage(maxLength);
    const minLengthOutput = getValueAndMessage(minLength);
    const exceedMax = !isNullOrUndefined(maxLengthOutput.value) && inputValue.length > +maxLengthOutput.value;
    const exceedMin = !isNullOrUndefined(minLengthOutput.value) && inputValue.length < +minLengthOutput.value;
    if (exceedMax || exceedMin) {
      getMinMaxMessage(exceedMax, maxLengthOutput.message, minLengthOutput.message);
      if (!validateAllFieldCriteria) {
        setCustomValidity(error[name].message);
        return error;
      }
    }
  }
  if (pattern && !isEmpty && isString(inputValue)) {
    const { value: patternValue, message } = getValueAndMessage(pattern);
    if (isRegex(patternValue) && !inputValue.match(patternValue)) {
      error[name] = {
        type: INPUT_VALIDATION_RULES.pattern,
        message,
        ref,
        ...appendErrorsCurry(INPUT_VALIDATION_RULES.pattern, message)
      };
      if (!validateAllFieldCriteria) {
        setCustomValidity(message);
        return error;
      }
    }
  }
  if (validate) {
    if (isFunction(validate)) {
      const result = await validate(inputValue, formValues);
      const validateError = getValidateError(result, inputRef);
      if (validateError) {
        error[name] = {
          ...validateError,
          ...appendErrorsCurry(INPUT_VALIDATION_RULES.validate, validateError.message)
        };
        if (!validateAllFieldCriteria) {
          setCustomValidity(validateError.message);
          return error;
        }
      }
    } else if (isObject(validate)) {
      let validationResult = {};
      for (const key in validate) {
        if (!isEmptyObject(validationResult) && !validateAllFieldCriteria) {
          break;
        }
        const validateError = getValidateError(await validate[key](inputValue, formValues), inputRef, key);
        if (validateError) {
          validationResult = {
            ...validateError,
            ...appendErrorsCurry(key, validateError.message)
          };
          setCustomValidity(validateError.message);
          if (validateAllFieldCriteria) {
            error[name] = validationResult;
          }
        }
      }
      if (!isEmptyObject(validationResult)) {
        error[name] = {
          ref: inputRef,
          ...validationResult
        };
        if (!validateAllFieldCriteria) {
          return error;
        }
      }
    }
  }
  setCustomValidity(true);
  return error;
};
const defaultOptions = {
  mode: VALIDATION_MODE.onSubmit,
  reValidateMode: VALIDATION_MODE.onChange,
  shouldFocusError: true
};
const FORM_ERROR_TYPE = "form";
const DEFAULT_FORM_STATE = {
  submitCount: 0,
  isDirty: false,
  isReady: false,
  isValidating: false,
  isSubmitted: false,
  isSubmitting: false,
  isSubmitSuccessful: false,
  isValid: false,
  touchedFields: {},
  dirtyFields: {},
  validatingFields: {}
};
function createFormControl(props = {}) {
  let _options = {
    ...defaultOptions,
    ...props
  };
  let _formState = {
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction(_options.defaultValues),
    errors: _options.errors || {},
    disabled: _options.disabled || false
  };
  let _fields = {};
  let _defaultValues = isObject(_options.defaultValues) || isObject(_options.values) ? cloneObject(_options.defaultValues || _options.values) || {} : {};
  let _formValues = _options.shouldUnregister ? {} : cloneObject(_defaultValues);
  let _state = {
    action: false,
    mount: false,
    watch: false,
    keepIsValid: false
  };
  let _names = {
    mount: /* @__PURE__ */ new Set(),
    disabled: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set(),
    registerName: /* @__PURE__ */ new Set()
  };
  let delayErrorCallback;
  let timer = 0;
  let _valuesSubscriberCount = 0;
  let _validationModeBeforeSubmit = getValidationModes(_options.mode);
  let _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
  const defaultProxyFormState = {
    isDirty: false,
    dirtyFields: false,
    validatingFields: false,
    touchedFields: false,
    isValidating: false,
    isValid: false,
    errors: false
  };
  const _proxyFormState = {
    ...defaultProxyFormState
  };
  let _proxySubscribeFormState = {
    ..._proxyFormState
  };
  const _subjects = {
    array: createSubject(),
    state: createSubject()
  };
  const shouldDisplayAllAssociatedErrors = _options.criteriaMode === VALIDATION_MODE.all;
  const debounce = (callback) => (wait) => {
    clearTimeout(timer);
    timer = setTimeout(callback, wait);
  };
  const _setValid = async (shouldUpdateValid) => {
    if (_state.keepIsValid) {
      return;
    }
    if (!_options.disabled && (_proxyFormState.isValid || _proxySubscribeFormState.isValid || shouldUpdateValid)) {
      let isValid;
      if (_options.resolver) {
        isValid = isEmptyObject((await _runSchema()).errors);
        _updateIsValidating();
      } else {
        isValid = await executeBuiltInValidation({
          fields: _fields,
          onlyCheckValid: true,
          eventType: EVENTS.VALID
        });
      }
      if (isValid !== _formState.isValid) {
        _subjects.state.next({
          isValid
        });
      }
    }
  };
  const _updateIsValidating = (names, isValidating) => {
    if (!_options.disabled && (_proxyFormState.isValidating || _proxyFormState.validatingFields || _proxySubscribeFormState.isValidating || _proxySubscribeFormState.validatingFields)) {
      (names || Array.from(_names.mount)).forEach((name) => {
        if (name) {
          isValidating ? set(_formState.validatingFields, name, isValidating) : unset(_formState.validatingFields, name);
        }
      });
      _subjects.state.next({
        validatingFields: _formState.validatingFields,
        isValidating: !isEmptyObject(_formState.validatingFields)
      });
    }
  };
  const _updateDirtyFields = () => {
    _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
  };
  const _setFieldArray = (name, values = [], method, args, shouldSetValues = true, shouldUpdateFieldsAndState = true) => {
    if (args && method && !_options.disabled) {
      _state.action = true;
      if (shouldUpdateFieldsAndState && Array.isArray(get(_fields, name))) {
        const fieldValues = method(get(_fields, name), args.argA, args.argB);
        shouldSetValues && set(_fields, name, fieldValues);
      }
      if (shouldUpdateFieldsAndState && Array.isArray(get(_formState.errors, name))) {
        const errors = method(get(_formState.errors, name), args.argA, args.argB);
        shouldSetValues && set(_formState.errors, name, errors);
        unsetEmptyArray(_formState.errors, name);
      }
      if ((_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && shouldUpdateFieldsAndState && Array.isArray(get(_formState.touchedFields, name))) {
        const touchedFields = method(get(_formState.touchedFields, name), args.argA, args.argB);
        shouldSetValues && set(_formState.touchedFields, name, touchedFields);
      }
      if (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) {
        _updateDirtyFields();
      }
      _subjects.state.next({
        name,
        isDirty: _getDirty(name, values),
        dirtyFields: _formState.dirtyFields,
        errors: _formState.errors,
        isValid: _formState.isValid
      });
    } else {
      set(_formValues, name, values);
    }
  };
  const updateErrors = (name, error) => {
    set(_formState.errors, name, error);
    _formState.errors = { ..._formState.errors };
    _subjects.state.next({
      errors: _formState.errors
    });
  };
  const _setErrors = (errors) => {
    _formState.errors = errors;
    _subjects.state.next({
      errors: _formState.errors,
      isValid: false
    });
  };
  const hasExplicitNullIntermediate = (name) => {
    const segments = isKey(name) ? [name] : stringToPath(name);
    let formValues = _formValues;
    let defaultValues = _defaultValues;
    for (let i = 0; i < segments.length - 1; i++) {
      const key = segments[i];
      formValues = isNullOrUndefined(formValues) ? formValues : formValues[key];
      defaultValues = isNullOrUndefined(defaultValues) ? defaultValues : defaultValues[key];
      if (formValues === null && defaultValues !== null) {
        return true;
      }
    }
    return false;
  };
  const updateValidAndValue = (name, shouldSkipSetValueAs, value, ref) => {
    const field = get(_fields, name);
    if (field) {
      if (hasExplicitNullIntermediate(name)) {
        return;
      }
      const wasUnsetInFormValues = isUndefined(get(_formValues, name));
      const defaultValue = get(_formValues, name, isUndefined(value) ? get(_defaultValues, name) : value);
      isUndefined(defaultValue) || ref && ref.defaultChecked || shouldSkipSetValueAs ? set(_formValues, name, shouldSkipSetValueAs ? defaultValue : getFieldValue(field._f)) : setFieldValue(name, defaultValue);
      if (_state.mount && !_state.action) {
        _setValid();
        if (wasUnsetInFormValues && _formState.isDirty && (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty)) {
          const isDirty = _getDirty();
          if (!isDirty) {
            _formState.isDirty = false;
            _subjects.state.next({ ..._formState });
          }
        }
        if (props.shouldUnregister && wasUnsetInFormValues && !isUndefined(get(_formValues, name)) && isWatched(name, _names)) {
          _state.watch = true;
        }
      }
    }
  };
  const updateTouchAndDirty = (name, fieldValue, isBlurEvent, shouldDirty, shouldRender) => {
    let shouldUpdateField = false;
    let isPreviousDirty = false;
    const output = {
      name
    };
    if (!_options.disabled) {
      if (!isBlurEvent || shouldDirty) {
        const isCurrentFieldPristine = deepEqual(get(_defaultValues, name), fieldValue);
        if (_proxyFormState.isDirty || _proxySubscribeFormState.isDirty) {
          isPreviousDirty = _formState.isDirty;
          _formState.isDirty = output.isDirty = !isCurrentFieldPristine || _getDirty();
          shouldUpdateField = isPreviousDirty !== output.isDirty;
        }
        isPreviousDirty = !!get(_formState.dirtyFields, name);
        if (isCurrentFieldPristine !== _formState.isDirty) {
          _formState.dirtyFields = getDirtyFields(_defaultValues, _formValues);
        } else {
          isCurrentFieldPristine ? unset(_formState.dirtyFields, name) : set(_formState.dirtyFields, name, true);
        }
        output.dirtyFields = _formState.dirtyFields;
        shouldUpdateField = shouldUpdateField || (_proxyFormState.dirtyFields || _proxySubscribeFormState.dirtyFields) && isPreviousDirty !== !isCurrentFieldPristine;
      }
      if (isBlurEvent) {
        const isPreviousFieldTouched = get(_formState.touchedFields, name);
        if (!isPreviousFieldTouched) {
          set(_formState.touchedFields, name, isBlurEvent);
          output.touchedFields = _formState.touchedFields;
          shouldUpdateField = shouldUpdateField || (_proxyFormState.touchedFields || _proxySubscribeFormState.touchedFields) && isPreviousFieldTouched !== isBlurEvent;
        }
      }
      shouldUpdateField && shouldRender && _subjects.state.next(output);
    }
    return shouldUpdateField ? output : {};
  };
  const shouldRenderByError = (name, isValid, error, fieldState) => {
    const previousFieldError = get(_formState.errors, name);
    const shouldUpdateValid = (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isBoolean(isValid) && _formState.isValid !== isValid;
    if (_options.delayError && error) {
      delayErrorCallback = debounce(() => updateErrors(name, error));
      delayErrorCallback(_options.delayError);
    } else {
      clearTimeout(timer);
      delayErrorCallback = null;
      error ? set(_formState.errors, name, error) : unset(_formState.errors, name);
      _formState.errors = { ..._formState.errors };
    }
    if ((error ? !deepEqual(previousFieldError, error) : previousFieldError) || !isEmptyObject(fieldState) || shouldUpdateValid) {
      const updatedFormState = {
        ...fieldState,
        ...shouldUpdateValid && isBoolean(isValid) ? { isValid } : {},
        errors: _formState.errors,
        name
      };
      _formState = {
        ..._formState,
        ...updatedFormState
      };
      _subjects.state.next(updatedFormState);
    }
  };
  const _runSchema = async (name) => {
    _updateIsValidating(name, true);
    return await _options.resolver(_formValues, _options.context, getResolverOptions(name || _names.mount, _fields, _options.criteriaMode, _options.shouldUseNativeValidation));
  };
  const executeSchemaAndUpdateState = async (names) => {
    const { errors } = await _runSchema(names);
    _updateIsValidating(names);
    if (names) {
      for (const name of names) {
        const error = get(errors, name);
        error ? _names.array.has(name) && isObject(error) && !Object.keys(error).some((key) => !Number.isNaN(Number(key))) ? updateFieldArrayRootError(_formState.errors, { [name]: error }, name) : set(_formState.errors, name, error) : unset(_formState.errors, name);
      }
      _formState.errors = { ..._formState.errors };
    } else {
      _formState.errors = errors;
    }
    return errors;
  };
  const validateForm = async ({ name, eventType }) => {
    if (props.validate) {
      const result = await props.validate({
        formValues: _formValues,
        formState: _formState,
        name,
        eventType
      });
      if (isObject(result)) {
        for (const key in result) {
          const error = result[key];
          if (error) {
            setError(`${FORM_ERROR_TYPE}.${key}`, {
              message: isString(error.message) ? error.message : "",
              type: error.type || INPUT_VALIDATION_RULES.validate
            });
          }
        }
      } else if (isString(result) || !result) {
        setError(FORM_ERROR_TYPE, {
          message: result || "",
          type: INPUT_VALIDATION_RULES.validate
        });
      } else {
        clearErrors(FORM_ERROR_TYPE);
      }
      return result;
    }
    return true;
  };
  const executeBuiltInValidation = async ({ fields, onlyCheckValid, name, eventType, context = {
    valid: true,
    runRootValidation: false
  } }) => {
    if (props.validate) {
      context.runRootValidation = true;
      const result = await validateForm({
        name,
        eventType
      });
      if (!result) {
        context.valid = false;
        if (onlyCheckValid) {
          return context.valid;
        }
      }
    }
    for (const name2 in fields) {
      const field = fields[name2];
      if (field) {
        const { _f, ...fieldValue } = field;
        if (_f) {
          const isFieldArrayRoot = _names.array.has(_f.name);
          const isPromiseFunction = field._f && hasPromiseValidation(field._f);
          const shouldTrackIsValidatingState = _proxyFormState.validatingFields || _proxyFormState.isValidating || _proxySubscribeFormState.validatingFields || _proxySubscribeFormState.isValidating;
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name], true);
          }
          const fieldError = await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation && !onlyCheckValid, isFieldArrayRoot);
          if (isPromiseFunction && shouldTrackIsValidatingState) {
            _updateIsValidating([_f.name]);
          }
          if (fieldError[_f.name]) {
            context.valid = false;
            if (onlyCheckValid) {
              break;
            }
          }
          !onlyCheckValid && (get(fieldError, _f.name) ? isFieldArrayRoot ? updateFieldArrayRootError(_formState.errors, fieldError, _f.name) : set(_formState.errors, _f.name, fieldError[_f.name]) : unset(_formState.errors, _f.name));
          if (props.shouldUseNativeValidation && fieldError[_f.name]) {
            break;
          }
        }
        !isEmptyObject(fieldValue) && await executeBuiltInValidation({
          context,
          onlyCheckValid,
          fields: fieldValue,
          name: name2,
          eventType
        });
      }
    }
    return context.valid;
  };
  const _removeUnmounted = () => {
    for (const name of _names.unMount) {
      const field = get(_fields, name);
      field && (field._f.refs ? field._f.refs.every((ref) => !live(ref)) : !live(field._f.ref)) && unregister(name);
    }
    _names.unMount = /* @__PURE__ */ new Set();
  };
  const _getDirty = (name, data) => !_options.disabled && (name && data && set(_formValues, name, data), !deepEqual(_state.mount ? _formValues : _defaultValues, _defaultValues));
  const _getWatch = (names, defaultValue, isGlobal) => generateWatchOutput(names, _names, {
    ..._state.mount ? _formValues : isUndefined(defaultValue) ? _defaultValues : isString(names) ? { [names]: defaultValue } : defaultValue
  }, isGlobal, defaultValue);
  const _getFieldArray = (name) => compact(get(_state.mount ? _formValues : _defaultValues, name, _options.shouldUnregister ? get(_defaultValues, name, []) : []));
  const setFieldValue = (name, value, options = {}, skipClone = false, skipRender = false) => {
    const field = get(_fields, name);
    let fieldValue = value;
    if (field) {
      const fieldReference = field._f;
      if (fieldReference) {
        !fieldReference.disabled && set(_formValues, name, getFieldValueAs(value, fieldReference));
        fieldValue = isHTMLElement(fieldReference.ref) && isNullOrUndefined(value) ? "" : value;
        if (isMultipleSelect(fieldReference.ref)) {
          [...fieldReference.ref.options].forEach((optionRef) => optionRef.selected = fieldValue.includes(optionRef.value));
        } else if (fieldReference.refs) {
          if (isCheckBoxInput(fieldReference.ref)) {
            fieldReference.refs.forEach((checkboxRef) => {
              if (!checkboxRef.defaultChecked || !checkboxRef.disabled) {
                if (Array.isArray(fieldValue)) {
                  checkboxRef.checked = !!fieldValue.find((data) => data === checkboxRef.value);
                } else {
                  checkboxRef.checked = fieldValue === checkboxRef.value || !!fieldValue;
                }
              }
            });
          } else {
            fieldReference.refs.forEach((radioRef) => radioRef.checked = radioRef.value === fieldValue);
          }
        } else if (isFileInput(fieldReference.ref)) {
          fieldReference.ref.value = "";
        } else {
          fieldReference.ref.value = fieldValue;
          if (!fieldReference.ref.type && !skipRender) {
            _subjects.state.next({
              name,
              values: skipClone ? _formValues : cloneObject(_formValues)
            });
          }
        }
      }
    }
    (options.shouldDirty || options.shouldTouch) && updateTouchAndDirty(name, fieldValue, options.shouldTouch, options.shouldDirty, !skipRender);
    options.shouldValidate && trigger(name);
  };
  const setFieldValues = (name, value, options, skipClone = false, skipRender = false) => {
    for (const fieldKey in value) {
      if (!value.hasOwnProperty(fieldKey)) {
        return;
      }
      const fieldValue = value[fieldKey];
      const fieldName = name + "." + fieldKey;
      const field = get(_fields, fieldName);
      (_names.array.has(name) || isObject(fieldValue) || field && !field._f) && !isDateObject(fieldValue) ? setFieldValues(fieldName, fieldValue, options, skipClone, skipRender) : setFieldValue(fieldName, fieldValue, options, skipClone, skipRender);
    }
  };
  const _setValue = (name, value, options, skipClone, skipStateEmit = false) => {
    const field = get(_fields, name);
    const isFieldArray = _names.array.has(name);
    const cloneValue = skipClone ? value : cloneObject(value);
    const previousValue = get(_formValues, name);
    const isValueUnchanged = deepEqual(previousValue, cloneValue);
    if (!isValueUnchanged) {
      set(_formValues, name, cloneValue);
    }
    if (isFieldArray) {
      _subjects.array.next({
        name,
        values: skipClone ? _formValues : cloneObject(_formValues)
      });
      if ((_proxyFormState.isDirty || _proxyFormState.dirtyFields || _proxySubscribeFormState.isDirty || _proxySubscribeFormState.dirtyFields) && options.shouldDirty) {
        _updateDirtyFields();
        if (!skipStateEmit) {
          _subjects.state.next({
            name,
            dirtyFields: _formState.dirtyFields,
            isDirty: _getDirty(name, cloneValue)
          });
        }
      }
    } else {
      const isEmpty = Array.isArray(cloneValue) && !cloneValue.length || isEmptyObject(cloneValue);
      if (!field || field._f || isNullOrUndefined(cloneValue) || isEmpty) {
        setFieldValue(name, cloneValue, options, skipClone, skipStateEmit);
      } else {
        setFieldValues(name, cloneValue, options, skipClone, skipStateEmit);
      }
    }
    if (!isValueUnchanged && !skipStateEmit) {
      const watched = isWatched(name, _names);
      const values = skipClone ? _formValues : cloneObject(_formValues);
      _subjects.state.next({
        ...watched && _formState,
        name: _state.mount || watched ? name : void 0,
        values
      });
    }
  };
  const setValue = (name, value, options = {}) => _setValue(name, value, options, false);
  const setValues = (formValues, options = {}) => {
    const updatedFormValues = isFunction(formValues) ? formValues(_formValues) : formValues;
    if (!deepEqual(_formValues, updatedFormValues)) {
      _formValues = {
        ..._formValues,
        ...updatedFormValues
      };
      const flattenedUpdates = flatten(updatedFormValues);
      for (const fieldName of _names.mount) {
        if (fieldName in flattenedUpdates) {
          _setValue(fieldName, flattenedUpdates[fieldName], options, true, true);
        }
      }
      _subjects.state.next({
        ..._formState,
        name: void 0,
        type: void 0,
        ..._valuesSubscriberCount ? { values: _formValues } : {}
      });
      if (options.shouldValidate) {
        _setValid();
      }
    }
  };
  const onChange = async (event) => {
    _state.mount = true;
    const target = event.target;
    let name = target.name;
    let isFieldValueUpdated = true;
    const field = get(_fields, name);
    const _updateIsFieldValueUpdated = (fieldValue) => {
      isFieldValueUpdated = Number.isNaN(fieldValue) || isDateObject(fieldValue) && isNaN(fieldValue.getTime()) || deepEqual(fieldValue, get(_formValues, name, fieldValue));
    };
    if (field) {
      let error;
      let isValid;
      const fieldValue = target.type ? getFieldValue(field._f) : getEventValue(event);
      const isBlurEvent = event.type === EVENTS.BLUR || event.type === EVENTS.FOCUS_OUT;
      const hasNoValidationEffect = !hasValidation(field._f) && !props.validate && !_options.resolver && !get(_formState.errors, name) && !field._f.deps;
      const shouldSkipValidation = hasNoValidationEffect || skipValidation(isBlurEvent, get(_formState.touchedFields, name), _formState.isSubmitted, _validationModeAfterSubmit, _validationModeBeforeSubmit);
      const watched = isWatched(name, _names, isBlurEvent);
      set(_formValues, name, fieldValue);
      if (isBlurEvent) {
        if (!target || !target.readOnly) {
          field._f.onBlur && field._f.onBlur(event);
          delayErrorCallback && delayErrorCallback(0);
        }
      } else if (field._f.onChange) {
        field._f.onChange(event);
      }
      const fieldState = updateTouchAndDirty(name, fieldValue, isBlurEvent);
      const shouldRender = !isEmptyObject(fieldState) || watched;
      !isBlurEvent && _subjects.state.next({
        name,
        type: event.type,
        ..._valuesSubscriberCount ? { values: cloneObject(_formValues) } : {}
      });
      if (shouldSkipValidation) {
        if ((!hasNoValidationEffect || !_formState.isValid) && (_proxyFormState.isValid || _proxySubscribeFormState.isValid)) {
          if (_options.mode === "onBlur") {
            if (isBlurEvent) {
              _setValid();
            }
          } else if (!isBlurEvent) {
            _setValid();
          }
        }
        return shouldRender && _subjects.state.next({ name, ...watched ? {} : fieldState });
      }
      if (!_options.resolver && props.validate) {
        await validateForm({
          name,
          eventType: event.type
        });
      }
      !isBlurEvent && watched && _subjects.state.next({ ..._formState });
      if (_options.resolver) {
        const { errors } = await _runSchema([name]);
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (!isFieldValueUpdated) {
          !isEmptyObject(fieldState) && _subjects.state.next(fieldState);
          return;
        }
        const previousErrorLookupResult = schemaErrorLookup(_formState.errors, _fields, name);
        const errorLookupResult = schemaErrorLookup(errors, _fields, previousErrorLookupResult.name || name);
        error = errorLookupResult.error;
        name = errorLookupResult.name;
        isValid = isEmptyObject(errors);
      } else {
        _updateIsValidating([name], true);
        error = (await validateField(field, _names.disabled, _formValues, shouldDisplayAllAssociatedErrors, _options.shouldUseNativeValidation))[name];
        _updateIsValidating([name]);
        _updateIsFieldValueUpdated(fieldValue);
        if (isFieldValueUpdated) {
          if (error) {
            isValid = false;
          } else if (_proxyFormState.isValid || _proxySubscribeFormState.isValid) {
            isValid = await executeBuiltInValidation({
              fields: _fields,
              onlyCheckValid: true,
              name,
              eventType: event.type
            });
          }
        }
      }
      if (isFieldValueUpdated) {
        field._f.deps && (!Array.isArray(field._f.deps) || field._f.deps.length > 0) && trigger(field._f.deps);
        shouldRenderByError(name, isValid, error, fieldState);
      }
    }
  };
  const _focusInput = (ref, key) => {
    if (get(_formState.errors, key) && ref.focus) {
      ref.focus();
      return 1;
    }
    return;
  };
  const trigger = async (name, options = {}) => {
    let isValid;
    let validationResult;
    const fieldNames = convertToArrayPayload(name);
    if (_options.resolver) {
      const errors = await executeSchemaAndUpdateState(isUndefined(name) ? name : fieldNames);
      isValid = isEmptyObject(errors);
      validationResult = name ? !fieldNames.some((name2) => get(errors, name2)) : isValid;
    } else if (name) {
      validationResult = (await Promise.all(fieldNames.map(async (fieldName) => {
        const field = get(_fields, fieldName);
        return await executeBuiltInValidation({
          fields: field && field._f ? { [fieldName]: field } : field,
          eventType: EVENTS.TRIGGER
        });
      }))).every(Boolean);
      !(!validationResult && !_formState.isValid) && _setValid();
    } else {
      validationResult = isValid = await executeBuiltInValidation({
        fields: _fields,
        name,
        eventType: EVENTS.TRIGGER
      });
    }
    _subjects.state.next({
      ...!isString(name) || (_proxyFormState.isValid || _proxySubscribeFormState.isValid) && isValid !== _formState.isValid ? {} : { name },
      ..._options.resolver || !name ? { isValid } : {},
      errors: _formState.errors
    });
    options.shouldFocus && !validationResult && iterateFieldsByAction(_fields, _focusInput, name ? fieldNames : _names.mount);
    return validationResult;
  };
  const getValues = (fieldNames, config) => {
    let values = {
      ..._state.mount ? _formValues : _defaultValues
    };
    if (config) {
      values = extractFormValues(config.dirtyFields ? _formState.dirtyFields : _formState.touchedFields, values);
    }
    return isUndefined(fieldNames) ? values : isString(fieldNames) ? get(values, fieldNames) : fieldNames.map((name) => get(values, name));
  };
  const getFieldState = (name, formState) => ({
    invalid: !!get((formState || _formState).errors, name),
    isDirty: !!get((formState || _formState).dirtyFields, name),
    error: get((formState || _formState).errors, name),
    isValidating: !!get(_formState.validatingFields, name),
    isTouched: !!get((formState || _formState).touchedFields, name)
  });
  const clearErrors = (name) => {
    const names = name ? convertToArrayPayload(name) : void 0;
    names === null || names === void 0 ? void 0 : names.forEach((inputName) => unset(_formState.errors, inputName));
    if (names) {
      names.forEach((inputName) => {
        _subjects.state.next({
          name: inputName,
          errors: _formState.errors
        });
      });
    } else {
      _subjects.state.next({
        errors: {}
      });
    }
  };
  const setError = (name, error, options) => {
    const ref = (get(_fields, name, { _f: {} })._f || {}).ref;
    const currentError = get(_formState.errors, name) || {};
    const { ref: currentRef, message, type, ...restOfErrorTree } = currentError;
    set(_formState.errors, name, {
      ...restOfErrorTree,
      ...error,
      ref
    });
    _subjects.state.next({
      name,
      errors: _formState.errors,
      isValid: false
    });
    options && options.shouldFocus && ref && ref.focus && ref.focus();
  };
  const watch = (name, defaultValue) => {
    if (isFunction(name)) {
      _valuesSubscriberCount++;
      const { unsubscribe } = _subjects.state.subscribe({
        next: (payload) => "values" in payload && name(payload.values || _getWatch(void 0, defaultValue), payload)
      });
      let called = false;
      return {
        unsubscribe: () => {
          if (called) {
            return;
          }
          called = true;
          _valuesSubscriberCount--;
          unsubscribe();
        }
      };
    }
    return _getWatch(name, defaultValue, true);
  };
  const _subscribe = (props2) => {
    var _a;
    const needsValues = !!((_a = props2.formState) === null || _a === void 0 ? void 0 : _a.values);
    if (needsValues) {
      _valuesSubscriberCount++;
    }
    const { unsubscribe } = _subjects.state.subscribe({
      next: (formState) => {
        if (shouldSubscribeByName(props2.name, formState.name, props2.exact) && shouldRenderFormState(formState, props2.formState || _proxyFormState, _setFormState, props2.reRenderRoot)) {
          const snapshot = { ..._formValues };
          props2.callback({
            values: snapshot,
            ..._formState,
            ...formState,
            defaultValues: _defaultValues
          });
        }
      }
    });
    if (!needsValues) {
      return unsubscribe;
    }
    let called = false;
    return () => {
      if (called) {
        return;
      }
      called = true;
      _valuesSubscriberCount--;
      unsubscribe();
    };
  };
  const subscribe = (props2) => {
    _state.mount = true;
    _proxySubscribeFormState = {
      ..._proxySubscribeFormState,
      ...props2.formState
    };
    return _subscribe({
      ...props2,
      formState: {
        ...defaultProxyFormState,
        ...props2.formState
      }
    });
  };
  const unregister = (name, options = {}) => {
    for (const fieldName of name ? convertToArrayPayload(name) : _names.mount) {
      _names.mount.delete(fieldName);
      _names.array.delete(fieldName);
      if (!options.keepValue) {
        unset(_fields, fieldName);
        unset(_formValues, fieldName);
      }
      !options.keepError && unset(_formState.errors, fieldName);
      !options.keepDirty && unset(_formState.dirtyFields, fieldName);
      !options.keepTouched && unset(_formState.touchedFields, fieldName);
      !options.keepIsValidating && unset(_formState.validatingFields, fieldName);
      !_options.shouldUnregister && !options.keepDefaultValue && unset(_defaultValues, fieldName);
    }
    _subjects.state.next({
      values: cloneObject(_formValues)
    });
    _subjects.state.next({
      ..._formState,
      ...!options.keepDirty ? {} : { isDirty: _getDirty() }
    });
    !options.keepIsValid && _setValid();
  };
  const _setDisabledField = ({ disabled, name }) => {
    if (isBoolean(disabled) && _state.mount || !!disabled || _names.disabled.has(name)) {
      const wasDisabled = _names.disabled.has(name);
      const isDisabled = !!disabled;
      const disabledStateChanged = wasDisabled !== isDisabled;
      disabled ? _names.disabled.add(name) : _names.disabled.delete(name);
      disabledStateChanged && _state.mount && !_state.action && _setValid();
    }
  };
  const register = (name, options = {}) => {
    let field = get(_fields, name);
    const disabledIsDefined = isBoolean(options.disabled) || isBoolean(_options.disabled);
    const shouldRevalidateRemount = !_names.registerName.has(name) && field && field._f && !field._f.mount;
    set(_fields, name, {
      ...field || {},
      _f: {
        ...field && field._f ? field._f : { ref: { name } },
        name,
        mount: true,
        ...options
      }
    });
    _names.mount.add(name);
    if (field && !shouldRevalidateRemount) {
      _setDisabledField({
        disabled: isBoolean(options.disabled) ? options.disabled : _options.disabled,
        name
      });
    } else {
      updateValidAndValue(name, true, options.value);
    }
    return {
      ...disabledIsDefined ? { disabled: options.disabled || _options.disabled } : {},
      ..._options.progressive ? {
        required: !!options.required,
        min: getRuleValue(options.min),
        max: getRuleValue(options.max),
        minLength: getRuleValue(options.minLength),
        maxLength: getRuleValue(options.maxLength),
        pattern: getRuleValue(options.pattern)
      } : {},
      name,
      onChange,
      onBlur: onChange,
      ref: (ref) => {
        if (ref) {
          _names.registerName.add(name);
          register(name, options);
          _names.registerName.delete(name);
          field = get(_fields, name);
          const fieldRef = isUndefined(ref.value) ? ref.querySelectorAll ? ref.querySelectorAll("input,select,textarea")[0] || ref : ref : ref;
          const radioOrCheckbox = isRadioOrCheckbox(fieldRef);
          const refs = field._f.refs || [];
          if (radioOrCheckbox ? refs.find((option) => option === fieldRef) : fieldRef === field._f.ref) {
            return;
          }
          set(_fields, name, {
            _f: {
              ...field._f,
              ...radioOrCheckbox ? {
                refs: [
                  ...refs.filter(live),
                  fieldRef,
                  ...Array.isArray(get(_defaultValues, name)) ? [{}] : []
                ],
                ref: { type: fieldRef.type, name }
              } : { ref: fieldRef }
            }
          });
          updateValidAndValue(name, false, void 0, fieldRef);
        } else {
          field = get(_fields, name, {});
          if (field._f) {
            field._f.mount = false;
          }
          (_options.shouldUnregister || options.shouldUnregister) && !(isNameInFieldArray(_names.array, name) && _state.action) && _names.unMount.add(name);
        }
      }
    };
  };
  const _focusError = () => _options.shouldFocusError && !_options.shouldUseNativeValidation && iterateFieldsByAction(_fields, _focusInput, _names.mount);
  const _disableForm = (disabled) => {
    if (isBoolean(disabled)) {
      _subjects.state.next({ disabled });
      iterateFieldsByAction(_fields, (ref, name) => {
        const currentField = get(_fields, name);
        if (currentField) {
          ref.disabled = currentField._f.disabled || disabled;
          if (Array.isArray(currentField._f.refs)) {
            currentField._f.refs.forEach((inputRef) => {
              inputRef.disabled = currentField._f.disabled || disabled;
            });
          }
        }
      }, 0, false);
    }
  };
  const handleSubmit = (onValid, onInvalid) => async (e) => {
    let onValidError = void 0;
    if (e) {
      e.preventDefault && e.preventDefault();
      e.persist && e.persist();
    }
    let fieldValues = cloneObject(_formValues);
    _subjects.state.next({
      isSubmitting: true
    });
    if (_options.resolver) {
      const { errors, values } = await _runSchema();
      _updateIsValidating();
      _formState.errors = errors;
      fieldValues = cloneObject(values);
    } else {
      await executeBuiltInValidation({
        fields: _fields,
        eventType: EVENTS.SUBMIT
      });
    }
    if (_names.disabled.size) {
      for (const name of _names.disabled) {
        unset(fieldValues, name);
      }
    }
    unset(_formState.errors, ROOT_ERROR_TYPE);
    if (isEmptyObject(_formState.errors)) {
      _subjects.state.next({
        errors: {}
      });
      try {
        await onValid(fieldValues, e);
      } catch (error) {
        onValidError = error;
      }
    } else {
      if (onInvalid) {
        await onInvalid({ ..._formState.errors }, e);
      }
      _focusError();
      setTimeout(_focusError);
    }
    _subjects.state.next({
      isSubmitted: true,
      isSubmitting: false,
      isSubmitSuccessful: isEmptyObject(_formState.errors) && !onValidError,
      submitCount: _formState.submitCount + 1,
      errors: _formState.errors
    });
    if (onValidError) {
      throw onValidError;
    }
  };
  const resetField = (name, options = {}) => {
    if (get(_fields, name)) {
      if (isUndefined(options.defaultValue)) {
        setValue(name, cloneObject(get(_defaultValues, name)));
      } else {
        setValue(name, options.defaultValue);
        set(_defaultValues, name, cloneObject(options.defaultValue));
      }
      if (!options.keepTouched) {
        unset(_formState.touchedFields, name);
      }
      if (!options.keepDirty) {
        unset(_formState.dirtyFields, name);
        _formState.isDirty = options.defaultValue ? _getDirty(name, cloneObject(get(_defaultValues, name))) : _getDirty();
      }
      if (!options.keepError) {
        unset(_formState.errors, name);
        _proxyFormState.isValid && _setValid();
      }
      _subjects.state.next({ ..._formState });
    }
  };
  const _reset = (formValues, keepStateOptions = {}) => {
    const updatedValues = formValues ? cloneObject(formValues) : _defaultValues;
    const cloneUpdatedValues = cloneObject(updatedValues);
    const isEmptyResetValues = isEmptyObject(formValues);
    const values = cloneUpdatedValues;
    if (!keepStateOptions.keepDefaultValues) {
      _defaultValues = updatedValues;
    }
    if (!keepStateOptions.keepValues) {
      if (keepStateOptions.keepDirtyValues) {
        const fieldsToCheck = /* @__PURE__ */ new Set([
          ..._names.mount,
          ...Object.keys(getDirtyFields(_defaultValues, _formValues))
        ]);
        for (const fieldName of Array.from(fieldsToCheck)) {
          const isDirty = get(_formState.dirtyFields, fieldName);
          const existingValue = get(_formValues, fieldName);
          const newValue = get(values, fieldName);
          if (isDirty && !isUndefined(existingValue)) {
            set(values, fieldName, existingValue);
          } else if (!isDirty && !isUndefined(newValue)) {
            setValue(fieldName, newValue);
          }
        }
      } else {
        if (isWeb && isUndefined(formValues)) {
          for (const name of _names.mount) {
            const field = get(_fields, name);
            if (field && field._f) {
              const fieldReference = Array.isArray(field._f.refs) ? field._f.refs[0] : field._f.ref;
              if (isHTMLElement(fieldReference)) {
                const form = fieldReference.closest("form");
                if (form) {
                  form.reset();
                  break;
                }
              }
            }
          }
        }
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            setValue(fieldName, get(values, fieldName));
          }
        } else {
          _fields = {};
        }
      }
      if (_options.shouldUnregister) {
        _formValues = keepStateOptions.keepDefaultValues ? cloneObject(_defaultValues) : {};
        if (keepStateOptions.keepFieldsRef) {
          for (const fieldName of _names.mount) {
            set(_formValues, fieldName, get(values, fieldName));
          }
        }
      } else {
        _formValues = cloneObject(values);
      }
      _subjects.array.next({
        values: { ...values }
      });
      _subjects.state.next({
        name: void 0,
        type: void 0,
        values: { ...values }
      });
    }
    _names = {
      mount: keepStateOptions.keepDirtyValues ? _names.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      registerName: /* @__PURE__ */ new Set(),
      disabled: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: false,
      focus: ""
    };
    _state.mount = !_proxyFormState.isValid || !!keepStateOptions.keepIsValid || !!keepStateOptions.keepDirtyValues || !_options.shouldUnregister && !isEmptyObject(values);
    _state.watch = !!_options.shouldUnregister;
    _state.keepIsValid = !!keepStateOptions.keepIsValid;
    _state.action = false;
    if (!keepStateOptions.keepErrors) {
      _formState.errors = {};
    }
    _subjects.state.next({
      submitCount: keepStateOptions.keepSubmitCount ? _formState.submitCount : 0,
      isDirty: isEmptyResetValues ? false : keepStateOptions.keepDirty ? _formState.isDirty : keepStateOptions.keepValues ? _getDirty() : !!(keepStateOptions.keepDefaultValues && !deepEqual(formValues, _defaultValues)),
      isSubmitted: keepStateOptions.keepIsSubmitted ? _formState.isSubmitted : false,
      dirtyFields: isEmptyResetValues ? {} : keepStateOptions.keepDirtyValues ? keepStateOptions.keepDefaultValues && _formValues ? getDirtyFields(_defaultValues, _formValues) : _formState.dirtyFields : keepStateOptions.keepDefaultValues && formValues ? getDirtyFields(_defaultValues, formValues) : keepStateOptions.keepDirty ? _formState.dirtyFields : {},
      touchedFields: keepStateOptions.keepTouched ? _formState.touchedFields : {},
      errors: keepStateOptions.keepErrors ? _formState.errors : {},
      isSubmitSuccessful: keepStateOptions.keepIsSubmitSuccessful ? _formState.isSubmitSuccessful : false,
      isSubmitting: false,
      defaultValues: _defaultValues
    });
  };
  const reset = (formValues, keepStateOptions) => _reset(isFunction(formValues) ? formValues(_formValues) : formValues, { ..._options.resetOptions, ...keepStateOptions });
  const setFocus = (name, options = {}) => {
    const field = get(_fields, name);
    const fieldReference = field && field._f;
    if (fieldReference) {
      const fieldRef = fieldReference.refs ? fieldReference.refs[0] : fieldReference.ref;
      if (fieldRef.focus) {
        setTimeout(() => {
          fieldRef.focus();
          options.shouldSelect && isFunction(fieldRef.select) && fieldRef.select();
        });
      }
    }
  };
  const _setFormState = (updatedFormState) => {
    const { name, type, values, ...formState } = updatedFormState;
    _formState = {
      ..._formState,
      ...formState
    };
  };
  const _resetDefaultValues = () => isFunction(_options.defaultValues) && _options.defaultValues().then((values) => {
    reset(values, _options.resetOptions);
    _subjects.state.next({
      isLoading: false
    });
  });
  const resetDefaultValues = (values, options = {}) => {
    _defaultValues = cloneObject(values);
    if (!options.keepDirty) {
      const newDirtyFields = getDirtyFields(_defaultValues, _formValues);
      _formState.dirtyFields = newDirtyFields;
      _formState.isDirty = !isEmptyObject(newDirtyFields);
    }
    if (!options.keepIsValid) {
      _setValid();
    }
    _subjects.state.next({
      ..._formState,
      defaultValues: _defaultValues
    });
  };
  const methods = {
    control: {
      register,
      unregister,
      getFieldState,
      handleSubmit,
      setError,
      _subscribe,
      _runSchema,
      _updateIsValidating,
      _focusError,
      _getWatch,
      _getDirty,
      _setValid,
      _setFieldArray,
      _setDisabledField,
      _setErrors,
      _getFieldArray,
      _reset,
      _resetDefaultValues,
      _removeUnmounted,
      _disableForm,
      _subjects,
      _proxyFormState,
      get _fields() {
        return _fields;
      },
      get _formValues() {
        return _formValues;
      },
      get _state() {
        return _state;
      },
      set _state(value) {
        _state = value;
      },
      get _defaultValues() {
        return _defaultValues;
      },
      get _names() {
        return _names;
      },
      set _names(value) {
        _names = value;
      },
      get _formState() {
        return _formState;
      },
      get _options() {
        return _options;
      },
      set _options(value) {
        _options = {
          ..._options,
          ...value
        };
        _validationModeBeforeSubmit = getValidationModes(_options.mode);
        _validationModeAfterSubmit = getValidationModes(_options.reValidateMode);
      }
    },
    subscribe,
    trigger,
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    resetField,
    resetDefaultValues,
    clearErrors,
    unregister,
    setError,
    setFocus,
    getFieldState
  };
  return {
    ...methods,
    formControl: methods
  };
}
function useForm(props = {}) {
  const _formControl = React4.useRef(void 0);
  const _values = React4.useRef(void 0);
  const _formControlProp = React4.useRef(props.formControl);
  const [formState, updateFormState] = React4.useState(() => ({
    ...cloneObject(DEFAULT_FORM_STATE),
    isLoading: isFunction(props.defaultValues),
    errors: props.errors || {},
    disabled: props.disabled || false,
    defaultValues: isFunction(props.defaultValues) ? void 0 : props.defaultValues
  }));
  if (!_formControl.current || props.formControl && _formControlProp.current !== props.formControl) {
    _formControlProp.current = props.formControl;
    if (props.formControl) {
      _formControl.current = {
        ...props.formControl,
        formState
      };
      if (props.defaultValues && !isFunction(props.defaultValues)) {
        props.formControl.reset(props.defaultValues, props.resetOptions);
      }
    } else {
      const { formControl, ...rest } = createFormControl(props);
      _formControl.current = {
        ...rest,
        formState
      };
    }
  }
  const control = _formControl.current.control;
  control._options = props;
  useIsomorphicLayoutEffect(() => {
    const sub = control._subscribe({
      formState: control._proxyFormState,
      callback: () => updateFormState({
        ...control._formState,
        defaultValues: control._defaultValues
      }),
      reRenderRoot: true
    });
    updateFormState((data) => ({
      ...data,
      isReady: true
    }));
    control._formState.isReady = true;
    return sub;
  }, [control]);
  React4.useEffect(() => control._disableForm(props.disabled), [control, props.disabled]);
  React4.useEffect(() => {
    if (props.mode) {
      control._options.mode = props.mode;
    }
    if (props.reValidateMode) {
      control._options.reValidateMode = props.reValidateMode;
    }
  }, [control, props.mode, props.reValidateMode]);
  React4.useEffect(() => {
    if (props.errors) {
      control._setErrors(props.errors);
      control._focusError();
    }
  }, [control, props.errors]);
  React4.useEffect(() => {
    props.shouldUnregister && control._subjects.state.next({
      values: control._getWatch()
    });
  }, [control, props.shouldUnregister]);
  React4.useEffect(() => {
    if (control._proxyFormState.isDirty) {
      const isDirty = control._getDirty();
      if (isDirty !== formState.isDirty) {
        control._subjects.state.next({
          isDirty
        });
      }
    }
  }, [control, formState.isDirty]);
  React4.useEffect(() => {
    var _a;
    if (props.values && !deepEqual(props.values, _values.current)) {
      control._reset(props.values, {
        keepFieldsRef: true,
        ...control._options.resetOptions
      });
      if (!((_a = control._options.resetOptions) === null || _a === void 0 ? void 0 : _a.keepIsValid)) {
        control._setValid();
      }
      _values.current = props.values;
      updateFormState((state) => ({ ...state }));
    } else {
      control._resetDefaultValues();
    }
  }, [control, props.values]);
  React4.useEffect(() => {
    if (!control._state.mount) {
      control._setValid();
      control._state.mount = true;
    }
    if (control._state.watch) {
      control._state.watch = false;
      control._subjects.state.next({ ...control._formState });
    }
    control._removeUnmounted();
  });
  _formControl.current.formState = React4.useMemo(() => getProxyFormState(formState, control), [control, formState]);
  return _formControl.current;
}
var f;
!(function(e) {
  e.SCRIPT_NOT_AVAILABLE = "Recaptcha script is not available";
})(f || (f = {}));
var v = reactExports.createContext({ executeRecaptcha: function() {
  throw Error("GoogleReCaptcha Context has not yet been implemented, if you are using useGoogleReCaptcha hook, make sure the hook is called inside component wrapped by GoogleRecaptchaProvider");
} });
v.Consumer;
function w(e, t) {
  return e(t = { exports: {} }, t.exports), t.exports;
  /** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
}
var $ = "function" == typeof Symbol && Symbol.for, C = $ ? Symbol.for("react.element") : 60103, P = $ ? Symbol.for("react.portal") : 60106, x = $ ? Symbol.for("react.fragment") : 60107, E = $ ? Symbol.for("react.strict_mode") : 60108, R = $ ? Symbol.for("react.profiler") : 60114, M = $ ? Symbol.for("react.provider") : 60109, N = $ ? Symbol.for("react.context") : 60110, O = $ ? Symbol.for("react.async_mode") : 60111, _ = $ ? Symbol.for("react.concurrent_mode") : 60111, T = $ ? Symbol.for("react.forward_ref") : 60112, j = $ ? Symbol.for("react.suspense") : 60113, L = $ ? Symbol.for("react.suspense_list") : 60120, k = $ ? Symbol.for("react.memo") : 60115, F = $ ? Symbol.for("react.lazy") : 60116, A = $ ? Symbol.for("react.block") : 60121, V = $ ? Symbol.for("react.fundamental") : 60117, z = $ ? Symbol.for("react.responder") : 60118, G = $ ? Symbol.for("react.scope") : 60119;
function I(e) {
  if ("object" == typeof e && null !== e) {
    var t = e.$$typeof;
    switch (t) {
      case C:
        switch (e = e.type) {
          case O:
          case _:
          case x:
          case R:
          case E:
          case j:
            return e;
          default:
            switch (e = e && e.$$typeof) {
              case N:
              case T:
              case F:
              case k:
              case M:
                return e;
              default:
                return t;
            }
        }
      case P:
        return t;
    }
  }
}
function D(e) {
  return I(e) === _;
}
var q = { AsyncMode: O, ConcurrentMode: _, ContextConsumer: N, ContextProvider: M, Element: C, ForwardRef: T, Fragment: x, Lazy: F, Memo: k, Portal: P, Profiler: R, StrictMode: E, Suspense: j, isAsyncMode: function(e) {
  return D(e) || I(e) === O;
}, isConcurrentMode: D, isContextConsumer: function(e) {
  return I(e) === N;
}, isContextProvider: function(e) {
  return I(e) === M;
}, isElement: function(e) {
  return "object" == typeof e && null !== e && e.$$typeof === C;
}, isForwardRef: function(e) {
  return I(e) === T;
}, isFragment: function(e) {
  return I(e) === x;
}, isLazy: function(e) {
  return I(e) === F;
}, isMemo: function(e) {
  return I(e) === k;
}, isPortal: function(e) {
  return I(e) === P;
}, isProfiler: function(e) {
  return I(e) === R;
}, isStrictMode: function(e) {
  return I(e) === E;
}, isSuspense: function(e) {
  return I(e) === j;
}, isValidElementType: function(e) {
  return "string" == typeof e || "function" == typeof e || e === x || e === _ || e === R || e === E || e === j || e === L || "object" == typeof e && null !== e && (e.$$typeof === F || e.$$typeof === k || e.$$typeof === M || e.$$typeof === N || e.$$typeof === T || e.$$typeof === V || e.$$typeof === z || e.$$typeof === G || e.$$typeof === A);
}, typeOf: I }, B = w((function(e, t) {
  "production" !== process.env.NODE_ENV && (function() {
    var e2 = "function" == typeof Symbol && Symbol.for, r = e2 ? Symbol.for("react.element") : 60103, o = e2 ? Symbol.for("react.portal") : 60106, n = e2 ? Symbol.for("react.fragment") : 60107, a = e2 ? Symbol.for("react.strict_mode") : 60108, c = e2 ? Symbol.for("react.profiler") : 60114, i = e2 ? Symbol.for("react.provider") : 60109, s = e2 ? Symbol.for("react.context") : 60110, u = e2 ? Symbol.for("react.async_mode") : 60111, l = e2 ? Symbol.for("react.concurrent_mode") : 60111, f2 = e2 ? Symbol.for("react.forward_ref") : 60112, p = e2 ? Symbol.for("react.suspense") : 60113, d = e2 ? Symbol.for("react.suspense_list") : 60120, y = e2 ? Symbol.for("react.memo") : 60115, m = e2 ? Symbol.for("react.lazy") : 60116, v2 = e2 ? Symbol.for("react.block") : 60121, b = e2 ? Symbol.for("react.fundamental") : 60117, h = e2 ? Symbol.for("react.responder") : 60118, g = e2 ? Symbol.for("react.scope") : 60119;
    function S(e3) {
      if ("object" == typeof e3 && null !== e3) {
        var t2 = e3.$$typeof;
        switch (t2) {
          case r:
            var d2 = e3.type;
            switch (d2) {
              case u:
              case l:
              case n:
              case c:
              case a:
              case p:
                return d2;
              default:
                var v3 = d2 && d2.$$typeof;
                switch (v3) {
                  case s:
                  case f2:
                  case m:
                  case y:
                  case i:
                    return v3;
                  default:
                    return t2;
                }
            }
          case o:
            return t2;
        }
      }
    }
    var w2 = u, $2 = l, C2 = s, P2 = i, x2 = r, E2 = f2, R2 = n, M2 = m, N2 = y, O2 = o, _2 = c, T2 = a, j2 = p, L2 = false;
    function k2(e3) {
      return S(e3) === l;
    }
    t.AsyncMode = w2, t.ConcurrentMode = $2, t.ContextConsumer = C2, t.ContextProvider = P2, t.Element = x2, t.ForwardRef = E2, t.Fragment = R2, t.Lazy = M2, t.Memo = N2, t.Portal = O2, t.Profiler = _2, t.StrictMode = T2, t.Suspense = j2, t.isAsyncMode = function(e3) {
      return L2 || (L2 = true, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k2(e3) || S(e3) === u;
    }, t.isConcurrentMode = k2, t.isContextConsumer = function(e3) {
      return S(e3) === s;
    }, t.isContextProvider = function(e3) {
      return S(e3) === i;
    }, t.isElement = function(e3) {
      return "object" == typeof e3 && null !== e3 && e3.$$typeof === r;
    }, t.isForwardRef = function(e3) {
      return S(e3) === f2;
    }, t.isFragment = function(e3) {
      return S(e3) === n;
    }, t.isLazy = function(e3) {
      return S(e3) === m;
    }, t.isMemo = function(e3) {
      return S(e3) === y;
    }, t.isPortal = function(e3) {
      return S(e3) === o;
    }, t.isProfiler = function(e3) {
      return S(e3) === c;
    }, t.isStrictMode = function(e3) {
      return S(e3) === a;
    }, t.isSuspense = function(e3) {
      return S(e3) === p;
    }, t.isValidElementType = function(e3) {
      return "string" == typeof e3 || "function" == typeof e3 || e3 === n || e3 === l || e3 === c || e3 === a || e3 === p || e3 === d || "object" == typeof e3 && null !== e3 && (e3.$$typeof === m || e3.$$typeof === y || e3.$$typeof === i || e3.$$typeof === s || e3.$$typeof === f2 || e3.$$typeof === b || e3.$$typeof === h || e3.$$typeof === g || e3.$$typeof === v2);
    }, t.typeOf = S;
  })();
})), J = (B.AsyncMode, B.ConcurrentMode, B.ContextConsumer, B.ContextProvider, B.Element, B.ForwardRef, B.Fragment, B.Lazy, B.Memo, B.Portal, B.Profiler, B.StrictMode, B.Suspense, B.isAsyncMode, B.isConcurrentMode, B.isContextConsumer, B.isContextProvider, B.isElement, B.isForwardRef, B.isFragment, B.isLazy, B.isMemo, B.isPortal, B.isProfiler, B.isStrictMode, B.isSuspense, B.isValidElementType, B.typeOf, w((function(e) {
  "production" === process.env.NODE_ENV ? e.exports = q : e.exports = B;
}))), H = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, Q = {};
Q[J.ForwardRef] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, Q[J.Memo] = H;
function EmbedRenderer({ html }) {
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = html;
    const scripts = containerRef.current.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      var _a;
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.innerHTML) {
        newScript.innerHTML = oldScript.innerHTML;
      }
      (_a = oldScript.parentNode) == null ? void 0 : _a.replaceChild(newScript, oldScript);
    });
  }, [html]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { ref: containerRef, className: "deliveriq-embed-container" }, void 0, false, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/EmbedRenderer.tsx",
    lineNumber: 38,
    columnNumber: 10
  }, this);
}
function DynamicForm({ formId }) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BaseFormInner, { formId, executeRecaptcha: void 0 }, void 0, false, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
    lineNumber: 21,
    columnNumber: 10
  }, this);
}
function BaseFormInner({ formId, executeRecaptcha }) {
  var _a, _b;
  const { data: cms } = useCmsContent();
  const [searchParams] = distExports.useSearchParams();
  const sessionSlug = searchParams.get("session");
  const matchedSession = formId === "register" ? (_a = cms == null ? void 0 : cms.sessions) == null ? void 0 : _a.find((s) => s.id === sessionSlug) : void 0;
  const formDef = (_b = cms == null ? void 0 : cms.forms) == null ? void 0 : _b.find((f2) => f2.id === formId);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [success, setSuccess] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  if (!formDef) {
    return null;
  }
  if (formDef.formType === "embed") {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "deliveriq-embed-wrapper", id: `form-embed-${formId}`, children: [
      formDef.customCss && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: formDef.customCss }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 48,
        columnNumber: 31
      }, this),
      formDef.headerHtml && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "deliveriq-form-header", dangerouslySetInnerHTML: { __html: formDef.headerHtml } }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 50,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EmbedRenderer, { html: formDef.embedCode || "" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this);
  }
  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      let token = "development-token";
      if (executeRecaptcha) {
        token = await executeRecaptcha("form_submit");
      }
      const res = await fetch("/api/cms/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          data,
          recaptchaToken: token
        })
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Submission failed");
      }
      setSuccess(true);
      reset();
    } catch (err) {
      setErrorMsg(err.message || "An error occurred while submitting the form.");
    }
  };
  if (success) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] p-8 border border-[#2C2F38] rounded-sm text-center", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-[#C79A4E] mb-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("svg", { className: "w-12 h-12 mx-auto", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 92,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 91,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-xl font-bold text-[#F0EDE8] mb-2", children: "Success" }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 95,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-[#8A8D96]", children: formDef.successMessage }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          onClick: () => setSuccess(false),
          className: "mt-6 text-sm text-[#C79A4E] hover:underline",
          children: "Submit another response"
        },
        void 0,
        false,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
          lineNumber: 97,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full max-w-2xl mx-auto flex flex-col gap-6", id: `form-wrapper-${formId}`, children: [
    formDef.customCss && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("style", { children: formDef.customCss }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 109,
      columnNumber: 29
    }, this),
    formDef.headerHtml && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "deliveriq-form-header", dangerouslySetInnerHTML: { __html: formDef.headerHtml } }, void 0, false, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this),
    matchedSession && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "bg-[#1A1D24] border border-[#2C2F38] rounded-sm p-4 text-xs", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider block mb-1", children: matchedSession.tag }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h4", { className: "font-bold text-[#F0EDE8] mb-1 leading-snug", children: matchedSession.title }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 116,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[#8A8D96] mb-3 leading-relaxed", children: matchedSession.description }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 117,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[10px] text-[#8A8D96] block", children: [
        "Schedule: ",
        matchedSession.date,
        " @ ",
        matchedSession.time,
        " (",
        matchedSession.duration,
        ")"
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col gap-5", children: [
      errorMsg && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "p-4 bg-red-900/20 border border-red-500/50 rounded-sm text-red-200 text-sm", role: "alert", children: errorMsg }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 124,
        columnNumber: 11
      }, this),
      formDef.fields.map((field) => {
        var _a2;
        const hasError = !!errors[field.id];
        return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { htmlFor: field.id, className: "text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider", children: [
            field.label,
            " ",
            field.required && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-[#C79A4E]", "aria-hidden": "true", children: "*" }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
              lineNumber: 134,
              columnNumber: 48
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          field.type === "textarea" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "textarea",
            {
              id: field.id,
              rows: 4,
              placeholder: field.placeholder,
              "aria-invalid": hasError,
              "aria-required": field.required,
              ...register(field.id, { required: field.required }),
              className: "h-auto w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-3 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E] resize-none"
            },
            void 0,
            false,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
              lineNumber: 138,
              columnNumber: 15
            },
            this
          ) : field.type === "select" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "select",
            {
              id: field.id,
              "aria-invalid": hasError,
              "aria-required": field.required,
              ...register(field.id, { required: field.required }),
              className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E] appearance-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: "", children: "Select an option..." }, void 0, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
                  lineNumber: 155,
                  columnNumber: 17
                }, this),
                (_a2 = field.options) == null ? void 0 : _a2.map((opt) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("option", { value: opt, children: opt }, opt, false, {
                  fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
                  lineNumber: 157,
                  columnNumber: 19
                }, this))
              ]
            },
            void 0,
            true,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
              lineNumber: 148,
              columnNumber: 15
            },
            this
          ) : field.type === "checkbox" ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3 mt-1", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "input",
              {
                type: "checkbox",
                id: field.id,
                "aria-invalid": hasError,
                "aria-required": field.required,
                ...register(field.id, { required: field.required }),
                className: "w-5 h-5 border-[#2C2F38] bg-[#14161B] rounded text-[#C79A4E] focus:ring-[#C79A4E]"
              },
              void 0,
              false,
              {
                fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
                lineNumber: 162,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-[#8A8D96]", children: field.placeholder || field.label }, void 0, false, {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
              lineNumber: 170,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
            lineNumber: 161,
            columnNumber: 16
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "input",
            {
              type: field.type,
              id: field.id,
              placeholder: field.placeholder,
              "aria-invalid": hasError,
              "aria-required": field.required,
              ...register(field.id, { required: field.required }),
              className: "h-12 w-full rounded-[10px] border border-[#2C2F38] bg-[#14161B] px-4 py-2 text-sm text-[#F0EDE8] transition-colors placeholder:text-[#8A8D96] focus:outline-none focus:border-[#C79A4E] focus:ring-1 focus:ring-[#C79A4E]"
            },
            void 0,
            false,
            {
              fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
              lineNumber: 173,
              columnNumber: 15
            },
            this
          ),
          hasError && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-xs text-red-400", role: "alert", children: "This field is required" }, void 0, false, {
            fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
            lineNumber: 184,
            columnNumber: 15
          }, this)
        ] }, field.id, true, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this);
      }),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: "w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
          children: isSubmitting ? "Submitting..." : formDef.submitButtonText
        },
        void 0,
        false,
        {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
          lineNumber: 191,
          columnNumber: 9
        },
        this
      ) }, void 0, false, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 190,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-[10px] text-[#8A8D96] text-center mt-2", children: [
        "Protected by reCAPTCHA. ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://policies.google.com/privacy", target: "_blank", rel: "noreferrer", className: "hover:text-[#C79A4E] underline", children: "Privacy" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
          lineNumber: 201,
          columnNumber: 33
        }, this),
        " & ",
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("a", { href: "https://policies.google.com/terms", target: "_blank", rel: "noreferrer", className: "hover:text-[#C79A4E] underline", children: "Terms" }, void 0, false, {
          fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
          lineNumber: 201,
          columnNumber: 173
        }, this),
        " apply."
      ] }, void 0, true, {
        fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
        lineNumber: 200,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "D:/DeliverIQ (2)/DeliverIQ (2)/DeliverIQ/DeliverIQ_2/src/components/cms/DynamicForm.tsx",
    lineNumber: 108,
    columnNumber: 5
  }, this);
}
export {
  Controller as C,
  DynamicForm as D,
  FormProvider as F,
  appendErrors as a,
  useForm as b,
  get as g,
  set as s,
  useFormContext as u
};
