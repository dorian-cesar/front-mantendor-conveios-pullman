import * as Dialog from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface ExportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ExportModal({ open, onOpenChange }: ExportModalProps) {

    const handleClose = () => {
        onOpenChange(false);
    };

    const handleExportCSV = () => {
        console.log("Exportando CSV...");
        onOpenChange(false);
    };

    const handleExportExcel = () => {
        console.log("Exportando Excel...");
        onOpenChange(false);
    };

    return (
        <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>
                        Exportar Datos
                    </Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Selecciona el formato de exportación
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <div className="flex items-center justify-center gap-2 py-4">
                    <Button
                        size='lg'
                        onClick={handleExportCSV}
                    >
                        CSV
                    </Button>

                    <Button
                        size='lg'
                        onClick={handleExportExcel}
                    >
                        Excel
                    </Button>
                </div>

                <Dialog.DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                </Dialog.DialogFooter>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    );
}
