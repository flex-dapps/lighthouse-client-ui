import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Pages } from '@archetypes'

export default () => 
	<Switch>
		<Route path='/' exact component={Pages.Dashboard}/>
		<Route path='/validators' exact component={Pages.Dashboard}/>
		<Route path='/metrics' exact component={Pages.Dashboard}/>
		<Route path='/cli' exact component={Pages.Dashboard}/>
		<Redirect to='/'/>
	</Switch>
