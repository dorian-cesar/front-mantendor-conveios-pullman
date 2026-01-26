export type SearchItem = {
    label: string
    description?: string
    href: string
    group: string
}


export const navigation: SearchItem[] = [
    // Dashboard
    {
        label: "Dashboard",
        description: "Resumen general del sistema",
        href: "/test",
        group: "General",
    },

    // Operación
    {
        label: "Boletos",
        description: "eventos · viajes · tickets · pasajes · ventas · operación",
        href: "/test/eventos",
        group: "Operación",
    },

    // Convenios y Beneficios
    {
        label: "Convenios",
        description: "convenios · acuerdos · beneficios · alianzas · comerciales · empresas",
        href: "/test/convenios",
        group: "Convenios y Beneficios",
    },
    {
        label: "Descuentos",
        description: "descuentos · promociones · rebajas · cupones · beneficios",
        href: "/test/descuentos",
        group: "Convenios y Beneficios",
    },

    // Empresas
    {
        label: "Empresas",
        description: "empresas · organizaciones · clientes · asociadas",
        href: "/test/empresas",
        group: "Empresas",
    },

    // Seguridad
    {
        label: "Usuarios",
        description: "usuarios · cuentas · accesos · administración · sistema",
        href: "/test/usuarios",
        group: "Seguridad",
    },
    {
        label: "Roles",
        description: "roles · permisos · autorizaciones · seguridad · accesos",
        href: "/test/roles",
        group: "Seguridad",
    },
];

