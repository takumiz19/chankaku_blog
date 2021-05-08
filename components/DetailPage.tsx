import React, { FC } from 'react'

interface Props {
    post: any
}

const DetailPage: FC<Props> = ({ post }) => {
    return (
        <>
            <div>{post.fields.title}</div>
            <div>{post.fields.body}</div>
        </>
    )
}
export default DetailPage
