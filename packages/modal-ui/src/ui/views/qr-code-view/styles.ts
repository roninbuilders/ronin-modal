import { css } from 'lit'
import { modal } from '../../css/global'

export const styles = css`
:host{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  margin-bottom: 2px;
}

#qr-code{
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  
  border-radius: 14px;

  margin: 10px 16px 10px 16px;
}

.svg{
  background-color: #fff;
  border: 10px solid #fff;
  border-radius: 14px;
  box-shadow: 0px 0px 4px 0px rgba(26, 102, 255, 0.50);
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

.qr-place-holder{
  width: 249px;
  height: 249px;
  border-radius: 14px;

  background: linear-gradient(110deg, ${modal.backgroundColor} 30%, rgba(135,135,135, 0.6) 50%, ${modal.backgroundColor} 70%);
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
  text-align: center;
  font-size: 16px;
  opacity: 0.7;
}
`
