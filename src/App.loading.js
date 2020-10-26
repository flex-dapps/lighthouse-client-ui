import React from 'react';
import styled from 'styled-components'
import { AppLog, Loading, Tidbit } from '@components'
import { AppStore } from '@store'
import { Centered } from '@layouts'
import BackgroundGraphic from '@assets/graphic_lavalamp.png';

export default styled(
	({
		className,
		...rest
	}) => {
		const { state } = AppStore()

		return <Centered 
			className={`loading-screen ${className}`}
			data-visible={state.loading === true}
			background={BackgroundGraphic}
			{...rest}
			>
			
			<div className="-top">
				<h1>Initializing...</h1>
				<AppLog/>
			</div>

			<div className="-bottom">
				<Tidbit 
					title='Ethereum Lighthouse'
					subtitle='Validator Client —'
				/>

				<Tidbit 
					title='Developed & Secured By:'
					subtitle='Sigma Prime —'
					className={'-muted'}
				/>

				<Tidbit 
					title='Built On:'
					subtitle='Rust Programming Language —'
					className={'-muted'}
				/>
			</div>
			<Loading className={'-loading'}/>
		</Centered>
	})
	`
		z-index: 97;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.2s ease-in-out;
		background: var(--color-gradient-purp-horizontal);
		color: var(--color-light);
			
		.children{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
		}
		
		.-bottom{
			display: flex;
			align-items: center;

			.tidbit{
				min-width: 25rem;
				.-title{
					font-weight: 400;
					font-size: var(--font-size-normal);
				}
				.-subtitle{
					font-weight: 600;
					font-size: var(--font-size-normal);
					opacity: 1 
				}

				&.-muted{
					opacity: 0.5
				}
			}
		}

		.-loading{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%)
		}

		&[data-visible='true']{
			opacity: 1;
			pointer-events: all
		}
	`