import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Status, Card, Widget, DisclosureButton } from '@components'
import { Host } from '@archetypes'

const Health = () => {}

const Icon = props => {
	const data = Host.useHealth('host')
	return <Status.Dot 
		status={data?.status?.toLowerCase()} 
		{...props}
	/>
}

const Text = props => {
	const data = Host.useHealth('host')
	return <Status 
		status={data?.status?.toLowerCase()} 
		title={data?.message} 
		{...props}
	/>
}

const Minimal = styled(
	props => {
		const data = Host.useHealth('host')
		return <Widget.Minimal
			title='Health Check'
			subtitle={`Uptime: ${data?.metric1||'-'}`}
			info={data?.message}
			extra={<Status.Dot status={data?.status} large className='health-status'/>}
			{...props}
		/>
	})`
		.health-status{
			font-size: 1rem
		}
	`

const Full = () => null

const Overview = ({className, ...rest}) => <Card>
	<Card.Column 
		name={<Fragment>Diagnostics<br/>Overview &mdash;</Fragment>}
		width={72}
		footer={
			<DisclosureButton>
				<Host.Disclosure.Health/>
			</DisclosureButton>
		}
		{...rest}
		roomy
		>

		<Host.Partial.Disk.Text/>
		<Host.Partial.Cpu.Text/>
		<Host.Partial.Ram.Text/>
		<Host.Partial.Network.Text/>
		<Host.Partial.Eth.Text/>
		<Host.Partial.Beacon.Text/>
	</Card.Column>

	<Card.Column 
		title={'Uptime'}
		width={28}
		noborder
		footer={
			<Text style={{fontSize: '1.6rem'}}/>
		}
		>
	</Card.Column>
</Card>


Health.Icon = Icon 
Health.Text = Text 
Health.Minimal = Minimal
Health.Full = Full
Health.Overview = Overview

export default Health