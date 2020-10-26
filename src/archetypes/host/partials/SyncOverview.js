import React, { Fragment } from 'react'
import { Card, DisclosureButton } from '@components'
import { Host } from '@archetypes'

export default ({
		className
	}) => 
		<Card>
			<Card.Column 
				name={
					<Fragment>
						Syncing<br/>
						Overview &mdash;
					</Fragment>
				}
				title='You are currently syncing to Ethereum Geth and Beacon node. This may take a while.'
				footer={
					<DisclosureButton>
						<Host.Disclosure.Syncing/>
					</DisclosureButton>
				}
				roomy
				>

				<Host.Partial.Eth.Text/>
				<Host.Partial.Beacon.Text/>
			</Card.Column>
		</Card>
