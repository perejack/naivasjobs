import './Card.css';

export const Card = ({ children, className = '', hover = false, onClick }) => {
    return (
        <div
            className={`card ${hover ? 'card-hover' : ''} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ children, className = '' }) => {
    return <div className={`card-header ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = '' }) => {
    return <h3 className={`card-title ${className}`}>{children}</h3>;
};

export const CardDescription = ({ children, className = '' }) => {
    return <p className={`card-description ${className}`}>{children}</p>;
};

export const CardContent = ({ children, className = '' }) => {
    return <div className={`card-content ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = '' }) => {
    return <div className={`card-footer ${className}`}>{children}</div>;
};
