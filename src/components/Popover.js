import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const Content = styled(
	({title, subtitle, children, className}) => {

		const [open, setOpen] = useState(false)

		useEffect(() => {
			setTimeout(() => setOpen(true), 50)
		}, [])
		
		return <span className={`content ${className}`} data-open={open}>
			<div className="inner">
				{(title || subtitle) &&
					<span className="header">
						{title && <span className="title">{title}</span>}
						{subtitle && <span className="subtitle">{subtitle}</span>}
					</span>
				}
				
				{children}
			</div>
		</span>
	})`
	position: absolute;
	bottom: calc(100% + 1em);
	left: 50%;
	transform: translateX(-50%);
	font-size: var(--font-size-small);
	line-height: 1.4em;	
	transition: all 0.15s ease-in-out;
	min-width: 14rem;

	.inner{
		padding: 1em;
		overflow: hidden;
		max-height: 100rem;
		transition: inherit;
	}

	.header{
		display: block;
		margin-bottom: 0.5em;
		padding-bottom: 0.5em;

		.title{
			font-weight: 500;
			font-size: var(--font-size-small);
			display: block;
		}

		.subtitle{
			font-size: var(--font-size-xsmall);
			color: black
			display: block;
			margin-top: 0.5em;
			font-weight: 300;
		}
	}

	&:before{
		content: '';
		position: absolute;
		top: calc(100%);
		left: 50%;
		transform: translateX(-50%);
		width: 0; 
		height: 0; 
		border-left: 0.5em solid transparent;
		border-right: 0.5em solid transparent;
		border-top: 0.5em solid white
	}
	
	&[data-open='false']{
		opacity: 0;
		.inner{
			max-height: 0;
			padding: 0 1em;
		}
	}
	`

const Popover = styled(
	({trigger, title, subtitle, children, className}) => {
		
		const [ open, setOpen ] = useState(false)
		const [ timer, setTimer ] = useState(setTimeout(()=>{}, 1))

		const handleOpen = () => {
			timer && clearTimeout(timer)
			setOpen(true)
		}

		const handleClose = () => {
			setTimer(setTimeout(() => setOpen && setOpen(false), 250))
		}

		return <span 
			className={`popover ${className}`}
			onMouseLeave={handleClose}
			onMouseEnter={handleOpen}
			>
			{open && 
				<Content title={title} subtitle={subtitle}>
					{children}
				</Content>
			}
			<span className="trigger" >
				{trigger}
			</span>
		</span>
	})`
	position: relative;
	user-select: none;

	.trigger{
		cursor: pointer;
		transition: all 0.15s;
		white-space: nowrap;

		.-title-text{
			margin-top: 0.1em;
		}

		&:after{
			//content: '';
			position: absolute;
			top: calc(100% - 0.06em);
			left: 0;
			width: 100%; 
			height: 0; 
			border-top: 1px dashed currentColor;
			opacity: 0.5;
		}

		&:hover:after{
			opacity: 1;
		}

		>*{ display: inline-block }
	}
	
	.content{
		background: ${({theme}) => theme === 'dark' ? 'var(--color-dark)' : 'var(--color-light)'};
		color: ${({theme}) => theme === 'dark' ? 'var(--color-light-grey)' : 'var(--color-dark)'};
		border: 1px solid ${({theme}) => theme === 'dark' ? 'var(--color-light-grey)' : 'var(--color-light-grey)'};
		.header .subtitle{ color: ${({theme}) => theme === 'dark' ? 'var(--color-grey)' : 'var(--color-mid-grey)'} }
		&:before{ border-top: 0.5em solid ${({theme}) => theme === 'dark' ? 'var(--color-dark)' : 'var(--color-light)'} }
	}

	
	`

Popover.Item = styled(
	({children, className, ...rest}) => 
		<div 
			className={`-item ${className}`}
			{...rest}
			>
			{children}
		</div>
	)`
	font-size: var(--font-size-small);
	display: block;
	cursor: pointer;
	padding: 0.4em 0;
	text-align: left;
	white-space: nowrap;
	`

export default Popover