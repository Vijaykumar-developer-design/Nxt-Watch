import styled from 'styled-components'

export const BannerDiv = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 300px;
  width: 100%;
  display: ${props => (props.hide ? 'none' : 'block')};
`

export const BannerInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
