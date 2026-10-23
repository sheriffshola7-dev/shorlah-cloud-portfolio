import { useEffect } from 'react';

export default function PlaceholderPage({ title, note, phase }) {
  useEffect(() => { document.title = `${title} | Shorlah Cloud`; }, [title]);
  return (
    <div className="container">
      <h1 className="page-title">{title}</h1>
      <p className="page-note">{note}</p>
      <span className="badge">Placeholder, built in {phase}</span>
    </div>
  );
}
