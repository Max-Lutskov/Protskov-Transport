import { materials, trucks } from '~/data/site'

/** Відкриття калькулятора з будь-якого місця сторінки */
export function useCalculator() {
  const open = useState('calculator-open', () => false)
  const materialId = useState<string>('calculator-material', () => materials[0]!.id)

  function openFor(id?: string) {
    if (id) materialId.value = id
    open.value = true
  }

  return { open, materialId, openFor }
}

export interface TruckPlan {
  name: string
  trips: number
  capacity: number
}

/** Підбір машини під вагу: одна машина, якщо влазить, інакше рейси найбільшою */
export function planTrucks(tonnes: number): TruckPlan {
  const sorted = [...trucks].sort((a, b) => a.capacity - b.capacity)
  const fit = sorted.find(t => t.capacity >= tonnes)
  if (fit) return { name: fit.name, trips: 1, capacity: fit.capacity }
  const biggest = sorted[sorted.length - 1]!
  return { name: biggest.name, trips: Math.ceil(tonnes / biggest.capacity), capacity: biggest.capacity }
}

export function findMaterial(id: string) {
  return materials.find(m => m.id === id)
}

export const formatNumber = (n: number, digits = 1) =>
  new Intl.NumberFormat('uk-UA', { maximumFractionDigits: digits }).format(n)
