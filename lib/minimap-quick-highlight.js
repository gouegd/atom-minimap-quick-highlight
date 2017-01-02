const CompositeDisposable = require('event-kit').CompositeDisposable

const decorate = (minimap, marker, decoration) => {
  minimap.decorateMarker(marker, decoration)
}

module.exports = {
  active: false,
  isActive() { return this.active },
  activate() {
    this.subscriptions = new CompositeDisposable
  },
  consumeMinimapServiceV1(minimapService) {
    minimapService.registerPlugin('minimap-quick-highlight', this)
    this.minimapService = minimapService
  },
  consumeQuickHighlight(highlightsEmitter) {
    const boundHandler = this.onChangedHighlights.bind(this)
    this.subscriptions.add(highlightsEmitter.on('changed-highlights', boundHandler))
  },
  deactivate() {
    this.minimapService.unregisterPlugin('minimap-quick-highlight')
    this.minimapService = null
  },
  activatePlugin() {
    if (this.active) return
    this.active = true
  },
  deactivatePlugin() {
    if (!this.active) return
    this.active = false
    this.subscriptions.dispose()
  },
  onChangedHighlights({ editor, decorations = [], color }) {
    const { minimapService } = this
    const style = { type: 'highlight', class: `mini-quick-hl ${color}` }
    if (!minimapService) return
    const minimap = minimapService.minimapForEditor(editor)

    decorations.map(d => d.marker).forEach(m => decorate(minimap, m, style))
  }
}
