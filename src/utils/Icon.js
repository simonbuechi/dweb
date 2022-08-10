import SvgIcon from "@mui/material/SvgIcon";

function Icon(props) {
  return (
    <SvgIcon {...props}>
      <path d={props.path} />
    </SvgIcon>
  );
}

export default Icon;
