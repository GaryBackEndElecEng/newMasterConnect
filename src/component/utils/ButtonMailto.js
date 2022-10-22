import React from 'react';
import { Link } from '@mui/material';

const ButtonMailto = ({ mailto, label }) => {
    return (
        <Link sx={{cursor:"pointer"}}
            to='#'
            onClick={(e) => {
                window.location.href = mailto;
                e.preventDefault();
            }}
        >
            {label}
        </Link>
    )
}

export default ButtonMailto