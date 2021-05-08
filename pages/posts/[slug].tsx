import { createClient } from 'contentful'
import { NextPage, GetStaticProps } from 'next'
import { getSlugs, getPage } from '~/services/contentful'
import DetailPage from '~/components/DetailPage'

const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE_ID!, // ID of a Compose-compatible space to be used \
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN!, // delivery API key for the space \
})

type Post = {
    title: string
    body: string
    slug: string
}

type Props = {
    post: Post
}

export const getStaticPaths = async () => {
    const slugs = await getSlugs(client)
    return {
        // @ts-ignore
        paths: slugs.map(({ slug }) => `/posts/${slug}`),
        fallback: 'blocking',
    }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const post = await getPage(client, params?.slug as string)
    return {
        props: { post },
        revalidate: 100,
    }
}

// @ts-ignore
const Page: NextPage<Props> = ({ post }: Props) => {
    return (
        <>
            <DetailPage post={post} />
        </>
    )
}

export default Page
