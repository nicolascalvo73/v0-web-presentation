'use client'

interface AdventCalendarProps {
  items?: Array<{ day: string | number; content: string }>
}

export function AdventCalendar({ items }: AdventCalendarProps) {
  const defaultItems = [
    { day: 1, content: 'algo' },
    { day: 2, content: '❤️' },
    { day: 3, content: '💩' },
    { day: 4, content: '🎅' },
  ]

  const calendarItems = items || defaultItems

  return (
    <>
      <style jsx>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-20deg); }
          40% { transform: rotate(20deg); }
          60% { transform: rotate(-10deg); }
          80% { transform: rotate(10deg); }
          100% { transform: rotate(0deg); }
        }

        .present {
          position: relative;
          display: inline-block;
          width: 12em;
          height: 12em;
          margin: 0.5em;
          perspective: 850px;
          z-index: 10;
        }

        .present:hover {
          z-index: 50;
        }

        .present__pane {
          position: relative;
          width: 12em;
          height: 12em;
          background: linear-gradient(135deg, hsl(0, 0%, 68%) 50%, hsl(0, 0%, 64%) 50%);
          transform-style: preserve-3d;
          transform-origin: 0;
          perspective: 850px;
          text-align: center;
          box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: all 0.2s ease-out;
        }

        .present:hover .present__pane {
          background: linear-gradient(135deg, hsl(0, 0%, 71%) 50%, hsl(0, 0%, 69%) 50%);
          transform: rotateY(-97deg);
          perspective-origin: 0;
          transition: all 0.25s ease-in;
        }

        .present__date {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2.4em;
          height: 2.4em;
          margin: 0;
          font-size: 2em;
          line-height: 2.4em;
          background: hsl(0, 0%, 58%);
          color: white;
          border-radius: 50%;
          box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.15);
        }

        .present:hover .present__date {
          backface-visibility: hidden;
        }

        .present__content {
          position: absolute;
          top: 0;
          left: 0;
          width: 12em;
          height: 12em;
          background: hsl(0, 0%, 58%);
          box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.15), inset 0 0 30px 20px rgba(0, 0, 0, 0.15);
          z-index: -1;
        }

        .present__bauble {
          position: relative;
          width: 120px;
          height: 120px;
          background: hsl(0, 0%, 72%);
          margin: 25% auto 0 auto;
          font-size: 1rem;
          line-height: 120px;
          border-radius: 50%;
        }

        .present:hover .present__bauble {
          display: inline-block;
          transform-origin: 50% 0;
          animation: shake 0.7s;
        }

        .present__bauble::after {
          content: '';
          position: absolute;
          top: -5%;
          left: 50%;
          width: 30%;
          height: 10%;
          margin-left: -15%;
          background: inherit;
        }

        .present__bauble::before {
          content: '';
          position: absolute;
          top: -15%;
          left: 50%;
          width: 12%;
          height: 20%;
          margin-left: -12%;
          border: 0.35rem solid hsl(0, 0%, 72%);
          border-radius: 50%;
          z-index: 0;
        }
      `}</style>
      <div className="text-center mx-auto max-w-4xl py-8">
        {calendarItems.map((item) => (
          <article key={item.day} className="present">
            <div className="present__pane">
              <h2 className="present__date">{item.day}</h2>
            </div>
            <div className="present__content">
              <div className="present__bauble">{item.content}</div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
