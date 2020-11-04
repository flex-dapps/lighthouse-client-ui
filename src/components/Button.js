import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import { omit } from 'lodash'
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';

const Button = styled(
	({loading, children, icon, className, ...rest}) => {

		let NodeType = 'button'

		if(loading === true){
			rest.disabled = true
		}

		if(!!rest.to && !rest.disabled ){
			if(rest.to.substr(0,4) === 'http'){
				NodeType = 'a'
				rest.href = rest.to
				delete rest.to
			}else{
				NodeType = NavLink
			}
		}else{
			NodeType = 'button'

			if(!!rest.disabled){
				delete rest.to
			}
		}
	
		// make sure all children are wrapped in a node
		const warppedChildren = React.Children.map(children, child => typeof child === 'string' ? <span className='-button-wrapped-string-child'>{child}</span> : child)

		return <NodeType 
			className={`button ${className}`}
			{...omit(rest, ['compact', 'large', 'inline', 'heavy', 'action'])}
			>
			{warppedChildren}
			{loading === true && <IconSpinner animate='spin'/>}
		</NodeType>
	})`
	cursor: pointer;
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: all 0.15s ease-in-out;
	padding: 0.6em; 
	border: 1px solid currentColor;
	color: currentColor;
	background: transparent;
	font-size: var(--font-size-medium, 16px);
	letter-spacing: 0.034em;

	${({compact}) => !!compact && `font-size: var(--font-size-normal, 14px);`}
	${({large}) => !!large && `font-size: var(--font-size-large, 20px);`}

	>*{
		color: inherit;
		z-index: 1;
		margin: 0 0.3em;
		line-height: 1em;
	}

	>svg{
		display: inline-block;
		height: 1em;
		width: auto;
		fill: currentColor;
	}

	&:not([disabled]):hover{
		border-color: var(--button--hover--color, #5E41D5);
		background: var(--button--hover--color, #5E41D5);
		color: var(--button--hover--color-text, #FFF);
	}

	${({action}) => !!action && `
		border-color: var(--button--hover--color, #5E41D5);
		background: var(--button--hover--color, #5E41D5);
		color: var(--button--hover--color-text, #FFF);
		opacity: 0.8;
		&:not([disabled]):hover{
			opacity: 1;
		}
	`}

	&[disabled]{
		pointer-events: none;
		opacity: 0.4;
		position: relative;

		&:before{
			content: '';
			position: absolute;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			cursor: not-allowed;
			pointer-events: all;
			${({loading}) => !!loading && `cursor: wait;`}
		}

		&:after{
			content: ${({disabled}) => typeof disabled === 'string' ? `'${disabled}'` : null};
			position: absolute;
			top: -0.8em;
			right: -0.8em;
			background: var(--color-primary-1);
			padding: 0.1em 0.6em;
			font-size: 0.8em;
			opacity: 1;
		}
	}

	& + .button{
		margin-left: 0.8rem;
	}

	${({inline, compact, large}) => (
		!!inline && `
			border: none;
			padding: 0;
			margin: 0;

			font: inherit;
			${!!compact ? `font-size: 0.9em;` : ''}
			${!!large ? `font-size: 1.2em;` : ''}

			>*{
				line-height: inherit;
				margin: 0 0.3em !important;
			}
			
			&:hover{
				background: transparent !important;
				color: var(--button--hover--color, #5E41D5) !important;;
			}
		`
	)}

	${({heavy}) => (
		!!heavy && `
			font-weight: 700;
			text-transform: uppercase;
		`
	)}


	`

Button.Action = styled(
	({icon, children, className, ...rest}) => {
		return <button 
			className={`button-action ${className}`} 
			{...omit(rest, ['small', 'compact'])}
			>
			<span className="icon">{icon}</span>
			<span className="text">{children}</span>
		</button>
	})`
		display: flex;
		align-items: center;
		text-align: left;
		font-size: var(--font-size-small);
		text-transform: uppercase;
		//font-weight: 700;
		border: none;
		background: none;
		cursor: pointer;
		opacity: 0.5;
		color: currentColor;
		transition: opacity 0.15s;
		padding: 0;

		>*{
			padding: 0.4rem;
			color: inherit;

			&:first-child{ padding-left: 0 }
			&:last-child{ padding-right: 0 }
		}

		.icon{
			margin-right: 0.2rem;
			font-size: 1.4em;
			display: block;

			svg{
				display: block;
			}
		}

		&:hover{
			opacity: 1;
		}

		${({compact}) => !!compact && `font-size: var(--font-size-small)`}
	`
	
Button.Icon = styled(
	({icon, className, ...rest}) => {
		return <button className={`button-action ${className}`} {...rest}>
			{icon}
		</button>
	})`
		
		${({compact}) => !!compact 
			? `font-size: var(--font-size-small);` 
			: `font-size: var(--font-size-normal);`
		}
		border: none;
		background: none;
		cursor: pointer;
		width: 2.3em;
		height: 2.3em;
		position: relative;

		svg{
			font-size: 1em;
			width: 2.3em;
			height: 2.3em;
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			padding: 0.5em;
			background: var(--color-grey-50);
			border-radius: 50%;
			color: var(--color-primary-1);
			//border: 1px solid var(--color-grey-400);
		}

		&:hover{
			opacity: 1;
		}

		
	`


export default Button