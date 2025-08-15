import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata: Metadata = {
  title: "Simulacro de Admisión Universitaria",
  description:
    "Aplicación completa de simulacros de exámenes de admisión universitaria con 70 preguntas por especialidad, retroalimentación detallada y fuentes académicas.",
  keywords: ["simulacro", "admisión", "universidad", "examen", "educación", "psicología", "ingeniería", "contabilidad"],
  authors: [{ name: "Simulacro Admisión" }],
  creator: "Simulacro de Admisión Universitaria",
  publisher: "Simulacro de Admisión Universitaria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://simulacro-admision.vercel.app"),
  openGraph: {
    title: "Simulacro de Admisión Universitaria",
    description: "Prepárate para tu examen de admisión con simulacros completos de 70 preguntas por especialidad",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulacro de Admisión Universitaria",
    description: "Prepárate para tu examen de admisión con simulacros completos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion-google",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
