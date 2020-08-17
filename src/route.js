import React, { Component } from 'react'
import GoTo from './modules/RedirectModule'
import CreateLink from './modules/CreateLinkModule'

var Url = require('url-parse');
const queryString = require('query-string');

export class Route extends Component {
    constructor(props){
        super(props)
        this.state = {
            page:<CreateLink/>
        }
    }

    componentDidMount(){
        var url = new Url(window.location.href);
        let query = queryString.parse(url.query)
        let { goto } = query
        let { page } = this.state
        if(typeof(goto) !== 'undefined'){
            page = <GoTo/>
        }
        else{
            page = <CreateLink/>
        }
        this.setState({
            page
        })
        
    }

    render() {
        let { page } = this.state
        return (
            <div>
                {page}
            </div>
        )
    }
}

export default Route
