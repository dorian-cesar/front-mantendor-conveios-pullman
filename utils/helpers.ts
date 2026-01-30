export const formatDateOnly = (isoDate: string) => {
  if (!isoDate) return "-"
  return isoDate.split("T")[0]
}

export const formatRut = (rut: string) => {
  if (rut.includes('-')) return rut

  const rutBody = rut.slice(0, -1)
  const dv = rut.slice(-1)
  return `${rutBody.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`
}