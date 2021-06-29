import { Plugin, ViteDevServer } from '../../node'
import { bareImportRE } from '../../node/utils'
import { tryOptimizedResolve } from './resolve'

/**
 * A plugin to avoid an aliased AND optimized dep from being aliased in src
 */
export function preAliasPlugin(): Plugin {
  let server: ViteDevServer
  return {
    name: 'vite:pre-alias',
    configureServer(_server) {
      server = _server
    },
    resolveId(id, _, __, ssr) {
      if (!ssr && bareImportRE.test(id)) {
        return tryOptimizedResolve(id, server)
      }
    }
  }
}
