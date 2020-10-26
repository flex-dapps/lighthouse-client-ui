import React from 'react'
import { Link } from "react-router-dom";
import { Button, Section, Grid } from '@components'
import { ReactComponent as IconSync } from '@assets/sync.svg';
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { Host } from '@archetypes'

export default ({className}) => <Section className={className}>
	<Section.Header
		context={[
			<Link to={'/onboarding/health'}>Health Check</Link>,
			'Syncing'
		]}
		title='Syncing'
		titleIcon={<IconSync/>}
	/>

	<Grid cols={2}>
		<Host.Partial.Eth.Full/>
		<Host.Partial.Beacon.Full/>
	</Grid>
	
	<Grid cols={1}>
		<Host.Partial.SyncOverview/>
	</Grid>
	
	<Section.Footer>
		<Button to={'/onboarding/overview'}>
			Continue
			<IconArrowRight/>
		</Button>
	</Section.Footer>
</Section>