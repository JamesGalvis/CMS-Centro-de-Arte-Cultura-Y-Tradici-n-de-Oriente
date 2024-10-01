import { db } from "@/lib/db"
import { EventForm } from "../components/event-form"

export default async function EventPage({ params }: { params: { eventId: string } }) {
  const { eventId } = params

  const event = await db.event.findUnique({
    where: { id: eventId }
  })

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4">
        <EventForm initialData={event} />
      </div>
    </div>
  )
}
