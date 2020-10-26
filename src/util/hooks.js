import { useState, useEffect } from 'react'

export const useBit = (initial=0) => {
	const [ bit, setBit ] = useState(initial)

	const flipBit = () => {
		setBit(!bit)
	}

	return [bit, flipBit]
}

export const useMounted = () => {
	const [ val, set ] = useState(false)
	useEffect(() => {
		setTimeout(() => set(true), Math.floor(Math.random() * 300) + 1)
	}, [])
	return val
}