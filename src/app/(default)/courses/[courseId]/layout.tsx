import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default async function TasksLayout({ children }: PropsWithChildren) {
  const data = await getServerSession()

  if (data?.user) {
    return <>{children}</>
  }

  redirect('/')
}
