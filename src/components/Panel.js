import React from 'react';
import styled from 'styled-components'
import ModalBackground from '@assets/background_modal.png';

const Panel = styled(
	({children, className}) => {
		return <section className={`panel ${className}`}>
			{children}
		</section>
	})`

	display: flex;
	align-items: stretch;
	justify-content: space-between;
	background: var(--color-grey-25);

	.panel-content{
		width: 100%;
	}

	.panel-graphic{
		width: 30%;

		& + .panel-content{
			width: 70%;
		}
	}
	`

Panel.Graphic = styled(
	({icon, className, ...rest}) => {
		return <aside 
			className={`panel-graphic ${className}`} 
			{...rest} 
			style={{backgroundImage: `url(${ModalBackground})`}}
			>
			{icon && <span className="panel-graphic-icon">{icon}</span>}
		</aside>
	})`
	position: relative;
	display: block;
	background-color: var(--color-primary-1);
	background-size: cover;
	background-position: 50%;

	.panel-graphic-icon{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		max-width: 80%;
		max-height: 80%;

		svg{
			width: 100%;
			height: 100%;
			max-width: 80%;
			max-height: 80%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;
		}
	}
	`

Panel.Content = styled(
	({title, subtitle, children, footer, className}) => 
		<article 
			className={`panel-content ${className}`}
			>
			<div className="-top">
				{title && <h1>{title}</h1>}
				{subtitle && <h2>{subtitle}</h2>}
				<span className='panel-content-children'>{children}</span>
			</div>

			<footer>
				{footer}
			</footer>
		</article>
	)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 2em;
	min-height: 40rem;

	h1,h2{
		margin: 0 0 1em 0;
		line-height: 1em;
	}

	h1{
		font-size: 2.4rem;
		color: var(--color-grey-900)
	}

	h2{
		font-size: 2rem;
		color: var(--color-grey-400)
	}

	.panel-content-children{
		font-size: var(--font-size-medium);
		color: var(--color-grey-800)
	}


	`

export default Panel