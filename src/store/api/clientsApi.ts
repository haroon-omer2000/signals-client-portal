import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { Client, ClientInsert, ClientsResponse, ClientResponse } from '@/types/client.types'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    // Get all clients
    getClients: builder.query<ClientsResponse, void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
    
    // Get single client by ID
    getClient: builder.query<ClientResponse, string>({
      query: (id) => `/clients/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Client', id }],
    }),
    
    // Create new client
    createClient: builder.mutation<ClientResponse, ClientInsert>({
      query: (client) => ({
        url: '/clients',
        method: 'POST',
        body: client,
      }),
      invalidatesTags: ['Client'],
    }),
    
    // Update client
    updateClient: builder.mutation<ClientResponse, { id: string; client: Partial<ClientInsert> }>({
      query: ({ id, client }) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: client,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Client', id }],
    }),
    
    // Delete client
    deleteClient: builder.mutation<ClientResponse, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi 