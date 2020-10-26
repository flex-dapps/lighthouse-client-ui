import React from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export default ({address, diameter=10, ...rest}) => address && <Jazzicon diameter={diameter} seed={jsNumberForAddress(address)} {...rest}/>