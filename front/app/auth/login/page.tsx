"use client"
import Link from 'next/link';
import './auth.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IUserCredentials } from '@/interfaces/IUserCredentials';


const Auth = () => {


    async function nextApiLogin(user: IUserCredentials) {
        const nextApiResponse = await fetch('/api/auth/login', {
            body: JSON.stringify(user),
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            credentials: 'include',
        })
        return nextApiResponse
    }

    const [authErrors, setAuthErros] = useState('')
    const [isDataLoading, setIsDataLoading] = useState(false)

    const router = useRouter()

    return (
        <main className="auth">

            <div className="auth__container">
                <div className="auth__content">
                    <h1 className='auth__title'>Freex</h1>
                    <div className="auth__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quam sapiente. Tempora quas natus pariatur deserunt esse vero nesciunt numquam?</div>
                </div>

                <form

                    action={async (formData) => {
                        setAuthErros('')
                        setIsDataLoading(true)
                        const user = {
                            nickname: String(formData.get('nickname')),
                            password: String(formData.get('password'))
                        }
                        const res = await nextApiLogin(user)

                        if (res?.status === 401 || res?.status === 406) {
                            setAuthErros('Wrong nickname or password')
                        }
                        else if (res?.status === 201) {
                            router.refresh()
                        }
                        setIsDataLoading(false)
                    }}
                    className="auth__form"
                >

                    <div className="input-field">
                        <input
                            onChange={() => {
                                setAuthErros('')
                            }}
                            type="text"
                            id='nickname'
                            name="nickname"
                            className='input'
                            placeholder=' '
                            required />
                        <label htmlFor="nickname" className="input-label">Nickname</label>
                    </div>
                    <div className="input-field">
                        <input
                            onChange={() => {
                                setAuthErros('')
                            }}
                            type="password"
                            id='password'
                            name="password"
                            placeholder=' '
                            className='input'
                            required />
                        <label htmlFor="password" className="input-label">Password</label>
                    </div>

                    <div className="auth__errors">
                        <strong className='auth__error'>{authErrors}</strong>
                    </div>

                    <button
                        type="submit"
                        className="auth__submit-btn"
                        disabled={isDataLoading}
                    >
                        Log In
                    </button>
                    <Link href="/reset-password" className='auth__link-reset-pass'>
                        Forgot password?
                    </Link>

                    <hr className='auth__decoration-line' />

                    <Link href="/auth/registration" className='auth__link-create-user'>
                        Create new account
                    </Link>
                </form>


            </div>

        </main>
    );
}

export default Auth;