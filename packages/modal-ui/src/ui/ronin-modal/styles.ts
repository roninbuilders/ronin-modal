import { css } from 'lit'

export const styles = css`
  #container {
    display: block;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    background-color: rgba(0, 0, 0, 0.3);

    font-family: var(
      --ronin-font-family,
      'SF Pro Rounded'
    );
    font-weight: var(--ronin-font-weight, 500);
    font-size: var(--ronin-font-size, 20px);
  }

  .deskCard {
    will-change: transform, opacity;

    background: var(--ronin-modal-bg, #1a1c23);
    color: #fff;

    max-width: 340px;
    min-width: fit-content;

    margin: 10px;
    padding: 15px 20px 19px 20px;

    border-radius: 14px;

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
  
  .mobileCard {
    will-change: bottom, opacity;

    background: var(--ronin-modal-bg, #1a1c23);
    position: absolute;
    bottom: 0;
    color: #fff;

    width: 100%;

    padding: 15px 20px 19px 20px;

    border-top-left-radius: 34px;
    border-top-right-radius: 34px;

    animation-duration: 1s;
    animation-name: show-up;
    animation-fill-mode: backwards;
  }

  
  @keyframes show-upn {
    0% {
      bottom: -100%;
    }
    100% {
      bottom: 0;
    }
  }
`
