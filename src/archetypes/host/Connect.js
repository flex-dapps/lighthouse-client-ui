import React, { Fragment } from 'react';
import styled from 'styled-components'
import { Field, Button, Section, Tabbed } from '@components'
import { HostStore } from '@store'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';
import { ReactComponent as IconUnlocked } from '@assets/unlocked.svg';
import { ReactComponent as IconLocked } from '@assets/locked.svg';


const ProtocolField = ({api, title='Protocol', width}) => {
	const { state, set } = HostStore()
	return <Field.Group.Child width={width}>
		<Field.Toggle 
			title={title}
			errors={state?.errors[api]?.protocol}
			value={state.lighthouse[api]?.protocol === 'https'}
			onChange={val => set(`lighthouse.${api}.protocol`, !!val ? 'https' : 'http')}
			on={{
				icon: <IconLocked/>
			}}
			off={{
				icon: <IconUnlocked/>
			}}
			required
		/>
	</Field.Group.Child>
}

const AddressField = styled(
	({
		api, 
		width,
		title='Address',
		className
	}) => {
		const { state, set } = HostStore()
		return <Field.Group.Child
			width={width}
			className={className}
			>
			<Field.URL 
				title={title}
				info='IP Address or domain name of the Beacon Node API'
				errors={state?.errors[api]?.address}
				value={state?.lighthouse[api]?.address}
				onChange={val => {
					set(`lighthouse.${api}.address`, val)
				}}
				placeholder={state?.lighthouse[api]?.address}
				className={`-address -${api}`}
				required
			/>
		</Field.Group.Child>
	})
	`
		.-address {
			.-container:before{
				font-size: var(--font-size-large);
				color: var(--color-grey-500);
				padding: 0 0 2.5rem 0;
			}

			&.-bn .-container:before{
				content: '${() => HostStore().state.lighthouse?.bn?.protocol}://';
			}

			&.-vc .-container:before{
				content: '${() => HostStore().state.lighthouse?.vc?.protocol}://';
			}
		}
	`

const PortField = styled(
	({
		api,
		width,
		className,
		...rest
	}) => {
		const { state, set } = HostStore()
		return <Field.Group.Child
			width={width}
			className={className}
			>
			<Field.Number 
				title='Port'
				{...rest}
				errors={state?.errors[api]?.port}
				value={state?.lighthouse[api]?.port}
				onChange={val => set(`lighthouse[${api}].port`, val)}
				placeholder={state?.lighthouse[api]?.port}
				min={4000}
				max={9999}
				required
			/>
		</Field.Group.Child>
	})`
		.-container:before{
			content: ':';
			font-size: var(--font-size-large);
			color: var(--color-grey-500);
			padding: 0 0 2.5rem 0;
		}
	`

const AddressRowBasic = 
	({
		className
	}) => 
		<Field.Group
			className={className}
			>

			<ProtocolField api='bn' width={16}/>
			<AddressField api='bn' title='Address' width={44}/>
			<PortField api='bn' title='BN port' info='The Beacon Node API uses port 5052 by default' width={25} />
			<PortField api='vc' title='VC port' info='The Validator Client API uses port 5062 by default' width={15} />
		</Field.Group>

const AddressRowAdvanced = 
	({
		className
	}) => 
		<Fragment>
			<Field.Group
				className={className}
				>
				<ProtocolField api='bn' width={20}/>
				<AddressField api='bn' title='Beacon Node API Address' width={65}/>
				<PortField api='bn' title='BN port' info='The Beacon Node API uses port 5052 by default' width={15} />
			</Field.Group>
			<Field.Group>
				<ProtocolField api='vc' width={20}/>
				<AddressField api='vc' title='Validator Client API Address' width={65}/>
				<PortField api='vc' title='VC port' info='The Validator Client API uses port 5062 by default' width={15}/>
			</Field.Group>
		</Fragment>
	
const Form =
	() => {
		const { state, set } = HostStore()

		return <Fragment>
			<Tabbed 
				selected={+!!state.lighthouse?.advanced}
				onChange={val => set('lighthouse.advanced', val === 1)}
				>
				<Tabbed.Child title={'Basic Settings'}>
					<AddressRowBasic/> 
				</Tabbed.Child>
				<Tabbed.Child title={'Advanced Settings'}>
					<AddressRowAdvanced/>
				</Tabbed.Child>
			</Tabbed>
					
			<Field.Password 
				title='API token'
				info={<Fragment>Your Validator Client API token.<br/><br/>More Information</Fragment>}
				errors={state?.errors?.token}
				required
				value={state.lighthouse?.vc.token}
				onChange={val => set('lighthouse.vc.token', val)}
				placeholder='api-token-abc...xyz'
			/>

			<Field.Group>
				<Field.Group.Child width={49}>
					<Field.Input 
						title='Device name'
						errors={state?.errors?.device}
						required
						value={state.lighthouse.device}
						onChange={val => set('lighthouse.device', val)}
						placeholder='Lighthouse Client'
					/>
				</Field.Group.Child>

				<Field.Group.Child width={49}>
					<Field.Input 
						title='What should I call you?'
						errors={state?.errors?.name}
						required
						value={state.lighthouse.name}
						onChange={val => set('lighthouse.name', val)}
					/>
				</Field.Group.Child>
			</Field.Group>

			<Field.Toggle 
				title='Remember Me'
				value={state.lighthouse.persist}
				onChange={val => set('lighthouse.persist', val)}
				inline
			/>
		</Fragment>
	}

export default styled(
	({
		className
	}) => {
		const { state, trigger } = HostStore()

		return <Section 
			className={className} 
			muted={['CONECTING', 'CONNECTED'].includes(state.lighthouse?.status)}
			>
			<Section.Header title='Configure Connection'/>
			
			<Form/>

			<Section.Footer>
				<Button 
					disabled={['CONECTING', 'CONNECTED'].includes(state.lighthouse?.status)}
					onClick={() => trigger('connect')}
					>
					Connect
					{state.status === 'CONNECTING' ? <IconSpinner animate='spin'/> : <IconArrowRight/> }
				</Button>
			</Section.Footer>
		</Section>
	})`

	.tabbed{
		margin-bottom: 3.2rem;
		.tabbed-nav{
			margin-bottom: 3.4rem;
		}
	}

	>.section-content{
		max-width: 57.5rem;
	}

	>.section-divider{
		opacity: 0;
		margin: 2rem 0 1rem;
	}

	>.section-footer{
		margin-top: 3.4rem;
	}
	`