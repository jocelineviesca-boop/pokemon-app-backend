## API desplegada

La API de Pokémon App está disponible en:

**https://pokemon-api.happyminecraft.org**

### Tecnologías principales

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Celebrate / Joi
- Nginx
- PM2
- HTTPS

### Endpoints principales

- `POST /signup` — registrar usuario
- `POST /signin` — iniciar sesión
- `GET /users/me` — obtener usuario actual
- `GET /favorites` — obtener favoritos
- `POST /favorites` — guardar un Pokémon
- `DELETE /favorites/:favoriteId` — eliminar un Pokémon favorito