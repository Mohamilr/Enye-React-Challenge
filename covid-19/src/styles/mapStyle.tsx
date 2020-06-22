import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'grid',
            gridTemplateColumns: '2fr 7fr',
            [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexDirection: 'column'
            }
        },
        right: {
            marginTop: '3em',
            [theme.breakpoints.down('md')]: {
                marginBottom: '2em',
            }
        },
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 450,
            margin: '0 1em',
            [theme.breakpoints.down('md')]: {
                margin: '0 auto',
            textAlign: 'center',
            width: '30em'
                // width: 450,
                // marginRight: '4em'
            }
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        inputDiv: {
            margin: '0 2em',
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 30,
            margin: 9,
            color: 'red'
        },
        parentDiv: {
            margin: '0 auto',
            textAlign: 'center',
            width: '30em'
        },
        historyDiv: {
            maxHeight: '10em',
            overflowY: 'scroll'
        },
        mapLayout: {
            height: '100vh',
            width: '100%',
            [theme.breakpoints.down('md')]: {
                width: '100%'
            },
            [theme.breakpoints.down('sm')]: {
                width: '40em'
            },
        },
        virusText: {
            textAlign: 'center',
            margin: '10em 1em',
            color: '#575a89',
            fontFamily: 'san-serif',
            [theme.breakpoints.down('md')]: {
                margin: '2em 0',
            }
        }
    }),
);

export default useStyles;