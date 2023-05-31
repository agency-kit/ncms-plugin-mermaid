import NotionCMS from '@agency-kit/notion-cms'
import dotenv from 'dotenv'
import ncmsMermaidPlugin from '../dist/index.mjs'

dotenv.config()

const testCMS = new NotionCMS({
  databaseId: '9536d9ed-bb88-49ab-9b96-b8948e57c7ac',
  notionAPIKey: process.env.NOTION,
  draftMode: true,
  refreshTimeout: 0,
  // debug: true,
  plugins: [ncmsMermaidPlugin()],
})

await testCMS.fetch()

testCMS.export({ pretty: true, path: `${process.cwd()}/debug/pretty.json` })
