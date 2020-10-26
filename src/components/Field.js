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
	({title, info, errors=[], footer, children, className}) => {
		return <span 
			className={`field -input ${className}`}
			data-has-error={(errors.length > 0)}
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
	})`
	position: relative;
	display: block;
	width: 100%;

	.-title{
		font-size: ${({small}) => `var(--font-size-${!!small ? 'small' : 'normal'});`}
		color: inherit;
		display: flex;
		align-items: center;
		margin-bottom: 0.3em;

		.-title-text{
			color: currentColor;
		}
		
		>.popover .trigger{
			display: flex;
			align-items: center;
			> svg{
				margin-left: 0.5em;
				opacity: 0.4;
			}
		}
	}

	.-container{
		position: relative;
		border-bottom: 1px solid currentColor;
		display: flex;
		align-items: center;

		input,
		select{
			padding: 0.8rem 0;
			width: 100%;
			display: block;
			transition: all 0.2s;
			background: none;
			border: none;
			line-height: 1em;
			transition: all 0.2s;
		}

		input{
			font-size: ${({small}) => `var(--font-size-${!!small ? 'xlarge' : 'xxlarge'});`}
		}


		select{
			font-size: ${({small}) => `var(--font-size-${!!small ? 'normal' : 'medium'});`}
		}

		input{
			&:focus{
				box-shadow: 0 0 0.75em rgba(0,0,0,0.1)
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
		top: calc(100% + 0.3em);
		text-transform: uppercase;
		right: 0.4em;
		font-size: var(--font-size-xsmall, 10px);
		line-height: 1em;
		color: var(--color-status-concern, red);
		display: flex;
		align-items: center;

		.-icon{
			margin-left: 0.5em;
		}

		>*{
			margin: 0 0.3em;
		}
	}

	&[data-has-error='true']{
		input{
			border-color: var(--color-status-concern, red);
		}
	}

	& + .field,
	& + .field-group{
		margin-top: 3.6rem;
	}
	`

const Input = styled(
	({value='', onChange=()=>{}, title, info, errors, footer, small, children, className, ...rest}) => {
		
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate title={title} info={info} errors={errors} footer={footer} small={small} className={className}>
			<input
				data-lpignore="true"
				spellCheck="false"
				value={value||''}
				onChange={e => onChange(e.target.value)}
				{...rest}
			/>
			{children}
		</FieldTemplate>
	})`

	`

const URL = styled(
	({value='', onChange=()=>{}, children, ...rest}) => {
		
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate 
			{...pick(rest, ['title', 'info', 'errors', 'footer', 'small', 'className'])}
			>
			<input
				data-lpignore="true"
				spellCheck="false"
				value={value||''}
				onChange={e => onChange(e.target.value)}
				
			/>
			{children}
		</FieldTemplate>
	})`

	`

const Number = styled(
	({value='', onChange=()=>{}, title, info, errors, footer, small, min, max, children, className, ...rest}) => {
		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate title={title} info={info} errors={errors} footer={footer} small={small} className={className}>
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
	({value='', onChange=()=>{}, type, title, info, errors, footer, small, className, ...rest}) => {
		
		const [visible, setVisible] = useState(false) 

		useEffect(() => {
			value && onChange(value)
		}, []) // eslint-disable-line

		return <FieldTemplate title={title} info={info} errors={errors} footer={footer} small={small} className={className}>
			<input
				data-lpignore="true"
				spellCheck="false"
				type={visible ? 'text' : 'password'}
				value={value||''}
				onChange={e => onChange(e.target.value)} 
				{...rest}
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

	`

const TextArea = styled(
	({value='', required=false, validation={}, onChange=()=>{}, className, ...rest}) => {
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
	({value='', options=[], onChange=()=>{}, title, info, errors, footer, small, className, ...rest}) => {
		return <FieldTemplate title={title} info={info} errors={errors} footer={footer} className={className} small={small}>
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
	})`

	font-size: inherit;
	cusror: pointer;

	select{

		option{
			font-size: 12px !important;
		}
	}

	


	`

const Toggle = styled(
	({active=false, onChange=()=>{}, title, info, errors, footer, small, children, className, ...rest}) => {

		let [ isActive, setActive ] = useState(active)

		let handleClick = () => {
			setActive(!isActive)
			onChange && onChange(!isActive)
		}
		
		useEffect(() => {
			active && onChange(active)
		}, []) // eslint-disable-line

		return <FieldTemplate 
			errors={errors} 
			footer={footer} 
			small={small} 
			className={className}>
			<div className='toggle-container' onClick={ handleClick }>
				<span
					className='toggle'
					data-active={isActive}
					>
					<span className='toggle-indicator'/>
				</span>
				<span className='toggle-text'>
					<FieldTitleText>{title}</FieldTitleText>
					<FieldSubtitleText>{info}</FieldSubtitleText>
				</span>
			</div>
			{children}
		</FieldTemplate>
	})`
	.-container{
		border: none;
	}
	
	.toggle-container{
		display: flex;
		align-items: center;
		//width: 100%;
		cursor: pointer;
		font-size: var(--font-size-small);

		.toggle{
			width: 3.4em;
			min-width: 3.4em;
			height: 2em;
			background: var(--field--toggle--off--background-color, lightgrey);
			border-radius: 1em;
			position: relative;
			transition: all 0.15s ease-in-out ;

			.toggle-indicator{
				width: 2em;
				height: 2em;
				display: block;
				position: absolute;
				top: 0em;
				left: 0em;
				transition: all 0.1s ease-in-out ;
				border-radius: 50%;
				background: var(--field--toggle--off--indicator-color, grey);
			}

			&[data-active="true"]{
				background: var(--field--toggle--on--background-color, lightgreen);
				.toggle-indicator{ 
					left: 1.4em;
					background: var(--field--toggle--on--indicator-color, green);
				}
			}
		}

		.toggle-text{
			padding-left: 1em;
			.-subtitle-text{
				margin-top: 0.2em;
			}
		}
	}
	`

const Group = styled(
	({children, className, ...rest}) => {
		return <div className={`field-group ${className}`} {...rest}>
			{children}
		</div>
	})`
	display: flex;
	align-items: flex-end;
	position: relative;

	.field{
		margin-top: 0;
		position: initial;
	}

	& + .field{
		margin-top: 3.6rem;
	}



	`

Group.Child = styled(
	({children, className, ...rest}) => {
		return <span className={`field-group-child ${className}`} {...rest}>
			{children}
		</span>
	})`
	display: flex;
	align-items: flex-end;
	border-bottom: 1px solid currentColor;

	.field{
		margin-top: 0;
		margin-bottom: -1px;
	}

	& + .field{
		margin-top: 3.6rem;
	}

	${({width=100}) => `width: ${width}%`}
	`

export default {
	Input,
	URL,
	Number,
	Password,
	TextArea,
	Select,
	Toggle,
	Group
}