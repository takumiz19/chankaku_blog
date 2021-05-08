import React from 'react'
import { NextPage } from 'next'
import Card from '~/components/Card'
import styled from 'styled-components'
import { getAllPage } from '~/services/contentful'
import { createClient } from 'contentful'

const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE_ID!, // ID of a Compose-compatible space to be used \
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN!, // delivery API key for the space \
})

const Home: NextPage = ({pages}) => {
    return (
        <Index>
            {pages.map((page: any) => {
                const image = `https:${page.fields.headerImage.fields.file.url}`
                return (
                    <StyledCard
                        img={image}
                        title={page.fields.title}
                        slug={page.fields.slug}
                        key={page.slug}
                    />
                )
            })}
        </Index>
    )
}

export const getStaticProps = async () => {
    const pages = await getAllPage(client)
    return {
        props: { pages: pages.items },
        revalidate: 1,
    }
}

export default Home

const Index = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 96px;
    padding: 40px;
`
const StyledCard = styled(Card)`
    margin: 0 32px 32px 0;
`
