"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { AlertModal } from "@/components/common/alert-modal"
import { toast } from "sonner"
import { EventsColumn } from "./columns"
import { deleteEvent, getEventById } from "@/actions/event"
import { Event } from "@prisma/client"

interface CellActionProps {
  eventData: EventsColumn
}

export function CellAction({ eventData }: CellActionProps) {
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, startTransition] = useTransition()
  const [event, setEvent] = useState<Event | null>(null)


  return (
    <>
      <AlertModal
        isLoading={isLoading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  )
}
