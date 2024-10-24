'use client'

import {useFormStatus} from "react-dom"
import {Button} from "@/components/ui/button"
import {Loader2} from "lucide-react"
import {cn} from "@/lib/utils"

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loadingText?: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
    size?: "default" | "sm" | "lg" | "icon" | null | undefined,
}

export function SubmitButton({
                                 children,
                                 className,
                                 loadingText = "Please wait",
                                 variant,
                                 size,
                                 ...props
                             }: SubmitButtonProps) {
    const {pending} = useFormStatus()

    return (
        <Button
            type="submit"
            className={cn("", className)}
            variant={variant}
            size={size}
            disabled={pending}
            {...props}
        >
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </Button>
    )
}
