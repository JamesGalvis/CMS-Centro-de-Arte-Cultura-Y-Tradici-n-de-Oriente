"use client"

import { Heading } from "@/components/common/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header({ counter }: { counter: number }) {
  const router = useRouter()

  return (
    <div className="flex max-sm:flex-col sm:items-center sm:justify-between gap-4">
      <Heading
        title={`Carteles Publicitarios (${counter})`}
        description="Modifica el contenido que aparecerá en el slider del encabezado"
      />
      <Button onClick={() => router.push("/billboards/new")}>
        <Plus className="size-4 mr-2" />
        Agregar nuevo
      </Button>
    </div>
  )
}
