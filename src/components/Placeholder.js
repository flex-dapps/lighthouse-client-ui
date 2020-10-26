import React from 'react';
import styled from 'styled-components'
import { omit } from 'lodash'
import { statusColor } from '@app/App.status'

export default styled(
	({
		icon, 
		title, 
		text, 
		children, 
		className, 
		...rest
	}) => 
		<div 
			className={`placeholder ${className}`}
			{...omit(rest, ['compact', 'horizontal', 'lifted', 'muted', 'status'])}
			>
			{icon && <span className="-icon">{icon}</span>}
			<span className="-copy">
				{title && <h1>{title}</h1>}
				{text && <p dangerouslySetInnerHTML={{__html: text }}/>}
				{children && <div className="-children">{children}</div>}
			</span>
		</div> 
	)
	`
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 3rem 5rem;
		text-align: center;

		>*{
			margin: 0;
		}

		>.-icon{
			font-size: 5.4rem;
			margin-bottom: 0.2em;
		}

		>.-copy{
			h1{
				margin: 1em 0 0;
				font-size: var(--font-size-large);
				font-weight: 600;
				line-height: 1em;
			}

			p{
				color: var(--color-label);
				margin: 1em 0 0;
			}

			.-children{
				margin-top: 2.8rem;
			}
		}

		${({compact}) => !!compact && `
			padding: 1.5rem 2.5rem;
			
			>.-icon{
				font-size: 3rem;
				margin-bottom: 0.2em;
			}

			>.-copy{
				h1{
					margin-top: 0.3em;
					font-size: var(--font-size-medium);
				}

				p{
					margin-top: 0.5em;
					font-size: var(--font-size-normal);
				}

				.-children{
					margin-top: 1.5rem;
				}
			}
		`}

		${({horizontal}) => !!horizontal && `
			flex-direction: row;
			text-align: left;
			>.-copy{
				padding-left: 2rem
			}
		`}

		${({lifted}) => !!lifted && `box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.05);`}

		${({muted}) => !!muted && `color: var(--color-grey-300);`}

		${({status}) => statusColor('background', status)}
	`