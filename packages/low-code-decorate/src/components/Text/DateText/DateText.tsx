import { FC } from 'react';
import './index.less';

interface Props {
  basic: any
}

const DateText:FC<Props> = (props) => {
  const { basic } = props
  return <div >{basic.input}</div>
}
export default DateText