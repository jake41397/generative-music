import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

const styles = {
    root: {
        width: 300,
    },
    slider: {
        padding: '22px 0px',
    },
};

class SimpleSlider extends React.Component {
    state = {
        value: 0.5,
    };

    handleChange = (event, value) => {
        this.setState({ value });
        const tempChange = this.props.temperatureCallback;
       tempChange(event, value);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Typography id="label">Temperature:</Typography>
                <Slider
                    classes={{ container: classes.slider }}
                    value={value}
                    aria-labelledby="label"
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

SimpleSlider.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSlider);