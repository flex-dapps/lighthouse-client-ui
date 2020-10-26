import React from 'react'
import styled from 'styled-components'
import { Widget, Status, Progress } from '@components'
import { format } from '@util/helpers'
import { ReactComponent as EthLogo } from '@assets/logo_eth.svg';
import { Host } from '@archetypes' 

const StyledProgress = styled(
	({total=100, value=0, className, ...rest}) => {
		return <Progress.Circle
			className={className}
			total={total} 
			value={value}
			{...rest}
		/>
	})`
	.CircularProgressbar{
		font-size: 2rem;
		.CircularProgressbar-path{ stroke-width: 0.8em }
		.CircularProgressbar-trail{ stroke-width: 0.6em }
	}
	`


const Eth = props => {
	const fields = Host.useHealth('eth')
	return <Widget 
		disabled={fields.status === 'ERROR' && fields.message}
		title='ETH 1.0 Chain'
		value={`${format.commas(fields?.head_block_number)}/${format.commas(fields?.latest_cached_block_number)}`}
		info={<Status status={fields.status?.toLowerCase()} title={fields?.message}/>}
		extra={
			<StyledProgress 
				total={fields?.head_block_number} 
				value={fields?.latest_cached_block_number}
			/>
		}
		{...props}
	/>
}


const Full = styled(
	({className}) => {
		const fields = Host.useHealth('eth')
		return <Widget 
			disabled={fields.status === 'ERROR' && fields.message}
			className={className}
			title='ETH 1.0 Chain'
			value={`${format.commas(fields?.head_block_number)}/${format.commas(fields?.latest_cached_block_number)}`}
			info={<Status status={fields?.status} title={fields?.message}/>}
			background={
				<StyledProgress 
					total={fields?.head_block_number} 
					value={fields?.latest_cached_block_number}
					size={'24rem'}
					background={<EthLogo className='-spinner-icon'/>}
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
	const fields = Host.useHealth('eth')
	return <Widget.Minimal
		//disabled={fields.status === 'ERROR' && fields.message}
		title='ETH 1.0 Chain'
		subtitle='Syncing -'
		info={`${format.commas(fields?.head_block_number)}/${format.commas(fields?.latest_cached_block_number)}`}
		extra={
			<StyledProgress 
				total={fields?.head_block_number} 
				value={fields?.latest_cached_block_number}
			/>
		}
		{...props}
	/>
}

const Icon = props => {
	const fields = Host.useHealth('eth')
	return <Status.Dot status={fields?.status?.toLowerCase()} {...props}/>
}

const Text = props => {
	const fields = Host.useHealth('eth')
	return <Status status={fields?.status?.toLowerCase()} title={fields?.message} {...props}/>
}

Eth.Full = Full
Eth.Minimal = Minimal
Eth.Icon = Icon
Eth.Text = Text

export default Eth
