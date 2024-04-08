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
      channels: {
        Row: {
          created_at: string
          creator: string | null
          description: string | null
          id: number
          invite_link: string | null
          link_expire_date: string | null
          name: string
          num_members: number | null
          photo: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          creator?: string | null
          description?: string | null
          id?: number
          invite_link?: string | null
          link_expire_date?: string | null
          name: string
          num_members?: number | null
          photo?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          creator?: string | null
          description?: string | null
          id?: number
          invite_link?: string | null
          link_expire_date?: string | null
          name?: string
          num_members?: number | null
          photo?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_channels_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      channels_users: {
        Row: {
          channel_id: number
          is_muted: boolean
          role: string
          user_id: string
        }
        Insert: {
          channel_id: number
          is_muted?: boolean
          role?: string
          user_id: string
        }
        Update: {
          channel_id?: number
          is_muted?: boolean
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_channels-users_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_channels-users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      friends: {
        Row: {
          friend_id: string
          user_id: string
        }
        Insert: {
          friend_id: string
          user_id: string
        }
        Update: {
          friend_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_friends_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_friends_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      likes: {
        Row: {
          channel_id: number | null
          message_id: number
          user_id: string
        }
        Insert: {
          channel_id?: number | null
          message_id: number
          user_id: string
        }
        Update: {
          channel_id?: number | null
          message_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_likes_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          author_id: string
          channel_id: number | null
          created_at: string
          file: string | null
          id: number
          is_edited: boolean | null
          text: string
        }
        Insert: {
          author_id?: string
          channel_id?: number | null
          created_at?: string
          file?: string | null
          id?: number
          is_edited?: boolean | null
          text: string
        }
        Update: {
          author_id?: string
          channel_id?: number | null
          created_at?: string
          file?: string | null
          id?: number
          is_edited?: boolean | null
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_messages_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_messages_channel_id_fkey"
            columns: ["channel_id"]
            isOneToOne: false
            referencedRelation: "channels"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          description: string | null
          id: string
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          id: string
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          description?: string | null
          id?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_all_friends: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          created_at: string
          username: string
          avatar: string
          description: string
        }[]
      }
      remove_friend: {
        Args: {
          remove_friend_id: string
        }
        Returns: undefined
      }
      select_new_friends: {
        Args: {
          username_pattern: string
          start_index: number
        }
        Returns: {
          id: string
          created_at: string
          username: string
          avatar: string
          description: string
        }[]
      }
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
