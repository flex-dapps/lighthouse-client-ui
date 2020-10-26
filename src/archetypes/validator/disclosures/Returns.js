import React from 'react'
import { Panel, Button } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconValidators } from '@assets/validators.svg';

export default ({className}) => <Panel>
	<Panel.Graphic icon={<IconValidators/>} />
	<Panel.Content
		title='Validator Returns Disclosure'
		footer={
			<Button compact>
				Learn More <IconArrowRight/>
			</Button>
		}
	>
		<p>You are currently syncing to the Ethereum Geth and Beacon node. This may take a while... None of this information is supposed to be taken as a guarantee.</p>
		<p> The only way to become a validator is to make a one-way GöETH transaction to the deposit contract on the current Ethereum chain.</p>
	</Panel.Content>
</Panel>
