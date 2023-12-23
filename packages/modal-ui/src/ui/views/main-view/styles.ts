import { css } from 'lit'
import { modal, title } from '../../css/global'

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
  fill: ${modal.color};
  opacity: 0.7;
}

#title p{
  font-size: ${title.fontSize};
  font-weight: ${title.fontWeight};
  color: ${title.color};
  margin: 0;
  padding: 0;
}

#close{
  background: none;
  border: none;
  color: ${modal.color};
  padding: 7px;
  border-radius: 10px;
  margin: 0;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform .2s ease;
}

#close:hover{
  transform: scale(1.1);
}
`
