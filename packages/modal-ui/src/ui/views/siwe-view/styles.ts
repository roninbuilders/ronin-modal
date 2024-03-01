import { css } from 'lit'
import { secondary_button, modal, title } from '../../css/global'
import { connect_button } from '../../css/button'

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
  
  #title .title{
    margin-left: 13px;
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

  .images-container{
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin: 11px 0;
  }

  #go-back:hover{
    transform: scale(1.1);
  }

  .pfp-border{
    padding: 1px;
    border-radius: 50%;
    border: solid 1px #ECECEC;
    background-color: transparent;
    width: 54px;
    height: 54px;
  }
  
  .pfp{
    overflow: hidden;
    background-color: transparent;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    width: fit-content;
    height: fit-content;
    width: 54px;
    height: auto;
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .pfp img{
    width: 54px;
    height: auto;
  }

  .button{
    cursor: pointer;
    border: 0;
    font-size: 17px;
    border-radius: ${connect_button.borderRadius};
    background-color: ${connect_button.backgroundColor};
    color: ${connect_button.color};
  
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;

    padding: 9px 15px;
    cursor:pointer;
    user-select: none;
    margin-top: 5px;
  
    transition: all .2s ease;
  }

  .secondary{
    width: 100%;
    border-radius: ${secondary_button.borderRadius};
    background-color: ${secondary_button.backgroundColor};
    color: ${secondary_button.color};
  }

  .secondary: hover{
    background-color: rgba(${secondary_button.backgroundColor}, 0.5);
  }

  .button span{
    width: 64px;
  }

  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;

    text-align: center;
    max-width: 300px;
    font-size: 17px;
  }

  hr{
    height: 1px;
    border-width: 0px;
    margin: 0;
    padding: 0;
    width: 100%;
    opacity: 0.1;
    background-color: ${modal.color};
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
  
  .ronin-blue {
    width: 40px;
    height: auto;
  }
`
