import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'

export type Variant = {
  sku: string
  label: string
  price: number
  inStock: boolean
}

export type Product = {
  id: number
  slug: string
  name: string
  description: string
  sku: string
  price: number
  currency: string
  inStock: boolean
  image: string | null
  categoryIds: number[]
  variants: Variant[]
}

export type Category = {
  id: number
  name: string
  slug: string
  productIds: number[]
}

const products = productsData as Product[]
const categories = categoriesData as Category[]

export function getAllProducts() {
  return products
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getAllCategories() {
  return categories
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getProductsByCategoryId(categoryId: number) {
  return products.filter((p) => p.categoryIds.includes(categoryId))
}

export function getFeaturedProducts(count: number) {
  return products.slice(0, count)
}
