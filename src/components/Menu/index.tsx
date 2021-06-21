import React, { useRef } from 'react'
// import { Info, MessageCircle, Twitter, Send } from 'react-feather'
import styled from 'styled-components'
import { lighten } from 'polished'
import { useTranslation } from 'react-i18next'

// import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useActiveWeb3React } from '../../hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

// import { ExternalLink } from '../../theme'
import { ButtonPrimary } from '../Button'
import { useNavigate } from 'react-router-dom';

// const StyledMenuIcon = styled(MenuIcon)`
//   path {
//     stroke: ${({ theme }) => theme.bg2};
//   }
// `

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: #ffffff;
  border: 1px solid ${({ theme }) => theme.lightGray};
  color: ${({ theme }) => theme.gray};
  font-weight: 500;
  cursor: pointer;
  :hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.darkGray};
  }
  // background-color: ${({ theme }) => lighten(0.05, theme.primary1)};

  padding: 0.15rem 0.5rem;
  border-radius: 0px;
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 12.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 0px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

// const MenuItem = styled(ExternalLink)`
//   flex: 1;
//   padding: 0.5rem 0.5rem;
//   color: ${({ theme }) => theme.text2};
//   :hover {
//     color: ${({ theme }) => theme.text1};
//     cursor: pointer;
//     text-decoration: none;
//   }
//   > svg {
//     margin-right: 8px;
//   }
// `

// const CODE_LINK = 'https://github.com/KodamaSakuno/uniswap-interface'

export default function Menu() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const navigate = useNavigate();

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  const openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        Activity
        {/* <StyledMenuIcon /> */}
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          {/* <MenuItem id="link" href="https://t.me/icashrewards123">
            <Send size={14} />
            Telegram
          </MenuItem>
          <MenuItem id="link" href="https://www.instagram.com/artteaswap/">
            <MessageCircle size={14} />
            Instagram
          </MenuItem>
          {/* <MenuItem id="link" href="http://teaswap-art.medium.com/">
            <BookOpen size={14} />
            Medium
          </MenuItem> */}
          {/* <MenuItem id="link" href="https://twitter.com/ArtTeaswap">
            <Twitter size={14} />
            Twitter
          </MenuItem> */}
          {/* <MenuItem id="link" href="https://www.teaswap.live/news">
            <Info size={14} />
            {t('Announcement')}
          </MenuItem> */}
          {account && (
            <>
              <ButtonPrimary onClick={openClaimModal} padding="8px 16px" width="100%" borderRadius="0px" mt="0.5rem">
                {t('Claim')} AirDrops
              </ButtonPrimary>
              <ButtonPrimary onClick={() => {
                navigate('/nft/users/backstage')
              }} padding="8px 16px" width="100%" borderRadius="0px" mt="0.5rem">
                My Profile
              </ButtonPrimary>
            </>
          )}
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
