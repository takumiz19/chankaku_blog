import React from 'react'
import {NextPage} from 'next'
import Card from '~/components/Card'
import styled from "styled-components"

const Home: NextPage = (props) => {
  return (
    <Index>
      {[1,2,3,4,5].map(el => {
        return <StyledCard img="https://www.tsuzukiblog.org/wp-content/uploads/2020/03/shutterstock_1005938026.jpg" title="hogehoge" key={el} />
      })}
    </Index>
  )
}

export const getStaticProps = async () => {

  return {
    props: { },
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