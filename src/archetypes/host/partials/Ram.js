import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Ram = props => {
	const ram = Host.useHealth('ram')
	return <Widget 
		disabled={ram?.status === 'CONCERN' && ram.message}
		title='RAM'
		value={<LazyBoi value={ram.used}/>}
		info={<LazyBoi value={ram.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={ram.dataPoints}/>}
		{...props}
	/>
}

const Icon = props => {
	const ram = Host.useHealth('ram')
	return <Status.Dot 
		status={ram.status?.toLowerCase()} 
		{...props}
	/>
}

const Text = props => {
	const ram = Host.useHealth('ram')
	return <Status 
		status={ram.status?.toLowerCase()} 
		title={ram.message} 
		{...props}
	/>
}

const Minimal = props => {
	const ram = Host.useHealth('ram')
	return <Widget.Minimal
		title='RAM'
		subtitle='Utilization -'
		info={<LazyBoi value={ram.utilization}/>}
		extra={<Sparkline data={ram.dataPoints}/>}
		{...props}
	/>
}

const Full = props => {
	const ram = Host.useHealth('ram')
	return <Widget 
		title='RAM'
		value={<LazyBoi value={ram.used}/>}
		info={<LazyBoi value={ram.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={ram.dataPoints}/>}
		{...props}
	/>
}

Ram.Icon = Icon
Ram.Text = Text
Ram.Minimal = Minimal
Ram.Full = Full

export default Ram