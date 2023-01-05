import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { FC } from 'react';

type PageHeaderProps = {
    pageTile: string;
    isButton?: boolean;
    buttonClicked?: any;
    buttonTitle?: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headerContent: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: '20px',
            paddingBottom: '40px',
            width: '100%'
        },
        title: {
            flex: '1 1 100%',
            color: '#ABABAB',
            fontSize: '20px',
            width: '80%'
        },
        btn: {
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            width: '20%'
        },
        btnComponent: {
            backgroundColor: '#00B1FF',
            color: '#FFFFFF',
            fontSize: '16px',
            textTransform: 'none'
        }
    }),
);

const PageHeader: FC<PageHeaderProps> = ({ pageTile, isButton, buttonClicked, buttonTitle }: PageHeaderProps) => {
    const classes = useStyles();
    return (
        <div className={classes.headerContent}>
            <div className={classes.title}>
                <Typography id="tableTitle">
                    {pageTile}
                </Typography>
            </div>
            <div className={classes.btn}>
                {
                    isButton && (
                        <Button variant="contained" className={classes.btnComponent} onClick={buttonClicked}>
                            {buttonTitle}
                        </Button>
                    )
                }
            </div>
        </div>
    );
};

export default PageHeader;
