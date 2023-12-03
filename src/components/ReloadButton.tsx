'use client';
import { Replay } from '@mui/icons-material';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { revalidateTag } from 'next/cache';

export type TReloadButton = {
  tooltip: string;
  reloadTag: string;
  sx: IconButtonProps['sx'];
};

export function ReloadButton({ tooltip, reloadTag, sx }: TReloadButton) {
  return (
    <Tooltip title={tooltip}>
      <IconButton sx={sx} onClick={() => revalidateTag(reloadTag)}>
        <Replay />
      </IconButton>
    </Tooltip>
  );
}
