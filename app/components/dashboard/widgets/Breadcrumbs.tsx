import React from 'react';
import { Link, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type Breadcrumb = {
    title: string;
    href?: string;
};

interface IBreadcrumbsProps {
    steps: Breadcrumb[];
}

const Breadcrumbs = ({steps}: IBreadcrumbsProps) => {
    return (
        <MuiBreadcrumbs maxItems={3} separator={<NavigateNextIcon fontSize="small" />}>
            <Link underline="hover" color="secondary.main" href="/" variant='caption'>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
            </Link>
            {steps.map((step, index) => (
                <Link underline={step.href ? "hover" : "none"} key={index} color={step.href ? "secondary.main" : "action"} href={step.href}  variant='caption'>
                    {step.title}
                </Link>
            ))}
        </MuiBreadcrumbs>
    );
};

export default Breadcrumbs;