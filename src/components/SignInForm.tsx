'use client';
import { signInSchema } from '@/schema';
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
import { useSearchParams } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useBoolean, useUpdateEffect } from 'usehooks-ts';

export type TSignInForm = {};

export function SignInForm({}: TSignInForm) {
  const searchParams = useSearchParams();
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
  const callbackUrl = searchParams.get('callbackUrl') ?? '/courses';

  const { toggle: togglePasswordVisibility, value: isPasswordVisible } =
    useBoolean();

  useUpdateEffect(() => {
    if (searchParams.get('error') === 'CredentialsSignin') {
      enqueueSnackbar({
        variant: 'error',
        message: <Typography>Неверные данные учетной записи</Typography>,
        preventDuplicate: true,
        key: 'auth_error',
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
          signIn('credentials', {
            ...data,
            callbackUrl,
          }),
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
                  onClick={togglePasswordVisibility}
                  sx={{ cursor: 'pointer' }}>
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
