import { css } from 'lit'

export const styles = css`
.button {
  display: block;
  width: 120px;
  font-weight: 500;
  user-select: none;
  background-color: #2662d9;
  color: #e2e4e9;
  font-family: -apple-system,BlinkMacSystemFont,Inter,system-ui,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
  border-radius: 10px;
  cursor: pointer;
  padding: 13px;
  text-align: center;
  max-width: 100%;
  font-size: 15px;
  border: 0;
  
  transition: cubic-bezier(0.25,0.1,0.25,1) 250ms all;
}

.button:hover {
  background-color: #0f2757;
}

.truncate{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
`