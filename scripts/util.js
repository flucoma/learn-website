import path from 'path';

const urlFromRoute = (route) => {
    let parse = path.parse(route);
    let base = parse.dir.split('/').slice(1).join('/');
    return `/${base}/${parse.name}`
};

export { urlFromRoute }