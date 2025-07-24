'use client'

import { Stack, Divider } from '@mantine/core'
import { motion } from 'framer-motion'

import { Header } from '@/components/layout/Header'
import { Container } from '@/components/layout/Container'
import { AddClientForm } from '@/components/forms/AddClientForm'
import { ClientList } from '@/components/clients/ClientList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <Header />
      
      <Container size="xl" className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center py-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent mb-4">
            Welcome to Client Portal
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Streamline your client onboarding process with our modern, efficient portal. 
            Add new clients and manage your growing business with ease.
          </p>
        </motion.div>

        <Stack gap="xl">
          <AddClientForm />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Divider 
              label="Current Clients" 
              labelPosition="center"
              size="sm"
              className="my-8"
            />
          </motion.div>
          
          <ClientList />
        </Stack>
      </Container>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  )
}
