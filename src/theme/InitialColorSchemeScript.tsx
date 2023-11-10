'use client'
import { getInitColorSchemeScript } from '@mui/material'

export const InitialColorSchemeScript = () => {
  return <head>{getInitColorSchemeScript()}</head>
}