import React, { Component } from "react";
import Switch from "react-switch";

// Define the interface for the props
interface SwitchExProps {
  checked: boolean; // Specify the type for the 'checked' prop
  onChange: (checked: boolean) => void; // Function type for the 'onChange' prop
}

export class CustomSwitch extends Component<SwitchExProps> {
  constructor(props) {
    super(props);
    console.log('All props:')
    console.log(props)
    console.log(' ')
    this.state = {
      checked: props?.checked || false,
      onChange: props?.onChange || (() => {}),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    // props.onChange();
    this.state.onChange({ target: { value: checked }})
  }
  render() {
    return (
      <label style={{ paddingRight: "5px" }}>
        <Switch onChange={this.handleChange} checked={this.state.checked} offColor="#a00a0a"/>
      </label>
    );
  }
}