import React  from 'react';
import styled from 'styled-components'
import { omit } from 'lodash'
import { Tidbit } from '@components'
import { useMounted } from '@util/hooks'

const Card = styled(
	({
		children=[], 
		disabled, 
		disabledOverlay, 
		className, 
		...rest
	}) => {
		const mounted = useMounted()
		return <div 
			className={`card ${className}`} 
			{...omit(rest, ['disabled'])}
			data-mounted={mounted}
			>
			
			{children}
			
			{!!disabled && !!disabledOverlay &&
				<span 
					className='-disabled-overlay'
					>
					{disabledOverlay}
				</span>
			}
		</div>
	})
	`
		position: relative;
		border: 1px solid var(--color-grey-200);
		display: flex;
		justify-content: space-between;
		font-size: var(--font-size-normal);
		box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 4px rgba(0, 0, 0, 0.05);

		transition: all 0.3s;
		>*{
			transition: all 0.3s;
		}

		&[data-mounted='false']{
			opacity: 0;
			transform: translateY(1em);
		}

		&[data-mounted='true']{
			opacity: 1;
			transform: translateY(0);
		}

		.card-column{
			&:first-child{
				text-align: left;
			}

			&:last-child{
				//text-align: right;
			}
		}

		& + .card{
			//border-top: none;
			margin-top: 1em;
		}

		.-disabled-overlay{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			opacity: 1;
			z-index: 2;
		}

		${({disabled}) => !!disabled && 
			`
				cursor: not-allowed;
				box-shadow: none;
				
				>*{
					opacity: 0.2;
					pointer-events: none;
				}

				.-disabled-overlay{
					opacity: 1;
					pointer-events: all;
					cursor: auto;
				}
			`
		}
	`

Card.Column = styled(
	({
		name, 
		title, 
		subtitle, 
		info, 
		footer, 
		children, 
		className, 
		...rest
	}) => 
		<span 
			className={`card-column ${className}`}
			 {...omit(rest, ['disabled', 'width', 'noborder', 'roomy'])}
			 >
			
			<div 
				className="card-column-top"
				>
				
				{name && 
					<div 
						className={'card-name'}
						>
						{name}
					</div>
				}

				{title && 
					<Tidbit 
						className={'card-title'} 
						large 
						title={title} 
						info={info} 
						subtitle={subtitle}
					/>
				}

				{children && 
					<div 
						className="card-content"
						>
						{children}
					</div>
				}

			</div>
			{footer && 
				<div 
					className="card-column-footer"
					>
					{footer}
				</div>
			}
		</span>
	)`
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.5rem;

		${({width=100}) => !!width && `width: ${width}%;`}

		${({disabled}) => {
			return !!disabled && `
				cursor: not-allowed;
				>*{
					opacity: 0.4;
					pointer-events: none;
				}
			`
		}}

		.card-name{
			margin: 0;
			font-size: var(--font-size-small);
			line-height: 1.1em;
			font-weight: 600;
			text-transform: uppercase;

			& + .card-title{
				margin: 2rem 0;
			}
		}

		.card-title{
			.tidbit-title{
				font-size: var(--font-size-medium);
				font-weight: 300;
				color: var(--color-grey-500)
			}
			.tidbit-subtitle{
				font-size: var(--font-size-normal);
				font-weight: 300;
			}
		}

		.card-content{
			margin: 0;
			font-size: var(--font-size-normal, 12px)
		}

		.card-column-footer{
			display: block;
			align-items: flex-end;
			margin-top: ${({roomy}) => !!roomy ? `4rem` : '2rem'};
		}

		.card-name + .card-content{
			margin-top: 1.6rem;
		}

		& + .card-column{
			border-left: 1px solid var(--color-grey-100);
		}

		${({noborder=false}) => noborder === true && 'border-left: none !important'};
	`

Card.Column.Divider = styled(
	({
		className, 
		...rest
	}) => 
		<hr className={className} {...omit(rest, ['compact', 'comfortable'])}/>
	)
	`
		margin: 2rem 0;
		${({compact}) => !!compact && `margin: 1.5rem 0;`}
		${({comfortable}) => !!comfortable && `margin: 2.6rem 0;`}
	`

Card.Controls = styled(
	({
		children, 
		className, 
		...rest
	}) => 
		<div className={`card-controls ${className}`} {...rest}>{children}</div>
	)
	`
		margin: 2rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.card-controls-column{
			text-align: center;
			&:last-child{ text-align: right }
			&:first-child{ text-align: left }
			
		}
	`

Card.Controls.Column = styled(
	({
		children, 
		className, 
		right, 
		...rest
	}) => 
		<div className={`card-controls-column ${className}`} {...rest}>{children}</div>
	)
	`
		width: 100%;
		${({right}) => !!right && `text-align: right !important;`}
	`

export default Card