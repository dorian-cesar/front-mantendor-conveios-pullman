export const formatDateOnly = (isoDate: string) => {
  if (!isoDate) return "-"
  return isoDate.split("T")[0]
}
