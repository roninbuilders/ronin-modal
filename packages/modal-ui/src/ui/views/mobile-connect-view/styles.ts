import { css } from 'lit'
import { modal, secondary_button } from '../../css/global'
import { connect_button } from '../../css/button'

export const styles = css`
  :host{
    min-width: 250px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 24px;
    padding: 12px;
    align-items: center;
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

  #title{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
  
    margin-right: 1px;
  }
  
  #title img{
    width: 20px;
  }

  .button{
    cursor: pointer;
    border: 0;
    font-size: 17px;
    border-radius: ${connect_button.borderRadius};
    background-color: ${connect_button.backgroundColor};
    color: ${connect_button.color};
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2px;

    padding: 9px 15px;
    cursor:pointer;
    user-select: none;
    margin-top: 5px;
  
    transition: all .2s ease;
  }

  .secondary{
    border-radius: ${secondary_button.borderRadius};
    background-color: ${secondary_button.backgroundColor};
    color: ${secondary_button.color};
  }

  .button:disabled{
    opacity: .5;
  }

  .button span{
    width: 64px;
  }

  .ronin-blue {
    margin-top: 4px;
    width: 50px;
    height: auto;
  }

  .text{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .description{
    width: 230px;
    height: 46px;
    text-align: center;
    font-size: 16px;
    opacity: 0.7;
  }

  .retry-svg{
    width:16px;
    margin-bottom: 2px;
  }

  .install-container{
    display: flex;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    font-size: 17px;
    border: 1px solid ${secondary_button.backgroundColor};
    border-radius: ${secondary_button.borderRadius};
    padding: 10px 14px;
  }

  .install-btn{
    cursor: pointer;
    border: 0;
    font-size: 17px;
    border-radius: ${secondary_button.borderRadius};
    background-color: ${secondary_button.backgroundColor};
    color: ${secondary_button.color};
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2px;

    padding: 9px 15px;
    cursor:pointer;
    user-select: none;
  }
`
