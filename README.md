# ODONT PROYECT

:construction: Proyecto en construcción :construction:

> [!NOTE]
>Para poder contribuir en este proyecto debes tener instalado:
>
>[Node JS 20.8.1](https://nodejs.org/dist/v20.8.1/node-v20.8.1-x64.msi)
>[MySQL 8.0.34](https://dev.mysql.com/downloads/windows/installer/8.0.html)

> [!CAUTION]
> Por ningun motivo deben realizar un push a la Rama **MASTER**
> esto debido a que es la rama que se enviara a producción

## Configuracion archivo .env
la estructura del archivo .env para desarrollo es la siguiente

```JS
PORT = 4000
Front_URL = "http://localhost:5173"
JWT_KEY = Secretkey
DATABASE_URL = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
```
## Ejecutar la migracion de Prisma

Abre una terminal ubicada en el directorio del proyecto en donde ejecutes el siguiente comando
```bash
npm run migrate:save
```
Esto generara un folder dentro de prisma llamado **migrations** donde dentro aparecera la migracion junto con un nombre por ultimo, para actualizar el archivo prisma.schema ejecuta este comando
```bash
npx prisma db pull
```
esto "linteara", el codigo de los modelos y especificara aun mas los datos que se migran a la base de datos

> [!TIP]
> Si haz realizado cambios en los modelos dentro del archivo **schema.primsa**, debes ejecutar el mismo proceso

## Solucion error de migración en prisma
> [!IMPORTANT]
> Si al ejecutar ese comando, aparece este mensaje :
> ```bash
> Error: EPERM: operation not permitted, unlink: 'c:...'
> ```
> ejecuta los siguientes pasos:
> 
>  - Elimina primero el folder Node_modules del proyecto
>  - Cierra tu editor de codigo y reabrelo en modo **Administrador**
>  - Abre una terminal dentro de la misma carpeta del proyecto y ejecuta el siguiente comando:
>    ```bash
>    npm cache clean --force
>    ```
>   - Finalmente vuelve a instalar las dependecias del proyecto y ejecuta la migracion nuevamente

## Creación de Test 
Dentro del folder **Test** debes crear un archivo con la extencion **.test.js**.

creado el archivo debes importar la constante **app** del archivo **app.js** y la clase **request** de la libreria **Supertest**
```JS
import app from '../src/app.js'
import request from 'supertest'
```

la estructura basica de un test es la siguiente:
+ **describe** indica de forma general lo que se testeara
+ **test** describe la caracteristica a probar
+ **request** se usa para realizar las peticiones HTTP basandose en una aplicacion de Express
+ **expect** es la respuesta que resive de la peticion
+ los metodos **toBe**, **toEqual** y demas, son la respuesta que nosotros esperamos que sea 
```JS
describe('Basic test', () => {
  test('description of the feature to be tested', async () => {
    const res = await request(app).get('/').send()
    expect(res.body.message).toEqual('Route not found')
    expect(res.statusCode).toBe(404)
  })
})
```

para ejecutar el test, ejecuta este comando en la terminal
```bash
npm run test
```
si solo deseas ejecutar solo un **test suite** debes:
+ ejecuta el comando de test en la terminal
+ pulsa la tecla w y dentro del menu **watch usage** pulsa la tecla p
+ pon dentro el **nombre del test suit o del archivo de test** que pretendes utilizar

Ya con testo podras ejecutar un solo **test suite**

## Ejecutar la API

Por ultimo para poder ejecutar y poder probrar la API, escribe este comando en la terminal
```bash
npm run dev
```



