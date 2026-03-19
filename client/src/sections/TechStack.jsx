import './TechStack.css'

const TECH = [
  'Java', 'Spring Boot', 'Apache Kafka', 'MongoDB', 'PostgreSQL', 'Redis',
  'AWS', 'Docker', 'Kubernetes', 'Claude AI', 'OpenAI', 'LangChain',
  'Python', 'React', 'Next.js', 'n8n', 'Zapier', 'MCP Protocol',
  'FastAPI', 'Qdrant',
]

const half = Math.floor(TECH.length / 2)
const ROW1 = TECH.slice(0, half)
const ROW2 = TECH.slice(half)

function MarqueeRow({ items, direction }) {
  return (
    <div className={`marquee marquee-${direction}`}>
      <div className="marquee-content">
        {items.map((item, i) => (
          <div className="tech-item" key={`a-${i}`}>{item}</div>
        ))}
      </div>
      <div className="marquee-content">
        {items.map((item, i) => (
          <div className="tech-item" key={`b-${i}`}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default function TechStack() {
  return (
    <section className="tech-stack" id="tech">
      <div className="watermark jetbrains" style={{ top: 0 }}>05</div>
      <div className="container relative tech-stack-header">
        <div className="section-label text-gold jetbrains">// OUR TOOLS</div>
        <h2 className="section-title bebas">WE WORK WITH THE BEST</h2>
      </div>

      <MarqueeRow items={ROW1} direction="right" />
      <MarqueeRow items={ROW2} direction="left" />
    </section>
  )
}
