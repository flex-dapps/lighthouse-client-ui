import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

const animationSpeedMS = 150

const TabbedNav = styled(
	({items, current, onChange=()=>{}, className}) => {
		return <div className={`tabbed-nav ${className}`}>
			{items.map((item, i) => 
				<span 
					key={i}
					className={`tabbed-nav-item`} 
					onClick={() => onChange(i)} 
					data-active={current === i}
					>
					{item}
				</span>
			)}		
		</div>
	})`

	display: flex;
	margin-bottom: 2rem;
	
	.tabbed-nav-item{
		cursor: pointer;
		padding: 0.5em 0;
		font-size: var(--font-size-small);
		position: relative;
		letter-spacing: 0.016em;
		transition: color 0.15s;
		color: var(--tabbed--nav--color, grey);

		&:after{
			content: '';
			position: absolute;
			top: 100%;
			left: 0;
			width: 0;
			height: 1px;
			background: var(--color-light);
			transition: all 0.15s;
			opacity: 0;
		}

		& + .tabbed-nav-item{
			margin-left: 4.1rem;
		}

		&[data-active="false"]:hover{
			color: var(--tabbed--nav--color--hover, lightgrey);
		}

		&[data-active="true"]{
			color: var(--tabbed--nav--color--active, white);
			&:after{
				width: 100%;
				opacity: 1;
			}
		}
	}
	
	`

const Tabbed = styled(
	({
		children, 
		className,
		onChange=()=>{},
		selected=0
	}) => {
		const [current, setCurrent] = useState()

		useEffect(() => {
			handleChange(selected)
		}, []) // eslint-disable-line

		const handleChange = i => {
			if(current !== i){
				setCurrent(i)
				onChange(i)
			}
		}

		return <div className={`tabbed ${className}`}>
			<TabbedNav 
				items={React.Children.map(children, child => child.props.title)} 
				current={current} 
				onChange={handleChange}
			/>
			<div className="current" >
				{current !== null && children[current]}	
			</div>
		</div>
	})`
		display: block;
		width: 100%;
	`

Tabbed.Child = styled(
	({index, children, className}) => {
		return <div className={`tabbed-child ${className}`}>
			{children}
		</div>
	})`
	
	`

export default Tabbed