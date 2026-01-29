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
import { Input } from "@/components/ui/input"

const mockPasajeros = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    rut: `${(10000000 + i).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${(9 - (i % 10))}`,
    nombre: `nombre ${(i % 10) + 1}`,
    apellido: `apellido ${(i % 20) + 1}`,
    fecha_nacimiento: new Date(2000, i % 12, (i % 28) + 1, (i % 24), (i % 60)).toISOString(),
    correo: `correo${(i % 10) + 1}@gmail.com`,
    telefono: `+569${10000000 + i}`,
    tipo_pasajero: ["estudiante", "adulto"][(i + 1) % 2],
    empresa: `empresa ${(i % 10) + 1}`,
    convenio: i % 3 === 0 ? "Convenio " + (i % 8 + 1) : null,
    status: i % 3 === 0 ? "inactive" : "active",
}))

export default function PasajerosPage() {

    const [searchPasajero, setSearchPasajero] = useState("")
    const [pasajeros, setPasajeros] = useState(mockPasajeros)
    const [filteredPasajeros, setFilteredPasajeros] = useState(mockPasajeros)

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    })

    useEffect(() => {
        if (!searchPasajero.trim()) {
            setFilteredPasajeros(pasajeros)
        } else {
            const filtered = pasajeros.filter(pasajero =>
                pasajero.correo.toLowerCase().includes(searchPasajero.toLowerCase()) ||
                pasajero.nombre.toLowerCase().includes(searchPasajero.toLowerCase()) ||
                pasajero.apellido.toLowerCase().includes(searchPasajero.toLowerCase()) ||
                pasajero.rut.toLowerCase().includes(searchPasajero.toLowerCase())
            )
            setFilteredPasajeros(filtered)
        }
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [searchPasajero, pasajeros])

    useEffect(() => {
        const total = filteredPasajeros.length
        const totalPages = Math.ceil(total / pagination.limit)
        const hasPrevPage = pagination.page > 1
        const hasNextPage = pagination.page < totalPages

        setPagination(prev => ({
            ...prev,
            total,
            totalPages,
            hasPrevPage,
            hasNextPage
        }))
    }, [filteredPasajeros, pagination.page, pagination.limit])

    const getCurrentPagePasajeros = () => {
        const startIndex = (pagination.page - 1) * pagination.limit
        const endIndex = startIndex + pagination.limit
        return filteredPasajeros.slice(startIndex, endIndex)
    }

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({ ...prev, page: newPage }))
    }

    const actionButtons = [
        {
            label: "Nuevo Pasajero",
            onClick: () => console.log("Crear nueva usuario"),
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
                title="Pasajeros"
                description="Listado de los pasajeros disponibles"
                actionButtons={actionButtons}
                showSearch={true}
                searchValue={searchPasajero}
                onSearchChange={setSearchPasajero}
                onSearchClear={() => setSearchPasajero("")}
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
                            <Table.TableHead>RUT</Table.TableHead>
                            <Table.TableHead>Nombre</Table.TableHead>
                            <Table.TableHead>Correo</Table.TableHead>
                            <Table.TableHead>Tipo Pasajero</Table.TableHead>
                            <Table.TableHead>Empresa</Table.TableHead>
                            <Table.TableHead>Convenio</Table.TableHead>
                            <Table.TableHead>Status</Table.TableHead>
                            <Table.TableHead className="text-right">Acciones</Table.TableHead>
                        </Table.TableRow>
                    </Table.TableHeader>

                    <Table.TableBody>
                        {getCurrentPagePasajeros().map((eventos) => (
                            <Table.TableRow key={eventos.id}>
                                <Table.TableCell>{eventos.id}</Table.TableCell>
                                <Table.TableCell>{eventos.rut}</Table.TableCell>
                                <Table.TableCell>
                                    {eventos.nombre} {eventos.apellido}
                                </Table.TableCell>
                                <Table.TableCell>{eventos.correo}</Table.TableCell>
                                <Table.TableCell>{eventos.tipo_pasajero}</Table.TableCell>
                                <Table.TableCell>{eventos.empresa}</Table.TableCell>
                                <Table.TableCell>{eventos.convenio ?? "no definido"}</Table.TableCell>
                                <Table.TableCell>
                                    <BadgeStatus status={eventos.status}>
                                        {eventos.status}
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
                                            {eventos.status === "active" ? (
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