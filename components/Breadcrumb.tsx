import { JSXElementConstructor, ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = theme.palette.mode === "light" ? theme.palette.grey[300] : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
      cursor: "pointer",
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const Breadcrumb = () => {
  const pathname = usePathname();
  const [crumbs, setCrumbs] = useState<{href: string, label: string, icon: JSX.Element | undefined }[]>([]);

  useEffect(() => {
    const pathArray = pathname.split("/").filter((path) => path !== "");
    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: (path.charAt(0).toUpperCase() + path.slice(1)).replace(/-/g, " "),
        icon: index == 0 ? (<HomeIcon fontSize="small" />) : undefined,
      };
    });
    console.log(breadcrumbs);
    setCrumbs(breadcrumbs);
  }, [pathname]);

  return (
    <Breadcrumbs separator="/">
        {crumbs.map((crumb, index) => (
            <StyledBreadcrumb key={index} component="a" href={crumb.href} label={crumb.label} icon={crumb.icon} />
        ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
