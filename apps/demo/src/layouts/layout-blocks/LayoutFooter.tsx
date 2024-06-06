import { LayoutContainer } from './LayoutContainer'

export function LayoutFooter(): JSX.Element {
  return (
    <footer className="min-h-12 bg-slate-200 dark:bg-slate-800">
      <LayoutContainer>
        <p className="text-slate-800/95 dark:text-slate-200/95">Footer</p>
      </LayoutContainer>
    </footer>
  )
}
