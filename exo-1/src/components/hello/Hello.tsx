import { useState } from "react";

export function FilteredList() {
  const items = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}`);
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrer..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {filtered.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
