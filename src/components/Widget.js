import React from 'react';
import styled from 'styled-components'
import { Popover, Pill } from '@components'
import { ReactComponent as IconQuestion } from '@assets/question.svg';
import { useMounted } from '@util/hooks'

const Widget = styled(
	({title, value, info, extra, background, disabled, className}) => {
		const mounted = useMounted()

		return <div 
			className={className}
			data-mounted={mounted}
			>
			
			<div className='-top'>
				<div className="-title">{title}</div>
				<div className="-value">{value}</div>
			</div>
			
			<div className='-bottom'>
				<div className="-info">{info}</div>
				<div className="-extra">{extra}</div>
			</div>
			
			<div className="-background">
				{background}
			</div>

			{!!disabled && disabled !== true && <Pill status={'concern'} text={disabled}/>}
		</div>
	})`
	position: relative;
	line-height: 1em;
	border: 1px solid var(--color-grey-200);
	//cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	transition: all 0.3s;

	&[data-mounted='false']{
		opacity: 0;
		transform: translateY(1em);
	}

	&[data-mounted='true']{
		opacity: 1;
		transform: translateY(0);
	}

	>.-top,
	>.-bottom{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 1.3rem;
		position: relative;
		z-index: 1;

		&.-top{ align-items: flex-start }
		&.-bottom{ align-items: flex-end }

		>*{
			line-height: 1em;
		}
	}

	.-title{
		display: block;
		font-size: var(--font-size-medium);
	}

	.-value{
		display: block;
		font-size: var(--font-size-medium);
		//font-weight: 600
	}

	.-info{
		display: block;
		font-size: var(--font-size-normal);
	}

	.-background{
		padding: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		width: auto;
		height: auto;
		transform: translate(-50%, -50%);
		z-index: 0;
	}

	.pill{
		opacity: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	${({disabled}) => 
		!!disabled && `
			opacity: 0.3;
			cursor: not-allowed;
		`
	}
	`

Widget.Title = styled(
	({title, subtitle, info, className}) => {
		const mounted = useMounted()

		return <div 
			className={className}
			data-mounted={mounted}
			>
			<div>
				<div className="-title">{title}</div>
				{info && 
					<Popover 
						className='-info' 
						trigger={<IconQuestion/>}
						>
						{info}
					</Popover>
				}
			</div>
			<div>
				<div className="-subtitle">{subtitle}</div>
			</div>
		</div>
	})`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	line-height: 1em;
	border: 1px solid var(--color-grey-200);
	background: var(--color-grey-25);

	transition: all 0.3s;

	&[data-mounted='false']{
		opacity: 0;
		transform: translateY(1em);
	}

	&[data-mounted='true']{
		opacity: 1;
		transform: translateY(0);
	}

	>*{
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 1.5rem;
		position: relative;
		z-index: 1;

		&:first-child{ align-items: flex-start }
		&:last-child{ align-items: center }

		>*{
			line-height: 1em;
		}
	}

	.-title{
		font-size: var(--font-size-normal);
		font-weight: 600;
		text-transform: uppercase;
		padding-right: 1em;
	}

	.-info{
		font-size: var(--font-size-medium);
	}

	.-subtitle{
		font-size: var(--font-size-small);
		text-transform: uppercase;
	}`

Widget.Minimal = styled(
	({title, subtitle, info, extra, disabled, className, ...rest}) => <div className={className} {...rest}>
		<div className='-left'>
			<div className="-top">{title}</div>
			<div className="-bottom">
				<div className="-subtitle">{subtitle}</div>
				<div className="-info">{info}</div>
			</div>
		</div>
		<div className='-right'>
			{extra}
		</div>

		{!!disabled && disabled !== true && <Pill status={'failure'} text={disabled}/>}
	</div>
	)`
	position: relative;
	line-height: 1em;
	border: 1px solid var(--color-grey-200);
	//cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: stretch;

	>*{
		padding: 0.6rem 1rem;
	}

	>.-left{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		>.-top{
			font-size: var(--font-size-xsmall);
			text-transform: uppercase;
			font-weight: 500;
			margin-bottom: 1em;
		}

		>.-bottom{
			.-subtitle{
				display: block;
				font-size: var(--font-size-small);
				color: var(--color-grey-400)
			}
			.-info{
				display: block;
				font-size: var(--font-size-xsmall);
				color: var(--color-grey-400)
			}
		}
	}

	>.-right{
		display: flex;
		align-items: center;
		align-self: center;
	}

	>.pill{
		opacity: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	${({disabled}) => 
		!!disabled && `
			opacity: 0.3;
			cursor: not-allowed;
		`
	}
	`


export default Widget