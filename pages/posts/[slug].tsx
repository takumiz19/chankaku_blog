import { createClient  } from 'contentful'
import { NextPage, GetStaticProps } from 'next'

const client = createClient({
  space: process.env.SPACE_ID!, // ID of a Compose-compatible space to be used \
  accessToken: process.env.ACCESS_TOKEN!, // delivery API key for the space \
})

type Page = {
  title: string
  body: string
  slug: string
}

type Props = {
  slug: string
}

async function getPage(slug: string) {
  const query = {
    content_type: 'blogPost',
    limit: 1,
    'fields.slug': slug,
  }
  const {
    items: [page],
  } = await client.getEntries(query)
  return page || null
}

// @ts-ignore
const parsePostSlug = ({ fields }) => {
  return {
    slug: fields.slug,
  };
}

// @ts-ignore
const parsePostSlugEntries = (entries) =>  {
  // @ts-ignore
  return entries?.items?.map( (post) => post.fields);
}

const getSlugs = async () => {
  const entries =  await client.getEntries({
    content_type: "blogPost",
    
    // postのslugの値を取得
    select: "fields.slug",
  });

  return parsePostSlugEntries(entries,);
}

export async function getStaticPaths() {
  const slugs = await getSlugs()
  return {
      // @ts-ignore
    paths: slugs.map(slug => `/posts/${slug.slug}`),
    fallback: 'blocking',
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Props> = async () => {
  const slugs = await getSlugs()
  return {
    props: { slugs },
    revalidate: 1,
  }
}

// @ts-ignore
const Page: NextPage<Props> = ({ slug }: Props) => {
  return (
    <>
      <div>{slug}</div>
    </>
  )
}

export default Page
