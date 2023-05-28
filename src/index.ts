import type { PageContent } from '@agency-kit/notion-cms'

export default function () {
  return {
    name: 'ncms-plugin-xxx',
    // pick one.
    hook: 'pre-tree | during-tree | pre-parse | post-parse | post-tree',
    exec: (context: PageContent) => {
      const copyOfContext = structuredClone(context) as PluginPageContent

      return copyOfContext
    },
  }
}

export interface PluginPageContent extends PageContent {
  newProp: string
}
