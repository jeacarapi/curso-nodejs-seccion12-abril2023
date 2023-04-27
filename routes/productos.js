const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');

const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');
const { obtenerProductos, 
        obtenerProducto, 
        crearProducto, 
        productosPut, 
        productoDelete } = require('../controllers/productos');


const router = Router();

// get para obtener todas las categorias - publico OOOKKKK
router.get('/', obtenerProductos);//falta populate ir a controllers


//obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID DE MONGO valido').isMongoId(),
    check('id').custom( existeProductoPorId ),                                 // crear ok
    validarCampos
], obtenerProducto);

// post para crear categoria - privado - cualquier persona con un token valido
router.post('/',
    [validarJWT,
        check('nombre','El nombre es Obligatorio').not().isEmpty(),
        check('categoria', 'No es un ID de Mongo').isMongoId(),
        check('categoria').custom(existeCategoriaPorId),
        validarCampos
    ], crearProducto);


// actualizar categoria - vista privada - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),                                   //crear ok
    // check('categoria').custom(esCategoriaValida),  - ESTA LINEA NO FUE NECESARIA
    validarCampos
],productosPut );

// borrar categoria - solo si es ADMIN 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido (delete) de mongo').isMongoId(),
    check('id').custom(existeProductoPorId),                                   //crear ok
    validarCampos
],productoDelete);



module.exports = router;