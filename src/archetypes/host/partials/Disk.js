import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Disk = props => {
	const disk = Host.useHealth('disk')
	return <Widget 
		disabled={disk.status === 'CONCERN' && disk.message}
		title='Disk'
		value={<LazyBoi value={disk.used}/>}
		info={<LazyBoi value={disk.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={disk.dataPoints}/>}
		{...props}
	/>
}

const Icon = props => {
	const disk = Host.useHealth('disk')
	return <Status.Dot 
		status={disk.status?.toLowerCase()} 
		{...props}
	/>
}

const Text = props => {
	const disk = Host.useHealth('disk')
	return <Status 
		status={disk.status?.toLowerCase()} 
		title={disk.message} 
		{...props}
	/>
}

const Minimal = props => {
	const disk = Host.useHealth('disk')
	return <Widget.Minimal
		title='Disk'
		subtitle='Utilization -'
		info={<LazyBoi value={disk.utilization}/>}
		extra={
			<Sparkline data={disk.dataPoints}/>
		}
		{...props}
	/>
}

const Full = props => {
	const disk = Host.useHealth('disk')
	return <Widget 
		title='Disk'
		value={<LazyBoi value={disk.used}/>}
		info={<LazyBoi value={disk.utilization}/>}
		extra={<Icon large/>}
		background={<Sparkline data={disk.dataPoints}/>}
		{...props}
	/>
}

Disk.Icon = Icon
Disk.Text = Text
Disk.Minimal = Minimal
Disk.Full = Full

export default Disk