"use client"

import { ModeToggle } from "@/components/common/mode-toggle"
import { SignOutButton } from "@/components/common/sign-out-button"
import React from "react"

export default function HomePage() {
  return (
    <div>
      <ModeToggle />
      <SignOutButton />
    </div>
  )
}
