import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
      
        };
    }

    static getDerivedStateFromError(error) {
        //update state so the next render will show the fallback 
        return { hasError: true };

    }

    // componentDidCatch(error, errorInfo) {
    //     // you can also log the error to an error reporting service
    //     logErrorToMyService(error, info);
    // }

    render() {
        if (this.state.error) {
            // you can render any custom fallback UI
            return <h2 className="Main__Error" id={this.props.key}>Could not display the note key: {this.props.key}</h2>
        }
        return this.props.children;
    }
    
}