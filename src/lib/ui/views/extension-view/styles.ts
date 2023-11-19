import { css } from "lit"

export const styles = css`
  :host{
    height: 290px;
    min-width: 260px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 13px;
    align-items: center;
  }

  #title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    width: 90%;
    padding-top: 4px;
  }
  
  #title img{
    width: 20px;
  }
  
  #title p{
    margin: 0;
    padding: 0;
    font-size: var(--ronin-font-size, 24px);
  }
  
  #close{
    background: none;
    border: none;
    color: #fff;
    padding: 0;
    margin: 0;
    cursor: pointer;
  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s ease;
  }
  
  #close:hover{
    transform: scale(1.2)
  }

  #go-back{
    background: none;
    border: none;
    color: #fff;
    padding: 0;
    margin: 0;
    cursor: pointer;
  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .4s ease;
  }

  #go-back:hover{
    transform: scale(1.2)
  }

  .install-extension{
    padding-top:14px;
  }

  .button{
    font-size: 18px;
    border-radius: 10px;
    height: 34px;
    background-color: #282a39;
  
    display: flex;
    justify-content: center;
    align-items: center;
  
    padding: 5px 15px;
    cursor:pointer;
    user-select: none;
  
    transition: all .2s ease;
  }
  
  .button:hover{
    background-color: #2d3142;
  }

  .text{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .description{
    width: 200px;
    height: 44px;
    text-align: center;
    font-size: 16px;
    opacity: 0.7;
  }

  .fail-svg{
    filter: grayscale(1);
  }
`
