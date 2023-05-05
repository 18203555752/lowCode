import { FC } from 'react';
import './index.less';

interface Props {
  basic: any
}

const Map:FC<Props> = (props) => {
  const { basic } = props
  return <div className='mapCons'>{basic.input}</div>
}
export default Map