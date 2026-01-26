import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const PROGRESS_STATUS_CLASSES: Record<string, string> = {
    low: "bg-green-500",
    medium: "bg-yellow-500",
    high: "bg-red-500",
    default: "bg-green-500",
}

function getStatusClass(value: number): string {
    if (value <= 60) return PROGRESS_STATUS_CLASSES.low
    if (value <= 85) return PROGRESS_STATUS_CLASSES.medium
    return PROGRESS_STATUS_CLASSES.high
}

interface ProgressStatusProps extends React.ComponentProps<typeof Progress> {
    value: number
    showIndicator?: boolean
    indicatorClassName?: string
}

export function ProgressStatus({
    value,
    className,
    showIndicator = false,
    indicatorClassName,
    ...props
}: ProgressStatusProps) {
    const statusClass = getStatusClass(value)

    return (
        <div className="w-full space-y-1">
            <Progress
                value={value}
                className={cn("h-2 w-full", statusClass, className)}
                {...props}
            />
            {showIndicator && (
                <div
                    className={cn(
                        "h-full w-full flex-1 transition-all",
                        statusClass,
                        indicatorClassName
                    )}
                    style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
                />
            )}
        </div>
    )
}

export function ProgressStatusV2({
    value,
    className,
    ...props
}: ProgressStatusProps) {
    const statusClass = getStatusClass(value)

    return (
        <Progress
            value={value}
            className={cn("h-2 w-full", className)}
            {...props}
        >
            <div
                className={cn(
                    "h-full w-full flex-1 transition-all",
                    statusClass
                )}
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </Progress>
    )
}