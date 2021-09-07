import { Button } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import React, { useContext, useEffect, useState } from 'react'
import { useSetRouterType } from 'state/application/hooks'
import styled from 'styled-components'
import { TabContext } from 'views/Swap'

const StyledNav = styled.div`
  text-align: center;
  display: flex;
  height: 24px;
  background: white;
  border-radius: 16px;
  & button {
    color: black;
    height: 24px;
    padding: 0 16px;
    background: transparent;
    border: none;
    box-shadow: none !important;
    outline: none;
    &:hover,
    &.active {
      background: #8b2a9b !important;
      color: white;
    }
  }
`

const TransactionNav = () => {
  const { setRouterType } = useSetRouterType()
  const [activeIndex, setActiveIndex] = useState(0)
  const [tab, setTab] = useContext(TabContext)

  const { t } = useTranslation()

  useEffect(() => {
    setTab(activeIndex)
  }, [activeIndex, setTab])

  return (
    <StyledNav>
      <Button
        className={activeIndex === 0 ? 'active' : ''}
        id="tokendv-nav-link"
        onClick={() => {
          setActiveIndex(0)
        }}
      >
        {t('Token DX')}
      </Button>
      <Button
        className={activeIndex === 1 ? 'active' : ''}
        id="transbuyer-nav-link"
        onClick={() => {
          setActiveIndex(1)
        }}
      >
        {t('Buyers')}
      </Button>
      <Button
        className={activeIndex === 2 ? 'active' : ''}
        id="transseller-nav-link"
        onClick={() => {
          setActiveIndex(2)
        }}
      >
        {t('Sellers')}
      </Button>
    </StyledNav>
  )
}

export default TransactionNav
