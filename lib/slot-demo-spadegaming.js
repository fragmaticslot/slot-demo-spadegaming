'use babel';

import SlotDemoSpadegamingView from './slot-demo-spadegaming-view';
import { CompositeDisposable } from 'atom';

export default {

  slotDemoSpadegamingView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotDemoSpadegamingView = new SlotDemoSpadegamingView(state.slotDemoSpadegamingViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotDemoSpadegamingView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-demo-spadegaming:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotDemoSpadegamingView.destroy();
  },

  serialize() {
    return {
      slotDemoSpadegamingViewState: this.slotDemoSpadegamingView.serialize()
    };
  },

  toggle() {
    console.log('SlotDemoSpadegaming was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
