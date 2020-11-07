import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components'
import { Validator, Account } from '@archetypes'
import { AppStore, AccountStore, ValidatorStore } from '@store'
import { Button, Section, Card, Label, Blockie, LazyBoi, Placeholder } from '@components'
import { truncateString, format, downloadFile } from '@util/helpers'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconMetaMask } from '@assets/metamask.svg';


const AccountDetails = styled(
	({
		className
	}) => {
		const { state: appState } = AppStore()
		const { state } = AccountStore()

		return <Card.Column 
			name={
				<Fragment>
					Account<br/>
					status &mdash;
				</Fragment>
			}
			className={className}
			footer={<Account.Status.Text/>}
			roomy
			>
	
			<Label
				title='Web3:'
				>
				Metamask
			</Label>

			<Label
				title='Network:'
				>
				{appState?.network?.name}
			</Label>

			<Label title='Address:'>
				<LazyBoi 
					prefix={
						<Blockie 
							address={state?.address} 
							diameter={14}
						/>
					}
					value={truncateString(state?.address)}
				/>
			</Label>

			<Label title='Balance:'>
				<LazyBoi 
					suffix='ETH'
					value={state?.balance}
				/>
			</Label>
		</Card.Column>
	})
	`
		.alert{
			margin-top: 1em;
		}
	`

const ValidatorDetails = () => {
	const { state } = ValidatorStore()

	return <Card.Column 
		name={<Fragment>Validator<br/>Status &mdash;</Fragment>}
		footer={
			<Fragment>
				<Label title='Funding Status:'>{Object.values(state.validators).reduce((t, v) => t + v.balance, 0)} / {state.stakeRequired} ETH</Label>
			</Fragment>
		}
		roomy
		>
		<Label title='Validator Count:'>{Object.keys(state.validators).length}</Label>
		<Label title='ETH Required:'>{state.stakeRequired} ETH</Label>
		<Label title='Total Cost:'>{format.currency(state.locale, state?.currency, state?.cost)}</Label>
		<Label title='Status:'>Awaiting</Label>
	</Card.Column>	
}

const MnemonicDetails = () => {
	const { state } = ValidatorStore()

	return <Card.Column 
		name={<Fragment>Mnemonic<br/>Phrase &mdash;</Fragment>}
		footer={
			<Button 
				compact
				onClick={() => downloadFile(`LighthouseSeed.txt`, state?.mnemonic?.phrase||'')}
				>
				Download Seed
			</Button>
		}
		roomy
		>
		
		<Label title='Word Count:'>24</Label>
		<Label title='Phrase:'>{truncateString(state?.mnemonic?.phrase, 4, 4)}</Label>
		
	</Card.Column>	
}

const TransactionList = () => {
	const { state } = ValidatorStore()

	return <Card.Column
		name={<Fragment>Transaction<br/>Confirmations &mdash;</Fragment>}
		style={{minHeight: '15rem'}}
		>
		{Object.keys(state?.validators||{})?.reverse().map(id => <Validator.Partial.Row key={id} id={id}/>)}
	</Card.Column>
}

export default ({className}) => {

	const { subscribe } = ValidatorStore()
	const { state: accountState, trigger: accountTrigger } = AccountStore()
	const [ button, setButton ] = useState()

	useEffect(() => {
		
		window.onbeforeunload = () => { return false };

		// keep track of funding status
		const sub = subscribe('validators', validators => {
			const _funded = Object.values(validators||{}).filter(val => val.status === 'AWAITING_ACTIVATION').length
			const _total = Object.values(validators||{}).length
			setButton(_funded < _total
				? <Button disabled>Awaiting funding ({_funded}/{_total})</Button>
				: <Button to='/'>Continue <IconArrowRight/></Button>
			)
		})

		return () => sub.unsubscribe()
	}, []) // eslint-disable-line

	return <Section 
		className={className}
		>
		
		<Section.Header 
			title='Deposit Funds'
		/>

		<Card>
			<AccountDetails/>
			<ValidatorDetails/>
			<MnemonicDetails/>
		</Card>

		<Card 
			disabled={accountState?.status !== 'CONNECTED'}
			disabledOverlay={
				<Placeholder
					compact
					horizontal
					status={'gradient'}
					lifted
					icon={<IconMetaMask defaultcolor='true'/>}
					title='Metamask not connected'
					text='Connect your metamask account in order to fund your validators.'
					>
					<Button 
						compact 
						onClick={() => accountTrigger('connect')}
						>
						Connect Metamask
					</Button> 
				</Placeholder>
			}
			>
			<TransactionList/>
		</Card>

		<Section.Footer>
			{button}
		</Section.Footer>
	</Section>
}