var CompositeDisposable = require('event-kit').CompositeDisposable;

module.exports = {
  active: false,
  isActive: function() { return this.active; },
  activate: function(state) {
    this.subscriptions = new CompositeDisposable;
  },
  consumeMinimapServiceV1: function(minimapService) {
    minimapService.registerPlugin('minimap-quick-highlight', this);
    this.minimapService = minimapService;
  },
  consumeQuickHighlight(highlightsEmitter) {
    const boundHandler = this.onChangedHighlights.bind(this);
    this.subscriptions.add(highlightsEmitter.on('changed-highlights', boundHandler));
  },
  deactivate: function() {
    this.minimapService.unregisterPlugin('minimap-quick-highlight');
    this.minimapService = null;
  },
  activatePlugin: function() {
    if (this.active) return;
    this.active = true;
  },
  deactivatePlugin: function() {
    if (!this.active) return;
    this.active = false;
    this.subscriptions.dispose();
  },
  onChangedHighlights({ editor, decorations = [] }) {
    const { minimapService } = this;
    const style = { type: 'highlight', class: 'mini-quick-hl' };
    if (!minimapService) return;
    const minimap = minimapService.minimapForEditor(editor);

    decorations.map(d => d.marker).forEach(m => decorate(minimap, m, style));
  }
};

decorate = (minimap, marker, decoration) => {
  minimap.decorateMarker(marker, decoration);
}
