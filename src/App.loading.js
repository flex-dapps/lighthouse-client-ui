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
			
			<div>
				<h1 className='-title'>Initializing...</h1>
				<AppLog count={20}/>
			</div>

			<div>
				<Tidbit 
					title='Ethereum Lighthouse'
					subtitle='Validator Client —'
				/>

				<Tidbit 
					title='Developed & secured by:'
					subtitle='Sigma Prime'
					className={'-muted'}
				/>

				<Tidbit 
					title='Built on:'
					subtitle='Rust Programming Language'
					className={'-muted'}
				/>

				<Tidbit 
					title='Asembled by:'
					subtitle='Flex Dapps'
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

			>div:nth-child(1){
				margin-top: 3vw
			}

			>div:nth-child(2){
				display: flex;
				align-items: center;

				.tidbit{
					min-width: 22rem;

					.tidbit-title,
					.tidbit-subtitle{
						opacity: 1;
						font-size: var(--font-size-small);
						opacity: 1 
					}
					
					.tidbit-subtitle{
						font-weight: 600;
					}

					&.-muted{
						opacity: 0.5
					}
				}
			}

			.-title{
				font-size: var(--font-size-medium);
				margin-bottom: 0;
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