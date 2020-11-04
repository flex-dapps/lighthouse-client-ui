import React from 'react'
import styled from 'styled-components'
import { Button, Label, Divider, Field } from '@components'
import { ValidatorStore } from '@store'
import { Validator } from '@archetypes'
import { useMounted } from '@util/hooks'
import { ReactComponent as IconMinus } from '@assets/circle_remove_outline.svg';

const Row = styled(
	({
		id, 
		className, 
		controls, 
		...rest
	}) => {
		const validator = Validator.useValidator(id)
		return <div 
			className={`validator-row ${className}`}
			data-status={validator?.status}
			{...rest}
			>
			<span className='info'>
				<Validator.Partial.Icon className={'icon'} id={id}/>
				<span className="name">{validator?.name}</span>
				<Label title='Balance:'><span>{validator?.balance||0}/{validator?.eth||0}</span>ETH</Label>
			</span>
			<span className='controls'>
				<Validator.Partial.Status id={id}/>
				<Divider vertical/>
				<Validator.Partial.Button id={id}/>
			</span>
		</div>
	})`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.6rem;
		border: 1px solid grey;
		z-index: 1;
		position: relative;
		height: 5rem;

		>*{
			display: flex;
			align-items: center;
		}

		.info{
			.icon{
				margin-right: 1em;
				min-width: 2.6rem;
				min-height: 2.6rem;
			}

			.name{
				font-size: var(--font-size-medium);
			}

			>*{
				margin-right: 1rem;
			}
		}

		&:hover{
			border-color: black;
			z-index: 2;
		}

		& + .validator-row{
			margin-top: -1px
		}
	`

Row.Editable = styled(
	({id, className, ...rest}) => {
		
		const { trigger } = ValidatorStore()
		const mounted = useMounted()
		const validator = Validator.useValidator(id)

		return <div 
			className={`validator-row ${className}`} 
			{...rest}
			data-mounted={mounted}
			>
			<span className='info'>
				<Validator.Partial.Icon className={'icon'} id={id}/>
				<Field.Input 
					className="name"
					required
					small
					value={validator?.name}
					onChange={val => validator.name = val}
					placeholder='My Validator'
				/>

			</span>
			<span className='controls'>
				<Label title='Deposit amount:'>{validator?.eth} ETH</Label>
				<Divider vertical/>
				<Button 
					icon={<IconMinus/>}
					inline
					compact
					onClick={() => trigger('validator.remove', id)}
					className='-remove'
					>
					Remove
				</Button>
			</span>
		</div>
	})`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1em;
	border: 1px solid var(--color-grey-200);
	z-index: 1;
	position: relative;

	transition: all 0.2s ease-out;

	&[data-mounted='false']{
		opacity: 0;
		max-height: 0;
		padding: 0 1em;
		margin: -1px;
	}

	&[data-mounted='true']{
		opacity: 1;
		max-height: 6rem;
	}

	.info{
		width: 50%;
		display: flex;
		align-items: center;

		.icon{
			margin-right: 1em;
			min-width: 2.6rem;
			min-height: 2.6rem;
		}
		
		.name{
			.-container{
				border-bottom: none;
				//background: red;
				input{
					padding: 0.3em 0.5em;
					font-size: var(--font-size-medium);
					color: var(--color-grey-700);
				}
			}
		}
	}

	.controls{
		display: flex;
		>*{
			//margin-left: 1rem
		}

		.-remove{
			opacity: 0.7;
			color: var(--color-primary-1);
		}
	}

	& + .validator-row{
		margin-top: -1px
	}

	&:hover{
		background: var(--color-grey-25);
		z-index: 2;

		.info{
			.name{
				.-container{
					background: white;
					
				}
			}
		}
	}
	`

export default Row