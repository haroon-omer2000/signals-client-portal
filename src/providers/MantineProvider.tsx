'use client'

import { MantineProvider, createTheme } from '@mantine/core'

const theme = createTheme({
  primaryColor: 'slate',
  colors: {
    slate: [
      '#f8fafc',
      '#f1f5f9', 
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a',
    ],
  },
  fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  fontFamilyMonospace: 'var(--font-geist-mono), monospace',
  radius: {
    xs: '0.25rem',
    sm: '0.375rem', 
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
})

interface MantineProviderProps {
  children: React.ReactNode
}

export function CustomMantineProvider({ children }: MantineProviderProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  )
} 