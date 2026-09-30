import { Headphones } from 'lucide-react'
import { whatsappLink } from '@/lib/whatsapp'

export function LiveSupportButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground pl-4 pr-5 py-3 text-sm font-medium shadow-lg hover:bg-primary/90 transition-colors"
    >
      <Headphones className="size-4" />
      Live support
    </a>
  )
}
