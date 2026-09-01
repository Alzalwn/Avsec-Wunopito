import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C7f3oWB1.mjs';
import { manifest } from './manifest_Cd2EBVE4.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/announcements.astro.mjs');
const _page2 = () => import('./pages/api/contacts.astro.mjs');
const _page3 = () => import('./pages/api/data.astro.mjs');
const _page4 = () => import('./pages/api/docs.astro.mjs');
const _page5 = () => import('./pages/api/logbooks.astro.mjs');
const _page6 = () => import('./pages/api/personnel.astro.mjs');
const _page7 = () => import('./pages/api/reports.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/announcements.js", _page1],
    ["src/pages/api/contacts.js", _page2],
    ["src/pages/api/data.js", _page3],
    ["src/pages/api/docs.js", _page4],
    ["src/pages/api/logbooks.js", _page5],
    ["src/pages/api/personnel.js", _page6],
    ["src/pages/api/reports.js", _page7],
    ["src/pages/index.astro", _page8]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "b366370b-8668-4922-9ead-b8c2f127d254",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
