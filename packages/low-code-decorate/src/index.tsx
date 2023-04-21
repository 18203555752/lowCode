import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './styles/index.css';
// import 'antd/dist/antd.dark.less';
import { ConfigProvider,theme  } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as Element
)
root.render(
  <React.StrictMode>
  <ConfigProvider  theme={{
        algorithm: theme.darkAlgorithm,
    }}>
    <App />
  </ConfigProvider>
  </React.StrictMode>
)

reportWebVitals()
