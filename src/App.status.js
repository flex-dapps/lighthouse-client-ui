import React from 'react';
import { find } from 'lodash'

import { ReactComponent as IconQuestion } from '@assets/question.svg';
import { ReactComponent as IconCheck } from '@assets/check.svg';
import { ReactComponent as IconWrong } from '@assets/wrong.svg';
import { ReactComponent as IconSpinner } from '@assets/spinner_75.svg';

const statusMappings = [
	{
		options: ['success', 'ok', 'connected'],
		color: 'var(--color-status-success, green)',
		contrastColor: 'var(--color-status-dark, black)',
		icon: <IconCheck/>
	},
	{
		options: ['concern', 'warning', 'connecting', 'processing'],
		color: 'var(--color-status-concern, orange)',
		contrastColor: 'var(--color-status-dark, black)',
		icon: <IconCheck/>
	},
	{
		options: ['failure', 'error'],
		color: 'var(--color-status-failure, red)',
		contrastColor: 'var(--color-status-dark, black)',
		icon: <IconWrong/>
	},
	{
		options: ['disconnected'],
		color: 'var(--color-grey-100, grey)',
		contrastColor: 'var(--color-status-dark, black)',
		icon: <IconWrong/>
	},
	{
		options: ['initialized', 'loading', 'disconnected'],
		color: 'var(--color-grey-100, grey)',
		contrastColor: 'var(--color-status-dark, black)',
		icon: <IconSpinner/>
	},
	{
		options: ['gradient'],
		color: 'var(--color-gradient-purp)',
		contrastColor: 'var(--color-status-light, white)',
		icon: null
	},
	{
		options: ['neutral', 'default'],
		color: 'var(--color-status-neutral, lightblue)',
		contrastColor: 'var(--color-status-light, white)',
		icon: <IconQuestion/>
	}
]

/*
	status options for styled components
	pass in property & status to return the status color

	eg: ${({status}) => statusColor('color', status)}
*/
export const statusColor = (property='color', status) => {
	const mapping = find(statusMappings, ({options}) => options.includes(status?.toLowerCase()));

	if(property === 'background'){
		return mapping?.color && `
			${property}: ${mapping?.color};
			color: ${mapping?.contrastColor};
		`
	}else{
		return mapping?.color && `${property}: ${mapping?.color};`
	}
	
}

/*
	icon options for react 
	pass in status to return the status icon

	eg: const icons = statusColor(status)
*/
export const statusIcon = (status='default', props={}) => {
	const mapping = find(statusMappings, ({options}) => options.includes(status.toLowerCase()));
	return mapping?.icon
		? React.cloneElement(mapping?.icon, props)
		: null
}