import photo from '../img/pagenotfound.jpg';
import logo from '../img/logo.png';

const PageNotFound = () => {
    return (
        <>
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <h1 style={{textAlign: "center"}}>404 error</h1>
            <img src={photo} alt="Page Not Found" />
            <h2 style={{textAlign: "center"}}>Oops, our dog ate this page</h2>
            <a href='/'><img id="logo" src={logo} alt="Go to homepage" height={50}/></a>
            <p style={{textAlign: "center"}}>Go to homepage</p>
        </div>
        </>
    )
}

export default PageNotFound;