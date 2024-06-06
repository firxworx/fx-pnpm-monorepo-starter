import { LayoutContainer } from './LayoutContainer'
import { NavLink } from 'react-router-dom'

import { cn } from '@/helpers/cn'
import type { NavLinkSpec } from '@/types/nav.types'

export interface LayoutHeaderProps {
  navLinks?: NavLinkSpec[]
  className?: string
}

export function LayoutHeader({ navLinks, className }: LayoutHeaderProps): JSX.Element {
  return (
    <header className="bg-slate-200 dark:bg-slate-800">
      <LayoutContainer className="flex flex-col gap-4 text-gray-800 dark:text-slate-200/95">
        <h1 className="text-2xl font-bold">Demo App</h1>
        <div className="flex items-center justify-between">
          <nav>
            <ul className="flex gap-4">
              {navLinks?.map(({ to, label }) => (
                <li key={`${String(to)}${label}`}>
                  <NavLink
                    to={to}
                    className={({ isActive, isPending, isTransitioning }) =>
                      cn(
                        'hover:underline',
                        {
                          ['animate-pulse text-slate-800/75']: isPending,
                          ['underline']: isActive,
                          ['text-slate-800/75']: isTransitioning,
                        },
                        typeof className === 'string' ? className : undefined,
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </LayoutContainer>
    </header>
  )
}
