import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Network = props => {
	const network = Host.useHealth('network')
	return <Widget 
		disabled={network.status === 'CONCERN' && network.message}
		title='Network'
		value={<LazyBoi value={network.used}/>}
		info={<LazyBoi value={network.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={network.dataPoints}/>}
		{...props}
	/>
}

const Icon = props => {
	const network = Host.useHealth('network')
	return <Status.Dot 
		status={network.status?.toLowerCase()} 
		{...props}
	/>
}

const Text = props => {
	const network = Host.useHealth('network')
	return <Status 
		status={network.status?.toLowerCase()} 
		title={network.message} 
		{...props}
	/>
}

const Minimal = props => {
	const network = Host.useHealth('network')
	return <Widget.Minimal
		title='Network'
		subtitle='Utilization -'
		info={<LazyBoi value={network.utilization}/>}
		extra={
			<Sparkline data={network.dataPoints}/>
		}
		{...props}
	/>
}

const Full = props => {
	const network = Host.useHealth('network')
	return <Widget 
		title='Network'
		value={<LazyBoi value={network.used}/>}
		info={<LazyBoi value={network.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={network.dataPoints}/>}
		{...props}
	/>
}

Network.Icon = Icon
Network.Text = Text
Network.Minimal = Minimal
Network.Full = Full

export default Network