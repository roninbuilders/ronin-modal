import { css } from "lit";

export const connect_button = {
  width: css`var(--connect-btn-width, 134px)`,
  backgroundColor: css`var(--connect-btn-bg-color, rgb(13 110 253))`,
  backgroundColor_hover: css`var(--connect-btn-bg-color-hover, rgb(13 110 253 / 0.9))`,
  color: css`var(--connect-btn-color, #e2e4e9)`,
  fontFamily: css`var(--connect-btn-font-family, SF Pro Rounded)`,
  fontSize: css`var(--connect-btn-font-size, 0.95rem)`,
  fontWeight: css`var(--connect-btn-font-weight, 500)`,
  borderRadius: css`var(--connect-btn-border-radius, 0.4rem)`,
  padding: css`var(--connect-btn-padding, 11px 13px)`,
}

export const modal = {
  color: css`var(--modal-color, #fff)`,
  backgroundColor: css`var(--modal--bg-color, #1a1c23)`,
  fontFamily: css`var(--modal-font-family, SF Pro Rounded)`,
  fontSize: css`var(--modal-font-size, 20px)`,
  fontWeight: css`var(--modal-font-weight, 500)`,
  borderRadius: css`var(--modal-border-radius, 14px)`,
}