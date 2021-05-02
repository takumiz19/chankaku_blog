import { createClient } from 'contentful'
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

type Props = {
  page: any
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
  return {
    paths: [
      // String variant:
      '/posts/test-1',
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const page = await getPage()
  return {
    props: { page },
    revalidate: 1,
  }
}

// @ts-ignore
const Page: NextPage<Props> = ({page}: Props) => {
  console.log(JSON.stringify(page))
  return (
    <>
      <div>{page.fields.title}</div>
      <div>{page.fields.body}</div>
    </>
  )
}

export default Page