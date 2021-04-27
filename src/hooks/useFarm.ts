import { useContext } from 'react'
import { Context as FarmsContext, Farm } from '../contexts/Farms'

const useFarm = (id: string | number): Farm|undefined => {
  const { farms } = useContext(FarmsContext)
  const farm = typeof id === 'string' ? farms.find((farm) => farm.id === id) : farms.find(farm => farm.pid === id)
  return farm
}

export default useFarm
