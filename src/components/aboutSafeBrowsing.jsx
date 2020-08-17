import React from 'react'
// import styled from 'styled-components'
function aboutSafeBrowsing() {
    return (
        <div className="card" style={{backgroundColor:"#f7f7f9"}}>
            <div className="card-body">
                <div className="card-title">
                <b>What is Google Safe Browsing?</b>
                </div>
                <div className="card-text">
                Safe Browsing is a Google service that lets client applications check URLs against Google's constantly updated lists of unsafe web resources.
                </div>
            </div>
        </div>
    )
}

export default aboutSafeBrowsing
