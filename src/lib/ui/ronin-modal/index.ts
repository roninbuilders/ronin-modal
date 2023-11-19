import { LitElement, html } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import { styles } from "./styles"
import { set, sub } from "../../store"

import "../views/main-view/index"
import "../views/qr-code-view/index"
import "../views/extension-view/index"
import "./routes"
import { isMobile } from "../../utils/mobile"
import { classMap } from "lit/directives/class-map.js"

const images = ["logo-on-white.svg", "qr1.svg", "Ronin_Mark_Blue.svg", "Ronin_Mark_White.svg"]

@customElement("ronin-modal")
export class RoninModal extends LitElement {
	static styles = styles

	@property()
	classes = { deskCard: true, mobileCard: false }

	@state() protected _open: boolean = false

	protected unsub_open: () => void

	protected _handleOpen(open: boolean) {
		this._open = open
		document.body.style.position = open && isMobile() ? "fixed" : "static"
	}

	close() {
		set.open(false)
		set.view("main")
	}

	constructor() {
		super()
		this.unsub_open = sub.open(this._handleOpen.bind(this))

		const mobile = isMobile()
		this.classes = { deskCard: !mobile, mobileCard: mobile }

		// Font Family
		const fontEl = document.createElement("link")
		fontEl.rel = "stylesheet"
		fontEl.href = "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&display=swap"

		document.head.appendChild(fontEl)

		images.forEach((img) => {
			const el = document.createElement("link")
			el.rel = "preload"
			el.href = `/img/${img}`
			el.as = "image"
			document.head.appendChild(fontEl)
		})
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
		"ronin-modal": RoninModal
	}
}
