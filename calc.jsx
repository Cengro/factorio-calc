/* global React,ReactDOM,App,_*/

var Calculator = App.Calculator;
var Datasource = App.Datasource;
var Input = App.Input;
var Options = App.Options;
var Ingredients = App.Ingredients;
var Graph = App.Graph;

var Calc = React.createClass({
  getInitialState: function() {
    return {
      input: {recipe: "", ips: 1 },
      additionalInputs: [],
      options: {
        asslvl: "0.5",
        smeltlvl: "1",
        beltlvl: "5.7"
      }
    };
  },

  calculate: function() {
    
    var inputs = _.union([this.state.input], this.state.additionalInputs);
    var result = Calculator.calculateAndAnalyze(inputs, this.state.options);
    this.setState({result: result});
  },

  setInput: function(input) {
    this.setState({input:input}, this.calculate);
  },

  addAnother: function() {
    var additionalInputs = this.state.additionalInputs.concat(this.state.input);
    this.setState({
      input: {recipe: "", ips: 1 },
      additionalInputs: additionalInputs
    }, this.calculate);
  },

  clear: function() {
    this.setState({
      input: {recipe: "", ips: 1 },
      additionalInputs: []
    }, this.calculate);
  },

  setOptions: function(options) {
    this.setState({options: options }, this.calculate);
  },
  
  render: function() {
    var results, subtotals;
    if (this.state.result) {
      results = this.state.result.recipes.map(function(recipe) {
        return (<Ingredients key={recipe.name} req={recipe} />);
      });
      subtotals = this.state.result.totals.map(function(total) {
        return (<Ingredients key={total.name} req={total} />);    
      });
    }
    
    return (
    	<div className="wrapper">
        <Datasource datalib={this.props.currentLib} datalibs={this.props.datalibs} />
        <Input input={this.state.input} recipes={this.props.recipes} onChange={this.setInput} onAddAnother={this.addAnother} onClear={this.clear}/>
        <Options options={this.state.options} onChangeOptions={this.setOptions}/>
        {results}
        <h2>Sub-totals</h2>
        {subtotals}
        <h2>Layout</h2>
        <Graph req={this.state.result} />
    </div>
    );
  }
});

window.renderCalc = function(recipeData) {
  window.setTimeout(function() {
    ReactDOM.render(
      <Calc
        recipes={recipeData}
        datalibs={window.DATALIBS}
        currentlib={window.CURRENT_LIB}/>,
      document.getElementById('calc')
    );
  }, 0);
};
