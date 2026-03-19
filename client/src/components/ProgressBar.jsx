export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`progress-step${i < current - 1 ? ' completed' : ''}${i === current - 1 ? ' active' : ''}`}
        />
      ))}
      <span className="progress-label">{current} / {total}</span>
    </div>
  )
}
