import React, { FC, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';

import PageHeader from '../common/page-header/page-header';
import VideoItem from './video-item';

import farmService from '../../services/farm';
import { apiPen } from '../../api/pen';
import { IPenData } from '../../types/pen'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '80%'
        },
        videoList: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '10px'
        },
        videoItem: {
            marginLeft: '10px',
            marginRight: '10px'
        }
    }),
);

const Video: FC = () => {
    const classes = useStyles();
    const [pens, setPens] = useState<Array<IPenData | any>>([]);

    const currentFarm = farmService.getCurrentFarm();

    useEffect(() => {
        getAllPens();
    }, []);

    const getAllPens = () => {
        const params = {
            offset: 0,
            size: 1000,
            farmId: currentFarm.id,
            name: "",
            area: 0,
            weightTypeId: ""
        }

        apiPen.getAllPen(params)
        .then((res: any) => {
            setPens(res.items);
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <div className={`${classes.root} main-content`}>
            <PageHeader
                pageTile="102 Chuồng heo"
                isButton={false}
            />
            <div className={classes.videoList}>
                {
                    pens.map((pen, index) => {
                        return(
                            <>
                                <div className={classes.videoItem}>
                                    <VideoItem uuId={uuidv4()} pen={pen}/>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Video;
