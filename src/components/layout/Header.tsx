'use client'

import { Group, ActionIcon, Title } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { motion } from 'framer-motion'
import { Building2, Moon, Sun } from 'lucide-react'
import { useMantineColorScheme } from '@mantine/core'

export function Header() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <>
      <Notifications position="top-right" />
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-4">
          <Group justify="space-between" align="center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-primary rounded-lg">
                <Building2 size={24} className="text-primary-foreground" />
              </div>
              <div>
                <Title order={2} className="text-foreground">
                  Client Portal
                </Title>
                <p className="text-sm text-muted-foreground">
                  Accountancy Firm Management
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={() => toggleColorScheme()}
                className="hover:bg-accent"
              >
                {colorScheme === 'dark' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </ActionIcon>
            </motion.div>
          </Group>
        </div>
      </motion.header>
    </>
  )
} 