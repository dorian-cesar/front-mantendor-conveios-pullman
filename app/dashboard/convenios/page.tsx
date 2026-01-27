"use client"

import { Button } from "@/components/ui/button"
import * as Dropdown from "@/components/ui/dropdown-menu"
import * as Table from "@/components/ui/table"
import * as Icon from "lucide-react"
import { BadgeStatus } from "@/components/ui/badge-status"
import * as Card from "@/components/ui/card"
import * as Empty from "@/components/ui/empty"
import { useState, useEffect } from "react"
import { PageHeader } from "@/components/dashboard/page-header"
import { Pagination } from "@/components/dashboard/Pagination"
import { Progress } from "@/components/ui/progress"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const mockEmpresas = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    empresa: `Empresa ${i + 1}`,
    nombre: `Nombre ${i + 1}`,
    codigo: i % 3 === 0 ? true : false,
    status: i % 3 === 0 ? "inactive" : "active",
}))

export default function ConveniosPage() {
    const [searchValue, setSearchValue] = useState("")
    const [empresas, setEmpresas] = useState(mockEmpresas)
    const [filteredEmpresas, setFilteredEmpresas] = useState(mockEmpresas)
    const [selectedEmpresa, setSelectedEmpresa] = useState<number | null>(null)

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
    })

    const usosRealizados = 8
    const maxUsos = 10
    const porcentajeUso = Math.round((usosRealizados / maxUsos) * 100)

    useEffect(() => {
        if (!searchValue.trim()) {
            setFilteredEmpresas(empresas)
        } else {
            const filtered = empresas.filter(empresa =>
                empresa.empresa.toLowerCase().includes(searchValue.toLowerCase()) ||
                empresa.nombre.toLowerCase().includes(searchValue.toLowerCase())
            )
            setFilteredEmpresas(filtered)
        }
        setPagination(prev => ({ ...prev, page: 1 }))
    }, [searchValue, empresas])

    useEffect(() => {
        const total = filteredEmpresas.length
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
    }, [filteredEmpresas, pagination.page, pagination.limit])

    const getCurrentPageEmpresas = () => {
        const startIndex = (pagination.page - 1) * pagination.limit
        const endIndex = startIndex + pagination.limit
        return filteredEmpresas.slice(startIndex, endIndex)
    }

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({ ...prev, page: newPage }))
    }

    const actionButtons = [
        {
            label: "Nuevo Convenio",
            onClick: () => console.log("Crear nuevo convenio"),
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
                title="Convenios"
                description="Gestione los convenios de las empresas aquí."
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
            <div className="flex gap-4">
                <Card.Card className="flex-1">
                    <Table.Table>
                        <Table.TableHeader>
                            <Table.TableRow>
                                <Table.TableHead>ID</Table.TableHead>
                                <Table.TableHead>Empresa</Table.TableHead>
                                <Table.TableHead>Nombre</Table.TableHead>
                                <Table.TableHead>Codigo</Table.TableHead>
                                <Table.TableHead>Estado</Table.TableHead>
                                <Table.TableHead className="text-right">Acciones</Table.TableHead>
                            </Table.TableRow>
                        </Table.TableHeader>
                        <Table.TableBody>
                            {getCurrentPageEmpresas().map((empresa) => (
                                <Table.TableRow
                                    key={empresa.id}
                                    onClick={() => setSelectedEmpresa(empresa.id)}
                                    className={`${selectedEmpresa === empresa.id ? "bg-muted" : ""} cursor-pointer`}
                                >
                                    <Table.TableCell>{empresa.id}</Table.TableCell>
                                    <Table.TableCell className="font-medium">{empresa.empresa}</Table.TableCell>
                                    <Table.TableCell>{empresa.nombre}</Table.TableCell>
                                    <Table.TableCell>
                                        <BadgeStatus status={empresa.codigo}>
                                            {empresa.codigo ? "Con código" : "Sin código"}
                                        </BadgeStatus>
                                    </Table.TableCell>
                                    <Table.TableCell>
                                        <BadgeStatus status={empresa.status}>
                                            {empresa.status === "active" ? "Activa" : "Inactiva"}
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
                                                {empresa.status === "active" ? (
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
                <Card.Card className="flex flex-col flex-1">
                    <Card.CardHeader>
                        <Card.CardTitle className="text-xl">Códigos de Descuento {selectedEmpresa !== null && (`${selectedEmpresa}`)}</Card.CardTitle>
                        <Card.CardDescription>Códigos asociados a cada convenio</Card.CardDescription>
                        {selectedEmpresa !== null && (
                            <>
                                <Card.CardAction>
                                    <Button size="sm" onClick={() => console.log("Agregar código de descuento")}>
                                        <Icon.PlusIcon className="h-4 w-4 mr-2" />
                                        Agregar Código
                                    </Button>
                                </Card.CardAction>
                                <div className="flex items-center space-x-2 max-w-md">
                                    <div className="relative flex-1">
                                        <Icon.SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                            placeholder="Buscar código..."
                                            value={searchValue}
                                            onChange={(e) => alert(e.target.value)}
                                            className="pl-10 pr-10"
                                        />
                                        {searchValue && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
                                                onClick={() => alert("clear")}
                                            >
                                                <Icon.XIcon className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <Button type="submit">Buscar</Button>
                                </div>
                            </>
                        )}
                    </Card.CardHeader>
                    <Card.CardContent className="flex-1 flex items-center justify-center">
                        {selectedEmpresa !== null ? (
                            <div className="h-full w-full">
                                <Card.Card className="mb-3 flex-1">
                                    <Card.CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <Card.CardTitle className="text-lg">
                                                    Código: <span className="font-mono">XYZ2025</span>
                                                </Card.CardTitle>
                                                <Card.CardDescription>
                                                    Vigente del 01/01/2025 al 31/03/2025
                                                </Card.CardDescription>
                                            </div>

                                            <BadgeStatus status="active">Activo</BadgeStatus>
                                        </div>
                                    </Card.CardHeader>

                                    <Card.CardContent className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tipo pasajero</span>
                                            <span>Adulto</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <Field className="w-full max-w-sm">
                                                <FieldLabel>
                                                    <span>Uso del código</span>
                                                    <span className="ml-auto">{porcentajeUso}%</span>
                                                </FieldLabel>
                                                <Progress value={porcentajeUso} />
                                            </Field>
                                            <span>{usosRealizados} / {maxUsos}</span>
                                        </div>
                                    </Card.CardContent>

                                    <Card.CardFooter className="flex justify-end gap-2">
                                        <Button size="sm" variant="outline">
                                            <Icon.PencilIcon className="h-4 w-4 mr-1" />
                                            Editar
                                        </Button>

                                        <Button size="sm" variant="destructive">
                                            <Icon.BanIcon className="h-4 w-4 mr-1" />
                                            Desactivar
                                        </Button>
                                    </Card.CardFooter>
                                </Card.Card>
                            </div>

                        ) : (
                            <Empty.Empty>
                                <Empty.EmptyHeader>
                                    <Empty.EmptyMedia variant="icon">
                                        <Icon.Handshake />
                                    </Empty.EmptyMedia>
                                    <Empty.EmptyTitle>Códigos Asociados</Empty.EmptyTitle>
                                    <Empty.EmptyDescription>
                                        Seleccione un convenio para ver sus códigos de descuento
                                    </Empty.EmptyDescription>
                                </Empty.EmptyHeader>
                            </Empty.Empty>
                        )}
                    </Card.CardContent>
                </Card.Card>
            </div>
        </div>
    )
}