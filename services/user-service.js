import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router';

import { fetchWrapper } from '../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(process.window && JSON.parse(localStorage.getItem('user')));

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login,
    ingredients,
    logout,
};

function login(name, password) {
    return fetchWrapper.post("https://xm-crm-react-exercise-server.herokuapp.com/login", { name, password })
        .then(user => {
            // publish user to subscribers and store in local storage to stay logged in between page refreshes
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', JSON.stringify(user.token));

            return user;
        });
}

function ingredients(ingredient) {
    return fetchWrapper.get(`https://xm-crm-react-exercise-server.herokuapp.com/ingredients${ingredient}`)
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/account/login');
}