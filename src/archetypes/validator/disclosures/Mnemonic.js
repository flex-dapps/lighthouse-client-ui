import React from 'react'
import { Panel, Button } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconValidators } from '@assets/validators.svg';

export default ({className}) => <Panel>
	<Panel.Graphic icon={<IconValidators/>} />
	<Panel.Content
		title='Mnemonic Disclosure'
		footer={
			<Button compact>
				Learn More <IconArrowRight/>
			</Button>
		}
	>
		<p>...copy</p>
	</Panel.Content>
</Panel>
