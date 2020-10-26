import React from 'react'
import styled from 'styled-components'
import { Widget, Status, Progress } from '@components'
import { format } from '@util/helpers'
import { ReactComponent as EthLighthouseLogo } from '@assets/logo_eth_lighthouse.svg';
import { Host } from '@archetypes' 

const StyledProgress = styled(
	({total=100, value=0, className}) => {
		return <Progress.Circle
			className={className}
			total={total} 
			value={value}
		/>
	})`
	.CircularProgressbar{
		font-size: 2rem;
		.CircularProgressbar-path{ stroke-width: 0.8em }
		.CircularProgressbar-trail{ stroke-width: 0.6em }
	}
	`

const Beacon = props => {
	const fields = Host.useHealth('beacon')
	return <Widget 
		disabled={fields.status === 'CONCERN' && fields.message}
		title='Beacon Node'
		value={`${format.commas(fields?.head_slot)}/${format.commas(fields?.total_slots)}`}
		info={<Status status={fields.status?.toLowerCase()} title={fields?.message}/>}
		extra={
			<StyledProgress 
				total={fields?.total_slots} 
				value={fields?.head_slot}
			/>
		}
		{...props}
	/>
}


const Full = styled(
	({className}) => {
		const fields = Host.useHealth('beacon')

		return <Widget 
			disabled={fields.status === 'ERROR' && fields.message}
			className={className}
			title='Beacon Node'
			value={`${format.commas(fields?.head_slot)}/${format.commas(fields?.total_slots)}`}
			info={<Status status={fields?.status} title={fields?.message}/>}
			background={
				<Progress.Circle 
					total={fields?.total_slots} 
					value={fields?.head_slot}
					size={'24rem'}
					background={<EthLighthouseLogo className='-spinner-icon'/>}
				/>
			}
		/>
	})`
	height: 30rem !important;
	.-spinner-icon{
		font-size: 8rem;
		opacity: 0.1
	}
	`

const Minimal = props => {
	const fields = Host.useHealth('beacon')
	return <Widget.Minimal
		title='Beacon Chain'
		subtitle='Syncing -'
		info={`${format.commas(fields?.head_slot)}/${format.commas(fields?.total_slots)}`}
		extra={
			<StyledProgress 
				total={fields?.total_slots} 
				value={fields?.head_slot}
			/>
		}
		{...props}
	/>
}

const Icon = props => {
	const fields = Host.useHealth('beacon')
	return <Status.Dot status={fields?.status?.toLowerCase()} lifted {...props}/>
}

const Text = props => {
	const fields = Host.useHealth('beacon')
	return <Status status={fields?.status?.toLowerCase()} title={fields?.message} {...props}/>
}

Beacon.Full = Full
Beacon.Minimal = Minimal
Beacon.Icon = Icon
Beacon.Text = Text

export default Beacon
