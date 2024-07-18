import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = cookies().get('admin')
  console.log(session)
  if (!session) {
    return redirect('/login')
  } else {
    return <>{children}</>
  }
}
