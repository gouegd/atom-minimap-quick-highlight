# minimap-quick-highlight package for Atom
[![APM Version](https://img.shields.io/apm/v/minimap-quick-highlight.svg)](https://atom.io/packages/minimap-quick-highlight)
[![APM Downloads](https://img.shields.io/apm/dm/minimap-quick-highlight.svg)](https://atom.io/packages/minimap-quick-highlight)

An integration between the [minimap](https://atom.io/packages/minimap) and [quick-highlight](https://atom.io/packages/quick-highlight) packages for the Atom text editor.

## Installation

`apm install minimap-quick-highlight`

## Features

* Handles quick-highlight's manual and automatic (current selection) toggles
* Uses the same default colors than quick-highlight

![gif](https://raw.githubusercontent.com/gouegd/atom-minimap-quick-highlight/master/sample.png)

## Notes

Remember the minimap settings allow you to set the priority order if you have different plugins highlighting the same area (effectively working similarly to a CSS `z-index` rule)

Also, you can enable / disable any minimap plugin directly through the gear icon that appears when you hover on the minimap. I sometimes toggle minimap's code-highlights feature to make the selections offered by this plugin more apparent.
