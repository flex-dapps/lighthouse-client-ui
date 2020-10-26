import React, { useState, useEffect } from 'react'
import { Button, Status } from '@components'
import { ValidatorStore } from '@store'

import { ReactComponent as IconPlus } from '@assets/circle_add_outline.svg';
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';
import { ReactComponent as IconRefresh } from '@assets/refresh.svg';
import { ReactComponent as IconExternal } from '@assets/external.svg';
import { ReactComponent as IconQuestion } from '@assets/question.svg';

import ValidatorState from '../_status'

const statusMappings = {
	AWAITING_CREATION: {
		message: 'Not Created',
		icon: <Status.Dot concern/>
	},
	IS_CREATING: {
		message: 'Creating',
		icon: <IconSpinner animate='spin'/>
	},
	AWAITING_FUNDING: {
		message: 'Awaiting Deposit',
		icon: <Status.Dot concern/>
	},
	IS_FUNDING: {
		message: 'Transaction Pending',
		icon: <IconSpinner animate='spin'/>
	},
	AWAITING_ACTIVATION: {
		message: 'Created / Awaiting Activation',
		icon: <Status.Dot success/>
	},
	VALIDATING: {
		message: 'Validating',
		icon: <Status.Dot success/>
	},
	CREATING_ERROR: {
		message: 'Creation Failed',
		icon: <Status.Dot failure/>
	},
	FUNDING_ERROR: {
		message: 'Transaction Failed',
		icon: <Status.Dot failure/>
	},
	UNKNOWN: {
		message: '?',
		icon: <IconQuestion animate='spin'/>
	},
}

export const useStatus = id => {
	const [ values, setValues ] = useState({})
	const { state } = ValidatorStore()

	useEffect(() => {
		setValues(statusMappings[state.validators[id]?.status||'UNKNOWN'])
	}, [id, state.validators[id]?.status]) // eslint-disable-line

	return values
}

export const useValidator = id => {
	const [ values, setValues ] = useState({})
	const { state } = ValidatorStore()

	useEffect(() => {
		setValues(state.validators[id]||{})
	}, [state.validators[id]]) // eslint-disable-line

	return values
}

export const useActionButton = id => {
	const [ el, setEl ] = useState(null)
	const { state } = ValidatorStore()

	useEffect(() => {
		const validator = state.validators[id]
		if(!validator) return
		switch (validator.status) {
			case ValidatorState.AWAITING_CREATION:
				setEl(<Button compact onClick={() => validator.create()}> Create <IconPlus/></Button>)
				break
			case ValidatorState.IS_CREATING:
				setEl(<Button disabled compact>Creating <IconSpinner animate='spin'/></Button>)
				break
			case ValidatorState.AWAITING_FUNDING:
				setEl(<Button compact onClick={() => validator.fund()}>Deposit Stake <IconPlus/></Button>)
				break
			case ValidatorState.IS_FUNDING:
				if(!!validator.txUrl){
					setEl(<Button to={validator.txUrl} target='_blank' inline compact>View TX <IconExternal/></Button>)
				}else{
					setEl(<Button disabled compact>Funding <IconSpinner animate='spin'/></Button>)
				}
				break
			case ValidatorState.AWAITING_ACTIVATION:
				setEl(<Button to={validator.txUrl} target='_blank' inline compact>View TX <IconExternal/></Button>)
				break
			case ValidatorState.VALIDATING:
				break
			case ValidatorState.CREATING_ERROR:
				setEl(<Button compact onClick={() => validator.create()}>Try Again <IconRefresh/></Button>)
				break
			case ValidatorState.FUNDING_ERROR:
				setEl(<Button compact onClick={() => validator.fund()}>Try Again <IconRefresh/></Button>)
				break
			default: break
		}
	}, [state.validators[id]?.status, state.validators[id]?.txUrl]) // eslint-disable-line

	return el
}
