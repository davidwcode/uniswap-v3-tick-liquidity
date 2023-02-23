import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// Generate Order Data
function createData(index, liquidity) {
    return { index, liquidity };
}


function preventDefault(event) {
    event.preventDefault();
}

export default function Display(props) {
    console.log(props.props);
    const rows = [];
    for (var i = 0; i < props.props.length; i++) {
        const data = createData(props.props[i].index, props.props[i].liquidity);
        rows.push(data);
    }
    const ticks = "Tick Index (# loaded: " + props.props.length + ")";
    function Load() {
        if (props === {}) {
            return (
                <div>Hello</div>
            )
        } else {
            return (
                <React.Fragment>
                    <Table size="small" style={{ width: 600, margin: 'auto' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>{ticks} </TableCell>
                                <TableCell align="right">Gross Liquidity at Tick</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.index}</TableCell>
                                    <TableCell align="right">{`$${row.liquidity}`}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </React.Fragment>
            );
        }
    }

    return (
        <Load/>
    );
}