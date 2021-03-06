import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import { ValidatorStore } from '@store'
import { Validator } from '@archetypes'
import { Button, Section, Card, Mnemonic, Notification, DisclosureButton } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconPrint } from '@assets/print.svg';
import { ReactComponent as IconDownload } from '@assets/download.svg';
import { ReactComponent as IconCopy } from '@assets/copy.svg';


const ButtonPrint = ({val}) => {
	const { trigger } = ValidatorStore()
	return <Button.Action 
		compact
		icon={<IconPrint/>}
		onClick={() => trigger('mnemonic.print')}
		>
		Print from device
	</Button.Action>
}

const ButtonDownload = ({val}) => {
	const { trigger } = ValidatorStore()
	return <Button.Action 
		compact
		icon={<IconDownload/>}
		onClick={() => trigger('mnemonic.download')}
		>
		Download to computer
	</Button.Action>
}

const ButtonCopy = ({val}) => {
	const { trigger } = ValidatorStore()
	return <Button.Action 
		compact
		icon={<IconCopy/>}
		onClick={() => trigger('mnemonic.copy')}
		>
		Copy to clipboard
	</Button.Action>
}

const Create = props => {
	const { state, set } = ValidatorStore()

	return <Section 
		{...props}
		>
		
		<Section.Header 
			context={[
				<Link to={'/onboarding/validators'}>Validators</Link>,
				'Mnemonic'
			]}
			title='Create Mnemonic Phrase'
		/>

		<Card>
			<Card.Column 
				name={
					<Fragment>
						Mnemonic<br/>
						Phrase &mdash;
					</Fragment>
				}
				title='Secure Mnemonic Phrase Key'
				subtitle='Save offline! Do not store on cloud. You will be required to confirm in next step'
				width={71}
				>
				<Mnemonic.Generate
					phrase={state.mnemonic?.phrase}
					entrpoy={256}
					onChange={phrase => {
						set('mnemonic.phrase', phrase)
						set('mnemonic.confirmed', false)
					}}
				/>
			</Card.Column>
			
			<Card.Column 
				width={29}
				footer={
					<DisclosureButton>
						<Validator.Disclosure.Mnemonic/>
					</DisclosureButton>
				}
				>
				<Validator.Partial.Overview/>
				<Card.Column.Divider compact/>
				<Validator.Partial.Investment/>
				<Card.Column.Divider compact/>
				<Validator.Partial.Reward/>
				<Card.Column.Divider compact/>
				<ButtonPrint val={state.mnemonic?.phrase}/>
				<ButtonDownload val={state.mnemonic?.phrase}/>
				<ButtonCopy val={state.mnemonic?.phrase}/>
			</Card.Column>
		</Card>

		<Section.Footer>
			<Button to='/onboarding/mnemonic/confirm'>
				Confirm Phrase
				<IconArrowRight/>
			</Button>
		</Section.Footer>
	</Section>
}

const Confirm = props => {
	const { state, set, history } = ValidatorStore()
	const [ stats, setStats ] = useState({
		confirmed: 0,
		total: 0
	})

	useState(() => {
		// if we've already confirmed, 
		if(state.mnemonic?.confirmed === true){
			history.push('/onboarding/confirm')
		}
	}, [])

	return <Section 
		{...props}
		>

		<Section.Header 
			context={[
				<Link to={'/onboarding/validators'}>Validators</Link>,
				'Mnemonic'
			]}
			title='Confirm Mnemonic'
		/>

		<Card>
			<Card.Column 
				name={
					<Fragment>
						Mnemonic<br/>
						Phrase &mdash;
					</Fragment>
				}
				title='Confirm Mnemonic Phrase Key'
				subtitle='Enter the corresponding words to the numbers presented in the previous step'
				width={71}
				>
				<Mnemonic.Confirm
					phrase={state.mnemonic?.phrase}
					onConfirm={() => {
						set('mnemonic.confirmed', true)
						Notification.success('Mnemonic phrase confirmation complete')
					}}
					onNoPhrase={() => history.push('/onboarding/mnemonic')}
					onChange={setStats}
				/>
			</Card.Column>

			<Card.Column 
					width={29}
					footer={
						<DisclosureButton>
							<Validator.Disclosure.Mnemonic/>
						</DisclosureButton>
					}
					>
					<Validator.Partial.Overview/>
					<Card.Column.Divider compact/>
					<Validator.Partial.Investment/>
					<Card.Column.Divider compact/>
					<Validator.Partial.Reward/>
					<Card.Column.Divider compact/>
					<ButtonPrint val={state.mnemonic?.phrase}/>
					<ButtonDownload val={state.mnemonic?.phrase}/>
					<ButtonCopy val={state.mnemonic?.phrase}/>
				</Card.Column>
		</Card>

		<Section.Footer>
			{stats?.confirmed !== stats?.total
				? <Button 
					loading={true}
					>
					{stats?.total - stats?.confirmed} words remaining
				</Button>
				: <Button 
					to='/onboarding/confirm'
					>
					Initialize Validators
					<IconArrowRight/>
				</Button>
			}

			{
				process.env.REACT_APP_ALLOW_MNEMONIC_CONFIRMATION_SKIP === 'true' && 
					<Button 
						inline 
						to='/onboarding/confirm'
						>
						Skip 
						<IconArrowRight/>
					</Button>
			}
		</Section.Footer>
	</Section>
}

export default {
	Create,
	Confirm
}