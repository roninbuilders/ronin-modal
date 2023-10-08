import { css } from "lit";

export const styles = css`
:host{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  padding-bottom: 10px;
  padding-top: 6px;
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
}

#qr-code{
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 10px;
  box-shadow: 0 0 10px #1A66FF;
  border-radius: 24px;

  margin: 10px 22px 10px 22px;
}

#qr-code img{
  position: absolute;
  width: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  transition: all .4s ease;
}

#go-back:hover{
  transform: scale(1.2)
}
`