import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
//material-ui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { TestQuery } from "../graphql/testQuery";

const apolloClient = new ApolloClient({
  uri: "http://185.25.224.124:8000",
  credentials: "same-origin",
  //skipSSLValidation: true,
});

class Queries extends Component {
  render() {
    const { t } = this.props;

    return (
      <>
        <Helmet>
          <title>Simon Buechi | Queries</title>
          <meta name="description" content="Simon Buechi Büchi" />
        </Helmet>
        <Typography variant="h2" gutterBottom>
          {t("queries.title")}
        </Typography>
        <Box my={2}>
          <TextField name="name" label={t("sendMessage.nameLabel")} fullWidth margin="normal" variant="outlined" />
          <Button variant="contained" color="primary" type="submit" value="Send">
            {t("sendMessage.buttonSend")}
          </Button>
        </Box>
        <ApolloProvider client={apolloClient}>
          <TestQuery />
        </ApolloProvider>
      </>
    );
  }
}

export default withTranslation()(Queries);
