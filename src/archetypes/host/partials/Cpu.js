import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const CPU = props => {
	const cpu = Host.useHealth('cpu')
	return <Widget 
		disabled={cpu?.status === 'CONCERN' && cpu.message}
		title='CPU'
		value={<LazyBoi value={cpu?.used}/>}
		info={<LazyBoi value={cpu?.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={cpu?.dataPoints}/>}
		{...props}
	/>
}

const Icon = props => {
	const cpu = Host.useHealth('cpu')
	return <Status.Dot 
		status={cpu?.status?.toLowerCase()} 
		{...props}
	/>
}

const Text = props => {
	const cpu = Host.useHealth('cpu')
	return <Status 
		status={cpu?.status?.toLowerCase()} 
		title={cpu?.message} 
		{...props}
	/>
}

const Minimal = props => {
	const cpu = Host.useHealth('cpu')
	return <Widget.Minimal
		title='CPU'
		subtitle='Utilization -'
		info={<LazyBoi value={cpu?.utilization}/>}
		extra={
			<Sparkline data={cpu?.dataPoints}/>
		}
		{...props}
	/>
}

const Full = props => {
	const cpu = Host.useHealth('cpu')
	return <Widget 
		title='CPU'
		value={<LazyBoi value={cpu?.used}/>}
		info={<LazyBoi value={cpu?.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={cpu?.dataPoints}/>}
		{...props}
	/>
}

CPU.Icon = Icon
CPU.Text = Text
CPU.Minimal = Minimal
CPU.Full = Full

export default CPU