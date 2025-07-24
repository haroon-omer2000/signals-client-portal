'use client'

import { useState } from 'react'
import { Button, TextInput, Group, Stack, Alert } from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { motion } from 'framer-motion'
import { Building2, Mail, User, AlertCircle, CheckCircle } from 'lucide-react'

import { useCreateClientMutation } from '@/store/api/clientsApi'
import { CreateClientFormData } from '@/types/client.types'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

export function AddClientForm() {
  const [createClient, { isLoading }] = useCreateClientMutation()
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<CreateClientFormData>({
    initialValues: {
      name: '',
      email: '',
      business_name: '',
    },
    validate: {
      name: (value) => {
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        return null
      },
      email: (value) => {
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return null
      },
      business_name: (value) => {
        if (!value.trim()) return 'Business name is required'
        if (value.trim().length < 2) return 'Business name must be at least 2 characters'
        return null
      },
    },
  })

  const handleSubmit = async (values: CreateClientFormData) => {
    try {
      setSubmitError(null)
      
      const result = await createClient({
        name: values.name.trim(),
        email: values.email.toLowerCase().trim(),
        business_name: values.business_name.trim(),
      }).unwrap()

      if (result.success) {
        notifications.show({
          title: 'Client Added Successfully!',
          message: `${values.name} has been added and will receive a welcome email.`,
          color: 'green',
          icon: <CheckCircle size={18} />,
          autoClose: 5000,
        })
        
        form.reset()
      }
    } catch (error: unknown) {
      const errorMessage = (error as { data?: { error?: string } })?.data?.error || 'Failed to add client. Please try again.'
      setSubmitError(errorMessage)
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
        icon: <AlertCircle size={18} />,
        autoClose: 7000,
      })
    }
  }

  return (
    <AnimatedCard>
      <Stack gap="lg" p="xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">Add New Client</h2>
          <p className="text-muted-foreground">
            Add a new client to the portal. They will automatically receive a welcome email.
          </p>
        </motion.div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Alert 
              icon={<AlertCircle size={16} />} 
              color="red" 
              variant="light"
              onClose={() => setSubmitError(null)}
              withCloseButton
            >
              {submitError}
            </Alert>
          </motion.div>
        )}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TextInput
                leftSection={<User size={18} className="text-muted-foreground" />}
                label="Full Name"
                placeholder="Enter client's full name"
                required
                disabled={isLoading}
                {...form.getInputProps('name')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <TextInput
                leftSection={<Mail size={18} className="text-muted-foreground" />}
                label="Email Address"
                placeholder="Enter client's email address"
                type="email"
                required
                disabled={isLoading}
                {...form.getInputProps('email')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TextInput
                leftSection={<Building2 size={18} className="text-muted-foreground" />}
                label="Business Name"
                placeholder="Enter business/company name"
                required
                disabled={isLoading}
                {...form.getInputProps('business_name')}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Group justify="flex-end" mt="lg">
                <Button
                  type="button"
                  variant="light"
                  color="gray"
                  disabled={isLoading}
                  onClick={() => {
                    form.reset()
                    setSubmitError(null)
                  }}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  loading={isLoading}
                  leftSection={!isLoading ? <User size={18} /> : undefined}
                >
                  {isLoading ? 'Adding Client...' : 'Add Client'}
                </Button>
              </Group>
            </motion.div>
          </Stack>
        </form>
      </Stack>
    </AnimatedCard>
  )
} 