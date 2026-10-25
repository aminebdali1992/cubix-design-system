"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { FieldDescription, FieldError } from "../field"
import { Label } from "./label"

/*
  Cubix Form Item Layout - React Aria version. Layout around the React Aria Label,
  so the API is identical across Base UI, Radix and React Aria.
*/

type FormItemLayoutSize = "tiny" | "small" | "medium" | "large" | "xlarge"
type FormItemLayoutLayout = "horizontal" | "vertical" | "flex" | "flex-row-reverse"

type FormItemLayoutOwnProps = {
  align?: "left" | "right"
  description?: React.ReactNode
  error?: React.ReactNode
  label?: React.ReactNode
  labelOptional?: React.ReactNode
  layout?: FormItemLayoutLayout
  size?: FormItemLayoutSize
  beforeLabel?: React.ReactNode
  afterLabel?: React.ReactNode
  nonBoxInput?: boolean
  labelLayout?: "horizontal" | "vertical"
  hideMessage?: boolean
  name?: string
  /**
   * For layout="horizontal", switches the label/content split to react to the
   * nearest `@container` ancestor instead of the viewport.
   */
  isContainerResponsive?: boolean
}

type FormItemLayoutProps = Omit<React.ComponentProps<"div">, keyof FormItemLayoutOwnProps> &
  FormItemLayoutOwnProps

// Text scale per size, mapped to Cubix tokens.
const SIZE_TEXT = {
  tiny: "text-caption",
  small: "text-description",
  medium: "text-description",
  large: "text-body",
  xlarge: "text-body",
} as const

const ContainerVariants = cva("relative grid gap-10 font-normal", {
  variants: {
    size: {
      tiny: "text-caption",
      small: "text-description leading-4",
      medium: "text-description",
      large: "text-body",
      xlarge: "text-body",
    },
    align: { left: "", right: "" },
    responsive: { true: "", false: "" },
    layout: {
      horizontal: "flex flex-col gap-2",
      vertical: "flex flex-col gap-2",
      flex: "flex flex-row gap-3",
      "flex-row-reverse":
        "flex flex-col-reverse gap-2 md:flex-row-reverse md:justify-between md:gap-6",
    },
    flex: { true: "", false: "" },
  },
  compoundVariants: [
    { layout: "flex", align: "right", className: "justify-between" },
    { layout: "flex-row-reverse", align: "right", className: "justify-between" },
    { layout: "horizontal", responsive: false, className: "md:grid md:grid-cols-12" },
    { layout: "horizontal", responsive: true, className: "@xl:grid @xl:grid-cols-12" },
  ],
  defaultVariants: { responsive: false },
})

const LabelContainerVariants = cva("transition-all duration-500 ease-in-out", {
  variants: {
    flex: { true: "", false: "" },
    align: { left: "", right: "" },
    layout: {
      horizontal: "col-span-4 flex flex-col gap-2",
      vertical: "flex flex-row justify-between gap-2",
      flex: "flex min-w-0 flex-col gap-0",
      "flex-row-reverse": "flex min-w-0 grow flex-col",
    },
    labelLayout: { horizontal: "", vertical: "", "": "" },
  },
  compoundVariants: [
    { flex: true, align: "left", className: "order-2" },
    { flex: true, align: "right", className: "order-1" },
    {
      layout: ["vertical", "flex"],
      labelLayout: undefined,
      flex: false,
      className: "flex flex-row justify-between gap-2",
    },
    { layout: "horizontal", className: "flex flex-col gap-2" },
  ],
})

const DataContainerVariants = cva("transition-all duration-500 ease-in-out", {
  variants: {
    flex: { true: "", false: "" },
    align: { left: "order-1", right: "order-2" },
    layout: { horizontal: "", vertical: "", flex: "", "flex-row-reverse": "" },
  },
  compoundVariants: [
    { flex: true, align: "left", className: "order-1" },
    { flex: true, align: "right", className: "order-2" },
    { layout: ["vertical", "flex"], className: "col-span-12" },
    { layout: "horizontal", align: "left", className: "col-span-8" },
    { layout: "horizontal", align: "right", className: "text-end" },
  ],
})

const DescriptionVariants = cva("leading-normal font-normal text-muted-foreground", {
  variants: {
    size: { ...SIZE_TEXT, medium: "text-caption" },
    layout: { vertical: "", horizontal: "", flex: "", "flex-row-reverse": "" },
  },
})

const MutedTextVariants = cva("font-normal text-muted-foreground", {
  variants: { size: SIZE_TEXT },
})

const FlexContainer = cva("", {
  variants: {
    flex: { true: "", false: "" },
    align: { left: "", right: "" },
    layout: { horizontal: "", vertical: "", flex: "", "flex-row-reverse": "" },
  },
  compoundVariants: [
    { flex: true, align: "left", className: "" },
    { flex: true, align: "right", className: "order-last" },
    {
      layout: "flex-row-reverse",
      className:
        "flex shrink-0 flex-col items-start justify-center md:w-1/2 md:items-end xl:w-2/5 [&>div]:md:w-full",
    },
  ],
})

const NonBoxInputContainer = cva("", {
  variants: {
    nonBoxInput: { true: "", false: "" },
    label: { true: "", false: "" },
    layout: { vertical: "", horizontal: "", flex: "", "flex-row-reverse": "" },
  },
  compoundVariants: [
    { nonBoxInput: true, label: true, layout: "vertical", className: "my-3" },
    { nonBoxInput: true, label: true, layout: "horizontal", className: "my-3 mb-3 md:mt-0" },
  ],
})

type FormItemContextValue = {
  formItemId: string
  formDescriptionId: string
  formMessageId: string
  hasDescription: boolean
  hasError: boolean
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

function useFormItem() {
  return React.useContext(FormItemContext)
}

type FormControlProps = {
  children: React.ReactElement<Record<string, unknown>>
}

/**
 * Passes the field id, aria-describedby and aria-invalid to its only child,
 * the Cubix control (Input, Select trigger, Switch, Checkbox).
 */
function FormControl({ children }: FormControlProps) {
  const ctx = useFormItem()
  if (!ctx || !React.isValidElement(children)) return children
  const describedBy = [
    ctx.hasDescription ? ctx.formDescriptionId : null,
    ctx.hasError ? ctx.formMessageId : null,
  ]
    .filter(Boolean)
    .join(" ")
  return React.cloneElement(children, {
    id: (children.props.id as string | undefined) ?? ctx.formItemId,
    "aria-describedby": describedBy || undefined,
    "aria-invalid": ctx.hasError || undefined,
  })
}

function FormItemLayout({
  align = "left",
  className,
  description,
  id: idProp,
  label,
  labelOptional,
  layout = "vertical",
  style,
  labelLayout,
  size = "medium",
  beforeLabel,
  afterLabel,
  nonBoxInput = !label,
  hideMessage = false,
  error,
  name,
  isContainerResponsive = false,
  children,
  ...props
}: FormItemLayoutProps) {
  const autoId = React.useId()
  const id = idProp ?? autoId
  const flex = layout === "flex" || layout === "flex-row-reverse"
  const hasLabel = Boolean(label || beforeLabel || afterLabel)
  const showError = Boolean(error) && !hideMessage

  const ctx: FormItemContextValue = {
    formItemId: id,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-message`,
    hasDescription: Boolean(description),
    hasError: showError,
  }

  const renderError = showError ? (
    <FieldError id={ctx.formMessageId}
      className={cn(
        "text-caption font-normal text-destructive transition-all duration-300 ease-in-out",
        layout === "flex-row-reverse" && "mt-0"
      )}
      data-formlayout-id="message">{error}</FieldError>
  ) : null

  const renderDescription = description ? (
    <FieldDescription id={ctx.formDescriptionId}
      className={cn(DescriptionVariants({ size, layout }))}
      data-formlayout-id="description">{description}</FieldDescription>
  ) : null

  const labelContents = (
    <>
      {beforeLabel && (
        <span
          className={cn(MutedTextVariants({ size }))}
          id={`${id}-before`}
          data-formlayout-id="beforeLabel"
        >
          <span>{beforeLabel}</span>
        </span>
      )}
      <span>{label}</span>
      {afterLabel && (
        <span
          className={cn(MutedTextVariants({ size }))}
          id={`${id}-after`}
          data-formlayout-id="afterLabel"
        >
          {afterLabel}
        </span>
      )}
    </>
  )

  return (
    <FormItemContext.Provider value={ctx}>
      <div data-slot="form-item">
        <div
          data-slot="form-item-layout"
          {...props}
          className={cn(
            ContainerVariants({ size, flex, align, layout, responsive: isContainerResponsive }),
            className
          )}
        >
          {flex && (
            <div className={cn(FlexContainer({ flex, align, layout }))}>
              {children}
              {layout === "flex-row-reverse" && renderError}
            </div>
          )}
          {hasLabel || labelOptional || layout === "horizontal" ? (
            <div
              className={cn(LabelContainerVariants({ align, labelLayout, flex, layout }))}
              data-formlayout-id="labelContainer"
            >
              {hasLabel && (
                <Label
                  className={cn(
                    "flex items-center gap-2 leading-normal font-normal wrap-break-word text-foreground",
                    showError && "text-destructive"
                  )}
                  data-formlayout-id="label"
                  htmlFor={name || id}
                >
                  {labelContents}
                </Label>
              )}
              {labelOptional && (
                <span
                  className={cn(MutedTextVariants({ size }))}
                  id={`${id}-optional`}
                  data-formlayout-id="labelOptional"
                >
                  {labelOptional}
                </span>
              )}
              {flex && (
                <>
                  {renderDescription}
                  {layout !== "flex-row-reverse" && renderError}
                </>
              )}
            </div>
          ) : null}
          {!flex && (
            <div
              className={cn(DataContainerVariants({ align, layout }))}
              style={style}
              data-formlayout-id="dataContainer"
            >
              <div
                className={cn(NonBoxInputContainer({ nonBoxInput, label: hasLabel, layout }))}
                data-formlayout-id="nonBoxInputContainer"
              >
                {children}
              </div>
              {renderError}
              {renderDescription}
            </div>
          )}
        </div>
      </div>
    </FormItemContext.Provider>
  )
}

export { FormControl, FormItemLayout, useFormItem }
export type { FormControlProps, FormItemLayoutLayout, FormItemLayoutProps, FormItemLayoutSize }
