// @ts-ignore
const parsePostSlug = ({ fields }) => {
    return {
        slug: fields.slug,
    }
}

const parsePostSlugEntries = (entries: any) => {
    // @ts-ignore
    return entries?.items?.map((post) => post.fields)
}

// slugのリストを取得する
export const getSlugs = async (client: any) => {
    const entries = await client.getEntries({
        content_type: 'blogPost',

        // postのslugの値を取得
        select: 'fields.slug',
    })

    return parsePostSlugEntries(entries)
}

// slugからページを引っ張ってくる
export const getPage = async (client: any, slug: string) => {
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

// 記事全件取得
export const getAllPage = async (client: any) => {
    return await client.getEntries({
        content_type: 'blogPost',
        order: '-fields.createdAt',
    })
}
