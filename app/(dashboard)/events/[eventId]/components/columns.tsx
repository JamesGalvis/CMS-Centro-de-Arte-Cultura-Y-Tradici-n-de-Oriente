"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type EventCommentsColumn = {
  id: string
  name: string
  comment: string
}

export const columns: ColumnDef<EventCommentsColumn>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "comment",
    header: "Comentario",
  },
  {
    id: "actions",
    // cell: ({ row }) => <CellAction eventData={row.original} />,
    cell: ({ row }) => <></>,
  },
]
