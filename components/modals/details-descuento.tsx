"use client"

import * as Dialog from "@/components/ui/dialog"
import { formatDateOnly } from "@/utils/helpers"
import { Descuento } from "@/services/descuento.service"

interface DetailsDescuentoModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    descuento: Descuento | null
}

export default function DetailsDescuentoModal({
    open,
    onOpenChange,
    descuento,
}: DetailsDescuentoModalProps) {
    return (
        <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>Detalles del Descuento</Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Información detallada del Descuento
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <p className="text-sm font-medium leading-none">
                            ID
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {descuento?.id}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none">
                            Convenio
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {descuento?.convenio_id ? `Convenio #${descuento?.convenio_id}` : "sin convenio"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium leading-none">
                            Descuento
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {descuento?.porcentaje_descuento}%
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium leading-none">
                            Status
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {descuento?.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm font-medium leading-none">
                            Código de descuento
                        </p>
                        <p className="text-sm text-muted-foreground">
                        {descuento?.codigo_descuento?.codigo ? `${descuento?.codigo_descuento.codigo}` : "sin código"}
                        </p>
                    </div>
                </div>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    )
}