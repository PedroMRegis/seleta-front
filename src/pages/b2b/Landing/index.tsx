import { useAuth } from '@/auth'
import { categories } from '@/catalog'
import { Audiences } from './components/Audiences'
import { HowItWorks } from './components/HowItWorks'
import { LandingHero } from './components/LandingHero'
import { Lines } from './components/Lines'
import { QuoteBand } from './components/QuoteBand'

/** Vitrine pública da área de negócios (/negocios) — apresenta a Seleta, sem preços. */
export function Landing() {
  const { isAuthenticated, openLogin } = useAuth()

  return (
    <>
      <LandingHero isAuthenticated={isAuthenticated} onLogin={openLogin} />
      <Audiences />
      <HowItWorks />
      <Lines categories={categories} />
      <QuoteBand isAuthenticated={isAuthenticated} />
    </>
  )
}
