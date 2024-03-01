import { css } from 'lit'
import { secondary_button, modal } from '../../css/global'

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
  font-size: 1.1rem;
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

  font-size: ${secondary_button.fontSize};
  font-weight: ${secondary_button.fontWeight};
  border-radius: ${secondary_button.borderRadius};
  background-color: ${secondary_button.backgroundColor};
  color: ${secondary_button.color};

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
  background-color: ${secondary_button.backgroundColor_hover};
}

.disconnect-svg{
  width:16px;
  margin-bottom: 2px;
  stroke: ${modal.color};
}

.copy-svg{
  width:16px;
  margin-bottom: 2px;
  stroke: ${modal.color};
}
`
