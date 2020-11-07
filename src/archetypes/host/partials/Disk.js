import React from 'react'
import { Widget, Status, Sparkline, LazyBoi } from '@components'
import { Host } from '@archetypes' 

const Disk = props => {
	const disk = Host.useHealth('disk')
	return <Widget 
		//disabled={disk.status === 'warn' && disk.message}
		title='Disk'
		value={<LazyBoi value={(disk.total * 0.000000001).toFixed(2)} suffix='GB' tight/>}
		info={<LazyBoi value={disk.gauge_pct} suffix='% Utilization' tight/>}
		extra={<Icon large/>}
		background={<Sparkline data={disk.datapoints} width={312} height={100}/>}
		{...props}
	/>
}

const Icon = props => {
	const disk = Host.useHealth('disk')
	return <Status.Dot 
		status={disk.status}
		lifted
		{...props}
	/>
}

const Text = props => {
	const disk = Host.useHealth('disk')
	return <Status 
		status={disk.status} 
		title={disk.message} 
		{...props}
	/>
}

const Minimal = props => {
	const disk = Host.useHealth('disk')
	return <Widget.Minimal
		title='Disk'
		subtitle='Utilization -'
		info={<LazyBoi value={disk.gauge_pct}/>}
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