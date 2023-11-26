import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styles } from './styles'
import { sub } from '../../store'

import './routes'
import { isMobile } from '../../utils/mobile'
import { classMap } from 'lit/directives/class-map.js'
import { closeModal } from '../../utils/functions'

@customElement('ronin-modal')
export class RoninModal extends LitElement {
	static styles = styles

	@property()
	classes = { deskCard: true, mobileCard: false }

	@state() _open: boolean = false

	protected unsub_open: () => void

	protected _handleOpen(open: boolean) {
		this._open = open
		document.body.style.position = open && isMobile() ? 'fixed' : 'static'
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
      <div id="container" @click="${closeModal}" >
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
}
