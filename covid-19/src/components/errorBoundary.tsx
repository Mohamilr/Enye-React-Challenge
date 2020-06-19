import React, { Component } from 'react';

export default class MyErrorBoundary extends Component {
    state = {
        hasError: false,
        error: null,
        errorInfo: null
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({
            hasError: true,
            error,
            errorInfo
        })
    }

    render() {
        if(this.state.hasError) {
            return <h1 style={{marginTop: '3em', textAlign: 'center', color: 'red'}}>Something went wrong. Please reload the page</h1>
        }
        return this.props.children;
    }
}
