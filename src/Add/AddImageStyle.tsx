import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: 'auto',
            height: '100vh',
            width: '50%',
            textAlign: 'center'
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
        }
    }),
);
export default useStyles;