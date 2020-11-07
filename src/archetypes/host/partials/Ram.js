import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Ram = props => {
	const memory = Host.useHealth('memory')
	return <Widget 
		title='RAM'
		value={<LazyBoi value={(memory.total * 0.000000001).toFixed(2)} suffix='GB' tight/>}
		info={<LazyBoi value={memory.gauge_pct} suffix='% Utilization' tight/>}
		extra={<Icon large/>}
		background={<Sparkline data={memory.datapoints} width={312} height={100}/>}
		{...props}
	/>
}

const Icon = props => {
	const memory = Host.useHealth('memory')
	return <Status.Dot 
		status={memory.status}
		lifted
		{...props}
	/>
}

const Text = props => {
	const memory = Host.useHealth('memory')
	return <Status 
		status={memory.status} 
		title={memory.message} 
		{...props}
	/>
}

const Minimal = props => {
	const memory = Host.useHealth('memory')
	return <Widget.Minimal
		title='RAM'
		subtitle='Utilization -'
		info={<LazyBoi value={memory.utilization}/>}
		extra={<Sparkline data={memory.dataPoints}/>}
		{...props}
	/>
}

const Full = props => {
	const memory = Host.useHealth('memory')
	return <Widget 
		title='RAM'
		value={<LazyBoi value={memory.used}/>}
		info={<LazyBoi value={memory.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={memory.dataPoints}/>}
		{...props}
	/>
}

Ram.Icon = Icon
Ram.Text = Text
Ram.Minimal = Minimal
Ram.Full = Full

export default Ram