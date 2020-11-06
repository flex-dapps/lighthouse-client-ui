import React, { useState, useEffect, Fragment } from 'react';
import { get, pick } from 'lodash'
import styled from 'styled-components'
import { Popover } from '@components'
import { ReactComponent as IconPreview } from '@assets/preview.svg';
import { ReactComponent as IconPreviewHide } from '@assets/preview_hide.svg';
import { ReactComponent as IconQuestion } from '@assets/question.svg';

const FieldTitleText  = styled(
	({children, className, ...rest}) => <span className={`-title-text ${className}`} {...rest}>{children}</span>)`
	opacity: 0.4;
	text-transform: uppercase;
	font-weight: 600;
	letter-spacing: 0.05em;
	display: block;
	`
const FieldSubtitleText  = styled(
	({children, className, ...rest}) => <span className={`-subtitle-text ${className}`} {...rest}>{children}</span>)`
	opacity: 0.7;
	font-size: 1em;
	font-weight: 400;
	display: block;
	`

const FieldTemplate = styled(
	({
		title, 
		info, 
		errors=[], 
		footer, 
		type,
		children, 
		className,
		...rest
	}) => 
		<span 
			className={`field -${type} ${className}`}
			data-has-error={(errors.length > 0)}
			{...rest}
			>
			{title && 
				<span className="-title">
					{info 
						? <Popover 
							trigger={
								<Fragment>
									<FieldTitleText>{title}</FieldTitleText>
									<IconQuestion/>
								</Fragment>
							}
							>
							{info}
						</Popover>
						: <FieldTitleText>{title}</FieldTitleText>
					}
				</span>
			}
			<div className='-container'>{children}</div>
			{footer && <div className='-footer'>{footer}</div>}
			{errors.length > 0 && <span className="-error" dangerouslySetInnerHTML={{__html: errors[0]}}/>}
		</span>
	)`
		position: relative;
		display: block;
		width: 100%;
		z-index: 1;

		.-title{
			font-size: var(--font-size-small);
			color: inherit;
			display: flex;
			align-items: center;
			margin-bottom: 0.3rem;

			.-title-text{
				color: currentColor;
			}
			
			>.popover .trigger{
				display: flex;
				align-items: center;
				> svg{
					margin-left: 0.5rem;
					opacity: 0.4;
				}
			}
		}

		.-container{
			position: relative;
			border-bottom: 1px solid currentColor;
			display: flex;
			align-items: flex-end;

			input,
			select{
				padding: 1.9rem 0;
				width: 100%;
				display: block;
				//transition: all 0.2s;
				background: none;
				border: none;
				line-height: 1em;
				//transition: all 0.2s;
			}

			input{
				font-size: var(--font-size-large);
			}

			select{
				font-size: var(--font-size-normal);
			}

			input{
				&:focus{
					box-shadow: 0 0 0.75rem rgba(0,0,0,0.1)
				}

				::placeholder {
					color: inherit;
					opacity: 0.2;
					font-weight: 100
				}
			}

			>svg{
				width: 2.4rem;
				height: 2.4rem
			}
		}
		
		.-footer{
			font-size: var(--font-size-small);
			margin-top: 0.3rem;
			text-align: right
		}
			
		.-error{
			position: absolute;
			top: calc(100% + 0.3rem);
			text-transform: uppercase;
			right: 0.4rem;
			font-size: var(--font-size-xsmall, 10px);
			line-height: 1em;
			color: var(--color-status-concern, red);
			display: flex;
			align-items: center;

			.-icon{
				margin-left: 0.5rem;
			}

			>*{
				margin: 0 0.3rem;
			}
		}

		&[data-has-error='true']{
			input{
				border-color: var(--color-status-concern, red);
			}
		}

		& + .field,
		& + .field-group{
			margin-top: 3.2rem;
		}


		${({large}) => large && `
			.-container{
				input{ 
					font-size: var(--font-size-xlarge);
				}
				
				select{ 
					font-size: var(--font-size-medium);
				}
			}
		`}
	`



const Input = 
	({
		value='', 
		onChange=()=>{}, 
		children, 
		...rest
	}) => {
		
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate 
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='input'
			>
			<input
				data-lpignore="true"
				spellCheck="false"
				value={value||''}
				onChange={e => onChange(e.target.value)}
				{...rest}
			/>
			{children}
		</FieldTemplate>
	}

const URL = 
	({
		value='', 
		onChange=()=>{}, 
		children, 
		...rest
	}) => {
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate 
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='url'
			>
			<input
				data-lpignore="true"
				spellCheck="false"
				value={value||''}
				onChange={e => onChange(e.target.value)}
				
			/>
			{children}
		</FieldTemplate>
	}

const Number = styled(
	({
		value='', 
		onChange=()=>{}, 
		min, 
		max, 
		children, 
		...rest
	}) => {
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='number'
			>
			<input
				data-lpignore="true"
				spellCheck="false"
				type='number'
				value={value||''}
				onChange={e => onChange(e.target.value)}
				min={min}
				max={max}
				{...rest}
			/>
			{children}
		</FieldTemplate>
	})`
		input{
			-moz-appearance: textfield;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
			  -webkit-appearance: none;
			  margin: 0;
			}
		}
	`

const Password = styled(
	({
		value='', 
		onChange=()=>{},
		placeholder,
		...rest
	}) => {
		const [visible, setVisible] = useState(false) 

		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='password'
			data-visible={visible}
			>
			<input
				data-lpignore="true"
				spellCheck="false"
				type={visible ? 'text' : 'password'}
				value={value||''}
				onChange={e => onChange(e.target.value)} 
				{...rest}
				placeholder={visible ? placeholder : '•••••'}
			/>
			
			{visible
				? <IconPreview className='-toggle-vis -hide' onClick={() => setVisible(false)}/>
				: <IconPreviewHide className='-toggle-vis -show' onClick={() => setVisible(true)}/>
			}
		</FieldTemplate>
	})`
		.-toggle-vis{
			cursor: pointer;
			transition: opacity 0.15s;
			margin-left: 2em;
			margin-bottom: 2rem;

			&.-show{
				opacity: 0.5;
				&:hover{
					opacity: 0.8
				}
			}

			&.-hide{
				opacity: 1
			}
		}

		&[data-visible='false']{
			.-container{
				input{
					font-size: var(--font-size-xxlarge);
					padding: 0.6rem 0 1.3rem;
					color: var(--color-grey-300)
				}
			}
		}
	`

const Custom = styled(
	({
		children, 
		...rest
	}) => 
		<FieldTemplate 
			{...pick(rest, ['title', 'info', 'footer', 'right', 'className'])}
			type='custom'
			>
			{children}
		</FieldTemplate>
	)`
		.-container{
			border: none;
			//height: 5.9rem;
		}
	`

const TextArea = styled(
	({
		value='', 
		required=false, 
		validation={}, 
		onChange=()=>{}, 
		className, 
		...rest
	}) => {
		const [ errors, setErrors ] = useState([])
		const [ touched, setTouched ] = useState(false)
		
		const validate = val => {
			if(val) setTouched(true)

			let err = []

			Object.keys(get(validation, 'checks', {})).map(error => {
				const cb = get(validation, 'checks', {})[error];
				if(!cb(val)){
					err.push(error)
				}
				return null;
			})

			get(validation, 'onChange', ()=>{})(err.length <= 0)
			setErrors(err)
			onChange(val)
		}

		useEffect(() => validate(value), [])  // eslint-disable-line

		return <span 
			className={`field -input ${className}`}
			data-has-error={errors.length > 0 && touched}
			>
			<textarea 
				value={value||''}
				onChange={e => validate(e.target.value)} 
				{...rest}
			/>
			{errors.length > 0 && touched &&
				<span 
					className="error">
					{errors[0]}
				</span>
			}
		</span>
	})`
		position: relative;
		display: block;
		
		textarea{
			border: 1px solid var(--color-light-grey);
			padding: 1rem 1.6rem;
			width: 100%;
			display: block;
			transition: all 0.2s;
			font-size: var(--font-size-medium);
			resize: none;

			&:focus{
				box-shadow: 0 0 0.75em rgba(0,0,0,0.1)
			}

			::placeholder {
				color: var(--color-light-grey);
			}
		}
		
		.error{
			position: absolute;
			bottom: 0.4em;
			right: 0.4em;
			font-size: var(--font-size-xxsmall, 10px);
			line-height: 1em;
			color: red;
		}

		&[data-has-error='true']{
			input{
				border-color: var(--color-status-error, red);
			}
		}
	`

const Select = styled(
	({
		value='', 
		options=[], 
		onChange=()=>{}, 
		...rest
	}) => 
		<FieldTemplate 
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='select'
			>
			<select
				value={value}
				onChange={e => onChange(e.target.value)}
				{...rest}
				>
				{options.map(option => 
					<option 
						key={option.key} 
						value={option.key}
						>
						{option.value}
					</option>
				)}
			</select>
		</FieldTemplate>
	)`
		font-size: inherit;
		cusror: pointer;

		select{
			option{
				font-size: 12px !important;
			}
		}
	`

const Toggle = styled(
	({
		value=false, 
		onChange=()=>{}, 
		on,
		off,
		...rest
	}) => {
		let [ isActive, setActive ] = useState(value)

		let handleClick = () => {
			setActive(!isActive)
			onChange && onChange(!isActive)
		}
		
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate 
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'large', 'className'])}
			type='toggle'
			>

			<span
				className='toggle'
				data-active={isActive}
				data-has-text={on?.text || off?.text ? true : false}
				onClick={ handleClick }
				>
				<span className='toggle-indicator'>
					{isActive && <span className='toggle-icon'>{on?.icon}</span>}
					{!isActive && <span className='toggle-icon'>{off?.icon}</span>}
				</span>
				{on?.text && off?.text && 
					<span className='-text'>
						<span className='-on'>{on?.text}</span>
						<span className='-off'>{off?.text}</span>
					</span>
				}
			</span>
		</FieldTemplate>
	})`
		.-container{
			border: none;
			//padding: ${({large}) => !!large ? `2rem 0 1.2rem` : `1.8rem 0 1.2rem`}
			padding: 2.1rem 0 1.9rem;
		}
		
		.toggle{
			width: 4.8rem;
			min-width: 4.8rem;
			height: 2.4rem;
			background: var(--field--toggle--off--background-color, lightgrey);
			color: var(--field--toggle--off--text-color, black);
			border-radius: 1.51rem;
			position: relative;
			transition: all 0.15s ease-in-out;
			cursor: pointer;
			display: flex;
			align-items: center;


			.toggle-indicator{
				height: 1.6rem;
				width: 1.6rem;
				display: block;
				position: absolute;
				top: 0.4rem;
				left: 0.4rem;
				transition: all 0.1s ease-in-out;
				border-radius: 1.5em;
				background: var(--field--toggle--off--indicator-color, darkgrey);
				z-index: 2;

				>.toggle-icon{
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-size: 1em;
					opacity: 0.7;
					color: var(--field--toggle--off--icon-color, lightgrey);
				}
			}

			&[data-active="true"]{
				background: var(--field--toggle--on--background-color, lightgreen);
				color: var(--field--toggle--on--text-color, white);
				.toggle-indicator{ 
					left: calc(50% + 0.4rem);
					background: var(--field--toggle--on--indicator-color, green);
					>.toggle-icon{
						color: var(--field--toggle--on--icon-color, green);
					}
				}
			}

			.-text{
				display: flex;
				align-items: center;
				width: 100%;
				
				.-on,
				.-off{
					z-index: 1;
					font-size: var(--font-size-xsmall);
					font-weight: 600;
					opacity: 0.8;
					display: block;
					white-space: nowrap;
					padding: 0 1em;
					text-align: center;

					${({on, off}) => {
						const length = on?.text?.length && off?.text?.length
							? (on?.text?.length > off?.text?.length ? on?.text.length : off?.text.length)
							: 1
						return `width: ${length}rem;`
					}}
				}

				.-on{
					left: 1em;
					padding-right: 0.5em
				}

				.-off{
					right: 1em;
					padding-left: 0.5em
				}
			}

			${({large, on, off}) => !!large && `
				width: 6em;
				min-width: 6em;
				height: 2.8em;

				.toggle-indicator{
					height: 2.8em;

					>.toggle-icon{
						font-size: 1.5em;
					}
				}

				.-text{

					.-on,
					.-off{
						width: ${(on?.text.length > off?.text.length ? on?.text.length : off?.text.length)*0.9}rem;
					}

					.-on{
						left: 1em;
						padding: 0 0.125em 0 0.25em;
					}

					.-off{
						right: 1em;
						padding: 0 0.25em 0 0.125em;
					}
				}
			`}

			&[data-has-text='true']{
				width: auto;
				min-width: none;
			}

			${({inline}) => ``}
		}

		${({inline}) => {
			return !!inline && `
				display: flex;
				flex-direction: row-reverse;
				align-items: center;
				justify-content: flex-end;
				margin-top: 2rem !important;

				.-title{
					margin: 0 0 0 1rem;
				}

				.-container{
					padding: 0;
				}
			`
		}}
	`

const Group = styled(
	({
		children, 
		before, 
		after, 
		className, 
		...rest
	}) => 
		<div 
			className={`field-group ${className}`} 
			{...rest}
			>
			{before && <span className="-before">{before}</span>}
			{children}
			{after && <span className="-after">{after}</span>}
		</div>
	)`
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		position: relative;
		z-index: 1;

		.field{
			margin-top: 0;
			position: initial;
		}

		& + .field,
		& + .field-group{
			margin-top: 3.6rem;
		}
	`

Group.Child = styled(
	({
		children, 
		className, 
		...rest
	}) => 
		<span 
			className={`field-group-child ${className}`} 
			{...rest}
			>
			{children}
		</span>
	)`
		display: flex;
		align-items: flex-end;
		border-bottom: 1px solid currentColor;

		.field{
			margin-top: 0;
			margin-bottom: -1px;
			.-container{
				border-bottom: none;
			}
		}

		& + .field{
			margin-top: 3.2rem;
		}

		${({width=100}) => `width: ${width}%`}
	`

export default {
	Input,
	URL,
	Number,
	Password,
	Custom,
	TextArea,
	Select,
	Toggle,
	Group
}