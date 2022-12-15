import { BehaviorSubject } from 'rxjs';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

const userSubject = new BehaviorSubject(process.window && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout,
};

function login(name, password) {
    return fetchWrapper.post("https://xm-crm-react-exercise-server.herokuapp.com/login", { name, password })
        .then(user => {
            // Setting the local storage item token for later API authentication
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(user.token));

            return user;
        });
}

function logout() {
    // Remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}