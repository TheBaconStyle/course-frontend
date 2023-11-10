'use client'
import { DarkMode, LightMode, SettingsBrightness } from '@mui/icons-material'
import {
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useColorScheme,
} from '@mui/material'
import { useRef } from 'react'
import { useBoolean, useIsClient } from 'usehooks-ts'

const modeItems = [
  { key: 'light', value: 'Светлая' },
  { key: 'system', value: 'Как в системе' },
  { key: 'dark', value: 'Темная' },
]

export function ThemeSwitch() {
  const { mode, setMode } = useColorScheme()
  const isClient = useIsClient()
  const rootRef = useRef(null)
  const { value: isMenuOpen, toggle: toggleMenu } = useBoolean()
  return (
    <>
      <Tooltip title="Тема оформления">
        <IconButton
          sx={{ color: 'inherit' }}
          onClick={toggleMenu}
          ref={rootRef}
        >
          {isClient && (
            <>
              {mode === 'light' && <LightMode />}
              {mode === 'dark' && <DarkMode />}
              {mode === 'system' && <SettingsBrightness />}
            </>
          )}
          {!isClient && <CircularProgress color="inherit" size={30} />}
        </IconButton>
      </Tooltip>

      <Menu anchorEl={rootRef.current} open={isMenuOpen} onClose={toggleMenu}>
        {modeItems.map((modeItem) => (
          <MenuItem
            selected={mode === modeItem.key}
            onClick={() => {
              setMode(modeItem.key as Exclude<typeof mode, undefined>)
              toggleMenu()
            }}
            key={modeItem.key}
          >
            {modeItem.key === 'light' && <LightMode />}
            {modeItem.key === 'dark' && <DarkMode />}
            {modeItem.key === 'system' && <SettingsBrightness />}
            &nbsp;{modeItem.value}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
