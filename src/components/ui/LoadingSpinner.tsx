import { Loader } from '@mantine/core'
import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 24, 
  color = 'slate.6', 
  text = 'Loading...' 
}: LoadingSpinnerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <Loader size={size} color={color} />
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm text-muted-foreground"
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
} 