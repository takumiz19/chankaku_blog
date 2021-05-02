import { createClient, Entry } from 'contentful'
import { NextPage, GetStaticProps } from 'next'

const client = createClient({
  space: process.env.SPACE_ID!, // ID of a Compose-compatible space to be used \
  accessToken: process.env.ACCESS_TOKEN!, // delivery API key for the space \
});

// type GetPageParams = {
//   pageContentType: string;
//   slug: string;
//   locale: string;
// };

type Page = {
  title: string
  body: string
  slug: string
}

type Props = {
  page: Entry<Page>
}


async function getPage() {
  const query = {
    limit: 1,
    include: 10,
    'fields.slug': 'test-1',
    content_type: 'blogPost',
  };
  const { items: [page] } = await client.getEntries(query);
  return page || null;
}

export async function getStaticPaths() {
  const page = await getPage() as Entry<Page>
  // todo slugsのリストを取ってくる
  return {
    paths: [
      // String variant:
      {
        params: { slug: page.fields.slug }
      }
    ],
    fallback: "blocking",
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage()
  return {
    props: { page },
    revalidate: 1,
  }
}

// @ts-ignore
const Page: NextPage<Props> = ({page}: Props) => {
  return (
    <>
      <div>{page.fields.title}</div>
      <div>{page.fields.body}</div>
    </>
  )
}

export default Page