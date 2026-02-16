import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Queries = () => {
  const { t } = useTranslation();
  return (
    <Grid item xs={12}>
      <Typography variant="h2">{t("queries.title")}</Typography>
      <Typography variant="body1">This feature has been disabled during the migration.</Typography>
    </Grid>
  );
};

export default Queries;
