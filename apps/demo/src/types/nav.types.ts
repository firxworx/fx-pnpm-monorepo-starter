import type { NavLinkProps } from 'react-router-dom'

export type NavLinkSpec = Pick<NavLinkProps, 'to'> & { label: string }
