"use client"

import { forwardRef, createContext, useContext, useId } from "react"
import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react"

type FieldContextValue = {
  id: string
  hasError: boolean
  disabled: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

const useFieldContext = () => useContext(FieldContext)

export type InputSize = "sm" | "md" | "lg"
export type InputVariant = "outline" | "filled" | "underline"

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize
  variant?: InputVariant
  error?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const sizeMap: Record<InputSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-base",
}

const variantBase: Record<InputVariant, string> = {
  outline:
    "rounded-md border border-gray-200 bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
  filled:
    "rounded-md border border-transparent bg-gray-100 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
  underline:
    "rounded-none border-b-2 border-gray-200 bg-transparent px-0 focus:border-teal-400 focus:ring-0",
}

const TextInputRoot = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id: idProp,
      size = "md",
      variant = "outline",
      error,
      leftIcon,
      rightIcon,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const ctx = useFieldContext()
    const id = idProp ?? ctx?.id
    const hasError = Boolean(error) || (ctx?.hasError ?? false)
    const isDisabled = disabled ?? ctx?.disabled ?? false

    return (
      <div className="relative flex w-full items-center">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 flex items-center text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={id}
          disabled={isDisabled}
          aria-invalid={hasError || undefined}
          className={[
            "w-full outline-none transition-all duration-200 placeholder:text-gray-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
            sizeMap[size],
            variantBase[variant],
            hasError
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
              : "",
            leftIcon ? "pl-9" : "",
            rightIcon ? "pr-9" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />

        {rightIcon && (
          <span className="pointer-events-none absolute right-3 flex items-center text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
    )
  }
)
TextInputRoot.displayName = "TextInput"

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
Label.displayName = "TextInput.Label"

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
ErrorMessage.displayName = "TextInput.Error"

const Hint = ({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`mt-1.5 text-xs text-gray-400 ${className}`} {...props}>
    {children}
  </p>
)
Hint.displayName = "TextInput.Hint"


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
Field.displayName = "TextInput.Field"

/**
 * Reusable text input — compound component with react-hook-form support.
 *
 * ## Recommended: with Field (auto-wires id, label, error, hint)
 * ```tsx
 * <TextInput.Field label="Email" required error={errors.email?.message} hint="We'll never share it.">
 *   <TextInput {...register("email")} type="email" leftIcon={<MailIcon size={16} />} />
 * </TextInput.Field>
 * ```
 *
 * ## Manual layout (custom structure)
 * ```tsx
 * <TextInput.Label htmlFor="q">Search</TextInput.Label>
 * <TextInput id="q" rightIcon={<SearchIcon size={16} />} />
 * <TextInput.Hint>Try "Margherita"</TextInput.Hint>
 * ```
 *
 * ## Props
 * - `size`    — "sm" | "md" (default) | "lg"
 * - `variant` — "outline" (default) | "filled" | "underline"
 * - `leftIcon` / `rightIcon` — any ReactNode (use lucide-react icons, size={16})
 * - `error`   — shows red border + error style when set
 * - All native `<input>` props are forwarded (including ref for react-hook-form)
 *
 * ## Sub-components
 * - `TextInput.Field`  — wrapper that auto-wires id/label/error/hint via context
 * - `TextInput.Label`  — styled `<label>`, supports `required` asterisk
 * - `TextInput.Error`  — red error message with icon, sets role="alert"
 * - `TextInput.Hint`   — grey helper text (hidden when Field has an error)
 */
const TextInput = Object.assign(TextInputRoot, {
  Label,
  Error: ErrorMessage,
  Hint,
  Field,
})

export default TextInput
