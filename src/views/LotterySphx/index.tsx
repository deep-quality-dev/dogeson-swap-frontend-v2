import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import Nav from 'components/LotteryCardNav'
import { Heading, Text, Button, Link, useModal} from '@pancakeswap/uikit'
import {Button as materialButton,Menu,MenuItem} from '@material-ui/core';
import PageHeader from 'components/PageHeader'
import WebFont from 'webfontloader';
import { useTranslation } from 'contexts/Localization'
import SearchIcon  from 'assets/images/search.png'
import {typeInput, setIsInput} from '../../state/input/actions'
import PrizePotCard  from './components/PrizePotCard'
import TicketCard  from './components/TicketCard'
import History  from './components/LotteryHistory'
import {useLotteryBalance} from '../../hooks/useLottery'
import { isAddress, getBscScanLink } from '../../utils'
import BuyTicketModal from './components/BuyTicketModal';

const WinningCard= styled.div`
  width: 94px;
  height: 94px;
  background: #8B2A9B;
  border-radius: 24px;
  margin: 12px 36px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0px 36px;
  }
`
const WinningCardTop= styled.div`
  width: 48px;
  height: 48px;
  background: #8B2A9B;
  border-radius: 12px;
  margin: 12px 12px;
  opacity: 0;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin: 0px 12px;
    opacity: 1;
  }
`

const ContractCard = styled(Text)`
  padding: 0 4px;
  max-width: 505px;
  height: 48px;
  text-overflow: ellipsis;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  display: flex;
  align-items: center;
  & button:last-child {
    background: #8B2A9B;
  }
`
const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: 3;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 420px;
  }
  & input {
    background: transparent;
    border: none;
    width: 100%;
    box-shadow: none;
    outline: none;
    color: #F7931A;
    font-size: 16px;
    &::placeholder {
      color: #8f80ba
    }
  }
`
const MenuWrapper = styled.div`
  position: absolute;
  width: 100%;
  background: #131313;
  color: #eee;
  margin-top: 12px;
  overflow-y: auto;
  max-height: 90vh;
  & a {
    color: white !important;
  }
  & .selectedItem {
    background: rgba(0, 0, 0, 0.4);
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: 600px;
  }
`

const ContractPanelOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
`
const PrizePotCardContainer = styled.div`
  display: flex;
  jusitfy-content: center;
  flex-direction: column-reverse;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
  }
`
const WinningCardContainer = styled.div`
  display: flex;
  margin-top: 21px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`
const WinningCardContainerTop = styled.div`
  visibility: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    margin-top: 12px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    visibility: visible;
  }
`
const PastDrawCardContainer = styled.div`
  display: flex;
  margin: 20px 0px 200px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: baseline;
  }
`
const LightContainer = styled.div`
  visibility: hidden;
  height: 0;
  width: 0;
  ${({ theme }) => theme.mediaQueries.xl} {
    position: absolute;
    right: 0px;
    height: auto;
    width: auto;
    visibility: visible;
  }
`
export default function Lottery() {
  const { account } = useWeb3React()
  const [onPresentSettingsModal] = useModal(<BuyTicketModal />)
  const winningCards=[1,16,8,9,3,4]
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [ticketSearch, setTicketSearch] = React.useState('');
  const [showDrop,setShowDrop]= useState(false);
  const [show, setShow] = useState(true);
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1);
  const [data,setdata]=useState([]);
  useLotteryBalance();
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Raleway', 'Chilanka']
      }
    });
   }, []);
  
  const dispatch = useDispatch();

  const handleItemClick = () => {
    if (activeIndex === 0)
      setActiveIndex(1);
    else
      setActiveIndex(0);
  }

  const submitFuntioncall=()=>{
    dispatch(typeInput({ input: ticketSearch }))
    dispatch(
      setIsInput({
        isInput: true
      })
    )
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      submitFuntioncall();
    }
  }

  const onSearchKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      if (selectedItemIndex < data.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
      } else {
        setSelectedItemIndex(0);
      }
    } else if (event.key === 'ArrowUp') {
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
      } else {
        setSelectedItemIndex(data.length - 1);
      }
    }
  }

  const handlerChange = (e: any) => {
    try {
      if (e.target.value && e.target.value.length > 0) {
        axios.get(`https://thesphynx.co/api/search/${e.target.value}`)
        .then((response) => {
          setdata(response.data);
        })
      } else {
        setdata([]);
      }
    } catch(err) {
      // eslint-disable-next-line no-console
      console.log("errr",err.message);
    }

    const result = isAddress(e.target.value)
    if (result) {
      setTicketSearch(e.target.value)
      setShow(false);
    } else {
      setTicketSearch(e.target.value)
      setShow(true);
    }
  }
 
  return (
    <div style={{fontFamily: 'Raleway'}}>
      <PageHeader>
        <div style={{display: 'flex', position: 'relative'}}>
          <div>
            <Heading as="h4" scale="xl" color="white">
              {t('Lottery')}
            </Heading>
            <Heading as="h6" scale="md" color="text" mt='20px'>
              {t('Win Lottery if 2, 3, 4, 5 or 6 of your ticket numbers matched')}
            </Heading>
          </div>
          <LightContainer>
            <div 
              style={{
                textAlign: 'center', 
                marginLeft: '40px' , 
                background:'rgba(0, 0, 0, 0.0)', 
                borderRadius: '24px',
            }}>
              <Text fontSize="24px" color="white" style={{fontWeight: 700}}>{t(`Latest Winning Numbers`)}</Text>
              <WinningCardContainerTop>
                {winningCards.map((item)=>(
                  <WinningCardTop>
                    <Text fontSize="18px" color="white" style={{fontWeight: 700, padding: '12px'}}> {item}</Text>
                  </WinningCardTop>
                ))}
              </WinningCardContainerTop>
            </div>
            </LightContainer>
        </div>
      </PageHeader>
      <div>
        <Nav activeIndex={activeIndex} setActiveIndex={handleItemClick} />
      </div>
      {activeIndex === 0 && (
        <>
          <PrizePotCardContainer>
            <div style={{margin: '10px'}}>
              <PrizePotCard isNext={false} setModal={null}/>
            </div>
            <div style={{margin: '10px'}}>
              <PrizePotCard isNext setModal={onPresentSettingsModal}/>
            </div>
          </PrizePotCardContainer>
          <div style={{textAlign: 'center', margin: '88px 0px 76px 0px' }}>
            <Text bold fontSize="48px" color="white" style={{fontWeight: 700}}>How it works</Text>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <Text bold fontSize="16px" style={{maxWidth: '440px' ,textAlign: 'left'}}>{t(`SpendSPX to buy tickets, contributing to the lottery pot. Win prizes if 2, 3, 4, 5 or 6 of your ticket numbers match the winning numbers and their exact order!`)}</Text>              
            </div>
          </div>
          <div 
              style={{
                textAlign: 'center', 
                // margin: '88px 0px 76px 0px' , 
                background:'rgba(0, 0, 0, 0.4)', 
                borderRadius: '24px',
                paddingTop: '32px',
                paddingBottom: '42px',
            }}>
              <Text fontSize="36px" color="white" style={{fontWeight: 700}}>{t(`Latest Winning Numbers`)}</Text>
              <WinningCardContainer >
                {winningCards.map((item)=>(
                  <WinningCard>
                    <Text fontSize="36px" color="white" style={{fontWeight: 700, padding: '26px'}}> {item}</Text>
                  </WinningCard>
                ))}
              </WinningCardContainer>
            </div>  
        </>
      )}
      {activeIndex === 1 && (
        <>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <ContractCard>
              <img src={SearchIcon} style={{marginLeft: '4px'}} alt="search"/>
              <SearchInputWrapper>
                <input placeholder='' value={ticketSearch} onFocus={() => setShowDrop(true)} onKeyPress={handleKeyPress} onKeyUp={onSearchKeyDown} onChange={handlerChange} />
                {
                showDrop &&
                <MenuWrapper>
                  {data.length > 0 ?
                    <span>
                      {data?.map((item: any, index: number) => {
                        return <Link href={`#/swap/${item.address}`}><MenuItem className={index === selectedItemIndex ? 'selectedItem' : ''}>{item.name}<br />{item.symbol}<br />{item.address}</MenuItem></Link>
                      })}
                    </span> : <span style={{ padding: '0 16px' }}>no record</span>}
                </MenuWrapper>
                }
              </SearchInputWrapper>
              <Button scale='sm' onClick={submitFuntioncall} style={{height: 'inherit'}}>{t(`Search`)}</Button>
            </ContractCard>
          </div>
          <PastDrawCardContainer>
            <div style={{margin: '10px'}}>
              <TicketCard />
            </div>
            <div style={{margin: '10px'}}>
              <History />
            </div>
          </PastDrawCardContainer>
          { showDrop && <ContractPanelOverlay onClick={() => setShowDrop(false) } />}
        </>
      )}
    </div>
  )
}