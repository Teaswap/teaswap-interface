import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HOST_URL } from '../../../constants/unit';
import './ReferralPage.css'
import { AiOutlineCopy } from "react-icons/ai";
import Snackbar from '@mui/material/Snackbar';
import { useActiveWeb3React } from '../../../hooks';
import { myInvitesAPI } from '../../../webAPI/userAPI';
import Pagination from '../../../components/Pagination/Index';



export default () => {

  const {t} = useTranslation();
  const [open, setOpen]  = useState(false)
  const {account} = useActiveWeb3React()
  const referral_link = HOST_URL + '/invited/' + account
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    myInvitesAPI(page).then(res => {
      console.log(res)
      if (res.ok == 1) {
        setList(res.data.users)
        setCount(res.data.count)
      }
    })
  }, [page])

  return (
    <div>
      <div className='invite-intro'>
        <div className='invite-intro-text'>
          {t('referral-intro')} 
        </div>
      </div>
      <div className='invite-link'>
        <span>Copy Referral Link: </span>
        <input type="text" disabled value={referral_link} />
        <AiOutlineCopy style={{cursor: 'pointer'}}
         onClick={() => {
          navigator.clipboard.writeText(referral_link);
          setOpen(true)
          setTimeout(() => {setOpen(false)}, 2000)
        }} color="#60a7ac" title="copy" size="20"/>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
          autoHideDuration={2000}
          open={open}
          message="copied to clipboard"
        />
      </div>
      <div id="invites">
        <div>My Invites:</div>
        <table>
          <thead>
            <td>UserId</td>
            <td>Address</td>
            <td>Username</td>
            <td>Register Time</td>
          </thead>
          {list.map(v => {
            return (
              <tr>
                <td>{v.id}</td>
                <td>{v.address}</td>
                <td>{v.username}</td>
                <td>{v.createdAt}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Pagination count={count} page={page} handleChange={(_page) => {
          setPage(_page)
        }} />
    </div>
  )
}