import { css } from "lit";

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
    justify-content: space-around;
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
  
  # close:hover{
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
`