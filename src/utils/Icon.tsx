import SvgIcon from "@mui/material/SvgIcon";

function Icon(props: any) {
  return (
    <SvgIcon {...props}>
      <path d={props.path} />
    </SvgIcon>
  );
}

export default Icon;
