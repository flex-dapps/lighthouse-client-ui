import React from 'react';
import styled from 'styled-components'
import moment from 'moment'
import { LogStore } from '@store'

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
	  0% {opacity: 0.6;}
	  49% {opacity: 0.6;}
	  50% {opacity: 0;}
	  100% {opacity: 0;}
	}
	`

export default styled(
	({className}) => {
		const { state } = LogStore()

		return <div className={className}>
			{[...state.items.slice(0, 6)].reverse().map(({timestamp, message, type}, i) => 
				<span 
				key={i} 
				data-type={type}
				>
					<span className="timestamp">{moment.unix(timestamp).format('HH:mm:ss')}: </span>
					<span className="message">{message}</span>
				</span>
			)}
			<Cursor className='-cursor'/>
		</div>
	})`
	font-size: 0.9rem;
	
	>span{
		display: block;
		line-height: 1em;
		margin: 0.2em 0;
		text-transform: uppercase;
		font-size: var(--font-size-xsmall);
		font-weight: 700;
		opacity: 0.3;
		letter-spacing: 0.075em;
		vertical-align: baseline;

		.message{
			color: var(--log--item--color)
		}

		.-cursor{
			margin-left: 0.4em;
		}

		&[data-type='SUCCESS']{
			.message{
				color: var(--log--item--color-success, green)
			}
		}

		&[data-type='WARNING']{
			.message{
				color: var(--log--item--color-warning, orange)
			}
		}

		&[data-type='ERROR']{
			.message{
				color: var(--log--item--color-error, red)
			}
		}
	}
	
	`