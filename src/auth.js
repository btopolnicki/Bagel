import { auth } from './firebase';
import * as routes from './routes';

// Sign Up
export const doCreateUserWithEmailAndPassword = function(email, password, userName) {
  const me = this;
  return auth.createUserWithEmailAndPassword(email, password)
  .then(function (result){
      console.log(result.user);
    return result.user.updateProfile({ displayName: userName})
    .then(function () {
      return result.user.getIdToken(true).then(function (token) {
        console.log("--auth--");
        console.log(result.user);
        refreshUser(token);
          return result;
      });
    })
  })
}


const refreshUser = function (token){
  var myInit = {
    method: 'POST',
    headers: { "Authorization": 'Bearer ' + token},
    cache: 'default'
  };

  return fetch(routes.API_ROOT + "users", myInit) 
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

  // Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

