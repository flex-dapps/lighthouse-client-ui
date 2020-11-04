import React from 'react';
import styled from 'styled-components'
import { findIndex } from 'lodash'
import { ReactComponent as IconCheck } from '@assets/check.svg';
import { ReactComponent as IconSpinner } from '@assets/spinner_75.svg';

const Status = {
	INCOMPLETE: 'INCOMPLETE',
	CURRENT: 'CURRENT',
	COMPLETE: 'COMPLETE',
}

const routes = [
	{
		title: '1. Understand Duties',
		match: ['/onboarding/duties']
	},
	{
		title: '2. Validator Setup',
		match: ['/onboarding/validators']
	},
	{
		title: '3. Generate Mnemonic',
		match: [
			'/onboarding/mnemonic',
			'/onboarding/mnemonic/confirm'
		]
	},
	{
		title: '4. Confirm Settings',
		match: ['/onboarding/confirm']
	},
	{
		title: '5. Deposit Eth',
		match: ['/onboarding/funding']
	}
]

const ProgressItem =  styled(
	({title, status=Status.INCOMPLETE, className, ...rest}) => {
		return <div className={`progress-item ${className}`} {...rest} data-status={status}>
			<div className="-left">
				{
					status === Status.CURRENT
						? <IconSpinner className='-status-icon' animate={'spin-slow'}/>
						: <IconCheck className='-status-icon'/>
				}
				
			</div>
			<div className="-right">
				<div className="-title">{title}</div>
				<div className="-status">{status === Status.COMPLETE ? 'Action Complete' : status === Status.INCOMPLETE ? 'Action Incomplete' : 'Current Step'}</div>
			</div>
		</div>
	})`
		display: flex;
		align-items: center;
		position: relative;
		
		height: 100%;
		background: var(--color-grey-50);
		border-left: 1px solid var(--color-grey-100);

		>*{
		}

		>.-left{
			padding: 0.8rem 0.7rem 1.2rem 1.6rem;
		}

		>.-right{
			padding: 0.8rem 2.4rem 1.2rem 0.7rem;
			
			.-title,
			.-status{
				font-size: var(--font-size-xsmall);
				text-transform: uppercase;
				font-weight: 600;
				line-height: 1.3em;
			}

			.-status{
				opacity: 0.2;
			}
		}

		.-status-icon{
			font-size: 1.6em;
			color: var(--color-primary-2)
		}

		&[data-status='INCOMPLETE']{
			>*{
				filter: grayscale(70%);
				opacity: 0.5;
			}

			.-status-icon{
				color: var(--color-grey-300)
			}
		}
	`

const ProgressLine =  styled(
	({total=1, value=0, className, ...rest}) => {
		return <div className={`progress-line ${className}`}>
			<div className="-progress"/>
			<div className="-current"/>
		</div>
	})`
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 4px;
		background: var(--color-grey-200);

		.-progress{
			position: absolute;
			top: 0;
			left: 0;
			width: ${({total=1, value=0}) => 100/total*value}%;
			height: 5px;
			background: var(--color-gradient-purp-horizontal);
			transition: width 1s ease-in-out;
		}

		.-current{
			position: absolute;
			top: 0;
			left: 0;
			width: ${({total=1, value=0}) => 100/total*(value+1)}%;
			height: 5px;
			background: var(--color-primary-3);
			opacity: 0.3;
			transition: width 0.65s ease-out;
		}
	`

export default styled(
	({route, ...rest}) => {
		return <section {...rest}>
			<span className='-title'>
				Validator<br/>Setup &mdash;
			</span>
			<span className='-progress'>
				{routes.map((_route, i) => {
					const currentRouteIndex = findIndex(routes, r => r.match.includes(route));
					return <ProgressItem 
						key={i}
						status={
							_route.match.includes(route) 
								? Status.CURRENT 
								: i > currentRouteIndex 
									? Status.INCOMPLETE
									: Status.COMPLETE
						} 
						title={_route.title}
					/>
				})}
				<ProgressLine total={routes.length} value={findIndex(routes, r => r.match.includes(route))}/>
			</span>
			<span className='-percent'>
				{(100/routes.length*findIndex(routes, r => r.match.includes(route))).toFixed(0)}%
			</span>
		</section>
	})`
	display: flex;
	align-items: center;
	width: 100%;

	>.-title,
	>.-percent{
		margin: 0;
		display: block;
		color: var(--color-grey-400);
		line-height: 1.1em;
		text-transform: uppercase;
		width: 10%;
	}

	>.-title{
		font-size: var(--font-size-small);
		padding: 0 6rem 0 2rem;
	}

	>.-percent{
		font-size: var(--font-size-xlarge);
		font-weight: 600;
		padding: 0 2rem;
		text-align: right;
		color: var(--color-grey-200);
	}

	>.-progress{
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		width: 100%;
		overflow: hidden;

		.progress-item{
			border-left: 1px solid var(--color-grey-100);
			width: 20%;

		}
	}



	`