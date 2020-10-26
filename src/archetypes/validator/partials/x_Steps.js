import React from 'react';
import styled from 'styled-components'
import { Bullets } from '@components'

export default styled(
	props => {
		return <section {...props}>
			<h1>Staking Progress —</h1>
			<Bullets.Numbered 
				title='Staking Progress'
				items={[
					'Understand your duties',
					'Validator setup',
					'Generate keypairs and password',
					'Deposit ETH & stake funds',
					'Activate',
				]}
			/>
		</section>
	})`
	position: relative;

	h1{
		font-size: 12px;
		font-weight: bold;
		text-transform: uppercase;
		color: var(--color-grey-300)
	}

	ol{
		li:first-child:before{
			//background: yellow;
		}
	}

	&:before{
		content: '';
		position: absolute;
		top: 2.5em;
		left: 0.8em;
		height: calc(100% - 1.5em);
		width: 1px;
		background: var(--color-grey-300);
		z-index: 0;
	}

	`