import { api } from '@/lib/api';

export interface Evento {
    id: number;
    tipo_evento: "COMPRA" | "CAMBIO" | "DEVOLUCION";
    ciudad_origen: string;
    ciudad_destino: string;
    fecha_viaje: string;
    tarifa_base: number;
    monto_pagado: number;
    porcentaje_descuento_aplicado: number;
    usuario_id: number;
    pasajero_id: number;
    empresa_id: number;
    created_at?: string;
    updated_at?: string;

    usuario?: {
        id: number;
        nombre: string;
        email: string;
    };
    pasajero?: {
        id: number;
        rut: string;
        nombres: string;
        apellidos: string;
    };
    empresa?: {
        id: number;
        nombre: string;
        rut: string;
    };
    convenio?: {
        id: number;
        nombre: string;
    };
}

export interface GetEventosParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
    tipo_evento?: "COMPRA" | "CAMBIO" | "DEVOLUCION";
    empresa_id?: number;
    pasajero_id?: number;
    convenio_id?: number;
    fecha_inicio?: string;
    fecha_fin?: string;
}

export interface EventosResponse {
    totalItems: number;
    rows: Evento[];
    totalPages?: number;
    currentPage?: number;
}

export class EventosService {
    static async getEventos(params?: GetEventosParams): Promise<EventosResponse> {
        const response = await api.get<EventosResponse>('/eventos', { params });
        return response.data;
    }

    static async getEventoById(id: number): Promise<Evento> {
        const response = await api.get<Evento>(`/eventos/${id}`);
        return response.data;
    }
}