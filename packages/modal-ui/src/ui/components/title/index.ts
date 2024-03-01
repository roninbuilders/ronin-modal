import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { title } from '../../css/global'

@customElement('title-rmc')
export class TitleElement extends LitElement {
	static styles = css`
    span{
      margin-left: 13px;
      font-size: 22px;
      font-size: ${title.fontSize};
      font-weight: ${title.fontWeight};
    }
  `

	render() {
		return html`<span><slot></slot></span>`
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'title-rmc': TitleElement
	}
}
