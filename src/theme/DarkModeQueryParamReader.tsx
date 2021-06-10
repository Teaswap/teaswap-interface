import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { parse } from 'qs'
import { AppDispatch } from '../state'
import { updateUserDarkMode } from '../state/user/actions'

const DarkModeQueryParamReader = () =>{
// export default function DarkModeQueryParamReader({ location: { search } }: RouteComponentProps): null {
  const dispatch = useDispatch<AppDispatch>()
  const search = useSearchParams()

  useEffect(() => {
    if (!search) return
    if (search.length < 2) return

    const parsed = parse(search.toString(), {
      parseArrays: false,
      ignoreQueryPrefix: true
    })

    const theme = parsed.theme

    if (typeof theme !== 'string') return

    if (theme.toLowerCase() === 'light') {
      dispatch(updateUserDarkMode({ userDarkMode: false }))
    } else if (theme.toLowerCase() === 'dark') {
      dispatch(updateUserDarkMode({ userDarkMode: true }))
    }
  }, [dispatch, search])

  return null
};
export default DarkModeQueryParamReader;
