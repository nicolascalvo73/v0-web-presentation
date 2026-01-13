"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SlideContent } from "./slide-content";

const slides = [
  {
    id: 1,
    title: "Bienvenides",
    subtitle: "Resumen Q4 2025 ncalvo",
    content:
      "En las proximas slides mostraré una interpretación de mi performance laboral en el ultimo trimestre del 2025.\nHere we go...",
    accent: "01",
  },
  {
    id: 2,
    title: "Diriamos que 👍",
    subtitle: "Habilidades blandas",
    content:
      "En general perdi algunas decimas en todos los puntos, pero equipo ok, comunicacion ok, resiliencia ok, reducir humor border ok, etc...",
    accent: "02",
  },
  {
    id: 3,
    title: "veniamos bien",
    subtitle: "En cuanto al trabajo en si",
    content:
      "| CALIDAD | AUTONOMÍA | OWNERSHIP | COLABORACIÓN | INICIATIVA | APRENDIZAJE | ACTITUD | ADAPTABILIDAD | IMPACTO |",
    accent: "03",
  },
  {
    id: 4,
    title: "Estimación y Segentación",
    subtitle: "acá se pudre la momia",
    content:
      "Pobre segmentación, estimación deficiente y aún peor comunicación.\n - ¿ncalvo esta trabajando? \n - creemos que si \n - ¿en qué? \n - templates? campañas? está ahi con la compu... \n - ...",
    accent: "04",
  },
  {
    id: 5,
    title: "",
    subtitle: "¿que estoy haciendo según tu cumple ? ",
    content: {
      type: "two-columns" as const,
      col1: "Enero - Rompiendo \nFebrero - Optimizando\nMarzo - Refactorizando \nAbril - Deployando \nMayo - Parchando \nJunio - Hardcodeando \nJulio - Debugueando \nAgosto - Hotfixeando \nSeptiembre - Documentando \nOctubre - Buildeando\nNoviembre - Reiniciando\nDiciembre - Testeando en prod",
      col2: "1 / 17 - campañas de blogspot\n2 / 18 - templates de correo postal\n3 / 19 - una focaccia\n4 / 20 - css inline\n5 / 21 - nuevos bugs\n6 / 22 - codigo en papel\n7 / 23 - templates metroflog \n8 / 24 - en paint \n9 / 25 - nueva deuda técnica\n10 / 26 - api keys inventadas\n11 / 27 - copys en jeringoso\n12 / 28 - interfaz para gameboy\n13 / 29 - la build de bitbucket\n14 / 30 - librerias deprecadas\n15 / 31 - html sin estilos\n16 - en Cobol",
    },
    accent: "05",
  },
  {
    id: 6,
    title: "",
    subtitle: "cuando estará terminado?",
    content: {
      type: "canvas-animation" as const,
      text: "NO-LO-SE",
    },
    accent: "06",
  },
  {
    id: 7,
    title: "Segmentación",
    subtitle: "Mejor hablemos de...",
    content:
      "Segmentación en la planificación de código es dividir el problema antes de escribir una sola línea, para separa responsabilidades, entregar etapas, definir limites, aislar cambios y planear dependencias.",
    accent: "07",
  },
  {
    id: 8,
    title: "",
    subtitle: "POV de Coty / Lucas / etc... cada semana",
    content: {
      type: "advent-calendar" as const,
      items: [
        { day: "S11", content: "BLU-5423 🔧" },
        { day: "S12", content: "BLU-5423 🔧" },
        { day: "S13", content: "BLU-5423 🔧" },
        { day: "S14", content: "BLU-5423 ✅" },
      ],
    },
    accent: "08",
  },
  {
    id: 9,
    title: "Q1 2026",
    subtitle: "Ready to go?",
    content:
      "Hare lo posible para reforzar lo que andó...\nsobre todo ESTIMAR, SEGMENTAR y COMUNICAR!!!",
    accent: "09",
  },
];

export function PresentationViewer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (currentSlide < slides.length - 1 && !isAnimating) {
      setDirection("right");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentSlide, isAnimating]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0 && !isAnimating) {
      setDirection("left");
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  }, [currentSlide, isAnimating]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

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
        <div className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
          ncalvo Q4 2025
        </div>
        <div className="text-sm font-mono text-muted-foreground">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
      </header>

      {/* Slide content */}
      <div
        className={cn(
          "h-full w-full transition-all duration-300 ease-out",
          isAnimating &&
            direction === "right" &&
            "translate-x-[-20px] opacity-0",
          isAnimating && direction === "left" && "translate-x-[20px] opacity-0"
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
              : "hover:bg-foreground hover:text-primary-foreground hover:border-foreground"
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
                  setDirection(index > currentSlide ? "right" : "left");
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrentSlide(index);
                    setIsAnimating(false);
                  }, 300);
                }
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "bg-foreground w-8"
                  : "bg-border hover:bg-muted-foreground"
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
              : "hover:bg-card hover:text-foreground"
          )}
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
