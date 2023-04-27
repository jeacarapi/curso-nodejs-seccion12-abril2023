const { response, request } = require ('express');
const {Categoria} = require ('../models');



// ok
//obtenerCategorias - paginado - total - populate(mongoose) muestra el ultimo usuario que hizo el registro
// de la categoria
 const obtenerCategorias = async (req = request, res=response)=>{

    // populate
    // Categoria.findOne().sort({ createdAt: -1 }).populate('usuario').exec((err, categoria) => {
    //     if (err) return console.error(err);
    //     console.log(categoria.);

    const { limite = 5, desde = 0} = req.query;
    const query = {estado:true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
    ]);

    res.json({
        total,
        categorias
    });

 }


// obtenerCategoria - populate - {regresara el objeto de la categoria}
const obtenerCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre' );    
    res.json(categoria);
        

}

// ok
// const {Categoria} = require ('../models/') es lo mismo a lo de arriba
const crearCategoria = async(req,res = response) =>{

    // nombre corresponde a nombre de Categoria
    const nombre =  req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });
    }

    // generar la data al guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria (data);
    
    // guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}



// ok
// actualizarCategoria - 
const categoriasPut = async(req, res = response) => {

    const { id } = req.params;
    const {estado, usuario, ... data} = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    
    const categoria = await Categoria.findByIdAndUpdate( id, data, {new: true} );

    res.json(categoria);
}

// ok
// borrarCategoria - cambiar a false
const categoriaDelete = async (req,res = response)=>{
    const{ id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false}, {new: true} );
    res.json(categoriaBorrada);
}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    categoriaDelete,
    categoriasPut
}