import Router from 'next/router';

export const userService = {
    logout,
};

function logout() {
    // Remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    Router.push('/account/login');
}