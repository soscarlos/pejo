import photo from '../../img/pagenotfound.jpg';
import logo from '../../img/logo.png';
import './style.css';

const PageNotFound = () => {
    return (
        <>
        <div id='pageNotFound'>
            <h1>404 error</h1>
            <img src={photo} alt="Page Not Found" />
            <h2>Oops, our dog ate this page</h2>
            <a href='/'><img id="logo" src={logo} alt="Go to homepage" height={50}/></a>
            <p>Go to homepage</p>
        </div>
        </>
    )
}

export default PageNotFound;