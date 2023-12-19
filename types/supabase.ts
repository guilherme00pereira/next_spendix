export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            categories: {
                Row: {
                    category_type: number
                    id: number
                    name: string
                }
                Insert: {
                    category_type?: number
                    id?: number
                    name: string
                }
                Update: {
                    category_type?: number
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            events: {
                Row: {
                    final_day: string
                    id: number
                    initial_day: string
                    name: string
                }
                Insert: {
                    final_day: string
                    id?: number
                    initial_day: string
                    name: string
                }
                Update: {
                    final_day?: string
                    id?: number
                    initial_day?: string
                    name?: string
                }
                Relationships: []
            }
            groups: {
                Row: {
                    id: number
                    name: string
                }
                Insert: {
                    id?: number
                    name: string
                }
                Update: {
                    id?: number
                    name?: string
                }
                Relationships: []
            }
            groups_categories: {
                Row: {
                    category_id: number | null
                    group_id: number | null
                    id: number
                }
                Insert: {
                    category_id?: number | null
                    group_id?: number | null
                    id?: number
                }
                Update: {
                    category_id?: number | null
                    group_id?: number | null
                    id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "groups_categories_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "groups_categories_group_id_fkey"
                        columns: ["group_id"]
                        isOneToOne: false
                        referencedRelation: "groups"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            recurring_patterns: {
                Row: {
                    created_at: string
                    day_of_month: number | null
                    day_of_week: number | null
                    id: number
                    month_of_year: number | null
                    num_of_occurrences: number
                    recurring_type: number
                    week_of_month: number | null
                }
                Insert: {
                    created_at?: string
                    day_of_month?: number | null
                    day_of_week?: number | null
                    id?: number
                    month_of_year?: number | null
                    num_of_occurrences?: number
                    recurring_type?: number
                    week_of_month?: number | null
                }
                Update: {
                    created_at?: string
                    day_of_month?: number | null
                    day_of_week?: number | null
                    id?: number
                    month_of_year?: number | null
                    num_of_occurrences?: number
                    recurring_type?: number
                    week_of_month?: number | null
                }
                Relationships: []
            }
            transactions: {
                Row: {
                    amount: number
                    category_id: number | null
                    created_at: string
                    date: string
                    description: string | null
                    id: number
                }
                Insert: {
                    amount: number
                    category_id?: number | null
                    created_at?: string
                    date: string
                    description?: string | null
                    id?: number
                }
                Update: {
                    amount?: number
                    category_id?: number | null
                    created_at?: string
                    date?: string
                    description?: string | null
                    id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "transactions_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

export type Tables<
    PublicTableNameOrOptions extends
            | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
            Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
            Row: infer R
        }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
            Database["public"]["Views"])
        ? (Database["public"]["Tables"] &
            Database["public"]["Views"])[PublicTableNameOrOptions] extends {
                Row: infer R
            }
            ? R
            : never
        : never

export type TablesInsert<
    PublicTableNameOrOptions extends
            | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Insert: infer I
        }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
                Insert: infer I
            }
            ? I
            : never
        : never

export type TablesUpdate<
    PublicTableNameOrOptions extends
            | keyof Database["public"]["Tables"]
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
            Update: infer U
        }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
        ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
                Update: infer U
            }
            ? U
            : never
        : never

export type Enums<
    PublicEnumNameOrOptions extends
            | keyof Database["public"]["Enums"]
        | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
        ? Database["public"]["Enums"][PublicEnumNameOrOptions]
        : never
