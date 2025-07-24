import { Database, Tables, TablesInsert, TablesUpdate } from './database.types'

// Client types
export type Client = Tables<'clients'>
export type ClientInsert = TablesInsert<'clients'>
export type ClientUpdate = TablesUpdate<'clients'>

// Form data types
export interface CreateClientFormData {
  name: string
  email: string
  business_name: string
}

// API response types
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  success: boolean
}

export interface ClientsResponse extends ApiResponse {
  data?: Client[]
}

export interface ClientResponse extends ApiResponse {
  data?: Client
}

// Email types
export interface WelcomeEmailData {
  to: string
  clientName: string
  businessName: string
}

export interface EmailResponse {
  success: boolean
  messageId?: string
  error?: string
} 