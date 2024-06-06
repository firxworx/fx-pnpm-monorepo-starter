import { cn } from '@/helpers/cn'

export interface LayoutContainerProps extends React.PropsWithChildren {
  className?: string
}

export function LayoutContainer({ className, children }: LayoutContainerProps): JSX.Element {
  return <div className={cn('container mx-auto max-w-6xl px-4 py-6', className)}>{children}</div>
}
