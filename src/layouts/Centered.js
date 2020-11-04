import React from 'react';
import styled from 'styled-components'

const Children = styled(
	({
		children, 
		className
	}) => 
		<main className={`-children ${className}`}>{children}</main>
	)`
		max-width: 114.4rem;
		width: 100%;
		margin: 0 auto;
	`

const Background = styled(
	({
		src, 
		className
	}) => 
		src 
			? typeof src.type === 'object'
				? React.cloneElement(src, {className: `-background ${className}`})
				: <span className={`-background ${className}`}/>
			: null
	)
	`
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 100%;

		${({src}) => {
			return typeof src === 'string' && `
				background-image: url(${src});
				background-size: cover;
				background-position: 80% 50%;
			`
		}}
	`

export default styled(
	({
		background, 
		children, 
		className, 
		...rest
	}) => 
		<div className={`layout -centered ${className}`} {...rest}>
			<Children children={children} className='children'/>
			<Background src={background}/>
		</div>
	)
	`
		display: flex;
		align-items: center;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		overflow-y: scroll;
		padding: 5.5vw 4vw;

		background: var(--color-light);
		color: var(--color-dark);

		.-children{
			z-index: 1;
		}

		.-background{
			z-index: 0;
		}
	`