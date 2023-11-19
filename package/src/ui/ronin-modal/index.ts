import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'
import { set, sub } from '../../store'

import '../views/main-view/index'
import '../views/qr-code-view/index'
import '../views/extension-view/index'
import './routes'
import { isMobile } from '../../utils/mobile'
import { classMap } from 'lit/directives/class-map.js'

@customElement('ronin-modal')
export class RoninModal extends LitElement {
	static styles = styles

	@property()
	classes = { deskCard: true, mobileCard: false }

	@state() protected _open: boolean = false

	protected unsub_open: () => void

	protected _handleOpen(open: boolean) {
		this._open = open
		document.body.style.position = open && isMobile() ? 'fixed' : 'static'
	}

	close() {
		set.open(false)
		set.view('main')
	}

	constructor() {
		super()
		this.unsub_open = sub.open(this._handleOpen.bind(this))

		const mobile = isMobile()
		this.classes = { deskCard: !mobile, mobileCard: mobile }
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		this.unsub_open()
	}

	render() {
		if (!this._open) return

		return html`
      <div id="container" @click="${this.close}" >
        <div class="${classMap(this.classes)}" @click="${(e: Event) => e.stopPropagation()}" >
          <routes-modal></routes-modal>
        </div>
      </div>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ronin-modal': RoninModal
	}
	namespace JSX {
    interface IntrinsicElements {
      'ronin-modal': RoninModal
    }
  }
}