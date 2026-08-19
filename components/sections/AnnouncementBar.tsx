import { Container } from '@/components/ui/Container'
import { ANNOUNCEMENT_BAR_COPY } from '@/content/copy'

export function AnnouncementBar() {
  return (
    <div className="bg-roxo-800 py-2.5">
      <Container>
        <p className="text-center font-sans text-xs font-semibold text-roxo-100 sm:text-sm">
          {ANNOUNCEMENT_BAR_COPY}
        </p>
      </Container>
    </div>
  )
}
