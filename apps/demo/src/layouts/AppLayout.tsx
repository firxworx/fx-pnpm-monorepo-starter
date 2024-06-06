import { Outlet } from 'react-router-dom'
import { LayoutHeader } from './layout-blocks/LayoutHeader'
import { LayoutFooter } from './layout-blocks/LayoutFooter'
import { LayoutContainer } from './layout-blocks/LayoutContainer'
import { navLinks } from '@/nav'

export interface AppLayoutProps {}

export function AppLayout(): JSX.Element {
  return (
    <>
      <LayoutHeader navLinks={navLinks} />
      <main className="flex-1 bg-white">
        <LayoutContainer className="flex flex-col gap-4 py-12">
          <Outlet />
        </LayoutContainer>
      </main>
      <LayoutFooter />
    </>
  )
}
