interface Slide {
  id: number
  title: string
  subtitle: string
  content: string
  accent: string
}

interface SlideContentProps {
  slide: Slide
}

export function SlideContent({ slide }: SlideContentProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-8 py-24">
      <div className="mx-auto max-w-4xl text-center">
        {/* Accent number */}
        <div className="mb-8 font-mono text-8xl font-bold text-muted/50 md:text-[12rem]">{slide.accent}</div>

        {/* Subtitle */}
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">{slide.subtitle}</p>

        {/* Title */}
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
          {slide.title}
        </h1>

        {/* Content */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
          {slide.content}
        </p>
      </div>
    </div>
  )
}
