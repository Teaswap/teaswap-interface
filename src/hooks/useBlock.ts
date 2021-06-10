import { useEffect, useState } from 'react'
// import Web3 from 'web3'
import { useActiveWeb3React } from '.'
// import { provider } from 'web3-core'
// import { useWallet } from 'use-wallet'
// import debounce from 'debounce'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  // const { ethereum }: { ethereum: provider } = useWallet()

  const {library} = useActiveWeb3React()

  useEffect(() => {
    // const setBlockDebounced = debounce(setBlock, 300)
    // if (!ethereum) return
    // const web3 = new Web3(ethereum)

    // const subscription = new Web3(ethereum).eth.subscribe(
    //   'newBlockHeaders',
    //   (error, result) => {
    //     if (!error) {
    //       setBlockDebounced(result.number)
    //     }
    //   },
    // )

    const interval = setInterval(async () => {
      const latestBlockNumber = await library?.getBlockNumber()
      if (block !== latestBlockNumber) {
        if(latestBlockNumber){
          setBlock(latestBlockNumber)
        }else {
          setBlock(0)
        }

      }
    }, 1000)

    return () => clearInterval(interval)
  }, [block])

  return block
}

export default useBlock
