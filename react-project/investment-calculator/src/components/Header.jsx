import HeaderImg from "../assets/investment-Calculator-logo.png";

export default function Header() {
    return (
        <header id="header">
            <img src={HeaderImg} alt="Logo showing a money bag" />
            <h1>Investment Calculator</h1>
        </header>
    )
}