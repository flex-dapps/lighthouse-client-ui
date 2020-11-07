import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Network = props => {
	const network = Host.useHealth('network')
	return <Widget 
		title='Network'
		//value={<LazyBoi value={network.used}/>}
		info={<LazyBoi value={(network.rx_bytes * 0.000001).toFixed(2)} suffix='MB'/>}
		extra={<Icon large/>}
		background={<Sparkline data={network.datapoints} width={312} height={100} min={network.datapoints[network.datapoints.length - 1] * 0.9995} max={network.datapoints[network.datapoints.length - 1] * 1.0005}/>}
		{...props}
	/>
}

const Icon = props => {
	//const network = Host.useHealth('network')
	return <Status.Dot 
		status={'ok'} 
		lifted
		{...props}
	/>
}

const Text = props => {
	const network = Host.useHealth('network')
	return <Status 
		status={network.status} 
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