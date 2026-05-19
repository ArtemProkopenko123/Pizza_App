"use client"

import { forwardRef, createContext, useContext, useId } from "react"
import type {
  TextareaHTMLAttributes,
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

export type TextAreaSize = "sm" | "md" | "lg"
export type TextAreaVariant = "outline" | "filled" | "underline"
export type TextAreaResize = "none" | "vertical" | "both"

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: TextAreaSize
  variant?: TextAreaVariant
  resize?: TextAreaResize
  error?: string
}

const sizeMap: Record<TextAreaSize, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-4 py-3 text-base",
}

const variantBase: Record<TextAreaVariant, string> = {
  outline:
    "rounded-md border border-gray-200 bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
  filled:
    "rounded-md border border-transparent bg-gray-100 focus:bg-white focus:border-teal-400 focus:ring-4 focus:ring-teal-400/10",
  underline:
    "rounded-none border-b-2 border-gray-200 bg-transparent px-0 focus:border-teal-400 focus:ring-0",
}

const resizeMap: Record<TextAreaResize, string> = {
  none: "resize-none",
  vertical: "resize-y",
  both: "resize",
}

const TextAreaRoot = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id: idProp,
      size = "md",
      variant = "outline",
      resize = "vertical",
      error,
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
      <textarea
        ref={ref}
        id={id}
        disabled={isDisabled}
        aria-invalid={hasError || undefined}
        className={[
          "w-full outline-none transition-all duration-200 placeholder:text-gray-400",
          "disabled:cursor-not-allowed disabled:opacity-50",
          sizeMap[size],
          variantBase[variant],
          resizeMap[resize],
          hasError ? "border-red-400 focus:border-red-400 focus:ring-red-400/10" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    )
  }
)
TextAreaRoot.displayName = "TextArea"

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
Label.displayName = "TextArea.Label"

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
ErrorMessage.displayName = "TextArea.Error"

const Hint = ({ children, className = "", ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`mt-1.5 text-xs text-gray-400 ${className}`} {...props}>
    {children}
  </p>
)
Hint.displayName = "TextArea.Hint"

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
Field.displayName = "TextArea.Field"

// ── Compose namespace ─────────────────────────────────────────────────────────

/**
 * Reusable textarea — compound component with react-hook-form support.
 *
 * ## Recommended: with Field (auto-wires id, label, error, hint)
 * ```tsx
 * <TextArea.Field label="Notes" required error={errors.notes?.message} hint="Max 500 characters.">
 *   <TextArea {...register("notes")} rows={4} />
 * </TextArea.Field>
 * ```
 *
 * ## Manual layout
 * ```tsx
 * <TextArea.Label htmlFor="bio">Bio</TextArea.Label>
 * <TextArea id="bio" rows={5} resize="none" />
 * <TextArea.Hint>Tell us about yourself</TextArea.Hint>
 * ```
 *
 * ## Props
 * - `size`    — "sm" | "md" (default) | "lg"
 * - `variant` — "outline" (default) | "filled" | "underline"
 * - `resize`  — "none" | "vertical" (default) | "both"
 * - `error`   — shows red border + error style when set
 * - `rows`    — native HTML rows attribute
 * - All native `<textarea>` props are forwarded (including ref for react-hook-form)
 *
 * ## Sub-components
 * - `TextArea.Field`  — wrapper that auto-wires id/label/error/hint via context
 * - `TextArea.Label`  — styled `<label>`, supports `required` asterisk
 * - `TextArea.Error`  — red error message with icon, sets role="alert"
 * - `TextArea.Hint`   — grey helper text (hidden when Field has an error)
 */
const TextArea = Object.assign(TextAreaRoot, {
  Label,
  Error: ErrorMessage,
  Hint,
  Field,
})

export default TextArea
