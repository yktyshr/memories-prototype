// @flow

const baseUrl: string = 'http://localhost:8080'

export const search = async(query: string) => (await fetch(baseUrl + '/search?q=' + query)).json()
