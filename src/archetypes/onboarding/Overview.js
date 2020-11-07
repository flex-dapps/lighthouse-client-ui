import React from 'react'
import styled from 'styled-components'
import { Button, Section } from '@components'
import { ReactComponent as IconArrowRight } from '@assets/arrow_right.svg';
import { Onboarding } from '@archetypes'

export default styled(
	({className}) => <Section 
		className={className}
		>
		
		<Section.Header title='Overview'/>

		<h1 className={'-title'}>
			While you wait for the sync to complete, let’s get you setup with the Staking and Validation process.
		</h1>

		<Onboarding.Partial.Steps/>

		<Section.Footer>
			<Button to={'/onboarding/duties'}>
				Let's get started
				<IconArrowRight/>
			</Button>
		</Section.Footer>
	</Section>
	)`
	.-title{
		font-size: var(--font-size-xxxlarge);
		line-height: 1.26em;
		max-width: 95rem;
		font-weight: 300;
		letter-spacing: 0.01em;
		background: var(--color-gradient-purp-horizontal);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	`