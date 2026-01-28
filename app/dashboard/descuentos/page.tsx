"use client"

import { Button } from "@/components/ui/button"
import * as Dropdown from "@/components/ui/dropdown-menu"
import * as Table from "@/components/ui/table"
import * as Icon from "lucide-react"
import { BadgeStatus } from "@/components/ui/badge-status"
import * as Card from "@/components/ui/card"
import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Pagination } from "@/components/dashboard/Pagination"
import { se } from "date-fns/locale"

const mockDescuentos = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    pasajero_id: (i % 20) + 1,
    pasajero_nombre: `Juan ${(i % 10) + 1}`,
    pasajero_apellido: `Pérez ${(i % 10) + 1}`,
    pasajero_rut: `${(18000000 + i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${(9 - (i % 10))}`,

    convenio_id: (i % 8) + 1,
    convenio_nombre: `Convenio ${(i % 8) + 1}`,

    empresa_id: (i % 5) + 1,
    empresa_nombre: `Empresa ${(i % 5) + 1}`,

    codigo_descuento_id: (i % 15) + 1,
    codigo_descuento: `DESC${String((i % 15) + 1).padStart(3, '0')}`,

    tipo_pasajero: ["Estudiante", "Adulto", "Adulto Mayor"][i % 3],
    porcentaje_descuento: [10, 15, 20, 25, 30][i % 5],

    fecha_aplicacion: new Date(2025, i % 12, (i % 20) + 1).toISOString().split('T')[0],
    fecha_inicio: new Date(2025, i % 12, (i % 20) + 1).toISOString().split('T')[0],
    fecha_fin: new Date(2025, (i % 12) + 3, (i % 20) + 1).toISOString().split('T')[0],

    status: i % 4 === 0 ? "vencido" : i % 7 === 0 ? "inactive" : "active",
    aplicado: i % 3 === 0,
    evento_id: i % 3 === 0 ? (i % 30) + 1 : null,

    usos_realizados: Math.floor((i % 5) * 20),
    max_usos: [50, 100, 200, 500, 1000][i % 5],

    creado_por: `admin${(i % 3) + 1}@sistema.com`,
    fecha_creacion: new Date(2024, 11, (i % 30) + 1).toISOString(),
}));

export default function DescuentosPage() {
    const [searchValue, setSearchValue] = useState("")
    const [descuentos, setDescuentos] = useState(mockDescuentos)
    const [filteredDescuentos, setFilteredDescuentos] = useState(mockDescuentos)

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    })

    useEffect(() => {
        if (!searchValue.trim()) {
            setFilteredDescuentos(descuentos)
        } else {
            const filtered = descuentos.filter(descuento =>
                descuento.pasajero_nombre.toLowerCase().includes(searchValue.toLowerCase()) ||
                descuento.pasajero_apellido.toLowerCase().includes(searchValue.toLowerCase()) ||
                descuento.pasajero_rut.toLowerCase().includes(searchValue.toLowerCase())
            )
            setFilteredDescuentos(filtered)
        }
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [searchValue, descuentos])

    useEffect(() => {
        const total = filteredDescuentos.length
        const totalPages = Math.ceil(total / pagination.limit)
        const hasPrevPage = pagination.page > 1
        const hasNextPage = pagination.page < totalPages

        setPagination(prev => ({
            ...prev,
            total,
            totalPages,
            hasNextPage,
            hasPrevPage
        }))
    }, [filteredDescuentos, pagination.limit, pagination.page])

    const getCurrentPageDescuentos = () => {
        const startIndex = (pagination.page - 1) * pagination.limit
        const endIndex = startIndex + pagination.limit
        return filteredDescuentos.slice(startIndex, endIndex)
    }

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }))
    }

    const actionButtons = [
        {
            label: "Nuevo Descuento",
            onClick: () => console.log("Crear nuevo descuento"),
            icon: <Icon.PlusIcon className="h-4 w-4" />
        },
        {
            label: "Detalles",
            onClick: () => console.log("Exportar datos"),
            variant: "outline" as const
        }
    ]

    return (
        <div className="flex flex-col justify-center space-y-4">
            <PageHeader
                title="Descuentos"
                description="Descuentos aplicados."
                actionButtons={actionButtons}
                showSearch={true}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onSearchClear={() => setSearchValue("")}
                showPagination={true}
                paginationComponent={
                    <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.total}
                        onPageChange={handlePageChange}
                        hasPrevPage={pagination.hasPrevPage}
                        hasNextPage={pagination.hasNextPage}
                        className="w-full"
                    />
                }
            >
            </PageHeader>
            <Card.Card>
                <Table.Table>
                    <Table.TableHeader>
                        <Table.TableRow>
                            <Table.TableHead>ID</Table.TableHead>
                            <Table.TableHead>Pasajero</Table.TableHead>
                            <Table.TableHead>RUT</Table.TableHead>
                            <Table.TableHead>Empresa</Table.TableHead>
                            <Table.TableHead>Convenio</Table.TableHead>
                            <Table.TableHead>Código</Table.TableHead>
                            <Table.TableHead>Descuento</Table.TableHead>
                            <Table.TableHead>Vigencia</Table.TableHead>
                            <Table.TableHead>Status</Table.TableHead>
                            <Table.TableHead className="text-right">Acciones</Table.TableHead>
                        </Table.TableRow>
                    </Table.TableHeader>

                    <Table.TableBody>
                        {getCurrentPageDescuentos().map((descuento) => (
                            <Table.TableRow key={descuento.id}>
                                <Table.TableCell>{descuento.id}</Table.TableCell>

                                <Table.TableCell className="font-medium">
                                    {descuento.pasajero_nombre} {descuento.pasajero_apellido}
                                </Table.TableCell>

                                <Table.TableCell>{descuento.pasajero_rut}</Table.TableCell>

                                <Table.TableCell>{descuento.empresa_nombre}</Table.TableCell>

                                <Table.TableCell>{descuento.convenio_nombre}</Table.TableCell>

                                <Table.TableCell>
                                    <span className="font-mono text-sm">
                                        {descuento.codigo_descuento}
                                    </span>
                                </Table.TableCell>

                                <Table.TableCell>
                                    {descuento.porcentaje_descuento}%
                                </Table.TableCell>

                                <Table.TableCell>
                                    {descuento.fecha_inicio} → {descuento.fecha_fin}
                                </Table.TableCell>

                                <Table.TableCell>
                                    <BadgeStatus
                                        status={
                                            descuento.status === "active"
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {descuento.status === "active"
                                            ? "Activo"
                                            : descuento.status === "vencido"
                                                ? "Vencido"
                                                : "Inactivo"}
                                    </BadgeStatus>
                                </Table.TableCell>

                                <Table.TableCell className="text-right">
                                    <Dropdown.DropdownMenu>
                                        <Dropdown.DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <Icon.MoreHorizontalIcon />
                                            </Button>
                                        </Dropdown.DropdownMenuTrigger>

                                        <Dropdown.DropdownMenuContent align="end">
                                            <Dropdown.DropdownMenuItem>
                                                <Icon.EyeIcon className="h-4 w-4 mr-2" />
                                                Ver detalles
                                            </Dropdown.DropdownMenuItem>

                                            <Dropdown.DropdownMenuItem>
                                                <Icon.PencilIcon className="h-4 w-4 mr-2" />
                                                Editar
                                            </Dropdown.DropdownMenuItem>

                                            <Dropdown.DropdownMenuSeparator />

                                            {descuento.status === "active" ? (
                                                <Dropdown.DropdownMenuItem variant="destructive">
                                                    <Icon.BanIcon className="h-4 w-4 mr-2" />
                                                    Desactivar
                                                </Dropdown.DropdownMenuItem>
                                            ) : (
                                                <Dropdown.DropdownMenuItem>
                                                    <Icon.CheckIcon className="h-4 w-4 mr-2" />
                                                    Activar
                                                </Dropdown.DropdownMenuItem>
                                            )}
                                        </Dropdown.DropdownMenuContent>
                                    </Dropdown.DropdownMenu>
                                </Table.TableCell>
                            </Table.TableRow>
                        ))}
                    </Table.TableBody>
                </Table.Table>
            </Card.Card>

        </div>
    )
}