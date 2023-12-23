import { css } from 'lit'
import { extension_button, modal, title } from '../../css/global'

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
    font-size: ${extension_button.fontSize};
    font-weight: ${extension_button.fontWeight};
    height: ${extension_button.height};
    border-radius: ${extension_button.borderRadius};
    background-color: ${extension_button.backgroundColor};
    color: ${extension_button.color};
  
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
    background-color: ${extension_button.backgroundColor_hover};
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
  }
  
  .retry-svg{
    width:15px;
  }
`
