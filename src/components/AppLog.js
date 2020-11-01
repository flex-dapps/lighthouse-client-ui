import React from 'react';
import styled from 'styled-components'
import moment from 'moment'
import { LogStore } from '@store'

import { ReactComponent as IconProcessing } from '@assets/spinner_75.svg';
import { ReactComponent as IconCheck } from '@assets/check.svg';
import { ReactComponent as IconWrong } from '@assets/wrong.svg';

const iconTypes = {
	PROCESSING: <IconProcessing animate='spin'/>,
	SUCCESS: <IconCheck/>,
	WARNING: <IconWrong/>,
	ERROR: <IconWrong/>
}

const LogItem = styled(
	({type='PROCESSING', timestamp, message, className}) => 
		<span 
			data-type={type}
			className={`applog-item ${className}`}
			>
			{console.log(type)}
			<span className="timestamp">{iconTypes[type]}{moment.unix(timestamp).format('HH:mm:ss')}: </span>
			<span className="message">{message}</span>
		</span>
	)`

	display: flex;
	align-items: center;
	line-height: 1em;
	margin: 0.2em 0;
	text-transform: uppercase;
	font-size: var(--font-size-xsmall);
	font-weight: 700;
	opacity: 0.3;
	letter-spacing: 0.075em;
	vertical-align: baseline;

	.timestamp{
		display: flex;
		align-items: center;
		justify-content: flex-start;

		>svg{
			margin-right: 0.3em;
			opacity: 0.5;
		}
	}

	.message{
		color: var(--log--item--color);
		margin-left: 0.3em;
	}

	.-cursor{
		margin-left: 0.4em;
	}
	
	&[data-type='SUCCESS']{ color: var(--log--item--color-success, green)}
	&[data-type='WARNING']{ color: var(--log--item--color-warning, orange)}
	&[data-type='ERROR']{ color: var(--log--item--color-error, red)}
	`

const Cursor = styled(
	({className}) => <span className={className}/>
	)`
	display: inline-block;
	width: 0.6em;
	height: 1em;
	line-height: inherit;
	background: currentColor;
	animation-name: blink;
	animation-duration: 1s;
	animation-iteration-count: infinite;

	@keyframes blink {
	  0% {opacity: 0.4;}
	  49% {opacity: 0.4;}
	  50% {opacity: 0;}
	  100% {opacity: 0;}
	}
	`

export default styled(
	({count=6, className}) => {
		const { state } = LogStore()

		return <div className={`applog ${className}`}>
			{
				[...state.items.slice(0, count)]
					.reverse()
					.map((item, i) => <LogItem key={i} {...item}/>)
			}
			<Cursor className='-cursor'/>
		</div>
	})`
	
	.applog-item .timestamp >svg {
		display: ${({icons}) => !!icons ? 'block' : 'none'}
	}

	.applog-item {
		color: ${({colors}) => !colors && 'var(--log--item--color);'}
	}

	
	`