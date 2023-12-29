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
npx prisma migrate save --name "[Nombre de la migración]"
```
esto generara un archivo que aun no se sincroniza con la base de datos, para sincronizar la ejecución escribe este comando
```bash
npx prisma migrate up
```
esto hara que la migracion se ejecute y se refleje en la base de datos.

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

## Ejecutar la API

Por ultimo para poder ejecutar y poder probrar la API, escribe este comando en la terminal
```bash
npm run dev
```



