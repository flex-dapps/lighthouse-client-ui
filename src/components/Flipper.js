import React, { useState } from 'react';
import styled from 'styled-components'
import { get } from 'lodash'
import { Button } from '@components'
import { ReactComponent as ArrowRight } from '@assets/arrow_right.svg';

const Pagination = styled(
	({count=0, active=0, onClick=()=>{}, className, ...rest}) => {
		return <div className={`flipper-pagination ${className}`}>
			{[...Array(count)].map((_, i) => <span key={i} className='flipper-pagination-item' data-state={i === active ? '✔' : (i < active ? '«' : '»')} onClick={() => onClick(i)}/>)}
		</div>
	})`
	
	.flipper-pagination-item{
		width: 2rem;
		height: 0.5rem;
		display: inline-block;
		margin-right: 0.5em;
		cursor: pointer;
		background: var(--flipper--pagintation--color, currentColor);
		transition: all 0.5s ease-in-out;

		&[data-state='✔']{
			opacity: 1;
			width: 4rem;
		}

		&[data-state='»']{
			pointer-events: none;
			opacity: 0.2
		}

		&[data-state='«']{
			opacity: 0.7
		}
	}
	`

const Flipper = styled(
	({pagination=false, children, className}) => {
		
		const [ current, setCurrent ] = useState(0)
		const childrenLength = React.Children.count(children)

		const _next = () => current + 1 < childrenLength && setCurrent(current + 1)
		const _prev = () => current - 1 >= 0 && setCurrent(current - 1)
		const _goto = index => setCurrent(index)

		return <div className={`flipper ${className}`}>
			{!!pagination && <Pagination count={childrenLength} active={current} onClick={i => _goto(i)}/>}

			{React.Children.map(children, (child, i) => React.cloneElement(child, {
				index: i, 
				current: current, 
				next: _next,
				prev: _prev,
			}))}

			
		</div>
	})`
	position: relative;
	margin-top: 4rem;
	width: 100%;
	display:block;

	.flipper-pagination{
		margin: 1rem 0;
		position: absolute;
		bottom: 100%;
	}
	`

Flipper.Item = styled(
	({index, current, button, next, children, className}) => {
		
		let state = index === current ? '✔' : (index < current ? '«' : '»')

		return <article className={className} data-state={state} data-next={index === current+1}>
			<div className="inner">
				{children}
			</div>

			<div className="nav">
				<Button 
					className='continue'
					{...button}
					onClick={() => {
						get(button, 'onClick', ()=>{})()
						next()
					}}>
					{get(button, 'text')||'Continue'}<ArrowRight/>
				</Button>
			</div>
		</article>
	})`
	width: 85%;
	display:block;
	transition: all 0.5s;

	.inner{
		background: var(--color-grey-25);
		margin-bottom: 1em;
		box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09), 0px 10px 20px rgba(0, 0, 0, 0.12);
		transition: all 0.5s;

		*{
			transition: all 0.5s;
		}

		.panel{
			min-height: 45rem;
		}
	}

	.nav{
		margin-top: 2rem;
		//position: absolute;
		top: 100%;
	}

	&[data-state='✔']{
		position: relative;
		z-index: 3;
		transform: scale(1) translateX(0);
	}

	&[data-state='»'],
	&[data-state='«']{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		transform: scale(0.8);
		pointer-events: none;

		.nav{
			opacity: 0;
		}
	}

	&[data-state='»']{
		transform: scale(0.8) translateX(35%);
		opacity: 1;
		filter: brightness(102%);

		.inner{
			box-shadow: none;
			*{
				opacity: 0.6;
			}
		}

		&[data-next='true']{
			transform: scale(0.9) translateX(17%);
			filter: brightness(101%);
			z-index: 2;
			.inner{
				box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.003), 0px 5px 10px rgba(0, 0, 0, 0.04);
			}
		}
	}

	&[data-state='«']{
		transform: scale(1.5) translateX(-50%);
		opacity: 0;
	}
	`

export default Flipper