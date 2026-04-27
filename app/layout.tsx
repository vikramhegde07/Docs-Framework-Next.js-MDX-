import { Navbar as DefaultNavbar } from "@/components/layout/Navbar"
import { Footer as DefaultFooter } from "@/components/layout/Footer"
import { docsConfig } from "@/lib/config"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import './globals.css';

export default function RootLayout({ children }: any) {
  const NavbarComp =
    docsConfig.components?.Navbar || DefaultNavbar

  const FooterComp =
    docsConfig.components?.Footer || DefaultFooter

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">

            {docsConfig.layout?.navbar && <NavbarComp />}

            <main className="flex-1">
              {children}
            </main>

            {docsConfig.layout?.footer && <FooterComp />}

          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}