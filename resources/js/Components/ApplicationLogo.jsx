import logo from "../../../public/images/app_logo.png";

export default function ApplicationLogo(props) {
    return (
        <img src={logo} alt="App Logo" className="h-12 w-auto rounded-full" />
    );
}
