import { css } from 'lit'
import { secondary_button } from '../../css/global'

export const styles = css`
  :host{
    min-width: 260px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 13px;
    align-items: center;
    padding: 8px;
  }

  #title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding-top: 4px;
    padding-left: 5px;
  }

  .install-svg{
    height: 150px;
    margin-bottom: 1px;
  }

  .install-description{
    opacity:0.7;
    font-size: 18px;
  }

  .button{
    font-size: ${secondary_button.fontSize};
    font-weight: ${secondary_button.fontWeight};
    height: ${secondary_button.height};
    border-radius: ${secondary_button.borderRadius};
    background-color: ${secondary_button.backgroundColor};
    color: ${secondary_button.color};
  
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    
    padding: 5px 15px;
    margin-top:4px;
    cursor:pointer;
    user-select: none;
  
    transition: all .2s ease;
  }
  
  .button:hover{
    background-color: ${secondary_button.backgroundColor_hover};
  }

  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  .description{
    width: 200px;
    height: 44px;
    text-align: center;
    font-size: 16px;
    opacity: 0.8;
  }

  .fail-svg{
    filter: grayscale(1);
    padding: 0;
    margin: 0;
    line-height: 0;
  }
  
  .retry-svg{
    width:15px;
  }

  .ronin-shiny{
    width: 140px;
  }
`
