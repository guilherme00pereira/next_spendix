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
                    id: number
                    name: string
                    type: Database["public"]["Enums"]["category_type"] | null
                }
                Insert: {
                    id?: number
                    name: string
                    type?: Database["public"]["Enums"]["category_type"] | null
                }
                Update: {
                    id?: number
                    name?: string
                    type?: Database["public"]["Enums"]["category_type"] | null
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
                    category_id: number
                    group_id: number
                    id: number
                }
                Insert: {
                    category_id: number
                    group_id: number
                    id?: number
                }
                Update: {
                    category_id?: number
                    group_id?: number
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
            payment_options: {
                Row: {
                    created_at: string
                    due_date: number | null
                    id: number
                    name: string
                    next_best_day: number | null
                }
                Insert: {
                    created_at?: string
                    due_date?: number | null
                    id?: number
                    name: string
                    next_best_day?: number | null
                }
                Update: {
                    created_at?: string
                    due_date?: number | null
                    id?: number
                    name?: string
                    next_best_day?: number | null
                }
                Relationships: []
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
            tags: {
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
            tags_transactions: {
                Row: {
                    id: number
                    tag_id: number
                    transaction_id: number
                }
                Insert: {
                    id?: number
                    tag_id: number
                    transaction_id: number
                }
                Update: {
                    id?: number
                    tag_id?: number
                    transaction_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "tags_transactions_tag_id_fkey"
                        columns: ["tag_id"]
                        isOneToOne: false
                        referencedRelation: "tags"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "tags_transactions_transaction_id_fkey"
                        columns: ["transaction_id"]
                        isOneToOne: false
                        referencedRelation: "transactions"
                        referencedColumns: ["id"]
                    }
                ]
            }
            transactions: {
                Row: {
                    amount: number
                    cashed: boolean
                    category_id: number | null
                    created_at: string
                    description: string | null
                    due_date: string
                    id: number
                    payed_amount: number | null
                    payment_date: string | null
                    payment_option_id: number
                }
                Insert: {
                    amount: number
                    cashed?: boolean
                    category_id?: number | null
                    created_at?: string
                    description?: string | null
                    due_date: string
                    id?: number
                    payed_amount?: number | null
                    payment_date?: string | null
                    payment_option_id?: number
                }
                Update: {
                    amount?: number
                    cashed?: boolean
                    category_id?: number | null
                    created_at?: string
                    description?: string | null
                    due_date?: string
                    id?: number
                    payed_amount?: number | null
                    payment_date?: string | null
                    payment_option_id?: number
                }
                Relationships: [
                    {
                        foreignKeyName: "transactions_category_id_fkey"
                        columns: ["category_id"]
                        isOneToOne: false
                        referencedRelation: "categories"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "transactions_payment_option_id_fkey"
                        columns: ["payment_option_id"]
                        isOneToOne: false
                        referencedRelation: "payment_options"
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
            category_type: "Receita" | "Despesa Fixa" | "Despesa"
            recurring_type: "Daily" | "Weekly" | "Monthly" | "Yearly"
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
