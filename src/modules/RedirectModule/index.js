import React from 'react';
import Ads from '../AdsModule'
import './index.css'
import unsafeicon from '../../assets/img/001-shield-1.png'
import safeicon from '../../assets/img/002-shield.png'
import githubicon from '../../assets/img/github-image.png'
// http://localhost:3000/?goto=aHR0cHM6Ly9lbW4xNzgucGl4bmV0Lm5ldC9ibG9nL3Bvc3QvMTA4Njk0NDE3LSVFNSU5QyVBOGphdmFzY3JpcHQlRTQlQjglQUQlRTQlQkQlQkYlRTclOTQlQThiYXNlNjQtZW5jb2RlLS0tZGVjb2Rl
// AIzaSyCeKefNghG2Y3xdnL7_naJuH4Sx2mNigXw
const URL_CHECK_API = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?key=AIzaSyCeKefNghG2Y3xdnL7_naJuH4Sx2mNigXw'
const axios = require('axios');
const queryString = require('query-string');
const parsed = queryString.parse(window.location.search);
let { goto: targetUrl = '' } = parsed
targetUrl = atob(targetUrl)

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      urlPass: undefined,
      urlText: ''
    }
    this.urlInput = React.createRef()
  }

  componentDidMount() {
    console.log(targetUrl)
    axios.post(URL_CHECK_API,
      {
        "client": {
          "clientId": "url_jumper",
          "clientVersion": "1.0.0"
        },
        "threatInfo": {
          "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
          "platformTypes": ["WINDOWS", "IOS", "OSX", "ANDROID", "LINUX"],
          "threatEntryTypes": ["URL"],
          "threatEntries": [
            { "url": targetUrl }
          ]
        }
      })
      .then((res) => {
        console.log(res)
        let { data = {} } = res,
          { matches = [] } = data
        if (matches.length === 0) {
          console.log('url safe')
          setTimeout(() => {
            this.setState({
              urlPass: true
            })
          }, 0)
        }
        else {
          console.log('url unsafe')
          setTimeout(() => {
            this.setState({
              urlPass: false
            })
          }, 0)
        }
      })
      .catch((res) => {
        console.log('api error', res)
        this.setState({
          urlPass: false
        })
      })
  }

  loadingMask() {
    return (
      <div>
        <svg className="spinner" width="40px" height="40px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
        <br />
        <span>正在確認網址安全性...</span>
        <br />
        <br />
      </div>
    )
  }

  safeLink() {
    return (
      <div
        style={{
          cursor: 'pointer'
        }}
        className="alert alert-success"
        role="alert"
        onClick={() => {
          window.open(targetUrl);
        }}
      >

        <h5 className="alert-heading"><img src={safeicon} alt="safe" width="28" /> 安全的網址</h5>
        <p>您準備前往的網址是安全的，請點<b>擊橫幅前往</b></p>
        <hr />
        <p className="mb-0">由 Google Safe Browsing 提供的安全報告</p>
      </div>
    )
  }

  unsafeLink() {
    return (
      <div
        style={{
          cursor: 'not-allowed'
        }}
        className="alert alert-danger"
        role="alert"
      >
        <h5 className="alert-heading"><img src={unsafeicon} width="28" alt="unsafe" /> 不安全的網址</h5>
        <p>您準備前往的網址可能具有風險，如仍欲前往請自行複製網址</p>
        <hr />
        <p className="mb-0">由 Google Safe Browsing 提供的安全報告</p>
      </div>
    )
  }

  render() {
    let { urlPass } = this.state
    return (
      <div id="Redirect" className="container text-center">
        <div className="f-block">
          <Ads />
        </div>
        <div className="f-block">
          <br />
          <span>您正在準備前往</span>
          <br />
          <pre>{targetUrl}</pre>
          {/* <small className="hint-text">URL Checking by Google Safe Browsing</small> */}
          <br />
          <div>{urlPass === undefined ? <this.loadingMask /> :
            urlPass === true ? <div>
              <this.safeLink />
            </div> : <this.unsafeLink />
          }</div>
          <div className="title-block">
            <span>Safety URL Jumper</span>
            <br />
            <small style={{ position: 'relative', display: 'block', marginTop: 2 }}>
              <a href="https://github.com/p208p2002/safety-url-jumper"><img src={githubicon} width="12" alt="github" /> github.com/p208p2002/safety-url-jumper</a>
            </small>
          </div>
        </div>
      </div>
    )
  }
}

export default App;