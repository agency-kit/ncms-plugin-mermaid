import fs from 'node:fs'
import type { PageContent } from '@agency-kit/notion-cms'
import { run } from '@mermaid-js/mermaid-cli'
import unescape from 'lodash.unescape'

const MERMAID_REGEX = /<pre><code class=["']hljs language-mermaid["']>([\s\S]+?)<\/code><\/pre>/g

export default function ({
  imageDirectory, // relative to your dist file
}: { imageDirectory?: string } = {}) {
  let mermaidId = 0

  async function renderMermaidDiagram(svgString: string): Promise<string> {
    const fileName = `mermaid-${mermaidId}`
    const tempFileLocation = `./tmp/${mermaidId}.mmd`
    if (!fs.existsSync('./tmp'))
      fs.mkdirSync('./tmp', { recursive: true })
    if (imageDirectory && !fs.existsSync(imageDirectory))
      fs.mkdirSync(imageDirectory, { recursive: true })

    fs.writeFileSync(tempFileLocation, unescape(svgString))
    mermaidId += 1
    await run(tempFileLocation, `./${imageDirectory || ''}/${fileName}.png`, { quiet: true })
    return `${imageDirectory || ''}/${fileName}.png`
  }

  return [{
    name: 'ncms-plugin-mermaid',
    hook: 'during-tree',
    exec: async (context: PageContent) => {
      const copyOfContext = structuredClone(context)
      const merMatches: RegExpMatchArray[] = [
        ...(copyOfContext.content?.html as string).matchAll(MERMAID_REGEX) || [],
      ]

      for await (const match of merMatches) {
        const filePath = await renderMermaidDiagram(match[1])
        const replacement = `<img src="${filePath}">`
        if (copyOfContext.content?.html)
          copyOfContext.content.html = copyOfContext.content?.html.replace(match[0], replacement)
      }
      if (fs.existsSync('./tmp'))
        fs.rmSync('./tmp', { recursive: true })

      return copyOfContext
    },
  }]
}
