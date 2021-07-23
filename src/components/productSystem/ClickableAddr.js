import React from 'react';
import {hideAddr} from '../../utils/strUtil'

export default ({ address }) => {
  return (
		<span style={{cursor: 'pointer'}} onClick={() => {
			window.open(`https://bscscan.com/address/${address}`)
		}}>{hideAddr(address)}</span>
  );
};
