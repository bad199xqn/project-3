import React, {Component} from 'react';
import CrashPage from './CrashPage';


class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log('loiiiiiiii')
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
  <CrashPage></CrashPage>
          )
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

  export default ErrorBoundary;