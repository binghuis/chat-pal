import React, { useEffect } from 'react'
import { ThemeOptions, useSettings } from './useSettings'

const useThemeSync = () => {
  const [settings] = useSettings()

  useEffect(() => {
    const root = document.documentElement
    const theme = settings.general.theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    root.classList.remove('cdx-light', 'cdx-dark')

    if (theme === ThemeOptions.LIGHT) {
      root.classList.add('cdx-light')
    } else if (theme === ThemeOptions.DARK) {
      root.classList.add('cdx-dark')
    } else {
      if (prefersDark.matches) {
        root.classList.add('cdx-dark')
      } else {
        root.classList.add('cdx-light')
      }
    }
  }, [settings.general.theme])
}

export default useThemeSync
