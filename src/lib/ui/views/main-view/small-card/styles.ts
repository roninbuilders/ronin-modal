import { css } from "lit"

export const styles = css`
.host{

}

#card{
  border-radius: 14px;
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
  background-color: #21232c;
}

img{
  width: var(--ronin-small-card-img-width, 34px);
  height: var(--ronin-small-card-img-height, 34px);
}
`
