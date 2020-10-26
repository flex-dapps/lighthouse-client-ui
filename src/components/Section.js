import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import { ReactComponent as IconArrowLeft } from '@assets/arrow_left.svg';

const Section = styled(
	({muted, children, className, ...rest}) => {
		const [ header, setHeader ] = useState()
		const [ content, setContent ] = useState()
		const [ footer, setFooter ] = useState()

		useEffect(() => {
			const _children = []

			children.forEach(child => {
				switch (child?.type?.displayName||'') {
					case 'SectionHeader': setHeader(child); break;
					case 'SectionFooter': setFooter(child); break;
					default: _children.push(child); break;
				}
			})

			setContent(_children); 
		}, [children])
				
		return <section 
			className={`section ${className}`} 
			data-muted={muted}
			{...rest}
			>
			{header && 
				<Fragment>
					{header}
					<hr className="section-divider"/>
				</Fragment>
			}
			<div className="section-content">
				{content}
			</div>
			{footer}
		</section>
	})`
	
	>*{
		display: block;
		color: inherit;
	}

	.section-divider{
		margin: 2rem 0 2.5rem;
		display: block;
		opacity: 0.1;
	}

	>.section-content{}

	>.section-footer{}

	// muted state = can not interact
	&[data-muted="true"]{
		>.section-content,
		>.section-footer{
			opacity: 0.5;
			cursor: wait;

			>*{
				pointer-events: none;
			}
		}
	}
	`

Section.Header = styled(
	({context=[], title, titleIcon, subtitle, info, className}) => {
		let history = useHistory();
		return <header className={`section-header ${className}`}>
			{context?.length > 0 && 
				<div className="-context">
					<IconArrowLeft className='-back-icon' onClick={() => history.goBack()}/>
					{context.map((item, key) => <span key={key} className='-breadcrumb'>{item}</span>)}
				</div>
			}
			{title && 
				<div className="-title">
					<h1 className="-title-text">{title}</h1>
					{titleIcon && <span className='-title-icon'>{titleIcon}</span>}
				</div>
			}
			{subtitle && <h2 className="-subtitle">{subtitle}</h2>}
		</header>
	})`

	>.-context{
		font-size: var(--font-size-small);
		margin: 0 0 0.5em 0;
		display: flex;
		align-items: center;
		text-transform: uppercase;
		line-height: 1em;
		color: currentColor;

		.-back-icon{
			height: 1em;
			margin-right: 0.7em;
			cursor: pointer;

			&:hover{
				color: var(--color-primary-1);
			}
		}

		.-breadcrumb{
			&:not(:last-child){

				&:hover{
					color: var(--color-primary-1);
				}

				&:after{
					content: '/';
					padding: 0 0.3em;
				}
			}

			&:last-child{
				font-weight: 600;
			}


		}
	}

	>.-title{
		font-size: var(--font-size-xlarge);
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		width: 100%;

		.-title-text{
			font-size: var(--font-size-xlarge);
			margin: 0;
			line-height: 1.1em;
			color: var(--color-primary-2);

			background: var(--color-gradient-purp-horizontal);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.-title-icon{
			color: var(--color-primary-2);
		}
	}

	>.-subtitle{
		margin: 0.5em 0;
		display: block;
	}
	`
Section.Header.displayName = 'SectionHeader'

Section.Footer = styled(
	({children, className}) => <footer className={`section-footer ${className}`}>{children}</footer>
	)`
	display: block;
	margin-top: 2.2rem;
	`
Section.Footer.displayName = 'SectionFooter'

export default Section