"use client"

import React from 'react'
import Sidebar from './sidebar/sidebar'

// Simple wrapper so other code can import from `@/components/app-sidebar`
// without depending on the internal `sidebar/sidebar` path.
export default function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return <Sidebar {...props} />
}

export { AppSidebar as AppSidebar }
