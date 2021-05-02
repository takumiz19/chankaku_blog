import React, {FC} from 'react'
import styled from "styled-components"

interface Props {
  img: string
  title: string
  className?: string
}

const Card: FC<Props> = (props) => {
  return (
    <CardContent className={props.className}>
      <EyeCatch>
        <Img src={props.img} alt="hoge"/>
      </EyeCatch>
      <TitleArea>
        <Title>{props.title}</Title>
      </TitleArea>
    </CardContent>
  )
}
export default Card

const EyeCatch = styled.div`
  width: 100%;
  height: 200px;
`
const Img = styled.img`
  width: 100%;
`
const CardContent = styled.div`
  width: 296px;
  height: 296px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: .3s;
  &:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.25);
    transform: translateY(-8px);
  }
`
const TitleArea = styled.div`
  height: auto;
  padding: 8px;
`
const Title = styled.span`
  font-weight: bold;
`