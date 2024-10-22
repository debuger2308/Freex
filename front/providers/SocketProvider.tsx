'use client'
import { getAuthInfo } from '@/functions/api/api';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
    session: { isAuth: boolean, token: string } | null
    newSocket: Socket | null
}


export const SocketProvider = ({ children, session, newSocket }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (newSocket) {
            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }

    }, [session, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);

    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return context.socket;
};