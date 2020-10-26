import React from 'react'
import { Link } from "react-router-dom";
import { Panel, Flipper, Section } from '@components'
import { ReactComponent as EthLogo } from '@assets/logo_eth.svg';

export default ({className}) => <Section className={className}>
	<Section.Header 
		context={[
			<Link to={'/onboarding/overview'}>Overview</Link>,
			'Duties'
		]}
		title='Understand Your Duties'
	/>

	<Flipper pagination={true}>
		
		<Flipper.Item>
			<Panel>
				<Panel.Graphic icon={<EthLogo/>} />
				<Panel.Content title='Phase 0' >
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
					<p>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
				</Panel.Content>
			</Panel>
		</Flipper.Item>

		<Flipper.Item>
			<Panel>
				<Panel.Graphic icon={<EthLogo/>} />
				<Panel.Content title='Phase 0' >
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
					<p>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
				</Panel.Content>
			</Panel>
		</Flipper.Item>

		<Flipper.Item>
			<Panel>
				<Panel.Graphic icon={<EthLogo/>} />
				<Panel.Content title='Phase 0' >
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
					<p>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
				</Panel.Content>
			</Panel>
		</Flipper.Item>

		<Flipper.Item
			button={{
				to: '/onboarding/validators',
				text: 'I understand and accept',
				onClick: () => {
					//set('duties.accepted', true)
				}
			}}
			>
			<Panel>
				<Panel.Graphic icon={<EthLogo/>} />
				<Panel.Content title='Phase 0' >
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis</p>
					<p>nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum</p>
				</Panel.Content>
			</Panel>
		</Flipper.Item>

	</Flipper>
</Section>