"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary-color)/0.45]",
        className
      )}
      {...props}
    />
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm resize-vertical focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary-color)/0.45]",
        className
      )}
      {...props}
    />
  )
}

export { Input, Textarea }
