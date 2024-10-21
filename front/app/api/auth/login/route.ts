
import { cookies } from 'next/headers'
import { IAuthInfo } from '@/interfaces/IAuthInfo'
import { NextRequest } from 'next/server';
import { IUserCredentials } from '@/interfaces/IUserCredentials';


export async function POST(req: NextRequest,) {

    const user: IUserCredentials = await req.json()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            "Content-type": "application/json",
        },
        credentials: "include",
    })
    if (res?.status === 401 || res?.status === 406) {
        return new Response("UnAthorized", {
            status: res?.status,

        })
    }
    else if (res?.status === 201) {
        const { token }: { token: string } = await res?.json()
        cookies().set('auth-info', JSON.stringify({
            isAuth: true,
            token: token,
        }), { maxAge: 1000 * 60 })
        return new Response("Created", {
            status: res.status,
            headers: { 'Set-Cookie': res.headers.get('Set-Cookie') || '' }
        })
    }

    return new Response("Something went wrong", { status: 500 })

}