export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      gastos: {
        Row: {
          categoria: Database["public"]["Enums"]["gasto_categoria"]
          created_at: string
          fecha: string
          id: string
          monto: number
          nota: string | null
          trabajo_id: string
        }
        Insert: {
          categoria: Database["public"]["Enums"]["gasto_categoria"]
          created_at?: string
          fecha?: string
          id?: string
          monto?: number
          nota?: string | null
          trabajo_id: string
        }
        Update: {
          categoria?: Database["public"]["Enums"]["gasto_categoria"]
          created_at?: string
          fecha?: string
          id?: string
          monto?: number
          nota?: string | null
          trabajo_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gastos_trabajo_id_fkey"
            columns: ["trabajo_id"]
            isOneToOne: false
            referencedRelation: "trabajos"
            referencedColumns: ["id"]
          },
        ]
      }
      presupuestos: {
        Row: {
          comuna: string
          created_at: string
          id: string
          material: string
          mensaje: string | null
          nombre: string
          telefono: string
          tipo_mueble: string
        }
        Insert: {
          comuna: string
          created_at?: string
          id?: string
          material: string
          mensaje?: string | null
          nombre: string
          telefono: string
          tipo_mueble: string
        }
        Update: {
          comuna?: string
          created_at?: string
          id?: string
          material?: string
          mensaje?: string | null
          nombre?: string
          telefono?: string
          tipo_mueble?: string
        }
        Relationships: []
      }
      trabajos: {
        Row: {
          abono_pagado: boolean
          cliente: string
          comuna: string | null
          created_at: string
          descripcion: string | null
          direccion: string | null
          estado: Database["public"]["Enums"]["trabajo_estado"]
          fecha: string
          id: string
          incluye: string[]
          numero: string
          presupuesto_id: string | null
          saldo_pagado: boolean
          telefono: string | null
          valor_total: number
        }
        Insert: {
          abono_pagado?: boolean
          cliente: string
          comuna?: string | null
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          estado?: Database["public"]["Enums"]["trabajo_estado"]
          fecha?: string
          id?: string
          incluye?: string[]
          numero: string
          presupuesto_id?: string | null
          saldo_pagado?: boolean
          telefono?: string | null
          valor_total?: number
        }
        Update: {
          abono_pagado?: boolean
          cliente?: string
          comuna?: string | null
          created_at?: string
          descripcion?: string | null
          direccion?: string | null
          estado?: Database["public"]["Enums"]["trabajo_estado"]
          fecha?: string
          id?: string
          incluye?: string[]
          numero?: string
          presupuesto_id?: string | null
          saldo_pagado?: boolean
          telefono?: string | null
          valor_total?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      gasto_categoria:
        | "espuma"
        | "tela"
        | "retiro"
        | "tapicero"
        | "costurera"
        | "otros"
      trabajo_estado:
        | "cotizacion"
        | "aprobada"
        | "en_taller"
        | "terminada"
        | "entregada"
        | "cancelada"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      gasto_categoria: [
        "espuma",
        "tela",
        "retiro",
        "tapicero",
        "costurera",
        "otros",
      ],
      trabajo_estado: [
        "cotizacion",
        "aprobada",
        "en_taller",
        "terminada",
        "entregada",
        "cancelada",
      ],
    },
  },
} as const
