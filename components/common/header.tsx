"use client"

import { Heading } from "@/components/common/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
  description: string
  buttonHref: string
  counter?: number
}

export function Header({
  title,
  description,
  buttonHref,
  counter,
}: HeaderProps) {
  const router = useRouter()

  return (
    <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-4">
      <Heading title={title} description={description} />
      <Button onClick={() => router.push(buttonHref)}>
        <Plus className="size-4 mr-2" />
        Agregar nuevo
      </Button>
    </div>
  )
}
