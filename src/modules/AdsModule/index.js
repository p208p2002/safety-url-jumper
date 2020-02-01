import React from 'react';
import './index.css'
import AdSense from 'react-adsense';
function Index() {
    return (
        <div id="ADS">
            <AdSense.Google
                client='ca-pub-3857728160074264'
                slot='2770270783'
            />
        </div>
    )
}

export default Index