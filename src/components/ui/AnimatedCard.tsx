import { Card, CardProps } from '@mantine/core'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface AnimatedCardProps extends Omit<CardProps, 'children'> {
  children: React.ReactNode
  hover?: boolean
  delay?: number
}

export function AnimatedCard({ 
  children, 
  className,
  hover = true,
  delay = 0,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
    >
      <Card
        shadow="md"
        radius="lg"
        className={cn(
          "border-0 bg-card/50 backdrop-blur-sm transition-all duration-200",
          hover && "hover:shadow-lg hover:bg-card/80",
          className
        )}
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  )
} 