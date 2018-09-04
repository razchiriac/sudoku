import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import pink from '@material-ui/core/colors/pink';

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
  selectedCell: {
    fontSize: '1.8em'
  },
  matchingNumberCell: {
    fontSize: '1.6em'
  },
  cell: {
    minWidth: 0,
    width: 'calc(33.333% - 8px)',
    height: 'calc(100% - 8px)',
    margin: '4px',
    cursor: 'pointer',
    transition: 'all .5s ease',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  blockNeighbor: {
    backgroundColor: '#81d4fa'
  },
  rowNeighbor: {
    backgroundColor: '#b2ebf2'
  },
  columnNeighbor: {
    backgroundColor: '#b2ebf2'
  },
  tooltip: {
    boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)`,
    backgroundColor: pink[400],
    color: '#FFF',
    fontSize: '1.2em'
  },
  paper: {
    padding: theme.spacing.unit
  }
});
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: [],
      neighbors: {
        row: [-1],
        column: [-1],
        block: [-1]
      },
      selectedCellId: -1
    };
  }
  componentDidMount() {
    this.generateCells((cells) => {
      if (cells.length === 81)
        this.generateNeighbors(cells, (newCells) => {
          this.setState({ cells: newCells });
        });
    });
  }

  generateCells = (callback) => {
    let cells = [];
    let blockCellIndexArr = [];
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        blockCellIndexArr.push([i * j, i, j]);
      }
    }

    [1, 2, 3].forEach((a) => {
      [1, 2, 3].forEach((b) => {
        [1, 2, 3].forEach((c) => {
          [1, 2, 3].forEach((d) => {
            let cell = {};
            cell.index = d + 3 * (c - 1) + 9 * (b - 1) + 27 * (a - 1);
            cell.value =
              blockCellIndexArr[cell.index - 1][0] /
              blockCellIndexArr[cell.index - 1][1];
            cell.bcAddress = [
              blockCellIndexArr[cell.index - 1][1],
              blockCellIndexArr[cell.index - 1][2]
            ];
            cell.rcAddress = [
              Math.floor((cell.bcAddress[1] - 1) / 3) +
                Math.floor(cell.bcAddress[0] - 1 / 3) -
                ((cell.bcAddress[0] - 1) % 3),
              ((cell.index - 1) % 3) + (((cell.bcAddress[0] - 1) * 3) % 9)
            ];

            cells.push(cell);
            if (cells.length === 81) callback(cells);
          });
        });
      });
    });
  };
  generateNeighbors = (cells, callback) => {
    cells.forEach((cell, index) => {
      const row = cells.filter(
        (c) => c.rcAddress[0] === cell.rcAddress[0] && c.index !== cell.index
      );
      const column = cells.filter(
        (c) => c.rcAddress[1] === cell.rcAddress[1] && c.index !== cell.index
      );
      const block = cells.filter(
        (c) => c.bcAddress[0] === cell.bcAddress[0] && c.index !== cell.index
      );
      cell.cellNeighbors = {
        row,
        column,
        block
      };
    });
    callback(cells);
  };
  onCellClick = (cellId) => {
    console.log(`Clicked on cell # ${cellId}`);
    const { cells } = this.state;
    const selectedCell = cells.find((c) => c.index === cellId);
    console.log(selectedCell);

    let neighbors = { ...selectedCell.cellNeighbors };
    neighbors.row = neighbors.row.map((n) => n.index);
    neighbors.block = neighbors.block.map((n) => n.index);
    neighbors.column = neighbors.column.map((n) => n.index);

    this.setState({ selectedCell, selectedCellId: cellId, neighbors });
  };
  onNumberClick = (number) => {
    if (number === 'Reset') {
      this.generateCells((cells) => this.setState({ cells }));
    } else {
      const { cells, selectedCellId } = this.state;
      let newCells = [...cells];
      if (selectedCellId > -1) {
        newCells[selectedCellId - 1].value = number;
        this.setState({ cells: newCells });
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { cells, selectedCell, selectedCellId, neighbors } = this.state;

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
                  {[1, 2, 3].map((m, d) => {
                    return (
                      <Grid
                        key={d}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.row}>
                        {[1, 2, 3].map((y, j) => {
                          let cellId =
                            y + 3 * (m - 1) + 9 * (x - 1) + 27 * (a - 1);
                          let number = '';
                          let cell = {};
                          let tMessage = '';
                          if (cells && cells[cellId - 1]) {
                            cell = cells[cellId - 1];
                            number = cells[cellId - 1].value;
                            tMessage = `JSON.stringify(cells[cellId - 1]);`;
                          }
                          return (
                            // <Tooltip
                            //   key={cellId * 100}
                            //   classes={{ tooltip: classes.tooltip }}
                            //   title={`${cellId} - ${tMessage}`}
                            //   placement="right">
                            <Button
                              children={`${number}`}
                              variant={
                                selectedCellId === cellId
                                  ? 'contained'
                                  : 'outlined'
                              }
                              color="primary"
                              key={cellId}
                              className={
                                selectedCellId === cellId
                                  ? classNames(
                                      classes.cell,
                                      classes.selectedCell
                                    )
                                  : neighbors.block.includes(cellId)
                                    ? classNames(
                                        classes.cell,
                                        classes.blockNeighbor
                                      )
                                    : neighbors.row.includes(cellId)
                                      ? classNames(
                                          classes.cell,
                                          classes.rowNeighbor
                                        )
                                      : neighbors.column.includes(cellId)
                                        ? classNames(
                                            classes.cell,
                                            classes.columnNeighbor
                                          )
                                        : classes.cell
                              }
                              onClick={() => this.onCellClick(cellId)}
                            />
                            // </Tooltip>
                          );
                        })}
                      </Grid>
                    );
                  })}
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Reset'].map((x, i) => (
            <Button
              key={i}
              variant="fab"
              color="primary"
              aria-label={x}
              onClick={() => this.onNumberClick(x)}
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
