"use client"

import * as Dialog from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

interface AddUserModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type FormValues = {
    nombre: string
    correo: string
    password: string
    rol: "ADMIN" | "USUARIO"
}

export default function AddUserModal({ open, onOpenChange }: AddUserModalProps) {
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<FormValues>({
        defaultValues: {
            nombre: "",
            correo: "",
            password: "",
            rol: "USUARIO"
        }
    })

    useEffect(() => {
        if (!open) reset()
    }, [open, reset])

    const handleClose = () => {
        onOpenChange(false)
    }

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true)

            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error("Error al crear usuario")
            }

            console.log("Usuario creado:", data)
            onOpenChange(false)
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.DialogContent>
                <Dialog.DialogHeader>
                    <Dialog.DialogTitle>Nuevo Usuario</Dialog.DialogTitle>
                    <Dialog.DialogDescription>
                        Crea un nuevo usuario en el sistema
                    </Dialog.DialogDescription>
                </Dialog.DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-4">

                        {/* Nombre */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Nombre</label>
                            <Input
                                placeholder="Juan Pérez"
                                {...register("nombre", {
                                    required: "El nombre es obligatorio",
                                    minLength: {
                                        value: 3,
                                        message: "Debe tener al menos 3 caracteres"
                                    }
                                })}
                            />
                            {errors.nombre && (
                                <p className="text-sm text-destructive">
                                    {errors.nombre.message}
                                </p>
                            )}
                        </div>

                        {/* Correo */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Correo</label>
                            <Input
                                type="email"
                                placeholder="usuario@empresa.cl"
                                {...register("correo", {
                                    required: "El correo es obligatorio",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Correo inválido"
                                    }
                                })}
                            />
                            {errors.correo && (
                                <p className="text-sm text-destructive">
                                    {errors.correo.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input
                                type="password"
                                placeholder="********"
                                {...register("password", {
                                    required: "La contraseña es obligatoria",
                                    minLength: {
                                        value: 8,
                                        message: "Debe tener al menos 8 caracteres"
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d).+$/,
                                        message: "Debe contener una mayúscula y un número"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Rol */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Rol</label>
                            <Select
                                defaultValue="USUARIO"
                                onValueChange={(value) =>
                                    setValue("rol", value as FormValues["rol"])
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Administrador</SelectItem>
                                    <SelectItem value="USUARIO">Usuario</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <Dialog.DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancelar
                        </Button>
                    </Dialog.DialogFooter>
                </form>
            </Dialog.DialogContent>
        </Dialog.Dialog>
    )
}
