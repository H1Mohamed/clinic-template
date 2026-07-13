
17:05:38.266
 generating static routes 
17:05:38.558
service core:user:prerender: Uncaught Error: No such module "node:module".
17:05:38.558
  imported from "dist/server/.prerender/chunks/rolldown-runtime_CUimSf40.mjs"
17:05:38.569
MiniflareCoreError [ERR_RUNTIME_FAILURE]: The Workers runtime failed to start. There was likely a problem with the workerd binary or your configuration.
17:05:38.569
Runtime stderr:
17:05:38.569
{"timestamp":"1783958738550","level":"error","source":"src/workerd/server/json-logger.c++:127","message":"service core:user:prerender: Uncaught Error: No such module \"node:module\".\n  imported from \"dist/server/.prerender/chunks/rolldown-runtime_CUimSf40.mjs\"","context_depth":0}
17:05:38.569
    at StartupLogBuffer.handleStartupFailure (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:71402:13)
17:05:38.570
    at Runtime.updateConfig (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:71492:24)
17:05:38.570
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
17:05:38.575
    at async #assembleAndUpdateConfig (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:91513:30)
17:05:38.575
    at async Mutex.runWith (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:59727:48)
17:05:38.575
    at async #waitForReady (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:91634:5)
17:05:38.575
    at async _Miniflare.dispatchFetch (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:91766:5)
17:05:38.575
    at async file:///opt/buildhome/repo/node_modules/@cloudflare/vite-plugin/dist/index.mjs:37094:19
17:05:38.624
The Workers runtime failed to start. There was likely a problem with the workerd binary or your configuration.
17:05:38.624
Runtime stderr:
17:05:38.624
{"timestamp":"1783958738550","level":"error","source":"src/workerd/server/json-logger.c++:127","message":"service core:user:prerender: Uncaught Error: No such module \"node:module\".\n  imported from \"dist/server/.prerender/chunks/rolldown-runtime_CUimSf40.mjs\"","context_depth":0}
17:05:38.624
  Stack trace:
17:05:38.625
    at StartupLogBuffer.handleStartupFailure (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:71402:13)
17:05:38.625
    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
17:05:38.625
    at async Mutex.runWith (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:59727:48)
17:05:38.625
    at async _Miniflare.dispatchFetch (/opt/buildhome/repo/node_modules/miniflare/dist/src/index.js:91766:5)
17:05:38.712
error: script "build" exited with code 1
