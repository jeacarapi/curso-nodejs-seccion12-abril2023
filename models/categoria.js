


const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
    
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,

    },
    usuario:{
        type: Schema.Types.ObjectId,
        // 'Usuario' viene de Models/usuario en la linea: 45 >> module.exports = model( 'Usuario', UsuarioSchema );
        // y debe estar escrita tal cual (en este caso en singular y mayuscula al principio )
        ref: 'Usuario',
        required: true

    },
    
    
});

CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;

}
module.exports = model( 'Categoria', CategoriaSchema );
