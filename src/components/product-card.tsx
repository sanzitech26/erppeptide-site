import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="h-full overflow-hidden pt-0 gap-3 transition-shadow hover:shadow-lg">
        <div className="relative aspect-square bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Out of stock
            </Badge>
          )}
        </div>
        <CardContent>
          <h3 className="font-heading text-base font-semibold leading-snug">
            {product.name}
          </h3>
        </CardContent>
        <CardFooter>
          <span className="text-lg font-semibold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
