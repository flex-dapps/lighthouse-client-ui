import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components'
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { Centered } from '@layouts'
import { Host, Onboarding, Validator } from '@archetypes'

const LayoutWidgetWrapper = 
	({
		onRouteChange=()=>{}, 
		children
	}) => {
		let { path } = useRouteMatch();
		useEffect(() => onRouteChange(path), [path]) // eslint-disable-line
		return children
	}

export default styled(
	({
		className
	}) => {
		let { path } = useRouteMatch();
		
		// we want to pass the current route from the layout wrapper
		// through to the header/footer elements, as the header/footer
		// reside outside the current route context.
		//  - ensure no match on init
		const [ currentRoute, setCurrentRoute ] = useState('/-------?')

		const updateRoute = route => {
			if(route !== currentRoute){
				setCurrentRoute(route)
			}
		}

		return useMemo(() => 
			<Centered className={className}>
				<Onboarding.Partial.Header className={`-onboarding-header`} route={currentRoute}/>
				
				<Switch>
					<Route 
						exact
						path={`${path}/health`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Host.Health/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/syncing`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Host.Syncing/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/overview`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Onboarding.Overview/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/duties`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Onboarding.Duties/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/validators`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Create/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/mnemonic`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Mnemonic.Create/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/mnemonic/confirm`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Mnemonic.Confirm/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/confirm`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Confirm/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/funding`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Funding/>
							</LayoutWidgetWrapper>
						}
					/>

					<Route 
						exact
						path={`${path}/activate`}
						component={() => 
							<LayoutWidgetWrapper
								onRouteChange={updateRoute}
								>
								<Validator.Activate/>
							</LayoutWidgetWrapper>
						}
					/>
					<Redirect to={path}/>
				</Switch>
				
				<Onboarding.Partial.Footer className={`-onboarding-footer`} route={currentRoute}/>
			</Centered>
		, 
		[currentRoute]) // eslint-disable-line
	})
	`

		.-onboarding-header,
		.-onboarding-footer{
			position: fixed;
			left: 0;
			width: 100%;
			z-index: 90;
		}

		.-onboarding-header{
			top: 0;
		}

		.-onboarding-footer{
			bottom: 0;
		}
	`