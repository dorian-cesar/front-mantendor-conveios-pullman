"use client"

import * as Dialog from "@/components/ui/dialog"
import { Empresa } from "@/services/empresa.service"
import { formatDateOnly } from "@/utils/helpers"

interface DetailsEmpresaModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    empresa: Empresa | null
    onSuccess?: () => void
}

export default function DetailsEmpresaModal({
    open,
    onOpenChange,
    empresa,
}: DetailsEmpresaModalProps) {
    return (
        <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>Detalles</Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Detalles de la empresa {empresa?.nombre}
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <p className="text-sm font-medium leading-none">
                            Nombre
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {empresa?.nombre}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none">
                            RUT
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {empresa?.rut_empresa}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none">
                            Estado
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {empresa?.status}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-none">
                            Fecha de creación
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {formatDateOnly(String(empresa?.createdAt || 0))}
                        </p>
                    </div>
                </div>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    )
}
