const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, esAdminRole } = require('../middlewares');
const { crearCategoria, 
        obtenerCategorias,
        obtenerCategoria, 
        categoriaDelete,
        categoriasPut} = require('../controllers/categorias');
const { existeCategoriaPorId, esCategoriaValida } = require('../helpers/db-validators');


const router = Router();

// get para obtener todas las categorias - publico OOOKKKK
router.get('/', obtenerCategorias);//falta populate ir a controllers


//obtener una categoria por id - publico
router.get('/:id',[
    check('id', 'No es un ID DE MONGO valido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

// post para crear categoria - privado - cualquier persona con un token valido
router.post('/',
    [validarJWT,
        check('nombre','El nombre es Obligatorio').not().isEmpty(),
        validarCampos
        
    ], crearCategoria);


// actualizar categoria - vista privada - cualquier persona con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    // check('categoria').custom(esCategoriaValida),  - ESTA LINEA NO FUE NECESARIA
    validarCampos
],categoriasPut );

// borrar categoria - solo si es ADMIN 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un ID valido (delete) de mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],categoriaDelete);



module.exports = router;