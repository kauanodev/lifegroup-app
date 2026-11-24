Need to install the following packages:
supabase@3.4.0
Ok to proceed? (y) export type Json =
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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          active: boolean
          group_id: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          group_id: string
          id?: string
          name: string
        }
        Update: {
          active?: boolean
          group_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      addresses: {
        Row: {
          city: string | null
          complement: string | null
          created_at: string
          id: string
          latitude: number | null
          longitude: number | null
          maps_url: string | null
          neighborhood: string | null
          number: string | null
          state: string | null
          street: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          neighborhood?: string | null
          number?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          complement?: string | null
          created_at?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          maps_url?: string | null
          neighborhood?: string | null
          number?: string | null
          state?: string | null
          street?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      assignments: {
        Row: {
          activity_id: string
          id: string
          meeting_id: string
          member_id: string
        }
        Insert: {
          activity_id: string
          id?: string
          meeting_id: string
          member_id: string
        }
        Update: {
          activity_id?: string
          id?: string
          meeting_id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          checked_in_at: string
          meeting_id: string
          member_id: string
        }
        Insert: {
          checked_in_at?: string
          meeting_id: string
          member_id: string
        }
        Update: {
          checked_in_at?: string
          meeting_id?: string
          member_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      churches: {
        Row: {
          address_id: string | null
          id: string
          name: string
          pix_key: string | null
          pix_qr_url: string | null
        }
        Insert: {
          address_id?: string | null
          id?: string
          name: string
          pix_key?: string | null
          pix_qr_url?: string | null
        }
        Update: {
          address_id?: string | null
          id?: string
          name?: string
          pix_key?: string | null
          pix_qr_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "churches_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
        ]
      }
      communion_events: {
        Row: {
          event_date: string
          group_id: string
          id: string
          notes: string | null
        }
        Insert: {
          event_date: string
          group_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          event_date?: string
          group_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "communion_events_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      facilitations: {
        Row: {
          file_path: string | null
          id: string
          kind: string
          meeting_id: string
          title: string | null
          url: string | null
        }
        Insert: {
          file_path?: string | null
          id?: string
          kind: string
          meeting_id: string
          title?: string | null
          url?: string | null
        }
        Update: {
          file_path?: string | null
          id?: string
          kind?: string
          meeting_id?: string
          title?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facilitations_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: true
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      group_sections: {
        Row: {
          body: string | null
          created_at: string
          group_id: string
          id: string
          position: number
          title: string
          type: string
          visible: boolean
        }
        Insert: {
          body?: string | null
          created_at?: string
          group_id: string
          id?: string
          position?: number
          title: string
          type: string
          visible?: boolean
        }
        Update: {
          body?: string | null
          created_at?: string
          group_id?: string
          id?: string
          position?: number
          title?: string
          type?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "group_sections_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          address_id: string | null
          cover_url: string | null
          created_at: string
          id: string
          is_published: boolean
          logo_url: string | null
          meeting_time: string | null
          meeting_weekday: number | null
          name: string
          primary_color: string | null
          sector_id: string
          slug: string | null
          tagline: string | null
        }
        Insert: {
          address_id?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          logo_url?: string | null
          meeting_time?: string | null
          meeting_weekday?: number | null
          name: string
          primary_color?: string | null
          sector_id: string
          slug?: string | null
          tagline?: string | null
        }
        Update: {
          address_id?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          logo_url?: string | null
          meeting_time?: string | null
          meeting_weekday?: number | null
          name?: string
          primary_color?: string | null
          sector_id?: string
          slug?: string | null
          tagline?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          change_reason: string | null
          group_id: string
          id: string
          location: string | null
          meeting_date: string
          meeting_time: string
          week_start: string
        }
        Insert: {
          change_reason?: string | null
          group_id: string
          id?: string
          location?: string | null
          meeting_date: string
          meeting_time: string
          week_start: string
        }
        Update: {
          change_reason?: string | null
          group_id?: string
          id?: string
          location?: string | null
          meeting_date?: string
          meeting_time?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "meetings_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          active: boolean
          address_id: string | null
          birth_date: string | null
          created_at: string
          email: string | null
          group_id: string
          id: string
          name: string
          nickname: string | null
          phone: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          active?: boolean
          address_id?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          group_id: string
          id?: string
          name: string
          nickname?: string | null
          phone?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          active?: boolean
          address_id?: string | null
          birth_date?: string | null
          created_at?: string
          email?: string | null
          group_id?: string
          id?: string
          name?: string
          nickname?: string | null
          phone?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          church_id: string
          id: string
          name: string
        }
        Insert: {
          church_id: string
          id?: string
          name: string
        }
        Update: {
          church_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sectors_church_id_fkey"
            columns: ["church_id"]
            isOneToOne: false
            referencedRelation: "churches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_read_member_address: { Args: { aid: string }; Returns: boolean }
      ensure_week_meeting: { Args: { gid: string }; Returns: string }
      group_directory: {
        Args: { gid: string }
        Returns: {
          birth_day: number
          birth_month: number
          display_name: string
          id: string
          role: string
        }[]
      }
      is_group_leader: { Args: { gid: string }; Returns: boolean }
      is_group_member: { Args: { gid: string }; Returns: boolean }
      is_my_member: { Args: { mid: string }; Returns: boolean }
      member_matches_meeting: {
        Args: { meet: string; mid: string }
        Returns: boolean
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
    Enums: {},
  },
} as const
