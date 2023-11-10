'use client';

import { signInSchema } from '@/schema';
import { TPage } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AccountCircle,
  Key,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';
import { enqueueSnackbar } from 'notistack';

export default function SignInPage({ searchParams }: TPage) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });
  const { toggle: togglePasswordVisibility, value: isPasswordVisible } =
    useBoolean();
  useEffect(() => {
    if (searchParams.error === 'CredentialsSignin') {
      enqueueSnackbar({
        variant: 'error',
        message: 'Неверные данные учетной записи',
      });
    }
  }, [searchParams]);
  return (
    <Box
      sx={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Box
        component={'form'}
        onSubmit={handleSubmit((data) =>
          signIn('credentials', { ...data, callbackUrl: '/profile' }),
        )}
        sx={{
          width: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          px: '1rem',
        }}>
        <Typography variant="h5">Вход в учетную запись</Typography>

        <Box>
          <TextField
            {...register('identifier')}
            label="Имя пользователя"
            helperText={errors.identifier && errors.identifier.message}
            error={Boolean(errors.identifier)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{ width: '100%' }}
          />
        </Box>

        <Box>
          <TextField
            {...register('password')}
            label="Пароль"
            helperText={errors.password && errors.password.message}
            error={Boolean(errors.password)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            }}
            type={isPasswordVisible ? 'text' : 'password'}
            sx={{ width: '100%' }}
          />
        </Box>

        <Button type="submit" sx={{ width: '100%' }} variant="contained">
          Войти
        </Button>
      </Box>
    </Box>
  );
}
