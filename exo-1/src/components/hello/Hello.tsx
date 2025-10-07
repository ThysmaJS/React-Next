import { useState, useEffect } from "react";

export function FilteredList() {
  const items = Array.from({ length: 2000 }, (_, i) => `Item ${i + 1}`);
  const [query, setQuery] = useState("");
  
  // États pour l'auto-incrémentation
  const [counter, setCounter] = useState(0);
  const [isAutoIncrement, setIsAutoIncrement] = useState(false);
  const [frequency, setFrequency] = useState(1000); // en millisecondes
  
  // État pour limiter l'affichage
  const [maxItems, setMaxItems] = useState(50);

  // Auto-incrémentation
  useEffect(() => {
    if (!isAutoIncrement) return;
    
    const interval = setInterval(() => {
      setCounter(prev => prev + 1);
    }, frequency);
    
    return () => clearInterval(interval);
  }, [isAutoIncrement, frequency]);

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Limiter le nombre d'éléments affichés
  const displayedItems = filtered.slice(0, maxItems);

  return (
    <div>
      {/* SECTION 1: COMPTEUR */}
      <h2>Compteur</h2>
      <p>Valeur actuelle : {counter}</p>
      <button onClick={() => setCounter(prev => prev + 1)}>+1</button>
      <button onClick={() => setCounter(prev => prev - 1)}>-1</button>
      <button onClick={() => setCounter(0)}>Reset</button>
      
      <br /><br />
      
      <label>
        <input
          type="checkbox"
          checked={isAutoIncrement}
          onChange={(e) => setIsAutoIncrement(e.target.checked)}
        />
        Auto-incrément
      </label>
      
      <br />
      
      <label>
        Fréquence:
        <select 
          value={frequency} 
          onChange={(e) => setFrequency(Number(e.target.value))}
          disabled={!isAutoIncrement}
        >
          <option value={100}>Très rapide (0.1s)</option>
          <option value={500}>Rapide (0.5s)</option>
          <option value={1000}>Normal (1s)</option>
          <option value={2000}>Lent (2s)</option>
          <option value={5000}>Très lent (5s)</option>
        </select>
      </label>

      <hr />

      {/* SECTION 2: CONTRÔLES DE LA LISTE */}
      <h2>Contrôles de la liste</h2>
      <input
        type="text"
        placeholder="Filtrer..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <br /><br />
      
      <label>
        Afficher maximum:
        <select 
          value={maxItems} 
          onChange={(e) => setMaxItems(Number(e.target.value))}
        >
          <option value={10}>10 éléments</option>
          <option value={25}>25 éléments</option>
          <option value={50}>50 éléments</option>
          <option value={100}>100 éléments</option>
          <option value={200}>200 éléments</option>
        </select>
      </label>
      
      <p>
        Affichage de {displayedItems.length} éléments sur {filtered.length} résultats
        {filtered.length > maxItems && " (liste limitée)"}
      </p>

      <hr />

      {/* SECTION 3: LISTE DES ÉLÉMENTS */}
      <h2>Liste des éléments</h2>
      
      {displayedItems.length === 0 ? (
        <p>Aucun résultat trouvé</p>
      ) : (
        <ul>
          {displayedItems.map((item, index) => (
            <li key={index}>
              {item} {index === 0 && counter > 0 && `(Compteur: ${counter})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
