"use client"

import { useState, useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SlideContent } from "./slide-content"

const slides = [
  {
    id: 1,
    title: "Bienvenido",
    subtitle: "Tu presentación comienza aquí",
    content:
      "Usa las flechas para navegar entre los slides. Esta es una herramienta simple y elegante para tus presentaciones.",
    accent: "01",
  },
  {
    id: 2,
    title: "Nuestra Visión",
    subtitle: "Construyendo el futuro",
    content:
      "Creemos en soluciones simples para problemas complejos. Nuestro enfoque se centra en la experiencia del usuario.",
    accent: "02",
  },
  {
    id: 3,
    title: "El Proceso",
    subtitle: "Cómo trabajamos",
    content:
      "Seguimos una metodología ágil que nos permite adaptarnos rápidamente a los cambios y entregar valor continuamente.",
    accent: "03",
  },
  {
    id: 4,
    title: "Resultados",
    subtitle: "Lo que hemos logrado",
    content:
      "Más de 100 proyectos exitosos, clientes satisfechos en todo el mundo y un equipo comprometido con la excelencia.",
    accent: "04",
  },
  {
    id: 5,
    title: "Siguiente Paso",
    subtitle: "¿Listo para comenzar?",
    content:
      "Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos. El éxito está a un paso de distancia.",
    accent: "05",
  },
]

export function PresentationViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState<"left" | "right" | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setDirection("right")
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1)
        setIsAnimating(false)
      }, 300)
    }
  }, [currentSlide, isAnimating])

  const goToPrev = useCallback(() => {
    if (currentSlide > 0 && !isAnimating) {
      setDirection("left")
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1)
        setIsAnimating(false)
      }, 300)
    }
  }, [currentSlide, isAnimating])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNext()
      } else if (e.key === "ArrowLeft") {
        goToPrev()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrev])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-muted">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
        <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground">Presentación</div>
        <div className="text-sm font-mono text-muted-foreground">
          {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </div>
      </header>

      {/* Slide content */}
      <div
        className={cn(
          "h-full w-full transition-all duration-300 ease-out",
          isAnimating && direction === "right" && "translate-x-[-20px] opacity-0",
          isAnimating && direction === "left" && "translate-x-[20px] opacity-0",
        )}
      >
        <SlideContent slide={slides[currentSlide]} />
      </div>

      {/* Navigation arrows */}
      <div className="absolute bottom-8 left-8 right-8 z-10 flex items-center justify-between">
        <button
          onClick={goToPrev}
          disabled={currentSlide === 0}
          className={cn(
            "group flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-all duration-200",
            currentSlide === 0
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-foreground hover:text-primary-foreground hover:border-foreground",
          )}
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Anterior</span>
        </button>

        {/* Slide indicators */}
        <div className="hidden md:flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setDirection(index > currentSlide ? "right" : "left")
                  setIsAnimating(true)
                  setTimeout(() => {
                    setCurrentSlide(index)
                    setIsAnimating(false)
                  }, 300)
                }
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentSlide ? "bg-foreground w-8" : "bg-border hover:bg-muted-foreground",
              )}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentSlide === slides.length - 1}
          className={cn(
            "group flex items-center gap-3 rounded-full border border-foreground bg-foreground px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-200",
            currentSlide === slides.length - 1
              ? "cursor-not-allowed opacity-30"
              : "hover:bg-card hover:text-foreground",
          )}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
        <kbd className="rounded border border-border bg-muted px-2 py-1 font-mono">←</kbd>
        <kbd className="rounded border border-border bg-muted px-2 py-1 font-mono">→</kbd>
        <span className="ml-1">para navegar</span>
      </div>
    </div>
  )
}
