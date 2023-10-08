import { css } from "lit";

export const styles = css`
.host{

}

#card{
  border: 3px solid #282c34;
  border-radius: 24px;
  width: 130px;
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap:10px;


  padding: 5px;
  cursor:pointer;
  user-select: none;

  transition: all .2s ease;
}

#card:hover{
  border-color: #3c424d;
  box-shadow: 0 12px 20px #0d0e12;

  background-color: rgba(0,0,0, 0.3)
}

img{
  width: var(--ronin-small-card-img-width, 100px);
  height: var(--ronin-small-card-img-height, 100px);
}
`