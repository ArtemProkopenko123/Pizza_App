"use client"

import { forwardRef, createContext, useContext, useId } from "react"
import type {
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  HTMLAttributes,
  ReactNode,
  OptionHTMLAttributes,
} from "react"


type FieldContextValue = {
  id: string
  hasError: boolean
  disabled: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

const useFieldContext = () => useContext(FieldContext)


export type SelectSize = "sm" | "md" | "lg"
export type SelectVariant = "outline" | "filled"

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  size?: SelectSize
  variant?: SelectVariant
  error?: string
  leftIcon?: ReactNode
  placeholder?: string
  options?: SelectOption[]
}


const sizeMap: Record<SelectSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
}

const variantBase: Record<SelectVariant, string> = {
  outline:
    "rounded-md border border-gray-200 bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
  filled:
    "rounded-md border border-transparent bg-gray-100 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
}


const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)


const SelectFieldRoot = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      id: idProp,
      size = "md",
      variant = "outline",
      error,
      leftIcon,
      placeholder,
      options,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const ctx = useFieldContext()
    const id = idProp ?? ctx?.id
    const hasError = Boolean(error) || (ctx?.hasError ?? false)
    const isDisabled = disabled ?? ctx?.disabled ?? false

    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-gray-400">
            {leftIcon}
          </span>
        )}

        <select
          ref={ref}
          id={id}
          disabled={isDisabled}
          aria-invalid={hasError || undefined}
          className={[
            "w-full appearance-none outline-none transition-all duration-200",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "text-gray-800 [&>option:not(:first-child)]:text-gray-800",
            sizeMap[size],
            variantBase[variant],
            hasError ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "",
            leftIcon ? "pl-9" : "",
            "pr-9",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <span className="pointer-events-none absolute right-3 flex items-center text-gray-400">
          <ChevronDown />
        </span>
      </div>
    )
  }
)
SelectFieldRoot.displayName = "SelectField"


type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean
}

const Label = ({ children, required, className = "", htmlFor, ...props }: LabelProps) => {
  const ctx = useFieldContext()
  return (
    <label
      htmlFor={htmlFor ?? ctx?.id}
      className={`mb-1.5 block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-orange-500" aria-hidden>
          *
        </span>
      )}
    </label>
  )
}
Label.displayName = "SelectField.Label"


const ErrorMessage = ({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p
    role="alert"
    className={`mt-1.5 flex items-center gap-1 text-xs text-red-500 ${className}`}
    {...props}
  >
    <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
    {children}
  </p>
)
ErrorMessage.displayName = "SelectField.Error"


const Hint = ({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`mt-1.5 text-xs text-gray-400 ${className}`} {...props}>
    {children}
  </p>
)
Hint.displayName = "SelectField.Hint"


const Option = ({ children, ...props }: OptionHTMLAttributes<HTMLOptionElement>) => (
  <option {...props}>{children}</option>
)
Option.displayName = "SelectField.Option"


type FieldProps = {
  label?: ReactNode
  required?: boolean
  error?: string
  hint?: string
  disabled?: boolean
  className?: string
  children: ReactNode
}

const Field = ({
  label,
  required,
  error,
  hint,
  disabled = false,
  className = "",
  children,
}: FieldProps) => {
  const id = useId()

  return (
    <FieldContext.Provider value={{ id, hasError: Boolean(error), disabled }}>
      <div className={`flex flex-col ${className}`}>
        {label && <Label required={required}>{label}</Label>}
        {children}
        {error ? <ErrorMessage>{error}</ErrorMessage> : hint && <Hint>{hint}</Hint>}
      </div>
    </FieldContext.Provider>
  )
}
Field.displayName = "SelectField.Field"


/**
 * Reusable select — compound component with react-hook-form support.
 *
 * ## With options prop (convenience)
 * ```tsx
 * const sizes = [
 *   { value: "sm", label: "Small" },
 *   { value: "lg", label: "Large" },
 * ]
 *
 * <SelectField.Field label="Size" required error={errors.size?.message}>
 *   <SelectField {...register("size")} options={sizes} placeholder="Pick a size" />
 * </SelectField.Field>
 * ```
 *
 * ## With JSX children (full control)
 * ```tsx
 * <SelectField.Field label="Crust" error={errors.crust?.message}>
 *   <SelectField {...register("crust")} placeholder="Choose crust">
 *     <SelectField.Option value="thin">Thin</SelectField.Option>
 *     <SelectField.Option value="thick">Thick</SelectField.Option>
 *   </SelectField>
 * </SelectField.Field>
 * ```
 *
 * ## Props
 * - `size`        — "sm" | "md" (default) | "lg"
 * - `variant`     — "outline" (default) | "filled"
 * - `options`     — `{ value, label, disabled? }[]` shorthand
 * - `placeholder` — renders a disabled hidden first option
 * - `leftIcon`    — any ReactNode (use lucide-react icons, size={16})
 * - `error`       — shows red border + error style when set
 * - All native `<select>` props are forwarded (including ref for react-hook-form)
 *
 * ## Sub-components
 * - `SelectField.Field`   — wrapper that auto-wires id/label/error/hint via context
 * - `SelectField.Option`  — typed `<option>` passthrough for JSX children usage
 * - `SelectField.Label`   — styled `<label>`, supports `required` asterisk
 * - `SelectField.Error`   — red error message with icon, sets role="alert"
 * - `SelectField.Hint`    — grey helper text (hidden when Field has an error)
 */
const SelectField = Object.assign(SelectFieldRoot, {
  Label,
  Error: ErrorMessage,
  Hint,
  Option,
  Field,
})

export default SelectField
