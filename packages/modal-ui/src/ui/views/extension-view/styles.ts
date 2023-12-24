import { css } from 'lit'
import { secondary_button, modal, title } from '../../css/global'

export const styles = css`
  :host{
    height: 290px;
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
  
  #title .title{
    margin-left: 13px;
    font-size: 22px;
    font-size: ${title.fontSize};
    font-weight: ${title.fontWeight};
  }
  
  #close{
    background: none;
    border: none;
    color: ${modal.color};
    padding: 9px;
    border-radius: 7px;
    margin: 0;
    cursor: pointer;
  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s ease;
    
    transition: transform .2s ease;
  }
  
  #close:hover{
    transform: scale(1.1);
  }

  #go-back{
    background: none;
    border: none;
    color: ${modal.color};
    padding: 0;
    margin: 0;
    cursor: pointer;
  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
  }

  #go-back:hover{
    transform: scale(1.1)
  }

  .install-extension{
    height: 150px;
    margin-bottom: 1px;
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
