import React, { Component } from 'react'

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
            <div className="f-block">
                <h3>Safety URL Jumper</h3>
                <div className="form">
                    <div className="form-group text-center">
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
                        className="btn btn-primary"
                        onClick={this.makeUrl}
                    >Make Link and Copy</button>
                </div>
            </div>
        )
    }
}

export default index
