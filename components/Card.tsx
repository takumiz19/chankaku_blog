import React, { FC } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

interface Props {
    img: string
    title: string
    slug: string
    className?: string
}

const Card: FC<Props> = (props) => {
    const href = `/posts/${props.slug}`
    return (
        <Link href={href}>
            <CardContent className={props.className}>
                <EyeCatch>
                    <Img src={props.img} alt="hoge" />
                </EyeCatch>
                <TitleArea>
                    <Title>{props.title}</Title>
                </TitleArea>
            </CardContent>
        </Link>
    )
}
export default Card

const EyeCatch = styled.div`
    width: 100%;
    height: 200px;
`
const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`
const CardContent = styled.div`
    width: 296px;
    height: 296px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: 0.3s;
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
