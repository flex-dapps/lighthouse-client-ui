import { hot } from 'react-hot-loader/root';
import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components'
import { Switch, Route, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Notification, Modal } from '@components'
import { Onboarding, Dashboard  } from '@routes'
import { Pages } from '@archetypes'
import { AppStore } from '@store'
import LoadingScreen from './App.loading'

import { 
	Fonts as ThemeFonts,
	Vars as ThemeVars,
	Base as ThemeBase,
	Layout as ThemeLayout,
	Components as ThemeComponents,
} from '@app/App.theme'

const StyledNotification = styled(Notification)`z-index: 99`

const StyledModal = styled(Modal)`z-index: 98`

export default hot(
	() => {
		const { trigger } = AppStore()
		const history = useHistory();

		useEffect(() => {
			history.push('/connect')
			trigger('init')
		}, []) // eslint-disable-line

		return <Fragment>
			<ThemeFonts/>
			<ThemeVars/>
			<ThemeBase/>
			<ThemeLayout/>
			<ThemeComponents/>
			<StyledNotification/>
			<StyledModal/>
			<LoadingScreen/>
			<Switch>
				<Route path="/connect" exact component={() => <Pages.Connect/>}/>
				<Route path="/welcome" exact component={() => <Pages.Welcome/>}/>
				<Route path="/onboarding" component={Onboarding}/>
				<Route path="/" component={Dashboard}/>
				<Redirect to='/connect'/>
			</Switch>
		</Fragment>
	}
)