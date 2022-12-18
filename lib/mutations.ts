import fetcher from "./fetcher";

export const auth = (mode: string,
    body: { email: string, password: string }
) => {
    return fetcher(`/${mode}`, body).then(body => {localStorage.setItem('user', JSON.parse(JSON.stringify(body))); return body} )
} 