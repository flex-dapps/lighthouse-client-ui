import React from 'react'
import styled from 'styled-components'
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';

const Loader = styled(
	({icon, className}) => {
		return <span className={`lazyboi ${className}`}>{icon || <IconSpinner animate='spin'/>}</span>
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