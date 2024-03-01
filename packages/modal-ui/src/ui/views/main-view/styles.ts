import { css } from 'lit'
import { modal } from '../../css/global'

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

.ronin-white {
  width: 16px;
  height: auto;
  fill: ${modal.color};
  opacity: 0.7;
}
`
