import React from 'react';
import styled from 'styled-components'
import { NavLink } from "react-router-dom"
import { useBit } from '@util/hooks'
import { Placeholder } from '@components'
import { ReactComponent as LighthouseLogo} from '@assets/lighthouse_logo.svg';
import { ReactComponent as IconDashboard} from '@assets/dashboard.svg';
import { ReactComponent as IconValidators} from '@assets/validators.svg';
import { ReactComponent as IconChart} from '@assets/chart.svg';
import { ReactComponent as IconCli} from '@assets/cli.svg';

const Header = styled(
	({
		...props
	}) => 
		<header 
			{...props}
			>
			<div className="-inner">
				:::[HEADER]:::
			</div>
		</header>
	)
	`
		border-bottom: 1px solid var(--color-grey-50);
		color: var(--color-grey-300);

		.-inner{
			display: flex;
		}
	`

const Footer = styled(
	({
		...props
	}) => 
		<header 
			{...props}
			>
			<div className="-inner">
				:::[FOOTER]:::
			</div>
		</header>
	)
	`
		background: var(--color-grey-50);
		color: var(--color-grey-400);

		.-inner{
			display: flex;
		}
	`

const SideNav = styled(
	({
		...props
	}) => {
		const [ open, flip ] = useBit()
		return <div 
			{...props}
			data-open={open}
			>
			<div className="-inner">
				<LighthouseLogo className='-logo' onClick={flip}/>
				<nav>
					<NavLink className='-navlink' exact to='/'><IconDashboard className='-navlink-icon'/></NavLink>
					<NavLink className='-navlink' exact to='/validators'><IconValidators className='-navlink-icon'/></NavLink>
					<NavLink className='-navlink' exact to='/metrics'><IconChart className='-navlink-icon'/></NavLink>
					<NavLink className='-navlink' exact to='/cli'><IconCli className='-navlink-icon'/></NavLink>
				</nav>
			</div>
		</div>
	})
	`
		border-right: 1px solid var(--color-grey-50);
		//padding: 1.75rem 0;
		height: 100vh;
		min-width: 5rem;
		width: auto;
		transition: min-width 0.2s ease-out;

		.-inner{
			display: flex;
			flex-direction: column;
			//align-items: center;
		}

		.-logo{
			width: 2.5rem;
			height: 2.5rem;
			cursor: pointer;
			margin: 1.5rem;
		}

		nav{
			margin-top: 2rem;
			display: flex;
			flex-direction: column;
			//align-items: center;

			.-navlink{
				display: block;
				opacity: 0.3;
				transition: opacity 0.2s ease-in-out;
				position: relative;
				padding: 0 2rem;

				.-navlink-icon{
					width: 1.6rem;
					height: 1.6rem;
					display: block;
				}

				& + .-navlink{
					margin-top: 2em;
				}

				

				&:before{
					content: '';
					position: absolute;
					top: -0.3rem;
					left: -3rem;
					height: calc(100% + 0.6rem);
					width: 0.3rem;
					background: var(--color-gradient-purp);
					transition: left 0.15s ease-in-out;
				}

				&:hover,
				&.active{
					opacity: 1;
					&:before{
						left: 0;
					}
				}

			}

		}

		&[data-open='true']{
			min-width: 25rem;
		}
	`

export default styled(
	({
		children, 
		className, 
		...rest
	}) => 
		<div className={`layout -dashboard ${className}`} {...rest}>
			<SideNav/>
			<main>
				<Header className='-dashboard-header'/>
				<div className="-dashboard-children">{children}</div>
				<Footer className='-dashboard-footer'/>
			</main>

			<div className="overlay">
				<Placeholder
					lifted
					status={'gradient'}
					icon={<LighthouseLogo/>}
					title='Lighthouse Dashboard [WIP]'
					text='The lighthouse dashboard <strong>coming soon</strong>.<br/>Manage your ETH 2.0 validators.'
				/>
			</div>
		</div>
	)
	`
		height: 100vh;
		display: flex;

		>main{
			height: 100vh;
			width: 100%;
			display: flex;
			flex-direction: column;

			>*{
				display: block;
				padding: 2rem;
			}

			.-dashboard-header{
				
			}

			.-dashboard-children{
				height: 100vh;
				
			}

			.-dashboard-footer{
				
			}
		}

		>.overlay{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			background: rgba(0,0,0,0.1);
			backdrop-filter: blur(0.3rem);

			.placeholder{
				position: fixed;
				top: 43%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: white;
				padding-bottom: 4rem;
				
			}
		}
	`