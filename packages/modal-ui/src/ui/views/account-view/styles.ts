import { css } from 'lit'
import { modal, title } from '../../css'

export const styles = css`
:host{
  width:100%;
  min-width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 28px;

  padding-bottom: 10px;

  margin: 10px 0 5px 0;  
}

#card-container{
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  width: 100%;
}

#title{
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 10px;
  width: 100%;
}

#title .ronin-white {
  width: 16px;
  height: auto;
}

#title p{
  font-size: ${title.fontSize};
  font-weight: ${title.fontWeight};
  margin: 0;
  margin-left: 20px;
  padding: 0;
}

#close{
  background-color: ${modal.backgroundColor};
  border: none;
  color: ${modal.color};
  padding: 7px;
  border-radius: ${modal.borderRadius};
  margin: 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.2 ease
}

#close:hover{
  filter: brightness(1.8);
}

.pfp-border{
 padding: 1px;
 border-radius: 50%;
 border: solid 1px #ECECEC;
 background-color: transparent;
 width: 60px;
 height: 60px;
}

.pfp{
  overflow: hidden;
  background-color: transparent;
  border-radius: 50%;
  margin: 0;
  padding: 0;
  width: fit-content;
  height: fit-content;
  width: 60px;
  height: 60px;

}

.pfp img{
  width: 60px;
  height: 60px;
}

.btn-group{
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.button{
  width: 160px;
  height: 40px;

  cursor: pointer;
  border: 0;
  font-size: 17px;
  border-radius: 8px;
  background-color: #2d3142;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  cursor:pointer;
  user-select: none;

  transition: all .2s ease;
}

.button:disabled{
  opacity: .5;
}

.button:hover{
  background-color: rgb(45 49 66 / 80%);
}

.disconnect-svg{
  width:16px;
  margin-bottom: 2px;
}

.copy-svg{
  width:16px;
  margin-bottom: 2px;
}
`
