import React, { useState, Fragment } from 'react';
import { Link } from "react-router-dom";
import { ValidatorStore } from '@store'
import { Validator } from '@archetypes'
import { Button, Section, Card, Mnemonic, Notification, DisclosureButton } from '@components'
import { downloadFile, copyToClipboard, printString } from '@util/helpers'

import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconPrint } from '@assets/print.svg';
import { ReactComponent as IconDownload } from '@assets/download.svg';
import { ReactComponent as IconCopy } from '@assets/copy.svg';


const ButtonPrint = ({val}) => 
	<Button.Action 
		compact
		icon={<IconPrint/>}
		onClick={() => {
			Notification.success('Seed phrase sent to printer')
			setTimeout(() => printString(val), 200)
		}}
		>
		Print from device
	</Button.Action>

const ButtonDownload = ({val}) => 
	<Button.Action 
		compact
		icon={<IconDownload/>}
		onClick={() => {
			const confirmed = window.confirm('Warning: Saving the file to a public or unencrypted partition can result in loss of funds! Confirm you wish to downlaod the seed phrase.')
			if(confirmed){
				Notification.success('Seed phrase file created')
				downloadFile('lighthouse_seed.txt', val)
			}
		}}
		>
		Download to computer
	</Button.Action>

const ButtonCopy = ({val}) => 
	<Button.Action 
		compact
		icon={<IconCopy/>}
		onClick={() => {
			const confirmed = window.confirm('Warning: Copying to clipboard can result in lost funds if the clipboard is accessed maliciously or accidentally by another program! Confirm you wish to copy the seed prhase.')
			if(confirmed){
				const notification = Notification.processing('Copying...')
				setTimeout(() => notification.success({title: 'Seed phrase copied'}), 1000)
				copyToClipboard(val)
			}
		}}
		>
		Copy to clipboard
	</Button.Action>

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
					onChange={phrase => set('mnemonic.phrase', phrase)}
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
		set('mnemonic.confirmed', true)
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