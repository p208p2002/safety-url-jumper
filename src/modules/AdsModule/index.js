import React from 'react';
import AdSense from 'react-adsense';
import styled from 'styled-components'
const ADS  = styled.div`
    background-color:rgb(248,248,248);
`
function Index(props) {
    return (
        <ADS>
            <AdSense.Google
                client='ca-pub-3857728160074264'
                slot='2770270783'
                style={{ display: 'block',height:props.height?props.height:'auto' }}
                format={props.height?'':'auto'}
                responsive='true'
            />
        </ADS>
    )
}

export default Index