import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
    margin: `${theme.spacing.unit * 4}px auto`,
    fontFamily: 'roboto',
    width: '100vw',
    maxWidth: '600px',
    height: '100vh'
  },
  board: {
    flexGrow: 1,
    padding: 0,
    margin: `${theme.spacing.unit * 4}px auto`,
    fontFamily: 'roboto',
    width: '100%',
    height: '100%',
    maxHeight: '600px',
    border: '1px solid black'
  },
  boxRow: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '33.333%',
    '&:nth-of-type(2)': {
      borderTop: '1px solid black',
      borderBottom: '1px solid black'
    }
  },
  buttonRow: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100px'
  },
  button: {
    margin: 'auto'
  },
  boxCol: {
    padding: 0,
    margin: 0,
    width: '33.333%',
    height: '100%',
    '&:nth-of-type(2)': {
      borderLeft: '1px solid black',
      borderRight: '1px solid black'
    }
  },
  row: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '33.333%'
  },
  cell: {
    width: 'calc(33.333% - 8px)',
    height: 'calc(100% - 8px)',
    margin: '4px',
    cursor: 'pointer',
    transition: 'all .25s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
});
class Home extends Component {
  componentDidMount() {}
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.board}>
          {[1, 2, 3].map((a, p) => (
            <Grid
              key={p}
              container
              direction="row"
              justify="center"
              alignItems="center"
              className={classes.boxRow}>
              {[1, 2, 3].map((x, i) => (
                <Grid
                  key={i}
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  item
                  xs={4}
                  className={classes.boxCol}>
                  {[1, 2, 3].map((m, d) => (
                    <Grid
                      key={d}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.row}>
                      {[1, 2, 3].map((y, j) => (
                        <Paper key={j} className={classes.cell} />
                      ))}
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.buttonRow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => (
            <Button
              key={i}
              variant="fab"
              color="primary"
              aria-label={x}
              className={classes.button}>
              {x}
            </Button>
          ))}
        </Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
