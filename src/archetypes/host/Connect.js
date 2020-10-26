import React from 'react';
import styled from 'styled-components'
import { Field, Button, Section } from '@components'
import { HostStore } from '@store'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';

export default styled(
	({msg, className}) => {
		
		const { state, set, trigger } = HostStore()

		return <Section 
			className={className} 
			muted={state.status === 'CONNECTING'}
			>
			<Section.Header title='Configure Connection'/>
			
			<Field.Group>
				<Field.Group.Child width={66}>
					<Field.URL 
						title='Address'
						info='Can be local or remote, IP or domain name'
						protocol={true}
						port={false}
						errors={state?.errors?.address}
						required
						value={state.address}
						onChange={val => set('address', val)}
						placeholder='http://127.0.0.1'
						small
					/>
				</Field.Group.Child>

				<Field.Group.Child width={18}>
					<Field.Number 
						title='BN Port'
						info={`The Beacon Node API uses port 5052 by default`}
						errors={state?.errors?.port_bn}
						required
						value={state?.port_bn}
						onChange={val => set('port_bn', val)}
						placeholder='5052'
						small
						min={4000}
						max={9999}
					/>
				</Field.Group.Child>

				<Field.Group.Child width={16}>
					<Field.Number 
						title='VC Port'
						info={`The Validator Client API uses port 5062 by default`}
						errors={state?.errors?.port_vc}
						required
						value={state?.port_vc}
						onChange={val => set('port_vc', val)}
						placeholder='5062'
						small
						min={4000}
						max={9999}
					/>
				</Field.Group.Child>
			</Field.Group>

			<Field.Password 
				title='API token'
				info='Find this token here...'
				errors={state?.errors?.token}
				required
				value={state.token}
				onChange={val => set('token', val)}
				placeholder='api-token-abc...xyz'
			/>

			<Field.Input 
				title='Device name'
				errors={state?.errors?.device}
				required
				value={state.device}
				onChange={val => set('device', val)}
				placeholder='Lighthouse Client'
			/>

			<Field.Input 
				title='What should I call you?'
				errors={state?.errors?.name}
				required
				value={state.name}
				onChange={val => set('name', val)}
			/>
			
			<Section.Footer>
				<Button 
					disabled={state.status === 'CONNECTING'}
					onClick={() => trigger('connect')}
					>
					Connect
					{state.status === 'CONNECTING' ? <IconSpinner animate='spin'/> : <IconArrowRight/> }
				</Button>
			</Section.Footer>
		</Section>
	})`

	

	.section-content{
		max-width: 50rem;
	}

	>.section-divider{
		opacity: 0;
		margin: 3rem 0 3rem;
	}
	`