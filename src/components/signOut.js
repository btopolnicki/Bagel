//<button  type="button" onClick={auth.doSignOut}> Sign Out </button>

import React, { Component } from 'react';
import * as auth from '../auth';

const SignOut = () => (
            <div>
                <h1>Signout</h1>
                <button  type="button" onClick={event=> {auth.doSignOut()}}> Sign Out </button>
            </div>
        )


export default SignOut;