# Figma Clipping Magic Remove Image Background Plugin

Remove background of images with just 1-click (Using https://clippingmagic.com/api).


## Usage

Download it on the Figma plugin library [figma.com/c/plugin/123/Clipping-Magic-BG-Removal](https://www.figma.com/c/plugin/123/Clipping-Magic-BG-Removal)

## Development

First clone this repository
```shell
git clone https://github.com/clv/figma-clipping-magic.git
cd figma-clipping-magic
```

Install dependencies & build files
```shell
npm install
npm run build
# Or watch: npm run dev
```

After that open a project in Figma Desktop, select _Plugins -> Development -> New Plugin_. Click `Choose a manifest.json` and find the `manifest.json` file in this plugin directory.

Done! Now _Plugins -> Development -> Clipping Magic BG Removal -> Run/Set API Key_

## Author

- [Cedar Lake Ventures](https://cedarlakeventures.com) 
- Based on the [plugin](https://github.com/aaroniker/figma-remove-bg) by Aaron Iker ([Twitter](https://twitter.com/aaroniker_me))
