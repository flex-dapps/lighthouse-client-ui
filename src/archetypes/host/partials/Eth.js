import React from 'react'
import styled from 'styled-components'
import { Widget, Status, Progress, LazyBoi } from '@components'
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
		font-size: 3rem;
		.CircularProgressbar-path{ stroke-width: 0.6em }
		.CircularProgressbar-trail{ stroke-width: 0.4em }
	}
	`


const Eth = props => {
	const fields = Host.useHealth('eth')
	return <Widget 
		//disabled={fields.status === 'ERROR' && fields.message}
		title='ETH 1.0 Chain'
		value={<LazyBoi value={(100 / fields?.head_block_number * fields?.latest_cached_block_number||0)} suffix='%' tight/>}
		info={<Status status={fields?.status} title={fields?.latest_cached_block_number||'No ETH1 connection'}/>}
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
			className={className}
			title='ETH 1.0 Chain'
			value={`${format.commas(fields?.head_block_number)}/${format.commas(fields?.latest_cached_block_number)}`}
			info={<Status status={fields?.status} title={fields?.latest_cached_block_number||'No ETH1 connection'}/>}
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

	.-background{
		width: auto;
		height: auto;
	}

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
		subtitle={fields?.head_block_number ? 'Syncing -' : <Status status={fields?.status} title='Error'/>}
		info={
			fields?.head_block_number 
				? <LazyBoi value={fields?.head_block_number && format.commas(fields?.head_block_number)} suffix={`/ ${format.commas(fields?.latest_cached_block_number)}`}/>
				: null
		}
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
	return <Status.Dot 
		status={fields?.status} 
		{...props}
		lifted
		/>
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
