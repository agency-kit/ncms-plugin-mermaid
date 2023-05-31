# NCMS Plugin Mermaid

This plugin runs the mermaid-cli to transform any mermaid diagrams in your Notion CMS pages into pngs.

> Note: the mermaid cli runs a headless browser instance via puppeteer under the hood.

## Options

`imageDirectory`: String

This is used to set the directory the mermaid diagram images will be generated in relative to your `dist` directory.
Defaults to `.`.