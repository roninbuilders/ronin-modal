import { css } from 'lit'

export const styles = css`
  #container {
    margin: 0;
    padding: 15px;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    background-color: rgba(0, 0, 0, 0.45);

    font-family: var(
      --ronin-font-family,
      Work Sans,
      sans-serif,
      Nunito Sans,
      Helvetica Neue,
      Helvetica,
      Arial
    );
    font-weight: var(--ronin-font-weight, 500);
    font-size: var(--ronin-font-size, 20px);
  }

  #card {
    will-change: transform, opacity;

    background: var(--ronin-modal-bg, #2d2c2c);
    color: #fff;

    max-width: 340px;
    min-width: fit-content;

    margin: 10px;
    padding: 15px 20px 19px 20px;

    border-radius: 24px;

    animation-duration: 0.2s;
    animation-name: zoom-in;
    animation-fill-mode: backwards;
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95);
    }
    100% {
      transform: scale(1);
    }
  }
`
