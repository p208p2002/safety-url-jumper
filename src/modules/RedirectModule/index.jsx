import React from 'react';
import Ads from '../AdsModule'
import './index.css'
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
      urlPass: undefined
    }
    this.loadingMask = this.loadingMask.bind(this)
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
          }, 3000)
        }
        else {
          console.log('url unsafe')
          this.setState({
            urlPass: false
          })
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
        <br/>
        <span>checking...</span>
      </div>
    )
  }

  render() {
    let { urlPass } = this.state
    return (
      <div id="Redirect" className="container text-center">
        <div className="f-block">
          <h3>Jumper</h3>
        </div>
        <div className="f-block">
          <Ads />
        </div>
        <div className="f-block">
          <span>您正在前往</span><br />
          <pre>{targetUrl}</pre>
          <small>URL Checking by Google Safe Browsing</small>
          <br />
          <br />
          <small>{urlPass === undefined ? <this.loadingMask /> :
            urlPass === true ? <button>前往連結</button> : <button>失敗</button>
          }</small>
          <br />          
        </div>
      </div>
    )
  }
}

export default App;