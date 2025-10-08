'use server'

import axios from 'axios'

interface FetchResult {
  products: any[]
}

export async function fetchFoodData(codes: string) : Promise<FetchResult> {
  try {
    const url = 'https://world.openfoodfacts.org/api/v2/search'
    const params = {
      code: codes,
      fields: 'code,product_name,image_url,nutriments.energy'
    }
    const { data } = await axios.get(url, { params, timeout: 8000 })
    return { products: data?.products || [] }
  } catch (error: any) {
    console.error('Erreur axios fetchFoodData:', error?.message || error)
    throw new Error('Failed to fetch food data')
  }
}

