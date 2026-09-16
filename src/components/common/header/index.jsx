const Header = ({ title, className = "", style = {}, id }) => {
    return (
        <header className="mb-8">
            <h2 id={id} className={`text-3xl font-semibold text-secondary ${className}`} style={style}>{title}</h2>
        </header>
    );
}

export default Header;