import { ThemeProvider } from '@/components/providers/ThemeProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import './reset.css'
import './global.css'
import { ColorTheme } from '@/providers/ColorTheme'
import Header from '@/components/header/Header'
import { cookies } from 'next/headers'
import { SocketProvider } from '@/providers/SocketProvider'
import { IAuthInfo } from '@/interfaces/IAuthInfo'
import { refreshToken } from '@/functions/api/api'
import { usePathname } from 'next/navigation'
import { io } from 'socket.io-client'



export const dynamic = 'force-dynamic'
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
	title: 'Freex',
	description: 'Dating platform',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	const cookie = cookies().get('auth-info') || null
	const session: IAuthInfo | null = JSON.parse(cookie?.value || '{}') || null
	const newSocket = io(process.env.NEXT_PUBLIC_API_URL || '');

	return (
		<html lang="en">
			<body className={inter.className}>
				<ColorTheme>
					<SocketProvider session={session} newSocket={newSocket}>
						<div className="wrapper">
							<Header session={session} />
							{children}
							<Footer />
						</div>
					</SocketProvider>
				</ColorTheme>
			</body>
		</html>
	)
}
