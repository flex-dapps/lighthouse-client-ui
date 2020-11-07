import React from 'react';
import styled from 'styled-components'
import { ReactComponent as IconSpinner } from '@assets/spinner_50.svg';
import { ReactComponent as IconLogo } from '@assets/lighthouse_logo.svg';

export default styled(
	({
		className
	}) => 
		<span 
			className={className}
			>
			<IconLogo 
				className={'-logo'}
			/>
			<span>
				<IconSpinner 
					className={'-spinner'} 
					animate='spin-slow'
				/>
			</span>
		</span>
	)`
		position: relative;

		>*{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%)
		}

		.-logo{
			width: 2rem;
			height: 2rem;
			margin-top: -0.1em;
		}

		.-spinner{
			width: 3.6rem;
			height: 3.6rem;
			//opacity: 0.8;
		}
	`