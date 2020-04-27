import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: '90%',
            /* height: 100vh; */
            /* margin: auto; */
            maxWidth: '650px',
            /* text-align: center; */
            padding: '10px',
            margin: 'auto',
        },
        fullWidth: {
            width: '100%',
            display: 'block',
            textAlign: 'center',
            margin: 'auto',
            marginBottom: '10px'
        },
        input: {
            display: 'none'
        },
        hidden: {
            display: 'none'
        },
        videoThumbnail: {
            maxHeight: '250px',
            width: 'auto'
        },
        divContainer: {
            maxHeight: '270px',
            position: 'relative',
            margin: 'auto',
        },
        cancelBtn: {
            position: 'absolute',
            zIndex: 10,
            top: 0,
            right: 0
        },
        backdrop: {
            zIndex: '10000 !important' as any,
            color: '#fff',
          },
    }),
);
export default useStyles;