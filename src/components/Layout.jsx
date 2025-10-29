import { Outlet } from 'react-router-dom'
import { GlobalStyles } from '@/components/HomePage/GlobalStyles'
import { Navigation } from '@/components/HomePage/Navigation'
import { Footer } from '@/components/HomePage/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Layout() {
  return (
    <>
      <GlobalStyles />
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}


