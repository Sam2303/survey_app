import React from 'react'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className="navContainer">
            <h1><Link href="/">Survey Me</Link></h1>
            <Link href="./take" className="link">Take a Survey</Link>
            <Link href="./create" className="link">Create a Survey</Link>
            <Link href="./view" className="link">View your Surveys</Link>
        </div>
    )
}

export default Nav
