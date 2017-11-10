import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

class GoToMapButton extends React.Component {
  goToMap = () => {
    this.props.goToMap(this.props.targetImageId);
  };

  render = () => (
    <StyledButton
      onClick={this.goToMap}
      disabled={this.props.disabled}
    >
      {this.props.children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 100%;
`;

GoToMapButton.defaultProps = {
  disabled: false,
  children: null,
};

GoToMapButton.propTypes = {
  targetImageId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  goToMap: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default GoToMapButton;
