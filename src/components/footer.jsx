import React from 'react'
import githubicon from '../assets/img/github-image.png'
import styled from 'styled-components'

const Footer = styled.div`
    text-align:center;
    & a{
        color: gray;
    }
    & span{
        font-size: 12px;
    }
    & small{
        font-size: 12px;
    }
`

function footer(props) {
    return (
        <Footer className={props.className}>
            <span>Safety URL Jumper</span>
            <br />
            <small style={{ position: 'relative', display: 'block', marginTop: 2 }}>
                <a href="https://github.com/p208p2002/safety-url-jumper"><img src={githubicon} width="12" alt="github" /> github.com/p208p2002/safety-url-jumper</a>
            </small>
            <br/>
        </Footer>
    )
}

export default footer
