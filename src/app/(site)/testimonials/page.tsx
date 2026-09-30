import { getAllTestimonials } from '@/lib/testimonials'
import { TestimonialGrid } from '@/components/testimonials-section'

export const metadata = { title: 'Testimonials | Jaycey Peptides' }
export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getAllTestimonials>> = []
  try {
    testimonials = await getAllTestimonials()
  } catch {
    // Testimonials table not migrated yet — render the empty state below.
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="font-heading text-4xl font-bold mb-2">What Our Customers Say</h1>
        <p className="text-muted-foreground">Real feedback from buyers and distributors.</p>
      </div>
      {testimonials.length === 0 ? (
        <p className="text-center text-muted-foreground">No testimonials yet — check back soon.</p>
      ) : (
        <TestimonialGrid testimonials={testimonials} />
      )}
    </div>
  )
}
