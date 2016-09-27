// Se obtienen los datos como resultado de una petición AJAX.
var Peich = require('./Peich.js');
var HolaMundo = React.createClass({
  render: function() {
    return (
      <div>
        Hola mundo <Peich />
      </div>
    );
  }
});

ReactDOM.render(
  <HolaMundo />,
  document.getElementById('content')
);