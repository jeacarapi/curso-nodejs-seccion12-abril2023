const { Categoria, Producto } = require('../models');
const categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
};

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
};

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
};

const existeCategoriaPorId = async ( id ) =>{
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ){
        throw new Error(`El id no existe ${ id }`);
    }
} ;

const esCategoriaValida = async ( categoria = '' ) =>{
    const existeCategoria = await Role.findOne({ Categoria });
    if ( !existeCategoria ) {
        throw new Error(`La categoria ${ categoria } no está registrado en la BD`);
    };
}

const existeProductoPorId = async ( id ) =>{
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ){
        throw new Error(`El id no existe ${ id }`);
    }
} ;


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    esCategoriaValida,
    existeProductoPorId
}

