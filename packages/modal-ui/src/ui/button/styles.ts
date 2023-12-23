import { css } from 'lit'
import { connect_button } from '../css/button'

export const styles = css`
.button {
  display: block;
  user-select: none;
  font-weight: ${connect_button.fontWeight};
  color: ${connect_button.color};
  width: ${connect_button.width};
  background-color: ${connect_button.backgroundColor};
  font-family: ${connect_button.fontFamily};
  font-size: ${connect_button.fontSize};
  border-radius: ${connect_button.borderRadius};
  padding: ${connect_button.padding};
  cursor: pointer;
  text-align: center;
  border: 0;
  
  transition: cubic-bezier(0.25,0.1,0.25,1) 250ms all;
}

.button:hover {
  background-color: ${connect_button.backgroundColor_hover};
}

.truncate{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
`
