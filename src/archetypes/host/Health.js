import React from 'react'
import { Link } from "react-router-dom";
import { Button, Grid, Widget, Section } from '@components'
import { ReactComponent as IconHealth } from '@assets/health.svg';
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { Host } from '@archetypes'

export default ({className}) => <Section 
	className={className}
	>

	<Section.Header
		context={[
			<Link to={'/welcome'}>Welcome</Link>,
			'Health'
		]}
		title='Host Health Check'
		titleIcon={<IconHealth/>}
	/>

	<Grid 
		width={[16,28,28,28]}
		>
		<Widget.Title 
			title={'Device Diagnostics'} 
			info={'Host information and metrics'}
		/>
		<Host.Partial.Disk/>
		<Host.Partial.Cpu/>
		<Host.Partial.Ram/>
	</Grid>

	<Grid 
		width={[16,28,28,28]}
		>
		<Widget.Title 
			title={'Network Diagnostics'} 
			info={'Network information and metrics'}
		/>
		<Host.Partial.Network/>
		<Host.Partial.Eth/>
		<Host.Partial.Beacon/>
	</Grid>

	<Grid 
		cols={1}
		>
		<Host.Partial.Health.Overview/>
	</Grid>
	
	<Section.Footer>
		<Button 
			to={'/onboarding/syncing'}
			>
			Continue
			<IconArrowRight/>
		</Button>
	</Section.Footer>
</Section>
