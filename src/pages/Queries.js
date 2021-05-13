import React, { Component } from "react";
import { withTranslation } from "react-i18next";
//material-ui
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

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
