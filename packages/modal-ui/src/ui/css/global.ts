import { css } from 'lit'
import { getModal } from '../../core/modal'

const dark = getModal.darkMode()

const color = {
	modal: dark ? css`var(--rm-global-color, #fff)` : css`var(--rm-global-color, #000)`,
	title: dark ? css`var(--rm-title-color, #fff)` : css`var(--rm-title-color, #000)`,
	main_button: dark ? css`var(--rm-main-btn-color, #fff)` : css`var(--rm-main-btn-color, #000)`,
	secondary_button: dark ? css`var(--rm-secondary-btn-color, #fff)` : css`var(--rm-secondary-btn-color, #000)`,
}

const backgroundColor = {
	modal: dark ? css`var(--rm-global--bg-color, #1a1c23)` : css`var(--rm-global--bg-color, #fff)`,
	main_button: dark ? css`var(--rm-main-btn-bg-color, transparent)` : css`var(--rm-main-btn-bg-color, #F6F7F9)`,
	secondary_button: dark
		? css`var(--rm-secondary-btn-bg-color, #282a39)`
		: css`var(--rm-secondary-btn-bg-color, #F6F7F9)`,
}

const backgroundColor_hover = {
	main_button: dark ? css`var(--rm-main-btn-bg-color-hover, #21232c)` : css`var(--rm-main-btn-bg-color-hover, #eceef1)`,
	secondary_button: dark
		? css`var(--rm-secondary-btn-bg-color-hover, #2d3142)`
		: css`var(--rm-secondary-btn-bg-color-hover, #eceef1)`,
}

export const modal = {
	fontFamily: css`var(--rm-global-font-family, inherit)`,
	fontSize: css`var(--rm-global-font-size, 20px)`,
	fontWeight: css`var(--rm-global-font-weight, 500)`,
	borderRadius: css`var(--rm-global-border-radius, 14px)`,
	backgroundColor: backgroundColor.modal,
	color: color.modal,
}

export const title = {
	fontSize: css`var(--rm-title-font-size, 20px)`,
	fontWeight: css`var(--rm-title-font-weight, 500)`,
	color: color.title,
}

export const main_button = {
	fontSize: css`var(--rm-main-btn-font-size, 1.1rem)`,
	fontWeight: css`var(--rm-main-btn-font-weight, 500)`,
	borderRadius: css`var(--rm-main-btn-border-radius, 0.4rem)`,
	backgroundColor: backgroundColor.main_button,
	backgroundColor_hover: backgroundColor_hover.main_button,
	color: color.main_button,
}

export const secondary_button = {
	fontSize: css`var(--rm-secondary-btn-font-size, 17px)`,
	fontWeight: css`var(--rm-secondary-btn-font-weight, 500)`,
	borderRadius: css`var(--rm-secondary-btn-border-radius, 10px)`,
	height: css`var(--rm-secondary-btn-height, 30px)`,
	backgroundColor: backgroundColor.secondary_button,
	backgroundColor_hover: backgroundColor_hover.secondary_button,
	color: color.secondary_button,
}
