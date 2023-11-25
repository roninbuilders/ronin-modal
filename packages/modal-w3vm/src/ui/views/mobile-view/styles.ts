import { css } from 'lit'

export const styles = css`
  :host{
    height: 300px;
    min-width: 250px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
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
  
  #title p{
    margin: 0;
    padding: 0;
    font-size: var(--ronin-font-size, 24px);
  }
  
  #close{
    position: absolute;
    right: 50px;
    top: 31px;

    background: none;
    border: none;
    color: #fff;
    padding: 7px;
    border-radius: 10px;
    margin: 0;
    cursor: pointer;
  
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .1s ease;
  }

  #close:hover{
    background-color: #21232c;
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

  .button{
    font-size: 17px;
    height: 30px;
    border-radius: 10px;
    background-color: #282a39;
  
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2px;

    padding: 5px 15px;
    cursor:pointer;
    user-select: none;
  
    transition: all .2s ease;
  }
  
  .button:hover{
    background-color: #2d3142;
  }

  .ronin-blue {
    margin-top: 4px;
    width: 50px;
    height: auto;
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
    height: 46px;
    text-align: center;
    font-size: 16px;
    opacity: 0.7;
  }

  .retry-svg{
    width:16px;
    margin-bottom: 2px;
  }
`
