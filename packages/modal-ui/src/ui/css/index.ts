import { css } from "lit";

export const connect_button = {
  width: css`var(--rm-connect-btn-width, 134px)`,
  backgroundColor: css`var(--rm-connect-btn-bg-color, rgb(13 110 253))`,
  backgroundColor_hover: css`var(--rm-connect-btn-bg-color-hover, rgb(13 110 253 / 0.9))`,
  color: css`var(--rm-connect-btn-color, #e2e4e9)`,
  fontFamily: css`var(--rm-connect-btn-font-family, inherit)`,
  fontSize: css`var(--rm-connect-btn-font-size, 0.95rem)`,
  fontWeight: css`var(--rm-connect-btn-font-weight, 500)`,
  borderRadius: css`var(--rm-connect-btn-border-radius, 0.4rem)`,
  padding: css`var(--rm-connect-btn-padding, 11px 13px)`,
}

export const modal = {
  color: css`var(--rm-global-color, #fff)`,
  backgroundColor: css`var(--rm-global--bg-color, #1a1c23)`,
  fontFamily: css`var(--rm-global-font-family, inherit)`,
  fontSize: css`var(--rm-global-font-size, 20px)`,
  fontWeight: css`var(--rm-global-font-weight, 500)`,
  borderRadius: css`var(--rm-global-border-radius, 14px)`,
}

export const title = {
  fontSize: css`var(--rm-title-font-size, 22px)`,
  fontWeight: css`var(--rm-title-font-weight, 500)`,
  color: css`var(--rm-title-color, inherit)`
}

export const main_button = {
  backgroundColor: css`var(--rm-main-btn-bg-color, transparent)`,
  backgroundColor_hover: css`var(--rm-main-btn-bg-color-hover, #21232c)`,
  fontSize: css`var(--rm-main-btn-font-size, 1.2rem)`,
  fontWeight: css`var(--rm-main-btn-font-weight, 500)`,
  borderRadius: css`var(--rm-main-btn-border-radius, 0.4rem)`,
  color: css`var(--rm-main-btn-color, inherit)`
}

export const extension_button = {
  backgroundColor: css`var(--rm-main-btn-bg-color, #282a39)`,
  backgroundColor_hover: css`var(--rm-main-btn-bg-color-hover, #2d3142)`,
  fontSize: css`var(--rm-main-btn-font-size, 17px)`,
  fontWeight: css`var(--rm-main-btn-font-weight, 500)`,
  borderRadius: css`var(--rm-main-btn-border-radius, 10px)`,
  height: css`var(--rm-main-btn-height, 30px)`,
  color: css`var(--rm-main-btn-color, inherit)`
}