import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { injected } from '../hooks'
import { useWeb3React } from '@web3-react/core';

export const MetaMaskContext = React.createContext(null)

export const MetaMaskProvider = ({ children }) => {

    const { activate, account, library, connector, active, deactivate } = useWeb3React()
    const [isActive, setIsActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Init Loading
    const handleIsActive = useCallback(() => {
        setIsActive(active)
    }, [active])

    useEffect(() => {
        handleIsActive()
    }, [handleIsActive])

    // Connect to MetaMask wallet
    const connect = async () => {
        console.log('Connecting to MetaMask Wallet')
        try {
            await activate(injected)
            setIsActive(true)
            window.location.reload();
        } catch(error) {
            console.log('Error on connecting: ', error)
        }
    }
    const connect_no_refresh = async () => {
        console.log('Connecting to MetaMask Wallet')
        try {
            await activate(injected)
            setIsActive(true)
        } catch(error) {
            console.log('Error on connecting: ', error)
        }
    }

    const values = useMemo(
        () => ({
            isActive,
            account,
            isLoading,
            connect,
            connect_no_refresh
        }),
        [isActive, isLoading]
    )
    return <MetaMaskContext.Provider value={values}>{children}</MetaMaskContext.Provider>
}

export default function metaMask() {
    const context = React.useContext(MetaMaskContext)
    if (context === undefined) {
        throw new Error('metaMask hook must be used with a MetaMaskProvider component')
    }
    return context
}
