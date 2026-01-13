interface Slide {
  id: number
  title: string
  subtitle: string
  content: string | { type: 'two-columns'; col1: string; col2: string } | { type: 'three-columns'; col1: string; col2: string; col3: string }
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
        {typeof slide.content === 'string' ? (
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl text-pretty">
            {slide.content.split('\n').map((line, index, array) => (
              <span key={index}>
                {line}
                {index < array.length - 1 && <br />}
              </span>
            ))}
          </p>
        ) : slide.content.type === 'two-columns' ? (
          <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="text-left">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.content.col1.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.content.col2.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ) : slide.content.type === 'three-columns' ? (
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-left">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.content.col1.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.content.col2.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
            <div className="text-left">
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                {slide.content.col3.split('\n').map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index < array.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
