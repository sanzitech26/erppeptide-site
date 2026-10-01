'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Heart, FlaskConical, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'
import type { Product } from '@/lib/products'

export function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          setLiked((l) => !l)
        }}
        aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute top-3 right-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition-colors hover:bg-white"
      >
        <Heart className={cn('size-4 transition-colors', liked ? 'fill-primary text-primary' : 'text-muted-foreground')} />
      </button>

      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-gradient-to-b from-muted/40 to-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-3 left-3">
              Out of stock
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-5 pt-3 pb-5">
          <div className="flex items-center gap-3 text-[11px] font-medium text-muted-foreground">
            <span className="flex items-center gap-1">
              <FlaskConical className="size-3.5 text-primary" />
              Research Grade
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-primary" />
              Purity Tested
            </span>
          </div>

          <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
            {product.name}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90">
              View options
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}
