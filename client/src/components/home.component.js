import React, { Component } from 'react';
import 'whatwg-fetch';

export default class home extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div >
                    <div className="jumbotron" Style="background-color: #1C1616">
                        <h1 className="text-center" Style="color: #4482BE">Welcome to the JAI-Composer!</h1>
                        <h2 className="text-center" Style="color: #4482BE">A Senior Design project sponsored by Dr. Richard Leinecker</h2>
                    </div>
                <div>
                    <h2 className="text-center" Style="color: #4482BE">Our Vision</h2>
                    <p className="text-center"> The JAI-Composer is an AI that assists in creating
                        electronic dance music. Our goal with the composer was to create a simple and accessible tool to help anyone create music, not just musicians. We started the development of the JAI-Composer with the goal of creating an
                    Application that would help musicians and non-musicians in several ways.</p>
                </div>
                <div>
                    <h2 className="text-center" Style="color: #4482BE">Music Creation</h2>
                    <p className="text-center"> The JAI-Composer helps anyone create electronic music. Our Magenta powered drum model allows
                    users to create a simple drum pattern, which is then given to the JAI-Composer. The JAI-Composer will then use machine learning to
                    create a longer drum beat that was inspired by what the user created.</p>
                </div>
            </div>
        );
    }
}