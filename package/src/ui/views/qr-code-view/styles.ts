import { css } from 'lit'

export const styles = css`
:host{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding-bottom: 10px;
  padding-top: 6px;
}

#title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: center;

  margin-right: 1px;
}

#title .title{
  margin-left: 11px;
  font-size: 22px;
}

#title p{
  margin: 0;
  padding: 0;
}

#close{
  background: none;
  border: none;
  color: #fff;
  padding: 9px;
  border-radius: 7px;
  margin: 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
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
}

#qr-code{
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.3);

  margin: 10px 16px 10px 16px;
}

.svg{
  background-color: #fff;
  border: 10px solid #fff;
  border-radius: 14px;
}

#qr-code .ronin-blue{
  margin-top: 4px;
  width: 50px;
  height: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  transition: all .4s ease;
}

#go-back:hover{
  transform: scale(1.2)
}

.qr-place-holder{
  width: 249px;
  height: 249px;
  background-color: rgba(64,64,64);
  border-radius: 14px;

  background: linear-gradient(110deg, rgba(64,64,64) 30%, rgba(125,125,125) 50%, rgba(64,64,64) 70%);
  background-size: 200% 100%;
  animation: 1s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}

.qr-place-holder div {
  position: absolute;
  width: 50px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
  width: 65px;
  height: 65px;
}

.description{
  width: 200px;
  height: 46px;
  text-align: center;
  font-size: 16px;
  opacity: 0.7;
}
`
