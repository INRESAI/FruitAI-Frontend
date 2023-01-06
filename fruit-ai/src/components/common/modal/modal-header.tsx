/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';

type ModalHeaderProps = {
    title: string;
    closeButton: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#FFDADE',
            height: '64px',
            padding: '20px'
        },
        title: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignSelf: 'center',
            flexDirection: 'row',
            color: '#18191F',
            fontSize: '18px',
            width: '80%'
        },
        btn: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignSelf: 'center',
            flexDirection: 'row',
            width: '20%'
        },
        btnComponent: {
            color: '#FF0039'
        }
    }),
);

const ModalHeader: FC<ModalHeaderProps> = ({ title, closeButton }: ModalHeaderProps) => {
    const classes = useStyles();

    return (
        <div className={`${classes.root} main-content`}>
            <div className={classes.title}>
                <Typography id="tableTitle">
                    {title}
                </Typography>
            </div>
            <div className={classes.btn}>
                <CancelIcon className={classes.btnComponent} onClick={closeButton} />
            </div>
        </div>
    );
}

export default ModalHeader;
