import { css } from 'lit'
import { main_button } from '../../../css/global'

export const styles = css`
#card{
  border-radius: ${main_button.borderRadius};
  font-size: ${main_button.fontSize};
  font-weight: ${main_button.fontWeight};
  background-color: ${main_button.backgroundColor};
  color: ${main_button.color};
  height: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px 15px;
  cursor:pointer;
  user-select: none;

  transition: all .2s ease;
}

#card:hover{
  background-color: ${main_button.backgroundColor_hover};
}

#card ::slotted(*){
  width: var(--ronin-small-card-img-width, 34px);
  height: var(--ronin-small-card-img-height, 34px);
}
`
