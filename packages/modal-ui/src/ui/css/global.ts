import { css } from 'lit'
import { getModal } from '../../core/modal'

const dark = getModal.darkMode()

const color = dark ? css`var(--rm-title-color, #fff)` : css`var(--rm-title-color, #000)`

const backgroundColor = {
	modal: dark ? css`var(--rm-global--bg-color, #1a1c23)` : css`var(--rm-global--bg-color, #fff)`,
	main_button: dark ? css`var(--rm-main-btn-bg-color, transparent)` : css`var(--rm-main-btn-bg-color, #F6F7F9)`,
	extension_button: dark ? css`var(--rm-main-btn-bg-color, #282a39)` : css`var(--rm-main-btn-bg-color, #F6F7F9)`,
}

const backgroundColor_hover = {
	main_button: dark ? css`var(--rm-main-btn-bg-color-hover, #21232c)` : css`var(--rm-main-btn-bg-color-hover, #eceef1)`,
	extension_button: dark
		? css`var(--rm-main-btn-bg-color-hover, #2d3142)`
		: css`var(--rm-main-btn-bg-color-hover, #eceef1)`,
}

export const modal = {
	fontFamily: css`var(--rm-global-font-family, inherit)`,
	fontSize: css`var(--rm-global-font-size, 20px)`,
	fontWeight: css`var(--rm-global-font-weight, 500)`,
	borderRadius: css`var(--rm-global-border-radius, 14px)`,
	backgroundColor: backgroundColor.modal,
	color,
}

export const title = {
	fontSize: css`var(--rm-title-font-size, 20px)`,
	fontWeight: css`var(--rm-title-font-weight, 500)`,
	color,
}

export const main_button = {
	fontSize: css`var(--rm-main-btn-font-size, 1.1rem)`,
	fontWeight: css`var(--rm-main-btn-font-weight, 500)`,
	borderRadius: css`var(--rm-main-btn-border-radius, 0.4rem)`,
	backgroundColor: backgroundColor.main_button,
	backgroundColor_hover: backgroundColor_hover.main_button,
	color,
}

export const extension_button = {
	fontSize: css`var(--rm-main-btn-font-size, 17px)`,
	fontWeight: css`var(--rm-main-btn-font-weight, 500)`,
	borderRadius: css`var(--rm-main-btn-border-radius, 10px)`,
	height: css`var(--rm-main-btn-height, 30px)`,
	backgroundColor: backgroundColor.extension_button,
	backgroundColor_hover: backgroundColor_hover.extension_button,
	color,
}
