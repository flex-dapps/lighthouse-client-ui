import React, { Fragment, useState, useEffect } from 'react';
import md5 from 'md5'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { AppStore, ValidatorStore, HostStore } from '@store'
import { Button, Section, Card, Field, Status, Divider } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';

const Syncing = () => {
	const { set } = ValidatorStore()
	const { state: hostState } = HostStore()

	return <Card.Column
		name={<Fragment>Syncing &mdash;</Fragment>}
		title='ETH 1.0 and Beacon node syncing status'
		footer={
			<div>
				<Status status={hostState.metrics?.eth?.status} title='ETH 1.0 node not synced' info='Creating validators before the ETH 1.0 node has completely synced may cause issues...'/>
				<Status status={hostState.metrics?.beacon?.status}  title='Beacon node synced' info='Creating validators before the Beacon node has completely synced may cause issues...'/>
				<Divider/>
				<Field.Toggle 
					title="Override"
					info='I acknowledge this may cause unwanted side effects'
					onChange={confirmed => set('confirmed.syncing', confirmed)}
				/>
			</div>
		}
		>
		<p>Both your ETH 1.0 and Beacon nodes are not yet synced.</p>
		<p>It's recommended that you wait until they're synced before creating your validators.</p>
		<p>Experienced users can override this warning and proceed at their own risk</p>
	</Card.Column>
}

const Validators = () => {
	const { set } = ValidatorStore()
	return <Card.Column
		name={
			<Fragment>
				Validators &mdash;
			</Fragment>
		}
		title='Confirm your validators'
		footer={
			<div>
				<Status
					status={'success'}
					title='3 Validators will be created'
				/>
				<Status
					status={'success'}
					title='9.6 ETH required to fund'
				/>
				<Status
					status={'success'}
					title='$1,236 USD total cost'
				/>
				<Divider/>
				<Field.Toggle 
					title="Confirm validators"
					info='I acknowledge these details are correct'
					onChange={confirmed => set('confirmed.validators', confirmed)}
				/>
			</div>
			
		}
		>
		<p>[TODO...]</p>
	</Card.Column>
}

const Keys = () => {
	const { set } = ValidatorStore()

	return <Card.Column
		name={
			<Fragment>
				Keys &mdash;
			</Fragment>
		}
		title='Acknowledge your responsibilities'
		footer={
			<div>
				<Status 
					status={'success'}
					title='Mnemonic key phrase created'
				/>
				<Status 
					status={'success'}
					title='Downloaded & stored safely'
				/>
				<Divider/>
				<Field.Toggle 
					title="Confirm keys"
					info='I acknowledge I have backed-up my key phrase'
					onChange={confirmed => set('confirmed.keys', confirmed)}
				/>
			</div>
		}
		>
		<p>[TODO...]</p>
	</Card.Column>
}

export default styled(
	({
		className
	}) => {
		const { history } = AppStore()
		const { state, set, trigger } = ValidatorStore()
		const [ confirmed, setConfirmed ] = useState(false)

		// check all confirmations on init & redirect if necessary
		useEffect(() => {
			if(
				state?.confirmed?.syncing === true ||
				state?.confirmed?.validators === true ||
				state?.confirmed?.keys === true 
			)
			// already confirmed - forward to funding screen
			{
				history.push('/onboarding/funding')
			}
			//  not confirmed? make sure user has to reconfirm all
			else{
				set('confirmed.syncing', false)
				set('confirmed.validators', false)
				set('confirmed.keys', false)
			}
			
		}, []) // eslint-disable-line

		// check user has confirmed all, and set button state
		useEffect(() => {
			setConfirmed(
				state?.confirmed?.syncing === true &&
				state?.confirmed?.validators === true &&
				state?.confirmed?.keys === true
			)
		}, [md5(Object.values(state.confirmed||[]))]) // eslint-disable-line

		return <Section className={className}>
			<Section.Header 
				context={[
					<Link to={'/onboarding/validators'}>Validators</Link>,
					'Confirm'
				]}
				title='Confirm Details'
			/>
			<Card> 
				<Syncing/>
				<Validators/>
				<Keys/>
			</Card>

			<Section.Footer>
				<Button 
					disabled={!confirmed}
					to='/onboarding/funding'
					onClick={() => {
						trigger('createValidators')
						history.push('/onboarding/funding')
					}}
					>
					Create Validators <IconArrowRight/>
				</Button>
			</Section.Footer>
		</Section>
	})
	`

		p{
			opacity: 0.6;
		}

		.card-column-footer{
			margin-top: 5rem;
		}
	
	`