import { Router } from 'express';
import { getAll } from '../../controllers/Clients.controllers.js';
// import { authenticate, authorizedRole } from '../../middlewares/authenticate.middleware.js';
// import { validateNewClient, validateUpdateClient } from '../../middlewares/validations/client.js';


// Rutas para la tabla Client
export const routerClients = Router();

// routerClients.use(authenticate)
// routerClients.use(authorizedRole([1, 2]))

routerClients.get('/', getAll);
// routerClients.get('/:id', getByDNI);
// routerClients.post('/', validateNewClient ,add);
// routerClients.patch('/:id',validateUpdateClient ,update);
// routerClients.delete('/:id', remove);
