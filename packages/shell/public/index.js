import { init, AppContext } from './node_modules/microfronts/dist/index.js';

init({
    routes: {
        '/home': {
            active: ['todos', 'contacts', 'flickr'],
            disabled: []
        },
        '/contacts': {
            active: ['contacts']
        },
        '/todos': {
            active: ['todos']
        }
    },
    apps: {
        contacts: 'http://localhost:3007',
        todos: 'http://localhost:5000'
    }
})
