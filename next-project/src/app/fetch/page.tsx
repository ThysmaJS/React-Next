'use client'

import { useState } from 'react'
import { fetchFoodData } from '../external/fetch'
import Image from 'next/image'

interface Product {
  code: string
  product_name?: string
  image_url?: string
  nutriments?: { energy?: number }
}

export default function FoodPage() {
  const codes = '3263859883713,8437011606013,6111069000451'
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFetch = async () => {
    setError(null)
    setLoading(true)
    try {
      const { products } = await fetchFoodData(codes)
      setProducts(products)
    } catch {
      setError('Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Produits</h1>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? 'Chargement...' : 'Charger'}
      </button>
      {error && <p>{error}</p>}
      <ul>
        {products.map(p => (
          <li key={p.code}>
            {p.product_name || 'Sans nom'} - {p.nutriments?.energy ? p.nutriments.energy + ' kJ' : 'N/A'}
            {p.image_url && (
              <div style={{ marginTop: 4 }}>
                <Image
                  src={p.image_url}
                  alt={p.product_name || 'Produit'}
                  width={120}
                  height={120}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}