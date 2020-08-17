import React, { Component } from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import AboutSafeBrowsing from '../../components/aboutSafeBrowsing'
import ADs from '../AdsModule'

export class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            urlText: ''
        }
        this.urlInput = React.createRef()
        this.makeUrl = this.makeUrl.bind(this)
    }

    makeUrl() {
        var protocol = window.location.protocol;
        var slashes = protocol.concat("//");
        var host = slashes.concat(window.location.hostname);
        this.setState({
            urlText: host + '?goto=' + btoa(this.state.urlText)
        })
        setTimeout(() => {
            this.urlInput.select();
            document.execCommand('copy');
        }, 0)
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <hr />
                <AboutSafeBrowsing />
                <div className="row mt-3">
                    <div className="col">
                        <ADs height="250px"/>
                    </div>
                    <div className="col d-none d-lg-block">
                        <ADs height="250px"/>
                    </div>
                </div>
                <div className="text-center form mt-3">
                    <div className="form-group">
                        <label className="sr-only">Password</label>
                        <input
                            ref={(ref) => this.urlInput = ref}
                            type="text"
                            className="form-control"
                            placeholder="Paste link here..."
                            value={this.state.urlText}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    this.makeUrl()
                                }
                            }}
                            onChange={(e) => {
                                this.setState({
                                    urlText: e.target.value
                                })
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={this.makeUrl}
                    >Create Link and Copy
                    </button>
                </div>
                <Footer className="mt-3" />
            </div>
        )
    }
}

export default index
