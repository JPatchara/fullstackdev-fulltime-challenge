import Head from 'next/head'
import '../static/styles/layout.scss'
import Header from './header';

const Layout = (props) => (
    <div className="background">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta charSet="utf-8" />
            <link rel="stylesheet" 
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
                crossorigin="anonymous"
            />
        </Head>
        <Header/>
        {props.children}
    </div>
)

export default Layout