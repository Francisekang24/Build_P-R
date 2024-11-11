import { NavbarProps } from '../../types';

const Navbar_01: React.FC<NavbarProps> = ({ backgroundColor, textColor, logo, links }) => {
    return (
        <nav style={{ backgroundColor, color: textColor }} className="navbar">
            <div className="navbar-container">
                {typeof logo === 'string' ? (
                    <a href="#" className="navbar-logo">
                        {logo}
                    </a>
                ) : (
                    logo
                )}
                <ul className="navbar-menu">
                    {links.map((link, index) => (
                        <li key={index} className="navbar-item">
                            <a href={link.href} className="navbar-link">
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

const Navbar_02: React.FC<NavbarProps> = ({ backgroundColor, textColor, logo, links }) => {
    return (
        <nav style={{ backgroundColor, color: textColor }} className="navbar navbar-variant">
            <div className="navbar-container">
                <div className="navbar-logo-container">
                    {typeof logo === 'string' ? (
                        <a href="#" className="navbar-logo">
                            {logo}
                        </a>
                    ) : (
                        logo
                    )}
                </div>
                <div className="navbar-links-container">
                    {links.map((link, index) => (
                        <a key={index} href={link.href} className="navbar-link">
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

interface NavbarExportProps extends NavbarProps {
    variant: 'Navbar_01' | 'Navbar_02';
}

const Navbar01: React.FC<NavbarExportProps> = ({ variant, ...props }) => {
    if (variant === 'Navbar_01') {
        return <Navbar_01 {...props} />;
    } else {
        return <Navbar_02 {...props} />;
    }
};

export default Navbar01;
