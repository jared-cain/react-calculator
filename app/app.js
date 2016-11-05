var React = require('react');
require('./app.css');
var getTotal = require('./calculator_help');

// var bootstrap = require('react-bootstrap');

var EquationFrame = React.createClass({
    render: function(){
        var equation;
        if (this.props.equation == ""){
            equation = "0"
        } else {
            equation = this.props.equation;
        }
        return (
            <div id="equation-frame">
                <div className="well">
                    Equation: {equation}
                </div>
            </div>
        )
    }
});

var TotalFrame = React.createClass({
    render: function(){
        return (
            <div id="total-frame">
                <div className="well">
                    Total: {this.props.total}
                </div>
            </div>
        )

    }
});


var NumbersFrame = React.createClass({
    render: function() {
        var numbers = [],
            operands = [],
            deleteButton,
            className,
            deleteLast = this.props.deleteLast,
            selectNumber = this.props.selectNumber;
        for (var i = 0; i <= 9; i++) {
            className = 'number number-' + i;
            numbers.push(
                <div key={i} className={className} onClick={selectNumber.bind(null, i)}>{i}</div>
            )
        };
        ["+", "-", "*", "/"].forEach(function(el,ind,arr) {
            operands.push(
                <div key={ind} className="operand" onClick={selectNumber.bind(null, el)}>{el}</div>
            )
        });
        if (this.props.equation === ""){
            deleteButton = <button className="btn btn-danger" disabled="true">Del</button>
        } else {
            deleteButton = <button className="btn btn-primary" onClick={deleteLast}>Del</button>
        };
        return (
            <div id="numbers-frame">
                <div className="well">
                    {numbers}
                    {operands}
                    {deleteButton}
                </div>
            </div>
        );
    }
});

var Calculator = React.createClass({
    getInitialState: function() {
        return {
            equation: "",
            total: 0,
            done: null,
        }
    },
    deleteLast: function(){
        var equation = this.state.equation.slice(0, -1);
        if (typeof equation.slice(-1) !== "number"){
            this.setState({ equation: equation });
        } else {
            this.setState({ equation: equation });
            var newTotal = eval(equation);
            this.setState({ total: newTotal });
        }

    },
    selectNumber: function(selectedNumber) {
        var equation = this.state.equation;
        var operands = ["+", "-", "*", "/"];
        if (typeof selectedNumber === "number"){
            // per spec way of checking for NaN
            if (selectedNumber !== selectedNumber) {
                console.log("that is not a number");
            } else {
                if (equation === "" && selectedNumber === 0){
                    console.log("we dont start with zeroes");
                    return;
                }
                equation = equation + selectedNumber;
                this.setState({ equation: equation });
                if ( equation.length === 1){
                    this.setState({ total: selectedNumber });
                } else {
                    var newTotal = eval(equation);
                    this.setState({ total: newTotal });
                }
            }
        } else if (typeof selectedNumber === "string"){
            // check if last position in equation is operand
            var lastPos = equation.substr(-1);
            if (operands.indexOf(lastPos) == -1){
                // add operand to equation
                if (operands.indexOf(selectedNumber) != -1){
                    if (this.state.equation == "") {
                        console.log("please select a number first");
                    } else {
                        this.setState({ equation: equation + selectedNumber });
                    }
                }
            } else {
                console.log("please select another number");
            }
        }
    },
    render: function() {
        return (
            <div id="calculator">
                <h2>React Calculator</h2>
                <hr />

                <EquationFrame equation={this.state.equation} />
                <NumbersFrame equation={this.state.equation} selectNumber={this.selectNumber} deleteLast={this.deleteLast} />
                <TotalFrame total={this.state.total} />

                <h3>Test for consistency</h3>

            </div>
        )
    }
})

module.exports = Calculator;
