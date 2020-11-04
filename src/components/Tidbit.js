import React from 'react';
import styled from 'styled-components'
import { omit } from 'lodash'
import { Popover } from '@components'
import { ReactComponent as IconQuestion } from '@assets/question.svg';

export default styled(
	({title, subtitle, info, className, ...rest}) => <div 
		className={`tidbit ${className}`}
		data-is-link={!!rest.onClick}
		{...omit(rest, ['right', 'strong', 'large'])} 
		>
		<span 
			className="tidbit-title"
			>
			{title}
			{info && 
				<Popover 
					className='tidbit-info' 
					trigger={<IconQuestion/>}
					>
					{info}
				</Popover>
			}
		</span>
		<span 
			className="tidbit-subtitle"
			>
			{subtitle}
		</span>
	</div>)`
	
	

	>.tidbit-title,
	>.tidbit-subtitle{
		display: flex;
		align-items: center;
		text-overflow: ellipsis;
		color: currentColor;
		transition: opacity 0.15s;
		line-height: 1em;

		>*{
			margin: 0 0.4em;
			&:first-child{ margin-left: 0 }
			&:last-child{ margin-right: 0 }
		}

		${({right}) => `justify-content: ${!!right ? 'flex-end' : 'flex-start'};`}
		
	}

	>.tidbit-title{
		${({large}) => `font-size: ${!!large ? 'var(--font-size-medium)' : 'var(--font-size-normal)'};`}

		${({strong, large}) => `
			font-weight: ${!!strong ? 'bold' : 'normal'};
			text-transform: ${!!strong ? 'uppercase' : 'initial'};
			font-size: ${!!large ? 'var(--font-size-normal)' : 'var(--font-size-small)'};
		`}

		
		
		.tidbit-info{
			margin-left: 0.4em
		}
	}

	>.tidbit-subtitle{
		margin-top: 0.2em;
		opacity: 0.5;
		${({large}) => `font-size: ${!!large ? 'calc(var(--font-size-medium) * 0.9)' : 'calc(var(--font-size-normal) * 0.9)'};`}
		${({strong, large}) => `
			font-weight: ${!!strong ? 'bold' : 'normal'};
			text-transform: ${!!strong ? 'uppercase' : 'initial'};
			font-size: ${!!large ? 'calc(var(--font-size-normal) * 0.9)' : 'calc(var(--font-size-small) * 0.8)'};
		`}

	}

	&[data-is-link="true"]{
		cursor: pointer;
		&:hover{
			>.tidbit-title{ color: var(--color-primary-1 ) }
			>.tidbit-subtitle{ opacity: 0.7; }
		}
	}

	${({strong}) => !!strong && `
		>.tidbit-title{
			font-weight: bold;
			text-transform: uppercase;
		}
		>.tidbit-subtitle{
			//font-weight: bold;
			//text-transform: uppercase;
		}
	`}
`