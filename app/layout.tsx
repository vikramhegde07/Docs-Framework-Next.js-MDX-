import { Navbar as DefaultNavbar } from "@/components/layout/Navbar"
import { Footer as DefaultFooter } from "@/components/layout/Footer"
import { docsConfig } from "@/lib/config"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import "./globals.css"

/* =========================================================
ROOT LAYOUT (APP WRAPPER)

This is the global layout applied to the entire app.

Responsibilities:

* Inject global providers (Theme)
* Render layout structure (Navbar, Footer)
* Apply global styles
* Provide consistent UI shell

Structure:

   <html>
     <body>
       <ThemeProvider>
         Navbar
         Main Content
         Footer
       </ThemeProvider>
     </body>
   </html>

Key Features:

* Config-driven layout (enable/disable navbar/footer)
* Component override support
* Theme system integration
* Hydration-safe rendering
========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  /* =====================================================
    COMPONENT RESOLUTION
    
    Allows overriding default layout components via config.
    
    Priority:
    - Custom component (if provided)
    - Default component (fallback)
  
  ===================================================== */

  const NavbarComp =
    docsConfig.components?.Navbar || DefaultNavbar

  const FooterComp =
    docsConfig.components?.Footer || DefaultFooter

  return (<html lang="en" suppressHydrationWarning>

    {/* =================================================
      BODY

      - Uses theme-aware background & text colors
    ================================================= */}
    <body className="bg-background text-foreground">

      {/* =============================================
        THEME PROVIDER

        Enables:
        - light / dark / system themes
        - class-based theming
      ============================================= */}
      <ThemeProvider>

        {/* =============================================
          MAIN APP LAYOUT
        ============================================= */}
        <div className="flex flex-col min-h-screen">

          {/* =========================================
            NAVBAR (OPTIONAL)
          ========================================= */}
          {docsConfig.layout?.navbar && (
            <NavbarComp />
          )}

          {/* =========================================
            MAIN CONTENT
          ========================================= */}
          <main className="flex-1">
            {children}
          </main>

          {/* =========================================
            FOOTER (OPTIONAL)
          ========================================= */}
          {docsConfig.layout?.footer && (
            <FooterComp />
          )}

        </div>
      </ThemeProvider>
    </body>
  </html>
  )
}
