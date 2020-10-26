import React, { Fragment } from 'react';
import { Button, Scroll, Section, Card, DisclosureButton, Placeholder } from '@components'
import { Validator } from '@archetypes'
import { ValidatorStore } from '@store'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg'
import { ReactComponent as IconPlus } from '@assets/circle_add_outline.svg'
import { ReactComponent as IconValidator } from '@assets/validators.svg'

const SidePanel = 
	({
		className, 
		...rest
	}) => 
		<Card.Column 
			className={`aside ${className}`}
			{...rest}
			footer={
				<DisclosureButton>
					<Validator.Disclosure.Returns/>
				</DisclosureButton>
			}
			>
			<Validator.Partial.Investment.Full/>
			<Card.Column.Divider/>
			<Validator.Partial.Reward.Full/>
			<Card.Column.Divider/>
		</Card.Column>	

const MainPanel = 
	({
		className, 
		...rest
	}) => {
		const { state, trigger } = ValidatorStore()
		
		return <Card.Column 
			name={
				<Fragment>
					Validator<br/>
					Creation &mdash;
				</Fragment>
			}
			title='Choose the validators you would like to start running'
			subtitle='Requires seperate transactions for each validator'
		 	className={`main ${className}`}
		 	{...rest}
			>

			<Card.Controls>
				{
					Object.keys(state?.validators).length > 0 &&
						<Card.Controls.Column right>
							<Button 
								inline
								large
								icon={<IconPlus/>}
								onClick={() => trigger('validator.add')}
								className='-add'
								style={{color: 'var(--color-primary-1)'}}
								>
								<IconPlus/> Add validator
							</Button>
						</Card.Controls.Column>
				}
			</Card.Controls>

			{
				Object.keys(state?.validators).length > 0
					? <Scroll 
						className="validators"
						maxHeight={250}
						style={{marginTop: '2rem'}}
						>
						{
							Object.keys(state?.validators).reverse().map(id => <Validator.Partial.Row.Editable key={id} id={id}/>)
						}
					</Scroll>
					: <Placeholder
						muted
						title='No validators'
						text='Add your first validator to get started.'
						icon={<IconValidator/>}
						>
						<Button 
							action
							onClick={() => trigger('validator.add')}
							>
							Add a validator
						</Button> 
					</Placeholder>
			}
		</Card.Column>	
	}

export default 
	({
		className
	}) => {
		const { state } = ValidatorStore()
		
		return <Section className={className}>

			<Section.Header title='Create Validators'/>

			<Card>
				<MainPanel width={72}/>
				<SidePanel width={28}/>
			</Card>

			<Section.Footer>
				<Button 
					disabled={!Object.keys(state?.validators).length}
					to='/onboarding/mnemonic'>
					Generate Keys 
					<IconArrowRight/>
				</Button>
			</Section.Footer>
		</Section>
}