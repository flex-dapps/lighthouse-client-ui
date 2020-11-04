import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components'
import { ReactComponent as IconChevronDown } from '@assets/chevron_down.svg'

export default styled(
	({maxHeight, children=[], className, ...rest}) => {

		const itemsRef = useRef()
		const [ overflow, setOverflow ] = useState(false)
		const [ scrolled, setScrolled ] = useState(false)

		useEffect(() => {
			setTimeout(() => {
				setOverflow(itemsRef.current?.offsetHeight > maxHeight)
			}, 500)
		}, [children]) // eslint-disable-line

		return <div 
			className={`scroll ${className}`}
			data-overflow={overflow}
			data-scrolled={scrolled}
			{...rest}
			>
			<div 
				className="scroll-container" 
				onScroll={e => setScrolled(e.target.scrollTop > 0)}
				>
				<div 
					className="-items" 
					ref={itemsRef}
					>
					{children}
				</div>
			</div>
			{overflow && <div className='-more'>Scroll to view more <IconChevronDown/></div>}
		</div>
	})`
	position: relative; 

	.scroll-container{
		overflow: hidden;
		overflow-y: scroll;
		position: relative;
		max-height: ${({maxHeight}) => `${maxHeight}px;`}
	}

	.-more{
		margin: 0.8rem auto 0;
		display: block;
		text-align: center;
		font-size: var(--font-size-xsmall);
		text-transform: uppercase;
		font-weight: 600;
		opacity: 0.4;

		>svg{
			position: absolute;
			top: 100%;
			left: 50%;
			font-size: var(--font-size-large);
			transform: translateX(-50%);
		}
	}

	&:before,
	&:after{
		content: '';
		position: absolute;
		left: 0;
		width: 100%;
		height: 0;
		z-index: 2;
		transition: height 0.3s;
		pointer-events: none;
	}

	&:before{
		top: 0;
		background: linear-gradient(0deg, rgba(255,255,255,0), rgba(255,255,255,0.7));
	}

	&:after{
		bottom: 1.4rem;
		background: linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.7));
	}

	&[data-overflow='true']{
		&:after{
			height: 3rem;
		}

		&[data-scrolled='true']{
			&:before{
				height: 3rem;
			}
		}

		
	}
	`