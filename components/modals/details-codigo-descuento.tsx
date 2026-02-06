"use client"

import * as Dialog from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { CodigoDescuento } from "@/services/codigo-descuento.service"
import { formatDateOnly } from "@/utils/helpers"

interface DetailsCodigoDescuentoModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    codigo: CodigoDescuento | null
}

export default function DetailsCodigoDescuentoModal({
    open,
    onOpenChange,
    codigo,
}: DetailsCodigoDescuentoModalProps) {
    if (!codigo) return null

    const porcentaje = codigo.descuentos?.[0]?.porcentaje
    const maxUsos = codigo.max_usos
    const usosRealizados = codigo.usos_realizados
    const tieneLimite = maxUsos > 0
    const progreso = tieneLimite
        ? Math.min((usosRealizados / maxUsos) * 100, 100)
        : 0

    return (
        <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.DialogContent className="max-w-2xl">
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>
                        Detalles del Código de Descuento
                    </Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Información detallada del código <strong>{codigo.codigo}</strong>
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <div className="grid grid-cols-2 gap-4">
                    {/* ID */}
                    <Detail label="ID" value={codigo.id} />

                    {/* Código */}
                    <Detail label="Código" value={codigo.codigo} />

                    {/* Estado */}
                    <Detail label="Estado" value={codigo.status} />

                    {/* Vigente */}
                    <Detail
                        label="Vigente"
                        value={codigo.vigente ? "Sí" : "No"}
                    />

                    {/* Fecha inicio */}
                    <Detail
                        label="Fecha de inicio"
                        value={
                            codigo.fecha_inicio
                                ? formatDateOnly(codigo.fecha_inicio)
                                : "Sin inicio"
                        }
                    />

                    {/* Fecha término */}
                    <Detail
                        label="Fecha de término"
                        value={
                            codigo.fecha_termino
                                ? formatDateOnly(codigo.fecha_termino)
                                : "Sin fin"
                        }
                    />

                    {/* Empresa */}
                    <Detail
                        label="Empresa"
                        value={codigo.convenio?.empresa?.nombre || "N/A"}
                    />

                    {/* Convenio */}
                    <Detail
                        label="Convenio"
                        value={codigo.convenio?.nombre || "N/A"}
                    />

                    {/* Descuento */}
                    <Detail
                        label="Descuento"
                        value={
                            porcentaje !== undefined
                                ? `${porcentaje}%`
                                : "N/A"
                        }
                    />

                    {/* Fecha creación */}
                    <Detail
                        label="Creado"
                        value={
                            codigo.created_at
                                ? formatDateOnly(codigo.created_at)
                                : "N/A"
                        }
                    />
                </div>

                {/* Usos */}
                <div className="mt-6 space-y-2">
                    <p className="text-sm font-medium">
                        Usos del código
                    </p>

                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>
                            {usosRealizados} usados
                        </span>
                        <span>
                            {tieneLimite ? `de ${maxUsos}` : "sin límite"}
                        </span>
                    </div>

                    {tieneLimite && (
                        <Progress value={progreso} />
                    )}
                </div>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    )
}


function Detail({
    label,
    value,
}: {
    label: string
    value: React.ReactNode
}) {
    return (
        <div>
            <p className="text-sm font-medium leading-none">
                {label}
            </p>
            <p className="text-sm text-muted-foreground">
                {value}
            </p>
        </div>
    )
}
