# Serverless Framework Node API, AWS

## DEVELOPER: Jack SAri

### Deployment

Clonar repo:

```
git clone https://github.com/jacksari/reto-softtek
```

Instalar dependencias:

```
npm install
```

Implementar serverless:

```
serverless deploy
```

Después de ejecutar la implementación, debería ver un resultado similar al siguiente:

```
Deploying "reto-softtek" to stage "dev" (us-east-1)

✔ Service deployed to stack reto-softtek-dev (50s)

endpoints:
  GET - https://n55obir2gl.execute-api.us-east-1.amazonaws.com/dev/fusionados
  GET - https://n55obir2gl.execute-api.us-east-1.amazonaws.com/dev/historial
  POST - https://n55obir2gl.execute-api.us-east-1.amazonaws.com/dev/store-character
functions:
  GetFusionados: reto-softtek-dev-GetFusionados (605 kB)
  GetHistory: reto-softtek-dev-GetHistory (605 kB)
  storeCharacter: reto-softtek-dev-storeCharacter (605 kB)
```

## Generar documentación con OpenApi

```
npx @redocly/openapi-cli preview-docs ./openapi/openapi.json
```

## Visualizar docs en OpenApi en ruta

```
http://127.0.0.1:8080
```

## Ejecutar tests

```bash
npm run test
```

## Tecnologías utilizados

- AWS
  1. Lambda
  2. DynamoDb
  3. ApiGateway
- NodeJs
- Jest
- Typescript
- Serverless
- SwapiApi

## Demo

```
https://n55obir2gl.execute-api.us-east-1.amazonaws.com/dev
```

## Uso

### Obtener el detalle del personaje, planeta y su clima

Obtener los datos de cache o en tal caso hacer las consultas en las apis externas

- **Endpoint:** `/fusionados`
- **Método:** `GET`
- **Query** `personId=9`
- **Respuesta:**

```json
{
  "message": "consulta de datos",
  "data": {
    "id": "9",
    "characterName": "Biggs Darklighter",
    "planet": "Tatooine",
    "temperature": null,
    "weatherDescription": "Planeta no encontrado",
    "humidity": null,
    "timestamp": "2025-06-30T10:32:09.384Z"
  }
}
```

### Historial de personajes guardadas en base de datos

Obtener los datos paginados por el limit y el lastKey

- **Endpoint:** `/historial`
- **Método:** `GET`
- **Query** `limit=2&lastKey=1`
- **Respuesta:**

```json
{
   "message": "historial paginados",
    "items": [
        ...
        {
            "id": "5",
            "characterName": "Leia Organa",
            "planet": "Alderaan",
            "temperature": null,
            "weatherDescription": "Planeta no encontrado",
            "humidity": null,
            "timestamp": "2025-06-30T08:29:26.330Z"
        }
        ...
    ],
    "lastKey": "5"
}
```

### Crear planeta en base de datos

Registro de planetas, no se relaciona con las apis anteriores, se guarda en otra tabla CharacterTable

- **Endpoint:** `/store-character`
- **Método:** `POST`
- **Validación:** `name: string, planetName: string, homeworldUrl: string`
- **Body de la solicitud:**

```json
{
  "name": "Anakin Skywalker v2",
  "planetName": "Tatooine",
  "homeworldUrl": "https://swapi.dev/api/planets/1/"
}
```

- **Respuesta:**

```json
{
  "message": "Personaje creado",
  "item": {
    "id": "4ecfe5cf-a0c1-47c4-9502-cf0da914440e",
    "name": "Anakin Skywalker v2",
    "planetName": "Tatooine",
    "homeworldUrl": "https://swapi.dev/api/planets/1/"
  }
}
```

### Apis en postman

[Postman](https://documenter.getpostman.com/view/10645967/2sB34Zpitf)

---

Proyecto creado por [@jacksari](https://github.com/jacksari)
