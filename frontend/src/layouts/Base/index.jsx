import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../../components/header'

const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  color: black;
  height: 100%;
`

const Base = () => {
  return (
    <WrapperContainer>
      <Header />
      <Outlet />
    </WrapperContainer>
  )
}

export default Base
