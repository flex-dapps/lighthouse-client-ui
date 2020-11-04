import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Centered } from '@layouts'
import { Button, Tidbit, Status } from '@components'
import { AppStore, HostStore } from '@store'
import { ReactComponent as IconLogo } from '@assets/lighthouse_logo.svg';
import BackgroundGraphic from '@assets/graphic_lavalamp.png';

export default styled(
	({className, ...rest}) => {
		const { history } = AppStore()
		const { state } = HostStore()

		return <Centered 
			className={className}
			background={BackgroundGraphic}
			{...rest}
			>
			
			<div className="-top">
				<IconLogo className='-logo'/>

				<h1 className='-title'>
					Hello {state?.name},<br/>
					Welcome to <strong>LIGHTHOUSE</strong><br/> 
					the Ethereum Validator Client
				</h1>

				<Button to={'/onboarding/health'}>
					Create Validator —
				</Button>

				<Button disabled={'soon'}>
					Import Account —
				</Button>
			</div>

			<div className="-bottom">
				
				<Tidbit 
					title='Skip setup process'
					info='Some info goes here'
					subtitle='Continue dashboard with limited functionality -'
					onClick={() => history.push('/')}
					strong
				/>

				<Tidbit 
					className='-network'
					title={`${state?.address}:${state?.port_bn}`}
					subtitle={
						<Fragment>
							<Status.Dot status={'success'} small/> 
							Beacon Node: 
							<strong>{state?.lighthouse?.bn?.spec?.CONFIG_NAME}</strong>
						</Fragment>
					}
					right
					strong
				/>
			</div>	

		</Centered>
	})`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: var(--color-dark);
	color: var(--color-light);

	.children{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}
	
	.-logo{
		font-size: 6.3rem;
		margin: 5.5rem 0 6.5rem;
	}

	.-background{
		background-size: 105%;
	}

	.-title{
		font-size: var(--font-size-xxlarge);
		line-height: 1.25em;
		letter-spacing: 0.018em;
		margin-bottom: calc(3.3rem + 1.2vw);
		strong{
			font-weight: 900;
		}
	}

	.button + .button {
		margin-left: 3rem;
	}
	
	.-bottom{
		padding-top: 4vw;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.-network {
			text-align: right;
			.tidbit-subtitle{
				text-transform: capitalize;
			}
		}
	}
	`