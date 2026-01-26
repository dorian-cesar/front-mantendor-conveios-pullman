export const getProgressColor = (percentage: number) => {
    if (percentage <= 60) return "bg-green-500"
    if (percentage <= 85) return "bg-yellow-500"
    return "bg-red-500"
}
