'use client'

import { Badge, Group, Stack, Text, ActionIcon, Tooltip } from '@mantine/core'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Mail, Calendar, Trash2, User } from 'lucide-react'

import { useGetClientsQuery } from '@/store/api/clientsApi'
import { formatDate } from '@/lib/utils'
import { Client } from '@/types/client.types'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      layout
    >
      <AnimatedCard className="overflow-hidden">
        <div className="p-6">
          <Group justify="space-between" align="flex-start" mb="md">
            <div className="flex-1">
              <Group gap="sm" mb="xs">
                <User size={20} className="text-primary" />
                <Text fw={600} size="lg" c="dark">
                  {client.name}
                </Text>
              </Group>
              
              <Group gap="xs" mb="xs">
                <Building2 size={16} className="text-muted-foreground" />
                <Text size="sm" c="dimmed">
                  {client.business_name}
                </Text>
              </Group>
              
              <Group gap="xs" mb="sm">
                <Mail size={16} className="text-muted-foreground" />
                <Text size="sm" c="dimmed">
                  {client.email}
                </Text>
              </Group>
              
              <Group gap="xs">
                <Calendar size={16} className="text-muted-foreground" />
                <Text size="xs" c="dimmed">
                  Added {formatDate(client.created_at)}
                </Text>
              </Group>
            </div>
            
            <div className="flex flex-col gap-2">
              <Badge 
                variant="light" 
                color="green" 
                size="sm"
                className="self-end"
              >
                Active
              </Badge>
              
              <Tooltip label="Delete client" position="left">
                <ActionIcon 
                  variant="subtle" 
                  color="red" 
                  size="sm"
                  className="hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 size={16} />
                </ActionIcon>
              </Tooltip>
            </div>
          </Group>
          
          <motion.div
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            style={{ originX: 0 }}
          />
        </div>
      </AnimatedCard>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-12"
    >
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
        <User size={32} className="text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No clients yet</h3>
             <p className="text-muted-foreground max-w-sm mx-auto">
         Add your first client using the form above. They&apos;ll appear here once added.
       </p>
    </motion.div>
  )
}

export function ClientList() {
  const { data: response, isLoading, error } = useGetClientsQuery()
  
  if (isLoading) {
    return <LoadingSpinner text="Loading clients..." />
  }
  
  if (error) {
    return (
      <AnimatedCard>
        <div className="p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <Mail size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load clients</h3>
          <p className="text-muted-foreground">
            There was an error loading the client list. Please try refreshing the page.
          </p>
        </div>
      </AnimatedCard>
    )
  }
  
  const clients = response?.data || []
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Client List</h2>
          <p className="text-muted-foreground">
            {clients.length === 0 
              ? 'No clients added yet' 
              : `${clients.length} client${clients.length === 1 ? '' : 's'} in the system`
            }
          </p>
        </div>
        
        {clients.length > 0 && (
          <Badge variant="outline" size="lg">
            {clients.length} Total
          </Badge>
        )}
      </motion.div>
      
      <AnimatePresence mode="wait">
        {clients.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            className="grid gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {clients.map((client, index) => (
              <ClientCard 
                key={client.id} 
                client={client} 
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 