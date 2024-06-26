export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          balance: number
          bank: string
          color: string | null
          created_at: string
          id: number
          user_id: string | null
        }
        Insert: {
          balance?: number
          bank: string
          color?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Update: {
          balance?: number
          bank?: string
          color?: string | null
          created_at?: string
          id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          color: string | null
          goal: number | null
          goal_type: Database["public"]["Enums"]["goal_value_type"] | null
          icon: string | null
          id: number
          name: string
          slug: string
          type: Database["public"]["Enums"]["category_type"]
        }
        Insert: {
          color?: string | null
          goal?: number | null
          goal_type?: Database["public"]["Enums"]["goal_value_type"] | null
          icon?: string | null
          id?: number
          name: string
          slug?: string
          type?: Database["public"]["Enums"]["category_type"]
        }
        Update: {
          color?: string | null
          goal?: number | null
          goal_type?: Database["public"]["Enums"]["goal_value_type"] | null
          icon?: string | null
          id?: number
          name?: string
          slug?: string
          type?: Database["public"]["Enums"]["category_type"]
        }
        Relationships: []
      }
      credit_cards: {
        Row: {
          brand: Database["public"]["Enums"]["credit_card_brand"] | null
          closing_day: number
          color: string | null
          created_at: string
          due_day: number
          final_numbers: string | null
          id: number
          limit: number
          name: string
        }
        Insert: {
          brand?: Database["public"]["Enums"]["credit_card_brand"] | null
          closing_day: number
          color?: string | null
          created_at?: string
          due_day: number
          final_numbers?: string | null
          id?: number
          limit: number
          name?: string
        }
        Update: {
          brand?: Database["public"]["Enums"]["credit_card_brand"] | null
          closing_day?: number
          color?: string | null
          created_at?: string
          due_day?: number
          final_numbers?: string | null
          id?: number
          limit?: number
          name?: string
        }
        Relationships: []
      }
      credit_cards_invoices: {
        Row: {
          amount: number
          credit_card_id: number
          date: string
          id: number
        }
        Insert: {
          amount: number
          credit_card_id: number
          date: string
          id?: number
        }
        Update: {
          amount?: number
          credit_card_id?: number
          date?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_card_invoices_credit_card_id_fkey"
            columns: ["credit_card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      group_categories: {
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
            foreignKeyName: "group_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_with_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_categories_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          color: string | null
          icon: string | null
          id: number
          name: string
        }
        Insert: {
          color?: string | null
          icon?: string | null
          id?: number
          name: string
        }
        Update: {
          color?: string | null
          icon?: string | null
          id?: number
          name?: string
        }
        Relationships: []
      }
      invoice_payments: {
        Row: {
          adjustment: boolean | null
          id: number
          invoice_id: number
          payment_id: number
        }
        Insert: {
          adjustment?: boolean | null
          id?: number
          invoice_id: number
          payment_id: number
        }
        Update: {
          adjustment?: boolean | null
          id?: number
          invoice_id?: number
          payment_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "credit_cards_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_payments_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_methods: {
        Row: {
          account_id: number | null
          credit_card_id: number | null
          id: number
        }
        Insert: {
          account_id?: number | null
          credit_card_id?: number | null
          id?: number
        }
        Update: {
          account_id?: number | null
          credit_card_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "payment_method_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_method_credit_card_id_fkey"
            columns: ["credit_card_id"]
            isOneToOne: false
            referencedRelation: "credit_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          date: string
          id: number
          installments: number
          payment_method_id: number
        }
        Insert: {
          amount: number
          date?: string
          id?: number
          installments?: number
          payment_method_id: number
        }
        Update: {
          amount?: number
          date?: string
          id?: number
          installments?: number
          payment_method_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_payments_payment_method_id_fkey"
            columns: ["payment_method_id"]
            isOneToOne: false
            referencedRelation: "payment_methods"
            referencedColumns: ["id"]
          },
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
          },
        ]
      }
      settings: {
        Row: {
          created_at: string
          id: number
          meta_key: string
          meta_value: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          meta_key: string
          meta_value?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          meta_key?: string
          meta_value?: Json | null
        }
        Relationships: []
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
          },
        ]
      }
      transaction_installments: {
        Row: {
          id: number
          installments: number
          transaction_id: number
        }
        Insert: {
          id?: number
          installments: number
          transaction_id: number
        }
        Update: {
          id?: number
          installments?: number
          transaction_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_transaction_installments_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: false
            referencedRelation: "transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          category_id: number | null
          created_at: string
          description: string | null
          draft: boolean
          due_date: string
          id: number
          payment_id: number | null
        }
        Insert: {
          amount: number
          category_id?: number | null
          created_at?: string
          description?: string | null
          draft?: boolean
          due_date: string
          id?: number
          payment_id?: number | null
        }
        Update: {
          amount?: number
          category_id?: number | null
          created_at?: string
          description?: string | null
          draft?: boolean
          due_date?: string
          id?: number
          payment_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_transactions_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories_with_stats"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      categories_with_stats: {
        Row: {
          active: string | null
          color: string | null
          current_balance: number | null
          goal: number | null
          goal_type: Database["public"]["Enums"]["goal_value_type"] | null
          icon: string | null
          id: number | null
          name: string | null
          previous_balance: number | null
          slug: string | null
          type: Database["public"]["Enums"]["category_type"] | null
        }
        Insert: {
          active?: never
          color?: string | null
          current_balance?: never
          goal?: number | null
          goal_type?: Database["public"]["Enums"]["goal_value_type"] | null
          icon?: string | null
          id?: number | null
          name?: string | null
          previous_balance?: never
          slug?: string | null
          type?: Database["public"]["Enums"]["category_type"] | null
        }
        Update: {
          active?: never
          color?: string | null
          current_balance?: never
          goal?: number | null
          goal_type?: Database["public"]["Enums"]["goal_value_type"] | null
          icon?: string | null
          id?: number | null
          name?: string | null
          previous_balance?: never
          slug?: string | null
          type?: Database["public"]["Enums"]["category_type"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      total_available_amount: {
        Args: Record<PropertyKey, never>
        Returns: {
          total: number
        }[]
      }
      transfer_money: {
        Args: {
          outid: number
          outtype: string
          inid: number
          intype: string
          amount: number
        }
        Returns: boolean
      }
    }
    Enums: {
      category_type: "Receita" | "Despesa" | "Transacao"
      credit_card_brand: "Visa" | "Mastercard"
      goal_value_type: "Percentage" | "Fixed"
      payment_type: "C" | "D" | "T"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
