var ProductCategoryRow = React.createClass({
  render: function() {
    return (<tr><th colSpan="2">{this.props.videos}</th></tr>);
  }
});

var VideoRow = React.createClass({
  render: function() {
    var name = this.props.product.isla ?
      this.props.product.isla :
      <span style={{color: 'red'}}>
        {this.props.product.isla}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td><Videos elementos={this.props.product.videos} /></td>
      </tr>
    );
  }
});

// Componente que representa el nodo 'videos' de cada una de las filas.
var Videos = React.createClass({
  render: function() {
    var cols = [];
    
    // Como no todos los items tienen porque tener videos...
    if(this.props.elementos){
      this.props.elementos.forEach(function(elemento){
          if(elemento.extension==".ogv" || elemento.extension==".mp4" || elemento.extension==".webm"){
            cols.push(<Video fila={elemento} key={elemento.url} />);
          } else {
            cols.push(<Miniatura fila={elemento} key={elemento.url} />);
          }
        });
    }

    return (
      <div> {cols} </div>);
  }
});


// Componente que compone el HTML para mostrar los videos.
var Video = React.createClass({
  render: function(){
      var miniatura = this.props.fila.thumbnail+this.props.fila.extension;
      return(
        <div><video width="250" controls><source src={miniatura} /></video></div>
      );
  }
});

// Componente que compone el HTML para mostrar las miniaturas de las imágenes.
var Miniatura = React.createClass({
  render: function(){
      var miniatura = this.props.fila.thumbnail+this.props.fila.extension;
      return(
        <div><img width="150" src={miniatura} /></div>
      );
  }
});


var VideoTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    if(this.props.videos != undefined){
      this.props.videos.forEach(function(product) {      
        rows.push(<VideoRow product={product} key={product.isla} />);
      });      
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

// Se obtienen los datos como resultado de una petición AJAX.
var FilterableVideoTable = React.createClass({
  cargarDeServidor: function(){
    $.ajax({
      url: "http://wwwtest.illesbalears.travel/silex/api/navegacion/explora/web/idioma/es",
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data.videos});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });    
  },
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    this.cargarDeServidor();
    setInterval(this.cargarDeServidor, 3000);
  },
  render: function() {
    return (
      <div>
        <VideoTable videos={this.state.data} />
      </div>
    );
  }
});


ReactDOM.render(
  <FilterableVideoTable />,
  document.getElementById('content')
);
