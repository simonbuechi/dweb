import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
//icons
import { More, Share }  from 'mdi-material-ui';

class Blog extends Component {
    render() {
    const items = [
        {"no": "1", "title": "My first blog", "body": "My first blog"},
        {"no": "2", "title": "My first blog", "body": "My first blog"},
        {"no": "3", "title": "My first blog", "body": "My first blog"},
        {"no": "4", "title": "My first blog", "body": "My first blog"},
        {"no": "5", "title": "My first blog", "body": "My first blog"}
    ];

  return (
    items && (
        items.map(item => (
        <Grid item xs={12} sm={12} key={item.no}>
            <Box m={2}>
             <Card>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <More />
                    </IconButton>
                    }
                    title="Shrimp and Chorizo Paella"
                    subheader="September 14, 2016"
                />
                <CardMedia
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <Share />
                    </IconButton>
                    <IconButton aria-label="share">
                    <Share />
                    </IconButton>
                    <IconButton
                    aria-label="show more"
                    >
                    </IconButton>
                </CardActions>
                </Card>
                </Box>
        </Grid>
        ))
        
    )
  );
}
}

export default withTranslation()(Blog);