import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Centered } from '@layouts'
import { Host } from '@archetypes'
import { HostStore } from '@store'
import { ReactComponent as BackgroundGraphic } from '@assets/graphic_logo.svg';

export default styled(
	({className, ...rest}) => {
		const { state, history } = HostStore()

		useEffect(() => {
			if(state.lighthouse?.status === 'CONNECTED'){
				history.push('/welcome')
			}
		})

		return <Centered
			className={className}
			background={<BackgroundGraphic/>}
			{...rest}
			>
			<Host.Connect/>
		</Centered>
	})`
	@keyframes _spin {
	    from {transform: rotate(0deg);}
	    to {transform: rotate(360deg);}
	}

	background: var(--color-dark);
	color: var(--color-light);
	
	.-background{
		right: -23vw;
		top: -10vh;
		width: auto;
		height: 120vh;
		
		transform-origin: 50%;
		animation-name: _spin;
		animation-duration: 400000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}
	`