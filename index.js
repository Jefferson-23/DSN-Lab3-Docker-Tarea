const express = require('express');
const app = express();

app.use(express.json());

let clientes = [
    { id: 1, nombre: 'Cliente 1' },
    { id: 2, nombre: 'Cliente 2' },
    { id: 3, nombre: 'Cliente 3' }
];

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.get('/productos', (req, res) => {
    res.json(productos);
});

// POST /productos
app.post('/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});
// POST /clientes
app.post('/clientes', (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1,
        nombre: req.body.nombre
    };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// PUT /productos/:id
app.put('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('El producto con el ID dado no fue encontrado.');

    producto.nombre = req.body.nombre;
    producto.precio = req.body.precio;

    res.json(producto);
});
// PUT /clientes/:id
app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('El cliente con el ID dado no fue encontrado.');

    cliente.nombre = req.body.nombre;

    res.json(cliente);
});

// DELETE /productos/:id
app.delete('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).send('El producto con el ID dado no fue encontrado.');

    const index = productos.indexOf(producto);
    productos.splice(index, 1);

    res.json(producto);
});
// DELETE /clientes/:id
app.delete('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id === parseInt(req.params.id));
    if (!cliente) return res.status(404).send('El cliente con el ID dado no fue encontrado.');

    const index = clientes.indexOf(cliente);
    clientes.splice(index, 1);

    res.json(cliente);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});