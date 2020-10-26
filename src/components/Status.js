import React from 'react';
import styled from 'styled-components'
import { Popover } from '@components'
import { statusColor, statusIcon } from '@app/App.status'
import { ReactComponent as IconQuestion } from '@assets/question.svg';

// can implement later
const Status = styled(({title, info, className, ...rest}) => 
	<span className={`status ${className}`}>
		<Status.Dot {...rest}/>
		<span className="status-title">{title}</span>
		{info && 
			<Popover 
				className={'status-info'}
				trigger={<IconQuestion/>}
				>
				{info}
			</Popover>
		}
	</span>
	)`
	font-size: inherit;
	display: flex;
	align-items: center;
	font-size: var(--status--title--font-size, 12px);

	
	.status-title,
	.status-info{
		margin-left: 0.5em;
	}

	.status-title{
		text-transform: titlecase;
	}

	.status-info{
		font-size: 0.8em;
		color: grey;
	}

	& + .status{
		margin-top: 0.75em;
	}
`

Status.Icon = styled(
	({status, className, ...props}) => statusIcon(status, {className: `status-icon ${className}`, ...props})
	)`
		width: 1em;
		height: 1em;
		${({status}) => statusColor('color', status)}
	`

Status.Dot = styled(({className}) => <span className={`status-dot ${className}`}/>)`
	display: inline-block;
	width: 1em;
	height: 1em;
	border-radius: 50%;
	
	${({status}) => statusColor('background', status)}

	${({lifted}) => !!lifted && `
		border: 2px solid var(--color-light);
		box-shadow: inset 0.2em 0.4em 0.4em rgba(0, 0, 0, 0.25), 0.2em 0.4em 0.4em rgba(0, 0, 0, 0.15);
		width: calc(1em + 4px);
		height: calc(1em + 4px);
	`}

	${({large}) => !!large && `
		width: 2em;
		height: 2em;
	`}
`

export default Status