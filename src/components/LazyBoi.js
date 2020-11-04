import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ReactComponent as IconSpinner } from '@assets/spinner_75.svg';
import { ReactComponent as IconQuestion } from '@assets/question.svg';

const Loader = styled(
	({icon, className}) => {
		const [ _icon, _setIcon ] = useState(icon || <IconSpinner animate='spin'/>)

		useEffect(() => {
			setTimeout(() => {
				_setIcon && _setIcon(<IconQuestion className='-not-found'/>)
			}, 4000)
		}, [])

		return <span className={`lazyboi ${className}`}>{_icon}</span>
	})`
	@keyframes pulse {
	    0% {opacity:0.05}
	    50% {opacity:0.15}
	    100% {opacity:0.05}
	}

	>svg{
		opacity: 0.3;
		width: 0.8em;
		height: 0.8em;
		display: block;

		&.-not-found{
			opacity: 0.2
		}
	}
	`

const Value = styled(
	({prefix, suffix, value, ...props}) => 
		<span {...props}>
			{prefix && <span className='-prefix'>{prefix}</span>}
			{value}
			{suffix && <span className='-suffix'>{suffix}</span>}
		</span>
	)`
	display: flex;
	white-space: pre;
	.-prefix{ margin-right: ${({tight}) => !!tight ? 1 : 0.3}em }
	.-suffix{ margin-left: ${({tight}) => !!tight ? 1 : 0.3}em }
	`

const LazyBoi = props => (props.value !== null && props.value !== undefined) ? <Value {...props}/> : <Loader icon={props.loadingIcon}/>



export default LazyBoi