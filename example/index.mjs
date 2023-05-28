import NotionCMS from "@agency-kit/notion-cms";
import dotenv from 'dotenv'
import ncmsTemplatePlugin from '../dist/index.mjs'

dotenv.config()

const testCMS = new NotionCMS({
  databaseId: '83544a88-89f4-4748-ab0d-0ffc762cbe4f',
  notionAPIKey: process.env.NOTION,
  draftMode: true,
  refreshTimeout: 0,
  debug: true,
  plugins: [ncmsTemplatePlugin()]
})

await testCMS.fetch()
