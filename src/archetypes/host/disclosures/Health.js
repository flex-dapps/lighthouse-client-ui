import React from 'react'
import { Panel, Button } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { ReactComponent as IconHealth } from '@assets/health.svg';

export default ({className}) => <Panel>
	<Panel.Graphic icon={<IconHealth/>} />
	<Panel.Content
		title='Health Check Disclosures'
		footer={
			<Button compact>
				Learn More <IconArrowRight/>
			</Button>
		}
	>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
		<p>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
	</Panel.Content>
</Panel>
